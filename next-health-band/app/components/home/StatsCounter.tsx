"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import FadeIn from "../shared/FadeIn";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("tr-TR")}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 50000, suffix: "+", labelKey: "users" },
  { value: 10, suffix: "+", labelKey: "metrics" },
  { value: 99.9, suffix: "%", labelKey: "uptime" },
  { value: 98, suffix: "%", labelKey: "accuracy" },
];

export default function StatsCounter() {
  const t = useTranslations("statsCounter");

  return (
    <section className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, suffix, labelKey }, i) => (
            <FadeIn key={labelKey} delay={i * 0.1}>
              <div className="text-center text-white">
                <p className="font-display text-4xl md:text-5xl font-bold">
                  <Counter target={value} suffix={suffix} />
                </p>
                <p className="text-white/70 text-sm mt-2 font-medium">
                  {t(labelKey as "users")}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
