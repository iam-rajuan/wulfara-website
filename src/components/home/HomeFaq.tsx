"use client";
import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useGetPagesQuery } from "@/store/features/cms/cmsApi";

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data: pagesResponse, isLoading } = useGetPagesQuery(undefined);
  const faqPage = pagesResponse?.data?.find((p: any) => p.slug === 'faq');
  const cmsFaqs = faqPage?.htmlContent ? JSON.parse(faqPage.htmlContent) : [];
  const { t } = useTranslation();

  const staticFaqs = [
    { qKey: "q1", aKey: "a1" },
    { qKey: "q2", aKey: "a2" },
    { qKey: "q3", aKey: "a3" },
    { qKey: "q4", aKey: "a4" },
    { qKey: "q5", aKey: "a5" },
    { qKey: "q6", aKey: "a6" },
    { qKey: "q7", aKey: "a7" }
  ];

  const activeFaqs = cmsFaqs.length > 0 ? cmsFaqs.map((f: any) => ({
    qKey: f.question,
    aKey: f.answer,
    isDynamic: true
  })) : staticFaqs.map(f => ({ ...f, isDynamic: false }));

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return <section className="bg-slate-50 py-16 text-center min-h-[400px] flex items-center justify-center"></section>;
  }

  return (
    <section id="faq" className="bg-[#f8fafc] py-16 sm:py-24 border-y border-slate-200/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">
            {t('faq')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            {t('faqSubtitle')}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-12">
          {activeFaqs.map((faq: any, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded bg-white border border-[#dca12f]/20 hover:border-[#dca12f]/50 transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left rtl:text-right font-bold text-slate-900 outline-none cursor-pointer hover:bg-slate-50/20"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className="h-5 w-5 text-[#dca12f] flex-shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.isDynamic ? faq.qKey : t(faq.qKey)}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-[#dca12f]/80 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#dca12f]" : ""
                      }`}
                  />
                </button>

                {/* Smooth Expand/Collapse Container */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] border-t border-slate-100" : "max-h-0"
                    }`}
                >
                  <div className="px-6 py-5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#fbfcfd]">
                    {faq.isDynamic ? (
                      <div dangerouslySetInnerHTML={{ __html: faq.aKey }} />
                    ) : (
                      t(faq.aKey)
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom View FAQ Button */}
        <div className="text-center">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center rounded border border-[#dca12f] bg-white hover:bg-slate-50 px-8 py-3 text-xs font-bold text-slate-800 shadow-sm hover:shadow transition-all cursor-pointer"
          >
            {t('viewFaq')}
          </Link>
        </div>
      </div>
    </section>
  );
}