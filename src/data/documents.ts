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
<<<<<<< Updated upstream
    slug: "projektligji-per-referendumet",
    title: "Për referendumet në Republikën e Shqipërisë",
    summary: {
      sq: "Ky është drafti i parë i projektligjit që përcakton rregullat e posaçme për përgatitjen, administrimin, mbikëqyrjen, shpalljen dhe publikimin e rezultatit të një referendumi.",
      en: "This is the first draft law defining the specific rules for preparing, administering, supervising, announcing and publishing the result of a referendum."
      sq: "Përmbledhje e shkurtër e paketës dhe ideve kryesore për ndryshimet e propozuara.",
      en: "A short executive summary of the package and its main proposed changes."
    },
    category: "overview",
    language: "sq",
    status: "PDF",
    href: documentPath("shqiperi-e-re-permbledhje-ekzekutive")
  },
  {
    slug: "shqiperi-e-re-a3-pamje-e-plote-2026",
    title: "Shqipëri e Re - Pamje e plotë 2026",
    summary: {
      sq: "Pamje vizuale e plotë e paketës, e përshtatshme për orientim të shpejte.",
      en: "A full visual overview of the package, useful for quick orientation."
    },
    category: "overview",
    language: "sq",
    status: "PDF",
    href: documentPath("shqiperi-e-re-a3-pamje-e-plote-2026")
  },
  {
    slug: "projektligji-kushtetues-shqipri-e-re",
    title: "Projektligji Kushtetues - Shqipëri e Re",
    summary: {
      sq: "Teksti kryesor i projektligjit kushtetues të propozuar.",
      en: "The main text of the proposed constitutional draft law."
    },
    category: "constitutional",
    language: "sq",
    status: "PDF",
    href: documentPath("projektligji-kushtetues-shqipri-e-re")
  },
  {
    slug: "relacioni-paketa-kushtetuese-shqiperi-e-re",
    title: "Relacioni i Paketës Kushtetuese - Shqipëri e Re",
    summary: {
      sq: "Relacion shpjegues për paketën kushtetuese dhe arsyetimin pas saj.",
      en: "An explanatory relation document for the constitutional package and its reasoning."
    },
    category: "constitutional",
    language: "sq",
    status: "PDF",
    href: documentPath("relacioni-paketa-kushtetuese-shqiperi-e-re")
  },
  {
    slug: "paketa-1-referendumi",
    title: "Paketa 1 - Referendumi",
    summary: {
      sq: "Propozime që lidhen me referendumin dhe pjesëmarrjen direkte qytetare.",
      en: "Proposals related to referendums and direct civic participation."
>>>>>>> Stashed changes
    },
    category: "package",
    language: "sq",
    status: "PDF",
<<<<<<< Updated upstream
    href: documentPath("projektligji-per-referendumet")
=======
    href: documentPath("paketa-1-referendumi")
  },
  {
    slug: "paketa-2-prona-mjedisi-investimet-strategjike",
    title: "Paketa 2 - Prona, mjedisi dhe investimet strategjike",
    summary: {
      sq: "Propozime për pronën, mjedisin, shpronesimet, zonat e mbrojtura dhe trashëgiminë kulturore.",
      en: "Proposals on property, environment, expropriations, protected areas and cultural heritage."Pa spam. Vetëm njoftime për këtë referendum.
      

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
      sq: "Propozime për mandatet politike, rolin e Presidentit dhe sistemin zgjedhor.",
      en: "Proposals on political mandates, the role of the President and the electoral system."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-3-mandatet-sistemi-zgjedhor")
  },
  {
    slug: "paketa-4-minimumi-jetik-femijet",
    title: "Paketa 4 - Minimumi jetik, fëmijët dhe stigmatizimi",
    summary: {
      sq: "Propozime sociale për minimumin jetik, mbrojtjen e fëmijëve dhe uljen e stigmatizimit.",
      en: "Social proposals on the living minimum, child protection and reducing stigmatization."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-4-minimumi-jetik-femijet")
  },
  {
    slug: "paketa-5-marredheniet-e-punes",
    title: "Paketa 5 - Marëdhëniet dhe Kodi i Punës",
    summary: {
      sq: "Propozime për marëdhëniet e punës dhe ndryshime në Kodin e Punës.",
      en: "Proposals on labor relations and changes to the Labor Code."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-5-marredheniet-e-punes")
  },
  {
    slug: "paketa-6-privatesia-ekonomia",
    title: "Paketa 6 - Privatësia, ekonomia dhe vëzhgimi masiv",
    summary: {
      sq: "Propozime për privatësinë, ekonominë, patronazhimin, parajën fizike dhe të drejtën për riparim.",
      en: "Proposals on privacy, the economy, mass surveillance, physical cash and the right to repair."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-6-privatesia-ekonomia")
  },
  {
    slug: "paketa-7-sovraniteti-teknomjekesor",
    title: "Paketa 7 - Sovraniteti teknomjekësor",
    summary: {
      sq: "Propozime për integritetin trupor, identitetin dixhital dhe mbrojtjen nga debanking.",
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
      sq: "Propozime për kriteret e emërimit, llogaridhenien dhe konsultimin me Komisionin e Venecias.",
      en: "Proposals on appointment criteria, accountability and consultation with the Venice Commission."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-8-gjykata-kushtetuese")
  },
  {
    slug: "paketa-9-rekrutimi-gjyqtare-prokurore",
    title: "Paketa 9 - Rekrutimi emergjent i gjyqtarëve dhe prokurorëve",
    summary: {
      sq: "Propozime për rekrutimin emergjent dhe funksionimin e sistemit të drejtësisë.",
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
      sq: "Propozime për Kodin Zgjedhor, reformën territoriale dhe financimin e partive.",
      en: "Proposals on the Electoral Code, territorial reform and party financing."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-10-kodi-zgjedhor-reforma-territoriale")
  },
  {
    slug: "paketa-11-toka-bujqesore",
    title: "Paketa 11 - Toka bujqësore",
    summary: {
      sq: "Propozime për mbrojtjen, përdorimin dhe administrimin e tokës bujqësore.",
      en: "Proposals on protecting, using and administering agricultural land."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-11-toka-bujqesore")
  },
  {
    slug: "paketa-12-rgf-reformat-e-be",
    title: "Paketa 12 - RGF dhe zbatimi i reformave të BE",
    summary: {
      sq: "Propozime për RGF dhe zbatimin e reformave të lidhura me Bashkimin Europian.",
      en: "Proposals on RGF and implementation of reforms connected to the European Union."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-12-rgf-reformat-e-be")
  },
  {
    slug: "paketa-13-pronat-nenat-femijet",
    title: "Paketa 13 - Pronat, nënat dhe fëmijët",
    summary: {
      sq: "Propozime për çështje të pronës, mbrojtjen e nënave dhe të fëmijëve.",
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
      sq: "Propozime për politikën e jashtme, sigurinë dhe mbrojtjen.",
      en: "Proposals on foreign policy, security and defense."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-14-politika-jashtme-mbrojtja")
  },
  {
    slug: "paketa-15-moratorium-ndertimi-zgjedhjet",
    title: "Paketa 15 - Moratorium ndërtimi dhe zgjedhjet",
    summary: {
      sq: "Propozime për moratoriumin e ndërtimit dhe rregulla të lidhura me zgjedhjet.",
      en: "Proposals on a construction moratorium and rules connected to elections."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("paketa-15-moratorium-ndertimi-zgjedhjet")
>>>>>>> Stashed changes
  }
];

export const documentLibraryCopy: Record<Locale, DocumentLibraryCopy> = {
  sq: {
    meta: {
      title: "Projektligj | Revolucioni Flamingo",
      description:
        "Projektligji per referendumet ne Republiken e Shqiperise."
    },
    kicker: "Biblioteka e dokumenteve",
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    title: "Projektligji per t'u lexuar, hapur dhe shkarkuar.",
=======
    title: "Projektligje dhe paketa për t'u lexuar, hapur dhe shkarkuar.",
>>>>>>> Stashed changes
=======
    title: "Projektligje dhe paketa për t'u lexuar, hapur dhe shkarkuar.",
>>>>>>> Stashed changes
    description:
      "Këtu mblidhen dokumentet që qytetarët mund t'i eksplorojnë në mënyrë transparente. Çdo kartë hap PDF-në origjinale në një tab të ri ose e shkarkon direkt.",
    discussionNote:
      "Këto janë disa ide të propozuara, të hapura për diskutim dhe rishqyrtim.",
    discussionCta: "Jepni mendimin tuaj",
    countLabel: "1 dokument",
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
      package: "Projektligj"
    }
  },
  en: {
    meta: {
      title: "Draft law | Flamingo Revolution",
      description:
        "The draft law on referendums in the Republic of Albania."
    },
    kicker: "Document library",
    title: "A draft law to read, open and download.",
    description:
      "This page collects documents that citizens can explore transparently. Each card opens the original PDF in a new tab or downloads it directly.",
    discussionNote:
      "These are proposed ideas that remain open for discussion and reconsideration.",
    discussionCta: "Share your opinion",
    countLabel: "1 document",
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
      package: "Draft law"
    }
  }
};