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

export function Footer(props: FooterProps) {
  const { onBookDemo: propsOnBookDemo, logoSrc: propsLogoSrc, className = "" } = props;
  const { value: contextValue } = useFooter();
  const onBookDemo = propsOnBookDemo ?? contextValue.onBookDemo;
  const logoSrc = propsLogoSrc ?? contextValue.logoSrc;
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
      className={`b2b-page py-12 sm:py-16 px-4 sm:px-6 border-t border-white/10 bg-[var(--ink)] relative overflow-hidden ${className}`}
      role="contentinfo"
    >
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--blue)]/40 to-transparent" aria-hidden />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 xl:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              {logoSrc ? (
                <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-lg shrink-0 ring-1 ring-white/10">
                  <img src={logoSrc} alt="Schedley" className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-[var(--blue)] flex items-center justify-center shrink-0 shadow-lg shadow-[var(--blue)]/25">
                  <span className="text-white font-black text-xl">S</span>
                </div>
              )}
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">Schedley</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
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

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4 text-[var(--blue)]/90">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, path }) => (
                <li key={path}>
                  <button
                    type="button"
                    onClick={() => navigate(path)}
                    className="text-left text-white/75 hover:text-white text-sm transition-colors w-full"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4 text-[var(--blue)]/90">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/carrer")}
                  className="text-white/75 hover:text-white text-sm transition-colors text-left"
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
                  className="inline-flex items-center gap-1.5 text-white/75 hover:text-white text-sm transition-colors"
                >
                  Book Demo
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4 text-[var(--blue)]/90">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/privacy")}
                  className="text-white/75 hover:text-white text-sm transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/terms")}
                  className="text-white/75 hover:text-white text-sm transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/cookie-policy")}
                  className="text-white/75 hover:text-white text-sm transition-colors text-left"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="text-white/75 hover:text-white text-sm transition-colors text-left w-full"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-white/55 text-xs sm:text-sm text-center sm:text-left">
            <span>© {CURRENT_YEAR} Schedley. All rights reserved.</span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="hidden md:inline max-w-xl">
              Intelligent Scheduling & Client Acquisition
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <a href="mailto:notification@schedley.com" className="hover:text-white transition-colors">
              notification@schedley.com
            </a>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--blue)]/15 border border-[var(--blue)]/30">
            <Shield className="w-4 h-4 text-[var(--blue)] shrink-0" />
            <span className="text-white/90 text-xs sm:text-sm font-medium">7-Day Guarantee Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
