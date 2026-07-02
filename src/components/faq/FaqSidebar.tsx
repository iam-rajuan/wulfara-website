"use client";
import { ChevronRight, MessageSquare, Building, Mail } from "lucide-react";

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
      <div className="bg-white border border-slate-200/80 rounded p-6 shadow-sm">
        <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#dca12f] rounded-full"></span> Topics
        </h3>
        <div className="flex flex-col gap-1.5">
          {topics.map((topic, index) => {
            const isActive = !searchQuery && activeTopic === topic;
            return isActive ? (
              <button
                key={index}
                onClick={() => handleTopicClick(topic)}
                className="w-full text-left flex items-center justify-between bg-[#dca12f] hover:bg-[#c99126] text-slate-950 font-bold px-4 py-3 rounded text-xs transition-all cursor-pointer"
              >
                <span>{topic.toUpperCase()}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                key={index}
                onClick={() => handleTopicClick(topic)}
                className="w-full text-left text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium px-4 py-3 rounded text-xs transition-all cursor-pointer border border-transparent"
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Direct Inquiry Card */}
      <div className="bg-white border border-slate-200/80 rounded p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[#dca12f]" /> Direct Inquiry
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Our elite support division is available 24/7 for mission-critical assistance.
        </p>
        <div className="flex flex-col gap-3 pt-2">
          <a href="#help" className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-[#dca12f] transition-colors">
            <Building className="h-4 w-4 text-[#dca12f]/80" /> Visit Help Center
          </a>
          <a href="#contact" className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-[#dca12f] transition-colors">
            <Mail className="h-4 w-4 text-[#dca12f]/80" /> Secure Contact
          </a>
        </div>
      </div>
    </div>
  );
}
