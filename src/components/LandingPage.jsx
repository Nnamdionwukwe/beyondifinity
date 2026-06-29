import React, { useState, useEffect, useRef } from "react";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef(null);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      `.${styles.productCard}, .${styles.featureItem}, .${styles.heroFloatCard}, .${styles.bulkInner}, .${styles.locationGrid}, .${styles.ctaBannerInner}`,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition =
        "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)";
      observer.observe(el);
    });

    // Also observe hero stats
    const heroStats = document.querySelectorAll(`.${styles.heroStatNumber}`);
    heroStats.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
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

  const whatsappLink =
    "https://wa.me/2349152847491?text=Hello%20GadgetHub%20%F0%9F%91%8B%2C%20I%20want%20to%20buy%20some%20phone%20accessories!";
  const mapLink = "https://maps.app.goo.gl/Qft8yYY927inBUKV6?g_st=ic";

  return (
    <div className={styles.pageWrapper}>
      {/* Glow Orbs */}
      <div className={`${styles.glowOrb} ${styles.glowOrb1}`}></div>
      <div className={`${styles.glowOrb} ${styles.glowOrb2}`}></div>
      <div className={`${styles.glowOrb} ${styles.glowOrb3}`}></div>

      {/* ====== NAVBAR ====== */}
      <nav
        ref={navbarRef}
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.container}>
          <a href="#" className={styles.navbarBrand}>
            <span className={styles.navbarBrandIcon}>⚡</span>
            <span className={styles.navbarBrandLogo}>BEYOND INFINITY</span>
          </a>

          <ul
            className={`${styles.navbarLinks} ${isNavOpen ? styles.open : ""}`}
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
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navbarCta}
                onClick={closeNav}
              >
                📲 Buy Now
              </a>
            </li>
          </ul>

          <button
            className={`${styles.navbarHamburger} ${isNavOpen ? styles.active : ""}`}
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* ====== HERO ====== */}
      <section className={styles.hero} id="hero">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left Content */}
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
                  <span>📲</span> Buy on WhatsApp
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

            {/* Right – Floating Cards */}
            <div className={styles.heroVisual}>
              <div className={styles.heroVisualOrb}></div>
              <div className={styles.heroFloatingCards}>
                <div className={styles.heroFloatCard}>
                  <span className={styles.heroFloatIcon}>🔌</span>
                  <span className={styles.heroFloatText}>
                    All Chargers
                    <small>Type-C · Lightning · Car</small>
                  </span>
                </div>
                <div className={styles.heroFloatCard}>
                  <span className={styles.heroFloatIcon}>📱</span>
                  <span className={styles.heroFloatText}>
                    Phone Cases
                    <small>All models &amp; colors</small>
                  </span>
                </div>
                <div className={styles.heroFloatCard}>
                  <span className={styles.heroFloatIcon}>🎧</span>
                  <span className={styles.heroFloatText}>
                    Earbuds
                    <small>Wireless · Premium sound</small>
                  </span>
                </div>
                <div className={styles.heroFloatCard}>
                  <span className={styles.heroFloatIcon}>🔋</span>
                  <span className={styles.heroFloatText}>
                    Power Banks
                    <small>Fast charge · 20,000mAh</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PRODUCTS ====== */}
      <section className={styles.products} id="products">
        <div className={styles.container}>
          <div className={styles.productsHeader}>
            <div>
              <span className={styles.sectionTag}>⚡ Premium Gear</span>
              <h2 className={styles.sectionTitle}>Everything You Need</h2>
              <p className={styles.sectionSub}>
                From daily drivers to bulk party gifts — we've got you covered.
              </p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnPrimary}`}
              style={{ padding: "12px 28px", fontSize: "0.85rem" }}
            >
              View All →
            </a>
          </div>

          <div className={styles.productsGrid}>
            <div className={styles.productCard}>
              <span className={styles.productCardIcon}>🔌</span>
              <div className={styles.productCardName}>iPhone Chargers</div>
              <div className={styles.productCardDesc}>
                Lightning · Fast charge · MFI certified
              </div>
              <span className={styles.productCardBadge}>Popular</span>
            </div>
            <div className={styles.productCard}>
              <span className={styles.productCardIcon}>⚡</span>
              <div className={styles.productCardName}>Type-C Chargers</div>
              <div className={styles.productCardDesc}>
                PD 3.0 · 65W · For Android &amp; laptops
              </div>
              <span className={styles.productCardBadge}>Best Seller</span>
            </div>
            <div className={styles.productCard}>
              <span className={styles.productCardIcon}>🔋</span>
              <div className={styles.productCardName}>Power Banks</div>
              <div className={styles.productCardDesc}>
                10K–30K mAh · Fast charge · LED
              </div>
              <span className={styles.productCardBadge}>New</span>
            </div>
            <div className={styles.productCard}>
              <span className={styles.productCardIcon}>🎧</span>
              <div className={styles.productCardName}>Earbuds</div>
              <div className={styles.productCardDesc}>
                Bluetooth 5.3 · Noise cancelling
              </div>
              <span className={styles.productCardBadge}>Trending</span>
            </div>
            <div className={styles.productCard}>
              <span className={styles.productCardIcon}>📱</span>
              <div className={styles.productCardName}>Phone Cases</div>
              <div className={styles.productCardDesc}>
                All models · Silicone · Rugged · Clear
              </div>
              <span className={styles.productCardBadge}>Variety</span>
            </div>
            <div className={styles.productCard}>
              <span className={styles.productCardIcon}>🚗</span>
              <div className={styles.productCardName}>Car Chargers</div>
              <div className={styles.productCardDesc}>
                Dual USB · Fast charge · 12V/24V
              </div>
              <span className={styles.productCardBadge}>On-the-Go</span>
            </div>
            <div className={styles.productCard}>
              <span className={styles.productCardIcon}>📀</span>
              <div className={styles.productCardName}>Phone Holders</div>
              <div className={styles.productCardDesc}>
                Dashboard · Vent · Magnetic
              </div>
              <span className={styles.productCardBadge}>Essential</span>
            </div>
            <div className={styles.productCard}>
              <span className={styles.productCardIcon}>🎁</span>
              <div className={styles.productCardName}>Bulk / Souvenirs</div>
              <div className={styles.productCardDesc}>
                Party gifts · Corporate · Occasions
              </div>
              <span className={styles.productCardBadge}>Wholesale</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <span className={styles.sectionTag}>🌟 Why GadgetHub</span>
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
              <span className={styles.featureItemIcon}>🛡️</span>
              <div className={styles.featureItemTitle}>100% Genuine</div>
              <div className={styles.featureItemDesc}>
                All products sourced from trusted brands with authenticity
                guaranteed.
              </div>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureItemIcon}>📦</span>
              <div className={styles.featureItemTitle}>Bulk &amp; Retail</div>
              <div className={styles.featureItemDesc}>
                Buy single pieces or bulk — perfect for gifts, events, and
                corporate.
              </div>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureItemIcon}>📍</span>
              <div className={styles.featureItemTitle}>GSM Village Abuja</div>
              <div className={styles.featureItemDesc}>
                Located at Zone 1, Obasanjo Express Way — visit us anytime.
              </div>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureItemIcon}>💬</span>
              <div className={styles.featureItemTitle}>24/7 WhatsApp</div>
              <div className={styles.featureItemDesc}>
                Chat with us anytime. Fast replies, same-day pickup available.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== BULK / SPECIALS ====== */}
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
                style={{ padding: "18px 44px" }}
              >
                📦 Request Bulk Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== LOCATION ====== */}
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
                <span>📞</span> +234 915 284 7491
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
                  style={{ padding: "12px 28px", fontSize: "0.85rem" }}
                >
                  🗺️ Open in Google Maps
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnWhatsapp}`}
                  style={{ padding: "12px 28px", fontSize: "0.85rem" }}
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className={styles.locationMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.999!2d7.5!3d9.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDMnMDAuMCJOIDfCsDMwJzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1700000000000"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GadgetHub Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
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
              style={{ padding: "18px 50px", fontSize: "1.05rem" }}
            >
              📲 Buy Now — WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
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
                💬
              </a>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
              >
                📍
              </a>
              <a href="tel:+2349152847491" aria-label="Phone">
                📞
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
