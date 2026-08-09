"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/assets/logo.png";
import authBg from "../../../public/assets/auth-bg.png";
import {
  Mail,
  ArrowRight,
  Bookmark,
  FileText,
  LayoutDashboard,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const response = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* ───── Left Panel: Forgot Password Form ───── */}
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
            Reset
            <br />
            Password
          </h1>
          
          {!isSuccess ? (
            <p className="text-sm text-gray-500 mb-8">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-8">
              Check your email for the reset link.
            </p>
          )}

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
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
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/60 py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-[#dca12f] focus:ring-2 focus:ring-[#dca12f]/20"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#dca12f] hover:bg-[#c99126] py-3.5 text-sm font-bold text-[#1b2b3a] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#1b2b3a] border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Reset Instructions"
                )}
              </button>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">Email Sent!</h3>
              <p className="text-sm text-green-700">
                If an account exists for <strong>{email}</strong>, you will receive password reset instructions shortly.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail("");
                }}
                className="mt-6 text-sm font-semibold text-green-800 hover:text-green-900 transition-colors underline"
              >
                Try another email
              </button>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="text-[#1b2b3a] font-semibold hover:text-[#dca12f] transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* ───── Right Panel: Buyer Workspace Showcase ───── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f1b2d] relative overflow-hidden flex-col justify-center px-12 xl:px-20">
        {/* Background image */}
        <Image
          src={authBg}
          alt=""
          fill
          sizes="50vw"
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
