import Image from "next/image";
import Link from "next/link";

import { services } from "@/content/services";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 rounded-t-[40px] bg-slate text-white">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div>
            <Image src="/brand/logo-footer.svg" alt="Oberon Information technology" width={181} height={48} />

            <div className="mt-8 space-y-1">
              <p className="text-sm text-white/60">{site.hours}</p>
              <a href={site.phones.office.href} className="block text-2xl font-semibold transition-colors hover:text-white/70">
                {site.phones.office.label}
              </a>
            </div>

            <div className="mt-6 space-y-1 text-sm text-white/70">
              <p>
                E-mail{" "}
                <a href={`mailto:${site.emails.general}`} className="text-white underline-offset-4 hover:underline">
                  {site.emails.general}
                </a>
              </p>
              <p>{site.address.short}</p>
            </div>

            <div className="mt-6 flex gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-white/25 px-4 py-2 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <FooterColumn title="Услуги" links={services.map((s) => ({ label: s.shortTitle, href: `/uslugi/${s.slug}` }))} />
            <FooterColumn
              title="Решения"
              links={solutions.map((s) => ({ label: s.title, href: `/resheniya/${s.slug}` }))}
            />
            <FooterColumn
              title="Компания"
              links={[
                { label: "О компании", href: "/o-kompanii" },
                { label: "Партнёры", href: "/partnery" },
                { label: "Контакты", href: "/kontakty" },
              ]}
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} — Oberon | Information technology
          </p>
          <p>Все права защищены</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-white/50">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] leading-6 text-white/85 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
