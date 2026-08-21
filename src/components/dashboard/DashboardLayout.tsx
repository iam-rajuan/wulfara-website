"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import logoImg from "../../../public/assets/logo.png";
import {
  LayoutDashboard,
  Search,
  Bookmark,
  FileText,
  Mail,
  Settings,
  Plus,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { io } from "socket.io-client";
import { API_BASE_URL, SOCKET_BASE_URL } from "@/config/urls";
import type { Notification } from "@/types/api";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Search Suppliers", href: "/dashboard/search", icon: Search },
  { label: "Favorite Suppliers", href: "/dashboard/favorites", icon: Bookmark },
  { label: "My RFQs", href: "/dashboard/rfqs", icon: FileText },
  { label: "Messages", href: "/dashboard/messages", icon: Mail },
  { label: "Profile Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isGuestMode] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("guestMode") === "true"
  );

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userInitial = (user?.name || "Guest Buyer").charAt(0).toUpperCase();

  useEffect(() => {
    // Click outside to close notifications
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user || !user._id) return;
    
    // Fetch initial notifications
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token") || (typeof window !== 'undefined' ? (window.localStorage.getItem('token') || '') : '');
        const res = await fetch(`${API_BASE_URL}/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setNotifications(data.data);
          setUnreadCount(data.data.filter((notification: Notification) => !notification.isRead).length);
        }
      } catch (error: unknown) {
        console.error("Error fetching notifications:", error);
      }
    };
    
    fetchNotifications();

    // Socket.io connection
    const socket = io(SOCKET_BASE_URL);

    socket.emit("join_room", user._id);
    
    socket.on("new_notification", (newNotification: Notification) => {
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const markAllAsRead = async () => {
    if (isGuestMode) return;

    try {
      const token = localStorage.getItem("token") || '';
      const res = await fetch(`${API_BASE_URL}/notifications/read-all`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error: unknown) {
      console.error("Error marking all as read:", error);
    }
  };

  const markAsRead = async (id: string) => {
    if (isGuestMode) return;

    try {
      const token = localStorage.getItem("token") || '';
      const res = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setNotifications((prev) =>
          prev.map((notification) => (notification._id === id ? { ...notification, isRead: true } : notification))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error: unknown) {
      console.error("Error marking as read:", error);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
      {/* ── Mobile Sidebar Overlay ── */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#F2F5F9] border-r border-gray-200 flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logoImg} alt="WULFARA" width={28} height={28} />
            <span className="text-[20px] font-extrabold tracking-tight text-[#0B172E]">
              WULFARA
            </span>
          </Link>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#212E46] text-white flex items-center justify-center text-sm font-bold shadow-sm border border-gray-200">
              {userInitial}
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#0B172E] leading-tight truncate w-[150px]">
                {user?.name || (isGuestMode ? "Guest Buyer" : "Loading...")}
              </p>
              <p className="text-[12px] font-bold text-gray-500 capitalize">{isGuestMode ? "Guest" : user?.role || "buyer"} Account</p>
            </div>
          </div>
        </div>

        {/* New RFQ button */}
        <div className="px-6 pb-6">
          <Link
            href="/dashboard/rfqs/new"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-[#212E46] hover:bg-[#151D2C] text-white text-[14px] font-semibold transition-colors shadow-sm"
          >
            <Plus size={18} strokeWidth={2.5} />
            New RFQ
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-md text-[14px] font-bold transition-colors ${isActive
                    ? "bg-[#DFB63E] text-[#0B172E] shadow-sm"
                    : "text-[#4B5563] hover:bg-[#E5E9F0] hover:text-[#0B172E]"
                  }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-[64px] shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 gap-4">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-[18px] font-bold text-[#0f1b2d] hidden sm:block">Overview</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-5 flex-1 justify-end">
            {/* Search */}
            <div className="relative hidden md:block w-full max-w-[320px]">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search suppliers, RFQs, messages..."
                className="w-full h-[38px] pl-9 pr-4 text-sm rounded-lg border border-gray-200 bg-[#F8F9FB] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] placeholder:text-gray-400 transition-all"
              />
            </div>

            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Search size={20} className="text-gray-500" />
            </button>

            {/* Icons */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell size={20} className="text-gray-500" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] flex items-center justify-center font-bold h-[14px] min-w-[14px] px-1 rounded-full border border-white">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-bold text-[#0B172E] text-[15px]">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[12px] text-blue-600 font-semibold hover:text-blue-800"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-[350px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-gray-500">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((item) => (
                        <div 
                          key={item._id} 
                          onClick={() => !item.isRead && markAsRead(item._id)}
                          className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3 transition-colors ${!item.isRead ? 'bg-blue-50/30' : ''}`}
                        >
                          <div className={`mt-0.5 p-2 rounded-full shrink-0 h-fit ${!item.isRead ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                            <Bell size={16} />
                          </div>
                          <div>
                            <p className={`text-[13px] ${!item.isRead ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                              {item.title}
                            </p>
                            <p className={`text-[12px] mt-0.5 ${!item.isRead ? 'text-gray-700' : 'text-gray-500'}`}>
                              {item.message}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              {new Date(item.createdAt).toLocaleString()}
                            </p>
                          </div>
                          {!item.isRead && (
                            <div className="shrink-0 mt-1.5">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Mail size={20} className="text-gray-500" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
