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
    slug: "projektligji-per-referendumet",
    title: "Për referendumet në Republikën e Shqipërisë",
    summary: {
      sq: "Ky është drafti i parë i projektligjit që përcakton rregullat e posaçme për përgatitjen, administrimin, mbikëqyrjen, shpalljen dhe publikimin e rezultatit të një referendumi.",
      en: "This is the first draft law defining the specific rules for preparing, administering, supervising, announcing and publishing the result of a referendum."
    },
    category: "package",
    language: "sq",
    status: "PDF",
    href: documentPath("projektligji-per-referendumet")
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
    title: "Projektligji per t'u lexuar, hapur dhe shkarkuar.",
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
