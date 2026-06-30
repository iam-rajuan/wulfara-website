"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal, CheckCircle2, Compass, Building2 } from "lucide-react";
import Image from "next/image";
import heroBg from "@/app/images/hero-bg.png";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  const quickLinks = [
    { text: "Free supplier search" },
    { text: "Request quotes directly" },
    { text: "Suppliers from U.S. and other countries" },
    { text: "Business matchmaking" },
  ];

  return (
    <section className="relative h-[699px] flex items-center bg-[#101c2a] text-white overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Warehouse Interior Background"
          fill
          className="object-cover opacity-25"
          priority
        />
        {/* Navy/slate dark overlay tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#101c2a]/95 via-[#101c2a]/85 to-[#101c2a]/95"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Main Title */}
        <h1
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-4xl sm:text-6xl md:text-[72px] font-extrabold tracking-[-1.8px] text-white mb-6 leading-tight md:leading-[72px] text-center max-w-4xl mx-auto"
        >
          Find Suppliers, Logistics, <br />
          and Manufacturing Partners
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          WULFARA is an online marketplace directory that connects suppliers and
          customers together.
        </p>

        {/* Search Bar Container */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-4xl mb-8 flex items-center bg-white p-2 rounded shadow-2xl border border-slate-200/80"
        >
          <div className="relative flex-grow flex items-center">
            <Search className="h-5 w-5 text-slate-400 ml-3 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Find suppliers, logistics, manufacturing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
            {/* Filter Slider Settings Icon */}
            <SlidersHorizontal className="h-5 w-5 text-slate-400 mx-3 cursor-pointer hover:text-slate-600 flex-shrink-0" />
          </div>
          <button
            type="submit"
            className="rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-8 py-3.5 text-sm font-bold shadow-md transition-all cursor-pointer flex-shrink-0"
          >
            Search
          </button>
        </form>

        {/* Quick Link White Cards */}
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-5xl mx-auto mb-12">
          {quickLinks.map((link, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded bg-white px-4 py-2.5 text-xs sm:text-[13px] font-semibold text-slate-700 shadow-sm border border-slate-200/80 cursor-default hover:bg-slate-50 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4 text-[#dca12f] flex-shrink-0" />
              <span>{link.text}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Browse Suppliers Button */}
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-8 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Compass className="h-4 w-4 text-slate-950" />
            <span>Browse Suppliers</span>
          </a>

          {/* List Your Company Button */}
          <a
            href="#list-company"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded border border-[#dca12f] bg-transparent hover:bg-slate-800/20 text-[#dca12f] px-8 py-3.5 text-sm font-bold transition-all"
          >
            <Building2 className="h-4 w-4 text-[#dca12f]" />
            <span>List Your Company</span>
          </a>

          {/* Login Button */}
          <a
            href="#login"
            className="w-full sm:w-auto flex items-center justify-center rounded border border-slate-600 hover:border-slate-400 bg-transparent text-white px-10 py-3.5 text-sm font-bold transition-all hover:bg-slate-800/30 text-center"
          >
            Login
          </a>
        </div>
      </div>
    </section>
  );
}
