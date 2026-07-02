"use client";

import React from "react";

export default function FaqFooterCta() {
  return (
    <div className="bg-[#f1f2f3] rounded p-10 sm:p-14 text-center space-y-6 mt-8">
      <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wider uppercase">
        INITIATE GLOBAL PROCUREMENT
      </h4>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#features"
          className="w-full sm:w-auto rounded bg-[#dca12f] hover:bg-[#c99126] text-white px-10 py-3.5 text-xs font-bold transition-all text-center uppercase tracking-wider"
        >
          BROWSE SUPPLIERS
        </a>
        <a
          href="#list-company"
          className="w-full sm:w-auto rounded border border-[#dca12f] bg-transparent text-[#dca12f] hover:bg-[#dca12f]/10 px-10 py-3.5 text-xs font-bold transition-all text-center uppercase tracking-wider"
        >
          LIST YOUR COMPANY
        </a>
      </div>
    </div>
  );
}
