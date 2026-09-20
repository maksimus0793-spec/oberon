import { achievements } from "./company";

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
    "Системный интегратор в Казахстане: информационная безопасность, ИТ-инфраструктура, мультимедиа и слаботочные системы для B2B и B2G.",

  phones: {
    office: { label: "+7 (700) 327-0-888", href: "tel:+77003270888" },
  },

  emails: {
    general: "info@oberon.kz",
  },

  hours: "Пн—Пт, 10:00—18:00",

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
    {
      label: "Свидетельство о НДС",
      value: "Серия 60001 № 2010468 от 16 сентября 2025 г.",
    },
    {
      label: "Лицензия",
      value: "Государственная лицензия III категории на строительно-монтажные работы №25041122 от 31.12.2025 года",
    },
  ],

  foundedYear: 2015,
} as const;

export function getCounters() {
  return achievements.map((item) => ({
    value: item.value,
    suffix: item.suffix,
    title: item.title,
  }));
}

export const nav = [
  { label: "О компании", href: "/o-kompanii" },
  { label: "Услуги", href: "/uslugi" },
  { label: "Решения", href: "/resheniya" },
  { label: "Партнёры", href: "/partnery" },
  { label: "Контакты", href: "/kontakty" },
] as const;
