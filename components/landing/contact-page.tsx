"use client";

import { IconClock, IconMail, IconSend } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LandingFooter } from "./landing-footer";
import { LandingNav } from "./landing-nav";

export function ContactPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--landing-bg)" }}
    >
      <LandingNav />

      <main>
        {/* Hero Section */}
        <section className="px-6 pt-20 pb-12 text-center md:pt-28 md:pb-16">
          <div className="mx-auto max-w-3xl">
            <p
              className="font-semibold text-sm uppercase tracking-wider"
              style={{ color: "var(--landing-accent)" }}
            >
              {t("badge")}
            </p>
            <h1
              className="mt-3 font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl"
              style={{ color: "var(--landing-text)" }}
            >
              {t("title")}
            </h1>
            <p
              className="mt-6 text-lg leading-relaxed md:text-xl"
              style={{ color: "var(--landing-text-muted)" }}
            >
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                className="rounded-2xl p-8"
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: "var(--landing-card)",
                  boxShadow: "0 20px 40px -12px var(--landing-shadow)",
                  border: "1px solid var(--landing-border)",
                }}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      className="mb-2 block font-medium text-sm"
                      htmlFor="name"
                      style={{ color: "var(--landing-text)" }}
                    >
                      {t("form.name")}
                    </label>
                    <input
                      className="h-12 w-full rounded-xl px-4 text-sm outline-none transition-all focus:ring-2"
                      id="name"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={t("form.namePlaceholder")}
                      required
                      style={{
                        backgroundColor: "var(--landing-bg)",
                        color: "var(--landing-text)",
                        border: "1px solid var(--landing-border)",
                      }}
                      type="text"
                      value={formData.name}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="mb-2 block font-medium text-sm"
                      htmlFor="email"
                      style={{ color: "var(--landing-text)" }}
                    >
                      {t("form.email")}
                    </label>
                    <input
                      className="h-12 w-full rounded-xl px-4 text-sm outline-none transition-all focus:ring-2"
                      id="email"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={t("form.emailPlaceholder")}
                      required
                      style={{
                        backgroundColor: "var(--landing-bg)",
                        color: "var(--landing-text)",
                        border: "1px solid var(--landing-border)",
                      }}
                      type="email"
                      value={formData.email}
                    />
                  </div>
                </div>

                {/* Topic */}
                <div className="mt-6">
                  <label
                    className="mb-2 block font-medium text-sm"
                    htmlFor="topic"
                    style={{ color: "var(--landing-text)" }}
                  >
                    {t("form.topic")}
                  </label>
                  <select
                    className="h-12 w-full rounded-xl px-4 text-sm outline-none transition-all focus:ring-2"
                    id="topic"
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    required
                    style={{
                      backgroundColor: "var(--landing-bg)",
                      color: formData.topic
                        ? "var(--landing-text)"
                        : "var(--landing-text-muted)",
                      border: "1px solid var(--landing-border)",
                    }}
                    value={formData.topic}
                  >
                    <option disabled value="">
                      {t("form.topicPlaceholder")}
                    </option>
                    <option value="general">{t("topics.general")}</option>
                    <option value="support">{t("topics.support")}</option>
                    <option value="sales">{t("topics.sales")}</option>
                    <option value="partnership">{t("topics.partnership")}</option>
                  </select>
                </div>

                {/* Message */}
                <div className="mt-6">
                  <label
                    className="mb-2 block font-medium text-sm"
                    htmlFor="message"
                    style={{ color: "var(--landing-text)" }}
                  >
                    {t("form.message")}
                  </label>
                  <textarea
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2"
                    id="message"
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t("form.messagePlaceholder")}
                    required
                    rows={5}
                    style={{
                      backgroundColor: "var(--landing-bg)",
                      color: "var(--landing-text)",
                      border: "1px solid var(--landing-border)",
                      resize: "none",
                    }}
                    value={formData.message}
                  />
                </div>

                {/* Submit */}
                <button
                  className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full font-medium text-base transition-all duration-200 hover:scale-[1.02] sm:w-auto sm:px-8"
                  style={{
                    backgroundColor: "var(--landing-accent)",
                    color: "var(--landing-accent-foreground)",
                  }}
                  type="submit"
                >
                  {t("form.submit")}
                  <IconSend className="size-5" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "var(--landing-card)",
                  border: "1px solid var(--landing-border)",
                }}
              >
                <div
                  className="mb-4 inline-flex size-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "var(--landing-bg-alt)",
                    border: "1px solid var(--landing-border)",
                  }}
                >
                  <IconMail
                    className="size-6"
                    style={{ color: "var(--landing-accent)" }}
                  />
                </div>
                <h3
                  className="font-semibold"
                  style={{ color: "var(--landing-text)" }}
                >
                  {t("info.emailUs")}
                </h3>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--landing-text-muted)" }}
                >
                  hello@vastgoedfotoai.nl
                </p>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "var(--landing-card)",
                  border: "1px solid var(--landing-border)",
                }}
              >
                <div
                  className="mb-4 inline-flex size-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "var(--landing-bg-alt)",
                    border: "1px solid var(--landing-border)",
                  }}
                >
                  <IconClock
                    className="size-6"
                    style={{ color: "var(--landing-accent)" }}
                  />
                </div>
                <h3
                  className="font-semibold"
                  style={{ color: "var(--landing-text)" }}
                >
                  {t("info.responseTime")}
                </h3>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--landing-text-muted)" }}
                >
                  {t("info.responseDescription")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
