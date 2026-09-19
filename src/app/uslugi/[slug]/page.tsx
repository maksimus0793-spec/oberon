import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ConsultationSection } from "@/components/consultation-section";
import { ContentBlocks } from "@/components/content-blocks";
import { PageHero } from "@/components/page-hero";
import { getService, services } from "@/content/services";
import { solutions } from "@/content/solutions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return { title: service.title, description: service.summary };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const related = solutions.filter((s) => s.relatedService === service.slug);

  return (
    <>
      <PageHero
        title={service.title}
        lead={service.summary}
        crumbs={[{ label: "Услуги", href: "/uslugi" }, { label: service.shortTitle }]}
      />

      <section className="shell py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="mb-10 h-[200px] w-full max-w-[320px]">
              <Image
                src={service.iconActive}
                alt=""
                width={340}
                height={230}
                className="h-full w-auto object-contain object-left"
              />
            </div>

            <ContentBlocks blocks={service.blocks} />

            {related.length > 0 ? (
              <div className="mt-14 border-t border-line pt-10">
                <h2 className="text-2xl font-semibold text-ink">Смежные решения</h2>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/resheniya/${r.slug}`}
                      className="rounded-full border border-line px-5 py-2.5 text-[15px] text-ink transition-colors hover:border-primary hover:text-primary"
                    >
                      {r.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[24px] bg-surface p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Другие услуги</p>
              <ul className="mt-5 space-y-3">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/uslugi/${s.slug}`}
                      className="block text-[15px] leading-6 text-ink transition-colors hover:text-primary"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <ConsultationSection />
    </>
  );
}
