import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "Atelier" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`glass flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "shadow-luxe" : ""
          }`}
        >
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full glow-pulse">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--gradient-purple)" }}
              />
              <div className="absolute inset-[2px] rounded-full bg-background flex items-center justify-center">
                <span className="font-display text-lg text-gradient">M</span>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base sm:text-lg tracking-wide text-foreground">
                Mauri-Siam
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Bijouterie
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{
                  className:
                    "rounded-full px-4 py-2 text-sm text-foreground bg-white/5 border border-white/10",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://wa.me/23057535035?text=Hello%20Bijouterie%20Mauri-Siam,%20I%20am%20interested%20in%20viewing%20your%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
              style={{ background: "var(--gradient-purple)" }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.762.456 3.418 1.255 4.86L2 22l5.27-1.382A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-full p-2 text-foreground"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="glass mt-2 rounded-2xl p-4 md:hidden animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  activeProps={{
                    className:
                      "rounded-xl px-4 py-3 text-sm text-foreground bg-white/5",
                  }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://wa.me/23057535035?text=Hello%20Bijouterie%20Mauri-Siam,%20I%20am%20interested%20in%20viewing%20your%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-xl px-4 py-3 text-center text-sm font-medium text-primary-foreground"
                style={{ background: "var(--gradient-purple)" }}
              >
                Enquire on WhatsApp
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
