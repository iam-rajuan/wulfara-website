"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Building2,
  Factory,
  Droplet,
  Tractor,
  TreePine,
  FileText
} from "lucide-react";

export default function RawMaterialsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/categories" className="hover:text-slate-900 transition-colors">Categories</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900">Raw Material Suppliers</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-sm">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=2000&auto=format&fit=crop"
              alt="Raw Materials Background"
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b2b3a]/95 via-[#1b2b3a]/80 to-[#1b2b3a]/60"></div>
          </div>

          <div className="relative z-10 p-10 md:p-16 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Raw Material Suppliers
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed font-light max-w-2xl">
              Find vetted raw material suppliers for steel, oil and gas, forestry and lumber, cotton farming, rubber, and other industrial sourcing needs.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-[#DFB63E] hover:bg-[#cba433] text-slate-900 font-bold px-8 py-3 rounded text-sm transition-colors shadow-sm">
                Find Suppliers
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-900 font-bold px-8 py-3 rounded text-sm transition-colors shadow-sm">
                Post an RFQ
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left Column: How it works */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-8">How it works</h2>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">

                {/* Step 1 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 mt-1 w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center border-4 border-white shadow-sm z-10"></div>
                  <div className="pl-10">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">1. Choose Industry</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Select the specific raw material category you need to source.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 mt-1 w-6 h-6 rounded-full bg-[#DBEAFE] flex items-center justify-center border-4 border-white shadow-sm z-10"></div>
                  <div className="pl-10">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">2. Find Suppliers</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Filter and compare verified B2B suppliers matching your criteria.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 mt-1 w-6 h-6 rounded-full bg-[#DBEAFE] flex items-center justify-center border-4 border-white shadow-sm z-10"></div>
                  <div className="pl-10">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">3. Request Quote</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Send direct inquiries or formalized RFQs to selected vendors.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute left-0 mt-1 w-6 h-6 rounded-full bg-[#DBEAFE] flex items-center justify-center border-4 border-white shadow-sm z-10"></div>
                  <div className="pl-10">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">4. Supplier Responds</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Receive competitive bids and negotiate terms directly.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-3">

            {/* Choose Industry */}
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6 tracking-tight">Choose Raw Material Industry</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

              {/* Card 1: Active */}
              <div className="bg-white border-2 border-[#DFB63E] rounded-xl p-4 relative cursor-pointer shadow-sm">
                <div className="absolute top-0 right-0 bg-[#DFB63E] text-white p-0.5 rounded-bl-lg rounded-tr-lg">
                  <CheckCircle2 size={14} className="fill-white text-[#DFB63E]" />
                </div>
                <Factory className="text-[#DFB63E] mb-3" size={24} />
                <h3 className="text-sm font-bold text-slate-900 mb-1">Steel Industry</h3>
                <p className="text-[11px] text-slate-500 leading-tight">Ingots, billets, sheets, and...</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-200 hover:border-[#DFB63E]/50 rounded-xl p-4 cursor-pointer transition-colors shadow-sm">
                <div className="mb-3 w-6 h-6 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><rect width="16" height="16" x="4" y="4" rx="2" /><path d="M4 12h16" /><path d="M12 4v16" /><path d="M8 8h.01" /><path d="M16 8h.01" /><path d="M8 16h.01" /><path d="M16 16h.01" /></svg>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Oil & Gas</h3>
                <p className="text-[11px] text-slate-500 leading-tight">Crude, refined products, and...</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-200 hover:border-[#DFB63E]/50 rounded-xl p-4 cursor-pointer transition-colors shadow-sm">
                <TreePine className="text-slate-600 mb-3" size={24} />
                <h3 className="text-sm font-bold text-slate-900 mb-1">Forestry & Lumber</h3>
                <p className="text-[11px] text-slate-500 leading-tight">Raw timber, plywood, and...</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-slate-200 hover:border-[#DFB63E]/50 rounded-xl p-4 cursor-pointer transition-colors shadow-sm">
                <Tractor className="text-slate-600 mb-3" size={24} />
                <h3 className="text-sm font-bold text-slate-900 mb-1">Cotton Farming</h3>
                <p className="text-[11px] text-slate-500 leading-tight">Raw cotton bales, seeds, and lint.</p>
              </div>

              {/* Card 5 */}
              <div className="bg-white border border-slate-200 hover:border-[#DFB63E]/50 rounded-xl p-4 cursor-pointer transition-colors shadow-sm">
                <Droplet className="text-slate-600 mb-3" size={24} />
                <h3 className="text-sm font-bold text-slate-900 mb-1">Rubber</h3>
                <p className="text-[11px] text-slate-500 leading-tight">Natural latex and synthetic rubber.</p>
              </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col md:flex-row items-center gap-3 mb-10 shadow-sm">
              <div className="flex-1 relative w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search specifically within Steel..."
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#DFB63E] focus:ring-1 focus:ring-[#DFB63E]"
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-40">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select className="w-full pl-8 pr-8 py-2 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#DFB63E] bg-white text-slate-600">
                    <option>Any Location</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative flex-1 md:w-32">
                  <select className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#DFB63E] bg-white text-slate-600">
                    <option>Distance</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative flex-1 md:w-36">
                  <select className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#DFB63E] bg-white text-slate-600">
                    <option>Supplier Type</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Recommended Suppliers */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Recommended Steel Suppliers</h2>
              <a href="#" className="text-sm font-bold text-[#3B82F6] flex items-center gap-1 hover:underline">
                View All <ChevronRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Supplier 1 */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#EFF6FF] text-[#3B82F6] rounded-lg flex items-center justify-center">
                    <Factory size={20} />
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1">Atlas Heavy Steel Co.</h3>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-4">
                  <MapPin size={12} /> Ruhr Valley, DE &bull; 240 km
                </div>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Type:</span>
                    <span className="font-semibold text-slate-900">Manufacturer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avg. Response:</span>
                    <span className="font-semibold text-[#10B981]">~2 Hours</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-6">
                  <span className="bg-[#F1F5F9] text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">Rolled Steel</span>
                  <span className="bg-[#F1F5F9] text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">Alloys</span>
                  <span className="bg-[#F1F5F9] text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">Billet</span>
                </div>

                <div className="mt-auto space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-slate-900 text-xs font-bold py-2 rounded transition-colors">
                    <FileText size={14} /> Send RFQ
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border border-[#DFB63E] text-[#DFB63E] hover:bg-[#DFB63E]/5 text-xs font-bold py-2 rounded transition-colors">Quote</button>
                    <button className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold py-2 rounded transition-colors">Profile</button>
                  </div>
                </div>
              </div>

              {/* Supplier 2 */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#EFF6FF] text-[#3B82F6] rounded-lg flex items-center justify-center">
                    <Building2 size={20} />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1">Nordic Metals Group</h3>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-4">
                  <MapPin size={12} /> Gothenburg, SE &bull; 850 km
                </div>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Type:</span>
                    <span className="font-semibold text-slate-900">Distributor</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avg. Response:</span>
                    <span className="font-semibold text-slate-900">~12 Hours</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-6">
                  <span className="bg-[#F1F5F9] text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">Sheet Metal</span>
                  <span className="bg-[#F1F5F9] text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">Recycled</span>
                </div>

                <div className="mt-auto space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-slate-900 text-xs font-bold py-2 rounded transition-colors">
                    <FileText size={14} /> Send RFQ
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border border-[#DFB63E] text-[#DFB63E] hover:bg-[#DFB63E]/5 text-xs font-bold py-2 rounded transition-colors">Quote</button>
                    <button className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold py-2 rounded transition-colors">Profile</button>
                  </div>
                </div>
              </div>

              {/* Supplier 3 */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#EFF6FF] text-[#3B82F6] rounded-lg flex items-center justify-center">
                    <WarehouseIcon size={20} />
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1">IronWorks Global</h3>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-4">
                  <MapPin size={12} /> Chicago, USA &bull; Intl
                </div>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Type:</span>
                    <span className="font-semibold text-slate-900">Wholesaler</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avg. Response:</span>
                    <span className="font-semibold text-[#10B981]">~1 Hour</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-6">
                  <span className="bg-[#F1F5F9] text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">Structural</span>
                  <span className="bg-[#F1F5F9] text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">Piping</span>
                  <span className="bg-[#F1F5F9] text-slate-600 text-[10px] font-semibold px-2 py-1 rounded">Heavy Duty</span>
                </div>

                <div className="mt-auto space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-slate-900 text-xs font-bold py-2 rounded transition-colors">
                    <FileText size={14} /> Send RFQ
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border border-[#DFB63E] text-[#DFB63E] hover:bg-[#DFB63E]/5 text-xs font-bold py-2 rounded transition-colors">Quote</button>
                    <button className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold py-2 rounded transition-colors">Profile</button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
// Simple custom warehouse icon since it's missing in basic lucide sets sometimes
function WarehouseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 2.8 6.7l9-5.4a2 2 0 0 1 2.4 0l9 5.4A2 2 0 0 1 22 8.35Z" />
      <path d="M6 18h12" />
      <path d="M6 14h12" />
      <rect width="12" height="12" x="6" y="10" />
    </svg>
  );
}
