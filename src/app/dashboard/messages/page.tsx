"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import MessageSidebar from "@/components/dashboard/messages/MessageSidebar";
import MessageChat from "@/components/dashboard/messages/MessageChat";
import MessageEmptyState from "@/components/dashboard/messages/MessageEmptyState";
import { useGetConversationsQuery } from "@/store/features/messages/messagesApi";
import type { Conversation } from "@/types/api";

export interface DashboardConversationPreview {
  id: string;
  recipientId?: string;
  sender: string;
  isVerified: boolean;
  isNew: boolean;
  tag: string;
  tagType: "warning" | "primary";
  timeEstimate: string;
  excerpt: string;
  timestamp: string;
  history: string[];
}

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const newSupplierId = searchParams.get('new');
  const newSupplierName = searchParams.get('name');

  const [activeTab, setActiveTab] = useState("inbox");
  const [activeMessage, setActiveMessage] = useState<string | null>(newSupplierId ? `new-${newSupplierId}` : null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversationsResponse, isLoading } = useGetConversationsQuery(undefined, { pollingInterval: 30000 });

  const rawConversations = useMemo(() => conversationsResponse?.data || [], [conversationsResponse?.data]);

  const formattedConversations = useMemo(
    () =>
      rawConversations.map((conversation: Conversation, index: number) => {
        const otherUser =
          conversation.participants?.find((participant) => participant.role === "supplier" || participant.role === "admin") ||
          conversation.participants?.[0];

        return {
          id: conversation._id,
          sender: otherUser?.name || "Unknown Supplier",
          isVerified: index % 2 === 0,
          isNew: !conversation.hasUnread,
          tag: conversation.rfq ? `RFQ #${conversation.rfq.rfqNumber || "..."}` : "Sourcing",
          tagType: conversation.rfq ? "warning" : "primary",
          timeEstimate: "Replies in 2 hours",
          excerpt: conversation.lastMessage?.text || "Started a new conversation...",
          timestamp: conversation.lastMessageAt ? new Date(conversation.lastMessageAt).toLocaleDateString() : "Recently",
          history: [],
        } satisfies DashboardConversationPreview;
      }),
    [rawConversations]
  );

  const messages = useMemo(() => {
    const list: DashboardConversationPreview[] = [...formattedConversations];

    // Check if we are starting a new conversation that isn't in the list
    if (newSupplierId && newSupplierName) {
      // Check if we already have a conversation with this supplier
      // Note: this is a simple mock matching since we don't map supplier IDs strictly in this UI
      // but if it's a completely new one, we add a placeholder.
      const exists = rawConversations.some((conversation) =>
        conversation.participants?.some((participant) => participant._id === newSupplierId)
      );
      if (!exists) {
        list.unshift({
          id: `new-${newSupplierId}`,
          recipientId: newSupplierId, // Pass this to MessageChat
          sender: newSupplierName,
          isVerified: true,
          isNew: true,
          tag: "Sourcing",
          tagType: "primary",
          timeEstimate: "Replies typically in 2 hours",
          excerpt: "Start a conversation...",
          timestamp: "New",
          history: [],
        });
      }
    }
    return list;
  }, [formattedConversations, newSupplierId, newSupplierName, rawConversations]);

  const activeChat = activeMessage ? messages.find((message) => message.id === activeMessage) ?? null : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.history, activeMessage]);

  return (
    <div className="w-full h-[calc(100vh-120px)] flex flex-col pb-4">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-[#0B172E] tracking-tight mb-2">
          Messages
        </h1>
        <p className="text-[15px] text-gray-500 max-w-2xl">
          Communicate with suppliers and customers about quotes, pricing, order quantity, and shipping.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">

        <MessageSidebar
          messages={messages}
          isLoading={isLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeMessage={activeMessage}
          setActiveMessage={setActiveMessage}
        />

        {/* Right Area */}
        {activeChat ? (
          <MessageChat
            activeChat={activeChat}
            messagesEndRef={messagesEndRef}
          />
        ) : (
          <MessageEmptyState />
        )}

      </div>
    </div>
  );
}
