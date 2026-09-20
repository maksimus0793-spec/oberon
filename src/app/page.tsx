import Link from "next/link";

import { ConsultationSection } from "@/components/consultation-section";
import { Counters } from "@/components/counters";
import { Hero } from "@/components/hero";
import { PartnersMarquee } from "@/components/partners-marquee";
import { SectionHeading } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { SolutionIcon } from "@/components/solution-icon";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Counters />

      <section className="bg-surface py-20 lg:py-24">
        <div className="shell">
          <SectionHeading title="Наши услуги" action={{ label: "Показать все", href: "/uslugi" }} />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}

            <div className="flex flex-col justify-between rounded-[24px] bg-primary-plate p-8 text-white">
              <div>
                <h3 className="text-xl font-semibold leading-7">Не нашли нужное направление?</h3>
                <p className="mt-3 text-base leading-6 text-white/85">
                  Расскажите о задаче — подберём решение и рассчитаем проект под вашу инфраструктуру.
                </p>
              </div>
              <Link
                href="/kontakty#zayavka"
                className="mt-8 inline-flex h-12 w-fit items-center rounded-full bg-white px-7 text-[15px] font-semibold text-primary transition-colors hover:bg-white/90"
              >
                Обсудить проект
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="shell">
          <SectionHeading title="Направления и решения" action={{ label: "Все решения", href: "/resheniya" }} />

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

                <h3 className="mt-6 w-full text-xl font-semibold leading-7 text-ink">{solution.title}</h3>
                <p className="mt-2 w-full text-base leading-6 text-ink-muted">{solution.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-24">
        <div className="shell">
          <SectionHeading title="Наши партнёры" action={{ label: "Все партнёры", href: "/partnery" }} />
        </div>
        <PartnersMarquee />
      </section>

      <ConsultationSection />
    </>
  );
}
