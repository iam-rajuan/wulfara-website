"use client";
import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Globe, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { SUPPLIER_ONBOARDING_URL } from "@/config/urls";

const emptySubscribe = () => () => undefined;

export default function Footer() {
  const token = useSelector((state: RootState) => state.auth.token);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isLoggedIn = isClient && Boolean(token);

  if (isLoggedIn) {
    return (
      <footer className="bg-[#152033] text-slate-400">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            {/* Left: Brand & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="text-xl font-black tracking-wider text-white font-sans uppercase mb-1">
                WULFARA
              </div>
              <p className="text-slate-400 text-xs text-center md:text-left">
                &copy; 2024 WULFARA. All rights reserved. Industrial Reliability Global.
              </p>
            </div>

            {/* Middle: Company Links */}
            <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-xs">
              <Link href="/suppliers" className="hover:text-white transition-colors">Suppliers</Link>
              <Link href="/rfq" className="hover:text-white transition-colors">RFQ</Link>
              <Link href="/help-center" className="hover:text-white transition-colors">Contact</Link>
            </div>

            {/* Right: Legal & Global */}
            <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-xs">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/suppliers" className="hover:text-white transition-colors">Global Supply Chain</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#1b2b3a] text-slate-400 pt-16 pb-8 border-t border-[#dca12f]/20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column (Brand info) */}
          <div className="md:col-span-5 space-y-6">
            <div className="text-2xl font-black tracking-wider text-white font-sans uppercase flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-[#dca12f] grid place-items-center">
                <Globe size={14} className="text-[#dca12f]" />
              </div>
              WULFARA
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              WULFARA is a leading B2B marketplace directory connecting businesses with reliable suppliers, logistics, and manufacturing partners globally.
            </p>
            <p className="text-sm text-[#dca12f] font-semibold hover:text-[#c99126] transition-colors cursor-pointer">
              wulfara.com
            </p>
            
            {/* Language dropdown */}
            <div className="inline-flex items-center gap-2 bg-[#2a3b4c] border border-slate-600 rounded px-3 py-2 text-sm text-slate-300 cursor-pointer hover:bg-[#34485d] transition-colors w-fit">
              <Globe size={16} />
              <span>English</span>
              <ChevronDown size={16} />
            </div>
          </div>

          <div className="md:col-span-1 hidden md:block"></div>

          {/* Middle Column (Platform) */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Platform</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/rfq" className="hover:text-white transition-colors">RFQ</Link></li>
              <li><a href={SUPPLIER_ONBOARDING_URL} className="hover:text-white transition-colors">List Your Company</a></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Right Column (Support) */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Support</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/policies" className="hover:text-white transition-colors">Policies</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; 2026 WULFARA B2B Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
