"use client";

import {
  FileText,
  Hourglass,
  Mail,
  CheckCircle,
  Plus,
  Search,
  Filter,
  ChevronDown
} from "lucide-react";

const statCards = [
  {
    label: "Total RFQs",
    value: "24",
    icon: FileText,
    iconColor: "text-gray-500",
    active: false,
  },
  {
    label: "Pending",
    value: "8",
    icon: Hourglass,
    iconColor: "text-[#DFB63E]",
    active: false,
  },
  {
    label: "Responded",
    value: "12",
    icon: Mail,
    iconColor: "text-[#DFB63E]",
    active: true,
  },
  {
    label: "Closed",
    value: "4",
    icon: CheckCircle,
    iconColor: "text-gray-500",
    active: false,
  },
];

const rfqData = [
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
];

export default function MyRFQsPage() {
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
        <button className="flex items-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-black font-semibold py-2.5 px-5 rounded-md transition-colors text-[14px]">
          <Plus size={18} strokeWidth={2.5} />
          Create New RFQ
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-white p-5 rounded-md flex flex-col justify-between h-[120px] transition-all ${
              card.active
                ? "border-2 border-[#DFB63E]"
                : "border border-gray-200 shadow-sm"
            }`}
          >
            <div className="flex items-start justify-between">
              <p
                className={`text-[13px] font-bold ${
                  card.active ? "text-[#DFB63E]" : "text-gray-600"
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
                card.active ? "text-[#DFB63E]" : "text-[#0B172E]"
              }`}
            >
              {card.value}
            </p>
          </div>
        ))}
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
              placeholder="Search by RFQ ID..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E] placeholder-gray-400"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter size={14} className="text-gray-500" />
              Status
              <ChevronDown size={14} className="text-gray-500 ml-1" />
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              Date
              <ChevronDown size={14} className="text-gray-500 ml-1" />
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              Category
              <ChevronDown size={14} className="text-gray-500 ml-1" />
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
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {rfqData.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-[14px] text-gray-800">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
