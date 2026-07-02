"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqs = [
    { qKey: "q1", aKey: "a1" },
    { qKey: "q2", aKey: "a2" },
    { qKey: "q3", aKey: "a3" },
    { qKey: "q4", aKey: "a4" },
    { qKey: "q5", aKey: "a5" },
    { qKey: "q6", aKey: "a6" },
    { qKey: "q7", aKey: "a7" }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {t('faq')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            {t('faqSubtitle')}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-slate-200 bg-[#f8fafc]/50 hover:bg-[#f8fafc] hover:border-yellow-500/30 transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left rtl:text-right font-semibold text-slate-800 outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{t(faq.qKey)}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-yellow-600" : ""
                    }`}
                  />
                </button>

                {/* Smooth Expand/Collapse Container */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[500px] border-t border-slate-200/50" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-5 text-sm sm:text-base text-slate-600 leading-relaxed bg-white">
                    {t(faq.aKey)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <a
            href="#full-faq"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-8 py-3 text-sm font-bold text-slate-700 shadow-sm hover:shadow-md transition-all hover:border-yellow-500/50"
          >
            {t('viewFaq')}
          </a>
        </div>
      </div>
    </section>
  );
}
