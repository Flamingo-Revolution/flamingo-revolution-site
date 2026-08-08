import type { Locale } from "./site";

type TimelineItem = {
  date: string;
  title: string;
  body: string;
};

type RegisterEntry = {
  date: string;
  title: string;
  location: string;
  body: string;
  status: string;
};

export type ProtestsPageCopy = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    panelTitle: string;
    panelLinks: { label: string; href: string }[];
  };
  historiku: {
    kicker: string;
    title: string;
    description: string;
    timeline: TimelineItem[];
    backgroundKicker: string;
    backgroundTitle: string;
  };
  list: {
    kicker: string;
    title: string;
    description: string;
    entries: RegisterEntry[];
    note: string;
    ctaLabel: string;
  };
  gallery: {
    kicker: string;
    title: string;
    description: string;
    placeholderLabel: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export const protestsPageCopy: Record<Locale, ProtestsPageCopy> = {
  sq: {
    meta: {
      title: "Protestat | Revolucioni Flamingo",
      description:
        "Historiku, lista dhe fotot e protestave te Revolucionit Flamingo, te mbledhura ne nje faqe te vetme."
    },
    hero: {
      eyebrow: "Protestat",
      title: "Protestat",
      lead: "Nga shkendija e pare ne Zvernec deri te mobilizimi kombetar dhe ai i diaspores: ketu mblidhet historiku, regjistri i protestave dhe fotot e mbledhura nga rruga.",
      primaryCta: "Jepni mendimin tuaj",
      secondaryCta: "Shiko historikun",
      panelTitle: "Ne kete faqe",
      panelLinks: [
        { label: "Historiku", href: "#historiku" },
        { label: "Lista e protestave", href: "#lista-e-protestave" },
        { label: "Foto - Galeri", href: "#foto-galeri" }
      ]
    },
    historiku: {
      kicker: "Historiku",
      title: "Nga nje perplasje lokale ne nje vale kombetare.",
      description:
        "Nje kronologji e shkurter e momenteve qe e kthyen nje kundershtim lokal ne nje mobilizim te gjere qytetar.",
      timeline: [
        {
          date: "23 Maj",
          title: "Fillimi",
          body: "Nisin reagimet e para kunder projekteve ne zona te mbrojtura dhe kunder menyres si merreshin vendimet."
        },
        {
          date: "30 Maj",
          title: "Zvërneci",
          body: "Nje protestues terhiqet zvarre nga siguria private ne Zvërnec, nderkohe qe Policia e Shtetit ishte e pranishme dhe nuk nderhyri. Pamjet behen shkendija kryesore e mobilizimit."
        },
        {
          date: "31 Maj",
          title: "Tirana",
          body: "Marshimi zhvendoset ne kryeqytet, nga Drejtoria e Policise te Ministria e Brendshme dhe me pas te Kryeministria."
        },
        {
          date: "6 Qershor",
          title: "Vala e pare",
          body: "Nis nje muaj protestash pothuajse cdo dite, me pjesemarrje te dokumentuar ne kamera ne sheshe te ndryshme."
        },
        {
          date: "20 Qershor",
          title: "Kulmi i diaspores",
          body: "Solidariteti shtrihet ne qytete te shumta jashte Shqiperise dhe marshimi drejt Rinasit shenon kulmin e pjesemarrjes."
        }
      ],
      backgroundKicker: "Cfare ishte",
      backgroundTitle: "Sfondi i protestave"
    },
    list: {
      kicker: "Regjistri",
      title: "Lista e protestave",
      description:
        "Nje regjister i protestave te organizuara, me data, vendndodhje dhe detaje pjesemarrjeje. Lista plotesohet ndersa mblidhet me shume informacion.",
      entries: [
        {
          date: "30 Maj 2026",
          title: "Perplasja ne Zvernec",
          location: "Zvërnec",
          body: "Protesta kunder resortit te planifikuar ne Zvërnec/Sazan, e shoqeruar nga perplasje me sigurine private.",
          status: "E konfirmuar"
        },
        {
          date: "31 Maj 2026",
          title: "Marshimi drejt Kryeministrise",
          location: "Tirane",
          body: "Marshim nga Drejtoria e Policise te Ministria e Brendshme e me pas te Kryeministria.",
          status: "E konfirmuar"
        },
        {
          date: "6 - 20 Qershor 2026",
          title: "Vala ditore e protestave",
          location: "Shesh te ndryshem, Shqiperi",
          body: "Nje muaj protestash te perditshme, te dokumentuara vazhdimisht, deri te marshimi drejt Rinasit dhe kulmi i diaspores.",
          status: "E konfirmuar"
        }
      ],
      note: "Njihni nje proteste qe mungon ne kete liste?",
      ctaLabel: "Na tregoni"
    },
    gallery: {
      kicker: "Foto - Galeri",
      title: "Momentet e dokumentuara ne kamera",
      description:
        "Galeria po plotesohet me foto nga sheshet dhe marshimet. Nese keni foto nga protestat, na i dergoni.",
      placeholderLabel: "Foto se shpejti",
      ctaLabel: "Dergoni foto",
      ctaHref: "/rreth-nesh/#kontakt"
    }
  },
  en: {
    meta: {
      title: "Protests | Flamingo Revolution",
      description:
        "The history, register and photos of the Flamingo Revolution protests, gathered on a single page."
    },
    hero: {
      eyebrow: "Protests",
      title: "Protests",
      lead: "From the first spark in Zvernec to the national and diaspora mobilization: this page collects the history, the protest register and photos gathered from the streets.",
      primaryCta: "Share your opinion",
      secondaryCta: "See the history",
      panelTitle: "On this page",
      panelLinks: [
        { label: "History", href: "#historiku" },
        { label: "List of protests", href: "#lista-e-protestave" },
        { label: "Photo gallery", href: "#foto-galeri" }
      ]
    },
    historiku: {
      kicker: "History",
      title: "From a local confrontation to a national wave.",
      description:
        "A short chronology of the moments that turned a local objection into a wide civic mobilization.",
      timeline: [
        {
          date: "May 23",
          title: "The start",
          body: "The first reactions begin against projects in protected areas and against how those decisions were made."
        },
        {
          date: "May 30",
          title: "Zvërnec",
          body: "A protester is dragged by private security in Zvërnec while State Police officers were present and did not intervene. Footage becomes the main spark of the mobilization."
        },
        {
          date: "May 31",
          title: "Tirana",
          body: "The march moves to the capital, from the police directorate to the interior ministry and then to the prime minister's office."
        },
        {
          date: "June 6",
          title: "First wave",
          body: "A month of almost daily protests begins, with participation documented on camera across different squares."
        },
        {
          date: "June 20",
          title: "Diaspora peak",
          body: "Solidarity spreads to many cities outside Albania, and the march toward Rinas airport marks the peak of participation."
        }
      ],
      backgroundKicker: "What it was",
      backgroundTitle: "Background of the protests"
    },
    list: {
      kicker: "Register",
      title: "List of protests",
      description:
        "A register of the organized protests, with dates, locations and participation details. The list is updated as more information is collected.",
      entries: [
        {
          date: "May 30, 2026",
          title: "The Zvernec clash",
          location: "Zvërnec",
          body: "Protest against the planned Zvërnec/Sazan resort, accompanied by a clash with private security.",
          status: "Confirmed"
        },
        {
          date: "May 31, 2026",
          title: "March to the prime minister's office",
          location: "Tirana",
          body: "March from the police directorate to the interior ministry and then to the prime minister's office.",
          status: "Confirmed"
        },
        {
          date: "June 6 - 20, 2026",
          title: "Daily wave of protests",
          location: "Various squares, Albania",
          body: "A month of daily, continuously documented protests, leading up to the march toward Rinas airport and the diaspora peak.",
          status: "Confirmed"
        }
      ],
      note: "Know a protest missing from this list?",
      ctaLabel: "Tell us"
    },
    gallery: {
      kicker: "Photo gallery",
      title: "Moments documented on camera",
      description:
        "The gallery is being filled with photos from the squares and marches. If you have photos from the protests, send them our way.",
      placeholderLabel: "Photos coming soon",
      ctaLabel: "Send photos",
      ctaHref: "/en/rreth-nesh/#kontakt"
    }
  }
};
