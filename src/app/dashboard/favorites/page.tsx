"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  MapPin,
  Clock,
  Settings,
  Truck,
  Heart,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Building2,
  Handshake,
} from "lucide-react";

const suppliers = [
  {
    id: 1,
    name: "Steel Company A",
    location: "New York, USA",
    isVerified: true,
    isFavorite: true,
    logoBg: "bg-[#0F172A]",
    tags: [
      { label: "Replies in 2 hours", icon: Clock },
      { label: "Negotiable Rate", icon: Handshake },
    ],
    isActive: true,
  },
  {
    id: 2,
    name: "Steel Company B",
    location: "New Jersey, USA",
    isVerified: true,
    isFavorite: true,
    logoBg: "bg-[#F0F9FF]",
    logoText: "text-[#0284C7]",
    tags: [
      { label: "Manufacturer", icon: Building2 },
      { label: "Global Shipping", icon: Truck },
    ],
    isActive: true,
  },
  {
    id: 3,
    name: "Tech Components Ltd",
    location: "Shenzhen, China",
    isVerified: false,
    isFavorite: false,
    logoBg: "bg-gray-100",
    tags: [{ label: "Replies in 12 hours", icon: Clock }],
    isActive: false,
  },
];

export default function FavoriteSuppliersPage() {
  const router = useRouter();
  const [suppliersList, setSuppliersList] = useState(suppliers);

  const toggleFavorite = (id: number) => {
    setSuppliersList((current) =>
      current.map((supplier) =>
        supplier.id === id
          ? { ...supplier, isFavorite: !supplier.isFavorite }
          : supplier
      )
    );
  };

  const [sortBy, setSortBy] = useState("Recently Saved");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortOptions = ["Recently Saved", "Name (A-Z)", "Name (Z-A)"];

  const [searchQuery, setSearchQuery] = useState("");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    Category: "All",
    Location: "All",
    "Supplier Type": "All",
    "Response Time": "All",
  });
  const [isNegotiable, setIsNegotiable] = useState(false);

  const filterOptions: Record<string, string[]> = {
    Category: ["All", "Metals", "Electronics"],
    Location: ["All", "New York, USA", "New Jersey, USA", "Shenzhen, China"],
    "Supplier Type": ["All", "Manufacturer", "Distributor"],
    "Response Time": ["All", "Replies in 2 hours", "Replies in 12 hours"],
  };

  const filteredAndSortedSuppliers = [...suppliersList]
    .filter((supplier) => {
      if (searchQuery && !supplier.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (isNegotiable && !supplier.tags.some(tag => tag.label === "Negotiable Rate")) return false;
      if (activeFilters.Location !== "All" && supplier.location !== activeFilters.Location) return false;
      if (activeFilters["Supplier Type"] !== "All" && !supplier.tags.some(tag => tag.label === activeFilters["Supplier Type"])) return false;
      if (activeFilters["Response Time"] !== "All" && !supplier.tags.some(tag => tag.label === activeFilters["Response Time"])) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Name (A-Z)") return a.name.localeCompare(b.name);
      if (sortBy === "Name (Z-A)") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="w-auto mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-[32px] font-bold text-[#0B172E] tracking-tight">
              Favorite Suppliers
            </h2>
            <span className="px-3 py-1 bg-[#E2E8F0] text-[#0f1b2d] text-xs font-bold rounded-full">
              12 Saved
            </span>
          </div>
          <p className="text-[15px] text-gray-500">
            Saved suppliers you can quickly view, contact, or send RFQs to.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#0B172E] hover:bg-gray-50 transition-colors shadow-sm">
          Browse More Suppliers
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 p-5 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 mb-5">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search saved suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 text-black border border-gray-200 rounded-sm text-[14px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="flex items-center justify-between px-4 h-11 bg-[#F8F9FB] border border-gray-200 rounded-sm w-full sm:w-[200px] text-[13px] font-bold text-[#0B172E] hover:bg-gray-100 transition-colors"
            >
              Sort: {sortBy}
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${
                  isSortDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-1 w-full sm:w-[200px] bg-white border border-gray-200 shadow-lg rounded-sm z-10 py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 transition-colors ${
                      sortBy === option
                        ? "font-bold text-[#D4AF37]"
                        : "text-[#0B172E]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-3">
          {Object.keys(filterOptions).map((filter) => (
            <div key={filter} className="relative">
              <button
                onClick={() => setOpenFilter(openFilter === filter ? null : filter)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-full text-[13px] font-bold transition-colors ${
                  activeFilters[filter] !== "All"
                    ? "bg-[#F8F9FB] border-[#D4AF37] text-[#D4AF37]"
                    : "bg-white border-gray-200 text-[#0B172E] hover:bg-gray-50"
                }`}
              >
                {activeFilters[filter] !== "All" ? activeFilters[filter] : filter}
                <ChevronDown size={14} className={activeFilters[filter] !== "All" ? "text-[#D4AF37]" : "text-gray-400"} />
              </button>
              
              {openFilter === filter && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-sm z-20 py-1">
                  {filterOptions[filter].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setActiveFilters({ ...activeFilters, [filter]: option });
                        setOpenFilter(null);
                      }}
                      className={`block w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 transition-colors ${
                        activeFilters[filter] === option ? 'font-bold text-[#D4AF37]' : 'text-[#0B172E]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button 
            onClick={() => setIsNegotiable(!isNegotiable)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-[13px] font-bold transition-colors ${
              isNegotiable 
                ? "bg-[#F8F9FB] border-[#D4AF37] text-[#D4AF37]" 
                : "bg-white border-gray-200 text-[#0B172E] hover:bg-gray-50"
            }`}
          >
            Negotiable Rate
          </button>
        </div>
      </div>

      {/* Supplier Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredAndSortedSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow relative group"
          >
            {/* Heart Icon */}
            <button
              onClick={() => toggleFavorite(supplier.id)}
              className="absolute top-6 right-6 z-10"
            >
              <Heart
                size={22}
                className={
                  supplier.isFavorite
                    ? "text-[#D4AF37] fill-[#D4AF37]"
                    : "text-gray-300"
                }
              />
            </button>

            {/* Header info */}
            <div className="flex gap-4 mb-6">
              {/* Logo Box */}
              <div
                className={`w-[60px] h-[60px] rounded-lg border border-gray-100 flex items-center justify-center shrink-0 ${supplier.logoBg}`}
              >
                {supplier.id === 1 && (
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-gray-300 to-gray-500 shadow-inner flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-100"></div>
                  </div>
                )}
                {supplier.id === 2 && (
                  <div className="text-blue-500">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12L12 4L20 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 12L12 20L20 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                {supplier.id === 3 && (
                  <Building2 size={28} className="text-gray-400" />
                )}
              </div>

              {/* Title & Location */}
              <div className="flex-1 pr-6">
                <div className="flex items-start gap-1.5 mb-1.5">
                  <h3 className="text-xl font-bold text-[#0B172E] leading-tight">
                    {supplier.name}
                  </h3>
                  {supplier.isVerified && (
                    <BadgeCheck
                      size={20}
                      className="text-blue-600 fill-blue-50 mt-0.5 shrink-0"
                    />
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin size={14} />
                  <span className="text-[13px]">{supplier.location}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2 mb-8">
              {supplier.tags.map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F5F9] rounded w-fit"
                >
                  <tag.icon size={14} className="text-[#475569]" />
                  <span className="text-[11px] font-bold text-[#475569]">
                    {tag.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              {/* Action Buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => {
                    if (supplier.isActive) {
                      router.push(`/suppliers/${supplier.id}`);
                    }
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-[13px] font-bold transition-colors ${supplier.isActive
                    ? "bg-[#1E293B] hover:bg-[#0f172a] text-white"
                    : "bg-[#64748B] text-gray-200 cursor-not-allowed"
                    }`}
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    if (supplier.isActive) {
                      router.push(`/suppliers/${supplier.id}/rfq`);
                    }
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-[13px] font-bold transition-colors ${supplier.isActive
                    ? "bg-[#DDA52D] hover:bg-[#c49021] text-[#0B172E]"
                    : "bg-[#E2CB96] text-gray-400 cursor-not-allowed"
                    }`}
                >
                  Send RFQ
                </button>
              </div>

              {/* Remove Favorite */}
              {supplier.isActive ? (
                <button
                  onClick={() => toggleFavorite(supplier.id)}
                  className="w-full text-center py-2 text-[13px] font-bold text-[#DC2626] hover:text-[#b91c1c] transition-colors"
                >
                  {supplier.isFavorite ? "Remove Favorite" : "Add Favorite"}
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-400">
          <ChevronLeft size={18} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-[#0B172E] rounded-lg text-white font-bold text-sm">
          1
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[#0B172E] font-bold text-sm">
          2
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[#0B172E] font-bold text-sm">
          3
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[#0B172E]">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
