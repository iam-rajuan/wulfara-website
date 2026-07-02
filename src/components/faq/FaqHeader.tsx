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
    <div className="w-full bg-[#1b2b3a] text-white py-16 sm:py-20 text-center px-4 sm:px-6 lg:px-8 border-b border-b-[#dca12f]/40 relative">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative max-w-3xl mx-auto space-y-4">
        <span className="inline-block text-[10px] tracking-widest text-[#dca12f] font-bold border border-[#dca12f]/30 px-3 py-1 uppercase rounded bg-[#dca12f]/5">
          SUPPORT PORTAL
        </span>
        <h2 className="text-3xl sm:text-[42px] font-bold tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Expert solutions for the modern industrial ecosystem, and technical documentation and platform protocols.
        </p>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch} 
          className="relative max-w-xl mx-auto mt-8 flex items-center bg-white rounded border border-slate-200 shadow-lg p-1"
        >
          <div className="flex-grow flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search knowledge base..."
              className="w-full bg-transparent border-0 outline-none text-slate-800 text-sm placeholder-slate-400 py-2.5"
            />
          </div>
          <button 
            type="submit" 
            className="bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-6 py-2.5 rounded text-xs font-bold transition-all cursor-pointer"
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>
  );
}
