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
  partneret: {
    kicker: string;
    title: string;
    description: string;
    placeholderLabel: string;
    note: string;
    ctaLabel: string;
  };
  kontakt: {
    kicker: string;
    title: string;
    lead: string;
    email: string;
    emailKicker: string;
    emailNote: string;
    emailCta: string;
    ideasTitle: string;
    ideasText: string;
    socialTitle: string;
  };
};

export const aboutPageCopy: Record<Locale, AboutPageCopy> = {
  sq: {
    meta: {
      title: "Rreth Nesh | Revolucioni Flamingo",
      description:
        "Misioni, partneret dhe kontaktet e Revolucionit Flamingo, te mbledhura ne nje faqe te vetme."
    },
    hero: {
      eyebrow: "Rreth nesh",
      title: "Rreth Nesh",
      lead: "Kush jemi, per cfare punojme dhe si mund te na kontaktoni ose te bashkepunoni me Revolucionin Flamingo.",
      primaryCta: "Jepni mendimin tuaj",
      secondaryCta: "Shiko misionin",
      panelTitle: "Ne kete faqe",
      panelLinks: [
        { label: "Misioni", href: "#misioni" },
        { label: "Partneret", href: "#partneret" },
        { label: "Kontakt", href: "#kontakt" }
      ]
    },
    misioni: {
      kicker: "Misioni",
      title: "Misioni yne",
      description:
        "Revolucioni Flamingo krijon hapesira ku qytetaret mund te informohen, te shprehin mendimin e tyre dhe te bashkepunojne per ceshtje me interes publik. Ne e kthejme energjine qytetare ne ide, dokumentim dhe veprim te perbashket.",
      principles: ["Informim i hapur.", "Pjesemarrje qytetare.", "Veprim i perbashket."]
    },
    partneret: {
      kicker: "Partneret",
      title: "Organizatat dhe iniciativat qe qendrojne krah nesh",
      description:
        "Lista e partnereve po ndertohet. Ketu do te shfaqen organizatat, median dhe iniciativat qytetare qe mbeshtesin Revolucionin Flamingo.",
      placeholderLabel: "Partner se shpejti",
      note: "Perfaqesoni nje organizate qe deshiron te bashkepunoje?",
      ctaLabel: "Na kontaktoni"
    },
    kontakt: {
      kicker: "Na kontaktoni",
      title: "Kontakt",
      lead: "Per pyetje, media, materiale ose koordinim, na shkruani ne adresen zyrtare te Revolucionit Flamingo.",
      email: "info@flamingorevolution.eu",
      emailKicker: "Email zyrtar",
      emailNote: "Pergjigjemi sa me shpejt qe te jete e mundur.",
      emailCta: "Dergo email",
      ideasTitle: "Mendime dhe propozime",
      ideasText:
        "Per te ndare problematika, ide ose propozime qytetare, plotesoni formularin me poshte.",
      socialTitle: "Rrjetet sociale"
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
    partneret: {
      kicker: "Partners",
      title: "The organizations and initiatives standing with us",
      description:
        "The partner list is being built. Organizations, media and civic initiatives supporting Flamingo Revolution will appear here.",
      placeholderLabel: "Partner coming soon",
      note: "Represent an organization that wants to work with us?",
      ctaLabel: "Get in touch"
    },
    kontakt: {
      kicker: "Contact us",
      title: "Contact",
      lead: "For questions, media, materials or coordination, write to the official Flamingo Revolution address.",
      email: "info@flamingorevolution.eu",
      emailKicker: "Official email",
      emailNote: "We will respond as soon as possible.",
      emailCta: "Send email",
      ideasTitle: "Opinions and proposals",
      ideasText:
        "To share civic problems, ideas or proposals, use the form so we can collect them clearly and structurally.",
      socialTitle: "Social channels"
    }
  }
};
