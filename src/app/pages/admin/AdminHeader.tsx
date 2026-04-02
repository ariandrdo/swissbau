import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, GripVertical, Upload, X, ChevronUp, ChevronDown } from "lucide-react";
import { useContent } from "../../context/ContentContext";
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

export function AdminHeader() {
  const { langs, updateLangContent, updateAllLangs } = useContent();
  const [adminLang, setAdminLang] = useState<Lang>("en");
  const [headerF, setHeaderF] = useState({ ...langs[adminLang].header });
  const [saved, setSaved] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHeaderF({ ...langs[adminLang].header });
    setSaved(false);
  }, [adminLang]); // eslint-disable-line react-hooks/exhaustive-deps

  const setH = (field: string, value: unknown) =>
    setHeaderF((prev) => ({ ...prev, [field]: value }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => setH("logo", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const updateNavLink = (index: number, field: "label" | "path", value: string) => {
    const updated = headerF.navLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setH("navLinks", updated);
  };

  const addNavLink = () =>
    setH("navLinks", [...headerF.navLinks, { label: "New Page", path: "/" }]);

  const removeNavLink = (index: number) =>
    setH("navLinks", headerF.navLinks.filter((_, i) => i !== index));

  const handleSave = () => {
    if (adminLang === "en") {
      updateLangContent("en", (prev) => ({ ...prev, header: headerF }));
    } else {
      updateLangContent(adminLang, (prev) => ({ ...prev, header: headerF }));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      {/* Language Tabs */}
      <AdminLangTabs
        adminLang={adminLang}
        setAdminLang={setAdminLang}
        onCopyFromEn={() => { const en = langs["en"].header; setHeaderF({ ...en }); updateLangContent(adminLang, (prev) => ({ ...prev, header: en })); setSaved(false); }}
        onTranslate={adminLang !== "en" ? async () => {
          const translated = await translateSection(langs["en"].header, adminLang) as typeof headerF;
          setHeaderF(translated);
          updateLangContent(adminLang, (prev) => ({ ...prev, header: translated }));
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
            Header Editor
          </h2>
          <p style={{ color: "#4a6670", fontSize: "0.8125rem", marginTop: "0.25rem" }}>
            Manage the site header — logo, navigation menu, and phone number
          </p>
        </div>
        <button
          onClick={handleSave}
          style={{
            padding: "0.625rem 1.5rem",
            background: saved
              ? "linear-gradient(135deg, #22c55e, #16a34a)"
              : "linear-gradient(135deg, #2db5d5, #3dc5e5)",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 14px rgba(45, 181, 213, 0.3)",
          }}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Logo Upload */}
      <SectionCard title="Logo">
        <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "0.75rem" }}>
          Displays in the site header. Recommended:{" "}
          <span style={{ color: "#2db5d5" }}>400 × 120 px (transparent PNG)</span>
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {headerF.logo ? (
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
                src={headerF.logo}
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
            {headerF.logo ? "Change" : "Upload Logo"}
          </button>
          {headerF.logo && (
            <button
              onClick={() => setH("logo", undefined)}
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

      {/* Phone Number */}
      <SectionCard title="Phone Number">
        <label style={lblStyle}>Phone Number</label>
        <input
          type="text"
          value={headerF.phone}
          onChange={(e) => setH("phone", e.target.value)}
          placeholder="+389 70 777 888"
          style={fieldStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.55)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.2)")}
        />
        <p style={{ color: "#4a6670", fontSize: "0.75rem", marginTop: "0.4rem" }}>
          Shown in the top-right header button and mobile menu.
        </p>
      </SectionCard>

      {/* Navigation Menu */}
      <SectionCard title="Navigation Menu">
        <p style={{ color: "#4a6670", fontSize: "0.75rem", marginBottom: "1rem" }}>
          Add, remove, or rename the menu items shown in the header.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
          {headerF.navLinks.map((link, index) => (
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
                    onChange={(e) => updateNavLink(index, "label", e.target.value)}
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
                    onChange={(e) => updateNavLink(index, "path", e.target.value)}
                    placeholder="/services"
                    style={{ ...fieldStyle, padding: "0.4rem 0.6rem", fontSize: "0.85rem" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.55)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(45, 181, 213, 0.2)")}
                  />
                </div>
              </div>
              <button
                onClick={() => removeNavLink(index)}
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
          onClick={addNavLink}
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
          Add Menu Item
        </button>
      </SectionCard>
    </div>
  );
}
