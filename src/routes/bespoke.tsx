import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useCatalogT } from "@/lib/catalogI18n";
import { waLink } from "@/lib/catalog";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/bespoke")({
  head: () => ({
    meta: [
      { title: "Bespoke Gemstone Jewellery, Mauritius | Bijouterie Mauri-Siam" },
      {
        name: "description",
        content:
          "Custom engagement rings and bespoke gemstone jewellery in Mauritius. Choose a certified loose stone, we design, set and polish it locally.",
      },
      { property: "og:title", content: "Bespoke Gemstone Jewellery — Bijouterie Mauri-Siam" },
      {
        property: "og:description",
        content: "Your stone, your design — sourced from Bangkok, set in Port Louis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Bespoke,
});

const field =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary";

function Bespoke() {
  const t = useCatalogT();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    order_type: "client",
    stone_interest: "",
    budget_range: "",
    urgency: "week",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("custom_orders").insert({
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      order_type: form.order_type,
      stone_interest: form.stone_interest || null,
      budget_range: form.budget_range || null,
      urgency: form.urgency,
      message: form.message || null,
    });
    setStatus(error ? "error" : "done");
  };

  return (
    <Layout>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{t("bes.kicker")}</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl md:text-7xl text-foreground">
              {t("bes.title.a")} <span className="text-gradient italic">{t("bes.title.b")}</span>
            </h1>
            <p className="mt-5 text-muted-foreground">{t("bes.sub")}</p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="glass-strong rounded-3xl p-8 sm:p-10">
              <h2 className="font-display text-3xl text-foreground">{t("bes.form")}</h2>

              {status === "done" ? (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <p className="text-sm text-foreground">{t("bes.done")}</p>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder={t("bes.name")}
                    aria-label={t("bes.name")}
                    className={field}
                  />
                  <input
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder={t("bes.phone")}
                    aria-label={t("bes.phone")}
                    className={field}
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder={t("bes.email")}
                    aria-label={t("bes.email")}
                    className={field}
                  />
                  <select
                    value={form.order_type}
                    onChange={set("order_type")}
                    aria-label={t("bes.orderType")}
                    className={field}
                  >
                    <option value="client">{t("bes.client")}</option>
                    <option value="jeweller">{t("bes.jeweller")}</option>
                  </select>
                  <input
                    value={form.stone_interest}
                    onChange={set("stone_interest")}
                    placeholder={t("bes.stone")}
                    aria-label={t("bes.stone")}
                    className={field}
                  />
                  <input
                    value={form.budget_range}
                    onChange={set("budget_range")}
                    placeholder={t("bes.budget")}
                    aria-label={t("bes.budget")}
                    className={field}
                  />
                  <select
                    value={form.urgency}
                    onChange={set("urgency")}
                    aria-label={t("bes.urgency")}
                    className={field}
                  >
                    <option value="today">{t("bes.today")}</option>
                    <option value="week">{t("bes.week")}</option>
                    <option value="flexible">{t("bes.flexible")}</option>
                  </select>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    placeholder={t("bes.message")}
                    aria-label={t("bes.message")}
                    rows={4}
                    className={`${field} sm:col-span-2`}
                  />
                  {status === "error" && (
                    <p className="text-sm text-destructive sm:col-span-2">{t("bes.error")}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60 sm:col-span-2"
                    style={{ background: "var(--gradient-purple)" }}
                  >
                    {status === "sending" ? t("bes.sending") : t("bes.submit")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              <p className="mt-6 text-sm text-muted-foreground">
                {t("bes.or")}{" "}
                <a
                  href={waLink(
                    "Hello Bijouterie Mauri-Siam, I would like a consultation for a bespoke piece.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline"
                >
                  WhatsApp +230 5753 5035
                </a>
              </p>
            </div>

            <div className="grid gap-6 content-start">
              {[
                { k: t("exp.s1"), s: t("exp.s1sub") },
                { k: t("exp.s2"), s: t("exp.s2sub") },
                { k: t("exp.s3"), s: t("exp.s3sub") },
              ].map((step) => (
                <div key={step.k} className="glass rounded-3xl p-7">
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
