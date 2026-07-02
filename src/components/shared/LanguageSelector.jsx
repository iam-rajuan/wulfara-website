"use client";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
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

  return (
    <div className="flex items-center gap-2">
      <label 
        htmlFor="language-select" 
        className="text-xs font-semibold uppercase tracking-wider text-slate-400"
      >
        Language:
      </label>
      <div className="relative inline-block">
        <select
          id="language-select"
          value={i18n.language || "en"}
          onChange={handleLanguageChange}
          className="appearance-none rounded-lg border border-[#dca12f]/80 bg-[#162235] hover:bg-slate-800/40 text-white px-3 py-1.5 pr-8 text-xs font-bold transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#dca12f]/50 cursor-pointer"
        >
          <option value="en" className="bg-[#162235] text-white">English</option>
          <option value="nl" className="bg-[#162235] text-white">Nederlands</option>
          <option value="ar" className="bg-[#162235] text-white">العربية (Arabic)</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#dca12f]">
          <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
