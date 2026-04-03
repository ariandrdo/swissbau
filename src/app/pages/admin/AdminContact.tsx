import { useState, useEffect } from "react";
import { Save, RotateCcw, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useContent, defaultMultiLangContent } from "../../context/ContentContext";
import type { Lang } from "../../context/ContentContext";
import { AdminLangTabs } from "./AdminLangTabs";
import { translateSection } from "../../utils/translate";

// ── North Macedonia municipalities ────────────────────────────────────────────
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

// ── shared styles ─────────────────────────────────────────────────────────────

const fieldStyle: React.CSSProperties = {
  width: "100%", padding: "0.7rem 1rem",
  background: "rgba(4, 33, 66, 0.6)", border: "1px solid rgba(45, 181, 213, 0.2)",
  borderRadius: "10px", color: "#fff", fontSize: "0.9rem",
  outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
};

const lblStyle: React.CSSProperties = {
  display: "block", color: "#7a9ba8", fontSize: "0.75rem", fontWeight: 700,
  textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.4rem",
};

// ── helpers ───────────────────────────────────────────────────────────────────

function SectionCard({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: "#0d2840", border: "1px solid rgba(45,181,213,0.12)", borderRadius: "16px", overflow: "hidden", marginBottom: "0.875rem" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", padding: "1rem 1.25rem", background: "none", border: "none", borderBottom: open ? "1px solid rgba(45,181,213,0.12)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: "#fff", fontWeight: 600, fontSize: "0.9375rem", textAlign: "left" }}
      >
        {title}
        {open ? <ChevronUp size={16} color="#4a6670" /> : <ChevronDown size={16} color="#4a6670" />}
      </button>
      {open && <div style={{ padding: "1.25rem" }}>{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, hint }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={lblStyle}>{label}</label>
      {hint && <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "0.35rem" }}>{hint}</p>}
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={fieldStyle}
        onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.6)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.2)")} />
    </div>
  );
}

