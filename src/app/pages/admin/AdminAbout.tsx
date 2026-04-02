import { useState, useRef, useEffect } from "react";
import { Save, RotateCcw, ChevronDown, ChevronUp, Plus, Trash2, Upload } from "lucide-react";
import { useContent, defaultMultiLangContent } from "../../context/ContentContext";
import type { Lang } from "../../context/ContentContext";
import { AdminLangTabs } from "./AdminLangTabs";
import { translateSection } from "../../utils/translate";

const fieldStyle: React.CSSProperties = {
  width: "100%", padding: "0.7rem 1rem",
  background: "rgba(4, 33, 66, 0.6)", border: "1px solid rgba(45, 181, 213, 0.2)",
  borderRadius: "10px", color: "#fff", fontSize: "0.9rem",
  outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
};

const taStyle: React.CSSProperties = { ...fieldStyle, minHeight: "90px", resize: "vertical" };

const lblStyle: React.CSSProperties = {
  display: "block", color: "#7a9ba8", fontSize: "0.75rem", fontWeight: 700,
  textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.4rem",
};

function SectionCard({ title, children, defaultOpen = false, headerExtra }: { title: string; children: React.ReactNode; defaultOpen?: boolean; headerExtra?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: "#0d2840", border: "1px solid rgba(45,181,213,0.12)", borderRadius: "16px", overflow: "hidden", marginBottom: "0.875rem" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", padding: "1rem 1.25rem", background: "none", border: "none", borderBottom: open ? "1px solid rgba(45,181,213,0.12)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: "#fff", fontWeight: 600, fontSize: "0.9375rem", textAlign: "left" }}
      >
        {title}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {headerExtra && <div onClick={(e) => e.stopPropagation()}>{headerExtra}</div>}
          {open ? <ChevronUp size={16} color="#4a6670" /> : <ChevronDown size={16} color="#4a6670" />}
        </div>
      </button>
      {open && <div style={{ padding: "1.25rem" }}>{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, placeholder }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={lblStyle}>{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={taStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.2)")} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={fieldStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(45,181,213,0.2)")} />
      )}
    </div>
  );
}

