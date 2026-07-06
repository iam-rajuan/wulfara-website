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
  X,
  Eye,
  Download
} from "lucide-react";
import Link from "next/link";

// Initial mock data for RFQs
const initialRfqData = [
  {
    id: "RFQ-1048",
    supplier: "Steel Company A",
    product: "Steel sheets and pipes",
    quantity: "500 units",
    deadline: "Jul 15, 2026",
    status: "Pending",
    statusColor: "border-[#F97316] text-[#F97316] bg-[#FFF7ED]",
    lastUpdated: "2 hrs ago",
  },
  {
    id: "RFQ-1049",
    supplier: "Global Logistics Partners",
    product: "Freight forwarding service",
    quantity: "1 Shipment",
    deadline: "Jul 20, 2026",
    status: "Responded",
    statusColor: "border-[#3B82F6] text-[#3B82F6] bg-[#EFF6FF]",
    lastUpdated: "1 day ago",
  },
  {
    id: "RFQ-1050",
    supplier: "Industrial Components Inc",
    product: "Heavy duty bearings",
    quantity: "1000 units",
    deadline: "Jun 30, 2026",
    status: "Closed",
    statusColor: "border-[#6B7280] text-[#4B5563] bg-[#F3F4F6]",
    lastUpdated: "2 weeks ago",
  },
  {
    id: "RFQ-1051",
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
  const [rfqData, setRfqData] = useState(initialRfqData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Date");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRfq, setNewRfq] = useState({ supplier: "", product: "", quantity: "", deadline: "" });

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

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRfq.supplier || !newRfq.product || !newRfq.deadline) return;
    
    // Format date from YYYY-MM-DD to "Mon DD, YYYY" format
    const dateObj = new Date(newRfq.deadline);
    const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    // Generate a random ID for the new RFQ
    const newId = `RFQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newEntry = {
      id: newId,
      supplier: newRfq.supplier,
      product: newRfq.product,
      quantity: newRfq.quantity || "1 unit",
      deadline: formattedDate !== "Invalid Date" ? formattedDate : newRfq.deadline,
      status: "Pending",
      statusColor: "border-[#F97316] text-[#F97316] bg-[#FFF7ED]",
      lastUpdated: "Just now",
    };
    
    setRfqData([newEntry, ...rfqData]);
    setIsCreateModalOpen(false);
    setNewRfq({ supplier: "", product: "", quantity: "", deadline: "" });
  };

  const handleDownloadCSV = () => {
    const headers = ["RFQ ID", "Supplier Name", "Product/Service", "Quantity", "Deadline", "Status", "Last Updated"];
    const csvRows = filteredRfqs.map(rfq => [
      rfq.id,
      `"${rfq.supplier}"`,
      `"${rfq.product}"`,
      `"${rfq.quantity}"`,
      `"${rfq.deadline}"`,
      rfq.status,
      `"${rfq.lastUpdated}"`
    ]);
    const csvContent = [headers.join(","), ...csvRows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "My_RFQs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamically calculate stats based on data
  const stats = useMemo(() => {
    const total = rfqData.length;
    const pending = rfqData.filter((r) => r.status === "Pending").length;
    const responded = rfqData.filter((r) => r.status === "Responded").length;
    const closed = rfqData.filter((r) => r.status === "Closed").length;

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
  }, [rfqData]);

  // Filter the RFQs dynamically based on search query and status filter
  const filteredRfqs = useMemo(() => {
    let filtered = rfqData;
    
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
  }, [searchQuery, activeStatusFilter, rfqData]);

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
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-black font-semibold py-2.5 px-5 rounded-md transition-colors text-[14px] cursor-pointer"
        >
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
            
            {/* Export Button */}
            <button 
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer ml-2"
            >
              <Download size={14} className="text-gray-500" />
              Export CSV
            </button>
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRfqs.length > 0 ? (
                filteredRfqs.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-[14px]">
                      <Link 
                        href={`/dashboard/rfqs/${row.id}`} 
                        className="font-bold text-[#0B172E] hover:text-[#DFB63E] transition-colors"
                      >
                        {row.supplier}
                      </Link>
                      <div className="text-[11px] text-gray-500 mt-0.5">{row.id}</div>
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
                    <td className="px-6 py-4">
                      <Link 
                        href={`/dashboard/rfqs/${row.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-[12px] font-bold rounded-md hover:bg-gray-50 hover:text-[#0B172E] hover:border-gray-300 transition-all"
                      >
                        <Eye size={14} />
                        View
                      </Link>
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

      {/* Create New RFQ Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl relative animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-[18px] font-bold text-[#0B172E]">Create New RFQ</h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body / Form */}
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Supplier Name</label>
                <input 
                  type="text" 
                  required
                  value={newRfq.supplier}
                  onChange={(e) => setNewRfq({...newRfq, supplier: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] text-black focus:outline-none focus:border-[#DFB63E] focus:ring-1 focus:ring-[#DFB63E]"
                  placeholder="e.g. Steel Company A"
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Product/Service</label>
                <input 
                  type="text" 
                  required
                  value={newRfq.product}
                  onChange={(e) => setNewRfq({...newRfq, product: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] text-black focus:outline-none focus:border-[#DFB63E] focus:ring-1 focus:ring-[#DFB63E]"
                  placeholder="e.g. Steel sheets and pipes"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Quantity</label>
                  <input 
                    type="text" 
                    required
                    value={newRfq.quantity}
                    onChange={(e) => setNewRfq({...newRfq, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] text-black focus:outline-none focus:border-[#DFB63E] focus:ring-1 focus:ring-[#DFB63E]"
                    placeholder="e.g. 500 units"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Deadline</label>
                  <input 
                    type="date" 
                    required
                    value={newRfq.deadline}
                    onChange={(e) => setNewRfq({...newRfq, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] text-gray-700 focus:outline-none focus:border-[#DFB63E] focus:ring-1 focus:ring-[#DFB63E]"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-[13px] font-bold bg-[#DFB63E] hover:bg-[#cba433] text-black rounded-md transition-colors shadow-sm cursor-pointer"
                >
                  Submit RFQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
