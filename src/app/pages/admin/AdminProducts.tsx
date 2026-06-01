import { useState, useRef, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Save, Upload, Images, ChevronDown, ChevronUp, Tag } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { uploadImage } from "../../utils/uploadImage";
import { useContent, type Lang } from "../../context/ContentContext";

const CATEGORIES_KEY = (lang: string) => `swissbau_project_categories_${lang}`;

function loadCategories(lang: string): string[] {
  try { return JSON.parse(localStorage.getItem(CATEGORIES_KEY(lang)) || "[]"); } catch { return []; }
}
function saveCategories(lang: string, cats: string[]) {
  localStorage.setItem(CATEGORIES_KEY(lang), JSON.stringify(cats));
}

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  duration: string;
  images: string;
  lang: string;
  group_id: number | null;
  created_at: string;
};

type ProjectForm = {
  title: string;
  category: string;
  description: string;
  location: string;
  duration: string;
  images: string;
};

const emptyForm = (): ProjectForm => ({
  title: "", category: "", description: "", location: "", duration: "", images: "",
});

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

const lblStyle: React.CSSProperties = {
  display: "block",
  color: "#7a9ba8",
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  marginBottom: "0.4rem",
};

function SectionCard({ title, children, defaultOpen = false, headerExtra }: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  headerExtra?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: "#0d2840", border: "1px solid rgba(217,20,34,0.12)", borderRadius: "16px", marginBottom: "0.875rem", overflow: "hidden" }}>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer", borderBottom: open ? "1px solid rgba(217,20,34,0.12)" : "none" }}
        onClick={() => setOpen((o) => !o)}
      >
        <span style={{ flex: 1, padding: "1rem 1.25rem", color: "#fff", fontWeight: 600, fontSize: "0.9375rem" }}>{title}</span>
        {headerExtra && <div onClick={(e) => e.stopPropagation()} style={{ marginRight: "0.75rem", flexShrink: 0 }}>{headerExtra}</div>}
        <span style={{ paddingRight: "1.25rem", display: "flex", alignItems: "center" }}>
          {open ? <ChevronUp size={16} color="#4a6670" /> : <ChevronDown size={16} color="#4a6670" />}
        </span>
      </div>
      {open && <div style={{ padding: "0 1.25rem 1.25rem" }}>{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = "rgba(217,20,34,0.6)");
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = "rgba(217,20,34,0.2)");
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={lblStyle}>{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3}
          style={{ ...fieldStyle, resize: "vertical" }} onFocus={focus} onBlur={blur} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          style={fieldStyle} onFocus={focus} onBlur={blur} />
      )}
    </div>
  );
}

