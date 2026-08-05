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
