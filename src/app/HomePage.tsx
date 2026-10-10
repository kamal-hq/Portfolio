import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Download,
  Play,
  ArrowRight,
  MapPin,
  Award,
  BarChart3,
  Megaphone,
  Palette,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  // ── Hackathon ────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Ascend AI",
    description:
      "Agentic scholarship & career co-pilot built for HEC GenAI Hackathon. Multi-agent CrewAI system with a live web scraper, faculty matcher that drafts cold emails, a research-trend agent pulling from Google Scholar & ArXiv, and a proposal drafter — backed by a 45+ scholarship database.",
    tags: ["Python", "CrewAI", "LangChain", "ChromaDB", "Streamlit", "Gemini"],
    category: "AI / ML",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "AdLens PK",
    description:
      "Meta Ad Library API analyzer for Pakistani marketers, built for the Alibaba Cloud AI Hackathon. Surfaces competitor ad intelligence, creative patterns, and estimated spend signals from Pakistan's ad landscape.",
    tags: ["Python", "Meta API", "Alibaba Cloud", "Analytics"],
    category: "Marketing Tech",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=450&fit=crop&auto=format",
  },

  // ── In Progress ──────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "13F Institutional Fund Flow Analyzer",
    description:
      "Pulls SEC EDGAR 13F filings to map institutional fund flows, surface position changes, and generate research-grade notes on investment thesis signals. Targeted at FactSet and equity research roles.",
    tags: ["Python", "SEC EDGAR", "SQLite", "Power BI"],
    category: "Data Analytics",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "AI-Automated Financial Report Pipeline",
    description:
      "End-to-end pipeline that ingests, parses, and summarizes financial reports using AI APIs — automating analyst prep work with measurable time savings. Built targeting HBL and banking BA roles.",
    tags: ["Python", "AI API", "Automation", "NLP"],
    category: "AI / ML",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=450&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "Business Problem Dashboard",
    description:
      "Problem-first Power BI dashboard covering retail performance, credit risk, and marketing ROI scenarios — built to demonstrate consulting-grade analytical thinking for Daraz and HBL roles.",
    tags: ["Power BI", "SQL", "DAX", "Data Modeling"],
    category: "Data Analytics",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&auto=format",
  },
  {
    id: 6,
    title: "Financial API Integration Demo",
    description:
      "REST API integration demo building live financial data pipelines with Python and cloud-light deployment. Designed to showcase engineering competency for Deloitte and fintech roles.",
    tags: ["REST API", "Python", "FastAPI", "Cloud"],
    category: "Fintech",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop&auto=format",
  },

  // ── Side Projects ────────────────────────────────────────────────────────────
  {
    id: 7,
    title: "TaskFlow",
    description:
      "Full-stack task management app — FastAPI + async SQLAlchemy backend, Kanban board with client-side filters, SVG analytics charts, and a custom Cyber-Precision design system (navy, electric cyan, blueprint grid).",
    tags: ["FastAPI", "SQLite", "Vanilla JS", "Python"],
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=450&fit=crop&auto=format",
  },
  {
    id: 8,
    title: "Automated Web Scrapers",
    description:
      "Custom scraping and intelligence tools integrating SerpApi, Brave Search, and Hunter APIs for lead generation, data collection, and market research workflows.",
    tags: ["Python", "SerpApi", "Brave Search", "Hunter API"],
    category: "Automation",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop&auto=format",
  },
  {
    id: 9,
    title: "TypeSimulator",
    description:
      "Python desktop utility that simulates realistic human keystrokes for automation workflows, built with customtkinter for the GUI and pynput for low-level input control.",
    tags: ["Python", "customtkinter", "pynput", "Desktop"],
    category: "Automation",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=450&fit=crop&auto=format",
  },

  // ── Client & Capstone ────────────────────────────────────────────────────────
  {
    id: 10,
    title: "ML Benchmark Pipelines",
    description:
      "Client-commissioned ML and cybersecurity benchmark pipelines applying Random Forest, XGBoost, 1D-CNN, LSTM, Autoencoders, K-Means clustering, and Q-learning agents across multiple problem domains.",
    tags: ["Python", "scikit-learn", "TensorFlow", "XGBoost"],
    category: "AI / ML",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=450&fit=crop&auto=format",
  },
  {
    id: 11,
    title: "Brand Booklets & Print Collateral",
    description:
      "Designed 3 professional brand booklets and full print collateral suites (flyers, standees, visiting cards) for SME clients through TriSyn Media — covering identity, messaging, and production-ready print files.",
    tags: ["Canva", "Adobe Suite", "Brand Design", "Print"],
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop&auto=format",
  },
  {
    id: 12,
    title: "Python Data Analysis Capstone",
    description:
      "Coursera capstone covering a full data pipeline: retrieving live data from APIs, processing with Python and Pandas, and building interactive visualizations — completed as part of the Python for Everybody Specialization.",
    tags: ["Python", "Pandas", "Matplotlib", "APIs"],
    category: "Data Analytics",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop&auto=format",
  },
];

