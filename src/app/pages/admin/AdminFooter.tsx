import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, GripVertical, Upload, X, ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { useContent, defaultMultiLangContent } from "../../context/ContentContext";
import type { Lang } from "../../context/ContentContext";
import { AdminLangTabs } from "./AdminLangTabs";
import { translateSection } from "../../utils/translate";

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

const lblStyle: React.CSSProperties = {
  display: "block",
  color: "#7a9ba8",
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  marginBottom: "0.4rem",
};

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
        marginBottom: "0.875rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer", borderBottom: open ? "1px solid rgba(45,181,213,0.12)" : "none" }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ flex: 1, padding: "1rem 1.25rem", color: "#fff", fontWeight: 600, fontSize: "0.9375rem" }}>{title}</span>
        {headerExtra && <div onClick={(e) => e.stopPropagation()} style={{ marginRight: "0.75rem", flexShrink: 0 }}>{headerExtra}</div>}
        <span style={{ paddingRight: "1.25rem", display: "flex", alignItems: "center" }}>{open ? <ChevronUp size={16} color="#4a6670" /> : <ChevronDown size={16} color="#4a6670" />}</span>
      </div>
      {open && (
        <div style={{ padding: "0 1.25rem 1.25rem" }}>{children}</div>
      )}
    </div>
  );
}

