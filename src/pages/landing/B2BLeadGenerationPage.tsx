import {
  Target,
  ArrowRight,
  BarChart3,
  Laptop,
  Briefcase,
  Landmark,
  Wind,
  Pill,
  ShieldCheck,
  Factory,
  Tv,
  ShoppingCart,
  Signal,
  Plane,
  BookOpen,
  Smartphone,
  Stethoscope,
  FlaskConical,
  Code2,
  HeartPulse,
  Monitor,
  Layers,
  Filter,
  TrendingUp,
} from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import SectionDivider from "@/components/SectionDivider";
import { SectionHeader } from "@/components/SectionHeader";
import SectionReveal from "@/components/SectionReveal";
import { WhatClientsSay } from "@/components/WhatClientsSay";
import { ServiceLinesSection } from "@/components/landing/ServiceLinesSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { GrowthExpertCTA } from "@/components/landing/GrowthExpertCTA";
import { openBookMeeting } from "@/lib/book-meeting";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { SERVICE_ROUTES } from "@/routes/common/routePaths";
import leadGenHeroImage from "@/assets/b2b.png";
import globalLeadGenImage from "@/assets/Global-Lead-Generation-Services-1536x1118.webp";
import researchImage from "@/assets/b2b1.png";
import messageImage from "@/assets/b2b2.png";
import meetingsImage from "@/assets/b2b4.png";
import heroImage from "@/assets/b2b3.png";

/**
 * Pipeline Generation — qualified B2B leads through a repeatable outreach system.
 * Route: /services/pipeline-generation (legacy /services/b2b-lead-generation redirects)
 * Theme: src/theme/theme.css
 */
