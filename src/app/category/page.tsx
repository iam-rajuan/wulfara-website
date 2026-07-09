"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Wrench, Flame, TreePine, Leaf, Droplets,
  Search, MapPin, Building2, BadgeCheck, Clock,
  ArrowRight, Factory, Box, Store
} from "lucide-react";

export default function CategoryPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("Steel Industry");

  const industries = [
    { name: "Steel Industry", icon: <Wrench size={20} />, desc: "Ingots, billets, sheets, and..." },
    { name: "Oil & Gas", icon: <Flame size={20} />, desc: "Crude, refined products, and..." },
    { name: "Forestry & Lumber", icon: <TreePine size={20} />, desc: "Raw timber, plywood, and..." },
    { name: "Cotton Farming", icon: <Leaf size={20} />, desc: "Raw cotton bales, seeds, and lint." },
    { name: "Rubber", icon: <Droplets size={20} />, desc: "Natural latex and synthetic rubber." },
  ];

  const suppliers = [
    {
      name: "Atlas Heavy Steel Co.",
      location: "Ruhr Valley, DE • 240 km",
      type: "Manufacturer",
      icon: <Factory size={20} />,
      response: "~2 Hours",
      tags: ["Rolled Steel", "Alloys", "Billet"]
    },
    {
      name: "Nordic Metals Group",
      location: "Gothenburg, SE • 850 km",
      type: "Distributor",
      icon: <Box size={20} />,
      response: "~12 Hours",
      tags: ["Sheet Metal", "Recycled"]
    },
    {
      name: "IronWorks Global",
      location: "Chicago, USA • Intl",
      type: "Wholesaler",
      icon: <Store size={20} />,
      response: "~1 Hour",
      tags: ["Structural", "Piping", "Heavy Duty"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative w-full h-[320px] md:h-[400px] flex items-center rounded-2xl overflow-hidden shadow-sm">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/assets/Raw_Material.png" 
              alt="Raw Material Suppliers" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#162235]/80"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full px-8 md:px-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Raw Material Suppliers
            </h1>
            <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed">
              Find vetted raw material suppliers for steel, oil and gas, forestry and lumber, cotton farming, rubber, and other industrial sourcing needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/suppliers" className="inline-block px-6 py-3 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 font-bold rounded shadow-sm transition-colors text-center">
                Find Suppliers
              </Link>
              <button className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded shadow-sm transition-colors">
                Post an RFQ
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar - How it works */}
          <div className="w-full lg:w-1/4 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-6">How it works</h2>
              
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-6 w-0.5 bg-slate-100"></div>

                {/* Steps */}
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white flex-shrink-0 mt-0.5 shadow-sm"></div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1">1. Choose Industry</h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed">Select the specific raw material category you need to source.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 border-4 border-white flex-shrink-0 mt-0.5"></div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-700 mb-1">2. Find Suppliers</h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed">Filter and compare verified B2B suppliers matching your criteria.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 border-4 border-white flex-shrink-0 mt-0.5"></div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-700 mb-1">3. Request Quote</h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed">Send direct inquiries or formalized RFQs to selected vendors.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 border-4 border-white flex-shrink-0 mt-0.5"></div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-700 mb-1">4. Supplier Responds</h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed">Receive competitive bids and negotiate terms directly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full lg:w-3/4 space-y-8">
            
            {/* Choose Industry */}
            <div>
              <h2 className="text-2xl font-bold text-[#162235] mb-6">Choose Raw Material Industry</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {industries.map((ind) => (
                  <div 
                    key={ind.name}
                    onClick={() => setSelectedIndustry(ind.name)}
                    className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedIndustry === ind.name 
                        ? 'border-[#dca12f] bg-[#fffbf2] shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {selectedIndustry === ind.name && (
                      <div className="absolute -top-px -right-px w-6 h-6 bg-[#dca12f] text-white rounded-bl-lg rounded-tr-xl flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className={`mb-3 ${selectedIndustry === ind.name ? 'text-[#dca12f]' : 'text-slate-500'}`}>
                      {ind.icon}
                    </div>
                    <h3 className="text-[13px] font-bold text-slate-900 mb-1 leading-tight">{ind.name}</h3>
                    <p className="text-[11px] text-slate-500 leading-snug">{ind.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search specifically within Steel..." 
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#dca12f]"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 min-w-[140px] focus:outline-none focus:border-[#dca12f] appearance-none">
                  <option>Any Location</option>
                  <option>Europe</option>
                  <option>North America</option>
                </select>
                <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 min-w-[120px] focus:outline-none focus:border-[#dca12f] appearance-none">
                  <option>Distance</option>
                  <option>&lt; 100 km</option>
                  <option>&lt; 500 km</option>
                </select>
                <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 min-w-[140px] focus:outline-none focus:border-[#dca12f] appearance-none">
                  <option>Supplier Type</option>
                  <option>Manufacturer</option>
                  <option>Distributor</option>
                </select>
              </div>
            </div>

            {/* Recommended Suppliers */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#162235]">Recommended {selectedIndustry} Suppliers</h2>
                <Link href="#" className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800">
                  View All <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {suppliers.map((sup, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                    <div className="p-5 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#f0f4f8] text-slate-600 flex items-center justify-center">
                          {sup.icon}
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold">
                          <BadgeCheck size={12} /> Verified
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-slate-900 mb-1">{sup.name}</h3>
                      <p className="text-[12px] text-slate-500 flex items-center gap-1 mb-4">
                        <MapPin size={12} /> {sup.location}
                      </p>

                      <div className="space-y-2 mb-5">
                        <div className="flex justify-between text-[12px]">
                          <span className="text-slate-500">Type:</span>
                          <span className="font-bold text-slate-900">{sup.type}</span>
                        </div>
                        <div className="flex justify-between text-[12px]">
                          <span className="text-slate-500">Avg. Response:</span>
                          <span className="font-bold text-emerald-600">{sup.response}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {sup.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
                      <button className="w-full py-2 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 text-[13px] font-bold rounded transition-colors flex items-center justify-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Send RFQ
                      </button>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-[#dca12f] text-[13px] font-bold rounded transition-colors">
                          Quote
                        </button>
                        <button className="flex-1 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[13px] font-bold rounded transition-colors">
                          Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
