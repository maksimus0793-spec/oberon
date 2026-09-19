import { partners } from "./partners";
import { services } from "./services";

/* Адрес офиса он же юридический — держим в одном месте, чтобы не расходился. */
const address = {
  short: "г. Алматы, ул. Желтоксан, 111А, офис 19",
  full: "Республика Казахстан, г. Алматы, ул. Желтоксан, 111А, офис 19",
} as const;

export const site = {
  name: "Oberon",
  tagline: "Information technology",
  legalName: "ТОО «ОБЕРОН Групп»",
  url: "https://oberon.kz",
  description:
    "Системный интегратор в Казахстане: информационная безопасность, вычислительные системы и сервисное сопровождение.",

  phones: {
    office: { label: "+7 (700) 327-0-888", href: "tel:+77003270888" },
  },

  emails: {
    general: "info@oberon.kz",
  },

  hours: "Пн—Пт, 09:00—18:00",

  address,

  socials: [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],

  requisites: [
    { label: "Наименование", value: "ТОО «ОБЕРОН Групп»" },
    { label: "Юридический адрес", value: address.full },
    { label: "БИН", value: "150740006797" },
    { label: "РНН", value: "600700726318" },
    { label: "ИИК", value: "KZ424322203398A00727" },
    { label: "Банк", value: "ДО АО «Банк ВТБ» (Казахстан) в г. Алматы" },
    { label: "БИК", value: "VTBAKZKZ" },
    {
      label: "Свидетельство о постановке на учёт по НДС",
      value: "Серия 60001 № 0054406 от 26 октября 2015 года",
    },
  ],

  foundedYear: 2015,
} as const;

export function getCounters() {
  return [
    { value: new Date().getFullYear() - site.foundedYear, suffix: "+", title: "лет на ИТ-рынке Казахстана" },
    { value: services.length, suffix: "", title: "ключевых ИТ-направления" },
    { value: partners.length, suffix: "", title: "вендоров в партнёрской сети" },
    { value: 24, suffix: "/7", title: "режим сервисной поддержки" },
  ];
}

export const nav = [
  { label: "О компании", href: "/o-kompanii" },
  { label: "Услуги", href: "/uslugi" },
  { label: "Решения", href: "/resheniya" },
  { label: "Партнёры", href: "/partnery" },
  { label: "Контакты", href: "/kontakty" },
] as const;