export function AdminProducts() {
  const { langs, isLoaded, updateLangContent, saveNow } = useContent();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<string[]>(() => loadCategories("en"));
  const [catInput, setCatInput] = useState("");
  const [adminLang, setAdminLang] = useState<Lang>("de");

  // Hero section state
  const [heroF, setHeroF] = useState({ ...langs[adminLang].products });
  const [heroSaved, setHeroSaved] = useState(false);

  useEffect(() => {
    setHeroF({ ...langs[adminLang].products });
  }, [adminLang, isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const setHero = (key: keyof typeof heroF, value: string) =>
    setHeroF((prev) => ({ ...prev, [key]: value }));

  const handleHeroSave = async () => {
    updateLangContent(adminLang, (prev) => ({ ...prev, products: heroF }));
    await saveNow();
    setHeroSaved(true);
    setTimeout(() => setHeroSaved(false), 2500);
  };

  const handleCopyFromEn = () => {
    const en = langs["en"].products;
    setHeroF({ ...en });
    updateLangContent(adminLang, (prev) => ({ ...prev, products: en }));
  };

  const handleAutoTranslate = async () => {
    // Translate hero fields
    const heroOnly = {
      heroTitle1: langs["en"].products.heroTitle1,
      heroTitle2: langs["en"].products.heroTitle2,
      heroSubtitle: langs["en"].products.heroSubtitle,
    };
    const translated = await translateSection(heroOnly, adminLang) as typeof heroOnly;
    setHeroF((prev) => ({ ...prev, ...translated }));
    updateLangContent(adminLang, (prev) => ({
      ...prev,
      products: { ...prev.products, ...translated },
    }));

    // Translate categories from English
    const enCats = loadCategories("en");
    if (enCats.length > 0) {
      const catObj = Object.fromEntries(enCats.map((c, i) => [`c${i}`, c]));
      const translatedCatObj = await translateSection(catObj, adminLang) as Record<string, string>;
      const translatedCats = enCats.map((_, i) => translatedCatObj[`c${i}`] || enCats[i]);
      setCategories(translatedCats);
      saveCategories(adminLang, translatedCats);
    }
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (!error && data) setProjects(data as Project[]);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  useEffect(() => {
    setSearch("");
    setShowForm(false);
    setExpandedId(null);
    setCategories(loadCategories(adminLang));
    setCatInput("");
  }, [adminLang]);

  const addCategory = () => {
    const trimmed = catInput.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    const updated = [...categories, trimmed];
    setCategories(updated);
    saveCategories(adminLang, updated);
    setCatInput("");
  };

  const removeCategory = (cat: string) => {
    const updated = categories.filter((c) => c !== cat);
    setCategories(updated);
    saveCategories(adminLang, updated);
  };

  const imageList = form.images ? form.images.split("|||").map((s) => s.trim()).filter(Boolean) : [];

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setSaveMsg("");
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const url = await uploadImage(file, "projects", 1200, 0.78);
        newUrls.push(url);
      } catch (err) {
        setSaveMsg("Error: " + (err instanceof Error ? err.message : "Upload failed"));
      }
    }
    setUploading(false);
    if (newUrls.length === 0) return;
    setForm((f) => ({ ...f, images: [...imageList, ...newUrls].join("|||") }));
  };

  const removeImage = (index: number) => {
    const updated = imageList.filter((_, i) => i !== index);
    setForm((f) => ({ ...f, images: updated.join("|||") }));
  };

  const openAdd = () => { setEditId(null); setForm(emptyForm()); setSaveMsg(""); setShowForm(true); };
  const openEdit = (project: Project) => {
    setEditId(project.id);
    setForm({ title: project.title || "", category: project.category || "", description: project.description || "", location: project.location || "", duration: project.duration || "", images: project.images || "" });
    setSaveMsg("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setSaveMsg("Title is required."); return; }
    setSaving(true);
    setSaveMsg("");
    const textFields = {
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      duration: form.duration.trim(),
    };
    const payload = { ...textFields, images: form.images, lang: adminLang };

    if (editId !== null) {
      // Update this row
      const { error } = await supabase.from("projects").upsert({ id: editId, ...payload });
      if (error) { setSaving(false); setSaveMsg("Error: " + error.message); return; }

    } else {
      const { error: insertError } = await supabase.from("projects").insert({ ...payload });
      if (insertError) { setSaving(false); setSaveMsg("Error: " + insertError.message); return; }
    }

    setSaving(false);
    setSaveMsg(editId !== null ? "Project updated!" : "Project added!");
    await fetchProjects();
    setTimeout(() => { setShowForm(false); setSaveMsg(""); }, 1200);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("projects").delete().eq("id", id);
    setDeleteConfirm(null);
    fetchProjects();
  };

  const filtered = projects
    .filter((p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Projects Editor</h2>
          <p style={{ color: "#7a9ba8", fontSize: "0.875rem", marginTop: "0.25rem" }}>Manage your projects — add photos, categories, and project details</p>
        </div>
        <div style={{ display: "flex", gap: "0.625rem" }}>
          <button
            onClick={handleHeroSave}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.25rem", borderRadius: "10px", background: heroSaved ? "rgba(74,222,128,0.18)" : "linear-gradient(135deg, #d91422, #e8202f)", border: heroSaved ? "1px solid rgba(74,222,128,0.4)" : "none", color: heroSaved ? "#4ade80" : "#fff", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}
          >
            <Save size={14} /> {heroSaved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <SectionCard title="Hero Section" defaultOpen={false}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
          <Field label="Title (plain)" value={heroF.heroTitle1} onChange={(v) => setHero("heroTitle1", v)} placeholder="e.g. Our" />
          <Field label="Title (highlighted)" value={heroF.heroTitle2} onChange={(v) => setHero("heroTitle2", v)} placeholder="e.g. Projects" />
        </div>
        <Field label="Subtitle" value={heroF.heroSubtitle} onChange={(v) => setHero("heroSubtitle", v)} multiline />
      </SectionCard>

      {/* Categories Section */}
      <SectionCard title="Categories" headerExtra={
        <span style={{ background: "rgba(217,20,34,0.12)", color: "#d91422", fontSize: "0.7rem", fontWeight: 700, padding: "2px 10px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {categories.length}
        </span>
      }>
        <div style={{ paddingTop: "1rem" }}>
          <div style={{ display: "flex", gap: "0.625rem", marginBottom: "1rem" }}>
            <input
              value={catInput}
              onChange={(e) => setCatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
              placeholder="New category name..."
              style={{ ...fieldStyle, margin: 0 }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.2)")}
            />
            <button
              onClick={addCategory}
              style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "0.4rem", background: "linear-gradient(135deg, #d91422, #1a9ab8)", color: "#fff", border: "none", borderRadius: "10px", padding: "0 1.1rem", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              <Plus size={15} /> Add
            </button>
          </div>
          {categories.length === 0 ? (
            <p style={{ color: "#4a6670", fontSize: "0.875rem", margin: 0 }}>No categories yet. Add one above.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {categories.map((cat) => (
                <div key={cat} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(217,20,34,0.1)", border: "1px solid rgba(217,20,34,0.2)", borderRadius: "20px", padding: "0.3rem 0.75rem 0.3rem 0.9rem" }}>
                  <Tag size={11} color="#d91422" />
                  <span style={{ color: "#d91422", fontSize: "0.8rem", fontWeight: 600 }}>{cat}</span>
                  <button onClick={() => removeCategory(cat)} style={{ background: "none", border: "none", color: "#4a6670", cursor: "pointer", padding: "0", display: "flex", alignItems: "center" }}>
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionCard>

      {/* Projects List Section */}
      <SectionCard
        title="Projects"
        defaultOpen={true}
        headerExtra={
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ position: "relative" }}>
              <Search size={13} color="#4a6670" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                onClick={(e) => e.stopPropagation()}
                style={{ ...fieldStyle, width: "180px", paddingLeft: "2.1rem", padding: "0.4rem 0.75rem 0.4rem 2rem", fontSize: "0.8rem" }}
              />
            </div>
            <button
              onClick={openAdd}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.9rem", borderRadius: "8px", background: "linear-gradient(135deg, #d91422, #e8202f)", border: "none", color: "#fff", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              <Plus size={13} /> Add Project
            </button>
          </div>
        }
      >
        <div style={{ paddingTop: "1rem" }}>
          {loading ? (
            <p style={{ color: "#4a6670", textAlign: "center", padding: "2rem 0" }}>Loading projects...</p>
          ) : filtered.length === 0 ? (
            <p style={{ color: "#4a6670", textAlign: "center", padding: "2rem 0" }}>
              {search ? "No projects match your search." : "No projects yet. Click 'Add Project' to get started."}
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {filtered.map((project) => {
                const imgs = project.images ? project.images.split("|||").filter(Boolean) : [];
                const isExpanded = expandedId === project.id;
                return (
                  <div key={project.id} style={{ background: "rgba(10,42,53,0.6)", border: "1px solid rgba(217,20,34,0.1)", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.75rem 1rem" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "8px", overflow: "hidden", background: "#071e27", flexShrink: 0 }}>
                        {imgs[0] ? (
                          <img src={imgs[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Images size={16} color="#d91422" />
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.9375rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {project.title}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginTop: "0.2rem" }}>
                          {project.category && (
                            <span style={{ background: "rgba(217,20,34,0.12)", color: "#d91422", fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              {project.category}
                            </span>
                          )}
                          {imgs.length > 0 && (
                            <span style={{ color: "#4a6670", fontSize: "0.75rem" }}>{imgs.length} photo{imgs.length !== 1 ? "s" : ""}</span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
                        <button onClick={() => setExpandedId(isExpanded ? null : project.id)} style={{ background: "rgba(217,20,34,0.08)", border: "1px solid rgba(217,20,34,0.15)", borderRadius: "8px", color: "#d91422", cursor: "pointer", padding: "0.4rem", display: "flex", alignItems: "center" }}>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        <button onClick={() => openEdit(project)} style={{ background: "rgba(217,20,34,0.08)", border: "1px solid rgba(217,20,34,0.15)", borderRadius: "8px", color: "#d91422", cursor: "pointer", padding: "0.4rem", display: "flex", alignItems: "center" }}>
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => setDeleteConfirm(project.id)} style={{ background: "rgba(229,62,62,0.08)", border: "1px solid rgba(229,62,62,0.15)", borderRadius: "8px", color: "#fc8181", cursor: "pointer", padding: "0.4rem", display: "flex", alignItems: "center" }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    {isExpanded && (
                      <div style={{ borderTop: "1px solid rgba(217,20,34,0.08)", padding: "0.75rem 1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        {project.description && <p style={{ color: "#7a9ba8", fontSize: "0.875rem", margin: 0 }}>{project.description}</p>}
                        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                          {project.location && <span style={{ color: "#4a6670", fontSize: "0.8rem" }}>📍 {project.location}</span>}
                          {project.duration && <span style={{ color: "#4a6670", fontSize: "0.8rem" }}>⏱ {project.duration}</span>}
                        </div>
                        {imgs.length > 0 && (
                          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                            {imgs.map((url, i) => (
                              <img key={i} src={url} alt="" style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "7px", border: i === 0 ? "2px solid #d91422" : "1px solid rgba(217,20,34,0.15)" }} />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SectionCard>

      {/* Add / Edit Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "#091e38", border: "1px solid rgba(217,20,34,0.2)", borderRadius: "18px", width: "100%", maxWidth: "560px", maxHeight: "90vh", overflowY: "auto", padding: "1.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.125rem", margin: 0 }}>
                {editId !== null ? "Edit Project" : "Add Project"}
              </h3>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: "#7a9ba8", cursor: "pointer", padding: "0.25rem" }}>
                <X size={20} />
              </button>
            </div>

            <Field label="Title *" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="e.g. Villa Facade Renovation" />

            {/* Category dropdown */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={lblStyle}>Category</label>
              {categories.length > 0 ? (
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  style={{ ...fieldStyle, appearance: "none", cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(217,20,34,0.2)")}
                >
                  <option value="">— Select category —</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              ) : (
                <div style={{ padding: "0.7rem 1rem", background: "rgba(4, 33, 66, 0.6)", border: "1px solid rgba(217,20,34,0.12)", borderRadius: "10px", color: "#4a6670", fontSize: "0.875rem" }}>
                  No categories yet — open the <strong style={{ color: "#d91422" }}>Categories</strong> section above to add some.
                </div>
              )}
            </div>

            <Field label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Short project description..." multiline />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <Field label="Location" value={form.location} onChange={(v) => setForm((f) => ({ ...f, location: v }))} placeholder="e.g. Munich" />
              <Field label="Duration" value={form.duration} onChange={(v) => setForm((f) => ({ ...f, duration: v }))} placeholder="e.g. 3 weeks" />
            </div>

            {/* Images */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={lblStyle}>Images</label>
              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => handleUpload(e.target.files)} />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.25rem", background: "rgba(217,20,34,0.08)", border: "1px dashed rgba(217,20,34,0.4)", borderRadius: "10px", color: "#d91422", fontSize: "0.875rem", fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.6 : 1, marginBottom: "0.75rem" }}
              >
                <Upload size={15} />
                {uploading ? "Uploading..." : "Upload Images"}
              </button>
              {imageList.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                  {imageList.map((url, i) => (
                    <div key={i} style={{ position: "relative", borderRadius: "8px", overflow: "hidden", aspectRatio: "1", background: "#0d2840" }}>
                      <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      {i === 0 && <span style={{ position: "absolute", top: "4px", left: "4px", background: "rgba(217,20,34,0.9)", color: "#fff", fontSize: "0.6rem", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Cover</span>}
                      <button onClick={() => removeImage(i)} style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", color: "#fff", cursor: "pointer", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {saveMsg && (
              <p style={{ color: saveMsg.startsWith("Error") ? "#fc8181" : "#4ade80", fontSize: "0.875rem", marginBottom: "0.75rem" }}>{saveMsg}</p>
            )}

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button onClick={() => setShowForm(false)} style={{ padding: "0.625rem 1.5rem", background: "transparent", border: "1px solid rgba(217,20,34,0.2)", borderRadius: "10px", color: "#7a9ba8", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.5rem", background: saving ? "rgba(217,20,34,0.4)" : "linear-gradient(135deg, #d91422, #e8202f)", border: "none", borderRadius: "10px", color: "#fff", cursor: saving ? "not-allowed" : "pointer", fontWeight: 600, fontSize: "0.875rem" }}
              >
                <Save size={15} />
                {saving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "#091e38", border: "1px solid rgba(229,62,62,0.3)", borderRadius: "16px", padding: "1.75rem", maxWidth: "360px", width: "100%", textAlign: "center" }}>
            <div style={{ color: "#fc8181", fontSize: "2rem", marginBottom: "0.75rem" }}>🗑</div>
            <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: "0.5rem" }}>Delete Project?</h3>
            <p style={{ color: "#7a9ba8", fontSize: "0.875rem", marginBottom: "1.5rem" }}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: "0.625rem 1.25rem", background: "transparent", border: "1px solid rgba(217,20,34,0.2)", borderRadius: "10px", color: "#7a9ba8", cursor: "pointer", fontWeight: 600 }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: "0.625rem 1.25rem", background: "linear-gradient(135deg, #e53e3e, #fc8181)", border: "none", borderRadius: "10px", color: "#fff", cursor: "pointer", fontWeight: 600 }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
