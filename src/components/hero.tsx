import { ButtonLink } from "@/components/button";
import { HeroSphereVideo } from "@/components/hero-sphere-video";

export function Hero() {
  return (
    <section className="shell pt-4">
      <div className="relative overflow-hidden rounded-[40px] bg-navy">
        <HeroSphereVideo />
        <img
          src="/media/hero-sphere-poster.jpg"
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover opacity-100 brightness-[1.28] contrast-[1.12] saturate-[1.25] motion-reduce:block"
          aria-hidden
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/28 to-black/10" aria-hidden />

        <div className="relative px-6 py-20 sm:px-12 lg:px-20 lg:py-32">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex rounded-full border border-white/25 px-4 py-1.5 text-sm text-white/80">
              Системный интегратор в Казахстане
            </p>

            <h1 className="text-[34px] font-semibold uppercase leading-[1.15] text-surface sm:text-[44px] lg:text-[56px] lg:leading-[72px]">
              Комплексные ИТ-решения для вашего бизнеса
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Компания OBERON работает на ИТ-рынке Казахстана с 2015 года: информационная безопасность,
              инфраструктура, мультимедиа и слаботочные системы для бизнеса и государственного сектора.
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
