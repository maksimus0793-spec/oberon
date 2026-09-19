import type { Metadata } from "next";

import { ConsultationSection } from "@/components/consultation-section";
import { PageHero } from "@/components/page-hero";
import { achievements, advantages, license, licensedAreas } from "@/content/company";
import { partners, technologyVendors } from "@/content/partners";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "ТОО «ОБЕРОН Групп» — системный интегратор в Казахстане: информационная безопасность, ИТ-инфраструктура, мультимедиа и слаботочные системы. Лицензия III категории на СМР, более 100 крупных проектов.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="О компании"
        lead="Товарищество с ограниченной ответственностью «ОБЕРОН Групп» образовано в июле 2015 года. Мы проектируем и внедряем ИТ-решения для бизнеса и государственного сектора — от информационной безопасности и ЦОД до слаботочных систем и конференц-залов «под ключ»."
        crumbs={[{ label: "О компании" }]}
      />

      <section className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="prose-oberon max-w-[900px]">
            <p>
              Мы стараемся, чтобы каждый заказчик был удовлетворён работой, и прилагаем для этого все усилия. С каждым
              новым проектом компания приобретает опыт и берётся за более сложные, в том числе республиканские, задачи.
            </p>
            <p>
              В штате — специалисты по информационной безопасности, вычислительной инфраструктуре, мультимедиа и
              слаботочным системам. Это позволяет решать задачу целиком: от обследования и проекта до монтажа,
              пусконаладки и дальнейшего сопровождения.
            </p>
            <p>
              Среди заказчиков — предприятия B2B и B2G: банки, ритейл, медицина, энергетика, государственный сектор. В
              работе используем индивидуальный подход, поэтому большинство проектов Oberon можно назвать уникальными.
            </p>
          </div>

          <aside className="rounded-[24px] bg-surface p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Направления работы</p>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug} className="flex gap-3 text-[15px] leading-6 text-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {s.title}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <div className="shell">
          <h2 className="text-[30px] font-semibold leading-tight text-ink lg:text-[40px]">Наши достижения</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-muted">
            С каждым новым проектом мы становимся лучше, быстрее и умнее. Высоко ценим заказчиков и ориентируемся на
            взаимовыгодное долгосрочное сотрудничество.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item) => (
              <div key={item.title} className="rounded-[24px] bg-white p-8">
                <p className="text-[44px] font-semibold leading-none text-ink">
                  {item.value}
                  <span className="text-primary">{item.suffix}</span>
                </p>
                <p className="mt-3 text-base font-semibold leading-6 text-ink">{item.title}</p>
                <p className="mt-2 text-[15px] leading-6 text-ink-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 lg:py-20">
        <h2 className="text-[30px] font-semibold leading-tight text-ink lg:text-[40px]">Наши преимущества</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-muted">
          Мы стараемся, чтобы каждый заказчик был удовлетворён нашей работой, и прилагаем для этого все усилия.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {advantages.map((item) => (
            <div key={item.title} className="rounded-[24px] bg-surface p-8">
              <h3 className="text-xl font-semibold leading-7 text-ink">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-ink-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <div className="shell">
          <h2 className="text-[30px] font-semibold leading-tight text-ink lg:text-[40px]">Лицензирование</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-muted">{license.text}</p>

          <h3 className="mt-14 text-[26px] font-semibold text-ink lg:text-[32px]">Направления по лицензии</h3>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
            ТОО «ОБЕРОН Групп» имеет опыт и экспертизу по строительству зданий и сооружений, включая капитальный ремонт
            и реконструкцию.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {licensedAreas.map((area) => (
              <div key={area.title} className="rounded-[24px] bg-white p-8">
                <h4 className="text-lg font-semibold leading-7 text-ink">{area.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {area.items.map((item) => (
                    <li key={item} className="relative pl-6 text-[15px] leading-6 text-ink-muted">
                      <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 lg:py-20">
        <h2 className="text-[30px] font-semibold leading-tight text-ink lg:text-[40px]">Технологии вендоров</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-muted">
          Проекты строятся на оборудовании и программном обеспечении производителей, с которыми у компании есть
          подтверждённая экспертиза и сертификаты инженеров. Среди партнёров — производители мирового уровня,
          отечественные компании и компании стран СНГ.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {[...partners.map((p) => p.name), ...technologyVendors].map((name) => (
            <span key={name} className="rounded-full border border-line px-5 py-2.5 text-[15px] text-ink">
              {name}
            </span>
          ))}
        </div>
      </section>

      <ConsultationSection />
    </>
  );
}