function ServiceAreaPicker({ selected, onChange }: { selected: string[]; onChange: (areas: string[]) => void }) {
  const [citySearch, setCitySearch] = useState("");
  const filtered = ALL_MK_CITIES.filter((c) => c.toLowerCase().includes(citySearch.toLowerCase()));
  const toggle = (city: string) => {
    if (selected.includes(city)) onChange(selected.filter((c) => c !== city));
    else onChange([...selected, city].sort());
  };

  return (
    <SectionCard title={`Service Area (${selected.length} selected)`} defaultOpen={false}>
      <p style={{ color: "#4a6670", fontSize: "0.8125rem", marginBottom: "0.875rem", lineHeight: 1.5 }}>
        Check the cities you serve. They appear as badges on the Contact page.
      </p>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={13} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#4a6670", pointerEvents: "none" }} />
          <input value={citySearch} onChange={(e) => setCitySearch(e.target.value)} placeholder="Search cities..."
            style={{ ...fieldStyle, padding: "0.55rem 0.875rem 0.55rem 2.1rem", fontSize: "0.875rem" }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.6)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.2)")} />
        </div>
        <button onClick={() => onChange([...ALL_MK_CITIES])} style={{ padding: "0.5rem 0.875rem", background: "rgba(45,181,213,0.1)", border: "1px solid rgba(45,181,213,0.2)", borderRadius: "8px", color: "#2db5d5", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>All</button>
        <button onClick={() => onChange([])} style={{ padding: "0.5rem 0.875rem", background: "rgba(212,24,61,0.08)", border: "1px solid rgba(212,24,61,0.2)", borderRadius: "8px", color: "#ff6b8a", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Clear</button>
      </div>
      <div style={{ maxHeight: "220px", overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.375rem", paddingRight: "0.25rem" }}>
        {filtered.map((city) => {
          const checked = selected.includes(city);
          return (
            <label key={city} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 0.625rem", borderRadius: "8px", cursor: "pointer", background: checked ? "rgba(45,181,213,0.12)" : "rgba(10,42,53,0.5)", border: `1px solid ${checked ? "rgba(45,181,213,0.35)" : "rgba(45,181,213,0.08)"}`, transition: "all 0.15s ease" }}>
              <input type="checkbox" checked={checked} onChange={() => toggle(city)} style={{ accentColor: "#2db5d5", width: "14px", height: "14px", flexShrink: 0 }} />
              <span style={{ color: checked ? "#fff" : "#7a9ba8", fontSize: "0.8125rem", fontWeight: checked ? 500 : 400 }}>{city}</span>
            </label>
          );
        })}
        {filtered.length === 0 && <p style={{ color: "#4a6670", fontSize: "0.8125rem", gridColumn: "1/-1", padding: "0.5rem 0" }}>No cities match "{citySearch}"</p>}
      </div>
      {selected.length > 0 && (
        <div style={{ marginTop: "0.875rem", borderTop: "1px solid rgba(45,181,213,0.1)", paddingTop: "0.875rem" }}>
          <p style={lblStyle}>Selected ({selected.length})</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {selected.map((area) => (
              <span key={area} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(45,181,213,0.12)", border: "1px solid rgba(45,181,213,0.25)", color: "#2db5d5", padding: "0.2rem 0.5rem 0.2rem 0.625rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 500 }}>
                {area}
                <button onClick={() => toggle(area)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "#2db5d5", opacity: 0.7 }}>
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

// ── main component ────────────────────────────────────────────────────────────

export function AdminContact() {
  const { langs, isLoaded, updateLangContent, updateAllLangs, saveNow } = useContent();
  const [adminLang, setAdminLang] = useState<Lang>("en");
  const [contactF, setContactF] = useState({ ...langs[adminLang].contact });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContactF({ ...langs[adminLang].contact });
    setSaved(false);
  }, [adminLang, isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key: keyof typeof contactF, value: unknown) =>
    setContactF((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (adminLang === "en") {
      updateLangContent("en", (prev) => ({ ...prev, contact: contactF }));
    } else {
      updateLangContent(adminLang, (prev) => ({ ...prev, contact: contactF }));
    }
    await saveNow();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    const def = defaultMultiLangContent[adminLang].contact;
    setContactF({ ...def });
    updateLangContent(adminLang, (prev) => ({ ...prev, contact: def }));
    setSaved(false);
  };

  return (
    <div>
      {/* Language Tabs */}
      <AdminLangTabs
        adminLang={adminLang}
        setAdminLang={setAdminLang}
        onCopyFromEn={() => { const en = langs["en"].contact; setContactF({ ...en }); updateLangContent(adminLang, (prev) => ({ ...prev, contact: en })); setSaved(false); }}
        onTranslate={adminLang !== "en" ? async () => {
          const translated = await translateSection(langs["en"].contact, adminLang) as typeof contactF;
          setContactF(translated);
          updateLangContent(adminLang, (prev) => ({ ...prev, contact: translated }));
          setSaved(false);
        } : undefined}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Contact Editor</h2>
          <p style={{ color: "#7a9ba8", fontSize: "0.875rem", marginTop: "0.25rem" }}>Edit all content for the Contact page.</p>
        </div>
        <div style={{ display: "flex", gap: "0.625rem" }}>
          <button onClick={handleReset}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.1rem", borderRadius: "10px", background: "rgba(10,42,53,0.8)", border: "1px solid rgba(45,181,213,0.2)", color: "#7a9ba8", fontSize: "0.875rem", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(45,181,213,0.4)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(45,181,213,0.2)"; e.currentTarget.style.color = "#7a9ba8"; }}
          >
            <RotateCcw size={14} /> Reset to Default
          </button>
          <button onClick={handleSave}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.25rem", borderRadius: "10px", background: saved ? "rgba(74,222,128,0.18)" : "linear-gradient(135deg, #2db5d5, #3dc5e5)", border: saved ? "1px solid rgba(74,222,128,0.4)" : "none", color: saved ? "#4ade80" : "#fff", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}
          >
            <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <SectionCard title="Hero Section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <Field label="Title (plain)" value={contactF.heroTitle1} onChange={(v) => set("heroTitle1", v)} placeholder="e.g. Contact" />
          <Field label="Title (highlighted)" value={contactF.heroTitle2} onChange={(v) => set("heroTitle2", v)} placeholder='e.g. Us' />
        </div>
        <Field label="Subtitle" value={contactF.heroSubtitle} onChange={(v) => set("heroSubtitle", v)} />
      </SectionCard>

      {/* Contact Information */}
      <SectionCard title="Contact Information">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <Field label="Phone Number" value={contactF.phone} onChange={(v) => set("phone", v)} />
          <Field label="Email Address" value={contactF.email} onChange={(v) => set("email", v)} />
          <Field label="Office Address" value={contactF.address} onChange={(v) => set("address", v)} />
          <div />
          <Field label="Weekday Hours" value={contactF.hoursWeekday} onChange={(v) => set("hoursWeekday", v)} placeholder="Mon – Fri: 8:00 AM – 6:00 PM" />
          <Field label="Saturday Hours" value={contactF.hoursSaturday} onChange={(v) => set("hoursSaturday", v)} placeholder="Sat: 9:00 AM – 4:00 PM" />
        </div>
      </SectionCard>

      {/* Google Maps Embed */}
      <SectionCard title="Google Maps Embed">
        <Field
          label="Google Maps Embed URL"
          value={contactF.mapEmbedUrl}
          onChange={(v) => set("mapEmbedUrl", v)}
          hint='In Google Maps, click Share → Embed a map → copy only the src="..." URL from the iframe code.'
          placeholder="https://www.google.com/maps/embed?pb=..."
        />
        {contactF.mapEmbedUrl && (
          <div style={{ marginTop: "0.75rem" }}>
            <p style={{ ...lblStyle, marginBottom: "0.5rem" }}>Map Preview</p>
            <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(45,181,213,0.2)", height: "220px" }}>
              <iframe title="Map preview" src={contactF.mapEmbedUrl} width="100%" height="100%" style={{ border: 0, display: "block" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        )}
      </SectionCard>

      {/* Service Area */}
      <ServiceAreaPicker
        selected={contactF.serviceAreas}
        onChange={(areas) => set("serviceAreas", areas)}
      />
    </div>
  );
}
