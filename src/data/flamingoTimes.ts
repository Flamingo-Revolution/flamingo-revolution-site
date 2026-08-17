export type FlamingoTimesIssue = {
  number: number;
  date: string;
  datetime: string;
  title: string;
  category: string;
  excerpt: string;
  topics: string[];
  href: string;
  pdfHref: string;
};

export const flamingoTimesIssues: FlamingoTimesIssue[] = [
  {
    number: 5,
    date: "Gusht 2026",
    datetime: "2026-08",
    title: "Na mungon sistemi që mund të sjellë ndryshim",
    category: "Institucionet & llogaridhënia",
    excerpt:
      "Kujt i shërben bindja se «të gjithë do të vidhnin» dhe se Shqipëria nuk mund të bëjë pa ta?",
    topics: ["institucionet", "korrupsioni", "llogaridhënia", "mandatet", "drejtësia"],
    href: "/flamingo-times/artikujt/botimi-5/",
    pdfHref: "/documents/flamingo-times/flamingo-times-botimi-5.pdf"
  },
  {
    number: 4,
    date: "Gusht 2026",
    datetime: "2026-08",
    title: "Diaspora rizbarkon",
    category: "Diaspora & qytetaria",
    excerpt:
      "Një komb i shpërndarë, një zë i përbashkët. Mbi 280 protesta në më shumë se 70 qytete të botës.",
    topics: ["diaspora", "protesta", "Zvërneci", "qytetaria", "mërgata"],
    href: "/flamingo-times/artikujt/botimi-4/",
    pdfHref: "/documents/flamingo-times/flamingo-times-botimi-4.pdf"
  },
  {
    number: 3,
    date: "Gusht 2026",
    datetime: "2026-08",
    title: "Fajin nuk e ka sportelisti",
    category: "Qeverisje & administratë",
    excerpt:
      "Administrata është pasqyra e qeverisë. Kur dështimet përsëriten, përgjegjësia fillon te sistemi që i prodhon.",
    topics: ["administrata", "qeverisja", "korrupsioni", "meritokracia"],
    href: "/flamingo-times/artikujt/botimi-3/",
    pdfHref: "/documents/flamingo-times/flamingo-times-botimi-3.pdf"
  },
  {
    number: 2,
    date: "Gusht 2026",
    datetime: "2026-08",
    title: "Studentët — forca që ndryshon historinë",
    category: "Rinia & qytetaria",
    excerpt:
      "Nga Dhjetori 1990 te Qershori 2026: tri breza studentësh, një traditë guximi dhe pjesëmarrjeje qytetare.",
    topics: ["studentët", "rinia", "protesta", "demokracia", "historia"],
    href: "/flamingo-times/artikujt/botimi-2/",
    pdfHref: "/documents/flamingo-times/flamingo-times-botimi-2.pdf"
  },
  {
    number: 1,
    date: "Korrik 2026",
    datetime: "2026-07",
    title: "Shteti ta merr tokën dhe ja jep investitorit ‘strategjik’",
    category: "Prona & investimet strategjike",
    excerpt:
      "Si ligji për investimet strategjike lejon kalimin e pronës private te investitorët dhe çfarë po ndodh në Zvërnec.",
    topics: ["prona", "Zvërneci", "investimet strategjike", "mjedisi"],
    href: "/flamingo-times/artikujt/botimi-1/",
    pdfHref: "/documents/flamingo-times/flamingo-times-botimi-i.pdf"
  }
];
