"use client";

import {
  IconHeart,
  IconRocket,
  IconSparkles,
  IconTarget,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import BlueBlob from "@/components/landing/blobs/blue-blob";
import OrangeBlob from "@/components/landing/blobs/orange-blob";
import RedBlob from "@/components/landing/blobs/red-blob";
import { LandingFooter } from "./landing-footer";
import { LandingNav } from "./landing-nav";
import { Link } from "@/i18n/routing";

export function AboutPage() {
  const t = useTranslations("about");

  const values = [
    {
      icon: IconSparkles,
      titleKey: "qualityFirst",
    },
    {
      icon: IconRocket,
      titleKey: "speedMatters",
    },
    {
      icon: IconHeart,
      titleKey: "builtForYou",
    },
    {
      icon: IconTarget,
      titleKey: "simplePricing",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white pt-[88px]">
      <LandingNav />

      <main className="relative isolate flex-1">
        {/* Background Blobs */}
        <div className="pointer-events-none absolute top-0 right-0 -z-10 h-[800px] w-[800px] translate-x-1/2 -translate-y-1/2 opacity-20">
          <OrangeBlob className="h-full w-full animate-spin-slower" />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/4 opacity-20">
          <BlueBlob className="h-full w-full animate-float-slow" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 px-6 pt-12 pb-16 text-center md:pt-20 md:pb-24">
          <div className="mx-auto max-w-3xl animate-fade-in-up">
            <p className="mb-3 font-bold text-[#E7385E] text-sm uppercase tracking-wider">
              {t("badge")}
            </p>
            <h1 className="mb-6 font-bold text-[#221E68] text-[40px] leading-none tracking-tighter md:text-[60px]">
              {t("title")}
            </h1>
            <p className="text-[#221E68]/80 text-lg leading-relaxed md:text-xl">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="relative z-10 px-6 pb-24">
          <div className="mx-auto max-w-4xl animate-fade-in-up rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-xl md:p-12 md:delay-100">
            <h2 className="mb-6 font-bold text-2xl text-[#221E68] tracking-tight sm:text-3xl">
              {t("story.title")}
            </h2>
            <div className="space-y-4 text-[#221E68]/70 text-base leading-relaxed">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
              <p>{t("story.p4")}</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative bg-[#f8f8fa] px-6 py-24">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-5">
            <RedBlob className="h-full w-full animate-pulse-subtle" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="mb-16 animate-fade-in-up text-center">
              <p className="mb-3 font-bold text-[#F16529] text-sm uppercase tracking-wider">
                {t("values.badge")}
              </p>
              <h2 className="font-bold text-[#221E68] text-[32px] md:text-[48px]">
                {t("values.title")}
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {values.map((value, index) => (
                <div
                  className="animate-fade-in-up rounded-[2rem] border border-gray-100 bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1"
                  key={value.titleKey}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-[#221E68]/5 text-[#221E68]">
                    <value.icon className="size-7" />
                  </div>
                  <h3 className="mb-3 font-bold text-[#221E68] text-xl">
                    {t(`values.${value.titleKey}.title`)}
                  </h3>
                  <p className="text-[#221E68]/70 leading-relaxed">
                    {t(`values.${value.titleKey}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative overflow-hidden px-6 py-24">
          <div className="pointer-events-none absolute top-0 right-[-10%] h-[500px] w-[500px] opacity-10">
            <OrangeBlob className="h-full w-full animate-float-slow" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl animate-fade-in-up text-center">
            <p className="mb-3 font-bold text-[#221E68]/60 text-sm uppercase tracking-wider">
              {t("mission.badge")}
            </p>
            <h2 className="mb-6 font-bold text-[#221E68] text-[32px] md:text-[48px]">
              {t("mission.title")}
            </h2>
            <p className="text-[#221E68]/80 text-lg leading-relaxed">
              {t("mission.description")}
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-6 pb-24">
          <div className="relative mx-auto max-w-4xl animate-scale-in overflow-hidden rounded-[3rem] bg-[#221E68] px-8 py-16 text-center text-white shadow-2xl md:px-16">
            {/* Abstract Shapes/Blobs for CTA background */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-30">
              <BlueBlob className="absolute -top-1/2 -left-1/2 h-full w-full mix-blend-overlay" />
              <RedBlob className="absolute -right-1/2 -bottom-1/2 h-full w-full mix-blend-overlay" />
            </div>

            <div className="relative z-10">
              <h2 className="mb-4 font-bold text-3xl text-white tracking-tight sm:text-4xl">
                {t("cta.title")}
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-lg text-white/80 leading-relaxed">
                {t("cta.subtitle")}
              </p>
              <Link
                className="inline-flex h-14 items-center rounded-full bg-white px-10 font-bold text-[#221E68] text-lg shadow-lg transition-all duration-200 hover:scale-[1.03] hover:bg-gray-50"
                href="/contact"
              >
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
