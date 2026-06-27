export type Locale = "sq" | "en";

type Link = {
  label: string;
  href: string;
};

type Metric = {
  value: string;
  label: string;
};

type ManifestoCard = {
  title: string;
  body: string;
};

type Pillar = {
  title: string;
  body: string;
};

type Council = {
  kicker: string;
  title: string;
  description: string;
  primaryLink: Link;
  secondaryLink: Link;
  notes: string[];
};

export type SiteCopy = {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    tagline: string;
    logoAlt: string;
  };
  nav: {
    homeLabel: string;
  };
  theme: {
    button: string;
    light: string;
    dark: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    tertiaryCta: string;
    participateLink: string;
    caption: string;
    demandsTitle: string;
    triggerTitle: string;
    triggerText: string;
    demands: string[];
    metrics: Metric[];
  };
  manifesto: {
    kicker: string;
    title: string;
    description: string;
    cards: ManifestoCard[];
  };
  pillars: {
    kicker: string;
    title: string;
    items: Pillar[];
  };
  council: Council;
  closing: {
    quote: string;
    note: string;
    primaryLink: Link;
    secondaryLink: Link;
  };
  footer: {
    text: string;
  };
};

export const siteCopy: Record<Locale, SiteCopy> = {
  sq: {
    meta: {
      title: "Revolucioni Flamingo",
      description:
        "Protestat e vitit 2026 ne Zvërnec, Narte dhe me gjere, te njohura si Revolucioni Flamingo."
    },
    brand: {
      name: "Revolucioni Flamingo",
      tagline: "Shqiperi e re.",
      logoAlt: "Logoja e Revolucioni Flamingo"
    },
    nav: {
      homeLabel: "Ballina"
    },
    theme: {
      button: "Nderro temen",
      light: "Light mode",
      dark: "Dark mode"
    },
    hero: {
      eyebrow: "Nga 23 maji 2026",
      title: "Revolucioni Flamingo",
      description:
        "Ajo qe u quajt Revolucioni Flamingo mori hov pas perplasjeve ne Zvërnec dhe u shtri nga Narta ne Tirane, ne qytete te tjera dhe ne diaspore. Ajo qe nisi si kundershtim ndaj projekteve turistike ne zona te mbrojtura u kthye gjithnje e me shume ne nje levizje kunder qeverise Rama, korrupsionit dhe kapjes se shtetit.",
      primaryCta: "Merr pjese tani",
      secondaryCta: "Pse nisi",
      tertiaryCta: "Si u perhap",
      participateLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform",
      caption:
        "(Flamingoja u kthye ne simbolin e protestes.)",
      demandsTitle: "Kerkesat kryesore",
      triggerTitle: "Shkrepja qe e ndezi",
      triggerText:
        "Me 30 maj 2026, nje protestues u terhoq zvarre nga anetare te sigurise private ne Zvërnec, nderkohe qe Policia e Shtetit ishte e pranishme dhe nuk nderhyri. Pamjet u bene nje nga shkendijat kryesore te mobilizimit me te gjere.",
      demands: [
        "Doreheqja e kryeministrit Edi Rama",
        "Anulimi i ligjit per zonat e mbrojtura",
        "Anulimi i ligjit per investimet strategjike",
        "Anulimi i plote i Paketa e Maleve",
        "Krijimi i nje qeverie teknike"
      ],
      metrics: [
        {
          value: "23 maj 2026",
          label: "Nisja e protestave prane lagunes se Nartes"
        },
        {
          value: "Zvërnec - Tirane",
          label: "Nga bregdeti ne kryeqytet dhe ne qytete te tjera"
        },
        {
          value: "Diaspora",
          label: "Tubime solidariteti ne shume qytete jashte vendit"
        }
      ]
    },
    manifesto: {
      kicker: "Cfare ishte",
      title: "Nje reagim kunder ndertimeve ne zona te mbrojtura dhe kunder menyres si merreshin vendimet.",
      description:
        "Sipas burimeve te lidhura, protestat u nisen nga kundershtimi ndaj projekteve ne Portonovo, ishullin e Sazanit dhe Baks-Rrjoll, por u zgjeruan ne nje akuze me te gjere ndaj mungeses se transparences, kapjes se shtetit dhe shitjes se interesit publik.",
      cards: [
        {
          title: "Shkaku",
          body: "Ne qender ishin resorti i planifikuar ne Zvërnec/Sazan, punimet ne zona te mbrojtura dhe frika se bregdeti po jepej pa transparence te plote."
        },
        {
          title: "Simboli",
          body: "Flamingoja u be shenja me e dallueshme e levizjes, shpesh duke zevendesuar shqiponjen ne imazhe me sfond blu si reference ndaj lagunave dhe detit."
        },
        {
          title: "Kerkesat",
          body: "Mes kerkesave te artikuluara ishin doreheqja e Edi Rames, anulimi i ligjit per zonat e mbrojtura, anulimi i ligjit per investimet strategjike, anulimi i plote i projektit te njohur si Paketa e Maleve dhe krijimi i nje qeverie teknike."
        }
      ]
    },
    pillars: {
      kicker: "Si u perhap",
      title: "Nga nje perplasje lokale ne nje vale me te gjere qytetare.",
      items: [
        {
          title: "Zvërneci",
          body: "Pas protestes se 30 majit dhe raportimeve per perplasje e sprej me piper, ngjarja u kthye ne pike kthese per mobilizimin publik."
        },
        {
          title: "Tirana",
          body: "Me 31 maj marshimi u zhvendos ne kryeqytet, nga Drejtoria e Policise te Ministria e Brendshme dhe me pas te Kryeministria."
        },
        {
          title: "Rinia",
          body: "Protestat u pershkruan edhe si nje levizje me rol te dukshem te gjenerates Z, e pranishme ne organizim, simbolike dhe komunikim."
        },
        {
          title: "Diaspora",
          body: "Solidariteti u shtri ne qytete te shumta jashte Shqiperise, duke e kthyer protesten ne nje jehone me te gjere se vendngjarja fillestare."
        }
      ]
    },
    council: {
      kicker: "Keshilli",
      title: "Nga reagimi publik te propozimet e organizuara.",
      description:
        "Keshilli mund te sherbeje si vendi ku idete, dokumentet dhe propozimet mblidhen, renditen dhe kthehen ne pune konkrete. Qellimi eshte qe energjia e protestes te mos mbetet vetem ne komente, por te kthehet ne pjesemarrje.",
      primaryLink: {
        label: "Merr pjese ne formular",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform"
      },
      secondaryLink: {
        label: "Shiko si u perhap",
        href: "#pillars"
      },
      notes: ["Mblidh ide", "Rendit propozime", "Hap pjesemarrjen"]
    },
    closing: {
      quote:
        "\"Shqiperia nuk shitet.\"",
      note:
        "Ne keto protesta u lidhen mbrojtja e mjedisit, prona publike dhe kerkesa per llogaridhenie politike ne nje gjuhe te perbashket qytetare.",
      primaryLink: {
        label: "Merr pjese tani",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform"
      },
      secondaryLink: {
        label: "Lexo artikullin ne shqip",
        href: "https://sq.wikipedia.org/wiki/Protestat_n%C3%AB_Zv%C3%ABrnec,_2026"
      }
    },
    footer: {
      text: "Zvërnec, Narte dhe zeri qytetar qe u njoh si Revolucioni Flamingo."
    }
  },
  en: {
    meta: {
      title: "Flamingo Revolution",
      description:
        "The 2026 protests in Zvërnec, Narte and beyond, known as the Flamingo Revolution."
    },
    brand: {
      name: "Flamingo Revolution",
      tagline: "Shqiperi e re.",
      logoAlt: "Flamingo Revolution logo"
    },
    nav: {
      homeLabel: "Home"
    },
    theme: {
      button: "Toggle theme",
      light: "Light mode",
      dark: "Dark mode"
    },
    hero: {
      eyebrow: "Since May 23, 2026",
      title: "Flamingo Revolution",
      description:
        "What became known as the Flamingo Revolution gathered force after clashes in Zvërnec and spread from Narte to Tirana, other Albanian cities and the diaspora. What began as opposition to resort projects in protected areas increasingly turned into a broader movement against the Rama government, corruption and state capture.",
      primaryCta: "Participate now",
      secondaryCta: "Why it began",
      tertiaryCta: "How it spread",
      participateLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform",
      caption:
        "(The flamingo became the movement's symbol.)",
      demandsTitle: "Core demands",
      triggerTitle: "What triggered it",
      triggerText:
        "On May 30, 2026, a protester in Zvërnec was dragged by private security personnel while State Police officers were present and did not intervene. Footage of the incident became one of the main sparks for the wider mobilization.",
      demands: [
        "Resignation of Prime Minister Edi Rama",
        "Cancellation of the protected areas law",
        "Cancellation of the strategic investments law",
        "Full cancellation of the Mountain Package",
        "Creation of a technical government"
      ],
      metrics: [
        {
          value: "May 23, 2026",
          label: "Protests begin near the Narte lagoon"
        },
        {
          value: "Zvërnec - Tirana",
          label: "From the coast to the capital and beyond"
        },
        {
          value: "Diaspora",
          label: "Solidarity rallies across many cities abroad"
        }
      ]
    },
    manifesto: {
      kicker: "What it was",
      title: "A reaction against building in protected areas and against how those decisions were being made.",
      description:
        "Based on the linked references, the protests were driven by opposition to projects in Portonovo, Sazan Island and Baks-Rrjoll, then widened into a broader accusation of opacity, state capture and the sale of public interest.",
      cards: [
        {
          title: "The trigger",
          body: "At the center were the planned Zvërnec/Sazan resort, construction in protected areas and fears that the coastline was being handed over without real transparency."
        },
        {
          title: "The symbol",
          body: "The flamingo became the movement's clearest visual mark, often replacing the eagle in blue-backed imagery referencing wetlands and the sea."
        },
        {
          title: "The demands",
          body: "Among the demands highlighted by protesters were the resignation of Edi Rama, the cancellation of the protected areas law, the cancellation of the strategic investments law, the full cancellation of the project known as the Mountain Package and the creation of a technical government."
        }
      ]
    },
    pillars: {
      kicker: "How it spread",
      title: "From a local confrontation to a wider civic wave.",
      items: [
        {
          title: "Zvërnec",
          body: "After the May 30 protest and reports of clashes and pepper spray, the confrontation became a turning point for broader mobilization."
        },
        {
          title: "Tirana",
          body: "On May 31 the march moved to the capital, passing from the police directorate to the interior ministry and then to the prime minister's office."
        },
        {
          title: "Youth",
          body: "The protests were also described as a Gen Z-led movement, with younger participants shaping organization, symbolism and online visibility."
        },
        {
          title: "Diaspora",
          body: "Solidarity actions appeared in many cities outside Albania, extending the protest beyond its original physical setting."
        }
      ]
    },
    council: {
      kicker: "Council",
      title: "From public reaction to organized proposals.",
      description:
        "The council can become the place where ideas, documents and proposals are collected, prioritized and turned into concrete work. The goal is to move the energy of the protest beyond comments and into participation.",
      primaryLink: {
        label: "Join through the form",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform"
      },
      secondaryLink: {
        label: "See how it spread",
        href: "#pillars"
      },
      notes: ["Collect ideas", "Prioritize proposals", "Open participation"]
    },
    closing: {
      quote:
        "\"Albania is not for sale.\"",
      note:
        "The movement tied together environmental protection, public land and democratic accountability in a single civic language.",
      primaryLink: {
        label: "Participate now",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform"
      },
      secondaryLink: {
        label: "Read the English article",
        href: "https://en.wikipedia.org/wiki/Flamingo_Revolution"
      }
    },
    footer: {
      text: "Zvërnec, Narte and the civic voice that came to be known as the Flamingo Revolution."
    }
  }
};
