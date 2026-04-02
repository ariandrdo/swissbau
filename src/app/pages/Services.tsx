import type React from "react";
import { motion } from "motion/react";
import { Wind, Flame, Wrench, Calendar, Zap, Shield, CheckCircle2, ArrowRight, Phone, Clock, Award, ThermometerSun, Users, TrendingUp, Package, BadgeCheck, AlertCircle, Home, Building2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
import { useContent } from "../context/ContentContext";
import { useIsMobile } from "../hooks/useIsMobile";

const servicesMeta: Record<string, { icon: React.ElementType; image: string; color: string }> = {
  cooling: {
    icon: Wind,
    image: "/img1.png",
    color: "#2db5d5",
  },
  heating: {
    icon: Flame,
    image: "/img2.png",
    color: "#f97316",
  },
  repair: {
    icon: Wrench,
    image: "/img3.png",
    color: "#8b5cf6",
  },
  maintenance: {
    icon: Calendar,
    image: "/img4.png",
    color: "#10b981",
  },
};

const additionalServicesIcons = [ThermometerSun, Package, Building2, Zap];
const serviceTypeIcons = [Home, Building2];
const advantageIcons = [BadgeCheck, Shield, Clock, Award, TrendingUp, Users];

const spring = { type: "spring", stiffness: 400, damping: 17 } as const;

export function Services() {
  const { content } = useContent();
  const isMobile = useIsMobile();
  const s = content.services;
  const detailedServices = s.detailedServices.map((svc) => {
    const meta = servicesMeta[svc.id] ?? { icon: Wrench, image: "", color: "#2db5d5" };
    return { ...svc, ...meta, image: svc.image || meta.image };
  });
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] min-h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 45% at 100% 0%, rgba(45,181,213,0.12) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-20 pt-28">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl lg:text-[72px] font-bold mb-6"
            >
              {s.heroTitle1} <span className="text-[#042142]">{s.heroTitle2}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
            >
              {s.heroSubtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }} whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }}>
                <Link
                  to={s.heroBtnLink || "/contact"}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142] text-white px-8 py-4 rounded-full text-base font-bold shadow-2xl hover:shadow-[#2db5d5]/50 transition-all"
                >
                  {s.heroBtnText || "Get Free Quote"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {detailedServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group grid lg:grid-cols-2 border-b border-gray-100 last:border-b-0 py-16 gap-12 items-center"
            >
              {/* Text side */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#042142] mb-5 leading-tight">
                  {service.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8 text-lg">
                  {service.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-10">
                  {service.services.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#042142]/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#042142]" />
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142] text-white px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  {s.requestServiceBtn}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Image side */}
              <div className={`relative overflow-hidden rounded-3xl h-[420px] ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Services Grid */}
      {s.showAdditionalServices !== false && <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              {s.additionalServicesHeading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#042142]">{s.additionalServicesHeading.split(" ").slice(-1)[0]}</span>
            </motion.h2>
            <motion.p
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              {s.additionalServicesSubtitle}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {s.additionalServices.map((service, index) => {
              const IconComp = additionalServicesIcons[index] ?? ThermometerSun;
              return (
              <motion.div
                key={index}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 25 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <IconComp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2db5d5]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>}



      {/* Emergency Banner */}
      {s.showEmergencyBanner !== false && <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
                <AlertCircle className="w-10 h-10 flex-shrink-0" />
                <motion.h2
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-4xl lg:text-5xl font-bold"
                >
                  {s.emergencyHeading}
                </motion.h2>
              </div>
              <motion.p
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="text-xl opacity-90"
              >
                {s.emergencySubtitle}
              </motion.p>
            </div>
            <motion.div
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }}
              whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }}
              className="flex-shrink-0"
            >
              <a
                href={`tel:${s.emergencyPhone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 bg-white text-red-600 px-8 py-4 rounded-full text-base font-bold hover:bg-gray-100 transition-all shadow-2xl w-full sm:w-auto justify-center"
              >
                <Phone className="w-6 h-6" />
                Call {s.emergencyPhone}
              </a>
            </motion.div>
          </div>
        </div>
      </section>}

      {/* Final CTA */}
      <section className="py-28 bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            {s.ctaHeading}
          </motion.h2>
          <motion.p
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            {s.ctaSubheading}
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
              whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }}
              whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }}
            >
              <Link
                to={s.ctaBtnLink || "/contact"}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142] text-white px-8 py-4 rounded-full text-base font-bold hover:shadow-2xl hover:shadow-[#2db5d5]/50 transition-all w-full sm:w-auto sm:min-w-[220px]"
              >
                <span className="whitespace-nowrap">{s.ctaBtnText || "Schedule Service Now"}</span>
                <ArrowRight className="w-6 h-6 flex-shrink-0" />
              </Link>
            </motion.div>
            {s.ctaPhone && (
              <motion.div
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.22 }}
                whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }}
                whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }}
              >
                <a
                  href={`tel:${s.ctaPhone}`}
                  className="inline-flex items-center justify-center gap-3 border border-white text-white px-8 py-4 rounded-full text-base font-bold hover:bg-white hover:text-[#0a2a35] transition-all w-full sm:w-auto sm:min-w-[220px]"
                >
                  <Phone className="w-6 h-6" />
                  {s.ctaPhone}
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
