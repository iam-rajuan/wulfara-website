"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface Step {
  number: number;
  titleKey: string;
  descKey: string;
}

interface RfqWorkflowProps {
  steps: Step[];
}

export default function RfqWorkflow({ steps }: RfqWorkflowProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-[#fafbfc] py-20 sm:py-28 border-y border-slate-100">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight uppercase mb-4"
          >
            {t("rfqWorkflowTitle")}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            {t("rfqWorkflowSubtitle")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative bg-white rounded-lg border border-slate-200 hover:border-[#dca12f]/40 p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300"
            >
              {/* Step Number Circle */}
              <div className="mx-auto w-14 h-14 rounded-full bg-[#dca12f] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <span
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-lg font-black text-white"
                >
                  {step.number}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 group-hover:text-[#dca12f] transition-colors duration-300">
                {t(step.titleKey)}
              </h3>

              {/* Step Description */}
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {t(step.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
