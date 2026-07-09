"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronDown, Map, ChevronLeft, ChevronRight } from "lucide-react";
import SupplierHero from "@/components/suppliers/SupplierHero";
import ServiceTypeGrid from "@/components/suppliers/ServiceTypeGrid";
import SupplierFilters from "@/components/suppliers/SupplierFilters";
import SupplierCard, { SupplierData } from "@/components/suppliers/SupplierCard";

// Extensive mock data for pagination and filtering
const MOCK_SUPPLIERS: SupplierData[] = [
  {
    id: 1, name: "Precision Manufacturing Group", verified: true, location: "Detroit, MI", distance: "18 miles away",
    response: "Response: <1 day", rating: 4.8, reviews: 45, desc: "Specializing in high-volume contract manufacturing for automotive and aerospace sectors. ISO 9001 certified with advanced CNC machining capabilities.",
    tags: ["Contract Mfg", "CNC Machining"], certifications: ["ISO 9001"], companySize: "Large (201+)"
  },
  {
    id: 2, name: "Northline Assembly Solutions", verified: true, location: "Cleveland, OH", distance: "42 miles away",
    response: "Response: <1 day", rating: 4.9, reviews: 112, desc: "Turnkey electronics and mechanical assembly services. We handle everything from component sourcing to final product testing and packaging.",
    tags: ["Assembly", "Electronics"], certifications: ["ISO 9001"], companySize: "Medium (51-250)"
  },
  {
    id: 3, name: "CustomFab Industrial", verified: false, location: "Pittsburgh, PA", distance: "75 miles away",
    response: "Response: ~ 48h", rating: 4.5, reviews: 31, desc: "Custom sheet metal fabrication, precision welding, and structural component manufacturing for heavy industry.",
    tags: ["Fabrication"], certifications: [], companySize: "Small (1-50)"
  },
  {
    id: 4, name: "Apex Dynamics Corp", verified: true, location: "Chicago, IL", distance: "110 miles away",
    response: "Response: <2 hrs", rating: 4.7, reviews: 89, desc: "Advanced robotics and automation assembly. ISO 9001 and AS9100 certified for aerospace components.",
    tags: ["Assembly", "Robotics"], certifications: ["ISO 9001", "AS9100"], companySize: "Large (201+)"
  },
  {
    id: 5, name: "SteelWorks Pro", verified: true, location: "Gary, IN", distance: "95 miles away",
    response: "Response: <1 day", rating: 4.6, reviews: 204, desc: "Heavy duty steel fabrication and large scale contract manufacturing.",
    tags: ["Fabrication", "Contract Mfg"], certifications: ["ITAR Registered"], companySize: "Medium (51-250)"
  },
  {
    id: 6, name: "Quantum Machining", verified: false, location: "Toledo, OH", distance: "35 miles away",
    response: "Response: ~ 24h", rating: 4.4, reviews: 18, desc: "Precision 5-axis CNC machining and rapid prototyping services.",
    tags: ["CNC Machining", "Prototyping"], certifications: ["AS9100"], companySize: "Small (1-50)"
  },
  {
    id: 7, name: "Global Circuits Inc", verified: true, location: "Ann Arbor, MI", distance: "25 miles away",
    response: "Response: <4 hrs", rating: 4.9, reviews: 310, desc: "PCB fabrication and full box-build assembly services for medical and defense.",
    tags: ["Electronics", "Assembly"], certifications: ["ISO 9001", "ITAR Registered"], companySize: "Large (201+)"
  }
];