const EXPERIENCE = [
  {
    id: 1,
    type: "Work",
    role: "Co-Founder & Lead Strategist",
    company: "TriSyn Media",
    period: "Nov 2025 – Oct 2026",
    bullets: [
      "Rebranded an artisan business for international market entry, leading name selection, logo design, product catalog, and full print collateral (flyers, standee, visiting cards), and migrating existing social accounts to the new identity across platforms.",
      "Retained a 10+ long-term client base by delivering data-driven marketing strategies and acquired first paying clients within 3 months through market segmentation and personalised outreach targeting local SMEs.",
    ],
  },
  {
    id: 2,
    type: "Work",
    role: "Social Media Manager Intern",
    company: "Public Administration Association of Pakistan",
    period: "Aug 2025 – Feb 2026",
    bullets: [
      "Grew the organisation's LinkedIn to 1,000+ organic followers with zero ad spend, publishing 160+ strategic posts and using monthly analytics to continuously refine content format, timing, and engagement rate.",
      "Sustained an upward engagement trend over 6 months by maintaining content consistency and adapting strategy based on monthly analytics.",
    ],
  },
  {
    id: 3,
    type: "Volunteer",
    role: "Ambassador — Lincoln Corner",
    company: "University of Sargodha",
    period: "Apr 2025 – Mar 2026",
    bullets: [
      "Progressed from attendee to facilitator, delivering sessions to university students on graphic design and to school students on space exploration and generative AI, including hands-on prompt engineering workshops.",
      "Grew from volunteer to operations lead over a 1-year tenure, independently planning events, coordinating speakers, and managing end-to-end execution across 50+ programmes serving 8,000+ visitors.",
    ],
  },
  {
    id: 4,
    type: "Volunteer",
    role: "Ambassador",
    company: "Bano Qabil, Alkhidmat Foundation",
    period: "Aug 2025 – Jan 2026",
    bullets: [
      "Recognised as a top-performing volunteer with a fully funded sponsorship to the International Volunteer Day (IVD 3.0) Conference, Islamabad, evaluated 2,000+ exam papers for result analytics and coordinated candidate registration and invigilation for 10,000+ students across a 500-person volunteer team.",
    ],
  },
  {
    id: 5,
    type: "Volunteer",
    role: "SMM / Media Head",
    company: "MFKNBS, University of Sargodha",
    period: "Dec 2025 – Present",
    bullets: [
      "Improved page consistency and content quality as Head of Media Society, leading a team of 8 to establish a structured publishing calendar, resulting in timely uploads and improved visibility after a period of irregular posting.",
    ],
  },
  {
    id: 6,
    type: "Volunteer",
    role: "Event Management Lead",
    company: "MFKNBS & WWIC, University of Sargodha",
    period: "Apr 2025 – Dec 2025",
    bullets: [
      "Delivered smooth execution across 3 large-scale institutional events, CEO Forum, SEE Pakistan Regional Round, and 3rd ICSB Conference, managing sponsor relations, stall allotments, and on-site logistics for 150+ student-led startups, resolving on-site challenges in real time and earning repeat assignment for all subsequent events.",
    ],
  },
];

const SKILL_GROUPS = [
  {
    category: "Data & Analytics",
    Icon: BarChart3,
    items: [
      "Python (Pandas, Viz)",
      "SQL (MySQL)",
      "Power BI",
      "Tableau",
      "MS Excel (Advanced)",
      "Data Visualization",
      "SPSS",
      "Statistical Analysis",
    ],
  },
  {
    category: "AI & Marketing",
    Icon: Megaphone,
    items: [
      "Digital Marketing",
      "SEO",
      "Social Media Marketing",
      "AI Automation",
      "Prompt Engineering",
      "Brand Strategy",
      "Content Strategy",
      "Campaign Analytics",
    ],
  },
  {
    category: "Design & Tools",
    Icon: Palette,
    items: [
      "Canva",
      "Graphic Design",
      "Adobe Suite",
      "HTML / CSS / JS",
      "Figma",
      "Git",
      "Google Workspace",
      "Project Management",
    ],
  },
];

