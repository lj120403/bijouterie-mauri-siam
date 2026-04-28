import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "fr";

type Dict = Record<string, string>;

const en: Dict = {
  // Nav
  "nav.home": "Home",
  "nav.collection": "Collection",
  "nav.about": "Atelier",
  "nav.contact": "Contact",
  "nav.whatsapp": "WhatsApp",
  "nav.enquireWa": "Enquire on WhatsApp",

  // Common
  "common.viewCollection": "View Collection",
  "common.exploreFull": "Explore the full collection",
  "common.enquire": "Enquire",
  "common.visitAtelier": "Visit the atelier",
  "common.followLi": "Follow on LinkedIn",
  "common.portLouis": "Port Louis · Since est.",

  // Home — hero
  "home.hero.title.a": "A house of",
  "home.hero.title.b": "extraordinary stones.",
  "home.hero.sub":
    "Rubies, emeralds, sapphires, diamonds — natural and lab-grown — set in the finest gold and silver. Curated in Mauritius, sourced from the world.",

  // Trust strip
  "trust.handpicked": "Hand-selected",
  "trust.handpicked.sub": "Every stone, every facet",
  "trust.certified": "Certified",
  "trust.certified.sub": "GIA · IGI · GRS aligned",
  "trust.grades": "All grades",
  "trust.grades.sub": "From commercial to royal",
  "trust.bespoke": "Bespoke setting",
  "trust.bespoke.sub": "Atelier in Port Louis",

  // The Four
  "four.kicker": "The Precious Four",
  "four.title.a": "Stones of",
  "four.title.b": "consequence",
  "stone.ruby": "Ruby",
  "stone.ruby.origin": "Burma · Mozambique",
  "stone.emerald": "Emerald",
  "stone.emerald.origin": "Colombia · Zambia",
  "stone.sapphire": "Sapphire",
  "stone.sapphire.origin": "Kashmir · Ceylon",
  "stone.diamond": "Diamond",
  "stone.diamond.origin": "Natural · D-Z",

  // Categories
  "cat.kicker": "The Atelier",
  "cat.title": "Beyond the stone",
  "cat.sub":
    "From loose gems to finished jewellery, lab-grown brilliance to ancestral gold — every piece curated with the eye of a collector.",
  "cat.lab": "Lab-Grown Diamonds",
  "cat.lab.desc":
    "Ethically created CVD diamonds with the same brilliance, fire and chemistry as mined stones — with full IGI certification.",
  "cat.colored": "Coloured Gemstones",
  "cat.colored.desc":
    "All grades of precious & semi-precious stones — amethyst, tanzanite, aquamarine, tourmaline, peridot, garnet and beyond.",
  "cat.silver": "Silver Jewellery",
  "cat.silver.desc":
    "Hand-finished sterling silver pieces — chains, bangles, rings and earrings, set with stones of your choice.",
  "cat.gold": "Gold Jewellery",
  "cat.gold.desc":
    "18k & 22k yellow, white and rose gold — bespoke design, repair and remounting from our Port Louis atelier.",

  // CTA
  "cta.kicker": "Private viewing",
  "cta.title": "The collection awaits.",
  "cta.sub":
    "Tell us what you seek — a coloured stone, a diamond, a piece for an occasion. Our gemmologist will guide you, in person or by message.",

  // About
  "about.kicker": "The Atelier",
  "about.title.a": "A Mauritian house, a",
  "about.title.b": "global eye.",
  "about.story": "Our story",
  "about.p1":
    "Bijouterie Mauri-Siam was founded on the belief that Mauritius — at the crossroads of Africa, India and the Far East — is the natural home for a serious gemstone house. From our Port Louis atelier on the 9th floor of Hennessy Court, we curate stones from the world's most storied mines and finish them into jewellery that lasts generations.",
  "about.p2":
    "We work with private collectors, designers, jewellers and discerning individuals seeking transparency, certification, and quietly exceptional craft.",
  "about.f1.t": "Global sourcing",
  "about.f1.d": "Direct relationships with cutters in Bangkok, Jaipur, Antwerp and Surat.",
  "about.f2.t": "Certified",
  "about.f2.d": "GIA, IGI, GRS and SSEF reports available on request for major stones.",
  "about.f3.t": "All grades",
  "about.f3.d": "From commercial production to museum-grade rarities.",
  "about.f4.t": "Bespoke craft",
  "about.f4.d": "In-house mounting, repair and design — 18k & 22k gold, 925 silver.",

  // Contact
  "contact.kicker": "Contact",
  "contact.title.a": "Let us",
  "contact.title.b": "show you.",
  "contact.sub":
    "By appointment or walk-in. Reach our gemmologist on WhatsApp for the fastest reply.",
  "contact.atelier": "Atelier",
  "contact.address":
    "Pope Hennessy\nHennessy Court, 9th Floor\nSuite 9014\nPort Louis, Mauritius",
  "contact.directLine": "Direct line",
  "contact.callsNote": "Calls, WhatsApp & SMS welcomed.",
  "contact.hours": "Hours",
  "contact.hours.mf": "Mon – Fri · 09:30 – 17:30",
  "contact.hours.sat": "Sat · 10:00 – 14:00",
  "contact.hours.sun": "Sun · By appointment",
  "contact.speak": "Speak with our gemmologist",
  "contact.speakSub":
    "Share what you're looking for — a stone, a piece, a redesign — and we'll respond with curated options.",
  "contact.findUs": "Find us in Port Louis",

  // Collection
  "col.kicker": "The Collection",
  "col.title.a": "Every stone,",
  "col.title.b": "every grade.",
  "col.sub":
    "From rough to polished, commercial to royal — Mauri-Siam holds an inventory worthy of collectors, designers and connoisseurs alike.",
  "col.enquireAbout": "Enquire about",

  // Footer
  "footer.tagline":
    "Purveyors of fine gemstones, diamonds, and precious metals in the heart of Port Louis, Mauritius. Curators of brilliance since inception.",
  "footer.visit": "Visit",
  "footer.navigate": "Navigate",
  "footer.rights": "All brilliance reserved.",
  "footer.crafted": "Crafted in Mauritius · GIA-aligned grading practices",

  // Mauritius marketing
  "mu.kicker": "Serving all of Mauritius",
  "mu.title": "From Port Louis to Grand Baie",
  "mu.sub":
    "Free private consultation across the island. Home & office viewings on appointment in Curepipe, Ebène, Quatre Bornes, Rose Hill, Flic en Flac, Trou aux Biches, Tamarin and beyond.",
  "mu.delivery": "Island-wide delivery",
  "mu.delivery.sub": "Insured handover anywhere in Mauritius",
  "mu.payment": "MUR · EUR · USD",
  "mu.payment.sub": "Bank transfer, Juice, MyT Money, cash",
  "mu.appraisal": "Free appraisal",
  "mu.appraisal.sub": "Bring your gold or stones for valuation",

  // Testimonials
  "test.kicker": "What clients say",
  "test.title": "Trusted across the island",
  "test.q1": "Found my engagement ring here. The team guided us patiently through every diamond. Truly the best in Mauritius.",
  "test.a1": "Priya R. · Quatre Bornes",
  "test.q2": "Exceptional sapphires and an honest gemmologist. I now source all my stones from Mauri-Siam.",
  "test.a2": "Jean-Marc L. · Curepipe",
  "test.q3": "They remounted my grandmother's emerald beautifully. A house you can trust with heirlooms.",
  "test.a3": "Anjali D. · Grand Baie",

  // Lang
  "lang.switch": "Language",
};

