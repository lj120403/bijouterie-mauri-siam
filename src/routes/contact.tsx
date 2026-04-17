import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { MapPin, Phone, Linkedin, Clock, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Visit Mauri-Siam in Port Louis, Mauritius" },
      {
        name: "description",
        content:
          "Visit our Port Louis atelier or enquire by WhatsApp. Hennessy Court, 9th Floor, Suite 9014, Pope Hennessy, Mauritius. +230 5753 5035.",
      },
      { property: "og:title", content: "Contact Bijouterie Mauri-Siam" },
      {
        property: "og:description",
        content: "Hennessy Court, 9th Floor — Port Louis, Mauritius. +230 5753 5035.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Layout>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Contact</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl md:text-7xl text-foreground">
              Let us <span className="text-gradient italic">show you.</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              By appointment or walk-in. Reach our gemmologist on WhatsApp for the fastest reply.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <div className="glass-strong rounded-3xl p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "var(--gradient-purple)" }}
              >
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">Atelier</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Pope Hennessy
                <br />
                Hennessy Court, 9th Floor
                <br />
                Suite 9014
                <br />
                Port Louis, Mauritius
              </p>
            </div>

            <div className="glass-strong rounded-3xl p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "var(--gradient-purple)" }}
              >
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">Direct line</h3>
              <a
                href="tel:+23057535035"
                className="mt-3 block text-foreground hover:text-gradient transition-colors text-lg"
              >
                +230 5753 5035
              </a>
              <p className="mt-2 text-sm text-muted-foreground">
                Calls, WhatsApp & SMS welcomed.
              </p>
            </div>

            <div className="glass-strong rounded-3xl p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "var(--gradient-purple)" }}
              >
                <Clock className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">Hours</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>Mon – Fri · 09:30 – 17:30</li>
                <li>Sat · 10:00 – 14:00</li>
                <li>Sun · By appointment</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 glass-strong rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            <div
              className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--gradient-purple)" }}
            />
            <h2 className="font-display text-4xl sm:text-5xl text-foreground relative">
              Speak with our gemmologist
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto relative">
              Share what you're looking for — a stone, a piece, a redesign — and we'll respond
              with curated options.
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
              <a
                href="https://www.linkedin.com/company/bijouterie-maurisiam/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-foreground hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" /> Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
