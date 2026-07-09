import React, { useState } from 'react';
import { X, MapPin, Clock, CheckCircle2, UploadCloud, Send } from 'lucide-react';

interface MessageSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: {
    name: string;
    verified: boolean;
    location: string;
    replyTime: string;
  };
}

export default function MessageSupplierModal({ isOpen, onClose, supplier }: MessageSupplierModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      alert("Message sent successfully!");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-black text-[#1b2b3a]">Contact {supplier.name}</h2>
          <button 
            onClick={onClose}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1 bg-white">
          <p className="text-sm text-slate-600 mb-6">
            Ask for price, negotiate rate, discuss order quantity, and shipping details.
          </p>

          {/* Supplier Info Card */}
          <div className="bg-[#FAFAFA] border border-slate-100 rounded-lg p-4 flex gap-4 items-center mb-8">
            <div className="w-12 h-12 bg-[#F1F5F9] rounded border border-slate-200 flex items-center justify-center text-2xl font-black text-[#1b2b3a] shrink-0">
              {supplier.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-bold text-[#1b2b3a]">{supplier.name}</span>
                {supplier.verified && <CheckCircle2 size={14} className="text-blue-600 fill-blue-100" />}
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1"><MapPin size={12} /> {supplier.location}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {supplier.replyTime}</span>
              </div>
            </div>
          </div>

          <form id="message-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#1b2b3a] mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1b2b3a] mb-1.5">Business Email <span className="text-red-500">*</span></label>
                <input required type="email" placeholder="john@company.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#1b2b3a] mb-1.5">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1b2b3a] mb-1.5">Product/Service Needed <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="e.g., Cold Rolled Steel Coils" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#1b2b3a] mb-1.5">Estimated Quantity</label>
                <input type="text" placeholder="e.g., 50 Metric Tons" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1b2b3a] mb-1.5">Required By (Deadline)</label>
                <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1b2b3a] mb-1.5">Detailed Message <span className="text-red-500">*</span></label>
              <textarea 
                required 
                rows={4} 
                placeholder="Please provide specific details about specifications, grades, delivery location, and any other requirements..." 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 focus:border-[#dca12f] transition-colors resize-none overflow-hidden" 
                onChange={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1b2b3a] mb-1.5">Attachments (Optional)</label>
              <div className="border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer p-8 flex flex-col items-center justify-center text-center">
                <UploadCloud size={28} className="text-blue-50 mb-3" strokeWidth={1.5} style={{ color: 'transparent', fill: '#e0e7ff' }} />
                <p className="text-sm font-bold text-[#1b2b3a] mb-1">Drag & drop files here</p>
                <p className="text-xs text-slate-500">or click to browse from your computer</p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4 px-6 flex justify-end gap-4 bg-slate-50 shrink-0 rounded-b-xl">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-slate-300 text-[#1b2b3a] text-sm font-bold rounded hover:bg-slate-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            form="message-form"
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 text-sm font-bold rounded shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            <Send size={16} /> {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </div>
  );
}
