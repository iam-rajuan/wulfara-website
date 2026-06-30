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

export default function Features() {
  const cards = [
    {
      title: "RFQ",
      description: "Request a quote from suppliers.",
      icon: FileText,
      link: "#rfq",
    },
    {
      title: "Help Center",
      description: "Get support and find answers.",
      icon: HelpCircle,
      link: "#help",
    },
    {
      title: "Policies",
      description: "Read our platform guidelines.",
      icon: ShieldCheck,
      link: "#policies",
    },
    {
      title: "List Company",
      description: "Get listed and boost visibility.",
      icon: PlusCircle,
      link: "#list-company",
    },
    {
      title: "FAQ",
      description: "Common questions answered.",
      icon: MessageSquare,
      link: "#faq",
    },
    {
      title: "Login",
      description: "Access your account dashboard.",
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
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {card.description}
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
