import type { Locale } from "./site";

type ProtestEntry = {
  date: string;
  title: string;
  location: string;
  body: string;
  status: string;
  // News coverage of this specific event, so the card links out to a
  // primary source instead of just illustrating the timeline.
  href?: string;
  // Real photo, credited in photoCredit below. Falls back to
  // photoPlaceholderLabel when absent.
  image?: { src: string; alt: string };
  // Part of the environmental thread — shown as a small badge on the card.
  env?: boolean;
};

type InfoCard = { title: string; body: string; href?: string; linkLabel?: string };

type SpeciesCard = { title: string; meta: string; description: string; image: { src: string; alt: string } };

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
  // Every content section on this page shares one shape: title,
  // description, a picture or a list of cards, then a closing button (see
  // protestat.astro). "Pse nisi protesta" is the opening explainer, closed
  // with a link to the full write-up on the blog.
  arsyeja: {
    kicker: string;
    title: string;
    description: string;
    image: { src: string; alt: string };
    articleLabel: string;
  };
  // "Më shumë se flamingo" — the species sharing the Vjosë-Narta habitat.
  // No separate lead image here: the CardSlider itself is the picture slot.
  speciesSection: {
    kicker: string;
    title: string;
    description: string;
    sourceLabel: string;
  };
  speciesCards: SpeciesCard[];
  speciesCredit: string;
  // "Arsyet e tjera" — the non-environmental half of the cause (opacity,
  // state capture, favored investors), pointing into Flamingo Dossier.
  arsyetTjera: {
    kicker: string;
    title: string;
    description: string;
    image: { src: string; alt: string };
    dossierLabel: string;
    // Short, no-picture cards naming the other grievances feeding the
    // protest, beyond the environmental case.
    topics: string[];
  };
  historiku: {
    kicker: string;
    title: string;
    description: string;
    // Badge chip shown on cards where entry.env is true.
    envBadgeLabel: string;
    timeline: ProtestEntry[];
  };
  // Fallback for timeline cards without a real photo yet.
  photoPlaceholderLabel: string;
  photoCredit: string;
  // Base label for each card's "read the article" link; protestat.astro
  // appends " (hostname) →" from the entry's href.
  newsLinkLabel: string;
  mapReferenceLabel: string;
  // Merged in from the former standalone /kerkesat/ page (now redirects
  // here). List items come from siteCopy's hero.demands (v1) and
  // data/demands.ts's demandsV2 (v2), so nothing drifts out of sync.
  kerkesat: {
    kicker: string;
    title: string;
    description: string;
    versioni1Title: string;
    versioni1Description: string;
    versioni2Title: string;
    versioni2Description: string;
  };
  waySection: {
    kicker: string;
    title: string;
    description: string;
    // Closing button linking to /referendum/.
    referendumLabel: string;
  };
  wayCards: InfoCard[];
};

