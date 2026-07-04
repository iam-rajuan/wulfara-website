"use client";

import React from "react";
import Image from "next/image";
import { Search, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroBg from "../../../public/assets/hero-bg.png";

export default function RfqHero() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[420px] lg:min-h-[480px] flex items-center bg-[#1b2b3a] text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Industrial Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b2b3a]/95 via-[#1b2b3a]/80 to-[#1b2b3a]/60"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] w-full px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="max-w-xl">
          {/* Main Title */}
          <h1
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] uppercase mb-6"
          >
            {t("rfqHeroWelcome")}
            <br />
            <span className="text-[#dca12f]">{t("rfqHeroBrand")}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-10 max-w-lg">
            {t("rfqHeroSubtitle")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#browse"
              className="inline-flex items-center gap-2.5 rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-7 py-3 text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all uppercase tracking-wide"
            >
              <Search className="h-4 w-4" />
              <span>{t("browseSuppliers")}</span>
            </a>
            <a
              href="#list-company"
              className="inline-flex items-center gap-2.5 rounded border-2 border-[#dca12f]/80 bg-transparent hover:bg-[#dca12f]/10 text-[#dca12f] px-7 py-3 text-xs sm:text-sm font-bold transition-all uppercase tracking-wide"
            >
              <Search className="h-4 w-4" />
              <span>{t("listCompany")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
