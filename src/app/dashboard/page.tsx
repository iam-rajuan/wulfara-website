"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  Bookmark,
  CalendarCheck,
  Search,
  Star,
  ChevronRight,
  ArrowRight,
  Mail,
  FilePlus,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetBuyerRfqsQuery } from "@/store/api/rfqApi";
import { useGetFavoritesQuery } from "@/store/api/favoriteApi";
import { useGetConversationsQuery } from "@/store/features/messages/messagesApi";

const quickActions = [
  { label: "Search Suppliers", icon: Search },
  { label: "Submit New RFQ", icon: FilePlus },
  { label: "View Favorites", icon: Star },
];

export default function DashboardOverviewPage() {
  const router = useRouter();
  const { user } = useSelector(
    (state: { auth: { user: { name: string; avatar?: string } | null } }) => state.auth || { user: null }
  );

  const { data: rfqsResponse, isLoading: isLoadingRfqs } = useGetBuyerRfqsQuery();
  const { data: favoritesResponse, isLoading: isLoadingFavorites } = useGetFavoritesQuery();
  const { data: conversationsResponse, isLoading: isLoadingConversations } = useGetConversationsQuery();

  const [currentTimestamp] = useState(() => Date.now());

  const rfqs = useMemo(() => rfqsResponse?.data || [], [rfqsResponse]);
  const favorites = useMemo(() => favoritesResponse?.data || [], [favoritesResponse]);
  const conversations = useMemo(() => conversationsResponse?.data || [], [conversationsResponse]);

  // Sourcing stats
  const activeRfqsCount = useMemo(() => rfqs.filter((r) => r.status !== "closed").length, [rfqs]);
  const pendingResponsesCount = useMemo(() => rfqs.filter((r) => r.status === "pending").length, [rfqs]);
  const favoritesCount = useMemo(() => favorites.length, [favorites]);
  const messagesCount = useMemo(() => conversations.length, [conversations]);

  // Sourcing summary - Next RFQ deadline helper
  const getDeadlineDate = (details: string) => {
    if (!details) return null;
    const match = details.match(/Expected Delivery: (.+?)\n/);
    if (!match) return null;
    const d = new Date(match[1]);
    return isNaN(d.getTime()) ? null : d;
  };

  // Memoize deadline details to satisfy purity rule and avoid multiple render runs
  const deadlineDetails = useMemo(() => {
    if (activeRfqsCount === 0 || currentTimestamp === null) return null;
    const nextRfqDeadline = rfqs
      .filter((r) => r.status !== "closed")
      .map((r) => ({ rfq: r, date: getDeadlineDate(r.details || "") }))
      .filter((x) => x.date !== null && (x.date as Date).getTime() > currentTimestamp)
      .sort((a, b) => (a.date as Date).getTime() - (b.date as Date).getTime())[0];

    if (!nextRfqDeadline) return null;

    const diffTime = (nextRfqDeadline.date as Date).getTime() - currentTimestamp;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      title: nextRfqDeadline.rfq.subject?.replace("RFQ: ", "") || "Sourcing Request",
      closesText: diffDays === 1 ? "Closes tomorrow" : `Closes in ${diffDays} days`,
      rfqId: nextRfqDeadline.rfq._id,
    };
  }, [rfqs, activeRfqsCount, currentTimestamp]);

  let deadlineTitle = "No pending deadlines";
  let deadlineCloses = "All caught up";
  let deadlineRfqId = "";
  if (deadlineDetails) {
    deadlineTitle = deadlineDetails.title;
    deadlineCloses = deadlineDetails.closesText;
    deadlineRfqId = deadlineDetails.rfqId;
  }

  const isLoading = isLoadingRfqs || isLoadingFavorites || isLoadingConversations;

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-[#DFB63E]" />
        <p className="text-sm text-gray-500 font-bold">Loading dashboard summary...</p>
      </div>
    );
  }

  const statCards = [
    {
      label: "Active RFQs",
      value: String(activeRfqsCount),
      icon: FileText,
    },
    {
      label: "Pending Responses",
      value: String(pendingResponsesCount),
      icon: CalendarCheck,
    },
    {
      label: "Favorite Suppliers",
      value: String(favoritesCount),
      icon: Bookmark,
    },
    {
      label: "Recent Messages",
      value: String(messagesCount),
      icon: Mail,
    },
  ];

  // Recent RFQs List (top 5)
  const recentRfqs = [...rfqs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return { color: "bg-[#E5F0FF] text-[#0066FF] border-[#B3D4FF]", text: "Pending" };
      case "responded":
        return { color: "bg-[#E6F4EA] text-[#137333] border-[#A8DAB5]", text: "Responded" };
      case "closed":
        return { color: "bg-[#F1F3F4] text-[#5F6368] border-[#DADCE0]", text: "Closed" };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", text: status.charAt(0).toUpperCase() + status.slice(1) };
    }
  };

  // Sourcing summary - Most recent supplier reply
  const lastReplyConversation = [...conversations]
    .sort((a, b) => new Date(b.lastMessageAt || 0).getTime() - new Date(a.lastMessageAt || 0).getTime())[0];
  const lastReplyMsg = lastReplyConversation?.lastMessage;
  const otherParticipant = lastReplyConversation?.participants?.find((p) => p._id !== user?._id);
  const supplierName = otherParticipant?.name || lastReplyConversation?.rfq?.supplierName || "Supplier";
  
  let replyTextSnippet = "No replies received yet.";
  if (lastReplyMsg?.text) {
    const rawText = lastReplyMsg.text;
    replyTextSnippet = rawText.includes("[QUOTE DETAILS]")
      ? "Submitted a quote response proposal."
      : rawText.length > 55
      ? rawText.substring(0, 55) + "..."
      : rawText;
  }


  const handleQuickAction = (label: string) => {
    if (label === "Search Suppliers") router.push("/dashboard/search");
    if (label === "Submit New RFQ") router.push("/dashboard/rfqs/new");
    if (label === "View Favorites") router.push("/dashboard/favorites");
  };

  return (
    <div className="w-auto mx-auto pb-10">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-[#0B172E] tracking-tight mb-2">
          Welcome back, {user?.name || "Buyer"}.
        </h2>
        <p className="text-[15px] text-gray-500">
          Here is a summary of your recent sourcing activity.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Left Column ── */}
        <div className="flex-1 min-w-0">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="bg-white border border-gray-200 p-5 flex flex-col justify-between h-[120px]"
              >
                <div>
                  <card.icon size={20} className="text-[#137847] mb-2" strokeWidth={2.5} />
                  <p className="text-4xl font-bold text-[#0B172E] leading-none">
                    {card.value}
                  </p>
                </div>
                <p className="text-[13px] text-gray-600 leading-tight pr-4">
                  {card.label}
                </p>
              </div>
            ))}
          </div>

          {/* Recent RFQs Table */}
          <div className="bg-white border border-gray-200">
            <div className="flex items-center justify-between px-6 py-5 bg-[#F9FAFB] border-b border-gray-200">
              <h3 className="text-[18px] font-bold text-[#0B172E]">
                Recent RFQs
              </h3>
              <button 
                onClick={() => router.push("/dashboard/rfqs")}
                className="text-[13px] font-bold text-[#137847] hover:text-[#0f6139] transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-6 py-4">
                      Supplier
                    </th>
                    <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-4">
                      Product/Service
                    </th>
                    <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-4">
                      Date
                    </th>
                    <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-4">
                      Status
                    </th>
                    <th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentRfqs.length > 0 ? (
                    recentRfqs.map((rfq, i) => {
                      const statusStyle = getStatusStyle(rfq.status);
                      const displayDate = new Date(rfq.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                      const actionLabel = rfq.status === "closed" ? "Details" : "Review";
                      const isHighlight = rfq.status !== "closed";

                      return (
                        <tr
                          key={rfq._id || i}
                          className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-5 text-[13px] font-bold text-[#0B172E] w-[20%] truncate max-w-[150px]">
                            {rfq.supplier?.companyName || rfq.supplierName || "Unknown Supplier"}
                          </td>
                          <td className="px-4 py-5 text-[13px] text-gray-600 w-[30%] pr-8 truncate max-w-[200px]">
                            {rfq.subject?.replace("RFQ: ", "") || "Sourcing Request"}
                          </td>
                          <td className="px-4 py-5 text-[13px] text-gray-600 w-[15%]">
                            {displayDate}
                          </td>
                          <td className="px-4 py-5 w-[15%]">
                            <span
                              className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full ${statusStyle.color}`}
                            >
                              {statusStyle.text}
                            </span>
                          </td>
                          <td className="px-4 py-5 w-[10%]">
                            <button
                              onClick={() => router.push(`/dashboard/rfqs/${rfq._id}`)}
                              className={`text-[12px] font-bold transition-colors cursor-pointer focus:outline-none ${
                                isHighlight
                                  ? "text-[#137847] hover:text-[#0f6139]"
                                  : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              {actionLabel}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-400">
                        No recent RFQs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="w-full lg:w-[320px] lg:shrink-0 space-y-6">
          {/* Sourcing Summary */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-[18px] font-bold text-[#0B172E] mb-4">
              Sourcing Summary
            </h3>
            <div className="h-px bg-gray-200 w-full mb-6"></div>

            {/* Most Recent Supplier Reply */}
            <div className="mb-8">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                Most Recent Supplier Reply
              </p>
              {lastReplyConversation ? (
                <div 
                  onClick={() => router.push(`/dashboard/messages?id=${lastReplyConversation._id}`)}
                  className="bg-[#F4F6F9] border border-gray-200 p-4 flex items-start gap-3 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <Mail size={18} className="text-[#137847] shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-[#0B172E] mb-1 truncate">
                      {supplierName}
                    </p>
                    <p className="text-[12px] text-gray-600 leading-snug break-words">
                      &quot;{replyTextSnippet}&quot;
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#F4F6F9] border border-gray-200 p-4 text-center text-xs text-gray-400">
                  No replies received yet.
                </div>
              )}
            </div>

            {/* Next RFQ Deadline */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                Next RFQ Deadline
              </p>
              {nextRfqDeadline ? (
                <div 
                  onClick={() => router.push(`/dashboard/rfqs/${deadlineRfqId}`)}
                  className="flex items-center justify-between pl-3 border-l-2 border-[#DC2626] cursor-pointer group"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-[13px] font-bold text-[#0B172E] mb-1 truncate group-hover:text-[#137847] transition-colors">
                      {deadlineTitle}
                    </p>
                    <p className="text-[11px] font-bold text-[#DC2626]">
                      {deadlineCloses}
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-[#137847] shrink-0 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </div>
              ) : (
                <div className="flex items-center justify-between pl-3 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[13px] font-bold text-[#0B172E] mb-1">
                      No pending deadlines
                    </p>
                    <p className="text-[11px] font-bold text-gray-400">
                      All caught up
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-[18px] font-bold text-[#0B172E] mb-4">
              Quick Actions
            </h3>
            <div className="h-px bg-gray-200 w-full mb-6"></div>

            <div className="space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="w-full flex items-center justify-between px-4 py-4 bg-white border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <action.icon
                      size={18}
                      className="text-[#137847]"
                      strokeWidth={2.5}
                    />
                    <span className="text-[13px] font-bold text-[#0B172E]">
                      {action.label}
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-gray-300 group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
