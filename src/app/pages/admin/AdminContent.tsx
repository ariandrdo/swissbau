import { useState, useEffect } from "react";
import {
  Home,
  Users,
  Phone,
  Image,
  Package,
  Globe,
  Save,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  X,
} from "lucide-react";

// ─── All municipalities of North Macedonia ──────────────────────────────────
const ALL_MK_CITIES = [
  "Aracinovo", "Berovo", "Bitola", "Bogdanci", "Bogovinje", "Bosilovo",
  "Brvenica", "Butel", "Čair", "Čaška", "Centar", "Centar Župa",
  "Češinovo-Obleševo", "Čučer-Sandevo", "Debar", "Debarca", "Demir Hisar",
  "Demir Kapija", "Delčevo", "Dolneni", "Drugovo", "Gazi Baba", "Gevgelija",
  "Gjorče Petrov", "Gostivar", "Gradsko", "Ilinden", "Jegunovce",
  "Karbinci", "Karpoš", "Kavadarci", "Kičevo", "Kisela Voda", "Kočani",
  "Konče", "Kratovo", "Kriva Palanka", "Krivogaštani", "Kruševo",
  "Kumanovo", "Lipkovo", "Lozovo", "Makedonska Kamenica", "Makedonski Brod",
  "Mavrovo i Rostuša", "Mogila", "Negotino", "Novaci", "Novo Selo",
  "Ohrid", "Pehčevo", "Petrovec", "Plasnica", "Prilep", "Probištip",
  "Radoviš", "Rankovce", "Resen", "Rosoman", "Saraj", "Skopje",
  "Sopište", "Star Dojran", "Starо Nagoričane", "Struga", "Strumica",
  "Studeničani", "Sveti Nikole", "Šuto Orizari", "Tearce", "Tetovo",
  "Valandovo", "Vasilevo", "Veles", "Vinica", "Vranestica", "Vrapciste",
  "Zelenikovo", "Zelino", "Zrnovci", "Štip",
].sort();
import { useSearchParams } from "react-router";
import { useContent, type SiteContent } from "../../context/ContentContext";

// ─── Shared UI helpers ─────────────────────────────────────────────────────

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem 1rem",
  background: "rgba(4, 33, 66, 0.6)",
  border: "1px solid rgba(45, 181, 213, 0.2)",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const textareaStyle: React.CSSProperties = {
  ...fieldStyle,
  minHeight: "90px",
  resize: "vertical",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#7a9ba8",
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  marginBottom: "0.4rem",
};

const sectionCardStyle: React.CSSProperties = {
  background: "#0d2840",
  border: "1px solid rgba(45, 181, 213, 0.12)",
  borderRadius: "16px",
  overflow: "hidden",
  marginBottom: "1rem",
};

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={labelStyle}>{label}</label>
      {hint && (
        <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "0.35rem" }}>{hint}</p>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={textareaStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.2)")}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={fieldStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.2)")}
        />
      )}
    </div>
  );
}

function SectionCard({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={sectionCardStyle}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "1rem 1.25rem",
          background: "none",
          border: "none",
          borderBottom: open ? "1px solid rgba(45,181,213,0.12)" : "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          color: "#fff",
          fontWeight: 600,
          fontSize: "0.9375rem",
          textAlign: "left",
        }}
      >
        {title}
        {open ? <ChevronUp size={16} color="#4a6670" /> : <ChevronDown size={16} color="#4a6670" />}
      </button>
      {open && <div style={{ padding: "1.25rem" }}>{children}</div>}
    </div>
  );
}

// ─── Service Area Picker ─────────────────────────────────────────────────────

function ServiceAreaPicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (areas: string[]) => void;
}) {
  const [citySearch, setCitySearch] = useState("");

  const filtered = ALL_MK_CITIES.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  const toggle = (city: string) => {
    if (selected.includes(city)) {
      onChange(selected.filter((c) => c !== city));
    } else {
      onChange([...selected, city].sort());
    }
  };

  const selectAll = () => onChange([...ALL_MK_CITIES]);
  const clearAll = () => onChange([]);

  return (
    <SectionCard title={`Service Area (${selected.length} selected)`} defaultOpen={false}>
      <p style={{ color: "#4a6670", fontSize: "0.8125rem", marginBottom: "0.875rem", lineHeight: 1.5 }}>
        Check the cities you serve. They appear as badges on the Contact page.
      </p>

      {/* Search + bulk actions */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search
            size={13}
            style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#4a6670", pointerEvents: "none" }}
          />
          <input
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            placeholder="Search cities..."
            style={{
              ...fieldStyle,
              paddingLeft: "2.1rem",
              fontSize: "0.875rem",
              padding: "0.55rem 0.875rem 0.55rem 2.1rem",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.6)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.2)")}
          />
        </div>
        <button
          onClick={selectAll}
          style={{
            padding: "0.5rem 0.875rem",
            background: "rgba(45,181,213,0.1)",
            border: "1px solid rgba(45,181,213,0.2)",
            borderRadius: "8px",
            color: "#2db5d5",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          All
        </button>
        <button
          onClick={clearAll}
          style={{
            padding: "0.5rem 0.875rem",
            background: "rgba(212,24,61,0.08)",
            border: "1px solid rgba(212,24,61,0.2)",
            borderRadius: "8px",
            color: "#ff6b8a",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Clear
        </button>
      </div>

      {/* City checkbox grid */}
      <div
        style={{
          maxHeight: "220px",
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "0.375rem",
          paddingRight: "0.25rem",
        }}
      >
        {filtered.map((city) => {
          const checked = selected.includes(city);
          return (
            <label
              key={city}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 0.625rem",
                borderRadius: "8px",
                cursor: "pointer",
                background: checked ? "rgba(45,181,213,0.12)" : "rgba(10,42,53,0.5)",
                border: `1px solid ${checked ? "rgba(45,181,213,0.35)" : "rgba(45,181,213,0.08)"}`,
                transition: "all 0.15s ease",
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(city)}
                style={{ accentColor: "#2db5d5", width: "14px", height: "14px", flexShrink: 0 }}
              />
              <span style={{ color: checked ? "#fff" : "#7a9ba8", fontSize: "0.8125rem", fontWeight: checked ? 500 : 400 }}>
                {city}
              </span>
            </label>
          );
        })}
        {filtered.length === 0 && (
          <p style={{ color: "#4a6670", fontSize: "0.8125rem", gridColumn: "1/-1", padding: "0.5rem 0" }}>
            No cities match "{citySearch}"
          </p>
        )}
      </div>

      {/* Selected badges */}
      {selected.length > 0 && (
        <div style={{ marginTop: "0.875rem", borderTop: "1px solid rgba(45,181,213,0.1)", paddingTop: "0.875rem" }}>
          <p style={labelStyle}>Selected ({selected.length})</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {selected.map((area) => (
              <span
                key={area}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  background: "rgba(45,181,213,0.12)",
                  border: "1px solid rgba(45,181,213,0.25)",
                  color: "#2db5d5",
                  padding: "0.2rem 0.5rem 0.2rem 0.625rem",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}
              >
                {area}
                <button
                  onClick={() => toggle(area)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "#2db5d5", opacity: 0.7 }}
                >
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  );
}

// ─── Tab definitions ────────────────────────────────────────────────────────

const TABS = [
  { key: "global", label: "Global", icon: Globe },
  { key: "home", label: "Home", icon: Home },
  { key: "about", label: "About", icon: Users },
  { key: "contact", label: "Contact", icon: Phone },
  { key: "gallery", label: "Gallery", icon: Image },
  { key: "products", label: "Products", icon: Package },
] as const;

type TabKey = (typeof TABS)[number]["key"];

// ─── Main Component ──────────────────────────────────────────────────────────

export function AdminContent() {
  const { content, updateContent, resetContent } = useContent();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") as TabKey | null;
  const [activeTab, setActiveTab] = useState<TabKey>(
    TABS.find((t) => t.key === tabFromUrl)?.key ?? "global"
  );
  const [saved, setSaved] = useState(false);

  // Sync active tab when the URL ?tab= param changes (e.g. clicking sidebar items)
  useEffect(() => {
    const key = TABS.find((t) => t.key === tabFromUrl)?.key;
    if (key) setActiveTab(key);
  }, [tabFromUrl]);

  const set = <K extends keyof SiteContent>(
    page: K,
    field: keyof SiteContent[K],
    value: SiteContent[K][keyof SiteContent[K]]
  ) => {
    updateContent((prev) => ({
      ...prev,
      [page]: { ...prev[page], [field]: value },
    }));
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSave = () => {
    // Content is already auto-saved to localStorage on every keystroke.
    // This just shows the confirmation toast.
    showSaved();
  };

  const handleReset = () => {
    if (confirm("Reset all content to defaults? This cannot be undone.")) {
      resetContent();
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          marginBottom: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h2 style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
            Content Editor
          </h2>
          <p style={{ color: "#7a9ba8", fontSize: "0.9375rem", marginTop: "0.25rem" }}>
            Changes save automatically — click Save to confirm
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem 1.1rem",
              background: "rgba(212, 24, 61, 0.1)",
              border: "1px solid rgba(212, 24, 61, 0.25)",
              borderRadius: "12px",
              color: "#ff6b8a",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            <RotateCcw size={15} /> Reset Defaults
          </button>
          <button
            onClick={handleSave}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem 1.25rem",
              background: saved
                ? "rgba(74, 222, 128, 0.2)"
                : "linear-gradient(135deg, #2db5d5, #3dc5e5)",
              border: saved ? "1px solid rgba(74,222,128,0.4)" : "none",
              borderRadius: "12px",
              color: saved ? "#4ade80" : "white",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.875rem",
              boxShadow: saved ? "none" : "0 5px 15px rgba(45,181,213,0.3)",
              transition: "all 0.3s ease",
            }}
          >
            {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.375rem",
          marginBottom: "1.5rem",
          background: "#0d2840",
          border: "1px solid rgba(45,181,213,0.12)",
          borderRadius: "14px",
          padding: "0.375rem",
          flexWrap: "wrap",
        }}
      >
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1rem",
              borderRadius: "10px",
              border: "none",
              background:
                activeTab === key
                  ? "linear-gradient(135deg, rgba(45,181,213,0.2), rgba(45,181,213,0.1))"
                  : "transparent",
              color: activeTab === key ? "#fff" : "#7a9ba8",
              fontWeight: activeTab === key ? 600 : 400,
              cursor: "pointer",
              fontSize: "0.875rem",
              outline: activeTab === key ? "1px solid rgba(45,181,213,0.3)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            <Icon size={15} color={activeTab === key ? "#2db5d5" : "currentColor"} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}

      {/* ── GLOBAL ── */}
      {activeTab === "global" && (
        <div>
          <SectionCard title="Company Information">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <Field
                label="Company Name"
                value={content.global.companyName}
                onChange={(v) => set("global", "companyName", v)}
              />
              <Field
                label="Phone Number"
                value={content.global.phone}
                onChange={(v) => set("global", "phone", v)}
                placeholder="+389 70 777 888"
              />
              <Field
                label="Email Address"
                value={content.global.email}
                onChange={(v) => set("global", "email", v)}
                placeholder="info@jubea-energy.com"
              />
              <Field
                label="Office Address"
                value={content.global.address}
                onChange={(v) => set("global", "address", v)}
                placeholder="Gostivar, North Macedonia"
              />
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── HOME ── */}
      {activeTab === "home" && (
        <div>
          <SectionCard title="Hero Section">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <Field
                label="Title Line 1"
                value={content.home.heroTitle1}
                onChange={(v) => set("home", "heroTitle1", v)}
                placeholder="Your Comfort,"
              />
              <Field
                label="Title Line 2 (Accent)"
                value={content.home.heroTitle2}
                onChange={(v) => set("home", "heroTitle2", v)}
                placeholder="Our Mission"
              />
            </div>
            <Field
              label="Subtitle"
              value={content.home.heroSubtitle}
              onChange={(v) => set("home", "heroSubtitle", v)}
              multiline
            />
            <Field
              label="Hero Background Image URL"
              value={content.home.heroImage}
              onChange={(v) => set("home", "heroImage", v)}
              hint="Paste an image URL — Unsplash, your own hosting, etc."
              placeholder="https://..."
            />
            {content.home.heroImage && (
              <div style={{ marginBottom: "1rem" }}>
                <p style={labelStyle}>Image Preview</p>
                <img
                  src={content.home.heroImage}
                  alt="Hero preview"
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid rgba(45,181,213,0.2)",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <Field
                label="Primary Button Text"
                value={content.home.heroBtnPrimary}
                onChange={(v) => set("home", "heroBtnPrimary", v)}
              />
              <Field
                label="Secondary Button Text"
                value={content.home.heroBtnSecondary}
                onChange={(v) => set("home", "heroBtnSecondary", v)}
              />
            </div>
          </SectionCard>

          <SectionCard title="About / Story Section">
            <Field
              label="Paragraph 1"
              value={content.home.storyP1}
              onChange={(v) => set("home", "storyP1", v)}
              multiline
            />
            <Field
              label="Paragraph 2"
              value={content.home.storyP2}
              onChange={(v) => set("home", "storyP2", v)}
              multiline
            />
          </SectionCard>

          <SectionCard title="Stats (4 items)">
            {content.home.stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "0 1rem",
                  paddingBottom: i < content.home.stats.length - 1 ? "0.75rem" : 0,
                  marginBottom: i < content.home.stats.length - 1 ? "0.75rem" : 0,
                  borderBottom:
                    i < content.home.stats.length - 1
                      ? "1px solid rgba(45,181,213,0.08)"
                      : "none",
                }}
              >
                <Field
                  label={`Stat ${i + 1} Value`}
                  value={stat.value}
                  onChange={(v) => {
                    const next = content.home.stats.map((s, j) =>
                      j === i ? { ...s, value: v } : s
                    );
                    set("home", "stats", next);
                  }}
                />
                <Field
                  label={`Stat ${i + 1} Label`}
                  value={stat.label}
                  onChange={(v) => {
                    const next = content.home.stats.map((s, j) =>
                      j === i ? { ...s, label: v } : s
                    );
                    set("home", "stats", next);
                  }}
                />
              </div>
            ))}
          </SectionCard>

          <SectionCard title="CTA (Bottom Banner)" defaultOpen={false}>
            <Field
              label="Heading"
              value={content.home.ctaHeading}
              onChange={(v) => set("home", "ctaHeading", v)}
            />
            <Field
              label="Subheading"
              value={content.home.ctaSubheading}
              onChange={(v) => set("home", "ctaSubheading", v)}
            />
            <Field
              label="Phone / Button Link"
              value={content.home.ctaPhone}
              onChange={(v) => set("home", "ctaPhone", v)}
            />
          </SectionCard>
        </div>
      )}

      {/* ── ABOUT ── */}
      {activeTab === "about" && (
        <div>
          <SectionCard title="Hero Section">
            <Field
              label="Subtitle"
              value={content.about.heroSubtitle}
              onChange={(v) => set("about", "heroSubtitle", v)}
            />
          </SectionCard>

          <SectionCard title="Our Story — Text">
            <Field
              label="Paragraph 1"
              value={content.about.storyP1}
              onChange={(v) => set("about", "storyP1", v)}
              multiline
            />
            <Field
              label="Paragraph 2"
              value={content.about.storyP2}
              onChange={(v) => set("about", "storyP2", v)}
              multiline
            />
            <Field
              label="Paragraph 3"
              value={content.about.storyP3}
              onChange={(v) => set("about", "storyP3", v)}
              multiline
            />
          </SectionCard>

          <SectionCard title="Team Members">
            {content.about.team.map((member, i) => (
              <div
                key={i}
                style={{
                  paddingBottom: i < content.about.team.length - 1 ? "1rem" : 0,
                  marginBottom: i < content.about.team.length - 1 ? "1rem" : 0,
                  borderBottom:
                    i < content.about.team.length - 1
                      ? "1px solid rgba(45,181,213,0.08)"
                      : "none",
                }}
              >
                <p style={{ ...labelStyle, marginBottom: "0.75rem" }}>Team Member {i + 1}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 1rem" }}>
                  <Field
                    label="Name"
                    value={member.name}
                    onChange={(v) => {
                      const next = content.about.team.map((m, j) =>
                        j === i ? { ...m, name: v } : m
                      );
                      set("about", "team", next);
                    }}
                  />
                  <Field
                    label="Role / Title"
                    value={member.role}
                    onChange={(v) => {
                      const next = content.about.team.map((m, j) =>
                        j === i ? { ...m, role: v } : m
                      );
                      set("about", "team", next);
                    }}
                  />
                  <Field
                    label="Experience"
                    value={member.experience}
                    onChange={(v) => {
                      const next = content.about.team.map((m, j) =>
                        j === i ? { ...m, experience: v } : m
                      );
                      set("about", "team", next);
                    }}
                  />
                </div>
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Stats" defaultOpen={false}>
            {content.about.stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "0 1rem",
                  paddingBottom: i < content.about.stats.length - 1 ? "0.75rem" : 0,
                  marginBottom: i < content.about.stats.length - 1 ? "0.75rem" : 0,
                  borderBottom:
                    i < content.about.stats.length - 1
                      ? "1px solid rgba(45,181,213,0.08)"
                      : "none",
                }}
              >
                <Field
                  label={`Stat ${i + 1} Value`}
                  value={stat.value}
                  onChange={(v) => {
                    const next = content.about.stats.map((s, j) =>
                      j === i ? { ...s, value: v } : s
                    );
                    set("about", "stats", next);
                  }}
                />
                <Field
                  label={`Stat ${i + 1} Label`}
                  value={stat.label}
                  onChange={(v) => {
                    const next = content.about.stats.map((s, j) =>
                      j === i ? { ...s, label: v } : s
                    );
                    set("about", "stats", next);
                  }}
                />
              </div>
            ))}
          </SectionCard>

          <SectionCard title="CTA (Bottom Banner)" defaultOpen={false}>
            <Field
              label="Heading"
              value={content.about.ctaHeading}
              onChange={(v) => set("about", "ctaHeading", v)}
            />
            <Field
              label="Subheading"
              value={content.about.ctaSubheading}
              onChange={(v) => set("about", "ctaSubheading", v)}
            />
          </SectionCard>
        </div>
      )}

      {/* ── CONTACT ── */}
      {activeTab === "contact" && (
        <div>
          <SectionCard title="Hero Section">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <Field
                label='Title Accent Word (e.g. "Us")'
                value={content.contact.heroTitle2}
                onChange={(v) => set("contact", "heroTitle2", v)}
              />
              <div /> {/* spacer */}
            </div>
            <Field
              label="Subtitle"
              value={content.contact.heroSubtitle}
              onChange={(v) => set("contact", "heroSubtitle", v)}
            />
          </SectionCard>

          <SectionCard title="Contact Information">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <Field
                label="Phone Number"
                value={content.contact.phone}
                onChange={(v) => set("contact", "phone", v)}
              />
              <Field
                label="Email Address"
                value={content.contact.email}
                onChange={(v) => set("contact", "email", v)}
              />
              <Field
                label="Office Address"
                value={content.contact.address}
                onChange={(v) => set("contact", "address", v)}
              />
              <div />
              <Field
                label="Weekday Hours"
                value={content.contact.hoursWeekday}
                onChange={(v) => set("contact", "hoursWeekday", v)}
                placeholder="Mon – Fri: 8:00 AM – 6:00 PM"
              />
              <Field
                label="Saturday Hours"
                value={content.contact.hoursSaturday}
                onChange={(v) => set("contact", "hoursSaturday", v)}
                placeholder="Sat: 9:00 AM – 4:00 PM"
              />
            </div>
          </SectionCard>

          <SectionCard title="Google Maps Embed">
            <Field
              label="Google Maps Embed URL"
              value={content.contact.mapEmbedUrl}
              onChange={(v) => set("contact", "mapEmbedUrl", v)}
              hint='In Google Maps, click Share → Embed a map → copy only the src="..." URL from the iframe code.'
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            {content.contact.mapEmbedUrl && (
              <div style={{ marginTop: "0.75rem" }}>
                <p style={{ color: "#7a9ba8", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>
                  Map Preview
                </p>
                <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(45,181,213,0.2)", height: "220px" }}>
                  <iframe
                    title="Map preview"
                    src={content.contact.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}
          </SectionCard>

          <ServiceAreaPicker
            selected={content.contact.serviceAreas}
            onChange={(areas) => set("contact", "serviceAreas", areas)}
          />
        </div>
      )}

      {/* ── GALLERY ── */}
      {activeTab === "gallery" && (
        <div>
          <SectionCard title="Hero Section">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <Field
                label="Title Line 1"
                value={content.gallery.heroTitle1}
                onChange={(v) => set("gallery", "heroTitle1", v)}
              />
              <Field
                label="Title Line 2 (Accent)"
                value={content.gallery.heroTitle2}
                onChange={(v) => set("gallery", "heroTitle2", v)}
              />
            </div>
            <Field
              label="Subtitle"
              value={content.gallery.heroSubtitle}
              onChange={(v) => set("gallery", "heroSubtitle", v)}
            />
          </SectionCard>

          <SectionCard title="CTA (Bottom Banner)" defaultOpen={false}>
            <Field
              label="Heading"
              value={content.gallery.ctaHeading}
              onChange={(v) => set("gallery", "ctaHeading", v)}
            />
            <Field
              label="Subheading"
              value={content.gallery.ctaSubheading}
              onChange={(v) => set("gallery", "ctaSubheading", v)}
            />
            <Field
              label="CTA Phone Number"
              value={content.gallery.ctaPhone}
              onChange={(v) => set("gallery", "ctaPhone", v)}
            />
          </SectionCard>
        </div>
      )}

      {/* ── PRODUCTS ── */}
      {activeTab === "products" && (
        <div>
          <SectionCard title="Hero Section">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <Field
                label="Title Line 1"
                value={content.products.heroTitle1}
                onChange={(v) => set("products", "heroTitle1", v)}
              />
              <Field
                label="Title Line 2 (Accent)"
                value={content.products.heroTitle2}
                onChange={(v) => set("products", "heroTitle2", v)}
              />
            </div>
            <Field
              label="Subtitle"
              value={content.products.heroSubtitle}
              onChange={(v) => set("products", "heroSubtitle", v)}
            />
          </SectionCard>
        </div>
      )}
    </div>
  );
}
