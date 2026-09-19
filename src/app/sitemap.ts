import type { MetadataRoute } from "next";

import { services } from "@/content/services";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/o-kompanii", "/uslugi", "/resheniya", "/partnery", "/kontakty"];

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({ url: `${site.url}/uslugi/${s.slug}`, lastModified: new Date(), priority: 0.7 })),
    ...solutions.map((s) => ({ url: `${site.url}/resheniya/${s.slug}`, lastModified: new Date(), priority: 0.6 })),
  ];
}
