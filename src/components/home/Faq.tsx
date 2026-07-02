"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, HelpCircle, Search, MessageSquare, Mail, Building } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open the first item
  const [activeTopic, setActiveTopic] = useState<string>("General Questions");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { t } = useTranslation();

  const faqs = [
    { qKey: "q1", aKey: "a1", topic: "General Questions" },
    { qKey: "q2", aKey: "a2", topic: "Suppliers" },
    { qKey: "q3", aKey: "a3", topic: "General Questions" },
    { qKey: "q4", aKey: "a4", topic: "Suppliers" },
    { qKey: "q5", aKey: "a5", topic: "Suppliers" },
    { qKey: "q6", aKey: "a6", topic: "RFQ Protocols" },
    { qKey: "q7", aKey: "a7", topic: "General Questions" }
  ];

  const topics = [
    "General Questions",
    "Suppliers",
    "RFQ Protocols",
    "Financial Systems",
    "Regulatory Policies",
    "Elite Support"
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleTopicClick = (topic: string) => {
    setActiveTopic(topic);
    setSearchQuery("");
    setSearchInput("");
    setOpenIndex(0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setOpenIndex(searchInput ? 0 : null);
  };

  // Filter FAQs based on search or active topic
  const filteredFaqs = faqs.filter((faq) => {
    if (searchQuery) {
      const questionText = t(faq.qKey).toLowerCase();
      const answerText = t(faq.aKey).toLowerCase();
      const query = searchQuery.toLowerCase();
      return questionText.includes(query) || answerText.includes(query);
    }
    return faq.topic === activeTopic;
  });

  return (
    <section id="faq" className="bg-[#f8fafc] overflow-hidden">
      {/* Top Banner Header */}
      <div className="w-full bg-[#1b2b3a] text-white py-16 sm:py-20 text-center px-4 sm:px-6 lg:px-8 border-b border-[#dca12f]/40 relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-3xl mx-auto space-y-4">
          <span className="inline-block text-[10px] tracking-widest text-[#dca12f] font-bold border border-[#dca12f]/30 px-3 py-1 uppercase rounded bg-[#dca12f]/5">
            SUPPORT PORTAL
          </span>
          <h2 className="text-3xl sm:text-[42px] font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Expert solutions for the modern industrial ecosystem, and technical documentation and platform protocols.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mt-8 flex items-center bg-white rounded border border-slate-200 shadow-lg p-1">
            <div className="flex-grow flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search knowledge base..."
                className="w-full bg-transparent border-0 outline-none text-slate-800 text-sm placeholder-slate-400 py-2.5"
              />
            </div>
            <button type="submit" className="bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-6 py-2.5 rounded text-xs font-bold transition-all cursor-pointer">
              SEARCH
            </button>
          </form>
        </div>
      </div>

      {/* Grid Content Body */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Topics Selector Card */}
            <div className="bg-white border border-slate-200/80 rounded p-6 shadow-sm">
              <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dca12f] rounded-full"></span> Topics
              </h3>
              <div className="flex flex-col gap-1.5">
                {topics.map((topic, index) => {
                  const isActive = !searchQuery && activeTopic === topic;
                  return isActive ? (
                    <button
                      key={index}
                      onClick={() => handleTopicClick(topic)}
                      className="w-full text-left flex items-center justify-between bg-[#dca12f] hover:bg-[#c99126] text-slate-950 font-bold px-4 py-3 rounded text-xs transition-all cursor-pointer"
                    >
                      <span>{topic.toUpperCase()}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handleTopicClick(topic)}
                      className="w-full text-left text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 font-medium px-4 py-3 rounded text-xs transition-all cursor-pointer border border-transparent"
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Inquiry Card */}
            <div className="bg-white border border-slate-200/80 rounded p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#dca12f]" /> Direct Inquiry
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our elite support division is available 24/7 for mission-critical assistance.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                <a href="#help" className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-[#dca12f] transition-colors">
                  <Building className="h-4 w-4 text-[#dca12f]/80" /> Visit Help Center
                </a>
                <a href="#contact" className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-[#dca12f] transition-colors">
                  <Mail className="h-4 w-4 text-[#dca12f]/80" /> Secure Contact
                </a>
              </div>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-8 space-y-6">
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

            {/* Initiate Global Procurement Box */}
            <div className="bg-white border border-slate-200/80 rounded p-8 shadow-sm text-center space-y-6">
              <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-wider uppercase">
                INITIATE GLOBAL PROCUREMENT
              </h4>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#features"
                  className="w-full sm:w-auto rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 px-8 py-3 text-xs font-bold transition-all text-center uppercase"
                >
                  BROWSE SUPPLIERS
                </a>
                <a
                  href="#list-company"
                  className="w-full sm:w-auto rounded border border-slate-200 bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-8 py-3 text-xs font-bold transition-all text-center uppercase"
                >
                  LIST YOUR COMPANY
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
