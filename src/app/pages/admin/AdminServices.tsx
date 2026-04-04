import { useState, useRef, useEffect } from "react";
import { Wind, Flame, Wrench, Calendar, Zap, Shield, Clock, Home, Building2, ThermometerSun, Users, Phone, Award, Package, Settings, Trash2, ChevronDown, ChevronUp, RotateCcw, Save, Plus, X, Upload } from "lucide-react";
import { useContent, defaultMultiLangContent } from "../../context/ContentContext";
import type { Lang } from "../../context/ContentContext";
import { uploadImage } from "../../utils/uploadImage";
import { AdminLangTabs } from "./AdminLangTabs";
import { translateSection } from "../../utils/translate";

const serviceIcons: Record<string, React.ElementType> = {
  cooling: Wind,
  heating: Flame,
  repair: Wrench,
  maintenance: Calendar,
};

const serviceColors: Record<string, string> = {
  cooling: "#2db5d5",
  heating: "#f97316",
  repair: "#8b5cf6",
  maintenance: "#10b981",
};

const ICON_MAP: Record<string, React.ElementType> = {
  Wind, Flame, Wrench, Calendar, Zap, Shield, Clock, Home,
  Building2, ThermometerSun, Users, Phone, Award, Package, Settings,
};

const ICON_OPTIONS = Object.entries(ICON_MAP).map(([name, icon]) => ({ name, icon }));

const DEFAULT_ICON_BY_ID: Record<string, string> = {
  cooling: "Wind",
  heating: "Flame",
  repair: "Wrench",
  maintenance: "Calendar",
};

type DetailedService = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  benefits: string[];
  image?: string;
  icon?: string;
};

// ── shared UI helpers ─────────────────────────────────────────────────────────

const lbl = (text: string) => (
  <p
    style={{
      color: "#7a9ba8",
      fontSize: "0.6875rem",
      fontWeight: 700,
      textTransform: "uppercase" as const,
      letterSpacing: "0.07em",
      marginBottom: "0.375rem",
    }}
  >
    {text}
  </p>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(4, 33, 66, 0.6)",
  border: "1px solid rgba(45, 181, 213, 0.2)",
  borderRadius: "10px",
  padding: "0.625rem 0.875rem",
  color: "#fff",
  fontSize: "0.9375rem",
  outline: "none",
  boxSizing: "border-box",
};

const taStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical" as const,
  minHeight: "90px",
  lineHeight: 1.6,
};

