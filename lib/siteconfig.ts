export const siteConfig = {
  name: "VastgoedFotoAI.nl",
  title: "VastgoedFotoAI.nl - AI-Powered Real Estate Photo Editor",
  description:
    "Transform your real estate photos with AI. Professional virtual staging, sky replacement, and photo enhancement for property listings.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://www.vastgoedfotoai.nl",

  // SEO
  ogImage: "/og-image.png",
  locale: "nl",
  keywords: [
    "real estate",
    "AI photo editor",
    "property photos",
    "virtual staging",
    "real estate photography",
    "property listing photos",
    "AI image enhancement",
    "vastgoed",
    "vastgoed foto",
  ],
  authors: [
    { name: "VastgoedFotoAI.nl", url: "https://www.vastgoedfotoai.nl" },
  ],
  creator: "VastgoedFotoAI.nl",
  twitterHandle: "@vastgoedfotoai",

  // Email settings
  email: {
    from: "noreply@vastgoedfotoai.nl",
    replyTo: "info@vastgoedfotoai.nl",
  },

  // Links
  links: {
    dashboard: "/dashboard",
    settings: "/dashboard/settings",
    help: "/help",
  },
} as const;

export type SiteConfig = typeof siteConfig;
