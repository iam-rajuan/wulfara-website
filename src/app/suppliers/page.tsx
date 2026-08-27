"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronDown, Map, ChevronLeft, ChevronRight } from "lucide-react";
import SupplierHero from "@/components/suppliers/SupplierHero";
import ServiceTypeGrid, { SERVICE_TYPE_OPTIONS } from "@/components/suppliers/ServiceTypeGrid";
import SupplierFilters from "@/components/suppliers/SupplierFilters";
import SupplierCard, { SupplierData } from "@/components/suppliers/SupplierCard";
import { useGetSuppliersQuery } from "@/store/api/supplierApi";
import type { Supplier } from "@/types/api";

const SUPPLIER_TYPE_OPTIONS = [
  "Manufacturer",
  "Distributor",
  "Wholesaler",
  "Broker",
  "Service Provider",
] as const;

const COMPANY_SIZE_FILTERS = {
  "Small (1-50)": { min: 1, max: 50 },
  "Medium (51-250)": { min: 51, max: 250 },
  "Large (201+)": { min: 251, max: Number.POSITIVE_INFINITY },
} as const;

type SidebarFilters = {
  certifications: string[];
  companySize: string;
};

type SearchFilters = {
  query: string;
  location: string;
  supplierType: string;
  distance: string;
  negotiableOnly: boolean;
};

type SupplierDirectoryRecord = SupplierData & {
  rawCompanySize: string;
  rawSupplierType: string;
  searchIndex: string;
  products: Supplier["products"];
};

const initialSidebarFilters: SidebarFilters = {
  certifications: [],
  companySize: "",
};

const initialSearchFilters: SearchFilters = {
  query: "",
  location: "",
  supplierType: "",
  distance: "",
  negotiableOnly: false,
};

const normalizeText = (value: string | undefined | null) => (value || "").trim().toLowerCase();

