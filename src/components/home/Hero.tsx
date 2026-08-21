"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal, CheckCircle2, Compass } from "lucide-react";
import { ListCompanyIcon } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import heroBg from "../../../public/assets/hero-bg.png";
import { useTranslation } from "react-i18next";
import { useGetPagesQuery } from "@/store/features/cms/cmsApi";

import { useRouter } from "next/navigation";
import { SUPPLIER_ONBOARDING_URL } from "@/config/urls";

type CmsHeroButton = {
  id: string;
  label: string;
  route: string;
  style: string;
};

type CmsHeroContent = {
  heroSettings?: {
    bgImage?: string;
    mainHeading?: string;
    introParagraph?: string;
    searchFieldText?: string;
  };
  buttonSettings?: {
    primaryCTA?: string;
    secondaryCTA?: string;
    accountLogin?: string;
  };
  dynamicButtons?: CmsHeroButton[];
};

const resolveCtaHref = (btn: CmsHeroButton) => {
  const label = (btn?.label || "").toLowerCase();
  const route = btn?.route || "";

  if (label.includes("list") && label.includes("company")) {
    return SUPPLIER_ONBOARDING_URL;
  }
  if (label.includes("login") || route === "#login") {
    return "/login";
  }
  if ((label.includes("browse") && label.includes("supplier")) || route === "#features") {
    return "/suppliers";
  }
  return route || "#";
};

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: pagesResponse, isLoading } = useGetPagesQuery(undefined);
  const homepage = pagesResponse?.data?.find((page: { slug: string; htmlContent?: string }) => page.slug === 'homepage');
  const cmsHero: CmsHeroContent | null = homepage?.htmlContent
    ? JSON.parse(homepage.htmlContent)
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

  if (isLoading) {
    return (
      <div className="min-h-[699px] lg:h-[699px] bg-[#1b2b3a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#dca12f] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-300 font-medium">Loading Content...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-[699px] lg:h-[699px] flex items-center bg-[#1b2b3a] text-white py-16 lg:py-0 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={cmsHero?.heroSettings?.bgImage || heroBg}
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
          {cmsHero?.heroSettings?.mainHeading || t('findSuppliersTitle')}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          {cmsHero?.heroSettings?.introParagraph || t('heroSubtitle')}
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
              placeholder={cmsHero?.heroSettings?.searchFieldText || t('searchPlaceholder')}
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
            {t('searchBtn')}
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
          {cmsHero?.dynamicButtons ? (
            cmsHero.dynamicButtons.map((btn: CmsHeroButton) => {
              if (btn.style === 'primary') {
                return (
                  <Link key={btn.id} href={resolveCtaHref(btn)} className="w-full sm:w-auto flex items-center justify-center gap-2 rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-8 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all">
                    <Compass className="h-4 w-4 text-slate-950" />
                    <span>{btn.label}</span>
                  </Link>
                );
              }
              if (btn.style === 'secondary') {
                return (
                  <Link key={btn.id} href={resolveCtaHref(btn)} className="w-full sm:w-auto flex items-center justify-center gap-2 rounded border border-[#dca12f] bg-transparent hover:bg-slate-800/20 text-[#dca12f] px-8 py-3.5 text-sm font-bold transition-all">
                    <ListCompanyIcon className="h-4 w-4 text-[#dca12f]" />
                    <span>{btn.label}</span>
                  </Link>
                );
              }
              return (
                <Link key={btn.id} href={resolveCtaHref(btn)} className="w-full sm:w-auto flex items-center justify-center rounded border border-slate-600 hover:border-slate-400 bg-transparent text-white px-10 py-3.5 text-sm font-bold transition-all hover:bg-slate-800/30 text-center">
                  {btn.label}
                </Link>
              );
            })
          ) : (
            <>
              {/* Fallback backward compatibility */}
              <Link href="/suppliers" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-8 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all">
                <Compass className="h-4 w-4 text-slate-950" />
                <span>{cmsHero?.buttonSettings?.primaryCTA || t('browseSuppliers')}</span>
              </Link>
              <Link href={SUPPLIER_ONBOARDING_URL} className="w-full sm:w-auto flex items-center justify-center gap-2 rounded border border-[#dca12f] bg-transparent hover:bg-slate-800/20 text-[#dca12f] px-8 py-3.5 text-sm font-bold transition-all">
                <ListCompanyIcon className="h-4 w-4 text-[#dca12f]" />
                <span>{cmsHero?.buttonSettings?.secondaryCTA || t('listCompany')}</span>
              </Link>
              <Link href="/login" className="w-full sm:w-auto flex items-center justify-center rounded border border-slate-600 hover:border-slate-400 bg-transparent text-white px-10 py-3.5 text-sm font-bold transition-all hover:bg-slate-800/30 text-center">
                {cmsHero?.buttonSettings?.accountLogin || t('login')}
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
