"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { SUPPLIER_ONBOARDING_URL } from "@/config/urls";

export default function RfqCta() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f8f9fa] py-20 sm:py-28 border-t border-[#D4AF3780]">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12 text-center">
        {/* Heading */}
        <h2
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-3xl sm:text-4xl lg:text-[42px] font-black text-black tracking-tight uppercase leading-[1.1] mb-10 max-w-2xl mx-auto"
        >
          {t("ctaTitle")}
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/suppliers"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-[#dca12f] hover:bg-[#c99126] text-black px-8 py-3.5 text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all uppercase tracking-wide"
          >
            {t("browseSuppliers")}
          </Link>
          <a
            href={SUPPLIER_ONBOARDING_URL}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-[#dca12f] bg-transparent text-[#dca12f] hover:bg-[#dca12f]/5 px-8 py-3.5 text-xs sm:text-sm font-bold transition-all uppercase tracking-wide"
          >
            {t("listCompany")}
          </a>
        </div>
      </div>
    </div>
  );
}
