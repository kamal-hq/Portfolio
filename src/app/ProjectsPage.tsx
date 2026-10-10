import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { ProjectCard, PROJECTS } from "./HomePage";

const ALL_CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <main className="pt-20 md:pt-24 pb-16 md:pb-28 px-8 sm:px-12 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>

          <div className="flex items-center gap-2 md:gap-3 mb-3">
            {/* <span className="h-px w-4 md:w-8 bg-primary block" /> */}
            <span className="text-primary text-[10px] md:text-xs font-semibold tracking-[0.06em] md:tracking-[0.18em] uppercase">
              All Work
            </span>
          </div>
          <h1
            className="text-[clamp(1.9rem,7vw,5.5rem)] font-black uppercase leading-[0.95] text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Projects
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Data analytics, AI, design, and research — a full collection of things built,
            researched, and shipped.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 mb-10 overflow-x-auto no-scrollbar pb-1">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-none px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <ProjectCard key={`${active}-${p.id}`} p={p} i={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground text-center py-20">
            No projects in this category yet.
          </p>
        )}
      </div>
    </main>
  );
}
