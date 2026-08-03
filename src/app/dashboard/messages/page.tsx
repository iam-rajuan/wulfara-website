"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import MessageSidebar from "@/components/dashboard/messages/MessageSidebar";
import MessageChat from "@/components/dashboard/messages/MessageChat";
import MessageEmptyState from "@/components/dashboard/messages/MessageEmptyState";
import { useGetConversationsQuery } from "@/store/features/messages/messagesApi";

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const newSupplierId = searchParams.get('new');
  const newSupplierName = searchParams.get('name');

  const [activeTab, setActiveTab] = useState("inbox");
  const [activeMessage, setActiveMessage] = useState<string | null>(newSupplierId ? `new-${newSupplierId}` : null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversationsResponse, isLoading } = useGetConversationsQuery(undefined, { pollingInterval: 30000 });

  const rawConversations = conversationsResponse?.data || [];

  const formattedConversations = rawConversations.map((conv: any, idx: number) => {
    const otherUser = conv.participants?.find((p: any) => p.role === 'supplier' || p.role === 'admin') || conv.participants?.[0] || {};

    return {
      id: conv._id, // string id from mongo
      sender: otherUser.name || "Unknown Supplier",
      isVerified: idx % 2 === 0, // Mock verification
      isNew: !conv.hasUnread,
      tag: conv.rfq ? `RFQ #${conv.rfq.rfqNumber || '...'}` : 'Sourcing',
      tagType: conv.rfq ? "warning" : "primary",
      timeEstimate: "Replies in 2 hours",
      excerpt: conv.lastMessage?.text || "Started a new conversation...",
      timestamp: new Date(conv.lastMessageAt || Date.now()).toLocaleDateString(),
      history: [] // We'll fetch this in MessageChat
    };
  });

  const messages = useMemo(() => {
    let list = [...formattedConversations];

    // Check if we are starting a new conversation that isn't in the list
    if (newSupplierId && newSupplierName) {
      // Check if we already have a conversation with this supplier
      // Note: this is a simple mock matching since we don't map supplier IDs strictly in this UI
      // but if it's a completely new one, we add a placeholder.
      const exists = rawConversations.some((c: any) => c.participants?.some((p: any) => p._id === newSupplierId));
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
          history: []
        });
      }
    }
    return list;
  }, [formattedConversations, newSupplierId, newSupplierName, rawConversations]);

  const activeChat = activeMessage ? messages.find((m: any) => m.id === activeMessage) : null;

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
