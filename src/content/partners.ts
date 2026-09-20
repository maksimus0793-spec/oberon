export type Partner = {
  slug: string;
  name: string;
  area: string;
  /* Файл в /public/partners. Если логотипа нет, карточка покажет одно название. */
  logo?: string;
  key?: boolean;
};

/*
 * Партнёрская сеть: карточки с сайта + вендоры с партнёрских коллажей.
 * Ключевые вендоры — InfoWatch, Lenovo, Kaspersky, xFusion, Hikvision.
 */
export const partners: Partner[] = [
  {
    slug: "infowatch",
    name: "InfoWatch",
    area: "Защита информации",
    logo: "/partners/infowatch.svg",
    key: true,
  },
  { slug: "lenovo", name: "Lenovo", area: "Серверы и рабочие места", logo: "/partners/lenovo.jpg", key: true },
  {
    slug: "kaspersky",
    name: "Kaspersky",
    area: "Информационная безопасность",
    logo: "/partners/kaspersky.svg",
    key: true,
  },
  { slug: "xfusion", name: "xFusion", area: "Серверы и вычислительные платформы", logo: "/partners/xfusion.svg", key: true },
  { slug: "hikvision", name: "Hikvision", area: "Системы видеонаблюдения", logo: "/partners/hikvision.svg", key: true },
  {
    slug: "mcafee",
    name: "McAfee",
    area: "Информационная безопасность",
    logo: "/partners/mcafee.svg",
  },
  { slug: "polycom", name: "Polycom", area: "Видео-конференц-связь", logo: "/partners/polycom.svg" },
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
  { slug: "supermicro", name: "SuperMicro", area: "Серверы и СХД", logo: "/partners/supermicro.svg" },
  { slug: "dell", name: "Dell", area: "Серверы и рабочие места", logo: "/partners/dell.svg" },
  {
    slug: "hpe",
    name: "Hewlett Packard Enterprise",
    area: "Серверы и инфраструктура",
    logo: "/partners/hpe.svg",
  },
  { slug: "seagate", name: "Seagate", area: "Накопители и СХД", logo: "/partners/seagate.svg" },
  { slug: "commvault", name: "Commvault", area: "Резервное копирование", logo: "/partners/commvault.svg" },
  { slug: "apc", name: "APC", area: "Инженерная инфраструктура", logo: "/partners/apc.svg" },
  { slug: "acer", name: "Acer", area: "Рабочие места и дисплеи", logo: "/partners/acer.svg" },
  { slug: "purestorage", name: "Pure Storage", area: "Системы хранения данных", logo: "/partners/purestorage.svg" },
  { slug: "vertiv", name: "Vertiv", area: "Инженерная инфраструктура ЦОД", logo: "/partners/vertiv.svg" },
  { slug: "hp", name: "Hewlett Packard", area: "Рабочие места и печать", logo: "/partners/hp.svg" },
  { slug: "hitachi", name: "Hitachi", area: "СХД и инфраструктура", logo: "/partners/hitachi.svg" },
  {
    slug: "paloalto",
    name: "Palo Alto Networks",
    area: "Сетевая безопасность",
    logo: "/partners/paloalto.svg",
  },
  { slug: "drweb", name: "Dr.Web", area: "Антивирусная защита", logo: "/partners/drweb.svg" },
  { slug: "eset", name: "ESET", area: "Антивирусная защита", logo: "/partners/eset.svg" },
  { slug: "checkpoint", name: "Check Point", area: "Сетевая безопасность", logo: "/partners/checkpoint.svg" },
  { slug: "extreme", name: "Extreme Networks", area: "Сетевое оборудование", logo: "/partners/extreme.svg" },
  { slug: "symantec", name: "Symantec", area: "Информационная безопасность", logo: "/partners/symantec.svg" },
  { slug: "juniper", name: "Juniper Networks", area: "Сетевое оборудование", logo: "/partners/juniper.svg" },
  { slug: "microsoft", name: "Microsoft", area: "Программное обеспечение", logo: "/partners/microsoft.svg" },
  { slug: "audiocodes", name: "AudioCodes", area: "Голосовые коммуникации", logo: "/partners/audiocodes.svg" },
  { slug: "maxon", name: "Maxon", area: "Программное обеспечение", logo: "/partners/maxon.svg" },
  { slug: "kyocera", name: "Kyocera", area: "Печать и МФУ", logo: "/partners/kyocera.svg" },
  { slug: "logitech", name: "Logitech", area: "Периферия", logo: "/partners/logitech.svg" },
  { slug: "philips", name: "Philips", area: "Дисплеи и оборудование", logo: "/partners/philips.svg" },
  { slug: "samsung", name: "Samsung", area: "Дисплеи и электроника", logo: "/partners/samsung.svg" },
  { slug: "yealink", name: "Yealink", area: "Унифицированные коммуникации", logo: "/partners/yealink.png" },
  { slug: "vmware", name: "VMware", area: "Виртуализация", logo: "/partners/vmware.svg" },
  { slug: "suse", name: "SUSE", area: "Операционные системы", logo: "/partners/suse.svg" },
  { slug: "optoma", name: "Optoma", area: "Проекторы и дисплеи", logo: "/partners/optoma.svg" },
  { slug: "aoc", name: "AOC", area: "Мониторы", logo: "/partners/aoc.svg" },
  { slug: "benq", name: "BenQ", area: "Мониторы и проекторы", logo: "/partners/benq.svg" },
  { slug: "canon", name: "Canon", area: "Печать и визуализация", logo: "/partners/canon.svg" },
  { slug: "iiyama", name: "iiyama", area: "Мониторы", logo: "/partners/iiyama.svg" },
  { slug: "nec", name: "NEC", area: "Дисплеи и инфраструктура", logo: "/partners/nec.svg" },
];

/* Вендоры из описаний услуг, у которых нет отдельной карточки. */
export const technologyVendors = [
  "Cisco",
  "IBM",
  "EMC",
  "NetApp",
  "Citrix",
  "HDS",
  "NICE",
  "MaxPatrol",
  "Riverbed",
];
