"use client";

import React from "react";
import HelpCenterHero from "@/components/help-center/HelpCenterHero";
import HelpCenterTopics from "@/components/help-center/HelpCenterTopics";
import HelpCenterArticles from "@/components/help-center/HelpCenterArticles";
import HelpCenterCta from "@/components/help-center/HelpCenterCta";

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <HelpCenterHero />
      <HelpCenterTopics />
      <HelpCenterArticles />
      <HelpCenterCta />
    </main>
  );
}