// ── collapsible section card ──────────────────────────────────────────────────

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
        border: "1px solid rgba(45, 181, 213, 0.12)",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "0.875rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", padding: "0 1.25rem", cursor: "pointer" }} onClick={() => setOpen((o) => !o)}>
        <span style={{ flex: 1, color: "#fff", fontWeight: 600, fontSize: "0.9375rem", padding: "1rem 0" }}>{title}</span>
        {headerExtra && (
          <div onClick={(e) => e.stopPropagation()} style={{ marginRight: "0.75rem", flexShrink: 0 }}>
            {headerExtra}
          </div>
        )}
        <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {open ? <ChevronUp size={16} color="#4a6670" /> : <ChevronDown size={16} color="#4a6670" />}
        </span>
      </div>
      {open && (
        <div
          style={{
            padding: "0 1.25rem 1.25rem",
            borderTop: "1px solid rgba(45, 181, 213, 0.1)",
            paddingTop: "1rem",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ── ServiceCard ────────────────────────────────────────────────────────────────

function ServiceCard({
  svc,
  index,
  onChange,
  onRemove,
}: {
  svc: DetailedService;
  index: number;
  onChange: (updated: DetailedService) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const currentIconName = svc.icon ?? DEFAULT_ICON_BY_ID[svc.id] ?? "Wrench";
  const Icon = ICON_MAP[currentIconName] ?? Wrench;
  const accent = serviceColors[svc.id] ?? "#2db5d5";

  const set = (field: keyof DetailedService, value: string | string[]) =>
    onChange({ ...svc, [field]: value });

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    try {
      const url = await uploadImage(file, "services", 600, 0.72);
      onChange({ ...svc, image: url });
    } catch (e) {
      alert("Image upload failed: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  };

  const addService = () => {
    const trimmed = newService.trim();
    if (!trimmed) return;
    set("services", [...svc.services, trimmed]);
    setNewService("");
  };

  const removeService = (i: number) =>
    set("services", svc.services.filter((_, idx) => idx !== i));

  return (
    <div
      style={{
        background: "#0d2840",
        border: `1px solid ${open ? `${accent}44` : "rgba(45, 181, 213, 0.12)"}`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
          padding: "1rem 1.25rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left" as const,
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: `${accent}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={20} color={accent} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.9375rem" }}>
            {svc.title || "(Untitled)"}
          </div>
          <div
            style={{
              color: "#7a9ba8",
              fontSize: "0.8125rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {svc.subtitle}
          </div>
        </div>
        {open ? (
          <ChevronUp size={16} color="#7a9ba8" />
        ) : (
          <ChevronDown size={16} color="#7a9ba8" />
        )}
      </button>

      {open && (
        <div
          style={{
            padding: "0 1.25rem 1.25rem",
            borderTop: "1px solid rgba(45, 181, 213, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            paddingTop: "1rem",
          }}
        >
          <div>
            {lbl("Icon")}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {ICON_OPTIONS.map(({ name, icon: IconComp }) => {
                const isSelected = currentIconName === name;
                return (
                  <button
                    key={name}
                    onClick={() => set("icon", name)}
                    title={name}
                    style={{ width: "38px", height: "38px", borderRadius: "8px", background: isSelected ? "rgba(45,181,213,0.2)" : "rgba(10,42,53,0.6)", border: isSelected ? "1px solid rgba(45,181,213,0.7)" : "1px solid rgba(45,181,213,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}
                  >
                    <IconComp size={16} color={isSelected ? "#2db5d5" : "#7a9ba8"} />
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            {lbl("Title")}
            <input
              style={inputStyle}
              value={svc.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Service title"
            />
          </div>
          <div>
            {lbl("Subtitle")}
            <input
              style={inputStyle}
              value={svc.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              placeholder="Short tagline"
            />
          </div>
          <div>
            {lbl("Description")}
            <textarea
              style={taStyle}
              value={svc.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe this service..."
            />
          </div>
          <div>
            {lbl("Service Image")}
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); e.target.value = ""; }}
            />
            {svc.image ? (
              <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(45,181,213,0.2)" }}>
                <img src={svc.image} alt="Service preview" style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }} />
                <button
                  onClick={() => onChange({ ...svc, image: "" })}
                  style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "6px", color: "#fff", cursor: "pointer", padding: "0.3rem 0.5rem", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.25rem" }}
                >
                  <X size={12} /> Remove
                </button>
              </div>
            ) : (
              <button
                onClick={() => imageRef.current?.click()}
                style={{ width: "100%", padding: "0.875rem", background: "rgba(4, 33, 66, 0.6)", border: "2px dashed rgba(45,181,213,0.3)", borderRadius: "10px", color: "#4a6670", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.875rem", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(45,181,213,0.6)"; e.currentTarget.style.color = "#2db5d5"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(45,181,213,0.3)"; e.currentTarget.style.color = "#4a6670"; }}
              >
                <Upload size={16} /> Upload Image
              </button>
            )}
            <p style={{ color: "#4a6670", fontSize: "0.7rem", marginTop: "0.35rem", lineHeight: 1.5 }}>
              Recommended: <span style={{ color: "#2db5d5" }}>1200 × 1000 px (6:5 portrait-ish)</span> — images display at ~570 × 500 px on the Services page. If not uploaded, a default image is used.
            </p>
          </div>
          <div>
            {lbl("Services Included")}
            {/* Existing items */}
            {svc.services.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", marginBottom: "0.625rem" }}>
                {svc.services.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(10,42,53,0.6)", border: "1px solid rgba(45,181,213,0.12)", borderRadius: "8px", padding: "0.45rem 0.5rem 0.45rem 0.75rem" }}>
                    <span style={{ flex: 1, color: "#e0eef2", fontSize: "0.875rem" }}>{item}</span>
                    <button
                      onClick={() => removeService(i)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#4a6670", padding: "0.125rem", display: "flex", flexShrink: 0 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6b8a")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#4a6670")}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Add new item */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addService(); } }}
                placeholder="e.g. New AC Installation"
              />
              <button
                onClick={addService}
                style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.625rem 0.875rem", background: "rgba(45,181,213,0.12)", border: "1px solid rgba(45,181,213,0.25)", borderRadius: "10px", color: "#2db5d5", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
          {/* Remove card */}
          <button
            onClick={onRemove}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1rem", background: "rgba(212,24,61,0.08)", border: "1px solid rgba(212,24,61,0.2)", borderRadius: "10px", color: "#ff6b8a", fontSize: "0.8125rem", cursor: "pointer", marginTop: "0.25rem", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,24,61,0.15)"; e.currentTarget.style.borderColor = "rgba(212,24,61,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,24,61,0.08)"; e.currentTarget.style.borderColor = "rgba(212,24,61,0.2)"; }}
          >
            <Trash2 size={14} /> Remove Service Card
          </button>
        </div>
      )}
    </div>
  );
}

// ── AdminServices ──────────────────────────────────────────────────────────────

export function AdminServices() {
  const { langs, isLoaded, updateLangContent, updateAllLangs, saveNow } = useContent();
  const [adminLang, setAdminLang] = useState<Lang>("en");

  const langServices = langs[adminLang].services;

  // Page-level text fields (hero / emergency / CTA)
  const [pageFields, setPageFields] = useState({
    heroTitle1: langServices.heroTitle1,
    heroTitle2: langServices.heroTitle2,
    heroSubtitle: langServices.heroSubtitle,
    heroBtnText: langServices.heroBtnText,
    heroBtnLink: langServices.heroBtnLink,
    emergencyPhone: langServices.emergencyPhone,
    ctaHeading: langServices.ctaHeading,
    ctaSubheading: langServices.ctaSubheading,
    ctaPhone: langServices.ctaPhone,
    ctaBtnText: langServices.ctaBtnText,
    ctaBtnLink: langServices.ctaBtnLink,
    showAdditionalServices: langServices.showAdditionalServices !== false,
    additionalServicesHeading: langServices.additionalServicesHeading,
    showAdvantage: langServices.showAdvantage !== false,
    advantageHeading: langServices.advantageHeading,
    showEmergencyBanner: langServices.showEmergencyBanner !== false,
  });

  // Service cards
  const [services, setServices] = useState<DetailedService[]>(
    () => langServices.detailedServices
  );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = langs[adminLang].services;
    setPageFields({
      heroTitle1: s.heroTitle1,
      heroTitle2: s.heroTitle2,
      heroSubtitle: s.heroSubtitle,
      heroBtnText: s.heroBtnText,
      heroBtnLink: s.heroBtnLink,
      emergencyPhone: s.emergencyPhone,
      ctaHeading: s.ctaHeading,
      ctaSubheading: s.ctaSubheading,
      ctaPhone: s.ctaPhone,
      ctaBtnText: s.ctaBtnText,
      ctaBtnLink: s.ctaBtnLink,
      showAdditionalServices: s.showAdditionalServices !== false,
      additionalServicesHeading: s.additionalServicesHeading,
      showAdvantage: s.showAdvantage !== false,
      advantageHeading: s.advantageHeading,
      showEmergencyBanner: s.showEmergencyBanner !== false,
    });
    setServices(s.detailedServices);
    setSaved(false);
  }, [adminLang, isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const setField = (key: keyof typeof pageFields, value: string) =>
    setPageFields((prev) => ({ ...prev, [key]: value }));

  const handleChange = (index: number, updated: DetailedService) => {
    setServices((prev) => prev.map((s, i) => (i === index ? updated : s)));
    setSaved(false);
  };

  const handleAdd = () => {
    setServices((prev) => [
      ...prev,
      { id: `service_${Date.now()}`, title: "New Service", subtitle: "Brief description", description: "", services: [], benefits: [], icon: "Wrench", image: "" },
    ]);
    setSaved(false);
  };

  const handleRemove = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleSave = async () => {
    const updatedServices = { ...langs[adminLang].services, ...pageFields, detailedServices: services };
    if (adminLang === "en") {
      updateLangContent("en", (prev) => ({ ...prev, services: updatedServices }));
    } else {
      updateLangContent(adminLang, (prev) => ({ ...prev, services: updatedServices }));
    }
    await saveNow();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    const ds = defaultMultiLangContent[adminLang].services;
    setPageFields({
      heroTitle1: ds.heroTitle1,
      heroTitle2: ds.heroTitle2,
      heroSubtitle: ds.heroSubtitle,
      heroBtnText: ds.heroBtnText,
      heroBtnLink: ds.heroBtnLink,
      emergencyPhone: ds.emergencyPhone,
      ctaHeading: ds.ctaHeading,
      ctaSubheading: ds.ctaSubheading,
      ctaPhone: ds.ctaPhone,
      ctaBtnText: ds.ctaBtnText,
      ctaBtnLink: ds.ctaBtnLink,
      showAdditionalServices: ds.showAdditionalServices !== false,
      additionalServicesHeading: ds.additionalServicesHeading,
      showAdvantage: ds.showAdvantage !== false,
      advantageHeading: ds.advantageHeading,
      showEmergencyBanner: ds.showEmergencyBanner !== false,
    });
    setServices(ds.detailedServices);
    updateLangContent(adminLang, (prev) => ({
      ...prev,
      services: { ...ds },
    }));
    setSaved(false);
  };

  return (
    <div>
      {/* Language Tabs */}
      <AdminLangTabs
        adminLang={adminLang}
        setAdminLang={setAdminLang}
        onCopyFromEn={() => { const en = langs["en"].services; setPageFields({ heroTitle1: en.heroTitle1, heroTitle2: en.heroTitle2, heroSubtitle: en.heroSubtitle, heroBtnText: en.heroBtnText, heroBtnLink: en.heroBtnLink, emergencyPhone: en.emergencyPhone, ctaHeading: en.ctaHeading, ctaSubheading: en.ctaSubheading, ctaPhone: en.ctaPhone, ctaBtnText: en.ctaBtnText, ctaBtnLink: en.ctaBtnLink, showAdditionalServices: en.showAdditionalServices !== false, additionalServicesHeading: en.additionalServicesHeading, showAdvantage: en.showAdvantage !== false, advantageHeading: en.advantageHeading, showEmergencyBanner: en.showEmergencyBanner !== false }); setServices(en.detailedServices); updateLangContent(adminLang, (prev) => ({ ...prev, services: en })); setSaved(false); }}
        onTranslate={adminLang !== "en" ? async () => {
          const t = await translateSection(langs["en"].services, adminLang) as typeof langs["en"]["services"];
          setPageFields({ heroTitle1: t.heroTitle1, heroTitle2: t.heroTitle2, heroSubtitle: t.heroSubtitle, heroBtnText: t.heroBtnText, heroBtnLink: t.heroBtnLink, emergencyPhone: t.emergencyPhone, ctaHeading: t.ctaHeading, ctaSubheading: t.ctaSubheading, ctaPhone: t.ctaPhone, ctaBtnText: t.ctaBtnText, ctaBtnLink: t.ctaBtnLink, showAdditionalServices: t.showAdditionalServices !== false, additionalServicesHeading: t.additionalServicesHeading, showAdvantage: t.showAdvantage !== false, advantageHeading: t.advantageHeading, showEmergencyBanner: t.showEmergencyBanner !== false });
          setServices(t.detailedServices);
          updateLangContent(adminLang, (prev) => ({ ...prev, services: t }));
          setSaved(false);
        } : undefined}
      />

      {/* Header row */}
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
            Services Editor
          </h2>
          <p style={{ color: "#7a9ba8", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Edit all content for the Services page.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.625rem" }}>
          <button
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1.1rem",
              borderRadius: "10px",
              background: "rgba(10, 42, 53, 0.8)",
              border: "1px solid rgba(45, 181, 213, 0.2)",
              color: "#7a9ba8",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(45, 181, 213, 0.4)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(45, 181, 213, 0.2)";
              e.currentTarget.style.color = "#7a9ba8";
            }}
          >
            <RotateCcw size={14} />
            Reset to Default
          </button>

          <button
            onClick={handleSave}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1.25rem",
              borderRadius: "10px",
              background: saved
                ? "rgba(74, 222, 128, 0.18)"
                : "linear-gradient(135deg, #2db5d5, #3dc5e5)",
              border: saved ? "1px solid rgba(74, 222, 128, 0.4)" : "none",
              color: saved ? "#4ade80" : "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            <Save size={14} />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <SectionCard title="Hero Section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            {lbl("Title Line 1")}
            <input
              style={inputStyle}
              value={pageFields.heroTitle1}
              onChange={(e) => setField("heroTitle1", e.target.value)}
              placeholder="Professional HVAC"
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            {lbl("Title Line 2 (Accent)")}
            <input
              style={inputStyle}
              value={pageFields.heroTitle2}
              onChange={(e) => setField("heroTitle2", e.target.value)}
              placeholder="Services"
            />
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          {lbl("Subtitle")}
          <input
            style={inputStyle}
            value={pageFields.heroSubtitle}
            onChange={(e) => setField("heroSubtitle", e.target.value)}
            placeholder="Expert heating and cooling solutions..."
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            {lbl('"Get Free Quote" Button Text')}
            <input
              style={inputStyle}
              value={pageFields.heroBtnText}
              onChange={(e) => setField("heroBtnText", e.target.value)}
              placeholder="Get Free Quote"
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            {lbl('"Get Free Quote" Button Link')}
            <input
              style={inputStyle}
              value={pageFields.heroBtnLink}
              onChange={(e) => setField("heroBtnLink", e.target.value)}
              placeholder="/contact"
            />
          </div>
        </div>
      </SectionCard>

      {/* ── Emergency Banner ── */}
      <SectionCard
        title="Emergency Banner"
        defaultOpen={false}
        headerExtra={
          <button
            onClick={() => setPageFields((prev) => ({ ...prev, showEmergencyBanner: !prev.showEmergencyBanner }))}
            style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.25rem 0.625rem", borderRadius: "6px", cursor: "pointer", background: pageFields.showEmergencyBanner ? "rgba(61,197,113,0.12)" : "rgba(200,50,50,0.12)", border: `1px solid ${pageFields.showEmergencyBanner ? "rgba(61,197,113,0.3)" : "rgba(200,50,50,0.3)"}`, color: pageFields.showEmergencyBanner ? "#3dc571" : "#e05555", whiteSpace: "nowrap" as const }}
          >
            {pageFields.showEmergencyBanner ? "● Visible" : "● Hidden"}
          </button>
        }
      >
        <div>
          {lbl("Emergency Phone Number")}
          <input
            style={inputStyle}
            value={pageFields.emergencyPhone}
            onChange={(e) => setField("emergencyPhone", e.target.value)}
            placeholder="+389 70 777 888"
          />
        </div>
      </SectionCard>

      {/* ── CTA (Bottom Banner) ── */}
      <SectionCard title="CTA (Bottom Banner)" defaultOpen={false}>
        <div style={{ marginBottom: "1rem" }}>
          {lbl("Heading")}
          <input
            style={inputStyle}
            value={pageFields.ctaHeading}
            onChange={(e) => setField("ctaHeading", e.target.value)}
            placeholder="Ready to Get Started?"
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          {lbl("Subheading")}
          <input
            style={inputStyle}
            value={pageFields.ctaSubheading}
            onChange={(e) => setField("ctaSubheading", e.target.value)}
            placeholder="Contact us today..."
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          {lbl("Phone Number")}
          <input
            style={inputStyle}
            value={pageFields.ctaPhone}
            onChange={(e) => setField("ctaPhone", e.target.value)}
            placeholder="+389 70 777 888"
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <div>
            {lbl('"Schedule Service Now" Button Text')}
            <input
              style={inputStyle}
              value={pageFields.ctaBtnText}
              onChange={(e) => setField("ctaBtnText", e.target.value)}
              placeholder="Schedule Service Now"
            />
          </div>
          <div>
            {lbl('"Schedule Service Now" Button Link')}
            <input
              style={inputStyle}
              value={pageFields.ctaBtnLink}
              onChange={(e) => setField("ctaBtnLink", e.target.value)}
              placeholder="/contact"
            />
          </div>
        </div>
      </SectionCard>

      {/* ── Additional Services Section ── */}
      <SectionCard
        title="Additional Services Section"
        headerExtra={
          <button
            onClick={() => setPageFields((prev) => ({ ...prev, showAdditionalServices: !prev.showAdditionalServices }))}
            style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.25rem 0.625rem", borderRadius: "6px", cursor: "pointer", background: pageFields.showAdditionalServices ? "rgba(61,197,113,0.12)" : "rgba(200,50,50,0.12)", border: `1px solid ${pageFields.showAdditionalServices ? "rgba(61,197,113,0.3)" : "rgba(200,50,50,0.3)"}`, color: pageFields.showAdditionalServices ? "#3dc571" : "#e05555", whiteSpace: "nowrap" as const }}
          >
            {pageFields.showAdditionalServices ? "● Visible" : "● Hidden"}
          </button>
        }
      >
        <div>
          {lbl("Section Heading")}
          <input
            style={inputStyle}
            value={pageFields.additionalServicesHeading}
            onChange={(e) => setField("additionalServicesHeading", e.target.value)}
            placeholder="Additional Services"
          />
        </div>
      </SectionCard>

      {/* ── The Jubea Advantage Section ── */}
      <SectionCard
        title="The Jubea Advantage Section"
        headerExtra={
          <button
            onClick={() => setPageFields((prev) => ({ ...prev, showAdvantage: !prev.showAdvantage }))}
            style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.25rem 0.625rem", borderRadius: "6px", cursor: "pointer", background: pageFields.showAdvantage ? "rgba(61,197,113,0.12)" : "rgba(200,50,50,0.12)", border: `1px solid ${pageFields.showAdvantage ? "rgba(61,197,113,0.3)" : "rgba(200,50,50,0.3)"}`, color: pageFields.showAdvantage ? "#3dc571" : "#e05555", whiteSpace: "nowrap" as const }}
          >
            {pageFields.showAdvantage ? "● Visible" : "● Hidden"}
          </button>
        }
      >
        <div>
          {lbl("Section Heading")}
          <input
            style={inputStyle}
            value={pageFields.advantageHeading}
            onChange={(e) => setField("advantageHeading", e.target.value)}
            placeholder="The Jubea Advantage"
          />
        </div>
      </SectionCard>

      {/* ── Service Cards ── */}
      <div
        style={{
          color: "#4a6670",
          fontSize: "0.6875rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "0.625rem",
          marginTop: "0.25rem",
        }}
      >
        Service Cards
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {services.map((svc, i) => (
          <ServiceCard
            key={svc.id}
            svc={svc}
            index={i}
            onChange={(updated) => handleChange(i, updated)}
            onRemove={() => handleRemove(i)}
          />
        ))}
      </div>
      <button
        onClick={handleAdd}
        style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", background: "rgba(45,181,213,0.1)", border: "1px dashed rgba(45,181,213,0.35)", borderRadius: "14px", color: "#2db5d5", fontSize: "0.9375rem", fontWeight: 600, cursor: "pointer", width: "100%", justifyContent: "center", marginTop: "0.25rem", transition: "all 0.2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(45,181,213,0.18)"; e.currentTarget.style.borderColor = "rgba(45,181,213,0.6)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(45,181,213,0.1)"; e.currentTarget.style.borderColor = "rgba(45,181,213,0.35)"; }}
      >
        <Plus size={16} /> Add Service Card
      </button>

      {/* Hint */}
      <div
        style={{
          marginTop: "1.5rem",
          padding: "0.875rem 1.125rem",
          background: "rgba(45, 181, 213, 0.07)",
          border: "1px solid rgba(45, 181, 213, 0.15)",
          borderRadius: "12px",
          color: "#7a9ba8",
          fontSize: "0.8125rem",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#2db5d5" }}>Tip:</strong> Click{" "}
        <strong style={{ color: "#fff" }}>Save Changes</strong> to apply all edits to the live
        Services page. Service icons are fixed — text content and images are editable here.
      </div>
    </div>
  );
}
