"use client";

import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Building2, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Wrench, 
  Box,
  Layers,
  ChevronLeft,
  Settings,
  ExternalLink
} from "lucide-react";

// Mock data based on the screenshot
const mockSupplier = {
  id: "1",
  name: "Steel Company A",
  verified: true,
  isGold: true,
  location: "New York, USA",
  distance: "12 miles away",
  replyTime: "Replies in 2 hours",
  about: "Established in 1985, Steel Company A is a premier provider of high-grade industrial steel and specialized raw materials for the global manufacturing sector. With a commitment to structural integrity and innovative fabrication processes, we have consistently delivered exceptional quality to our partners across the aerospace, automotive, and heavy construction industries.\n\nOur state-of-the-art facilities in New York span over 500,000 square feet, equipping us with the capacity to handle large-scale, complex orders while maintaining stringent quality control standards. We pride ourselves on our robust supply chain logistics and our ability to meet aggressive delivery schedules without compromising on excellence.",
  contact: {
    phone: "+1 (555) 019-6273",
    email: "sales@steelcompanya.com",
    address: "124 Industrial Parkway\nSuite 400\nNew York, NY 10001, USA"
  },
  details: {
    founded: "1985",
    employees: "250 - 500",
    turnover: "$50M - $100M",
    markets: "North America, Europe",
    certifications: ["ISO 9001:2015", "AS9100D"]
  },
  categories: ["Raw Materials", "Construction", "Manufacturing", "Metallurgy"],
  services: [
    { title: "Structural Steel", desc: "High-strength beams, columns, and joists for commercial construction.", icon: <Wrench size={16} /> },
    { title: "Custom Pipes & Tubes", desc: "Precision-engineered piping solutions for fluid transport and structural.", icon: <Layers size={16} /> },
    { title: "Metal Fabrication", desc: "Advanced CNC machining, welding, and custom assembly services.", icon: <Settings size={16} /> },
    { title: "Raw Steel Coils", desc: "Hot and cold-rolled steel coils for diverse industrial manufacturing.", icon: <Box size={16} /> }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&w=400&q=80",
    "https://images.unsplash.com/photo-1565439390236-419b4b0eb198?ixlib=rb-4.0.3&w=400&q=80",
    "https://images.unsplash.com/photo-1580983582522-835694ce25cc?ixlib=rb-4.0.3&w=400&q=80",
    "https://images.unsplash.com/photo-1533618451877-fcc3fbb54e4c?ixlib=rb-4.0.3&w=400&q=80"
  ]
};

export default function SupplierProfilePage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the supplier using params.id
  const supplier = mockSupplier;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        
        {/* Breadcrumb / Back Navigation */}
        <Link href="/suppliers" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors">
          <ChevronLeft size={16} /> Back to Search Results
        </Link>

        {/* Top Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full md:w-auto text-center sm:text-left">
            {/* Logo */}
            <div className="w-24 h-24 rounded bg-linear-to-tr from-slate-800 to-[#1b2b3a] shrink-0 flex items-center justify-center relative overflow-hidden shadow-inner">
               <div className="w-12 h-12 border-4 border-white/20 rounded-full flex items-center justify-center relative z-10">
                 <Building2 className="text-white/80" size={24} />
               </div>
               {supplier.verified && (
                 <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white z-20">
                   <CheckCircle2 size={16} />
                 </div>
               )}
            </div>

            <div className="flex flex-col justify-center h-full pt-1">
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
                <h1 className="text-3xl font-black text-[#1b2b3a] tracking-tight">{supplier.name}</h1>
                {supplier.isGold && (
                  <span className="px-3 py-1 bg-[#fff8e6] text-[#b8860b] text-[11px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1 border border-[#f5e3b5]">
                    <span className="w-2 h-2 rounded-full bg-[#dca12f]"></span> Gold Supplier
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1"><MapPin size={14} /> {supplier.location}</span>
                <span className="flex items-center gap-1"><Building2 size={14} /> {supplier.distance}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {supplier.replyTime}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2">
              Visit Website <ExternalLink size={14} />
            </button>
            <Link href={`/suppliers/${supplier.id}/rfq`} className="flex-1 sm:flex-none px-6 py-2.5 bg-[#1b2b3a] hover:bg-slate-800 text-white text-sm font-bold rounded transition-colors shadow-sm flex items-center justify-center gap-2">
              <FileText size={16} /> Send RFQ
            </Link>
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#dca12f] hover:bg-[#c99126] text-slate-900 text-sm font-bold rounded transition-colors shadow-sm flex items-center justify-center gap-2">
              <FileText size={16} /> Request Quote
            </button>
          </div>
        </div>

        {/* 2-Column Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          
          {/* Left Column (Main Info) */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1b2b3a] mb-4">About the Company</h2>
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {supplier.about}
              </div>
            </div>

            {/* Products & Services */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1b2b3a] mb-6">Products & Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supplier.services.map((service, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-5 flex gap-4 hover:border-slate-200 transition-colors">
                    <div className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center shrink-0 text-slate-700">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm mb-1">{service.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1b2b3a] mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {supplier.gallery.map((img, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden h-[200px] bg-slate-100 group relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={img} 
                      alt={`Gallery image ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6">
            
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1b2b3a] mb-6">Contact Information</h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="text-[#dca12f] mt-0.5"><Phone size={18} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-sm font-medium text-slate-800">{supplier.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-[#dca12f] mt-0.5"><Mail size={18} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm font-medium text-[#1b2b3a] hover:underline cursor-pointer">{supplier.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#dca12f] mt-0.5"><Building2 size={18} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Office</p>
                    <p className="text-sm font-medium text-slate-800 whitespace-pre-wrap leading-relaxed">{supplier.contact.address}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-100">
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1b2b3a] hover:bg-slate-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1b2b3a] hover:bg-slate-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1b2b3a] hover:bg-slate-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </button>
              </div>
            </div>

            {/* Business Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1b2b3a] mb-6">Business Details</h2>
              
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500">Founded</span>
                  <span className="font-bold text-slate-800">{supplier.details.founded}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500">Employees</span>
                  <span className="font-bold text-slate-800">{supplier.details.employees}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500">Annual Turnover</span>
                  <span className="font-bold text-slate-800">{supplier.details.turnover}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500">Main Markets</span>
                  <span className="font-bold text-slate-800 text-right">{supplier.details.markets}</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {supplier.details.certifications.map(cert => (
                    <span key={cert} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[11px] rounded-md flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#dca12f]"></div> {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1b2b3a] mb-6">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {supplier.categories.map(cat => (
                  <span key={cat} className="px-3 py-1.5 bg-blue-50/50 border border-blue-100 text-blue-800 font-medium text-[12px] rounded-lg">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="w-full bg-[#dca12f] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg shadow-[#dca12f]/20">
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1b2b3a] tracking-tight mb-3">
              Need a custom quote from {supplier.name}?
            </h2>
            <p className="text-[#1b2b3a]/80 font-medium text-sm sm:text-base">
              Connect directly with their sales team to discuss bulk pricing, technical specifications, and delivery timelines for your next project.
            </p>
          </div>
          <Link href={`/suppliers/${supplier.id}/rfq`} className="px-8 py-4 bg-[#1b2b3a] hover:bg-slate-900 text-white font-bold rounded-lg transition-colors shadow-xl shrink-0 flex items-center gap-2 group">
            Send RFQ Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
