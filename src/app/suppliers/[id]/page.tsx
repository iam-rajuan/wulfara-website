"use client";
import React from "react";
import Image from "next/image";
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
  ChevronLeft,
  ExternalLink,
  Heart,
  Star
} from "lucide-react";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } from "@/store/api/favoriteApi";

import { useGetSupplierByIdQuery } from "@/store/api/supplierApi";
import { useGetSupplierReviewsQuery } from "@/store/api/reviewApi";
import { useParams, useRouter } from "next/navigation";
import DynamicMap from "@/components/home/DynamicMap";
import type { Favorite, Review } from "@/types/api";
import type { RootState } from "@/store/store";

interface SupplierServiceCard {
  title: string;
  desc: string;
  icon: React.JSX.Element;
}

const imageLoader = ({ src }: { src: string }) => src;

const isDisplayableImage = (value?: string | null) => {
  if (!value || typeof value !== "string") {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === "no-logo.jpg" || normalized === "default-avatar.png") {
    return false;
  }

  return !normalized.endsWith(".pdf");
};

const getFavoriteSupplierId = (favorite: Favorite) => {
  if (!favorite.supplier) {
    return null;
  }

  return typeof favorite.supplier === "string" ? favorite.supplier : favorite.supplier._id;
};

const getApiErrorMessage = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data &&
    typeof error.data.message === "string"
  ) {
    return error.data.message;
  }

  return "Failed to update favorites";
};

