"use client";

import React from "react";
import { Search } from "lucide-react";

interface FaqHeaderProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export default function FaqHeader({
  searchInput,
  setSearchInput,
  handleSearch
}: FaqHeaderProps) {
  return (
    <div className="w-full bg-[#1b2b3a] text-white py-20 text-center px-4 sm:px-6 lg:px-8 border-b border-[#dca12f]/30 relative">
      <div className="relative max-w-3xl mx-auto space-y-5">
        {/* Support Portal Badge */}
        <span className="inline-block text-[10px] tracking-widest text-[#dca12f] font-bold border border-[#dca12f]/40 px-4 py-1.5 uppercase bg-transparent">
          SUPPORT PORTAL
        </span>

        {/* Title */}
        <h2 className="text-3xl sm:text-[45px] font-extrabold tracking-tight text-white mb-4 mt-2">
          Frequently Asked Questions
        </h2>

        {/* Subtitle with exact mockup typo copy */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Expert solutions for the modern industrial ecosystem. aind technical documentation and platform protocols.
        </p>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch} 
          className="relative max-w-3xl mx-auto mt-8 flex items-center bg-white rounded-[4px] border border-slate-200 shadow-md p-1"
        >
          <div className="flex-grow flex items-center pl-4">
            <Search className="h-5 w-5 text-slate-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search knowledge base..."
              className="w-full bg-transparent border-0 outline-none text-slate-800 text-sm placeholder-slate-400 py-3"
            />
          </div>
          <button 
            type="submit" 
            className="bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-8 py-3 rounded-[2px] text-xs font-bold uppercase transition-all tracking-wider cursor-pointer"
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>
  );
}
