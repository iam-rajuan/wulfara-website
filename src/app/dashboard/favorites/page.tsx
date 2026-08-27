"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  ChevronDown,
  MapPin,
  Clock,
  Heart,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";

import { useGetFavoritesQuery, useRemoveFavoriteMutation } from "@/store/api/favoriteApi";
import type { Favorite, Supplier } from "@/types/api";

interface SupplierTag {
  label: string;
  icon: typeof Clock | typeof Building2;
}

interface FavoriteSupplierCard {
  id: string;
  favoriteId: string;
  userId: string;
  name: string;
  location: string;
  isVerified: boolean;
  isFavorite: boolean;
  logoBg: string;
  logo?: string;
  tags: SupplierTag[];
  isActive: boolean;
}

const imageLoader = ({ src }: { src: string }) => src;

const getSupplierUserId = (user: Supplier["user"]) =>
  typeof user === "string" ? user : user?._id || "";

export default function FavoriteSuppliersPage() {
  const router = useRouter();
  const { data: response } = useGetFavoritesQuery();
  const [removeFavoriteApi] = useRemoveFavoriteMutation();
  const [removedFavoriteIds, setRemovedFavoriteIds] = useState<string[]>([]);

  const suppliersList = useMemo(
    () =>
      (response?.data ?? [])
        .reduce<FavoriteSupplierCard[]>((cards, favorite: Favorite) => {
          if (!favorite.supplier || typeof favorite.supplier === "string") {
            return cards;
          }

          cards.push({
            id: favorite.supplier._id,
            favoriteId: favorite._id,
            userId: getSupplierUserId(favorite.supplier.user),
            name: favorite.supplier.companyName,
            location: favorite.supplier.location?.formattedAddress || "Global",
            isVerified: Boolean(favorite.supplier.isApproved ?? favorite.supplier.isVerified),
            isFavorite: true,
            logoBg: "bg-[#0F172A]",
            logo: favorite.supplier.logo && favorite.supplier.logo !== "no-logo.jpg" ? favorite.supplier.logo : undefined,
            tags: [
              { label: favorite.supplier.avgResponseTime || "Replies in 24 hours", icon: Clock },
              { label: favorite.supplier.supplierType || "Manufacturer", icon: Building2 },
            ],
            isActive: true,
          });

          return cards;
        }, [])
        .filter((supplier) => !removedFavoriteIds.includes(supplier.favoriteId)),
    [removedFavoriteIds, response?.data]
  );

  const toggleFavorite = async (favoriteId: string) => {
    try {
      await removeFavoriteApi(favoriteId).unwrap();
      setRemovedFavoriteIds((current) => [...current, favoriteId]);
    } catch (error: unknown) {
      console.error("Failed to remove favorite", error);
    }
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterOptions: Record<string, string[]> = {
    Category: ["All", "Metals", "Electronics"],
    Location: ["All", "New York, USA", "New Jersey, USA", "Shenzhen, China"],
    "Supplier Type": ["All", "Manufacturer", "Distributor"],
    "Response Time": ["All", "Replies in 2 hours", "Replies in 12 hours"],
  };

  const filteredAndSortedSuppliers = useMemo(() => {
    return [...suppliersList]
      .filter((supplier) => {
        if (searchQuery && !supplier.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (isNegotiable && !supplier.tags.some((tag) => tag.label === "Negotiable Rate")) return false;
        if (activeFilters.Location !== "All" && supplier.location !== activeFilters.Location) return false;
        if (activeFilters["Supplier Type"] !== "All" && !supplier.tags.some((tag) => tag.label === activeFilters["Supplier Type"])) return false;
        if (activeFilters["Response Time"] !== "All" && !supplier.tags.some((tag) => tag.label === activeFilters["Response Time"])) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "Name (A-Z)") return a.name.localeCompare(b.name);
        if (sortBy === "Name (Z-A)") return b.name.localeCompare(a.name);
        return 0;
      });
  }, [suppliersList, searchQuery, isNegotiable, activeFilters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedSuppliers.length / itemsPerPage));

  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedSuppliers.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredAndSortedSuppliers]);

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
              {suppliersList.length} Saved
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
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
                      setCurrentPage(1);
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
                        setCurrentPage(1);
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
            onClick={() => {
              setIsNegotiable(!isNegotiable);
              setCurrentPage(1);
            }}
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
        {paginatedSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow relative group"
          >
            {/* Heart Icon */}
            <button
              onClick={() => toggleFavorite(supplier.favoriteId)}
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
                className={`w-[60px] h-[60px] rounded-lg border border-gray-100 flex items-center justify-center shrink-0 relative overflow-hidden ${supplier.logo ? "" : supplier.logoBg}`}
              >
                {supplier.logo ? (
                  <Image
                    src={supplier.logo}
                    alt={supplier.name}
                    fill
                    unoptimized
                    loader={imageLoader}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xl font-black text-white">
                    {supplier.name.charAt(0).toUpperCase()}
                  </span>
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
              {supplier.tags.map((tag, i: number) => (
                <div
                  key={`${tag.label}-${i}`}
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
                  onClick={() => toggleFavorite(supplier.favoriteId)}
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
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${
                currentPage === page
                  ? "bg-[#0B172E] text-white"
                  : "bg-white border border-gray-200 text-[#0B172E] hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[#0B172E] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