const B2BLeadGenerationPage = () => {
  useSeoMeta({
    title: "Pipeline Generation — Qualified B2B leads & outbound systems | Schedley",
    description:
      "Inconsistent, low-quality leads waste cycles. Schedley builds a targeted outreach system so your calendar fills with qualified meetings and real buyers—not vanity metrics.",
    pathname: SERVICE_ROUTES.PIPELINE_GENERATION,
  });

  const handleBookDemo = () => {
    openBookMeeting();
  };

  const handleContactUs = () => handleBookDemo();

  const containerClass =
    "max-w-[1200px] w-full min-w-0 mx-auto px-4 xs:px-5 sm:px-6 lg:px-8";

  const valueCards = [
    {
      title: "Stop gambling on lead quality",
      desc: "Inconsistent volume usually means inconsistent ICP fit. We tighten targeting and qualification so every week looks like pipeline—not panic.",
      icon: Filter,
    },
    {
      title: "A system, not a one-off campaign",
      desc: "Targeted outreach runs on a defined operating rhythm: lists, messaging, touches, and handoffs—so leads keep flowing without heroics.",
      icon: Target,
    },
    {
      title: "Meetings with buyers who can buy",
      desc: "We optimize for qualified conversations: right role, right account, right timing—so your closers spend time on deals that can move.",
      icon: TrendingUp,
    },
  ];

  const regions = [
    {
      name: "North America",
      stat: "Pipeline programs · NA",
      detail: "High-intent B2B outreach across technology, services, and SaaS—built for consistent SQLs and booked meetings.",
      percent: 45,
      ringColor: "var(--blue)",
    },
    {
      name: "UK / EMEA",
      stat: "Pipeline programs · EMEA",
      detail: "Localized motion for UK and European buyers with GDPR-aware lists and messaging that respects regional nuance.",
      percent: 35,
      ringColor: "var(--blue-mid)",
    },
    {
      name: "APAC & ANZ",
      stat: "Pipeline programs · APAC",
      detail: "Coverage for fast-growing APAC markets—ideal when you need qualified leads without building a regional SDR bench overnight.",
      percent: 15,
      ringColor: "var(--amber)",
    },
    {
      name: "Global / other",
      stat: "Pipeline programs · WW",
      detail: "Wherever your ICP lives, we align outreach, languages, and handoffs so pipeline stays measurable across regions.",
      percent: 5,
      ringColor: "var(--ink-muted)",
    },
  ];

  const whoWeServe = [
    {
      title: "IT services & consulting",
      desc: "Complex sales, long cycles—steady B2B leads and intro meetings with economic and technical buyers.",
      icon: Laptop,
      tag: "IT",
    },
    {
      title: "Software & product engineering",
      desc: "Engineering-led deals need precise accounts. We fill the top of funnel with qualified opportunities, not random form fills.",
      icon: Layers,
      tag: "SPE",
    },
    {
      title: "B2B SaaS",
      desc: "Pipeline that matches your ACV motion—from mid-market to enterprise—with messaging tied to pain and proof.",
      icon: BarChart3,
      tag: "SaaS",
    },
    {
      title: "BPO / BPM & ops services",
      desc: "Outreach to operations and transformation leaders who buy process, scale, and outcomes—not buzzwords.",
      icon: Briefcase,
      tag: "BPO",
    },
  ];

  const howWeDoSteps = [
    {
      step: "01",
      title: "ICP, accounts & intent signals",
      desc: "We start with who actually buys, who influences, and what triggers a conversation now—not a generic industry list. Data, fit scores, and exclusion rules keep lead quality high from day one.",
      image: researchImage,
    },
    {
      step: "02",
      title: "Messaging that converts attention",
      desc: "We craft angles, proof, and CTAs for each segment so outreach feels relevant at scale. Your value prop lands in the first touch—not buried in slide fifteen.",
      image: messageImage,
    },
    {
      step: "03",
      title: "Multi-touch targeted outreach",
      desc: "Consistent leads come from consistent execution: sequenced email, social, and call points where they make sense—always tied to outcomes and reply handling.",
      image: heroImage,
    },
    {
      step: "04",
      title: "Qualified handoffs & meetings",
      desc: "We don’t celebrate MQLs that go nowhere. Leads and appointments arrive with context—why they engaged, what they care about, and suggested next steps for your AE or founder-led call.",
      image: meetingsImage,
    },
  ];

  const testimonials = [
    {
      quote:
        "Our lead quality was all over the place. Schedley put a real system behind outbound—same ICP, same reporting, and finally predictable meetings each month.",
      name: "AVP Marketing",
      role: "Global IT services firm",
      avatar: "https://i.pravatar.cc/80?img=1",
      rating: 5,
    },
    {
      quote:
        "They treat pipeline targets like their own. We’re seeing more qualified B2B leads and fewer ‘maybe someday’ conversations clogging the calendar.",
      name: "Chief Growth Officer",
      role: "Engineering services",
      avatar: "https://i.pravatar.cc/80?img=12",
      rating: 5,
    },
    {
      quote:
        "Best mix of lead gen discipline and sales empathy. Reps trust the intros because the context on each lead is actually useful.",
      name: "Associate VP Sales",
      role: "Software development company",
      avatar: "https://i.pravatar.cc/80?img=5",
      rating: 5,
    },
    {
      quote:
        "We needed volume without sacrificing fit. Pipeline is up, cost-per-qualified-meeting is down, and marketing finally speaks the same language as sales.",
      name: "CMO",
      role: "Product engineering leader",
      avatar: "https://i.pravatar.cc/80?img=8",
      rating: 5,
    },
  ];

  const industries = [
    { name: "Banking & Finance", icon: Landmark },
    { name: "Energy & Utilities", icon: Wind },
    { name: "Healthcare & Pharma", icon: Pill },
    { name: "Insurance", icon: ShieldCheck },
    { name: "Manufacturing", icon: Factory },
    { name: "Media & Entertainment", icon: Tv },
    { name: "Retail & CPG", icon: ShoppingCart },
    { name: "Telecom", icon: Signal },
    { name: "Travel, Transport & Logistics", icon: Plane },
    { name: "EdTech", icon: BookOpen },
    { name: "FinTech", icon: Smartphone },
    { name: "MedTech", icon: Stethoscope },
    { name: "BioTech", icon: FlaskConical },
    { name: "Software & Hi-Tech", icon: Code2 },
    { name: "HealthTech", icon: HeartPulse },
    { name: "ConsumerTech", icon: Monitor },
  ];

  const campaignLines = [
    {
      title: "Demand & pipeline plays",
      items: [
        "Net-new logo acquisition",
        "Account-based target lists",
        "Event & webinar fill programs",
        "Reactivation of stalled opps",
        "Partner-sourced pipeline",
        "Territory & vertical blitzes",
      ],
    },
    {
      title: "Lead quality & qualification",
      items: [
        "ICP definition & scoring",
        "BANT / MEDDPICC-aligned discovery",
        "Disqualification rules that protect rep time",
        "Sales-ready vs nurture routing",
        "CRM hygiene & handoff SLAs",
      ],
    },
    {
      title: "Outbound channels",
      items: [
        "Email-first sequences",
        "LinkedIn & multi-threading",
        "Call-assisted touches where needed",
        "Intent & trigger-based outreach",
        "Content-led follow-up paths",
      ],
    },
    {
      title: "Revenue team alignment",
      items: [
        "Shared definitions of qualified leads",
        "Weekly pipeline reviews & tuning",
        "Message testing with sales feedback",
        "Forecast-friendly reporting",
        "Playbooks per segment or SKU",
      ],
    },
    {
      title: "What you measure with us",
      items: [
        "Qualified leads per week",
        "Meetings held & show rate",
        "Pipeline created & stage velocity",
        "Cost per qualified conversation",
        "Win rate on sourced opportunities",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is Pipeline Generation?",
      a: "Pipeline Generation is how we describe a full-funnel B2B lead program: targeted outreach plus qualification and meeting-setting—designed so you get consistent, high-quality opportunities instead of sporadic spikes and dry weeks.",
    },
    {
      q: "Why are our leads inconsistent today?",
      a: "Usually it’s mixed ICPs, weak lists, one-off campaigns, or handoffs that drop replies. We fix the system: who you target, how you message, how many touches you run, and how sales receives each lead—so quality stabilizes.",
    },
    {
      q: "How is this different from buying lead lists?",
      a: "Lists are static data. Pipeline Generation is active: research, personalized outreach, and qualification. You get conversations with people who’ve actually engaged—not cold records that decay in a spreadsheet.",
    },
    {
      q: "Do you only work with enterprise?",
      a: "We work across mid-market and enterprise B2B. The motion scales to your ACV: tighter qualification for complex deals, faster cycles where the buying committee is smaller. Everything stays tied to your real ICP.",
    },
    {
      q: "What does success look like in the first 90 days?",
      a: "Early on you’ll see clearer ICP alignment, reply quality improving, and a steady rhythm of qualified meetings. By 90 days most teams benchmark leads-per-week, pipeline dollars influenced, and meeting-to-opportunity conversion—not just lead count.",
    },
  ];

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main className="min-w-0">
        <section className="relative overflow-x-hidden bg-[var(--ink)] py-12 sm:py-20 lg:py-24">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="relative z-10 min-w-0 text-center lg:text-left">
                  <p className="mb-4 inline-block rounded-[var(--r-s)] border border-[var(--blue)] bg-[var(--ink)]/80 px-4 py-2 text-[10px] xs:text-xs font-bold uppercase tracking-widest text-[var(--blue)]">
                    Pipeline generation
                  </p>
                  <h1 className="b2b-display mb-4 text-[1.65rem] xs:text-3xl leading-[1.15] text-white sm:text-4xl lg:text-5xl">
                    Get More Qualified B2B Leads
                  </h1>
                  <p className="mb-4 text-sm sm:text-base leading-relaxed text-white/90">
                    <strong className="text-white">Problem:</strong> Leads are inconsistent and low quality.{" "}
                    <strong className="text-white">Solution:</strong> We build a system to bring consistent leads
                    through targeted outreach. <strong className="text-white">Result:</strong> More qualified meetings
                    and clients—without your team living in spreadsheets and cold lists.
                  </p>
                  <p className="mb-6 text-xs sm:text-sm text-white/75">
                    Schedley combines research, messaging, and disciplined follow-through so your pipeline reflects real
                    buyers—not vanity metrics.
                  </p>
                  <button
                    type="button"
                    onClick={handleContactUs}
                    className="inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-[var(--r-s)] border-2 border-[var(--blue)] bg-[var(--blue)] px-5 sm:px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:border-[var(--blue-dark)] hover:bg-[var(--blue-dark)] touch-manipulation"
                    style={{ boxShadow: "var(--sh-blue)" }}
                  >
                    <span className="text-center leading-snug">Schedule a pipeline call</span>
                    <ArrowRight className="h-5 w-5 shrink-0" />
                  </button>
                </div>
                <div className="relative z-10 flex min-w-0 justify-center lg:justify-end">
                  <div className="relative aspect-[4/3] w-full max-w-lg min-h-0 overflow-hidden rounded-[var(--r-2xl)] shadow-[var(--sh-lg)] lg:aspect-[5/4]">
                    <img
                      src={leadGenHeroImage}
                      alt="Qualified B2B leads and pipeline growth"
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

        <section className="bg-[var(--surface)] py-12 sm:py-20 lg:py-24 overflow-x-hidden">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <div className="mx-auto mb-8 sm:mb-12 max-w-3xl text-center px-1">
                <span className="mb-4 sm:mb-6 inline-flex rounded-full border border-[var(--blue)]/20 bg-[var(--blue-ghost)] px-3 py-1.5 text-[10px] xs:text-xs font-semibold uppercase tracking-wider text-[var(--blue)]">
                  Qualified B2B leads
                </span>
                <h2 className="b2b-display mb-4">
                  <span className="block text-[1.35rem] xs:text-3xl font-semibold text-[var(--ink)] sm:text-4xl lg:text-5xl">
                    We build pipeline
                  </span>
                  <span
                    className="mt-1 block text-[clamp(1.75rem,8vw,3.75rem)] font-extrabold tracking-tight leading-tight sm:text-5xl lg:text-6xl break-words px-1"
                    style={{ WebkitTextStroke: "1.5px var(--blue)", color: "transparent" }}
                  >
                    YOU CLOSE
                  </span>
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--ink-muted)]">
                  Your closers shouldn’t prospect full-time. We run the targeted outbound system—lists, sequences, and
                  qualification—so every week delivers qualified B2B leads and real conversations, not random inbound
                  noise.
                </p>
              </div>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {valueCards.map(({ title, desc, icon: Icon }) => (
                  <div
                    key={title}
                    className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6 min-w-0 text-center shadow-[var(--sh-sm)] transition-all hover:border-[var(--line-strong)] hover:shadow-[var(--sh-md)] lg:text-left"
                  >
                    <div className="flex justify-center lg:justify-start">
                      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-[var(--r-m)] border-2 border-[var(--blue)] bg-[var(--white)] text-[var(--blue)]">
                        <Icon className="h-7 w-7" strokeWidth={2} />
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-[var(--ink)]">{title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{desc}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <section className="bg-[var(--ink)] py-12 text-white sm:py-20 lg:py-24 overflow-x-hidden">
          <div className={containerClass}>
            <SectionReveal effect="slide-left">
              <div className="mb-10 sm:mb-16 grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="min-w-0 text-center lg:text-left">
                  <SectionHeader
                    variant="light"
                    eyebrow="Global B2B"
                    titleBefore="Pipeline "
                    titleAccent="everywhere you sell"
                    subtitle="Whether your buyers are in North America, EMEA, or APAC, we run localized, compliant outreach that still rolls up to one pipeline story your leadership can trust."
                    className="mb-6 max-w-none text-left"
                  />
                  <button
                    type="button"
                    onClick={handleContactUs}
                    className="inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-[var(--r-s)] border-2 border-[var(--blue)] bg-[var(--blue)] px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all hover:border-[var(--blue-dark)] hover:bg-[var(--blue-dark)] touch-manipulation"
                    style={{ boxShadow: "var(--sh-blue)" }}
                  >
                    Contact us <ArrowRight className="h-5 w-5 shrink-0" />
                  </button>
                </div>
                <div className="flex min-w-0 justify-center lg:justify-end">
                  <div className="relative aspect-[1536/1118] max-h-[260px] xs:max-h-[300px] w-full max-w-lg min-h-0 overflow-hidden rounded-[var(--r-2xl)] shadow-[var(--sh-lg)] sm:max-h-[340px] lg:max-h-[380px]">
                    <img
                      src={globalLeadGenImage}
                      alt="Global B2B pipeline and qualified lead programs"
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-8 sm:gap-10 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                {regions.map(({ name, stat, detail, percent, ringColor }) => {
                  const circumference = 2 * Math.PI * 16;
                  const filled = (percent / 100) * circumference;
                  return (
                    <div key={name} className="text-center">
                      <h3 className="mb-6 text-lg font-bold text-white">{name}</h3>
                      <div className="relative mx-auto mb-6 inline-flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36" aria-hidden>
                          <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke={ringColor}
                            strokeWidth="3"
                            strokeDasharray={`${filled} ${circumference}`}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dasharray 0.5s ease" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                          <span className="mb-1 text-2xl font-bold text-white sm:text-3xl">{percent}%</span>
                          <span className="max-w-[85%] text-[10px] leading-tight text-white/80 sm:text-xs">{stat}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">{detail}</p>
                    </div>
                  );
                })}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <section className="bg-[var(--surface)] py-12 sm:py-20 lg:py-24 overflow-x-hidden">
          <div className={containerClass}>
            <SectionReveal effect="slide-right">
              <SectionHeader
                eyebrow="B2B segments"
                titleBefore="Who needs "
                titleAccent="consistent pipeline"
                subtitle="If your revenue depends on qualified B2B conversations, we tailor outreach, qualification, and meeting-setting to how your buyers actually purchase."
                className="mb-8 sm:mb-10"
              />
              <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
                {whoWeServe.map(({ title, desc, icon: Icon, tag }) => (
                  <div
                    key={title}
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-5 sm:p-6 min-w-0 transition-all hover:border-[var(--line-strong)] hover:shadow-[var(--sh-sm)]"
                    onClick={handleContactUs}
                    onKeyDown={(e) => e.key === "Enter" && handleContactUs()}
                  >
                    <span className="mb-2 block text-xs font-bold text-[var(--blue)]">{tag}</span>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--r-m)] bg-[var(--blue-lite)] text-[var(--blue)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-bold text-[var(--ink)]">{title}</h3>
                    <p className="text-sm text-[var(--ink-muted)]">{desc}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <section className="bg-[var(--surface)] py-12 sm:py-20 lg:py-24 overflow-x-hidden">
          <div className={containerClass}>
            <SectionReveal effect="slide-left">
              <SectionHeader
                eyebrow="How we do it"
                titleBefore="Your pipeline "
                titleAccent="system"
                subtitle="Four connected layers—from ICP to qualified meetings—so B2B leads stay consistent and your team always knows what to do next."
                className="mb-10 sm:mb-12"
              />
              <div className="space-y-10 sm:space-y-12 lg:space-y-16">
                {howWeDoSteps.map(({ step, title, desc, image }, index) => (
                  <div key={step} className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className={`min-w-0 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="mb-4 flex flex-col gap-1 xs:flex-row xs:items-baseline xs:gap-3">
                        <span className="text-3xl font-bold leading-none text-[var(--blue)] xs:text-4xl sm:text-5xl">
                          {step}
                        </span>
                        <h3 className="text-base font-semibold text-[var(--ink)] sm:text-lg lg:text-xl">{title}</h3>
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed text-[var(--ink-muted)]">{desc}</p>
                    </div>
                    <div className={`min-w-0 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="aspect-[16/10] sm:aspect-[4/2] min-h-0 w-full overflow-hidden rounded-[var(--r-xl)] border border-[var(--line)] shadow-[var(--sh-sm)]">
                        <img
                          src={image}
                          alt={title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <section className="bg-[var(--white)] py-12 sm:py-20 lg:py-24 overflow-x-hidden">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <SectionHeader
                eyebrow="B2B experience"
                titleBefore="Industries we run "
                titleAccent="pipeline for"
                subtitle="Deep experience across regulated and fast-moving sectors—always with messaging and qualification tuned to how those buyers buy."
                className="mb-8 sm:mb-10"
              />
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {industries.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="flex min-w-0 items-center gap-3 sm:gap-4 rounded-[var(--r-m)] border border-[var(--line)] bg-[var(--surface)] p-3 sm:p-4 transition-all hover:border-[var(--blue)] hover:bg-[var(--blue-ghost)]"
                  >
                    <span
                      className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-[var(--r-m)] bg-[var(--blue-lite)] text-[var(--blue)]"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                    </span>
                    <span className="min-w-0 text-xs sm:text-sm lg:text-base font-semibold text-[var(--ink)] leading-snug break-words">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <ServiceLinesSection
          containerClass={containerClass}
          eyebrow="Pipeline playbook"
          titleBefore="What we execute "
          titleAccent="for B2B teams"
          lines={campaignLines}
          subtitle="Programs map to how you sell—from net-new demand to qualification, handoffs, and the metrics revenue leaders care about."
          scrollEffect="zoom-in"
        />
        <SectionDivider />

        <SectionReveal effect="zoom-in">
          <WhatClientsSay
            testimonials={testimonials}
            title="Pipeline results teams actually measure"
            subtitle="Fewer bad leads, more qualified B2B conversations, and a clearer line from outreach to revenue."
          />
        </SectionReveal>
        <SectionDivider />

        <FAQSection
          containerClass={containerClass}
          sectionClassName="py-16 sm:py-20 lg:py-24 bg-[var(--white)]"
          eyebrow="FAQ"
          titleBefore="Frequently asked "
          titleAccent="questions"
          subtitle="Qualified B2B leads, pipeline systems, and how we work with your sales team."
          items={faqs}
          cardVariant="surface"
          scrollEffect="fade-up"
        />
        <SectionDivider />

        <GrowthExpertCTA
          containerClass={containerClass}
          eyebrow="Get started"
          titleBefore="Build a pipeline of "
          titleAccent="qualified B2B leads"
          subtitle="Book a call—we’ll review your ICP, show how our targeted outreach system fits your motion, and map a path to consistent meetings and clients."
          buttonText="Book a meeting now"
          onButtonClick={handleBookDemo}
        />
      </main>
    </div>
  );
};

export default B2BLeadGenerationPage;
