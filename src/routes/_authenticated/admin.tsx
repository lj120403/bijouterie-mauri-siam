import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { CSV_TEMPLATE, csvToRows, itemTitle, type StockItem } from "@/lib/catalog";
import { Download, Trash2, Upload, LogOut, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Stock Manager | Bijouterie Mauri-Siam" },
      { name: "description", content: "Upload and manage the Mauri-Siam on-demand stock catalogue." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Stock Manager — Bijouterie Mauri-Siam" },
      { property: "og:description", content: "Private stock management for Mauri-Siam staff." },
    ],
  }),
  component: Admin,
});

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  order_type: string | null;
  stone_interest: string | null;
  budget_range: string | null;
  urgency: string | null;
  message: string | null;
  created_at: string;
};

const btn =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground";

function Admin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [items, setItems] = useState<StockItem[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [stock, orders] = await Promise.all([
      supabase.from("stock_items").select("*").order("created_at", { ascending: false }),
      supabase.from("custom_orders").select("*").order("created_at", { ascending: false }),
    ]);
    setItems((stock.data ?? []) as StockItem[]);
    setEnquiries((orders.data ?? []) as Enquiry[]);
  }, []);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return setIsAdmin(false);
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
      if (data) await load();
    })();
  }, [load]);

  const onFile = async (file: File) => {
    setBusy(true);
    setLog([]);
    const text = await file.text();
    const { rows, errors } = csvToRows(text);
    const messages = [...errors];
    if (rows.length) {
      const chunkSize = 200;
      let inserted = 0;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const { error } = await supabase
          .from("stock_items")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .upsert(chunk as any, { onConflict: "sku" });
        if (error) messages.push(`Rows ${i + 1}–${i + chunk.length}: ${error.message}`);
        else inserted += chunk.length;
      }
      messages.unshift(`${inserted} of ${rows.length} rows saved.`);
    }
    setLog(messages);
    setBusy(false);
    await load();
  };

  const remove = async (id: string) => {
    await supabase.from("stock_items").delete().eq("id", id);
    await load();
  };

  const toggle = async (item: StockItem) => {
    await supabase.from("stock_items").update({ available: !item.available }).eq("id", item.id);
    await load();
  };

  const downloadTemplate = () => {
    const url = URL.createObjectURL(new Blob([CSV_TEMPLATE], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "mauri-siam-stock-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isAdmin === null) {
    return (
      <Layout>
        <p className="px-6 text-center text-muted-foreground">Loading…</p>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <section className="px-4 sm:px-6">
          <div className="glass-strong mx-auto max-w-lg rounded-3xl p-10 text-center">
            <h1 className="font-display text-3xl text-foreground">Access pending</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Your account is signed in but has not been granted stock-manager access yet. Ask the
              owner to add you as an admin.
            </p>
            <button
              onClick={() => supabase.auth.signOut()}
              className={`${btn} mt-6 justify-center`}
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Stock manager</p>
              <h1 className="mt-2 font-display text-4xl sm:text-5xl text-foreground">
                {items.length} references in the vault
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/catalog" className={btn}>
                View public catalogue
              </Link>
              <button onClick={load} className={btn}>
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
              <button onClick={() => supabase.auth.signOut()} className={btn}>
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </button>
            </div>
          </div>

          {/* UPLOAD */}
          <div className="glass-strong mt-10 rounded-3xl p-8">
            <h2 className="font-display text-2xl text-foreground">Upload stock (CSV / Excel export)</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Export your spreadsheet as CSV and drop it here. Rows are matched on SKU — existing
              references are updated, new ones are added.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <label
                className="inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow"
                style={{ background: "var(--gradient-purple)" }}
              >
                <Upload className="h-4 w-4" />
                {busy ? "Uploading…" : "Choose CSV file"}
                <input
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  disabled={busy}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void onFile(file);
                    e.target.value = "";
                  }}
                />
              </label>
              <button onClick={downloadTemplate} className={btn}>
                <Download className="h-3.5 w-3.5" /> Download template
              </button>
            </div>
            {log.length > 0 && (
              <ul className="mt-6 space-y-1 text-sm text-muted-foreground">
                {log.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </div>

          {/* STOCK TABLE */}
          <div className="glass mt-10 overflow-x-auto rounded-3xl p-2">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="p-4">SKU</th>
                  <th className="p-4">Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Dimensions</th>
                  <th className="p-4">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-white/5">
                    <td className="p-4 text-foreground">{item.sku}</td>
                    <td className="p-4 text-muted-foreground">{itemTitle(item)}</td>
                    <td className="p-4 text-muted-foreground">{item.category}</td>
                    <td className="p-4 text-muted-foreground">{item.dimensions_mm ?? "—"}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggle(item)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
                      >
                        {item.available ? "Available" : "Sold / hidden"}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => remove(item.id)}
                        aria-label={`Delete ${item.sku}`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No stock yet — upload your first CSV above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ENQUIRIES */}
          <h2 className="mt-16 font-display text-3xl text-foreground">
            Custom order enquiries ({enquiries.length})
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enquiries.map((e) => (
              <div key={e.id} className="glass rounded-2xl p-6">
                <p className="font-display text-xl text-foreground">{e.name}</p>
                <p className="text-xs uppercase tracking-widest text-primary">
                  {e.order_type} · {e.urgency}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{e.stone_interest}</p>
                {e.budget_range && (
                  <p className="text-sm text-muted-foreground">Budget: {e.budget_range}</p>
                )}
                {e.message && <p className="mt-2 text-sm text-muted-foreground">{e.message}</p>}
                <a
                  href={`https://wa.me/${e.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-foreground underline"
                >
                  {e.phone}
                </a>
              </div>
            ))}
            {enquiries.length === 0 && (
              <p className="text-sm text-muted-foreground">No enquiries yet.</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
