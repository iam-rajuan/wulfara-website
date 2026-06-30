"use client";

import React from "react";
import Image from "next/image";

export default function Welcome() {
  return (
    <section className="bg-gradient-to-br from-violet-50/50 via-[#f5f3ff]/40 to-slate-50 py-16 sm:py-24 overflow-hidden border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              WELCOME TO <span className="text-yellow-600">WULFARIA!!!!</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              WULFARIA is an online marketplace website directory that connects
              suppliers and customers together through a smart functional network.
            </p>
            <div className="pt-2">
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm hover:shadow-md transition-all hover:border-yellow-500/50 cursor-pointer"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl aspect-[1.8/1] overflow-hidden rounded-2xl border border-slate-700/80 shadow-2xl bg-[#0b1322]">
              <Image
                src="/world-map.png"
                alt="Wulfaria Network World Map"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500 opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
