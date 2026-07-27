"use client";

import { useState } from "react";

const links = {
  github: "https://github.com/KylianSu",
  scholar: "https://scholar.google.com/citations?user=C5UsLmgAAAAJ",
  linkedin:
    "https://www.linkedin.com/in/%E5%9D%A6-%E8%8B%8F-5022b33aa/",
  jamesCheng: "https://www.cse.cuhk.edu.hk/~jcheng/",
  binghuiXie:
    "https://scholar.google.com/citations?user=krUTLTkAAAAJ&hl=zh-CN",
  linGu: "https://sites.google.com/view/linguedu/home",
  ruoguFang: "https://lab-smile.github.io/",
  knowin: "https://knowinai.com/",
  ncsu: "https://www.ncsu.edu/",
  arxiv: "https://arxiv.org/abs/2605.13015",
  ieee: "https://ieeexplore.ieee.org/document/11139699/",
};

const researchExperience = [
  {
    period: "Jun. 2026 — Present",
    organization: "KNOWIN AI",
    role: "Algorithm Intern · Foundation Model Group",
    description:
      "Working closely with Dr. Binghui Xie on embodied spatial intelligence. I develop stereo-vision and multimodal data pipelines that convert real robot observations into grounded spatial-reasoning data for embodied vision-language models.",
    link: links.knowin,
    linkLabel: "KNOWIN AI",
    logos: [{ src: "/assets/institutions/knowin.svg", alt: "KNOWIN AI logo" }],
  },
  {
    period: "Mar. 2026 — Present",
    organization: "The Chinese University of Hong Kong",
    role: "Research Assistant · Department of Computer Science and Engineering",
    description:
      "Working under the supervision of Prof. James Cheng on the generalization of generative robot policies. My current work develops controlled, closed-loop environments for studying how data coverage, action representations, and generative consistency affect policy performance.",
    link: links.jamesCheng,
    linkLabel: "Prof. James Cheng",
    logos: [{ src: "/assets/institutions/cuhk-cse.png", alt: "CUHK CSE logo" }],
  },
  {
    period: "Sep. 2025 — Jun. 2026",
    organization: "University of Florida & The University of Tokyo",
    role: "Research Assistant · First-Author Researcher",
    description:
      "Worked with Prof. Ruogu Fang and Prof. Lin Gu on BTECF, a retinal-vessel counterfactual framework based on parametric Bézier trees. I independently built the complete codebase and end-to-end experimental pipeline, conducted all generative-model training, counterfactual and causal-analysis experiments, produced the figures, and led manuscript preparation for the first-author paper.",
    link: links.arxiv,
    linkLabel: "First-author paper",
    logos: [
      {
        src: "/assets/institutions/uf-clean.webp",
        alt: "University of Florida logo",
        className: "uf-logo",
      },
      { src: "/assets/institutions/utokyo.svg", alt: "The University of Tokyo logo" },
    ],
  },
  {
    period: "Jul. 2025 — Sep. 2025",
    organization: "North Carolina State University",
    role: "Summer Research Program Member",
    description:
      "Worked with Prof. Zhishan Guo on cyber-physical system optimization for healthcare. I investigated diffusion-based lower-limb motion prediction from a minimal set of inertial and pressure-insole signals and compared it with LSTM and TCN baselines.",
    link: links.ncsu,
    linkLabel: "NC State University",
    logos: [{ src: "/assets/institutions/ncsu.png", alt: "NC State University logo" }],
  },
  {
    period: "Jun. 2025 — Jul. 2025",
    organization: "Global Excellence Innovation Summer School",
    role: "Team Lead · Autonomous Waste-Collection Vessel",
    description:
      "Led a team in building a vision-guided surface vessel integrating waste detection, route planning, and robotic-arm collection. The project received the Silver Award.",
    logos: [{ src: "/assets/institutions/sustech.png", alt: "SUSTech logo" }],
  },
  {
    period: "Mar. 2025 — Present",
    organization: "Southern University of Science and Technology",
    role: "Project Lead · SUSTech Innovation and Entrepreneurship Training Program",
    description:
      "Leading a wearable muscle-monitoring project with Prof. Jiankun Wang and Prof. Qinghu Meng. I coordinate the team, optimize flexible temperature-sensor structures and placement, and integrate electromyography and humidity sensing to improve measurement robustness and wearability.",
    logos: [{ src: "/assets/institutions/sustech.png", alt: "SUSTech logo" }],
  },
  {
    period: "Dec. 2024 — Mar. 2025",
    organization: "Southern University of Science and Technology",
    role: "Project Lead · Co-First Author",
    description:
      "Working with Prof. Chenglong Fu of the Department of Mechanical and Energy Engineering, I developed an off-line self-calibration method for low-cost resistive insole pressure sensors, built the wearable sensing system, and contributed as co-first author to the oral paper published at IEEE RCAR 2025.",
    link: links.ieee,
    linkLabel: "IEEE RCAR paper",
    logos: [{ src: "/assets/institutions/sustech.png", alt: "SUSTech logo" }],
  },
];

