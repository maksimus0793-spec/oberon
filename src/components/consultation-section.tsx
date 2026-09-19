import { ConsultationForm } from "@/components/consultation-form";
import { site } from "@/content/site";

export function ConsultationSection() {
  return (
    <section id="zayavka" className="scroll-mt-28 bg-surface py-20 lg:py-24">
      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,420px)_1fr]">
          <div>
            <h2 className="text-[30px] font-semibold leading-tight text-ink lg:text-[40px]">Получить консультацию</h2>
            <p className="mt-5 text-lg leading-8 text-ink-muted">
              Ответим на вопросы, расскажем об услугах и рассмотрим предложения о сотрудничестве.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <p className="text-sm text-ink-soft">{site.hours}</p>
                <a href={site.phones.office.href} className="text-2xl font-semibold text-ink transition-colors hover:text-primary">
                  {site.phones.office.label}
                </a>
              </div>

              <div>
                <p className="text-sm text-ink-soft">E-mail</p>
                <a href={`mailto:${site.emails.general}`} className="text-lg text-ink transition-colors hover:text-primary">
                  {site.emails.general}
                </a>
              </div>

              <div>
                <p className="text-sm text-ink-soft">Адрес</p>
                <p className="text-lg text-ink">{site.address.short}</p>
              </div>
            </div>
          </div>

          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
