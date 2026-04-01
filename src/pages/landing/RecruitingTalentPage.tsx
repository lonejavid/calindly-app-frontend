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
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { LandingHeader } from "@/components/LandingHeader";
import SectionDivider from "@/components/SectionDivider";
import { SectionHeader } from "@/components/SectionHeader";
import SectionReveal from "@/components/SectionReveal";
import { WhatClientsSay } from "@/components/WhatClientsSay";
import { FAQSection } from "@/components/landing/FAQSection";
import { GrowthExpertCTA } from "@/components/landing/GrowthExpertCTA";
import leadGenHeroImage from "@/assets/talent.png";

const DEMO_URL =
  "https://www.schedley.com/lonejavida829/schedley-demo-see-how-client-acquisition-works-9040";

/** Bullet points for the hiring infrastructure highlight card */
const VETTED_BULLETS = [
  { label: "Role briefs & scorecards aligned with hiring managers", icon: ClipboardList },
  { label: "Sourcing, outreach, and structured first screens", icon: Users },
  { label: "Interview loops coordinated with your calendar", icon: Clock },
  { label: "Shortlists in 24–48 hours for most roles", icon: Sparkles },
  { label: "References, checks, and offer support", icon: ShieldCheck },
  { label: "Onboarding handoffs so day-one is smooth", icon: CheckCircle },
  { label: "500+ successful placements", icon: UserCheck },
  { label: "Trusted by 50+ growing teams", icon: Users },
];

/**
 * Hiring Infrastructure service page (route: /services/hiring-infrastructure).
 * Theme: src/theme/theme.css
 */
