"use client";

import React, { useState } from "react";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/app/images/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  const languages = ["English", "Español", "Deutsch", "Français"];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1b2b3a] border-b border-[#dca12f]/80 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              Home
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="#rfq"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              RFQ
            </Link>
            <Link
              href="#help"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Help Center
            </Link>
            <Link
              href="#policies"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Policies
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded border border-[#dca12f] bg-transparent px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800/30 transition-all cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5 text-[#4ba3e3]" />
                <span>{currentLang}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-300 ml-0.5" />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-md bg-[#162235] border border-slate-700 shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-[#dca12f] hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login Link */}
            <Link
              href="#login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Login
            </Link>

            {/* CTA Button */}
            <Link
              href="#list-company"
              className="rounded bg-[#dca12f] hover:bg-[#c99126] px-5 py-2 text-xs font-bold text-slate-950 transition-all shadow-sm"
            >
              List Your Company
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
        <div className="md:hidden px-4 pt-2 pb-4 space-y-3 bg-[#162235] border-t border-slate-700/50">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            Home
          </Link>
          <Link
            href="#faq"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            FAQ
          </Link>
          <Link
            href="#rfq"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            RFQ
          </Link>
          <Link
            href="#help"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            Help Center
          </Link>
          <Link
            href="#policies"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            Policies
          </Link>
          <div className="h-px bg-slate-700 my-2"></div>
          <div className="flex items-center justify-between pt-2">
            <Link
              href="#login"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-white"
            >
              Login
            </Link>
            <Link
              href="#list-company"
              onClick={() => setIsOpen(false)}
              className="rounded bg-[#dca12f] px-4 py-2 text-xs font-bold text-slate-950 shadow-md transition-all"
            >
              List Your Company
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
