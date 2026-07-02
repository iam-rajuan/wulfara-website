"use client";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";
import "@/i18n";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  useEffect(() => {
    if (i18n.language === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [i18n.language]);

  const getLanguageLabel = (lng) => {
    switch (lng) {
      case "nl":
        return "Nederlands";
      case "ar":
        return "العربية";
      case "en":
      default:
        return "English";
    }
  };

  return (
    <div className="relative flex items-center gap-2 rounded border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 px-3 py-2 text-xs font-semibold text-slate-300 transition-all cursor-pointer">
      <Globe className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
      <span>{getLanguageLabel(i18n.language)}</span>
      <ChevronDown className="h-3 w-3 text-slate-400 ml-0.5 flex-shrink-0" />

      {/* Hidden Native Select Overlay */}
      <select
        id="language-select"
        value={i18n.language || "en"}
        onChange={handleLanguageChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        <option value="en">English</option>
        <option value="nl">Nederlands</option>
        <option value="ar">العربية (Arabic)</option>
      </select>
    </div>
  );
}
