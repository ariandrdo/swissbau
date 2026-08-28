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
    uid?: string;
    registryOffice?: string;
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
    companyName: "SwissBau GmbH",
    phone: "+49 123 456 789",
    email: "info@swissbau-gmbh.ch",
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
    description: "Professional painting, plastering, drywall, flooring, facade WDVS, and tile works — serving Eastern Switzerland & Zürich.",
    quickLinks: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/services" },
      { label: "Projects", path: "/projects" },
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
    services: [
      "Painting & Plastering (Gipser & Maler)",
      "Drywall (Trockenbau)",
      "Plastering & Skimming (Verputzen & Verspachteln)",
      "Render (Abrieb)",
      "Laminate, Vinyl & Parquet",
      "Facade WDVS",
      "Tile Laying (Plattenleger)",
    ],
    phone: "+49 123 456 789",
    email: "info@swissbau-gmbh.ch",
    address: "Ostschweiz & Zürich",
    quickLinksHeading: "Quick Links",
    ourServicesHeading: "Our Services",
    contactUsHeading: "Contact Us",
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Region",
  },
  home: {
    heroTitle1: "Quality Craftsmanship,",
    heroTitle2: "Clean & On Schedule",
    heroSubtitle:
      "Professional painting, plastering, drywall, flooring, and facade works for residential and commercial properties across Eastern Switzerland & Zürich.",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    heroBtnPrimary: "Our Projects",
    heroBtnSecondary: "Get Free Quote",
    storyP1:
      "As qualified plasterers and painters, we take on all works around the house and construction — reliably and professionally. We cover wet construction, drywall, plastering, skimming, and painting works both indoors and outdoors.",
    storyP2:
      "Our range includes tile laying, floor coverings (vinyl, laminate, parquet), facade insulation systems (WDVS), interior demolition, renovation works, and general building trades. On request, we also protect your furniture, floors, and windows so everything stays clean throughout.",
    storyP3:
      "We happily take on small and large renovations for private individuals as well as commercial clients — across Eastern Switzerland and Zürich. Transparent fixed prices, no open invoice, Saturdays without surcharge, and a response within 24 hours.",
    stats: [
      { value: "100%", label: "Fixed Price Guarantee" },
      { value: "24h", label: "Response Time" },
      { value: "7", label: "Services Offered" },
      { value: "0 CHF", label: "Free Inspection" },
    ],
    showStats: true,
    ctaHeading: "Ready to Transform Your Property?",
    ctaSubheading: "Free on-site inspection and quote — response within 24 hours. We also work on Saturdays.",
    ctaPhone: "+49 123 456 789",
    homeServices: [
      { icon: "Paintbrush", title: "Painting Works",          desc: "Interior & exterior painting for apartments, houses, offices and commercial spaces across Eastern Switzerland & Zürich." },
      { icon: "Layers",     title: "Plastering & Skimming",   desc: "Professional plastering (Q2, Q3, Q4), render (Weissputz, Abrieb), and skimming for smooth, durable walls and ceilings." },
      { icon: "Hammer",     title: "Drywall (Trockenbau)",    desc: "Expert drywall installation for interior walls, ceilings, and partitions — clean and efficient." },
      { icon: "Grid2X2",    title: "Tile & Floor Laying",     desc: "Precision tile laying and floor coverings: vinyl, laminate, and parquet for any room or space." },
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
      { name: "Facade Renovation (WDVS)", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
      { name: "Interior Plastering",      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
      { name: "Painting Works",           image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80" },
      { name: "Floor & Tile Laying",      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80" },
    ],
    aboutLabel: "About Us",
    ourStoryHeading: "Our Story",
    ourStorySubtitle: "Qualified plasterers & painters — reliable, clean, and on schedule",
    learnMoreBtn: "Learn More About Us",
    showLearnMoreBtn: true,
    whatWeOfferLabel: "What We Offer",
    ourServicesHeading: "Our Services",
    learnMoreCardBtn: "Learn more",
    viewAllServicesBtn: "View All Services",
    viewAllProductsBtn: "View All Projects",
    whyChooseLabel: "Why Choose SwissBau GmbH",
    whyChooseSubtitle: "Excellence in every detail",
    whyChooseFeatures: [
      { title: "Fixed Prices", desc: "Transparent fixed prices — no open invoice, no hidden costs. You know exactly what you pay before we start." },
      { title: "Saturday — No Surcharge", desc: "We work Saturdays at no extra charge, so your renovation fits your schedule, not the other way around." },
      { title: "Response Within 24h", desc: "We respond to every inquiry within 24 hours and offer a free on-site inspection to assess your project." },
      { title: "Clean & Tidy", desc: "On request, we protect your furniture, floors, and windows so everything stays spotless during and after the job." },
    ],
    ourProcessLabel: "Our Process",
    howItWorksHeading: "How It Works",
    howItWorksSubtitle: "From the first consultation to the finished result — a simple, professional process that delivers quality you can see.",
    howItWorksSteps: [
      { title: "Free Inspection & Quote", desc: "We visit your property for a free inspection, assess the scope of work, and provide a transparent fixed-price quote — no hidden costs.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop" },
      { title: "Preparation & Protection", desc: "Our team prepares all surfaces and — on request — protects your furniture, floors, and windows so everything stays clean throughout the job.", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80&fit=crop" },
      { title: "Professional Execution", desc: "Skilled craftsmen carry out all works with precision and care, delivering a clean, flawless result on time and as agreed.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&fit=crop" },
    ],
    ourWorkLabel: "Our Work",
    projectGalleryHeading: "Project Gallery",
    viewAllBtn: "View All",
    scheduleConsultBtn: "Request a Quote",
  },
  services: {
    heroTitle1: "Professional",
    heroTitle2: "Services",
    heroSubtitle: "Painting, plastering, drywall, flooring, facade systems, and tile laying — all from one reliable team",
    heroBtnText: "Get Free Quote",
    heroBtnLink: "/contact",
    emergencyPhone: "+49 123 456 789",
    ctaHeading: "Ready to Get Started?",
    ctaSubheading: "Free on-site inspection and fixed-price quote — response within 24 hours",
    ctaPhone: "+49 123 456 789",
    ctaBtnText: "Request a Quote",
    ctaBtnLink: "/contact",
    detailedServices: [
      {
        id: "maler-gipser",
        title: "Painting & Plastering",
        subtitle: "Interior & exterior painting by qualified craftsmen",
        description: "Qualified plasterers and painters offer professional painting works for apartments, houses, offices, and commercial spaces throughout Eastern Switzerland & Zürich. Fast, clean, and reliable.",
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80",
        services: [
          "Wall & ceiling painting (uniform, clean)",
          "Doors, door frames & furniture lacquering",
          "Wood (panelling, cladding) & metal painting",
          "Exterior painting & facade coatings",
          "Crack repairs & surface restoration",
          "Furniture, floor & window protection on request",
        ],
        benefits: [
          "Long-lasting, clean finish",
          "Works across Eastern Switzerland & Zürich",
          "Furniture & floor protection included on request",
          "Fast turnaround, fair prices",
        ],
      },
      {
        id: "trockenbau",
        title: "Drywall (Trockenbau)",
        subtitle: "Professional drywall for walls, ceilings & partitions",
        description: "Expert drywall (Gipskarton) installation for interior walls, partition systems, suspended ceilings, and space dividers. Clean, efficient work with fast installation times.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        services: [
          "Interior partition walls",
          "Suspended ceilings",
          "Wall cladding systems",
          "Sound insulation drywall",
          "Fire-rated partitions",
          "Renovation & drywall removal",
        ],
        benefits: [
          "Fast & clean installation",
          "Suitable for all interior spaces",
          "Sound & thermal insulation options",
          "Seamlessly combined with plastering",
        ],
      },
      {
        id: "verputzen-verspachteln",
        title: "Plastering & Skimming",
        subtitle: "Smooth, durable surfaces for walls and ceilings",
        description: "Professional plastering and skimming for interior and exterior surfaces. We work to quality levels Q2, Q3, and Q4, delivering perfectly smooth, paint-ready surfaces.",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
        services: [
          "Interior plastering (wet & dry)",
          "Skim coat finishing (Q2, Q3, Q4)",
          "Ceiling plastering",
          "Crack filling & surface repair",
          "Renovation plastering",
          "Substrate preparation for painting",
        ],
        benefits: [
          "Perfectly smooth, paint-ready surfaces",
          "Quality levels Q2, Q3, Q4 available",
          "Suitable for all wall & ceiling types",
          "Expert craftsmanship guaranteed",
        ],
      },
      {
        id: "abrieb",
        title: "Render (Abrieb / Verputz)",
        subtitle: "Weissputz, Abrieb & decorative render finishes",
        description: "We apply high-quality render finishes including Weissputz, Abrieb, and structured coatings for interior and exterior surfaces — durable, weather-resistant, and visually clean.",
        image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&q=80",
        services: [
          "Weissputz (fine white plaster)",
          "Abrieb (scratch coat render)",
          "Structured exterior render",
          "Interior decorative finishes",
          "Waterproof render systems",
          "New build & renovation render",
        ],
        benefits: [
          "Weather & moisture resistant",
          "Smooth or structured finishes available",
          "Suitable for interior & exterior",
          "Long-lasting, low-maintenance result",
        ],
      },
      {
        id: "laminat-vinyl-parkett",
        title: "Laminate, Vinyl & Parquet",
        subtitle: "Professional floor covering installation",
        description: "We lay vinyl, laminate, and parquet flooring for any room — quickly and cleanly. Ideal for rental preparation, renovations, or new builds. Efficient, tidy, and on schedule.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
        services: [
          "Vinyl flooring (click & glue)",
          "Laminate flooring",
          "Parquet flooring",
          "Subfloor preparation",
          "Skirting board fitting",
          "Floor removal & disposal",
        ],
        benefits: [
          "Fast & clean installation",
          "Ideal for rental or sale preparation",
          "All floor types covered",
          "Old floor removal included on request",
        ],
      },
      {
        id: "fassade-wdvs",
        title: "Facade WDVS (ETICS)",
        subtitle: "Complete external wall insulation & render systems",
        description: "Full facade renovation with WDVS (Wärmedämmverbundsystem / ETICS) — from insulation boards to render and final coating. Improved energy efficiency and a fresh, modern look for any building.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
        services: [
          "External wall insulation (WDVS/ETICS)",
          "Insulation board installation",
          "Reinforcement mesh & base coat",
          "Render application (Abrieb, Weissputz)",
          "Facade painting & coatings",
          "Facade repair & renovation",
        ],
        benefits: [
          "Improved energy efficiency",
          "Weather-resistant & durable",
          "Enhanced curb appeal",
          "Long-lasting protection for the structure",
        ],
      },
      {
        id: "plattenleger",
        title: "Tile Laying",
        subtitle: "Precision tile works for bathrooms, kitchens & floors",
        description: "Professional tile laying for walls and floors in bathrooms, kitchens, hallways, and outdoor areas. Clean, precise, and lasting — we handle all formats and patterns.",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
        services: [
          "Bathroom wall & floor tiling",
          "Kitchen splash backs & floors",
          "Hallway & living area tiling",
          "Terrace & outdoor tile works",
          "Adhesive & grouting",
          "Old tile removal & disposal",
        ],
        benefits: [
          "Precise, clean tile work",
          "All tile sizes & patterns",
          "Waterproof wet-room systems",
          "Old tile removal included on request",
        ],
      },
    ],
    servicesIncludedLabel: "Services Included:",
    requestServiceBtn: "Request This Service",
    showAdditionalServices: true,
    additionalServicesHeading: "Interior Demolition & Renovation",
    additionalServicesSubtitle: "Complete interior strip-out and renovation handover services",
    additionalServices: [
      {
        title: "Full Interior Demolition",
        desc: "Complete interior strip-out to shell condition — clean, on schedule, and at a fixed price",
        features: ["Complete apartment strip-out", "Wallpaper removal", "Floor removal (laminate, parquet, carpet, tiles)", "Bathroom demolition (tiles & sanitary)"],
      },
      {
        title: "Kitchen & Interior Removal",
        desc: "Professional removal of kitchens, doors, windows, and built-in elements",
        features: ["Kitchen dismantling", "Plasterboard wall removal", "Door & window frame removal", "Built-in element dismantling"],
      },
      {
        title: "Handover Cleaning",
        desc: "Thorough apartment handover cleaning with acceptance guarantee",
        features: ["Handover cleaning (with guarantee)", "Construction site cleaning", "Waste removal & disposal", "Ready for handover — same day"],
      },
      {
        title: "Renovation Packages",
        desc: "All-in-one renovation packages for rental or sale preparation — efficient and on time",
        features: ["Fast preparation for rental or sale", "Skimming (Q2–Q4)", "Painting, flooring & tiles", "Fixed price, no surprises"],
      },
    ],
    weServeHeading: "We Serve Everyone",
    weServeSubtitle: "From private homes to commercial properties — small and large renovations welcome",
    customerTypes: [
      { title: "Residential", desc: "Quality renovation works for your home", items: ["Apartments & houses", "Rental preparation", "Sale preparation", "New construction finishing"] },
      { title: "Commercial", desc: "Professional works for businesses", items: ["Offices & commercial spaces", "Retail & showrooms", "Industrial buildings", "Large-scale renovations"] },
    ],
    showAdvantage: true,
    advantageHeading: "The SwissBau GmbH Advantage",
    advantageSubtitle: "What sets us apart",
    advantages: [
      { title: "Transparent Fixed Prices", desc: "No open invoice — you know exactly what you pay before we start" },
      { title: "Saturday — No Surcharge", desc: "We work Saturdays at no extra charge, fitting your schedule" },
      { title: "Response Within 24h", desc: "We reply to every inquiry within 24 hours" },
      { title: "Free On-Site Inspection", desc: "Free visit and quote — by appointment" },
      { title: "Clean & Tidy", desc: "We protect your furniture, floors, and windows during work" },
      { title: "Eastern Switzerland & Zürich", desc: "We cover the full Ostschweiz and Zürich region" },
    ],
    showEmergencyBanner: false,
    emergencyHeading: "Need a Quote?",
    emergencySubtitle: "Contact us today and we'll get back to you within 24 hours",
  },
  about: {
    heroTitle1: "About",
    heroTitle2: "SwissBau GmbH",
    heroSubtitle: "Qualified plasterers & painters — your reliable partner for renovation works in Eastern Switzerland & Zürich",
    storyP1:
      "SwissBau GmbH takes on all works around the house and construction — reliably and professionally. As qualified plasterers and painters, we offer professional building and renovation services in wet construction, drywall, plastering, skimming, and painting — indoors and outdoors.",
    storyP2:
      "Our work also covers tile laying, insulation, floor coverings (vinyl, laminate, parquet), facade WDVS systems, smaller masonry works, and general renovation and building trades. We work cleanly and, on request, protect your furniture, floors, and windows so everything stays spotless.",
    storyP3:
      "We are happy to take on small as well as large renovations for private clients throughout Eastern Switzerland and Zürich. Our promise: clean work, fair prices, transparent fixed prices — no open invoice. We also work on Saturdays without surcharge.",
    storyP4: "Quick preparation for rental or sale — efficient, clean, and on schedule. Free on-site inspection and quote by appointment. Response within 24 hours. We look forward to your enquiry.",
    team: [
      { name: "Beqiri", role: "Founder & Master Craftsman", experience: "Qualified Plasterer & Painter" },
    ],
    stats: [
      { value: "7", label: "Services Offered" },
      { value: "100%", label: "Fixed Price Guarantee" },
      { value: "24h", label: "Response Time" },
      { value: "0 CHF", label: "Free Inspection" },
    ],
    showAboutStats: true,
    showCerts: true,
    ctaHeading: "Ready to Start Your Renovation?",
    ctaSubheading: "Free on-site inspection and fixed-price quote — response within 24 hours",
    ctaBtnText: "Contact Us Today",
    ctaBtnLink: "/contact",
    ourStoryLabel: "Our Story",
    ourValuesHeading: "Our Values",
    ourValuesSubtitle: "The principles that guide everything we do",
    values: [
      { title: "Clean & Precise", desc: "We take pride in clean, precise execution on every project — protecting your furniture, floors, and windows throughout." },
      { title: "Fixed Prices", desc: "Transparent fixed prices on every job — no open invoice, no surprises. You know what you pay before we start." },
      { title: "Reliable & On Schedule", desc: "We show up on time, work efficiently, and complete every project as agreed — including Saturdays at no surcharge." },
      { title: "Honest & Fair", desc: "Clear pricing, honest communication, and free on-site inspection. We respond to every inquiry within 24 hours." },
    ],
    certsHeading: "Why Trust Us",
    certsSubtitle: "Qualified, reliable, and experienced in Switzerland",
    certs: [
      { title: "Qualified", desc: "Qualified plasterers and painters with proven experience in Switzerland" },
      { title: "Fixed Prices", desc: "Transparent fixed prices — no open invoice, no hidden costs" },
      { title: "Saturday Available", desc: "We work Saturdays at no extra charge to fit your schedule" },
    ],
    meetTeamHeading: "Meet Our Team",
    meetTeamSubtitle: "Skilled craftsmen dedicated to clean, reliable results",
  },
  contact: {
    heroTitle1: "Contact",
    heroTitle2: "Us",
    heroSubtitle: "Get in touch with our team for a free quote or consultation",
    phone: "+49 123 456 789",
    email: "info@swissbau-gmbh.ch",
    address: "Germany",
    hoursWeekday: "Mon – Fri: 7:00 AM – 6:00 PM",
    hoursSaturday: "Sat: 8:00 AM – 2:00 PM",
    mapEmbedUrl: "",
    serviceAreas: ["St. Gallen", "Zürich", "Winterthur", "Frauenfeld", "Weinfelden", "Kreuzlingen", "Konstanz", "Arbon", "Amriswil", "Romanshorn", "Rorschach", "Rapperswil", "Gossau", "Herisau", "Appenzell", "Wil", "Uzwil", "Flawil", "Bronschhofen", "Oberbüren"],
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
    serviceOptions: ["Painting Works", "Plastering & Skimming", "Drywall (Trockenbau)", "Render (Abrieb)", "Laminate / Vinyl / Parquet", "Facade WDVS", "Tile Laying", "Interior Demolition", "Renovation Package", "Other"],
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
    companyName: "SwissBau GmbH",
    phone: "+49 123 456 789",
    email: "info@swissbau-gmbh.ch",
    address: "Ostschweiz & Zürich",
  },
  header: {
    phone: "+49 123 456 789",
    navLinks: [
      { label: "Startseite", path: "/" },
      { label: "Dienstleistungen", path: "/services" },
      { label: "Projekte", path: "/projects" },
      { label: "Über uns", path: "/about" },
      { label: "Kontakt", path: "/contact" },
    ],
  },
  footer: {
    description: "Professionelle Maler- und Gipserarbeiten, Trockenbau, Verputz, Bodenbeläge, Fassade WDVS und Plattenarbeiten in der ganzen Ostschweiz & Zürich.",
    quickLinks: [
      { label: "Startseite", path: "/" },
      { label: "Dienstleistungen", path: "/services" },
      { label: "Projekte", path: "/projects" },
      { label: "Über uns", path: "/about" },
      { label: "Kontakt", path: "/contact" },
    ],
    services: [
      "Gipser & Maler",
      "Trockenbau",
      "Verputzen & Verspachteln",
      "Abrieb",
      "Laminat & Vinyl & Parkett",
      "Fassade WDVS",
      "Plattenleger",
    ],
    phone: "+49 123 456 789",
    email: "info@swissbau-gmbh.ch",
    address: "Ostschweiz & Zürich",
    uid: "",
    registryOffice: "",
    quickLinksHeading: "Schnelllinks",
    ourServicesHeading: "Unsere Dienstleistungen",
    contactUsHeading: "Kontakt",
    phoneLabel: "Telefon",
    emailLabel: "E-Mail",
    addressLabel: "Region",
  },
  home: {
    heroTitle1: "Sauber, zuverlässig,",
    heroTitle2: "termingerecht",
    heroSubtitle:
      "Wir übernehmen sämtliche Arbeiten rund ums Haus und den Bau — professionell und fair. Malerarbeiten, Verputz, Trockenbau, Bodenbeläge, Fassade WDVS und Plattenarbeiten in der ganzen Ostschweiz & Zürich.",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    heroBtnPrimary: "Unsere Projekte",
    heroBtnSecondary: "Kostenloses Angebot",
    storyP1:
      "Gelernter Gipser und Maler bieten professionelle Bau- und Renovationsarbeiten an. Wir übernehmen Arbeiten im Bereich Nassbau und Trockenbau sowie Verputz-, Spachtel- und Malerarbeiten im Innen- und Außenbereich.",
    storyP2:
      "Dazu gehören unter anderem Fliesenlegen, Isolierungen, Renovationen, Plattenarbeiten, Verlegen von Vinyl, Laminat und Parkett sowie allgemeine Umbau- und Handwerksarbeiten. Ob innen oder außen — wir bieten saubere Arbeit und faire Preise.",
    storyP3:
      "Gerne übernehmen wir kleine sowie größere Renovationen für Privatpersonen und Gewerbe. Transparente Festpreise — keine offene Rechnung. Samstags ohne Aufschlag. Antwort innert 24 Stunden — kostenlose Besichtigung.",
    stats: [
      { value: "Festpreis", label: "Keine offene Rechnung" },
      { value: "24h", label: "Antwortzeit" },
      { value: "Mo–Sa", label: "Samstags ohne Aufschlag" },
      { value: "Gratis", label: "Kostenlose Besichtigung" },
    ],
    showStats: true,
    ctaHeading: "Renovation oder Wohnungsübergabe geplant?",
    ctaSubheading: "Kostenlose Besichtigung und Offerte nach Absprache — Antwort innert 24 Stunden.",
    ctaPhone: "+49 123 456 789",
    homeServices: [
      { icon: "Paintbrush", title: "Malerarbeiten",              desc: "Malerarbeiten für Wohnungen, Häuser, Büros und Gewerbe in der ganzen Ostschweiz & Zürich. Schnell, sauber und zuverlässig." },
      { icon: "Layers",     title: "Verputzen & Verspachteln",   desc: "Spachtelarbeiten (Q2, Q3, Q4), Weissputz, Abrieb — glatte, langlebige Oberflächen für Wände und Decken." },
      { icon: "Hammer",     title: "Trockenbau (Gipskarton)",    desc: "Professioneller Trockenbau für Innenwände, Decken und Trennwände — schnell, sauber und effizient." },
      { icon: "Grid2X2",    title: "Bodenbeläge & Platten",      desc: "Verlegen von Vinyl, Laminat und Parkett sowie Fliesenlegen für Bäder, Küchen und Böden." },
    ],
    homeGallery: [
      { image: "/img1.png", title: "Projekt 1" },
      { image: "/img2.png", title: "Projekt 2" },
      { image: "/img3.png", title: "Projekt 3" },
      { image: "/img4.png", title: "Projekt 4" },
      { image: "/img5.png", title: "Projekt 5" },
    ],
    featuredProductsTitle: "Referenzprojekte",
    featuredProducts: [
      { name: "Fassade Renovation (WDVS)", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
      { name: "Innenverputz",              image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
      { name: "Malerarbeiten",             image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80" },
      { name: "Boden & Plattenarbeiten",   image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80" },
    ],
    aboutLabel: "Über uns",
    ourStoryHeading: "Unsere Geschichte",
    ourStorySubtitle: "Gelernter Gipser und Maler — zuverlässig, sauber, termingerecht",
    showStats: true,
    showLearnMoreBtn: true,
    viewAllProductsBtn: "Alle Projekte ansehen",
    learnMoreBtn: "Mehr über uns",
    whatWeOfferLabel: "Was wir anbieten",
    ourServicesHeading: "Unsere Leistungen",
    learnMoreCardBtn: "Mehr erfahren",
    viewAllServicesBtn: "Alle Leistungen ansehen",
    whyChooseLabel: "Warum SwissBau GmbH",
    whyChooseSubtitle: "Sauber, fair, zuverlässig — das zeichnet uns aus",
    whyChooseFeatures: [
      { title: "Transparente Festpreise", desc: "Keine offene Rechnung — Sie wissen genau, was Sie bezahlen, bevor wir anfangen." },
      { title: "Samstags ohne Aufschlag", desc: "Wir arbeiten auch samstags ohne Mehrkosten — ganz nach Ihrem Zeitplan." },
      { title: "Antwort innert 24 Stunden", desc: "Wir melden uns innerhalb von 24 Stunden und bieten eine kostenlose Besichtigung an." },
      { title: "Sauber & termingerecht", desc: "Auf Wunsch schützen wir Möbel, Böden und Fenster — damit alles sauber bleibt." },
    ],
    ourProcessLabel: "Unser Ablauf",
    howItWorksHeading: "So läuft es ab",
    howItWorksSubtitle: "Von der ersten Besichtigung bis zur fertigen Arbeit — einfach, professionell und transparent.",
    howItWorksSteps: [
      { title: "Kostenlose Besichtigung", desc: "Wir kommen vorbei, schauen uns die Arbeit an und erstellen Ihnen ein transparentes Festpreisangebot — keine versteckten Kosten.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop" },
      { title: "Vorbereitung & Schutz", desc: "Unser Team bereitet alle Flächen vor und schützt auf Wunsch Möbel, Böden und Fenster — damit alles sauber bleibt.", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80&fit=crop" },
      { title: "Professionelle Ausführung", desc: "Wir führen alle Arbeiten sauber, präzise und termingerecht aus — wie vereinbart, ohne Überraschungen.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&fit=crop" },
    ],
    ourWorkLabel: "Unsere Arbeit",
    projectGalleryHeading: "Projektgalerie",
    viewAllBtn: "Alle ansehen",
    scheduleConsultBtn: "Offerte anfragen",
  },
  services: {
    heroTitle1: "Professionelle",
    heroTitle2: "Leistungen",
    heroSubtitle: "Malerarbeiten, Verputz, Trockenbau, Bodenbeläge, Fassade WDVS und Plattenarbeiten — alles aus einer Hand",
    heroBtnText: "Kostenloses Angebot",
    heroBtnLink: "/contact",
    emergencyPhone: "+49 123 456 789",
    ctaHeading: "Renovation oder Wohnungsübergabe geplant?",
    ctaSubheading: "Kostenlose Besichtigung und Offerte nach Absprache — Antwort innert 24 Stunden",
    ctaPhone: "+49 123 456 789",
    ctaBtnText: "Offerte anfragen",
    ctaBtnLink: "/contact",
    detailedServices: [
      {
        id: "maler-gipser",
        title: "Gipser & Maler",
        subtitle: "Innen- und Aussenmalerarbeiten von gelernten Fachleuten",
        description:
          "Malerarbeiten für Wohnungen, Häuser, Büros und Gewerbe in der ganzen Ostschweiz & Zürich. Schnell, sauber und zuverlässig. Aussenmalerarbeiten sowie kleine Renovationen.",
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80",
        services: [
          "Wände und Decken streichen (sauber, gleichmässig)",
          "Türen, Türrahmen und Möbel lackieren",
          "Holz (Täfer, Verkleidungen) und Metall streichen",
          "Aussenmalerarbeiten & Fassadenanstriche",
          "Spachtelarbeiten & Ausbesserungen",
          "Möbel-, Boden- & Fensterschutz auf Wunsch",
        ],
        benefits: [
          "Schnell, sauber und zuverlässig",
          "Ganze Ostschweiz & Zürich",
          "Schutz von Möbeln und Böden auf Wunsch",
          "Faire Preise, schnelle Termine",
        ],
      },
      {
        id: "trockenbau",
        title: "Trockenbau (Gipskarton)",
        subtitle: "Professioneller Trockenbau für Wände, Decken & Trennwände",
        description:
          "Fachgerechter Trockenbau (Gipskarton) für Innenwände, Trennwandsysteme, Unterdecken und Raumtrenner. Schnell, sauber und effizient.",
        image: "https://images.unsplash.com/photo-1704742950992-9815a104820c?w=800&q=80",
        services: [
          "Innenwände aus Gipskarton",
          "Unterdecken (abgehängte Decken)",
          "Wandverkleidungen",
          "Schallschutz-Trockenbau",
          "Brandschutz-Trennwände",
          "Rückbau & Demontage von Gipskartonwänden",
        ],
        benefits: [
          "Schnelle & saubere Ausführung",
          "Für alle Innenräume geeignet",
          "Schall- & Wärmeschutz möglich",
          "Kombinierbar mit Verputz & Malerarbeiten",
        ],
      },
      {
        id: "verputzen-verspachteln",
        title: "Verputzen & Verspachteln",
        subtitle: "Glatte, langlebige Oberflächen für Wände und Decken",
        description:
          "Professionelles Verputzen und Verspachteln für Innen- und Außenflächen. Wir arbeiten in den Qualitätsstufen Q2, Q3 und Q4 — perfekt glatte, malerfertige Flächen.",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
        services: [
          "Innenverputz (Nassverputz & Trockenbau)",
          "Spachtelarbeiten (Q2, Q3, Q4)",
          "Deckenverputz",
          "Riss- & Schadensbehebung",
          "Renovationsverputz",
          "Untergrundvorbereitung für Malerarbeiten",
        ],
        benefits: [
          "Perfekt glatte, malerfertige Flächen",
          "Qualitätsstufen Q2, Q3, Q4 verfügbar",
          "Für alle Wand- & Deckentypen geeignet",
          "Fachgerechte Ausführung garantiert",
        ],
      },
      {
        id: "abrieb",
        title: "Abrieb & Verputz",
        subtitle: "Weissputz, Abrieb & dekorative Putzoberflächen",
        description:
          "Wir tragen hochwertige Putzoberflächen auf — Weissputz, Abrieb und Strukturputz — für Innen- und Außenflächen. Langlebig, wetterbeständig und optisch sauber.",
        image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&q=80",
        services: [
          "Weissputz (Feinputz)",
          "Abrieb (Kratzputz)",
          "Strukturierter Aussenputz",
          "Dekorative Innenputze",
          "Wasserabweisende Putzsysteme",
          "Neubau & Renovationsverputz",
        ],
        benefits: [
          "Wetter- & feuchtigkeitsbeständig",
          "Glatte oder strukturierte Oberfläche",
          "Innen & außen einsetzbar",
          "Langlebig und pflegeleicht",
        ],
      },
      {
        id: "laminat-vinyl-parkett",
        title: "Laminat, Vinyl & Parkett",
        subtitle: "Professionelles Verlegen von Bodenbelägen",
        description:
          "Wir verlegen Vinyl, Laminat und Parkett für jeden Raum — schnell und sauber. Ideal für Vermietungsvorbereitung, Renovationen oder Neubauten.",
        image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80",
        services: [
          "Vinyl (Klick & Klebe)",
          "Laminat",
          "Parkett",
          "Untergrundvorbereitung",
          "Sockelleisten montieren",
          "Bodenrückbau & Entsorgung",
        ],
        benefits: [
          "Schnelle & saubere Verlegung",
          "Ideal für Vermietung oder Verkauf",
          "Alle Bodenarten möglich",
          "Altbodenentfernung auf Wunsch inklusive",
        ],
      },
      {
        id: "fassade-wdvs",
        title: "Fassade WDVS",
        subtitle: "Wärmedämmverbundsystem für Außenfassaden",
        description:
          "Komplette Fassadenrenovation mit WDVS — von der Dämmplatte bis zum Schlussanstrich. Bessere Energieeffizienz und ein frisches, modernes Erscheinungsbild.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
        services: [
          "Wärmedämmverbundsystem (WDVS)",
          "Dämmplattenanbringung",
          "Armierungsgewebe & Grundputz",
          "Abrieb & Weissputz auftragen",
          "Fassadenanstrich & Beschichtungen",
          "Fassadenreparatur & Renovation",
        ],
        benefits: [
          "Verbesserte Energieeffizienz",
          "Wetterfest & langlebig",
          "Modernes Erscheinungsbild",
          "Schutz der Gebäudestruktur",
        ],
      },
      {
        id: "plattenleger",
        title: "Plattenleger",
        subtitle: "Präzise Plattenarbeiten für Bäder, Küchen & Böden",
        description:
          "Professionelles Fliesenlegen für Wände und Böden in Bädern, Küchen, Eingangsbereichen und Außenbereichen. Sauber, präzise und dauerhaft.",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
        services: [
          "Badezimmer Wand- & Bodenplatten",
          "Küche Spritzschutz & Böden",
          "Eingangsbereiche & Wohnräume",
          "Terrassen & Aussenplatten",
          "Kleben & Verfugen",
          "Altplattenentfernung & Entsorgung",
        ],
        benefits: [
          "Präzise, saubere Plattenarbeit",
          "Alle Formate & Muster möglich",
          "Wasserdichte Nasszellen-Systeme",
          "Altplattenentfernung auf Wunsch",
        ],
      },
    ],
    servicesIncludedLabel: "Leistungen enthalten:",
    requestServiceBtn: "Diese Leistung anfragen",
    showAdditionalServices: true,
    additionalServicesHeading: "Innenrückbau & Renovationsübergabe",
    additionalServicesSubtitle: "Kompletter Innenrückbau und Entkernungen — sauber, termingerecht und zum Festpreis",
    additionalServices: [
      {
        title: "Komplette Entkernung",
        desc: "Vollständiger Innenrückbau bis auf den Rohbauzustand — sauber, termingerecht und zum Festpreis",
        features: ["Komplette Wohnungsentkernung (Rohbauzustand)", "Tapetenentfernung", "Bodenrückbau (Laminat, Parkett, Teppich, Fliesen)", "Badezimmer-Entkernung (Wand- & Bodenfliesen, Sanitäranlagen)"],
      },
      {
        title: "Küche & Innendemontage",
        desc: "Professionelle Demontage von Küchen, Türen, Fenstern und Einbauten",
        features: ["Küchendemontage", "Gipskartonwände entfernen", "Türen, Fenster & Einbauten demontieren", "Abfall & Entsorgung inklusive"],
      },
      {
        title: "Wohnungsübergabe-Reinigung",
        desc: "Gründliche Übergabereinigung mit Abnahmegarantie",
        features: ["Wohnungsübergabe-Reinigung (mit Abnahmegarantie)", "Baustellenreinigung", "Abfallentsorgung", "Übernahmebereit — termingerecht"],
      },
      {
        title: "Komplett-Renovationspakete",
        desc: "Alles aus einer Hand — schnelle Vorbereitung für Vermietung oder Verkauf",
        features: ["Schnelle Vorbereitung für Vermietung oder Verkauf", "Spachtelarbeiten (Q2–Q4)", "Malerarbeiten, Bodenbeläge & Platten", "Festpreis — keine offene Rechnung"],
      },
    ],
    weServeHeading: "Für alle da",
    weServeSubtitle: "Von Privatpersonen bis zu Gewerbekunden — kleine und große Renovationen willkommen",
    customerTypes: [
      { title: "Privatkunden", desc: "Hochwertige Renovationsarbeiten für Ihr Zuhause", items: ["Wohnungen & Häuser", "Vermietungsvorbereitung", "Verkaufsvorbereitung", "Neubauprojekte"] },
      { title: "Gewerbekunden", desc: "Professionelle Arbeiten für Unternehmen", items: ["Büros & Gewerbeflächen", "Läden & Showrooms", "Industriegebäude", "Grossrenovationen"] },
    ],
    showAdvantage: true,
    advantageHeading: "Warum SwissBau GmbH",
    advantageSubtitle: "Das zeichnet uns aus",
    advantages: [
      { title: "Transparente Festpreise", desc: "Keine offene Rechnung — Sie wissen genau, was Sie bezahlen" },
      { title: "Samstags ohne Aufschlag", desc: "Wir arbeiten samstags ohne Mehrkosten" },
      { title: "Antwort innert 24h", desc: "Wir melden uns bei jeder Anfrage innerhalb von 24 Stunden" },
      { title: "Kostenlose Besichtigung", desc: "Gratis Besichtigung und Offerte nach Absprache" },
      { title: "Sauber & termingerecht", desc: "Schutz von Möbeln, Böden und Fenstern auf Wunsch" },
      { title: "Ostschweiz & Zürich", desc: "Wir sind in der ganzen Ostschweiz und Zürich tätig" },
    ],
    showEmergencyBanner: false,
    emergencyHeading: "Offerte anfragen?",
    emergencySubtitle: "Kontaktieren Sie uns — wir melden uns innert 24 Stunden und vereinbaren eine kostenlose Besichtigung",
  },
  about: {
    heroTitle1: "Über",
    heroTitle2: "SwissBau GmbH",
    heroSubtitle:
      "Gelernter Gipser und Maler — Ihr zuverlässiger Partner für Renovationsarbeiten in der Ostschweiz & Zürich",
    storyP1:
      "Wir übernehmen sämtliche Arbeiten rund ums Haus und den Bau zuverlässig und professionell. Gelernter Gipser und Maler bieten professionelle Bau- und Renovationsarbeiten an.",
    storyP2:
      "Wir übernehmen Arbeiten im Bereich Nassbau und Trockenbau sowie Verputz-, Spachtel- und Malerarbeiten im Innen- und Außenbereich. Dazu gehören Fliesenlegen, Isolierungen, Renovationen, Plattenarbeiten und das Verlegen von Vinyl, Laminat und Parkett.",
    storyP3:
      "Gerne übernehmen wir kleine sowie größere Renovationen für Privatpersonen und Gewerbe. Wir bieten saubere Arbeit, faire Preise und flexible Lösungen — auch für die schnelle Vorbereitung für Vermietung oder Verkauf.",
    storyP4: "Ich freue mich auf Ihre Anfrage. Besichtigung und Offerte nach Absprache — Antwort innert 24 Stunden. Kostenlose Besichtigung.",
    team: [
      { name: "Beqiri", role: "Inhaber & Meister-Handwerker", experience: "Gelernter Gipser & Maler" },
    ],
    stats: [
      { value: "7", label: "Leistungsbereiche" },
      { value: "Festpreis", label: "Keine offene Rechnung" },
      { value: "24h", label: "Antwortzeit" },
      { value: "Gratis", label: "Kostenlose Besichtigung" },
    ],
    showAboutStats: true,
    showCerts: true,
    ctaHeading: "Renovation oder Wohnungsübergabe geplant?",
    ctaSubheading:
      "Kostenlose Besichtigung und Offerte nach Absprache — wir freuen uns auf Ihre Anfrage",
    ctaBtnText: "Jetzt Kontakt aufnehmen",
    ctaBtnLink: "/contact",
    ourStoryLabel: "Unsere Geschichte",
    ourValuesHeading: "Unsere Werte",
    ourValuesSubtitle: "Die Grundsätze, die alles leiten, was wir tun",
    values: [
      { title: "Sauber & präzise", desc: "Wir arbeiten sauber und präzise — auf Wunsch schützen wir Möbel, Böden und Fenster, damit alles sauber bleibt." },
      { title: "Festpreise", desc: "Transparente Festpreise auf jeden Auftrag — keine offene Rechnung, keine versteckten Kosten." },
      { title: "Zuverlässig & termingerecht", desc: "Wir erscheinen pünktlich, arbeiten effizient und schliessen jeden Auftrag wie vereinbart ab — auch samstags ohne Aufschlag." },
      { title: "Ehrlich & fair", desc: "Klare Preise, ehrliche Kommunikation und kostenlose Besichtigung — wir antworten innert 24 Stunden." },
    ],
    certsHeading: "Warum uns vertrauen",
    certsSubtitle: "Qualifiziert, zuverlässig und erfahren in der Schweiz",
    certs: [
      { title: "Qualifiziert", desc: "Gelernter Gipser und Maler mit nachgewiesener Erfahrung in der Schweiz" },
      { title: "Festpreise", desc: "Transparente Festpreise — keine offene Rechnung, keine Überraschungen" },
      { title: "Samstags verfügbar", desc: "Wir arbeiten samstags ohne Aufschlag — ganz nach Ihrem Zeitplan" },
    ],
    meetTeamHeading: "Unser Team",
    meetTeamSubtitle: "Erfahrene Handwerker für saubere, zuverlässige Ergebnisse",
  },
  contact: {
    heroTitle1: "Kontakt",
    heroTitle2: "Aufnehmen",
    heroSubtitle: "Kostenlose Besichtigung und Offerte nach Absprache — Antwort innert 24 Stunden",
    phone: "+49 123 456 789",
    email: "info@swissbau-gmbh.ch",
    address: "Ostschweiz & Zürich",
    hoursWeekday: "Mo – Fr: 7:00 – 18:00 Uhr",
    hoursSaturday: "Sa: 8:00 – 16:00 Uhr (ohne Aufschlag)",
    mapEmbedUrl: "",
    serviceAreas: ["St. Gallen", "Zürich", "Winterthur", "Frauenfeld", "Weinfelden", "Kreuzlingen", "Konstanz", "Arbon", "Amriswil", "Romanshorn", "Rorschach", "Rapperswil", "Gossau", "Herisau", "Appenzell", "Wil", "Uzwil", "Flawil", "Bronschhofen", "Oberbüren"],
    contactInfoHeading: "Kontaktinformationen",
    contactInfoSubtitle: "Füllen Sie das Formular aus — wir melden uns innerhalb von 24 Stunden.",
    responseTime: "Mo–Fr, 7–18 Uhr (Sa ebenfalls)",
    responseNote: "Antwort innert 24 Stunden",
    urgentHeading: "Offerte gewünscht?",
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
    serviceOptions: ["Malerarbeiten", "Verputzen & Verspachteln", "Trockenbau", "Abrieb & Verputz", "Laminat / Vinyl / Parkett", "Fassade WDVS", "Plattenleger", "Innenrückbau & Entkernung", "Renovationspaket", "Sonstiges"],
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
    ctaPhone: "+49 123 456 789",
    filterLabel: "Filter:",
    noImagesText: "Keine Bilder in dieser Kategorie gefunden",
    callTodayBtn: "Heute anrufen",
  },
  products: {
    heroTitle1: "Unsere",
    heroTitle2: "Projekte",
    heroSubtitle:
      "Referenzprojekte aus den Bereichen Malerarbeiten, Verputz, Trockenbau, Bodenbeläge und Fassadenarbeiten",
    productLineupHeading: "Unsere Arbeit",
    productLineupSubtitle: "Eine Auswahl unserer abgeschlossenen Projekte",
    getQuoteBtn: "Offerte anfragen",
    installHeading: "Professioneller Service inklusive",
    installDesc: "Jeder Auftrag wird von Anfang bis Ende durch unser erfahrenes Team ausgeführt. Wir bereiten die Flächen fachgerecht vor, verwenden hochwertige Materialien und garantieren ein sauberes, dauerhaftes Ergebnis.",
    installFeatures: [
      "Kostenlose Besichtigung und Offerte",
      "Professionelle Ausführung durch erfahrene Handwerker",
      "Hochwertige Materialien von bewährten Lieferanten",
      "Zufriedenheitsgarantie auf alle Aufträge",
    ],
    scheduleConsultBtn: "Offerte anfragen",
    financingHeading: "Faire Festpreise",
    financingDesc: "Transparente Festpreise ohne versteckte Kosten — auf jeden Auftrag",
    financingBtn: "Kontakt aufnehmen",
    brandsTitle: "Qualitätsmaterialien",
    brandsDesc: "Wir verwenden nur hochwertige Produkte von bewährten Herstellern",
    warrantyTitle: "Arbeit garantiert",
    warrantyDesc: "100% Zufriedenheitsgarantie auf alle unsere Arbeiten",
    energyTitle: "Erfahrenes Team",
    energyDesc: "Gelernter Gipser und Maler mit Erfahrung in der Schweiz",
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
    heroImage: "",
    heroBtnPrimary: "Shiko Produktet",
    heroBtnSecondary: "Merr Ofertë Falas",
    storyP1:
      "Themeluar në vitin 2000, Jubea Energy Systems ka shërbyer klientët rezidencial dhe komercial me shërbime të nivelit të lartë HVAC për më shumë se dy dekada.",
    storyP2:
      "Misioni ynë është i thjeshtë: të ofrojmë shërbime të ndershme, të besueshme dhe profesionale të ngrohjes dhe ftohjes për çdo shtëpi dhe biznes.",
    storyP3:
      "Në SwissBau GmbH, besojmë se cilësia fillon me komunikim. Ne bashkëpunojmë ngushtë me çdo klient — dëgjojmë, planifikojmë dhe ekzekutojmë me precizion — që rezultati final të tejkalojë gjithmonë pritshmëritë. Prona juaj meriton jo më pak.",
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
    heroImage: "",
    heroBtnPrimary: "Види Производи",
    heroBtnSecondary: "Добиј Бесплатна Проценка",
    storyP1:
      "Основана во 2000 година, Jubea Energy Systems им служи на станбени и комерцијални клиенти со врвни ХВАК услуги повеќе од две децении.",
    storyP2:
      "Нашата мисија е едноставна: да обезбедиме чесни, доверливи и професионални услуги за греење и ладење за секој дом и бизнис.",
    storyP3:
      "Во SwissBau GmbH, веруваме дека квалитетот започнува со комуникација. Тесно соработуваме со секој клиент — слушаме, планираме и извршуваме со прецизност — за да го надминеме секогаш очекувањата. Вашиот имот заслужува ништо помалку.",
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
  de: defaultContentDe,
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
const STORAGE_VERSION = 30;
const SESSION_KEY = "swissbau_content_v2";

type StoredMultiLang = {
  v?: number;
  langs: Partial<Record<Lang, Partial<SiteContent>>>;
  currentLang: Lang;
};

function loadFromSession(): Record<Lang, SiteContent> | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredMultiLang;
    if (!parsed.v || parsed.v < STORAGE_VERSION) return null;
    return {
      en: mergeContent(parsed.langs?.en ?? {}, defaultMultiLangContent.en),
      de: mergeContent(parsed.langs?.de ?? {}, defaultMultiLangContent.de),
      sq: mergeContent(parsed.langs?.sq ?? {}, defaultMultiLangContent.sq),
      mk: mergeContent(parsed.langs?.mk ?? {}, defaultMultiLangContent.mk),
    };
  } catch { return null; }
}

function saveToSession(langs: Record<Lang, SiteContent>) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ v: STORAGE_VERSION, langs }));
  } catch { /* ignore quota */ }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [langs, setLangs] = useState<Record<Lang, SiteContent>>(() => loadFromSession() ?? { ...defaultMultiLangContent });
  const currentLang: Lang = "de";
  const [isLoaded, setIsLoaded] = useState(() => loadFromSession() !== null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const content = langs["de"];

  const pendingLangsRef = useRef<Record<Lang, SiteContent>>(loadFromSession() ?? { ...defaultMultiLangContent });
  const pendingLangRef = useRef<Lang>("de");

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
      // Update session cache so next page load skips Supabase fetch
      saveToSession(pendingLangsRef.current);
    }
  };

  // Load from sessionStorage first (no network), then Supabase in background to refresh
  useEffect(() => {
    const cached = loadFromSession();
    if (cached) {
      // Use cached data immediately — no loading spinner
      setLangs(cached);
      pendingLangsRef.current = cached;
      setIsLoaded(true);
      // Still fetch from Supabase in background to pick up changes from other devices/sessions
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
              saveToSession(merged);
            }
          }
        });
    } else {
      // No cache — must fetch from Supabase
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
              saveToSession(merged);
            }
          }
          setIsLoaded(true);
        });
    }
  }, []);

  const setLang = (_lang: Lang) => {
    // Language is locked to German
  };

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    const next = { ...pendingLangsRef.current, de: updater(pendingLangsRef.current["de"]) };
    pendingLangsRef.current = next;
    setLangs(next);
  };

  const updateLangContent = (lang: Lang, updater: (prev: SiteContent) => SiteContent) => {
    const next = { ...pendingLangsRef.current, [lang]: updater(pendingLangsRef.current[lang]) };
    pendingLangsRef.current = next;
    setLangs(next);
  };

  // Update all languages in one shot — avoids N separate state updates when propagating
  const updateAllLangs = (updater: (lang: Lang, prev: SiteContent) => SiteContent) => {
    const prev = pendingLangsRef.current;
    const next: Record<Lang, SiteContent> = {
      en: updater("en", prev.en),
      de: updater("de", prev.de),
      sq: updater("sq", prev.sq),
      mk: updater("mk", prev.mk),
    };
    pendingLangsRef.current = next;
    setLangs(next);
  };

  const resetContent = () => {
    const fresh = { ...defaultMultiLangContent };
    setLangs(fresh);
    pendingLangsRef.current = fresh;
    pendingLangRef.current = "de";
    supabase
      .from("site_content")
      .upsert({ id: "multilang", data: { v: STORAGE_VERSION, langs: fresh, currentLang: "de" } }, { onConflict: "id" })
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
