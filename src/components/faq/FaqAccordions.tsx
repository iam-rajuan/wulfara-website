"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FaqItem {
  qKey: string;
  aKey: string;
  topic: string;
  isDynamic?: boolean;
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
      {/* Header intro — gold left border accent */}
      <div className="border-l-[3px] border-l-[#dca12f] pl-4 py-1 space-y-2">
        <h3 className="text-2xl font-extrabold text-slate-900">
          {searchQuery ? `Search Results for "${searchQuery}"` : activeTopic}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {searchQuery
            ? `Showing search matches found for "${searchQuery}" in the knowledge base.`
            : `Comprehensive operational framework and core platform methodologies for the Wulfara network.`}
        </p>
      </div>

      {/* Accordion Questions — thin gray border cards */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#eee3c3] rounded-sm bg-white transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left rtl:text-right font-semibold text-slate-900 outline-none cursor-pointer hover:bg-slate-50/40"
                >
                  <span className="text-sm">{faq.isDynamic ? faq.qKey : t(faq.qKey)}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#dca12f] transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Expandable answer */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px]" : "max-h-0"
                    }`}
                >
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed">
                    {faq.isDynamic ? (
                      <div dangerouslySetInnerHTML={{ __html: faq.aKey }} />
                    ) : (
                      t(faq.aKey)
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-[#e5e5e8] rounded-sm p-12 text-center text-slate-500 text-sm">
            No questions found. Try choosing another topic or adjusting your search keywords.
          </div>
        )}
      </div>
    </div>
  );
}
