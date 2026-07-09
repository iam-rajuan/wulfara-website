"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  MapPin, 
  Building2, 
  Clock, 
  ExternalLink, 
  MessageSquare, 
  Send, 
  UploadCloud,
  FileText,
  ChevronLeft
} from "lucide-react";

// Mock data (same as the supplier profile page for consistency)
const mockSupplier = {
  id: "1",
  name: "Steel Company A",
  verified: true,
  isGold: true,
  location: "New York, USA",
  distance: "12 miles away",
  replyTime: "Replies in 2 hours",
  categories: ["Manufacturer", "Distributor"],
  services: [
    { title: "Structural Steel" },
    { title: "Hot Rolled" },
    { title: "Custom Fabrication" },
    { title: "Raw Steel Coils" }
  ]
};

export default function SendRFQPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  // In a real app, you would fetch supplier data based on resolvedParams.id
  const supplier = {
    ...mockSupplier,
    businessType: mockSupplier.categories.join(", "),
    coreServices: mockSupplier.services.map(s => s.title).slice(0, 3).join(", "),
    responseAvg: mockSupplier.replyTime,
  };

  const [formData, setFormData] = useState({
    productNeeded: "",
    quantity: "",
    unit: "Units",
    expectedDelivery: "",
    additionalNotes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("RFQ submitted successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        
        {/* Back Navigation */}
        <Link href={`/suppliers/${resolvedParams.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors">
          <ChevronLeft size={16} /> Back to Supplier Profile
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#1b2b3a] tracking-tight mb-2">Send RFQ</h1>
          <p className="text-slate-500 text-sm font-medium">Request pricing, availability, and delivery details directly from the supplier.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Form Area */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#1b2b3a] mb-6">Request for Quotation</h2>
            
            <div className="flex items-center gap-2 mb-8">
              <span className="text-sm font-medium text-slate-500">To:</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">
                {supplier.name}
                {supplier.verified && <CheckCircle2 size={14} className="text-blue-600 fill-blue-100" />}
              </div>
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* Product / Service */}
              <div>
                <label className="block text-sm font-bold text-[#1b2b3a] mb-2">Product/Service Needed <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={formData.productNeeded}
                  onChange={(e) => setFormData({...formData, productNeeded: e.target.value})}
                  placeholder="e.g., Hot Rolled Steel Coils, ASTM A36" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors text-sm"
                />
              </div>

              {/* Quantity & Date Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1b2b3a] mb-2">Quantity <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <input 
                      type="number" 
                      required
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      placeholder="e.g., 500" 
                      className="w-full flex-1 px-4 py-3 rounded-l-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors text-sm"
                    />
                    <select 
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="px-4 py-3 rounded-r-lg border-y border-r border-slate-200 bg-slate-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors cursor-pointer border-l shrink-0"
                    >
                      <option>Units</option>
                      <option>Tons</option>
                      <option>Kg</option>
                      <option>Pieces</option>
                      <option>Meters</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#1b2b3a] mb-2">Expected Delivery/Deadline <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="date" 
                      required
                      value={formData.expectedDelivery}
                      onChange={(e) => setFormData({...formData, expectedDelivery: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-bold text-[#1b2b3a] mb-2">Additional Notes / Specifications</label>
                <textarea 
                  rows={4}
                  value={formData.additionalNotes}
                  onChange={(e) => {
                    setFormData({...formData, additionalNotes: e.target.value});
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  placeholder="Provide any specific requirements, tolerances, or shipping instructions..." 
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors text-sm resize-none overflow-hidden"
                ></textarea>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-bold text-[#1b2b3a] mb-2">Attachments (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer p-8 flex flex-col items-center justify-center text-center group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-slate-400 group-hover:text-[#dca12f] group-hover:scale-110 transition-all">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-sm font-bold text-[#1b2b3a] mb-1">Drag & drop files here</p>
                  <p className="text-xs text-slate-500 mb-4">or click to browse from your computer</p>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Supported formats: PDF, DOCX, XLSX, JPG, PNG (Max 20MB)</p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 mt-4 pt-6 border-t border-slate-100">
                <Link 
                  href={`/suppliers/${resolvedParams.id}`}
                  className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Cancel
                </Link>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 text-sm font-bold rounded transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send size={16} /> {isSubmitting ? "Submitting..." : "Submit RFQ"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6">
            
            {/* Supplier Summary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                   <Building2 className="text-slate-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1b2b3a] text-lg leading-tight flex items-center gap-1.5 mb-1">
                    {supplier.name}
                  </h3>
                  {supplier.verified && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      <CheckCircle2 size={12} className="fill-blue-100" /> Verified Supplier
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 text-sm mb-8">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
                    <p className="font-medium text-slate-700">{supplier.location} <span className="text-blue-500 font-normal">({supplier.distance})</span></p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Business Type</p>
                    <p className="font-medium text-slate-700">{supplier.businessType}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Core Services</p>
                    <p className="font-medium text-slate-700">{supplier.coreServices}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Avg. Response Time</p>
                    <p className="font-medium text-slate-700">{supplier.responseAvg}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full py-2.5 bg-white border border-slate-300 text-[#1b2b3a] text-sm font-bold rounded hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <ExternalLink size={16} /> Visit Company Website
                </button>
                <button className="w-full py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-bold rounded transition-colors flex items-center justify-center gap-2">
                  <MessageSquare size={16} /> Message Supplier
                </button>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-8">
              <h3 className="font-bold text-[#1b2b3a] flex items-center gap-2 mb-4">
                <Clock size={18} className="text-[#dca12f]" /> What happens next?
              </h3>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <p>Your RFQ is sent securely to the supplier&apos;s verified contacts.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <p>You will receive an email notification when they review or reply to your request.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <p>Manage all your quotes and communications from your WULFARA Dashboard.</p>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
