"use client";

import { useParams } from "next/navigation";
import { routing, usePathname, useRouter } from "@/i18n/routing";

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as string) || routing.defaultLocale;

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <div className="flex items-center gap-1 font-medium text-sm">
      <button
        className={`rounded px-2 py-0.5 transition-colors ${
          currentLocale === "nl"
            ? "font-semibold text-[var(--landing-text)]"
            : "text-[var(--landing-text-muted)] hover:text-[var(--landing-text)]"
        }`}
        onClick={() => handleLocaleChange("nl")}
        type="button"
      >
        NL
      </button>
      <span className="text-[var(--landing-text-muted)]">/</span>
      <button
        className={`rounded px-2 py-0.5 transition-colors ${
          currentLocale === "en"
            ? "font-semibold text-[var(--landing-text)]"
            : "text-[var(--landing-text-muted)] hover:text-[var(--landing-text)]"
        }`}
        onClick={() => handleLocaleChange("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}