export default function SupplierProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data, isLoading } = useGetSupplierByIdQuery(id, { skip: !id });
  const supplier = data?.data;

  const user = useSelector((state: RootState) => state.auth.user);
  const { data: favoritesData } = useGetFavoritesQuery(undefined, { skip: !user });
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const favorites = favoritesData?.data || [];
  
  const { data: reviewsData } = useGetSupplierReviewsQuery(id, { skip: !id });
  const reviews = reviewsData?.data || [];

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast.error("Please login to save favorites");
      return;
    }
    const existingFav = favorites.find((favorite) => getFavoriteSupplierId(favorite) === id);
    try {
      if (existingFav) {
        await removeFavorite(existingFav._id).unwrap();
        toast.success("Removed from favorites");
      } else {
        await addFavorite({ supplierId: id }).unwrap();
        toast.success("Added to favorites");
      }
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Loading...</div>;
  }

  if (!supplier) {
    return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Supplier not found.</div>;
  }

  // Normalize address fields because different endpoints/pages use different shapes.
  const displayLocation =
    supplier.location?.formattedAddress ||
    supplier.contactInfo?.address ||
    supplier.contactAddress ||
    supplier.address ||
    "Location not specified";
  const displayReplyTime = supplier.avgResponseTime || "Replies in 24 hours";
  const displayAbout = supplier.description || "No description provided.";
  const displayWebsite = supplier.website || supplier.contactInfo?.website || "";
  const displayLogo =
    isDisplayableImage(supplier.logo) ? supplier.logo : "";

  // Dynamically map core products/services
  const displayServices: SupplierServiceCard[] = supplier.coreProducts && supplier.coreProducts.length > 0
    ? supplier.coreProducts.map((product: string) => ({
      title: product,
      desc: "Core product/service offered by the supplier.",
      icon: <Wrench size={16} />
    }))
    : [{ title: "Core Services", desc: "Industrial sourcing and supply.", icon: <Wrench size={16} /> }];

  const displayGallery = supplier.gallery && supplier.gallery.length > 0
    ? supplier.gallery
      .map((galleryItem) => galleryItem.url)
      .filter((url) => isDisplayableImage(url) && url !== displayLogo)
    : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb / Back Navigation */}
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors bg-transparent border-0 p-0 cursor-pointer"
        >
          <ChevronLeft size={16} /> Back to Search Results
        </button>

        {/* Top Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full md:w-auto text-center sm:text-left">
            {/* Logo */}
            <div className="w-24 h-24 rounded bg-linear-to-tr from-slate-800 to-[#1b2b3a] shrink-0 flex items-center justify-center relative overflow-hidden shadow-inner">
              {displayLogo ? (
                <Image
                  src={displayLogo}
                  alt={`${supplier.companyName} logo`}
                  fill
                  unoptimized
                  loader={imageLoader}
                  className="object-cover"
                />
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
                <span className="flex items-center gap-1 font-bold text-slate-800">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" /> 
                  {supplier.averageRating ? `${supplier.averageRating} (${supplier.totalReviews} reviews)` : "No reviews yet"}
                </span>
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
              <Heart size={16} className={favorites.some((favorite) => getFavoriteSupplierId(favorite) === id) ? "fill-red-500 text-red-500" : ""} />
              {favorites.some((favorite) => getFavoriteSupplierId(favorite) === id) ? "Saved" : "Save"}
            </button>
            {displayWebsite && (
              <a href={displayWebsite} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                Visit Website <ExternalLink size={14} />
              </a>
            )}
            <Link href={`/suppliers/${supplier._id}/rfq`} className="flex-1 sm:flex-none px-6 py-2.5 bg-[#1b2b3a] hover:bg-slate-800 text-white text-sm font-bold rounded transition-colors shadow-sm flex items-center justify-center gap-2">
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
                {displayServices.map((service, idx: number) => (
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
            {displayGallery.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-[#1b2b3a] mb-6">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayGallery.map((img: string, idx: number) => (
                    <div key={idx} className="rounded-lg overflow-hidden h-[200px] bg-slate-100 group relative border border-slate-100">
                      <Image
                        src={img}
                        alt={`Gallery image ${idx + 1}`}
                        fill
                        unoptimized
                        loader={imageLoader}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                    <p className="text-sm font-medium text-slate-800">{supplier.contactPhone || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#dca12f] mt-0.5"><Mail size={18} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm font-medium text-[#1b2b3a] hover:underline cursor-pointer">{supplier.contactEmail || "N/A"}</p>
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

              {/* Map View */}
              {supplier.location?.coordinates && (supplier.location.coordinates[0] !== 0 || supplier.location.coordinates[1] !== 0) && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200 h-[250px] relative">
                  <DynamicMap suppliers={[supplier]} />
                </div>
              )}
            </div>

            {/* Business Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1b2b3a] mb-6">Business Details</h2>

              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500">Established</span>
                  <span className="font-bold text-slate-800">{supplier.establishedYear || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500">Employees</span>
                  <span className="font-bold text-slate-800">{supplier.employeeCount || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500">Annual Turnover</span>
                  <span className="font-bold text-slate-800">{supplier.annualTurnover || "N/A"}</span>
                </div>
              </div>

              {supplier.certifications && supplier.certifications.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.certifications.map((cert: string) => (
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
              {supplier.categories && supplier.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {supplier.categories.map((cat) => (
                    <span key={cat._id} className="px-3 py-1.5 bg-blue-50/50 border border-blue-100 text-blue-800 font-medium text-[12px] rounded-lg">
                      {cat.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No categories added yet.</p>
              )}
            </div>

          </div>
        </div>
        
        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-12">
            <h2 className="text-xl font-black text-[#1b2b3a] mb-6 flex items-center gap-2">
              <Star size={24} className="text-yellow-500 fill-yellow-500" /> Supplier Reviews ({supplier.totalReviews})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review: Review) => (
                <div key={review._id} className="bg-slate-50 border border-slate-100 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                        {review.buyer?.name?.charAt(0) || "B"}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1b2b3a] text-sm">{review.buyer?.name || "Verified Buyer"}</h4>
                        <p className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">{`"${review.comment}"`}</p>
                </div>
              ))}
            </div>
          </div>
        )}

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
          <Link href={`/suppliers/${supplier._id}/rfq`} className="px-8 py-4 bg-[#1b2b3a] hover:bg-slate-900 text-white font-bold rounded-lg transition-colors shadow-xl shrink-0 flex items-center gap-2 group">
            Send RFQ Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
