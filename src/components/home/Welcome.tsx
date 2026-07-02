"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import DemoMap from "./DemoMap";

export default function Welcome() {
  const { t } = useTranslation();
  return (
    <section className="bg-white py-16 sm:py-24 overflow-hidden border-y border-[#D4AF3780]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.1] uppercase">
              {t('welcomeTo')} <br />
              {t('wulfaraBrand')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t('wulfaraDesc')}
            </p>
            <div className="pt-2">
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded border border-slate-800 bg-transparent hover:bg-slate-100/50 px-8 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all cursor-pointer"
              >
                {t('learnMore')}
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-2xl aspect-[1.8/1] overflow-hidden rounded border border-[#D4AF3780] shadow-xl bg-[#0b1322]">
              <DemoMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
