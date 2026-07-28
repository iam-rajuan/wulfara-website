"use client";

import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, CheckCircle2, Compass } from "lucide-react";
import { ListCompanyIcon } from "@/components/icons";
import Image from "next/image";
import heroBg from "../../../public/assets/hero-bg.png";
import { useTranslation } from "react-i18next";
import { useGetPagesQuery } from "@/store/features/cms/cmsApi";

import { useRouter } from "next/navigation";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: pagesResponse } = useGetPagesQuery(undefined);
  const cmsHero = pagesResponse?.data?.find((p: any) => p.slug === 'homepage')?.htmlContent
    ? JSON.parse(pagesResponse.data.find((p: any) => p.slug === 'homepage').htmlContent)
    : null;

  const { t } = useTranslation();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/search`);
    }
  };

  const quickLinks = [
    { key: "freeSearch" },
    { key: "requestQuotes" },
    { key: "globalSuppliers" },
    { key: "matchmaking" },
  ];

  return (
    <section className="relative min-h-[699px] lg:h-[699px] flex items-center bg-[#1b2b3a] text-white py-16 lg:py-0 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Warehouse Interior Background"
          fill
          className="object-cover opacity-25"
          priority
        />
        {/* Navy/slate dark overlay tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b2b3a]/95 via-[#1b2b3a]/85 to-[#1b2b3a]/95"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Main Title */}
        <h1
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-4xl sm:text-6xl md:text-[72px] font-extrabold tracking-[-1.8px] text-white mb-6 leading-tight md:leading-[72px] text-center max-w-4xl mx-auto"
        >
          {cmsHero?.title || t('findSuppliersTitle')}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          {cmsHero?.subtitle || t('heroSubtitle')}
        </p>

        {/* Search Bar Container */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-4xl mb-8 flex items-center bg-white p-1.5 sm:p-2 rounded shadow-2xl border border-slate-200/80"
        >
          <div className="relative flex-grow flex items-center min-w-0">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 ml-2 sm:ml-3 mr-2 sm:mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder={cmsHero?.searchPlaceholder || t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pr-2 py-2 sm:py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0"
            />
            {/* Filter Slider Settings Icon */}
            <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 mx-2 sm:mx-3 cursor-pointer hover:text-slate-600 flex-shrink-0" />
          </div>
          <button
            type="submit"
            className="rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-4 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex-shrink-0"
          >
            {cmsHero?.searchButtonText || t('searchBtn')}
          </button>
        </form>

        {/* Quick Link White Cards */}
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-5xl mx-auto mb-12">
          {quickLinks.map((link, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded bg-white px-4 py-2.5 text-xs sm:text-[13px] font-semibold text-slate-700 shadow-sm border border-slate-200/80 cursor-default hover:bg-slate-50 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4 text-[#dca12f] flex-shrink-0" />
              <span>{t(link.key)}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Browse Suppliers Button */}
          <a
            href={cmsHero?.primaryCtaLink || "#features"}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-8 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Compass className="h-4 w-4 text-slate-950" />
            <span>{cmsHero?.primaryCtaText || t('browseSuppliers')}</span>
          </a>

          {/* List Your Company Button */}
          <a
            href={cmsHero?.secondaryCtaLink || "#list-company"}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded border border-[#dca12f] bg-transparent hover:bg-slate-800/20 text-[#dca12f] px-8 py-3.5 text-sm font-bold transition-all"
          >
            <ListCompanyIcon className="h-4 w-4 text-[#dca12f]" />
            <span>{cmsHero?.secondaryCtaText || t('listCompany')}</span>
          </a>

          {/* Login Button */}
          <a
            href="#login"
            className="w-full sm:w-auto flex items-center justify-center rounded border border-slate-600 hover:border-slate-400 bg-transparent text-white px-10 py-3.5 text-sm font-bold transition-all hover:bg-slate-800/30 text-center"
          >
            {t('login')}
          </a>
        </div>
      </div>
    </section>
  );
}
