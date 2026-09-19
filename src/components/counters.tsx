"use client";

import { useEffect, useRef, useState } from "react";

import { getCounters } from "@/content/site";

/* Повторяет odometer-блок с oberon-it.ru: цифры доезжают до значения при попадании в вьюпорт. */
function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = reduced ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

export function Counters() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="shell py-20 lg:py-24">
      <div ref={ref} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {getCounters().map((c) => (
          <Counter key={c.title} value={c.value} suffix={c.suffix} title={c.title} active={visible} />
        ))}
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix,
  title,
  active,
}: {
  value: number;
  suffix: string;
  title: string;
  active: boolean;
}) {
  const shown = useCountUp(value, active);

  return (
    <div className="border-t-2 border-primary pt-5">
      <p className="text-[44px] font-semibold leading-none text-ink lg:text-[56px]">
        {shown}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-3 text-[15px] leading-6 text-ink-muted">{title}</p>
    </div>
  );
}
