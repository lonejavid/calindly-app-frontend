import {
  UserPlus,
  ArrowRight,
  Link2,
  ShieldCheck,
  Sparkles,
  Users,
  UserCheck,
  Smile,
  TrendingUp,
  Clock,
  Target,
  Code2,
  Package,
  Palette,
  Megaphone,
  BarChart3,
  Headphones,
  Settings,
  Briefcase,
  MessageCircle,
  ClipboardList,
  CheckCircle,
  FolderKanban,
} from "lucide-react";
import { Link } from "react-router-dom";
import { LandingHeader } from "@/components/LandingHeader";
import SectionDivider from "@/components/SectionDivider";
import { SectionHeader } from "@/components/SectionHeader";
import SectionReveal from "@/components/SectionReveal";
import { WhatClientsSay } from "@/components/WhatClientsSay";
import { FAQSection } from "@/components/landing/FAQSection";
import { GrowthExpertCTA } from "@/components/landing/GrowthExpertCTA";
import leadGenHeroImage from "@/assets/Lead-Generation.webp";

const DEMO_URL =
  "https://www.schedley.com/lonejavida829/schedley-demo-see-how-client-acquisition-works-9040";

/** Bullet points for the Vetted talent pool (highlight) card */
const VETTED_BULLETS = [
  { label: "Skills verified", icon: CheckCircle },
  { label: "Experience vetted", icon: CheckCircle },
  { label: "Culture fit assessed", icon: CheckCircle },
  { label: "Shortlists in 24–48 hours", icon: Clock },
  { label: "Reference checks", icon: CheckCircle },
  { label: "Onboarding support", icon: CheckCircle },
  { label: "500+ professionals placed", icon: UserCheck },
  { label: "Trusted by 50+ companies", icon: Users },
];

/**
 * Recruiting Talent page – distinct UI from B2B Lead Gen / Appointment pages.
 * Theme: src/theme/theme.css
 */
