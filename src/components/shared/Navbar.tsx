"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/assets/logo.png";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();
  const dashboardUrl =
    process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:5173";

  const dispatch = useDispatch();
  const router = useRouter();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = mounted && !!token;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              href="/category"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Category
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
            {/* <LanguageSelector /> */}

            {/* Auth Links */}
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {t('login')}
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-[#dca12f] text-slate-900 font-bold flex items-center justify-center hover:bg-[#c99126] transition-colors shadow-sm"
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-slate-200 z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 font-medium"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        dispatch(logout());
                        router.push('/');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CTA Button */}
            {!isLoggedIn && (
              <a
                href={`${dashboardUrl}/sign-in`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-[#dca12f] hover:bg-[#c99126] px-5 py-2 text-xs font-bold text-slate-950 transition-all shadow-sm"
              >
                {t('listCompany')}
              </a>
            )}
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
            {isLoggedIn && (
              <Link
                href="/category"
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-slate-300 hover:text-white py-2 border-b border-slate-800"
              >
                Category
              </Link>
            )}
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

            {/* Mobile Auth Links */}
            {!isLoggedIn ? (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-white"
              >
                {t('login')}
              </Link>
            ) : (
              <button
                onClick={() => {
                  dispatch(logout());
                  setIsOpen(false);
                  router.push('/');
                }}
                className="text-base font-medium text-slate-300 hover:text-white"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile CTA Full Width */}
          {!isLoggedIn && (
            <a
              href={`${dashboardUrl}/sign-in`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex w-full items-center justify-center rounded bg-[#dca12f] hover:bg-[#c99126] px-5 py-3 text-sm font-bold text-slate-950 transition-colors shadow-sm"
            >
              {t('listCompany')}
            </a>
          )}
        </div>
      )}
    </header>
  );
}
