import {
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  Minus,
  Plus,
  ShieldCheck,
  Sofa,
  Sparkles,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import BlueBlob from "@/components/landing/blobs/blue-blob";
import OrangeBlob from "@/components/landing/blobs/orange-blob";
import RedBlob from "@/components/landing/blobs/red-blob";
import { LanguageSelector } from "@/components/language-selector";
import { Link as LocalizedLink } from "@/i18n/routing";
import { VirtualStagingPreview } from "@/components/landing/virtual-staging-preview";

import { FaqItem } from "@/components/landing/faq-item";

export default function Page() {
  const t = useTranslations("landing");
  const tNav = useTranslations("nav");

  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden bg-white pt-[88px]">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 left-0 z-50 w-full border-gray-100/50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4 font-medium text-[#221E68] text-sm">
          <LocalizedLink
            className="font-bold text-[#221E68] text-xl transition-opacity hover:opacity-80 active:opacity-60"
            href="/"
          >
            VastgoedFotoAI.nl
          </LocalizedLink>
          <div className="flex items-center gap-8">
            <div className="mt-[1px]">
              <LanguageSelector />
            </div>
            <LocalizedLink
              className="transition-opacity hover:opacity-70 active:scale-95"
              href="#pricing"
            >
              {tNav("pricing")}
            </LocalizedLink>
            <LocalizedLink
              className="transition-opacity hover:opacity-70 active:scale-95"
              href="#features"
            >
              {tNav("features")}
            </LocalizedLink>
            <LocalizedLink
              className="transition-opacity hover:opacity-70 active:scale-95"
              href="/sign-in"
            >
              {tNav("signIn")}
            </LocalizedLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex w-full max-w-[1400px] flex-col items-center gap-10 px-6 pt-6 pb-24 text-center lg:flex-row-reverse lg:items-center lg:justify-between lg:text-left xl:gap-20">
        <div className="flex-1">
          {/* Logo/Title */}
            <h1 className="relative z-10 mb-6 max-w-4xl bg-gradient-to-r from-[#F16529] via-[#E7385E] to-[#221E68] bg-clip-text font-bold text-[50px] text-transparent leading-none tracking-tighter md:text-[80px]">
              {t("newHero.title")}
            </h1>

            <h2 className="relative z-10 mb-6 max-w-2xl font-bold text-[#221E68] text-[24px] leading-tight md:text-[32px]">
              {t("newHero.subtitle")}
            </h2>

            <p className="relative z-10 mb-8 font-bold text-[#221E68] text-[16px] opacity-80 md:text-[18px]">
              {t("newHero.socialProof")}
            </p>

          {/* Primary Buttons */}
            <div className="relative z-10 mb-16 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <LocalizedLink
                className="flex min-w-[200px] items-center justify-center gap-3 rounded-full bg-[#221E68] px-8 py-4 font-bold text-lg text-white shadow-lg transition-all hover:bg-[#221E68]/90 active:scale-95 touch-manipulation"
                href="/dashboard"
              >
                <Sparkles size={20} />
                {t("newHero.ctaPrimary")}
              </LocalizedLink>
              <LocalizedLink
                className="flex min-w-[200px] items-center justify-center gap-3 rounded-full border-2 border-[#221E68]/10 bg-white px-8 py-4 font-bold text-[#221E68] text-lg shadow-lg transition-all hover:bg-gray-50 active:scale-95 touch-manipulation"
                href="#pricing"
              >
                {t("newHero.ctaSecondary")}
              </LocalizedLink>
            </div>

            <p className="relative z-10 mb-8 font-bold text-[#E7385E] text-sm">
              {t("newHero.launchOffer")}
            </p>

          <div className="mt-8 flex justify-center animate-bounce text-[#E7385E] lg:justify-start lg:pl-10">
            <svg
              fill="none"
              height="40"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="40"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Virtual Staging Preview (Hero) */}
        <div className="relative z-10 flex-1 w-full max-w-xl">
             <VirtualStagingPreview />
        </div>
      </section>

      {/* Section 1: AI Enhancement (Orange Blob) */}
      <section
        className="relative isolate flex w-full max-w-[1240px] flex-col items-center gap-12 overflow-hidden px-6 py-24 md:overflow-visible"
        id="features"
      >
        {/* Orange Rings Background - Now visible on mobile but smaller/simpler */}
        <div className="pointer-events-none absolute top-1/2 right-[-45%] -z-10 h-[1000px] w-[1000px] translate-y-[-50%] animate-spin-slower scale-50 opacity-40 md:scale-100 md:opacity-100">
          <OrangeBlob className="h-full w-full" />
        </div>
        
        <div className="w-full max-w-[800px] text-center">
            <h3 className="mb-6 font-bold text-[#221E68] text-[32px] leading-tight md:text-[50px]">
              {t("section1.title")}
              <br />
              {t("section1.titleAccent")}
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-[#221E68]/80 text-[18px] leading-relaxed md:text-[21px]">
              {t("section1.description")}
            </p>
            <div className="mb-8 flex flex-col items-center space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F16529]/10 text-[#F16529]">
                  <Check size={18} strokeWidth={3} />
                </div>
                <span className="font-medium text-[#221E68] text-lg">
                  {t("section1.feature1")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F16529]/10 text-[#F16529]">
                  <Check size={18} strokeWidth={3} />
                </div>
                <span className="font-medium text-[#221E68] text-lg">
                  {t("section1.feature2")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F16529]/10 text-[#F16529]">
                  <Check size={18} strokeWidth={3} />
                </div>
                <span className="font-medium text-[#221E68] text-lg">
                  {t("section1.feature3")}
                </span>
              </div>
            </div>
            <LocalizedLink
              className="mx-auto flex w-fit items-center gap-2 font-bold text-[#F16529] hover:underline active:opacity-70"
              href="#features"
            >
              {t("section1.cta")} <ArrowRight size={18} />
            </LocalizedLink>
        </div>
      </section>

      {/* Section 2: Speed (Blue Blob) */}
      <section className="relative isolate flex w-full max-w-[1240px] flex-col items-center gap-12 overflow-hidden px-6 py-24 md:flex-row md:gap-32 md:overflow-visible">
        {/* Blue/Green Curves Background - Now visible on mobile */}
        <div className="pointer-events-none absolute top-1/2 left-[-45%] -z-10 h-[1000px] w-[1000px] translate-y-[-50%] animate-float-slow scale-50 opacity-30 md:scale-100">
          <BlueBlob className="h-full w-full" />
        </div>

        <div className="flex-1">
            <h3 className="mb-6 font-bold text-[#221E68] text-[32px] leading-tight md:text-[50px]">
              {t("section2.title")}
              <br />
              {t("section2.titleAccent")}
            </h3>
            <p className="mb-6 text-[#221E68]/80 text-[18px] leading-relaxed md:text-[21px]">
              {t("section2.description")}
            </p>
            <p className="mb-6 text-[#221E68]/80 text-[18px] leading-relaxed md:text-[21px]">
              <strong>{t("section2.batchDescription")}</strong>{" "}
              {t("section2.batchDescriptionSuffix")}
            </p>
            <LocalizedLink
              className="flex items-center gap-2 font-bold text-[#221E68] hover:underline active:opacity-70"
              href="#pricing"
            >
              {t("section2.cta")} <ArrowRight size={18} />
            </LocalizedLink>
        </div>
        <div className="relative flex-1">
            <div className="relative mx-auto w-full max-w-md">
              {/* Visual: Speedometer/Processing */}
              <div className="flex flex-col items-center rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-2xl">
                <div className="mb-8 flex items-center gap-2 font-medium text-gray-400">
                  <Zap className="text-[#F16529]" fill="currentColor" size={20} />
                  <span>{t("section2.processingSpeed")}</span>
                </div>

                <div className="relative mb-8 h-64 w-64">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-[#F16529] border-[24px]" />

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-bold text-6xl text-[#221E68]">
                      60<span className="text-2xl text-[#ccc]">s</span>
                    </span>
                    <span className="mt-2 font-bold text-gray-400 text-sm">
                      {t("section2.perImage")}
                    </span>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center rounded-xl bg-green-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="font-bold text-green-700">
                      {t("section2.photoLimit")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Section 3: Virtual Staging (Red Blob) */}
      <section className="relative isolate flex w-full max-w-[1240px] flex-col items-center gap-12 overflow-hidden px-6 py-24 md:flex-row md:gap-32 md:overflow-visible">
        {/* Red/Orange Blob - Now visible on mobile */}
        <div className="pointer-events-none absolute top-1/2 right-[-45%] -z-10 h-[1000px] w-[1000px] translate-y-[-50%] animate-spin-slower scale-50 opacity-30 md:scale-100 md:opacity-40">
          <RedBlob className="h-full w-full" />
        </div>

        <div className="relative order-2 flex-1 md:order-1">
            {/* Visual: Virtual Staging Mockup */}
            <div className="mx-auto max-w-md rounded-[2rem] border border-gray-100 bg-white p-8 shadow-xl">
              <div className="mb-6 flex items-center gap-4 border-gray-100 border-b pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7385E]/10 text-[#E7385E]">
                  <Sofa size={24} />
                </div>
                <div>
                  <div className="font-bold text-[#221E68] text-lg">
                    {t("section3.virtualStaging")}
                  </div>
                  <div className="font-bold text-green-500 text-xs uppercase tracking-wider">
                    {t("section3.availableNow")}
                  </div>
                </div>
              </div>

              <VirtualStagingPreview />
            </div>
        </div>
        <div className="order-1 flex-1 md:order-2">
            <h3 className="mb-6 font-bold text-[#221E68] text-[32px] leading-tight md:text-[50px]">
              {t("section3.title")}
              <br />
              {t("section3.titleAccent")}
            </h3>
            <p className="mb-6 text-[#221E68]/80 text-[18px] leading-relaxed md:text-[21px]">
              {t("section3.description")}
            </p>
            <p className="mb-6 text-[#221E68]/80 text-[18px] leading-relaxed md:text-[21px]">
              <strong>{t("section3.moreStyles")}</strong>{" "}
              {t("section3.moreStylesList")}
            </p>
        </div>
      </section>

      {/* Section 4: Comparison Chart */}
      <section
        className="w-full bg-[#f8f8fa] pt-24 pb-32 text-center"
        id="pricing"
      >
          <h3 className="mb-4 font-bold text-[#221E68] text-[32px] md:text-[50px]">
            {t("comparison.title")}
          </h3>
          <p className="mx-auto mb-16 max-w-3xl px-6 text-[#221E68]/80 text-[18px] leading-relaxed md:text-[21px]">
            {t("comparison.subtitle")}
          </p>

        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-8 px-6 md:grid-cols-3">
          {/* Card 1: Time */}
            <div className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Clock size={32} />
              </div>
              <h4 className="mb-2 font-bold text-[#221E68] text-xl">
                {t("comparison.card1Title")}
              </h4>
              <p className="mb-2 font-bold text-3xl text-[#221E68]">
                {t("comparison.card1Value")}{" "}
                <span className="font-normal text-gray-400 text-lg">
                  {t("comparison.card1Comparison")}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                {t("comparison.card1Description")}
              </p>
            </div>

          {/* Card 2: Cost */}
            <div className="relative flex transform flex-col items-center rounded-3xl border border-[#F16529]/20 bg-white p-8 shadow-lg md:-translate-y-4">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F16529] px-4 py-1 font-bold text-white text-xs uppercase tracking-wider">
                {t("comparison.card2Badge")}
              </div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F16529]/10 text-[#F16529]">
                <DollarSign size={32} />
              </div>
              <h4 className="mb-2 font-bold text-[#221E68] text-xl">
                {t("comparison.card2Title")}
              </h4>
              <p className="mb-2 font-bold text-3xl text-[#221E68]">
                {t("comparison.card2Value")}{" "}
                <span className="font-normal text-gray-400 text-lg">
                  {t("comparison.card2Comparison")}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                {t("comparison.card2Description")}
              </p>
            </div>

          {/* Card 3: Quality */}
            <div className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <ShieldCheck size={32} />
              </div>
              <h4 className="mb-2 font-bold text-[#221E68] text-xl">
                {t("comparison.card3Title")}
              </h4>
              <p className="mb-2 font-bold text-3xl text-[#221E68]">
                {t("comparison.card3Value")}{" "}
                <span className="font-normal text-gray-400 text-lg">
                  {t("comparison.card3Comparison")}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                {t("comparison.card3Description")}
              </p>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12 w-full max-w-[1240px] px-6 py-24" id="faq">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-[#221E68] text-[32px] md:text-[50px]">
              {t("faq.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-[#221E68]/80 text-[18px] md:text-[21px]">
              {t("faq.subtitle")}
            </p>
          </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {["q1", "q2", "q3", "q4", "q5", "q6"].map((faqKey) => (
              <FaqItem key={faqKey} questionKey={faqKey} />
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative mt-12 w-full overflow-hidden bg-[#221E68] pt-32 pb-16 text-white">
        {/* Wave Decoration - SVG approximation */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block h-[100px] w-full fill-white"
            data-name="Layer 1"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 text-center">
            <h2 className="mb-8 font-bold text-[24px] text-white md:text-[32px]">
              {t("newFooter.title")}
            </h2>

            <p className="mx-auto mb-12 max-w-lg text-white/60">
              {t("newFooter.description")}
            </p>

          <div className="mb-8 flex flex-wrap justify-center gap-6 font-medium text-sm text-white/60">
            <LocalizedLink
              className="transition-colors hover:text-white"
              href="#pricing"
            >
              {t("newFooter.pricing")}
            </LocalizedLink>
            <LocalizedLink
              className="transition-colors hover:text-white"
              href="#features"
            >
              {t("newFooter.features")}
            </LocalizedLink>
            <LocalizedLink
              className="transition-colors hover:text-white"
              href="/about"
            >
              {t("newFooter.aboutUs")}
            </LocalizedLink>
            <LocalizedLink
              className="transition-colors hover:text-white"
              href="/contact"
            >
              {t("newFooter.contact")}
            </LocalizedLink>
            <LocalizedLink
              className="transition-colors hover:text-white"
              href="/privacy"
            >
              {t("newFooter.privacy")}
            </LocalizedLink>
            <LocalizedLink
              className="transition-colors hover:text-white"
              href="/terms"
            >
              {t("newFooter.terms")}
            </LocalizedLink>
          </div>

          <div className="text-white/40 text-xs">
            © {new Date().getFullYear()} VastgoedFotoAI.nl.{" "}
            {t("newFooter.copyright")}
          </div>
        </div>
      </footer>
    </div>
  );
}
