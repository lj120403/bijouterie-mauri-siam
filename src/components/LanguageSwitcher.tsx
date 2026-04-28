import { useI18n, type Lang } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const Btn = ({ value, label }: { value: Lang; label: string }) => (
    <button
      type="button"
      onClick={() => setLang(value)}
      aria-pressed={lang === value}
      className={`px-2.5 py-1 text-xs font-medium uppercase tracking-widest transition-colors rounded-full ${
        lang === value
          ? "text-foreground bg-white/10"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-0.5 ${className}`}
      aria-label="Language switcher"
    >
      <Btn value="en" label="EN" />
      <Btn value="fr" label="FR" />
    </div>
  );
}
