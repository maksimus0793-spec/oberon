import type { Metadata } from "next";

import { ConsultationSection } from "@/components/consultation-section";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `${site.legalName}: ${site.address.short}. Телефон ${site.phones.office.label}, e-mail ${site.emails.general}.`,
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        title="Контакты"
        lead="Свяжитесь с офисом в Алматы — поможем и по новому проекту, и по действующей системе."
        crumbs={[{ label: "Контакты" }]}
      />

      <section className="shell py-16 lg:py-20">
        <div className="rounded-[24px] bg-surface p-8 lg:p-10">
          <h2 className="text-xl font-semibold text-ink">Офис</h2>

          <dl className="mt-8 grid gap-8 text-[15px] sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-primary">Телефон</dt>
              <dd className="mt-1">
                <a href={site.phones.office.href} className="text-ink hover:text-primary">
                  {site.phones.office.label}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-primary">Режим работы</dt>
              <dd className="mt-1 text-ink">{site.hours}</dd>
            </div>

            <div>
              <dt className="text-primary">E-mail</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.emails.general}`} className="text-ink hover:text-primary">
                  {site.emails.general}
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-primary">Адрес</dt>
              <dd className="mt-1 text-ink">{site.address.full}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-14">
          <h2 className="text-[26px] font-semibold text-ink lg:text-[32px]">Реквизиты</h2>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            {site.requisites.map((r) => (
              <div key={r.label} className="grid gap-1 py-5 sm:grid-cols-[320px_1fr] sm:gap-8">
                <dt className="text-[15px] text-primary">{r.label}</dt>
                <dd className="text-[15px] text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ConsultationSection />
    </>
  );
}
