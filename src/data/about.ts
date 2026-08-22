import type { Locale } from "./site";

export type AboutPageCopy = {
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
  misioni: {
    kicker: string;
    title: string;
    description: string;
    principles: string[];
  };
  rregullorja: {
    kicker: string;
    title: string;
    description: string;
    rules: string[];
  };
  transparenca: {
    kicker: string;
    title: string;
    description: string;
    points: string[];
  };
  ekipi: {
    kicker: string;
    title: string;
    description: string;
    members: string[];
    moreLabel: string;
  };
  partneret: {
    kicker: string;
    title: string;
    description: string;
    categories: string[];
  };
  kontakt: {
    kicker: string;
    title: string;
    lead: string;
    email: string;
    emailKicker: string;
    emailNote: string;
    emailCta: string;
  };
};

export const aboutPageCopy: Record<Locale, AboutPageCopy> = {
  sq: {
    meta: {
      title: "Rreth nesh — misioni dhe ekipi | Revolucioni Flamingo",
      description:
        "Kush e bën Revolucionin Flamingo: misioni vullnetar, rregullorja, partnerët dhe kontakti."
    },
    hero: {
      eyebrow: "Rreth nesh",
      title: "Rreth Nesh",
      lead: "Kush jemi, për çfarë punojmë dhe si mund të na kontaktoni ose të bashkëpunoni me Revolucionin Flamingo.",
      primaryCta: "Jepni mendimin tuaj",
      secondaryCta: "Shiko misionin",
      panelTitle: "Në këtë faqe",
      panelLinks: [
        { label: "Misioni", href: "#misioni" },
        { label: "Rregullorja", href: "#rregullorja" },
        { label: "Ekipi", href: "#ekipi" },
        { label: "Transparencë", href: "#transparenca" },
        { label: "Partnerët", href: "#partneret" },
        { label: "Kontakt", href: "#kontakt" }
      ]
    },
    misioni: {
      kicker: "Misioni",
      title: "Misioni ynë",
      description:
        "Revolucioni Flamingo krijon hapësira ku qytetarët mund të informohen, të shprehin mendimin e tyre dhe të bashkëpunojnë për çështje me interes publik. Ne e kthejmë energjinë qytetare në ide, dokumentim dhe veprim të përbashkët.",
      principles: ["Informim i hapur.", "Pjesëmarrje qytetare.", "Veprim i përbashkët."]
    },
    rregullorja: {
      kicker: "Rregullorja",
      title: "Rregullorja minimale",
      description: "Nuk kemi shumë rregulla - vetëm disa, të lehta për t'u mbajtur mend.",
      rules: ["RnBBnB.", "Common sense.", "Respekto lagunën, jo betonin.", "Kontribuo, mos u grind.", "Pa nxitim, pa dramë."]
    },
    transparenca: {
      kicker: "Transparencë",
      title: "Punë krejt vullnetare",
      description:
        "Gjithçka këtu, nga kjo faqe te dokumentimi i protestave, bëhet nga vullnetarë, në kohën e tyre të lirë dhe me mjetet e tyre, pa asnjë interes financiar apo mbështetje nga jashtë.",
      points: ["Askush nuk paguhet.",  "Kostot i mbulojmë vetë.", "Pa financim nga palë të treta."]
    },
    ekipi: {
      kicker: "Ekipi",
      title: "Kontribuesit e projekteve",
      description:
        "Revolucioni Flamingo mbështetet nga vullnetarë nga vende të ndryshme. Më poshtë disa nga kontribuesit - një listë ende jo e plotë, që rritet ndërsa organizohemi.",
      members: [
        "08OBNE",
        "anon",
        "arm'e lule",
        "Burbuqja",
        "Chinchilla",
        "Doktor Gjilpëra",
        "Er11",
        "Ermira",
        "Etrid",
        "Gjin",
        "Gled",
        "Gyce",
        "hydrahydra",
        "Labja",
        "Leli Uri",
        "Low-perry",
        "MadBrOop",
        "mamijot",
        "Mohikani i Fundit",
        "mosmelodh980",
        "pomodoren",
        "Prytaneis",
        "relxino",
        "RnBBnB",
        "SSD",
        "toci.tp",
        "wutdufuq.btc",
        "Xano",
        "XhoniVL",
        "zulfinho",
        "mitso",
        "johnyvista",
        "elthirtie"
      ],
      moreLabel: "+ 320 kontribues"
    },
    partneret: {
      kicker: "Partnerët",
      title: "Organizata mike",
      description:
        "Lista e partnerëve po ndërtohet. Këtu do të shfaqen organizatat, mediat dhe iniciativat qytetare që mbështesin Revolucionin Flamingo.",
      categories: ["Organizata qytetare.", "Media të pavarura.", "Iniciativa komunitare."]
    },
    kontakt: {
      kicker: "Na kontaktoni",
      title: "Kontakt",
      lead: "Për pyetje, media, materiale ose koordinim, na shkruani në adresën zyrtare të Revolucionit Flamingo.",
      email: "info@flamingorevolution.eu",
      emailKicker: "Email zyrtar",
      emailNote: "Përgjigjemi sa më shpejt që të jetë e mundur.",
      emailCta: "Dërgo email"
    }
  },
  en: {
    meta: {
      title: "About Us | Flamingo Revolution",
      description:
        "The mission, partners and contact details of Flamingo Revolution, gathered on a single page."
    },
    hero: {
      eyebrow: "About us",
      title: "About Us",
      lead: "Who we are, what we work toward, and how to reach or partner with Flamingo Revolution.",
      primaryCta: "Share your opinion",
      secondaryCta: "See the mission",
      panelTitle: "On this page",
      panelLinks: [
        { label: "Mission", href: "#misioni" },
        { label: "Ground rules", href: "#rregullorja" },
        { label: "Team", href: "#ekipi" },
        { label: "Transparency", href: "#transparenca" },
        { label: "Partners", href: "#partneret" },
        { label: "Contact", href: "#kontakt" }
      ]
    },
    misioni: {
      kicker: "Mission",
      title: "Our mission",
      description:
        "Flamingo Revolution creates spaces where people can stay informed, speak up and work together on issues of public interest. We turn civic energy into ideas, documentation and collective action.",
      principles: ["Open information.", "Civic participation.", "Collective action."]
    },
    rregullorja: {
      kicker: "Ground rules",
      title: "The minimal ruleset",
      description: "We don't have many rules — just a few, easy to remember.",
      rules: ["RnBBnB.", "Common sense.", "Respect the lagoon, not the concrete.", "Contribute, don't bicker.", "No rush, no drama."]
    },
    transparenca: {
      kicker: "Transparency",
      title: "Entirely volunteer work",
      description:
        "Everything here — from this site to the protest documentation — is built by volunteers, on their own time and with their own tools, with no financial interest or outside backing involved.",
      points: ["No one gets paid.", "No funding from third parties.", "We cover the costs ourselves."]
    },
    ekipi: {
      kicker: "Team",
      title: "The people behind Flamingo Revolution",
      description:
        "Flamingo Revolution is kept going by volunteers and contributors from across Albania and the diaspora. Below, in alphabetical order, are some of the people who have contributed so far - not yet a complete list, and it keeps growing as we organize.",
      members: [
        "08OBNE",
        "anon",
        "arm'e lule",
        "Burbuqja",
        "Chinchilla",
        "Er11",
        "Ermira",
        "Etrid",
        "Gjin",
        "Gled",
        "Gyce",
        "hydrahydra",
        "Labja",
        "Leli Uri",
        "Low-perry",
        "MadBrOop",
        "mamijot",
        "Mohikani i Fundit",
        "mosmelodh980",
        "pomodoren",
        "Prytaneis",
        "relxino",
        "RnBBnB",
        "SSD",
        "toci.tp",
        "wutdufuq.btc",
        "Xano",
        "XhoniVL",
        "zulfinho"
      ],
      moreLabel: "+ 320 kontribues"
    },
    partneret: {
      kicker: "Partners",
      title: "The organizations and initiatives standing with us",
      description:
        "The partner list is being built. Organizations, media and civic initiatives supporting Flamingo Revolution will appear here.",
      categories: ["Civic organizations.", "Independent media.", "Community initiatives."]
    },
    kontakt: {
      kicker: "Contact us",
      title: "Contact",
      lead: "For questions, media, materials or coordination, write to the official Flamingo Revolution address.",
      email: "info@flamingorevolution.eu",
      emailKicker: "Official email",
      emailNote: "We will respond as soon as possible.",
      emailCta: "Send email"
    }
  }
};
