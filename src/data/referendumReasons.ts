export type ReferendumReason = {
	id: string;
	n: string;
	title: string;
	claim: string;
	stat: { value: string; label: string };
	href: string;
};

/** Landing dossier of the four documented reasons (from pse-referendum). */
export const referendumReasons: ReferendumReason[] = [
	{
		id: "arsyeja-1",
		n: "01",
		title: "Përqendrimi i pushtetit",
		claim:
			"I njëjti person kryeson Këshillin e Ministrave (që shpall zonën dhe çfarë lejohet) dhe Këshillin Kombëtar të Territorit (që jep lejet). Një hallkë e vetme kontrollon të dyja anët.",
		stat: { value: "1", label: "person · dy organe" },
		href: "/referendum/pse-referendum/#arsyeja-1"
	},
	{
		id: "arsyeja-2",
		n: "02",
		title: "BE-ja kërkon shfuqizim",
		claim:
			"Rezoluta P10_TA(2026)0217 kërkon shfuqizimin e ndryshimeve të 2024. Që nga shtatori 2025 është piketë mbyllëse e Kapitullit 27. Qeveria thotë «nuk ka çfarë të shfuqizohet»; Kuvendi i mban nismat në sirtar.",
		stat: { value: "27", label: "Kapitulli · closing benchmark" },
		href: "/referendum/pse-referendum/#arsyeja-2"
	},
	{
		id: "arsyeja-3",
		n: "03",
		title: "VNM-ja nuk funksionon",
		claim:
			"Nga 212 kompani me leje në zona të mbrojtura, vetëm 7 kanë VNM të publikuar dhe vetëm 1 për projektin e miratuar. Lista e specieve mungon në 85,5% të raporteve.",
		stat: { value: "1/212", label: "VNM për projektin e miratuar" },
		href: "/referendum/pse-referendum/#arsyeja-3"
	},
	{
		id: "arsyeja-4",
		n: "04",
		title: "Toka publike te privati",
		claim:
			"Bashkë me ligjin e investimeve strategjike, 21/2024 hap zonat e mbrojtura për transferimin e trojeve, pyjeve dhe brigjeve — me vendim të një komiteti që kryesohet gjithashtu nga Kryeministri.",
		stat: { value: "5,8M", label: "m² tokë publike e dhënë" },
		href: "/referendum/pse-referendum/#arsyeja-4"
	}
];

export const reasonEvidenceStrip = [
	{ value: "81.916", unit: "ha", label: "rishpallur në kategori V · një ditë" },
	{ value: "2,85%", unit: "", label: "e territorit të Republikës" },
	{ value: "50.000", unit: "", label: "firma · neni 150 i Kushtetutës" }
] as const;
