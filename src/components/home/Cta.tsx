"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { SUPPLIER_ONBOARDING_URL } from "@/config/urls";

export default function Cta() {
  const { t } = useTranslation();
  return (
    <section className="relative bg-[#1b2b3a] text-white py-20 overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-3xl sm:text-[42px] font-bold text-white tracking-tight">
          {t('ctaTitle')}
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/suppliers"
            className="w-full sm:w-auto rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-8 py-3 text-sm font-bold transition-all text-center"
          >
            {t('browseSuppliers')}
          </Link>
          <a
            href={SUPPLIER_ONBOARDING_URL}
            className="w-full sm:w-auto rounded border border-[#dca12f] bg-transparent text-[#dca12f] hover:bg-slate-800/20 px-8 py-3 text-sm font-bold transition-all text-center"
          >
            {t('listCompany')}
          </a>
        </div>
      </div>
    </section>
  );
}
