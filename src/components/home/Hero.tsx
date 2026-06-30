"use client";

import React, { useState } from "react";
import { Search, CheckCircle2, ShieldCheck, Globe, Users } from "lucide-react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  const quickLinks = [
    { text: "Free supplier search", icon: CheckCircle2 },
    { text: "Verified supplier directory", icon: ShieldCheck },
    { text: "Suppliers from U.S. and other countries", icon: Globe },
    { text: "Business Matchmaking", icon: Users },
  ];

  return (
    <section className="relative bg-[#162235] text-white py-20 lg:py-28 overflow-hidden">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glow highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          Find Suppliers, Logistics, <br className="hidden sm:inline" />
          and Manufacturing Partners
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          WULFARIA is an online marketplace directory that connects suppliers and
          customers together.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto max-w-3xl mb-8 flex flex-col sm:flex-row gap-2 bg-[#1e2d44]/90 p-2 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-md"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Find suppliers, logistics, manufacturing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-12 pr-4 py-3 text-sm text-white placeholder-slate-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-8 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Quick Link Badges */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-12">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/40 px-4 py-1.5 text-xs text-slate-300 hover:border-yellow-500/50 hover:bg-slate-800/60 transition-all cursor-default"
              >
                <Icon className="h-3.5 w-3.5 text-yellow-500" />
                <span>{link.text}</span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#features"
            className="w-full sm:w-auto rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-8 py-3.5 text-sm font-extrabold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-center"
          >
            Browse Suppliers
          </a>
          <a
            href="#list-company"
            className="w-full sm:w-auto rounded-lg border border-slate-600 text-slate-200 hover:text-white hover:border-yellow-500/80 hover:bg-slate-800/40 px-8 py-3.5 text-sm font-extrabold transition-all text-center"
          >
            List Your Company
          </a>
          <a
            href="#login"
            className="w-full sm:w-auto text-slate-400 hover:text-yellow-500 px-6 py-2.5 text-sm font-bold transition-all text-center"
          >
            Login
          </a>
        </div>
      </div>
    </section>
  );
}
