import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { MapPin, Phone, Linkedin, Clock, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";

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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JewelryStore",
          name: "Bijouterie Mauri-Siam",
          image: "https://bijouterie-mauri-siam.lovable.app/og.png",
          telephone: "+230 5753 5035",
          email: "info@maurisiam.com",
          priceRange: "$$$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Hennessy Court, 9th Floor, Suite 9014, Pope Hennessy",
            addressLocality: "Port Louis",
            addressCountry: "MU",
          },
          areaServed: "Mauritius",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:30",
              closes: "17:30",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: "Saturday",
              opens: "10:00",
              closes: "14:00",
            },
          ],
          sameAs: [
            "https://www.linkedin.com/company/bijouterie-maurisiam/",
          ],
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  return (
    <Layout>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{t("contact.kicker")}</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl md:text-7xl text-foreground">
              {t("contact.title.a")} <span className="text-gradient italic">{t("contact.title.b")}</span>
            </h1>
            <p className="mt-4 text-muted-foreground">{t("contact.sub")}</p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <div className="glass-strong rounded-3xl p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "var(--gradient-purple)" }}
              >
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">{t("contact.atelier")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {t("contact.address")}
              </p>
            </div>

            <div className="glass-strong rounded-3xl p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "var(--gradient-purple)" }}
              >
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">{t("contact.directLine")}</h3>
              <a
                href="tel:+23057535035"
                className="mt-3 block text-foreground hover:text-gradient transition-colors text-lg"
              >
                +230 5753 5035
              </a>
              <p className="mt-2 text-sm text-muted-foreground">{t("contact.callsNote")}</p>
            </div>

            <div className="glass-strong rounded-3xl p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "var(--gradient-purple)" }}
              >
                <Clock className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">{t("contact.hours")}</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>{t("contact.hours.mf")}</li>
                <li>{t("contact.hours.sat")}</li>
                <li>{t("contact.hours.sun")}</li>
              </ul>
            </div>
          </div>

          {/* MAP */}
          <div className="mt-10 glass-strong rounded-3xl overflow-hidden">
            <div className="p-6 sm:p-8 pb-0">
              <h2 className="font-display text-2xl text-foreground">{t("contact.findUs")}</h2>
            </div>
            <div className="mt-4 aspect-[16/9] w-full">
              <iframe
                title="Bijouterie Mauri-Siam — Port Louis"
                src="https://www.google.com/maps?q=Hennessy+Court+Pope+Hennessy+Port+Louis+Mauritius&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-10 glass-strong rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            <div
              className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--gradient-purple)" }}
            />
            <h2 className="font-display text-4xl sm:text-5xl text-foreground relative">
              {t("contact.speak")}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto relative">
              {t("contact.speakSub")}
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
              <a
                href="https://www.linkedin.com/company/bijouterie-maurisiam/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-foreground hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" /> {t("common.followLi")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
