// Versioni 2 i kërkesave: formulimi i mëvonshëm dhe më i detajuar, i cili
// ruan kërkesat fillestare (shih copy.hero.demands, "versioni 1") por i
// vendos brenda një kuadri më të gjerë institucional. Jetesa e këtij të
// dhëni në një vend të vetëm lejon që faqja e kërkesave dhe ballina të
// mos dalin nga sinkronizimi mes tyre.
export interface DemandV2 {
  // Formulimi i plotë, ligjor, siç qarkullon publikisht — përdoret te faqja
  // e kërkesave (/kerkesat/).
  text: string;
  // Version i shkurtër, i lexueshëm me një sy — përdoret te kartat e
  // ballinës, ku "text" do të ishte tepër i gjatë si titull karte.
  short: string;
  subitems?: string[];
}

export const demandsV2: DemandV2[] = [
  {
    text: "Dorëheqjen e panegociueshme të Kryeministrit dhe të qeverisë.",
    short: "Dorëheqja e Kryeministrit dhe e qeverisë"
  },
  {
    text: "Krijimin e një qeverie teknike tranzitore, jopartiake, me mandat 12-mujor.",
    short: "Qeveri teknike tranzitore, jopartiake, 12-mujore"
  },
  {
    text: "Ndryshime Kushtetuese, ku të gjithë shtetasit shqiptarë të jenë të barabartë para ligjit, si dhe miratimin e saj me referendum popullor, duke përfshirë ndër të tjera:",
    short: "Ndryshime kushtetuese, të miratuara me referendum popullor",
    subitems: [
      "Ndryshimin e Kodit Zgjedhor.",
      "Ndryshimin e ligjit për financimin e partive politike dhe organizatave të ndryshme.",
      "Kufizimin e ushtrimit të detyrës së Kryeministrit në jo më shumë se dy mandate, të plota ose të pjesshme, gjatë gjithë jetës politike të një individi."
    ]
  },
  {
    text: "Paralelisht, kërkojmë:",
    short: "Shfuqizimin e ligjeve për zonat e mbrojtura, trashëgiminë kulturore, Paketën e Maleve dhe investimet strategjike",
    subitems: [
      "Anulimin e ndryshimeve të bëra në ligjin për “Zonat e Mbrojtura”.",
      "Anulimin e ndryshimeve të bëra në ligjin për “Trashëgiminë kulturore”.",
      "Shfuqizimin e paketës ligjore të njohur si “Paketa e Maleve”.",
      "Shfuqizimin e statusit dhe të kuadrit ligjor për “Investimet Strategjike”."
    ]
  },
  {
    text: "Kontrata e re sociale mes qytetarëve dhe shtetit do të përpilohet pas konsultimit me intelektualë, ekspertë teknikë dhe qytetarë apartiakë, të propozuar nga sheshi i protestës.",
    short: "Kontratë e re sociale, me konsultim publik të gjerë"
  }
];
