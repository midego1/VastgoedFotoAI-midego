"use client";

import { useTranslations } from "next-intl";
import { Link as LocalizedLink } from "@/i18n/routing";

export function LandingFooter() {
  const t = useTranslations("landing.newFooter");
  const currentYear = new Date().getFullYear();

  return (
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
          {t("title")}
        </h2>

        <p className="mx-auto mb-12 max-w-lg text-white/60">
          {t("description")}
        </p>

        <div className="mb-8 grid grid-cols-2 place-items-center gap-4 font-medium text-sm text-white/60 md:flex md:flex-wrap md:justify-center md:gap-6">
          <LocalizedLink
            className="transition-colors hover:text-white"
            href="/#pricing"
          >
            {t("pricing")}
          </LocalizedLink>
          <LocalizedLink
            className="transition-colors hover:text-white"
            href="/#features"
          >
            {t("features")}
          </LocalizedLink>
          <LocalizedLink
            className="transition-colors hover:text-white"
            href="/about"
          >
            {t("aboutUs")}
          </LocalizedLink>
          <LocalizedLink
            className="transition-colors hover:text-white"
            href="/contact"
          >
            {t("contact")}
          </LocalizedLink>
          <LocalizedLink
            className="transition-colors hover:text-white"
            href="/privacy"
          >
            {t("privacy")}
          </LocalizedLink>
          <LocalizedLink
            className="transition-colors hover:text-white"
            href="/terms"
          >
            {t("terms")}
          </LocalizedLink>
        </div>

        <div className="text-white/40 text-xs">
          © {currentYear} VastgoedFotoAI.nl. {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
