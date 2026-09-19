import { PartnerLogo } from "@/components/partner-logo";
import { partners } from "@/content/partners";

/* Бесконечная лента вендоров — аналог swiper-карусели партнёров на oberon-it.ru. */
export function PartnersMarquee() {
  const row = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

      <div className="flex w-max animate-marquee gap-5">
        {row.map((p, i) => (
          <div
            key={`${p.slug}-${i}`}
            className="flex h-[120px] w-[220px] shrink-0 flex-col items-center justify-center rounded-[24px] bg-white px-6 text-center"
          >
            <PartnerLogo partner={p} align="center" className="h-8 w-[140px]" />
            <span className="mt-3 text-lg font-semibold tracking-tight text-ink">{p.name}</span>
            <span className="mt-1 text-xs leading-4 text-ink-soft">{p.area}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
