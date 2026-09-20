import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  lead,
  crumbs = [],
  children,
}: {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="shell pt-4">
      <div className="page-hero overflow-hidden rounded-[40px]">
        <div className="px-6 py-12 sm:px-12 lg:px-20 lg:py-16">
          <nav aria-label="Хлебные крошки" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Главная
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <h1 className="max-w-4xl text-[32px] font-semibold leading-tight text-white sm:text-[40px] lg:text-[48px] lg:leading-[1.15]">
            {title}
          </h1>

          {lead ? <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">{lead}</p> : null}

          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <h2 className="text-[30px] font-semibold leading-tight text-ink lg:text-[40px]">{title}</h2>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary transition-opacity hover:opacity-70"
        >
          {action.label}
          <svg viewBox="0 0 16 12" className="h-3 w-4" aria-hidden>
            <path d="M9.5 1 15 6l-5.5 5M15 6H1" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </Link>
      ) : null}
    </div>
  );
}
