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
  ExternalLink,
  Heart
} from "lucide-react";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } from "@/store/api/favoriteApi";

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

import { useGetSupplierByIdQuery } from "@/store/api/supplierApi";
import { useParams } from "next/navigation";

export default function SupplierProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = useGetSupplierByIdQuery(id, { skip: !id });
  const supplier = data?.data;

  const user = useSelector((state: any) => state.auth.user);
  const { data: favoritesData } = useGetFavoritesQuery(undefined, { skip: !user });
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const favorites = favoritesData?.data || [];

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast.error("Please login to save favorites");
      return;
    }
    const existingFav = favorites.find((f: any) => f.supplier?._id === id || f.supplier === id);
    try {
      if (existingFav) {
        await removeFavorite(existingFav._id).unwrap();
        toast.success("Removed from favorites");
      } else {
        await addFavorite({ supplierId: id }).unwrap();
        toast.success("Added to favorites");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update favorites");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Loading...</div>;
  }

  if (!supplier) {
    return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Supplier not found.</div>;
  }

  // Fallbacks for data that might not be in the schema yet
  const displayLocation = supplier.contactInfo?.address || "Global";
  const displayReplyTime = "Replies in 24 hours";
  const displayAbout = supplier.description || "No description provided.";
  const displayServices = [
    { title: "Core Services", desc: "Industrial sourcing and supply.", icon: <Wrench size={16} /> }
  ];
  const displayGallery = supplier.gallery && supplier.gallery.length > 0 
    ? supplier.gallery.map((g: any) => g.url) 
    : ["https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&w=400&q=80"];

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
               {supplier.logo?.url ? (
                 <img src={supplier.logo.url} alt="Logo" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-12 h-12 border-4 border-white/20 rounded-full flex items-center justify-center relative z-10">
                   <Building2 className="text-white/80" size={24} />
                 </div>
               )}
               {supplier.isApproved && (
                 <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white z-20">
                   <CheckCircle2 size={16} />
                 </div>
               )}
            </div>

            <div className="flex flex-col justify-center h-full pt-1">
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
                <h1 className="text-3xl font-black text-[#1b2b3a] tracking-tight">{supplier.companyName}</h1>
                {supplier.subscriptionPlan !== 'basic' && (
                  <span className="px-3 py-1 bg-[#fff8e6] text-[#b8860b] text-[11px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1 border border-[#f5e3b5]">
                    <span className="w-2 h-2 rounded-full bg-[#dca12f]"></span> {supplier.subscriptionPlan} Supplier
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1"><MapPin size={14} /> {displayLocation}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {displayReplyTime}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={handleFavoriteToggle}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Heart size={16} className={favorites.some((f: any) => f.supplier?._id === id || f.supplier === id) ? "fill-red-500 text-red-500" : ""} />
              {favorites.some((f: any) => f.supplier?._id === id || f.supplier === id) ? "Saved" : "Save"}
            </button>
            {supplier.contactInfo?.website && (
              <a href={supplier.contactInfo.website} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                Visit Website <ExternalLink size={14} />
              </a>
            )}
            <Link href={`/suppliers/${supplier._id}?action=rfq`} className="flex-1 sm:flex-none px-6 py-2.5 bg-[#1b2b3a] hover:bg-slate-800 text-white text-sm font-bold rounded transition-colors shadow-sm flex items-center justify-center gap-2">
              <FileText size={16} /> Send RFQ
            </Link>
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
                {displayAbout}
              </div>
            </div>

            {/* Products & Services */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1b2b3a] mb-6">Products & Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayServices.map((service, idx) => (
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
                {displayGallery.map((img: string, idx: number) => (
                  <div key={idx} className="rounded-lg overflow-hidden h-[200px] bg-slate-100 group relative">
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
                    <p className="text-sm font-medium text-slate-800">{supplier.contactInfo?.phone || "N/A"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-[#dca12f] mt-0.5"><Mail size={18} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm font-medium text-[#1b2b3a] hover:underline cursor-pointer">{supplier.contactInfo?.email || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#dca12f] mt-0.5"><Building2 size={18} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Address</p>
                    <p className="text-sm font-medium text-slate-800 whitespace-pre-wrap leading-relaxed">{displayLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1b2b3a] mb-6">Business Details</h2>
              
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500">Established</span>
                  <span className="font-bold text-slate-800">{supplier.businessDetails?.establishedYear || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500">Employees</span>
                  <span className="font-bold text-slate-800">{supplier.businessDetails?.employeeCount || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500">Annual Turnover</span>
                  <span className="font-bold text-slate-800">{supplier.businessDetails?.annualTurnover || "N/A"}</span>
                </div>
              </div>

              {supplier.businessDetails?.certifications && supplier.businessDetails.certifications.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.businessDetails.certifications.map((cert: string) => (
                      <span key={cert} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[11px] rounded-md flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#dca12f]"></div> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1b2b3a] mb-6">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {supplier.categories?.map((cat: any) => (
                  <span key={cat._id} className="px-3 py-1.5 bg-blue-50/50 border border-blue-100 text-blue-800 font-medium text-[12px] rounded-lg">
                    {cat.name}
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
              Need a custom quote from {supplier.companyName}?
            </h2>
            <p className="text-[#1b2b3a]/80 font-medium text-sm sm:text-base">
              Connect directly with their sales team to discuss bulk pricing, technical specifications, and delivery timelines for your next project.
            </p>
          </div>
          <Link href={`/suppliers/${supplier._id}?action=rfq`} className="px-8 py-4 bg-[#1b2b3a] hover:bg-slate-900 text-white font-bold rounded-lg transition-colors shadow-xl shrink-0 flex items-center gap-2 group">
            Send RFQ Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