const CERTIFICATES_FEATURED = [
  {
    id: 1,
    title: "McKinsey Forward Program",
    issuer: "McKinsey / Credly",
    year: "Jun 2026",
    url: "https://www.credly.com/badges/38354f21-6d7d-4119-9163-2d739f00d75e",
    image: "/certs/Forward20260629-32-qtn9d6.jpg"
  },
  {
    id: 2,
    title: "Google Digital Marketing & E-commerce Specialization",
    issuer: "Google / Coursera",
    year: "Jan 2026",
    url: "https://coursera.org/verify/specialization/A3WC44SLAHOQ",
    image: "/certs/Coursera A3WC44SLAHOQ.jpg"
  },
  {
    id: 3,
    title: "Google Prompting Essentials Specialization",
    issuer: "Google / Coursera",
    year: "Jan 2026",
    url: "https://coursera.org/verify/specialization/4IXLR5OBX1TU",
    image: "/certs/Coursera 4IXLR5OBX1TU.jpg"
  },
  {
    id: 4,
    title: "Python for Everybody Specialization",
    issuer: "Univ. of Michigan / Coursera",
    year: "Mar 2025",
    url: "https://coursera.org/verify/specialization/D4LG2BZMQQW1",
    image: "/certs/Coursera D4LG2BZMQQW1.jpg"
  },
  {
    id: 5,
    title: "Intuit Academy Bookkeeping Specialization",
    issuer: "Intuit / Coursera",
    year: "Jun 2025",
    url: "https://coursera.org/verify/specialization/9HURB96FLV6S",
    image: "/certs/Coursera 9HURB96FLV6S.jpg"
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      {/* <span className="h-px w-4 md:w-8 bg-primary block" /> */}
      <span className="text-primary text-[10px] md:text-xs font-semibold tracking-[0.06em] md:tracking-[0.18em] uppercase leading-snug">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[clamp(1.9rem,7vw,5.5rem)] font-black uppercase leading-[0.95] text-foreground"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h2>
  );
}

// ─── INTERSECTION ANIMATION ──────────────────────────────────────────────────

const NICHES = ["Marketing Strategy", "Data Analytics", "AI & Automation", "Brand Design"];

