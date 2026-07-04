"use client";

import {
  FileText,
  MessageSquare,
  Bookmark,
  CalendarCheck,
  Search,
  Star,
  ChevronRight,
  ArrowRight,
  Mail,
  FilePlus,
} from "lucide-react";

const statCards = [
  {
    label: "Active RFQs",
    value: "6",
    icon: FileText,
  },
  {
    label: "Pending Responses",
    value: "3",
    icon: CalendarCheck,
  },
  {
    label: "Favorite Suppliers",
    value: "12",
    icon: Bookmark,
  },
  {
    label: "Recent Messages",
    value: "4",
    icon: Mail,
  },
];

const rfqData = [
  {
    supplier: "Steel Company A",
    product: "Raw Materials - Grade A Steel",
    date: "Oct 24, 2024",
    status: "Pending",
    statusColor: "bg-[#E0E7FF] text-[#3730A3]",
    action: "Review",
    actionHighlight: true,
  },
  {
    supplier: "Industrial Parts Co.",
    product: "Machined Components Set",
    date: "Oct 22, 2024",
    status: "Responded",
    statusColor: "bg-[#6EE7B7] text-[#064E3B]",
    action: "Review",
    actionHighlight: true,
  },
  {
    supplier: "Global Logistics Partner",
    product: "Freight Forwarding Q4",
    date: "Oct 15, 2024",
    status: "Closed",
    statusColor: "bg-[#D1D5DB] text-[#374151]",
    action: "Details",
    actionHighlight: false,
  },
  {
    supplier: "Global Logistics Partner",
    product: "Freight Forwarding Q4",
    date: "Oct 15, 2024",
    status: "Closed",
    statusColor: "bg-[#D1D5DB] text-[#374151]",
    action: "Details",
    actionHighlight: false,
  },
  {
    supplier: "Global Logistics Partner",
    product: "Freight Forwarding Q4",
    date: "Oct 15, 2024",
    status: "Closed",
    statusColor: "bg-[#D1D5DB] text-[#374151]",
    action: "Details",
    actionHighlight: false,
  },
];

const quickActions = [
  { label: "Search Suppliers", icon: Search },
  { label: "Submit New RFQ", icon: FilePlus },
  { label: "View Favorites", icon: Star },
];

export default function DashboardOverviewPage() {
  return (
    <div className="w-auto mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-[#0B172E] tracking-tight mb-2">
          Welcome back, Buyer.
        </h2>
        <p className="text-[15px] text-gray-500">
          Here is a summary of your recent sourcing activity.
        </p>
      </div>

      <div className="flex gap-6">
        {/* ── Left Column ── */}
        <div className="flex-1 min-w-0">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
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
              <button className="text-[13px] font-bold text-[#137847] hover:text-[#0f6139] transition-colors">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
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
                  {rfqData.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-5 text-[13px] font-bold text-[#0B172E] w-[20%]">
                        {row.supplier}
                      </td>
                      <td className="px-4 py-5 text-[13px] text-gray-600 w-[30%] pr-8">
                        {row.product}
                      </td>
                      <td className="px-4 py-5 text-[13px] text-gray-600 w-[15%]">
                        {row.date}
                      </td>
                      <td className="px-4 py-5 w-[15%]">
                        <span
                          className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full ${row.statusColor}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-5 w-[10%]">
                        <button
                          className={`text-[12px] font-bold transition-colors ${row.actionHighlight
                            ? "text-[#137847] hover:text-[#0f6139]"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="w-[320px] shrink-0 space-y-6">
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
              <div className="bg-[#F4F6F9] border border-gray-200 p-4 flex items-start gap-3">
                <Mail size={18} className="text-[#137847] shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <p className="text-[13px] font-bold text-[#0B172E] mb-1">
                    Industrial Parts Co.
                  </p>
                  <p className="text-[12px] text-gray-600 leading-snug">
                    &quot;We can meet your volume requirements for Q3...&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Next RFQ Deadline */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                Next RFQ Deadline
              </p>
              <div className="flex items-center justify-between pl-3 border-l-2 border-[#DC2626]">
                <div>
                  <p className="text-[13px] font-bold text-[#0B172E] mb-1">
                    Steel Fabrication RFQ-204
                  </p>
                  <p className="text-[11px] font-bold text-[#DC2626]">
                    Closes in 2 days
                  </p>
                </div>
                <ArrowRight size={18} className="text-[#137847] shrink-0" strokeWidth={2.5} />
              </div>
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
                  className="w-full flex items-center justify-between px-4 py-4 bg-white border border-gray-200 hover:border-gray-300 transition-colors group"
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
                    className="text-gray-300"
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
