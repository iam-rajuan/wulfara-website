"use client";

import React, { useState, Suspense } from "react";
import { Search, MapPin, ExternalLink, X, SlidersHorizontal, Maximize2, Map as MapIcon, CheckCircle2, Navigation } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetSuppliersQuery } from "@/store/api/supplierApi";
import DynamicMap from "@/components/home/DynamicMap";

const initialTags = ['Verified Suppliers', 'Premium Listings'];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Initialize query from URL parameter, fallback to empty
  const urlQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(urlQuery);
  const [activeTags, setActiveTags] = useState(initialTags);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Sync query state when URL changes
  React.useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  // State for filters
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Manufacturer', 'Distributor', 'Service Provider']);
  const [locationSearch, setLocationSearch] = useState('');

  // Fetch real suppliers from backend
  const { data, isLoading } = useGetSuppliersQuery(
    urlQuery ? `keyword=${encodeURIComponent(urlQuery)}` : ''
  );
  const allSuppliers = data?.data || [];

  // Apply frontend filters
  const suppliers = allSuppliers.filter((sup: any) => {
    // Supplier Type Filter
    const typeMatch = selectedTypes.includes(sup.supplierType || 'Manufacturer');
    
    // Location Filter (simple text match on formattedAddress)
    const locMatch = locationSearch 
      ? (sup.location?.formattedAddress || '').toLowerCase().includes(locationSearch.toLowerCase())
      : true;
      
    return typeMatch && locMatch;
  });

  // Calculate counts for categories
  const counts = {
    Manufacturer: allSuppliers.filter((s: any) => (s.supplierType || 'Manufacturer') === 'Manufacturer').length,
    Distributor: allSuppliers.filter((s: any) => s.supplierType === 'Distributor').length,
    ServiceProvider: allSuppliers.filter((s: any) => s.supplierType === 'Service Provider').length,
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const removeTag = (tagToRemove: string) => {
    setActiveTags(activeTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <span className="hover:text-slate-900 cursor-pointer">Search</span>
          <span>/</span>
          <span className="font-semibold text-slate-900 capitalize">{urlQuery}</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Search Results for &quot;{urlQuery}&quot;</h1>
        <p className="text-slate-500 mb-8">Find suppliers, manufacturers, and industrial service providers near your location.</p>

        {/* Main Search Input */}
        <form onSubmit={handleSearch} className="flex bg-white rounded-lg border border-slate-300 overflow-hidden shadow-sm mb-4 max-w-3xl">
          <div className="flex items-center pl-4 pr-2 text-slate-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 py-3 focus:outline-none text-slate-700 font-medium" 
          />
          <button type="submit" className="bg-[#DFB63E] hover:bg-[#cba433] transition-colors text-slate-900 font-bold px-8 py-3">
            Search
          </button>
        </form>

        {/* Filter Tags */}
        <div className="flex items-center gap-3 mb-8">
          <button type="button" className="p-2 border border-slate-300 rounded-md bg-white text-slate-600 hover:bg-slate-50">
            <SlidersHorizontal size={18} />
          </button>
          <div className="flex flex-wrap gap-2">
            {activeTags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 bg-[#E2E8F0] text-[#334155] px-3 py-1.5 rounded-full text-sm font-medium">
                {tag} <X size={14} className="cursor-pointer hover:text-slate-800" onClick={() => removeTag(tag)} />
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
                <button type="button" className="text-sm font-semibold text-[#2563EB] hover:underline" onClick={() => setActiveTags([])}>Clear All</button>
              </div>

              {/* Supplier Category */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Supplier Category</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes('Manufacturer')} 
                      onChange={() => handleTypeToggle('Manufacturer')}
                      className="w-4 h-4 text-[#0F172A] rounded border-slate-300 focus:ring-[#0F172A]" 
                    />
                    <span className="text-sm text-slate-600">Manufacturer ({counts.Manufacturer})</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes('Distributor')}
                      onChange={() => handleTypeToggle('Distributor')}
                      className="w-4 h-4 text-[#0F172A] rounded border-slate-300 focus:ring-[#0F172A]" 
                    />
                    <span className="text-sm text-slate-600">Distributor ({counts.Distributor})</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes('Service Provider')}
                      onChange={() => handleTypeToggle('Service Provider')}
                      className="w-4 h-4 text-[#0F172A] rounded border-slate-300 focus:ring-[#0F172A]" 
                    />
                    <span className="text-sm text-slate-600">Service Provider ({counts.ServiceProvider})</span>
                  </label>
                </div>
              </div>

              <hr className="border-slate-200 my-4" />

              {/* Location */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Location</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Search Location</label>
                    <input 
                      type="text" 
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      placeholder="e.g. New York, NY" 
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#DFB63E] focus:ring-1 focus:ring-[#DFB63E]" 
                    />
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
              <span className="text-sm font-bold text-slate-900">{isLoading ? "Searching..." : `${suppliers.length} suppliers found`}</span>
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
              {suppliers.map((supplier: any) => (
                <div key={supplier._id} className="bg-white border border-slate-200 rounded-lg p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900">{supplier.companyName}</h3>
                      {supplier.isApproved && <CheckCircle2 size={18} className="text-[#10B981] fill-[#10B981]/10" />}
                    </div>
                    <div className="flex items-center gap-2">
                      {supplier.subscriptionPlan !== 'basic' && <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold px-2 py-1 rounded capitalize">{supplier.subscriptionPlan}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
                    <MapPin size={14} />
                    <span className="truncate">{supplier.location?.formattedAddress || supplier.address || 'Location not specified'} {supplier.isVerified && '• Verified'}</span>
                  </div>

                  <div className="mb-4 space-y-1">
                    <p className="text-sm"><span className="font-semibold text-slate-700">Description:</span> <span className="text-slate-900 font-medium">{supplier.description?.substring(0, 100)}...</span></p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {supplier.categories?.map((cat: any) => (
                      <span key={cat._id} className="bg-[#E2E8F0] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {cat.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <Link href={`/suppliers/${supplier._id}`} className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 font-bold text-sm rounded hover:bg-slate-50 transition-colors">
                      <ExternalLink size={14} /> View Profile
                    </Link>
                    <Link href={`/suppliers/${supplier._id}?action=rfq`} className="flex items-center gap-2 px-4 py-2 bg-[#DFB63E] hover:bg-[#cba433] text-slate-900 font-bold text-sm rounded transition-colors">
                      <Navigation size={14} className="rotate-45" /> Send RFQ
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Map */}
          <div className={isMapExpanded ? "fixed inset-0 z-50 p-4 sm:p-8 bg-black/50 backdrop-blur-sm flex items-center justify-center" : "lg:col-span-1"}>
            <div className={`bg-white border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${isMapExpanded ? "w-full h-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl" : "h-[600px] sticky top-24 rounded-lg"}`}>
              <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <MapIcon size={16} />
                  Nearby Suppliers Map
                </div>
                <button 
                  onClick={() => setIsMapExpanded(!isMapExpanded)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                  title={isMapExpanded ? "Minimize Map" : "Maximize Map"}
                >
                  {isMapExpanded ? <X size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>
              <div className="flex-1 bg-slate-100 relative overflow-hidden">
                <DynamicMap suppliers={suppliers} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SearchScreen() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
