import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Linkedin } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative mt-32 px-4 sm:px-6 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-purple)" }}
          />
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <h3 className="font-display text-3xl text-gradient">Bijouterie Mauri-Siam</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t("footer.tagline")}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://wa.me/23057535035?text=Hello%20Bijouterie%20Mauri-Siam,%20I%20am%20interested%20in%20viewing%20your%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="glass flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110"
                >
                  <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.762.456 3.418 1.255 4.86L2 22l5.27-1.382A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/bijouterie-maurisiam/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="glass flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110"
                >
                  <Linkedin className="h-5 w-5 text-foreground" />
                </a>
                <a
                  href="tel:+23057535035"
                  aria-label="Phone"
                  className="glass flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110"
                >
                  <Phone className="h-5 w-5 text-foreground" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                {t("footer.visit")}
              </h4>
              <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground whitespace-pre-line">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{t("contact.address")}</span>
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                {t("footer.navigate")}
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/collection" className="hover:text-foreground">
                    {t("nav.collection")}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-foreground">
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-foreground">
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Bijouterie Mauri-Siam. {t("footer.rights")}
            </p>
            <p className="text-xs text-muted-foreground">{t("footer.crafted")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
