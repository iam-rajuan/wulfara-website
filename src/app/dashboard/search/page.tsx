"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, MapPin, Star, Bookmark, Mail, ChevronDown, SearchX } from "lucide-react";

import { useGetSuppliersQuery } from "@/store/api/supplierApi";

export default function SearchSuppliersPage() {
  const router = useRouter();
  const { data: response, isLoading } = useGetSuppliersQuery("");

  const [suppliersList, setSuppliersList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLocation, setActiveLocation] = useState("");
  const [sortBy, setSortBy] = useState("Best Match");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const categories = ["All", "Raw Materials", "Machinery", "Electronics", "Logistics", "Plastics"];

  useEffect(() => {
    if (response?.data) {
      const formatted = response.data.map((sup: any) => ({
        id: sup.user, // Using user ID for messaging
        name: sup.companyName,
        categories: sup.categories?.map((c: any) => c.name) || sup.coreProducts || ["Supplier"],
        location: sup.location?.formattedAddress || "Global",
        rating: 4.8, // Fallback mock
        reviews: 120, // Fallback mock
        description: sup.description,
        image: sup.logo !== 'no-logo.jpg' ? sup.logo : "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop",
        isFavorite: false,
      }));
      setSuppliersList(formatted);
    }
  }, [response]);

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
      const matchesCategory = supplier.categories.some((c: string) => c.toLowerCase().includes(q));
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
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors ${activeCategory === category
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

      {/* Supplier Grid or Empty State */}
      {paginatedSuppliers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedSuppliers.map(supplier => (
            <div key={supplier.id} className="bg-white border border-gray-200 flex flex-col group hover:shadow-md transition-shadow">
              {/* Image Header */}
              <div className="h-45 relative overflow-hidden bg-gray-100">
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
                  {supplier.categories.slice(0, 2).map((cat: string, idx: number) => (
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
                  <button
                    onClick={() => router.push(`/dashboard/messages?new=${supplier.id}&name=${encodeURIComponent(supplier.name)}`)}
                    className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-[#0B172E] text-[14px] font-bold rounded hover:bg-gray-50 transition-colors">
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
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-linear-to-b from-white to-gray-50 border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#DFB63E] via-[#137847] to-[#0B172E]"></div>
          <div className="absolute -left-20 -top-20 w-40 h-40 bg-[#DFB63E]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-[#137847]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="w-24 h-24 bg-linear-to-tr from-[#0B172E] to-[#212E46] rounded-full flex items-center justify-center mb-8 shadow-lg shadow-[#0B172E]/20 relative z-10">
            <div className="absolute inset-0 rounded-full border border-white/10"></div>
            <SearchX className="w-12 h-12 text-[#DFB63E]" />
          </div>
          <h3 className="text-[26px] font-bold text-[#0B172E] mb-3 relative z-10">No Suppliers Found</h3>
          <p className="text-[16px] text-gray-600 text-center max-w-md mb-8 leading-relaxed relative z-10">
            We couldn't find any suppliers matching your current search or filter criteria. Try adjusting your filters or search terms to discover more options.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
              setSortBy("Best Match");
            }}
            className="px-8 py-3.5 bg-linear-to-r from-[#137847] to-[#1a9d5e] hover:from-[#0f6139] hover:to-[#137847] text-white text-[15px] font-bold rounded-xl transition-all shadow-md shadow-[#137847]/20 flex items-center gap-2 transform hover:-translate-y-0.5 relative z-10"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-200 text-[14px] font-bold rounded-l transition-colors ${currentPage === 1 ? 'text-gray-400 bg-gray-50 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border-y border-r first-of-type:border-l-0 border-gray-200 text-[14px] font-bold transition-colors ${currentPage === page
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
              className={`px-4 py-2 border border-gray-200 text-[14px] font-bold rounded-r transition-colors ${currentPage === totalPages ? 'text-gray-400 bg-gray-50 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
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
