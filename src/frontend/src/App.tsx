import {
  AlertCircle,
  CheckCircle,
  Clock,
  Facebook,
  Instagram,
  Loader2,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { useActor } from "./hooks/useActor";

// ─── Constants ───────────────────────────────────────────────────────────────

const WHATSAPP_LINK =
  "https://wa.me/919878718167?text=Hello%20Alex%20International%20Salon%2C%20I%20would%20like%20to%20book%20an%20appointment.%0A%0AName%3A%20%0APhone%3A%20%0AService%20Required%3A%20%0APreferred%20Date%3A%20%0APreferred%20Time%3A%20";

const PHONE_DISPLAY = "098787 18167";
const PHONE_HREF = "tel:+919878718167";
const MAPS_LINK = "https://maps.app.goo.gl/gteBYHXzum7a1GXY7";
const INSTAGRAM_LINK =
  "https://www.instagram.com/alex_international_salonkharar?igsh=M3l2YnlmZmU4bXAw";
const ADDRESS =
  "SCO Number 22, Nijjar Road, Near Western Tower, Sector 126, Greater Mohali, Mundi Kharar, Kharar, Punjab 140301";
const HOURS = "9:00 AM – 9:30 PM";

const SERVICES = [
  { name: "Balayage", desc: "Sun-kissed color blending" },
  { name: "Blow Dry", desc: "Smooth & voluminous finish" },
  { name: "Body Waxing", desc: "Silky smooth skin care" },
  { name: "Braids", desc: "Intricate artful braiding" },
  { name: "Brazilian Waxing", desc: "Long-lasting smoothness" },
  { name: "Bridal Services", desc: "Complete bridal transformation" },
  { name: "Eyebrow Beautification", desc: "Defined & shaped brows" },
  { name: "Eyebrow Shaping", desc: "Perfectly arched brows" },
  { name: "Eyebrow Threading", desc: "Precise thread shaping" },
  { name: "Haircut", desc: "Precision cut & style" },
  { name: "Hair Extensions", desc: "Length & volume boost" },
  { name: "Hairstyling", desc: "Custom glamour looks" },
  { name: "Hair Threading", desc: "Smooth hair removal" },
  { name: "Lash Lift", desc: "Naturally lifted lashes" },
  { name: "Make-up", desc: "Flawless beauty looks" },
  { name: "Make-up Services", desc: "Full glam packages" },
  { name: "Manicure", desc: "Polished nail perfection" },
  { name: "Massage", desc: "Relaxing therapeutic care" },
  { name: "Microblading", desc: "Semi-permanent brow art" },
];

const GALLERY = [
  { src: "/assets/uploads/IMG_20260306_175703-4.jpg", label: "Bridal Makeup" },
  { src: "/assets/uploads/IMG_20260306_175734-1.jpg", label: "Bridal Look" },
  { src: "/assets/uploads/IMG_20260306_175746-3.jpg", label: "Nail Art" },
  { src: "/assets/uploads/IMG_20260306_175815-2.jpg", label: "Hair Styling" },
  { src: "/assets/uploads/IMG_20260306_175837-5.jpg", label: "Hair Waves" },
  { src: "/assets/uploads/IMG_20260306_175734-1-6.jpg", label: "Bridal Glam" },
];

const TESTIMONIALS = [
  {
    name: "Gurpreet Kaur",
    text: "Got my bridal makeup done here for my wedding in December — I honestly could not have asked for more. The team understood exactly the look I wanted, my skin looked flawless all day. Every guest was asking who did my makeup!",
    stars: 5,
  },
  {
    name: "Simran Dhaliwal",
    text: "I came for a balayage and left looking like a completely different person (in the best way!). Alex di and her team are so skilled with hair color. The salon is immaculate — clean, premium, and so welcoming.",
    stars: 5,
  },
  {
    name: "Neha Sharma",
    text: "Been coming here for eyebrow threading and lash lift for over a year now. No one in Kharar does it better — so precise and the lash lift lasts for weeks. Highly recommend to anyone in the area.",
    stars: 5,
  },
  {
    name: "Manpreet Sandhu",
    text: "Booked through WhatsApp which was so convenient. Got the pre-bridal package a week before my wedding and my skin was absolutely glowing. The manicure and body wax were also done to perfection.",
    stars: 5,
  },
  {
    name: "Divya Arora",
    text: "The hair extensions and blow dry I got here were stunning. My hair looked so natural and full. The staff is warm, professional and genuinely passionate about what they do. This is my forever salon!",
    stars: 5,
  },
];

const WHY_FEATURES = [
  {
    title: "Professional Staff",
    desc: "Trained, certified stylists with years of experience",
  },
  {
    title: "Premium Products",
    desc: "We use only top international beauty brands",
  },
  {
    title: "Hygienic Environment",
    desc: "Sanitized tools and clean spaces always",
  },
  {
    title: "Affordable Luxury",
    desc: "Premium experience at accessible prices",
  },
  {
    title: "Customer Satisfaction",
    desc: "Your happiness is our top priority",
  },
];

const PACKAGES = [
  {
    title: "Bridal Makeup Package",
    subtitle: "The Complete Bridal Look",
    inclusions: [
      "Full HD Bridal Makeup",
      "Professional Hair Styling",
      "Lash Lift & Extension",
      "Eyebrow Threading & Shaping",
      "Pre-Bridal Skin Prep",
      "Touch-Up Kit Included",
    ],
  },
  {
    title: "Pre-Wedding Package",
    subtitle: "Glow Before Your Big Day",
    inclusions: [
      "Luxury Facial Treatment",
      "Full Body Waxing",
      "Manicure & Pedicure",
      "Blow Dry & Styling",
      "Eyebrow Beautification",
      "Skin Brightening Mask",
    ],
  },
  {
    title: "Reception Package",
    subtitle: "Glamour for Your Special Night",
    inclusions: [
      "Glamour Makeup Application",
      "Hair Extensions & Updo",
      "Nail Art & Gel Polish",
      "Microblading (Optional)",
      "Contour & Highlight",
      "Setting Spray & Finish",
    ],
  },
];

// ─── Scroll Animation Hook ────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".fade-in-up, .fade-in");
    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Packages", href: "#packages" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      data-ocid="nav.section"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a
            href="#home"
            data-ocid="nav.link"
            className="flex items-center gap-3"
          >
            <img
              src="/assets/generated/salon-logo-transparent.dim_300x300.png"
              alt="Alex International Salon Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-gold text-base font-bold tracking-wide leading-none">
                Alex International
              </span>
              <span className="text-cream/60 text-[10px] tracking-[0.22em] uppercase mt-0.5">
                Salon · Kharar
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="nav.link"
                className="text-cream/75 hover:text-gold transition-colors duration-200 text-[11px] tracking-[0.18em] uppercase font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Book Now + Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.primary_button"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-gold text-gold hover:bg-gold hover:text-salon-black transition-all duration-300 text-[11px] tracking-[0.18em] uppercase font-semibold btn-gold"
            >
              Book Now
            </a>
            <button
              type="button"
              className="md:hidden text-cream p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-salon-black border-t border-gold/20">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="nav.link"
                className="text-cream/75 hover:text-gold transition-colors text-[11px] tracking-[0.18em] uppercase"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 border border-gold text-gold hover:bg-gold hover:text-salon-black transition-all duration-300 text-[11px] tracking-[0.18em] uppercase font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/uploads/IMG_20260306_175703-4.jpg')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-salon-black/65" />
      {/* Gold radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 38%, oklch(0.73 0.155 72 / 0.25) 0%, transparent 70%)",
        }}
      />
      {/* Noise texture */}
      <div className="absolute inset-0 hero-noise opacity-50" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-salon-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto fade-in visible">
        {/* Eyebrow line */}
        <div className="flex items-center justify-center gap-5 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="eyebrow !mb-0 tracking-[0.45em]">
            Kharar's Premier Luxury Salon
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Heading */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.0] mb-3 drop-shadow-2xl"
          style={{ fontWeight: 300, letterSpacing: "0.01em" }}
        >
          Luxury Beauty
          <span
            className="text-gold"
            style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            {" "}
            &amp; Hair
          </span>
        </h1>
        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream/90 mb-8 drop-shadow-lg"
          style={{ fontWeight: 300, letterSpacing: "0.03em" }}
        >
          Experience in{" "}
          <em style={{ fontStyle: "italic", fontWeight: 400 }}>Kharar</em>
        </h2>

        {/* Gold rule */}
        <div className="gold-divider max-w-[200px] mx-auto mb-6" />

        <p className="text-cream/65 text-base sm:text-lg font-serif-body mb-12 tracking-[0.12em] uppercase">
          Expert Hair · Bridal · Beauty Services
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.primary_button"
            className="btn-gold flex items-center gap-2.5 px-9 py-4 bg-gold text-salon-black font-semibold tracking-[0.2em] uppercase text-xs"
          >
            <SiWhatsapp size={15} />
            Book Now
          </a>
          <a
            href={PHONE_HREF}
            data-ocid="hero.secondary_button"
            className="btn-gold flex items-center gap-2.5 px-9 py-4 border border-gold/80 text-gold hover:bg-gold hover:text-salon-black transition-colors duration-300 font-semibold tracking-[0.2em] uppercase text-xs"
          >
            <Phone size={15} />
            Call Now
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-20 flex flex-col items-center gap-3">
          <div className="w-px h-14 bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
          <span className="text-gold/40 text-[10px] tracking-[0.5em] uppercase">
            Discover
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  const pillars = [
    {
      icon: <Sparkles size={22} />,
      title: "Expert Stylists",
      desc: "Trained professionals with years of artistry and passion",
    },
    {
      icon: <Star size={22} />,
      title: "Premium Products",
      desc: "Only top international brands for lasting, stunning results",
    },
    {
      icon: <CheckCircle size={22} />,
      title: "Hygienic Environment",
      desc: "Immaculate cleanliness standards maintained at all times",
    },
  ];

  return (
    <section
      id="about"
      data-ocid="about.section"
      className="py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="fade-in-up">
            <span className="eyebrow !text-gold-dark">About Us</span>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl text-salon-black leading-tight mb-5"
              style={{ fontWeight: 300, letterSpacing: "0.01em" }}
            >
              About{" "}
              <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
                Alex International
              </span>
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>Salon</em>
            </h2>
            <div className="gold-divider-left mb-8" />
            <p className="text-salon-black/70 text-base sm:text-lg leading-relaxed font-serif-body">
              Welcome to Alex International Salon, Kharar's premier destination
              for luxury hair and beauty services. Our team of expert stylists
              brings years of experience and a passion for perfection to every
              appointment.
            </p>
            <p className="text-salon-black/70 text-base sm:text-lg leading-relaxed font-serif-body mt-4">
              We use only the finest premium products to ensure stunning results
              and a truly indulgent experience. Our salon maintains the highest
              standards of hygiene, so you can relax and enjoy your
              transformation in comfort.
            </p>
            <p className="text-salon-black/70 text-base sm:text-lg leading-relaxed font-serif-body mt-4">
              Whether you're preparing for your wedding day or simply treating
              yourself, we deliver a personalized, five-star experience every
              time.
            </p>

            {/* 3 Pillars */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col gap-2 p-4 border border-gold/25 bg-white/70 hover:border-gold/50 transition-colors duration-200"
                >
                  <div className="text-gold">{p.icon}</div>
                  <div
                    className="font-display text-salon-black text-sm"
                    style={{ fontWeight: 700 }}
                  >
                    {p.title}
                  </div>
                  <div className="text-salon-black/55 text-xs leading-relaxed">
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 flex items-center gap-6">
              <div className="text-center">
                <div className="font-display text-3xl text-gold font-bold">
                  500+
                </div>
                <div className="text-salon-black/55 text-xs tracking-widest uppercase mt-1">
                  Happy Clients
                </div>
              </div>
              <div className="h-12 w-px bg-gold/30" />
              <div className="text-center">
                <div className="font-display text-3xl text-gold font-bold">
                  10+
                </div>
                <div className="text-salon-black/55 text-xs tracking-widest uppercase mt-1">
                  Years Experience
                </div>
              </div>
              <div className="h-12 w-px bg-gold/30" />
              <div className="text-center">
                <div className="font-display text-3xl text-gold font-bold">
                  19+
                </div>
                <div className="text-salon-black/55 text-xs tracking-widest uppercase mt-1">
                  Services
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="fade-in-up relative">
            <div className="relative overflow-hidden">
              <img
                src="/assets/uploads/IMG_20260306_175734-1.jpg"
                alt="Alex International Salon – Bridal Transformation"
                className="w-full h-80 lg:h-[480px] object-cover"
                loading="lazy"
              />
              {/* Gold frame offset */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/35 pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-salon-black p-5 shadow-gold-lg hidden lg:block">
              <div className="text-gold font-display text-sm font-bold tracking-widest uppercase">
                Since 2014
              </div>
              <div className="text-cream/60 text-xs mt-1">
                Kharar's Trusted Salon
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section
      id="services"
      data-ocid="services.section"
      className="py-24 lg:py-32 bg-salon-black"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-16 fade-in-up">
          <span className="eyebrow">What We Offer</span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.015em" }}
          >
            Our{" "}
            <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Services
            </span>
          </h2>
          <div className="gold-divider max-w-[180px] mx-auto" />
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => (
            <div
              key={service.name}
              data-ocid={`services.item.${i + 1}`}
              className="service-card fade-in-up border border-gold/30 p-6 bg-salon-charcoal hover:border-gold transition-all duration-300 cursor-default relative"
              style={{ transitionDelay: `${(i % 4) * 70}ms` }}
            >
              {/* Gold top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <div className="text-gold text-base mb-3 opacity-70">✦</div>
              <h3
                className="font-display text-cream text-sm mb-2 leading-snug"
                style={{ fontWeight: 600, letterSpacing: "0.01em" }}
              >
                {service.name}
              </h3>
              <p className="text-cream/45 text-xs leading-relaxed tracking-wide">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 fade-in-up">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 bg-gold text-salon-black font-semibold tracking-[0.2em] uppercase text-xs"
          >
            <SiWhatsapp size={16} />
            Book a Service
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Bridal & Special Packages ────────────────────────────────────────────────

function PackagesSection() {
  return (
    <section
      id="packages"
      data-ocid="packages.section"
      className="py-24 lg:py-32 bg-salon-black relative overflow-hidden"
    >
      {/* Gold decorative background element */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.73 0.155 72) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-16 fade-in-up">
          <span className="eyebrow">Exclusive Offers</span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.015em" }}
          >
            <em style={{ fontStyle: "italic" }}>Bridal</em> &amp;{" "}
            <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Special Packages
            </span>
          </h2>
          <div className="gold-divider max-w-[220px] mx-auto mb-6" />
          <p className="text-cream/55 text-sm tracking-wider max-w-xl mx-auto">
            Make your wedding day unforgettable with our exclusive curated
            packages, designed to deliver a royal transformation.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.title}
              data-ocid={`packages.item.${i + 1}`}
              className="package-card fade-in-up relative border border-gold/35 bg-salon-charcoal p-8 flex flex-col hover:border-gold hover:shadow-gold transition-all duration-400"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Number badge */}
              <div className="absolute -top-4 left-8">
                <div className="bg-gold text-salon-black w-8 h-8 flex items-center justify-center font-display font-bold text-sm">
                  0{i + 1}
                </div>
              </div>
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

              <div className="mt-3 mb-2">
                <h3
                  className="font-display text-gold text-lg"
                  style={{ fontWeight: 700, letterSpacing: "0.01em" }}
                >
                  {pkg.title}
                </h3>
                <p className="text-cream/45 text-xs tracking-wider mt-1">
                  {pkg.subtitle}
                </p>
              </div>

              <div className="gold-divider-left my-5" />

              <ul className="space-y-3 flex-grow mb-8">
                {pkg.inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-cream/75 text-sm"
                  >
                    <span className="text-gold mt-0.5 flex-shrink-0 text-xs">
                      ✦
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-salon-black transition-all duration-300 text-xs tracking-[0.18em] uppercase font-semibold"
              >
                <SiWhatsapp size={14} />
                Enquire on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

function GallerySection() {
  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      className="py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-12 fade-in-up">
          <span className="eyebrow !text-gold-dark">Portfolio</span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-salon-black mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.015em" }}
          >
            <em style={{ fontStyle: "italic" }}>Our</em>{" "}
            <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Work
            </span>
          </h2>
          <div className="gold-divider max-w-[140px] mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {GALLERY.map((item, i) => (
            <div
              key={item.src}
              data-ocid={`gallery.item.${i + 1}`}
              className="gallery-item relative overflow-hidden aspect-square fade-in-up group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={item.src}
                alt={`Alex International Salon – ${item.label}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Gold overlay on hover */}
              <div className="gallery-overlay absolute inset-0 bg-salon-black/55 opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 group-hover:opacity-100">
                <div className="text-gold text-lg">✦</div>
                <div className="text-gold text-xs tracking-[0.2em] uppercase font-display font-semibold">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center fade-in-up">
          <p className="text-salon-black/45 text-xs tracking-widest uppercase mb-4">
            Follow us for more looks & updates
          </p>
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-salon-black/40 text-salon-black hover:bg-salon-black hover:text-gold hover:border-salon-black transition-all duration-300 font-semibold tracking-widest uppercase text-xs"
          >
            <Instagram size={15} />
            @alex_international_salonkharar
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

function WhyChooseUsSection() {
  return (
    <section
      id="why"
      data-ocid="why.section"
      className="py-24 lg:py-32 bg-salon-charcoal"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 fade-in-up">
          <span className="eyebrow">Our Promise</span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.01em" }}
          >
            Why Choose{" "}
            <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Alex International
            </span>
          </h2>
          <div className="gold-divider max-w-[220px] mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {WHY_FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="fade-in-up text-center p-7 border border-gold/25 hover:border-gold/60 hover:shadow-gold transition-all duration-300 group relative overflow-hidden bg-salon-black/40"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Hover top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/0 group-hover:via-gold/70 to-transparent transition-all duration-500" />
              <div className="text-gold text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                ◆
              </div>
              <h3
                className="font-display text-cream text-sm mb-3"
                style={{ fontWeight: 700, letterSpacing: "0.04em" }}
              >
                {feature.title}
              </h3>
              <p className="text-cream/45 text-xs leading-relaxed tracking-wide">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section
      data-ocid="testimonials.section"
      className="py-24 lg:py-32 bg-salon-black"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 fade-in-up">
          <span className="eyebrow">Client Love</span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.01em" }}
          >
            What Our{" "}
            <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Clients Say
            </span>
          </h2>
          <div className="gold-divider max-w-[160px] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, i) => (
            <div
              key={review.name}
              data-ocid={`testimonials.item.${i + 1}`}
              className="fade-in-up border border-gold/30 p-7 bg-salon-charcoal hover:border-gold/60 hover:shadow-gold transition-all duration-400 relative overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Gold top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].slice(0, review.stars).map((n) => (
                  <Star
                    key={n}
                    size={12}
                    className="text-gold"
                    fill="currentColor"
                  />
                ))}
              </div>
              {/* Large quote mark */}
              <div
                className="font-display text-8xl leading-none text-gold/15 absolute top-4 right-5 select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <p className="text-cream/75 text-sm leading-loose font-serif-body mb-5 relative z-10">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-gold/50" />
                <div
                  className="font-display text-gold text-sm"
                  style={{ fontWeight: 600, letterSpacing: "0.05em" }}
                >
                  {review.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Location Section ─────────────────────────────────────────────────────────

function LocationSection() {
  return (
    <section
      id="location"
      data-ocid="location.section"
      className="py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 fade-in-up">
          <span className="eyebrow !text-gold-dark">Find Us</span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-salon-black mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.01em" }}
          >
            <em style={{ fontStyle: "italic" }}>Our</em>{" "}
            <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Location
            </span>
          </h2>
          <div className="gold-divider max-w-[140px] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Details */}
          <div className="fade-in-up flex flex-col justify-center gap-8">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="text-gold" size={18} />
                </div>
                <div>
                  <div className="font-display text-salon-black font-bold text-sm tracking-wide mb-1 uppercase">
                    Address
                  </div>
                  <p className="text-salon-black/65 text-sm leading-relaxed">
                    {ADDRESS}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-gold" size={18} />
                </div>
                <div>
                  <div className="font-display text-salon-black font-bold text-sm tracking-wide mb-1 uppercase">
                    Phone
                  </div>
                  <a
                    href={PHONE_HREF}
                    className="text-salon-black/65 text-sm hover:text-gold transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-gold" size={18} />
                </div>
                <div>
                  <div className="font-display text-salon-black font-bold text-sm tracking-wide mb-1 uppercase">
                    Working Hours
                  </div>
                  <p className="text-salon-black/65 text-sm">
                    Monday – Sunday: {HOURS}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-salon-black text-gold border border-salon-black hover:bg-gold hover:text-salon-black hover:border-gold transition-all duration-300 font-semibold tracking-widest uppercase text-xs btn-gold"
              >
                <MapPin size={15} />
                Get Directions
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gold/50 text-salon-black hover:bg-gold hover:text-salon-black hover:border-gold transition-all duration-300 font-semibold tracking-widest uppercase text-xs btn-gold"
              >
                <SiWhatsapp size={15} />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="fade-in-up flex flex-col gap-3">
            <div className="overflow-hidden border border-gold/30 relative group">
              <iframe
                data-ocid="location.map_marker"
                title="Alex International Salon Kharar Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.123!2d76.6!3d30.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQ1JzAwLjAiTiA3NsKwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Clickable overlay to open in Google Maps */}
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="location.map_marker"
                className="absolute inset-0 z-10 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Open in Google Maps"
              >
                <span className="bg-salon-black/85 text-gold px-5 py-2.5 text-xs tracking-widest uppercase font-semibold border border-gold/40 flex items-center gap-2">
                  <MapPin size={13} />
                  Open in Google Maps
                </span>
              </a>
            </div>
            {/* Standalone Map CTA */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 bg-salon-black border border-gold/30 hover:border-gold hover:bg-gold/10 transition-all duration-300 group"
            >
              <MapPin className="text-gold" size={16} />
              <span className="text-cream text-xs tracking-[0.22em] uppercase font-semibold group-hover:text-gold transition-colors duration-200">
                SCO 22, Nijjar Road, Near Western Tower, Kharar
              </span>
              <span className="text-gold/50 text-xs">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact / Booking Form ───────────────────────────────────────────────────

function ContactSection() {
  const { actor } = useActor();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setStatus("loading");
    try {
      await actor.submitBooking(
        formData.name,
        formData.phone,
        formData.service,
        formData.date,
        formData.time,
        BigInt(Date.now()),
      );
      setStatus("success");
      setFormData({ name: "", phone: "", service: "", date: "", time: "" });
    } catch (_err) {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-24 lg:py-32 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 fade-in-up">
          <span className="eyebrow !text-gold-dark">Appointments</span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-salon-black mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.01em" }}
          >
            <em style={{ fontStyle: "italic" }}>Book an</em>{" "}
            <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Appointment
            </span>
          </h2>
          <div className="gold-divider max-w-[160px] mx-auto" />
        </div>

        <div className="max-w-2xl mx-auto fade-in-up">
          {status === "success" ? (
            <div
              data-ocid="contact.success_state"
              className="text-center py-12 border border-gold/35 bg-white p-8"
            >
              <CheckCircle className="text-gold mx-auto mb-4" size={48} />
              <h3 className="font-display text-salon-black text-xl font-bold mb-2">
                Booking Request Sent!
              </h3>
              <p className="text-salon-black/65 mb-6 text-sm leading-relaxed">
                We'll confirm your appointment shortly. You can also reach us
                instantly via WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="px-6 py-3 border border-salon-black/30 text-salon-black hover:border-gold hover:text-gold transition-all duration-300 text-xs tracking-widest uppercase font-semibold"
                >
                  Book Another
                </button>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-salon-black font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-all duration-300 btn-gold"
                >
                  <SiWhatsapp size={15} />
                  Open WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === "error" && (
                <div
                  data-ocid="contact.error_state"
                  className="flex items-center gap-3 p-4 border border-red-400/50 bg-red-50 text-red-600"
                >
                  <AlertCircle size={18} />
                  <span className="text-sm">
                    Something went wrong. Please try again or contact us via
                    WhatsApp.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-gold-dark text-xs tracking-widest uppercase font-semibold block mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    data-ocid="contact.input"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Full Name"
                    className="w-full bg-white border border-salon-black/20 focus:border-gold text-salon-black placeholder-salon-black/30 px-4 py-3 text-sm outline-none transition-colors duration-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="text-gold-dark text-xs tracking-widest uppercase font-semibold block mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    data-ocid="contact.input"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="Mobile Number"
                    className="w-full bg-white border border-salon-black/20 focus:border-gold text-salon-black placeholder-salon-black/30 px-4 py-3 text-sm outline-none transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-service"
                  className="text-gold-dark text-xs tracking-widest uppercase font-semibold block mb-2"
                >
                  Service Required *
                </label>
                <select
                  id="contact-service"
                  name="service"
                  required
                  data-ocid="contact.select"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, service: e.target.value }))
                  }
                  className="w-full bg-white border border-salon-black/20 focus:border-gold text-salon-black px-4 py-3 text-sm outline-none transition-colors duration-200 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select a Service
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-date"
                    className="text-gold-dark text-xs tracking-widest uppercase font-semibold block mb-2"
                  >
                    Preferred Date *
                  </label>
                  <input
                    id="contact-date"
                    type="date"
                    name="date"
                    required
                    data-ocid="contact.input"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, date: e.target.value }))
                    }
                    className="w-full bg-white border border-salon-black/20 focus:border-gold text-salon-black px-4 py-3 text-sm outline-none transition-colors duration-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-time"
                    className="text-gold-dark text-xs tracking-widest uppercase font-semibold block mb-2"
                  >
                    Preferred Time *
                  </label>
                  <input
                    id="contact-time"
                    type="time"
                    name="time"
                    required
                    data-ocid="contact.input"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, time: e.target.value }))
                    }
                    className="w-full bg-white border border-salon-black/20 focus:border-gold text-salon-black px-4 py-3 text-sm outline-none transition-colors duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                data-ocid="contact.submit_button"
                className="w-full py-4 bg-gold text-salon-black font-semibold tracking-widest uppercase text-xs hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 btn-gold"
              >
                {status === "loading" ? (
                  <>
                    <Loader2
                      size={15}
                      className="animate-spin"
                      data-ocid="contact.loading_state"
                    />
                    Sending Request...
                  </>
                ) : (
                  "Send Booking Request"
                )}
              </button>

              {/* WhatsApp alternative */}
              <div className="text-center pt-2">
                <p className="text-salon-black/40 text-xs mb-3 tracking-wide">
                  Or book instantly via WhatsApp
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#25D366]/60 text-[#128c45] hover:bg-[#25D366]/10 transition-all duration-300 text-xs tracking-widest uppercase font-semibold"
                >
                  <SiWhatsapp size={15} />
                  Or Book Instantly on WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-ocid="footer.section"
      className="bg-salon-black border-t border-gold/15"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/salon-logo-transparent.dim_300x300.png"
                alt="Alex International Salon"
                className="w-12 h-12 object-contain"
              />
              <div>
                <div className="font-display text-gold text-base font-bold">
                  Alex International
                </div>
                <div className="text-cream/45 text-[10px] tracking-[0.22em] uppercase">
                  Salon · Kharar
                </div>
              </div>
            </div>
            <p className="text-cream/45 text-sm leading-relaxed mb-5">
              Kharar's premier destination for luxury hair and beauty services.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-gold/30 flex items-center justify-center text-gold/55 hover:text-gold hover:border-gold transition-colors duration-200"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 border border-gold/30 flex items-center justify-center text-gold/55 hover:text-gold hover:border-gold transition-colors duration-200"
              >
                <Facebook size={15} />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 border border-gold/30 flex items-center justify-center text-gold/55 hover:text-gold hover:border-gold transition-colors duration-200"
              >
                <SiWhatsapp size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-cream font-bold text-xs tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Bridal Packages", href: "#packages" },
                { label: "Gallery", href: "#gallery" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/45 text-sm hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-cream font-bold text-xs tracking-widest uppercase mb-5">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  className="text-gold/55 mt-0.5 flex-shrink-0"
                  size={14}
                />
                <p className="text-cream/45 text-sm leading-relaxed">
                  {ADDRESS}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gold/55 flex-shrink-0" size={14} />
                <a
                  href={PHONE_HREF}
                  className="text-cream/45 text-sm hover:text-gold transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-gold/55 flex-shrink-0" size={14} />
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/45 text-sm hover:text-gold transition-colors"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-cream font-bold text-xs tracking-widest uppercase mb-5">
              Working Hours
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between gap-4">
                <span className="text-cream/45 text-sm">Monday – Sunday</span>
                <span className="text-gold text-sm font-medium">{HOURS}</span>
              </div>
              <div className="gold-divider mt-4" />
              <div className="mt-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-salon-black transition-all duration-300 text-xs tracking-widest uppercase btn-gold"
                >
                  <SiWhatsapp size={12} />
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/30 text-xs tracking-wide">
            © {currentYear} Alex International Salon. All rights reserved.
          </p>
          <p className="text-cream/25 text-xs">
            Built with <span className="text-gold/50">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold/60 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp Button ─────────────────────────────────────────────────

function FloatingWhatsApp() {
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="fixed bottom-20 right-5 z-50 sm:bottom-8 flex flex-col items-end gap-2">
      {tooltip && (
        <div className="bg-salon-black border border-gold/30 text-cream text-xs px-3 py-1.5 whitespace-nowrap shadow-lg">
          Chat on WhatsApp
        </div>
      )}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
      >
        <SiWhatsapp size={26} />
      </a>
    </div>
  );
}

// ─── Sticky Call Bar (mobile) ─────────────────────────────────────────────────

function StickyCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <a
        href={PHONE_HREF}
        data-ocid="callbar.button"
        className="flex items-center justify-center gap-3 bg-gold text-salon-black py-4 font-semibold text-xs tracking-widest uppercase btn-gold"
      >
        <Phone size={15} />
        Call Now: {PHONE_DISPLAY}
      </a>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  useScrollReveal();

  return (
    <div className="bg-salon-black min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PackagesSection />
        <GallerySection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyCallBar />
    </div>
  );
}