function IntersectionLine() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % NICHES.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div {...fadeUp(0.18)} className="flex flex-col gap-1">
      {/* Label line */}
      <p className="text-sm md:text-base text-muted-foreground font-normal tracking-wide">
        I sit at the intersection of
      </p>

      {/* Animated niche word — large and prominent */}
      <div className="relative inline-block w-fit">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-block text-[clamp(1.8rem,5vw,3.2rem)] font-black uppercase leading-none tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {NICHES[index]}
          </motion.span>
        </AnimatePresence>
        <motion.span
          key={`line-${index}`}
          className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary block rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 2.5,
            times: [0, 0.14, 0.82, 1],
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "left center" }}
        />
      </div>

      {/* Tagline */}
      <p className="text-sm md:text-base text-muted-foreground font-normal mt-2 max-w-md leading-relaxed">
        Turning data into decisions, ideas into brands, and models into products.
      </p>
    </motion.div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      className="relative h-auto md:h-[100svh] flex items-center pt-24 md:pt-16 pb-12 md:pb-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 10% 65%, rgba(255,101,32,0.13) 0%, transparent 55%), radial-gradient(ellipse at 80% 10%, rgba(255,101,32,0.07) 0%, transparent 50%), #08080f",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-screen-2xl mx-auto px-8 sm:px-12 py-6 w-full">
        <div className="max-w-5xl">
          <motion.div {...fadeUp(0)} className="mb-5 md:mb-7">
            <SectionLabel>Business × Technology × Design</SectionLabel>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.88] tracking-tight uppercase text-foreground mb-5 md:mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Muhammad
            <br />
            <span className="text-primary">Kamal.</span>
          </motion.h1>

          <IntersectionLine />

          <motion.div {...fadeUp(0.34)} className="mt-7 flex gap-3">
            <button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-2 px-4 py-2.5 md:px-7 md:py-3.5 text-sm md:text-base bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-all"
            >
              See Projects
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() =>
                document.getElementById("walkthrough")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 px-4 py-2.5 md:px-7 md:py-3.5 text-sm md:text-base border border-border text-foreground font-semibold rounded hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Play size={13} className="text-primary" fill="currentColor" />
              Read My Journey
            </button>
          </motion.div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-6 hidden lg:flex flex-col gap-3">
          {[
            { value: "15+", label: "Projects" },
            { value: "2+", label: "Years Exp." },
            { value: "70+", label: "Certificates" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp(0.3 + i * 0.08)}
              className="bg-card/80 backdrop-blur border border-border rounded-lg px-5 py-3 text-right"
            >
              <div
                className="text-3xl font-black text-primary leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 md:h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

function Walkthrough() {
  return (
    <section id="walkthrough" className="py-14 md:py-20 px-8 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-8 md:mb-12">
          <SectionLabel>The Story So Far</SectionLabel>
          <SectionHeading>Walkthrough</SectionHeading>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="relative rounded-2xl overflow-hidden bg-card border border-border aspect-video group cursor-pointer"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(255,101,32,0.08) 0%, transparent 65%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <button className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/25 group-hover:scale-110 transition-transform">
              <Play size={28} className="text-white ml-1" fill="white" />
            </button>
            <div className="text-center">
              <p className="text-foreground font-semibold text-sm">Journey Video</p>
              <p className="text-muted-foreground text-xs mt-1">
                Add your YouTube or Vimeo URL here
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ProjectCard({ p, i = 0 }: { p: (typeof PROJECTS)[0]; i?: number }) {
  return (
    <motion.article
      {...fadeUp(i * 0.06)}
      className="group bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-secondary">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        <span className="absolute top-3 left-3 text-xs text-primary font-semibold tracking-widest uppercase bg-background/80 backdrop-blur px-2.5 py-1 rounded-full">
          {p.category}
        </span>
        {p.status === "In Progress" && (
          <span className="absolute top-3 right-3 text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-1 rounded-full">
            In Progress
          </span>
        )}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href="#"
            className="w-7 h-7 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={13} />
          </a>
          <a
            href="#"
            className="w-7 h-7 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Live link"
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3
          className="text-xl font-bold text-foreground leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {p.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{p.description}</p>
        <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export { PROJECTS };

function Projects() {
  const featured = PROJECTS.slice(0, 3);
  return (
    <section id="projects" className="py-14 md:py-20">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12">
        <motion.div
          {...fadeUp(0)}
          className="flex items-end justify-between mb-8 md:mb-12 flex-wrap gap-4"
        >
          <div>
            <SectionLabel>Built to Solve</SectionLabel>
            <SectionHeading>Projects</SectionHeading>
          </div>
          <Link
            to="/projects"
            className="flex items-center gap-2 text-sm text-primary font-semibold hover:opacity-80 transition-opacity"
          >
            View All Projects
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Mobile: horizontal scroll — Desktop: grid */}
      <div className="md:hidden max-w-screen-2xl mx-auto">
        <div
          className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar"
          style={{ scrollSnapType: "x mandatory", overscrollBehaviorX: "contain", touchAction: "pan-x" }}
        >
          {featured.map((p, i) => (
            <div key={p.id} className="flex-none w-72" style={{ scrollSnapAlign: "start" }}>
              <ProjectCard p={p} i={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:block max-w-screen-2xl mx-auto px-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Certificates() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="certificates" className="py-14 md:py-20 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 mb-8 md:mb-12">
        <motion.div {...fadeUp(0)} className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <SectionLabel>Always Learning</SectionLabel>
            <SectionHeading>Certificates</SectionHeading>
          </div>
          <Link
            to="/certificates"
            className="flex items-center gap-2 text-sm text-primary font-semibold hover:opacity-80 transition-opacity"
          >
            View All Certificates
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      <div className="max-w-screen-2xl mx-auto overflow-hidden">
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto px-8 sm:px-12 pb-2 no-scrollbar"
          style={{ scrollSnapType: "x mandatory", overscrollBehaviorX: "contain", touchAction: "pan-x" }}
        >
        {CERTIFICATES_FEATURED.map((c, i) => (
          <motion.div
            key={c.id}
            {...fadeUp(i * 0.05)}
            className="flex-none w-60 md:w-72 bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-primary/40 transition-all"
            style={{ scrollSnapAlign: "start" }}
          >
            {c.image ? (
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden group">
                <img
                  src={`/certs/thumbs/${c.image.split('/').pop()?.replace(/\.[^/.]+$/, "")}-1440w.webp`}
                  width={720}
                  height={540}
                  loading="lazy"
                  decoding="async"
                  alt={c.title}
                  className="w-full h-auto object-contain transition-opacity duration-500"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
              </div>
            ) : (
              <div className="w-full aspect-[4/3] rounded-lg bg-secondary flex items-center justify-center group hover:bg-primary/10 transition-colors">
                <Award
                  size={28}
                  className="text-primary opacity-40 group-hover:opacity-70 transition-opacity"
                />
              </div>
            )}
            <div className="flex-1">
              <p className="text-foreground font-semibold text-sm leading-snug">{c.title}</p>
              <p className="text-muted-foreground text-xs mt-1">{c.issuer}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs font-semibold text-primary">{c.year}</span>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Verify <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>
        ))}

        {/* View all card */}
        <motion.div
          {...fadeUp(CERTIFICATES_FEATURED.length * 0.05)}
          className="flex-none w-60 md:w-72"
          style={{ scrollSnapAlign: "start" }}
        >
          <Link
            to="/certificates"
            className="h-full min-h-[220px] bg-card border border-dashed border-primary/30 rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:border-primary/60 hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ArrowRight size={18} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-foreground font-semibold text-sm">View All Certificates</p>
              <p className="text-muted-foreground text-xs mt-1">70+ credentials verified</p>
            </div>
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-14 md:py-20 px-8 sm:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-8 md:mb-12">
          <SectionLabel>Where I've Shown Up</SectionLabel>
          <SectionHeading>Experience</SectionHeading>
        </motion.div>

        <div className="relative flex flex-col gap-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border hidden md:block" />

          {EXPERIENCE.map((e, i) => (
            <motion.div key={e.id} {...fadeUp(i * 0.08)} className="md:pl-12 relative">
              <div className="absolute left-0 top-6 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background hidden md:block" />

              <div className="bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/30 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3
                        className="text-xl md:text-2xl font-bold text-foreground leading-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {e.role}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold self-center ${
                          e.type === "Work"
                            ? "bg-primary/15 text-primary"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {e.type}
                      </span>
                    </div>
                    <p className="text-primary text-sm font-semibold">{e.company}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full flex-none">
                    {e.period}
                  </span>
                </div>
                <ul className="flex flex-col gap-2">
                  {e.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1.5 flex-none">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-14 md:py-20 px-8 sm:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-8 md:mb-12">
          <SectionLabel>How I Operate</SectionLabel>
          <SectionHeading>Skills</SectionHeading>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((s, i) => (
            <motion.div
              key={s.category}
              {...fadeUp(i * 0.1)}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-none">
                  <s.Icon size={17} className="text-primary" />
                </div>
                <h3
                  className="font-bold text-foreground text-xl leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("https://formspree.io/f/xpwlqbwn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-14 md:py-20 px-8 sm:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div {...fadeUp(0)} className="mb-5 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-primary text-[10px] md:text-xs font-semibold tracking-[0.06em] md:tracking-[0.18em] uppercase leading-snug">Get in Touch</span>
          </div>
          <h2
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-black uppercase leading-[0.95] text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {"Let's Build"}
            <br />
            <span className="text-primary">{"Something."}</span>
          </h2>
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="text-muted-foreground mb-6 md:mb-10 leading-relaxed"
        >
          Open to full-time roles, research collaborations, freelance projects, and interesting
          problems.
        </motion.p>

        <motion.div {...fadeUp(0.14)} className="flex flex-wrap gap-3 mb-8 md:mb-12 justify-center">
          {[
            {
              Icon: Mail,
              label: "Email",
              href: "mailto:mk9633273@gmail.com",
            },
            {
              Icon: Linkedin,
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/muhammadkamalofficial",
            },
            { Icon: Github, label: "GitHub", href: "https://github.com/kamal-hq/" },
            { Icon: Download, label: "Download CV", href: "#" },
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 md:px-5 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
              aria-label={label}
            >
              <Icon size={14} />
              <span className="hidden md:inline">{label}</span>
            </a>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-left">
          <motion.div
            {...fadeUp(0.2)}
            className="bg-card border border-border rounded-xl p-6 md:p-8"
          >
            <h3
              className="text-2xl font-bold text-foreground mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Send a Message
            </h3>

            {sent ? (
              <div className="py-16 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xl font-black">✓</span>
                </div>
                <p className="text-foreground font-semibold text-sm">
                  {"Message sent! I'll get back to you soon."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>
                <textarea
                  placeholder="What would you like to discuss?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all w-full"
                >
                  Send Message
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            {...fadeUp(0.26)}
            className="hidden md:flex bg-card border border-border rounded-xl overflow-hidden min-h-72 relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108208.76133120258!2d72.6146311779341!3d32.05507889363637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39217439502694e3%3A0x55e1bad6edcbbc70!2sSargodha%2C%20Pakistan!5e0!3m2!1sen!2s!4v1791632529674!5m2!1sen!2s"
              className="w-full h-full min-h-72 border-0 grayscale"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Sargodha, Pakistan"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Walkthrough />
      <Projects />
      <Certificates />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}
