"use client";

import React from "react";
import { Search, MapPin, ChevronDown, ArrowRight } from "lucide-react";

export default function SupplierHero() {
  return (
    <div className="bg-[#1b2b3a] w-full pt-16 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">

        {/* Left Text */}
        <div className="w-full md:w-[55%] lg:w-1/2">
          <h1 className="text-4xl md:text-[3.5rem] font-bold text-white mb-6 leading-tight tracking-tight">
            Service Suppliers
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Find professional service suppliers for maintenance, engineering, installation, consulting, repair, and business support needs.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 font-bold rounded shadow-sm transition-colors flex items-center gap-2">
              Request Quote <ArrowRight size={16} />
            </button>
            <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded shadow-sm hover:bg-slate-50 transition-colors">
              Browse Service Suppliers
            </button>
          </div>
        </div>

        {/* Right Floating Card */}
        <div className="w-full md:w-[45%] lg:w-[420px]">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Find Service Suppliers</h2>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search (maintenance, engineering...)"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#dca12f]"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Location (City, State...)"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#dca12f]"
                />
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#dca12f]">
                    <option>Service Type</option>
                    <option>Manufacturing</option>
                    <option>Assembly</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
                <div className="relative flex-1">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#dca12f]">
                    <option>Distance</option>
                    <option>&lt; 50 miles</option>
                    <option>&lt; 100 miles</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2 pb-1 text-sm text-slate-600">
                <input type="checkbox" className="w-4 h-4 rounded text-[#dca12f] focus:ring-[#dca12f] border-slate-300" />
                <span>Negotiable Rate Only</span>
              </label>

              <button className="w-full py-3 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 font-bold rounded-lg shadow-sm transition-colors mt-2">
                Search Suppliers
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
