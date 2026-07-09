"use client";

import React from "react";
import { Circle, ChevronDown } from "lucide-react";

interface SupplierFiltersProps {
  onFilterChange: (type: string, value: string) => void;
  activeFilters: {
    certifications: string[];
    companySize: string;
  };
}

export default function SupplierFilters({ onFilterChange, activeFilters }: SupplierFiltersProps) {
  const toggleCertification = (cert: string) => {
    onFilterChange('certification', cert);
  };

  const setCompanySize = (size: string) => {
    onFilterChange('companySize', size);
  };

  return (
    <div className="w-full md:w-[240px] shrink-0 space-y-6">
      {/* Certifications Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Certifications</h3>
        <div className="space-y-3">
          {['ISO 9001', 'AS9100', 'ITAR Registered'].map(cert => (
            <label key={cert} className="flex items-center gap-3 cursor-pointer group">
              <div 
                onClick={() => toggleCertification(cert)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  activeFilters.certifications.includes(cert) 
                    ? 'bg-[#dca12f] border-[#dca12f]' 
                    : 'border-slate-300 group-hover:border-[#dca12f] bg-white'
                }`}
              >
                {activeFilters.certifications.includes(cert) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-[13px] text-slate-600">{cert}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Company Size Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Company Size</h3>
        <div className="space-y-3">
          {['Small (1-50)', 'Medium (51-250)', 'Large (201+)'].map(size => (
            <label key={size} className="flex items-center gap-3 cursor-pointer group" onClick={() => setCompanySize(size)}>
              <Circle size={16} fill={activeFilters.companySize === size ? '#dca12f' : 'transparent'} className={activeFilters.companySize === size ? "text-[#dca12f]" : "text-slate-300 group-hover:text-[#dca12f]"} />
              <span className="text-[13px] text-slate-600">{size}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
