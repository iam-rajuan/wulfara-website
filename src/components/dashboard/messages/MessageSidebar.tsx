import { Search, Filter, CheckCircle, Clock } from "lucide-react";

export default function MessageSidebar({
  messages,
  activeTab,
  setActiveTab,
  activeMessage,
  setActiveMessage
}: any) {
  return (
    <div className="w-full md:w-[380px] bg-white border border-gray-200 rounded-md shadow-sm flex flex-col overflow-hidden h-full">
      {/* Tabs */}
      <div className="flex items-center border-b border-gray-200">
        <button
          onClick={() => setActiveTab("inbox")}
          className={`flex-1 py-4 flex items-center justify-center gap-2 text-[14px] font-bold transition-colors relative cursor-pointer ${activeTab === "inbox" ? "text-[#0B172E]" : "text-gray-500 hover:text-gray-700"
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
          className={`flex-1 py-4 flex items-center justify-center gap-2 text-[14px] font-bold transition-colors relative cursor-pointer ${activeTab === "sourcing" ? "text-[#0B172E]" : "text-gray-500 hover:text-gray-700"
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
        {messages.map((msg: any) => (
          <button
            key={msg.id}
            onClick={() => setActiveMessage(msg.id)}
            className={`w-full text-left p-4 border-b border-gray-100 transition-colors relative cursor-pointer ${activeMessage === msg.id ? "bg-[#F4F7FF]" : "hover:bg-gray-50"
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
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${msg.tagType === "warning" ? "border-[#FDE68A] text-[#D97706] bg-[#FEF3C7]/40" :
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
  );
}
