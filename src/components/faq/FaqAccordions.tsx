"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FaqItem {
  qKey: string;
  aKey: string;
  topic: string;
}

interface FaqAccordionsProps {
  searchQuery: string;
  activeTopic: string;
  filteredFaqs: FaqItem[];
  openIndex: number | null;
  toggleFaq: (index: number) => void;
}

export default function FaqAccordions({
  searchQuery,
  activeTopic,
  filteredFaqs,
  openIndex,
  toggleFaq
}: FaqAccordionsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header intro */}
      <div className="border-l-2 border-[#dca12f] pl-4 py-1 space-y-1">
        <h3 className="text-xl font-bold text-slate-900">
          {searchQuery ? `Search Results for "${searchQuery}"` : activeTopic}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {searchQuery 
            ? `Showing search matches found for "${searchQuery}" in the knowledge base.`
            : `Comprehensive operational framework and core platform methodologies for the WULFARIA network.`}
        </p>
      </div>

      {/* Accordion Questions */}
      <div className="space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between px-6 py-4.5 text-left rtl:text-right font-bold text-slate-900 outline-none cursor-pointer hover:bg-slate-50/50"
                >
                  <span className="text-xs sm:text-sm">{t(faq.qKey)}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#dca12f]" : ""
                    }`}
                  />
                </button>

                {/* Expandable answer */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[500px] border-t border-slate-100" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-4.5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#fbfcfd]">
                    {t(faq.aKey)}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-slate-200 rounded p-12 text-center text-slate-500 text-sm shadow-sm">
            No questions found. Try choosing another topic or adjusting your search keywords.
          </div>
        )}
      </div>
    </div>
  );
}
