"use client";

import React from "react";
import Link from "next/link";
import { Search, MapPin, ChevronDown, BadgeCheck, FileText, ExternalLink, List, Map, X } from "lucide-react";

export default function SuppliersMapPage() {
  return (
    <div className="  max-w-[1600px] mx-auto  flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className=" border-b z-20 shadow-sm shrink-0">
        <div className=" px-4 py-4 sm:px-6 flex flex-col gap-4">
          <h1 className="text-2xl font-black text-[#1b2b3a] tracking-tight">Steel Suppliers Near New York, USA</h1>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg flex items-center px-3 py-2">
              <Search className="text-slate-400 shrink-0" size={16} />
              <input
                type="text"
                defaultValue="Steel Suppliers"
                className="w-full bg-transparent border-none text-sm text-slate-900 focus:outline-none focus:ring-0 px-3 py-1"
              />
            </div>
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg flex items-center px-3 py-2">
              <MapPin className="text-slate-400 shrink-0" size={16} />
              <input
                type="text"
                defaultValue="New York, USA"
                className="w-full bg-transparent border-none text-sm text-slate-900 focus:outline-none focus:ring-0 px-3 py-1"
              />
              <button className="px-6 py-1.5 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 text-sm font-bold rounded shadow-sm transition-colors shrink-0">
                Search
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 -mb-2 text-sm">
            <span className="text-slate-500 font-medium text-[13px] shrink-0">Filters:</span>
            <button className="px-3 py-1.5 bg-blue-50 text-blue-800 font-medium rounded-full whitespace-nowrap flex items-center gap-1 border border-blue-100 hover:bg-blue-100 transition-colors">
              Category: Raw Material <ChevronDown size={14} className="opacity-50" />
            </button>
            <button className="px-3 py-1.5 bg-blue-50 text-blue-800 font-medium rounded-full whitespace-nowrap flex items-center gap-1 border border-blue-100 hover:bg-blue-100 transition-colors">
              Industry: Steel <ChevronDown size={14} className="opacity-50" />
            </button>
            <button className="px-3 py-1.5 bg-blue-50 text-blue-800 font-medium rounded-full whitespace-nowrap flex items-center gap-1 border border-blue-100 hover:bg-blue-100 transition-colors">
              Distance: 25 miles <ChevronDown size={14} className="opacity-50" />
            </button>
            <button className="px-3 py-1.5 bg-blue-50 text-blue-800 font-medium rounded-full whitespace-nowrap flex items-center gap-1 border border-blue-100 hover:bg-blue-100 transition-colors">
              Rate: Any <ChevronDown size={14} className="opacity-50" />
            </button>
            <button className="text-blue-600 font-bold hover:underline shrink-0 text-[13px] ml-2">Clear All</button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full mx-auto flex flex-col md:flex-row p-4 sm:p-8 md:p-20 relative overflow-hidden">

        {/* Left Column (List) */}
        <div className="w-full md:w-[60%] lg:w-[50%] flex flex-col overflow-y-auto px-0 sm:px-2 md:px-6 py-6 border-r-0 md:border-r border-slate-200 custom-scrollbar">

          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-slate-600">2 suppliers found</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Sort by:</span>
                <button className="flex items-center gap-1 font-bold text-slate-700 hover:text-slate-900 border-none bg-transparent">
                  Nearest <ChevronDown size={14} />
                </button>
              </div>
              <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
                <Link href="/suppliers" className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-white hover:shadow-sm transition-all">
                  <List size={16} />
                </Link>
                <div className="p-1.5 rounded bg-white shadow-sm text-[#dca12f]">
                  <Map size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* RFQ Banner */}
          <div className="bg-[#fdf9f0] border border-[#f5e3b5] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-[#f5e3b5] flex items-center justify-center shrink-0">
                <FileText className="text-[#dca12f]" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Need a quote fast?</h3>
                <p className="text-[13px] text-slate-600">Send an RFQ directly to matched suppliers.</p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-[12px] font-bold rounded hover:bg-slate-50 transition-colors shadow-sm">
                Learn About RFQ
              </button>
              <button className="px-4 py-2 bg-[#dca12f] text-slate-900 text-[12px] font-bold rounded hover:bg-[#c99126] transition-colors shadow-sm">
                Send RFQ Now
              </button>
            </div>
          </div>

          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-4 mb-4 hover:border-slate-300 transition-colors">
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Image Placeholder */}
              <div className="w-full sm:w-[160px] h-[110px] rounded bg-gradient-to-tr from-blue-300 to-blue-100 shrink-0"></div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">Steel Company A</h3>
                    <BadgeCheck size={18} className="text-emerald-500" />
                  </div>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 font-bold text-[9px] rounded uppercase tracking-wider">
                    Manufacturing
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><MapPin size={12} /> New York, USA</span>
                  <span className="flex items-center gap-1"><Map size={12} /> 12 miles</span>
                </div>

                <div className="mb-4">
                  <p className="text-[11px] font-medium text-slate-500 mb-1.5 uppercase">Services & Products:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded text-[11px] font-medium">Steel Sheets</span>
                    <span className="px-2 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded text-[11px] font-medium">Pipes</span>
                    <span className="px-2 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded text-[11px] font-medium">Raw Materials</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-4 mt-2 gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 w-full sm:w-auto">
                <span className="w-5 h-5 rounded-full bg-[#fdf9f0] flex items-center justify-center text-[#dca12f]"><span className="text-[10px]">$</span></span>
                Rate: Negotiable
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-5 py-2.5 bg-[#f8fafc] border border-slate-200 text-slate-700 text-[12px] font-bold rounded hover:bg-slate-100 transition-colors shadow-sm flex items-center justify-center gap-1.5">
                  <ExternalLink size={14} /> Website
                </button>
                <button className="flex-1 sm:flex-none px-5 py-2.5 bg-[#dca12f] text-slate-900 text-[12px] font-bold rounded hover:bg-[#c99126] transition-colors shadow-sm">
                  Request Quote
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-4 mb-4 hover:border-slate-300 transition-colors opacity-80">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-[160px] h-[110px] rounded bg-slate-800 shrink-0 relative overflow-hidden">
                {/* Fake image representation for Steel Company B */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&w=300&q=80')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">Steel Company B</h3>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 font-bold text-[9px] rounded uppercase">Listed</span>
                  </div>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 font-bold text-[9px] rounded uppercase tracking-wider">
                    Supplier
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><MapPin size={12} /> New Jersey, USA</span>
                  <span className="flex items-center gap-1"><Map size={12} /> 20 miles</span>
                </div>

                <div className="mb-4">
                  <p className="text-[11px] font-medium text-slate-500 mb-1.5 uppercase">Services & Products:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded text-[11px] font-medium">Industrial Steel</span>
                    <span className="px-2 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded text-[11px] font-medium">Metal Parts</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-4 mt-2 gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 w-full sm:w-auto">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><span className="text-[10px]">$</span></span>
                Rate: Fixed
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-5 py-2.5 bg-[#f8fafc] border border-slate-200 text-slate-700 text-[12px] font-bold rounded hover:bg-slate-100 transition-colors shadow-sm flex items-center justify-center gap-1.5">
                  <ExternalLink size={14} /> Website
                </button>
                <button className="flex-1 sm:flex-none px-5 py-2.5 bg-[#dca12f] text-slate-900 text-[12px] font-bold rounded hover:bg-[#c99126] transition-colors shadow-sm">
                  Request Quote
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Map) */}
        <div className="w-full md:w-[40%] lg:w-[50%] h-[400px] md:h-full bg-slate-100 relative border-t md:border-t-0 border-l-0 md:border-l border-slate-200 overflow-hidden">

          {/* Simulated Map Background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="w-full h-full md:h-[120vh]">

            <img
              src="/assets/demomap.png"
              alt="Map view of New York area"
              className="w-full h-full object-cover"
            />

          </div>

          {/* Map Overlay Controls */}
          <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md flex justify-between items-center z-10 border border-slate-200">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Map View</h4>
              <p className="text-[11px] text-slate-500">Nearby steel suppliers around New York, USA</p>
            </div>
            <button className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors hover:bg-slate-100 rounded">
              <Map size={18} />
            </button>
          </div>

          {/* Map Marker A */}
          <div className="absolute top-1/2 left-[45%] z-20 group cursor-pointer -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 rounded-full bg-[#1b2b3a] border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs group-hover:scale-110 transition-transform relative">
              A
              {/* Pointer triangle */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#1b2b3a]"></div>
            </div>
          </div>

          {/* Map Marker B */}
          <div className="absolute top-[65%] left-[55%] z-20 group cursor-pointer -translate-x-1/2 -translate-y-1/2 opacity-70">
            <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs group-hover:scale-110 transition-transform relative">
              B
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500"></div>
            </div>
          </div>

          {/* Floating Info Window for Marker A */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[320px] bg-white rounded-xl shadow-2xl p-4 z-30 border border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
            <button className="absolute top-3 right-3 text-slate-400 hover:text-slate-700">
              <X size={14} />
            </button>
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="font-bold text-slate-900 text-sm">Steel Company A</h3>
              <BadgeCheck size={14} className="text-emerald-500" />
            </div>
            <p className="text-[11px] text-slate-500 mb-4">New York, USA • 12 miles</p>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 bg-[#f8fafc] border border-slate-200 text-slate-700 text-[11px] font-bold rounded hover:bg-slate-100 transition-colors">
                View Details
              </button>
              <button className="flex-1 py-1.5 bg-[#dca12f] text-slate-900 text-[11px] font-bold rounded hover:bg-[#c99126] transition-colors">
                Request Quote
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
