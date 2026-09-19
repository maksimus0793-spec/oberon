import Image from "next/image";

import type { Partner } from "@/content/partners";

/*
 * Знаки вендоров лежат в /public как SVG и PNG. Оптимизатор Next для SVG не
 * применяется, поэтому файлы отдаются как есть — unoptimized.
 * alt пустой намеренно: рядом всегда стоит название, дублировать его не нужно.
 */
export function PartnerLogo({
  partner,
  className = "",
  align = "left",
}: {
  partner: Partner;
  className?: string;
  align?: "left" | "center";
}) {
  if (!partner.logo) return null;

  return (
    <span className={`relative block shrink-0 ${className}`}>
      <Image
        src={partner.logo}
        alt=""
        fill
        unoptimized
        className={`object-contain ${align === "left" ? "object-left" : ""}`}
      />
    </span>
  );
}
