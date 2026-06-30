"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Globe, ChevronDown } from "lucide-react";

export default function Footer() {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  
  const languages = ["English", "Español", "Deutsch", "Français"];

  return (
    <footer className="bg-[#111a28] text-slate-400 border-t border-slate-800">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <span className="text-2xl font-black tracking-wider text-yellow-500 font-sans block">
              WULFARA
            </span>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              WULFARA is a leading B2B marketplace directory connecting businesses
              with reliable supplier, logistics, and manufacturing partners globally.
            </p>
            
            {/* Contact Email */}
            <div className="flex items-center gap-2 text-sm text-yellow-500/80 hover:text-yellow-500 transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@wulfaria.com">info@wulfaria.com</a>
            </div>

            {/* Language Selector */}
            <div className="relative inline-block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800/40 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5 text-slate-400" />
                <span>{currentLang}</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {langOpen && (
                <div className="absolute left-0 bottom-full mb-2 w-32 rounded-md bg-[#1e2d44] border border-slate-700 shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-yellow-500 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#rfq" className="hover:text-yellow-500 transition-colors">
                  RFQ
                </Link>
              </li>
              <li>
                <Link href="#list-company" className="hover:text-yellow-500 transition-colors">
                  List Your Company
                </Link>
              </li>
              <li>
                <Link href="#login" className="hover:text-yellow-500 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#faq" className="hover:text-yellow-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#help" className="hover:text-yellow-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#policies" className="hover:text-yellow-500 transition-colors">
                  Policies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-500">
            &copy; 2026 Wulfara.com. All rights reserved.
          </p>
          <div className="flex gap-6 text-slate-500">
            <Link href="#privacy" className="hover:text-yellow-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-yellow-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
