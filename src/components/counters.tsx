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
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="group relative mt-6 overflow-hidden py-20 text-white lg:mt-8 lg:py-28">
      <div className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]" aria-hidden>
        <picture>
          <source media="(max-width: 768px)" srcSet="/media/stats-bg-mobile.jpg" />
          <img src="/media/stats-bg.jpg" alt="" className="h-full w-full object-cover object-center" />
        </picture>
      </div>

      <div ref={ref} className="shell relative">
        <h2 className="max-w-3xl text-[30px] font-semibold leading-tight lg:text-[44px]">
          Наши достижения
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {getCounters().map((c) => (
            <Counter key={c.title} value={c.value} suffix={c.suffix} title={c.title} active={visible} />
          ))}
        </div>
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
    <div className="relative min-h-28 pl-8 lg:min-h-[220px] lg:pl-7">
      <span
        className="absolute top-1 left-0 h-0 w-0 border-x-[5px] border-b-[10px] border-x-transparent border-b-white"
        aria-hidden
      />
      <span className="absolute top-3.5 bottom-0 left-[4px] w-0.5 bg-white" aria-hidden />

      <p className="text-[40px] font-semibold leading-none lg:text-[56px]">
        {shown}
        {suffix}
      </p>
      <p className="mt-4 flex items-center gap-2.5 text-[15px] leading-6 text-white/90 lg:text-lg">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ee4832] shadow-[0_4px_10px_rgba(0,0,0,0.15)]" aria-hidden />
        {title}
      </p>
    </div>
  );
}
