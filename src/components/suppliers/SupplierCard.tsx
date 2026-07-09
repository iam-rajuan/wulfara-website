import React from "react";
import Link from "next/link";
import { BadgeCheck, MapPin, Map, Star, Settings, Factory as FactoryIcon } from "lucide-react";

export interface SupplierData {
  id: string | number;
  name: string;
  verified: boolean;
  location: string;
  distance: string;
  response: string;
  rating: number;
  reviews: number;
  desc: string;
  tags: string[];
  certifications?: string[];
  companySize?: string;
}

interface SupplierCardProps {
  sup: SupplierData;
}

export default function SupplierCard({ sup }: SupplierCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col lg:flex-row gap-6 hover:border-slate-300 transition-colors">
      
      {/* Logo Placeholder */}
      <div className="w-[120px] h-[120px] bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0 hidden sm:flex">
        <FactoryIcon className="text-slate-300" size={32} />
      </div>

      {/* Supplier Info */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-[#1b2b3a]">{sup.name}</h3>
              {sup.verified && (
                <BadgeCheck size={16} className="text-emerald-500" />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-slate-500 mb-3">
              <span className="flex items-center gap-1"><MapPin size={12} /> {sup.location}</span>
              <span className="flex items-center gap-1"><Map size={12} /> {sup.distance}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded">
              {sup.response}
            </span>
            <div className="flex items-center gap-1">
              <div className="flex text-[#dca12f]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill={i < Math.floor(sup.rating) ? "currentColor" : "none"} className={i < Math.floor(sup.rating) ? "text-[#dca12f]" : "text-slate-300"} />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-medium">({sup.reviews})</span>
            </div>
          </div>
        </div>

        <p className="text-[13px] text-slate-600 leading-relaxed mb-4 max-w-2xl">
          {sup.desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {sup.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded text-[11px] font-medium flex items-center gap-1">
              <Settings size={10} className="text-slate-400" /> {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 w-full lg:w-[140px] shrink-0 justify-center">
        <Link href={`/suppliers/${sup.id}`} className="w-full py-2 bg-[#1b2b3a] hover:bg-slate-800 text-white text-[11px] font-bold rounded transition-colors shadow-sm text-center">
          View Profile
        </Link>
        <Link href={`/suppliers/${sup.id}/rfq`} className="w-full py-2 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 text-[11px] font-bold rounded transition-colors shadow-sm text-center block">
          Send RFQ Now
        </Link>
        <button className="w-full py-2 bg-[#f0f4f8] hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded transition-colors shadow-sm">
          Request Quote
        </button>
      </div>
    </div>
  );
}
