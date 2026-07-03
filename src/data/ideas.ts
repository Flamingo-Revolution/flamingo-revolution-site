import type { Locale } from "./site";

type IdeasPageCopy = {
  meta: {
    title: string;
    description: string;
  };
  kicker: string;
  title: string[];
  description: string;
  panelTitle: string;
  panelText: string;
  formUrl: string;
  formLabel: string;
  countLabel: string;
  feedKicker: string;
  feedTitle: string;
  feedDescription: string;
  note: string;
  loadingLabel: string;
  emptyLabel: string;
  errorLabel: string;
  ideaBadge: string;
  expandLabel: string;
  collapseLabel: string;
};

export const ideasPageCopy: Record<Locale, IdeasPageCopy> = {
  sq: {
    meta: {
      title: "Idete tuaja | Revolucioni Flamingo",
      description:
        "Ide qytetare te publikuara per Revolucionin Flamingo dhe Shqiperine e re."
    },
    kicker: "Zeri qytetar",
    title: ["Idete", "tuaja"],
    description:
      "Nje vend i hapur per propozime, shqetesime dhe pune konkrete qe mund te vazhdojne pas protestes.",
    panelTitle: "Nga formulari te lista publike",
    panelText:
      "Propozimet mblidhen me formular, kontrollohen dhe shfaqen ketu pasi miratohen.",
    formUrl: "https://forms.gle/8Bn2rFevSbkuCv8A7",
    formLabel: "Dergo nje ide",
    countLabel: "Ide te publikuara",
    feedKicker: "Lista publike",
    feedTitle: "Propozimet e publikuara",
    feedDescription:
      "Ketu dalin idete qe jane gati per t'u lexuar, diskutuar dhe kthyer ne hapa konkrete.",
    note:
      "Mos vendos te dhena personale ne propozim. Idete me fyerje, spam ose te dhena private nuk publikohen.",
    loadingLabel: "Duke ngarkuar idete...",
    emptyLabel: "Ende nuk ka ide te publikuara.",
    errorLabel: "Te dhenat nuk u ngarkuan. Kontrollo konfigurimin e API-se.",
    ideaBadge: "Ide qytetare",
    expandLabel: "Trego me shume",
    collapseLabel: "Trego me pak"
  },
  en: {
    meta: {
      title: "Your ideas | Flamingo Revolution",
      description:
        "Published civic ideas for the Flamingo Revolution and a new Albania."
    },
    kicker: "Civic voice",
    title: ["Your", "ideas"],
    description:
      "An open place for proposals, concerns and concrete work that can continue after the protest.",
    panelTitle: "From form to public list",
    panelText:
      "Proposals are collected through a form, reviewed and shown here after approval.",
    formUrl: "https://forms.gle/8Bn2rFevSbkuCv8A7",
    formLabel: "Send an idea",
    countLabel: "Published ideas",
    feedKicker: "Public list",
    feedTitle: "Approved proposals",
    feedDescription:
      "These are the ideas ready to be read, discussed and turned into concrete next steps.",
    note:
      "Do not include personal data in your proposal. Ideas with abuse, spam or private data are not published.",
    loadingLabel: "Loading ideas...",
    emptyLabel: "No ideas have been published yet.",
    errorLabel: "Data could not be loaded. Check the API configuration.",
    ideaBadge: "Civic idea",
    expandLabel: "Show more",
    collapseLabel: "Show less"
  }
};
