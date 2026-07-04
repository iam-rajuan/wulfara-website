import React from "react";
import { FileText, ArrowRight, ChevronRight } from "lucide-react";

export default function HelpCenterArticles() {
  const articles = [
    "What is WULFARA?",
    "How do I search for verified suppliers?",
    "Creating an effective RFQ",
    "Resetting your account password",
    "Understanding supplier trust badges",
    "How to upgrade your supplier tier",
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto ">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900">Popular Articles</h2>
        <a href="#" className="text-[#34d399] hover:text-[#059669] text-xs font-semibold flex items-center gap-1 transition-colors">
          View all articles <ArrowRight className="h-3 w-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center justify-between p-4 bg-white rounded border border-[#e2e8f0] hover:border-[#dca12f]/30 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-slate-400 group-hover:text-[#dca12f] transition-colors" />
              <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                {article}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#45464D4D] group-hover:text-[#dca12f] transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}
