import { PlusSquare } from "lucide-react";
import Link from "next/link";

export default function MessageEmptyState() {
  return (
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
        Select a conversation to start<br />messaging
      </h2>
      <p className="text-[14px] text-gray-500 text-center max-w-[340px] mb-8 leading-relaxed">
        Choose a message thread from the left to view details, reply to suppliers, or negotiate pricing and terms.
      </p>
      <Link href="/dashboard/search">
        <button className="flex items-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-black font-bold py-2.5 px-6 rounded-md transition-colors text-[13px] cursor-pointer mt-4">
          <PlusSquare size={16} strokeWidth={2.5} />
          Find Suppliers to Message
        </button>
      </Link>
    </div>
  );
}
