"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Flame, TreePine, Leaf, Droplets,
  Search, MapPin, BadgeCheck, ArrowRight, Factory,
  ChevronDown, Building2, FileText, Heart
} from "lucide-react";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } from "@/store/api/favoriteApi";

import { useGetCategoriesQuery } from "@/store/api/categoryApi";
import { useGetSuppliersQuery } from "@/store/api/supplierApi";
import type { RootState } from "@/store/store";
import type { Category, Favorite, Supplier } from "@/types/api";

// Hardcoded industries for exact Figma match, but we will bind them to DB categories if found
const figmaIndustries = [
  { name: 'Steel Industry', desc: 'Ingots, billets, sheets, and...', icon: <Factory size={24} /> },
  { name: 'Oil & Gas', desc: 'Crude, refined products, and...', icon: <Flame size={24} /> },
  { name: 'Forestry & Lumber', desc: 'Raw timber, plywood, and...', icon: <TreePine size={24} /> },
  { name: 'Cotton Farming', desc: 'Raw cotton bales, seeds, and lint.', icon: <Leaf size={24} /> },
  { name: 'Rubber', desc: 'Natural latex and synthetic rubber.', icon: <Droplets size={24} /> },
];

const getDistanceLabel = (supplierId: string) => {
  const seed = supplierId.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return `${(seed % 450) + 50} km`;
};

const getFavoriteSupplierId = (favorite: Favorite) => {
  if (!favorite.supplier) {
    return null;
  }

  return typeof favorite.supplier === "string" ? favorite.supplier : favorite.supplier._id;
};

const getApiErrorMessage = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data &&
    typeof error.data.message === "string"
  ) {
    return error.data.message;
  }

  return "Failed to update favorites";
};

