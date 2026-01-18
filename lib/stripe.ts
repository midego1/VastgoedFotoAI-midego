import Stripe from "stripe";
import type { PricingTier } from "./db/schema";

// Stripe client singleton
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// Stripe configuration constants
export const STRIPE_CONFIG = {
  // Product and Price IDs (created via Stripe MCP)
  // Standard tier (2K resolution)
  PRICE_PROJECT_STANDARD_EUR:
    process.env.STRIPE_PRICE_PROJECT_EUR ||
    process.env.STRIPE_PRICE_PROJECT_USD ||
    process.env.STRIPE_PRICE_PROJECT_EUR!,
  // Premium tier (4K resolution) - needs to be created in Stripe
  PRICE_PROJECT_PREMIUM_EUR:
    process.env.STRIPE_PRICE_PROJECT_PREMIUM_EUR ||
    process.env.STRIPE_PRICE_PROJECT_EUR!, // fallback for now

  // Pricing (in cents)
  // Standard tier (2K resolution)
  // Launch price 2026: €24.50 (50% off €49 regular price)
  // Regular price starting 2027: €49
  STANDARD_PRICE_EUR_CENTS: 2450, // €24.50 launch price (50% off €49)
  STANDARD_REGULAR_PRICE_EUR_CENTS: 4900, // €49 regular price

  // Premium tier (4K resolution)
  // Launch price 2026: €39.50 (50% off €79 regular price)
  // Regular price starting 2027: €79
  PREMIUM_PRICE_EUR_CENTS: 3950, // €39.50 launch price (50% off €79)
  PREMIUM_REGULAR_PRICE_EUR_CENTS: 7900, // €79 regular price

  // Legacy alias for backwards compatibility
  PROJECT_PRICE_EUR_CENTS: 2450, // Standard tier launch price

  // URLs
  SUCCESS_URL: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
} as const;

// Helper to get price for a tier
export function getTierPrice(tier: PricingTier): number {
  return tier === "premium"
    ? STRIPE_CONFIG.PREMIUM_PRICE_EUR_CENTS
    : STRIPE_CONFIG.STANDARD_PRICE_EUR_CENTS;
}

// Helper to get regular (non-launch) price for a tier
export function getTierRegularPrice(tier: PricingTier): number {
  return tier === "premium"
    ? STRIPE_CONFIG.PREMIUM_REGULAR_PRICE_EUR_CENTS
    : STRIPE_CONFIG.STANDARD_REGULAR_PRICE_EUR_CENTS;
}

// Helper to get Stripe Price ID for a tier
export function getTierPriceId(tier: PricingTier): string {
  return tier === "premium"
    ? STRIPE_CONFIG.PRICE_PROJECT_PREMIUM_EUR
    : STRIPE_CONFIG.PRICE_PROJECT_STANDARD_EUR;
}

// Helper to get the base URL for redirects
export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

