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
    protestsLabel: string;
    mapLabel: string;
    pulseLabel: string;
    diasporaLabel: string;
    diasporaReportersLabel: string;
    labLabel: string;
    documentsLabel: string;
    timesLabel: string;
    blogLabel: string;
    ideasLabel: string;
    referendumLabel: string;
    dossierLabel: string;
    aboutLabel: string;
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
    demandsKicker: string;
    demandsTitle: string;
    triggerTitle: string;
    triggerText: string;
    demands: string[];
    metrics: Metric[];
  };
  stats: {
    kicker: string;
    title: string;
    description: string;
    items: Metric[];
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
  culture: {
    kicker: string;
    title: string;
    body: string;
  };
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
        "Portal per te mbledhur ne menyre transparente problematika, ide dhe propozime ne sherbim te protestes dhe interesit publik."
    },
    brand: {
      name: "Revolucioni Flamingo",
      tagline: "Shqiperi e re.",
      logoAlt: "Logoja e Revolucioni Flamingo"
    },
    nav: {
      homeLabel: "Ballina",
      protestsLabel: "Protestat",
      mapLabel: "Harta e Protestave",
      pulseLabel: "Pulsi i Protestes",
      diasporaLabel: "Diaspora zbarkon",
      diasporaReportersLabel: "Reporteret e Diaspores",
      labLabel: "Projekte",
      ideasLabel: "Ide > Projektligje",
      referendumLabel: "Referendum",
      timesLabel: "Flamingo Times",
      dossierLabel: "Flamingo Dossier",
      aboutLabel: "Rreth nesh",
      blogLabel: "Blog",
      ideasLabel: "Idete tuaja",
      contactLabel: "Kontakt",
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
      participateLink: "/idete-tuaja/",
      caption:
        "(Nje simbol per te mbledhur zera, probleme dhe propozime.)",
      demandsKicker: "Kerkesat",
      demandsTitle: "Kerkesat kryesore",
      triggerTitle: "Shkrepja qe e ndezi",
      triggerText:
        "Me 30 maj 2026, nje protestues u terhoq zvarre nga anetare te sigurise private ne Zvërnec, nderkohe qe Policia e Shtetit ishte e pranishme dhe nuk nderhyri. Pamjet u bene nje nga shkendijat kryesore te mobilizimit me te gjere.",
      demands: [
        "Dorëheqja e qeverisë",
        "Shfuqizimi i statusit dhe i kuadrit ligjor që lidhet me investitorët strategjikë",
        "Shfuqizimi i Paketës së Maleve",
        "Anulimi i ndryshimeve në Ligjin për Zonat e Mbrojtura",
        "Anulimi i ndryshimeve në Ligjin për Trashëgiminë Kulturore"
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
    stats: {
      kicker: "Numrat",
      title: "Angazhimi ne shifra",
      description:
        "Nje pamje e shpejte e asaj qe eshte ndertuar deri tani nga bashkesia e Revolucionit Flamingo.",
      items: [
        { value: "8+", label: "Projekte" },
        { value: "20+", label: "Kontribues aktive" },
        { value: "60+", label: "Dite aktivitet" },
        { value: "300+", label: "Dite protestash" },
        { value: "10+", label: "Qytete ne Shqiperi" },
        { value: "70+", label: "Qytete ne diaspore" }
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
          body: "Mes kerkesave te artikuluara ishin doreheqja e qeverise, shfuqizimi i statusit dhe i kuadrit ligjor per investitoret strategjike, shfuqizimi i Paketes se Maleve, anulimi i ndryshimeve ne Ligjin per Zonat e Mbrojtura dhe anulimi i ndryshimeve ne Ligjin per Trashegimine Kulturore."
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
        href: "/idete-tuaja/"
      },
      secondaryLink: {
        label: "Shiko si u perhap",
        href: "#pillars"
      },
      notes: ["Mblidh ide", "Rendit propozime", "Pjesemarrje"]
    },
    culture: {
      kicker: "Kultura",
      title: "Nje kulture bashkepunimi e decentralizuar",
      body: "Revolucioni Flamingo funksionon si nje bashkesi e hapur, jo si nje strukture hierarkike. Bashkepunimi organizohet sipas normave qe njihen mire nga Reddit dhe Discord: kontribut i orientuar nga detyra, mbeshtetje reciproke midis pjesemarresve dhe vendimmarrje e shperndare, pa nje qender te vetme kontrolli."
    },
    closing: {
      quote:
        "\"Shqiperia nuk shitet.\"",
      note:
        "Ne keto protesta u lidhen mbrojtja e mjedisit, prona publike dhe kerkesa per llogaridhenie politike ne nje gjuhe te perbashket qytetare.",
      primaryLink: {
        label: "Jepni mendimin tuaj",
        href: "/idete-tuaja/"
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
          href: "https://discord.gg/B8cQW9aqqb"
        },
        {
          label: "YouTube",
          href: "https://www.youtube.com/@flamingotelevision"
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com/flamingotelevision"
        },
        {
          label: "X",
          href: "https://x.com/Flamingo_TV"
        }
      ]
    }
  },
  en: {
    meta: {
      title: "Flamingo Revolution",
      description:
        "A civic website for transparently collecting public concerns, ideas and proposals in service of the protest and the public interest."
    },
    brand: {
      name: "Flamingo Revolution",
      tagline: "Shqiperi e re.",
      logoAlt: "Flamingo Revolution logo"
    },
    nav: {
      homeLabel: "Home",
      protestsLabel: "Protests",
      mapLabel: "Protest Map",
      pulseLabel: "Protest pulse",
      diasporaLabel: "Diaspora lands",
      diasporaReportersLabel: "Diaspora Reporters",
      labLabel: "Projects",
      ideasLabel: "Ideas > Draft laws",
      referendumLabel: "Referendum",
      timesLabel: "Flamingo Times",
      dossierLabel: "Flamingo Dossier",
      aboutLabel: "About us",
      blogLabel: "Blog",
      ideasLabel: "Your ideas",
      contactLabel: "Contact",
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
      participateLink: "/idete-tuaja/",
      caption:
        "(A symbol for collecting voices, problems and proposals.)",
      demandsKicker: "Demands",
      demandsTitle: "Core demands",
      triggerTitle: "What triggered it",
      triggerText:
        "On May 30, 2026, a protester in Zvërnec was dragged by private security personnel while State Police officers were present and did not intervene. Footage of the incident became one of the main sparks for the wider mobilization.",
      demands: [
        "Resignation of the government",
        "Repeal of the legal status and framework for strategic investors",
        "Full repeal of the Mountain Package",
        "Cancellation of the changes to the Protected Areas Law",
        "Cancellation of the changes to the Cultural Heritage Law"
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
    stats: {
      kicker: "Numbers",
      title: "The movement in numbers",
      description:
        "A quick snapshot of what the Flamingo Revolution community has built so far.",
      items: [
        { value: "8+", label: "Projects" },
        { value: "20+", label: "Active contributors" },
        { value: "60+", label: "Days of activity" },
        { value: "300+", label: "Protest days" },
        { value: "10+", label: "Cities in Albania" },
        { value: "70+", label: "Cities in the diaspora" }
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
          body: "Among the demands highlighted by protesters were the resignation of the government, the repeal of the legal status and framework for strategic investors, the full repeal of the project known as the Mountain Package, the cancellation of the changes to the Protected Areas Law and the cancellation of the changes to the Cultural Heritage Law."
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
    culture: {
      kicker: "Culture",
      title: "A decentralized culture of collaboration",
      body: "Flamingo Revolution works as an open community, not a hierarchy. Collaboration follows norms familiar from Reddit and Discord: task-oriented contribution, mutual support between participants, and decentralized decision-making with no single point of control."
    },
    closing: {
      quote:
        "\"Albania is not for sale.\"",
      note:
        "The movement tied together environmental protection, public land and democratic accountability in a single civic language.",
      primaryLink: {
        label: "Share your opinion",
        href: "/idete-tuaja/"
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
          href: "https://discord.gg/B8cQW9aqqb"
        },
        {
          label: "YouTube",
          href: "https://www.youtube.com/@flamingotelevision"
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com/flamingotelevision"
        },
        {
          label: "X",
          href: "https://x.com/Flamingo_TV"
        }
      ]
    }
  }
};
