"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export function FaqItem({ questionKey }: { questionKey: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("pricing.faq");

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm transition-all active:scale-[0.99] md:active:scale-100">
      <button
        className="flex w-full items-center justify-between p-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="pr-8 font-bold text-[#221E68] text-lg">
          {t(`${questionKey}.question`)}
        </span>
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen ? "bg-[#221E68] text-white" : "bg-gray-100 text-[#221E68]"
          }`}
        >
          {isOpen ? (
            <Minus size={18} strokeWidth={3} />
          ) : (
            <Plus size={18} strokeWidth={3} />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-[#221E68]/70 text-base leading-relaxed animate-fade-in">
          {t(`${questionKey}.answer`)}
        </div>
      )}
    </div>
  );
}
