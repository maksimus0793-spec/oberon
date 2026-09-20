import type { Metadata } from "next";

import { ConsultationSection } from "@/components/consultation-section";
import { PageHero } from "@/components/page-hero";
import { PartnerLogo } from "@/components/partner-logo";
import { partners } from "@/content/partners";

export const metadata: Metadata = {
  title: "Партнёры",
  description:
    "Стратегические партнёры Oberon: InfoWatch, Lenovo, Kaspersky, xFusion, Hikvision и расширенная партнёрская сеть производителей.",
};

export default function PartnersPage() {
  const key = partners.filter((p) => p.key);
  const rest = partners
    .filter((p) => !p.key)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

  return (
    <>
      <PageHero
        title="Партнёры"
        lead="Стратегическими партнёрами компании являются ведущие мировые производители. С каждым вендором у нас подтверждённая экспертиза и сертифицированные инженеры."
        crumbs={[{ label: "Партнёры" }]}
      />

      <section className="shell py-16 lg:py-20">
        <h2 className="text-[26px] font-semibold text-ink lg:text-[32px]">Ключевые вендоры</h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {key.map((p) => (
            <div key={p.slug} className="rounded-[24px] bg-surface p-8">
              <div className="flex items-center gap-5">
                <PartnerLogo partner={p} className="h-10 w-[120px]" />
                <p className="text-[26px] font-semibold tracking-tight text-ink">{p.name}</p>
              </div>
              <p className="mt-4 text-[15px] leading-6 text-ink-muted">{p.area}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-[26px] font-semibold text-ink lg:text-[32px]">Партнёрская сеть</h2>

        <div className="mt-8 grid grid-cols-2 items-stretch gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {rest.map((p) => (
            <article
              key={p.slug}
              className="flex h-full min-h-[108px] flex-col rounded-2xl border border-line p-3"
            >
              <div className="flex h-6 items-center">
                <PartnerLogo partner={p} className="h-5 w-[56px]" />
              </div>
              <p className="mt-2 line-clamp-2 min-h-8 text-sm font-semibold leading-4 text-ink">{p.name}</p>
              <p className="mt-auto line-clamp-2 min-h-8 pt-1.5 text-xs leading-4 text-ink-muted">{p.area}</p>
            </article>
          ))}
        </div>
      </section>

      <ConsultationSection />
    </>
  );
}
