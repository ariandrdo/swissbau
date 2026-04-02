import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Globe } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useContent } from "../context/ContentContext";
import type { Lang } from "../context/ContentContext";

const LANGS: Lang[] = ["en", "de", "sq", "mk"];
const LANG_NAMES: Record<Lang, string> = {
  en: "English",
  de: "Deutsch",
  sq: "Shqip",
  mk: "Македонски",
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { content, langs, currentLang, setLang } = useContent();
  const h = content.header;
  const logo = h.logo || "/logo.png";

  const lastYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const isHidden = currentY > lastYRef.current && currentY > 80;

        // Directly mutate the DOM — no React re-render overhead
        if (headerRef.current) {
          headerRef.current.style.transform = isHidden ? "translateY(-100%)" : "translateY(0)";
        }

        const nowScrolled = currentY > 10;
        if (nowScrolled !== scrolledRef.current) {
          scrolledRef.current = nowScrolled;
          if (headerRef.current) {
            headerRef.current.style.backgroundColor = nowScrolled ? "#f0f0f0" : "transparent";
            headerRef.current.style.boxShadow = nowScrolled ? "0 4px 24px rgba(0,0,0,0.15)" : "none";
            setIsScrolled(nowScrolled);
          }
        }
        lastYRef.current = currentY;
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  // Close lang dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) setMobileLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open (works on iOS Safari too)
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (top) window.scrollTo(0, -parseInt(top));
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  // Always use English paths to ensure routes work regardless of translation
  const navLinks = h.navLinks.map((link, i) => ({
    ...link,
    path: langs["en"].header.navLinks[i]?.path ?? link.path,
  }));

  return (
    <>
    <header
      ref={headerRef}
      style={{ transition: "transform 0.3s ease-in-out" }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1 lg:grid lg:grid-cols-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 justify-self-start flex items-center">
            <img
              src={logo}
              alt="Jubea Energy Systems"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation — centered */}
          <nav className="hidden lg:flex items-center justify-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full transition-all text-sm whitespace-nowrap ${
                  isActive(link.path)
                    ? "text-white bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142]"
                    : isScrolled ? "text-black hover:text-black hover:bg-black/10" : "text-white hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2 justify-self-end">
            {/* Language Switcher Dropdown */}
            <div ref={langRef} style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen((o) => !o)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-all ${isScrolled ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}
              >
                <Globe className="w-4 h-4 text-[#3d6b9e]" />
                <span className="uppercase tracking-wide text-xs">{currentLang}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      right: 0,
                      background: "#143348",
                      border: "1px solid rgba(61,107,158,0.3)",
                      borderRadius: "12px",
                      padding: "0.375rem",
                      minWidth: "150px",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                      zIndex: 200,
                    }}
                  >
                    {LANGS.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLang(lang); setLangOpen(false); }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.625rem",
                          width: "100%",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "8px",
                          border: "none",
                          background: currentLang === lang ? "rgba(61,107,158,0.3)" : "transparent",
                          color: currentLang === lang ? "#fff" : "#a0b4bc",
                          fontSize: "0.875rem",
                          fontWeight: currentLang === lang ? 600 : 400,
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => { if (currentLang !== lang) { e.currentTarget.style.background = "rgba(61,107,158,0.15)"; e.currentTarget.style.color = "#fff"; } }}
                        onMouseLeave={(e) => { if (currentLang !== lang) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#a0b4bc"; } }}
                      >
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: currentLang === lang ? "#3d6b9e" : "#4a6670", minWidth: "24px" }}>{lang}</span>
                        {LANG_NAMES[lang]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Phone Number */}
            <motion.a
              href={`tel:${h.phone.replace(/\s/g, "")}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142] text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#2db5d5]/40 transition-all"
            >
              <Phone className="w-4 h-4" />
              {h.phone}
            </motion.a>
          </div>

          {/* Mobile: lang + menu buttons */}
          <div className="lg:hidden flex items-center gap-1">
            {/* Mobile Language Dropdown */}
            <div ref={mobileLangRef} style={{ position: "relative" }}>
              <button
                onClick={() => setMobileLangOpen((o) => !o)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg transition-colors ${isScrolled ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}
              >
                <Globe className="w-5 h-5 text-[#3d6b9e]" />
                <span className="text-sm font-bold uppercase tracking-wide">{currentLang}</span>
              </button>
              <AnimatePresence>
                {mobileLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      right: 0,
                      background: "#143348",
                      border: "1px solid rgba(61,107,158,0.3)",
                      borderRadius: "12px",
                      padding: "0.375rem",
                      minWidth: "150px",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                      zIndex: 200,
                    }}
                  >
                    {LANGS.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLang(lang); setMobileLangOpen(false); }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.625rem",
                          width: "100%",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "8px",
                          border: "none",
                          background: currentLang === lang ? "rgba(61,107,158,0.3)" : "transparent",
                          color: currentLang === lang ? "#fff" : "#a0b4bc",
                          fontSize: "0.875rem",
                          fontWeight: currentLang === lang ? 600 : 400,
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => { if (currentLang !== lang) { e.currentTarget.style.background = "rgba(61,107,158,0.15)"; e.currentTarget.style.color = "#fff"; } }}
                        onMouseLeave={(e) => { if (currentLang !== lang) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#a0b4bc"; } }}
                      >
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: currentLang === lang ? "#3d6b9e" : "#4a6670", minWidth: "24px" }}>{lang}</span>
                        {LANG_NAMES[lang]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isScrolled ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      </div>

    </header>

      {/* Mobile Full-Screen Menu Overlay — outside header to avoid stacking context issues */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="lg:hidden fixed inset-0 z-[999] bg-[#0c1e2b] flex flex-col overflow-hidden"
        >
          {/* Top bar — mirrors header layout exactly */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-between items-center py-1">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex-shrink-0 flex items-center">
                <img src={logo} alt="Jubea Energy Systems" className="h-12 w-auto" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-white hover:bg-[#0f3a4a] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
            <nav className="flex flex-col items-center gap-1 w-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                  className="w-full text-center"
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full py-3 text-sm font-semibold tracking-[0.2em] uppercase transition-colors ${
                      isActive(link.path)
                        ? "text-[#2db5d5]"
                        : "text-white hover:text-[#2db5d5]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Bottom: phone button */}
          <div className="flex flex-col items-center gap-4 pb-20 px-8">
            <motion.a
              href={`tel:${h.phone.replace(/\s/g, "")}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full max-w-xs text-center flex items-center justify-center gap-2 bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142] text-white px-8 py-3 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#2db5d5]/40 transition-all"
            >
              <Phone className="w-4 h-4" />
              {h.phone}
            </motion.a>
          </div>
        </motion.div>
      )}
    </>
  );
}
