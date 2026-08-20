"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import logoImg from "../../../../public/assets/logo.png";
import authBg from "../../../../public/assets/auth-bg.png";
import {
  Lock,
  ArrowRight,
  Bookmark,
  FileText,
  LayoutDashboard,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { API_BASE_URL } from "@/config/urls";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }
      
      setIsSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* ───── Left Panel: Reset Password Form ───── */}
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
            Create New
            <br />
            Password
          </h1>
          
          {!isSuccess ? (
            <p className="text-sm text-gray-500 mb-8">
              Your new password must be different from previous used passwords and at least 6 characters.
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-8">
              Redirecting you to login...
            </p>
          )}

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}
              
              {/* New Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#1b2b3a] mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/60 py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-[#dca12f] focus:ring-2 focus:ring-[#dca12f]/20"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-[#1b2b3a] mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50/60 py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-[#dca12f] focus:ring-2 focus:ring-[#dca12f]/20"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Show Password Toggle */}
              <div className="flex items-center">
                <input
                  id="showPassword"
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="w-4 h-4 text-[#dca12f] rounded border-gray-300 focus:ring-[#dca12f]"
                />
                <label htmlFor="showPassword" className="ml-2 text-sm text-gray-600 cursor-pointer">
                  Show passwords
                </label>
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
                    Saving...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">Password Reset!</h3>
              <p className="text-sm text-green-700">
                Your password has been successfully reset. You will be redirected to the login page momentarily.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ───── Right Panel: Showcase (Same as Forgot Password) ───── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f1b2d] relative overflow-hidden flex-col justify-center px-12 xl:px-20">
        <Image src={authBg} alt="" fill sizes="50vw" className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-[#0f1b2d]/70" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#dca12f]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e3a5f]/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10 max-w-[520px]">
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
            Your buyer
            <br />
            workspace
          </h2>
          <p className="text-[15px] text-slate-400 leading-relaxed mb-10 max-w-md">
            A centralized, high-efficiency hub to manage your industrial
            procurement lifecycle securely.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#162236]/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/60 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#dca12f]/15 flex items-center justify-center mb-3">
                <Bookmark size={20} className="text-[#dca12f]" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Save Suppliers</h3>
            </div>
            <div className="bg-[#162236] border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/60 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#dca12f]/15 flex items-center justify-center mb-3">
                <FileText size={20} className="text-[#dca12f]" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Track RFQs</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
