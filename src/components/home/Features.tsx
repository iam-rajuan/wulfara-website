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
      link: "/policies",
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
    <section id="features" className="bg-[#ffff] py-16 border-y border-slate-200/50">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.link}
                className="group relative flex flex-col justify-start bg-white p-5 rounded border border-[#dca12f]/25 hover:border-[#dca12f]/60 hover:shadow-sm transition-all duration-300 text-left rtl:text-right min-h-[220px]"
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded border border-[#dca12f]/35 bg-[#dca12f]/5 text-[#dca12f] mb-5 group-hover:border-[#dca12f]/70 transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Text Details */}
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#dca12f] transition-colors duration-300">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {t(card.descKey)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