export function AdminAbout() {
  const { langs, updateLangContent, updateAllLangs } = useContent();
  const [adminLang, setAdminLang] = useState<Lang>("en");
  const [aboutF, setAboutF] = useState({ ...langs[adminLang].about });
  const [saved, setSaved] = useState(false);

  const teamImageRef = useRef<HTMLInputElement>(null);
  const [teamImgIdx, setTeamImgIdx] = useState<number | null>(null);

  useEffect(() => {
    setAboutF({ ...langs[adminLang].about });
    setSaved(false);
  }, [adminLang]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTeamImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (teamImgIdx !== null) {
        const next = aboutF.team.map((m, j) => j === teamImgIdx ? { ...m, image: dataUrl } : m);
        set("team", next);
      }
      setTeamImgIdx(null);
    };
    reader.readAsDataURL(file);
  };

  const set = (key: keyof typeof aboutF, value: unknown) =>
    setAboutF((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (adminLang === "en") {
      updateLangContent("en", (prev) => ({ ...prev, about: aboutF }));
    } else {
      updateLangContent(adminLang, (prev) => ({ ...prev, about: aboutF }));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    const def = defaultMultiLangContent[adminLang].about;
    setAboutF({ ...def });
    updateLangContent(adminLang, (prev) => ({ ...prev, about: def }));
    setSaved(false);
  };

  return (
    <div>
      {/* Language Tabs */}
      <AdminLangTabs
        adminLang={adminLang}
        setAdminLang={setAdminLang}
        onCopyFromEn={() => { const en = langs["en"].about; setAboutF({ ...en }); updateLangContent(adminLang, (prev) => ({ ...prev, about: en })); setSaved(false); }}
        onTranslate={adminLang !== "en" ? async () => {
          const translated = await translateSection(langs["en"].about, adminLang) as typeof aboutF;
          setAboutF(translated);
          updateLangContent(adminLang, (prev) => ({ ...prev, about: translated }));
          setSaved(false);
        } : undefined}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>About Editor</h2>
          <p style={{ color: "#7a9ba8", fontSize: "0.875rem", marginTop: "0.25rem" }}>Edit all content for the About page.</p>
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
          <Field label="Title (plain)" value={aboutF.heroTitle1} onChange={(v) => set("heroTitle1", v)} placeholder="e.g. About" />
          <Field label="Title (highlighted)" value={aboutF.heroTitle2} onChange={(v) => set("heroTitle2", v)} placeholder="e.g. Jubea Energy Systems" />
        </div>
        <Field label="Subtitle" value={aboutF.heroSubtitle} onChange={(v) => set("heroSubtitle", v)} />
      </SectionCard>

      {/* Our Story */}
      <SectionCard title="Our Story — Text">
        <Field label="Paragraph 1" value={aboutF.storyP1} onChange={(v) => set("storyP1", v)} multiline />
        <Field label="Paragraph 2" value={aboutF.storyP2} onChange={(v) => set("storyP2", v)} multiline />
        <Field label="Paragraph 3" value={aboutF.storyP3} onChange={(v) => set("storyP3", v)} multiline />
        <Field label="Paragraph 4 (optional)" value={aboutF.storyP4 ?? ""} onChange={(v) => set("storyP4", v)} multiline />
      </SectionCard>

      {/* Team Members */}
      <SectionCard title="Team Members">
        <input
          ref={teamImageRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleTeamImageUpload(f); e.target.value = ""; }}
        />
        {aboutF.team.map((member, i) => (
          <div
            key={i}
            style={{
              paddingBottom: "1rem",
              marginBottom: "1rem",
              borderBottom: "1px solid rgba(45,181,213,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <p style={{ ...lblStyle, margin: 0 }}>Team Member {i + 1}</p>
              <button
                onClick={() => set("team", aboutF.team.filter((_, j) => j !== i))}
                style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.3rem 0.7rem", borderRadius: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", fontSize: "0.75rem", cursor: "pointer" }}
              >
                <Trash2 size={12} /> Remove
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 1rem" }}>
              <Field
                label="Name" value={member.name}
                onChange={(v) => { const next = aboutF.team.map((m, j) => j === i ? { ...m, name: v } : m); set("team", next); }}
              />
              <Field
                label="Role / Title" value={member.role}
                onChange={(v) => { const next = aboutF.team.map((m, j) => j === i ? { ...m, role: v } : m); set("team", next); }}
              />
              <Field
                label="Experience" value={member.experience}
                onChange={(v) => { const next = aboutF.team.map((m, j) => j === i ? { ...m, experience: v } : m); set("team", next); }}
              />
            </div>
            {/* Photo upload */}
            <div style={{ marginTop: "0.5rem" }}>
              <label style={lblStyle}>Photo</label>
              {member.image ? (
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <img src={member.image} alt="" style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(45,181,213,0.3)" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <button
                      onClick={() => { setTeamImgIdx(i); teamImageRef.current?.click(); }}
                      style={{ padding: "0.3rem 0.75rem", borderRadius: "8px", background: "rgba(45,181,213,0.12)", border: "1px solid rgba(45,181,213,0.3)", color: "#2db5d5", fontSize: "0.75rem", cursor: "pointer" }}
                    >
                      Change
                    </button>
                    <button
                      onClick={() => { const next = aboutF.team.map((m, j) => j === i ? { ...m, image: undefined } : m); set("team", next); }}
                      style={{ padding: "0.3rem 0.75rem", borderRadius: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", fontSize: "0.75rem", cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => { setTeamImgIdx(i); teamImageRef.current?.click(); }}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "8px", background: "rgba(45,181,213,0.08)", border: "1px dashed rgba(45,181,213,0.35)", color: "#2db5d5", fontSize: "0.8125rem", cursor: "pointer" }}
                  >
                    <Upload size={14} /> Upload Photo
                  </button>
                  <p style={{ color: "#4a6670", margin: "0.375rem 0 0", fontSize: "0.8125rem" }}>
                    Recommended: <span style={{ color: "#2db5d5" }}>800 × 640 px (5:4 landscape)</span> — photos display at ~320 × 256 px on the About page.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={() => set("team", [...aboutF.team, { name: "", role: "", experience: "" }])}
          style={{ width: "100%", padding: "0.7rem", borderRadius: "10px", background: "none", border: "1px dashed rgba(45,181,213,0.35)", color: "#2db5d5", fontSize: "0.875rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.25rem" }}
        >
          <Plus size={15} /> Add Team Member
        </button>
      </SectionCard>

      {/* Certifications & Credentials */}
      <SectionCard title="Certifications & Credentials" defaultOpen={false} headerExtra={
        <button
          onClick={() => setAboutF((prev) => ({ ...prev, showCerts: !prev.showCerts }))}
          style={{ display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, background: aboutF.showCerts !== false ? "rgba(61,197,113,0.12)" : "rgba(200,50,50,0.12)", border: `1px solid ${aboutF.showCerts !== false ? "rgba(61,197,113,0.3)" : "rgba(200,50,50,0.3)"}`, color: aboutF.showCerts !== false ? "#3dc571" : "#e05555" }}
        >
          {aboutF.showCerts !== false ? "● Visible" : "● Hidden"}
        </button>
      }>
        <Field label="Section Heading" value={aboutF.certsHeading} onChange={(v) => set("certsHeading", v)} placeholder="Certifications & Credentials" />
        <Field label="Section Subtitle" value={aboutF.certsSubtitle} onChange={(v) => set("certsSubtitle", v)} placeholder="Fully licensed, insured, and certified" />
        {aboutF.certs.map((cert, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0 1rem", paddingBottom: i < aboutF.certs.length - 1 ? "0.75rem" : 0, marginBottom: i < aboutF.certs.length - 1 ? "0.75rem" : 0, borderBottom: i < aboutF.certs.length - 1 ? "1px solid rgba(45,181,213,0.08)" : "none" }}>
            <Field label={`Cert ${i + 1} Title`} value={cert.title} onChange={(v) => { const next = aboutF.certs.map((c, j) => j === i ? { ...c, title: v } : c); set("certs", next); }} />
            <Field label={`Cert ${i + 1} Description`} value={cert.desc} onChange={(v) => { const next = aboutF.certs.map((c, j) => j === i ? { ...c, desc: v } : c); set("certs", next); }} />
          </div>
        ))}
      </SectionCard>

      {/* Stats */}
      <SectionCard title="Stats" defaultOpen={false} headerExtra={
        <button
          onClick={() => setAboutF((prev) => ({ ...prev, showAboutStats: !prev.showAboutStats }))}
          style={{ display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, background: aboutF.showAboutStats !== false ? "rgba(61,197,113,0.12)" : "rgba(200,50,50,0.12)", border: `1px solid ${aboutF.showAboutStats !== false ? "rgba(61,197,113,0.3)" : "rgba(200,50,50,0.3)"}`, color: aboutF.showAboutStats !== false ? "#3dc571" : "#e05555" }}
        >
          {aboutF.showAboutStats !== false ? "● Visible" : "● Hidden"}
        </button>
      }>
        {aboutF.stats.map((stat, i) => (
          <div
            key={i}
            style={{
              display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0 1rem",
              paddingBottom: i < aboutF.stats.length - 1 ? "0.75rem" : 0,
              marginBottom: i < aboutF.stats.length - 1 ? "0.75rem" : 0,
              borderBottom: i < aboutF.stats.length - 1 ? "1px solid rgba(45,181,213,0.08)" : "none",
            }}
          >
            <Field
              label={`Stat ${i + 1} Value`} value={stat.value}
              onChange={(v) => { const next = aboutF.stats.map((s, j) => j === i ? { ...s, value: v } : s); set("stats", next); }}
            />
            <Field
              label={`Stat ${i + 1} Label`} value={stat.label}
              onChange={(v) => { const next = aboutF.stats.map((s, j) => j === i ? { ...s, label: v } : s); set("stats", next); }}
            />
          </div>
        ))}
      </SectionCard>

      {/* CTA */}
      <SectionCard title="CTA (Bottom Banner)" defaultOpen={false}>
        <Field label="Heading" value={aboutF.ctaHeading} onChange={(v) => set("ctaHeading", v)} />
        <Field label="Subheading" value={aboutF.ctaSubheading} onChange={(v) => set("ctaSubheading", v)} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <Field label="Button Text" value={aboutF.ctaBtnText} onChange={(v) => set("ctaBtnText", v)} placeholder="e.g. Contact Us Today" />
          <Field label="Button Link" value={aboutF.ctaBtnLink} onChange={(v) => set("ctaBtnLink", v)} placeholder="e.g. /contact or tel:+1234567890" />
        </div>
      </SectionCard>
    </div>
  );
}
