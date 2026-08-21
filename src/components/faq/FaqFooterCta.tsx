"use client";

import React from "react";
import Link from "next/link";
import { SUPPLIER_ONBOARDING_URL } from "@/config/urls";

export default function FaqFooterCta() {
  return (
    <div className="border border-[#eee3c3] rounded-sm p-10 sm:p-16 text-center space-y-8 mt-8">
      <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wider uppercase">
        INITIATE GLOBAL PROCUREMENT
      </h4>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
        <Link
          href="/suppliers"
          className="w-full sm:w-auto bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-12 py-4 text-sm font-bold transition-all text-center uppercase tracking-widest"
        >
          BROWSE SUPPLIERS
        </Link>
        <a
          href={SUPPLIER_ONBOARDING_URL}
          className="w-full sm:w-auto border border-[#dca12f] bg-transparent text-[#dca12f] hover:bg-[#dca12f]/5 px-12 py-4 text-sm font-bold transition-all text-center uppercase tracking-widest"
        >
          LIST YOUR COMPANY
        </a>
      </div>
    </div>
  );
}


