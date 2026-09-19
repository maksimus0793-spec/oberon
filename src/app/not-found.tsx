import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <section className="shell py-28 lg:py-36">
      <p className="text-[80px] font-semibold leading-none text-primary lg:text-[120px]">404</p>

      <h1 className="mt-6 text-[30px] font-semibold text-ink lg:text-[40px]">Страница не найдена</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-ink-muted">
        Возможно, адрес изменился или страница была удалена. Начните с главной или посмотрите наши услуги.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href="/">На главную</ButtonLink>
        <ButtonLink href="/uslugi" variant="secondary">
          Услуги
        </ButtonLink>
      </div>
    </section>
  );
}
