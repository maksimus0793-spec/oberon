import type { Metadata } from "next";
import Link from "next/link";

import { ConsultationSection } from "@/components/consultation-section";
import { PageHero } from "@/components/page-hero";
import { SolutionIcon } from "@/components/solution-icon";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Решения",
  description:
    "Контакт-центры, информационная безопасность, сети передачи данных, сервисное сопровождение, телефония, серверы и СХД.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        title="Направления и решения"
        lead="Прикладные решения, которые мы внедряем и поддерживаем на площадках заказчиков в Казахстане."
        crumbs={[{ label: "Решения" }]}
      />

      <section className="shell py-16 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/resheniya/${solution.slug}`}
              className="group rounded-[24px] border border-line p-8 transition-colors duration-300 hover:border-primary"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <SolutionIcon name={solution.icon} className="h-7 w-7" />
              </span>

              <h2 className="mt-6 text-xl font-semibold leading-7 text-ink">{solution.title}</h2>
              <p className="mt-2 text-base leading-6 text-ink-muted">{solution.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <ConsultationSection />
    </>
  );
}
