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
  panelCTA: string;
  formLabel: string;
  documentsCta: string;
  composePlaceholder: string;
  composeHint: string;
  countLabel: string;
  sortLabel: string;
  sortPopular: string;
  sortControversial: string;
  sortNewest: string;
  sortOldest: string;
  feedKicker: string;
  feedTitle: string;
  feedDescription: string;
  note: string;
  loadingLabel: string;
  emptyLabel: string;
  errorLabel: string;
  submitErrorLabel: string;
  ideaBadge: string;
  anonymousLabel: string;
  expandLabel: string;
  collapseLabel: string;
  upvoteLabel: string;
  downvoteLabel: string;
  dialogTitle: string;
  dialogNameLabel: string;
  dialogNamePlaceholder: string;
  dialogSkipLabel: string;
  dialogContinueLabel: string;
};

export const ideasPageCopy: Record<Locale, IdeasPageCopy> = {
  sq: {
    meta: {
      title: "Idete tuaja | Revolucioni Flamingo",
      description: "Ide qytetare te publikuara ne Revolucioni Flamingo."
    },
    kicker: "Zeri qytetar",
    title: ["Idete", "tuaja"],
    description:
      "Nje vend i hapur per propozime, shqetesime dhe pune konkrete qe mund te vazhdojne pas protestes.",
    panelTitle: "Shkruaj dhe propozo",
    panelText:
			"Dergo idene ketu. Ajo shfaqet ne listen publike dhe mund te vleresohet nga te tjeret.",
		panelCTA: 'Na kontaktoni',
    formLabel: "Dergo idene",
    documentsCta: "Shiko projektligjet",
    composePlaceholder: "Shkruaj idene tende ketu...",
    composeHint: "Mbajeni te qarte dhe konkrete. Pa te dhena personale.",
    countLabel: "Ide te publikuara",
    sortLabel: "Rendit",
    sortPopular: "Popullore",
    sortControversial: "Te diskutueshme",
    sortNewest: "Me te rejat",
    sortOldest: "Me te vjetrat",
    feedKicker: "Lista publike",
    feedTitle: "Propozimet e publikuara",
    feedDescription:
      "Ketu dalin idete qe jane gati per t'u lexuar, diskutuar dhe kthyer ne hapa konkrete.",
    note:
      "Mos vendos te dhena personale ne propozim. Idete me fyerje, spam ose te dhena private nuk publikohen.",
    loadingLabel: "Duke ngarkuar idete...",
    emptyLabel: "Ende nuk ka ide te publikuara.",
    errorLabel: "Te dhenat nuk u ngarkuan. Kontrollo konfigurimin e API-se.",
    submitErrorLabel: "Ideja nuk u dergua. Provo perseri.",
    ideaBadge: "Ide qytetare",
    anonymousLabel: "Anonim",
    expandLabel: "Trego me shume",
    collapseLabel: "Trego me pak",
    upvoteLabel: "Vote pozitive",
    downvoteLabel: "Vote negative",
    dialogTitle: "Ideja jote u publikua me sukses!",
    dialogNameLabel: "Emri (opsional)",
    dialogNamePlaceholder: "Si te quajme?",
    dialogSkipLabel: "Jo, vazhdo anonim",
    dialogContinueLabel: "Vazhdo"
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
    panelTitle: "Write and propose",
    panelText:
			"Send your idea here. It appears in the public list and can be rated by others.",
		panelCTA: "Contact us",
    formLabel: "Send idea",
    documentsCta: "View draft laws",
    composePlaceholder: "Write your idea here...",
    composeHint: "Keep it clear and concrete. No personal data.",
    countLabel: "Published ideas",
    sortLabel: "Sort",
    sortPopular: "Popular",
    sortControversial: "Controversial",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    feedKicker: "Public list",
    feedTitle: "Approved proposals",
    feedDescription:
      "These are the ideas ready to be read, discussed and turned into concrete next steps.",
    note:
      "Do not include personal data in your proposal. Ideas with abuse, spam or private data are not published.",
    loadingLabel: "Loading ideas...",
    emptyLabel: "No ideas have been published yet.",
    errorLabel: "Data could not be loaded. Check the API configuration.",
    submitErrorLabel: "The idea could not be sent. Try again.",
    ideaBadge: "Civic idea",
    anonymousLabel: "Anonymous",
    expandLabel: "Show more",
    collapseLabel: "Show less",
    upvoteLabel: "Upvote",
    downvoteLabel: "Downvote",
    dialogTitle: "Your idea was published successfully!",
    dialogNameLabel: "Name (optional)",
    dialogNamePlaceholder: "What should we call you?",
    dialogSkipLabel: "No, stay anonymous",
    dialogContinueLabel: "Continue"
  }
};
