import {
  Calendar,
  Clock,
  Link2,
  Video,
  Users,
  Shield,
  ArrowRight,
  LayoutGrid,
  CalendarCheck,
  Globe,
  BarChart3,
  AlertTriangle,
  Zap,
  TrendingUp,
  CheckCircle,
  Filter,
  Building2,
  Mail,
  PhoneOff,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LandingHeader } from "@/components/LandingHeader";
import SectionDivider from "@/components/SectionDivider";
import { SectionHeader } from "@/components/SectionHeader";
import SectionReveal from "@/components/SectionReveal";
import { WhatClientsSay } from "@/components/WhatClientsSay";
import { FAQSection } from "@/components/landing/FAQSection";
import { GrowthExpertCTA } from "@/components/landing/GrowthExpertCTA";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePaths";
import { openBookMeeting } from "@/lib/book-meeting";
import leadGenHeroImage from "@/assets/spam.png";


/**
 * Calendar Intelligence service page (route: /services/calendar-intelligence).
 * Spam-resistant scheduling, domain rules, and lead-quality gates.
 * Theme: src/theme/theme.css
 */
const SchedleyManagementPage = () => {
  const navigate = useNavigate();

  const handleBookDemo = () => openBookMeeting();
  const handleGetStarted = () => navigate(AUTH_ROUTES.SIGN_UP);
  const handleGoToApp = () => navigate(PROTECTED_ROUTES.EVENT_TYPES);

  const containerClass =
    "max-w-[1200px] w-full min-w-0 mx-auto px-4 xs:px-5 sm:px-6 lg:px-8";

  const testimonials = [
    {
      quote:
        "We were drowning in vendor cold calls and random ‘15-min intro’ spam. After domain rules and a short qualification form, our AEs only see meetings that cleared the bar. Game changer.",
      name: "RevOps Lead",
      role: "B2B SaaS",
      avatar: "https://i.pravatar.cc/80?img=14",
    },
    {
      quote:
        "Calendar Intelligence cut junk bookings by more than half in the first month. The team trusts the link again because slots aren’t wasted on tire-kickers.",
      name: "Head of Sales",
      role: "Enterprise software",
      avatar: "https://i.pravatar.cc/80?img=8",
    },
    {
      quote:
        "Allowlisting our target accounts while blocking free-mail noise was exactly what we needed. High-value calls show up with context—we’re not guessing who booked.",
      name: "Founder",
      role: "Professional services",
      avatar: "https://i.pravatar.cc/80?img=11",
    },
    {
      quote:
        "Same scheduling UX for guests, but we finally have control on the back end: rate limits, duplicate detection, and lead scoring before a hold hits Google Calendar.",
      name: "VP Marketing",
      role: "Growth-stage company",
      avatar: "https://i.pravatar.cc/80?img=19",
    },
  ];

  const stats = [
    { value: "70%+", label: "Fewer junk holds", detail: "Typical after rules + forms are tuned", icon: Filter },
    { value: "Domain", label: "Policy control", detail: "Allow, block, or review by email domain", icon: Building2 },
    { value: "Real-time", label: "Quality gates", detail: "Screen before a slot is committed", icon: Shield },
    { value: "One", label: "Source of truth", detail: "Sync stays tied to your primary calendar", icon: CalendarCheck },
  ];

  const features = [
    {
      icon: Building2,
      title: "Domain & email intelligence",
      description:
        "Allowlist partner and target-company domains, block disposable inboxes, and flag unknown senders for review. Stop public-booking abuse without shutting down real prospects.",
      accent: "var(--blue)",
    },
    {
      icon: Filter,
      title: "Lead quality controls",
      description:
        "Custom booking questions, required fields, and minimum signals (company size, use case, budget band) so only qualified requests earn a time slot.",
      accent: "var(--blue)",
    },
    {
      icon: PhoneOff,
      title: "Spam & abuse resistance",
      description:
        "Rate limits, duplicate detection, and bot friction where you need it—so robocalls, scrapers, and spray-and-pray outreach don’t eat your week.",
      accent: "var(--blue)",
    },
    {
      icon: LayoutGrid,
      title: "Smart event types & links",
      description:
        "Different links for partners, inbound, and campaigns—each with its own rules and buffers. High-intent flows get priority; experimental channels stay sandboxed.",
      accent: "var(--blue)",
    },
    {
      icon: Clock,
      title: "Availability that protects focus",
      description:
        "Working hours, buffers, minimum notice, and caps per day so high-value calls land in windows that match how your team actually sells and supports.",
      accent: "var(--blue)",
    },
    {
      icon: Mail,
      title: "Context before you accept",
      description:
        "Every booking arrives with answers, domain, and source so you know why they’re on the calendar—no more mystery guests or ‘who is this?’ prep scrambles.",
      accent: "var(--blue)",
    },
    {
      icon: Video,
      title: "Video & calendar sync",
      description:
        "Google Meet, Zoom, Teams, Outlook—correct links on confirmed meetings only, after a request passes your rules. Two-way sync keeps one truthful calendar.",
      accent: "var(--blue)",
    },
    {
      icon: BarChart3,
      title: "Visibility into booking health",
      description:
        "See attempts vs. confirmed meetings, top blocked domains, and funnel drop-off. Tune rules over time so your calendar compounds quality, not clutter.",
      accent: "var(--blue)",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Connect calendar & event types",
      desc: "Link your primary calendar and define the meetings you offer—duration, location, and the story each link tells (demo, partner, support, etc.).",
      icon: Calendar,
    },
    {
      step: "02",
      title: "Set domain & lead rules",
      desc: "Choose allowlists and blocklists, add qualification questions, and decide what happens to edge cases: auto-decline, queue for review, or route to a lower-touch link.",
      icon: Filter,
    },
    {
      step: "03",
      title: "Share protected links",
      desc: "Drop the same polished booking experience in email, ads, and your site—guests still pick a time, but only passes get a confirmed hold.",
      icon: Link2,
    },
    {
      step: "04",
      title: "High-value time on the calendar",
      desc: "Qualified bookings sync with video and reminders; noise stays out of your primary schedule. Your team sells and supports instead of playing calendar whack-a-mole.",
      icon: Sparkles,
    },
  ];

  const integrations = [
    { name: "Google Meet & Calendar", icon: Video },
    { name: "Zoom", icon: Video },
    { name: "Microsoft Teams", icon: Users },
    { name: "Outlook", icon: Calendar },
    { name: "HubSpot", icon: BarChart3 },
  ];

  const faqs = [
    {
      q: "How is Calendar Intelligence different from basic scheduling?",
      a: "Basic tools optimize for “anyone can book.” We optimize for “the right people book.” Domain rules, lead gates, and abuse controls run before a slot is locked—so your calendar reflects intent, not noise.",
    },
    {
      q: "Can I allow some domains and block others?",
      a: "Yes. Common patterns include allowlisting target accounts, blocking free-mail for outbound campaigns, and requiring company email for executive calendars—while keeping a separate public link for partners.",
    },
    {
      q: "Will legitimate prospects be turned away?",
      a: "You choose strictness: soft gates (extra questions), hard blocks (domain), or manual review queues. Most teams start with light friction and tighten rules as they see patterns.",
    },
    {
      q: "Does this work with my existing Schedley / app setup?",
      a: "Calendar Intelligence layers on top of your event types, availability, and integrations—same product surface, with smarter filtering and policy so confirmed meetings are worth the time.",
    },
    {
      q: "What about cold calls and robocalls?",
      a: "Booking flows aren’t phone IVRs, but many spam patterns share the same signals: disposable domains, repeat IPs, and garbage form data. We combine technical checks with your business rules to starve low-quality requests.",
    },
  ];

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main className="min-w-0">
        {/* Hero */}
        <section className="relative overflow-x-hidden bg-[var(--ink)] py-12 sm:py-20 lg:py-24">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="relative z-10 min-w-0 text-center lg:text-left">
                  <p className="mb-4 inline-block rounded-[var(--r-s)] border border-[var(--blue)] bg-[var(--ink)]/80 px-4 py-2 text-[10px] xs:text-xs font-bold uppercase tracking-widest text-[var(--blue)]">
                    Calendar Intelligence
                  </p>
                  <h1 className="mb-4 text-[1.5rem] xs:text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
                    Stop Spam Calls on Your Calendar
                  </h1>
                  <p className="mb-4 text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                    Your public booking link shouldn’t be a magnet for junk intros, vendors, and unqualified holds. Put domain policy and lead-quality gates in front of every slot—so only serious conversations reserve your time.
                  </p>
                  <p className="mb-6 text-xs sm:text-sm text-white/75">
                    Outcome: a calendar full of real pipeline and partners—not spam blocks and recovery sessions.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                    <button
                      type="button"
                      onClick={handleGetStarted}
                      className="inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-[var(--r-s)] border-2 border-[var(--blue)] bg-[var(--blue)] px-5 sm:px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:bg-[var(--blue-dark)] hover:border-[var(--blue-dark)] touch-manipulation"
                      style={{ boxShadow: "var(--sh-blue)" }}
                    >
                      Get started free <ArrowRight className="h-5 w-5 shrink-0" />
                    </button>
                    <button
                      type="button"
                      onClick={handleBookDemo}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[var(--r-s)] border-2 border-white/50 px-5 sm:px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:bg-white/10"
                    >
                      Book a demo
                    </button>
                  </div>
                </div>
                <div className="relative z-10 flex min-w-0 justify-center lg:justify-end">
                  <div className="relative aspect-[4/3] w-full max-w-lg min-h-0 overflow-hidden rounded-[var(--r-2xl)] shadow-[var(--sh-lg)] lg:aspect-[5/4]">
                    <img
                      src={leadGenHeroImage}
                      alt="Calendar Intelligence — filter bookings by domain and lead quality"
                      className="h-full w-full object-cover object-center"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Problem → Solution → Result */}
        <section className="overflow-x-hidden bg-[var(--surface)] py-12 sm:py-16 lg:py-20">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8">
                <div className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-6 sm:p-8 shadow-[var(--sh-sm)] hover:border-[var(--blue)]/20 transition-colors">
                  <span className="inline-flex h-12 w-12 rounded-xl bg-amber-500/15 text-amber-600 items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-2">Problem</p>
                  <h2 className="text-xl font-bold text-[var(--ink)] mb-3 leading-tight">Low-quality meetings waste time</h2>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4">
                    Open links invite everyone: SDRs from random vendors, students “picking your brain,” and no-shows who never intended to buy. Each bad hold costs focus, morale, and slots your best prospects could have used.
                  </p>
                  <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
                    <li className="flex gap-2">
                      <span className="text-amber-600 shrink-0">•</span> Senior time burned on unqualified intros
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600 shrink-0">•</span> Calendar chaos and constant rescheduling
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600 shrink-0">•</span> Hard to tell real pipeline from noise
                    </li>
                  </ul>
                </div>
                <div className="rounded-[var(--r-l)] border border-[var(--blue)]/30 bg-[var(--blue-lite)]/40 p-6 sm:p-8 shadow-[var(--sh-sm)] ring-1 ring-[var(--blue)]/10">
                  <span className="inline-flex h-12 w-12 rounded-xl bg-[var(--blue)]/20 text-[var(--blue)] items-center justify-center mb-4">
                    <Zap className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--blue)] mb-2">Solution</p>
                  <h2 className="text-xl font-bold text-[var(--ink)] mb-3 leading-tight">Filter bookings using domain and lead quality control</h2>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4">
                    Schedley applies email-domain policies, custom questions, and automated checks before a meeting is confirmed. You define “good fit”; we enforce it at the front door—without making real buyers jump through hoops.
                  </p>
                  <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 text-[var(--blue)] mt-0.5" />
                      Allowlists, blocklists, and review queues
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 text-[var(--blue)] mt-0.5" />
                      Qualification fields tied to your ICP
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 text-[var(--blue)] mt-0.5" />
                      Abuse and duplicate protection
                    </li>
                  </ul>
                </div>
                <div className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-6 sm:p-8 shadow-[var(--sh-sm)] hover:border-[var(--blue)]/20 transition-colors">
                  <span className="inline-flex h-12 w-12 rounded-xl bg-emerald-500/15 text-emerald-600 items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-2">Result</p>
                  <h2 className="text-xl font-bold text-[var(--ink)] mb-3 leading-tight">Only high-value calls on your calendar</h2>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4">
                    Reps and leaders open the week expecting conversations that matter—with context already attached. Conversion per slot goes up; recovery time and no-show drag go down.
                  </p>
                  <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
                    <li className="flex gap-2">
                      <span className="text-emerald-600 shrink-0">•</span> Higher show rates and better prep
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600 shrink-0">•</span> Cleaner handoff to AE and CS
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600 shrink-0">•</span> Trust in the public booking link again
                    </li>
                  </ul>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Stats */}
        <section className="overflow-x-hidden bg-[var(--ink)] py-12 sm:py-16">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 sm:gap-10 lg:grid-cols-4">
                {stats.map(({ value, label, detail, icon: Icon }) => (
                  <div key={label} className="text-center group">
                    <span className="inline-flex h-12 w-12 rounded-[var(--r-m)] bg-[var(--blue)]/20 text-[var(--blue-mid)] items-center justify-center mb-4 group-hover:bg-[var(--blue)]/30 transition-colors">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </span>
                    <p className="text-2xl sm:text-3xl font-bold text-[var(--blue)] mb-1">{value}</p>
                    <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
                    <p className="text-xs text-white/70">{detail}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Features grid */}
        <section className="overflow-x-hidden bg-[var(--surface)] py-12 sm:py-20 lg:py-24">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <SectionHeader
                eyebrow="Calendar Intelligence"
                titleBefore="Protection and polish for "
                titleAccent="every booking link"
                subtitle="Layer policy, qualification, and sync on the same scheduling experience your guests already understand—so security and revenue teams both sleep better."
                className="mb-12"
              />
              <div className="grid min-w-0 grid-cols-1 gap-6 xs:grid-cols-2 sm:gap-8 lg:grid-cols-4">
                {features.map(({ icon: Icon, title, description, accent }) => (
                  <div
                    key={title}
                    className="group flex flex-col p-6 sm:p-7 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--white)] shadow-[var(--sh-sm)] hover:border-[var(--blue)] hover:shadow-[var(--sh-md)] hover:-translate-y-1 transition-all duration-200"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-white shrink-0"
                      style={{ background: accent, boxShadow: "var(--sh-blue)" }}
                    >
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </div>
                    <h3 className="font-semibold text-lg sm:text-xl text-[var(--ink)] mb-2 leading-tight">{title}</h3>
                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed flex-1">{description}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* How it works */}
        <section className="overflow-x-hidden bg-[var(--white)] py-12 sm:py-20 lg:py-24">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <SectionHeader
                eyebrow="How it works"
                titleBefore="From rules to "
                titleAccent="reliable meetings"
                subtitle="Connect once, configure intelligence, share links—your calendar fills with intent-matched conversations."
                className="mb-12 lg:mb-16"
              />
              <div className="grid min-w-0 grid-cols-1 gap-6 xs:grid-cols-2 sm:gap-8 lg:grid-cols-4">
                {howItWorks.map(({ step, title, desc, icon: Icon }) => (
                  <div
                    key={step}
                    className="group relative flex flex-col p-6 sm:p-7 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--blue)] hover:shadow-[var(--sh-md)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="text-xs font-bold text-[var(--blue)] mb-3">{step}</span>
                    <div className="w-12 h-12 rounded-xl bg-[var(--blue-lite)] text-[var(--blue)] flex items-center justify-center mb-5 shrink-0 group-hover:bg-[var(--blue)] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <h3 className="font-semibold text-lg sm:text-xl text-[var(--ink)] mb-2 leading-tight">{title}</h3>
                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed flex-1">{desc}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Integrations */}
        <section className="overflow-x-hidden bg-[var(--surface)] py-12 sm:py-20 lg:py-24">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <SectionHeader
                eyebrow="Integrations"
                titleBefore="Confirmed meetings land in "
                titleAccent="the stack you use"
                subtitle="Video and calendar sync only fire once a booking clears your rules—no stray invites from half-qualified attempts."
                className="mb-10"
              />
              <div className="mb-14 flex min-w-0 flex-wrap justify-center gap-3 sm:gap-5">
                {integrations.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="group flex flex-col items-center gap-3 p-5 sm:p-6 rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] hover:border-[var(--blue)] hover:shadow-[var(--sh-sm)] transition-all duration-200 min-w-[120px] sm:min-w-[140px]"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--blue-lite)] text-[var(--blue)] group-hover:bg-[var(--blue)] group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </span>
                    <span className="font-semibold text-sm sm:text-base text-center leading-tight">{name}</span>
                  </div>
                ))}
              </div>
              <div className="mx-auto flex max-w-3xl min-w-0 flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10">
                {[
                  { icon: Shield, label: "Rules before calendar holds" },
                  { icon: CalendarCheck, label: "Two-way calendar sync" },
                  { icon: Globe, label: "Branded public booking pages" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] px-5 py-4 hover:border-[var(--blue)]/50 hover:shadow-[var(--sh-sm)] transition-all"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--blue)]/10 text-[var(--blue)]">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </span>
                    <span className="font-semibold text-[var(--ink)] text-sm sm:text-base">{label}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <SectionReveal effect="zoom-in">
          <WhatClientsSay testimonials={testimonials} eyebrow="What teams say" />
        </SectionReveal>
        <SectionDivider />

        <FAQSection
          containerClass={containerClass}
          sectionClassName="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]"
          eyebrow="FAQ"
          titleBefore="Calendar Intelligence "
          titleAccent="questions"
          subtitle="Domain rules, lead gates, and how filtering fits your current scheduling setup."
          items={faqs}
          scrollEffect="fade-up"
        />
        <SectionDivider />

        <GrowthExpertCTA
          containerClass={containerClass}
          sectionClassName="py-16 sm:py-20 lg:py-24 bg-[var(--blue)] text-white"
          eyebrow="Calendar Intelligence"
          titleBefore="Reclaim your calendar for "
          titleAccent="real conversations"
          subtitle="Start free or book a demo—we’ll help you map domains, questions, and links so only high-value calls make it through."
          buttonText="Get started free"
          onButtonClick={handleGetStarted}
          buttonIcon={<Calendar className="w-5 h-5" />}
          privacySlot={null}
          middleSlot={
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left items-stretch">
                {[
                  { icon: Building2, title: "Domain policy", desc: "Allow, block, or review by company email and patterns." },
                  { icon: Filter, title: "Lead quality gates", desc: "Forms and signals that match your ICP before a slot locks." },
                  { icon: PhoneOff, title: "Less spam & noise", desc: "Rate limits and checks that starve junk booking attempts." },
                  { icon: Sparkles, title: "High-value slots", desc: "Confirmed meetings arrive with context and the right video link." },
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
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={handleBookDemo}
                  className="px-5 py-2.5 rounded-[var(--r-s)] text-sm font-semibold text-white border border-white/50 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Book a demo
                </button>
                <button
                  type="button"
                  onClick={handleGoToApp}
                  className="px-5 py-2.5 rounded-[var(--r-s)] text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Go to app →
                </button>
              </div>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default SchedleyManagementPage;
