"use client";

import { useState, useRef, useEffect } from "react";
import MessageSidebar from "@/components/dashboard/messages/MessageSidebar";
import MessageChat from "@/components/dashboard/messages/MessageChat";
import MessageEmptyState from "@/components/dashboard/messages/MessageEmptyState";

// Added conversation history to each message for the dynamic chat view
const initialMessagesData = [
  {
    id: 1,
    sender: "Steel Company A",
    isVerified: true,
    isNew: true,
    tag: "RFQ #1042",
    tagType: "warning", // yellow
    timeEstimate: "Replies in 2 hours",
    excerpt: "We can provide steel sheets. What quantity do you need?",
    timestamp: "New",
    history: [
      { id: 101, text: "Hello, I am interested in your steel sheets as per RFQ #1042. Are they currently in stock at the New York warehouse?", sender: "me", time: "10:00 AM", isFile: false, fileName: "" },
      { id: 102, text: "We can provide steel sheets. What quantity do you need?", sender: "them", time: "10:15 AM", isFile: false, fileName: "" }
    ]
  },
  {
    id: 2,
    sender: "New Jersey Industrial Steel",
    isVerified: false,
    isNew: false,
    tag: "RFQ #1038",
    tagType: "neutral", // gray
    timeEstimate: "Replies in 4 hours",
    excerpt: "Shipping to your location is available.",
    timestamp: "Yesterday",
    history: [
      { id: 201, text: "Do you offer direct shipping to our facility in Brooklyn for the requested industrial steel?", sender: "me", time: "Yesterday, 2:00 PM", isFile: false, fileName: "" },
      { id: 202, text: "Yes, we do. Shipping to your location is available.", sender: "them", time: "Yesterday, 3:30 PM", isFile: false, fileName: "" }
    ]
  },
  {
    id: 3,
    sender: "Global Logistics Partner",
    isVerified: false,
    isNew: false,
    tag: "Sourcing",
    tagType: "primary", // blue
    timeEstimate: "Replies in 1 day",
    excerpt: "Please attach your shipment specifications.",
    timestamp: "Oct 24",
    history: [
      { id: 301, text: "I'm looking for a logistics partner to handle weekly freight forwarding.", sender: "me", time: "Oct 24, 9:00 AM", isFile: false, fileName: "" },
      { id: 302, text: "We'd be happy to help. Please attach your shipment specifications so we can provide a quote.", sender: "them", time: "Oct 24, 11:45 AM", isFile: false, fileName: "" }
    ]
  }
];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("inbox");
  // Set to null initially to show the empty state, until the user clicks a conversation
  const [activeMessage, setActiveMessage] = useState<number | null>(null); 
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState(initialMessagesData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = activeMessage ? messages.find(m => m.id === activeMessage) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.history, activeMessage]);

  const handleSendMessage = () => {
    if (!inputText.trim() || !activeMessage) return;

    const newMsg = {
      id: Date.now(),
      text: inputText,
      sender: "me",
      time: "Just now",
      isFile: false,
      fileName: ""
    };

    setMessages(prev => prev.map(thread => {
      if (thread.id === activeMessage) {
        return {
          ...thread,
          excerpt: inputText,
          timestamp: "Just now",
          isNew: false, // Clear new state if we replied
          history: [...thread.history, newMsg]
        };
      }
      return thread;
    }));
    
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && activeMessage) {
      const file = e.target.files[0];
      const newMsg = {
        id: Date.now(),
        text: `Attached file: ${file.name}`,
        isFile: true,
        fileName: file.name,
        sender: "me",
        time: "Just now"
      };

      setMessages(prev => prev.map(thread => {
        if (thread.id === activeMessage) {
          return {
            ...thread,
            excerpt: `Sent an attachment`,
            timestamp: "Just now",
            isNew: false,
            history: [...thread.history, newMsg]
          };
        }
        return thread;
      }));
      
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

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
            inputText={inputText}
            setInputText={setInputText}
            handleSendMessage={handleSendMessage}
            handleKeyDown={handleKeyDown}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            messagesEndRef={messagesEndRef}
          />
        ) : (
          <MessageEmptyState />
        )}

      </div>
    </div>
  );
}
