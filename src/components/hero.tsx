import { ButtonLink } from "@/components/button";

export function Hero() {
  return (
    <section className="shell pt-4">
      <div className="relative overflow-hidden rounded-[40px] bg-navy">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" aria-hidden />

        <div className="relative px-6 py-20 sm:px-12 lg:px-20 lg:py-32">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex rounded-full border border-white/25 px-4 py-1.5 text-sm text-white/80">
              Системный интегратор в Казахстане
            </p>

            <h1 className="text-[34px] font-semibold uppercase leading-[1.15] text-surface sm:text-[44px] lg:text-[56px] lg:leading-[72px]">
              Комплексные ИТ-решения для вашего бизнеса
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              ТОО «ОБЕРОН Групп» работает на ИТ-рынке Казахстана с 2015 года: информационная безопасность,
              вычислительные и слаботочные системы — в одной команде.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/uslugi">Наши услуги</ButtonLink>
              <ButtonLink href="/kontakty#zayavka" variant="ghost">
                Получить консультацию
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