const RecruitingTalentPage = () => {
  const handleContact = () => window.open(DEMO_URL, "_blank");

  const testimonials = [
    { quote: "Our hiring was stuck in endless back-and-forth. Schedley gave us real infrastructure—rubrics, coordinated screens, and a shortlist in two days. We filled a critical role and finally got velocity back.", name: "Head of Growth", role: "B2B SaaS Company", avatar: "https://i.pravatar.cc/80?img=5" },
    { quote: "They didn’t just send résumés. They ran the pipeline: sourcing, first screens, scheduling, and scorecards our VPs could trust. Two senior engineers hired in one sprint.", name: "VP Engineering", role: "Product company", avatar: "https://i.pravatar.cc/80?img=12" },
    { quote: "From role definition to offer in under three weeks. Having one team own find-screen-hire coordination cut our time-to-fill dramatically without lowering the bar.", name: "Chief People Officer", role: "Scale-up", avatar: "https://i.pravatar.cc/80?img=9" },
    { quote: "We plug Schedley in for full-time and contract spikes. Same process, same quality bar—whether we’re hiring one PM or five. It’s become core hiring infrastructure for us.", name: "Director of Operations", role: "Tech consultancy", avatar: "https://i.pravatar.cc/80?img=20" },
  ];

  const containerClass = "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8";

  const stats = [
    { value: "24–48h", label: "To first shortlist", detail: "Typical turnaround for active roles", icon: Clock },
    { value: "500+", label: "Placements", detail: "Candidates moved through our process", icon: UserCheck },
    { value: "50+", label: "Teams supported", detail: "Companies using our hiring stack", icon: Smile },
    { value: "94%", label: "Offer accept rate", detail: "When both sides align on the brief", icon: TrendingUp },
  ];

  const bentoItems = [
    {
      title: "End-to-end hiring infrastructure",
      desc: "We don’t just forward CVs. You get sourcing, structured screening, interview coordination, and hiring-manager-ready packets—so every stage runs on rails instead of ad-hoc threads and spreadsheets.",
      icon: ShieldCheck,
      highlight: true,
    },
    {
      title: "Flexible operating model",
      desc: "Embedded recruiting sprints, fractional TA support, or full-cycle search for priority roles. Scale the pod up for launch hiring and dial back when the backlog clears.",
      icon: Link2,
    },
    {
      title: "Dedicated hiring pod",
      desc: "One accountable lead plus coordinators who own the pipeline, stakeholder updates, and handoffs to your ATS or people team—fewer dropped balls and clearer SLAs.",
      icon: Users,
    },
    {
      title: "Speed without corner-cutting",
      desc: "Parallel sourcing, tight feedback loops, and calendar-aware scheduling keep momentum. You stay focused on decisions; we keep candidates warm and moving.",
      icon: Sparkles,
    },
  ];

  const howItWorksSteps = [
    {
      title: "Define the role & bar",
      desc: "We workshop the brief with you: outcomes, must-have skills, culture signals, and compensation band. Everyone agrees on what “great” looks like before we open the top of funnel.",
      icon: ClipboardList,
      variant: "light" as const,
      extras: [
        { icon: CheckCircle, text: "Scorecard & rubric" },
        { icon: CheckCircle, text: "Aligned hiring manager" },
        { icon: CheckCircle, text: "Kickoff & SLA" },
      ],
    },
    {
      title: "We find & screen",
      desc: "Outbound, inbound, and network sourcing—then structured phone or async screens against your bar. You receive ranked shortlists with notes, not raw inboxes.",
      icon: Users,
      variant: "light" as const,
      extras: [
        { icon: CheckCircle, text: "Curated shortlist" },
        { icon: CheckCircle, text: "Screening notes" },
        { icon: CheckCircle, text: "24–48h typical" },
      ],
    },
    {
      title: "You interview & hire",
      desc: "We schedule loops, gather feedback, and support debriefs, references, and offers. Stronger signal, faster decisions, and a smoother path from “yes” to day one.",
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
    {
      q: "What is “hiring infrastructure” vs. traditional recruiting?",
      a: "Infrastructure means we own the repeatable systems: sourcing channels, screening rubrics, interview scheduling, stakeholder updates, and handoffs to your tools. You get a pipeline that runs whether you’re hiring one role or ten—not a one-off CV drop.",
    },
    {
      q: "What types of roles do you support?",
      a: "We cover sales, engineering, product, design, marketing, data, customer success, operations, HR, and leadership. Share the level and location model and we’ll confirm fit, timeline, and the right pod size.",
    },
    {
      q: "How fast can we expect a shortlist?",
      a: "For most active roles, first qualified shortlists land within 24–48 hours after kickoff. Highly niche or executive searches may need a few extra days; we align on milestones upfront.",
    },
    {
      q: "Do you work with our ATS and hiring managers?",
      a: "Yes. We plug into your ATS where you use one, and we run hiring-manager syncs, scorecards, and debriefs so decisions stay fast and documented.",
    },
    {
      q: "Full-time, contract, or project hiring?",
      a: "All of the above. Use us for a single critical hire, a hiring sprint, or ongoing fractional support—same process, adjusted capacity.",
    },
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
                  Hiring Infrastructure
                </p>
                <h1 className="b2b-display text-white text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
                  Hire Faster and Better
                </h1>
                <p className="text-lg text-white/90 leading-relaxed mb-4">
                  Build the operating system for hiring: structured sourcing and screening, coordinated interviews, and hiring-manager-ready shortlists—so you fill roles without burning out your team.
                </p>
                <p className="text-white/80 text-sm mb-6">
                  Outcome: stronger teams, shorter cycles, and predictable growth—not another overflowing inbox of unvetted applicants.
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
                    alt="Hiring infrastructure – find, screen, and hire the right candidates faster"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Problem → Solution → Result */}
        <section className="py-14 sm:py-16 lg:py-20 bg-[var(--surface)]">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                <div className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-6 sm:p-8 shadow-[var(--sh-sm)] hover:border-[var(--blue)]/20 transition-colors">
                  <span className="inline-flex h-12 w-12 rounded-xl bg-amber-500/15 text-amber-600 items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-2">Problem</p>
                  <h2 className="text-xl font-bold text-[var(--ink)] mb-3 leading-tight">Hiring is slow and inefficient</h2>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4">
                    Open reqs stall when sourcing, screening, and scheduling live in scattered tools and DMs. Hiring managers lose context, candidates go cold, and “we’ll review next week” becomes the default.
                  </p>
                  <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
                    <li className="flex gap-2"><span className="text-amber-600 shrink-0">•</span> Long time-to-fill and interview no-shows</li>
                    <li className="flex gap-2"><span className="text-amber-600 shrink-0">•</span> Inconsistent bar across interviewers</li>
                    <li className="flex gap-2"><span className="text-amber-600 shrink-0">•</span> Leaders pulled into admin instead of decisions</li>
                  </ul>
                </div>
                <div className="rounded-[var(--r-l)] border border-[var(--blue)]/30 bg-[var(--blue-lite)]/40 p-6 sm:p-8 shadow-[var(--sh-sm)] ring-1 ring-[var(--blue)]/10">
                  <span className="inline-flex h-12 w-12 rounded-xl bg-[var(--blue)]/20 text-[var(--blue)] items-center justify-center mb-4">
                    <Zap className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--blue)] mb-2">Solution</p>
                  <h2 className="text-xl font-bold text-[var(--ink)] mb-3 leading-tight">We help you find, screen, and hire the right candidates</h2>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4">
                    Schedley runs the full top and middle of funnel: targeted outreach, structured screens, scorecards, and calendar-backed interview loops—aligned to the bar you set on day one.
                  </p>
                  <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 shrink-0 text-[var(--blue)] mt-0.5" /> Rubrics and packets hiring managers actually use</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 shrink-0 text-[var(--blue)] mt-0.5" /> Ranked shortlists with screening rationale</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 shrink-0 text-[var(--blue)] mt-0.5" /> One pod accountable for pipeline health</li>
                  </ul>
                </div>
                <div className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-6 sm:p-8 shadow-[var(--sh-sm)] hover:border-[var(--blue)]/20 transition-colors">
                  <span className="inline-flex h-12 w-12 rounded-xl bg-emerald-500/15 text-emerald-600 items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-2">Result</p>
                  <h2 className="text-xl font-bold text-[var(--ink)] mb-3 leading-tight">Stronger team and faster growth</h2>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4">
                    When hiring runs like infrastructure, you compound: better hires, higher offer accept rates, and leaders free to build product and revenue instead of chasing scheduling links.
                  </p>
                  <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
                    <li className="flex gap-2"><span className="text-emerald-600 shrink-0">•</span> Predictable pipeline and clearer forecasts</li>
                    <li className="flex gap-2"><span className="text-emerald-600 shrink-0">•</span> Higher quality of hire and retention signal</li>
                    <li className="flex gap-2"><span className="text-emerald-600 shrink-0">•</span> Capacity to scale headcount with the business</li>
                  </ul>
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

        {/* Why hiring infrastructure – bento grid, outcome-led */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--white)] relative overflow-hidden">
          {/* Subtle gradient orbs for depth */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--blue-lite)]/50 blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" aria-hidden />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[var(--blue-ghost)] blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" aria-hidden />
          <div className={containerClass} style={{ position: "relative" }}>
            <SectionReveal effect="slide-right">
            <SectionHeader
              eyebrow="Why Hiring Infrastructure"
              titleBefore="A system for "
              titleAccent="how you hire"
              subtitle="Process, people, and tooling in one layer—so every req moves with clarity from sourcing to signed offer, without reinventing the wheel each time."
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
                          <span className="text-sm font-medium text-white/95">500+ candidates hired through our process</span>
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
              titleBefore="From role brief to "
              titleAccent="signed offer"
              subtitle="You set the bar; we run the machinery—find, screen, coordinate, and hand off so your team spends time on decisions, not logistics."
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
              titleBefore="Infrastructure for every "
              titleAccent="function you scale"
              subtitle="IC to executive, technical and commercial—we map competencies to your scorecard, run consistent screens, and keep stakeholders aligned whether you’re backfilling or opening a new pod."
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
          subtitle="How our hiring infrastructure works, timelines, and how we plug into your team."
          items={faqs}
          scrollEffect="fade-up"
        />
        <SectionDivider />

        <GrowthExpertCTA
          containerClass={containerClass}
          sectionClassName="py-16 sm:py-20 lg:py-24 bg-[var(--blue)] text-white"
          eyebrow="Get Started"
          titleBefore="Ready for "
          titleAccent="hiring infrastructure?"
          subtitle="Share your open roles, hiring volume, and timeline—we’ll propose a pod, milestones, and how we integrate with your managers and tools."
          buttonText="Talk to our hiring team"
          onButtonClick={handleContact}
          buttonIcon={<UserPlus className="w-5 h-5" />}
          privacySlot={null}
          middleSlot={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left items-stretch">
              {[
                { icon: Clock, title: "Time-to-shortlist", desc: "First qualified candidates typically within 24–48 hours after kickoff." },
                { icon: ShieldCheck, title: "Structured screening", desc: "Rubrics, notes, and scorecards—not raw résumé dumps." },
                { icon: Briefcase, title: "Flexible pods", desc: "Sprints, fractional TA, or dedicated search—matched to your hiring load." },
                { icon: MessageCircle, title: "Single owner", desc: "One accountable lead across sourcing, screens, and scheduling." },
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
