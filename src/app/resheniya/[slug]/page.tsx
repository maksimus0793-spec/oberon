import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ConsultationSection } from "@/components/consultation-section";
import { ContentBlocks } from "@/components/content-blocks";
import { PageHero } from "@/components/page-hero";
import { SolutionIcon } from "@/components/solution-icon";
import { getService } from "@/content/services";
import { getSolution, solutions } from "@/content/solutions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};

  return { title: solution.title, description: solution.summary };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const service = solution.relatedService ? getService(solution.relatedService) : undefined;
  const others = solutions.filter((s) => s.slug !== solution.slug);

  return (
    <>
      <PageHero
        title={solution.title}
        lead={solution.summary}
        crumbs={[{ label: "Решения", href: "/resheniya" }, { label: solution.title }]}
      />

      <section className="shell py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <SolutionIcon name={solution.icon} className="mb-10 h-32 w-32" />

            <ContentBlocks blocks={solution.blocks} />

            {service ? (
              <div className="mt-14 rounded-[24px] bg-surface p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Направление услуг</p>
                <Link
                  href={`/uslugi/${service.slug}`}
                  className="mt-3 block text-xl font-semibold text-ink transition-colors hover:text-primary"
                >
                  {service.title}
                </Link>
                <p className="mt-2 text-base leading-7 text-ink-muted">{service.summary}</p>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[24px] border border-line p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Другие решения</p>
              <ul className="mt-5 space-y-3">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/resheniya/${s.slug}`}
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
