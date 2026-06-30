"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "What does the company do?",
      answer:
        "Wulfaria functions as a smart, functional B2B directory connecting quality suppliers, logistics providers, and manufacturers with buyers globally.",
    },
    {
      question: "Who are the suppliers?",
      answer:
        "Our suppliers include verified manufacturers, local wholesalers, and international logistics experts who pass our robust credential verification standards.",
    },
    {
      question: "How does it work?",
      answer:
        "Buyers can search for partners, request quotes (RFQs), or contact businesses directly. Suppliers get listed, build detailed profiles, and bid on matching buyer requests.",
    },
    {
      question: "Where do products come from?",
      answer:
        "Products and services are offered by local US manufacturers, global logistics companies, and international suppliers across hundreds of industrial categories.",
    },
    {
      question: "Do you sell products already?",
      answer:
        "Wulfaria is a B2B directory and matchmaking network, not a direct retail shop. We provide the connections, tools, and platform to help you source products directly from partners.",
    },
    {
      question: "How do I request a quote?",
      answer:
        "Simply head over to our RFQ section, fill in the requirements details of your logistics or manufacturing request, and submit it to receive customized quotes from certified suppliers.",
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes! Searching for suppliers and submitting RFQs is free for buyers. We also offer premium plans for companies wishing to highlight their services and boost visibility.",
    },
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
            FAQ
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            Common questions about how WULFARIA connects customers and suppliers.
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
                  className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-slate-800 outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{faq.question}</span>
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
                    {faq.answer}
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
            View FAQ
          </a>
        </div>
      </div>
    </section>
  );
}
