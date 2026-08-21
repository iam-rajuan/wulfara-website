"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronDown, Map, ChevronLeft, ChevronRight } from "lucide-react";
import SupplierHero from "@/components/suppliers/SupplierHero";
import ServiceTypeGrid from "@/components/suppliers/ServiceTypeGrid";
import SupplierFilters from "@/components/suppliers/SupplierFilters";
import SupplierCard, { SupplierData } from "@/components/suppliers/SupplierCard";
import { useGetSuppliersQuery } from "@/store/api/supplierApi";
import type { Supplier } from "@/types/api";

export default function ServiceSuppliersPage() {
  const { data, isLoading } = useGetSuppliersQuery("");
  const suppliers = useMemo(() => data?.data ?? [], [data?.data]);
  const [activeFilters, setActiveFilters] = useState<{ certifications: string[]; companySize: string }>({
    certifications: [],
    companySize: "",
  });
  const [topFilters, setTopFilters] = useState({
    query: "",
    location: "",
    type: "Manufacturing Type",
    distance: "Distance",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleFilterChange = (type: string, value: string) => {
    if (type === "certification") {
      setActiveFilters((prev) => {
        const certs = prev.certifications.includes(value)
          ? prev.certifications.filter((c) => c !== value)
          : [...prev.certifications, value];
        return { ...prev, certifications: certs };
      });
    } else if (type === "companySize") {
      setActiveFilters((prev) => ({
        ...prev,
        companySize: prev.companySize === value ? "" : value,
      }));
    }
    setCurrentPage(1);
  };

  const mappedSuppliers = useMemo<SupplierData[]>(
    () =>
      suppliers.map((supplier: Supplier) => ({
        id: supplier._id,
        name: supplier.companyName,
        verified: Boolean(supplier.isApproved),
        location: supplier.location?.formattedAddress || "Location not specified",
        distance: supplier.serviceAreas?.[0] || "Global coverage",
        response: supplier.avgResponseTime || "Replies in ~24 Hours",
        rating: supplier.averageRating || 0,
        reviews: supplier.totalReviews || 0,
        desc: supplier.description || "Supplier profile is being completed.",
        tags:
          supplier.categories?.map((category) => category.name).slice(0, 3) ||
          supplier.coreProducts?.slice(0, 3) ||
          ["Industrial Supplier"],
        certifications: supplier.certifications || [],
        companySize: supplier.employeeCount || "",
      })),
    [suppliers]
  );

  const filteredSuppliers = useMemo(() => {
    let result = [...mappedSuppliers];

    if (topFilters.query) {
      const query = topFilters.query.toLowerCase();
      result = result.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(query) ||
          supplier.desc.toLowerCase().includes(query) ||
          supplier.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (topFilters.location) {
      const location = topFilters.location.toLowerCase();
      result = result.filter((supplier) => supplier.location.toLowerCase().includes(location));
    }

    if (topFilters.type !== "Manufacturing Type") {
      result = result.filter((supplier) => supplier.tags.includes(topFilters.type));
    }

    if (activeFilters.companySize) {
      result = result.filter((supplier) => supplier.companySize === activeFilters.companySize);
    }

    if (activeFilters.certifications.length > 0) {
      result = result.filter((supplier) =>
        activeFilters.certifications.every((cert) => supplier.certifications?.includes(cert))
      );
    }

    return result;
  }, [activeFilters, mappedSuppliers, topFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredSuppliers.length / itemsPerPage));
  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredSuppliers]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SupplierHero />
      <ServiceTypeGrid />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Company or service..."
              value={topFilters.query}
              onChange={(e) => {
                setTopFilters((prev) => ({ ...prev, query: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-900 focus:outline-none focus:border-[#dca12f]"
            />
          </div>
          <div className="relative flex-[0.7]">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="City, State, ZIP..."
              value={topFilters.location}
              onChange={(e) => {
                setTopFilters((prev) => ({ ...prev, location: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-900 focus:outline-none focus:border-[#dca12f]"
            />
          </div>
          <div className="relative flex-[0.8]">
            <select
              value={topFilters.type}
              onChange={(e) => {
                setTopFilters((prev) => ({ ...prev, type: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#dca12f]"
            >
              <option value="Manufacturing Type">Manufacturing Type</option>
              {Array.from(new Set(mappedSuppliers.flatMap((supplier) => supplier.tags))).map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
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
          <SupplierFilters activeFilters={activeFilters} onFilterChange={handleFilterChange} />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-bold text-slate-900">{filteredSuppliers.length} Suppliers Found</h2>
            </div>

            {isLoading ? (
              <div className="py-12 text-center text-slate-500">Loading suppliers...</div>
            ) : paginatedSuppliers.length === 0 ? (
              <div className="py-12 text-center text-slate-500">No listed suppliers match your filters yet.</div>
            ) : (
              <div className="space-y-4">
                {paginatedSuppliers.map((supplier) => (
                  <SupplierCard key={supplier.id} sup={supplier} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                      currentPage === index + 1
                        ? "bg-[#dca12f] text-slate-900 font-bold shadow-sm"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
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
