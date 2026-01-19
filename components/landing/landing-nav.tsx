"use client";

import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/language-selector";
import { Link as LocalizedLink } from "@/i18n/routing";
import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";

export function LandingNav() {
  const t = useTranslations("nav");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 w-full bg-[#221E68] pt-4 pb-8">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 font-medium text-white text-sm">
        <LocalizedLink
          className="font-bold text-white text-xl transition-opacity hover:opacity-80"
          href="/"
        >
          VastgoedFotoAI.nl
        </LocalizedLink>
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="mt-[1px]">
            <LanguageSelector color="white" />
          </div>
          <LocalizedLink
            className="transition-colors hover:text-white/80"
            href="/#pricing"
          >
            {t("pricing")}
          </LocalizedLink>
          <LocalizedLink
            className="transition-colors hover:text-white/80"
            href="/#features"
          >
            {t("features")}
          </LocalizedLink>
          <LocalizedLink
            className="transition-colors hover:text-white/80"
            href="/sign-in"
          >
            {t("signIn")}
          </LocalizedLink>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
           <div className="mt-[1px]">
            <LanguageSelector color="white" />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
            aria-label="Toggle menu"
          >
           {isMobileMenuOpen ? <IconX /> : <IconMenu2 />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#221E68] border-t border-white/10 p-6 shadow-xl md:hidden">
            <div className="flex flex-col gap-6 text-center text-lg">
              <LocalizedLink
                className="transition-colors hover:text-white/80"
                href="/#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("pricing")}
              </LocalizedLink>
              <LocalizedLink
                className="transition-colors hover:text-white/80"
                href="/#features"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("features")}
              </LocalizedLink>
              <LocalizedLink
                className="transition-colors hover:text-white/80"
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("signIn")}
              </LocalizedLink>
            </div>
          </div>
        )}
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block h-[24px] w-full fill-white"
          data-name="Layer 1"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </nav>
  );
}
