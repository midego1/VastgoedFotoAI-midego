import { AboutPage } from "@/components/landing/about-page";
import { constructMetadata } from "@/lib/constructMetadata";

export const metadata = constructMetadata({
  title: "About - VastgoedFotoAI.nl",
  description:
    "Learn about VastgoedFotoAI.nl, the AI-powered photo enhancement platform for real estate professionals.",
  canonical: "/about",
});

export default function Page() {
  return <AboutPage />;
}
