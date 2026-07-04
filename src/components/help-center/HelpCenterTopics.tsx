import React from "react";
import { Rocket, Search, FileText, BadgeCheck, CreditCard, CircleDollarSign, Scale, Headset } from "lucide-react";

export default function HelpCenterTopics() {
  const topics = [
    {
      title: "Getting Started",
      description: "Learn the basics of using WULFARA, setting up your profile, and navigating the platform.",
      icon: Rocket,
    },
    {
      title: "Searching Suppliers",
      description: "Tips on finding the right suppliers, using filters, and interpreting company profiles.",
      icon: Search,
    },
    {
      title: "Sending RFQs",
      description: "How to create detailed Request for Quotations and manage responses from suppliers.",
      icon: FileText,
    },
    {
      title: "Supplier Accounts",
      description: "Guides for suppliers on listing products, responding to RFQs, and building trust.",
      icon: BadgeCheck,
    },
    {
      title: "Billing",
      description: "Information regarding premium plans, invoice management, and payment methods.",
      icon: CreditCard,
    },
    {
      title: "Payment Support",
      description: "Resolving transaction issues, understanding fees, and secure payment processing.",
      icon: CircleDollarSign,
    },
    {
      title: "Policies",
      description: "Review our terms of service, privacy policy, and community guidelines.",
      icon: Scale,
    },
    {
      title: "Contact Support",
      description: "Need further assistance? Reach out to our dedicated WULFARA support team.",
      icon: Headset,
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto bg-white">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Browse Topics</h2>
        <p className="text-slate-500 text-sm">Select a category to find specialized help and step-by-step documentation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <a
              key={index}
              href="#"
              className="flex flex-col p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md hover:border-[#dca12f]/40 transition-all group bg-white"
            >
              <div className="w-10 h-10 rounded bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-[#dca12f]/10 transition-colors">
                <Icon className="h-5 w-5 text-[#dca12f]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{topic.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-grow">
                {topic.description}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
