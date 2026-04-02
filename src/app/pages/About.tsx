import { motion } from "motion/react";
import { Award, Users, Clock, Shield } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useContent } from "../context/ContentContext";
import { useIsMobile } from "../hooks/useIsMobile";

const valueIcons = [Award, Users, Clock, Shield];
const certIcons = [Shield, Award, Shield];

const spring = { type: "spring", stiffness: 400, damping: 17 } as const;

export function About() {
  const { content } = useContent();
  const isMobile = useIsMobile();
  const a = content.about;
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] text-white py-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 45% at 100% 0%, rgba(45,181,213,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(61,197,229,0.10) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl lg:text-[72px] font-bold mb-6"
          >
            {a.heroTitle1} <span className="text-[#042142]">{a.heroTitle2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto text-gray-300"
          >
            {a.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col">
              <motion.h2
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left"
              >
                {a.ourStoryLabel.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-[#042142]">{a.ourStoryLabel.split(" ").slice(-1)[0]}</span>
              </motion.h2>
              {/* Image shown only on mobile, between title and text */}
              <div className="lg:hidden mb-6 self-stretch">
                <ImageWithFallback
                  src="/fullimg.png"
                  alt="HVAC Technician"
                  className="rounded-lg shadow-xl w-full object-cover"
                />
              </div>
              <motion.p
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="text-lg text-gray-600 mb-4"
              >
                {a.storyP1}
              </motion.p>
              <motion.p
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                className="text-lg text-gray-600 mb-4"
              >
                {a.storyP2}
              </motion.p>
              <motion.p
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="text-lg text-gray-600"
              >
                {a.storyP3}
              </motion.p>
              {a.storyP4 && (
              <motion.p
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
                className="text-lg text-gray-600"
              >
                {a.storyP4}
              </motion.p>
              )}
            </div>
            {/* Image shown only on desktop (right column) */}
            <div className="hidden lg:flex self-stretch">
              <ImageWithFallback
                src="/fullimg.png"
                alt="HVAC Technician"
                className="rounded-lg shadow-xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              {a.ourValuesHeading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#042142]">{a.ourValuesHeading.split(" ").slice(-1)[0]}</span>
            </motion.h2>
            <motion.p
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              {a.ourValuesSubtitle}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {a.values.map((value, index) => {
              const ValIcon = valueIcons[index] ?? Award;
              return (
              <motion.div
                key={index}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 25 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] text-white rounded-full mb-4">
                  <ValIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              {a.meetTeamHeading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#042142]">{a.meetTeamHeading.split(" ").slice(-1)[0]}</span>
            </motion.h2>
            <motion.p
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              {a.meetTeamSubtitle}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {a.team.map((member, index) => (
              <motion.div
                key={index}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 25 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-64 bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-24 h-24 text-white/50" />
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-[#042142] mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {a.showAboutStats !== false && <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {a.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <div className="text-4xl lg:text-5xl text-[#042142] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] text-white py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            {a.ctaHeading}
          </motion.h2>
          <motion.p
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="text-xl mb-8 text-white/90"
          >
            {a.ctaSubheading}
          </motion.p>
          <motion.div
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
            whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }}
            whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }}
            className="inline-block"
          >
            <a
              href={a.ctaBtnLink}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#042142] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {a.ctaBtnText}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
