import { useNavigate } from "react-router-dom";
import { Linkedin, ExternalLink, Mail, Shield } from "lucide-react";
import { useFooter } from "@/contexts/FooterContext";
import { SERVICE_ROUTES } from "@/routes/common/routePaths";

export type FooterProps = {
  onBookDemo?: () => void;
  logoSrc?: string;
  className?: string;
};

const CURRENT_YEAR = new Date().getFullYear();

const serviceLinks: { label: string; path: string }[] = [
  { label: "AI Outreach", path: SERVICE_ROUTES.AI_OUTREACH },
  { label: "Pipeline Generation", path: SERVICE_ROUTES.PIPELINE_GENERATION },
  { label: "Hiring Infrastructure", path: SERVICE_ROUTES.HIRING_INFRASTRUCTURE },
  { label: "Calendar Intelligence", path: SERVICE_ROUTES.CALENDAR_INTELLIGENCE },
];

const legalLinks: { label: string; path: string }[] = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
  { label: "Cookie Policy", path: "/cookie-policy" },
];

export function Footer(props: FooterProps) {
  const { onBookDemo: propsOnBookDemo, className = "" } = props;
  const { value: contextValue } = useFooter();
  const onBookDemo = propsOnBookDemo ?? contextValue.onBookDemo;
  const logoSrc = "../../mylogo-light.png";
  const navigate = useNavigate();

  const handleBookDemo = () => {
    if (onBookDemo) {
      onBookDemo();
    } else {
      document.getElementById("guarantee")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className={`b2b-page py-10 sm:py-14 lg:py-16 px-4 sm:px-6 border-t border-white/10 bg-[var(--ink)] relative overflow-x-hidden ${className}`}
      role="contentinfo"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--blue)]/40 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto w-full min-w-0 relative">
        {/* Brand full width; Services | Platform side-by-side on all breakpoints (2-col row) */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-8 xl:gap-12 mb-10 sm:mb-12">
          <div className="col-span-2 min-w-0">
            <div className="flex items-center gap-3 mb-5">
              {logoSrc ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src={logoSrc}
                    alt="Schedley"
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src={logoSrc}
                    alt="Schedley"
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">Schedley</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md sm:max-w-sm mb-6">
              Intelligent scheduling and client acquisition. AI spam protection plus human-driven lead
              generation with guaranteed results.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/schedley-com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 rounded-xl bg-white/10 text-white hover:bg-[var(--blue)] hover:scale-105 transition-all items-center justify-center shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:notification@schedley.com"
                className="inline-flex h-11 w-11 rounded-xl bg-white/10 text-white hover:bg-[var(--blue)] hover:scale-105 transition-all items-center justify-center shadow-sm"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4 text-[var(--blue)]/90">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, path }) => (
                <li key={path}>
                  <button
                    type="button"
                    onClick={() => navigate(path)}
                    className="text-left text-white/75 hover:text-white text-sm transition-colors w-full break-words"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4 text-[var(--blue)]/90">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/carrer")}
                  className="text-white/75 hover:text-white text-sm transition-colors text-left w-full"
                >
                  Careers
                </button>
              </li>
              <li>
                <a href="#features" className="text-white/75 hover:text-white text-sm transition-colors block">
                  Features
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleBookDemo}
                  className="inline-flex items-center gap-1.5 text-white/75 hover:text-white text-sm transition-colors text-left"
                >
                  Book Demo
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </button>
              </li>
              <li>
                <a href="/contact" className="text-white/75 hover:text-white text-sm transition-colors block">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: meta + guarantee, then legal links (no "Legal" heading) */}
        <div className="pt-8 border-t border-white/10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-start gap-5">
            <div className="flex flex-col gap-4 min-w-0 flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-center gap-2 sm:gap-x-4 sm:gap-y-1 text-white/55 text-xs sm:text-sm">
                <span>© {CURRENT_YEAR} Schedley. All rights reserved.</span>
                <span className="hidden sm:inline text-white/30">·</span>
                <span className="hidden md:inline max-w-xl">Intelligent Scheduling & Client Acquisition</span>
                <span className="hidden sm:inline text-white/30">·</span>
                <a
                  href="mailto:notification@schedley.com"
                  className="hover:text-white transition-colors break-all sm:break-normal"
                >
                  notification@schedley.com
                </a>
              </div>
              <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-2 sm:gap-x-1" aria-label="Legal and policies">
                {legalLinks.map((link, i) => (
                  <span key={link.path} className="inline-flex items-center">
                    {i > 0 && <span className="text-white/30 mx-1.5 sm:mx-2 select-none" aria-hidden>·</span>}
                    <button
                      type="button"
                      onClick={() => navigate(link.path)}
                      className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors underline-offset-2 hover:underline"
                    >
                      {link.label}
                    </button>
                  </span>
                ))}
              </nav>
            </div>
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-full bg-[var(--blue)]/15 border border-[var(--blue)]/30 self-center sm:self-start w-full sm:w-auto shrink-0">
              <Shield className="w-4 h-4 text-[var(--blue)] shrink-0" />
              <span className="text-white/90 text-xs sm:text-sm font-medium text-center leading-snug">
                7-Day Guarantee Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
