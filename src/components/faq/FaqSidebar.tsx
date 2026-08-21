"use client";
import { ChevronRight, MessageSquare, Building, Mail } from "lucide-react";
import Link from "next/link";

interface FaqSidebarProps {
  topics: string[];
  activeTopic: string;
  searchQuery: string;
  handleTopicClick: (topic: string) => void;
}

export default function FaqSidebar({
  topics,
  activeTopic,
  searchQuery,
  handleTopicClick
}: FaqSidebarProps) {
  return (
    <div className="lg:col-span-4 space-y-6">
      {/* Topics Selector Card */}
      <div className="bg-white border border-[#e5e5e8] rounded-sm p-6">
        <h3 className="text-sm font-semibold text-slate-800 uppercase mb-5 flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#dca12f]"></span> Topics
        </h3>
        <div className="flex flex-col">
          {topics.map((topic, index) => {
            const isActive = !searchQuery && activeTopic === topic;
            return isActive ? (
              <button
                key={index}
                onClick={() => handleTopicClick(topic)}
                className="w-full text-left flex items-center justify-between bg-[#dca12f] hover:bg-[#c99126] text-slate-950 font-bold px-4 py-3 text-xs transition-all cursor-pointer tracking-wider uppercase"
              >
                <span>{topic}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                key={index}
                onClick={() => handleTopicClick(topic)}
                className="w-full text-left text-slate-700 hover:text-slate-900 hover:bg-slate-50/50 font-medium px-4 py-3.5 text-sm transition-all cursor-pointer"
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>
      {/* Direct Inquiry Card */}
      <div className="bg-white border border-[#e5e5e8] rounded-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[#dca12f]" /> Direct Inquiry
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Our elite support division is available 24/7 for mission-critical assistance.
        </p>
        <div className="flex flex-col gap-3 pt-2">
          <Link href="/help-center" className="flex items-center gap-2.5 text-xs font-semibold text-[#dca12f] hover:text-[#c99126] transition-colors">
            <Building className="h-4 w-4 text-[#dca12f]" /> Visit Help Center
          </Link>
          <Link href="/help-center" className="flex items-center gap-2.5 text-xs font-semibold text-[#dca12f] hover:text-[#c99126] transition-colors">
            <Mail className="h-4 w-4 text-[#dca12f]" /> Secure Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
