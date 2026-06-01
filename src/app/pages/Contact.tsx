import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { supabase } from "../../lib/supabase";

const spring = { type: "spring", stiffness: 400, damping: 17 } as const;

export function Contact() {
  const { content } = useContent();
  const isMobile = useIsMobile();
  const c = content.contact;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("contact_messages").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "—",
      subject: formData.service
        ? formData.service.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "General Inquiry",
      message: formData.message,
      status: "unread",
    });
    if (error) {
      console.error("Error submitting message:", error);
      alert(c.errorMsg);
      return;
    }
    alert(c.successMsg);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22a9d2]/30 focus:border-[#22a9d2] transition-all text-sm";

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#8b0c15] via-[#1a1a1a] to-[#111111] text-white py-36 flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 45% at 100% 0%, rgba(217,20,34,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(61,197,229,0.10) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl lg:text-[72px] font-bold mb-6"
          >
            {c.heroTitle1} <span className="text-[#111111]">{c.heroTitle2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto text-gray-300"
          >
            {c.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-5">

              {/* Left: Dark info panel */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#8b0c15] via-[#1a1a1a] to-[#111111] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#22a9d2]/15 rounded-full" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#22a9d2]/20 rounded-full" />

                <div className="relative z-10">
                  <motion.h2
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-2xl font-bold text-white mb-3"
                  >
                    {c.contactInfoHeading.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-[#111111]">{c.contactInfoHeading.split(" ").slice(-1)[0]}</span>
                  </motion.h2>
                  <motion.p
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                    whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="text-gray-400 text-sm mb-10 leading-relaxed"
                  >
                    {c.contactInfoSubtitle}
                  </motion.p>

                  <div className="space-y-7">
                    {[
                      { icon: Phone,  label: c.phoneLabel,  value: c.phone,    sub: c.responseTime },
                      { icon: Mail,   label: c.emailLabel,  value: c.email,    sub: c.responseNote },
                      { icon: MapPin, label: c.officeLabel, value: c.address,  sub: "" },
                      { icon: Clock,  label: c.hoursLabel,  value: c.hoursWeekday, sub: c.hoursSaturday },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-10 h-10 bg-[#22a9d2]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <item.icon className="w-4 h-4 text-[#111111]" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{item.label}</p>
                          <p className="text-gray-300 text-sm mt-0.5">{item.value}</p>
                          {item.sub && <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Emergency callout */}
                <div className="relative z-10 mt-10 pt-8 border-t border-white/10">
                  <p className="text-gray-400 text-xs mb-3">{c.urgentHeading}</p>
                  <motion.div
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                    whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }}
                    whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }}
                    className="inline-block"
                  >
                    <a
                      href={`tel:${c.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 bg-[#22a9d2] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#a50f1a] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {c.callNowBtn}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Right: Form panel */}
              <div className="lg:col-span-3 p-6 sm:p-10">
                <motion.h2
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-2xl font-bold text-gray-900 mb-1"
                >
                  {c.sendMessageHeading.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-[#111111]">{c.sendMessageHeading.split(" ").slice(-1)[0]}</span>
                </motion.h2>
                <motion.p
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  className="text-gray-500 text-sm mb-8"
                >
                  {c.sendMessageSubtitle}
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">{c.nameLabelText}</label>
                      <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder={c.namePlaceholder} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">{c.emailLabelText}</label>
                      <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={c.emailPlaceholder} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">{c.phoneLabelText}</label>
                      <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={c.phonePlaceholder} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">{c.serviceLabelText}</label>
                      <select name="service" required value={formData.service} onChange={handleChange} className={inputClass}>
                        <option value="">{c.servicePlaceholder}</option>
                        {c.serviceOptions.map((opt, i) => (
                          <option key={i} value={opt.toLowerCase().replace(/\s+/g, "-")}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">{c.detailsLabelText}</label>
                    <textarea name="message" required value={formData.message} onChange={handleChange} placeholder={c.detailsPlaceholder} rows={5} className={inputClass + " resize-none"} />
                  </div>

                  <motion.button
                    type="submit"
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                    whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={isMobile ? undefined : { scale: 1.02, transition: spring }}
                    whileTap={isMobile ? undefined : { scale: 0.98, transition: spring }}
                    className="w-full bg-gradient-to-r from-[#8b0c15] via-[#1a1a1a] to-[#111111] hover:opacity-90 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors text-base cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    {c.sendBtn}
                  </motion.button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 pb-24 pt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col lg:flex-row" style={{ minHeight: 420 }}>
            {/* Left info panel */}
            <div className="bg-gradient-to-br from-[#8b0c15] via-[#1a1a1a] to-[#111111] lg:w-72 flex-shrink-0 p-8 flex flex-col justify-between gap-8">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <MapPin className="w-6 h-6 text-[#111111]" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{c.findUsHeading}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{c.address}</p>
              </div>
              <a
                href={c.mapDirectionsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#d91422] hover:bg-[#e8202f] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors shadow-lg shadow-[#d91422]/20"
              >
                <ArrowRight className="w-4 h-4" />
                Get Directions
              </a>
            </div>

            {/* Map */}
            <div className="flex-1 min-h-[320px]">
              <iframe
                title={c.address}
                src={c.mapEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(c.address)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: 320 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-gradient-to-br from-[#8b0c15] via-[#1a1a1a] to-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl lg:text-5xl font-bold mb-6 text-white"
          >
            {c.serviceAreaHeading.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-[#111111]">{c.serviceAreaHeading.split(" ").slice(-1)[0]}</span>
          </motion.h2>
          <motion.p
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            {c.serviceAreaText}
          </motion.p>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {c.serviceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                className="bg-white/10 border border-white/20 py-3 px-4 rounded-xl text-white text-sm font-medium shadow-sm"
              >
                {area}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
