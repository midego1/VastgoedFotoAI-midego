"use client";

import { useParams } from "next/navigation";
import { routing, usePathname, useRouter } from "@/i18n/routing";

export function LanguageSelector({ color = "default" }: { color?: "default" | "white" }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as string) || routing.defaultLocale;

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  const activeColor = color === "white" ? "text-white" : "text-[var(--landing-text)]";
  const inactiveColor = color === "white" ? "text-white/60 hover:text-white" : "text-[var(--landing-text-muted)] hover:text-[var(--landing-text)]";

  return (
    <div className="flex items-center gap-1 font-medium text-sm">
      <button
        className={`rounded px-2 py-0.5 transition-colors ${
          currentLocale === "nl"
            ? `font-semibold ${activeColor}`
            : `${inactiveColor}`
        }`}
        onClick={() => handleLocaleChange("nl")}
        type="button"
      >
        NL
      </button>
      <span className={color === "white" ? "text-white/60" : "text-[var(--landing-text-muted)]"}>/</span>
      <button
        className={`rounded px-2 py-0.5 transition-colors ${
          currentLocale === "en"
            ? `font-semibold ${activeColor}`
            : `${inactiveColor}`
        }`}
        onClick={() => handleLocaleChange("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}