const RecruitingTalentPage = () => {
  const handleContact = () => window.open(DEMO_URL, "_blank");

  const testimonials = [
    { quote: "Schedley understood our urgency and delivered a shortlist of three strong candidates within 48 hours. We made an offer to one of them and they've been a key hire for our team.", name: "Head of Growth", role: "B2B SaaS Company", avatar: "https://i.pravatar.cc/80?img=5" },
    { quote: "We needed senior engineering talent fast. Schedley sent us a shortlist in under 48 hours and we hired two people. The quality and fit were exactly what we needed.", name: "VP Engineering", role: "Product company", avatar: "https://i.pravatar.cc/80?img=12" },
    { quote: "From brief to offer in two weeks. The candidates were pre-vetted and ready to talk. Our team was impressed with how smooth the process was.", name: "Chief People Officer", role: "Scale-up", avatar: "https://i.pravatar.cc/80?img=9" },
    { quote: "We use Schedley for both full-time and contract roles. One point of contact, clear timelines, and candidates who actually match the brief. Highly recommend.", name: "Director of Operations", role: "Tech consultancy", avatar: "https://i.pravatar.cc/80?img=20" },
  ];

  const containerClass = "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8";

  const stats = [
    { value: "500+", label: "Talents Placed", detail: "Professionals matched to roles", icon: UserCheck },
    { value: "50+", label: "Happy Clients", detail: "Companies that trust us to scale", icon: Smile },
    { value: "98%", label: "Retention Rate", detail: "Candidates who stay and perform", icon: TrendingUp },
    { value: "24hr", label: "Avg Time to Shortlist", detail: "First candidates in a day", icon: Clock },
  ];

  const bentoItems = [
    { title: "Vetted talent pool", desc: "Pre-screened professionals ready to join your team from day one. We verify skills, experience, and culture fit so you only meet candidates who clear your bar.", icon: ShieldCheck, highlight: true },
    { title: "Flexible engagement", desc: "Full-time, contract, or project-based—we match your needs. Scale up for launches or keep a lean team with on-demand talent.", icon: Link2 },
    { title: "Dedicated support", desc: "A single point of contact for smooth onboarding. From offer to day one, we coordinate so your new hire ramps fast and your team stays focused.", icon: Users },
    { title: "Fast turnaround", desc: "Shortlists in 24–48 hours so you keep momentum. No long waits—we prioritize your roles and keep the pipeline moving.", icon: Sparkles },
  ];

  const howItWorksSteps = [
    {
      title: "Share Your Brief",
      desc: "Tell us your role, skills, and culture fit. We align on must-haves and nice-to-haves so we target the right candidates.",
      icon: ClipboardList,
      variant: "light" as const,
      extras: [
        { icon: CheckCircle, text: "Clear brief doc" },
        { icon: CheckCircle, text: "Aligned must-haves" },
        { icon: CheckCircle, text: "Kickoff call" },
      ],
    },
    {
      title: "We Search & Screen",
      desc: "We tap our network and screen for skills, experience, and fit. You get a curated shortlist, often within 24–48 hours.",
      icon: Users,
      variant: "light" as const,
      extras: [
        { icon: CheckCircle, text: "Curated shortlist" },
        { icon: CheckCircle, text: "24–48 hr turnaround" },
        { icon: CheckCircle, text: "Profile summaries" },
      ],
    },
    {
      title: "Interview & Hire",
      desc: "Meet candidates on your schedule. We coordinate feedback and support through offer and onboarding so they ramp fast.",
      icon: UserCheck,
      variant: "dark" as const,
      extras: undefined,
    },
  ];

  const roles = [
    { name: "Sales & BD", icon: Target, desc: "Revenue and business development", examples: ["SDR", "AE", "BD Lead"] },
    { name: "Engineering", icon: Code2, desc: "Software and technical roles", examples: ["Full-stack", "DevOps", "QA"] },
    { name: "Product", icon: Package, desc: "Product management and ownership", examples: ["PM", "PO", "Growth"] },
    { name: "Design", icon: Palette, desc: "UX, UI, and design systems", examples: ["UX", "UI", "Design Ops"] },
    { name: "Marketing", icon: Megaphone, desc: "Growth and brand marketing", examples: ["Demand gen", "Content", "Brand"] },
    { name: "Data & Analytics", icon: BarChart3, desc: "Data science and analytics", examples: ["Analytics", "BI", "Data Eng"] },
    { name: "Customer Success", icon: Headphones, desc: "CSM and account management", examples: ["CSM", "AM", "Support Lead"] },
    { name: "Operations", icon: Settings, desc: "Biz ops and enablement", examples: ["Biz Ops", "Sales Ops", "Enablement"] },
    { name: "Executive", icon: Briefcase, desc: "Leadership and C-level", examples: ["VP", "Director", "C-level"] },
    { name: "Support", icon: MessageCircle, desc: "Technical and customer support", examples: ["Tier 1–3", "Support Lead", "Escalation"] },
    { name: "HR & People", icon: UserPlus, desc: "Talent, people ops, and recruiting", examples: ["Recruiter", "People Ops", "L&D"] },
    { name: "Project Delivery", icon: FolderKanban, desc: "Delivery, program and project management", examples: ["PM", "Scrum Master", "Delivery Lead"] },
  ];

  const faqs = [
    { q: "What types of roles do you recruit for?", a: "We support sales, engineering, product, design, marketing, data, customer success, operations, and executive roles. Tell us your open role and we’ll confirm fit and timeline." },
    { q: "How quickly can you deliver shortlists?", a: "For most roles we deliver a first shortlist within 24–48 hours. Niche or senior roles may take a few extra days. We’ll set expectations in the kickoff." },
    { q: "Do you offer contract and full-time?", a: "Yes. We help with full-time hires, contractors, and project-based engagements so you can scale up or down as needed." },
    { q: "How do you vet candidates?", a: "We screen for skills, experience, and culture fit using structured interviews and, where relevant, work samples or assessments. You see only candidates we’re confident in." },
  ];

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main>
        {/* Hero – two-column like B2B Lead Gen / Appointment: text left, image right */}
        <section className="relative bg-[var(--ink)] py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="relative z-10">
                <p className="inline-block text-xs font-bold uppercase tracking-widest text-[var(--blue)] mb-4 px-4 py-2 rounded-[var(--r-s)] border border-[var(--blue)] bg-[var(--ink)]/80">
                  Recruiting & Talent
                </p>
                <h1 className="b2b-display text-white text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
                  Scale Your Team With Top Talent
                </h1>
                <p className="text-lg text-white/90 leading-relaxed mb-4">
                  We connect you with vetted professionals so you can hire faster and build teams that deliver. From sales to engineering to operations—we find the right fit.
                </p>
                <p className="text-white/80 text-sm mb-6">
                  Trusted by growing companies to fill critical roles with quality candidates, on time.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={handleContact}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--r-s)] text-base font-semibold bg-[var(--blue)] text-white border-2 border-[var(--blue)] hover:bg-[var(--blue-dark)] hover:border-[var(--blue-dark)] transition-all cursor-pointer"
                    style={{ boxShadow: "var(--sh-blue)" }}
                  >
                    Get Started <ArrowRight className="w-5 h-5" />
                  </button>
                  <Link
                    to="/carrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--r-s)] text-base font-semibold bg-transparent text-white border-2 border-white/60 hover:bg-white/10 transition-all"
                  >
                    View Open Roles
                  </Link>
                </div>
              </div>
              <div className="relative z-10 flex justify-center lg:justify-end">
                <div className="relative rounded-[var(--r-2xl)] overflow-hidden shadow-[var(--sh-lg)] w-full max-w-lg aspect-[4/3] lg:aspect-[5/4]">
                  <img
                    src={leadGenHeroImage}
                    alt="Recruiting talent – scale your team with vetted professionals"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Stats strip – with icons and short detail line */}
        <section className="py-14 sm:py-16 bg-[var(--ink)]">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {stats.map(({ value, label, detail, icon: Icon }) => (
                <div key={label} className="text-center group">
                  <span className="inline-flex h-12 w-12 rounded-[var(--r-m)] bg-[var(--blue)]/20 text-[var(--blue-mid)] items-center justify-center mb-4 group-hover:bg-[var(--blue)]/30 transition-colors">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <p className="text-3xl sm:text-4xl font-bold text-[var(--blue)] mb-1">{value}</p>
                  <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
                  <p className="text-xs text-white/70">{detail}</p>
                </div>
              ))}
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Why Schedley Talent – bento grid, outcome-led */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--white)] relative overflow-hidden">
          {/* Subtle gradient orbs for depth */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--blue-lite)]/50 blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" aria-hidden />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[var(--blue-ghost)] blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" aria-hidden />
          <div className={containerClass} style={{ position: "relative" }}>
            <SectionReveal effect="slide-right">
            <SectionHeader
              eyebrow="Why Schedley Talent"
              titleBefore="Partner with us to build "
              titleAccent="your team"
              subtitle="Rigorous vetting and flexible engagement—so you get the right people, in the right format, without the usual hiring friction."
              className="mb-12 lg:mb-14"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-4 lg:gap-5 auto-rows-fr md:auto-rows-fr">
              {bentoItems.map(({ title, desc, icon: Icon, highlight }) => (
                <div
                  key={title}
                  className={`group relative rounded-[var(--r-xl)] overflow-hidden transition-all duration-300 hover:shadow-[var(--sh-md)] hover:-translate-y-1 ${
                    highlight
                      ? "md:row-span-3 flex flex-col p-6 sm:p-8 lg:p-10 bg-[var(--ink)] text-white border-0"
                      : "flex flex-col p-5 sm:p-6 bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--blue)]/25"
                  }`}
                  style={highlight ? { boxShadow: "var(--sh-lg)" } : {}}
                >
                  {highlight && (
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[var(--blue)]/20 blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" aria-hidden />
                  )}
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Icon: reference style – light blue inner + darker blue rounded container (shield/check feel) */}
                    <span
                      className={`inline-flex shrink-0 mb-5 ${
                        highlight
                          ? "rounded-2xl bg-[var(--blue)]/25 p-1.5 ring-2 ring-[var(--blue)]/30"
                          : "rounded-2xl"
                      }`}
                    >
                      <span
                        className={`inline-flex h-14 w-14 rounded-xl items-center justify-center ${
                          highlight
                            ? "bg-[var(--blue-lite)] text-[var(--blue)]"
                            : "bg-[var(--white)] border border-[var(--line)] text-[var(--blue)] shadow-[var(--sh-xs)]"
                        }`}
                      >
                        <Icon className="w-7 h-7" strokeWidth={2} />
                      </span>
                    </span>
                    <h3 className={`font-bold text-xl mb-3 leading-tight ${highlight ? "text-white" : "text-[var(--ink)]"}`}>
                      {title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${highlight ? "text-white/90 mb-4" : "flex-1 text-[var(--ink-muted)]"}`}>
                      {desc}
                    </p>
                    {highlight && (
                      <>
                        <ul className="space-y-2.5 flex-1">
                          {VETTED_BULLETS.map(({ label, icon: BulletIcon }) => (
                            <li key={label} className="flex items-center gap-3 text-sm text-white/90">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--blue-mid)]/20 text-[var(--blue-mid)]">
                                <BulletIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
                              </span>
                              {label}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                          <UserCheck className="w-5 h-5 text-[var(--blue-mid)] shrink-0" />
                          <span className="text-sm font-medium text-white/95">500+ professionals placed</span>
                        </div>
                        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[var(--blue-mid)]">
                          Trusted by 50+ companies
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* How It Works – 3-step cards with icons */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]">
          <div className={containerClass}>
            <SectionReveal effect="slide-left">
            <SectionHeader
              eyebrow="How It Works"
              titleBefore="From brief to hire in "
              titleAccent="three clear steps"
              subtitle="We handle sourcing and screening so you focus on choosing the right fit."
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {howItWorksSteps.map(({ title, desc, icon: Icon, variant, extras }) => (
                <div
                  key={title}
                  className={`flex flex-col items-center text-center rounded-[var(--r-l)] p-8 sm:p-10 transition-all duration-300 hover:shadow-[var(--sh-md)] ${
                    variant === "dark"
                      ? "bg-[var(--ink)] text-white shadow-[var(--sh-sm)]"
                      : "bg-[var(--white)] border border-[var(--line)] shadow-[var(--sh-sm)] hover:border-[var(--blue)]/20"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${
                      variant === "dark"
                        ? "bg-[var(--blue)]/20 text-[var(--blue-mid)]"
                        : "bg-[var(--blue-lite)] text-[var(--blue)]"
                    }`}
                  >
                    <Icon className="w-10 h-10" strokeWidth={1.8} />
                  </div>
                  {variant === "dark" && (
                    <div className="rounded-xl bg-white/10 px-4 py-2 inline-flex items-center gap-2 mb-4">
                      <UserCheck className="w-4 h-4 text-[var(--blue-mid)] shrink-0" />
                      <span className="text-sm font-medium text-white/95">Ready to hire</span>
                    </div>
                  )}
                  <h3 className={`font-bold text-lg mb-2 ${variant === "dark" ? "text-white" : "text-[var(--ink)]"}`}>{title}</h3>
                  <p className={`text-sm leading-relaxed max-w-[280px] flex-1 ${variant === "dark" ? "text-white/80" : "text-[var(--ink-muted)]"}`}>
                    {desc}
                  </p>
                  {extras && extras.length > 0 && (
                    <div className="mt-6 w-full max-w-[260px] space-y-2 text-left">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-2">You get</p>
                      {extras.map(({ icon: ExIcon, text }) => (
                        <div key={text} className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                          <ExIcon className="w-4 h-4 shrink-0 text-[var(--blue)]" strokeWidth={2} />
                          {text}
                        </div>
                      ))}
                    </div>
                  )}
                  {variant === "dark" && (
                    <span className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                      <span className="text-[var(--blue-mid)]">+</span> Add role
                    </span>
                  )}
                </div>
              ))}
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Roles we fill – icons, richer content, card-style tags */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]">
          <div className={containerClass}>
            <SectionReveal effect="slide-right">
            <SectionHeader
              eyebrow="Roles We Fill"
              titleBefore="We help you hire "
              titleAccent="across functions"
              subtitle="From individual contributors to leadership—we source and screen so you get a shortlist that fits your bar and culture. Tell us the role and we'll align on must-haves, then deliver vetted candidates on your timeline."
              className="mb-10"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {roles.map(({ name, icon: Icon, desc, examples }) => (
                <div
                  key={name}
                  className="group flex flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-6 sm:p-7 hover:border-[var(--blue)] hover:shadow-[var(--sh-md)] transition-all duration-200 min-h-[220px]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-14 w-14 shrink-0 rounded-xl bg-[var(--blue-lite)] text-[var(--blue)] items-center justify-center group-hover:bg-[var(--blue)]/10 transition-colors">
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--blue)]/70">
                      We place
                    </span>
                  </div>
                  <p className="font-bold text-[var(--ink)] text-lg leading-tight mt-4">{name}</p>
                  <p className="text-sm text-[var(--ink-muted)] mt-2 leading-relaxed flex-1">{desc}</p>
                  {examples && examples.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[var(--line)]">
                      <div className="flex flex-wrap gap-2">
                        {examples.map((ex) => (
                          <span
                            key={ex}
                            className="inline-flex items-center rounded-md bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--ink-soft)]"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <SectionReveal effect="zoom-in">
          <WhatClientsSay testimonials={testimonials} eyebrow="What Clients Say" />
        </SectionReveal>
        <SectionDivider />

        <FAQSection
          containerClass={containerClass}
          sectionClassName="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]"
          eyebrow="FAQ"
          titleBefore="Frequently asked "
          titleAccent="questions"
          subtitle="Quick answers about our recruiting and talent process."
          items={faqs}
          scrollEffect="fade-up"
        />
        <SectionDivider />

        <GrowthExpertCTA
          containerClass={containerClass}
          sectionClassName="py-16 sm:py-20 lg:py-24 bg-[var(--blue)] text-white"
          eyebrow="Get Started"
          titleBefore="Ready to "
          titleAccent="hire?"
          subtitle="Tell us about your open role and we'll get back with a plan and timeline."
          buttonText="Talk to Talent Team"
          onButtonClick={handleContact}
          buttonIcon={<UserPlus className="w-5 h-5" />}
          privacySlot={null}
          middleSlot={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left items-stretch">
              {[
                { icon: Clock, title: "Fast shortlist", desc: "First candidates within 24–48 hours." },
                { icon: ShieldCheck, title: "Vetted candidates", desc: "Pre-screened for fit and skills." },
                { icon: Briefcase, title: "Flexible engagement", desc: "Full-time, contract, or project-based." },
                { icon: MessageCircle, title: "One point of contact", desc: "Dedicated coordinator for your roles." },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group flex flex-col h-full min-h-[140px] p-5 sm:p-6 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white group-hover:bg-white/25 transition-colors mb-4">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <h3 className="font-semibold text-white text-base mb-2 leading-tight">{title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed flex-1 min-h-0">{desc}</p>
                </div>
              ))}
            </div>
          }
        />
      </main>
      {/* Footer is rendered by BaseLayout */}
    </div>
  );
};

export default RecruitingTalentPage;
