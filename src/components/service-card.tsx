import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className="group relative flex flex-col rounded-[24px] bg-white p-8 transition-colors duration-300 hover:bg-primary"
    >
      <div className="relative h-[180px] w-full">
        <Image
          src={service.icon}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-contain object-left transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={service.iconActive}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-contain object-left opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <h3 className="mt-6 text-xl font-semibold leading-7 text-ink transition-colors duration-300 group-hover:text-white">
        {service.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-base leading-6 text-ink-muted transition-colors duration-300 group-hover:text-white/85">
        {service.summary}
      </p>

      <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-primary transition-colors duration-300 group-hover:text-white">
        Подробнее
        <svg viewBox="0 0 16 12" className="h-3 w-4" aria-hidden>
          <path d="M9.5 1 15 6l-5.5 5M15 6H1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
    </Link>
  );
}
