"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FaqHeader from "@/components/faq/FaqHeader";
import FaqSidebar from "@/components/faq/FaqSidebar";
import FaqAccordions from "@/components/faq/FaqAccordions";
import FaqFooterCta from "@/components/faq/FaqFooterCta";

export default function FaqPage() {
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
      <FaqHeader
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />

      {/* Grid Content Body */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Navigation Column */}
          <FaqSidebar
            topics={topics}
            activeTopic={activeTopic}
            searchQuery={searchQuery}
            handleTopicClick={handleTopicClick}
          />

          {/* Right Accordion Column */}
          <div className="lg:col-span-8 space-y-6">
            <FaqAccordions
              searchQuery={searchQuery}
              activeTopic={activeTopic}
              filteredFaqs={filteredFaqs}
              openIndex={openIndex}
              toggleFaq={toggleFaq}
            />

            {/* Initiate Global Procurement Box */}
            <FaqFooterCta />
          </div>

        </div>
      </div>
    </section>
  );
}
