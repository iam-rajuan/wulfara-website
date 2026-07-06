"use client";

import { useState } from "react";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Upload, 
  Mail,
  Lock,
  Globe,
  MapPin,
  Save
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="w-full max-w-5xl mx-auto pb-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#0B172E] tracking-tight mb-2">
          Profile Settings
        </h1>
        <p className="text-[15px] text-gray-500">
          Manage your account settings, company details, and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-[14px] font-bold transition-colors cursor-pointer ${
                activeTab === "profile" 
                  ? "bg-[#DFB63E] text-black" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#0B172E]"
              }`}
            >
              <User size={18} />
              My Profile
            </button>
            <button
              onClick={() => setActiveTab("company")}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-[14px] font-bold transition-colors cursor-pointer ${
                activeTab === "company" 
                  ? "bg-[#DFB63E] text-black" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#0B172E]"
              }`}
            >
              <Building size={18} />
              Company Details
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-[14px] font-bold transition-colors cursor-pointer ${
                activeTab === "notifications" 
                  ? "bg-[#DFB63E] text-black" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#0B172E]"
              }`}
            >
              <Bell size={18} />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-[14px] font-bold transition-colors cursor-pointer ${
                activeTab === "security" 
                  ? "bg-[#DFB63E] text-black" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#0B172E]"
              }`}
            >
              <Shield size={18} />
              Security
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Profile Card */}
              <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                <h2 className="text-[18px] font-bold text-[#0B172E] mb-6">Personal Information</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-[#E0E7FF] rounded-full flex items-center justify-center text-[#3730A3] text-2xl font-bold border-4 border-white shadow-sm">
                    JD
                  </div>
                  <div>
                    <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors mb-2 cursor-pointer">
                      <Upload size={14} />
                      Change Avatar
                    </button>
                    <p className="text-[11px] text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-700">First Name</label>
                    <input type="text" defaultValue="John" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-700">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-700">Email Address</label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <Mail size={16} className="text-gray-400" />
                       </div>
                       <input type="email" defaultValue="john.doe@example.com" className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-700">Phone Number</label>
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E]" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-black font-bold py-2.5 px-6 rounded-md transition-colors text-[14px] cursor-pointer">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "company" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                <h2 className="text-[18px] font-bold text-[#0B172E] mb-6">Company Information</h2>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-700">Company Name</label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <Building size={16} className="text-gray-400" />
                       </div>
                       <input type="text" defaultValue="TechGlobal Industries" className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-700">Website</label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <Globe size={16} className="text-gray-400" />
                       </div>
                       <input type="url" defaultValue="https://techglobal.example.com" className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-700">Headquarters Address</label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <MapPin size={16} className="text-gray-400" />
                       </div>
                       <input type="text" defaultValue="123 Innovation Drive, Tech City, CA 94000" className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-black font-bold py-2.5 px-6 rounded-md transition-colors text-[14px] cursor-pointer">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                <h2 className="text-[18px] font-bold text-[#0B172E] mb-6">Email Notifications</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#DFB63E] rounded border-gray-300 focus:ring-[#DFB63E]" />
                    <div>
                      <p className="text-[14px] font-bold text-[#0B172E]">New RFQ Replies</p>
                      <p className="text-[12px] text-gray-500">Get notified when a supplier responds to your RFQ.</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#DFB63E] rounded border-gray-300 focus:ring-[#DFB63E]" />
                    <div>
                      <p className="text-[14px] font-bold text-[#0B172E]">Direct Messages</p>
                      <p className="text-[12px] text-gray-500">Get notified when you receive a new direct message.</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-[#DFB63E] rounded border-gray-300 focus:ring-[#DFB63E]" />
                    <div>
                      <p className="text-[14px] font-bold text-[#0B172E]">Marketing Emails</p>
                      <p className="text-[12px] text-gray-500">Receive weekly newsletters and feature updates.</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-[#DFB63E] hover:bg-[#cba433] text-black font-bold py-2.5 px-6 rounded-md transition-colors text-[14px] cursor-pointer">
                  <Save size={16} />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                <h2 className="text-[18px] font-bold text-[#0B172E] mb-6">Change Password</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-700">Current Password</label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <Lock size={16} className="text-gray-400" />
                       </div>
                       <input type="password" placeholder="••••••••" className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-700">New Password</label>
                    <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <Lock size={16} className="text-gray-400" />
                       </div>
                       <input type="password" placeholder="••••••••" className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-3 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#DFB63E] focus:border-[#DFB63E]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-[#0B172E] hover:bg-[#15274d] text-white font-bold py-2.5 px-6 rounded-md transition-colors text-[14px] cursor-pointer">
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
