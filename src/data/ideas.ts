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
      title: "Idetë tuaja — propozime qytetare | Revolucioni Flamingo",
      description:
        "Dërgo, lexo dhe voto ide për interesin publik. Laboratori i hapur i Revolucionit Flamingo."
    },
    kicker: "Zëri qytetar",
    title: ["Idetë", "tuaja"],
    description:
      "Një vend i hapur për propozime, shqetësime dhe punë konkrete që mund të vazhdojnë pas protestës.",
    panelTitle: "Shkruaj dhe propozo",
    panelText:
			"Dërgo idenë këtu. Ajo shfaqet në listën publike dhe mund të vlerësohet nga të tjerët.",
		panelCTA: 'Na kontaktoni',
    formLabel: "Dërgo idenë",
    documentsCta: "Shiko projektligjet",
    composePlaceholder: "Shkruaj idenë tënde këtu...",
    composeHint: "Mbajeni të qartë dhe konkrete. Pa të dhëna personale.",
    countLabel: "Ide të publikuara",
    sortLabel: "Rendit",
    sortPopular: "Popullore",
    sortControversial: "Të diskutueshme",
    sortNewest: "Më të rejat",
    sortOldest: "Më të vjetrat",
    feedKicker: "Lista publike",
    feedTitle: "Propozimet e publikuara",
    feedDescription:
      "Këtu dalin idetë që janë gati për t'u lexuar, diskutuar dhe kthyer në hapa konkrete.",
    note:
      "Mos vendos të dhëna personale në propozim. Idetë me fyerje, spam ose të dhëna private nuk publikohen.",
    loadingLabel: "Duke ngarkuar idetë...",
    emptyLabel: "Ende nuk ka ide të publikuara.",
    errorLabel: "Të dhënat nuk u ngarkuan. Kontrollo konfigurimin e API-së.",
    submitErrorLabel: "Ideja nuk u dërgua. Provo përsëri.",
    ideaBadge: "Ide qytetare",
    anonymousLabel: "Anonim",
    expandLabel: "Trego më shumë",
    collapseLabel: "Trego më pak",
    upvoteLabel: "Vote pozitive",
    downvoteLabel: "Vote negative",
    dialogTitle: "Ideja jote u publikua me sukses!",
    dialogNameLabel: "Emri (opsional)",
    dialogNamePlaceholder: "Si të të quajmë?",
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
