import type { NextConfig } from "next";

/*
 * Старые адреса WordPress-версии oberon.kz сохраняются как постоянные редиректы,
 * чтобы не потерять накопленные ссылки и позиции в поиске.
 */
const legacyRedirects = [
  ["/service/informatsionnaya-bezopasnost", "/uslugi/informatsionnaya-bezopasnost"],
  ["/service/vyichislitelnyie-sistemyi", "/uslugi/vychislitelnye-sistemy"],
  // Страницы сняты с сайта — старые адреса ведём в общие разделы.
  ["/service/obuchenie-i-sertifikatsiya", "/uslugi"],
  ["/service/telekomunikatsionnyie-i-strukturnyie-resheniya", "/uslugi"],
  ["/service/servisnoe-soprovozhdenie", "/uslugi"],
  ["/uslugi/servisnoe-soprovozhdenie", "/uslugi"],

  ["/dopservice/kontakt-tsentryi", "/resheniya"],
  ["/dopservice/bezopasnost", "/resheniya/bezopasnost"],
  ["/dopservice/seti-peredachi-dannyih", "/resheniya/seti-peredachi-dannykh"],
  ["/dopservice/servisnoe-soprovozhdenie", "/uslugi"],
  ["/dopservice/telefoniya", "/resheniya"],
  ["/dopservice/servera-i-sistemyi-hraneniya-dannyih", "/resheniya/servery-i-skhd"],
  ["/resheniya/servisnoe-soprovozhdenie", "/uslugi"],
  ["/resheniya/telefoniya", "/resheniya"],
  ["/resheniya/kontakt-tsentry", "/resheniya"],

  ["/partneryi", "/partnery"],
  ["/partner", "/partnery"],
  ["/partner/:slug", "/partnery"],
  ["/partner-category/:slug", "/partnery"],
  ["/kontaktyi", "/kontakty"],
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true })),
      {
        source: "/",
        has: [{ type: "query" as const, key: "page_id", value: "19" }],
        destination: "/kontakty",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
