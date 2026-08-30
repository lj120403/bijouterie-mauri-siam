import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Staff Sign In | Bijouterie Mauri-Siam" },
      { name: "description", content: "Private staff access to the Mauri-Siam stock manager." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Staff Sign In — Bijouterie Mauri-Siam" },
      { property: "og:description", content: "Private staff access to the stock manager." },
    ],
  }),
  component: AuthPage,
});

const field =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) return setError(error.message);
      setInfo("Account created. Ask the owner to grant you stock-manager access.");
    }
  };

  return (
    <Layout>
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-md">
          <div className="glass-strong rounded-3xl p-8 sm:p-10">
            <h1 className="font-display text-4xl text-foreground">Staff access</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Private area for managing the on-demand stock catalogue.
            </p>
            <form onSubmit={submit} className="mt-8 grid gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                aria-label="Email"
                className={field}
              />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-label="Password"
                className={field}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              {info && <p className="text-sm text-primary">{info}</p>}
              <button
                type="submit"
                disabled={busy}
                className="rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-60"
                style={{ background: "var(--gradient-purple)" }}
              >
                {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="mt-6 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              {mode === "signin" ? "Create a staff account" : "I already have an account"}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
