import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, MapPin, Images, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { supabase } from "../../lib/supabase";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  duration: string;
  images: string;
  lang: string;
  created_at: string;
};

type DisplayProject = {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  duration: string;
  imageList: string[];
};

const DEFAULT_IMAGE = "/img1.png";

function parseImages(raw: string | null | undefined): string[] {
  if (!raw) return [DEFAULT_IMAGE];
  const imgs = raw.split("|||").map((s) => s.trim()).filter(Boolean);
  return imgs.length ? imgs : [DEFAULT_IMAGE];
}

export function Products() {
  const { content, currentLang } = useContent();
  const isMobile = useIsMobile();
  const p = content.products;

  const [projects, setProjects] = useState<DisplayProject[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [lightbox, setLightbox] = useState<{ project: DisplayProject; index: number } | null>(null);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setProjects(
            (data as Project[])
              .filter((row) => (row.lang || "en") === currentLang)
              .map((row) => ({
                id: row.id,
                title: row.title,
                category: row.category,
                description: row.description,
                location: row.location,
                duration: row.duration,
                imageList: parseImages(row.images),
              }))
          );
        }
        setLoading(false);
      });
  }, [currentLang]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  // Keyboard navigation
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!lightbox) return;
    if (e.key === "Escape") setLightbox(null);
    if (e.key === "ArrowRight") setLightbox((l) => l ? { ...l, index: (l.index + 1) % l.project.imageList.length } : null);
    if (e.key === "ArrowLeft") setLightbox((l) => l ? { ...l, index: (l.index - 1 + l.project.imageList.length) % l.project.imageList.length } : null);
  }, [lightbox]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const allLabel = p.filterAllLabel || "All Projects";
  const categories = [
    allLabel,
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filtered =
    activeCategory === null || activeCategory === allLabel
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] text-white py-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 45% at 100% 0%, rgba(45,181,213,0.12) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl lg:text-[72px] font-bold mb-6"
          >
            {p.heroTitle1} <span className="text-[#042142]">{p.heroTitle2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="text-xl max-w-3xl mx-auto text-gray-300"
          >
            {p.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-[#f7f8fa] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map((category) => {
              const isActive = (activeCategory === null && category === allLabel) || activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142] text-white shadow-lg"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 shadow-sm"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Cards */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow overflow-hidden animate-pulse">
                  <div className="w-full h-56 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg">No projects found.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory ?? "all"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: (index % 6) * 0.07 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden h-56 bg-gray-100 flex-shrink-0 cursor-pointer group"
                      onClick={() => setLightbox({ project, index: 0 })}
                    >
                      <ImageWithFallback
                        src={project.imageList[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold">
                          <Images className="w-4 h-4" />
                          View Photos
                        </div>
                      </div>
                      {project.imageList.length > 1 && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-lg">
                          <Images className="w-3.5 h-3.5" />
                          {project.imageList.length} photos
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                      {project.description && (
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{project.description}</p>
                      )}
                      {(project.duration || project.location) && (
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                          {project.duration && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {project.duration}
                            </span>
                          )}
                          {project.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {project.location}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] flex flex-col"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setLightbox(null)}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <div>
                <h3 className="text-white font-bold text-lg">{lightbox.project.title}</h3>
                <p className="text-gray-400 text-sm">{lightbox.index + 1} / {lightbox.project.imageList.length}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main image */}
            <div className="flex-1 flex items-center justify-center px-4 relative" onClick={(e) => e.stopPropagation()}>
              {lightbox.project.imageList.length > 1 && (
                <button
                  onClick={() => setLightbox((l) => l ? { ...l, index: (l.index - 1 + l.project.imageList.length) % l.project.imageList.length } : null)}
                  className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox.index}
                  src={lightbox.project.imageList[lightbox.index]}
                  alt={lightbox.project.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-full max-w-full object-contain rounded-xl"
                  style={{ maxHeight: "calc(100vh - 180px)" }}
                />
              </AnimatePresence>

              {lightbox.project.imageList.length > 1 && (
                <button
                  onClick={() => setLightbox((l) => l ? { ...l, index: (l.index + 1) % l.project.imageList.length } : null)}
                  className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Thumbnails */}
            {lightbox.project.imageList.length > 1 && (
              <div className="flex items-center justify-center gap-2 px-6 py-4 flex-shrink-0 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
                {lightbox.project.imageList.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox((l) => l ? { ...l, index: i } : null)}
                    className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      i === lightbox.index ? "border-white" : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