const fr: Dict = {
  // Nav
  "nav.home": "Accueil",
  "nav.collection": "Collection",
  "nav.about": "Atelier",
  "nav.contact": "Contact",
  "nav.whatsapp": "WhatsApp",
  "nav.enquireWa": "Demander sur WhatsApp",

  // Common
  "common.viewCollection": "Voir la collection",
  "common.exploreFull": "Explorer toute la collection",
  "common.enquire": "Demander",
  "common.visitAtelier": "Visiter l'atelier",
  "common.followLi": "Suivre sur LinkedIn",
  "common.portLouis": "Port Louis · Depuis sa fondation",

  // Home — hero
  "home.hero.title.a": "Une maison de",
  "home.hero.title.b": "pierres extraordinaires.",
  "home.hero.sub":
    "Rubis, émeraudes, saphirs, diamants — naturels et de laboratoire — sertis dans l'or et l'argent les plus fins. Curaté à Maurice, sourcé dans le monde entier.",

  // Trust strip
  "trust.handpicked": "Sélection à la main",
  "trust.handpicked.sub": "Chaque pierre, chaque facette",
  "trust.certified": "Certifié",
  "trust.certified.sub": "Conforme GIA · IGI · GRS",
  "trust.grades": "Toutes qualités",
  "trust.grades.sub": "Du commercial au royal",
  "trust.bespoke": "Sertissage sur mesure",
  "trust.bespoke.sub": "Atelier à Port Louis",

  // The Four
  "four.kicker": "Les Quatre Précieuses",
  "four.title.a": "Pierres de",
  "four.title.b": "caractère",
  "stone.ruby": "Rubis",
  "stone.ruby.origin": "Birmanie · Mozambique",
  "stone.emerald": "Émeraude",
  "stone.emerald.origin": "Colombie · Zambie",
  "stone.sapphire": "Saphir",
  "stone.sapphire.origin": "Cachemire · Ceylan",
  "stone.diamond": "Diamant",
  "stone.diamond.origin": "Naturel · D-Z",

  // Categories
  "cat.kicker": "L'Atelier",
  "cat.title": "Au-delà de la pierre",
  "cat.sub":
    "Des gemmes en vrac aux bijoux finis, de l'éclat des diamants de laboratoire à l'or ancestral — chaque pièce choisie avec l'œil d'un collectionneur.",
  "cat.lab": "Diamants de laboratoire",
  "cat.lab.desc":
    "Diamants CVD éthiques, même éclat, même feu et même chimie que les pierres extraites — avec certification IGI complète.",
  "cat.colored": "Pierres de couleur",
  "cat.colored.desc":
    "Toutes les qualités de pierres précieuses & semi-précieuses — améthyste, tanzanite, aigue-marine, tourmaline, péridot, grenat et plus.",
  "cat.silver": "Bijoux en argent",
  "cat.silver.desc":
    "Pièces en argent sterling finies à la main — chaînes, bracelets, bagues et boucles d'oreilles, serties à votre choix.",
  "cat.gold": "Bijoux en or",
  "cat.gold.desc":
    "Or jaune, blanc et rose 18k & 22k — création sur mesure, réparation et remontage dans notre atelier de Port Louis.",

  // CTA
  "cta.kicker": "Visite privée",
  "cta.title": "La collection vous attend.",
  "cta.sub":
    "Dites-nous ce que vous cherchez — une pierre de couleur, un diamant, une pièce pour une occasion. Notre gemmologue vous guidera, en personne ou par message.",

  // About
  "about.kicker": "L'Atelier",
  "about.title.a": "Une maison mauricienne, un",
  "about.title.b": "regard mondial.",
  "about.story": "Notre histoire",
  "about.p1":
    "Bijouterie Mauri-Siam est née de la conviction que Maurice — au carrefour de l'Afrique, de l'Inde et de l'Extrême-Orient — est la maison naturelle d'une véritable maison de gemmes. Depuis notre atelier de Port Louis au 9ᵉ étage de Hennessy Court, nous sélectionnons les pierres des mines les plus prestigieuses au monde et les transformons en bijoux qui durent des générations.",
  "about.p2":
    "Nous travaillons avec des collectionneurs privés, des créateurs, des bijoutiers et des particuliers exigeants à la recherche de transparence, de certification et d'un savoir-faire discrètement exceptionnel.",
  "about.f1.t": "Sourcing mondial",
  "about.f1.d": "Relations directes avec les tailleurs de Bangkok, Jaipur, Anvers et Surat.",
  "about.f2.t": "Certifié",
  "about.f2.d": "Rapports GIA, IGI, GRS et SSEF disponibles sur demande pour les pierres importantes.",
  "about.f3.t": "Toutes qualités",
  "about.f3.d": "De la production commerciale aux raretés de qualité musée.",
  "about.f4.t": "Travail sur mesure",
  "about.f4.d": "Sertissage, réparation et création en interne — or 18k & 22k, argent 925.",

  // Contact
  "contact.kicker": "Contact",
  "contact.title.a": "Laissez-nous",
  "contact.title.b": "vous montrer.",
  "contact.sub":
    "Sur rendez-vous ou sans. Joignez notre gemmologue sur WhatsApp pour une réponse rapide.",
  "contact.atelier": "Atelier",
  "contact.address":
    "Pope Hennessy\nHennessy Court, 9ᵉ étage\nSuite 9014\nPort Louis, Maurice",
  "contact.directLine": "Ligne directe",
  "contact.callsNote": "Appels, WhatsApp & SMS bienvenus.",
  "contact.hours": "Horaires",
  "contact.hours.mf": "Lun – Ven · 09:30 – 17:30",
  "contact.hours.sat": "Sam · 10:00 – 14:00",
  "contact.hours.sun": "Dim · Sur rendez-vous",
  "contact.speak": "Parlez à notre gemmologue",
  "contact.speakSub":
    "Dites-nous ce que vous cherchez — une pierre, une pièce, une refonte — et nous vous proposerons une sélection.",
  "contact.findUs": "Nous trouver à Port Louis",

  // Collection
  "col.kicker": "La Collection",
  "col.title.a": "Chaque pierre,",
  "col.title.b": "chaque qualité.",
  "col.sub":
    "Du brut au poli, du commercial au royal — Mauri-Siam détient un inventaire digne des collectionneurs, créateurs et connaisseurs.",
  "col.enquireAbout": "Demander pour",

  // Footer
  "footer.tagline":
    "Marchands de pierres précieuses, diamants et métaux précieux au cœur de Port Louis, Maurice. Curateurs d'éclat depuis nos débuts.",
  "footer.visit": "Visiter",
  "footer.navigate": "Naviguer",
  "footer.rights": "Tous droits réservés.",
  "footer.crafted": "Conçu à Maurice · Pratiques de classification alignées GIA",

  // Mauritius marketing
  "mu.kicker": "Au service de toute l'île Maurice",
  "mu.title": "De Port Louis à Grand Baie",
  "mu.sub":
    "Consultation privée gratuite partout sur l'île. Visites à domicile et au bureau sur rendez-vous à Curepipe, Ebène, Quatre Bornes, Rose Hill, Flic en Flac, Trou aux Biches, Tamarin et au-delà.",
  "mu.delivery": "Livraison sur toute l'île",
  "mu.delivery.sub": "Remise assurée partout à Maurice",
  "mu.payment": "MUR · EUR · USD",
  "mu.payment.sub": "Virement, Juice, MyT Money, espèces",
  "mu.appraisal": "Estimation gratuite",
  "mu.appraisal.sub": "Apportez votre or ou vos pierres pour évaluation",

  // Testimonials
  "test.kicker": "Ce que disent nos clients",
  "test.title": "Une maison de confiance dans toute l'île",
  "test.q1": "J'ai trouvé ma bague de fiançailles ici. L'équipe nous a guidés patiemment à travers chaque diamant. Vraiment les meilleurs à Maurice.",
  "test.a1": "Priya R. · Quatre Bornes",
  "test.q2": "Saphirs exceptionnels et un gemmologue honnête. Je sources désormais toutes mes pierres chez Mauri-Siam.",
  "test.a2": "Jean-Marc L. · Curepipe",
  "test.q3": "Ils ont magnifiquement remonté l'émeraude de ma grand-mère. Une maison à qui confier ses bijoux de famille.",
  "test.a3": "Anjali D. · Grand Baie",

  // Lang
  "lang.switch": "Langue",
};

const dicts: Record<Lang, Dict> = { en, fr };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ms-lang") as Lang | null;
      if (stored === "en" || stored === "fr") {
        setLangState(stored);
      } else {
        const nav = typeof navigator !== "undefined" ? navigator.language : "";
        if (nav?.toLowerCase().startsWith("fr")) setLangState("fr");
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("ms-lang", l);
    } catch {}
  };

  const t = (k: string) => dicts[lang][k] ?? dicts.en[k] ?? k;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Safe fallback for SSR before provider mounts
    return { lang: "en" as Lang, setLang: () => {}, t: (k: string) => en[k] ?? k };
  }
  return ctx;
}
