import type { NextConfig } from "next";

/*
 * Старые адреса WordPress-версии oberon.kz сохраняются как постоянные редиректы,
 * чтобы не потерять накопленные ссылки и позиции в поиске.
 */
const legacyRedirects = [
  ["/service/informatsionnaya-bezopasnost", "/uslugi/informatsionnaya-bezopasnost"],
  ["/service/vyichislitelnyie-sistemyi", "/uslugi/vychislitelnye-sistemy"],
  ["/service/servisnoe-soprovozhdenie", "/uslugi/servisnoe-soprovozhdenie"],
  // Услуги сняты с сайта — старые адреса ведём в общий раздел услуг.
  ["/service/obuchenie-i-sertifikatsiya", "/uslugi"],
  ["/service/telekomunikatsionnyie-i-strukturnyie-resheniya", "/uslugi"],

  // Направление снято с сайта — ведём в общий список решений.
  ["/dopservice/kontakt-tsentryi", "/resheniya"],
  ["/dopservice/bezopasnost", "/resheniya/bezopasnost"],
  ["/dopservice/seti-peredachi-dannyih", "/resheniya/seti-peredachi-dannykh"],
  // Направление снято с сайта — услуга сервисного сопровождения остаётся.
  ["/dopservice/servisnoe-soprovozhdenie", "/uslugi/servisnoe-soprovozhdenie"],
  ["/dopservice/telefoniya", "/resheniya/telefoniya"],
  ["/dopservice/servera-i-sistemyi-hraneniya-dannyih", "/resheniya/servery-i-skhd"],

  ["/partneryi", "/partnery"],
  ["/partner", "/partnery"],
  ["/partner/:slug", "/partnery"],
  ["/partner-category/:slug", "/partnery"],
  ["/kontaktyi", "/kontakty"],
  ["/resheniya/servisnoe-soprovozhdenie", "/uslugi/servisnoe-soprovozhdenie"],
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
