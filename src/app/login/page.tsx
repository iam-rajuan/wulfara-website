"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logoImg from "../../../public/assets/logo.png";
import authBg from "../../../public/assets/auth-bg.png";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Bookmark,
  FileText,
  LayoutDashboard,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email === "mehedi@gmail.com" && formData.password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* ───── Left Panel: Login Form ───── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-12 md:px-16 lg:px-20 py-10 bg-white relative">
        {/* Form Content */}
        <div className="max-w-[340px] w-full">
          {/* Logo */}
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={logoImg}
                alt="Wulfara Logo"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
                priority
              />
              <span className="text-lg font-black tracking-wider text-[#1b2b3a] uppercase">
                WULFARA
              </span>
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#1b2b3a] leading-tight mb-2">
            Login to
            <br />
            WULFARA
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Access your RFQs, saved suppliers,
            <br />
            and messages.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#1b2b3a] mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/60 py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-[#dca12f] focus:ring-2 focus:ring-[#dca12f]/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#1b2b3a] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/60 py-3 pl-11 pr-11 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-[#dca12f] focus:ring-2 focus:ring-[#dca12f]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="rememberMe"
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#dca12f] focus:ring-[#dca12f]/30 cursor-pointer accent-[#dca12f]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[#dca12f] hover:text-[#c99126] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              id="login-btn"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#dca12f] hover:bg-[#c99126] py-3.5 text-sm font-bold text-[#1b2b3a] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer active:scale-[0.98]"
            >
              Login
            </button>

            {/* Create Account */}
            <Link
              href="/signup"
              id="create-account-btn"
              className="w-full rounded-lg border border-gray-200 bg-white py-3.5 text-sm font-semibold text-[#1b2b3a] transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 cursor-pointer active:scale-[0.98] block text-center"
            >
              Create Account
            </Link>
          </form>

          {/* Continue as Guest */}
          <p className="text-sm text-gray-500 mt-8 text-center">
            <Link
              href="/"
              className="text-[#1b2b3a] font-semibold hover:text-[#dca12f] transition-colors inline-flex items-center gap-1"
            >
              Continue as Guest
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </p>
        </div>
      </div>

      {/* ───── Right Panel: Buyer Workspace Showcase ───── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f1b2d] relative overflow-hidden flex-col justify-center px-12 xl:px-20">
        {/* Background image */}
        <Image
          src={authBg}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0f1b2d]/70" />
        {/* Background gradient accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#dca12f]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e3a5f]/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 max-w-[520px]">
          {/* Heading */}
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
            Your buyer
            <br />
            workspace
          </h2>
          <p className="text-[15px] text-slate-400 leading-relaxed mb-10 max-w-md">
            A centralized, high-efficiency hub to manage your industrial
            procurement lifecycle securely.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Save Suppliers */}
            <div className="bg-[#162236]/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/60 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#dca12f]/15 flex items-center justify-center mb-3">
                <Bookmark size={20} className="text-[#dca12f]" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Save Suppliers
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Curate your trusted network.
              </p>
            </div>

            {/* Track RFQs */}
            <div className="bg-[#162236] border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/60 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#dca12f]/15 flex items-center justify-center mb-3">
                <FileText size={20} className="text-[#dca12f]" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Track RFQs
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Monitor active bids instantly.
              </p>
            </div>
          </div>

          {/* Message Suppliers - Full Width */}
          <div className="bg-[#162236] border border-slate-700/50 rounded-xl p-5 mb-8 hover:border-slate-600/60 transition-colors group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#dca12f]/15 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-[#dca12f]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-0.5">
                  Message Suppliers
                </h3>
                <p className="text-xs text-slate-400">
                  Direct, secure communication channels.
                </p>
              </div>
            </div>
            <ArrowRight
              size={18}
              className="text-slate-500 group-hover:text-[#dca12f] transition-colors shrink-0"
            />
          </div>

          {/* Dashboard Overview Card */}
          <div className="bg-[#ffff] border-t-4 border-[#D4AF37] rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-1">
                <LayoutDashboard size={14} className="text-[#000000]" />
                <h3 className="text-sm font-semibold text-[#000000]">
                  Dashboard Overview
                </h3>
              </div>
              <span className="text-xs font-medium text-[#44474D] bg-[#E5EEFF] px-3 py-1 rounded-[16px]">
                Live Data
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center border-r border-slate-700/50 pr-4">
                <p className="text-3xl font-bold text-black mb-1">4</p>
                <p className="text-[10px] font-medium text-[#44474D] uppercase tracking-wider">
                  Active RFQs
                </p>
              </div>
              <div className="text-center border-r border-slate-700/50 pr-4">
                <p className="text-3xl font-bold text-black mb-1">8</p>
                <p className="text-[10px] font-medium text-[#44474D] uppercase tracking-wider">
                  Favorite Suppliers
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-black mb-1">2</p>
                <p className="text-[10px] font-medium text-[#44474D] uppercase tracking-wider">
                  Recent Messages
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
