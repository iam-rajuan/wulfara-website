import { CheckCircle, Paperclip, Send } from "lucide-react";

export default function MessageChat({
  activeChat,
  inputText,
  setInputText,
  handleSendMessage,
  handleKeyDown,
  handleFileChange,
  fileInputRef,
  messagesEndRef
}: any) {
  return (
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

        {activeChat.history.map((msg: any) => (
          <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.sender === "me" ? "self-end items-end" : "self-start items-start"}`}>
            <div className="flex items-end gap-2">
              {/* Receiver Avatar (only show for them) */}
              {msg.sender === "them" && (
                <div className="w-6 h-6 rounded-full bg-[#E0E7FF] flex items-center justify-center font-bold text-[#3730A3] text-[10px] mb-1 flex-shrink-0">
                  {activeChat.sender.charAt(0)}
                </div>
              )}

              {/* Bubble */}
              <div className={`p-3.5 rounded-2xl text-[13px] shadow-sm leading-relaxed ${msg.sender === "me"
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
        <div ref={messagesEndRef} />
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
  );
}
