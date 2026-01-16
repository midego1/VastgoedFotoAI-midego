"use client";

import { IconClock, IconMail, IconSend } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BlueBlob from "@/components/landing/blobs/blue-blob";
import OrangeBlob from "@/components/landing/blobs/orange-blob";
import RedBlob from "@/components/landing/blobs/red-blob";
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
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white pt-[88px]">
      <LandingNav />

      <main className="relative isolate flex-1">
        {/* Background Blobs */}
        <div className="pointer-events-none absolute top-0 right-0 -z-10 h-[800px] w-[800px] translate-x-1/2 -translate-y-1/2 opacity-20">
          <OrangeBlob className="h-full w-full animate-spin-slower" />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/4 opacity-20">
          <BlueBlob className="h-full w-full animate-float-slow" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 px-6 pt-12 pb-12 text-center md:pt-20 md:pb-16">
          <div className="mx-auto max-w-3xl animate-fade-in-up">
            <p className="mb-3 font-bold text-[#E7385E] text-sm uppercase tracking-wider">
              {t("badge")}
            </p>
            <h1 className="mb-6 font-bold text-[#221E68] text-[40px] leading-none tracking-tighter md:text-[60px]">
              {t("title")}
            </h1>
            <p className="text-[#221E68]/80 text-lg leading-relaxed md:text-xl">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="relative z-10 px-6 pb-24">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="animate-fade-in-up md:delay-100 lg:col-span-2">
              <form
                className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-xl md:p-12"
                onSubmit={handleSubmit}
              >
                <div className="pointer-events-none absolute top-0 right-0 h-[300px] w-[300px] translate-x-1/2 -translate-y-1/2 opacity-5">
                  <RedBlob className="h-full w-full" />
                </div>

                <div className="relative z-10 grid gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      className="ml-1 font-bold text-[#221E68] text-sm"
                      htmlFor="name"
                    >
                      {t("form.name")}
                    </label>
                    <input
                      className="h-14 w-full rounded-2xl border-transparent bg-[#f8f8fa] px-5 text-[#221E68] text-base outline-none transition-all placeholder:text-[#221E68]/40 focus:ring-2 focus:ring-[#221E68]/20"
                      id="name"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={t("form.namePlaceholder")}
                      required
                      type="text"
                      value={formData.name}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      className="ml-1 font-bold text-[#221E68] text-sm"
                      htmlFor="email"
                    >
                      {t("form.email")}
                    </label>
                    <input
                      className="h-14 w-full rounded-2xl border-transparent bg-[#f8f8fa] px-5 text-[#221E68] text-base outline-none transition-all placeholder:text-[#221E68]/40 focus:ring-2 focus:ring-[#221E68]/20"
                      id="email"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={t("form.emailPlaceholder")}
                      required
                      type="email"
                      value={formData.email}
                    />
                  </div>
                </div>

                {/* Topic */}
                <div className="relative z-10 mt-6 space-y-2">
                  <label
                    className="ml-1 font-bold text-[#221E68] text-sm"
                    htmlFor="topic"
                  >
                    {t("form.topic")}
                  </label>
                  <div className="relative">
                    <select
                      className="h-14 w-full cursor-pointer appearance-none rounded-2xl border-transparent bg-[#f8f8fa] px-5 text-[#221E68] text-base outline-none transition-all focus:ring-2 focus:ring-[#221E68]/20"
                      id="topic"
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      required
                      value={formData.topic}
                    >
                      <option disabled value="">
                        {t("form.topicPlaceholder")}
                      </option>
                      <option value="general">{t("topics.general")}</option>
                      <option value="support">{t("topics.support")}</option>
                      <option value="sales">{t("topics.sales")}</option>
                      <option value="partnership">
                        {t("topics.partnership")}
                      </option>
                    </select>
                    <div className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-[#221E68]/50">
                      <svg
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative z-10 mt-6 space-y-2">
                  <label
                    className="ml-1 font-bold text-[#221E68] text-sm"
                    htmlFor="message"
                  >
                    {t("form.message")}
                  </label>
                  <textarea
                    className="min-h-[150px] w-full resize-none rounded-2xl border-transparent bg-[#f8f8fa] px-5 py-4 text-[#221E68] text-base outline-none transition-all placeholder:text-[#221E68]/40 focus:ring-2 focus:ring-[#221E68]/20"
                    id="message"
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t("form.messagePlaceholder")}
                    required
                    value={formData.message}
                  />
                </div>

                {/* Submit */}
                <div className="relative z-10 mt-8">
                  <button
                    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#F16529] font-bold text-lg text-white shadow-[#F16529]/20 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-[#F16529]/30 sm:w-auto sm:px-10"
                    type="submit"
                  >
                    {t("form.submit")}
                    <IconSend className="size-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="animate-fade-in-up space-y-6 md:delay-200 lg:pt-8">
              <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-[#221E68]/5 text-[#221E68]">
                  <IconMail className="size-7" />
                </div>
                <h3 className="mb-1 font-bold text-[#221E68] text-xl">
                  {t("info.emailUs")}
                </h3>
                <a
                  className="text-[#221E68]/70 transition-colors hover:text-[#F16529]"
                  href="mailto:hello@vastgoedfotoai.nl"
                >
                  hello@vastgoedfotoai.nl
                </a>
              </div>

              <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-[#221E68]/5 text-[#221E68]">
                  <IconClock className="size-7" />
                </div>
                <h3 className="mb-1 font-bold text-[#221E68] text-xl">
                  {t("info.responseTime")}
                </h3>
                <p className="text-[#221E68]/70 leading-relaxed">
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
