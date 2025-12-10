import React, { useEffect, useState } from "react";
import "./index.css";

const SKILLS = [
  { name: "UI Design (Figma)", level: 90, tag: "Design Systems" },
  { name: "UX Research", level: 82, tag: "User Flows" },
  { name: "Interaction / Motion", level: 86, tag: "Micro-animations" },
  { name: "React / Frontend", level: 84, tag: "SPA, Hooks" },
  { name: "HTML / CSS / JS", level: 92, tag: "Clean Semantics" },
  { name: "Design Handoff", level: 80, tag: "Dev-ready" },
];

const ROLES = ["UI/UX Designer", "MERN Stack Developer", "Programmer"];

const PROJECTS = [
  {
    title: "SaaS Analytics Dashboard",
    role: "UI/UX · Frontend",
    desc:
      "Interactive dashboard for product metrics with responsive layouts, dark theme, and reusable components.",
    tech: "React · Figma · Charting",
    details: "#", // TODO: replace with GitHub / case-study link
    demo: "#", // TODO: replace with live demo URL
  },
  {
    title: "Fintech Mobile Web App",
    role: "UI/UX · Prototype",
    desc:
      "Onboarding and money-transfer flows with a mobile-first design system and clear visual hierarchy.",
    tech: "Figma · Design System",
    details: "#",
    demo: "#",
  },
  {
    title: "Personal Portfolio",
    role: "UI/UX · Dev",
    desc:
      "A modern dark-mode portfolio built with React, featuring a typewriter hero, animated UI/UX orbit, project showcase, skills, and a contact section. Designed for recruiters and hiring managers.",
      tech: "React · CSS",
    details: "https://github.com/SohamDey80/Porfolio",
    demo: "#",
  },
];

