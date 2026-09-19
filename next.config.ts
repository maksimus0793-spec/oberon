import type { NextConfig } from "next";

/*
 * Старые адреса WordPress-версии oberon.kz сохраняются как постоянные редиректы,
 * чтобы не потерять накопленные ссылки и позиции в поиске.
 */
const legacyRedirects = [
  ["/service/telekomunikatsionnyie-i-strukturnyie-resheniya", "/uslugi/telekommunikatsionnye-resheniya"],
  ["/service/informatsionnaya-bezopasnost", "/uslugi/informatsionnaya-bezopasnost"],
  ["/service/vyichislitelnyie-sistemyi", "/uslugi/vychislitelnye-sistemy"],
  ["/service/servisnoe-soprovozhdenie", "/uslugi/servisnoe-soprovozhdenie"],
  // Услуга снята с сайта — старый адрес ведём в общий раздел услуг.
  ["/service/obuchenie-i-sertifikatsiya", "/uslugi"],

  ["/dopservice/kontakt-tsentryi", "/resheniya/kontakt-tsentry"],
  ["/dopservice/bezopasnost", "/resheniya/bezopasnost"],
  ["/dopservice/seti-peredachi-dannyih", "/resheniya/seti-peredachi-dannykh"],
  ["/dopservice/servisnoe-soprovozhdenie", "/resheniya/servisnoe-soprovozhdenie"],
  ["/dopservice/telefoniya", "/resheniya/telefoniya"],
  ["/dopservice/servera-i-sistemyi-hraneniya-dannyih", "/resheniya/servery-i-skhd"],

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