export const protestsPageCopy: Record<Locale, ProtestsPageCopy> = {
  sq: {
    meta: {
      title: "Cilat protesta? | Revolucioni Flamingo",
      description:
        "Cilat protesta u bënë, në sa qytete e për sa kohë, çfarë rrezikohet dhe cila është rrugëdalja: gjithçka e mbledhur në një faqe të vetme."
    },
    hero: {
      eyebrow: "Cilat protesta?",
      title: "Protestat Flamingo",
      lead: "Nga shkëndija e parë në Zvërnec deri te mobilizimi kombëtar lokal dhe ai i diasporës: numrat pas lëvizjes, kronologjia dhe fotot e mbledhura nga rruga.",
      primaryCta: "Jepni mendimin tuaj",
      secondaryCta: "Shiko hartën",
      panelTitle: "Në këtë faqe",
      panelLinks: [
        { label: "Mjedisi", href: "#specie" },
        { label: "Arsyet e tjera", href: "#arsyet-tjera" },
        { label: "Kronologjia", href: "#historiku" },
        { label: "Kërkesat", href: "#kerkesat" },
        { label: "Rrugëdalja", href: "#rrugedalja" }
      ]
    },
    arsyeja: {
      kicker: "Arsyeja e nisjes",
      title: "Pse nisi protesta",
      description:
        "Protestat e Revolucionit Flamingo nuk filluan si një debat abstrakt. Filluan nga frika konkrete se bregdeti dhe zonat e mbrojtura po jepeshin pa transparencë të plotë. Zvërneci u bë pika e kthesës: pamjet e përplasjes dhe mungesa e ndërhyrjes së qartë e kthyen një konflikt lokal në një valë më të gjerë qytetare.",
      image: { src: "/images/zverneci.jpg", alt: "Zvërneci dhe Laguna e Nartës nga lart" },
      articleLabel: "Lexo artikullin e plotë →"
    },
    speciesSection: {
      kicker: "Kush jeton këtu",
      title: "Më shumë se flamingo",
      description:
        "Laguna e Nartës është Zonë e Rëndësishme për Shpendët (IBA), me mbi 200 gjallesa të regjistruara — nga flamingot te pelikanët dhe breshkat e detit.",
      sourceLabel: "Mëso më shumë te PPNEA →"
    },
    speciesCards: [
      {
        title: "Dunat ranore",
        meta: "Mes lagunës dhe detit",
        description:
          "Dunat e Pishë Poro-Nartës arrijnë 6-8 metra lartësi dhe mbajnë larg ujin e kripur nga laguna — pikërisht ato po rrafshohen nga punimet.",
        image: { src: "/images/protests/dunat.jpg", alt: "Vija e dunave ranore mes lagunës dhe detit, në grykëderdhjen e Vjosës" }
      },
      {
        title: "Deti dhe pishat",
        meta: "Bregdeti i Vjosë-Nartës",
        description:
          "Këtu deti nuk përplaset me shkëmbinj: bregu është rërë e pisha, siç e tregon edhe vetë emri Pishë Poro-Narta, mes pak brigjeve ende të paprekura të Adriatikut, brenda Peizazhit të Mbrojtur Vjosë-Nartë.",
        image: { src: "/images/zverneci.jpg", alt: "Bregu me rërë e pisha i Zvërnecit dhe Lagunës së Nartës, nga lart" }
      },
      {
        title: "Flamingoja",
        meta: "Phoenicopterus roseus",
        description: "Deri në 3,000 flamingo vëzhgohen në lagunë; kohët e fundit kanë nisur edhe të folenizojnë këtu.",
        image: { src: "/images/species/flamingo.jpg", alt: "Dy flamingo në ujërat e cekëta të një lagune" }
      },
      {
        title: "Pelikani kaçurrel",
        meta: "Pelecanus crispus",
        description: "Pelikan i rrezikuar globalisht, ndër më të rrallët në lagunat e Ballkanit.",
        image: { src: "/images/species/pelikani-kacurrel.jpg", alt: "Pelikan kaçurrel mbi një gur pranë ujit" }
      },
      {
        title: "Pelikani i bardhë",
        meta: "Pelecanus onocrotalus",
        description: "Vizitor i rregullt i lagunës gjatë stinës së migrimit mes Evropës dhe Afrikës.",
        image: { src: "/images/species/pelikani-i-bardhe.jpg", alt: "Pelikan i bardhë në breg" }
      },
      {
        title: "Corromani gri",
        meta: "Ardea cinerea",
        description: "Një nga zogjtë ujorë më të shpeshtë në brigjet e lagunës dhe rreth kanaleve të saj.",
        image: { src: "/images/species/corromani-gri.jpg", alt: "Corromani gri mbi një trung pranë bimësisë" }
      },
      {
        title: "Breshka e detit",
        meta: "Caretta caretta",
        description: "Breshkë deti e rrezikuar që përdor bregdetin e Vjosë-Nartës si zonë ushqyerjeje.",
        image: { src: "/images/species/breshka-e-detit.jpg", alt: "Breshkë deti duke notuar nën ujë" }
      },
      {
        title: "Foka e Mesdheut",
        meta: "Monachus monachus",
        description: "Një nga gjitarët detarë më të rrezikuar në botë, i vëzhguar herë pas here në këtë bregdet.",
        image: { src: "/images/species/foka-e-mesdheut.jpg", alt: "Fokë e Mesdheut mbi zallin e bregut" }
      }
    ],
    speciesCredit:
      "Foto: Giles Laurent, Dr. Raju Kasambe, Charles J. Sharp, Alexis Lours, ukanda, Marinko Babić, Piotr Bednarek, Julianruizp — Wikimedia Commons (CC BY / CC BY-SA).",
    arsyetTjera: {
      kicker: "Përtej mjedisit",
      title: "Arsyet e protestave",
      description:
        "Protestat u zgjeruan shpejt në një akuzë më të gjerë ndaj mungesës së transparencës, kapjes së shtetit dhe shitjes së interesit publik te investitorë të favorizuar. Flamingo Dossier mbledh provat pas këtyre pretendimeve.",
      image: {
        src: "/images/projects/dossier.webp",
        alt: "Harta e lidhjeve në Flamingo Dossier, mes dosjeve, institucioneve dhe personave"
      },
      dossierLabel: "Shiko 40+ dosjet →",
      topics: [
        "Korrupsioni dhe abuzimi i fondeve publike",
        "Keqqeverisja dhe mungesa e llogaridhënies",
        "Shëndetësia dhe/apo Arsimi",
        "Trashëgimia natyrore dhe kulturore",
        "Emigrimi i të rinjve dhe shpopullimi",
        "Varfëria dhe rritja e çmimeve",
        "Përfaqësimi politik dhe demokracia",
        "Mungesa e perspektivës për të ardhmen",
        "Mungesa e drejtësisë dhe mbrojtjes të të drejtave",
        "Ligjet e privatizimit pa kriter (psh 21/2024)",
        "Frustrimi me arrogancën e pushtetit",
        "Kontributi në mëmëdhe i vështirë"
      ]
    },
    historiku: {
      kicker: "Historiku",
      title: "Kronologjia e lëvizjes",
      description:
        "Që nga shkëndija e parë në Akërni e deri te java e fundit e mbledhur: kronologjia e plotë, me data, vendndodhje dhe status.",
      envBadgeLabel: "Mjedisor",
      timeline: [
        {
          date: "16 Maj 2026",
          title: "Akërni",
          location: "Vlorë (Akërni, Pishë Poro-Narta)",
          body: "Protesta e parë publike pranë kantierit të ndërtimit në Akërni, Pishë Poro-Narta.",
          status: "E konfirmuar",
          href: "https://citizens.al/2026/05/18/narte-qytetaret-rrezojne-gardhin-dhe-zbulojne-fadromat-ne-zonen-e-mbrojtur/",
          image: { src: "/images/protests/akerni.jpg", alt: "Protestues duke marshuar pranë gardhit të kantierit në Akërni" },
          env: true
        },
        {
          date: "23 Maj 2026",
          title: "Laguna e Nartës",
          location: "Vlorë",
          body: "Tubim kundër ndërtimeve në një zonë ligatinore të mbrojtur.",
          status: "E konfirmuar",
          href: "https://citizens.al/2026/05/25/narte-zona-e-mbrojtur-rrethohet-nga-telat-me-gjemba/",
          image: { src: "/images/protests/laguna-e-nartes.jpg", alt: "Tufë flamingosh duke fluturuar mbi Lagunën e Nartës" },
          env: true
        },
        {
          date: "30 Maj 2026",
          title: "Zvërneci",
          location: "Zvërnec / Portonovo, Vlorë",
          body: "Një protestues tërhiqet zvarrë nga siguria private në Zvërnec, ndërkohë që Policia e Shtetit ishte e pranishme dhe nuk ndërhyri. Pamjet bëhen shkëndija kryesore e mobilizimit.",
          status: "E konfirmuar",
          href: "https://citizens.al/2026/05/31/shqiperia-nuk-shitet-dhuna-ne-zvernec-ndez-protesten-ne-tirane/",
          image: { src: "/images/zverneci.jpg", alt: "Zvërneci dhe Laguna e Nartës nga lart" },
          env: true
        },
        {
          date: "31 Maj 2026",
          title: "Tirana",
          location: "Tiranë",
          body: "Marshimi zhvendoset në kryeqytet, nga Drejtoria e Policisë te Ministria e Brendshme dhe më pas te Kryeministria.",
          status: "E konfirmuar",
          href: "https://citizens.al/2026/06/01/protesta-nga-zverneci-deri-ne-rrjoll-shqiptaret-po-thone-boll/",
          image: { src: "/images/protests/tirana-31-maj.jpg", alt: "Pamje nga lart e turmës së protestuesve në bulevardin e Tiranës" }
        },
        {
          date: "4 Qershor 2026",
          title: "Vala kombëtare",
          location: "8 qytete shqiptare",
          body: "Protesta shpërthejnë njëkohësisht në tetë qytete shqiptare dhe fillojnë tubimet e para të diasporës.",
          status: "E konfirmuar",
          href: "https://citizens.al/2026/06/07/tete-dite-proteste-nga-narta-te-shqiperia-e-re/",
          image: { src: "/images/protests/vala-kombetare.jpg", alt: "Turmë protestuesish me pankarta para Kryeministrisë në Tiranë" }
        },
        {
          date: "6 Qershor 2026",
          title: "Plazhi i Dalanit",
          location: "Dalan / Zvërnec",
          body: "Vazhdim i protestave në zonën bregdetare të prekur.",
          status: "E konfirmuar",
          href: "https://gazeta-shqip.com/aktualiteti/save-narta-protesta-kunder-resortit-ne-zvernec-qytetaret-marshim-nga-plazhi-i-dalanit-ne-portonov/",
          image: { src: "/images/protests/dalan.jpg", alt: "Protestuesit formojnë shkronjat \"SAVE NARTA\" në plazhin e Dalanit, pamje nga ajri" },
          env: true
        },
        {
          date: "13 Qershor 2026",
          title: "100 mijë në Tiranë",
          location: "Tiranë, qendër",
          body: "Një nga tubimet më të mëdha të lëvizjes, me mbështetje të gjerë nga diaspora.",
          status: "E konfirmuar",
          href: "https://gazetadita.al/foto-lume-njerezor-ne-bulevard-shqiperia-perjeton-protesten-me-te-madhe-pas-renies-se-komunizmit/",
          image: { src: "/images/protests/100-mije-ne-tirane.jpg", alt: "Lumë njerëzish me flamuj shqiptarë në bulevardin e Tiranës" }
        },
        {
          date: "13 Qershor 2026",
          title: "Rrjolli",
          location: "Rrjoll",
          body: "Kundër një tjetër projekti resorti në zonë të mbrojtur.",
          status: "E konfirmuar",
          href: "https://citizens.al/2026/06/13/nje-tjeter-gardh-bie-banoret-e-rrjollit-protestojne-kunder-punimeve-per-resortin-turistik/",
          image: { src: "/images/protests/rrjolli.jpg", alt: "Banorë duke shqyer gardhin me tela me gjemba në Rrjoll, me flamurin shqiptar" },
          env: true
        },
        {
          date: "14 Qershor 2026",
          title: "Drejt Rinasit",
          location: "Autostrada Tiranë-Durrës",
          body: "Marshimi përgjatë autostradës Tiranë-Durrës drejt aeroportit.",
          status: "E konfirmuar",
          href: "https://euronews.al/dita-e-15-te-e-protestes-marshim-ne-autostraden-tirane-durres/",
          image: { src: "/images/protests/drejt-rinasit.jpg", alt: "Protestues natën në autostradën Tiranë-Durrës" }
        },
        {
          date: "17 Qershor 2026",
          title: "Parlamenti Evropian",
          location: "Strasburg",
          body: "Parlamenti Evropian kërkon shfuqizimin e ndryshimeve të vitit 2024 në Ligjin për Zonat e Mbrojtura dhe një moratorium të menjëhershëm mbi ndërtimet e reja në zona të mbrojtura.",
          status: "E konfirmuar",
          href: "https://citizens.al/en/2026/06/17/European-Parliament-calls-for-ban-on-construction-in-protected-areas/",
          image: { src: "/images/protests/parlamenti-evropian.jpg", alt: "Salla e Parlamentit Evropian në Strasburg, mbivendosur me një pankartë protestuesish" }
        },
        {
          date: "20-22 Qershor 2026",
          title: "Java e 21-të",
          location: "Bulevardi Dëshmorët e Kombit, Tiranë",
          body: "Mbi 25 mijë pjesëmarrës, e shoqëruar nga proteste në dhjetëra qytete të diasporës.",
          status: "E konfirmuar",
          href: "https://citizens.al/2026/06/23/pas-23-ditesh-proteste-qytetaret-artikulojne-pese-kerkesa-ndaj-qeverise/",
          image: { src: "/images/protests/java-e-21.jpg", alt: "Protestuesit natën në bulevardin e Tiranës, me flamuj kuq e zi" }
        },
        {
          date: "21 Qershor 2026",
          title: "Kakome",
          location: "Kakome",
          body: "Banorë kundër zhvillimit që rrezikon gjirin e mbrojtur të Kakomës.",
          status: "E konfirmuar",
          href: "https://citizens.al/en/2026/06/21/After-the-red-and-yellow-berry-and-the-pear--the-Kakomese-fence-also-falls./",
          image: { src: "/images/protests/kakome.jpg", alt: "Banorë duke prishur gardhin rrethues me kasolle në plazhin e Kakomës" },
          env: true
        },
        {
          date: "5 Korrik 2026",
          title: "Mërturi",
          location: "Lumi Mërtur, Nikaj-Mërtur",
          body: "Banorë të prekur nga ndërtimi i digave hidroenergjitike ngrenë shqetësimet e tyre.",
          status: "E konfirmuar",
          href: "https://citizens.al/2026/07/06/nikaj-merturi-organizohet-ne-proteste-per-mbrojtjen-e-lumit/",
          image: { src: "/images/protests/mertur.jpg", alt: "Lumi Mërtur dhe punimet pranë shtratit të tij, pamje nga ajri" },
          env: true
        },
        {
          date: "12-24 Korrik 2026",
          title: "Fundi i sesionit",
          location: "Kuvendi, Tiranë",
          body: "Protesta të përditshme gjatë javëve të fundit të sesionit parlamentar.",
          status: "E konfirmuar",
          href: "https://citizens.al/2026/07/27/nuk-na-perfaqesoniprotestuesit-perballe-kuvendit/",
          image: { src: "/images/protests/fundi-sesionit.jpg", alt: "Protestues përballë kordonit policor jashtë Kuvendit" }
        },
        {
          date: "Gusht - Shtator 2026",
          title: "Vazhdimi",
          location: "Tiranë, Mynih, Vjenë e më shumë",
          body: "\"Tirana Proteston!\" vazhdon çdo ditë, ndërsa kapitujt e diasporës mblidhen edhe në shtator.",
          status: "Vazhdim",
          href: "https://www.voal.ch/diaspora-zbarkon-ne-tirane-aktivisti-zbulon-detajet-e-protestave-me-14-15-dhe-16-gusht-karvane-makinash-nga-europa-drejt-bulevardit/",
          image: { src: "/images/protests/vazhdimi.jpg", alt: "Protestuesit natën para Kryeministrisë, me flamuj shqiptarë" }
        }
      ]
    },
    photoPlaceholderLabel: "Foto së shpejti",
    photoCredit:
      "Foto: Arbenllapashtica, Terfili, Albinfo, Matete Plays — Wikimedia Commons (CC BY / CC BY-SA 4.0); citizens.al, euronews.al, gazeta-shqip.com, voal.ch, birdlife.org — përdorur për qëllime informuese, me lidhje te artikulli origjinal.",
    newsLinkLabel: "Lexo lajmin",
    mapReferenceLabel: "Shiko 300+ protestat në hartë →",
    kerkesat: {
      kicker: "Kërkesat",
      title: "Kërkesat e protestës",
      description:
        "Që nga nisja e protestave, kërkesat e drejtuara qeverisë janë artikuluar në më shumë se një formulim: një version fillestar dhe një i zgjeruar.",
      versioni1Title: "Kërkesat fillestare",
      versioni1Description: "Kërkesat e para, lidhur drejtpërdrejt me shkakun që ndezi protestat.",
      versioni2Title: "Kërkesat e zgjeruara",
      versioni2Description: "Versioni i mëvonshëm, që shton kërkesa institucionale dhe kushtetuese."
    },
    waySection: {
      kicker: "Rruga përpara",
      title: "Rrugëdalja për zonat e mbrojtura",
      description:
        "Në qershor 2026 Parlamenti Europian kërkoi ndalimin e projektit dhe ndryshimin e ligjit që e mundësoi. Këto janë tri rrugët konkrete drejt zgjidhjes.",
      referendumLabel: "Shiko nismën e referendumit →"
    },
    wayCards: [
      {
        title: "Referendum kundër Ligjit 21/2024",
        body: "Një grup qytetarësh dhe aktivistësh mjedisorë ka nisur procedurat për një referendum që të shfuqizojë ligjin që hapi zonat e mbrojtura për ndërtim.",
        href: "/referendum/",
        linkLabel: "Si funksionon referendumi →"
      },
      {
        title: "Moratorium i menjëhershëm",
        body: "Parlamenti Europian kërkoi ndalim të menjëhershëm të çdo leje, ndërtimi apo ndërhyrjeje të re brenda zonave të mbrojtura, derisa ligji të ndryshohet."
      },
      {
        title: "Ndjekje penale për ata që lejuan shkeljet",
        body: "Ndërtimi në Pishë Poro-Nartë nisi pa u kryer më parë Vlerësimi i Ndikimit në Mjedis, siç e kërkon ligji. SPAK ka hapur hetim mbi pronësinë e tokës dhe procedurat e miratimit; qytetarët kërkojnë llogaridhënie penale për zyrtarët që e lejuan.",
        href: "/referendum/shkeljet-ligjore/",
        linkLabel: "Shiko kronologjinë e shkeljeve →"
      }
    ]
  },
  en: {
    meta: {
      title: "Which protests? | Flamingo Revolution",
      description:
        "Which protests happened, in how many cities and for how long, what's at stake and what the way out looks like — all gathered on a single page."
    },
    hero: {
      eyebrow: "Flamingo Protests",
      title: "Which protests?",
      lead: "From the first spark in Zvernec to the national and diaspora mobilization: the numbers behind the movement, the chronology and photos gathered from the streets.",
      primaryCta: "Share your opinion",
      secondaryCta: "See the map",
      panelTitle: "On this page",
      panelLinks: [
        { label: "Environment", href: "#specie" },
        { label: "Other reasons", href: "#arsyet-tjera" },
        { label: "Chronology", href: "#historiku" },
        { label: "Demands", href: "#kerkesat" },
        { label: "The way out", href: "#rrugedalja" }
      ]
    },
    arsyeja: {
      kicker: "Why it started",
      title: "Why the protest started",
      description:
        "The Flamingo Revolution protests didn't start as an abstract debate. They started from a concrete fear that the coastline and protected areas were being handed over without full transparency. Zvërnec became the turning point: footage of the clash, and the absence of any clear intervention, turned a local conflict into a wider civic wave.",
      image: { src: "/images/zverneci.jpg", alt: "Zvërnec island and the Narta Lagoon from above" },
      articleLabel: "Read the full article →"
    },
    speciesSection: {
      kicker: "Who lives here",
      title: "More than a flamingo",
      description:
        "The Narta lagoon is an Important Bird Area (IBA) with more than 200 recorded species — from flamingos to pelicans and sea turtles.",
      sourceLabel: "Learn more at PPNEA →"
    },
    speciesCards: [
      {
        title: "Sand dunes",
        meta: "The barrier between the lagoon and the sea",
        description:
          "The dunes of Pishë Poro-Narta reach 6-8 metres and keep saltwater out of the lagoon behind them — exactly what the works have been levelling.",
        image: { src: "/images/protests/dunat.jpg", alt: "The sand dune barrier between the lagoon and the sea, at the mouth of the Vjosa" }
      },
      {
        title: "The sea and the pines",
        meta: "The Vjosa-Narta coastline",
        description:
          "There are no cliffs here: the shore is sand and pine trees, as the name Pishë Poro-Narta (Poro-Narta pine forest) itself suggests, among the few still-untouched stretches of the Adriatic, inside the Vjosa-Narta Protected Landscape.",
        image: { src: "/images/zverneci.jpg", alt: "Zvërnec island and the sandy, pine-lined shore of the Narta Lagoon, from above" }
      },
      {
        title: "Greater flamingo",
        meta: "Phoenicopterus roseus",
        description: "Up to 3,000 flamingos are observed in the lagoon; they have recently started nesting here too.",
        image: { src: "/images/species/flamingo.jpg", alt: "Two flamingos in the shallow water of a lagoon" }
      },
      {
        title: "Dalmatian pelican",
        meta: "Pelecanus crispus",
        description: "A globally threatened pelican, among the rarest found in the Balkans' lagoons.",
        image: { src: "/images/species/pelikani-kacurrel.jpg", alt: "A Dalmatian pelican perched on a rock by the water" }
      },
      {
        title: "Great white pelican",
        meta: "Pelecanus onocrotalus",
        description: "A regular visitor to the lagoon during the migration season between Europe and Africa.",
        image: { src: "/images/species/pelikani-i-bardhe.jpg", alt: "A great white pelican standing on the shore" }
      },
      {
        title: "Grey heron",
        meta: "Ardea cinerea",
        description: "One of the most common waterbirds along the lagoon's shores and channels.",
        image: { src: "/images/species/corromani-gri.jpg", alt: "A grey heron perched on a log near vegetation" }
      },
      {
        title: "Loggerhead sea turtle",
        meta: "Caretta caretta",
        description: "A threatened sea turtle that uses the Vjosa-Narta coastline as a feeding ground.",
        image: { src: "/images/species/breshka-e-detit.jpg", alt: "A loggerhead sea turtle swimming underwater" }
      },
      {
        title: "Mediterranean monk seal",
        meta: "Monachus monachus",
        description: "One of the most endangered marine mammals in the world, occasionally spotted on this coast.",
        image: { src: "/images/species/foka-e-mesdheut.jpg", alt: "A Mediterranean monk seal on a pebble beach" }
      }
    ],
    speciesCredit:
      "Photos: Giles Laurent, Dr. Raju Kasambe, Charles J. Sharp, Alexis Lours, ukanda, Marinko Babić, Piotr Bednarek, Julianruizp — Wikimedia Commons (CC BY / CC BY-SA).",
    arsyetTjera: {
      kicker: "Beyond the environment",
      title: "Other reasons",
      description:
        "The protests quickly widened into a broader accusation of opacity, state capture and the sale of public interest to favored investors. Flamingo Dossier gathers the evidence behind those claims.",
      image: {
        src: "/images/projects/dossier.webp",
        alt: "The link map inside Flamingo Dossier, connecting cases, institutions and people"
      },
      dossierLabel: "See the documents in Flamingo Dossier →",
      topics: [
        "Corruption and the abuse of public funds",
        "Misgovernance and lack of accountability",
        "Healthcare and/or education",
        "Natural and cultural heritage",
        "Youth emigration and depopulation",
        "Poverty and rising prices",
        "Political representation and democracy",
        "No prospects for the future",
        "Lack of justice and protection of rights",
        "Unchecked privatization laws (e.g. Law 21/2024)",
        "Frustration with the arrogance of power",
        "How hard it is to contribute to the homeland"
      ]
    },
    historiku: {
      kicker: "History",
      title: "Chronology of the movement",
      description:
        "From the first spark in Akërni to the latest week collected: the full chronology, with dates, locations and status — including the distinct environmental flashpoints, marked 🌿.",
      envBadgeLabel: "Environmental",
      timeline: [
        {
          date: "May 16, 2026",
          title: "Akërni",
          location: "Vlorë (Akërni, Pishë Poro-Narta)",
          body: "The first public protest near the construction site in Akërni, Pishë Poro-Narta.",
          status: "Confirmed",
          href: "https://citizens.al/2026/05/18/narte-qytetaret-rrezojne-gardhin-dhe-zbulojne-fadromat-ne-zonen-e-mbrojtur/",
          image: { src: "/images/protests/akerni.jpg", alt: "Protesters marching past the construction-site fence in Akërni" },
          env: true
        },
        {
          date: "May 23, 2026",
          title: "Narta Lagoon",
          location: "Vlorë",
          body: "Gathering against building in a protected wetland.",
          status: "Confirmed",
          href: "https://citizens.al/2026/05/25/narte-zona-e-mbrojtur-rrethohet-nga-telat-me-gjemba/",
          image: { src: "/images/protests/laguna-e-nartes.jpg", alt: "A flock of flamingos flying over the Narta Lagoon" },
          env: true
        },
        {
          date: "May 30, 2026",
          title: "Zvërnec",
          location: "Zvërnec / Portonovo, Vlorë",
          body: "A protester is dragged by private security in Zvërnec while State Police officers were present and did not intervene. Footage becomes the main spark of the mobilization.",
          status: "Confirmed",
          href: "https://citizens.al/2026/05/31/shqiperia-nuk-shitet-dhuna-ne-zvernec-ndez-protesten-ne-tirane/",
          image: { src: "/images/zverneci.jpg", alt: "Zvërnec island and the Narta Lagoon from above" },
          env: true
        },
        {
          date: "May 31, 2026",
          title: "Tirana",
          location: "Tirana",
          body: "The march moves to the capital, from the police directorate to the interior ministry and then to the prime minister's office.",
          status: "Confirmed",
          href: "https://citizens.al/2026/06/01/protesta-nga-zverneci-deri-ne-rrjoll-shqiptaret-po-thone-boll/",
          image: { src: "/images/protests/tirana-31-maj.jpg", alt: "Aerial view of the crowd of protesters on Tirana's boulevard" }
        },
        {
          date: "June 4, 2026",
          title: "National wave",
          location: "8 Albanian cities",
          body: "Protests erupt at once in eight Albanian cities, and the first diaspora rallies begin.",
          status: "Confirmed",
          href: "https://citizens.al/2026/06/07/tete-dite-proteste-nga-narta-te-shqiperia-e-re/",
          image: { src: "/images/protests/vala-kombetare.jpg", alt: "Crowd of protesters holding banners outside the prime minister's office in Tirana" }
        },
        {
          date: "June 6, 2026",
          title: "Dalan beach",
          location: "Dalan / Zvërnec",
          body: "Continued protests in the affected coastal area.",
          status: "Confirmed",
          href: "https://gazeta-shqip.com/aktualiteti/save-narta-protesta-kunder-resortit-ne-zvernec-qytetaret-marshim-nga-plazhi-i-dalanit-ne-portonov/",
          image: { src: "/images/protests/dalan.jpg", alt: "Protesters spell out \"SAVE NARTA\" on Dalan beach, aerial view" },
          env: true
        },
        {
          date: "June 13, 2026",
          title: "100,000 in Tirana",
          location: "Central Tirana",
          body: "One of the movement's largest rallies, with broad diaspora support.",
          status: "Confirmed",
          href: "https://gazetadita.al/foto-lume-njerezor-ne-bulevard-shqiperia-perjeton-protesten-me-te-madhe-pas-renies-se-komunizmit/",
          image: { src: "/images/protests/100-mije-ne-tirane.jpg", alt: "A river of people carrying Albanian flags on Tirana's boulevard" }
        },
        {
          date: "June 13, 2026",
          title: "Rrjoll",
          location: "Rrjoll",
          body: "Against another resort project in a protected area.",
          status: "Confirmed",
          href: "https://citizens.al/2026/06/13/nje-tjeter-gardh-bie-banoret-e-rrjollit-protestojne-kunder-punimeve-per-resortin-turistik/",
          image: { src: "/images/protests/rrjolli.jpg", alt: "Residents tearing down a barbed-wire fence in Rrjoll, carrying the Albanian flag" },
          env: true
        },
        {
          date: "June 14, 2026",
          title: "Toward Rinas",
          location: "Tirana-Durrës highway",
          body: "The march along the Tirana–Durrës highway toward the airport.",
          status: "Confirmed",
          href: "https://euronews.al/dita-e-15-te-e-protestes-marshim-ne-autostraden-tirane-durres/",
          image: { src: "/images/protests/drejt-rinasit.jpg", alt: "Protesters at night on the Tirana-Durrës highway" }
        },
        {
          date: "June 17, 2026",
          title: "European Parliament",
          location: "Strasbourg",
          body: "The European Parliament calls for the repeal of the 2024 amendments to the Law on Protected Areas and an immediate moratorium on new construction within protected areas.",
          status: "Confirmed",
          href: "https://citizens.al/en/2026/06/17/European-Parliament-calls-for-ban-on-construction-in-protected-areas/",
          image: { src: "/images/protests/parlamenti-evropian.jpg", alt: "The European Parliament chamber in Strasbourg, overlaid with a protesters' banner" }
        },
        {
          date: "June 20-22, 2026",
          title: "Week 21",
          location: "Dëshmorët e Kombit Boulevard, Tirana",
          body: "Over 25,000 participants, accompanied by protests in dozens of diaspora cities.",
          status: "Confirmed",
          href: "https://citizens.al/2026/06/23/pas-23-ditesh-proteste-qytetaret-artikulojne-pese-kerkesa-ndaj-qeverise/",
          image: { src: "/images/protests/java-e-21.jpg", alt: "Protesters at night on Tirana's boulevard, carrying red-and-black flags" }
        },
        {
          date: "June 21, 2026",
          title: "Kakome",
          location: "Kakome",
          body: "Residents against development threatening the protected Kakome bay.",
          status: "Confirmed",
          href: "https://citizens.al/en/2026/06/21/After-the-red-and-yellow-berry-and-the-pear--the-Kakomese-fence-also-falls./",
          image: { src: "/images/protests/kakome.jpg", alt: "Residents dismantling the guard hut and perimeter fence on Kakome beach" },
          env: true
        },
        {
          date: "July 5, 2026",
          title: "Mërtur",
          location: "Mërtur river, Nikaj-Mërtur",
          body: "Residents affected by hydropower dam construction raise their concerns.",
          status: "Confirmed",
          href: "https://citizens.al/2026/07/06/nikaj-merturi-organizohet-ne-proteste-per-mbrojtjen-e-lumit/",
          image: { src: "/images/protests/mertur.jpg", alt: "The Mërtur river and the works along its bed, aerial view" },
          env: true
        },
        {
          date: "July 12-24, 2026",
          title: "End of session",
          location: "Parliament, Tirana",
          body: "Daily protests during the final weeks of the parliamentary session.",
          status: "Confirmed",
          href: "https://citizens.al/2026/07/27/nuk-na-perfaqesoniprotestuesit-perballe-kuvendit/",
          image: { src: "/images/protests/fundi-sesionit.jpg", alt: "Protesters facing a police cordon outside Parliament" }
        },
        {
          date: "Aug-Sep 2026",
          title: "Still going",
          location: "Tirana, Munich, Vienna and more",
          body: "\"Tirana Proteston!\" continues almost daily, while diaspora chapters keep meeting into September.",
          status: "Ongoing",
          href: "https://www.voal.ch/diaspora-zbarkon-ne-tirane-aktivisti-zbulon-detajet-e-protestave-me-14-15-dhe-16-gusht-karvane-makinash-nga-europa-drejt-bulevardit/",
          image: { src: "/images/protests/vazhdimi.jpg", alt: "Protesters at night outside the prime minister's office, carrying Albanian flags" }
        }
      ]
    },
    photoPlaceholderLabel: "Photos coming soon",
    photoCredit:
      "Photos: Arbenllapashtica, Terfili, Albinfo, Matete Plays — Wikimedia Commons (CC BY / CC BY-SA 4.0); citizens.al, euronews.al, gazeta-shqip.com, voal.ch, birdlife.org — used for editorial/informational purposes, linked to the original article.",
    newsLinkLabel: "Read the article",
    mapReferenceLabel: "See where the protests happened, on the map →",
    kerkesat: {
      kicker: "Demands",
      title: "The protest's demands",
      description:
        "Since the protests began, the demands addressed to the government have been articulated in more than one version: an initial one and an expanded one.",
      versioni1Title: "Initial demands",
      versioni1Description: "The first demands, tied directly to the cause that sparked the protests.",
      versioni2Title: "Expanded demands",
      versioni2Description: "The later version, adding institutional and constitutional demands."
    },
    waySection: {
      kicker: "The way forward",
      title: "The way out",
      description:
        "In June 2026 the European Parliament called for a halt to the project and a change to the law that enabled it. These are the three concrete paths to a solution.",
      referendumLabel: "See the referendum initiative →"
    },
    wayCards: [
      {
        title: "Referendum against Law 21/2024",
        body: "A group of citizens and environmental activists has launched the procedure for a referendum to repeal the law that opened protected areas to construction."
      },
      {
        title: "Immediate moratorium",
        body: "The European Parliament called for an immediate halt to any new permits, construction or development within protected areas until the law is changed."
      },
      {
        title: "Prosecution for those who allowed the violations",
        body: "Construction in Pishë Poro-Narta began before the legally required Environmental Impact Assessment was completed, and continued for weeks after regulators demanded a deeper review. SPAK has opened an investigation into the land ownership and approval procedures; citizens are demanding criminal accountability for the officials who allowed it."
      }
    ]
  }
};
