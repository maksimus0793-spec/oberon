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
  const items = getCounters();

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
    <section className="shell py-10 lg:py-14">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-[40px] bg-primary px-6 py-16 text-white sm:px-10 lg:px-20 lg:py-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute -bottom-[78%] left-1/2 h-[165%] w-[165%] -translate-x-1/2 rounded-[50%] bg-[#b00000]" />
          <span className="absolute -bottom-[88%] left-1/2 h-[175%] w-[190%] -translate-x-1/2 rounded-[50%] bg-[#d41616]" />
          <span className="absolute -bottom-[98%] left-1/2 h-[185%] w-[215%] -translate-x-1/2 rounded-[50%] bg-[#bb0505]" />
        </div>

        <div className="relative">
          <h2 className="text-center text-[28px] font-medium leading-tight sm:text-[34px] lg:text-[40px]">
            Реальные результаты. Реальное влияние.
          </h2>

          <div className="relative mx-auto mt-14 max-w-5xl lg:mt-20">
            <div
              aria-hidden
              className="absolute top-[4.6rem] right-[12%] left-[12%] hidden h-px bg-white/45 lg:block"
            />

            <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-0">
              {items.map((c) => (
                <Counter key={c.title} value={c.value} suffix={c.suffix} title={c.title} active={visible} />
              ))}
            </div>
          </div>
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
    <div className="flex flex-col items-center text-center">
      <p className="text-[40px] font-semibold leading-none tracking-tight sm:text-[48px] lg:text-[56px]">
        {shown}
        {suffix}
      </p>

      <span aria-hidden className="mt-4 flex h-10 flex-col items-center">
        <span className="h-full w-px bg-white/55" />
        <span className="mt-[-3px] h-2 w-2 rounded-full bg-white" />
      </span>

      <p className="mt-3 max-w-[11rem] text-[14px] leading-5 text-white/85 sm:text-[15px]">{title}</p>
    </div>
  );
}
