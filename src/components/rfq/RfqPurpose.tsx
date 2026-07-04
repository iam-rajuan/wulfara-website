"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

interface RfqPurposeProps {
  features: Feature[];
}

export default function RfqPurpose({ features }: RfqPurposeProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-20 sm:py-28 border-b border-slate-100">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Column - Purpose Text */}
          <div className="space-y-6">
            {/* Label */}
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#dca12f] border-b-2 border-[#dca12f]/30 pb-1">
              {t("rfqPurposeLabel")}
            </span>

            {/* Large Heading */}
            <h2
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-slate-900 leading-[1.15] uppercase"
            >
              {t("rfqPurposeTitle")}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-md">
              {t("rfqPurposeDesc")}
            </p>

            {/* Second Paragraph */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-md">
              {t("rfqPurposeDesc2")}
            </p>

            {/* Learn More Button */}
            <div className="pt-4">
              <a
                href="#learn-more"
                className="inline-flex items-center justify-center rounded border-2 border-slate-800 bg-transparent hover:bg-slate-50 px-8 py-3 text-xs sm:text-sm font-bold text-slate-900 transition-all uppercase tracking-wide"
              >
                {t("learnMore")}
              </a>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="space-y-5">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-start gap-5 p-5 sm:p-6 rounded-lg border border-slate-200 hover:border-[#dca12f]/40 bg-white hover:shadow-md transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-[#dca12f]/30 bg-[#dca12f]/5 flex items-center justify-center group-hover:bg-[#dca12f]/10 group-hover:border-[#dca12f]/50 transition-all duration-300">
                    <Icon className="h-5 w-5 text-[#dca12f]" />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-[#dca12f] transition-colors duration-300">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
