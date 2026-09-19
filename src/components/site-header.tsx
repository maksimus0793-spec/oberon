"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/button";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

type MenuGroup = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const menu: MenuGroup[] = [
  { label: "О компании", href: "/o-kompanii" },
  {
    label: "Услуги",
    href: "/uslugi",
    children: services.map((s) => ({ label: s.shortTitle, href: `/uslugi/${s.slug}` })),
  },
  {
    label: "Решения",
    href: "/resheniya",
    children: solutions.map((s) => ({ label: s.title, href: `/resheniya/${s.slug}` })),
  },
  { label: "Партнёры", href: "/partnery" },
  { label: "Контакты", href: "/kontakty" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [openMobile, setOpenMobile] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = openMobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobile]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const closeMobile = () => {
    setOpenMobile(false);
    setExpanded(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-white">
      <div className="shell">
        <div className="flex h-20 items-center justify-between gap-6 lg:h-24">
          <Link href="/" className="shrink-0" aria-label="Oberon — на главную">
            <Image
              src="/brand/logo.svg"
              alt="Oberon Information technology"
              width={181}
              height={48}
              priority
              className="h-9 w-auto sm:h-11 lg:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {menu.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex h-24 items-center gap-1.5 px-4 text-[15px] font-medium transition-colors ${
                    isActive(item.href) ? "text-primary" : "text-ink hover:text-primary"
                  }`}
                >
                  {item.label}
                  {item.children ? (
                    <svg
                      viewBox="0 0 12 8"
                      className="h-2 w-3 transition-transform duration-300 group-hover:-rotate-180"
                      aria-hidden
                    >
                      <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  ) : null}
                </Link>

                {item.children ? (
                  <div className="invisible absolute left-0 top-full w-[360px] translate-y-2 rounded-[24px] border border-line bg-white p-3 opacity-0 shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-2xl px-4 py-3 text-[15px] leading-6 text-ink-muted transition-colors hover:bg-surface hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden text-right xl:block">
              <a
                href={site.phones.office.href}
                className="block text-[17px] font-semibold text-ink transition-colors hover:text-primary"
              >
                {site.phones.office.label}
              </a>
              <span className="text-[13px] text-ink-muted">{site.hours}</span>
            </div>

            {/* Обёртка, а не `hidden` на самой кнопке: у неё в базовых классах уже есть inline-flex. */}
            <div className="hidden md:block">
              <ButtonLink href="/kontakty#zayavka" size="sm">
                Заказать звонок
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setOpenMobile((v) => !v)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-line lg:hidden"
              aria-expanded={openMobile}
              aria-label={openMobile ? "Закрыть меню" : "Открыть меню"}
            >
              <span
                className={`block h-[2px] w-5 bg-ink transition-transform ${openMobile ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span className={`block h-[2px] w-5 bg-ink transition-opacity ${openMobile ? "opacity-0" : ""}`} />
              <span
                className={`block h-[2px] w-5 bg-ink transition-transform ${openMobile ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {openMobile ? (
        <div className="fixed inset-x-0 bottom-0 top-20 z-30 overflow-y-auto border-t border-line bg-white lg:hidden">
          <div className="shell py-6">
            {menu.map((item) => (
              <div key={item.href} className="border-b border-line py-1">
                <div className="flex items-center justify-between">
                  <Link href={item.href} onClick={closeMobile} className="flex-1 py-4 text-lg font-semibold text-ink">
                    {item.label}
                  </Link>
                  {item.children ? (
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => (v === item.href ? null : item.href))}
                      className="flex h-10 w-10 items-center justify-center"
                      aria-label={`Раскрыть раздел «${item.label}»`}
                      aria-expanded={expanded === item.href}
                    >
                      <svg
                        viewBox="0 0 12 8"
                        className={`h-2.5 w-4 transition-transform ${expanded === item.href ? "-rotate-180" : ""}`}
                        aria-hidden
                      >
                        <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </button>
                  ) : null}
                </div>

                {item.children && expanded === item.href ? (
                  <div className="pb-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMobile}
                        className="block py-2.5 text-[15px] text-ink-muted"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            <div className="mt-8 space-y-2">
              <a href={site.phones.office.href} className="block text-2xl font-semibold text-ink">
                {site.phones.office.label}
              </a>
              <p className="text-sm text-ink-muted">{site.hours}</p>
              <ButtonLink href="/kontakty#zayavka" onClick={closeMobile} className="mt-4 w-full">
                Заказать звонок
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
