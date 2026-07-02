"use client";

import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

export default function Footer() {
  const { t } = useTranslation();

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
              {t('footerDesc')}
            </p>
            
            {/* Contact Email */}
            <div className="flex items-center gap-2 text-sm text-yellow-500/80 hover:text-yellow-500 transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@wulfaria.com">info@wulfaria.com</a>
            </div>

            {/* Language Selector */}
            <div className="inline-block">
              <LanguageSelector />
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              {t('platform')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#rfq" className="hover:text-yellow-500 transition-colors">
                  {t('rfq')}
                </Link>
              </li>
              <li>
                <Link href="#list-company" className="hover:text-yellow-500 transition-colors">
                  {t('listCompany')}
                </Link>
              </li>
              <li>
                <Link href="#login" className="hover:text-yellow-500 transition-colors">
                  {t('login')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              {t('support')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#faq" className="hover:text-yellow-500 transition-colors">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link href="#help" className="hover:text-yellow-500 transition-colors">
                  {t('helpCenter')}
                </Link>
              </li>
              <li>
                <Link href="#policies" className="hover:text-yellow-500 transition-colors">
                  {t('policies')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-500">
            &copy; 2026 Wulfara.com. {t('rightsReserved')}
          </p>
          <div className="flex gap-6 text-slate-500">
            <Link href="#privacy" className="hover:text-yellow-500 transition-colors">
              {t('privacyPolicy')}
            </Link>
            <Link href="#terms" className="hover:text-yellow-500 transition-colors">
              {t('termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
