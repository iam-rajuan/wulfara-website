"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/assets/logo.png";
import {
  LayoutDashboard,
  Search,
  Heart,
  FileText,
  MessageSquare,
  Settings,
  Plus,
  Bell,
  Mail,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Search Suppliers", href: "/dashboard/search", icon: Search },
  { label: "Favorite Suppliers", href: "/dashboard/favorites", icon: Heart },
  { label: "My RFQs", href: "/dashboard/rfqs", icon: FileText },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Profile Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-[230px] shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="px-5 pt-6 pb-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src={logoImg} alt="WULFARA" width={32} height={32} />
            <span className="text-[17px] font-extrabold tracking-tight text-[#0f1b2d]">
              WULFARA
            </span>
          </Link>
        </div>

        {/* User info */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1a3a5c] flex items-center justify-center text-white text-xs font-bold">
              AV
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0f1b2d] leading-tight">
                Adlef Vertigo
              </p>
              <p className="text-[11px] text-gray-500">Buyer Account</p>
            </div>
          </div>
        </div>

        {/* New RFQ button */}
        <div className="px-4 pb-5">
          <Link
            href="/dashboard/rfqs/new"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#c9a02f] text-white text-sm font-semibold transition-colors"
          >
            <Plus size={16} strokeWidth={2.5} />
            New RFQ
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#D4AF37] text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-[64px] shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-[18px] font-bold text-[#0f1b2d]">Overview</h1>

          <div className="flex items-center gap-5">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search suppliers, RFQs, messages..."
                className="w-[320px] h-[38px] pl-9 pr-4 text-sm rounded-lg border border-gray-200 bg-[#F8F9FB] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] placeholder:text-gray-400 transition-all"
              />
            </div>

            {/* Icons */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Mail size={20} className="text-gray-500" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
