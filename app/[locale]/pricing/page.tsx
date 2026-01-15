import { PricingPage } from "@/components/landing/pricing-page";
import { constructMetadata } from "@/lib/constructMetadata";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.pricing" });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
    canonical: "/pricing",
  });
}

export default function Page() {
  return <PricingPage />;
}
