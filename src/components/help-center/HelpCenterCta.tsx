import React from "react";
import { Headset } from "lucide-react";

export default function HelpCenterCta() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto py-20">
      <div className="bg-[#dca12f] rounded-lg p-10 sm:p-14 text-center shadow-lg relative overflow-hidden">
        {/* Subtle background pattern/overlay if needed */}
        <div className="absolute inset-0 bg-black/5"></div>

        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
            Need further assistance?
          </h2>
          <p className="text-sm text-slate-800 max-w-lg mx-auto font-medium mb-8 leading-relaxed">
            Our dedicated support team is available 24/7 to help you navigate the platform and resolve any complex issues.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded bg-[#1b2b3a] hover:bg-slate-900 text-white px-8 py-3.5 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Headset className="h-4 w-4" />
              <span>Contact Support</span>
            </a>
            <a
              href="/faq"
              className="inline-flex items-center justify-center rounded bg-white hover:bg-slate-50 text-slate-900 px-8 py-3.5 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              Visit Full FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
