import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Clock, Award, Phone, CheckCircle2, TrendingUp, Shield, Users, Zap, Wrench, Flame, Wind, Paintbrush, Hammer, Layers, Grid2X2, HardHat, Ruler } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  CheckCircle2, Zap, Shield, Clock, Award, Wrench, Phone, TrendingUp, Flame, Wind,
  Paintbrush, Hammer, Layers, Grid2X2, HardHat, Ruler,
};
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useContent } from "../context/ContentContext";
import { useIsMobile } from "../hooks/useIsMobile";

const spring = { type: "spring", stiffness: 400, damping: 17 } as const;

export function Home() {
  const { content } = useContent();
  const isMobile = useIsMobile();
  const h = content.home;

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: h.heroImage
            ? `url(${h.heroImage}) center/cover no-repeat, #071620`
            : "#071620",
        }}
      >
        <div className="absolute inset-0">
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.75) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl lg:text-[72px] font-bold text-white mb-6"
            >
              {h.heroTitle1}
              <br />
              <span className="text-[#d91422]">{h.heroTitle2}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="text-xl text-gray-300 mb-[100px] max-w-3xl mx-auto leading-relaxed"
            >
              {h.heroSubtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14 w-full px-6 sm:px-0"
            >
              <motion.div whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }} whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }} className="w-full sm:w-auto">
                <Link
                  to="/projects"
                  className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#8b0c15] via-[#1a1a1a] to-[#111111] text-white w-full sm:w-auto sm:min-w-[200px] px-8 py-4 rounded-full text-base font-bold shadow-2xl shadow-[#d91422]/50 hover:shadow-[#d91422]/70 overflow-hidden transition-all"
                >
                  <span className="relative z-10 whitespace-nowrap">{h.heroBtnPrimary}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 flex-shrink-0 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }} whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }} className="w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="group flex items-center justify-center gap-3 bg-white/15 border border-white/80 text-white w-full sm:w-auto sm:min-w-[200px] px-8 py-4 rounded-full text-base font-bold transition-all hover:bg-white/25"
                >
                  <span className="whitespace-nowrap">{h.heroBtnSecondary}</span>
                  <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>


      </section>

      {/* About Us Teaser */}
      <section id="about-section" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#d91422]/10 border border-[#d91422]/30 px-6 py-2 rounded-full mb-6">
              <Users className="w-5 h-5 text-[#111111]" />
              <span className="text-[#111111] font-semibold">{h.aboutLabel}</span>
            </div>
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              {h.ourStoryHeading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#111111]">{h.ourStoryHeading.split(" ").slice(-1)[0]}</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-stretch mb-16">
            <div className="self-stretch flex">
              <img
                src="/fullimg.png"
                alt="SwissBau GmbH team"
                className="rounded-3xl shadow-2xl w-full h-full object-cover"
              />
            </div>
            <div>
              <motion.p
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-lg text-gray-600 mb-5 leading-relaxed"
              >
                {h.storyP1}
              </motion.p>
              <motion.p
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                {h.storyP2}
              </motion.p>
              {h.storyP3 && (
              <motion.p
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                {h.storyP3}
              </motion.p>
              )}
              {h.showLearnMoreBtn !== false && (
              <motion.div
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }}
                whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }}
                className="inline-block"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8b0c15] via-[#1a1a1a] to-[#111111] text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[#d91422]/40 transition-all"
                >
                  {h.learnMoreBtn}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              )}
            </div>
          </div>

          {h.showStats !== false && <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {h.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-3 lg:p-6 flex items-center gap-2 lg:gap-4"
              >
                <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-[#8b0c15] via-[#1a1a1a] to-[#111111] flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg lg:text-2xl font-bold text-[#111111] leading-tight">{stat.value}</div>
                  <div className="text-xs lg:text-sm text-gray-500 font-medium leading-tight">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>}
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services-section"
        className="relative py-24 overflow-hidden bg-[#141414]"
      >
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        {/* Red vertical accent bar left */}
        <div className="absolute left-0 top-[10%] bottom-[10%] w-[3px] bg-gradient-to-b from-transparent via-[#d91422] to-transparent" />
        {/* Soft red glow bottom-right */}
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#d91422]/6 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-white font-semibold text-sm uppercase tracking-[0.2em] mb-3">{h.whatWeOfferLabel}</span>
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold text-white"
            >
              {h.ourServicesHeading}
            </motion.h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {h.homeServices.map((item, i) => {
              const IconComp = iconMap[item.icon] ?? CheckCircle2;
              return (
                <motion.div
                  key={i}
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d91422]/50 rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8b0c15] via-[#1a1a1a] to-[#111111] group-hover:opacity-80 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-lg">
                    <IconComp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <motion.div
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }}
              whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }}
              className="inline-block"
            >
              <Link to="/services" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8b0c15] via-[#1a1a1a] to-[#111111] hover:opacity-90 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-[#d91422]/30">
                {h.viewAllServicesBtn}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[#111111] font-semibold text-sm uppercase tracking-[0.2em] mb-3">{h.ourWorkLabel ?? "Our Work"}</span>
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold text-gray-900"
            >
              {h.featuredProductsTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#111111]">{h.featuredProductsTitle.split(" ").slice(-1)[0]}</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 0 — wide (col-span-2) */}
            {h.featuredProducts[0] && (
              <motion.div
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 25 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
                className="md:col-span-2 group relative rounded-3xl overflow-hidden h-[380px] cursor-pointer"
              >
                <ImageWithFallback src={h.featuredProducts[0].image} alt={h.featuredProducts[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="text-2xl font-bold text-white">{h.featuredProducts[0].name}</h3>
                </div>
              </motion.div>
            )}

            {/* Card 1 — tall */}
            {h.featuredProducts[1] && (
              <motion.div
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 25 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="group relative rounded-3xl overflow-hidden h-[380px] cursor-pointer"
              >
                <ImageWithFallback src={h.featuredProducts[1].image} alt={h.featuredProducts[1].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="text-xl font-bold text-white">{h.featuredProducts[1].name}</h3>
                </div>
              </motion.div>
            )}

            {/* Card 2 — tall */}
            {h.featuredProducts[2] && (
              <motion.div
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 25 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="group relative rounded-3xl overflow-hidden h-[380px] cursor-pointer"
              >
                <ImageWithFallback src={h.featuredProducts[2].image} alt={h.featuredProducts[2].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="text-xl font-bold text-white">{h.featuredProducts[2].name}</h3>
                </div>
              </motion.div>
            )}

            {/* Card 3 — wide (col-span-2) */}
            {h.featuredProducts[3] && (
              <motion.div
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 25 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                className="md:col-span-2 group relative rounded-3xl overflow-hidden h-[380px] cursor-pointer"
              >
                <ImageWithFallback src={h.featuredProducts[3].image} alt={h.featuredProducts[3].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="text-2xl font-bold text-white">{h.featuredProducts[3].name}</h3>
                </div>
              </motion.div>
            )}
          </div>

          <div className="text-center mt-10">
            <motion.div
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={isMobile ? undefined : { scale: 1.04, transition: spring }}
              whileTap={isMobile ? undefined : { scale: 0.97, transition: spring }}
              className="inline-block"
            >
              <Link to="/projects" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8b0c15] via-[#1a1a1a] to-[#111111] hover:opacity-90 text-white px-8 py-4 rounded-full font-bold transition-colors shadow-lg shadow-[#22a9d2]/30">
                {h.viewAllProductsBtn} <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              {h.whyChooseLabel.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#111111]">{h.whyChooseLabel.split(" ").slice(-1)[0]}</span>
            </motion.h2>
          </div>

          {(() => {
            const featureIcons = [Award, Shield, TrendingUp, Clock];
            return (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.whyChooseFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 25 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#8b0c15] via-[#1a1a1a] to-[#111111] p-8 rounded-3xl text-white shadow-xl"
              >
                {(() => { const IconComp = featureIcons[index] ?? Award; return (
                <div className="w-16 h-16 bg-gradient-to-br from-[#8b0c15] via-[#1a1a1a] to-[#111111] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <IconComp className="w-8 h-8" />
                </div>
                ); })()}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
            );
          })()}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative overflow-hidden bg-[#f8f8f8]">
        {/* Red top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d91422] to-transparent" />
        {/* Decorative corner accent */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#d91422]/5 rounded-tl-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#d91422]/10 border border-[#d91422]/20 text-[#d91422] font-semibold text-sm px-5 py-1.5 rounded-full mb-5">
              {h.ourProcessLabel}
            </span>
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold text-[#111111] mb-4"
            >
              {h.howItWorksHeading}
            </motion.h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {h.howItWorksSubtitle}
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-16 left-[calc(16.666%)] right-[calc(16.666%)] h-px bg-gray-200" />

            <div className="grid md:grid-cols-3 gap-8">
              {h.howItWorksSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 28 }}
                  whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle with image inside */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#d91422]/20 mb-6 flex-shrink-0 group shadow-lg">
                    <ImageWithFallback
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#111111]/20" />
                  </div>

                  <h3 className="text-xl font-bold text-[#111111] mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
