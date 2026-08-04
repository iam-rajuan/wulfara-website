"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FaqHeader from "@/components/faq/FaqHeader";
import FaqSidebar from "@/components/faq/FaqSidebar";
import FaqAccordions from "@/components/faq/FaqAccordions";
import FaqFooterCta from "@/components/faq/FaqFooterCta";
import { useGetPagesQuery } from "@/store/features/cms/cmsApi";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTopic, setActiveTopic] = useState<string>("General Questions");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: pagesResponse, isLoading } = useGetPagesQuery(undefined);
  const faqPage = pagesResponse?.data?.find((p: any) => p.slug === 'faq');
  const cmsFaqs = faqPage?.htmlContent ? JSON.parse(faqPage.htmlContent) : [];
  const { t } = useTranslation();

  // Extract unique topics from CMS or use static defaults if empty
  const dynamicTopics = Array.from(new Set(cmsFaqs.map((f: any) => f.topic).filter(Boolean))) as string[];
  const topics = dynamicTopics.length > 0 ? dynamicTopics : ["General Questions"];

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

  // Use only CMS FAQs
  const activeFaqs = cmsFaqs.map((f: any, i: number) => ({
    qKey: f.question, // Reusing keys for dynamic data
    aKey: f.answer,
    topic: f.topic || "General Questions", // Map to dynamic topic
    isDynamic: true
  }));

  // Filter FAQs based on search or active topic
  const filteredFaqs = activeFaqs.filter((faq: any) => {
    if (searchQuery) {
      const questionText = faq.isDynamic ? faq.qKey.toLowerCase() : t(faq.qKey).toLowerCase();
      const answerText = faq.isDynamic ? faq.aKey.toLowerCase() : t(faq.aKey).toLowerCase();
      const query = searchQuery.toLowerCase();
      return questionText.includes(query) || answerText.includes(query);
    }
    return faq.topic === activeTopic;
  });

  if (isLoading) {
    return (
      <section className="bg-[#f8fafc] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#DFB63E] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading FAQs...</p>
        </div>
      </section>
    );
  }

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
