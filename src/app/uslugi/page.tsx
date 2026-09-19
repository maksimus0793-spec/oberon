import type { Metadata } from "next";

import { ConsultationSection } from "@/components/consultation-section";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Информационная безопасность, вычислительные системы и сервисное сопровождение.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Услуги"
        lead="Три направления, которые закрывают полный цикл работ: от обследования и проектирования до внедрения и сервисного сопровождения."
        crumbs={[{ label: "Услуги" }]}
      />

      <section className="bg-surface py-16 lg:py-20">
        <div className="shell">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <ConsultationSection />
    </>
  );
}
