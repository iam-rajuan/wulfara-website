"use client";

import React from "react";

export default function Cta() {
  return (
    <section className="relative bg-[#162235] text-white py-16 sm:py-20 overflow-hidden border-t border-slate-700/50">
      {/* Decorative background design elements */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ready to find the right supplier?
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#features"
            className="w-full sm:w-auto rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-8 py-3.5 text-sm font-extrabold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-center"
          >
            Browse Suppliers
          </a>
          <a
            href="#list-company"
            className="w-full sm:w-auto rounded-lg border border-slate-600 text-slate-200 hover:text-white hover:border-yellow-500/80 hover:bg-slate-800/40 px-8 py-3.5 text-sm font-extrabold transition-all text-center"
          >
            List Your Company
          </a>
        </div>
      </div>
    </section>
  );
}
