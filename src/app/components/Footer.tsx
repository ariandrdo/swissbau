import { Link } from "react-router";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { useContent } from "../context/ContentContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { content } = useContent();
  const f = content.footer;
  const logo = f.logo || "/logo-white.png";

  return (
    <footer className="bg-gradient-to-bl from-[#042242] via-[#1a1a1a] to-[#051d3a] text-white relative overflow-hidden">
      {/* Decorative Wave Elements */}
      <div className="absolute top-0 left-0 w-full h-32 opacity-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="url(#gradient)" />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#d91422" />
              <stop offset="100%" stopColor="#e8202f" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Company Info */}
          <div>
            <img src={logo} alt="SwissBau GmbH" className="h-14 md:h-20 w-auto mb-6 -mt-2 md:-mt-4" />
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {f.description}
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-gradient-to-r hover:from-[#d91422] hover:to-[#e8202f] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-6 text-white font-semibold">{f.quickLinksHeading}</h3>
            <ul className="space-y-3">
              {f.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#d91422] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#d91422] transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-6 text-white font-semibold">{f.contactUsHeading}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{f.phoneLabel}</div>
                  <a href={`tel:${f.phone.replace(/\s/g, "")}`} className="text-gray-300 hover:text-[#d91422] transition-colors text-sm">
                    {f.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{f.emailLabel}</div>
                  <a href={`mailto:${f.email}`} className="text-gray-300 hover:text-[#d91422] transition-colors text-sm">
                    {f.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{f.addressLabel}</div>
                  <span className="text-gray-300 text-sm">
                    {f.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Map Card */}
          <div>
            <h3 className="text-lg mb-6 text-white font-semibold">{f.addressLabel}</h3>
            <a
              href={f.mapDirectionsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-xl border border-[#d91422]/25 overflow-hidden bg-[#1a1a1a] hover:border-[#d91422]/60 transition-colors duration-300 shadow-xl shadow-black/40"
              >
                {/* Map visual */}
                <div className="relative h-32 overflow-hidden">
                  {/* Base grid */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: "linear-gradient(rgba(217,20,34,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(217,20,34,0.12) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {/* Ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d91422]/8 via-transparent to-[#111111]/60" />

                  {/* City blocks (small rectangles) */}
                  <div className="absolute top-3 left-4 w-10 h-6 rounded bg-[#d91422]/8 border border-[#d91422]/15" />
                  <div className="absolute top-3 left-16 w-7 h-8 rounded bg-[#d91422]/6 border border-[#d91422]/12" />
                  <div className="absolute top-3 right-6 w-12 h-5 rounded bg-[#d91422]/7 border border-[#d91422]/12" />
                  <div className="absolute top-14 left-3 w-8 h-10 rounded bg-[#d91422]/6 border border-[#d91422]/10" />
                  <div className="absolute top-14 right-4 w-10 h-9 rounded bg-[#d91422]/8 border border-[#d91422]/15" />
                  <div className="absolute bottom-5 left-6 w-14 h-6 rounded bg-[#d91422]/7 border border-[#d91422]/12" />
                  <div className="absolute bottom-5 right-8 w-9 h-7 rounded bg-[#d91422]/6 border border-[#d91422]/10" />

                  {/* Roads */}
                  <div className="absolute top-[48%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d91422]/35 to-transparent" />
                  <div className="absolute top-0 bottom-0 left-[42%] w-[3px] bg-gradient-to-b from-transparent via-[#d91422]/30 to-transparent" />
                  <div className="absolute top-[22%] left-0 w-[38%] h-px bg-[#d91422]/18" />
                  <div className="absolute top-[75%] right-0 w-[50%] h-px bg-[#d91422]/18" />
                  <div className="absolute top-0 bottom-0 right-[25%] w-px bg-[#d91422]/12" />

                  {/* Center pin */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex flex-col items-center" style={{ marginTop: "-8px" }}>
                      {/* Pulse rings */}
                      <div className="absolute w-16 h-16 rounded-full border border-[#d91422]/30 animate-ping" style={{ animationDuration: "2s", top: "-2px", left: "50%", transform: "translateX(-50%)" }} />
                      <div className="absolute w-10 h-10 rounded-full border border-[#d91422]/40 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s", top: "3px", left: "50%", transform: "translateX(-50%)" }} />
                      {/* Pin circle */}
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#e8202f] to-[#a50f1a] flex items-center justify-center shadow-2xl shadow-[#d91422]/50 group-hover:shadow-[#d91422]/70 transition-shadow duration-300 z-10 border-2 border-white/20">
                        <MapPin className="w-5 h-5 text-white drop-shadow" />
                      </div>
                      {/* Pin tail */}
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#a50f1a] z-10 -mt-px" />
                      {/* Shadow dot */}
                      <div className="w-3 h-1 rounded-full bg-black/40 mt-1 blur-sm" />
                    </div>
                  </div>

                  {/* Vignette edges */}
                  <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 40px rgba(10,42,53,0.7)" }} />
                </div>

                {/* Bottom bar */}
                <div className="px-4 py-3 flex items-center justify-between gap-3 border-t border-[#d91422]/15 bg-[#0d2b44]">
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    <p className="text-gray-400 text-xs truncate">{f.address}</p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-white group-hover:text-gray-200 transition-colors font-semibold whitespace-nowrap tracking-wide">
                    Directions ↗
                  </span>
                </div>
              </motion.div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#d91422]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} SwissBau GmbH. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-left">
              Designed & built by <a href="https://aariand.com" target="_blank" rel="noopener noreferrer" className="text-[#d91422] hover:text-[#e8202f] transition-colors">aariand.com</a>
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#d91422] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#d91422] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 35% at 100% 100%, rgba(217,20,34,0.10) 0%, transparent 70%)" }}></div>
    </footer>
  );
}
