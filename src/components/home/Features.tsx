"use client";

import React from "react";
import {
  FileText,
  HelpCircle,
  ShieldCheck,
  PlusCircle,
  MessageSquare,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const cards = [
    {
      titleKey: "rfq",
      descKey: "rfqDesc",
      icon: FileText,
      link: "#rfq",
    },
    {
      titleKey: "helpCenter",
      descKey: "helpCenterDesc",
      icon: HelpCircle,
      link: "#help",
    },
    {
      titleKey: "policies",
      descKey: "policiesDesc",
      icon: ShieldCheck,
      link: "#policies",
    },
    {
      titleKey: "listCompany",
      descKey: "listCompanyDesc",
      icon: PlusCircle,
      link: "#list-company",
    },
    {
      titleKey: "faq",
      descKey: "faqDesc",
      icon: MessageSquare,
      link: "#faq",
    },
    {
      titleKey: "login",
      descKey: "loginDesc",
      icon: LogIn,
      link: "#login",
    },
  ];

  return (
    <section id="features" className="bg-[#f8fafc] py-16 sm:py-24 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.link}
                className="group relative flex flex-col justify-between bg-white p-8 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-yellow-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className="inline-flex items-center justify-center p-3 rounded-lg bg-yellow-500/10 text-yellow-600 mb-6 group-hover:bg-yellow-500 group-hover:text-slate-950 transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Text Details */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {t(card.descKey)}
                  </p>
                </div>

                {/* Micro-animation bottom indicator */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
