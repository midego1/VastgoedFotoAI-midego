"use client";

import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/language-selector";
import { Link as LocalizedLink } from "@/i18n/routing";

export function LandingNav() {
  const t = useTranslations("nav");

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 w-full border-gray-100/50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4 font-medium text-[#221E68] text-sm">
        <LocalizedLink
          className="font-bold text-[#221E68] text-xl transition-opacity hover:opacity-80"
          href="/"
        >
          VastgoedFotoAI.nl
        </LocalizedLink>
        <div className="flex items-center gap-8">
          <div className="mt-[1px]">
            <LanguageSelector />
          </div>
          <LocalizedLink
            className="transition-opacity hover:opacity-70"
            href="/#pricing"
          >
            {t("pricing")}
          </LocalizedLink>
          <LocalizedLink
            className="transition-opacity hover:opacity-70"
            href="/#features"
          >
            {t("features")}
          </LocalizedLink>
          <LocalizedLink
            className="transition-opacity hover:opacity-70"
            href="/sign-in"
          >
            {t("signIn")}
          </LocalizedLink>
        </div>
      </div>
    </nav>
  );
}
