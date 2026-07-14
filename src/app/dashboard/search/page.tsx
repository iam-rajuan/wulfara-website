"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, MapPin, Star, Bookmark, Mail, ChevronDown } from "lucide-react";

// Mock data for suppliers
const suppliers = [
  {
    id: 1,
    name: "Steel Company A",
    categories: ["Raw Materials", "Steel"],
    location: "Berlin, Germany",
    rating: 4.8,
    reviews: 124,
    description: "Leading provider of high-grade steel and raw materials for industrial manufacturing.",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=400&auto=format&fit=crop",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Industrial Parts Co.",
    categories: ["Machinery", "Components"],
    location: "Tokyo, Japan",
    rating: 4.6,
    reviews: 89,
    description: "Specialized in precision machined components and custom industrial parts.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Global Logistics Partner",
    categories: ["Logistics", "Freight"],
    location: "New York, USA",
    rating: 4.9,
    reviews: 210,
    description: "Comprehensive freight forwarding and global supply chain logistics solutions.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop",
    isFavorite: false,
  },
  {
    id: 4,
    name: "TechTron Electronics",
    categories: ["Electronics", "Semiconductors"],
    location: "Seoul, South Korea",
    rating: 4.7,
    reviews: 156,
    description: "Top-tier semiconductor manufacturer and electronics component supplier.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop",
    isFavorite: false,
  },
  {
    id: 5,
    name: "EcoPlastics Inc.",
    categories: ["Plastics", "Sustainable"],
    location: "Toronto, Canada",
    rating: 4.5,
    reviews: 72,
    description: "Innovative manufacturer of eco-friendly, biodegradable plastic alternatives.",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=400&auto=format&fit=crop",
    isFavorite: true,
  },
  {
    id: 6,
    name: "Apex Manufacturing",
    categories: ["Manufacturing", "Assembly"],
    location: "London, UK",
    rating: 4.8,
    reviews: 342,
    description: "Full-scale assembly and manufacturing services for complex consumer products.",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=400&auto=format&fit=crop",
    isFavorite: false,
  }
];

export default function SearchSuppliersPage() {
  const router = useRouter();
  const [suppliersList, setSuppliersList] = useState(suppliers);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLocation, setActiveLocation] = useState("");
  const [sortBy, setSortBy] = useState("Best Match");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  const categories = ["All", "Raw Materials", "Machinery", "Electronics", "Logistics", "Plastics"];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, activeLocation, sortBy]);

  const toggleFavorite = (id: number) => {
    setSuppliersList((current) =>
      current.map((supplier) =>
        supplier.id === id
          ? { ...supplier, isFavorite: !supplier.isFavorite }
          : supplier
      )
    );
  };

  const filteredSuppliers = suppliersList.filter((supplier) => {
    if (activeCategory !== "All" && !supplier.categories.includes(activeCategory)) return false;

    if (activeLocation === "europe" && !supplier.location.includes("Germany") && !supplier.location.includes("UK")) return false;
    if (activeLocation === "asia" && !supplier.location.includes("Japan") && !supplier.location.includes("South Korea")) return false;
    if (activeLocation === "na" && !supplier.location.includes("USA") && !supplier.location.includes("Canada")) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = supplier.name.toLowerCase().includes(q);
      const matchesDesc = supplier.description.toLowerCase().includes(q);
      const matchesCategory = supplier.categories.some(c => c.toLowerCase().includes(q));
      if (!matchesName && !matchesDesc && !matchesCategory) return false;
    }

    return true;
  });

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    if (sortBy === "Highest Rated") return b.rating - a.rating;
    if (sortBy === "Most Reviews") return b.reviews - a.reviews;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedSuppliers.length / itemsPerPage));
  const paginatedSuppliers = sortedSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-auto mx-auto pb-10">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[32px] font-bold text-[#0B172E] tracking-tight mb-2">
            Search Suppliers
          </h2>
          <p className="text-[15px] text-gray-500">
            Find and connect with top-rated suppliers globally.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] font-bold text-[#0B172E] hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-gray-200 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by supplier name, product, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] pl-12 pr-4 text-black text-[15px] rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] placeholder:text-gray-400 transition-all shadow-sm"
            />
          </div>

          {/* Location Dropdown */}
          <div className="relative md:w-[220px]">
            <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={activeLocation}
              onChange={(e) => setActiveLocation(e.target.value)}
              className="w-full h-[48px] pl-12 pr-10 text-[15px] text-[#0B172E] font-medium rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] appearance-none shadow-sm cursor-pointer"
            >
              <option value="">Any Location</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="na">North America</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          <button className="h-[48px] px-8 bg-[#212E46] hover:bg-[#151D2C] text-white text-[15px] font-semibold rounded-md transition-colors shadow-sm whitespace-nowrap">
            Search
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <span className="text-[13px] font-bold text-gray-500 mr-2">Suggested:</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors ${
                activeCategory === category 
                  ? "bg-[#DFB63E] text-[#0B172E]" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-[18px] font-bold text-[#0B172E]">
          {sortedSuppliers.length} Suppliers Found
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-gray-500">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-[13px] font-bold text-[#0B172E] bg-transparent focus:outline-none cursor-pointer"
          >
            <option>Best Match</option>
            <option>Highest Rated</option>
            <option>Most Reviews</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Supplier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedSuppliers.map(supplier => (
          <div key={supplier.id} className="bg-white border border-gray-200 flex flex-col group hover:shadow-md transition-shadow">
            {/* Image Header */}
            <div className="h-[180px] relative overflow-hidden bg-gray-100">
              <img 
                src={supplier.image} 
                alt={supplier.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                onClick={() => toggleFavorite(supplier.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white text-gray-400 hover:text-[#D4AF37] transition-colors shadow-sm"
              >
                <Bookmark size={18} className={supplier.isFavorite ? "fill-[#D4AF37] text-[#D4AF37]" : ""} />
              </button>
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 pr-3">
                {supplier.categories.slice(0, 2).map((cat, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold rounded">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-[18px] font-bold text-[#0B172E] line-clamp-1 leading-tight group-hover:text-[#137847] transition-colors cursor-pointer">
                  {supplier.name}
                </h4>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-[#DFB63E] text-[#DFB63E]" />
                  <span className="text-[13px] font-bold text-[#0B172E]">{supplier.rating}</span>
                  <span className="text-[13px] text-gray-500">({supplier.reviews})</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin size={14} />
                  <span className="text-[13px] line-clamp-1">{supplier.location}</span>
                </div>
              </div>

              <p className="text-[14px] text-gray-600 line-clamp-2 mb-6 flex-1 leading-relaxed">
                {supplier.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-[#0B172E] text-[14px] font-bold rounded hover:bg-gray-50 transition-colors">
                  <Mail size={16} />
                  Contact
                </button>
                <button 
                  onClick={() => router.push(`/suppliers/${supplier.id}`)}
                  className="flex items-center justify-center py-2.5 bg-[#137847] hover:bg-[#0f6139] text-white text-[14px] font-bold rounded transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-200 text-[14px] font-bold rounded-l transition-colors ${
                currentPage === 1 ? 'text-gray-400 bg-gray-50 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border-y border-r first-of-type:border-l-0 border-gray-200 text-[14px] font-bold transition-colors ${
                  currentPage === page 
                    ? 'bg-[#212E46] text-white border-[#212E46]' 
                    : 'text-[#0B172E] bg-white hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-200 text-[14px] font-bold rounded-r transition-colors ${
                currentPage === totalPages ? 'text-gray-400 bg-gray-50 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
