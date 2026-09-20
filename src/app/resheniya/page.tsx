import type { Metadata } from "next";
import Link from "next/link";

import { ConsultationSection } from "@/components/consultation-section";
import { PageHero } from "@/components/page-hero";
import { SolutionIcon } from "@/components/solution-icon";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Решения",
  description:
    "Информационная безопасность, сети, слаботочные системы, серверы и СХД, мультимедиа и ВКС.",
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
              className="group flex flex-col items-center rounded-[24px] border border-line p-8 text-center transition-colors duration-300 hover:border-primary"
            >
              <div className="flex h-[180px] w-full items-center justify-center">
                <SolutionIcon name={solution.icon} className="h-[180px] w-[180px]" />
              </div>

              <h2 className="mt-6 w-full text-xl font-semibold leading-7 text-ink">{solution.title}</h2>
              <p className="mt-2 w-full text-base leading-6 text-ink-muted">{solution.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <ConsultationSection />
    </>
  );
}