export default function ServiceSuppliersPage() {
  const [activeFilters, setActiveFilters] = useState<{certifications: string[], companySize: string}>({
    certifications: [],
    companySize: ""
  });
  
  const [topFilters, setTopFilters] = useState({
    query: "",
    location: "",
    type: "Manufacturing Type",
    distance: "Distance"
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleFilterChange = (type: string, value: string) => {
    if (type === 'certification') {
      setActiveFilters(prev => {
        const certs = prev.certifications.includes(value) 
          ? prev.certifications.filter(c => c !== value)
          : [...prev.certifications, value];
        return { ...prev, certifications: certs };
      });
    } else if (type === 'companySize') {
      setActiveFilters(prev => ({ 
        ...prev, 
        companySize: prev.companySize === value ? "" : value // toggle off if same
      }));
    }
    // Reset to page 1 when filters change
    setCurrentPage(1);
  };

  const filteredSuppliers = useMemo(() => {
    let result = [...MOCK_SUPPLIERS];
    
    // Filter by Top Bar Inputs
    if (topFilters.query) {
      const q = topFilters.query.toLowerCase();
      result = result.filter(sup => 
        sup.name.toLowerCase().includes(q) || 
        sup.desc.toLowerCase().includes(q) || 
        sup.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (topFilters.location) {
      const l = topFilters.location.toLowerCase();
      result = result.filter(sup => sup.location.toLowerCase().includes(l));
    }
    
    // Type dropdown filter
    if (topFilters.type !== "Manufacturing Type") {
      result = result.filter(sup => sup.tags.includes(topFilters.type));
    }

    // Filter by Company Size
    if (activeFilters.companySize) {
      result = result.filter(sup => sup.companySize === activeFilters.companySize);
    }
    
    // Filter by Certifications (supplier must have ALL selected certs)
    if (activeFilters.certifications.length > 0) {
      result = result.filter(sup => {
        if (!sup.certifications) return false;
        return activeFilters.certifications.every(cert => sup.certifications!.includes(cert));
      });
    }
    
    return result;
  }, [activeFilters]);

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  
  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSuppliers, currentPage]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SupplierHero />
      <ServiceTypeGrid />

      {/* Main Search Results Area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Horizontal Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Company or service..." 
              value={topFilters.query}
              onChange={(e) => { setTopFilters(p => ({...p, query: e.target.value})); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-900 focus:outline-none focus:border-[#dca12f]"
            />
          </div>
          <div className="relative flex-[0.7]">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="City, State, ZIP..." 
              value={topFilters.location}
              onChange={(e) => { setTopFilters(p => ({...p, location: e.target.value})); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-900 focus:outline-none focus:border-[#dca12f]"
            />
          </div>
          <div className="relative flex-[0.8]">
            <select 
              value={topFilters.type}
              onChange={(e) => { setTopFilters(p => ({...p, type: e.target.value})); setCurrentPage(1); }}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#dca12f]"
            >
              <option value="Manufacturing Type">Manufacturing Type</option>
              <option value="Contract Mfg">Contract Mfg</option>
              <option value="Assembly">Assembly</option>
              <option value="Fabrication">Fabrication</option>
              <option value="CNC Machining">CNC Machining</option>
              <option value="Electronics">Electronics</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
          <div className="relative flex-[0.6]">
            <select 
              value={topFilters.distance}
              onChange={(e) => { setTopFilters(p => ({...p, distance: e.target.value})); setCurrentPage(1); }}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#dca12f]"
            >
              <option value="Distance">Distance</option>
              <option value="< 50 miles">&lt; 50 miles</option>
              <option value="< 100 miles">&lt; 100 miles</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
          <button className="px-6 py-2.5 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 text-sm font-bold rounded transition-colors shadow-sm shrink-0 whitespace-nowrap">
            Apply Filters
          </button>
          <Link href="/suppliers/map" className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded transition-colors shadow-sm shrink-0 flex items-center gap-2 whitespace-nowrap">
            <Map size={16} /> Map View
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <SupplierFilters 
            activeFilters={activeFilters} 
            onFilterChange={handleFilterChange} 
          />

          {/* Right Results Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-bold text-slate-900">{filteredSuppliers.length} Suppliers Found</h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Sort by:</span>
                <button className="flex items-center gap-1 font-bold text-slate-700 hover:text-slate-900">
                  Recommended <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {paginatedSuppliers.map((sup) => (
                <SupplierCard key={sup.id} sup={sup} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-[#dca12f] text-slate-900 font-bold shadow-sm' 
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
