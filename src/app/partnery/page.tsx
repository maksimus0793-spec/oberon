import type { Metadata } from "next";

import { ConsultationSection } from "@/components/consultation-section";
import { PageHero } from "@/components/page-hero";
import { PartnerLogo } from "@/components/partner-logo";
import { partners, technologyVendors } from "@/content/partners";

export const metadata: Metadata = {
  title: "Партнёры",
  description:
    "Стратегические партнёры Oberon: Oracle, Lenovo, McAfee, Polycom, Verint, Huawei, Fortinet, Fujitsu и другие.",
};

export default function PartnersPage() {
  const key = partners.filter((p) => p.key);
  const rest = partners.filter((p) => !p.key);

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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p) => (
            <div key={p.slug} className="rounded-[24px] border border-line p-6">
              <div className="flex items-center gap-4">
                <PartnerLogo partner={p} className="h-7 w-[84px]" />
                <p className="text-lg font-semibold text-ink">{p.name}</p>
              </div>
              <p className="mt-3 text-sm leading-5 text-ink-muted">{p.area}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-[26px] font-semibold text-ink lg:text-[32px]">Технологии в проектах</h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {technologyVendors.map((name) => (
            <span key={name} className="rounded-full bg-surface px-5 py-2.5 text-[15px] text-ink">
              {name}
            </span>
          ))}
        </div>
      </section>

      <ConsultationSection />
    </>
  );
}
