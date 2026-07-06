"use client";

import { useState, useRef } from "react";
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  PlusSquare,
  Paperclip,
  Send
} from "lucide-react";

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

  const activeChat = activeMessage ? messages.find(m => m.id === activeMessage) : null;

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
        
        {/* Left Sidebar - Message List */}
        <div className="w-full md:w-[380px] bg-white border border-gray-200 rounded-md shadow-sm flex flex-col overflow-hidden h-full">
          
          {/* Tabs */}
          <div className="flex items-center border-b border-gray-200">
            <button 
              onClick={() => setActiveTab("inbox")}
              className={`flex-1 py-4 flex items-center justify-center gap-2 text-[14px] font-bold transition-colors relative cursor-pointer ${
                activeTab === "inbox" ? "text-[#0B172E]" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Inbox
              <span className="bg-[#D92D20] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
              {activeTab === "inbox" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DFB63E]"></div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab("sourcing")}
              className={`flex-1 py-4 flex items-center justify-center gap-2 text-[14px] font-bold transition-colors relative cursor-pointer ${
                activeTab === "sourcing" ? "text-[#0B172E]" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sourcing
              {activeTab === "sourcing" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DFB63E]"></div>
              )}
            </button>
          </div>

          {/* Search & Filter */}
          <div className="p-4 border-b border-gray-200 space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search conversations..."
                className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-[13px] text-black focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E] placeholder-gray-400 bg-gray-50"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-1 text-[12px] font-bold text-gray-700 cursor-pointer">
                All Messages
                <span className="text-[10px] ml-1">▼</span>
              </button>
              <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <Filter size={16} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setActiveMessage(msg.id)}
                className={`w-full text-left p-4 border-b border-gray-100 transition-colors relative cursor-pointer ${
                  activeMessage === msg.id ? "bg-[#F4F7FF]" : "hover:bg-gray-50"
                }`}
              >
                {activeMessage === msg.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#DFB63E]"></div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-[#0B172E]">{msg.sender}</span>
                    {msg.isVerified && (
                      <div className="text-[#DFB63E] bg-[#FEF3C7] rounded-full p-[1px]">
                         <CheckCircle size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <span className={`text-[11px] font-bold ${msg.isNew ? "text-[#DFB63E]" : "text-gray-500"}`}>
                    {msg.timestamp}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                    msg.tagType === "warning" ? "border-[#FDE68A] text-[#D97706] bg-[#FEF3C7]/40" : 
                    msg.tagType === "primary" ? "border-[#BFDBFE] text-[#1E40AF] bg-[#EFF6FF]" : 
                    "border-gray-200 text-gray-600 bg-gray-50"
                  }`}>
                    {msg.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
                    <Clock size={12} />
                    {msg.timeEstimate}
                  </div>
                </div>

                <p className={`text-[12px] leading-snug line-clamp-2 ${msg.isNew && activeMessage !== msg.id ? "font-bold text-[#0B172E]" : "text-gray-500"}`}>
                  {msg.excerpt}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Area */}
        {activeChat ? (
          <div className="flex-1 bg-white border border-gray-200 rounded-md shadow-sm flex flex-col h-full overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center font-bold text-[#3730A3] text-[15px]">
                  {activeChat.sender.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-[16px] font-bold text-[#0B172E] leading-tight">{activeChat.sender}</h2>
                    {activeChat.isVerified && <CheckCircle size={14} className="text-[#DFB63E] fill-[#DFB63E]/20" />}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 text-[11px] text-green-600 font-bold">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                       Online
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">• {activeChat.timeEstimate}</span>
                  </div>
                </div>
              </div>
              <button className="text-[12px] font-bold text-gray-600 hover:text-[#0B172E] bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 rounded-md px-3 py-1.5 cursor-pointer">
                View Profile
              </button>
            </div>

            {/* Chat History Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#F9FAFB] flex flex-col gap-6">
              {/* Added a timestamp divider to make it look realistic */}
              <div className="flex justify-center">
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Conversation Started
                </span>
              </div>
              
              {activeChat.history.map(msg => (
                <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.sender === "me" ? "self-end items-end" : "self-start items-start"}`}>
                  <div className="flex items-end gap-2">
                    {/* Receiver Avatar (only show for them) */}
                    {msg.sender === "them" && (
                      <div className="w-6 h-6 rounded-full bg-[#E0E7FF] flex items-center justify-center font-bold text-[#3730A3] text-[10px] mb-1 flex-shrink-0">
                        {activeChat.sender.charAt(0)}
                      </div>
                    )}
                    
                    {/* Bubble */}
                    <div className={`p-3.5 rounded-2xl text-[13px] shadow-sm leading-relaxed ${
                      msg.sender === "me" 
                        ? "bg-[#0B172E] text-white rounded-br-[4px]" 
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-[4px]"
                    }`}>
                      {msg.isFile ? (
                        <div className="flex items-center gap-2 px-1">
                           <Paperclip size={16} className={msg.sender === "me" ? "text-gray-300" : "text-gray-500"} />
                           <span className="font-bold underline cursor-pointer">{msg.fileName}</span>
                        </div>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                  <span className={`text-[10px] text-gray-400 mt-1.5 font-medium ${msg.sender === "me" ? "mr-1" : "ml-9"}`}>
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-[#0B172E] transition-colors rounded-full hover:bg-gray-100 cursor-pointer flex-shrink-0"
                >
                  <Paperclip size={20} />
                </button>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..." 
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-[14px] text-black focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:bg-white transition-all" 
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-[#DFB63E] hover:bg-[#cba433] text-black p-2.5 rounded-full transition-colors flex items-center justify-center w-10 h-10 shadow-sm cursor-pointer flex-shrink-0"
                >
                  <Send size={16} strokeWidth={2.5} className="mr-0.5 mt-0.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white border border-gray-200 rounded-md shadow-sm flex flex-col items-center justify-center p-8 h-full">
            
            <div className="relative mb-8 mt-10">
              <div className="absolute inset-0 bg-[#EFF6FF] blur-3xl rounded-full w-48 h-48 -ml-16 -mt-16 z-0"></div>
              
              <div className="relative z-10 flex items-center justify-center">
                {/* Dark Blue Base Bubble */}
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#0B172E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform scale-x-[-1]">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                
                {/* Secondary offset line indicating stack */}
                <div className="absolute top-2 -right-2 z-0">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#0B172E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform scale-x-[-1]">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>

                {/* Golden Yellow Top Bubble */}
                <div className="absolute -top-6 -right-6 bg-white p-2 rounded-xl shadow-sm border border-gray-100 z-20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#DFB63E" stroke="#DFB63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  {/* Inner white dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            <h2 className="text-[20px] font-bold text-[#0B172E] mb-3 text-center">
              Select a conversation to start<br/>messaging
            </h2>
            <p className="text-[14px] text-gray-500 text-center max-w-[340px] mb-8 leading-relaxed">
              Choose a message thread from the left to view details, reply to suppliers, or negotiate pricing and terms.
            </p>

            <button className="flex items-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-black font-bold py-2.5 px-6 rounded-md transition-colors text-[13px] cursor-pointer">
              <PlusSquare size={16} strokeWidth={2.5} />
              Start New RFQ
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
