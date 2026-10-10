import { useState, useEffect } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router";
import { Download, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Walkthrough", hash: "walkthrough" },
  { label: "Projects", hash: "projects" },
  { label: "Experience", hash: "experience" },
  { label: "Skills", hash: "skills" },
  { label: "Certificates", hash: "certificates" },
  { label: "Contact", hash: "contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-screen-2xl mx-auto px-8 sm:px-12 h-16 flex items-center justify-between">
        <a
          href="/"
          className="font-black text-lg tracking-tight text-foreground hover:text-primary transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          muhammad.kamal
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <li key={l.hash}>
              <a
                href={`/#${l.hash}`}
                onClick={(e) => handleNavClick(e, l.hash)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/Muhammad-Kamal-CV.pdf"
          download
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded hover:opacity-90 transition-opacity"
        >
          <Download size={13} />
          Download CV
        </a>

        <button
          className="md:hidden text-foreground p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.hash}
              href={`/#${l.hash}`}
              onClick={(e) => handleNavClick(e, l.hash)}
              className="text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Muhammad-Kamal-CV.pdf"
            download
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded w-fit"
          >
            <Download size={13} />
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-6 px-8 sm:px-12">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>© 2026 Muhammad Kamal. All Rights Reserved.</span>
        <span>Sargodha / Islamabad, Pakistan</span>
      </div>
    </footer>
  );
}

export default function Root() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
