"use client";

import Link from "next/link";

interface LegalPlaceholderPageProps {
  title: string;
  description: string;
}

export default function LegalPlaceholderPage({
  title,
  description,
}: LegalPlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{title}</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-slate-900">{title}</h1>
          <p className="mb-6 text-sm leading-relaxed text-slate-600">
            {description}
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-amber-900">
              Content Pending
            </h2>
            <p className="text-sm leading-relaxed text-amber-800">
              Final legal text for this page has not been supplied yet. Replace this placeholder with approved legal copy before production launch.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/policies"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-800"
            >
              View Policies Overview
            </Link>
            <Link
              href="/help-center"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
