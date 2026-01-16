"use client";

import BlueBlob from "@/components/landing/blobs/blue-blob";
import OrangeBlob from "@/components/landing/blobs/orange-blob";
import { LandingFooter } from "./landing-footer";
import { LandingNav } from "./landing-nav";

interface LegalPageProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPage({
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white pt-[88px]">
      <LandingNav />

      <main className="relative isolate flex-1">
        {/* Background Blobs */}
        <div className="pointer-events-none absolute top-0 left-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-10">
          <BlueBlob className="h-full w-full animate-float-slow" />
        </div>
        <div className="pointer-events-none absolute top-[20%] right-[-10%] -z-10 h-[600px] w-[600px] opacity-10">
          <OrangeBlob className="h-full w-full animate-pulse-subtle" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 px-6 pt-12 pb-12 text-center md:pt-20">
          <div className="mx-auto max-w-3xl animate-fade-in-up">
            <h1 className="mb-4 font-bold text-[#221E68] text-[40px] leading-none tracking-tighter md:text-[60px]">
              {title}
            </h1>
            <p className="mx-auto max-w-2xl text-[#221E68]/70 text-lg">
              {subtitle}
            </p>
            <p className="mt-4 font-medium text-[#221E68]/50 text-sm uppercase tracking-widest">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="relative z-10 px-6 pb-24">
          <div className="mx-auto max-w-3xl animate-fade-in-up rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-xl md:p-12 md:delay-100">
            <div
              className="prose prose-lg max-w-none"
              style={
                {
                  "--tw-prose-body": "#221E68cc", // 80% opacity
                  "--tw-prose-headings": "#221E68",
                  "--tw-prose-links": "#F16529",
                  "--tw-prose-bold": "#221E68",
                } as React.CSSProperties
              }
            >
              {children}
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 first:mt-0">
      <h2 className="mb-4 font-bold text-2xl text-[#221E68] tracking-tight">
        {title}
      </h2>
      <div className="space-y-4 text-[#221E68]/80 text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}
