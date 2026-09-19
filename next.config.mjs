/*
 * Старые адреса WordPress-версии oberon.kz сохраняются как постоянные редиректы,
 * чтобы не потерять накопленные ссылки и позиции в поиске.
 *
 * Файл в JS, а не в TypeScript: иначе Next.js сам вызывает нативный SWC,
 * который на сервере Hoster.kz падает из-за старой glibc.
 */
const legacyRedirects = [
  ["/service/informatsionnaya-bezopasnost", "/uslugi/informatsionnaya-bezopasnost"],
  ["/service/vyichislitelnyie-sistemyi", "/uslugi/vychislitelnye-sistemy"],
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
];

const nextConfig = {
  experimental: {
    /* На linux/x64 Next считает платформу поддерживаемой и тянет .node-файл.
       WASM нужен, потому что glibc на хостинге старше 2.29. */
    useWasmBinary: true,
  },
  async redirects() {
    return [
      ...legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true })),
      {
        source: "/",
        has: [{ type: "query", key: "page_id", value: "19" }],
        destination: "/kontakty",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
