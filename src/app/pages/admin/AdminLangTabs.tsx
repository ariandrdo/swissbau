import { useState } from "react";
import { Copy, Languages } from "lucide-react";
import type { Lang } from "../../context/ContentContext";

const LANGS: Lang[] = ["en", "de"];

const LANG_FULL: Record<Lang, string> = {
  en: "English",
  de: "Deutsch",
  sq: "Shqip",
  mk: "Македонски",
};

export function AdminLangTabs({
  adminLang,
  setAdminLang,
  onCopyFromEn,
  onTranslate,
}: {
  adminLang: Lang;
  setAdminLang: (lang: Lang) => void;
  onCopyFromEn?: () => void;
  onTranslate?: () => Promise<void>;
}) {
  const [translating, setTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!onTranslate) return;
    setTranslating(true);
    try {
      await onTranslate();
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div
        style={{
          display: "flex",
          gap: "0.375rem",
          background: "rgba(4, 33, 66, 0.5)",
          border: "1px solid rgba(217, 20, 34, 0.15)",
          borderRadius: "12px",
          padding: "0.375rem",
        }}
      >
        {LANGS.map((lang) => (
          <button
            key={lang}
            onClick={() => setAdminLang(lang)}
            style={{
              flex: 1,
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "none",
              background:
                adminLang === lang
                  ? "linear-gradient(135deg, #d91422, #e8202f)"
                  : "transparent",
              color: adminLang === lang ? "#fff" : "#7a9ba8",
              fontWeight: 600,
              fontSize: "0.8125rem",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.125rem",
            }}
            onMouseEnter={(e) => {
              if (adminLang !== lang) {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(217,20,34,0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (adminLang !== lang) {
                e.currentTarget.style.color = "#7a9ba8";
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            <span style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {lang}
            </span>
            <span style={{ fontSize: "0.6875rem", fontWeight: 400, opacity: 0.75 }}>
              {LANG_FULL[lang]}
            </span>
          </button>
        ))}
      </div>

      {adminLang !== "en" && (
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
          {onCopyFromEn && (
            <button
              onClick={onCopyFromEn}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "rgba(217,20,34,0.08)",
                border: "1px solid rgba(217,20,34,0.2)",
                borderRadius: "8px",
                color: "#d91422",
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "0.375rem 0.75rem",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(217,20,34,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(217,20,34,0.08)"; }}
            >
              <Copy size={12} />
              Copy from English
            </button>
          )}
          {onTranslate && (
            <button
              onClick={handleTranslate}
              disabled={translating}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                background: translating ? "rgba(61,197,113,0.15)" : "rgba(61,197,113,0.08)",
                border: "1px solid rgba(61,197,113,0.25)",
                borderRadius: "8px",
                color: translating ? "#aaa" : "#3dc571",
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "0.375rem 0.75rem",
                cursor: translating ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                opacity: translating ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (!translating) e.currentTarget.style.background = "rgba(61,197,113,0.15)"; }}
              onMouseLeave={(e) => { if (!translating) e.currentTarget.style.background = "rgba(61,197,113,0.08)"; }}
            >
              <Languages size={12} />
              {translating ? `Translating to ${LANG_FULL[adminLang]}…` : `Auto-translate → ${LANG_FULL[adminLang]}`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
