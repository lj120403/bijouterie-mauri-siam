import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, itemEnquiryLink, itemTitle, type StockItem } from "@/lib/catalog";
import { useCatalogT } from "@/lib/catalogI18n";
import { Search, Timer, ArrowRight, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Live Stock Catalogue — Loose Gems & Diamonds | Mauri-Siam" },
      {
        name: "description",
        content:
          "Search live loose gemstone, certified diamond and mount stock by type, carat, cut and dimensions. Confirmed on WhatsApp, delivered island-wide in 2–3 hours.",
      },
      { property: "og:title", content: "Live Stock Catalogue — Bijouterie Mauri-Siam" },
      {
        property: "og:description",
        content: "The on-demand vault for Mauritian jewellers. Search, confirm, delivered today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});

const chip =
  "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground";
const chipActive = "rounded-full px-4 py-2 text-xs uppercase tracking-widest text-primary-foreground";
const field =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary";

function Catalog() {
  const t = useCatalogT();
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [stoneType, setStoneType] = useState("all");
  const [shape, setShape] = useState("all");
  const [caratMin, setCaratMin] = useState("");
  const [caratMax, setCaratMax] = useState("");
  const [ringSize, setRingSize] = useState("all");
  const [style, setStyle] = useState("all");
  const [clientView, setClientView] = useState(false);

  useEffect(() => {
    let active = true;
    supabase
      .from("stock_items")
      .select("*")
      .eq("available", true)
      .order("stone_type", { ascending: true })
      .then(({ data }) => {
        if (!active) return;
        setItems((data ?? []) as StockItem[]);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const scoped = useMemo(
    () => (category === "all" ? items : items.filter((i) => i.category === category)),
    [items, category],
  );

  const uniq = (key: keyof StockItem) =>
    Array.from(new Set(scoped.map((i) => i[key]).filter(Boolean) as string[])).sort();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = caratMin ? Number(caratMin) : null;
    const max = caratMax ? Number(caratMax) : null;
    return scoped.filter((i) => {
      if (stoneType !== "all" && i.stone_type !== stoneType) return false;
      if (shape !== "all" && i.shape !== shape) return false;
      if (ringSize !== "all" && i.ring_size !== ringSize) return false;
      if (style !== "all" && i.style !== style) return false;
      if (min != null && (i.carat == null || i.carat < min)) return false;
      if (max != null && (i.carat == null || i.carat > max)) return false;
      if (q) {
        const hay = [
          i.sku,
          i.stone_type,
          i.shape,
          i.cut,
          i.colour,
          i.clarity,
          i.style,
          i.metal,
          i.origin,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [scoped, query, stoneType, shape, ringSize, style, caratMin, caratMax]);

  const reset = () => {
    setQuery("");
    setStoneType("all");
    setShape("all");
    setRingSize("all");
    setStyle("all");
    setCaratMin("");
    setCaratMax("");
  };

  const isJewellery = category === "silver" || category === "gold";

  return (
    <Layout>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{t("cat.kicker")}</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl md:text-7xl text-foreground">
              {t("cat.title.a")} <span className="text-gradient italic">{t("cat.title.b")}</span>
            </h1>
            <p className="mt-5 text-muted-foreground">{t("cat.sub")}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-muted-foreground">
                <Timer className="h-3.5 w-3.5 text-primary" /> {t("cat.express")}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-muted-foreground">
                {t("cat.noPrices")}
              </span>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="glass-strong mt-12 rounded-3xl p-6">
            <div className="flex flex-wrap items-center gap-2">
              {[{ value: "all", label: t("cat.all") }, ...CATEGORIES].map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    setCategory(c.value);
                    reset();
                  }}
                  className={category === c.value ? chipActive : chip}
                  style={
                    category === c.value ? { background: "var(--gradient-purple)" } : undefined
                  }
                >
                  {c.label}
                </button>
              ))}
              <button
                onClick={() => setClientView((v) => !v)}
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                {clientView ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {t("cat.clientView")}
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative sm:col-span-2 lg:col-span-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("cat.search")}
                  className={`${field} pl-9`}
                  aria-label={t("cat.search")}
                />
              </div>

              {isJewellery ? (
                <>
                  <select
                    value={ringSize}
                    onChange={(e) => setRingSize(e.target.value)}
                    className={field}
                    aria-label={t("cat.ringSize")}
                  >
                    <option value="all">{t("cat.ringSize")} — {t("cat.all")}</option>
                    {uniq("ring_size").map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className={field}
                    aria-label={t("cat.style")}
                  >
                    <option value="all">{t("cat.style")} — {t("cat.all")}</option>
                    {uniq("style").map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <select
                    value={stoneType}
                    onChange={(e) => setStoneType(e.target.value)}
                    className={field}
                    aria-label={t("cat.type")}
                  >
                    <option value="all">{t("cat.type")} — {t("cat.all")}</option>
                    {uniq("stone_type").map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className={field}
                    aria-label={t("cat.shape")}
                  >
                    <option value="all">{t("cat.shape")} — {t("cat.all")}</option>
                    {uniq("shape").map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>

            {!isJewellery && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <input
                  value={caratMin}
                  onChange={(e) => setCaratMin(e.target.value)}
                  inputMode="decimal"
                  placeholder={t("cat.caratMin")}
                  className={field}
                  aria-label={t("cat.caratMin")}
                />
                <input
                  value={caratMax}
                  onChange={(e) => setCaratMax(e.target.value)}
                  inputMode="decimal"
                  placeholder={t("cat.caratMax")}
                  className={field}
                  aria-label={t("cat.caratMax")}
                />
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                {filtered.length} {t("cat.results")}
                {clientView ? ` · ${t("cat.clientViewOn")}` : ""}
              </span>
              <button onClick={reset} className="underline hover:text-foreground">
                {t("cat.reset")}
              </button>
            </div>
          </div>

          {/* RESULTS */}
          {loading ? (
            <p className="mt-16 text-center text-muted-foreground">{t("cat.loading")}</p>
          ) : filtered.length === 0 ? (
            <div className="glass mt-16 rounded-3xl p-10 text-center">
              <p className="text-muted-foreground">{t("cat.empty")}</p>
              <Link
                to="/bespoke"
                className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow"
                style={{ background: "var(--gradient-purple)" }}
              >
                {t("bes.form")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-card transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="aspect-square overflow-hidden bg-white/5">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={itemTitle(item)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-display text-4xl text-gradient italic">
                          {(item.stone_type ?? item.metal ?? "M").slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-2xl text-foreground">{itemTitle(item)}</h2>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-primary">
                      {t("cat.ref")} {item.sku}
                    </p>

                    <dl className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                      {item.dimensions_mm && (
                        <div className="flex justify-between gap-3">
                          <dt>{t("cat.dims")}</dt>
                          <dd className="text-foreground">{item.dimensions_mm} mm</dd>
                        </div>
                      )}
                      {item.cut && (
                        <div className="flex justify-between gap-3">
                          <dt>{t("cat.cut")}</dt>
                          <dd className="text-foreground">{item.cut}</dd>
                        </div>
                      )}
                      {item.colour && (
                        <div className="flex justify-between gap-3">
                          <dt>Colour</dt>
                          <dd className="text-foreground">{item.colour}</dd>
                        </div>
                      )}
                      {item.clarity && (
                        <div className="flex justify-between gap-3">
                          <dt>Clarity</dt>
                          <dd className="text-foreground">{item.clarity}</dd>
                        </div>
                      )}
                      {item.ring_size && (
                        <div className="flex justify-between gap-3">
                          <dt>{t("cat.ringSize")}</dt>
                          <dd className="text-foreground">{item.ring_size}</dd>
                        </div>
                      )}
                      {item.weight_g != null && (
                        <div className="flex justify-between gap-3">
                          <dt>{t("cat.weight")}</dt>
                          <dd className="text-foreground">{item.weight_g} g</dd>
                        </div>
                      )}
                      {!clientView && item.origin && (
                        <div className="flex justify-between gap-3">
                          <dt>{t("cat.origin")}</dt>
                          <dd className="text-foreground">{item.origin}</dd>
                        </div>
                      )}
                      {!clientView && item.cert_lab && (
                        <div className="flex justify-between gap-3">
                          <dt>{t("cat.cert")}</dt>
                          <dd className="text-foreground">
                            {item.cert_lab} {item.cert_number ?? ""}
                          </dd>
                        </div>
                      )}
                    </dl>

                    <a
                      href={itemEnquiryLink(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                      style={{ background: "var(--gradient-purple)" }}
                    >
                      {t("cat.reserve")} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* EXPRESS */}
          <div className="glass-strong mt-24 rounded-3xl p-10 sm:p-14">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{t("exp.kicker")}</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-foreground max-w-3xl">
              {t("exp.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">{t("exp.sub")}</p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { k: t("exp.s1"), s: t("exp.s1sub") },
                { k: t("exp.s2"), s: t("exp.s2sub") },
                { k: t("exp.s3"), s: t("exp.s3sub") },
              ].map((step) => (
                <div key={step.k} className="glass rounded-2xl p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-primary">{step.k}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{step.s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
