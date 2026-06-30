import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaApple,
  FaBatteryFull,
  FaCar,
  FaGift,
  FaHeadphones,
  FaMobileAlt,
  FaPlug,
  FaUsb,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaShieldAlt,
  FaBoxes,
  FaClock,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import styles from "./LandingPage.module.css";

// ─── Product Data ──────────────────────────────────────────────
const baseProducts = [
  {
    id: 1,
    name: "SpaceBuds 2 oraimo",
    desc: "Lightning · Fast charge · MFI certified",
    icon: <FaApple />,
    badge: "Popular",
    image:
      "https://cdn-img.oraimo.com/fit-in/360x360/MA/product/2026/04/14/OTW-631-SPACEGREY-MAIN.png",
  },
  {
    id: 2,
    name: "OpenSnap Oraimo",
    desc: "PD 3.0 · 65W · For Android & Laptops",
    icon: <FaUsb />,
    badge: "Best Seller",
    image:
      "https://cdn-img.oraimo.com/fit-in/360x360/BD/product/2025/08/07/OPN-373-BLACK.png",
  },
  {
    id: 3,
    name: "OpenSnap N2 Oraimo",
    desc: "10K–30K mAh · Fast charge · LED display",
    icon: <FaBatteryFull />,
    badge: "New",
    image:
      "https://cdn-img.oraimo.com/fit-in/360x360/MA/product/2026/03/16/OPN-374N-BLACK-NEW.png",
  },
  {
    id: 4,
    name: "Oraimo PowerBox 400 Vision",
    desc: "Bluetooth 5.3 · Noise cancelling · Premium sound",
    icon: <FaHeadphones />,
    badge: "Trending",
    image:
      "https://cdn-img.oraimo.com/fit-in/360x360/NG/product/2024/10/16/1080.png",
  },
  {
    id: 5,
    name: " Traveller 12 Byte 20000mAh",
    desc: "All models · Silicone · Rugged · Clear",
    icon: <FaMobileAlt />,
    badge: "Variety",
    image:
      "https://cdn-img.oraimo.com/fit-in/360x360/KE/product/2024/09/03/OPB-1205N.png",
  },
  {
    id: 6,
    name: "AirDock Cooling Fan",
    desc: "Dual USB · Fast charge · 12V/24V",
    icon: <FaCar />,
    badge: "On-the-Go",
    image:
      "https://cdn-img.oraimo.com/fit-in/360x360/EG/product/2026/04/20/ODF-502A-MAIN.png",
  },
  {
    id: 7,
    name: "BoomPop Air Oraimo",
    desc: "Dashboard · Vent · Magnetic · Universal",
    icon: <FaMapMarkerAlt />,
    badge: "Essential",
    image:
      "https://cdn-img.oraimo.com/fit-in/360x360/KE/product/2026/04/13/oraimo-Headphone-BoomPop-Air-OHP-316-GRAVITYBLACK-mainimage.png",
  },
  {
    id: 8,
    name: "Watch Nova 2R 1.43",
    desc: "Party gifts · Corporate · Occasions",
    icon: <FaGift />,
    badge: "Wholesale",
    image:
      "https://cdn-img.oraimo.com/fit-in/360x360/KE/product/2026/04/28/oraimo-Smart-Watch-Watch-Nova-2R-OSW-834-mainimage.png",
  },
];

const carouselProducts = [
  ...baseProducts,
  {
    id: 9,
    name: "Swiss Charger",
    desc: "Qi-compatible · Fast charge · LED indicator",
    icon: <FaPlug />,
    badge: "New",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTySCHzulTg3SwtryQO32L6hNZZX26d0bN4OEVnVeKJ9w&s",
  },
  {
    id: 10,
    name: "Wall Charger",
    desc: "Fitness tracker · AMOLED · GPS",
    icon: <FaClock />,
    badge: "Premium",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmADmKjSwe5t0JxDFiiuoQX0lcdXFwRGliBiUVsFMgTA&s",
  },
  {
    id: 11,
    name: "MagSafe Wireless",
    desc: "Portable · 360° sound · Waterproof",
    icon: <FaHeadphones />,
    badge: "Bestseller",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStil49kz7q7uNUpxPSbdLc6H0asOUPlEdlBwJIdCL6wg&s=10",
  },
];

