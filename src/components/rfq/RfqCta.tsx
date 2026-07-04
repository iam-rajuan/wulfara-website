"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function RfqCta() {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12 text-center">
        {/* Heading */}
        <h2
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-2xl sm:text-3xl lg:text-[40px] font-black text-slate-900 tracking-tight uppercase leading-[1.2] mb-10 max-w-2xl mx-auto"
        >
          {t("ctaTitle")}
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#browse"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-8 py-3.5 text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all uppercase tracking-wide"
          >
            {t("browseSuppliers")}
          </a>
          <a
            href="#list-company"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded border-2 border-[#dca12f] bg-transparent text-[#dca12f] hover:bg-[#dca12f]/5 px-8 py-3.5 text-xs sm:text-sm font-bold transition-all uppercase tracking-wide"
          >
            {t("listCompany")}
          </a>
        </div>
      </div>
    </div>
  );
}
