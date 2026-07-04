"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/assets/logo.png";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1b2b3a] border-b border-[#dca12f]/80 shadow-lg">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={logoImg}
                alt="Wulfara Logo Icon"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-sans uppercase">
                WULFARA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {t('faq')}
            </Link>
            <Link
              href="/rfq"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {t('rfq')}
            </Link>
            <Link
              href="/help-center"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {t('helpCenter')}
            </Link>
            <Link
              href="/policies"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {t('policies')}
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Language Switcher */}
            <LanguageSelector />

            {/* Login Link */}
            <Link
              href="#login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {t('login')}
            </Link>

            {/* CTA Button */}
            <Link
              href="#list-company"
              className="rounded bg-[#dca12f] hover:bg-[#c99126] px-5 py-2 text-xs font-bold text-slate-950 transition-all shadow-sm"
            >
              {t('listCompany')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-4 bg-[#162235] border-t border-slate-700/50">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-300 hover:text-white py-2 border-b border-slate-800"
            >
              {t('home')}
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-300 hover:text-white py-2 border-b border-slate-800"
            >
              {t('faq')}
            </Link>
            <Link
              href="/rfq"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-300 hover:text-white py-2 border-b border-slate-800"
            >
              {t('rfq')}
            </Link>
            <Link
              href="/help-center"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-300 hover:text-white py-2 border-b border-slate-800"
            >
              {t('helpCenter')}
            </Link>
            <Link
              href="/policies"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-300 hover:text-white py-2"
            >
              {t('policies')}
            </Link>
          </div>

          <div className="h-px bg-slate-700 my-2"></div>

          <div className="flex items-center justify-between gap-4">
            {/* Mobile Language Selector */}
            <LanguageSelector />

            {/* Mobile Login Link */}
            <Link
              href="#login"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-white"
            >
              {t('login')}
            </Link>
          </div>

          {/* Mobile CTA Full Width */}
          <div className="pt-2">
            <Link
              href="#list-company"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center rounded bg-[#dca12f] hover:bg-[#c99126] px-4 py-3 text-sm font-bold text-slate-950 shadow-md transition-all"
            >
              {t('listCompany')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
