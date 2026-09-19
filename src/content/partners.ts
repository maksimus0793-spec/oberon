export type Partner = {
  slug: string;
  name: string;
  area: string;
  key?: boolean;
};

/*
 * Список партнёров перенесён с oberon.kz (раздел /partner/).
 * Логотипы намеренно не подставлены: на oberon-it.ru они лежат без подписей,
 * поэтому сопоставить их с брендами нельзя. Положите файлы в /public/partners
 * и добавьте поле logo, если нужны оригинальные знаки.
 */
export const partners: Partner[] = [
  { slug: "avaya", name: "Avaya", area: "Телефония и контакт-центры", key: true },
  { slug: "oracle", name: "Oracle", area: "СУБД и серверные платформы", key: true },
  { slug: "lenovo", name: "Lenovo", area: "Серверы и рабочие места", key: true },
  { slug: "mcafee", name: "McAfee", area: "Информационная безопасность", key: true },
  { slug: "polycom", name: "Polycom", area: "Видео-конференц-связь", key: true },
  { slug: "verint", name: "Verint", area: "Запись и контроль качества" },
  { slug: "plantronics", name: "Plantronics", area: "Гарнитуры для контакт-центров" },
  { slug: "jabra", name: "Jabra", area: "Гарнитуры и аудиоустройства" },
  { slug: "brocade", name: "Brocade", area: "Сети хранения данных" },
  { slug: "huawei", name: "Huawei", area: "Сетевое оборудование и ЦОД" },
  { slug: "fortinet", name: "Fortinet", area: "Сетевая безопасность" },
  { slug: "infinidat", name: "Infinidat", area: "Системы хранения данных" },
  { slug: "fujitsu", name: "Fujitsu", area: "Серверы и СХД" },
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
