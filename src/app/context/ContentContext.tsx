import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import { supabase } from "../../lib/supabase";

export type Lang = "en" | "de" | "sq" | "mk";

export const LANGS: Lang[] = ["en", "de", "sq", "mk"];

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  de: "DE",
  sq: "SQ",
  mk: "MK",
};

export type SiteContent = {
  global: {
    companyName: string;
    phone: string;
    email: string;
    address: string;
    logo?: string;
  };
  header: {
    logo?: string;
    phone: string;
    navLinks: { label: string; path: string }[];
  };
  home: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    heroImage: string;
    heroBtnPrimary: string;
    heroBtnSecondary: string;
    storyP1: string;
    storyP2: string;
    storyP3?: string;
    stats: { value: string; label: string }[];
    showStats: boolean;
    ctaHeading: string;
    ctaSubheading: string;
    ctaPhone: string;
    featuredProductsTitle: string;
    featuredProducts: { name: string; image: string }[];
    homeGallery: { image: string; title: string }[];
    homeServices: { icon: string; title: string; desc: string }[];
    // UI strings
    aboutLabel: string;
    ourStoryHeading: string;
    ourStorySubtitle: string;
    learnMoreBtn: string;
    showLearnMoreBtn: boolean;
    whatWeOfferLabel: string;
    ourServicesHeading: string;
    learnMoreCardBtn: string;
    viewAllServicesBtn: string;
    viewAllProductsBtn: string;
    whyChooseLabel: string;
    whyChooseSubtitle: string;
    whyChooseFeatures: { title: string; desc: string }[];
    ourProcessLabel: string;
    howItWorksHeading: string;
    howItWorksSubtitle: string;
    howItWorksSteps: { title: string; desc: string; image: string }[];
    ourWorkLabel: string;
    projectGalleryHeading: string;
    viewAllBtn: string;
    scheduleConsultBtn: string;
  };
  services: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    heroBtnText: string;
    heroBtnLink: string;
    emergencyPhone: string;
    ctaHeading: string;
    ctaSubheading: string;
    ctaPhone: string;
    ctaBtnText: string;
    ctaBtnLink: string;
    detailedServices: Array<{
      id: string;
      title: string;
      subtitle: string;
      description: string;
      services: string[];
      benefits: string[];
      image?: string;
      icon?: string;
    }>;
    // UI strings
    servicesIncludedLabel: string;
    requestServiceBtn: string;
    showAdditionalServices: boolean;
    additionalServicesHeading: string;
    additionalServicesSubtitle: string;
    additionalServices: { title: string; desc: string; features: string[] }[];
    weServeHeading: string;
    weServeSubtitle: string;
    customerTypes: { title: string; desc: string; items: string[] }[];
    showAdvantage: boolean;
    advantageHeading: string;
    advantageSubtitle: string;
    advantages: { title: string; desc: string }[];
    showEmergencyBanner: boolean;
    emergencyHeading: string;
    emergencySubtitle: string;
  };
  about: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    storyP4?: string;
    team: { name: string; role: string; experience: string; image?: string }[];
    stats: { value: string; label: string }[];
    showAboutStats: boolean;
    showCerts: boolean;
    ctaHeading: string;
    ctaSubheading: string;
    ctaBtnText: string;
    ctaBtnLink: string;
    // UI strings
    ourStoryLabel: string;
    ourValuesHeading: string;
    ourValuesSubtitle: string;
    values: { title: string; desc: string }[];
    certsHeading: string;
    certsSubtitle: string;
    certs: { title: string; desc: string }[];
    meetTeamHeading: string;
    meetTeamSubtitle: string;
  };
  contact: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    phone: string;
    email: string;
    address: string;
    hoursWeekday: string;
    hoursSaturday: string;
    mapEmbedUrl: string;
    serviceAreas: string[];
    // UI strings
    contactInfoHeading: string;
    contactInfoSubtitle: string;
    responseTime: string;
    responseNote: string;
    urgentHeading: string;
    callNowBtn: string;
    sendMessageHeading: string;
    sendMessageSubtitle: string;
    nameLabelText: string;
    namePlaceholder: string;
    emailLabelText: string;
    emailPlaceholder: string;
    phoneLabelText: string;
    phonePlaceholder: string;
    serviceLabelText: string;
    servicePlaceholder: string;
    serviceOptions: string[];
    detailsLabelText: string;
    detailsPlaceholder: string;
    sendBtn: string;
    findUsHeading: string;
    noMapText: string;
    serviceAreaHeading: string;
    serviceAreaText: string;
    errorMsg: string;
    successMsg: string;
    phoneLabel: string;
    emailLabel: string;
    officeLabel: string;
    hoursLabel: string;
  };
  gallery: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    ctaHeading: string;
    ctaSubheading: string;
    ctaPhone: string;
    // UI strings
    filterLabel: string;
    noImagesText: string;
    callTodayBtn: string;
  };
  products: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    // UI strings
    productLineupHeading: string;
    productLineupSubtitle: string;
    getQuoteBtn: string;
    installHeading: string;
    installDesc: string;
    installFeatures: string[];
    scheduleConsultBtn: string;
    financingHeading: string;
    financingDesc: string;
    financingBtn: string;
    brandsTitle: string;
    brandsDesc: string;
    warrantyTitle: string;
    warrantyDesc: string;
    energyTitle: string;
    energyDesc: string;
    filterAllLabel: string;
    showBenefits: boolean;
    categories: string[];
  };
  footer: {
    logo?: string;
    description: string;
    quickLinks: { label: string; path: string }[];
    services: string[];
    phone: string;
    email: string;
    address: string;
    // UI strings
    quickLinksHeading: string;
    ourServicesHeading: string;
    contactUsHeading: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    mapDirectionsUrl?: string;
  };
};

// ── English default ────────────────────────────────────────────────────────────