export function AdminFooter() {
  const { langs, isLoaded, updateLangContent, updateAllLangs, saveNow } = useContent();
  const [adminLang, setAdminLang] = useState<Lang>("en");
  const [footerF, setFooterF] = useState({ ...langs[adminLang].footer });
  const [saved, setSaved] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFooterF({ ...langs[adminLang].footer });
    setSaved(false);
  }, [adminLang, isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const setF = (field: string, value: unknown) =>
    setFooterF((prev) => ({ ...prev, [field]: value }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => setF("logo", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  // Quick Links
  const updateQuickLink = (index: number, field: "label" | "path", value: string) => {
    const updated = footerF.quickLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setF("quickLinks", updated);
  };
  const addQuickLink = () =>
    setF("quickLinks", [...footerF.quickLinks, { label: "New Page", path: "/" }]);
  const removeQuickLink = (index: number) =>
    setF("quickLinks", footerF.quickLinks.filter((_, i) => i !== index));

  // Services
  const updateService = (index: number, value: string) => {
    const updated = footerF.services.map((s, i) => (i === index ? value : s));
    setF("services", updated);
  };
  const addService = () => setF("services", [...footerF.services, "New Service"]);
  const removeService = (index: number) =>
    setF("services", footerF.services.filter((_, i) => i !== index));

  const handleSave = async () => {
    if (adminLang === "en") {
      updateLangContent("en", (prev) => ({ ...prev, footer: footerF }));
    } else {
      updateLangContent(adminLang, (prev) => ({ ...prev, footer: footerF }));
    }
    await saveNow();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = async () => {
    const def = defaultMultiLangContent[adminLang].footer;
    setFooterF({ ...def });
    updateLangContent(adminLang, (prev) => ({ ...prev, footer: def }));
    await saveNow();
    setSaved(false);
  };

  return (
    <div>
      {/* Language Tabs */}
      <AdminLangTabs
        adminLang={adminLang}
        setAdminLang={setAdminLang}
        onCopyFromEn={() => { const en = langs["en"].footer; setFooterF({ ...en }); updateLangContent(adminLang, (prev) => ({ ...prev, footer: en })); setSaved(false); }}
        onTranslate={adminLang !== "en" ? async () => {
          const translated = await translateSection(langs["en"].footer, adminLang) as typeof footerF;
          setFooterF(translated);
          updateLangContent(adminLang, (prev) => ({ ...prev, footer: translated }));
          setSaved(false);
        } : undefined}
      />

      {/* Page Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.75rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.375rem", margin: 0 }}>
            Footer Editor
          </h2>
          <p style={{ color: "#4a6670", fontSize: "0.8125rem", marginTop: "0.25rem" }}>
            Manage the site footer — logo, description, links, services, and contact info
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.625rem" }}>
          <button onClick={handleReset}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.1rem", borderRadius: "10px", background: "rgba(10,42,53,0.8)", border: "1px solid rgba(45,181,213,0.2)", color: "#7a9ba8", fontSize: "0.875rem", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(45,181,213,0.4)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(45,181,213,0.2)"; e.currentTarget.style.color = "#7a9ba8"; }}
          >
            <RotateCcw size={14} /> Reset to Default
          </button>
          <button
            onClick={handleSave}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.625rem 1.5rem",
              background: saved ? "rgba(74,222,128,0.18)" : "linear-gradient(135deg, #2db5d5, #3dc5e5)",
              border: saved ? "1px solid rgba(74,222,128,0.4)" : "none",
              borderRadius: "10px",
              color: saved ? "#4ade80" : "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Logo Upload */}
      <SectionCard title="Logo">
        <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "0.75rem" }}>
          Displays in the footer. Recommended:{" "}
          <span style={{ color: "#2db5d5" }}>400 × 120 px (transparent PNG)</span>
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {footerF.logo ? (
            <div
              style={{
                width: "120px",
                height: "50px",
                borderRadius: "10px",
                border: "1px solid rgba(45, 181, 213, 0.25)",
                background: "rgba(15,58,74,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={footerF.logo}
                alt="Logo preview"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </div>
          ) : (
            <div
              style={{
                width: "120px",
                height: "50px",
                borderRadius: "10px",
                border: "1px dashed rgba(45, 181, 213, 0.3)",
                background: "rgba(15,58,74,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4a6670",
                fontSize: "0.75rem",
              }}
            >
              No logo
            </div>
          )}
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ display: "none" }}
          />
          <button
            onClick={() => logoInputRef.current?.click()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 1rem",
              background: "rgba(45, 181, 213, 0.15)",
              border: "1px solid rgba(45, 181, 213, 0.3)",
              borderRadius: "8px",
              color: "#2db5d5",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Upload size={14} />
            {footerF.logo ? "Change" : "Upload Logo"}
          </button>
          {footerF.logo && (
            <button
              onClick={() => setF("logo", undefined)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1rem",
                background: "rgba(212, 24, 61, 0.1)",
                border: "1px solid rgba(212, 24, 61, 0.25)",
                borderRadius: "8px",
                color: "#ff6b8a",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <X size={14} />
              Remove
            </button>
          )}
        </div>
      </SectionCard>

      {/* Description */}
      <SectionCard title="Description">
        <label style={lblStyle}>Company Description</label>
        <textarea
          value={footerF.description}
          onChange={(e) => setF("description", e.target.value)}
          placeholder="Short description shown below the logo in the footer..."
          rows={3}
          style={{
            ...fieldStyle,
            resize: "vertical",
            minHeight: "80px",
            lineHeight: 1.6,
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.55)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.2)")}
        />
      </SectionCard>

      {/* Quick Links */}
      <SectionCard title="Quick Links">
        <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "1rem" }}>
          Navigation links displayed in the footer Quick Links column.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
          {footerF.quickLinks.map((link, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "rgba(15, 58, 74, 0.4)",
                border: "1px solid rgba(45, 181, 213, 0.12)",
                borderRadius: "10px",
                padding: "0.6rem 0.75rem",
              }}
            >
              <GripVertical size={16} color="#4a6670" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <div>
                  <label style={{ ...lblStyle, marginBottom: "0.2rem" }}>Label</label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateQuickLink(index, "label", e.target.value)}
                    placeholder="Home"
                    style={{ ...fieldStyle, padding: "0.4rem 0.6rem", fontSize: "0.85rem" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.55)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.2)")}
                  />
                </div>
                <div>
                  <label style={{ ...lblStyle, marginBottom: "0.2rem" }}>Path</label>
                  <input
                    type="text"
                    value={link.path}
                    onChange={(e) => updateQuickLink(index, "path", e.target.value)}
                    placeholder="/services"
                    style={{ ...fieldStyle, padding: "0.4rem 0.6rem", fontSize: "0.85rem" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.55)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.2)")}
                  />
                </div>
              </div>
              <button
                onClick={() => removeQuickLink(index)}
                style={{
                  background: "rgba(212, 24, 61, 0.1)",
                  border: "1px solid rgba(212, 24, 61, 0.2)",
                  borderRadius: "8px",
                  color: "#ff6b8a",
                  cursor: "pointer",
                  padding: "0.4rem",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addQuickLink}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.5rem 1.1rem",
            background: "rgba(45, 181, 213, 0.12)",
            border: "1px dashed rgba(45, 181, 213, 0.35)",
            borderRadius: "8px",
            color: "#2db5d5",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Plus size={15} />
          Add Link
        </button>
      </SectionCard>

      {/* Our Services */}
      <SectionCard title="Our Services">
        <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "1rem" }}>
          Service names shown in the footer Our Services column.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
          {footerF.services.map((service, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <GripVertical size={16} color="#4a6670" style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={service}
                onChange={(e) => updateService(index, e.target.value)}
                placeholder="Service name"
                style={{ ...fieldStyle, flex: 1 }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.55)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.2)")}
              />
              <button
                onClick={() => removeService(index)}
                style={{
                  background: "rgba(212, 24, 61, 0.1)",
                  border: "1px solid rgba(212, 24, 61, 0.2)",
                  borderRadius: "8px",
                  color: "#ff6b8a",
                  cursor: "pointer",
                  padding: "0.4rem",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addService}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.5rem 1.1rem",
            background: "rgba(45, 181, 213, 0.12)",
            border: "1px dashed rgba(45, 181, 213, 0.35)",
            borderRadius: "8px",
            color: "#2db5d5",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Plus size={15} />
          Add Service
        </button>
      </SectionCard>

      {/* Contact Info */}
      <SectionCard title="Contact Us">
        <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "1rem" }}>
          Contact details shown in the footer Contact Us column.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={lblStyle}>Phone</label>
            <input
              type="text"
              value={footerF.phone}
              onChange={(e) => setF("phone", e.target.value)}
              placeholder="+389 70 777 888"
              style={fieldStyle}
              onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.55)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.2)")}
            />
          </div>
          <div>
            <label style={lblStyle}>Email</label>
            <input
              type="email"
              value={footerF.email}
              onChange={(e) => setF("email", e.target.value)}
              placeholder="info@jubea-energy.com"
              style={fieldStyle}
              onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.55)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.2)")}
            />
          </div>
        </div>
        <div>
          <label style={lblStyle}>Address</label>
          <input
            type="text"
            value={footerF.address}
            onChange={(e) => setF("address", e.target.value)}
            placeholder="Gostivar, North Macedonia"
            style={fieldStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.55)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.2)")}
          />
        </div>
      </SectionCard>

      {/* Map */}
      <SectionCard title="Map (Location Card)">
        <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "1rem" }}>
          The map card in the footer shows a location pin and a <strong style={{ color: "#fff" }}>"Directions ↗"</strong> link.
          By default it uses the <strong style={{ color: "#fff" }}>Address</strong> field above.
          Paste a custom Google Maps URL below to override the destination (useful for precise pin placement).
        </p>
        {/* How-to hint */}
        <div style={{
          background: "rgba(45, 181, 213, 0.06)",
          border: "1px solid rgba(45, 181, 213, 0.18)",
          borderRadius: "10px",
          padding: "0.75rem 1rem",
          marginBottom: "1rem",
          fontSize: "0.75rem",
          color: "#7a9ba8",
          lineHeight: 1.7,
        }}>
          <strong style={{ color: "#2db5d5" }}>How to get a Google Maps link:</strong><br />
          1. Open <span style={{ color: "#fff" }}>google.com/maps</span> and search your address<br />
          2. Click <strong style={{ color: "#fff" }}>Share → Copy link</strong><br />
          3. Paste the URL below
        </div>
        <label style={lblStyle}>Custom Directions URL (optional)</label>
        <input
          type="url"
          value={footerF.mapDirectionsUrl || ""}
          onChange={(e) => setF("mapDirectionsUrl", e.target.value || undefined)}
          placeholder="https://maps.google.com/... (leave blank to use address)"
          style={fieldStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.55)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.2)")}
        />
        {footerF.mapDirectionsUrl && (
          <a
            href={footerF.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              marginTop: "0.6rem",
              fontSize: "0.75rem",
              color: "#2db5d5",
              textDecoration: "none",
            }}
          >
            ↗ Test this link
          </a>
        )}
      </SectionCard>
    </div>
  );
}