const footballTeams = [
  {
    team: "SUSTech University Football Team",
    role: "Left winger · 2024 — Present",
    number: "No. 7",
    logo: {
      src: "/assets/institutions/sustech.png",
      alt: "SUSTech logo",
    },
    summary: "15 appearances · 10 goals",
    honors: [
      "2024 Shenzhen City Tournament — Third Place · 3 goals in 3 matches",
      "2025 Shenzhen City Tournament — Runner-up · 1 appearance",
      "2025 Governor's Cup — Round of 16 · 1 goal in 4 matches",
      "2026 Shenzhen Mengniu Cup — Runner-up · 2 goals in 4 matches",
      "2026 PHBS Invitational — Champion · 4 goals in 3 matches",
    ],
  },
  {
    team: "Zhicheng College Football Team",
    role: "Captain · Left winger / Attacking midfielder / Defensive midfielder",
    number: "No. 10",
    logo: {
      src: "/assets/football/zhicheng.jpg",
      alt: "Zhicheng College Football Team logo",
    },
    summary: "17 appearances · 9 goals · 15 wins, 1 draw, 1 loss",
    honors: [
      "2023 Freshman Cup — Champion · 2 goals in 4 matches",
      "2024 College Cup — Champion · 5 goals in 4 matches",
      "2025 College Cup — Champion · 3 appearances",
      "2025 Freshman Cup — Runner-up · 1 goal in 2 matches",
      "2026 College Cup — Champion · 1 goal in 4 matches",
    ],
  },
];

const awards = [
  {
    year: "2025",
    title: "Second-Class Scholarship",
    organization: "Southern University of Science and Technology",
  },
  {
    year: "2025",
    title: "Outstanding Student of the Academic Year",
    organization: "Southern University of Science and Technology",
  },
  {
    year: "2025",
    title: "Silver Award · Shokz Global Excellence Innovation Summer School",
    organization: "Global Excellence Innovation Summer School",
  },
];

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5h5v5M19 5l-9 9M18 13v6H5V6h6" />
    </svg>
  );
}

function ContactModal({ onEmail }) {
  return (
    <div id="contact" className="modal-backdrop" role="presentation">
      <a className="modal-dismiss" href="#about" aria-label="Close contact panel" />
      <section
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <a className="modal-close" href="#about" aria-label="Close contact panel">
          <span />
          <span />
        </a>
        <div className="modal-copy">
          <h2 id="contact-title">Contact</h2>
          <p>
            I welcome conversations about embodied AI, generative models,
            research opportunities, and potential collaborations.
          </p>
          <button className="email-button" type="button" onClick={onEmail}>
            <span>Email me</span>
            <span className="email-preview">Open your email app</span>
          </button>
        </div>
        <div className="wechat-card">
          <div className="qr-frame">
            <img src="/assets/contact/wechat.jpg" alt="WeChat QR code for Tan Su" />
          </div>
          <p>WeChat</p>
          <span>Please include a short introduction.</span>
        </div>
      </section>
    </div>
  );
}

