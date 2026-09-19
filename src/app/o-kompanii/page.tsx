import type { Metadata } from "next";

import { ConsultationSection } from "@/components/consultation-section";
import { PageHero } from "@/components/page-hero";
import { partners, technologyVendors } from "@/content/partners";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "ТОО «ОБЕРОН Групп» — самостоятельная бизнес-структура, образованная в июле 2015 года. Комплексные ИТ-решения и сервисная поддержка 24/7/365.",
};

const principles = [
  {
    title: "Комплексный подход",
    text: "В штате компании — специалисты всех ключевых ИТ-направлений, поэтому задача решается целиком, а не по частям.",
  },
  {
    title: "Собственные ресурсы",
    text: "Административные, людские и прочие ресурсы позволяют выполнять обязательства перед заказчиками без посредников.",
  },
  {
    title: "Поддержка 24/7/365",
    text: "Внедрённые системы сопровождаются круглосуточно, включая выходные и праздничные дни.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="О компании"
        lead="Товарищество с ограниченной ответственностью «ОБЕРОН Групп» образовано в июле 2015 года и является самостоятельной бизнес-структурой, которая имеет собственные административные, людские и прочие ресурсы для выполнения обязательств перед своими заказчиками."
        crumbs={[{ label: "О компании" }]}
      />

      <section className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="prose-oberon max-w-[900px]">
            <p>
              Стратегическими партнёрами компании являются ведущие мировые производители — Oracle, Hitachi, Lenovo,
              McAfee, Riverbed, Polycom, Plantronics, Jabra и многие другие.
            </p>
            <p>
              Компания ориентирована на комплексное решение задач благодаря наличию в своём штате высококвалифицированных
              специалистов различных ИТ-направлений: по телекоммуникационным и интеграционным решениям, вычислительным
              решениям, информационной безопасности, а также по проектированию инженерной инфраструктуры и сервисной
              поддержке, которая предоставляется клиентам компании в режиме 24/7/365.
            </p>
            <p>
              Нашими клиентами становятся предприятия разной отраслевой направленности: банки, ритейл, медицина,
              энергетика. В работе всегда используется индивидуальный подход, поэтому большинство проектов Oberon можно
              назвать уникальными.
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
          <h2 className="text-[30px] font-semibold leading-tight text-ink lg:text-[40px]">Как мы работаем</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-[24px] bg-white p-8">
                <h3 className="text-xl font-semibold leading-7 text-ink">{p.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 lg:py-20">
        <h2 className="text-[30px] font-semibold leading-tight text-ink lg:text-[40px]">Технологии вендоров</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-muted">
          Проекты строятся на оборудовании и программном обеспечении производителей, с которыми у компании есть
          подтверждённая экспертиза и сертификаты инженеров.
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
