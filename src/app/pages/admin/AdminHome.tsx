import { useState, useRef, useEffect } from "react";
import { Save, RotateCcw, ChevronDown, ChevronUp, Upload, Plus, Trash2 } from "lucide-react";
import { useContent, defaultMultiLangContent } from "../../context/ContentContext";
import type { Lang } from "../../context/ContentContext";
import { uploadImage } from "../../utils/uploadImage";
import { supabase } from "../../../lib/supabase";

// ── shared styles ─────────────────────────────────────────────────────────────

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem 1rem",
  background: "rgba(4, 33, 66, 0.6)",
  border: "1px solid rgba(217, 20, 34, 0.2)",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const taStyle: React.CSSProperties = {
  ...fieldStyle,
  minHeight: "90px",
  resize: "vertical",
};

const lblStyle: React.CSSProperties = {
  display: "block",
  color: "#7a9ba8",
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  marginBottom: "0.4rem",
};

// ── helpers ───────────────────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
  defaultOpen = false,
  headerExtra,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  headerExtra?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        background: "#0d2840",
        border: "1px solid rgba(217, 20, 34, 0.12)",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "0.875rem",
      }}
    >
      <div
        style={{
          padding: "0 1.25rem",
          borderBottom: open ? "1px solid rgba(217,20,34,0.12)" : "none",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <span style={{ flex: 1, color: "#fff", fontWeight: 600, fontSize: "0.9375rem", padding: "1rem 0" }}>{title}</span>
        {headerExtra && <div onClick={(e) => e.stopPropagation()} style={{ marginRight: "0.75rem", flexShrink: 0 }}>{headerExtra}</div>}
        <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {open ? <ChevronUp size={16} color="#4a6670" /> : <ChevronDown size={16} color="#4a6670" />}
        </span>
      </div>
      {open && <div style={{ padding: "1.25rem" }}>{children}</div>}
    </div>
  );
}

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
      <label style={lblStyle}>{label}</label>
      {hint && (
        <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "0.35rem" }}>{hint}</p>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={taStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.2)")}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={fieldStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.6)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.2)")}
        />
      )}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export function AdminHome() {
  const { langs, isLoaded, updateLangContent, updateAllLangs, saveNow } = useContent();
  const [adminLang, setAdminLang] = useState<Lang>("de");

  const langContent = langs[adminLang];

  const [globalF, setGlobalF] = useState({ ...langContent.global });
  const [homeF, setHomeF] = useState({ ...langContent.home });
  const [saved, setSaved] = useState(false);

  // Reset local form state when language tab changes or Supabase data finishes loading
  useEffect(() => {
    setGlobalF({ ...langs[adminLang].global });
    setHomeF({ ...langs[adminLang].home });
    setSaved(false);
  }, [adminLang, isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  type GalleryImage = { id: number; url: string; name: string };
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    supabase.from("gallery_images").select("*").order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setGalleryImages(data as GalleryImage[]);
      });
  }, []);

  const handleGalleryUpload = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(async (file) => {
      if (!file.type.startsWith("image/")) return;
      try {
        const url = await uploadImage(file, "gallery");
        const name = file.name.replace(/\.[^.]+$/, "");
        const { data, error } = await supabase.from("gallery_images").insert({ url, name }).select().single();
        if (!error && data) setGalleryImages((prev) => [...prev, data as GalleryImage]);
      } catch (e) {
        alert("Gallery upload failed: " + (e instanceof Error ? e.message : "Unknown error"));
      }
    });
  };

  const handleLogoUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    try {
      const url = await uploadImage(file, "logos", 400, 0.85);
      setGlobalF((prev) => ({ ...prev, logo: url }));
    } catch (e) {
      alert("Logo upload failed: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  };

  const handleHeroImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    try {
      const url = await uploadImage(file, "hero", 1920, 0.78);
      setHomeF((prev) => ({ ...prev, heroImage: url }));
    } catch (e) {
      alert("Hero image upload failed: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  };

  const setG = (key: keyof typeof globalF, value: string) =>
    setGlobalF((prev) => ({ ...prev, [key]: value }));

  const setH = (key: keyof typeof homeF, value: unknown) =>
    setHomeF((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    updateLangContent(adminLang, (prev) => ({ ...prev, global: globalF, home: homeF }));
    await saveNow();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    const def = defaultMultiLangContent[adminLang];
    setGlobalF({ ...def.global });
    setHomeF({ ...def.home });
    updateLangContent(adminLang, (prev) => ({
      ...prev,
      global: def.global,
      home: def.home,
    }));
    setSaved(false);
  };

  return (
    <div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div>
          <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
            Home Editor
          </h2>
          <p style={{ color: "#7a9ba8", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Edit all content for the Home page and global company info.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.625rem" }}>
          <button
            onClick={handleReset}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.6rem 1.1rem", borderRadius: "10px",
              background: "rgba(17, 17, 17, 0.8)", border: "1px solid rgba(217, 20, 34, 0.2)",
              color: "#7a9ba8", fontSize: "0.875rem", cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(217,20,34,0.4)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(217,20,34,0.2)"; e.currentTarget.style.color = "#7a9ba8"; }}
          >
            <RotateCcw size={14} /> Reset to Default
          </button>
          <button
            onClick={handleSave}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.6rem 1.25rem", borderRadius: "10px",
              background: saved ? "rgba(74,222,128,0.18)" : "linear-gradient(135deg, #d91422, #e8202f)",
              border: saved ? "1px solid rgba(74,222,128,0.4)" : "none",
              color: saved ? "#4ade80" : "#fff",
              fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", transition: "all 0.3s",
            }}
          >
            <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ── Company Information (Global) ── */}
      <SectionCard title="Company Information">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <Field label="Company Name" value={globalF.companyName} onChange={(v) => setG("companyName", v)} />
          <Field label="Phone Number" value={globalF.phone} onChange={(v) => setG("phone", v)} placeholder="+389 70 777 888" />
          <Field label="Email Address" value={globalF.email} onChange={(v) => setG("email", v)} placeholder="info@jubea-energy.com" />
          <Field label="Office Address" value={globalF.address} onChange={(v) => setG("address", v)} placeholder="Gostivar, North Macedonia" />
        </div>

        {/* Logo upload */}
        <div style={{ marginTop: "0.5rem" }}>
          <label style={lblStyle}>Company Logo</label>
          <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
            Displays in the admin sidebar. Recommended: <span style={{ color: "#d91422" }}>400 × 120 px (transparent PNG)</span>
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", flexWrap: "wrap" }}>
            {globalF.logo ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "80px", height: "44px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(217,20,34,0.2)", background: "rgba(10,42,53,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={globalF.logo} alt="Logo preview" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
                <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 0.875rem", background: "rgba(217,20,34,0.1)", border: "1px solid rgba(217,20,34,0.25)", borderRadius: "8px", color: "#d91422", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer" }}>
                  <Upload size={13} /> Change
                  <input ref={logoInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); e.target.value = ""; }} />
                </label>
                <button onClick={() => setGlobalF((prev) => ({ ...prev, logo: "" }))} style={{ padding: "0.45rem 0.875rem", background: "rgba(212,24,61,0.08)", border: "1px solid rgba(212,24,61,0.2)", borderRadius: "8px", color: "#ff6b8a", fontSize: "0.8125rem", cursor: "pointer" }}>
                  Remove
                </button>
              </div>
            ) : (
              <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1rem", background: "rgba(217,20,34,0.1)", border: "1px solid rgba(217,20,34,0.25)", borderRadius: "10px", color: "#d91422", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>
                <Upload size={14} /> Upload Logo
                <input ref={logoInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); e.target.value = ""; }} />
              </label>
            )}
          </div>
        </div>
      </SectionCard>

      {/* ── Hero Section ── */}
      <SectionCard title="Hero Section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <Field label="Title Line 1" value={homeF.heroTitle1} onChange={(v) => setH("heroTitle1", v)} placeholder="Your Comfort," />
          <Field label="Title Line 2 (Accent)" value={homeF.heroTitle2} onChange={(v) => setH("heroTitle2", v)} placeholder="Our Mission" />
        </div>
        <Field label="Subtitle" value={homeF.heroSubtitle} onChange={(v) => setH("heroSubtitle", v)} multiline />
        {/* Hero image — upload or URL */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={lblStyle}>Hero Background Image</label>
          <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
            Upload a file or paste an image URL below.
          </p>
          {/* Upload button */}
          <label
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1rem", background: "rgba(217,20,34,0.1)", border: "1px solid rgba(217,20,34,0.25)", borderRadius: "10px", color: "#d91422", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", marginBottom: "0.625rem" }}
          >
            <Upload size={14} /> Upload Image
            <input
              ref={heroImageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleHeroImageUpload(file);
              }}
            />
          </label>
          {/* URL input */}
          <input
            value={homeF.heroImage}
            onChange={(e) => setH("heroImage", e.target.value)}
            placeholder="https://..."
            style={fieldStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.6)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.2)")}
          />
        </div>
        {homeF.heroImage && (
          <div style={{ marginBottom: "1rem" }}>
            <p style={lblStyle}>Preview</p>
            <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(217,20,34,0.2)" }}>
              <img
                src={homeF.heroImage}
                alt="Hero preview"
                style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <button
                onClick={() => setH("heroImage", "")}
                style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "rgba(0,0,0,0.55)", border: "none", borderRadius: "6px", color: "#fff", cursor: "pointer", padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <Field label="Primary Button Text" value={homeF.heroBtnPrimary} onChange={(v) => setH("heroBtnPrimary", v)} />
          <Field label="Secondary Button Text" value={homeF.heroBtnSecondary} onChange={(v) => setH("heroBtnSecondary", v)} />
        </div>
      </SectionCard>

      {/* ── About / Story Section ── */}
      <SectionCard title="About / Story Section"
        headerExtra={
          <button
            onClick={() => setH("showLearnMoreBtn", !homeF.showLearnMoreBtn)}
            style={{
              display: "flex", alignItems: "center", gap: "0.35rem",
              background: homeF.showLearnMoreBtn !== false ? "rgba(61,197,113,0.12)" : "rgba(200,50,50,0.12)",
              border: `1px solid ${homeF.showLearnMoreBtn !== false ? "rgba(61,197,113,0.3)" : "rgba(200,50,50,0.3)"}`,
              borderRadius: "8px", padding: "0.25rem 0.65rem",
              color: homeF.showLearnMoreBtn !== false ? "#3dc571" : "#e05555",
              fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
            }}
          >
            {homeF.showLearnMoreBtn !== false ? "● Button Visible" : "● Button Hidden"}
          </button>
        }
      >
        <Field label="Paragraph 1" value={homeF.storyP1} onChange={(v) => setH("storyP1", v)} multiline />
        <Field label="Paragraph 2" value={homeF.storyP2} onChange={(v) => setH("storyP2", v)} multiline />
        <Field label="Paragraph 3" value={homeF.storyP3 ?? ""} onChange={(v) => setH("storyP3", v)} multiline />
      </SectionCard>

      {/* ── Stats ── */}
      <SectionCard title="Stats (4 items)"
        headerExtra={
          <button
            onClick={() => setH("showStats", !homeF.showStats)}
            style={{
              display: "flex", alignItems: "center", gap: "0.35rem",
              background: homeF.showStats ? "rgba(61,197,113,0.12)" : "rgba(200,50,50,0.12)",
              border: `1px solid ${homeF.showStats ? "rgba(61,197,113,0.3)" : "rgba(200,50,50,0.3)"}`,
              borderRadius: "8px", padding: "0.25rem 0.65rem",
              color: homeF.showStats ? "#3dc571" : "#e05555",
              fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
            }}
          >
            {homeF.showStats ? "● Visible" : "● Hidden"}
          </button>
        }
      >
        {homeF.stats.map((stat, i) => (
          <div
            key={i}
            style={{
              display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0 1rem",
              paddingBottom: i < homeF.stats.length - 1 ? "0.75rem" : 0,
              marginBottom: i < homeF.stats.length - 1 ? "0.75rem" : 0,
              borderBottom: i < homeF.stats.length - 1 ? "1px solid rgba(217,20,34,0.08)" : "none",
            }}
          >
            <Field
              label={`Stat ${i + 1} Value`}
              value={stat.value}
              onChange={(v) => {
                const next = homeF.stats.map((s, j) => (j === i ? { ...s, value: v } : s));
                setH("stats", next);
              }}
            />
            <Field
              label={`Stat ${i + 1} Label`}
              value={stat.label}
              onChange={(v) => {
                const next = homeF.stats.map((s, j) => (j === i ? { ...s, label: v } : s));
                setH("stats", next);
              }}
            />
          </div>
        ))}
      </SectionCard>

      {/* ── Why Choose Us Section ── */}
      <SectionCard title="Why Choose Us Section" defaultOpen={false}>
        <Field label="Heading" value={homeF.whyChooseLabel} onChange={(v) => setH("whyChooseLabel", v)} placeholder="Why Choose SwissBau GmbH" />
      </SectionCard>

      {/* ── Services Section ── */}
      <SectionCard title="Services Section (4 Cards)" defaultOpen={false}>
        {homeF.homeServices.map((svc, i) => (
          <div
            key={i}
            style={{
              paddingBottom: i < homeF.homeServices.length - 1 ? "1rem" : 0,
              marginBottom: i < homeF.homeServices.length - 1 ? "1rem" : 0,
              borderBottom: i < homeF.homeServices.length - 1 ? "1px solid rgba(217,20,34,0.08)" : "none",
            }}
          >
            <p style={{ color: "#d91422", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.75rem" }}>
              Card {i + 1}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "0 1rem" }}>
              <Field
                label="Title"
                value={svc.title}
                onChange={(v) => {
                  const next = homeF.homeServices.map((s, j) => j === i ? { ...s, title: v } : s);
                  setH("homeServices", next);
                }}
              />
              <div style={{ marginBottom: "1rem" }}>
                <label style={lblStyle}>Icon</label>
                <select
                  value={svc.icon}
                  onChange={(e) => {
                    const next = homeF.homeServices.map((s, j) => j === i ? { ...s, icon: e.target.value } : s);
                    setH("homeServices", next);
                  }}
                  style={{ ...fieldStyle, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.2)")}
                >
                  <option value="Flame">🔥 Flame (Heating)</option>
                  <option value="Wind">💨 Wind (AC)</option>
                  <option value="Wrench">🔧 Wrench (Maintenance)</option>
                  <option value="Zap">⚡ Zap (Emergency)</option>
                  <option value="CheckCircle2">✓ Check Circle</option>
                  <option value="Shield">🛡 Shield</option>
                  <option value="Clock">🕐 Clock</option>
                  <option value="Award">🏆 Award</option>
                  <option value="Phone">📞 Phone</option>
                  <option value="TrendingUp">📈 Trending Up</option>
                </select>
              </div>
            </div>
            <Field
              label="Description"
              value={svc.desc}
              multiline
              onChange={(v) => {
                const next = homeF.homeServices.map((s, j) => j === i ? { ...s, desc: v } : s);
                setH("homeServices", next);
              }}
            />
          </div>
        ))}
      </SectionCard>

      {/* ── How It Works ── */}
      <SectionCard title="How It Works Section" defaultOpen={false}>
        <Field label="Badge Label" value={homeF.ourProcessLabel} onChange={(v) => setH("ourProcessLabel", v)} placeholder="Our Process" />
        <Field label="Heading" value={homeF.howItWorksHeading} onChange={(v) => setH("howItWorksHeading", v)} placeholder="How It Works" />
        <Field label="Subtitle" value={homeF.howItWorksSubtitle} onChange={(v) => setH("howItWorksSubtitle", v)} multiline placeholder="From the first consultation..." />
        <div style={{ borderTop: "1px solid rgba(217,20,34,0.08)", paddingTop: "1rem", marginTop: "0.25rem" }}>
          {homeF.howItWorksSteps.map((step, i) => (
            <div key={i} style={{ paddingBottom: "1rem", marginBottom: "1rem", borderBottom: i < homeF.howItWorksSteps.length - 1 ? "1px solid rgba(217,20,34,0.08)" : "none" }}>
              <p style={{ color: "#7a9ba8", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.75rem" }}>Step {i + 1}</p>
              <Field label="Title" value={step.title} onChange={(v) => { const next = homeF.howItWorksSteps.map((s, j) => j === i ? { ...s, title: v } : s); setH("howItWorksSteps", next); }} />
              <Field label="Description" value={step.desc} onChange={(v) => { const next = homeF.howItWorksSteps.map((s, j) => j === i ? { ...s, desc: v } : s); setH("howItWorksSteps", next); }} multiline />
              <div style={{ marginBottom: "0.5rem" }}>
                <label style={lblStyle}>Step Image</label>
                {step.image && (
                  <div style={{ marginBottom: "0.5rem" }}>
                    <img src={step.image} alt="" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid rgba(217,20,34,0.3)" }} />
                  </div>
                )}
                <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 0.875rem", background: "rgba(217,20,34,0.1)", border: "1px solid rgba(217,20,34,0.25)", borderRadius: "8px", color: "#d91422", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer" }}>
                  <Upload size={13} /> {step.image ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      e.target.value = "";
                      try {
                        const url = await uploadImage(file, "how-it-works");
                        const next = homeF.howItWorksSteps.map((s, j) => j === i ? { ...s, image: url } : s);
                        setH("howItWorksSteps", next);
                      } catch (err) {
                        alert("Upload failed: " + (err instanceof Error ? err.message : "Unknown error"));
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>


      {/* ── Featured Products ── */}
      <SectionCard title="Reference Projects Section" defaultOpen={false}>
        <Field
          label="Section Label"
          value={homeF.ourWorkLabel}
          onChange={(v) => setH("ourWorkLabel", v)}
          placeholder="Our Work"
        />
        <Field
          label="Section Title"
          value={homeF.featuredProductsTitle}
          onChange={(v) => setH("featuredProductsTitle", v)}
          placeholder="Featured Products"
        />
        <Field
          label="View All Products Button"
          value={homeF.viewAllProductsBtn}
          onChange={(v) => setH("viewAllProductsBtn", v)}
          placeholder="View All Products"
        />
        <div style={{ borderTop: "1px solid rgba(217,20,34,0.08)", paddingTop: "1rem", marginTop: "0.25rem" }}>
          {homeF.featuredProducts.map((product, i) => (
            <div
              key={i}
              style={{
                background: "rgba(10,42,53,0.5)",
                border: "1px solid rgba(217,20,34,0.12)",
                borderRadius: "12px",
                padding: "1rem",
                marginBottom: "0.75rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ color: "#d91422", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Project {i + 1}
                </span>
                <button
                  onClick={() => {
                    const next = homeF.featuredProducts.filter((_, j) => j !== i);
                    setH("featuredProducts", next);
                  }}
                  style={{ background: "rgba(212,24,61,0.08)", border: "1px solid rgba(212,24,61,0.2)", borderRadius: "8px", color: "#ff6b8a", fontSize: "0.8125rem", cursor: "pointer", padding: "0.3rem 0.6rem", display: "flex", alignItems: "center", gap: "0.35rem" }}
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>
              <Field
                label="Project Name"
                value={product.name}
                onChange={(v) => {
                  const next = homeF.featuredProducts.map((p, j) => j === i ? { ...p, name: v } : p);
                  setH("featuredProducts", next);
                }}
                placeholder="e.g. Heating System"
              />
              <div style={{ marginBottom: "0.5rem" }}>
                <label style={lblStyle}>Project Image</label>
                <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "0.4rem" }}>Upload a file or paste an image URL.</p>
                <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 0.875rem", background: "rgba(217,20,34,0.1)", border: "1px solid rgba(217,20,34,0.25)", borderRadius: "8px", color: "#d91422", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", marginBottom: "0.5rem" }}>
                  <Upload size={13} /> Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      e.target.value = "";
                      try {
                        const url = await uploadImage(file, "products");
                        const next = homeF.featuredProducts.map((p, j) => j === i ? { ...p, image: url } : p);
                        setH("featuredProducts", next);
                      } catch (err) {
                        alert("Upload failed: " + (err instanceof Error ? err.message : "Unknown error"));
                      }
                    }}
                  />
                </label>
                <input
                  value={product.image}
                  onChange={(e) => {
                    const next = homeF.featuredProducts.map((p, j) => j === i ? { ...p, image: e.target.value } : p);
                    setH("featuredProducts", next);
                  }}
                  placeholder="https://..."
                  style={fieldStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.2)")}
                />
                {product.image && (
                  <div style={{ marginTop: "0.5rem", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(217,20,34,0.15)" }}>
                    <img
                      src={product.image}
                      alt="Preview"
                      style={{ width: "100%", height: "100px", objectFit: "cover", display: "block" }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const next = [...homeF.featuredProducts, { name: "New Product", image: "" }];
              setH("featuredProducts", next);
            }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1rem", background: "rgba(217,20,34,0.08)", border: "1px dashed rgba(217,20,34,0.3)", borderRadius: "10px", color: "#d91422", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", width: "100%" }}
          >
            <Plus size={15} /> Add Product
          </button>
        </div>
      </SectionCard>

      {/* ── CTA ── */}
      <SectionCard title="CTA (Bottom Banner)" defaultOpen={false}>
        <Field label="Heading" value={homeF.ctaHeading} onChange={(v) => setH("ctaHeading", v)} />
        <Field label="Subheading" value={homeF.ctaSubheading} onChange={(v) => setH("ctaSubheading", v)} />
        <Field label="Phone / Button Link" value={homeF.ctaPhone} onChange={(v) => setH("ctaPhone", v)} />
      </SectionCard>
    </div>
  );
}
