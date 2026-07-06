"use client";

import React from "react";
import { Search, MapPin, ExternalLink, X, SlidersHorizontal, Maximize2, Map as MapIcon, CheckCircle2, Navigation } from "lucide-react";
import Link from "next/link";

export default function SearchScreen() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <span className="hover:text-slate-900 cursor-pointer">Search</span>
          <span>/</span>
          <span className="font-semibold text-slate-900">Steel Suppliers</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Search Results for &quot;steel suppliers&quot;</h1>
        <p className="text-slate-500 mb-8">Find steel suppliers, manufacturers, and industrial service providers near your location.</p>

        {/* Main Search Input */}
        <div className="flex bg-white rounded-lg border border-slate-300 overflow-hidden shadow-sm mb-4 max-w-3xl">
          <div className="flex items-center pl-4 pr-2 text-slate-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            defaultValue="steel suppliers" 
            className="flex-1 py-3 focus:outline-none text-slate-700 font-medium" 
          />
          <button className="bg-[#DFB63E] hover:bg-[#cba433] transition-colors text-slate-900 font-bold px-8 py-3">
            Search
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-3 mb-8">
          <button className="p-2 border border-slate-300 rounded-md bg-white text-slate-600 hover:bg-slate-50">
            <SlidersHorizontal size={18} />
          </button>
          <div className="flex flex-wrap gap-2">
            {['Steel Industry', 'Verified Suppliers', 'Negotiable Rate', 'Within 25 miles', 'Premium Listings'].map(tag => (
              <span key={tag} className="flex items-center gap-1.5 bg-[#E2E8F0] text-[#334155] px-3 py-1.5 rounded-full text-sm font-medium">
                {tag} <X size={14} className="cursor-pointer hover:text-slate-800" />
              </span>
            ))}
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button className="text-sm font-semibold text-[#2563EB] hover:underline">Clear All</button>
              </div>

              {/* Supplier Category */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Supplier Category</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#0F172A] rounded border-slate-300 focus:ring-[#0F172A]" />
                    <span className="text-sm text-slate-600">Manufacturer (12)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#0F172A] rounded border-slate-300 focus:ring-[#0F172A]" />
                    <span className="text-sm text-slate-600">Distributor (8)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-[#0F172A] rounded border-slate-300 focus:ring-[#0F172A]" />
                    <span className="text-sm text-slate-600">Service Provider (4)</span>
                  </label>
                </div>
              </div>

              <hr className="border-slate-200 my-4" />

              {/* Location */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Location</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">City/State</label>
                    <input type="text" placeholder="e.g. New York, NY" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#DFB63E] focus:ring-1 focus:ring-[#DFB63E]" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">ZIP Code</label>
                    <input type="text" placeholder="e.g. 10001" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#DFB63E] focus:ring-1 focus:ring-[#DFB63E]" />
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 bg-[#DFB63E] hover:bg-[#cba433] text-slate-900 font-bold rounded-md transition-colors text-sm">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Middle Column: Results */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-slate-900">24 suppliers found</span>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Sort by:</span>
                <select className="border border-slate-300 rounded-md px-2 py-1 text-slate-900 font-medium focus:outline-none bg-white">
                  <option>Recommended</option>
                  <option>Distance</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {/* Card 1 */}
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">Steel Company A</h3>
                    <CheckCircle2 size={18} className="text-[#10B981] fill-[#10B981]/10" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold px-2 py-1 rounded">Premium</span>
                    <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold px-2 py-1 rounded">Negotiable</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
                  <MapPin size={14} />
                  <span>New York, NY • 12 miles</span>
                </div>

                <div className="mb-4 space-y-1">
                  <p className="text-sm"><span className="font-semibold text-slate-700">Services:</span> <span className="text-slate-900 font-medium">Steel sheets, pipes.</span></p>
                  <p className="text-sm"><span className="text-slate-500">Response Time: Typically within 2h</span></p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {['Steel sheets', 'Pipes', 'Manufacturing'].map(pill => (
                    <span key={pill} className="bg-[#E2E8F0] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 font-bold text-sm rounded hover:bg-slate-50 transition-colors">
                    <ExternalLink size={14} /> Visit Website
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#DFB63E] hover:bg-[#cba433] text-slate-900 font-bold text-sm rounded transition-colors">
                    <Navigation size={14} className="rotate-45" /> Send RFQ
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">Steel Company B</h3>
                    <CheckCircle2 size={18} className="text-[#10B981] fill-[#10B981]/10" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold px-2 py-1 rounded">Pro</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
                  <MapPin size={14} />
                  <span>New Jersey • 20 miles</span>
                </div>

                <div className="mb-4 space-y-1">
                  <p className="text-sm"><span className="font-semibold text-slate-700">Services:</span> <span className="text-slate-900 font-medium">Industrial steel, metal parts.</span></p>
                  <p className="text-sm"><span className="text-slate-500">Response Time: Typically within 4h</span></p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {['Industrial steel', 'Metal parts', 'Supplier'].map(pill => (
                    <span key={pill} className="bg-[#E2E8F0] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 font-bold text-sm rounded hover:bg-slate-50 transition-colors">
                    <ExternalLink size={14} /> Visit Website
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#DFB63E] hover:bg-[#cba433] text-slate-900 font-bold text-sm rounded transition-colors">
                    <Navigation size={14} className="rotate-45" /> Send RFQ
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col h-[600px] sticky top-24">
              <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <MapIcon size={16} />
                  Nearby Suppliers Map
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <Maximize2 size={16} />
                </button>
              </div>
              <div className="flex-1 bg-slate-100 relative">
                {/* Map Placeholder Image */}
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" 
                  alt="Map" 
                  className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                />
                
                {/* Simulated map pins */}
                <div className="absolute top-1/4 left-1/3 p-1 bg-white rounded-full shadow-lg">
                  <CheckCircle2 size={16} className="text-[#10B981] fill-[#10B981]/20" />
                </div>
                <div className="absolute top-1/2 left-2/3 p-1 bg-white rounded-full shadow-lg">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
