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
  image?: { src: string; alt: string };
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
    protestsMovementLabel: string;
    protestsMomentsLabel: string;
    mapLabel: string;
    pulseLabel: string;
    diasporaLabel: string;
    diasporaReportersLabel: string;
    labLabel: string;
    documentsLabel: string;
    timesLabel: string;
    gamesLabel: string;
    blogLabel: string;
    ideasLabel: string;
    referendumLabel: string;
    dossierLabel: string;
    newsLabel: string;
    aboutLabel: string;
    menuLabel: string;
    joinLabel: string;
    externalLabel: string;
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
    demandsTeaser: string;
    triggerTitle: string;
    triggerText: string;
    demands: string[];
    metrics: Metric[];
  };
  stats: {
    kicker: string;
    title: string;
    description: string;
    movementLabel: string;
    movementItems: Metric[];
    groupLabel: string;
    groupItems: Metric[];
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
    teaser: string;
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
        "Revolucioni Flamingo — protesta qytetare në Shqipëri për zonat e mbrojtura dhe llogaridhënie publike. Referendumi për Ligjin 21/2024, dokumentim, Flamingo Times dhe idetë tuaja."
    },
    brand: {
      name: "Revolucioni Flamingo",
      tagline: "Shqipëri e re.",
      logoAlt: "Logoja e Revolucionit Flamingo"
    },
    nav: {
      homeLabel: "Ballina",
      protestsMovementLabel: "Protestat",
      protestsMomentsLabel: "Momente",
      mapLabel: "Harta e Protestave",
      pulseLabel: "Pulsi i Protestës",
      diasporaLabel: "Diaspora zbarkon",
      diasporaReportersLabel: "Reporterët e Diasporës",
      labLabel: "Projekte",
      referendumLabel: "Referendum",
      documentsLabel: "Projektligjet",
      timesLabel: "Flamingo Times",
      gamesLabel: "Këndi i Lojërave",
      dossierLabel: "Flamingo Dossier",
      newsLabel: "Flamingo News",
      aboutLabel: "Rreth nesh",
      blogLabel: "Blog",
      ideasLabel: "Idetë tuaja",
      menuLabel: "Menuja kryesore",
      joinLabel: "Bashkohu",
      externalLabel: "(hapet në një faqe tjetër)"
    },
    theme: {
      button: "Ndërro temën",
      light: "Light mode",
      dark: "Dark mode"
    },
    hero: {
      eyebrow: "Nga 23 maji 2026",
      title: "Revolucioni Flamingo",
      description:
        "Jemi një nëngrup i pavarur i lëvizjes Revolucioni Flamingo, i nisur nga komunikime në platformat Reddit dhe Discord. E mbështesim lëvizjen dhe kërkesat e saj me ide, projekte konkrete dhe dokumentim.",
      primaryCta: "Jepni mendimin tuaj",
      documentsCta: "Ide dhe projektligje",
      secondaryCta: "Pse nisi",
      tertiaryCta: "Si u përhap",
      participateLink: "/idete-tuaja/",
      caption:
        "(Një simbol për të mbledhur zëra, probleme dhe propozime.)",
      demandsKicker: "Kërkesat",
      demandsTitle: "Kërkesat kryesore",
      demandsTeaser: "Nga dorëheqja e qeverisë te shfuqizimi i ligjeve që hapën zonat e mbrojtura.",
      triggerTitle: "Shkrepja që e ndezi",
      triggerText:
        "Më 30 maj 2026, një protestues u tërhoq zvarrë nga anëtarë të sigurisë private në Zvërnec, ndërkohë që Policia e Shtetit ishte e pranishme dhe nuk ndërhyu. Pamjet u bënë një nga shkëndijat kryesore të mobilizimit më të gjerë.",
      demands: [
        "Dorëheqja e qeverisë",
        "Shfuqizimi i statusit dhe i kuadrit ligjor që lidhet me investitorët strategjikë",
        "Shfuqizimi i Paketës së Maleve",
        "Anulimi i ndryshimeve në Ligjin për Zonat e Mbrojtura",
        "Anulimi i ndryshimeve në Ligjin për Trashëgiminë Kulturore"
      ],
      metrics: [
        {
          value: "Zëri qytetar",
          label: "Mbledhje të hapura, kulturë transparente"
        },
        {
          value: "Projekte",
          label: "Ide dhe mjete konkrete për lëvizjen dhe protestuesit"
        },
        {
          value: "Dokumentim",
          label: "Ruajmë informacione që mesazhi të mos dëmtohet"
        }
      ]
    },
    stats: {
      kicker: "Numrat",
      title: "Angazhimi në shifra",
      description:
        "Një pamje e shpejtë e asaj që është ndërtuar deri tani nga bashkësia e Revolucionit Flamingo.",
      movementLabel: "Lëvizja Revolucioni Flamingo",
      movementItems: [
        { value: "300+", label: "Ditë protestash" },
        { value: "10+", label: "Qytete në Shqipëri" },
        { value: "70+", label: "Qytete në diasporë" }
      ],
      groupLabel: "Kontributi ynë",
      groupItems: [
        { value: "10+", label: "Projekte" },
        { value: "50+", label: "Kontribues aktivë" },
        { value: "75+", label: "Ditë aktivitet" },
        { value: "20+", label: "Takime me 10+ grupe të tjera" },
        { value: "400+", label: "Anëtarë në Discord" },
        { value: "15k+", label: "Kopje Flamingo Times ndarë" }
      ]
    },
    manifesto: {
      kicker: "Çfarë është?",
      title: "Një reagim ndaj arrogancës së pushtetit.",
      description:
        "Sipas burimeve të lidhura, protestat u nisën nga kundërshtimi ndaj projekteve në Portonovo, ishullin e Sazanit dhe Baks-Rrjoll, por u zgjeruan në një akuzë më të gjerë ndaj mungesës së transparencës, kapjes së shtetit dhe shitjes së interesit publik.",
      cards: [
        {
          title: "Shkaku",
          body: "Në qendër ishin resorti i planifikuar në Zvërnec/Sazan, punimet në zona të mbrojtura dhe frika se bregdeti po jepej pa transparencë të plotë."
        },
        {
          title: "Simboli",
          body: "Flamingoja u bë shenja më e dallueshme e lëvizjes, shpesh duke zëvendësuar shqiponjën në imazhe me sfond blu si referencë ndaj lagunave dhe detit."
        },
        {
          title: "Kërkesat",
          body: "Mes kërkesave të artikuluara ishin dorëheqja e qeverisë, shfuqizimi i statusit dhe i kuadrit ligjor për investitorët strategjikë, shfuqizimi i Paketës së Maleve, anulimi i ndryshimeve në Ligjin për Zonat e Mbrojtura dhe anulimi i ndryshimeve në Ligjin për Trashëgiminë Kulturore."
        }
      ]
    },
    pillars: {
      kicker: "Kush proteston",
      title: "Një lëvizje, shumë profile.",
      teaser: "Nga bankat e shkollës te mosha e pensionit: protesta bashkon profile shoqërore që rrallë dalin bashkë në rrugë.",
      items: [
        {
          title: "Aktivistët",
          body: "Krijuesit e simboleve të protestës: nga flamingoja fluturues te busulla dhe flamuri i mbajtur çdo ditë.",
          image: { src: "/images/protests/aktivistet.jpg", alt: "Kolazh me simbolet e protestës: flamingoja, busulla dhe flamurtari" }
        },
        {
          title: "Nëpunësit",
          body: "Punonjës zyre që mbyllin ditën e punës dhe shkojnë drejt e në protestë, ende me çantën e punës në krah.",
          image: { src: "/images/protests/fundi-sesionit.jpg", alt: "Protestues përballë kordonit policor jashtë Kuvendit" }
        },
        {
          title: "Fëmijët",
          body: "Në cepin e tyre në bulevard, vizatojnë flamingo dhe mesazhe, duke i dhënë sheshit një dinamikë tjetër.",
          image: { src: "/images/protests/femijet.jpg", alt: "Fëmijë duke vizatuar në trotuar, rrethuar nga prindërit, gjatë protestës" }
        },
        {
          title: "Studentët",
          body: "Dalin me togë universitare në shenjë proteste, duke denoncuar se vendet e punës shkojnë te të tjerë, jo te merita.",
          image: { src: "/images/protests/studentet.jpg", alt: "Studentë me togë universitare mbajnë pankarta në protestë" }
        },
        {
          title: "Profesionistët",
          body: "Avokatë, mjekë, inxhinierë e arkitektë që lidhin çështjen e Nartës me gjendjen e profesionit dhe shtetin e së drejtës.",
          image: { src: "/images/protests/vala-kombetare.jpg", alt: "Turmë protestuesish me pankarta para Kryeministrisë në Tiranë" }
        },
        {
          title: "Familjarët",
          body: "Prindër që sjellin fëmijët me vete çdo mbrëmje, duke e kthyer bulevardin në një hapësirë familjare.",
          image: { src: "/images/protests/java-e-21.jpg", alt: "Protestuesit natën në bulevardin e Tiranës, me flamuj kuq e zi" }
        },
        {
          title: "Të moshuarit",
          body: "Pensionistë që dalin krah për krah me brezat e rinj, duke kujtuar se çështja e kësaj toke i përket të gjithëve.",
          image: { src: "/images/protests/vazhdimi.jpg", alt: "Protestuesit natën para Kryeministrisë, me flamuj shqiptarë" }
        },
        {
          title: "Diaspora",
          body: "Shqiptarë kudo në botë që marshojnë çdo javë, nga Berlini e Milano te New York, duke i dhënë protestës jehonë ndërkombëtare.",
          image: { src: "/images/protests/diaspora.jpg", alt: "Protestues me flamuj shqiptarë në një marshim të diasporës në Cyrih" }
        },
        {
          title: "Ndërkombëtarët",
          body: "Eurodeputetë dhe aleatë të huaj që vizituan Zvërnecin dhe u shprehën publikisht kundër shkatërrimit të zonës së mbrojtur.",
          image: { src: "/images/protests/nderkombetaret.jpg", alt: "Delegacioni i eurodeputetëve mbi gjirin e Zvërnecit dhe Portonovës" }
        }
      ]
    },
    council: {
      kicker: "Këshilli",
      title: "Nga reagimi publik te propozimet e organizuara.",
      description:
        "Këshilli mund të shërbejë si vendi ku idetë, dokumentet dhe propozimet mblidhen, renditen dhe kthehen në punë konkrete. Qëllimi është që energjia e protestës të mos mbetet vetëm në komente, por të kthehet në pjesëmarrje.",
      primaryLink: {
        label: "Jepni mendimin tuaj",
        href: "/idete-tuaja/"
      },
      secondaryLink: {
        label: "Shiko si u përhap",
        href: "#pillars"
      },
      notes: ["Mblidh ide", "Rendit propozime", "Pjesëmarrje"]
    },
    culture: {
      kicker: "Kultura",
      title: "Një kulturë bashkëpunimi e decentralizuar",
      body: "Një bashkësi e hapur dhe jo hierarkike, me vendimmarrje të shpërndarë sipas normave të njohura nga Reddit dhe Discord."
    },
    closing: {
      quote:
        "\"Shqipëria nuk shitet.\"",
      note:
        "Në këto protesta u lidhën mbrojtja e mjedisit, prona publike dhe kërkesa për llogaridhënie politike në një gjuhë të përbashkët qytetare.",
      primaryLink: {
        label: "Jepni mendimin tuaj",
        href: "/idete-tuaja/"
      },
      secondaryLink: {
        label: "Lexo artikullin në shqip",
        href: "https://sq.wikipedia.org/wiki/Protestat_n%C3%AB_Zv%C3%ABrnec,_2026"
      }
    },
    footer: {
      text: "Zëri qytetar, problematikat dhe propozimet e mbledhura hapur nga Revolucioni Flamingo.",
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
      tagline: "Shqipëri e re.",
      logoAlt: "Flamingo Revolution logo"
    },
    nav: {
      homeLabel: "Home",
      protestsMovementLabel: "Which protests?",
      protestsMomentsLabel: "Moments from the protests",
      mapLabel: "Protest Map",
      pulseLabel: "Protest pulse",
      diasporaLabel: "Diaspora lands",
      diasporaReportersLabel: "Diaspora Reporters",
      labLabel: "Projects",
      referendumLabel: "Referendum",
      documentsLabel: "Draft Laws",
      timesLabel: "Flamingo Times",
      gamesLabel: "Games",
      dossierLabel: "Flamingo Dossier",
      newsLabel: "Flamingo News",
      aboutLabel: "About us",
      blogLabel: "Blog",
      ideasLabel: "Your ideas",
      menuLabel: "Main menu",
      joinLabel: "Join us",
      externalLabel: "(opens on another site)"
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
        "We're a subgroup of the Flamingo Revolution movement, not the movement itself. We support it with projects, ideas and by spreading its message.",
      primaryCta: "Share your opinion",
      documentsCta: "Ideas and draft laws",
      secondaryCta: "Why it began",
      tertiaryCta: "How it spread",
      participateLink: "/idete-tuaja/",
      caption:
        "(A symbol for collecting voices, problems and proposals.)",
      demandsKicker: "Demands",
      demandsTitle: "Core demands",
      demandsTeaser: "From the government's resignation to repealing the laws that opened the protected areas.",
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
          value: "Projects",
          label: "Ideas and concrete tools for the movement"
        },
        {
          value: "Civic voice",
          label: "Open, transparent collection"
        },
        {
          value: "Amplification",
          label: "Carrying the message and demands forward"
        }
      ]
    },
    stats: {
      kicker: "Numbers",
      title: "The movement in numbers",
      description:
        "A quick snapshot of what the Flamingo Revolution community has built so far.",
      movementLabel: "The Flamingo Revolution movement",
      movementItems: [
        { value: "300+", label: "Protest days" },
        { value: "10+", label: "Cities in Albania" },
        { value: "70+", label: "Cities in the diaspora" }
      ],
      groupLabel: "Our contribution",
      groupItems: [
        { value: "10+", label: "Projects" },
        { value: "50+", label: "Active contributors" },
        { value: "75+", label: "Days of activity" },
        { value: "20+", label: "Meetings with 10+ other groups" },
        { value: "400+", label: "Discord members" },
        { value: "15k+", label: "Flamingo Times copies shared" }
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
      kicker: "Who's protesting",
      title: "One movement, many profiles.",
      teaser: "From students to pensioners: the protest brings together social groups that rarely share the same street.",
      items: [
        {
          title: "Activists",
          body: "The people behind the protest's symbols: the floating flamingo, the compass, and the flag carried every day.",
          image: { src: "/images/protests/aktivistet.jpg", alt: "Collage of the protest's symbols: the flamingo, the compass, and the flag-bearer" }
        },
        {
          title: "Civil servants",
          body: "Office workers who clock out and head straight to the protest, still carrying their work bag.",
          image: { src: "/images/protests/fundi-sesionit.jpg", alt: "Protesters facing a police cordon outside Parliament" }
        },
        {
          title: "Children",
          body: "In their own corner of the boulevard, drawing flamingos and messages, giving the square a different rhythm.",
          image: { src: "/images/protests/femijet.jpg", alt: "Children drawing on the pavement, surrounded by parents, during the protest" }
        },
        {
          title: "Students",
          body: "Graduates marching in cap and gown, protesting that jobs go to connections, not merit.",
          image: { src: "/images/protests/studentet.jpg", alt: "Students in graduation gowns hold signs at a protest" }
        },
        {
          title: "Professionals",
          body: "Lawyers, doctors, engineers and architects linking the Narta case to the state of their professions and the rule of law.",
          image: { src: "/images/protests/vala-kombetare.jpg", alt: "Crowd of protesters holding banners outside the prime minister's office in Tirana" }
        },
        {
          title: "Families",
          body: "Parents who bring their children along every evening, turning the boulevard into a family space.",
          image: { src: "/images/protests/java-e-21.jpg", alt: "Protesters at night on Tirana's boulevard, carrying red-and-black flags" }
        },
        {
          title: "The elderly",
          body: "Pensioners marching alongside younger generations, a reminder that this land belongs to everyone.",
          image: { src: "/images/protests/vazhdimi.jpg", alt: "Protesters at night outside the prime minister's office, carrying Albanian flags" }
        },
        {
          title: "Diaspora",
          body: "Albanians around the world marching every week, from Berlin and Zurich to Stockholm, giving the protest an international echo.",
          image: { src: "/images/protests/diaspora.jpg", alt: "Protesters with Albanian flags at a diaspora march in Zurich" }
        },
        {
          title: "Internationals",
          body: "MEPs and foreign allies who visited Zvërnec and spoke out publicly against the destruction of the protected area.",
          image: { src: "/images/protests/nderkombetaret.jpg", alt: "The delegation of MEPs above the Zvërnec and Portonovo bay" }
        }
      ]
    },
    council: {
      kicker: "Council",
      title: "From public reaction to organized proposals.",
      description:
        "The Council can serve as the place where ideas, documents and proposals are gathered, ranked and turned into concrete work. The goal is for the protest's energy not to remain just comments, but to turn into participation.",
      primaryLink: {
        label: "Share your opinion",
        href: "/idete-tuaja/"
      },
      secondaryLink: {
        label: "See how it spread",
        href: "#pillars"
      },
      notes: ["Gather ideas", "Rank proposals", "Participation"]
    },
    culture: {
      kicker: "Culture",
      title: "A decentralized culture of collaboration",
      body: "An open, non-hierarchical community, with decentralized decision-making following norms familiar from Reddit and Discord."
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
