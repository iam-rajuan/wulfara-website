"use client";

import React from "react";

export default function FaqFooterCta() {
  return (
    <div className="bg-white border border-slate-200/80 rounded p-8 shadow-sm text-center space-y-6">
      <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-wider uppercase">
        INITIATE GLOBAL PROCUREMENT
      </h4>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#features"
          className="w-full sm:w-auto rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-8 py-3 text-xs font-bold transition-all text-center uppercase"
        >
          BROWSE SUPPLIERS
        </a>
        <a
          href="#list-company"
          className="w-full sm:w-auto rounded border border-slate-200 bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-8 py-3 text-xs font-bold transition-all text-center uppercase"
        >
          LIST YOUR COMPANY
        </a>
      </div>
    </div>
  );
}
