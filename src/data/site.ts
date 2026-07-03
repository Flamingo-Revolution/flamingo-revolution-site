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
    documentsLabel: string;
    ideasLabel: string;
    menuLabel: string;
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
    documentsCta: string;
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
    links: Link[];
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
      homeLabel: "Ballina",
      documentsLabel: "Projektligje",
      ideasLabel: "Idete tuaja",
      menuLabel: "Menuja kryesore"
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
        "Misioni yne eshte te mbledhim ne menyre transparente zerin e qytetareve, problematikat qe prekin komunitetet dhe propozimet qe mund te kthehen ne pune konkrete. Revolucioni Flamingo eshte nje hapesire ku pjesemarrja, llogaridhenia dhe mbrojtja e interesit publik vendosen ne qender.",
      primaryCta: "Jepni mendimin tuaj",
      documentsCta: "Ide dhe projektligje",
      secondaryCta: "Pse nisi",
      tertiaryCta: "Si u perhap",
      participateLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform",
      caption:
        "(Nje simbol per te mbledhur zera, probleme dhe propozime.)",
      demandsTitle: "Kerkesat kryesore",
      triggerTitle: "Shkrepja qe e ndezi",
      triggerText:
        "Me 30 maj 2026, nje protestues u terhoq zvarre nga anetare te sigurise private ne Zvërnec, nderkohe qe Policia e Shtetit ishte e pranishme dhe nuk nderhyri. Pamjet u bene nje nga shkendijat kryesore te mobilizimit me te gjere.",
      demands: [
        "Shfuqizimi i ligjit per zonat e mbrojtura",
        "Shfuqizimi i plote i Paketa e Maleve",
        "Shfuqizimi i ligjit per investimet strategjike",
        "Doreheqja e kryeministrit Edi Rama",
        "Krijimi i nje qeverie teknike"
      ],
      metrics: [
        {
          value: "Zeri qytetar",
          label: "Mbledhje e hapur e shqetesimeve dhe ideve"
        },
        {
          value: "Transparence",
          label: "Problematika te renditura qarte dhe publikisht"
        },
        {
          value: "Pjesemarrje",
          label: "Nga formulari te propozimet dhe organizimi"
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
          body: "Mes kerkesave te artikuluara ishin shfuqizimi i ligjit per zonat e mbrojtura, shfuqizimi i plote i projektit te njohur si Paketa e Maleve, shfuqizimi i ligjit per investimet strategjike, doreheqja e Edi Rames dhe krijimi i nje qeverie teknike."
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
        label: "Jepni mendimin tuaj",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform"
      },
      secondaryLink: {
        label: "Shiko si u perhap",
        href: "#pillars"
      },
      notes: ["Mblidh ide", "Rendit propozime", "Pjesemarrje"]
    },
    closing: {
      quote:
        "\"Shqiperia nuk shitet.\"",
      note:
        "Ne keto protesta u lidhen mbrojtja e mjedisit, prona publike dhe kerkesa per llogaridhenie politike ne nje gjuhe te perbashket qytetare.",
      primaryLink: {
        label: "Jepni mendimin tuaj",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform"
      },
      secondaryLink: {
        label: "Lexo artikullin ne shqip",
        href: "https://sq.wikipedia.org/wiki/Protestat_n%C3%AB_Zv%C3%ABrnec,_2026"
      }
    },
    footer: {
      text: "Zeri qytetar, problematikat dhe propozimet e mbledhura hapur nga Revolucioni Flamingo.",
      links: [
        {
          label: "Discord",
          href: "https://discord.gg/jzznwrMFc"
        },
        {
          label: "YouTube",
          href: "https://www.youtube.com/@flamingorevolution2026"
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com/flamingotelevision"
        }
      ]
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
      homeLabel: "Home",
      documentsLabel: "Draft laws",
      ideasLabel: "Your ideas",
      menuLabel: "Main menu"
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
        "Our mission is to transparently collect people's voices, the problems affecting communities and the proposals that can become concrete work. Flamingo Revolution is a space where participation, accountability and the public interest stay at the center.",
      primaryCta: "Share your opinion",
      documentsCta: "Ideas and draft laws",
      secondaryCta: "Why it began",
      tertiaryCta: "How it spread",
      participateLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform",
      caption:
        "(A symbol for collecting voices, problems and proposals.)",
      demandsTitle: "Core demands",
      triggerTitle: "What triggered it",
      triggerText:
        "On May 30, 2026, a protester in Zvërnec was dragged by private security personnel while State Police officers were present and did not intervene. Footage of the incident became one of the main sparks for the wider mobilization.",
      demands: [
        "Cancellation of the protected areas law",
        "Full cancellation of the Mountain Package",
        "Cancellation of the strategic investments law",
        "Resignation of Prime Minister Edi Rama",
        "Creation of a technical government"
      ],
      metrics: [
        {
          value: "Civic voice",
          label: "Open collection of concerns and ideas"
        },
        {
          value: "Transparency",
          label: "Problems organized clearly and publicly"
        },
        {
          value: "Participation",
          label: "From the form to proposals and organizing"
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
          body: "Among the demands highlighted by protesters were the cancellation of the protected areas law, the full cancellation of the project known as the Mountain Package, the cancellation of the strategic investments law, the resignation of Edi Rama and the creation of a technical government."
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
        label: "Share your opinion",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform"
      },
      secondaryLink: {
        label: "See how it spread",
        href: "#pillars"
      },
      notes: ["Collect ideas", "Prioritize proposals", "Participation"]
    },
    closing: {
      quote:
        "\"Albania is not for sale.\"",
      note:
        "The movement tied together environmental protection, public land and democratic accountability in a single civic language.",
      primaryLink: {
        label: "Share your opinion",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform"
      },
      secondaryLink: {
        label: "Read the English article",
        href: "https://en.wikipedia.org/wiki/Flamingo_Revolution"
      }
    },
    footer: {
      text: "Civic voices, problems and proposals collected openly by Flamingo Revolution.",
      links: [
        {
          label: "Discord",
          href: "https://discord.gg/jzznwrMFc"
        },
        {
          label: "YouTube",
          href: "https://www.youtube.com/@flamingorevolution2026"
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com/flamingotelevision"
        }
      ]
    }
  }
};