const buildSearchIndex = (supplier: Supplier) =>
  [
    supplier.companyName,
    supplier.description,
    supplier.location?.formattedAddress,
    supplier.supplierType,
    supplier.contactEmail,
    supplier.contactPhone,
    supplier.website,
    ...(supplier.coreProducts || []),
    ...(supplier.certifications || []),
    ...(supplier.serviceAreas || []),
    ...(supplier.categories || []).map((category) => category.name || ""),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const parseEmployeeCount = (value: string | undefined) => {
  if (!value) {
    return null;
  }

  const matches = value.match(/\d+/g);
  if (!matches || matches.length === 0) {
    return null;
  }

  const numbers = matches.map((entry) => Number.parseInt(entry, 10)).filter((entry) => !Number.isNaN(entry));
  if (numbers.length === 0) {
    return null;
  }

  return numbers[numbers.length - 1];
};

const matchesCompanySize = (rawCompanySize: string, selectedSize: string) => {
  if (!selectedSize) {
    return true;
  }

  const sizeRange = COMPANY_SIZE_FILTERS[selectedSize as keyof typeof COMPANY_SIZE_FILTERS];
  const parsedCount = parseEmployeeCount(rawCompanySize);

  if (!sizeRange || parsedCount === null) {
    return false;
  }

  return parsedCount >= sizeRange.min && parsedCount <= sizeRange.max;
};

const hasNegotiablePricing = (products: Supplier["products"]) =>
  (products || []).some((product) => {
    if (!product || typeof product === "string") {
      return false;
    }

    const priceVisibility = normalizeText("priceVis" in product ? String(product.priceVis) : "");
    return priceVisibility.includes("quote") || priceVisibility.includes("negotiable");
  });

const buildSupplierQueryString = (filters: SearchFilters, selectedService: string) => {
  const params = new URLSearchParams();
  const keywords = [filters.query, selectedService].map((value) => value.trim()).filter(Boolean);

  params.set("listed", "true");

  if (keywords.length > 0) {
    params.set("keyword", keywords.join(" "));
  }

  if (filters.supplierType.trim()) {
    params.set("supplierType", filters.supplierType.trim());
  }

  if (filters.location.trim()) {
    params.set("location", filters.location.trim());
  }

  if (filters.distance && filters.location.trim()) {
    params.set("distance", filters.distance);
  }

  return params.toString();
};

export default function ServiceSuppliersPage() {
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const [sidebarFilters, setSidebarFilters] = useState<SidebarFilters>(initialSidebarFilters);
  const [draftFilters, setDraftFilters] = useState<SearchFilters>(initialSearchFilters);
  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>(initialSearchFilters);
  const [selectedService, setSelectedService] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const updateSupplierType = (value: string) => {
    setSelectedService("");
    setDraftFilters((prev) => ({ ...prev, supplierType: value }));
  };

  const supplierQueryString = useMemo(
    () => buildSupplierQueryString(appliedFilters, selectedService),
    [appliedFilters, selectedService]
  );

  const { data, isLoading, isFetching } = useGetSuppliersQuery(supplierQueryString);
  const suppliers = useMemo(() => data?.data ?? [], [data?.data]);

  const mappedSuppliers = useMemo<SupplierDirectoryRecord[]>(
    () =>
      suppliers.map((supplier: Supplier) => {
        const tags = Array.from(
          new Set(
            [
              supplier.supplierType,
              ...(supplier.categories?.map((category) => category.name).filter(Boolean) || []),
              ...(supplier.coreProducts || []),
            ].filter(Boolean)
          )
        ).slice(0, 5) as string[];

        return {
          id: supplier._id,
          name: supplier.companyName,
          verified: Boolean(supplier.isApproved),
          featured: Boolean(supplier.featuredHeroPlacement?.enabled),
          location: supplier.location?.formattedAddress || "Location not specified",
          distance: supplier.serviceAreas?.[0] || "Global coverage",
          response: supplier.avgResponseTime || "Replies in ~24 Hours",
          rating: supplier.averageRating || 0,
          reviews: supplier.totalReviews || 0,
          desc: supplier.description || "Supplier profile is being completed.",
          tags: tags.length > 0 ? tags : ["Industrial Supplier"],
          certifications: supplier.certifications || [],
          companySize: supplier.employeeCount || "",
          rawCompanySize: supplier.employeeCount || "",
          rawSupplierType: supplier.supplierType || "",
          image: supplier.logo && supplier.logo !== "no-logo.jpg" ? supplier.logo : undefined,
          website: supplier.website || undefined,
          searchIndex: buildSearchIndex(supplier),
          products: supplier.products,
        };
      }),
    [suppliers]
  );

  const supplierTypeOptions = useMemo(() => [...SUPPLIER_TYPE_OPTIONS], []);

  const applySearchFilters = () => {
    setAppliedFilters({ ...draftFilters });
    setCurrentPage(1);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const browseSuppliers = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setCurrentPage(1);
    setAppliedFilters((prev) => ({ ...prev }));
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleSidebarFilterChange = (type: string, value: string) => {
    if (type === "certification") {
      setSidebarFilters((prev) => {
        const certifications = prev.certifications.includes(value)
          ? prev.certifications.filter((cert) => cert !== value)
          : [...prev.certifications, value];

        return { ...prev, certifications };
      });
    } else if (type === "companySize") {
      setSidebarFilters((prev) => ({
        ...prev,
        companySize: prev.companySize === value ? "" : value,
      }));
    }

    setCurrentPage(1);
  };

  const filteredSuppliers = useMemo(() => {
    return mappedSuppliers.filter((supplier) => {
      const query = normalizeText(appliedFilters.query);
      const location = normalizeText(appliedFilters.location);
      const supplierType = normalizeText(appliedFilters.supplierType);
      const service = normalizeText(selectedService);

      if (query && !supplier.searchIndex.includes(query)) {
        return false;
      }

      if (location && !normalizeText(supplier.location).includes(location)) {
        return false;
      }

      if (supplierType && normalizeText(supplier.rawSupplierType) !== supplierType) {
        return false;
      }

      if (service) {
        const serviceTerms = service.split(/\s+/).filter(Boolean);
        const serviceMatches = serviceTerms.every((term) => supplier.searchIndex.includes(term));
        if (!serviceMatches) {
          return false;
        }
      }

      if (!matchesCompanySize(supplier.rawCompanySize, sidebarFilters.companySize)) {
        return false;
      }

      if (
        sidebarFilters.certifications.length > 0 &&
        !sidebarFilters.certifications.every((certification) =>
          supplier.certifications?.some((value) => normalizeText(value) === normalizeText(certification))
        )
      ) {
        return false;
      }

      if (appliedFilters.negotiableOnly && !hasNegotiablePricing(supplier.products)) {
        return false;
      }

      return true;
    });
  }, [appliedFilters, mappedSuppliers, selectedService, sidebarFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredSuppliers.length / itemsPerPage));
  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredSuppliers]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SupplierHero
        query={draftFilters.query}
        location={draftFilters.location}
        serviceType={draftFilters.supplierType}
        distance={draftFilters.distance}
        negotiableOnly={draftFilters.negotiableOnly}
        serviceOptions={supplierTypeOptions}
        onQueryChange={(value) => setDraftFilters((prev) => ({ ...prev, query: value }))}
        onLocationChange={(value) => setDraftFilters((prev) => ({ ...prev, location: value }))}
        onServiceTypeChange={updateSupplierType}
        onDistanceChange={(value) => setDraftFilters((prev) => ({ ...prev, distance: value }))}
        onNegotiableOnlyChange={(value) => setDraftFilters((prev) => ({ ...prev, negotiableOnly: value }))}
        onSearch={applySearchFilters}
        onBrowse={browseSuppliers}
      />

      <ServiceTypeGrid selectedService={selectedService} onSelectService={handleServiceSelect} />

      <div ref={resultsRef} className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Company or service..."
              value={draftFilters.query}
              onChange={(e) => setDraftFilters((prev) => ({ ...prev, query: e.target.value }))}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-900 focus:outline-none focus:border-[#dca12f]"
            />
          </div>
          <div className="relative flex-[0.7]">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="City, State, ZIP..."
              value={draftFilters.location}
              onChange={(e) => setDraftFilters((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-900 focus:outline-none focus:border-[#dca12f]"
            />
          </div>
          <div className="relative flex-[0.8]">
            <select
              value={draftFilters.supplierType}
              onChange={(e) => updateSupplierType(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-700 appearance-none focus:outline-none focus:border-[#dca12f]"
            >
              <option value="">Supplier Type</option>
              {supplierTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
          <button
            type="button"
            onClick={applySearchFilters}
            className="px-6 py-2.5 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 text-sm font-bold rounded transition-colors shadow-sm shrink-0 whitespace-nowrap"
          >
            Apply Filters
          </button>
          <Link href="/suppliers/map" className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded transition-colors shadow-sm shrink-0 flex items-center gap-2 whitespace-nowrap">
            <Map size={16} /> Map View
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <SupplierFilters activeFilters={sidebarFilters} onFilterChange={handleSidebarFilterChange} />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-bold text-slate-900">
                {filteredSuppliers.length} Suppliers Found
              </h2>
              {isFetching && !isLoading ? (
                <span className="text-sm text-slate-500">Refreshing results...</span>
              ) : null}
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
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    type="button"
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
                  type="button"
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
