import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight, Gem, ShieldCheck, Sparkles, Award, Truck, BadgeDollarSign, Scale, Quote } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import rubyImg from "@/assets/ruby-visible.png";
import emeraldImg from "@/assets/emerald-ring.png";
import sapphireImg from "@/assets/sapphire-ring.png";
import diamondImg from "@/assets/diamond-ring.png";
import labDiamondImg from "@/assets/lab-diamond.jpg";
import coloredImg from "@/assets/colored-stones.jpg";
import silverImg from "@/assets/silver-jewelry.jpg";
import goldImg from "@/assets/gold-earrings.jpg";
import { useI18n } from "@/lib/i18n";

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

function Home() {
  const { t } = useI18n();

  const stones = [
    { key: "ruby", img: rubyImg, accent: "from-rose-500/30" },
    { key: "emerald", img: emeraldImg, accent: "from-emerald-500/30" },
    { key: "sapphire", img: sapphireImg, accent: "from-blue-500/30" },
    { key: "diamond", img: diamondImg, accent: "from-white/30" },
  ] as const;

  const categories = [
    { name: t("cat.lab"), desc: t("cat.lab.desc"), img: labDiamondImg, tag: "CVD" },
    { name: t("cat.colored"), desc: t("cat.colored.desc"), img: coloredImg, tag: "Loose" },
    { name: t("cat.silver"), desc: t("cat.silver.desc"), img: silverImg, tag: "925" },
    { name: t("cat.gold"), desc: t("cat.gold.desc"), img: goldImg, tag: "18k · 22k" },
  ];

  const testimonials = [
    { q: t("test.q1"), a: t("test.a1") },
    { q: t("test.q2"), a: t("test.a2") },
    { q: t("test.q3"), a: t("test.a3") },
  ];

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
                    {t("common.portLouis")}
                  </div>
                  <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl leading-[0.95]">
                    <span className="text-foreground">{t("home.hero.title.a")}</span>
                    <br />
                    <span className="text-gradient italic">{t("home.hero.title.b")}</span>
                  </h1>
                  <p className="mt-5 max-w-xl text-base text-muted-foreground">
                    {t("home.hero.sub")}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href="https://wa.me/23057535035?text=Hello%20Bijouterie%20Mauri-Siam,%20I%20am%20interested%20in%20viewing%20your%20collection."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
                      style={{ background: "var(--gradient-purple)" }}
                    >
                      {t("nav.enquireWa")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <Link
                      to="/collection"
                      className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground hover:bg-white/10"
                    >
                      {t("common.viewCollection")}
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
            { icon: Gem, label: t("trust.handpicked"), sub: t("trust.handpicked.sub") },
            { icon: ShieldCheck, label: t("trust.certified"), sub: t("trust.certified.sub") },
            { icon: Award, label: t("trust.grades"), sub: t("trust.grades.sub") },
            { icon: Sparkles, label: t("trust.bespoke"), sub: t("trust.bespoke.sub") },
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
              <p className="text-xs uppercase tracking-[0.3em] text-primary">{t("four.kicker")}</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-foreground">
                {t("four.title.a")} <span className="text-gradient italic">{t("four.title.b")}</span>
              </h2>
            </div>
            <Link
              to="/collection"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              {t("common.exploreFull")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stones.map((s, i) => (
              <div
                key={s.key}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-card">
                  <img
                    src={s.img}
                    alt={t(`stone.${s.key}`)}
                    width={1024}
                    height={1365}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${s.accent} via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="glass rounded-2xl p-4">
                    <h3 className="font-display text-2xl text-foreground">{t(`stone.${s.key}`)}</h3>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                      {t(`stone.${s.key}.origin`)}
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
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{t("cat.kicker")}</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-foreground">
              {t("cat.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("cat.sub")}</p>
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
                      {t("common.enquire")} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MAURITIUS-WIDE SERVICE */}
      <section className="px-4 sm:px-6 mt-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{t("mu.kicker")}</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-foreground">
              {t("mu.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("mu.sub")}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Truck, label: t("mu.delivery"), sub: t("mu.delivery.sub") },
              { icon: BadgeDollarSign, label: t("mu.payment"), sub: t("mu.payment.sub") },
              { icon: Scale, label: t("mu.appraisal"), sub: t("mu.appraisal.sub") },
            ].map((f) => (
              <div key={f.label} className="glass-strong rounded-3xl p-7">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "var(--gradient-purple)" }}
                >
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-foreground">{f.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 sm:px-6 mt-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{t("test.kicker")}</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-foreground">
              {t("test.title")}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((tst, i) => (
              <figure
                key={i}
                className="glass rounded-3xl p-7 relative overflow-hidden"
              >
                <Quote className="h-8 w-8 text-primary opacity-60" />
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                  "{tst.q}"
                </blockquote>
                <figcaption className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                  {tst.a}
                </figcaption>
              </figure>
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
            <p className="text-xs uppercase tracking-[0.3em] text-primary relative">{t("cta.kicker")}</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-foreground relative">
              {t("cta.title")}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto relative">
              {t("cta.sub")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 relative">
              <a
                href="https://wa.me/23057535035?text=Hello%20Bijouterie%20Mauri-Siam,%20I%20am%20interested%20in%20viewing%20your%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
                style={{ background: "var(--gradient-purple)" }}
              >
                {t("nav.enquireWa")} <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-foreground hover:bg-white/10"
              >
                {t("common.visitAtelier")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
