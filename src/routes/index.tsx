import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight, Gem, ShieldCheck, Sparkles, Award } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import rubyImg from "@/assets/ruby-earring.png";
import emeraldImg from "@/assets/emerald-ring.png";
import sapphireImg from "@/assets/sapphire-ring.png";
import diamondImg from "@/assets/diamond.jpg";
import labDiamondImg from "@/assets/lab-diamond.jpg";
import coloredImg from "@/assets/colored-stones.jpg";
import silverImg from "@/assets/silver-jewelry.jpg";
import goldImg from "@/assets/gold-earrings.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bijouterie Mauri-Siam — Fine Gemstones & Diamonds, Mauritius" },
      {
        name: "description",
        content:
          "Curators of rubies, emeralds, sapphires, natural & lab-grown diamonds, and bespoke gold and silver jewellery in Port Louis, Mauritius.",
      },
      { property: "og:title", content: "Bijouterie Mauri-Siam — Fine Gemstones & Diamonds" },
      {
        property: "og:description",
        content: "A luxury Mauritian atelier of precious gemstones, diamonds and jewellery.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

const stones = [
  { name: "Ruby", origin: "Burma · Mozambique", img: rubyImg, accent: "from-rose-500/30" },
  { name: "Emerald", origin: "Colombia · Zambia", img: emeraldImg, accent: "from-emerald-500/30" },
  { name: "Sapphire", origin: "Kashmir · Ceylon", img: sapphireImg, accent: "from-blue-500/30" },
  { name: "Diamond", origin: "Natural · D-Z", img: diamondImg, accent: "from-white/30" },
];

const categories = [
  {
    name: "Lab-Grown Diamonds",
    desc: "Ethically created CVD diamonds with the same brilliance, fire and chemistry as mined stones — with full IGI certification.",
    img: labDiamondImg,
    tag: "CVD",
  },
  {
    name: "Coloured Gemstones",
    desc: "All grades of precious & semi-precious stones — amethyst, tanzanite, aquamarine, tourmaline, peridot, garnet and beyond.",
    img: coloredImg,
    tag: "Loose",
  },
  {
    name: "Silver Jewellery",
    desc: "Hand-finished sterling silver pieces — chains, bangles, rings and earrings, set with stones of your choice.",
    img: silverImg,
    tag: "925",
  },
  {
    name: "Gold Jewellery",
    desc: "18k & 22k yellow, white and rose gold — bespoke design, repair and remounting from our Port Louis atelier.",
    img: goldImg,
    tag: "18k · 22k",
  },
];

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-luxe">
            <img
              src={heroImg}
              alt="Diamonds and amethyst gemstones cascading on a black mirror"
              width={1920}
              height={1080}
              className="h-[78vh] min-h-[600px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-6 sm:p-12 md:p-16">
                <div className="glass-strong max-w-2xl rounded-3xl p-8 sm:p-10 animate-fade-in">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Port Louis · Since est.
                  </div>
                  <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95]">
                    <span className="text-foreground">A house of</span>
                    <br />
                    <span className="text-gradient italic">extraordinary stones.</span>
                  </h1>
                  <p className="mt-5 max-w-xl text-base text-muted-foreground">
                    Rubies, emeralds, sapphires, diamonds — natural and lab-grown — set in the
                    finest gold and silver. Curated in Mauritius, sourced from the world.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href="https://wa.me/23057535035?text=Hello%20Bijouterie%20Mauri-Siam,%20I%20am%20interested%20in%20viewing%20your%20collection."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
                      style={{ background: "var(--gradient-purple)" }}
                    >
                      Enquire on WhatsApp
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <Link
                      to="/collection"
                      className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground hover:bg-white/10"
                    >
                      View Collection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="px-4 sm:px-6 mt-16">
        <div className="mx-auto max-w-7xl glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Gem, label: "Hand-selected", sub: "Every stone, every facet" },
            { icon: ShieldCheck, label: "Certified", sub: "GIA · IGI · GRS aligned" },
            { icon: Award, label: "All grades", sub: "From commercial to royal" },
            { icon: Sparkles, label: "Bespoke setting", sub: "Atelier in Port Louis" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{ background: "var(--gradient-purple)" }}
              >
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE FOUR */}
      <section className="px-4 sm:px-6 mt-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">The Precious Four</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-foreground">
                Stones of <span className="text-gradient italic">consequence</span>
              </h2>
            </div>
            <Link
              to="/collection"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              Explore the full collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stones.map((s, i) => (
              <div
                key={s.name}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={s.img}
                    alt={`${s.name} gemstone`}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${s.accent} via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="glass rounded-2xl p-4">
                    <h3 className="font-display text-2xl text-foreground">{s.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                      {s.origin}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-4 sm:px-6 mt-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">The Atelier</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-foreground">
              Beyond the stone
            </h2>
            <p className="mt-4 text-muted-foreground">
              From loose gems to finished jewellery, lab-grown brilliance to ancestral gold —
              every piece curated with the eye of a collector.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {categories.map((c) => (
              <article
                key={c.name}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card"
              >
                <div className="grid sm:grid-cols-2">
                  <div className="aspect-square sm:aspect-auto overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.name}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-7">
                    <div>
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary-foreground"
                        style={{ background: "var(--gradient-purple)" }}
                      >
                        {c.tag}
                      </span>
                      <h3 className="mt-4 font-display text-3xl text-foreground">{c.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {c.desc}
                      </p>
                    </div>
                    <a
                      href="https://wa.me/23057535035?text=Hello%20Bijouterie%20Mauri-Siam,%20I%20am%20interested%20in%20viewing%20your%20collection."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:gap-2 transition-all"
                    >
                      Enquire <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 mt-32">
        <div className="mx-auto max-w-7xl">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center">
            <div
              className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--gradient-purple)" }}
            />
            <p className="text-xs uppercase tracking-[0.3em] text-primary relative">Private viewing</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-foreground relative">
              The collection awaits.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto relative">
              Tell us what you seek — a coloured stone, a diamond, a piece for an occasion. Our
              gemmologist will guide you, in person or by message.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 relative">
              <a
                href="https://wa.me/23057535035?text=Hello%20Bijouterie%20Mauri-Siam,%20I%20am%20interested%20in%20viewing%20your%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
                style={{ background: "var(--gradient-purple)" }}
              >
                Enquire on WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-foreground hover:bg-white/10"
              >
                Visit the atelier
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
