"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Scale,
  Lock,
  Building2,
  FileText,
  CreditCard,
  CircleX,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { TermsIcon, SupplierListingIcon, PolicyShieldIcon } from "@/components/icons";
import { useGetPagesQuery } from "@/store/features/cms/cmsApi";

export default function PoliciesPage() {
  const { data: pagesResponse } = useGetPagesQuery(undefined);
  const policyPage = pagesResponse?.data?.find((p: any) => p.slug === 'policies');
  const cmsPolicies = policyPage?.htmlContent ? JSON.parse(policyPage.htmlContent) : null;

  const [activeSection, setActiveSection] = useState("terms-of-service");

  const policies = [
    {
      id: "terms-of-service",
      title: "Terms of Service",
      icon: TermsIcon,
      content: cmsPolicies?.termsOfService ? (
        <div dangerouslySetInnerHTML={{ __html: cmsPolicies.termsOfService }} className="text-sm text-slate-600 mb-3 leading-relaxed" />
      ) : (
        <>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            WULFARA serves as a matchmaking platform and marketplace; we are not a party to the transactions between buyers and suppliers.
          </p>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Users are responsible for providing accurate company information and maintaining account security.
          </p>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Any misuse of the platform, including fraudulent RFQs or spamming suppliers, will result in immediate termination.
          </p>
        </>
      ),
      linkText: "Read full Terms of Service"
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      icon: Lock,
      content: cmsPolicies?.privacyPolicy ? (
        <div dangerouslySetInnerHTML={{ __html: cmsPolicies.privacyPolicy }} className="text-sm text-slate-600 mb-3 leading-relaxed" />
      ) : (
        <>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            We collect essential business data to facilitate B2B connections and improve platform experience.
          </p>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Your business information is used solely for matchmaking and marketplace functionality.
          </p>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            All payments are handled through Stripe&apos;s secure infrastructure; WULFARA does not store credit card details.
          </p>
        </>
      ),
      linkText: "Read full Privacy Policy"
    },
    {
      id: "supplier-listing-policy",
      title: "Supplier Listing Policy",
      icon: SupplierListingIcon,
      content: cmsPolicies?.supplierListingPolicy ? (
        <div dangerouslySetInnerHTML={{ __html: cmsPolicies.supplierListingPolicy }} className="text-sm text-slate-600 mb-3 leading-relaxed" />
      ) : (
        <>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Suppliers must maintain an active, verified account to list products or services.
          </p>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Profiles must contain accurate details including company name, primary industry, and physical location.
          </p>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            All listings undergo a review process to ensure quality and authenticity before becoming visible to buyers.
          </p>
        </>
      ),
      linkText: "View Supplier Listing Rules"
    },
    {
      id: "rfq-policy",
      title: "RFQ Policy",
      icon: FileText,
      content: cmsPolicies?.rfqPolicy ? (
        <div dangerouslySetInnerHTML={{ __html: cmsPolicies.rfqPolicy }} className="text-sm text-slate-600 mb-3 leading-relaxed" />
      ) : (
        <>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Buyers can search the marketplace and submit detailed RFQs to specific or multiple suppliers.
          </p>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Submission details must be clear, specifying quantity, technical requirements, and delivery timelines.
          </p>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Suppliers are responsible for timely and professional responses; WULFARA is not responsible for negotiation outcomes.
          </p>
        </>
      ),
      linkText: "Learn About RFQs"
    },
    {
      id: "payment-subscription-policy",
      title: "Payment & Subscription Policy",
      icon: CreditCard,
      content: cmsPolicies?.paymentSubscriptionPolicy ? (
        <div dangerouslySetInnerHTML={{ __html: cmsPolicies.paymentSubscriptionPolicy }} className="text-sm text-slate-600 mb-3 leading-relaxed" />
      ) : (
        <>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Browsing the marketplace and submitting basic RFQs is free for qualified procurement officers.
          </p>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Paid supplier plans (Basic, Pro, Premium) provide varying levels of visibility and feature access.
          </p>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Processing is managed by Stripe; invoices are available in the supplier dashboard immediately after transaction.
          </p>
        </>
      ),
      linkText: "View Subscription Details"
    },
    {
      id: "cancellation-policy",
      title: "Cancellation Policy",
      icon: CircleX,
      content: cmsPolicies?.cancellationPolicy ? (
        <div dangerouslySetInnerHTML={{ __html: cmsPolicies.cancellationPolicy }} className="text-sm text-slate-600 mb-3 leading-relaxed" />
      ) : (
        <>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            New subscriptions include a 5-day grace period for cancellation with a full refund.
          </p>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            After the 5-day window, subscriptions are committed for the remainder of the billing period.
          </p>
          <div className="bg-slate-50 p-4 rounded border border-slate-100 mb-4">
            <h4 className="text-xs font-bold text-slate-900 mb-1">5-Day Cancellation Window:</h4>
            <p className="text-xs text-slate-600">
              Suppliers can cancel within the first 5 days. After 5 days, the subscription commitment remains active until the selected listing period ends.
            </p>
          </div>
        </>
      ),
      linkText: "Contact Support About Cancellation"
    }
  ];

  const quickLinks = [
    { label: "Supplier Listing Rules", id: "supplier-listing-policy" },
    { label: "RFQ Guidelines", id: "rfq-policy" },
    { label: "Payment & Subscription", id: "payment-subscription-policy" },
    { label: "Cancellation Policy", id: "cancellation-policy" },
  ];

  const summaryCards = [
    {
      id: "terms-of-service",
      title: "Terms of Service",
      desc: "Marketplace rules, platform usage, and user responsibilities.",
      icon: TermsIcon
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      desc: "Data collection, secure payments, and privacy rights.",
      icon: Lock
    },
    {
      id: "supplier-listing-policy",
      title: "Supplier Listing",
      desc: "Verification, profile accuracy, and listing requirements.",
      icon: SupplierListingIcon
    },
    {
      id: "rfq-policy",
      title: "RFQ Policy",
      desc: "Submission rules, responses, and negotiation terms.",
      icon: FileText
    },
    {
      id: "payment-subscription-policy",
      title: "Payments",
      desc: "Subscription plans, Stripe billing, and invoice access.",
      icon: CreditCard
    },
    {
      id: "cancellation-policy",
      title: "Cancellation",
      desc: "Subscription cancellation terms and timelines.",
      icon: CircleX
    }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[#f8fafc] pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center text-xs text-slate-500 mb-4 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-slate-900">Policies</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Policies</h1>
          <p className="text-slate-600 max-w-2xl text-sm leading-relaxed mb-6">
            Review WULFARA&apos;s platform policies for suppliers, customers, RFQs, payments, subscriptions, and cancellations.
          </p>

          <div className="flex flex-wrap gap-3">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 bg-[#e2e8f0]/50 hover:bg-[#e2e8f0] text-slate-700 text-xs font-medium rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-64 shrink-0 bg-white border border-slate-200 rounded-lg p-4 sticky top-24 shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-3 px-2">
              Policy Sections
            </h3>
            <nav className="flex flex-col space-y-1">
              {policies.map((policy) => (
                <button
                  key={policy.id}
                  onClick={() => scrollToSection(policy.id)}
                  className={`text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === policy.id
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  {policy.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 space-y-6 w-full">

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-2">
              {summaryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.id}
                    onClick={() => scrollToSection(card.id)}
                    className="flex flex-col text-left bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md hover:border-slate-300 transition-all group"
                  >
                    <Icon className="w-5 h-5 text-slate-700 mb-3 group-hover:text-slate-900 transition-colors" />
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{card.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Alert Banner */}
            <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-lg p-4 flex items-start shadow-sm">
              <AlertTriangle className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-bold text-[#b45309] mb-1">
                  Important Supplier Subscription Notice
                </h4>
                <p className="text-sm text-[#d97706]">
                  Suppliers can cancel within the first 5 days; after 5 days, the subscription commitment remains active until the selected listing period ends.
                </p>
              </div>
            </div>

            {/* Policy Cards */}
            {policies.map((policy) => {
              const Icon = policy.icon;
              return (
                <div
                  key={policy.id}
                  id={policy.id}
                  className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm scroll-mt-24"
                >
                  <div className="flex items-center mb-6">
                    <Icon className="w-6 h-6 text-slate-700 mr-3" />
                    <h2 className="text-xl font-bold text-slate-900">{policy.title}</h2>
                  </div>

                  <div className="mb-6">
                    {policy.content}
                  </div>

                  <Link
                    href="#"
                    className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-[#dca12f] transition-colors"
                  >
                    {policy.linkText}
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              );
            })}

            {/* Help CTA Box */}
            <div className="bg-[#dca12f] rounded-lg p-8 relative overflow-hidden mt-8 shadow-md">
              {/* Decorative background icon */}
              <PolicyShieldIcon className="absolute right-2 top-2 w-40 h-40 text-black/10 pointer-events-none transform " />

              <div className="relative z-10 flex flex-col items-center text-center gap-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Need help understanding a policy?
                  </h3>
                  <p className="text-slate-900/90 text-sm max-w-xl mx-auto">
                    Our support team is available 24/7 to help you navigate our terms and ensure your business is successful on WULFARA.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mt-2">
                  <Link
                    href="/help-center"
                    className="px-6 py-3 bg-black text-white text-sm font-bold rounded hover:bg-slate-800 transition-colors whitespace-nowrap"
                  >
                    Contact Help Center
                  </Link>
                  <Link
                    href="/rfq"
                    className="px-6 py-3 bg-transparent border-2 border-black text-black text-sm font-bold rounded hover:bg-black/5 transition-colors whitespace-nowrap"
                  >
                    Go to RFQ
                  </Link>
                  <Link
                    href="/supplier/register"
                    className="px-6 py-3 bg-[#eff6ff] text-slate-900 text-sm font-bold rounded hover:bg-[#e0e7ff] transition-colors whitespace-nowrap uppercase tracking-wide"
                  >
                    LIST YOUR COMPANY
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
