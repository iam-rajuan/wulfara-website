import React from "react";
import { Search } from "lucide-react";

export default function HelpCenterHero() {
  return (
    <div className="bg-[#1b2b3a] py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black tracking-tight text-white mb-8">
        How can we help you?
      </h1>
      
      {/* Search Bar */}
      <div className="w-full max-w-2xl relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-4 py-3.5 bg-white rounded-md text-slate-900 placeholder-slate-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#dca12f] transition-all"
          placeholder="Search help articles, guides, and more..."
        />
      </div>

      {/* Suggested Tags */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="text-[#dca12f] font-bold text-xs uppercase tracking-wider">Suggested:</span>
        <button className="bg-white hover:bg-slate-50 text-slate-800 px-4 py-1.5 rounded-full font-semibold text-xs shadow-sm transition-colors">
          Browse suppliers
        </button>
        <button className="bg-white hover:bg-slate-50 text-slate-800 px-4 py-1.5 rounded-full font-semibold text-xs shadow-sm transition-colors">
          Send RFQ
        </button>
        <button className="bg-white hover:bg-slate-50 text-slate-800 px-4 py-1.5 rounded-full font-semibold text-xs shadow-sm transition-colors">
          Account verification
        </button>
      </div>
    </div>
  );
}
