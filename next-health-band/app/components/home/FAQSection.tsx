"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import FadeIn from "../shared/FadeIn";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQItem[];
}

export default function FAQSection({ faqs }: Props) {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="py-24 bg-surface border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold">{t("title")}</h2>
          <p className="text-muted mt-3">{t("subtitle")}</p>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeIn key={faq.id} delay={i * 0.05}>
              <div className="bg-bg border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-accent-soft transition-colors"
                >
                  <span className="font-semibold text-sm md:text-base pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${
                      open === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open === faq.id && (
                  <div className="px-5 pb-5 text-muted text-sm leading-relaxed border-t border-border pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
