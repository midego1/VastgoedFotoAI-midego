"use client";

import {
  IconArrowRight,
  IconCheck,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LandingFooter } from "./landing-footer";
import { LandingNav } from "./landing-nav";


function PricingCard({
  titleKey,
  priceKey,
  originalPriceKey,
  launchDiscountKey,
  perKey,
  featuresKeys,
  popular,
  comingSoon,
}: {
  titleKey: string;
  priceKey: string;
  originalPriceKey?: string;
  launchDiscountKey?: string;
  perKey: string;
  featuresKeys: string[];
  popular?: boolean;
  comingSoon?: boolean;
}) {
  const t = useTranslations("pricing");

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
        comingSoon ? "opacity-75" : "hover:-translate-y-1"
      }`}
      style={{
        backgroundColor: popular ? "var(--landing-card)" : "var(--landing-bg)",
        boxShadow: popular
          ? "0 20px 40px -12px var(--landing-shadow)"
          : "0 4px 24px -4px var(--landing-shadow)",
        border: popular
          ? "2px solid var(--landing-accent)"
          : "1px solid var(--landing-border)",
      }}
    >
      {popular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 font-semibold text-xs"
          style={{
            backgroundColor: "var(--landing-accent)",
            color: "var(--landing-accent-foreground)",
          }}
        >
          {t("popular")}
        </div>
      )}

      {/* Launch Discount Banner */}
      {launchDiscountKey && (
        <div
          className="mb-4 rounded-lg px-3 py-2 text-center text-sm font-semibold"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            color: "white",
          }}
        >
          🎉 {t(launchDiscountKey)}
        </div>
      )}

      {/* Title */}
      <h3
        className="font-semibold text-xl"
        style={{ color: "var(--landing-text)" }}
      >
        {t(titleKey)}
      </h3>

      {/* Price */}
      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          {originalPriceKey && (
            <span
              className="text-xl line-through"
              style={{ color: "var(--landing-text-muted)" }}
            >
              {t(originalPriceKey)}
            </span>
          )}
          <span
            className="font-bold text-4xl tabular-nums"
            style={{ color: popular ? "var(--landing-accent)" : "var(--landing-text)" }}
          >
            {t(priceKey)}
          </span>
        </div>
        <span
          className="text-sm"
          style={{ color: "var(--landing-text-muted)" }}
        >
          {t(perKey)}
        </span>
      </div>

      {/* Features */}
      <ul className="mt-8 flex-1 space-y-4">
        {featuresKeys.map((featureKey) => (
          <li className="flex items-start gap-3" key={featureKey}>
            <IconCheck
              className="mt-0.5 size-5 shrink-0"
              style={{ color: "var(--landing-accent)" }}
            />
            <span
              className="text-sm"
              style={{ color: "var(--landing-text-muted)" }}
            >
              {t(featureKey)}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        aria-disabled={comingSoon}
        className={`mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full font-medium text-base transition-all duration-200 ${
          comingSoon
            ? "cursor-not-allowed opacity-50"
            : "hover:scale-[1.02]"
        }`}
        href={comingSoon ? "#" : "/sign-in"}
        style={{
          backgroundColor: popular
            ? "var(--landing-accent)"
            : "var(--landing-bg-alt)",
          color: popular
            ? "var(--landing-accent-foreground)"
            : "var(--landing-text)",
          border: popular ? "none" : "1px solid var(--landing-border-strong)",
        }}
      >
        {comingSoon ? t("comingSoon") : t("getStarted")}
        {!comingSoon && <IconArrowRight className="size-5" />}
      </Link>
    </div>
  );
}

function FaqItem({ questionKey }: { questionKey: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("pricing.faq");

  return (
    <div
      className="rounded-xl transition-colors"
      style={{
        backgroundColor: isOpen ? "var(--landing-card)" : "transparent",
        border: "1px solid var(--landing-border)",
      }}
    >
      <button
        className="flex w-full items-center justify-between p-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span
          className="pr-8 font-medium text-base"
          style={{ color: "var(--landing-text)" }}
        >
          {t(`${questionKey}.question`)}
        </span>
        <div
          className="flex size-6 shrink-0 items-center justify-center rounded-full transition-colors"
          style={{
            backgroundColor: isOpen
              ? "var(--landing-accent)"
              : "var(--landing-border)",
          }}
        >
          {isOpen ? (
            <IconMinus
              className="size-4"
              style={{
                color: isOpen
                  ? "var(--landing-accent-foreground)"
                  : "var(--landing-text)",
              }}
            />
          ) : (
            <IconPlus
              className="size-4"
              style={{ color: "var(--landing-text)" }}
            />
          )}
        </div>
      </button>
      {isOpen && (
        <div
          className="px-5 pb-5 text-sm leading-relaxed"
          style={{ color: "var(--landing-text-muted)" }}
        >
          {t(`${questionKey}.answer`)}
        </div>
      )}
    </div>
  );
}

export function PricingPage() {
  const t = useTranslations("pricing");
  const tNav = useTranslations("nav");
  const tCta = useTranslations("landing.cta");

  const photoFeatures = [
    "photo.features.images",
    "photo.features.ai",
    "photo.features.templates",
    "photo.features.downloads",
    "photo.features.fast",
  ];

  const videoFeatures = [
    "video.features.professional",
    "video.features.ai",
    "video.features.music",
    "video.features.format",
    "video.features.fast",
  ];

  const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--landing-bg)" }}
    >
      <LandingNav />

      <main>
        {/* Hero Section */}
        <section className="px-6 pt-24 pb-16 text-center">
          <div className="mx-auto max-w-3xl">
            <p
              className="font-semibold text-sm uppercase tracking-wider"
              style={{ color: "var(--landing-accent)" }}
            >
              {tNav("pricing")}
            </p>
            <h1
              className="mt-3 font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl"
              style={{ color: "var(--landing-text)" }}
            >
              {t("title")}
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: "var(--landing-text-muted)" }}
            >
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <PricingCard
              featuresKeys={photoFeatures}
              perKey="photo.per"
              popular
              priceKey="photo.price"
              originalPriceKey="photo.originalPrice"
              launchDiscountKey="photo.launchDiscount"
              titleKey="photo.title"
            />
            <PricingCard
              comingSoon
              featuresKeys={videoFeatures}
              perKey="video.per"
              priceKey="video.price"
              titleKey="video.title"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className="px-6 py-24"
          style={{ backgroundColor: "var(--landing-bg-alt)" }}
        >
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p
                className="font-semibold text-sm uppercase tracking-wider"
                style={{ color: "var(--landing-accent)" }}
              >
                FAQ
              </p>
              <h2
                className="mt-3 font-bold text-3xl tracking-tight sm:text-4xl"
                style={{ color: "var(--landing-text)" }}
              >
                {t("faq.title")}
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {faqKeys.map((faqKey) => (
                <FaqItem
                  key={faqKey}
                  questionKey={faqKey}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24">
          <div
            className="mx-auto max-w-4xl rounded-3xl px-8 py-16 text-center md:px-16"
            style={{
              backgroundColor: "var(--landing-card)",
              boxShadow: "0 25px 50px -12px var(--landing-shadow)",
              border: "1px solid var(--landing-border)",
            }}
          >
            <h2
              className="font-bold text-3xl tracking-tight sm:text-4xl"
              style={{ color: "var(--landing-text)" }}
            >
              {tCta("title")}
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-lg leading-relaxed"
              style={{ color: "var(--landing-text-muted)" }}
            >
              {tCta("subtitle")}
            </p>
            <div className="mt-8">
              <Link
                className="inline-flex h-12 items-center gap-2 rounded-full px-8 font-medium text-base transition-all duration-200 hover:scale-[1.03]"
                href="/sign-in"
                style={{
                  backgroundColor: "var(--landing-accent)",
                  color: "var(--landing-accent-foreground)",
                }}
              >
                {tCta("button")}
                <IconArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
