import {
  Target,
  Users,
  ArrowRight,
  CheckCircle,
  Search,
  MessageCircle,
  Calendar,
  BarChart3,
  Zap,
  Mail,
  RefreshCw,
  Sparkles,
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
import leadGenHeroImage from "@/assets/Lead-Generation.webp";
import emailImage from "@/assets/email.png";
import approach01Image from "@/assets/ai1.png";
import approach02Image from "@/assets/ai2.png";
import approach03Image from "@/assets/ai3.png";
import howItWorksHeroImage from "@/assets/download.png";

/**
 * AI Outreach service page — personalized email at scale.
 * Route: /services/ai-outreach (legacy /services/b2b-appointment-scheduling redirects here)
 * Theme: src/theme/theme.css
 */

const B2BAppointmentSchedulingPage = () => {
  const handleBookDemo = () => {
    openBookMeeting();
  };

  const handleContactUs = () => {
    handleBookDemo();
  };

  const containerClass =
    "max-w-[1200px] w-full min-w-0 mx-auto px-4 xs:px-5 sm:px-6 lg:px-8";

  /** Pain → outcome (problem: manual outreach doesn’t scale) */
  const challenges = [
    {
      title: "Manual outreach doesn’t scale",
      outcome: "Automate sends and follow-ups without losing the human touch.",
      icon: Users,
    },
    {
      title: "Follow-ups fall through the cracks",
      outcome: "Consistent, timed nudges until you get a reply or a clear outcome.",
      icon: RefreshCw,
    },
    {
      title: "Generic blasts get ignored",
      outcome: "Every message reflects account context, role, and timing—not mail merge spam.",
      icon: Mail,
    },
    {
      title: "Reps live in the inbox, not on deals",
      outcome: "Free your team to run calls while AI handles volume and sequencing.",
      icon: Zap,
    },
  ];

  /** Solution: AI-powered personalization + follow-up */
  const approachSteps = [
    {
      step: "01",
      title: "Strategy, ICP & messaging playbook",
      points: [
        "We align on your ideal customer, offer, and proof points worth leading with.",
        "We define tone, objections, and success metrics so every sequence has a clear job.",
        "You get a repeatable narrative—not one-off campaigns that die after week one.",
      ],
      image: approach01Image,
      imageAlt: "Team planning AI outreach strategy",
    },
    {
      step: "02",
      title: "AI-crafted personalization at scale",
      points: [
        "Our system researches accounts and roles to tailor opens, hooks, and CTAs.",
        "Variants and A/B tests run continuously so messaging improves with data.",
        "Deliverability and sending patterns are monitored to protect your domain reputation.",
      ],
      image: approach02Image,
      imageAlt: "Personalized email outreach workflow",
    },
    {
      step: "03",
      title: "Smart follow-up & handoff to meetings",
      points: [
        "Multi-step sequences trigger on opens, clicks, silence, or replies—automatically.",
        "Hot replies route to your reps with context so responses are fast and on-message.",
        "Booked meetings and pipeline impact roll up in reporting you can actually use.",
      ],
      image: approach03Image,
      imageAlt: "Pipeline growth from automated follow-ups",
    },
  ];

  const howItWorks = [
    {
      title: "Discovery & ICP",
      desc: "We document who you sell to, what moves a conversation forward, and what “good” replies look like for your motion.",
      icon: Search,
    },
    {
      title: "Playbook & assets",
      desc: "We build message frameworks, proof snippets, and guardrails so AI stays on-brand and compliant.",
      icon: Target,
    },
    {
      title: "AI personalization",
      desc: "Each touch is composed from live context—company, role, trigger events—so it reads like one-to-one outreach.",
      icon: Sparkles,
    },
    {
      title: "Send & monitor",
      desc: "Volume, timing, and domains are tuned for inbox health while we watch bounces, spam signals, and engagement.",
      icon: BarChart3,
    },
    {
      title: "Follow-up sequences",
      desc: "Automated second, third, and fourth touches keep threads warm without manual chasing.",
      icon: MessageCircle,
    },
    {
      title: "Replies → calendar",
      desc: "Interested prospects get clear next steps and scheduling links so meetings land on the right calendars.",
      icon: Calendar,
    },
  ];

  const faqs = [
    {
      q: "What is AI outreach?",
      a: "AI outreach uses intelligent systems to draft, personalize, and sequence emails to your target accounts—then follow up automatically. Your team focuses on qualified replies and meetings instead of copying templates and chasing ghosts in the inbox.",
    },
    {
      q: "How is this different from bulk email or cold templates?",
      a: "Bulk tools optimize for volume; we optimize for relevance. Messages adapt to account and persona context, and follow-ups react to behavior (opens, silence, replies). The goal is higher reply rates and booked conversations—not the biggest send count.",
    },
    {
      q: "Will prospects know it’s automated?",
      a: "Good outreach should feel intentional, not robotic. We combine AI with human-led strategy and review loops so copy sounds like your brand. Many prospects only notice that you showed up with a useful point of view at the right time.",
    },
    {
      q: "How do you protect deliverability?",
      a: "We respect warm-up, domain configuration, sending limits, and list hygiene. Sequences are staged so you don’t spike spam complaints. If something drifts, we adjust before it damages your sender reputation.",
    },
    {
      q: "What results should we expect?",
      a: "Outcomes depend on ICP fit and offer strength, but the motion is built for more replies and more meetings than manual one-off outreach at the same headcount. We track replies, meetings booked, and pipeline tied to outreach so you can see impact clearly.",
    },
  ];

  const campaignLines = [
    {
      title: "SaaS & B2B technology",
      items: [
        "Product-led and sales-led motions",
        "Technical and economic buyers",
        "Demo and POC conversations",
        "Renewal and expansion outreach",
        "Partner and channel introductions",
      ],
    },
    {
      title: "Professional services",
      items: [
        "Consulting and advisory firms",
        "Legal, finance, and ops leaders",
        "RFP and project-based selling",
        "Thought leadership follow-ups",
        "Event and webinar nurture",
      ],
    },
    {
      title: "Agencies & growth teams",
      items: [
        "New business development",
        "Outbound for retainers and projects",
        "Creative and performance pitches",
        "Vertical-specific campaigns",
        "Re-engagement of dormant accounts",
      ],
    },
    {
      title: "Mid-market & enterprise",
      items: [
        "Multi-threaded account outreach",
        "Security and procurement timelines",
        "Executive briefing invitations",
        "Territory and ABM coverage",
        "Sales + marketing alignment on messaging",
      ],
    },
    {
      title: "Use cases",
      items: [
        "Cold outbound to net-new logos",
        "Reactivation of old opportunities",
        "Post-demo and post-event sequences",
        "Renewal risk and save plays",
        "Recruiting and partner outreach",
      ],
    },
  ];

  const testimonials = [
    {
      quote:
        "Replies doubled in six weeks. The follow-ups alone would have taken our team another two SDRs—we finally scale personalization.",
      name: "Sarah M.",
      role: "VP Sales, B2B SaaS",
      avatar: "https://i.pravatar.cc/80?img=1",
      rating: 5,
    },
    {
      quote:
        "It doesn’t feel like ‘AI email.’ Prospects reference specific lines from our playbook. Meetings on the calendar went up without more headcount.",
      name: "James K.",
      role: "Head of Growth",
      avatar: "https://i.pravatar.cc/80?img=12",
      rating: 5,
    },
    {
      quote:
        "Manual sequences were killing us. Now every account gets consistent touches and our reps only jump in when someone is warm.",
      name: "Priya L.",
      role: "Director of Revenue Operations",
      avatar: "https://i.pravatar.cc/80?img=5",
      rating: 4.5,
    },
    {
      quote:
        "Clear reporting on replies and meetings booked. Finally tied outbound to pipeline instead of just ‘emails sent.’",
      name: "Michael R.",
      role: "CRO",
      avatar: "https://i.pravatar.cc/80?img=8",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main className="min-w-0">
        <section className="relative overflow-x-hidden bg-[var(--ink)] py-12 sm:py-20 lg:py-24">
          <div className={containerClass}>
            <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="relative z-10 min-w-0 text-center lg:text-left">
                <p className="mb-4 inline-block rounded-[var(--r-s)] border border-[var(--blue)] bg-[var(--ink)]/80 px-4 py-2 text-[10px] xs:text-xs font-bold uppercase tracking-widest text-[var(--blue)]">
                  AI outreach
                </p>
                <h1 className="b2b-display mb-4 text-[1.65rem] xs:text-3xl leading-[1.15] text-white sm:text-4xl lg:text-5xl">
                  Send Personalized Emails Automatically
                </h1>
                <p className="mb-6 text-sm sm:text-base leading-relaxed text-white/90">
                  <strong className="text-white">Problem:</strong> Manual outreach doesn&apos;t scale.{" "}
                  <strong className="text-white">Solution:</strong> An AI-powered system sends and follows up with
                  personalized emails. <strong className="text-white">Result:</strong> Higher replies and booked
                  meetings—without hiring an army of SDRs to live in the inbox.
                </p>
                <button
                  type="button"
                  onClick={handleContactUs}
                  className="inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-[var(--r-s)] border-2 border-[var(--blue)] bg-[var(--blue)] px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:border-[var(--blue-dark)] hover:bg-[var(--blue-dark)] touch-manipulation"
                  style={{ boxShadow: "var(--sh-blue)" }}
                >
                  Contact Us <ArrowRight className="h-5 w-5 shrink-0" />
                </button>
              </div>
              <div className="relative z-10 flex min-w-0 justify-center lg:justify-end">
                <div className="relative aspect-[4/3] w-full max-w-lg min-h-0 overflow-hidden rounded-[var(--r-2xl)] shadow-[var(--sh-lg)] lg:aspect-[5/4]">
                  <img
                    src={leadGenHeroImage}
                    alt="AI-powered personalized email outreach at scale"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <SectionDivider />

        <section className="bg-[var(--white)] py-12 sm:py-20 lg:py-24 overflow-x-hidden">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <SectionHeader
                eyebrow="The problem"
                titleBefore="Manual outreach doesn’t scale—"
                titleAccent="here’s what breaks first"
                subtitle="When every touch is manual, pipeline becomes unpredictable. These are the gaps AI outreach is built to fix."
                className="mb-8 sm:mb-10"
              />
              <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
                {challenges.map(({ title, outcome, icon: Icon }) => (
                  <div
                    key={title}
                    className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6 min-w-0 transition-all hover:border-[var(--line-strong)] hover:shadow-[var(--sh-sm)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--r-m)] bg-[var(--blue-ghost)] text-[var(--blue)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold text-[var(--ink)]">{title}</h3>
                    <p className="mb-4 text-sm text-[var(--ink-muted)]">{outcome}</p>
                    <button
                      type="button"
                      onClick={handleContactUs}
                      className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[var(--blue)] hover:underline"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </button>
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
              <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="min-w-0">
                  <SectionHeader
                    eyebrow="The solution"
                    titleBefore="AI-powered emails that "
                    titleAccent="send, personalize, and follow up"
                    subtitle="One system handles the volume your team can’t—so every prospect gets thoughtful touches until they reply or opt out."
                    className="mb-6 max-w-none text-left"
                  />
                  <div className="space-y-5 leading-relaxed text-[var(--ink-muted)]">
                    <p>
                      Your reps shouldn’t spend half their week rewriting the same intro lines or chasing no-responses.
                      Schedley’s AI outreach layer learns your value proposition, respects your voice, and applies it
                      across thousands of conversations—with follow-ups that trigger on behavior, not guesswork.
                    </p>
                    <p>
                      Personalization isn’t a mail-merge field. We combine account context, persona, and timing so each
                      message earns attention. When someone engages, your team steps in with full thread context and
                      suggested next steps.
                    </p>
                    <p>
                      The outcome is simple: <strong className="text-[var(--ink)]">more replies</strong>,{" "}
                      <strong className="text-[var(--ink)]">more qualified meetings</strong>, and a pipeline that grows
                      without linear hiring in outbound.
                    </p>
                  </div>
                </div>
                <div className="flex h-full w-full min-w-0 justify-center lg:justify-end">
                  <div className="relative aspect-[4/3] w-full max-w-lg min-h-0 overflow-hidden rounded-[var(--r-xl)] lg:rounded-none lg:aspect-auto lg:min-h-[320px]">
                    <img
                      src={emailImage}
                      alt="Pipeline growth from automated personalized outreach"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <section className="bg-[var(--white)] py-12 sm:py-20 lg:py-24 overflow-x-hidden">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
              <SectionHeader
                eyebrow="Our approach"
                titleBefore="How we deploy "
                titleAccent="AI outreach for you"
                subtitle="From playbook to production: strategy, personalization engine, and meeting-ready handoffs."
                className="mb-10 sm:mb-12 lg:mb-16"
              />
              <div className="space-y-10 sm:space-y-14 lg:space-y-20">
                {approachSteps.map(({ step, title, points, image, imageAlt }, index) => (
                  <div key={step} className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className="relative min-w-0">
                      {index < approachSteps.length - 1 && (
                        <div
                          className="absolute left-1/2 top-full mt-12 w-1 -translate-x-1/2 bg-[var(--blue)]"
                          style={{ height: "4rem" }}
                          aria-hidden
                        />
                      )}
                      <div className="mb-4 flex flex-col gap-1 xs:flex-row xs:items-baseline xs:gap-3">
                        <span className="text-3xl font-bold leading-none text-[var(--blue)] xs:text-4xl sm:text-5xl">
                          {step}
                        </span>
                        <h3 className="text-base font-semibold text-[var(--ink)] sm:text-lg lg:text-xl">{title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {points.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-[var(--ink-muted)]">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--blue)]"
                              aria-hidden
                            >
                              <CheckCircle className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="aspect-[16/10] min-h-0 w-full overflow-hidden rounded-[var(--r-xl)] border border-[var(--line)] shadow-[var(--sh-sm)] sm:aspect-[4/1.5] lg:aspect-[3/1.5]">
                      <img
                        src={image}
                        alt={imageAlt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <ServiceLinesSection
          containerClass={containerClass}
          eyebrow="Where it fits"
          titleBefore="AI outreach across "
          titleAccent="teams & motions"
          subtitle="Same engine—tailored plays for how you sell and who you sell to."
          lines={campaignLines}
          scrollEffect="slide-right"
        />
        <SectionDivider />

        <section className="bg-[var(--white)] py-12 sm:py-20 lg:py-24 overflow-x-hidden">
          <div className={containerClass}>
            <SectionReveal effect="slide-left">
              <SectionHeader
                eyebrow="How it works"
                titleBefore="From first send to "
                titleAccent="booked meeting"
                subtitle="A clear operating rhythm: strategy, AI personalization, delivery, follow-up, and handoff—measured end to end."
                className="mb-10 sm:mb-12 lg:mb-16"
              />
              <div className="grid items-start gap-8 lg:gap-0 lg:grid-cols-[1fr_1fr] lg:gap-12">
                <div className="relative order-2 flex h-full w-full min-w-0 justify-center lg:order-1 lg:justify-center">
                  <div className="relative mx-auto aspect-[4/3] w-full max-w-md min-h-0 overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line)] shadow-[var(--sh-md)]">
                    <img
                      src={howItWorksHeroImage}
                      alt="AI email outreach workflow"
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-[var(--r-m)] border border-[var(--line)] bg-[var(--white)]/95 p-3 sm:p-4 shadow-[var(--sh-sm)] backdrop-blur-sm">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                        Outreach health
                      </p>
                      <ul className="space-y-1 text-xs text-[var(--ink-soft)]">
                        <li>Opens · Replies · Meetings booked</li>
                        <li>Sequence performance by persona</li>
                        <li>Domain & deliverability signals</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="order-1 flex min-h-0 w-full min-w-0 gap-0 lg:order-3 lg:min-h-[320px]">
                  <div className="hidden w-px shrink-0 self-stretch bg-[var(--blue)] lg:block lg:min-h-[340px]" aria-hidden />
                  <div className="hidden min-w-0 flex-1 flex-col gap-8 pr-6 lg:flex">
                    {howItWorks.map(({ title, desc, icon: Icon }) => (
                      <div key={title}>
                        <div className="flex items-center gap-3">
                          <div className="h-0.5 w-3 shrink-0 bg-[var(--blue)]" aria-hidden />
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--blue-dark)] bg-[var(--blue)] text-[var(--white)]"
                            aria-hidden
                          >
                            <Icon className="h-4 w-4" strokeWidth={2} />
                          </span>
                          <h3 className="font-semibold text-[var(--ink)]">{title}</h3>
                        </div>
                        <p className="mt-1.5 pl-[calc(12px+8px+36px+12px)] text-sm leading-relaxed text-[var(--ink-muted)]">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-8 lg:hidden">
                    {howItWorks.map(({ title, desc, icon: Icon }) => (
                      <div key={title} className="flex items-start gap-4">
                        <span
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--blue-dark)] bg-[var(--blue)] text-[var(--white)]"
                          aria-hidden
                        >
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1.5 font-semibold text-[var(--ink)]">{title}</h3>
                          <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <SectionReveal effect="zoom-in">
          <WhatClientsSay
            testimonials={testimonials}
            title="What Our Clients Say"
            subtitle="Teams using Schedley for AI outreach see more replies, cleaner follow-up, and meetings that actually show up on the calendar."
          />
        </SectionReveal>
        <SectionDivider />

        <FAQSection
          containerClass={containerClass}
          sectionClassName="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]"
          eyebrow="FAQ"
          titleBefore="Frequently asked "
          titleAccent="questions"
          subtitle="Straight answers on AI outreach, personalization, and results."
          items={faqs}
          scrollEffect="fade-up"
        />

        <GrowthExpertCTA
          containerClass={containerClass}
          eyebrow="Get started"
          titleBefore="Ready for higher replies & "
          titleAccent="more meetings?"
          subtitle="Book a strategy call—we’ll map your ICP, show how AI outreach fits your motion, and outline a path to scaled personalization with automated follow-up."
          buttonText="Book a meeting now"
          onButtonClick={handleBookDemo}
        />
      </main>
    </div>
  );
};

export default B2BAppointmentSchedulingPage;
