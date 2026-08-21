"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useCreateRfqMutation, useGetRfqUploadUrlMutation } from "@/store/api/rfqApi";
import { useGetSuppliersQuery } from "@/store/api/supplierApi";
import toast from "react-hot-toast";
import { 
  Building2, 
  ChevronLeft, 
  Send, 
  Search,
  CheckCircle2,
  MapPin,
  Loader2,
  UploadCloud,
  FileText,
  X
} from "lucide-react";

export default function CreateRfqPage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [createRfq, { isLoading: isSubmitting }] = useCreateRfqMutation();
  const [getRfqUploadUrl] = useGetRfqUploadUrlMutation();
  const { data: suppliersResponse, isLoading: isLoadingSuppliers } = useGetSuppliersQuery("");

  const suppliers = suppliersResponse?.data || [];

  // Form State
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    buyerName: user?.name || "",
    buyerEmail: user?.email || "",
    buyerPhone: user?.phone || "",
    productNeeded: "",
    quantity: "",
    unit: "Units",
    expectedDelivery: "",
    additionalNotes: "",
  });

  // Filter suppliers by search term
  const filteredSuppliers = suppliers.filter(s => 
    s.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedSupplier = suppliers.find(s => s._id === selectedSupplierId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSupplierId) {
      toast.error("Please select a supplier");
      return;
    }

    setIsUploading(true);
    try {
      const attachmentUrls: string[] = [];
      
      // Upload attachments sequentially
      for (const file of attachments) {
        const res = await getRfqUploadUrl({ contentType: file.type }).unwrap();
        const { uploadUrl, fileUrl } = res.data;
        
        await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type }
        });
        
        if (fileUrl) {
          attachmentUrls.push(fileUrl);
        }
      }

      const detailsText = `Expected Delivery: ${formData.expectedDelivery}\nUnit: ${formData.unit}\n\n${formData.additionalNotes}`;
      
      const payload = {
        supplierId: selectedSupplierId,
        buyerName: formData.buyerName,
        buyerEmail: formData.buyerEmail,
        buyerPhone: formData.buyerPhone,
        subject: `RFQ: ${formData.productNeeded}`,
        quantity: Number(formData.quantity),
        details: detailsText,
        attachments: attachmentUrls,
      };

      const res = await createRfq(payload).unwrap();
      if (res.success) {
        toast.success("RFQ submitted successfully!");
        router.push("/dashboard/rfqs");
      } else {
        toast.error(res.message || "Failed to submit RFQ");
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error("An error occurred while submitting RFQ");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-10">
      {/* Back Link */}
      <div className="mb-6">
        <Link 
          href="/dashboard/rfqs" 
          className="flex items-center gap-1.5 text-[13px] font-bold text-gray-600 hover:text-black transition-colors"
        >
          <ChevronLeft size={16} />
          Back to My RFQs
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#0B172E] tracking-tight mb-2">
          New Request for Quote (RFQ)
        </h1>
        <p className="text-[15px] text-gray-500">
          Submit details for the product or service you need to a verified supplier.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 sm:p-8">
        <form key={user?._id || "guest"} onSubmit={handleSubmit} className="space-y-6">
          
          {/* Supplier Selector */}
          <div className="relative">
            <label className="block text-sm font-bold text-[#1b2b3a] mb-2">
              Select Supplier <span className="text-red-500">*</span>
            </label>
            
            {selectedSupplier ? (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#E0E7FF] flex items-center justify-center text-[#3730A3] font-bold">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B172E]">{selectedSupplier.companyName}</h4>
                    <div className="flex items-center gap-2 text-[12px] text-gray-500">
                      <MapPin size={12} />
                      {selectedSupplier.contactInfo?.address || "Global"}
                      {selectedSupplier.isApproved && (
                        <span className="flex items-center gap-0.5 text-blue-600 font-bold uppercase tracking-wider text-[10px]">
                          <CheckCircle2 size={10} /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSupplierId("");
                    setSearchTerm("");
                  }}
                  className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>
            ) : (
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search suppliers by name..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DFB63E]/50 focus:border-[#DFB63E] transition-colors text-sm"
                  />
                </div>

                {showDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {isLoadingSuppliers ? (
                      <div className="p-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin" size={16} />
                        Loading suppliers...
                      </div>
                    ) : filteredSuppliers.length === 0 ? (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No suppliers found matching &quot;{searchTerm}&quot;
                      </div>
                    ) : (
                      filteredSuppliers.map((supplier) => (
                        <div
                          key={supplier._id}
                          onClick={() => {
                            setSelectedSupplierId(supplier._id);
                            setShowDropdown(false);
                          }}
                          className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <p className="font-bold text-sm text-[#0B172E]">{supplier.companyName}</p>
                            <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                              <MapPin size={10} />
                              {supplier.contactInfo?.address || "Global"}
                            </p>
                          </div>
                          {supplier.isApproved && (
                            <span className="flex items-center gap-0.5 text-blue-600 font-bold uppercase tracking-wider text-[9px] bg-blue-50 px-1.5 py-0.5 rounded">
                              <CheckCircle2 size={10} /> Verified
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#1b2b3a] mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required
                value={formData.buyerName}
                onChange={(e) => setFormData({...formData, buyerName: e.target.value})}
                placeholder="e.g., John Doe" 
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DFB63E]/50 focus:border-[#DFB63E] transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1b2b3a] mb-2">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                required
                value={formData.buyerEmail}
                onChange={(e) => setFormData({...formData, buyerEmail: e.target.value})}
                placeholder="e.g., john@example.com" 
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DFB63E]/50 focus:border-[#DFB63E] transition-colors text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#1b2b3a] mb-2">Phone Number</label>
              <input 
                type="text" 
                value={formData.buyerPhone}
                onChange={(e) => setFormData({...formData, buyerPhone: e.target.value})}
                placeholder="e.g., +1 234 567 890" 
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DFB63E]/50 focus:border-[#DFB63E] transition-colors text-sm"
              />
            </div>
            
            {/* Product / Service */}
            <div>
              <label className="block text-sm font-bold text-[#1b2b3a] mb-2">
                Product/Service Needed <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required
                value={formData.productNeeded}
                onChange={(e) => setFormData({...formData, productNeeded: e.target.value})}
                placeholder="e.g., Steel pipes, Hot rolled steel" 
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DFB63E]/50 focus:border-[#DFB63E] transition-colors text-sm"
              />
            </div>
          </div>

          {/* Quantity & Date Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#1b2b3a] mb-2">
                Quantity <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <input 
                  type="number" 
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="e.g., 500" 
                  className="w-full flex-1 px-4 py-3 rounded-l-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DFB63E]/50 focus:border-[#DFB63E] transition-colors text-sm"
                />
                <select 
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="px-4 py-3 rounded-r-lg border-y border-r border-slate-200 bg-slate-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#DFB63E]/50 focus:border-[#DFB63E] transition-colors cursor-pointer border-l shrink-0"
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
              <label className="block text-sm font-bold text-[#1b2b3a] mb-2">
                Expected Delivery/Deadline <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                required
                value={formData.expectedDelivery}
                onChange={(e) => setFormData({...formData, expectedDelivery: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DFB63E]/50 focus:border-[#DFB63E] transition-colors text-sm"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-bold text-[#1b2b3a] mb-2">Additional Notes / Specifications</label>
            <textarea 
              rows={4}
              required
              value={formData.additionalNotes}
              onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
              placeholder="Provide any specific requirements, tolerances, or shipping instructions..." 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DFB63E]/50 focus:border-[#DFB63E] transition-colors text-sm resize-y"
            ></textarea>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-bold text-[#1b2b3a] mb-2">Attachments (Optional)</label>
            <div 
              className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer p-8 flex flex-col items-center justify-center text-center group relative"
            >
              <input 
                type="file" 
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files) {
                    setAttachments([...attachments, ...Array.from(e.target.files)]);
                  }
                }}
              />
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-slate-400 group-hover:text-[#DFB63E] group-hover:scale-110 transition-all">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm font-bold text-[#1b2b3a] mb-1">Drag & drop files here</p>
              <p className="text-xs text-slate-500 mb-4">or click to browse from your computer</p>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Supported formats: PDF, DOCX, XLSX, JPG, PNG (Max 20MB)</p>
            </div>
            
            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-[#DFB63E]" />
                      <span className="text-sm font-medium text-slate-700">{file.name}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
            <Link 
              href="/dashboard/rfqs"
              className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              disabled={isSubmitting || isUploading}
              className="px-6 py-2.5 bg-[#DFB63E] hover:bg-[#cba433] text-black text-sm font-bold rounded transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting || isUploading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  {isUploading ? "Uploading files..." : "Submitting..."}
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit RFQ
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Close dropdown on click outside */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
