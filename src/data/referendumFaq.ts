export interface Topic {
	id: string;
	title: string;
	description: string;
}

export interface FAQ {
	id: string;
	title: string;
	content: string;
	topicId: string;
}

export const topics = [
	{
		id: "procesi",
		title: "Procesi",
		description: "Depozitimi, firmat dhe hapat deri te votimi"
	},
	{
		id: "institucionet",
		title: "Institucionet",
		description: "KQZ, Kuvendi, Presidenti dhe Gjykata Kushtetuese"
	},
	{
		id: "votimi",
		title: "Votimi",
		description: "Regjistrimi, pjesëmarrja dhe siguria e votimit"
	},
	{
		id: "diaspora",
		title: "Diaspora",
		description: "Nënshkrimi dhe votimi nga jashtë vendit"
	},
	{
		id: "strategjia",
		title: "Strategjia ligjore",
		description: "Gjykata, SPAK, BE dhe mjetet ligjore paralele"
	},
	{
		id: "nisma",
		title: "Nisma",
		description: "Grupi nismëtar dhe mbështetja politike"
	}
] as const satisfies Readonly<Topic[]>;

export type FAQTopic = (typeof topics)[number]["id"];

function p(text: string) {
	return `<p>${text}</p>`;
}

export const frequentlyAskedQuestions: FAQ[] = [
	{
		id: "depozitimi-nuk-eshte-miratim",
		title: "A do të thotë depozitimi i kërkesës se referendumi është miratuar?",
		content: p(
			"Jo. Depozitimi i kërkesës vetëm nis procedurën formale administrative dhe nuk nënkupton në asnjë mënyrë se referendumi është miratuar. Ai nuk autorizon automatikisht mbledhjen e firmave dhe nuk garanton zhvillimin e referendumit, pasi procesi vijon më tej me verifikimet dhe me fazat kushtetuese e institucionale të parashikuara nga ligji."
		),
		topicId: "procesi"
	},
	{
		id: "sa-firma-duhen",
		title: "Sa firma duhen?",
		content: p(
			"Për të kërkuar një referendum nevojiten të paktën 50,000 nënshkrime të vlefshme të shtetasve shqiptarë me të drejtë vote. Në praktikë synohet të mblidhen ndjeshëm më shumë se 50,000, për të kompensuar ato firma që gjatë procesit të verifikimit mund të rezultojnë të pavlefshme."
		),
		topicId: "procesi"
	},
	{
		id: "pse-50000-firma",
		title: "Pse duhen 50,000 firma?",
		content: p(
			"Ky prag përcaktohet shprehimisht nga neni 150 i Kushtetutës së Republikës së Shqipërisë. Firmat duhet të mblidhen dhe të verifikohen sipas procedurave të KQZ-së, ndaj një listë jozyrtare nuk mjafton për të nisur procesin."
		),
		topicId: "procesi"
	},
	{
		id: "a-mjafton-50000",
		title: "A mjafton mbledhja e 50,000 firmave që të zhvillohet referendumi?",
		content: p(
			"Jo. Mbledhja e firmave është vetëm hapi i parë, pasi ato më pas duhet të verifikohen si të vlefshme nga institucionet përkatëse. Vetëm pas kësaj nisma kalon në fazat kushtetuese dhe institucionale të parashikuara nga ligji."
		),
		topicId: "procesi"
	},
	{
		id: "sa-kohe-pas-firmave",
		title: "Sa kohë merr procesi pas dorëzimit të 50,000 firmave?",
		content: p(
			"Pas dorëzimit, procesi përfshin verifikimin e firmave, kontrollin kushtetues dhe më pas caktimin e datës së referendumit. Në praktikë, këto faza së bashku mund të zgjasin disa muaj."
		),
		topicId: "procesi"
	},
	{
		id: "nenshkrimi-elektronik-akshi",
		title: "A rekomandohet nënshkrimi elektronik përmes AKSHI-t?",
		content: p(
			"Edhe pse nënshkrimi elektronik njihet si i vlefshëm nga ana ligjore, avokati nuk e rekomandon për shkak të kostos (rreth 40–48 euro), vonesave (rreth 10 ditë për t'u pajisur me të) dhe mungesës së besueshmërisë te ky institucion. Për këto arsye, ai sugjeron mbledhjen fizike të firmave me letra."
		),
		topicId: "procesi"
	},
	{
		id: "kuvendi-nuk-kthen",
		title: "A mund ta kthejë Kuvendi referendumin?",
		content: p(
			"Jo. Nëse plotësohen të gjitha kushtet kushtetuese dhe procedurale, Kuvendi nuk mund ta bllokojë apo ta kthejë mbrapsht referendumin me një vendim thjesht politik."
		),
		topicId: "institucionet"
	},
	{
		id: "presidenti-nuk-aprovon",
		title: "Po sikur Presidenti të mos e aprovojë?",
		content: p(
			"Presidenti nuk ka kompetencën për të vendosur nëse referendumi duhet ose jo të zhvillohet. Pasi plotësohen procedurat kushtetuese, ai ka detyrimin ligjor të caktojë datën e zhvillimit të tij."
		),
		topicId: "institucionet"
	},
	{
		id: "gjykata-kushtetuese",
		title: "Po sikur Gjykata Kushtetuese të mos e aprovojë?",
		content: p(
			"Gjykata Kushtetuese shqyrton vetëm kushtetutshmërinë e objektit të referendumit, pra nëse çështja që parashtrohet është në pajtim me Kushtetutën. Ajo nuk vlerëson oportunitetin apo anën politike të nismës."
		),
		topicId: "institucionet"
	},
	{
		id: "siguria-votimit",
		title: "Kush garanton sigurinë e votimit?",
		content: p(
			"Procesi administrohet nga KQZ-ja në përputhje me legjislacionin zgjedhor në fuqi. Siguria garantohet nëpërmjet komisioneve, vëzhguesve dhe mekanizmave të ankimit, të cilët kontrollojnë çdo fazë të votimit."
		),
		topicId: "institucionet"
	},
	{
		id: "sa-vota-shfuqizim",
		title: "Sa vota duhen që ligji të shfuqizohet?",
		content: p(
			"Nuk mjafton vetëm shumica e votave 'Po' për të shfuqizuar ligjin. Krahas kësaj, duhet të plotësohen edhe kushtet ligjore të vlefshmërisë dhe të pjesëmarrjes së përcaktuara nga legjislacioni."
		),
		topicId: "votimi"
	},
	{
		id: "regjistrimi-per-votim",
		title: "A duhet të regjistrohem për të votuar?",
		content: p(
			"Regjistrimi është automatik dhe bazohet në të dhënat e gjendjes civile, ndaj shumica e votuesve nuk duhet të ndërmarrin asnjë veprim. Përjashtim bëjnë ata që kanë votuar nga jashtë në zgjedhjet e vitit 2025, të cilët duhet të regjistrohen përsëri në listën e zgjedhësve brenda Shqipërisë."
		),
		topicId: "votimi"
	},
	{
		id: "diaspora-firmos",
		title: "A mund të firmosë diaspora?",
		content: p(
			"Po, shtetasit shqiptarë me të drejtë vote mund ta nënshkruajnë kërkesën, mjafton të jenë mbi 18 vjeç. Për vetë nënshkrimin e kërkesës ata mund të ndodhen kudo, brenda ose jashtë vendit, sipas procedurave të lejuara."
		),
		topicId: "diaspora"
	},
	{
		id: "diaspora-voton",
		title: "A mund të votojë diaspora?",
		content: p(
			"Sipas kuadrit aktual ligjor, Kodi Zgjedhor nuk e parashikon votimin nga jashtë për referendumet, por vetëm për zgjedhjet e përgjithshme. Kjo do të thotë se edhe nëse një pjesëtar i diasporës e ka nënshkruar kërkesën, fizikisht apo elektronikisht, ai duhet të jetë fizikisht i pranishëm në Shqipëri ditën e votimit që zëri i tij të dëgjohet. Për më tepër, ata që kanë votuar nga jashtë në zgjedhjet e vitit 2025 janë shënuar në një “listë të veçantë të zgjedhësve nga jashtë”, ndaj duhet të bëjnë një kërkesë për t'u çregjistruar nga ajo listë dhe për t'u rikthyer në listën e zgjedhësve që votojnë brenda vendit."
		),
		topicId: "diaspora"
	},
	{
		id: "ringritja-gjykata",
		title: "A mund të ringrihet çështja në Gjykatën Kushtetuese?",
		content: p(
			"Në parim jo, pasi për sa kohë që një pikë është pjesë e një vendimi, ajo konsiderohet e rrëzuar. Rihapja e procesit është shumë e vështirë dhe mund të bëhet vetëm nëse ekziston një vendim nga një gjykatë ndërkombëtare, si ajo e Strasburgut, që konstaton shkelje të të drejtave."
		),
		topicId: "strategjia"
	},
	{
		id: "organizatat-mjedisore",
		title: "A mund ta ringrenë organizatat mjedisore çështjen?",
		content: p(
			"Gjykata nuk kishte asnjë pengesë t'i merrte parasysh argumentet e organizatave mjedisore (si AOS apo Eco Albania) edhe më parë, kur ato ishin thjesht subjekte të interesuara. Megjithatë, sipas ligjit aktual të brendshëm të Gjykatës Kushtetuese, rihapja e procesit mbi bazën e fakteve të reja nuk lejohet pa një vendim ndërkombëtar."
		),
		topicId: "strategjia"
	},
	{
		id: "presidenti-mundesi",
		title: "Çfarë mund të kishte bërë Presidenti?",
		content: p(
			"Presidenti mund ta kishte kthyer ligjin për rishqyrtim në Kuvend, një kompetencë që mund ta ushtrojë vetëm një herë, ose mund ta kishte dërguar ligjin dhe VKM-të specifike drejtpërdrejt në Gjykatën Kushtetuese, pasi gëzon legjitimitet të pakushtëzuar. Gjithashtu, si përfaqësues i popullit, ai mund të ushtronte presion pozitiv te qeveria për të mbështetur kauzën."
		),
		topicId: "strategjia"
	},
	{
		id: "gjyqtare-mendime",
		title: "A ka gjyqtarë që janë shprehur?",
		content: p(
			"Gjyqtarët e kanë të ndaluar të shprehen për çështje që mund të bëhen objekt gjykimi në të ardhmen. Megjithatë, disa prej tyre (si Marsida Xhaferllari) kanë shprehur mendime pakice, sipas të cilave ligji është antikushtetues."
		),
		topicId: "strategjia"
	},
	{
		id: "strategjia-ligjore",
		title: "Cila është strategjia më e mirë ligjore?",
		content: p(
			"Avokati sugjeron një strategji të dyfishtë. Nga njëra anë, nisjen e referendumit për të treguar forcë e mbështetje popullore dhe, paralelisht, goditjen e VKM-ve specifike (si ajo për Pish-Poron apo Zvërnecin) në Gjykatën Kushtetuese brenda afatit ligjor 2-vjeçar."
		),
		topicId: "strategjia"
	},
	{
		id: "zhbimi-veprimeve",
		title: "A mund të zhbëhen veprimet e kryera?",
		content: p(
			"Në të drejtën shqiptare nuk ekziston koncepti i anulimit të ligjeve, por vetëm shfuqizimi, ndaj shfuqizimi nuk zhbën automatikisht çdo akt individual të kryer më parë. Megjithatë, në rastet e investimeve strategjike mund të kërkohet revokimi i statusit, nëse vërtetohet se kriteret ligjore (si numri i punonjësve apo mungesa e hetimeve penale) nuk janë përmbushur."
		),
		topicId: "strategjia"
	},
	{
		id: "be-nderhyrje",
		title: "A mund të ndërhyjë BE?",
		content: p(
			"Bashkimi Europian nuk mund të ndërhyjë drejtpërdrejt për të anuluar apo shfuqizuar ligjet e brendshme shqiptare. Megjithatë, ai mund të përdorë procesin e negociatave dhe “benchmark”-et (si Kapitulli 27 për mjedisin) si mjet presioni, duke kërkuar shfuqizimin e ligjeve që bien ndesh me standardet e tij mjedisore, si kusht për anëtarësim."
		),
		topicId: "strategjia"
	},
	{
		id: "spak",
		title: "Si mund të përdoret SPAK?",
		content: p(
			"SPAK duhet mbështetur publikisht dhe ndaj tij mund të bëhen kallëzime zyrtare, e jo thjesht informime, sepse kallëzimi u jep kallëzuesve të drejtën për të ankimuar vendimet e prokurorisë dhe për të ndjekur nga afër procesin. Në këtë mënyrë, SPAK mund të hetojë nëse ka pasur korrupsion gjatë dhënies së statuseve të investitorëve strategjikë."
		),
		topicId: "strategjia"
	},
	{
		id: "nismetar-terhiqet",
		title: "Çfarë ndodh nëse një nismëtar tërhiqet?",
		content: p(
			"Ligji nuk e rregullon shprehimisht rastin kur një nga 12 nismëtarët tërhiqet gjatë procesit të mbledhjes së firmave. Për këtë arsye, rekomandohet që grupi nismëtar të ketë që në fillim më shumë se 12 persona (për shembull 20 ose 30), për të garantuar numrin minimal ligjor gjatë gjithë procesit."
		),
		topicId: "nisma"
	},
	{
		id: "mbeshtetja-partie",
		title: "A duhet mbështetja e një partie politike?",
		content: p(
			"Jo, ligjërisht nuk ka nevojë për mbështetjen e një partie politike që referendumi të zhvillohet. Mbështetja e tyre është e rëndësishme vetëm për mobilizimin e votuesve dhe për presionin publik."
		),
		topicId: "nisma"
	},
	{
		id: "parti-mund-te-mbeshtese",
		title: "A mund të mbështesë një parti politike nismën?",
		content: p(
			"Po, një parti politike mund ta mbështesë nismën, por vetë nisma mbetet qytetare, e pavarur dhe jo-partiake. Kjo mbështetje nuk ndryshon kontrollin ligjor mbi grupin nismëtar dhe as nuk kërkohet ligjërisht për zhvillimin e referendumit."
		),
		topicId: "nisma"
	}
];

/** Featured FAQs for the referendum landing page teaser. */
export const landingFaqs = frequentlyAskedQuestions.filter((faq) =>
	[
		"depozitimi-nuk-eshte-miratim",
		"sa-firma-duhen",
		"pse-50000-firma",
		"a-mjafton-50000",
		"kuvendi-nuk-kthen",
		"diaspora-firmos",
		"diaspora-voton",
		"be-nderhyrje",
		"mbeshtetja-partie"
	].includes(faq.id)
);
