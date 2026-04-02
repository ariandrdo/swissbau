import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Clock, Award, Phone, CheckCircle2, TrendingUp, Shield, Users, Zap, Wrench, Flame, Wind } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  CheckCircle2, Zap, Shield, Clock, Award, Wrench, Phone, TrendingUp, Flame, Wind,
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: "#071620" }}>
        <div className="absolute inset-0" style={{ overflow: "hidden" }}>
          <img
            src={h.heroImage}
            alt="Building facade"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay — no color tint */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(#a8a8a88c 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.8) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl lg:text-[72px] font-bold text-[#042142] mb-6"
          >
            {h.heroTitle1}
            <br />
            <span className="text-white">
              {h.heroTitle2}
            </span>
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
                className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142] text-white w-full sm:w-auto sm:min-w-[200px] px-8 py-4 rounded-full text-base font-bold shadow-2xl shadow-[#2db5d5]/50 hover:shadow-[#2db5d5]/70 overflow-hidden transition-all"
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


      </section>

      {/* About Us Teaser */}
      <section id="about-section" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#2db5d5]/10 border border-[#2db5d5]/30 px-6 py-2 rounded-full mb-6">
              <Users className="w-5 h-5 text-[#042142]" />
              <span className="text-[#042142] font-semibold">{h.aboutLabel}</span>
            </div>
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              {h.ourStoryHeading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#042142]">{h.ourStoryHeading.split(" ").slice(-1)[0]}</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-stretch mb-16">
            <div className="self-stretch flex">
              <img
                src="/fullimg.png"
                alt="Jubea Energy Systems team"
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
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142] text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[#2db5d5]/40 transition-all"
                >
                  {h.learnMoreBtn}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              )}
            </div>
          </div>

          {h.showStats !== false && <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {h.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#042142]">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>}
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-28 relative overflow-hidden" style={{ backgroundColor: "#143348" }}>
        {/* Brick / masonry pattern — nod to facade & plaster work */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60'%3E%3Crect x='1' y='1' width='58' height='28' rx='1' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Crect x='61' y='1' width='58' height='28' rx='1' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Crect x='-29' y='31' width='58' height='28' rx='1' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Crect x='31' y='31' width='58' height='28' rx='1' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Crect x='91' y='31' width='58' height='28' rx='1' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 60px",
        }} />
        {/* Blue gradient glow — bottom right */}
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #042142 0%, transparent 70%)" }} />
        {/* Subtle top-left glow */}
        <div className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #22a9d2 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#22a9d2]/50 rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] group-hover:opacity-80 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-lg">
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
              <Link to="/services" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142] hover:opacity-90 text-white px-8 py-4 rounded-full font-bold transition-colors shadow-lg shadow-[#22a9d2]/30">
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
            <span className="inline-block text-[#042142] font-semibold text-sm uppercase tracking-[0.2em] mb-3">{h.ourWorkLabel ?? "Our Work"}</span>
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold text-gray-900"
            >
              {h.featuredProductsTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#042142]">{h.featuredProductsTitle.split(" ").slice(-1)[0]}</span>
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
              <Link to="/projects" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3d6b9e] via-[#143348] to-[#042142] hover:opacity-90 text-white px-8 py-4 rounded-full font-bold transition-colors shadow-lg shadow-[#22a9d2]/30">
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
              <span className="text-[#042142]">{h.whyChooseLabel.split(" ").slice(-1)[0]}</span>
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
                className="bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] p-8 rounded-3xl text-white shadow-xl"
              >
                {(() => { const IconComp = featureIcons[index] ?? Award; return (
                <div className="w-16 h-16 bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
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
      <section className="py-24 bg-gradient-to-br from-[#3d6b9e] via-[#143348] to-[#042142]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-white font-semibold text-sm px-5 py-1.5 rounded-full mb-5">
              {h.ourProcessLabel ?? "Our Process"}
            </span>
            <motion.h2
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              {h.howItWorksHeading ?? "How It Works"}
            </motion.h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {h.howItWorksSubtitle ?? "From the first consultation to the final coat — a simple, professional process that delivers results you can see."}
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-16 left-[calc(16.666%)] right-[calc(16.666%)] h-px bg-white/15" />

            <div className="grid md:grid-cols-3 gap-8">
              {(h.howItWorksSteps ?? [
                { title: "Free Consultation", desc: "We visit your property, assess the surfaces, and discuss your vision. You receive a transparent, detailed quote with no hidden costs.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop" },
                { title: "Surface Preparation", desc: "Our team thoroughly cleans, sands, and primes all surfaces — the foundation for a flawless, long-lasting finish.", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80&fit=crop" },
                { title: "Professional Finish", desc: "Expert painters and plasterers apply premium coatings with precision, leaving your property looking immaculate inside and out.", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fit=crop" },
              ]).map((step: { title: string; desc: string; image: string }, i: number) => (
                <motion.div
                  key={i}
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 28 }}
                  whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle with image inside */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-6 flex-shrink-0 group">
                    <ImageWithFallback
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#042142]/30" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
