import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className="group relative flex flex-col items-center rounded-[24px] bg-white p-8 text-center transition-colors duration-300 hover:bg-primary-plate"
    >
      <div className="relative flex h-[180px] w-full items-center justify-center">
        <Image
          src={service.icon}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          unoptimized
          className="object-contain object-center"
        />
      </div>

      <h3 className="mt-6 w-full text-center text-xl font-semibold leading-7 text-ink transition-colors duration-300 group-hover:text-white">
        {service.title}
      </h3>

      <p className="mt-2 line-clamp-3 w-full text-center text-base leading-6 text-ink-muted transition-colors duration-300 group-hover:text-white/85">
        {service.summary}
      </p>

      <span className="mt-6 inline-flex items-center justify-center gap-2 text-center text-[15px] font-semibold text-primary transition-colors duration-300 group-hover:text-white">
        Подробнее
        <svg viewBox="0 0 16 12" className="h-3 w-4" aria-hidden>
          <path d="M9.5 1 15 6l-5.5 5M15 6H1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
    </Link>
  );
}
