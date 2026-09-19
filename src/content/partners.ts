export type Partner = {
  slug: string;
  name: string;
  area: string;
  /* Файл в /public/partners. Если логотипа нет, карточка покажет одно название. */
  logo?: string;
  key?: boolean;
};

/*
 * Список партнёров перенесён с oberon.kz (раздел /partner/).
 * Логотипы — официальные знаки вендоров с Викисклада. Перед публичным запуском
 * их стоит заменить на файлы из партнёрских порталов производителей.
 */
export const partners: Partner[] = [
  { slug: "oracle", name: "Oracle", area: "СУБД и серверные платформы", logo: "/partners/oracle.svg", key: true },
  { slug: "lenovo", name: "Lenovo", area: "Серверы и рабочие места", logo: "/partners/lenovo.svg", key: true },
  {
    slug: "mcafee",
    name: "McAfee",
    area: "Информационная безопасность",
    logo: "/partners/mcafee.svg",
    key: true,
  },
  { slug: "polycom", name: "Polycom", area: "Видео-конференц-связь", logo: "/partners/polycom.svg", key: true },
  { slug: "verint", name: "Verint", area: "Запись и контроль качества", logo: "/partners/verint.png" },
  {
    slug: "plantronics",
    name: "Plantronics",
    area: "Гарнитуры для контакт-центров",
    logo: "/partners/plantronics.svg",
  },
  { slug: "jabra", name: "Jabra", area: "Гарнитуры и аудиоустройства", logo: "/partners/jabra.svg" },
  { slug: "brocade", name: "Brocade", area: "Сети хранения данных", logo: "/partners/brocade.svg" },
  { slug: "huawei", name: "Huawei", area: "Сетевое оборудование и ЦОД", logo: "/partners/huawei.svg" },
  { slug: "fortinet", name: "Fortinet", area: "Сетевая безопасность", logo: "/partners/fortinet.svg" },
  { slug: "infinidat", name: "Infinidat", area: "Системы хранения данных", logo: "/partners/infinidat.png" },
  { slug: "fujitsu", name: "Fujitsu", area: "Серверы и СХД", logo: "/partners/fujitsu.svg" },
];

/* Вендоры, которые упоминаются в описаниях услуг, но не заведены отдельными карточками. */
export const technologyVendors = [
  "Cisco",
  "Hewlett-Packard",
  "VMware",
  "IBM",
  "EMC",
  "NetApp",
  "Dell",
  "Citrix",
  "Microsoft",
  "Symantec",
  "HDS",
  "NICE",
  "InfoWatch",
  "MaxPatrol",
  "Riverbed",
  "Hitachi",
  "Лаборатория Касперского",
];
