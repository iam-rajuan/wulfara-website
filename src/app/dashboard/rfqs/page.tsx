"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  FileText,
  Hourglass,
  Mail,
  CheckCircle,
  Plus,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";

// Initial mock data for RFQs
const initialRfqData = [
  {
    supplier: "Steel Company A",
    product: "Steel sheets and pipes",
    quantity: "500 units",
    deadline: "Jul 15, 2026",
    status: "Pending",
    statusColor: "border-[#F97316] text-[#F97316] bg-[#FFF7ED]",
    lastUpdated: "2 hrs ago",
  },
  {
    supplier: "Global Logistics Partners",
    product: "Freight forwarding service",
    quantity: "1 Shipment",
    deadline: "Jul 20, 2026",
    status: "Responded",
    statusColor: "border-[#3B82F6] text-[#3B82F6] bg-[#EFF6FF]",
    lastUpdated: "1 day ago",
  },
  {
    supplier: "Industrial Components Inc",
    product: "Heavy duty bearings",
    quantity: "1000 units",
    deadline: "Jun 30, 2026",
    status: "Closed",
    statusColor: "border-[#6B7280] text-[#4B5563] bg-[#F3F4F6]",
    lastUpdated: "2 weeks ago",
  },
  {
    supplier: "Alpha Manufacturing",
    product: "Aluminum extrusions",
    quantity: "200 units",
    deadline: "Aug 05, 2026",
    status: "Pending",
    statusColor: "border-[#F97316] text-[#F97316] bg-[#FFF7ED]",
    lastUpdated: "5 hrs ago",
  }
];

export default function MyRFQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Date");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dynamically calculate stats based on data
  const stats = useMemo(() => {
    const total = initialRfqData.length;
    const pending = initialRfqData.filter((r) => r.status === "Pending").length;
    const responded = initialRfqData.filter((r) => r.status === "Responded").length;
    const closed = initialRfqData.filter((r) => r.status === "Closed").length;

    return [
      {
        id: "All",
        label: "Total RFQs",
        value: total,
        icon: FileText,
        iconColor: "text-gray-500",
      },
      {
        id: "Pending",
        label: "Pending",
        value: pending,
        icon: Hourglass,
        iconColor: "text-[#DFB63E]",
      },
      {
        id: "Responded",
        label: "Responded",
        value: responded,
        icon: Mail,
        iconColor: "text-[#DFB63E]",
      },
      {
        id: "Closed",
        label: "Closed",
        value: closed,
        icon: CheckCircle,
        iconColor: "text-gray-500",
      },
    ];
  }, []);

  // Filter the RFQs dynamically based on search query and status filter
  const filteredRfqs = useMemo(() => {
    let filtered = initialRfqData;
    
    // Filter by active status
    if (activeStatusFilter !== "All") {
      filtered = filtered.filter((rfq) => rfq.status === activeStatusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (rfq) =>
          rfq.supplier.toLowerCase().includes(lowerQuery) ||
          rfq.product.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [searchQuery, activeStatusFilter]);

  return (
    <div className="w-full mx-auto pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[32px] font-bold text-[#0B172E] tracking-tight mb-2">
            My RFQs
          </h2>
          <p className="text-[15px] text-gray-500">
            Track your submitted quote requests and supplier responses.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-black font-semibold py-2.5 px-5 rounded-md transition-colors text-[14px] cursor-pointer">
          <Plus size={18} strokeWidth={2.5} />
          Create New RFQ
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((card) => {
          const isActive = card.id === activeStatusFilter;
          return (
            <button
              key={card.id}
              onClick={() => setActiveStatusFilter(card.id)}
              className={`bg-white p-5 rounded-md flex flex-col justify-between h-[120px] transition-all text-left cursor-pointer ${
                isActive
                  ? "border-2 border-[#DFB63E] shadow-md transform scale-[1.02]"
                  : "border border-gray-200 shadow-sm hover:border-[#DFB63E] hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between w-full">
                <p
                  className={`text-[13px] font-bold ${
                    isActive ? "text-[#DFB63E]" : "text-gray-600"
                  }`}
                >
                  {card.label}
                </p>
                <card.icon
                  size={18}
                  className={`${card.iconColor}`}
                  strokeWidth={2}
                />
              </div>
              <p
                className={`text-5xl font-bold leading-none ${
                  isActive ? "text-[#DFB63E]" : "text-[#0B172E]"
                }`}
              >
                {card.value}
              </p>
            </button>
          );
        })}
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 border-b border-gray-200">
          {/* Search */}
          <div className="relative w-full lg:w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by supplier or product..."
              value={searchQuery}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-[14px] text-black focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E] placeholder-gray-400"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3" ref={dropdownRef}>
            {/* Status Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === "status" ? null : "status")}
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Filter size={14} className="text-gray-500" />
                {activeStatusFilter === "All" ? "Status" : activeStatusFilter}
                <ChevronDown size={14} className="text-gray-500 ml-1" />
              </button>
              {openDropdown === "status" && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10 py-1">
                  {["All", "Pending", "Responded", "Closed"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setActiveStatusFilter(opt);
                        setOpenDropdown(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === "date" ? null : "date")}
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {selectedDate}
                <ChevronDown size={14} className="text-gray-500 ml-1" />
              </button>
              {openDropdown === "date" && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10 py-1">
                  {["Date", "Today", "Last 7 days", "Last 30 days"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedDate(opt);
                        setOpenDropdown(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {selectedCategory}
                <ChevronDown size={14} className="text-gray-500 ml-1" />
              </button>
              {openDropdown === "category" && (
                <div className="absolute top-full right-0 lg:left-0 lg:right-auto mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10 py-1">
                  {["Category", "Raw Materials", "Logistics", "Components"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedCategory(opt);
                        setOpenDropdown(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                <th className="text-left text-[13px] font-bold text-gray-700 px-6 py-4">
                  Supplier
                </th>
                <th className="text-left text-[13px] font-bold text-gray-700 px-4 py-4">
                  Product/Service
                </th>
                <th className="text-left text-[13px] font-bold text-gray-700 px-4 py-4">
                  Quantity
                </th>
                <th className="text-left text-[13px] font-bold text-gray-700 px-4 py-4">
                  Deadline
                </th>
                <th className="text-left text-[13px] font-bold text-gray-700 px-4 py-4">
                  Status
                </th>
                <th className="text-left text-[13px] font-bold text-gray-700 px-6 py-4">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRfqs.length > 0 ? (
                filteredRfqs.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-[14px] text-gray-800 font-medium">
                      {row.supplier}
                    </td>
                    <td className="px-4 py-4 text-[14px] text-gray-600">
                      {row.product}
                    </td>
                    <td className="px-4 py-4 text-[14px] text-gray-600">
                      {row.quantity}
                    </td>
                    <td className="px-4 py-4 text-[14px] text-gray-600">
                      {row.deadline}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border ${row.statusColor}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-gray-500">
                      {row.lastUpdated}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-[14px] text-gray-500"
                  >
                    No RFQs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