// ─── Image Carousel Component ────────────────────────────────
const ImageCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <div
      className={styles.carouselWrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((product) => (
          <div key={product.id} className={styles.carouselSlide}>
            <div className={styles.productCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                loading="lazy"
              />
              {/* <span className={styles.productCardIcon}>{product.icon}</span> */}
              <div className={styles.productCardName}>{product.name}</div>
              {/* <div className={styles.productCardDesc}>{product.desc}</div> */}
              <span className={styles.productCardBadge}>{product.badge}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        ❮
      </button>
      <button
        className={`${styles.carouselBtn} ${styles.carouselBtnRight}`}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        ❯
      </button>

      <div className={styles.carouselDots}>
        {items.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Main Landing Page ────────────────────────────────────────
const LandingPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved || "dark";
    }
    return "dark";
  });
  const navbarRef = useRef(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme handler
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    }
  }, [theme]);

  // Close nav on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target) &&
        isNavOpen
      ) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isNavOpen]);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll(
      `.${styles.featureItem}, .${styles.heroFloatCard}, .${styles.bulkInner}, .${styles.locationGrid}, .${styles.ctaBannerInner}`,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    revealElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition =
        "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Parallax orb effect
  useEffect(() => {
    const orbs = document.querySelectorAll(`.${styles.glowOrb}`);
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      orbs.forEach((orb, i) => {
        const speed = 0.02 + i * 0.01;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const whatsappLink =
    "https://wa.me/2349152847491?text=Hello%20BeyondInfinity%20%F0%9F%91%8B%2C%20I%20want%20to%20buy%20some%20phone%20accessories!";
  const mapLink = "https://maps.app.goo.gl/Qft8yYY927inBUKV6?g_st=ic";
  const IG =
    "https://www.instagram.com/beyondinfiniti__?igsh=YjU2MHN5eXA1MTFr&utm_source=qr";
  const TikTok =
    "https://www.tiktok.com/@beyondinfinity007?_r=1&_t=ZS-97d87MtUc44";

  return (
    <div className={styles.pageWrapper}>
      {/* Glow Orbs */}
      <div className={`${styles.glowOrb} ${styles.glowOrb1}`}></div>
      <div className={`${styles.glowOrb} ${styles.glowOrb2}`}></div>
      <div className={`${styles.glowOrb} ${styles.glowOrb3}`}></div>

      {/* ─── Navbar ─── */}
      <nav
        ref={navbarRef}
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.container}>
          <a href="#" className={styles.navbarBrand}>
            <img className={styles.navbarBrandIcon} src="/beyondInfinity.JPG" />
            <span className={styles.navbarBrandLogo}>BEYOND INFINITY</span>
          </a>

          {/* Use a single class for open state: navbarLinksOpen */}
          <ul
            className={`${styles.navbarLinks} ${
              isNavOpen ? styles.navbarLinksOpen : ""
            }`}
          >
            <li>
              <a href="#products" onClick={closeNav}>
                Products
              </a>
            </li>
            <li>
              <a href="#features" onClick={closeNav}>
                Why Us
              </a>
            </li>
            <li>
              <a href="#bulk" onClick={closeNav}>
                Bulk
              </a>
            </li>
            <li>
              <a href="#location" onClick={closeNav}>
                Visit Us
              </a>
            </li>
            <li>
              {/* Use a single class for light theme: themeToggleLight */}
              <button
                className={`${styles.themeToggle} ${
                  theme === "light" ? styles.themeToggleLight : ""
                }`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <span className={styles.toggleTrack}>
                  <FaSun />
                  <FaMoon />
                </span>
                <span className={styles.toggleThumb}></span>
              </button>
            </li>
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navbarCta}
                onClick={closeNav}
              >
                <FaWhatsapp /> Buy Now
              </a>
            </li>
          </ul>

          <button
            className={styles.navbarHamburger}
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className={styles.hero} id="hero">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot}></span>
                Abuja's #1 Gadget Store
              </div>
              <h1 className={styles.heroTitle}>
                Your <span className={styles.highlight}>One-Stop</span>
                <br />
                Phone Accessory Hub
              </h1>
              <p className={styles.heroDesc}>
                Premium chargers, cases, power banks, earbuds &amp; more — for
                iPhone, Android, and everything in between. Retail &amp; bulk
                available.
              </p>
              <div className={styles.heroActions}>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnWhatsapp}`}
                >
                  <FaWhatsapp /> Buy on WhatsApp
                </a>
                <a
                  href="#products"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Explore Products →
                </a>
              </div>
              <div className={styles.heroStats}>
                <div>
                  <div className={styles.heroStatNumber}>500+</div>
                  <div className={styles.heroStatLabel}>Products</div>
                </div>
                <div>
                  <div className={styles.heroStatNumber}>4.9★</div>
                  <div className={styles.heroStatLabel}>Customer Rating</div>
                </div>
                <div>
                  <div className={styles.heroStatNumber}>2K+</div>
                  <div className={styles.heroStatLabel}>Happy Clients</div>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroVisualOrb}></div>
              <div className={styles.heroFloatingCards}>
                <div className={styles.heroFloatCard}>
                  <span className={styles.heroFloatIcon}>
                    <FaPlug />
                  </span>
                  <span className={styles.heroFloatText}>
                    All Chargers <small>Type-C · Lightning · Car</small>
                  </span>
                </div>
                <div className={styles.heroFloatCard}>
                  <span className={styles.heroFloatIcon}>
                    <FaMobileAlt />
                  </span>
                  <span className={styles.heroFloatText}>
                    Phone Cases <small>All models &amp; colors</small>
                  </span>
                </div>
                <div className={styles.heroFloatCard}>
                  <span className={styles.heroFloatIcon}>
                    <FaHeadphones />
                  </span>
                  <span className={styles.heroFloatText}>
                    Earbuds <small>Wireless · Premium sound</small>
                  </span>
                </div>
                <div className={styles.heroFloatCard}>
                  <span className={styles.heroFloatIcon}>
                    <FaBatteryFull />
                  </span>
                  <span className={styles.heroFloatText}>
                    Power Banks <small>Fast charge · 20,000mAh</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Products ─── */}
      <section className={styles.products} id="products">
        <div className={styles.container}>
          <div className={styles.productsHeader}>
            <div>
              <span className={styles.sectionTag}>⚡ Premium Gear</span>
              <h2 className={styles.sectionTitle}>Featured Products</h2>
              <p className={styles.sectionSub}>
                Explore our best-selling accessories and gadgets.
              </p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              View All →
            </a>
          </div>

          <ImageCarousel items={carouselProducts} />

          <div className={styles.productsGrid}>
            {baseProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                  loading="lazy"
                />
                {/* <span className={styles.productCardIcon}>{product.icon}</span> */}
                <div className={styles.productCardName}>{product.name}</div>
                {/* <div className={styles.productCardDesc}>{product.desc}</div> */}
                <span className={styles.productCardBadge}>{product.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <span className={styles.sectionTag}>🌟 Why Beyond Infinity</span>
            <h2
              className={styles.sectionTitle}
              style={{
                WebkitTextFillColor: "unset",
                color: "var(--text-primary)",
                background: "none",
              }}
            >
              Built for{" "}
              <span
                style={{
                  background: "var(--accent-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Quality &amp; Trust
              </span>
            </h2>
            <p className={styles.sectionSub} style={{ margin: "0 auto" }}>
              Serving Abuja with premium accessories, expert advice, and
              unbeatable prices.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <span className={styles.featureItemIcon}>
                <FaShieldAlt />
              </span>
              <div className={styles.featureItemTitle}>100% Genuine</div>
              <div className={styles.featureItemDesc}>
                All products sourced from trusted brands with authenticity
                guaranteed.
              </div>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureItemIcon}>
                <FaBoxes />
              </span>
              <div className={styles.featureItemTitle}>Bulk &amp; Retail</div>
              <div className={styles.featureItemDesc}>
                Buy single pieces or bulk — perfect for gifts, events, and
                corporate.
              </div>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureItemIcon}>
                <FaMapMarkerAlt />
              </span>
              <div className={styles.featureItemTitle}>GSM Village Abuja</div>
              <div className={styles.featureItemDesc}>
                Located at Zone 1, Obasanjo Express Way — visit us anytime.
              </div>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureItemIcon}>
                <FaClock />
              </span>
              <div className={styles.featureItemTitle}>24/7 Support</div>
              <div className={styles.featureItemDesc}>
                Chat with us anytime via WhatsApp. Same-day pickup available.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bulk ─── */}
      <section className={styles.bulk} id="bulk">
        <div className={styles.container}>
          <div className={styles.bulkInner}>
            <div className={styles.bulkContent}>
              <span
                className={styles.sectionTag}
                style={{ marginBottom: "10px" }}
              >
                🎉 Bulk &amp; Gifts
              </span>
              <h2>
                Perfect for{" "}
                <span
                  style={{
                    background: "var(--accent-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Souvenirs &amp; Parties
                </span>
              </h2>
              <p>
                Need 50+ phone accessories for an event, corporate gift, or
                party favor? We've got you covered with custom bulk packages at
                wholesale prices.
              </p>
              <div className={styles.bulkTags}>
                <span className={styles.bulkTag}>🎂 Birthdays</span>
                <span className={styles.bulkTag}>💼 Corporate</span>
                <span className={styles.bulkTag}>🎊 Weddings</span>
                <span className={styles.bulkTag}>🏆 Events</span>
                <span className={styles.bulkTag}>🎁 Souvenirs</span>
              </div>
            </div>
            <div className={styles.bulkAction}>
              <a
                href="https://wa.me/2349152847491?text=Hello%20GadgetHub%20%F0%9F%91%8B%2C%20I%20need%20bulk%20phone%20accessories%20for%20an%20event!"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                <FaWhatsapp /> Request Bulk Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Location ─── */}
      <section className={styles.location} id="location">
        <div className={styles.container}>
          <div className={styles.locationGrid}>
            <div className={styles.locationInfo}>
              <span className={styles.sectionTag}>📍 Visit Us</span>
              <h2>
                Find Us at{" "}
                <span
                  style={{
                    background: "var(--accent-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  GSM Village
                </span>
              </h2>
              <p className={styles.address}>
                Zone 1, Obasanjo Express Way,
                <br />
                GSM Village, Abuja.
              </p>
              <p style={{ color: "var(--text-secondary)", marginTop: "4px" }}>
                Open Monday – Saturday · 9AM – 7PM
              </p>
              <a href="tel:+2349152847491" className={styles.phone}>
                <FaWhatsapp /> +234 915 284 7491
              </a>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  🗺️ Open in Google Maps
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnWhatsapp}`}
                >
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className={styles.locationMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.999!2d7.5!3d9.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDMnMDAuMCJOIDfCsDMwJzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1700000000000"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Beyond Infinity Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className={styles.ctaBanner}>
        <div className={styles.container}>
          <div className={styles.ctaBannerInner}>
            <h2>
              Ready to{" "}
              <span
                style={{
                  background: "var(--accent-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Level Up
              </span>{" "}
              Your Phone?
            </h2>
            <p>
              From fast chargers to sleek cases — get the best accessories in
              Abuja. Tap the button below and let's talk on WhatsApp.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnWhatsapp}`}
            >
              <FaWhatsapp /> Buy Now — WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              ⚡ <span>BEYOND INFINITY</span> · Abuja
            </div>
            <div className={styles.footerCopy}>
              &copy; 2026 BEYOND INFINITY — Premium Phone Accessories
            </div>
            <div className={styles.footerSocials}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href={IG}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href={TikTok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
              >
                <FaMapMarkerAlt />
              </a>
              <a href="tel:+2349152847491" aria-label="Phone">
                <FaMobileAlt />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