function App() {
  // typewriter + nav state
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // header shadow on scroll
  useEffect(() => {
    const onScroll = () => {
      const headerEl = document.querySelector("header");
      if (!headerEl) return;
      if (window.scrollY > 12) {
        headerEl.style.boxShadow = "0 18px 40px rgba(15, 23, 42, 0.9)";
      } else {
        headerEl.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // typewriter effect for roles
  useEffect(() => {
    const currentFullRole = ROLES[roleIndex];

    const TYPING_SPEED = 110;
    const DELETING_SPEED = 60;
    const PAUSE_AT_END = 1100;
    const PAUSE_AT_START = 400;

    let timeoutId;

    if (!isDeleting) {
      // typing forward
      if (typedText.length < currentFullRole.length) {
        timeoutId = setTimeout(() => {
          setTypedText(currentFullRole.slice(0, typedText.length + 1));
        }, TYPING_SPEED);
      } else {
        // full word typed -> pause then start deleting
        timeoutId = setTimeout(() => setIsDeleting(true), PAUSE_AT_END);
      }
    } else {
      // deleting backward
      if (typedText.length > 0) {
        timeoutId = setTimeout(() => {
          setTypedText(currentFullRole.slice(0, typedText.length - 1));
        }, DELETING_SPEED);
      } else {
        // word fully deleted -> move to next role
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, PAUSE_AT_START);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [typedText, isDeleting, roleIndex]);

  const currentRole = ROLES[roleIndex]; // used for avatar subtitle

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleHireClick = () => {
    scrollToSection("contact");
  };

  const handleProjectsClick = () => {
    scrollToSection("projects");
  };

  const handleNavClick = (id) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  // contact form submit -> mailto
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "";
    const message = formData.get("message") || "";

    const subject = `Portfolio contact from ${name || "someone"}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;

    const to = "deysoham000@gmail.com";

    window.location.href = `mailto:${encodeURIComponent(
      to
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="app">
      {/* ================= HEADER ================= */}
      <header>
        <nav className="nav">
          <div className="nav-left">
            <div className="nav-logo">S</div>
            <div className="nav-title">
              <span className="nav-name">Soham Kumar Dey</span>
            </div>
          </div>

          {/* center nav links (desktop) */}
          <div className="nav-center">
            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          {/* right side: Download CV + mobile menu toggle */}
          <div className="nav-cta">
            <a href="/resume.pdf" download className="btn btn-primary">
              <span>Download CV</span>
            </a>

            <button
              type="button"
              className={`mobile-nav-toggle ${mobileOpen ? "is-open" : ""}`}
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>

        {/* Mobile nav dropdown */}
        <div className={`mobile-nav-menu ${mobileOpen ? "open" : ""}`}>
          <button
            type="button"
            className="mobile-nav-link"
            onClick={() => handleNavClick("about")}
          >
            About
          </button>
          <button
            type="button"
            className="mobile-nav-link"
            onClick={() => handleNavClick("skills")}
          >
            Skills
          </button>
          <button
            type="button"
            className="mobile-nav-link"
            onClick={() => handleNavClick("projects")}
          >
            Projects
          </button>
          <button
            type="button"
            className="mobile-nav-link"
            onClick={() => handleNavClick("contact")}
          >
            Contact
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main>
        <div className="shell">
          {/* HERO */}
          <div className="grid-main">
            <section className="hero-left">
              <div className="hero-chip">
                <span className="hero-chip-dot" />
                <span>Available for full-time &amp; freelance</span>
              </div>

              <h1 className="hero-heading">
                A{" "}
                <span className="highlight role-text">
                  {typedText}
                </span>
              </h1>

              <p className="hero-sub">
                I craft <strong>clean interfaces</strong> with{" "}
                <strong>usable, thoughtful user experiences</strong> — connecting
                product goals with what people actually need. From low-fidelity
                flows to interaction-rich hand-off ready screens.
              </p>

              <div className="hero-actions">
                <button className="btn btn-primary" onClick={handleHireClick}>
                  <span>Hire Me</span>
                </button>

                <button className="btn btn-ghost" onClick={handleProjectsClick}>
                  <span>View Projects</span>
                </button>
              </div>

              <div className="hero-meta">
                <div className="hero-meta-item">
                  <span className="hero-meta-label">Focus</span>
                  <span className="hero-meta-value">
                    Design Systems · Dashboards · SaaS
                  </span>
                </div>
                <div className="hero-meta-item">
                  <span className="hero-meta-label">Toolset</span>
                  <span className="hero-meta-value">
                    Figma · React · Framer Motion
                  </span>
                </div>
              </div>
            </section>

            {/* HERO RIGHT */}
            <section className="hero-right">
              <div className="hero-orbit">
                <div className="hero-avatar-ring">
                  <div className="hero-avatar-inner">
                    <div className="hero-avatar-circle">
                      <img
                        src="/image.jpg"
                        alt="Soham Kumar Dey"
                        className="hero-avatar-image"
                      />
                    </div>
                    <div className="hero-avatar-name">SOHAM KUMAR DEY</div>
                    <div className="hero-avatar-role role-text">
                      {currentRole}
                    </div>
                  </div>
                </div>

                <div className="orbit-card orbit-card--top">
                  <div className="orbit-icon-pill">⚡</div>
                  <div>
                    <div className="orbit-tag">Micro-interactions</div>
                    <div style={{ fontSize: "12px" }}>
                      Hover, press, motion states
                    </div>
                  </div>
                </div>

                <div className="orbit-card orbit-card--right">
                  <div className="orbit-icon-pill">🎨</div>
                  <div>
                    <div className="orbit-tag">Design Systems</div>
                    <div style={{ fontSize: "12px" }}>
                      Tokens, grids, components
                    </div>
                  </div>
                </div>

                <div className="orbit-card orbit-card--bottom">
                  <div className="orbit-icon-pill">📊</div>
                  <div>
                    <div className="orbit-tag">Dashboard UI</div>
                    <div style={{ fontSize: "12px" }}>
                      Admin · SaaS · Analytics
                    </div>
                  </div>
                </div>

                <span className="orbit-dot orbit-dot--1" />
                <span className="orbit-dot orbit-dot--2" />
                <span className="orbit-dot orbit-dot--3" />
              </div>
            </section>
          </div>

          {/* ABOUT + SKILLS */}
          <section id="about">
            <div className="section-header">
              <h2 className="section-title">About Me</h2>
              <span className="section-tag">who i am</span>
            </div>
            <div className="section-body">
              <div className="card">
                <p className="about-text">
                  I’m a <strong>UI/UX designer</strong> and{" "}
                  <strong>frontend engineer</strong> who loves turning
                  requirements into flows, wireframes, and production-ready
                  interfaces. I care a lot about{" "}
                  <strong>consistency, motion, and accessibility</strong>,
                  making sure the experience feels fast and intuitive.
                </p>
                <p className="about-text" style={{ marginTop: "10px" }}>
                  I’m comfortable collaborating with founders, PMs, and
                  engineers — from <strong>idea</strong> to{" "}
                  <strong>handoff</strong>. I enjoy working on complex
                  dashboards, SaaS tools, and modern web products.
                </p>

                <div className="about-list">
                  <div className="badge-pill">
                    <span className="badge-dot" />
                    1–2+ years design &amp; frontend
                  </div>
                  <div className="badge-pill">
                    <span className="badge-dot" />
                    Remote &amp; async friendly
                  </div>
                  <div className="badge-pill">
                    <span className="badge-dot" />
                    Open to full-time / freelance
                  </div>
                  <div className="badge-pill">
                    <span className="badge-dot" />
                    Comfortable with design critiques
                  </div>
                </div>
              </div>

              <div className="card" id="skills">
                <div className="section-header" style={{ marginBottom: 10 }}>
                  <h2 className="section-title">Core Skills</h2>
                  <span className="section-tag">what i do best</span>
                </div>

                <div className="skills-grid">
                  {SKILLS.map((skill) => (
                    <div key={skill.name} className="skill-card">
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-meta">
                        <span>{skill.tag}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-bar-fill"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects">
            <div className="section-header">
              <h2 className="section-title">Selected Projects</h2>
              <span className="section-tag">work i&apos;ve done</span>
            </div>

            <div className="projects-grid">
              {PROJECTS.map((project) => (
                <article key={project.title} className="project-card">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-role">{project.role}</span>
                  </div>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-meta">
                    <span className="project-tech">{project.tech}</span>

                    <div className="project-actions">
                      <a
                        href={project.details}
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn project-btn--ghost"
                      >
                        View Details
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn project-btn--primary"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="contact-section">
            <div className="section-header">
              <h2 className="section-title">Contact Me</h2>
              <span className="section-tag">let&apos;s talk</span>
            </div>

            <div className="contact-grid">
              {/* left: form */}
              <div className="card contact-card">
                <h3 className="contact-title">Let’s work together</h3>
                <p className="contact-sub">
                  Share a bit about your project or role and I&apos;ll get back
                  to you as soon as possible.
                </p>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="contact-form-row">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="contact-form-row">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="contact-form-row">
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+91 ..."
                    />
                  </div>

                  <div className="contact-form-row">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Tell me a bit about what you’re looking for…"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary contact-submit">
                    Send Message
                  </button>

                  <p className="contact-footnote">
                    Prefer email?{" "}
                    <a href="mailto:deysoham000@gmail.com">
                      deysoham000@gmail.com
                    </a>
                  </p>
                </form>
              </div>

              {/* right: info panel */}
              <div className="contact-side card">
                <div className="contact-hello-badge">👋 Hello!</div>
                <h3 className="contact-side-title">
                  Open to UI/UX &amp; Frontend opportunities
                </h3>
                <p className="contact-side-text">
                  I&apos;m currently looking for{" "}
                  <strong>full-time roles, freelance projects,</strong> and
                  collaborations on product-focused web apps.
                </p>
                <ul className="contact-list">
                  <li>Product &amp; dashboard design</li>
                  <li>Design systems &amp; component libraries</li>
                  <li>React frontends with clean, accessible UI</li>
                </ul>

                <div className="contact-side-meta">
                  <span>Based in India · working remote-friendly</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-left">
            <div>Let&apos;s build something together.</div>
            <div className="footer-email">
              Email:{" "}
              <a href="mailto:deysoham000@gmail.com">
                deysoham000@gmail.com
              </a>
            </div>
          </div>

          <div className="socials">
            <a
              href="https://github.com/SohamDey80"
              target="_blank"
              rel="noreferrer"
              className="social-btn social-github"
            >
              <span className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.34 6.84 9.69.5.09.68-.22.68-.48
                    0-.24-.01-.87-.01-1.7-2.48.55-3-1.22-3-1.22-.46-1.19-1.12-1.5-1.12-1.5-.92-.64.07-.63.07-.63
                    1.02.07 1.56 1.08 1.56 1.08.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-1.98-.23-4.06-1.02-4.06-4.54
                    0-1.01.35-1.84.93-2.48-.09-.23-.4-1.16.09-2.42 0 0 .75-.25 2.46.95a8.18 8.18 0 0 1 4.48 0c1.71-1.2
                    2.46-.95 2.46-.95.49 1.26.18 2.19.09 2.42.58.64.93 1.47.93 2.48 0 3.53-2.09 4.31-4.08 4.54.36.32.68.95.68 1.92
                    0 1.38-.01 2.49-.01 2.83 0 .26.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
                  />
                </svg>
              </span>
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/your-username"
              target="_blank"
              rel="noreferrer"
              className="social-btn social-linkedin"
            >
              <span className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.3 8.33h4.4V24H.3zM8.34 8.33h4.21v2.13h.06c.59-1.12 2.03-2.3 4.18-2.3 4.47 0 5.29 2.94 5.29 6.76V24h-4.4v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V24h-4.4z"
                  />
                </svg>
              </span>
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:deysoham000@gmail.com"
              className="social-btn social-email"
            >
              <span className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4a2
                    2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 13l8-6.99V6H4zm0 2.25V18h16V8.25l-7.4 5.14a2 2 0 0 1-2.2 0L4 8.25z"
                  />
                </svg>
              </span>
              <span>Email</span>
            </a>

            <a
              href="https://leetcode.com/your-username"
              target="_blank"
              rel="noreferrer"
              className="social-btn social-leetcode"
            >
              <span className="social-icon">
                <svg viewBox="0 0 256 256" fill="currentColor">
                  <path d="M175.5 210.9a12 12 0 0 1-6.4-1.9l-60-38.9a12 12 0 0 1 13-20.2l60 38.9a12 12 0 0 1-6.6 22.1Z" />
                  <path
                    d="M181.6 170H120a12 12 0 0 1 0-24h61.6a20 20 0 0 0 14.1-34.1l-66.3-66.4a20.1 20.1 0 0 0-28.3 0l-56.6 56.6a20.1 20.1 0 0 0 0 28.3l22.3 22.3a12 12 0 0 1-17 17L27.5 137a44.1 44.1 0 0 1 0-62.2l56.6-56.6a44.1 44.1 0 0 1 62.2 0l66.4 66.3A44 44 0 0 1 181.6 170Z"
                  />
                </svg>
              </span>
              <span>LeetCode</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
