import { ButtonLink } from "@/components/button";
import { HeroSphereVideo } from "@/components/hero-sphere-video";

export function Hero() {
  return (
    <section className="shell pt-4">
      <div className="relative overflow-hidden rounded-[40px] bg-navy">
        <div className="relative grid items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="relative z-10 flex items-center px-6 py-16 sm:px-12 lg:px-16 lg:py-28 xl:px-20">
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

          <HeroSphereVideo />
        </div>
      </div>
    </section>
  );
}
