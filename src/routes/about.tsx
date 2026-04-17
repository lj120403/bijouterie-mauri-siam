import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero.jpg";
import { Gem, Globe2, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Atelier — About Bijouterie Mauri-Siam" },
      {
        name: "description",
        content:
          "A Mauritian house of fine gemstones bridging Indian Ocean craftsmanship with sources from Burma, Ceylon, Colombia, Africa and beyond.",
      },
      { property: "og:title", content: "The Atelier — Bijouterie Mauri-Siam" },
      {
        property: "og:description",
        content: "Mauritian gemmologists. Global sourcing. Bespoke craft.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
            <img
              src={heroImg}
              alt="Atelier scene"
              width={1920}
              height={1080}
              className="h-[55vh] min-h-[420px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-14">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">The Atelier</p>
              <h1 className="mt-3 font-display text-5xl sm:text-6xl md:text-7xl text-foreground max-w-3xl">
                A Mauritian house, a <span className="text-gradient italic">global eye.</span>
              </h1>
            </div>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl text-foreground">Our story</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Bijouterie Mauri-Siam was founded on the belief that Mauritius — at the
                crossroads of Africa, India and the Far East — is the natural home for a serious
                gemstone house. From our Port Louis atelier on the 9th floor of Hennessy Court,
                we curate stones from the world's most storied mines and finish them into
                jewellery that lasts generations.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We work with private collectors, designers, jewellers and discerning individuals
                seeking transparency, certification, and quietly exceptional craft.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Globe2,
                  title: "Global sourcing",
                  desc: "Direct relationships with cutters in Bangkok, Jaipur, Antwerp and Surat.",
                },
                {
                  icon: ShieldCheck,
                  title: "Certified",
                  desc: "GIA, IGI, GRS and SSEF reports available on request for major stones.",
                },
                {
                  icon: Gem,
                  title: "All grades",
                  desc: "From commercial production to museum-grade rarities.",
                },
                {
                  icon: Sparkles,
                  title: "Bespoke craft",
                  desc: "In-house mounting, repair and design — 18k & 22k gold, 925 silver.",
                },
              ].map((f) => (
                <div key={f.title} className="glass rounded-2xl p-6">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "var(--gradient-purple)" }}
                  >
                    <f.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