export const defaultContent: SiteContent = {
  global: {
    companyName: "Beqiri GmbH",
    phone: "+49 123 456 789",
    email: "info@beqiri-gmbh.de",
    address: "Germany",
  },
  header: {
    phone: "+49 123 456 789",
    navLinks: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/services" },
      { label: "Projects", path: "/projects" },
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
  },
  footer: {
    description: "Professional painting, plaster works, and facade solutions for residential and commercial properties.",
    quickLinks: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/services" },
      { label: "Projects", path: "/projects" },
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
    services: [
      "Interior Painting",
      "Plaster Works",
      "Facade Works",
      "Exterior Painting",
    ],
    phone: "+49 123 456 789",
    email: "info@beqiri-gmbh.de",
    address: "Germany",
    quickLinksHeading: "Quick Links",
    ourServicesHeading: "Our Services",
    contactUsHeading: "Contact Us",
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Address",
  },
  home: {
    heroTitle1: "Quality Craftsmanship,",
    heroTitle2: "Flawless Finish",
    heroSubtitle:
      "Professional painting, plaster works, and facade solutions for residential and commercial properties. Built on precision, delivered with pride.",
    heroImage: "/background.jpg",
    heroBtnPrimary: "Our Services",
    heroBtnSecondary: "Get Free Quote",
    storyP1:
      "Beqiri GmbH is a trusted name in painting, plastering, and facade work across the region. With years of hands-on experience, we deliver high-quality surface solutions for private homes, apartment buildings, and commercial properties.",
    storyP2:
      "Our team of skilled craftsmen takes pride in every project — from interior plaster finishes to full exterior facade systems. We combine traditional techniques with modern materials to ensure results that are both beautiful and long-lasting.",
    storyP3:
      "At Beqiri GmbH, we believe that quality starts with communication. We work closely with every client — listening, planning, and executing with precision — so that the final result always exceeds expectations. Your property deserves nothing less.",
    stats: [
      { value: "10+", label: "Years of Experience" },
      { value: "500+", label: "Projects Completed" },
      { value: "4.9★", label: "Client Rating" },
      { value: "100%", label: "Satisfaction Guarantee" },
    ],
    showStats: true,
    ctaHeading: "Ready to Transform Your Property?",
    ctaSubheading: "Get your free consultation today and see what Beqiri GmbH can do for you",
    ctaPhone: "+49 123 456 789",
    homeServices: [
      { icon: "Flame",   title: "Interior Painting",  desc: "Clean, precise, and long-lasting interior paint finishes for every room." },
      { icon: "Wrench",  title: "Plaster Works",      desc: "Expert plastering for smooth, durable walls and ceilings." },
      { icon: "Zap",     title: "Facade Works",       desc: "Full exterior facade systems — insulation, render, and finish coatings." },
      { icon: "Wind",    title: "Exterior Painting",  desc: "Weather-resistant exterior paint solutions for any building type." },
    ],
    homeGallery: [
      { image: "/img1.png", title: "Project 1" },
      { image: "/img2.png", title: "Project 2" },
      { image: "/img3.png", title: "Project 3" },
      { image: "/img4.png", title: "Project 4" },
      { image: "/img5.png", title: "Project 5" },
    ],
    featuredProductsTitle: "Featured Projects",
    featuredProducts: [
      { name: "Facade Renovation",    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" },
      { name: "Interior Plastering",  image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80" },
      { name: "Exterior Painting",    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80" },
      { name: "Decorative Plaster",   image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80" },
    ],
    aboutLabel: "About Us",
    ourStoryHeading: "Our Story",
    ourStorySubtitle: "Years of trusted craftsmanship in painting, plaster and facade works",
    learnMoreBtn: "Learn More About Us",
    showLearnMoreBtn: true,
    whatWeOfferLabel: "What We Offer",
    ourServicesHeading: "Our Services",
    learnMoreCardBtn: "Learn more",
    viewAllServicesBtn: "View All Services",
    viewAllProductsBtn: "View All Projects",
    whyChooseLabel: "Why Choose Beqiri GmbH",
    whyChooseSubtitle: "Excellence in every detail",
    whyChooseFeatures: [
      { title: "Expert Craftsmen", desc: "Our team brings years of specialized experience in plastering, painting, and facade systems to every job." },
      { title: "100% Guarantee", desc: "We stand behind our work. Every project is completed to the highest standard — guaranteed." },
      { title: "Quality Materials", desc: "We use only premium, proven materials from trusted suppliers for lasting, professional results." },
      { title: "On-Time Delivery", desc: "We respect your schedule. Projects are completed on time, every time — with clear communication throughout." },
    ],
    ourProcessLabel: "Our Process",
    howItWorksHeading: "How It Works",
    howItWorksSubtitle: "From the first consultation to the final coat — a simple, professional process that delivers results you can see.",
    howItWorksSteps: [
      { title: "Free Consultation", desc: "We visit your property, assess the surfaces, and discuss your vision. You receive a transparent, detailed quote with no hidden costs.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop" },
      { title: "Surface Preparation", desc: "Our team thoroughly cleans, sands, and primes all surfaces — the foundation for a flawless, long-lasting finish.", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80&fit=crop" },
      { title: "Professional Finish", desc: "Expert painters and plasterers apply premium coatings with precision, leaving your property looking immaculate inside and out.", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fit=crop" },
    ],
    ourWorkLabel: "Our Work",
    projectGalleryHeading: "Project Gallery",
    viewAllBtn: "View All",
    scheduleConsultBtn: "Request a Quote",
  },
  services: {
    heroTitle1: "Professional",
    heroTitle2: "Services",
    heroSubtitle: "Expert painting, plastering, and facade solutions for homes and businesses",
    heroBtnText: "Get Free Quote",
    heroBtnLink: "/contact",
    emergencyPhone: "+49 123 456 789",
    ctaHeading: "Ready to Get Started?",
    ctaSubheading: "Contact us today for a free consultation and see what Beqiri GmbH can do for you",
    ctaPhone: "+49 123 456 789",
    ctaBtnText: "Request a Quote",
    ctaBtnLink: "/contact",
    detailedServices: [
      {
        id: "interior-painting",
        title: "Interior Painting",
        subtitle: "Clean, precise finishes for every room",
        description: "We deliver professional interior painting services with careful preparation, premium paints, and flawless execution for lasting results.",
        services: [
          "Wall & Ceiling Painting",
          "Surface Preparation",
          "Primer Application",
          "Decorative Finishes",
          "Trim & Detail Work",
          "Color Consultation",
        ],
        benefits: [
          "Long-lasting finish",
          "Clean and tidy work",
          "Premium materials used",
          "Fast turnaround",
        ],
      },
      {
        id: "plaster-works",
        title: "Plaster Works",
        subtitle: "Smooth, durable walls and ceilings",
        description: "Our expert plasterers deliver smooth, even surfaces for both new builds and renovations, using high-quality plaster materials.",
        services: [
          "Interior Plastering",
          "Skim Coat Finishing",
          "Ceiling Plastering",
          "Crack Repair",
          "Decorative Plaster",
          "Renovation Plastering",
        ],
        benefits: [
          "Perfectly smooth surfaces",
          "Durable long-term results",
          "Suitable for all wall types",
          "Expert craftsmanship",
        ],
      },
      {
        id: "facade-works",
        title: "Facade Works",
        subtitle: "Complete exterior facade systems",
        description: "From insulation boards to render and final coating, we handle full facade renovation projects for residential and commercial buildings.",
        services: [
          "Facade Insulation Systems (ETICS)",
          "Render Application",
          "Facade Repair & Renovation",
          "Waterproof Coatings",
          "Decorative Finishes",
          "Facade Cleaning",
        ],
        benefits: [
          "Improved energy efficiency",
          "Weather-resistant finish",
          "Enhanced curb appeal",
          "Long-lasting protection",
        ],
      },
      {
        id: "exterior-painting",
        title: "Exterior Painting",
        subtitle: "Weather-resistant protection for any building",
        description: "We apply high-quality exterior paints and coatings that protect your building from weather, UV rays, and moisture for years to come.",
        services: [
          "Exterior Wall Painting",
          "Surface Priming",
          "Weatherproof Coatings",
          "Window & Door Frame Painting",
          "Balcony & Terrace Painting",
          "Anti-mold Treatment",
        ],
        benefits: [
          "UV & weather resistant",
          "Protects building structure",
          "Fresh, modern look",
          "Extended coating lifespan",
        ],
      },
    ],
    servicesIncludedLabel: "Services Included:",
    requestServiceBtn: "Request This Service",
    showAdditionalServices: true,
    additionalServicesHeading: "Additional Services",
    additionalServicesSubtitle: "Specialized solutions for every need",
    additionalServices: [
      { title: "Decorative Finishes", desc: "Unique textures and decorative wall finishes for a premium look", features: ["Venetian Plaster", "Structured Coatings", "Stone Effect", "Colour Washing"] },
      { title: "Renovation Works", desc: "Full renovation services for old or damaged walls and facades", features: ["Crack Repair", "Surface Restoration", "Re-rendering", "Damp Treatment"] },
      { title: "Commercial Projects", desc: "Large-scale painting and facade solutions for businesses", features: ["Office Buildings", "Apartment Blocks", "Retail Spaces", "Industrial Facades"] },
      { title: "New Construction", desc: "Complete surface finishing for new build projects", features: ["Rough Plaster", "Fine Coat", "Interior Paint", "Exterior Render"] },
    ],
    weServeHeading: "We Serve Everyone",
    weServeSubtitle: "From private homes to large commercial projects, we've got you covered",
    customerTypes: [
      { title: "Residential", desc: "Quality finishes for your home", items: ["Single-family homes", "Apartments", "Condos", "New construction"] },
      { title: "Commercial", desc: "Professional works for businesses", items: ["Office buildings", "Retail spaces", "Hotels", "Industrial facilities"] },
    ],
    showAdvantage: true,
    advantageHeading: "The Beqiri GmbH Advantage",
    advantageSubtitle: "What sets us apart from the competition",
    advantages: [
      { title: "Expert Craftsmen", desc: "Skilled professionals with years of specialised experience" },
      { title: "100% Guarantee", desc: "Complete satisfaction guaranteed on every project" },
      { title: "Quality Materials", desc: "Only premium, proven materials from trusted suppliers" },
      { title: "10+ Years Experience", desc: "Trusted expertise delivering hundreds of projects" },
      { title: "On Time & On Budget", desc: "We respect your time and deliver as promised" },
      { title: "Clean & Tidy", desc: "We leave your property spotless after every job" },
    ],
    showEmergencyBanner: false,
    emergencyHeading: "Need a Quote?",
    emergencySubtitle: "Contact us today and we'll get back to you within 24 hours",
  },
  about: {
    heroTitle1: "About",
    heroTitle2: "Beqiri GmbH",
    heroSubtitle: "Your trusted partner for painting, plaster works, and facade solutions",
    storyP1:
      "Beqiri GmbH is a professional painting and facade company based in Germany. With over 10 years of hands-on experience, we deliver high-quality surface solutions for private homes, apartment buildings, and commercial properties.",
    storyP2:
      "We were founded with a simple goal: to provide honest, reliable, and professional craftsmanship to every client. From interior plaster finishes to full exterior facade systems, we bring the same level of care and precision to every project.",
    storyP3:
      "Our reputation is built on quality workmanship, fair pricing, and exceptional customer service. We use only premium materials and stand behind every job we complete — your satisfaction is guaranteed.",
    storyP4: "",
    team: [
      { name: "Beqiri", role: "Founder & Master Craftsman", experience: "10+ years experience" },
    ],
    stats: [
      { value: "10+", label: "Years of Experience" },
      { value: "500+", label: "Projects Completed" },
      { value: "100%", label: "Satisfaction Guarantee" },
      { value: "4.9★", label: "Client Rating" },
    ],
    showAboutStats: true,
    showCerts: true,
    ctaHeading: "Ready to Transform Your Property?",
    ctaSubheading: "Contact us today for a free consultation and quote",
    ctaBtnText: "Contact Us Today",
    ctaBtnLink: "/contact",
    ourStoryLabel: "Our Story",
    ourValuesHeading: "Our Values",
    ourValuesSubtitle: "The principles that guide everything we do",
    values: [
      { title: "Quality Workmanship", desc: "We take pride in delivering exceptional craftsmanship on every project, big or small." },
      { title: "Customer First", desc: "Your satisfaction is our top priority. We listen, advise, and deliver results that exceed expectations." },
      { title: "Reliable & Punctual", desc: "We show up on time, work efficiently, and complete every project as promised." },
      { title: "Honest & Transparent", desc: "Clear pricing, no hidden costs, and honest communication from start to finish." },
    ],
    certsHeading: "Why Trust Us",
    certsSubtitle: "Professional, insured, and experienced",
    certs: [
      { title: "Experienced", desc: "Over 10 years of professional painting and facade work" },
      { title: "Insured", desc: "Fully insured for your protection on every project" },
      { title: "Guaranteed", desc: "100% satisfaction guarantee on all our work" },
    ],
    meetTeamHeading: "Meet Our Team",
    meetTeamSubtitle: "Skilled craftsmen dedicated to flawless results",
  },
  contact: {
    heroTitle1: "Contact",
    heroTitle2: "Us",
    heroSubtitle: "Get in touch with our team for a free quote or consultation",
    phone: "+49 123 456 789",
    email: "info@beqiri-gmbh.de",
    address: "Germany",
    hoursWeekday: "Mon – Fri: 7:00 AM – 6:00 PM",
    hoursSaturday: "Sat: 8:00 AM – 2:00 PM",
    mapEmbedUrl: "",
    serviceAreas: ["Germany"],
    contactInfoHeading: "Contact Information",
    contactInfoSubtitle: "Fill out the form and our team will get back to you within 24 hours.",
    responseTime: "Mon–Fri, 8am – 6pm",
    responseNote: "We respond within 24 hours",
    urgentHeading: "Need urgent help?",
    callNowBtn: "Call Us Now",
    sendMessageHeading: "Send Us a Message",
    sendMessageSubtitle: "We'd love to hear about your project.",
    nameLabelText: "Full Name *",
    namePlaceholder: "John Doe",
    emailLabelText: "Email Address *",
    emailPlaceholder: "john@example.com",
    phoneLabelText: "Phone Number",
    phonePlaceholder: "(555) 000-0000",
    serviceLabelText: "Service Interested In *",
    servicePlaceholder: "Select a service",
    serviceOptions: ["Interior Painting", "Exterior Painting", "Plaster Works", "Facade Works", "Renovation", "Decorative Finishes", "Other"],
    detailsLabelText: "Project Details *",
    detailsPlaceholder: "Tell us about your project...",
    sendBtn: "Send Message",
    findUsHeading: "Find Us",
    noMapText: "No map configured — add a Google Maps embed URL in the admin panel.",
    serviceAreaHeading: "Service Area",
    serviceAreaText: "We proudly serve the greater metropolitan area and surrounding communities. If you're not sure if we service your area, give us a call!",
    errorMsg: "Something went wrong. Please try again.",
    successMsg: "Thank you for your inquiry! We'll get back to you soon.",
    phoneLabel: "Phone",
    emailLabel: "Email",
    officeLabel: "Office",
    hoursLabel: "Hours",
  },
  gallery: {
    heroTitle1: "Our Work",
    heroTitle2: "Gallery",
    heroSubtitle: "Explore our portfolio of completed projects and installations",
    ctaHeading: "Ready to Start Your Project?",
    ctaSubheading:
      "Let us bring the same quality and professionalism to your home or business",
    ctaPhone: "+389 70 777 888",
    filterLabel: "Filter:",
    noImagesText: "No images found in this category",
    callTodayBtn: "Call Us Today",
  },
  products: {
    heroTitle1: "Our",
    heroTitle2: "Projects",
    heroSubtitle: "Browse our portfolio of completed painting, plaster, and facade projects",
    productLineupHeading: "Our Work",
    productLineupSubtitle: "A selection of our completed projects",
    getQuoteBtn: "Get Quote",
    installHeading: "Professional Service Included",
    installDesc: "Every project is handled from start to finish by our skilled team. We prepare surfaces properly, use premium materials, and ensure a flawless result every time.",
    installFeatures: [
      "Free on-site consultation and estimate",
      "Professional work by experienced craftsmen",
      "Premium materials from trusted suppliers",
      "Satisfaction guarantee on all projects",
    ],
    scheduleConsultBtn: "Request a Quote",
    financingHeading: "Competitive Pricing",
    financingDesc: "We offer fair, transparent pricing with no hidden costs on every project",
    financingBtn: "Contact Us",
    brandsTitle: "Quality Materials",
    brandsDesc: "We use only premium products from trusted manufacturers",
    warrantyTitle: "Work Guaranteed",
    warrantyDesc: "100% satisfaction guarantee on all our work",
    energyTitle: "Expert Team",
    energyDesc: "Save up to 40% on energy costs with modern systems",
    filterAllLabel: "All",
    showBenefits: true,
    categories: [],
  },
};

// ── German default ─────────────────────────────────────────────────────────────

const defaultContentDe: SiteContent = {
  global: {
    companyName: "Jubea Energy Systems",
    phone: "+389 70 777 888",
    email: "info@jubea-energy.com",
    address: "Gostivar, North Macedonia",
  },
  header: {
    phone: "+389 70 777 888",
    navLinks: [
      { label: "Startseite", path: "/" },
      { label: "Dienstleistungen", path: "/services" },
      { label: "Projekte", path: "/projects" },
      { label: "Über uns", path: "/about" },
      { label: "Kontakt", path: "/contact" },
    ],
  },
  footer: {
    description: "Professionelle Heizungs- und Klimaanlagendienstleistungen für Wohn- und Gewerbeimmobilien seit 2000.",
    quickLinks: [
      { label: "Startseite", path: "/" },
      { label: "Dienstleistungen", path: "/services" },
      { label: "Projekte", path: "/projects" },
      { label: "Über uns", path: "/about" },
      { label: "Kontakt", path: "/contact" },
    ],
    services: [
      "Klimaanlagen-Installation & Reparatur",
      "Heizungsservice",
      "Wartungspläne",
      "24/7 Notdienst",
    ],
    phone: "+389 70 777 888",
    email: "info@jubea-energy.com",
    address: "Gostivar, North Macedonia",
    quickLinksHeading: "Schnelllinks",
    ourServicesHeading: "Unsere Dienstleistungen",
    contactUsHeading: "Kontakt",
    phoneLabel: "Telefon",
    emailLabel: "E-Mail",
    addressLabel: "Adresse",
  },
  home: {
    heroTitle1: "Ihr Komfort,",
    heroTitle2: "Unsere Mission",
    heroSubtitle:
      "Erleben Sie das perfekte Raumklima mit Jubea Energy Systems. Premium HVAC-Lösungen für Häuser und Unternehmen.",
    heroImage: "/background.jpg",
    heroBtnPrimary: "Produkte ansehen",
    heroBtnSecondary: "Kostenloses Angebot",
    storyP1:
      "Seit 2000 ist Jubea Energy Systems für Privat- und Geschäftskunden mit erstklassigen HLK-Dienstleistungen tätig. Was als kleines Familienunternehmen begann, ist heute einer der vertrauenswürdigsten Namen der Branche.",
    storyP2:
      "Unsere Mission ist einfach: ehrliche, zuverlässige und professionelle Heizungs- und Kühldienstleistungen für jeden Haushalt und jedes Unternehmen zu erbringen.",
    storyP3:
      "Bei Beqiri GmbH beginnt Qualität mit Kommunikation. Wir arbeiten eng mit jedem Kunden zusammen — zuhören, planen und ausführen mit Präzision — damit das Ergebnis stets die Erwartungen übertrifft. Ihre Immobilie verdient nichts weniger.",
    stats: [
      { value: "25+", label: "Jahre Erfahrung" },
      { value: "10K+", label: "Kunden bedient" },
      { value: "4.9★", label: "Durchschnittliche Bewertung" },
      { value: "24/7", label: "Notdienst" },
    ],
    ctaHeading: "Bereit für perfekten Komfort?",
    ctaSubheading: "Holen Sie sich noch heute Ihre kostenlose Beratung",
    ctaPhone: "+389 70 777 888",
    homeServices: [
      { icon: "Flame",   title: "Heizsysteme",   desc: "Zuverlässige Wärme, wenn Sie sie am meisten brauchen, von Experten installiert." },
      { icon: "Wrench",  title: "Wartung",       desc: "Geplante Pflegepläne, damit Ihr System mit maximaler Effizienz läuft." },
      { icon: "Zap",     title: "Notdienst",     desc: "Rund-um-die-Uhr schnelle Reaktion auf dringende HLK-Situationen." },
      { icon: "Wind",    title: "Klimaanlage",   desc: "Premium-Kühllösungen für Häuser und Unternehmen aller Größen." },
    ],
    homeGallery: [
      { image: "/img1.png", title: "Projekt 1" },
      { image: "/img2.png", title: "Projekt 2" },
      { image: "/img3.png", title: "Projekt 3" },
      { image: "/img4.png", title: "Projekt 4" },
      { image: "/img5.png", title: "Projekt 5" },
    ],
    featuredProductsTitle: "Ausgewählte Produkte",
    featuredProducts: [
      { name: "Heizsystem",          image: "/img1.png" },
      { name: "Heizungsregelanlage", image: "/img2.png" },
      { name: "Kühlsystem",          image: "/img3.png" },
    ],
    aboutLabel: "Über uns",
    ourStoryHeading: "Unsere Geschichte",
    ourStorySubtitle: "Über zwei Jahrzehnte vertrauenswürdige HLK-Dienstleistungen",
    showStats: true,
    showLearnMoreBtn: true,
    viewAllProductsBtn: "Alle Projekte ansehen",
    learnMoreBtn: "Mehr erfahren",
    whatWeOfferLabel: "Was wir anbieten",
    ourServicesHeading: "Unsere Dienstleistungen",
    learnMoreCardBtn: "Mehr erfahren",
    viewAllServicesBtn: "Alle Dienstleistungen ansehen",
    whyChooseLabel: "Warum Jubea wählen",
    whyChooseSubtitle: "Exzellenz in jedem Detail",
    whyChooseFeatures: [
      { title: "Vertrauen", desc: "Schweizer Standards für Nordmazedonien – wir modernisieren Ihre Energieversorgung effizient und nachhaltig." },
      { title: "100% Garantie", desc: "Vollständige Zufriedenheit garantiert bei all unseren Arbeiten und Dienstleistungen" },
      { title: "Energieeinsparungen", desc: "Deutliche Einsparungen durch unsere Beratung – mit hochwertigen Wärmepumpen." },
      { title: "Pünktliche Lieferung", desc: "Wir respektieren Ihren Zeitplan. Projekte werden pünktlich abgeschlossen – mit klarer Kommunikation von Anfang bis Ende." },
    ],
    ourProcessLabel: "Unser Prozess",
    howItWorksHeading: "So funktioniert es",
    howItWorksSubtitle: "Von der ersten Beratung bis zum letzten Anstrich — ein einfacher, professioneller Prozess mit sichtbaren Ergebnissen.",
    howItWorksSteps: [
      { title: "Kostenlose Beratung", desc: "Wir besuchen Ihr Objekt, beurteilen die Oberflächen und besprechen Ihre Vorstellungen. Sie erhalten ein transparentes Angebot ohne versteckte Kosten.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop" },
      { title: "Untergrundvorbereitung", desc: "Unser Team reinigt, schleift und grundiert alle Flächen gründlich — die Grundlage für ein makelloses, langlebiges Ergebnis.", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80&fit=crop" },
      { title: "Professionelle Ausführung", desc: "Erfahrene Maler und Verputzer tragen hochwertige Beschichtungen präzise auf und hinterlassen Ihr Objekt makellos — innen wie außen.", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fit=crop" },
    ],
    ourWorkLabel: "Unsere Arbeit",
    projectGalleryHeading: "Projektgalerie",
    viewAllBtn: "Alle ansehen",
    scheduleConsultBtn: "Beratung vereinbaren",
  },
  services: {
    heroTitle1: "Professionelle HLK-",
    heroTitle2: "Dienstleistungen",
    heroSubtitle: "Fachmännische Heizungs- und Kühllösungen für Privat- und Gewerbeobjekte",
    heroBtnText: "Kostenloses Angebot",
    heroBtnLink: "/contact",
    emergencyPhone: "+389 70 777 888",
    ctaHeading: "Bereit anzufangen?",
    ctaSubheading: "Kontaktieren Sie uns noch heute",
    ctaPhone: "+389 70 777 888",
    ctaBtnText: "Service jetzt buchen",
    ctaBtnLink: "/contact",
    detailedServices: [
      {
        id: "heating",
        title: "Heizungsservices",
        subtitle: "Zuverlässige Wärme, wenn Sie sie am meisten brauchen",
        description:
          "Fachkundige Installation, Reparatur und Wartung aller Heizsysteme einschließlich Öfen, Wärmepumpen und Kesseln.",
        services: [
          "Ofeninstallation",
          "Wärmepumpen-Service",
          "Kesselreparatur & Wartung",
          "Thermostatinstallation",
          "Wärmeverteilungsoptimierung",
          "Notfall-Heizungsreparaturen",
        ],
        benefits: [
          "Reduzierte Heizkosten",
          "Verbesserter Wohnkomfort",
          "Leiserer Betrieb",
          "Erhöhte Sicherheit",
        ],
      },
      {
        id: "maintenance",
        title: "Wartungspläne",
        subtitle: "Schützen Sie Ihre Investition mit vorbeugender Pflege",
        description:
          "Regelmäßige Wartung hält Ihr System effizient, verhindert Ausfälle und verlängert die Gerätelebensdauer.",
        services: [
          "Halbjährliche Inspektionen",
          "Filterwechsel",
          "System-Tuning",
          "Leistungsprüfung",
          "Prioritäts-Notdienst",
          "Ermäßigte Reparaturen",
        ],
        benefits: [
          "Vermeiden Sie kostspielige Ausfälle",
          "Maximale Energieeffizienz",
          "Vorrangige Terminplanung",
          "15% Rabatt auf Reparaturen",
        ],
      },
      {
        id: "repair",
        title: "Reparaturservices",
        subtitle: "Schnelle, zuverlässige Lösungen für alle HLK-Probleme",
        description:
          "Unsere zertifizierten Techniker diagnostizieren und reparieren alle Arten von HLK-Problemen schnell und effektiv.",
        services: [
          "Vollständige Systemdiagnose",
          "Komponentenaustausch",
          "Kältemittel-Nachfüllung",
          "Elektrische Reparaturen",
          "Luftstromoptimierung",
          "Leistungswiederherstellung",
        ],
        benefits: [
          "Same-Day-Service möglich",
          "Transparente Preisgestaltung",
          "90-Tage-Reparaturgarantie",
          "Erfahrene Techniker",
        ],
      },
      {
        id: "cooling",
        title: "Klimaanlagenservices",
        subtitle: "Das ganze Jahr über kühl und komfortabel bleiben",
        description:
          "Von Neuinstallationen bis hin zu Reparaturen und regelmäßiger Wartung bieten wir umfassende Klimaanlagen-Dienstleistungen.",
        services: [
          "Neue Klimaanlage installieren",
          "Systemaustauch",
          "Klimaanlagenreparatur & Fehlersuche",
          "Vorbeugende Wartung",
          "Kanalreinigung & -abdichtung",
          "Energieeffizienz-Upgrades",
        ],
        benefits: [
          "Bis zu 40% niedrigere Energiekosten",
          "Verbesserte Raumluftqualität",
          "Gleichmäßige Temperaturregelung",
          "Verlängerte Gerätelebensdauer",
        ],
      },
    ],
    servicesIncludedLabel: "Enthaltene Dienstleistungen:",
    requestServiceBtn: "Diesen Service anfragen",
    showAdditionalServices: true,
    additionalServicesHeading: "Weitere Dienstleistungen",
    additionalServicesSubtitle: "Speziallösungen für jeden Bedarf",
    additionalServices: [
      { title: "Raumluftqualität", desc: "Verbessern Sie die Luft in Ihrem Haus mit Reinigungs- und Filtersystemen", features: ["Luftreiniger", "Befeuchter", "UV-Licht", "Belüftung"] },
      { title: "Smart-Home-Integration", desc: "Verbinden Sie Ihre HLK-Anlage mit Smart-Home-Systemen für ultimative Kontrolle", features: ["WLAN-Thermostate", "Fernüberwachung", "Energieberichte", "Sprachsteuerung"] },
      { title: "Gewerbliche HLK", desc: "Großlösungen für Unternehmen und gewerbliche Immobilien", features: ["Dachgeräte", "VRF-Systeme", "Kältemaschinen", "Gebäudeautomation"] },
      { title: "24/7 Notdienst", desc: "Rund-um-die-Uhr-Support für dringende HLK-Probleme", features: ["1-Stunden-Reaktion", "Reparatur am gleichen Tag", "Keine Überstundenzuschläge", "Immer verfügbar"] },
    ],
    weServeHeading: "Wir bedienen jeden",
    weServeSubtitle: "Von Privathäusern bis Unternehmen",
    customerTypes: [
      { title: "Privatkunden", desc: "Komfortlösungen für Ihr Zuhause", items: ["Einfamilienhäuser", "Wohnungen", "Eigentumswohnungen", "Neubau"] },
      { title: "Gewerbekunden", desc: "Professionelle HLK für Unternehmen", items: ["Bürogebäude", "Einzelhandelsflächen", "Restaurants", "Industrieanlagen"] },
    ],
    showAdvantage: true,
    advantageHeading: "Der Jubea-Vorteil",
    advantageSubtitle: "Was uns von der Konkurrenz unterscheidet",
    advantages: [
      { title: "Lizenziert & Zertifiziert", desc: "Alle Techniker sind vollständig lizenziert und kontinuierlich geschult" },
      { title: "100% Garantie", desc: "Vollständige Zufriedenheit bei jedem Projekt garantiert" },
      { title: "24/7 Notdienst", desc: "Rund-um-die-Uhr-Support für dringende HLK-Bedürfnisse" },
      { title: "25+ Jahre Erfahrung", desc: "Vertrauenswürdige Expertise für tausende Kunden" },
      { title: "Energieeffizient", desc: "Sparen Sie bis zu 40% auf Energierechnungen" },
      { title: "Expertenteam", desc: "Freundliche, professionelle und hochqualifizierte Techniker" },
    ],
    showEmergencyBanner: true,
    emergencyHeading: "HLK-Notfall?",
    emergencySubtitle: "Wir sind 24/7 für dringende Reparaturen und Serviceanrufe erreichbar",
  },
  about: {
    heroTitle1: "Über",
    heroTitle2: "Jubea Energy Systems",
    heroSubtitle:
      "Ihr vertrauenswürdiger Partner für Heizungs- und Klimaanlagenlösungen seit 2000",
    storyP1:
      "Seit 2000 ist Jubea Energy Systems für Privat- und Geschäftskunden mit erstklassigen HLK-Dienstleistungen tätig. Was als kleines Familienunternehmen begann, ist heute einer der vertrauenswürdigsten Namen der Branche.",
    storyP2:
      "Unser Gründer, James Jubea, gründete das Unternehmen mit einer einfachen Mission: der Gemeinschaft ehrliche, zuverlässige und professionelle Heizungs- und Kühldienste zu erbringen. Diese Mission leitet uns noch heute.",
    storyP3:
      "Wir haben unseren Ruf auf qualitativ hochwertige Handwerkskunst, faire Preise und außergewöhnlichen Kundenservice aufgebaut.",
    storyP4: "",
    team: [
      { name: "John Anderson", role: "Meister-Techniker", experience: "25 Jahre Erfahrung" },
      { name: "Maria Garcia", role: "HLK-Spezialistin", experience: "15 Jahre Erfahrung" },
      { name: "David Chen", role: "Installationsleiter", experience: "20 Jahre Erfahrung" },
    ],
    stats: [
      { value: "25+", label: "Jahre Erfahrung" },
      { value: "10K+", label: "Zufriedene Kunden" },
      { value: "15+", label: "Zertifizierte Techniker" },
      { value: "24/7", label: "Notdienst" },
    ],
    showAboutStats: true,
    showCerts: true,
    ctaHeading: "Erleben Sie den Jubea-Unterschied",
    ctaSubheading:
      "Schließen Sie sich tausenden zufriedener Kunden an, die uns für ihre HLK-Bedürfnisse vertrauen",
    ctaBtnText: "Kontaktieren Sie uns heute",
    ctaBtnLink: "/contact",
    ourStoryLabel: "Unsere Geschichte",
    ourValuesHeading: "Unsere Werte",
    ourValuesSubtitle: "Die Grundsätze, die alles leiten, was wir tun",
    values: [
      { title: "Qualitätsarbeit", desc: "Wir sind stolz darauf, bei jedem Auftrag außergewöhnlichen Service und Qualität zu liefern." },
      { title: "Kunde zuerst", desc: "Ihre Zufriedenheit hat oberste Priorität. Wir hören zu und liefern Lösungen, die Erwartungen übertreffen." },
      { title: "Zuverlässiger Service", desc: "Verlassen Sie sich darauf, dass wir da sind, wenn Sie uns brauchen, mit schnellem, professionellem Service." },
      { title: "Ehrlich & Transparent", desc: "Wir glauben an ehrliche Preise und klare Kommunikation. Keine versteckten Gebühren, keine Überraschungen." },
    ],
    certsHeading: "Zertifizierungen & Qualifikationen",
    certsSubtitle: "Vollständig lizenziert, versichert und zertifiziert",
    certs: [
      { title: "Lizenziert", desc: "Staatlich lizenzierte und gebundene Auftragnehmer" },
      { title: "Zertifiziert", desc: "EPA und NATE zertifizierte Techniker" },
      { title: "Versichert", desc: "Vollständig versichert für Ihren Schutz" },
    ],
    meetTeamHeading: "Unser Team",
    meetTeamSubtitle: "Erfahrene Fachleute für Ihren Komfort",
  },
  contact: {
    heroTitle1: "Kontakt",
    heroTitle2: "aufnehmen",
    heroSubtitle: "Kontaktieren Sie unser Team für alle Ihre HLK-Bedürfnisse",
    phone: "+389 70 777 888",
    email: "info@jubea-energy.com",
    address: "Gostivar, North Macedonia",
    hoursWeekday: "Mo – Fr: 8:00 – 18:00 Uhr",
    hoursSaturday: "Sa: 9:00 – 16:00 Uhr",
    mapEmbedUrl: "https://maps.google.com/maps?q=Gostivar,North+Macedonia&t=&z=13&ie=UTF8&iwloc=&output=embed",
    serviceAreas: ["Gostivar", "Skopje", "Tetovo", "Ohrid", "Bitola", "Kumanovo", "Strumica", "Veles", "Kičevo", "Štip"],
    contactInfoHeading: "Kontaktinformationen",
    contactInfoSubtitle: "Füllen Sie das Formular aus, unser Team meldet sich innerhalb von 24 Stunden.",
    responseTime: "Mo–Fr, 8–18 Uhr",
    responseNote: "Wir antworten innerhalb von 24 Stunden",
    urgentHeading: "Dringende Hilfe nötig?",
    callNowBtn: "Jetzt anrufen",
    sendMessageHeading: "Schreiben Sie uns",
    sendMessageSubtitle: "Wir würden gerne von Ihrem Projekt hören.",
    nameLabelText: "Vollständiger Name *",
    namePlaceholder: "Max Mustermann",
    emailLabelText: "E-Mail-Adresse *",
    emailPlaceholder: "max@beispiel.de",
    phoneLabelText: "Telefonnummer",
    phonePlaceholder: "+49 000 000000",
    serviceLabelText: "Gewünschte Dienstleistung *",
    servicePlaceholder: "Dienstleistung auswählen",
    serviceOptions: ["Klimaanlage Installation", "Klimaanlage Reparatur", "Heizungsinstallation", "Heizungsreparatur", "Wartung", "Notdienst", "Sonstiges"],
    detailsLabelText: "Projektdetails *",
    detailsPlaceholder: "Erzählen Sie uns von Ihrem Projekt...",
    sendBtn: "Nachricht senden",
    findUsHeading: "Uns finden",
    noMapText: "Keine Karte konfiguriert — fügen Sie eine Google Maps URL im Admin-Panel hinzu.",
    serviceAreaHeading: "Servicegebiet",
    serviceAreaText: "Wir bedienen stolz die gesamte Region und umliegenden Gemeinden. Wenn Sie unsicher sind, ob wir in Ihr Gebiet fahren, rufen Sie uns an!",
    errorMsg: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    successMsg: "Vielen Dank für Ihre Anfrage! Wir melden uns bald bei Ihnen.",
    phoneLabel: "Telefon",
    emailLabel: "E-Mail",
    officeLabel: "Büro",
    hoursLabel: "Öffnungszeiten",
  },
  gallery: {
    heroTitle1: "Unsere Arbeit",
    heroTitle2: "Galerie",
    heroSubtitle: "Erkunden Sie unser Portfolio abgeschlossener Projekte und Installationen",
    ctaHeading: "Bereit, Ihr Projekt zu starten?",
    ctaSubheading:
      "Lassen Sie uns die gleiche Qualität und Professionalität in Ihr Zuhause oder Unternehmen bringen",
    ctaPhone: "+389 70 777 888",
    filterLabel: "Filter:",
    noImagesText: "Keine Bilder in dieser Kategorie gefunden",
    callTodayBtn: "Heute anrufen",
  },
  products: {
    heroTitle1: "Premium HLK-",
    heroTitle2: "Produkte",
    heroSubtitle:
      "Hochwertige Heizungs- und Kühlsysteme von branchenführenden Herstellern",
    productLineupHeading: "Unser Produktsortiment",
    productLineupSubtitle: "Wählen Sie aus unserer Auswahl an Premium-HLK-Systemen",
    getQuoteBtn: "Angebot einholen",
    installHeading: "Professionelle Installation inklusive",
    installDesc: "Jedes Produkt wird von unseren zertifizierten Technikern fachgerecht installiert und für maximale Effizienz optimiert.",
    installFeatures: [
      "Kostenlose Beratung und Kostenvoranschlag",
      "Professionelle Installation durch zertifizierte Techniker",
      "Systemtests und -optimierung",
      "Erweiterte Garantieoptionen verfügbar",
    ],
    scheduleConsultBtn: "Beratung vereinbaren",
    financingHeading: "Flexible Finanzierung verfügbar",
    financingDesc: "Machen Sie Ihre HLK-Investition mit unseren flexiblen Finanzierungsoptionen erschwinglich",
    financingBtn: "Mehr erfahren",
    brandsTitle: "Top-Marken",
    brandsDesc: "Wir arbeiten mit den führenden Herstellern der Branche zusammen",
    warrantyTitle: "Garantieschutz",
    warrantyDesc: "Erweiterte Garantien auf alle Produkte und Installationen",
    energyTitle: "Energieeffizient",
    energyDesc: "Sparen Sie bis zu 40% auf Energiekosten",
    filterAllLabel: "Alle",
    showBenefits: true,
    categories: [],
  },
};

// ── Albanian default ───────────────────────────────────────────────────────────

const defaultContentSq: SiteContent = {
  global: {
    companyName: "Jubea Energy Systems",
    phone: "+389 70 777 888",
    email: "info@jubea-energy.com",
    address: "Gostivar, North Macedonia",
  },
  header: {
    phone: "+389 70 777 888",
    navLinks: [
      { label: "Kryefaqja", path: "/" },
      { label: "Shërbime", path: "/services" },
      { label: "Projekte", path: "/projects" },
      { label: "Rreth nesh", path: "/about" },
      { label: "Kontakt", path: "/contact" },
    ],
  },
  footer: {
    description: "Shërbime profesionale të ngrohjes dhe kondicionimit të ajrit për prona rezidenciale dhe komerciale që nga viti 2000.",
    quickLinks: [
      { label: "Kryefaqja", path: "/" },
      { label: "Shërbime", path: "/services" },
      { label: "Projekte", path: "/projects" },
      { label: "Rreth nesh", path: "/about" },
      { label: "Kontakt", path: "/contact" },
    ],
    services: [
      "Instalim & Riparim i Kondicionerëve",
      "Shërbim i Sistemit të Ngrohjes",
      "Planet e Mirëmbajtjes",
      "Shërbim Urgjent 24/7",
    ],
    phone: "+389 70 777 888",
    email: "info@jubea-energy.com",
    address: "Gostivar, North Macedonia",
    quickLinksHeading: "Lidhje të shpejta",
    ourServicesHeading: "Shërbimet tona",
    contactUsHeading: "Na kontaktoni",
    phoneLabel: "Telefon",
    emailLabel: "Email",
    addressLabel: "Adresë",
  },
  home: {
    heroTitle1: "Rehatia juaj,",
    heroTitle2: "Misioni ynë",
    heroSubtitle:
      "Përjetoni klimën e përsosur të brendshme me Jubea Energy Systems. Zgjidhje premium HVAC për shtëpi dhe biznese.",
    heroImage: "/background.jpg",
    heroBtnPrimary: "Shiko Produktet",
    heroBtnSecondary: "Merr Ofertë Falas",
    storyP1:
      "Themeluar në vitin 2000, Jubea Energy Systems ka shërbyer klientët rezidencial dhe komercial me shërbime të nivelit të lartë HVAC për më shumë se dy dekada.",
    storyP2:
      "Misioni ynë është i thjeshtë: të ofrojmë shërbime të ndershme, të besueshme dhe profesionale të ngrohjes dhe ftohjes për çdo shtëpi dhe biznes.",
    storyP3:
      "Në Beqiri GmbH, besojmë se cilësia fillon me komunikim. Ne bashkëpunojmë ngushtë me çdo klient — dëgjojmë, planifikojmë dhe ekzekutojmë me precizion — që rezultati final të tejkalojë gjithmonë pritshmëritë. Prona juaj meriton jo më pak.",
    stats: [
      { value: "25+", label: "Vite Përvojë" },
      { value: "10K+", label: "Klientë të Shërbyer" },
      { value: "4.9★", label: "Vlerësim Mesatar" },
      { value: "24/7", label: "Shërbim Urgjent" },
    ],
    ctaHeading: "Gati për Rehati të Përsosur?",
    ctaSubheading: "Merrni konsultimin tuaj falas sot",
    ctaPhone: "+389 70 777 888",
    homeServices: [
      { icon: "Flame",   title: "Sisteme Ngrohjeje",   desc: "Nxehtësi e besueshme kur ju nevojitet më shumë, e instaluar nga ekspertë." },
      { icon: "Wrench",  title: "Mirëmbajtje",         desc: "Planet e kujdesit të planifikuara për ta mbajtur sistemin tuaj në efikasitet maksimal." },
      { icon: "Zap",     title: "Shërbim Urgjent",     desc: "Reagim i shpejtë gjatë gjithë orës për situata urgjente HVAC." },
      { icon: "Wind",    title: "Kondicionim Ajri",    desc: "Zgjidhje premium ftohje për shtëpi dhe biznese të të gjitha madhësive." },
    ],
    homeGallery: [
      { image: "/img1.png", title: "Projekti 1" },
      { image: "/img2.png", title: "Projekti 2" },
      { image: "/img3.png", title: "Projekti 3" },
      { image: "/img4.png", title: "Projekti 4" },
      { image: "/img5.png", title: "Projekti 5" },
    ],
    featuredProductsTitle: "Produkte të Zgjedhura",
    featuredProducts: [
      { name: "Sistem Ngrohjeje",        image: "/img1.png" },
      { name: "Sistem Kontrolli Ngrohjeje", image: "/img2.png" },
      { name: "Sistem Ftohëse",          image: "/img3.png" },
    ],
    aboutLabel: "Rreth nesh",
    ourStoryHeading: "Historia jonë",
    ourStorySubtitle: "Më shumë se dy dekada shërbim HVAC i besuar për shtëpi dhe biznese",
    showStats: true,
    showLearnMoreBtn: true,
    viewAllProductsBtn: "Shiko të gjitha projektet",
    learnMoreBtn: "Mëso më shumë",
    whatWeOfferLabel: "Çfarë ofrojmë",
    ourServicesHeading: "Shërbimet tona",
    learnMoreCardBtn: "Mëso më shumë",
    viewAllServicesBtn: "Shiko të gjitha shërbimet",
    whyChooseLabel: "Pse të zgjidhni Jubea",
    whyChooseSubtitle: "Ekselencë në çdo detaj",
    whyChooseFeatures: [
      { title: "Besim", desc: "Standarde zvicerane për Maqedoninë e Veriut – ne modernizojmë furnizimin tuaj me energji eficiëntisht dhe qëndrueshëm." },
      { title: "100% Garanci", desc: "Kënaqësi e plotë e garantuar për të gjitha punët dhe shërbimet tona" },
      { title: "Kursim Energjie", desc: "Kursime të konsiderueshme përmes konsultimit tonë – me pompa termike cilësore." },
      { title: "Dorëzim në Kohë", desc: "Ne respektojmë orarin tuaj. Projektet përfundohen në kohë, çdo herë – me komunikim të qartë nga fillimi deri në fund." },
    ],
    ourProcessLabel: "Procesi ynë",
    howItWorksHeading: "Si funksionon",
    howItWorksSubtitle: "Nga konsultimi i parë deri te shtresa e fundit — një proces i thjeshtë dhe profesional që sjell rezultate të dukshme.",
    howItWorksSteps: [
      { title: "Konsultim falas", desc: "Vizitojmë pronën tuaj, vlerësojmë sipërfaqet dhe diskutojmë vizionin tuaj. Merrni një ofertë transparente pa kosto të fshehura.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop" },
      { title: "Përgatitja e sipërfaqes", desc: "Ekipi ynë pastron, zmerxhel dhe primos të gjitha sipërfaqet tërësisht — themeli për një rezultat të pagabueshëm dhe afatgjatë.", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80&fit=crop" },
      { title: "Përfundim profesional", desc: "Piktorë dhe suvatues me përvojë aplikojnë shtresa cilësore me precizion, duke lënë pronën tuaj të paqortueshme brenda dhe jashtë.", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fit=crop" },
    ],
    ourWorkLabel: "Puna jonë",
    projectGalleryHeading: "Galeria e projekteve",
    viewAllBtn: "Shiko të gjitha",
    scheduleConsultBtn: "Planifiko konsultim",
  },
  services: {
    heroTitle1: "Shërbime Profesionale",
    heroTitle2: "HVAC",
    heroSubtitle: "Zgjidhje eksperte të ngrohjes dhe ftohjes për shtëpi dhe biznese",
    heroBtnText: "Merr Ofertë Falas",
    heroBtnLink: "/contact",
    emergencyPhone: "+389 70 777 888",
    ctaHeading: "Gati për të filluar?",
    ctaSubheading: "Na kontaktoni sot",
    ctaPhone: "+389 70 777 888",
    ctaBtnText: "Rezervo Shërbim Tani",
    ctaBtnLink: "/contact",
    detailedServices: [
      {
        id: "heating",
        title: "Shërbime të Sistemeve të Ngrohjes",
        subtitle: "Nxehtësi e besueshme kur ju nevojitet më shumë",
        description:
          "Instalim, riparim dhe mirëmbajtje eksperte e të gjitha sistemeve të ngrohjes.",
        services: [
          "Instalim Furre",
          "Shërbime të Pompës Termike",
          "Riparim & Mirëmbajtje Kaldaje",
          "Instalim Termostati",
          "Optimizim i Shpërndarjes së Nxehtësisë",
          "Riparime Urgjente të Ngrohjes",
        ],
        benefits: [
          "Kosto e reduktuar e ngrohjes",
          "Rehatia e shtëpisë e përmirësuar",
          "Funksionim më i qetë",
          "Siguri e shtuar",
        ],
      },
      {
        id: "maintenance",
        title: "Planet e Mirëmbajtjes",
        subtitle: "Mbroni investimin tuaj me kujdes parandalues",
        description:
          "Mirëmbajtja e rregullt e mban sistemin tuaj efikas, parandalon dështimet dhe zgjat jetën e pajisjeve.",
        services: [
          "Inspektime dy herë në vit",
          "Zëvendësim Filtri",
          "Rregullim Sistemi",
          "Testim Performancë",
          "Shërbim Urgjent Prioritar",
          "Riparime me Zbritje",
        ],
        benefits: [
          "Parandaloni dështime të kushtueshme",
          "Maksimizoni efikasitetin e energjisë",
          "Planifikim prioritar",
          "15% zbritje në riparime",
        ],
      },
      {
        id: "repair",
        title: "Shërbime Riparimi",
        subtitle: "Zgjidhje të shpejta, të besueshme për të gjitha problemet HVAC",
        description:
          "Teknicienët tanë të certifikuar diagnostikojnë dhe riparojnë të gjitha llojet e problemeve HVAC shpejt dhe efektivisht.",
        services: [
          "Diagnostikë e Plotë e Sistemit",
          "Zëvendësim Komponentësh",
          "Rimbushje Ftohësi",
          "Riparime Elektrike",
          "Optimizim i Rrjedhës së Ajrit",
          "Rivendosje Performancë",
        ],
        benefits: [
          "Shërbim i disponueshëm ditën e njëjtë",
          "Çmime transparente",
          "Garanci riparimi 90 ditë",
          "Teknicienë me përvojë",
        ],
      },
      {
        id: "cooling",
        title: "Shërbime të Kondicionimit të Ajrit",
        subtitle: "Qëndroni të freskët dhe rehat gjatë gjithë vitit",
        description:
          "Nga instalimet e reja deri te riparimet dhe mirëmbajtja e rregullt, ofrojmë shërbime gjithëpërfshirëse AC.",
        services: [
          "Instalim i Ri AC",
          "Zëvendësim Sistemi",
          "Riparim & Zgjidhje Problemesh AC",
          "Mirëmbajtje Parandaluese",
          "Pastrimi & Vulosja e Kanaleve",
          "Përmirësime Efikasiteti Energjetik",
        ],
        benefits: [
          "Fatura të energjisë deri 40% më të ulëta",
          "Cilësi e përmirësuar e ajrit të brendshëm",
          "Kontroll i qëndrueshëm i temperaturës",
          "Jetëgjatësi e zgjatur e pajisjeve",
        ],
      },
    ],
    servicesIncludedLabel: "Shërbimet e përfshira:",
    requestServiceBtn: "Kërko këtë shërbim",
    showAdditionalServices: true,
    additionalServicesHeading: "Shërbime shtesë",
    additionalServicesSubtitle: "Zgjidhje të specializuara për çdo nevojë",
    additionalServices: [
      { title: "Cilësia e ajrit të brendshëm", desc: "Përmirësoni ajrin e shtëpisë suaj me sisteme pastrimi dhe filtrimi", features: ["Pastrues ajri", "Lagësimajtës", "Drita UV", "Ventilim"] },
      { title: "Integrim Smart Home", desc: "Lidhni HVAC-un tuaj me sistemet e shtëpisë inteligjente për kontroll të plotë", features: ["Termostate WiFi", "Monitorim i largët", "Raporte energjie", "Kontroll me zë"] },
      { title: "HVAC Komercial", desc: "Zgjidhje në shkallë të gjerë për biznese dhe prona komerciale", features: ["Njësi çati", "Sisteme VRF", "Ftohës", "Automatizim ndërtese"] },
      { title: "Shërbim Urgjent 24/7", desc: "Mbështetje gjatë gjithë orës për probleme urgjente HVAC", features: ["Reagim 1-orësh", "Riparime të ditës", "Pa tarifa jashtë orarit", "Gjithmonë i disponueshëm"] },
    ],
    weServeHeading: "Ne i shërbejmë të gjithëve",
    weServeSubtitle: "Nga shtëpitë tek bizneset, ju mbulojmë",
    customerTypes: [
      { title: "Rezidencial", desc: "Zgjidhje rehatie për shtëpinë tuaj", items: ["Shtëpi njëfamiljare", "Apartamente", "Kondominium", "Ndërtim i ri"] },
      { title: "Komercial", desc: "HVAC profesionale për biznese", items: ["Ndërtesa zyrash", "Hapësira me pakicë", "Restorante", "Objekte industriale"] },
    ],
    showAdvantage: true,
    advantageHeading: "Avantazhi Jubea",
    advantageSubtitle: "Çfarë na dallon nga konkurrenca",
    advantages: [
      { title: "I licencuar & i certifikuar", desc: "Të gjithë teknicienët janë plotësisht të licencuar dhe vazhdimisht të trajnuar" },
      { title: "100% Garanci", desc: "Kënaqësi e plotë e garantuar në çdo projekt" },
      { title: "Urgjencë 24/7", desc: "Mbështetje gjatë gjithë orës për nevojat urgjente HVAC" },
      { title: "25+ vite eksperiencë", desc: "Ekspertizë e besueshme duke shërbyer mijëra klientë" },
      { title: "Energji-efikas", desc: "Kurseni deri në 40% në faturat e energjisë" },
      { title: "Ekip ekspertësh", desc: "Teknicienë miqësorë, profesionalë dhe shumë të aftë" },
    ],
    showEmergencyBanner: true,
    emergencyHeading: "Urgjencë HVAC?",
    emergencySubtitle: "Jemi të disponueshëm 24/7 për riparime urgjente dhe thirrje shërbimi",
  },
  about: {
    heroTitle1: "Rreth",
    heroTitle2: "Jubea Energy Systems",
    heroSubtitle:
      "Partneri juaj i besueshëm për zgjidhje të ngrohjes dhe kondicionimit të ajrit që nga viti 2000",
    storyP1:
      "Themeluar në vitin 2000, Jubea Energy Systems ka shërbyer klientët rezidencial dhe komercial me shërbime të nivelit të lartë HVAC për më shumë se dy dekada.",
    storyP2:
      "Themeluesi ynë, James Jubea, e nisi kompaninë me një mision të thjeshtë: të ofrojë shërbime të ndershme, të besueshme dhe profesionale të ngrohjes dhe ftohjes për komunitetin.",
    storyP3:
      "Ne kemi ndërtuar reputacionin tonë mbi cilësinë e punimeve, çmimet e drejta dhe shërbimin e jashtëzakonshëm ndaj klientëve.",
    storyP4: "",
    team: [
      { name: "John Anderson", role: "Teknicien Master", experience: "25 vjet përvojë" },
      { name: "Maria Garcia", role: "Specialiste HVAC", experience: "15 vjet përvojë" },
      { name: "David Chen", role: "Menaxher Instalimesh", experience: "20 vjet përvojë" },
    ],
    stats: [
      { value: "25+", label: "Vite Përvojë" },
      { value: "10K+", label: "Klientë të Kënaqur" },
      { value: "15+", label: "Teknicienë të Certifikuar" },
      { value: "24/7", label: "Shërbim Urgjent" },
    ],
    showAboutStats: true,
    showCerts: true,
    ctaHeading: "Përjetoni Ndryshimin Jubea",
    ctaSubheading:
      "Bashkohuni me mijëra klientë të kënaqur që na besojnë për nevojat e tyre HVAC",
    ctaBtnText: "Na Kontaktoni Sot",
    ctaBtnLink: "/contact",
    ourStoryLabel: "Historia jonë",
    ourValuesHeading: "Vlerat tona",
    ourValuesSubtitle: "Parimet që udhëheqin gjithçka që bëjmë",
    values: [
      { title: "Cilësi pune", desc: "Jemi krenarë që ofrojmë shërbim të jashtëzakonshëm dhe cilësi pune në çdo punë." },
      { title: "Klienti i parë", desc: "Kënaqësia juaj është prioriteti ynë kryesor. Dëgjojmë nevojat tuaja dhe ofrojmë zgjidhje që tejkalojnë pritshmëritë." },
      { title: "Shërbim i besueshëm", desc: "Mbështetuni tek ne të jemi aty kur na keni nevojë, me shërbim të shpejtë dhe profesional çdo herë." },
      { title: "I ndershëm & transparent", desc: "Besojmë në çmime të ndershme dhe komunikim të qartë. Pa tarifa të fshehura, pa surpriza." },
    ],
    certsHeading: "Certifikime & Kredenciale",
    certsSubtitle: "Plotësisht i licencuar, i siguruar dhe i certifikuar",
    certs: [
      { title: "I licencuar", desc: "Kontraktorë të licencuar dhe të lidhur nga shteti" },
      { title: "I certifikuar", desc: "Teknicienë të certifikuar EPA dhe NATE" },
      { title: "I siguruar", desc: "Plotësisht i siguruar për mbrojtjen tuaj" },
    ],
    meetTeamHeading: "Ekipi ynë",
    meetTeamSubtitle: "Profesionistë me përvojë të dedikuar për rehatinë tuaj",
  },
  contact: {
    heroTitle1: "Na",
    heroTitle2: "Kontaktoni",
    heroSubtitle: "Kontaktoni ekipin tonë për të gjitha nevojat tuaja HVAC",
    phone: "+389 70 777 888",
    email: "info@jubea-energy.com",
    address: "Gostivar, North Macedonia",
    hoursWeekday: "Hën – Pre: 8:00 – 18:00",
    hoursSaturday: "Sht: 9:00 – 16:00",
    mapEmbedUrl: "https://maps.google.com/maps?q=Gostivar,North+Macedonia&t=&z=13&ie=UTF8&iwloc=&output=embed",
    serviceAreas: ["Gostivar", "Skopje", "Tetovo", "Ohrid", "Bitola", "Kumanovo", "Strumica", "Veles", "Kičevo", "Štip"],
    contactInfoHeading: "Informacioni i kontaktit",
    contactInfoSubtitle: "Plotësoni formularin dhe ekipi ynë do t'ju kthejë përgjigje brenda 24 orëve.",
    responseTime: "Hën–Pre, 8:00–18:00",
    responseNote: "Përgjigjemi brenda 24 orëve",
    urgentHeading: "Nevojë urgjente?",
    callNowBtn: "Na telefononi tani",
    sendMessageHeading: "Na dërgoni një mesazh",
    sendMessageSubtitle: "Do të donim të dëgjonim për projektin tuaj.",
    nameLabelText: "Emri i plotë *",
    namePlaceholder: "Emri Mbiemri",
    emailLabelText: "Adresa e emailit *",
    emailPlaceholder: "email@shembull.com",
    phoneLabelText: "Numri i telefonit",
    phonePlaceholder: "+389 00 000 000",
    serviceLabelText: "Shërbimi i interesuar *",
    servicePlaceholder: "Zgjidhni një shërbim",
    serviceOptions: ["Instalim kondicioneri", "Riparim kondicioneri", "Instalim ngrohjeje", "Riparim ngrohjeje", "Mirëmbajtje", "Shërbim urgjent", "Tjetër"],
    detailsLabelText: "Detajet e projektit *",
    detailsPlaceholder: "Na tregoni për projektin tuaj...",
    sendBtn: "Dërgo mesazh",
    findUsHeading: "Na gjeni",
    noMapText: "Nuk ka hartë të konfiguruar — shtoni një URL të Google Maps në panelin e administratorit.",
    serviceAreaHeading: "Zona e shërbimit",
    serviceAreaText: "Ne me krenari shërbejmë në të gjithë rajonin dhe komunitetin rrethues. Nëse nuk jeni të sigurt nëse shërbejmi zonën tuaj, na telefononi!",
    errorMsg: "Diçka shkoi keq. Ju lutemi provoni përsëri.",
    successMsg: "Faleminderit për pyetjen tuaj! Do t'ju kthejmë përgjigje së shpejti.",
    phoneLabel: "Telefon",
    emailLabel: "Email",
    officeLabel: "Zyrë",
    hoursLabel: "Orari",
  },
  gallery: {
    heroTitle1: "Puna Jonë",
    heroTitle2: "Galeria",
    heroSubtitle: "Eksploroni portofolin tonë të projekteve dhe instalimeve të përfunduara",
    ctaHeading: "Gati për të filluar projektin tuaj?",
    ctaSubheading:
      "Lejoni neve të sjellim të njëjtën cilësi dhe profesionalizëm në shtëpinë ose biznesin tuaj",
    ctaPhone: "+389 70 777 888",
    filterLabel: "Filtro:",
    noImagesText: "Nuk u gjetën imazhe në këtë kategori",
    callTodayBtn: "Na telefononi sot",
  },
  products: {
    heroTitle1: "Produkte Premium",
    heroTitle2: "HVAC",
    heroSubtitle:
      "Sisteme të ngrohjes dhe ftohjes cilësore nga prodhuesit kryesorë të industrisë",
    productLineupHeading: "Gamën tonë të produkteve",
    productLineupSubtitle: "Zgjidhni nga gama jonë e sistemeve premium HVAC",
    getQuoteBtn: "Merr ofertë",
    installHeading: "Instalim profesional i përfshirë",
    installDesc: "Çdo produkt instalohet nga teknicienët tanë të certifikuar dhe optimizohet për efikasitet maksimal.",
    installFeatures: [
      "Konsultim falas dhe vlerësim",
      "Instalim profesional nga teknicienë të certifikuar",
      "Testim dhe optimizim i sistemit",
      "Opsione garancie të zgjatur",
    ],
    scheduleConsultBtn: "Planifiko konsultim",
    financingHeading: "Financim fleksibël i disponueshëm",
    financingDesc: "Bëni investimin tuaj HVAC të përballueshëm me opsionet tona të financimit fleksibël",
    financingBtn: "Mëso më shumë",
    brandsTitle: "Marka kryesore",
    brandsDesc: "Ne bashkëpunojmë me prodhuesit kryesorë të industrisë",
    warrantyTitle: "I mbrojtur me garanci",
    warrantyDesc: "Garanci të zgjeruara për të gjitha produktet dhe instalimet",
    energyTitle: "Energji-efikas",
    energyDesc: "Kurseni deri në 40% në kostot e energjisë",
    filterAllLabel: "Të gjitha",
    showBenefits: true,
    categories: [],
  },
};

// ── Macedonian default ─────────────────────────────────────────────────────────

const defaultContentMk: SiteContent = {
  global: {
    companyName: "Jubea Energy Systems",
    phone: "+389 70 777 888",
    email: "info@jubea-energy.com",
    address: "Гостивар, Северна Македонија",
  },
  header: {
    phone: "+389 70 777 888",
    navLinks: [
      { label: "Почетна", path: "/" },
      { label: "Услуги", path: "/services" },
      { label: "Проекти", path: "/projects" },
      { label: "За нас", path: "/about" },
      { label: "Контакт", path: "/contact" },
    ],
  },
  footer: {
    description: "Професионални услуги за греење и климатизација за станбени и комерцијални имоти од 2000 година.",
    quickLinks: [
      { label: "Почетна", path: "/" },
      { label: "Услуги", path: "/services" },
      { label: "Проекти", path: "/projects" },
      { label: "За нас", path: "/about" },
      { label: "Контакт", path: "/contact" },
    ],
    services: [
      "Инсталација и поправка на климатизер",
      "Сервис на системи за греење",
      "Планови за одржување",
      "Итна служба 24/7",
    ],
    phone: "+389 70 777 888",
    email: "info@jubea-energy.com",
    address: "Гостивар, Северна Македонија",
    quickLinksHeading: "Брзи врски",
    ourServicesHeading: "Нашите услуги",
    contactUsHeading: "Контактирајте нè",
    phoneLabel: "Телефон",
    emailLabel: "Е-пошта",
    addressLabel: "Адреса",
  },
  home: {
    heroTitle1: "Вашиот комфор,",
    heroTitle2: "Нашата мисија",
    heroSubtitle:
      "Доживејте го совршената внатрешна клима со Jubea Energy Systems. Премиум ХВАК решенија за домови и бизниси.",
    heroImage: "/background.jpg",
    heroBtnPrimary: "Види Производи",
    heroBtnSecondary: "Добиј Бесплатна Проценка",
    storyP1:
      "Основана во 2000 година, Jubea Energy Systems им служи на станбени и комерцијални клиенти со врвни ХВАК услуги повеќе од две децении.",
    storyP2:
      "Нашата мисија е едноставна: да обезбедиме чесни, доверливи и професионални услуги за греење и ладење за секој дом и бизнис.",
    storyP3:
      "Во Beqiri GmbH, веруваме дека квалитетот започнува со комуникација. Тесно соработуваме со секој клиент — слушаме, планираме и извршуваме со прецизност — за да го надминеме секогаш очекувањата. Вашиот имот заслужува ништо помалку.",
    stats: [
      { value: "25+", label: "Години Искуство" },
      { value: "10K+", label: "Опслужени Клиенти" },
      { value: "4.9★", label: "Просечна Оцена" },
      { value: "24/7", label: "Итна Служба" },
    ],
    ctaHeading: "Подготвени за совршен комфор?",
    ctaSubheading: "Добијте ја вашата бесплатна консултација денес",
    ctaPhone: "+389 70 777 888",
    homeServices: [
      { icon: "Flame",   title: "Системи за греење",  desc: "Доверлива топлина кога најмногу ви треба, инсталирана од експерти." },
      { icon: "Wrench",  title: "Одржување",          desc: "Планирани планови за нега за да го одржите системот на максимална ефикасност." },
      { icon: "Zap",     title: "Итна служба",        desc: "Брз одговор во текот на целото деноноќие за итни ХВАК ситуации." },
      { icon: "Wind",    title: "Климатизација",      desc: "Премиум решенија за ладење за домови и бизниси од сите големини." },
    ],
    homeGallery: [
      { image: "/img1.png", title: "Проект 1" },
      { image: "/img2.png", title: "Проект 2" },
      { image: "/img3.png", title: "Проект 3" },
      { image: "/img4.png", title: "Проект 4" },
      { image: "/img5.png", title: "Проект 5" },
    ],
    featuredProductsTitle: "Истакнати Производи",
    featuredProducts: [
      { name: "Систем за Греење",          image: "/img1.png" },
      { name: "Систем за Контрола на Греење", image: "/img2.png" },
      { name: "Систем за Ладење",           image: "/img3.png" },
    ],
    aboutLabel: "За нас",
    ourStoryHeading: "Нашата приказна",
    ourStorySubtitle: "Повеќе од две децении доверлив ХВАК сервис за домови и бизниси",
    showStats: true,
    showLearnMoreBtn: true,
    viewAllProductsBtn: "Прегледај ги сите проекти",
    learnMoreBtn: "Дознај повеќе",
    whatWeOfferLabel: "Што нудиме",
    ourServicesHeading: "Нашите услуги",
    learnMoreCardBtn: "Дознај повеќе",
    viewAllServicesBtn: "Прегледај ги сите услуги",
    whyChooseLabel: "Зошто да изберете Jubea",
    whyChooseSubtitle: "Извонредност во секој детал",
    whyChooseFeatures: [
      { title: "Доверба", desc: "Швајцарски стандарди за Северна Македонија – ефикасно и одржливо ја модернизираме вашата енергетска снабденост." },
      { title: "100% Гаранција", desc: "Целосно задоволство гарантирано за сите наши работи и услуги" },
      { title: "Заштеда на енергија", desc: "Значителни заштеди преку нашето советување – со висококвалитетни топлотни пумпи." },
      { title: "Навремена испорака", desc: "Го почитуваме вашиот распоред. Проектите се завршуваат навреме, секогаш – со јасна комуникација од почеток до крај." },
    ],
    ourProcessLabel: "Нашиот процес",
    howItWorksHeading: "Kako тоа функционира",
    howItWorksSubtitle: "Од prvата консултација до последниот слој — едноставен, професионален процес кој дава видливи резултати.",
    howItWorksSteps: [
      { title: "Бесплатна консултација", desc: "Ја посетуваме вашата имотина, ги оцениме површините и го разговараме вашиот концепт. Добивате транспарентна понуда без скриени трошоци.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop" },
      { title: "Подготовка на површината", desc: "Нашиот тим темелно чисти, брусе и прајмира сите површини — основата за беспрекорен и трајн завршеток.", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80&fit=crop" },
      { title: "Професионален завршеток", desc: "Искусни молери и штукатери нанесуваат премиум облоги со прецизност, оставајќи ја вашата имотина беспрекорна — внатре и надвор.", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fit=crop" },
    ],
    ourWorkLabel: "Нашата работа",
    projectGalleryHeading: "Галерија на проекти",
    viewAllBtn: "Прегледај ги сите",
    scheduleConsultBtn: "Закажи консултација",
  },
  services: {
    heroTitle1: "Професионални ХВАК",
    heroTitle2: "Услуги",
    heroSubtitle: "Експертски решенија за греење и ладење за домови и бизниси",
    heroBtnText: "Добиј Бесплатна Проценка",
    heroBtnLink: "/contact",
    emergencyPhone: "+389 70 777 888",
    ctaHeading: "Подготвени да започнете?",
    ctaSubheading: "Контактирајте нè денес",
    ctaPhone: "+389 70 777 888",
    ctaBtnText: "Закажи Услуга Сега",
    ctaBtnLink: "/contact",
    detailedServices: [
      {
        id: "heating",
        title: "Услуги на Системи за Греење",
        subtitle: "Доверлива топлина кога најмногу ви треба",
        description:
          "Експертска инсталација, поправка и одржување на сите системи за греење вклучувајќи печки, топлински пумпи и котли.",
        services: [
          "Инсталација на Печка",
          "Услуги на Топлинска Пумпа",
          "Поправка и Одржување на Котел",
          "Инсталација на Термостат",
          "Оптимизација на Дистрибуција на Топлина",
          "Итни Поправки на Греење",
        ],
        benefits: [
          "Намалени трошоци за греење",
          "Подобрен комфор на домот",
          "Потивко работење",
          "Зголемена безбедност",
        ],
      },
      {
        id: "maintenance",
        title: "Планови за Одржување",
        subtitle: "Заштитете ја вашата инвестиција со превентивна грижа",
        description:
          "Редовното одржување го одржува системот ефикасен, спречува дефекти и ја продолжува животниот век на опремата.",
        services: [
          "Двогодишни Инспекции",
          "Замена на Филтер",
          "Подесување на Системот",
          "Тестирање на Перформанси",
          "Приоритетна Итна Служба",
          "Попустени Поправки",
        ],
        benefits: [
          "Спречете скапи дефекти",
          "Максимизирајте ја енергетската ефикасност",
          "Приоритетно закажување",
          "15% попуст на поправки",
        ],
      },
      {
        id: "repair",
        title: "Услуги за Поправка",
        subtitle: "Брзи, доверливи поправки за сите ХВАК проблеми",
        description:
          "Нашите сертифицирани техничари дијагностицираат и поправаат сите видови ХВАК проблеми брзо и ефективно.",
        services: [
          "Целосна Дијагностика на Системот",
          "Замена на Компоненти",
          "Дополнување на Расладно Средство",
          "Електрични Поправки",
          "Оптимизација на Проток на Воздух",
          "Обновување на Перформанси",
        ],
        benefits: [
          "Услуга достапна истиот ден",
          "Транспарентни цени",
          "90-дневна гаранција за поправка",
          "Искусни техничари",
        ],
      },
      {
        id: "cooling",
        title: "Услуги за Климатизација",
        subtitle: "Останете свежи и удобни цела година",
        description:
          "Од нови инсталации до поправки и редовно одржување, нудиме сеопфатни услуги за климатизација.",
        services: [
          "Нова Инсталација на Климатизер",
          "Замена на Систем",
          "Поправка и Решавање Проблеми на Климатизер",
          "Превентивно Одржување",
          "Чистење и Заптивање на Канали",
          "Надградби за Енергетска Ефикасност",
        ],
        benefits: [
          "Помали сметки за енергија до 40%",
          "Подобрен квалитет на внатрешниот воздух",
          "Доследна контрола на температурата",
          "Продолжен животен век на опремата",
        ],
      },
    ],
    servicesIncludedLabel: "Вклучени услуги:",
    requestServiceBtn: "Побарај ја оваа услуга",
    showAdditionalServices: true,
    additionalServicesHeading: "Дополнителни услуги",
    additionalServicesSubtitle: "Специјализирани решенија за секоја потреба",
    additionalServices: [
      { title: "Квалитет на внатрешен воздух", desc: "Подобрете го воздухот во вашиот дом со системи за прочистување и филтрирање", features: ["Прочистувачи на воздух", "Влагомери", "УВ светла", "Вентилација"] },
      { title: "Интеграција со паметна куќа", desc: "Поврзете го вашиот ХВАК со системи за паметна куќа за целосна контрола", features: ["WiFi термостати", "Далечинско следење", "Извештаи за енергија", "Гласовна контрола"] },
      { title: "Комерцијален ХВАК", desc: "Решенија на голема скала за бизниси и комерцијални имоти", features: ["Покривни единици", "VRF системи", "Разладни уреди", "Автоматизација на зграда"] },
      { title: "Итна служба 24/7", desc: "Поддршка во текот на целото деноноќие за итни ХВАК проблеми", features: ["Одговор за 1 час", "Поправки истиот ден", "Без надомест за прекувремена работа", "Секогаш достапни"] },
    ],
    weServeHeading: "Им служиме на сите",
    weServeSubtitle: "Од домови до бизниси, ги покриваме сите",
    customerTypes: [
      { title: "Станбени", desc: "Решенија за удобност за вашиот дом", items: ["Еднофамилијарни куќи", "Станови", "Кондоминиуми", "Нова изградба"] },
      { title: "Комерцијални", desc: "Професионален ХВАК за бизниси", items: ["Деловни згради", "Малопродажни простори", "Ресторани", "Индустриски објекти"] },
    ],
    showAdvantage: true,
    advantageHeading: "Предноста на Jubea",
    advantageSubtitle: "Она што нè разликува од конкуренцијата",
    advantages: [
      { title: "Лиценциран & сертифициран", desc: "Сите техничари се целосно лиценцирани и континуирано обучени" },
      { title: "100% Гаранција", desc: "Целосно задоволство гарантирано на секој проект" },
      { title: "24/7 итна служба", desc: "Поддршка во текот на целото деноноќие за итни ХВАК потреби" },
      { title: "25+ години искуство", desc: "Доверливо искуство служи на илјадници клиенти" },
      { title: "Енергетски ефикасен", desc: "Заштедете до 40% на сметки за енергија" },
      { title: "Стручен тим", desc: "Пријателски, професионални и високо стручни техничари" },
    ],
    showEmergencyBanner: true,
    emergencyHeading: "ХВАК итен случај?",
    emergencySubtitle: "Достапни сме 24/7 за итни поправки и сервисни повици",
  },
  about: {
    heroTitle1: "За",
    heroTitle2: "Jubea Energy Systems",
    heroSubtitle:
      "Вашиот доверлив партнер за решенија за греење и климатизација од 2000 година",
    storyP1:
      "Основана во 2000 година, Jubea Energy Systems им служи на станбени и комерцијални клиенти со врвни ХВАК услуги повеќе од две децении.",
    storyP2:
      "Нашиот основач, James Jubea, ја основаше компанијата со едноставна мисија: да обезбеди чесни, доверливи и професионални услуги за греење и ладење на заедницата.",
    storyP3:
      "Го изградивме нашиот углед на квалитетна изработка, фер цени и извонреден услуга за клиентите.",
    storyP4: "",
    team: [
      { name: "John Anderson", role: "Главен Техничар", experience: "25 години искуство" },
      { name: "Maria Garcia", role: "ХВАК Специјалист", experience: "15 години искуство" },
      { name: "David Chen", role: "Менаџер за Инсталации", experience: "20 години искуство" },
    ],
    stats: [
      { value: "25+", label: "Години Искуство" },
      { value: "10K+", label: "Задоволни Клиенти" },
      { value: "15+", label: "Сертифицирани Техничари" },
      { value: "24/7", label: "Итна Служба" },
    ],
    showAboutStats: true,
    showCerts: true,
    ctaHeading: "Доживејте ја Jubea Разликата",
    ctaSubheading:
      "Придружете се на илјадници задоволни клиенти кои ни веруваат за нивните ХВАК потреби",
    ctaBtnText: "Контактирајте нè Денес",
    ctaBtnLink: "/contact",
    ourStoryLabel: "Нашата приказна",
    ourValuesHeading: "Нашите вредности",
    ourValuesSubtitle: "Принципите кои го водат сè што правиме",
    values: [
      { title: "Квалитет на работа", desc: "Горди сме на испорачување на исклучителен сервис и квалитет на работа при секоја работа." },
      { title: "Клиентот е прв", desc: "Вашето задоволство е наш врвен приоритет. Ги слушаме вашите потреби и испорачуваме решенија кои ги надминуваат очекувањата." },
      { title: "Доверлив сервис", desc: "Сметајте на нас да бидеме таму кога ни треба, со брз и професионален сервис секој пат." },
      { title: "Чесен & транспарентен", desc: "Веруваме во чесни цени и јасна комуникација. Без скриени такси, без изненадувања." },
    ],
    certsHeading: "Сертификати & Акредитиви",
    certsSubtitle: "Целосно лиценцирани, осигурени и сертифицирани",
    certs: [
      { title: "Лиценциран", desc: "Државно лиценцирани и обврзани изведувачи" },
      { title: "Сертифициран", desc: "EPA и NATE сертифицирани техничари" },
      { title: "Осигурен", desc: "Целосно осигурен за ваша заштита" },
    ],
    meetTeamHeading: "Запознајте го нашиот тим",
    meetTeamSubtitle: "Искусни професионалци посветени на вашиот комфор",
  },
  contact: {
    heroTitle1: "Контактирајте",
    heroTitle2: "нè",
    heroSubtitle: "Контактирајте го нашиот тим за сите ваши ХВАК потреби",
    phone: "+389 70 777 888",
    email: "info@jubea-energy.com",
    address: "Гостивар, Северна Македонија",
    hoursWeekday: "Пон – Пет: 8:00 – 18:00",
    hoursSaturday: "Саб: 9:00 – 16:00",
    mapEmbedUrl: "https://maps.google.com/maps?q=Gostivar,North+Macedonia&t=&z=13&ie=UTF8&iwloc=&output=embed",
    serviceAreas: ["Гостивар", "Скопје", "Тетово", "Охрид", "Битола", "Куманово", "Струмица", "Велес", "Кичево", "Штип"],
    contactInfoHeading: "Информации за контакт",
    contactInfoSubtitle: "Пополнете го формуларот и нашиот тим ќе ви одговори во рок од 24 часа.",
    responseTime: "Пон–Пет, 8:00–18:00",
    responseNote: "Одговараме во рок од 24 часа",
    urgentHeading: "Потребна ви е итна помош?",
    callNowBtn: "Јавете ни се сега",
    sendMessageHeading: "Испратете ни порака",
    sendMessageSubtitle: "Со задоволство ќе слушнеме за вашиот проект.",
    nameLabelText: "Полно ime *",
    namePlaceholder: "Ime Prezime",
    emailLabelText: "Адреса на е-пошта *",
    emailPlaceholder: "email@primer.com",
    phoneLabelText: "Телефонски број",
    phonePlaceholder: "+389 00 000 000",
    serviceLabelText: "Услугата за која сте заинтересирани *",
    servicePlaceholder: "Изберете услуга",
    serviceOptions: ["Инсталација на климатизер", "Поправка на климатизер", "Инсталација на греење", "Поправка на греење", "Одржување", "Итна служба", "Друго"],
    detailsLabelText: "Детали за проектот *",
    detailsPlaceholder: "Кажете ни за вашиот проект...",
    sendBtn: "Испрати порака",
    findUsHeading: "Најдете не",
    noMapText: "Нема конфигурирана карта — додадете Google Maps URL во администраторскиот панел.",
    serviceAreaHeading: "Услужна област",
    serviceAreaText: "Со гордост им служиме на целиот регион и околните заедници. Ако нисте сигурни дали го опслужуваме вашето подрачје, јавете ни се!",
    errorMsg: "Нешто тргна наопаку. Обидете се повторно.",
    successMsg: "Ви благодариме за вашето барање! Наскоро ќе ви одговориме.",
    phoneLabel: "Телефон",
    emailLabel: "Е-пошта",
    officeLabel: "Канцеларија",
    hoursLabel: "Работно време",
  },
  gallery: {
    heroTitle1: "Нашата работа",
    heroTitle2: "Галерија",
    heroSubtitle: "Истражете го нашето портфолио на завршени проекти и инсталации",
    ctaHeading: "Подготвени да го започнете вашиот проект?",
    ctaSubheading:
      "Дозволете ни да го донесеме истото квалитет и професионализам во вашиот дом или бизнис",
    ctaPhone: "+389 70 777 888",
    filterLabel: "Филтрирај:",
    noImagesText: "Не се пронајдени слики во оваа категорија",
    callTodayBtn: "Јавете ни се денес",
  },
  products: {
    heroTitle1: "Премиум ХВАК",
    heroTitle2: "Производи",
    heroSubtitle:
      "Висококвалитетни системи за греење и ладење од водечки производители во индустријата",
    productLineupHeading: "Нашата линија на производи",
    productLineupSubtitle: "Изберете од нашата селекција на премиум ХВАК системи",
    getQuoteBtn: "Добиј понуда",
    installHeading: "Вклучена е професионална инсталација",
    installDesc: "Секој производ се инсталира од нашите сертифицирани техничари и се оптимизира за максимална ефикасност.",
    installFeatures: [
      "Бесплатна консултација и проценка",
      "Професионална инсталација од сертифицирани техничари",
      "Тестирање и оптимизација на системот",
      "Достапни се опции за продолжена гаранција",
    ],
    scheduleConsultBtn: "Закажи консултација",
    financingHeading: "Достапно е флексибилно финансирање",
    financingDesc: "Направете ја вашата ХВАК инвестиција достапна со нашите флексибилни опции за финансирање",
    financingBtn: "Дознај повеќе",
    brandsTitle: "Врвни брендови",
    brandsDesc: "Соработуваме со водечките производители во индустријата",
    warrantyTitle: "Заштита со гаранција",
    warrantyDesc: "Продолжени гаранции на сите производи и инсталации",
    energyTitle: "Енергетски ефикасен",
    energyDesc: "Заштедете до 40% на трошоците за енергија",
    filterAllLabel: "Сите",
    showBenefits: true,
    categories: [],
  },
};

// ── Multi-lang defaults ────────────────────────────────────────────────────────

export const defaultMultiLangContent: Record<Lang, SiteContent> = {
  en: defaultContent,
  de: defaultContent,
  sq: defaultContent,
  mk: defaultContent,
};

// ── Merge helper ──────────────────────────────────────────────────────────────

function mergeContent(parsed: Partial<SiteContent>, def: SiteContent = defaultContent): SiteContent {
  return {
    global: { ...def.global, ...parsed.global },
    header: {
      ...def.header,
      ...parsed.header,
      navLinks: parsed.header?.navLinks ?? def.header.navLinks,
    },
    footer: {
      ...def.footer,
      ...parsed.footer,
      quickLinks: parsed.footer?.quickLinks ?? def.footer.quickLinks,
      services: parsed.footer?.services ?? def.footer.services,
    },
    home: {
      ...def.home,
      ...parsed.home,
      storyP3: parsed.home?.storyP3 || def.home.storyP3,
      stats: parsed.home?.stats ?? def.home.stats,
      showStats: parsed.home?.showStats ?? def.home.showStats,
      showLearnMoreBtn: parsed.home?.showLearnMoreBtn ?? def.home.showLearnMoreBtn,
      homeServices: (() => {
        const svcs = parsed.home?.homeServices ?? def.home.homeServices;
        return svcs.map((s: { icon: string; title: string; desc: string }, i: number) => ({
          ...s,
          icon: s.icon === "CheckCircle2" ? (def.home.homeServices[i]?.icon ?? s.icon) : s.icon,
        }));
      })(),
      featuredProducts: parsed.home?.featuredProducts ?? def.home.featuredProducts,
      whyChooseFeatures: parsed.home?.whyChooseFeatures ?? def.home.whyChooseFeatures,
      howItWorksSteps: parsed.home?.howItWorksSteps ?? def.home.howItWorksSteps,
      homeGallery: (() => {
        const g = parsed.home?.homeGallery;
        if (!g || g.length === 0) return def.home.homeGallery;
        if (g.every((item: { image: string }) => item.image.includes("unsplash.com"))) return def.home.homeGallery;
        return g;
      })(),
    },
    services: {
      ...def.services,
      ...parsed.services,
      detailedServices: parsed.services?.detailedServices ?? def.services.detailedServices,
      showAdditionalServices: parsed.services?.showAdditionalServices ?? def.services.showAdditionalServices,
      additionalServices: parsed.services?.additionalServices ?? def.services.additionalServices,
      customerTypes: parsed.services?.customerTypes ?? def.services.customerTypes,
      showAdvantage: parsed.services?.showAdvantage ?? def.services.showAdvantage,
      advantages: parsed.services?.advantages ?? def.services.advantages,
      showEmergencyBanner: parsed.services?.showEmergencyBanner ?? def.services.showEmergencyBanner,
    },
    about: {
      ...def.about,
      ...parsed.about,
      team: parsed.about?.team ?? def.about.team,
      stats: parsed.about?.stats ?? def.about.stats,
      showAboutStats: parsed.about?.showAboutStats ?? def.about.showAboutStats,
      showCerts: parsed.about?.showCerts ?? def.about.showCerts,
      values: parsed.about?.values ?? def.about.values,
      certs: parsed.about?.certs ?? def.about.certs,
    },
    contact: {
      ...def.contact,
      ...parsed.contact,
      serviceOptions: parsed.contact?.serviceOptions ?? def.contact.serviceOptions,
    },
    gallery: { ...def.gallery, ...parsed.gallery },
    products: {
      ...def.products,
      ...parsed.products,
      installFeatures: parsed.products?.installFeatures ?? def.products.installFeatures,
    },
  };
}

// ── Context types ─────────────────────────────────────────────────────────────

type ContentContextType = {
  content: SiteContent;
  langs: Record<Lang, SiteContent>;
  isLoaded: boolean;
  saveError: string | null;
  currentLang: Lang;
  setLang: (lang: Lang) => void;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  updateLangContent: (lang: Lang, updater: (prev: SiteContent) => SiteContent) => void;
  updateAllLangs: (updater: (lang: Lang, prev: SiteContent) => SiteContent) => void;
  saveNow: () => Promise<void>;
  resetContent: () => void;
};

const ContentContext = createContext<ContentContextType | null>(null);

// Bump this whenever new required fields are added to SiteContent
const STORAGE_VERSION = 7;

type StoredMultiLang = {
  v?: number;
  langs: Partial<Record<Lang, Partial<SiteContent>>>;
  currentLang: Lang;
};

export function ContentProvider({ children }: { children: ReactNode }) {
  const [langs, setLangs] = useState<Record<Lang, SiteContent>>({ ...defaultMultiLangContent });
  const [currentLang, setCurrentLang] = useState<Lang>("en");
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const content = langs[currentLang];

  const pendingLangsRef = useRef<Record<Lang, SiteContent>>({ ...defaultMultiLangContent });
  const pendingLangRef = useRef<Lang>("en");

  const saveNow = async (): Promise<void> => {
    const { error } = await supabase
      .from("site_content")
      .upsert(
        { id: "multilang", data: { v: STORAGE_VERSION, langs: pendingLangsRef.current, currentLang: pendingLangRef.current } },
        { onConflict: "id" }
      );
    if (error) {
      console.error("Supabase save error:", error);
      setSaveError("Save failed: " + error.message);
    } else {
      setSaveError(null);
    }
  };

  // Always load from Supabase on mount — single source of truth
  useEffect(() => {
    supabase
      .from("site_content")
      .select("data")
      .eq("id", "multilang")
      .single()
      .then(({ data, error }) => {
        if (!error && data?.data) {
          const stored = data.data as StoredMultiLang;
          if (stored.v && stored.v >= STORAGE_VERSION) {
            const merged: Record<Lang, SiteContent> = {
              en: mergeContent(stored.langs?.en ?? {}, defaultMultiLangContent.en),
              de: mergeContent(stored.langs?.de ?? {}, defaultMultiLangContent.de),
              sq: mergeContent(stored.langs?.sq ?? {}, defaultMultiLangContent.sq),
              mk: mergeContent(stored.langs?.mk ?? {}, defaultMultiLangContent.mk),
            };
            setLangs(merged);
            pendingLangsRef.current = merged;
          }
        }
        setIsLoaded(true);
      });
  }, []);

  const setLang = (lang: Lang) => {
    setCurrentLang(lang);
    pendingLangRef.current = lang;
  };

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    setLangs((prev) => {
      const next = { ...prev, [currentLang]: updater(prev[currentLang]) };
      pendingLangsRef.current = next;
      return next;
    });
  };

  const updateLangContent = (lang: Lang, updater: (prev: SiteContent) => SiteContent) => {
    setLangs((prev) => {
      const next = { ...prev, [lang]: updater(prev[lang]) };
      pendingLangsRef.current = next;
      return next;
    });
  };

  // Update all languages in one shot — avoids N separate state updates when propagating
  const updateAllLangs = (updater: (lang: Lang, prev: SiteContent) => SiteContent) => {
    setLangs((prev) => {
      const next: Record<Lang, SiteContent> = {
        en: updater("en", prev.en),
        de: updater("de", prev.de),
        sq: updater("sq", prev.sq),
        mk: updater("mk", prev.mk),
      };
      pendingLangsRef.current = next;
      return next;
    });
  };

  const resetContent = () => {
    const fresh = { ...defaultMultiLangContent };
    setLangs(fresh);
    setCurrentLang("en");
    pendingLangsRef.current = fresh;
    pendingLangRef.current = "en";
    supabase
      .from("site_content")
      .upsert({ id: "multilang", data: { v: STORAGE_VERSION, langs: fresh, currentLang: "en" } }, { onConflict: "id" })
      .then(({ error }) => { if (error) console.error("Supabase reset error:", error); });
  };

  return (
    <ContentContext.Provider value={{ content, langs, isLoaded, saveError, currentLang, setLang, updateContent, updateLangContent, updateAllLangs, saveNow, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}