export default function CategoryPage() {
  const [selectedIndustryName, setSelectedIndustryName] = useState<string>('Steel Industry');
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("Any Location");
  const [distanceFilter, setDistanceFilter] = useState("Distance");
  const [typeFilter, setTypeFilter] = useState("Supplier Type");

  const user = useSelector((state: RootState) => state.auth.user);
  const { data: favoritesData } = useGetFavoritesQuery(undefined, { skip: !user });
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const favorites = favoritesData?.data || [];

  const handleFavoriteToggle = async (supplierId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please login to save favorites");
      return;
    }

    const existingFav = favorites.find((favorite) => getFavoriteSupplierId(favorite) === supplierId);
    try {
      if (existingFav) {
        await removeFavorite(existingFav._id).unwrap();
        toast.success("Removed from favorites");
      } else {
        await addFavorite({ supplierId }).unwrap();
        toast.success("Added to favorites");
      }
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    }
  };

  // Fetch Categories
  const { data: categoriesResponse } = useGetCategoriesQuery();
  const categories = categoriesResponse?.data || [];
  
  // Find the DB ID for the selected industry to fetch suppliers
  const matchedCategory = categories.find((category: Category) => category.name.toLowerCase() === selectedIndustryName.toLowerCase());
  const categoryId = matchedCategory?._id;

  // Build query string
  const queryParams: string[] = [];
  if (categoryId) queryParams.push(`categories=${categoryId}`);
  if (searchQuery) queryParams.push(`keyword=${encodeURIComponent(searchQuery)}`);
  if (typeFilter !== "Supplier Type") queryParams.push(`supplierType=${encodeURIComponent(typeFilter)}`);
  // For distance, we need lat/lng of "Any Location". If not implemented in frontend UI to get user coords, we skip.

  // Fetch Suppliers
  const { data: suppliersResponse, isLoading: suppliersLoading } = useGetSuppliersQuery(
    queryParams.length > 0 ? queryParams.join('&') : ''
  );
  const suppliers = suppliersResponse?.data || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumbs */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-[12px] font-medium text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-slate-800">Home</Link>
          <span>›</span>
          <Link href="/category" className="hover:text-slate-800">Categories</Link>
          <span>›</span>
          <span className="font-semibold text-slate-800">Raw Material Suppliers</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative w-full h-[340px] md:h-[380px] flex items-center rounded-2xl overflow-hidden shadow-sm">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/assets/Raw_Material.png" 
              alt="Raw Material Suppliers" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#162235]/95 to-[#162235]/40"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full px-8 md:px-14">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-[44px] font-bold text-white mb-4 tracking-tight leading-tight">
                Raw Material Suppliers
              </h1>
              <p className="text-[15px] md:text-[16px] text-slate-200 mb-8 leading-relaxed max-w-lg font-medium">
                Find vetted raw material suppliers for steel, oil and gas, forestry and lumber, cotton farming, rubber, and other industrial sourcing needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/search" className="inline-block px-7 py-3 bg-[#dca12f] hover:bg-[#c99126] text-[#162235] font-bold rounded shadow-sm transition-colors text-[14px]">
                  Find Suppliers
                </Link>
                <Link href="/search" className="inline-block px-7 py-3 bg-white hover:bg-slate-50 text-[#162235] font-bold rounded shadow-sm transition-colors text-[14px]">
                  Post an RFQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar - How it works */}
          <div className="w-full lg:w-[280px] shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-24">
              <h2 className="text-[18px] font-bold text-[#162235] mb-8">How it works</h2>
              
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[9px] top-2 bottom-6 w-[2px] bg-slate-100"></div>

                {/* Steps */}
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#2563EB] border-4 border-white flex-shrink-0 mt-0.5 shadow-sm ring-1 ring-slate-100"></div>
                    <div>
                      <h3 className="text-[13px] font-bold text-[#162235] mb-1">1. Choose Industry</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed">Select the specific raw material category you need to source.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#DBEAFE] border-4 border-white flex-shrink-0 mt-0.5 ring-1 ring-slate-100"></div>
                    <div>
                      <h3 className="text-[13px] font-bold text-slate-700 mb-1">2. Find Suppliers</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed">Filter and compare verified B2B suppliers matching your criteria.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#DBEAFE] border-4 border-white flex-shrink-0 mt-0.5 ring-1 ring-slate-100"></div>
                    <div>
                      <h3 className="text-[13px] font-bold text-slate-700 mb-1">3. Request Quote</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed">Send direct inquiries or formalized RFQs to selected vendors.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#DBEAFE] border-4 border-white flex-shrink-0 mt-0.5 ring-1 ring-slate-100"></div>
                    <div>
                      <h3 className="text-[13px] font-bold text-slate-700 mb-1">4. Supplier Responds</h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed">Receive competitive bids and negotiate terms directly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full lg:flex-1 space-y-8 pb-20">
            
            {/* Choose Industry */}
            <div>
              <h2 className="text-[22px] font-bold text-[#162235] mb-5">Choose Raw Material Industry</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {figmaIndustries.map((ind) => (
                  <div 
                    key={ind.name}
                    onClick={() => setSelectedIndustryName(ind.name)}
                    className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedIndustryName === ind.name 
                        ? 'border-[#dca12f] bg-white shadow-sm ring-1 ring-[#dca12f]/20' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    {selectedIndustryName === ind.name && (
                      <div className="absolute top-0 right-0 w-5 h-5 bg-[#dca12f] text-white rounded-bl-lg rounded-tr-xl flex items-center justify-center shadow-sm">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className={`mb-4 flex ${selectedIndustryName === ind.name ? 'text-[#dca12f]' : 'text-slate-500'}`}>
                      {ind.icon}
                    </div>
                    <h3 className="text-[14px] font-bold text-[#162235] mb-1.5 leading-tight">{ind.name}</h3>
                    <p className="text-[12px] text-slate-500 leading-snug">{ind.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col md:flex-row gap-3 shadow-sm">
              {/* Search specifically */}
              <div className="relative flex-1 md:border-r border-slate-200 pr-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search specifically within ${selectedIndustryName.split(' ')[0]}...`} 
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 md:bg-transparent border border-slate-200 md:border-transparent rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:bg-slate-50 transition"
                />
              </div>

              {/* Any Location */}
              <div className="relative md:w-[180px]">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select 
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full appearance-none pl-9 pr-8 py-2.5 bg-slate-50 md:bg-transparent border border-slate-200 md:border-transparent rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:bg-slate-50 transition cursor-pointer"
                >
                  <option>Any Location</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>

              {/* Distance */}
              <div className="relative md:w-[140px]">
                <select 
                  value={distanceFilter}
                  onChange={(e) => setDistanceFilter(e.target.value)}
                  className="w-full appearance-none pl-4 pr-8 py-2.5 bg-slate-50 md:bg-transparent border border-slate-200 md:border-transparent rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:bg-slate-50 transition cursor-pointer"
                >
                  <option>Distance</option>
                  <option>Within 50 km</option>
                  <option>Within 100 km</option>
                  <option>Within 500 km</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>

              {/* Supplier Type */}
              <div className="relative md:w-[160px]">
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full appearance-none pl-4 pr-8 py-2.5 bg-slate-50 md:bg-transparent border border-slate-200 md:border-transparent rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:bg-slate-50 transition cursor-pointer"
                >
                  <option>Supplier Type</option>
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Wholesaler">Wholesaler</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Recommended Suppliers */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-[20px] font-bold text-[#162235]">Recommended {selectedIndustryName.split(' ')[0]} Suppliers</h2>
                <Link href="/search" className="text-[13px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800">
                  View All <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {suppliers.length === 0 && !suppliersLoading && (
                  <div className="col-span-full py-10 text-center text-slate-500 font-medium">
                    No suppliers found matching your criteria.
                  </div>
                )}
                
                {suppliersLoading && (
                  <div className="col-span-full py-10 text-center text-slate-500 font-medium">
                    Loading suppliers...
                  </div>
                )}

                {suppliers.map((sup: Supplier) => (
                  <div key={sup._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
                    <div className="p-5 flex-1">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#F1F5F9] text-slate-600 flex items-center justify-center shrink-0">
                          <Building2 size={22} className="text-[#64748B]" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {sup.isApproved && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F0FDF4] text-[#15803D] rounded-full text-[11px] font-bold border border-[#DCFCE7]">
                              <BadgeCheck size={14} className="text-[#15803D]" /> Verified
                            </div>
                          )}
                          <button 
                            onClick={(e) => handleFavoriteToggle(sup._id, e)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Heart 
                              size={20} 
                              className={favorites.some((favorite) => getFavoriteSupplierId(favorite) === sup._id) ? "fill-red-500 text-red-500" : ""} 
                            />
                          </button>
                        </div>
                      </div>
                      
                      {/* Title & Location */}
                      <h3 className="text-[15px] font-bold text-[#162235] mb-1.5 line-clamp-1">{sup.companyName}</h3>
                      <div className="text-[12px] text-slate-500 flex items-center gap-1.5 mb-5 font-medium">
                        <MapPin size={14} className="text-slate-400" /> 
                        <span className="line-clamp-1 truncate">{sup.location?.formattedAddress || sup.contactAddress || "Global"}</span>
                        <span className="text-slate-300">•</span>
                        <span>{getDistanceLabel(sup._id)}</span>
                      </div>

                      {/* Stats */}
                      <div className="space-y-2.5 mb-5">
                        <div className="flex items-center text-[12px]">
                          <span className="text-slate-500 w-24">Type:</span>
                          <span className="font-bold text-[#162235]">{sup.supplierType || "Manufacturer"}</span>
                        </div>
                        <div className="flex items-center text-[12px]">
                          <span className="text-slate-500 w-24">Avg. Response:</span>
                          <span className="font-bold text-[#10B981]">{sup.avgResponseTime || "~2 Hours"}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {(sup.products || []).slice(0, 3).map((prod, idx: number) => (
                          <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold tracking-wide">
                            {typeof prod === "string" ? prod : prod.title || prod.name || "Product"}
                          </span>
                        ))}
                        {(!sup.products || sup.products.length === 0) && sup.categories?.map((cat) => (
                          <span key={cat._id} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold tracking-wide">
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t border-slate-100 space-y-2.5 bg-slate-50/30">
                      <Link href={`/suppliers/${sup._id}?action=rfq`} className="w-full py-2.5 bg-[#dca12f] hover:bg-[#c99126] text-[#162235] text-[13px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <FileText size={16} strokeWidth={2.5} />
                        Send RFQ
                      </Link>
                      <div className="flex gap-2.5">
                        <Link href={`/suppliers/${sup._id}?action=quote`} className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[13px] font-bold rounded-lg transition-colors flex justify-center shadow-sm">
                          Quote
                        </Link>
                        <Link href={`/suppliers/${sup._id}`} className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[13px] font-bold rounded-lg transition-colors flex justify-center shadow-sm">
                          Profile
                        </Link>
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
