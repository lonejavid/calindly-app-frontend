import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, Menu, X } from "lucide-react";

const TALENT_FORM_ID = "talent-form";

const ROLE_OPTIONS = [
  "Select a role",
  "Backend Engineer",
  "Frontend Developer",
  "Full Stack Engineer",
  "DevOps Engineer",
  "AI Engineer",
  "Data Engineer",
  "Product Manager",
  "UI/UX Designer",
] as const;

const TIMELINE_OPTIONS = [
  "Select timeline",
  "ASAP (This week)",
  "Within 2 weeks",
  "Within a month",
  "Flexible",
] as const;

type FormData = {
  companyName: string;
  role: string;
  requiredSkills: string;
  contractType: "Contractor" | "Full-Time";
  timeline: string;
  email: string;
};

const initialFormData: FormData = {
  companyName: "",
  role: "",
  requiredSkills: "",
  contractType: "Contractor",
  timeline: "",
  email: "",
};

export default function TalentHiringPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setShowStickyCta(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const validateForm = (): boolean => {
    const err: Partial<Record<keyof FormData, string>> = {};
    if (!formData.companyName.trim()) err.companyName = "Company name is required";
    if (!formData.role || formData.role === ROLE_OPTIONS[0]) err.role = "Please select a role";
    if (!formData.requiredSkills.trim()) err.requiredSkills = "Required skills are required";
    if (!formData.timeline || formData.timeline === TIMELINE_OPTIONS[0]) err.timeline = "Please select a timeline";
    if (!formData.email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) err.email = "Please enter a valid email";
    setFormErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Talent request submitted:", formData);
    setSubmitSuccess(true);
    setFormData(initialFormData);
    setFormErrors({});
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const updateForm = (field: keyof FormData, value: string | "Contractor" | "Full-Time") => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* 1. NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 font-black text-white text-lg">
              S
            </span>
            <span className="font-bold text-white">Schedley</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-white transition text-sm font-medium">
              Back to Main
            </Link>
            <a href="#about" className="text-gray-300 hover:text-white transition text-sm font-medium">
              About
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToForm}
              className="px-6 py-2.5 border-2 border-purple-500 hover:bg-purple-500/10 text-purple-300 font-bold rounded-full text-sm transition"
            >
              Book Call
            </button>
            <button
              type="button"
              onClick={scrollToForm}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-bold rounded-full text-sm transition transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              Request Talent
            </button>
          </div>
          <button
            type="button"
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-purple-500/20 px-6 py-4 flex flex-col gap-4">
            <Link to="/" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              Back to Main
            </Link>
            <a href="#about" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <button type="button" onClick={scrollToForm} className="text-left text-purple-300 font-medium">
              Book Call
            </button>
            <button
              type="button"
              onClick={scrollToForm}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold rounded-full w-fit"
            >
              Request Talent
            </button>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-cyan-900/20 border border-purple-500/20 text-gray-300 text-sm font-medium mb-6">
              👨‍💻 Global Talent Network
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Hire Pre-Vetted
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Global Engineers
              </span>
              <br />
              <span className="text-white">Without Hiring Risk</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-xl">
              Schedley helps startups and tech companies hire top engineers and technical contractors quickly without
              payroll or compliance complexity.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={scrollToForm}
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-bold rounded-full text-lg transition transform hover:scale-105 shadow-lg shadow-cyan-500/30"
              >
                Request Talent
              </button>
              <button
                type="button"
                onClick={scrollToForm}
                className="px-8 py-4 border-2 border-purple-500 hover:bg-purple-500/10 text-purple-300 font-bold rounded-full text-lg transition"
              >
                Book Hiring Consultation
              </button>
            </div>
            <div className="mt-10 p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 flex flex-wrap gap-8">
              <div>
                <div className="text-2xl font-black text-white">150+</div>
                <div className="text-sm text-gray-400">Engineers Hired</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">2-3 weeks</div>
                <div className="text-sm text-gray-400">Avg Hiring Time</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">45+</div>
                <div className="text-sm text-gray-400">countries Global Talent Pool</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition space-y-4">
              <div className="text-sm font-bold text-gray-400 mb-4">Developer dashboard</div>
              {[
                { name: "Alex K.", exp: "8y", skills: "Python, AWS, Kubernetes", available: true },
                { name: "Maria S.", exp: "6y", skills: "React, Node.js", available: true },
                { name: "James L.", exp: "7y", skills: "DevOps, Docker, AWS", available: true },
              ].map((c) => (
                <div
                  key={c.name}
                  className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-white">{c.name}</div>
                    <div className="text-sm text-gray-400">{c.exp} · {c.skills}</div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                    Available
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-4 text-white">Hiring Engineers Is Slow and Expensive</h2>
          <p className="text-xl text-gray-400 mb-12">The traditional hiring process breaks down at scale</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⏱️", title: "Hiring Takes Months", desc: "Traditional recruiting takes 3-6 months per hire" },
              { icon: "😞", title: "Top Engineers Rarely Apply", desc: "Best talent is passive and hard to reach" },
              { icon: "📋", title: "Payroll & Compliance", desc: "Full-time hiring means complex HR overhead" },
              { icon: "⚠️", title: "Full-Time Hiring Risk", desc: "Recruiting costs + severance add up quickly" },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition"
              >
                <div className="text-2xl mb-2">{card.icon}</div>
                <h3 className="font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-red-900/20 to-slate-900/50 border border-slate-700/50 text-left max-w-3xl mx-auto">
            <p className="text-base text-gray-300">
              Companies struggle to hire technical talent quickly because they're stuck with outdated recruiting methods
              that don't scale with startup growth.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SOLUTION SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-5xl font-black mb-4 text-white">Schedley Talent Infrastructure</h2>
            <p className="text-xl text-gray-400 mb-4">Fast, flexible, global hiring without the complexity</p>
            <p className="text-base text-gray-300 mb-8">
              Schedley helps companies source experienced engineers globally and onboard them as independent
              contractors. We handle vetting, compliance, and onboarding so you can focus on building your product.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Pre-vetted engineers from 45+ countries",
                "Hire in 2-3 weeks instead of 3-6 months",
                "Access global talent pool without borders",
                "Flexible contractor model (no payroll complexity)",
                "Lower hiring costs than full-time positions",
                "No recruitment agency fees",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-gray-300">
                  <Check className="h-5 w-5 text-green-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={scrollToForm}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-bold rounded-full text-lg transition transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              See Available Talent
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[
              { icon: "⚡", title: "Fast Hiring (2-3 weeks)" },
              { icon: "🌐", title: "Global Talent (45+ countries)" },
              { icon: "💰", title: "Lower Costs (No payroll)" },
              { icon: "🔧", title: "Flexible (Contractor model)" },
            ].map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition"
              >
                <div className="text-2xl mb-2">{b.icon}</div>
                <h3 className="font-bold text-white">{b.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ROLES SECTION */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-4 text-white">Roles You Can Hire</h2>
          <p className="text-xl text-gray-400 mb-12">We have talent across all technical disciplines</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "🔧 Backend Engineers",
              "⚛️ Frontend Developers",
              "🔗 Full Stack Engineers",
              "☸️ DevOps Engineers",
              "🤖 AI Engineers",
              "📊 Data Engineers",
              "📈 Product Managers",
              "🎨 UI/UX Designers",
            ].map((role) => (
              <div
                key={role}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition"
              >
                <span className="font-bold text-white">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HIRING PROCESS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black mb-4 text-white text-center">Simple Hiring Process</h2>
          <p className="text-xl text-gray-400 mb-12 text-center">
            From request to onboarding in just a few weeks
          </p>
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {[
              { step: 1, title: "Submit Hiring Request", desc: "Tell us about your role, required skills, and timeline" },
              { step: 2, title: "We Source Candidates", desc: "We vet and shortlist pre-qualified engineers for your review" },
              { step: 3, title: "Interview & Select", desc: "You interview candidates and choose your top pick" },
              { step: 4, title: "Candidate Starts", desc: "We handle onboarding. Engineer starts working immediately" },
            ].map((item, i) => (
              <div key={item.step} className="flex flex-1 items-start gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white">
                    {item.step}
                  </div>
                  {i < 3 && (
                    <ChevronRight className="hidden md:block h-6 w-6 text-purple-400 mt-2 rotate-90 md:rotate-0" />
                  )}
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition flex-1">
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8">
            Average time to hire: <strong className="text-white">2-3 weeks</strong> (vs 3-6 months with traditional
            recruiting)
          </p>
        </div>
      </section>

      {/* 7. WHY CHOOSE */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black mb-4 text-white text-center">Why Companies Choose Schedley</h2>
          <p className="text-xl text-gray-400 mb-12 text-center">Speed, quality, and simplicity combined</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Faster Hiring (2-3 weeks)",
                desc: "Get qualified candidates in days, not months. Start interviewing immediately.",
              },
              {
                icon: "🌐",
                title: "Access to Global Talent",
                desc: "Tap into a network of 45,000+ vetted engineers across 45+ countries.",
              },
              {
                icon: "💰",
                title: "No Payroll Complexity",
                desc: "Hire as contractors. No payroll, benefits, or compliance overhead.",
              },
              {
                icon: "🤝",
                title: "Flexible Contractor Model",
                desc: "Scale up or down based on project needs. Perfect for startups.",
              },
              {
                icon: "📉",
                title: "Lower Hiring Costs",
                desc: "40-50% cheaper than full-time hiring when you factor in recruiting fees.",
              },
              {
                icon: "✅",
                title: "Pre-Vetted Quality",
                desc: "All candidates are vetted for skills, background, and cultural fit.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition"
              >
                <div className="text-2xl mb-2">{c.icon}</div>
                <h3 className="font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TALENT PROFILES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black mb-4 text-white text-center">Meet Your Future Team</h2>
          <p className="text-xl text-gray-400 mb-12 text-center">Examples of vetted engineers we've placed</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Senior Backend Engineer",
                years: "8 years",
                skills: "Python/AWS/Kubernetes",
                bio: "Previously at SaaS startups",
              },
              {
                title: "Full Stack Developer",
                years: "6 years",
                skills: "React/Node.js/PostgreSQL",
                bio: "Built 3 products from 0-1",
              },
              {
                title: "DevOps Engineer",
                years: "7 years",
                skills: "Kubernetes/Docker/AWS",
                bio: "Scaled infrastructure for unicorn",
              },
              {
                title: "AI/ML Engineer",
                years: "5 years",
                skills: "Python/TensorFlow/PyTorch",
                bio: "Built recommendation systems",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition"
              >
                <h3 className="font-bold text-white mb-1">{p.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{p.years}</p>
                <p className="text-sm text-gray-300 mb-2">{p.skills}</p>
                <p className="text-sm text-gray-400 mb-4">{p.bio}</p>
                <span className="inline-block px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium mb-4">
                  Available
                </span>
                <button
                  type="button"
                  className="w-full px-4 py-2 border-2 border-purple-500 hover:bg-purple-500/10 text-purple-300 font-bold rounded-full text-sm transition"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. IDEAL CLIENTS */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black mb-4 text-white text-center">Who We Help</h2>
          <p className="text-xl text-gray-400 mb-12 text-center">
            Perfect for companies looking to scale engineering teams
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: "🚀",
                title: "Startups Scaling Engineering Teams",
                desc: "Quickly expand your engineering capacity without full-time hiring costs",
              },
              {
                icon: "💻",
                title: "SaaS Companies Hiring Developers",
                desc: "Access global talent to accelerate product development",
              },
              {
                icon: "🏢",
                title: "Agencies Needing Project Engineers",
                desc: "Scale teams for specific projects without long-term commitment",
              },
              {
                icon: "🌐",
                title: "Tech Companies Hiring Remote Talent",
                desc: "Build distributed teams across timezones and continents",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition"
              >
                <div className="text-2xl mb-2">{c.icon}</div>
                <h3 className="font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TALENT REQUEST FORM */}
      <section
        id={TALENT_FORM_ID}
        ref={formSectionRef}
        className="py-20 px-6 bg-gradient-to-r from-purple-900/30 via-slate-900/50 to-cyan-900/30 border-y border-purple-500/20"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-black mb-4 text-white text-center">Request Talent Today</h2>
          <p className="text-xl text-gray-400 mb-8 text-center">
            Fill out this form and we'll match you with perfect candidates
          </p>
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-xl bg-slate-900/50 border border-purple-500/30 space-y-6"
          >
            {submitSuccess && (
              <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm font-medium">
                Request received! We'll review and send you matched candidates within 24 hours.
              </div>
            )}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                Company Name <span className="text-red-400">*</span>
              </label>
              <input
                id="companyName"
                type="text"
                required
                placeholder="Your company name"
                value={formData.companyName}
                onChange={(e) => updateForm("companyName", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 outline-none transition"
              />
              {formErrors.companyName && (
                <p className="mt-1 text-sm text-red-400">{formErrors.companyName}</p>
              )}
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                What role are you hiring for? <span className="text-red-400">*</span>
              </label>
              <select
                id="role"
                required
                value={formData.role}
                onChange={(e) => updateForm("role", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 outline-none transition"
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-800">
                    {opt}
                  </option>
                ))}
              </select>
              {formErrors.role && <p className="mt-1 text-sm text-red-400">{formErrors.role}</p>}
            </div>
            <div>
              <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-300 mb-2">
                Required Skills <span className="text-red-400">*</span>
              </label>
              <input
                id="requiredSkills"
                type="text"
                required
                placeholder="e.g., Python, React, Kubernetes"
                value={formData.requiredSkills}
                onChange={(e) => updateForm("requiredSkills", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 outline-none transition"
              />
              {formErrors.requiredSkills && (
                <p className="mt-1 text-sm text-red-400">{formErrors.requiredSkills}</p>
              )}
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-300 mb-2">
                Contract Type <span className="text-red-400">*</span>
              </span>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contractType"
                    value="Contractor"
                    checked={formData.contractType === "Contractor"}
                    onChange={() => updateForm("contractType", "Contractor")}
                    className="w-4 h-4 text-purple-500 border-slate-600 bg-slate-800 focus:ring-purple-500/30"
                  />
                  <span className="text-gray-300">Contractor</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contractType"
                    value="Full-Time"
                    checked={formData.contractType === "Full-Time"}
                    onChange={() => updateForm("contractType", "Full-Time")}
                    className="w-4 h-4 text-purple-500 border-slate-600 bg-slate-800 focus:ring-purple-500/30"
                  />
                  <span className="text-gray-300">Full-Time</span>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                When do you need to hire? <span className="text-red-400">*</span>
              </label>
              <select
                id="timeline"
                required
                value={formData.timeline}
                onChange={(e) => updateForm("timeline", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 outline-none transition"
              >
                {TIMELINE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-800">
                    {opt}
                  </option>
                ))}
              </select>
              {formErrors.timeline && <p className="mt-1 text-sm text-red-400">{formErrors.timeline}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="your@company.com"
                value={formData.email}
                onChange={(e) => updateForm("email", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 outline-none transition"
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-bold rounded-full text-lg transition transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              Request Talent
            </button>
            <p className="text-center text-sm text-gray-400">
              We'll review your request and send you matched candidates within 24 hours.
            </p>
          </form>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-4 text-white">Start Hiring Global Talent Today</h2>
          <p className="text-xl text-gray-400 mb-8">
            Stop waiting months for recruiter calls. Get pre-vetted engineers in 2-3 weeks.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              type="button"
              onClick={scrollToForm}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-bold rounded-full text-lg transition transform hover:scale-105 shadow-lg shadow-cyan-500/30"
            >
              Request Talent
            </button>
            <button
              type="button"
              onClick={scrollToForm}
              className="px-8 py-4 border-2 border-purple-500 hover:bg-purple-500/10 text-purple-300 font-bold rounded-full text-lg transition"
            >
              Book Consultation
            </button>
          </div>
          <p className="text-sm text-gray-400">No credit card required • Free trial • Cancel anytime</p>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-slate-950 border-t border-purple-500/10 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 font-black text-white text-lg">
                S
              </span>
              <span className="font-bold text-white">Schedley</span>
            </div>
            <p className="text-base text-gray-300 max-w-sm">
              Schedley provides global talent infrastructure and scheduling tools. Hire pre-vetted engineers and manage
              meetings with one platform.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Back to Schedley
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#talent-form" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#talent-form" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#talent-form" className="hover:text-white transition">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="max-w-6xl mx-auto mt-12 pt-8 border-t border-purple-500/10 text-center text-sm text-gray-400">
          © 2024 Schedley • Global Talent Infrastructure
        </p>
      </footer>

      {/* Sticky floating CTA */}
      {showStickyCta && (
        <button
          type="button"
          onClick={scrollToForm}
          className="fixed bottom-6 right-6 z-40 px-6 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-bold rounded-full text-base shadow-lg shadow-cyan-500/30 transition transform hover:scale-105 animate-bounce"
          aria-label="Request talent now"
        >
          Request Talent Now
        </button>
      )}
    </div>
  );
}
