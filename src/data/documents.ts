import type { Locale } from "./site";

export type DocumentCategory = "overview" | "constitutional" | "package";

export type ProjectDocument = {
  slug: string;
  title: string;
  summary: Record<Locale, string>;
  category: DocumentCategory;
  language: "sq";
  status: string;
  href: string;
};

type DocumentLibraryCopy = {
  meta: {
    title: string;
    description: string;
  };
  kicker: string;
  title: string;
  description: string;
  discussionNote: string;
  discussionCta: string;
  countLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  allCategoriesLabel: string;
  noResults: string;
  openLabel: string;
  downloadLabel: string;
  languageLabel: string;
  statusLabel: string;
  categories: Record<DocumentCategory, string>;
};

const documentPath = (slug: string) => `/documents/projektligje/${slug}.pdf`;

export const projectDocuments: ProjectDocument[] = [
  {
    slug: "shqiperi-e-re-permbledhje-ekzekutive",
    title: "Shqiperi e Re - Permbledhje ekzekutive",
    summary: {
      sq: "Permbledhje e shkurter e paketes dhe ideve kryesore per ndryshimet e propozuara.",
      en: "A short executive summary of the package and its main proposed changes."
    },
    category: "overview",
    language: "sq",
    status: "PDF",
    href: documentPath("shqiperi-e-re-permbledhje-ekzekutive")
  },
  {
    slug: "shqiperi-e-re-a3-pamje-e-plote-2026",
    title: "Shqiperi e Re - Pamje e plote 2026",
    summary: {
      sq: "Pamje vizuale e plote e paketes, e pershtatshme per orientim te shpejte.",
      en: "A full visual overview of the package, useful for quick orientation."
    },
    category: "overview",
    language: "sq",
    status: "PDF",
    href: documentPath("shqiperi-e-re-a3-pamje-e-plote-2026")
  },
  {
    slug: "projektligji-kushtetues-shqiperi-e-re",
    title: "Projektligji Kushtetues - Shqiperi e Re",
    summary: {
      sq: "Teksti kryesor i projektligjit kushtetues te propozuar.",
      en: "The main text of the proposed constitutional draft law."
    },
    category: "constitutional",
    language: "sq",
    status: "PDF",
    href: documentPath("projektligji-kushtetues-shqiperi-e-re")
  },
  {
    slug: "relacioni-paketa-kushtetuese-shqiperi-e-re",
    title: "Relacioni i Paketes Kushtetuese - Shqiperi e Re",
    summary: {
      sq: "Relacion shpjegues per paketen kushtetuese dhe arsyetimin pas saj.",
      en: "An explanatory relation document for the constitutional package and its reasoning."
    },
    category: "constitutional",
    language: "sq",
    status: "PDF",
    href: documentPath("relacioni-paketa-kushtetuese-shqiperi-e-re")
  },
  {
    slug: "projektligji-per-referendumet",
    title: "Projektligji per referendumet",
    summary: {
      sq: "Propozime qe lidhen me referendumin dhe pjesemarrjen direkte qytetare.",
      en: "Proposals related to referendums and direct civic participation."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("projektligji-per-referendumet")
  },
  {
    slug: "paketa-2-prona-mjedisi-investimet-strategjike",
    title: "Paketa 2 - Prona, mjedisi dhe investimet strategjike",
    summary: {
      sq: "Propozime per pronen, mjedisin, shpronesimet, zonat e mbrojtura dhe trashegimine kulturore.",
      en: "Proposals on property, environment, expropriations, protected areas and cultural heritage."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-2-prona-mjedisi-investimet-strategjike")
  },
  {
    slug: "paketa-3-mandatet-sistemi-zgjedhor",
    title: "Paketa 3 - Mandatet, Presidenti dhe sistemi zgjedhor",
    summary: {
      sq: "Propozime per mandatet politike, rolin e Presidentit dhe sistemin zgjedhor.",
      en: "Proposals on political mandates, the role of the President and the electoral system."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-3-mandatet-sistemi-zgjedhor")
  },
  {
    slug: "paketa-4-minimumi-jetik-femijet",
    title: "Paketa 4 - Minimumi jetik, femijet dhe stigmatizimi",
    summary: {
      sq: "Propozime sociale per minimumin jetik, mbrojtjen e femijeve dhe uljen e stigmatizimit.",
      en: "Social proposals on the living minimum, child protection and reducing stigmatization."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-4-minimumi-jetik-femijet")
  },
  {
    slug: "paketa-5-marredheniet-e-punes",
    title: "Paketa 5 - Marredheniet dhe Kodi i Punes",
    summary: {
      sq: "Propozime per marredheniet e punes dhe ndryshime ne Kodin e Punes.",
      en: "Proposals on labor relations and changes to the Labor Code."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-5-marredheniet-e-punes")
  },
  {
    slug: "paketa-6-privatesia-ekonomia",
    title: "Paketa 6 - Privatesia, ekonomia dhe vezhgimi masiv",
    summary: {
      sq: "Propozime per privatesine, ekonomine, patronazhimin, parajen fizike dhe te drejten per riparim.",
      en: "Proposals on privacy, the economy, mass surveillance, physical cash and the right to repair."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-6-privatesia-ekonomia")
  },
  {
    slug: "paketa-7-sovraniteti-teknomjekesor",
    title: "Paketa 7 - Sovraniteti teknomjekesor",
    summary: {
      sq: "Propozime per integritetin trupor, identitetin dixhital dhe mbrojtjen nga debanking.",
      en: "Proposals on bodily integrity, digital identity and protection from debanking."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-7-sovraniteti-teknomjekesor")
  },
  {
    slug: "paketa-8-gjykata-kushtetuese",
    title: "Paketa 8 - Gjykata Kushtetuese",
    summary: {
      sq: "Propozime per kriteret e emerimit, llogaridhenien dhe konsultimin me Komisionin e Venecias.",
      en: "Proposals on appointment criteria, accountability and consultation with the Venice Commission."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-8-gjykata-kushtetuese")
  },
  {
    slug: "paketa-9-rekrutimi-gjyqtare-prokurore",
    title: "Paketa 9 - Rekrutimi emergjent i gjyqtareve dhe prokuroreve",
    summary: {
      sq: "Propozime per rekrutimin emergjent dhe funksionimin e sistemit te drejtesise.",
      en: "Proposals on emergency recruitment and the functioning of the justice system."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-9-rekrutimi-gjyqtare-prokurore")
  },
  {
    slug: "paketa-10-kodi-zgjedhor-reforma-territoriale",
    title: "Paketa 10 - Kodi Zgjedhor, reforma territoriale dhe financat e partive",
    summary: {
      sq: "Propozime per Kodin Zgjedhor, reformen territoriale dhe financimin e partive.",
      en: "Proposals on the Electoral Code, territorial reform and party financing."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-10-kodi-zgjedhor-reforma-territoriale")
  },
  {
    slug: "paketa-11-toka-bujqesore",
    title: "Paketa 11 - Toka bujqesore",
    summary: {
      sq: "Propozime per mbrojtjen, perdorimin dhe administrimin e tokes bujqesore.",
      en: "Proposals on protecting, using and administering agricultural land."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-11-toka-bujqesore")
  },
  {
    slug: "paketa-12-rgf-reformat-e-be",
    title: "Paketa 12 - RGF dhe zbatimi i reformave te BE",
    summary: {
      sq: "Propozime per RGF dhe zbatimin e reformave te lidhura me Bashkimin Europian.",
      en: "Proposals on RGF and implementation of reforms connected to the European Union."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-12-rgf-reformat-e-be")
  },
  {
    slug: "paketa-13-pronat-nenat-femijet",
    title: "Paketa 13 - Pronat, nenat dhe femijet",
    summary: {
      sq: "Propozime per ceshtje te prones, mbrojtjen e nenave dhe te femijeve.",
      en: "Proposals on property issues and the protection of mothers and children."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-13-pronat-nenat-femijet")
  },
  {
    slug: "paketa-14-politika-jashtme-mbrojtja",
    title: "Paketa 14 - Politika e jashtme dhe mbrojtja",
    summary: {
      sq: "Propozime per politiken e jashtme, sigurine dhe mbrojtjen.",
      en: "Proposals on foreign policy, security and defense."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-14-politika-jashtme-mbrojtja")
  },
  {
    slug: "paketa-15-moratorium-ndertimi-zgjedhjet",
    title: "Paketa 15 - Moratorium ndertimi dhe zgjedhjet",
    summary: {
      sq: "Propozime per moratoriumin e ndertimit dhe rregulla te lidhura me zgjedhjet.",
      en: "Proposals on a construction moratorium and rules connected to elections."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-15-moratorium-ndertimi-zgjedhjet")
  }
];

export const documentLibraryCopy: Record<Locale, DocumentLibraryCopy> = {
  sq: {
    meta: {
      title: "Projektligje | Revolucioni Flamingo",
      description:
        "Libraria e projektligjeve, paketave dhe dokumenteve PDF."
    },
    kicker: "Biblioteka e dokumenteve",
    title: "Projektligje dhe paketa per t'u lexuar, hapur dhe shkarkuar.",
    description:
      "Ketu mblidhen dokumentet qe qytetaret mund t'i eksplorojne ne menyre transparente. Cdo karte hap PDF-ne origjinale ne nje tab te ri ose e shkarkon direkt.",
    discussionNote:
      "Keto jane disa ide te propozuara, te hapura per diskutim dhe rishqyrtim.",
    discussionCta: "Jepni mendimin tuaj",
    countLabel: "19 dokumente",
    searchLabel: "Kerko dokumente",
    searchPlaceholder: "Kerko sipas titullit, temes ose kategorise...",
    allCategoriesLabel: "Te gjitha",
    noResults: "Nuk u gjet asnje dokument me kete kerkim.",
    openLabel: "Hap PDF",
    downloadLabel: "Shkarko",
    languageLabel: "Shqip",
    statusLabel: "PDF",
    categories: {
      overview: "Orientim",
      constitutional: "Kushtetuese",
      package: "Paketa"
    }
  },
  en: {
    meta: {
      title: "Draft laws | Flamingo Revolution",
      description:
        "A PDF library of draft laws, packages and documents collected by Flamingo Revolution."
    },
    kicker: "Document library",
    title: "Draft laws and packages to read, open and download.",
    description:
      "This page collects documents that citizens can explore transparently. Each card opens the original PDF in a new tab or downloads it directly.",
    discussionNote:
      "These are proposed ideas that remain open for discussion and reconsideration.",
    discussionCta: "Share your opinion",
    countLabel: "19 documents",
    searchLabel: "Search documents",
    searchPlaceholder: "Search by title, topic or category...",
    allCategoriesLabel: "All",
    noResults: "No documents match this search.",
    openLabel: "Open PDF",
    downloadLabel: "Download",
    languageLabel: "Albanian",
    statusLabel: "PDF",
    categories: {
      overview: "Overview",
      constitutional: "Constitutional",
      package: "Packages"
    }
  }
};