function ProfileLink({ href, children }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer">
        <span>{children}</span>
        <ExternalIcon />
      </a>
    </li>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openEmail = () => {
    const account = [49, 50, 51, 49, 49, 51, 49, 54]
      .map((code) => String.fromCharCode(code))
      .join("");
    const host = ["mail", "sustech", "edu", "cn"].join(".");
    const email = `${account}@${host}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      "Hello Tan — research and collaboration"
    )}`;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="home-link" href="#about" onClick={closeMenu}>
            KylianSu
          </a>
          <button
            className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
          </button>
          <div className={menuOpen ? "nav-links is-open" : "nav-links"}>
            <a href="#publications" onClick={closeMenu}>Publications</a>
            <a href="#education" onClick={closeMenu}>Education</a>
            <a href="#research" onClick={closeMenu}>Research</a>
            <a href="#football" onClick={closeMenu}>Football</a>
            <a href="#awards" onClick={closeMenu}>Awards</a>
          </div>
        </nav>
      </header>

      <main id="main" className="page-shell">
        <aside className="profile-sidebar">
          <img
            className="profile-avatar"
            src="/assets/profile/github-avatar.jpg"
            alt="Portrait of Tan Su"
          />
          <div className="profile-heading">
            <h1>Tan Su</h1>
            <p>苏坦 · KylianSu</p>
          </div>
          <p className="profile-bio">
            Undergraduate at SUSTech. Researcher in embodied AI and generative models.
          </p>
          <ul className="profile-links">
            <li className="profile-location">Shenzhen, China</li>
            <li>
              <a href="#contact">Email / WeChat</a>
            </li>
            <ProfileLink href={links.github}>GitHub</ProfileLink>
            <ProfileLink href={links.scholar}>Google Scholar</ProfileLink>
            <ProfileLink href={links.linkedin}>LinkedIn</ProfileLink>
          </ul>
        </aside>

        <article className="content-column">
          <section className="content-section about-section" id="about">
            <h2>About Me</h2>
            <p>
              I am <strong>Tan Su (苏坦)</strong>, an undergraduate student
              majoring in Information Engineering in the Department of
              Electrical and Electronic Engineering at the{" "}
              <a href="https://www.sustech.edu.cn/en/" target="_blank" rel="noreferrer">
                Southern University of Science and Technology (SUSTech)
              </a>
              . I am currently a Research Assistant at the{" "}
              <a href="https://www.cse.cuhk.edu.hk/" target="_blank" rel="noreferrer">
                Department of Computer Science and Engineering, The Chinese
                University of Hong Kong
              </a>
              , under the supervision of{" "}
              <a href={links.jamesCheng} target="_blank" rel="noreferrer">
                Prof. James Cheng
              </a>
              , where I study embodied AI and the generalization of generative
              robot policies. I am also an Algorithm Intern in the Foundation
              Model Group at{" "}
              <a href={links.knowin} target="_blank" rel="noreferrer">
                KNOWIN AI
              </a>
              , working closely with{" "}
              <a href={links.binghuiXie} target="_blank" rel="noreferrer">
                Dr. Binghui Xie
              </a>
              {" "}on embodied spatial intelligence and multimodal robot-data
              pipelines. Previously, I was a Research Assistant with{" "}
              <a href={links.ruoguFang} target="_blank" rel="noreferrer">
                Prof. Ruogu Fang
              </a>{" "}
              at the University of Florida and{" "}
              <a href={links.linGu} target="_blank" rel="noreferrer">
                Prof. Lin Gu
              </a>{" "}
              at The University of Tokyo, where I worked on generative medical
              imaging and controllable counterfactual fundus-image generation.
            </p>
            <p>
              My research interests include <strong>embodied AI</strong>,{" "}
              <strong>diffusion-based generative models</strong>, and{" "}
              <strong>world models</strong>. My current work focuses on the generalization of
              generative robot policies and grounded spatial intelligence for
              embodied agents. I am actively seeking{" "}
              <strong>PhD or MPhil opportunities for Fall 2027 entry</strong>{" "}
              in Electrical Engineering, Computer Science, and Robotics. Please
              feel free to contact me by{" "}
              <a className="inline-contact" href="#contact">
                email or WeChat
              </a>
              .
            </p>

            <div className="overview-grid">
              <article className="overview-card">
                <h3>AI Researcher</h3>
                <ul>
                  <li>Embodied AI and robot learning</li>
                  <li>Diffusion-based generative policies and world models</li>
                  <li>Spatial perception, multimodal reasoning, and generalization</li>
                </ul>
              </article>
              <article className="overview-card">
                <h3>Football Player</h3>
                <ul>
                  <li>Captain of Zhicheng College Football Team</li>
                  <li>Left winger, attacking midfielder, and defensive midfielder</li>
                  <li>32 appearances and 19 goals across college and university teams</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="content-section" id="publications">
            <div className="section-title-row">
              <h2>Publications</h2>
              <a href={links.scholar} target="_blank" rel="noreferrer">
                Google Scholar <ExternalIcon />
              </a>
            </div>

            <article className="publication-card">
              <a className="publication-image" href={links.arxiv} target="_blank" rel="noreferrer">
                <img
                  src="/assets/papers/btecf-main.png"
                  alt="Overview of the Bézier Tree Encoding Counterfactual Framework"
                />
              </a>
              <div>
                <span className="venue">Preprint · 2026</span>
                <h3>
                  <a href={links.arxiv} target="_blank" rel="noreferrer">
                    A General Bézier Tree Encoding Counterfactual Framework for
                    Retinal-Vessel-Mediated Disease Analysis
                  </a>
                </h3>
                <p className="authors">
                  <strong>Tan Su</strong>, Ethan Elio Meidinger, Lin Gu, Ruogu Fang
                </p>
                <p>
                  A generative counterfactual framework that represents retinal
                  vascular networks as controllable parametric structures.
                </p>
                <a className="paper-link" href={links.arxiv} target="_blank" rel="noreferrer">
                  arXiv <ExternalIcon />
                </a>
              </div>
            </article>

            <article className="publication-card">
              <a className="publication-image" href={links.ieee} target="_blank" rel="noreferrer">
                <img
                  src="/assets/papers/rcar-main.png"
                  alt="Overview of the self-calibration method for pressure insoles"
                />
              </a>
              <div>
                <span className="venue">IEEE RCAR · 2025</span>
                <h3>
                  <a href={links.ieee} target="_blank" rel="noreferrer">
                    An Off-Line Self-Calibration Method for Resistive Insole
                    Pressure Sensors
                  </a>
                </h3>
                <p className="authors">
                  H. Wang, <strong>T. Su</strong>, S. Sun, H. Xian, Y. Zhang,
                  C. Fu, Y. Leng
                </p>
                <p>
                  A lightweight neural calibration method for improving
                  low-cost insole force measurements during real-world walking.
                </p>
                <a className="paper-link" href={links.ieee} target="_blank" rel="noreferrer">
                  IEEE Xplore <ExternalIcon />
                </a>
              </div>
            </article>
          </section>

          <section className="content-section" id="education">
            <h2>Education</h2>
            <div className="section-card">
              <article className="timeline-row">
                <div className="institution-logo">
                  <img src="/assets/institutions/sustech.png" alt="SUSTech logo" />
                </div>
                <div className="timeline-date">Sep. 2023 — Jun. 2027</div>
                <div className="timeline-content">
                  <h3>Southern University of Science and Technology</h3>
                  <p>B.Eng. candidate in Information Engineering</p>
                  <p>Department of Electrical and Electronic Engineering</p>
                  <p>Summer exchange at the University of Oxford, 2024.</p>
                </div>
              </article>
              <article className="timeline-row">
                <div className="institution-logo school-logo">
                  <img
                    src="/assets/institutions/hsfz.jpg"
                    alt="The Affiliated High School of South China Normal University logo"
                  />
                </div>
                <div className="timeline-date">Graduated 2023</div>
                <div className="timeline-content">
                  <h3>The Affiliated High School of South China Normal University</h3>
                  <p>University Preparatory Class</p>
                </div>
              </article>
            </div>
          </section>

          <section className="content-section" id="research">
            <h2>Research Experience</h2>
            <div className="section-card">
              {researchExperience.map((item) => (
                <article className="timeline-row" key={`${item.organization}-${item.period}`}>
                  <div className={item.logos.length > 1 ? "institution-logo logo-pair" : "institution-logo"}>
                    {item.logos.map((logo) => (
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className={logo.className || undefined}
                        key={logo.src}
                      />
                    ))}
                  </div>
                  <div className="timeline-date">{item.period}</div>
                  <div className="timeline-content">
                    <h3>{item.organization}</h3>
                    <p className="timeline-role">{item.role}</p>
                    <p>{item.description}</p>
                    {item.link ? (
                      <a className="detail-link" href={item.link} target="_blank" rel="noreferrer">
                        {item.linkLabel} <ExternalIcon />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section" id="football">
            <div className="section-title-row football-title-row">
              <h2>Football</h2>
              <p className="section-title-note">
                Manchester City · France national team supporter
              </p>
            </div>
            <div className="football-grid">
              {footballTeams.map((team) => (
                <article className="team-card" key={team.team}>
                  <div className="team-card-content">
                    <h3>{team.team}</h3>
                    <p className="team-role">{team.role}</p>
                    <p className="team-summary">{team.summary}</p>
                    <ul>
                      {team.honors.map((honor) => (
                        <li key={honor}>{honor}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="team-identity">
                    <div className="team-logo">
                      <img src={team.logo.src} alt={team.logo.alt} />
                    </div>
                    <span className="shirt-number">{team.number}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section" id="awards">
            <h2>Awards</h2>
            <div className="section-card award-list">
              {awards.map((award) => (
                <article className="award-row" key={`${award.year}-${award.title}`}>
                  <span>{award.year}</span>
                  <div>
                    <h3>{award.title}</h3>
                    <p>{award.organization}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer>
            <p>© {new Date().getFullYear()} Tan Su · KylianSu</p>
          </footer>
        </article>
      </main>

      <ContactModal onEmail={openEmail} />
    </>
  );
}
