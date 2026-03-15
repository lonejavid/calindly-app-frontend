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
} from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import SectionDivider from "@/components/SectionDivider";
import { SectionHeader } from "@/components/SectionHeader";
import SectionReveal from "@/components/SectionReveal";
import { WhatClientsSay } from "@/components/WhatClientsSay";
import { ServiceLinesSection } from "@/components/landing/ServiceLinesSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { GrowthExpertCTA } from "@/components/landing/GrowthExpertCTA";
import leadGenHeroImage from "@/assets/Lead-Generation.webp";

/** Section images – theme-aligned visuals */
const SECTION_IMAGES = {
  buildPipeline: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  approach01: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  approach02: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  approach03: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  howItWorksHero: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
};

/**
 * B2B Appointment Setting page – section structure and content aligned with
 * https://beyondcodes.com/appointment-setting/
 * Theme: src/theme/theme.css
 */

const B2BAppointmentSchedulingPage = () => {
  const handleBookDemo = () => {
    window.open(
      "https://www.schedley.com/lonejavida829/schedley-demo-see-how-client-acquisition-works-9040",
      "_blank"
    );
  };

  const handleContactUs = () => {
    handleBookDemo();
  };

  const containerClass = "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8";

  // ─── Section 1: Hero (same as Beyond Codes) ─────────────────────────────
  // ─── Section 2: Meet the Right People – 4 challenges with Learn More ──────
  const challenges = [
    { title: "Your outreach lacks precision", outcome: "Attain targeted lead engagement.", icon: Target },
    { title: "Waiting for opportunities is risky", outcome: "Secure a steady influx of quality appointments.", icon: Calendar },
    { title: "Having a tough time building a sales team", outcome: "Opt for dedicated outsourced SDRs.", icon: Users },
    { title: "Struggling with continuous speed", outcome: "Secure maximum high-value appointments monthly.", icon: Zap },
  ];

  // ─── Section 4: B2B Appointment Setting Approach – 3 steps (Beyond Codes UI: row = left copy + right image) ───
  const approachSteps = [
    {
      step: "01",
      title: "SMART Outreach with In-Depth Research",
      points: [
        "Thoroughly research prospects before client engagement.",
        "Ensure personalized interactions for informed discussions.",
        "Guarantee personalized engagements through SMART methodology.",
      ],
      image: SECTION_IMAGES.approach01,
      imageAlt: "SMART Outreach with In-Depth Research",
    },
    {
      step: "02",
      title: "Personalized Account Selection",
      points: [
        "Create a well-curated list of potential clients.",
        "Choose depending on precise parameters that match your offerings.",
        "Enhance the relevance and efficacy of outreach campaigns.",
      ],
      image: SECTION_IMAGES.approach02,
      imageAlt: "Personalized Account Selection",
    },
    {
      step: "03",
      title: "Database Optimization",
      points: [
        "Leverage an extensive GDPR-compliant database of decision-makers.",
        "Target the ideal audience for your message.",
        "Ensure engagement with key stakeholders.",
      ],
      image: SECTION_IMAGES.approach03,
      imageAlt: "Database Optimization",
    },
  ];

  // ─── Section 7: How Our Sales Appointment Setting Works – 6 steps ───────
  const howItWorks = [
    { title: "Needs Assessment", desc: "We start by doing an extensive need analysis to understand your company's goals and target audience.", icon: Search },
    { title: "Customized Strategy", desc: "We build customized B2B appointment setting strategies aligned with your industry, goals, and audience.", icon: Target },
    { title: "Data-driven Research", desc: "We do extensive research to identify & qualify possible leads, ensuring precise target decision-makers.", icon: BarChart3 },
    { title: "Engaging Outreach", desc: "We interact with prospects using targeted messages emphasizing the value proposition & scheduling B2B sales appointments.", icon: MessageCircle },
    { title: "Appointment Scheduling", desc: "We arrange schedules between your team and prospect, ensuring a fast appointment setup process.", icon: Calendar },
    { title: "Transparent Reporting", desc: "We maintain open communication, offering on-time updates on status, metrics, and outcomes to foster transparency.", icon: BarChart3 },
  ];

  // ─── Section 8: FAQ – 5 questions (same as Beyond Codes) ─────────────────
  const faqs = [
    {
      q: "What is a B2B Appointment Setting Service?",
      a: "B2B appointment setting service eases your sales process by saving your team from sorting through inefficient leads. Instead, they focus on closing promising prospects through set-up calls or meetings. These services manage schedules and calendars efficiently, directing qualifying leads to your sales team and improving potential client conversion.",
    },
    {
      q: "What are the responsibilities of a B2B appointment setter?",
      a: "A B2B appointment setter orchestrates official meetings between qualified sales leads and closers in business-to-business interactions. This strategic process allows sales representatives to nurture relationships with prospects, advancing them through the lead cycle by systematically planning and conducting these crucial appointments.",
    },
    {
      q: "How does appointment setting differ from lead generation?",
      a: "Appointment setup focuses on organizing meetings between salespeople and qualifying prospects, making the conversion process more efficient. In comparison, lead generation entails discovering and attracting prospective clients. While both help the sales process, appointment setting goes beyond simply generating leads and actively facilitates meaningful conversations to drive deals forward.",
    },
    {
      q: "How can I, as an SDR, successfully secure B2B appointments?",
      a: "To secure B2B appointments as a Sales Development Representative (SDR), prioritize thorough research on prospects, tailor compelling value propositions, and utilize targeted outreach methods such as personalized emails or calls. Establish credibility, showcase the benefits of a meeting, and offer flexible scheduling options to increase the likelihood of successful appointments.",
    },
    {
      q: "Who needs appointment setting services?",
      a: "Appointment setting services help various B2B companies, including sales teams, healthcare experts, and real estate agents. Whether you sell B2B products or services, these services will help you manage appointments more effectively and increase overall business productivity.",
    },
  ];

  // ─── Section 6: Campaigns Executed Across Service Lines (same order as Beyond Codes) ───
  const campaignLines = [
    {
      title: "Software & Technology",
      items: ["Digital Experience", "Digital Transformation", "AI/ML/RPA", "Software Product Engineering", "Cyber Security & Risk Services", "Quality Engineering & Testing", "Digital Design & Development", "Intelligent Automation", "IT Governance, Risk, and Compliance"],
    },
    {
      title: "Software Product Engineering",
      items: ["Digital Manufacturing", "Engineering Application Support", "Engineering Documentation", "Design & Development", "DSP & Vision Processing", "UI/UX Design Engineering", "Software Frameworks and Solutions", "Cloud Engineering"],
    },
    {
      title: "Cloud & Infrastructure",
      items: ["Digital Workplace Transformation", "Data Center Services", "Cloud Engineering", "Cloud Migration (AWS, Azure, GCP)", "Cloud Security", "Mainframe Modernisation", "DevOps", "IOT services", "Cloud native Platform Engineering"],
    },
    {
      title: "Business Process Management",
      items: ["Operations Services", "Customer Analytics", "Enhance Customer Experience", "Enterprise Data Management", "Site Merchandising and Updates", "Order Management Fulfillment", "Fraud Protection services", "Reputation Management", "Legal Process Services"],
    },
    {
      title: "Data & Analytics",
      items: ["Data Engineering", "Data & AI", "Data Management and Governance", "Advanced Analytics – AI/ML", "Data Visualization", "Master Data Management & Big Data", "Data Integration and Mining", "Fraud Detection Solution", "Data Stack Modernization"],
    },
    {
      title: "Others",
      items: ["IT & Digital Transformation Consulting", "ESG Consulting", "IT Spending Benchmark", "Software Selection Consulting", "IT Infrastructure Services Benchmark", "Supply Chain Management", "CX Transformation"],
    },
  ];

  const testimonials = [
    { quote: "Schedley's B2B appointment setting team delivered qualified meetings from day one. Our pipeline has never been stronger.", name: "Sarah M.", role: "VP Sales, Tech Solutions", avatar: "https://i.pravatar.cc/80?img=1", rating: 4 },
    { quote: "We cut our time-to-meeting by 60%. The research and outreach quality is outstanding—every intro feels relevant.", name: "James K.", role: "Head of Business Development", avatar: "https://i.pravatar.cc/80?img=12", rating: 5 },
    { quote: "Professional, responsive, and results-driven. They understood our ICP and booked meetings that actually converted.", name: "Priya L.", role: "Director of Growth", avatar: "https://i.pravatar.cc/80?img=5", rating: 4.5 },
    { quote: "Best investment we made for our outbound motion. Clear reporting and a team that feels like an extension of ours.", name: "Michael R.", role: "CRO", avatar: "https://i.pravatar.cc/80?img=8", rating: 4 },
  ];

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main>
        {/* Section 1: Hero – dark banner, text left + image right (same as B2B Lead Gen) */}
        <section className="relative bg-[var(--ink)] py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className={containerClass}>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="relative z-10">
                <p className="inline-block text-xs font-bold uppercase tracking-widest text-[var(--blue)] mb-4 px-4 py-2 rounded-[var(--r-s)] border border-[var(--blue)] bg-[var(--ink)]/80">
                  appointment setting services
                </p>
                <h1 className="b2b-display text-white text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
                  Maximize Conversions Through Strategic B2B Appointment Setting
                </h1>
                <p className="text-base text-white/90 leading-relaxed mb-6">
                  Boost your business with our B2B appointment setting services, which are backed by a decade of industry experience and a track record of satisfied clients.
                </p>
                <button
                  type="button"
                  onClick={handleContactUs}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--r-s)] text-base font-semibold bg-[var(--blue)] text-white border-2 border-[var(--blue)] cursor-pointer transition-all duration-200 hover:bg-[var(--blue-dark)] hover:border-[var(--blue-dark)]"
                  style={{ boxShadow: "var(--sh-blue)" }}
                >
                  Contact Us <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative z-10 flex justify-center lg:justify-end">
                <div className="relative rounded-[var(--r-2xl)] overflow-hidden shadow-[var(--sh-lg)] w-full max-w-lg aspect-[4/3] lg:aspect-[5/4]">
                  <img
                    src={leadGenHeroImage}
                    alt="B2B appointment setting – strategic conversions and qualified meetings"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <SectionDivider />

        {/* Section 2: Meet the Right People & Build Your Sales Pipeline */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--white)]">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
            <SectionHeader
              eyebrow="Appointment setting"
              titleBefore="Meet the right people & build "
              titleAccent="your sales pipeline"
              subtitle="Our B2B appointment setting expertise can help you overcome challenges."
              className="mb-10"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {challenges.map(({ title, outcome, icon: Icon }) => (
                <div
                  key={title}
                  className="p-6 rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)] hover:shadow-[var(--sh-sm)] transition-all"
                >
                  <div className="w-12 h-12 rounded-[var(--r-m)] bg-[var(--blue-ghost)] flex items-center justify-center text-[var(--blue)] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-[var(--ink)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--ink-muted)] mb-4">{outcome}</p>
                  <button
                    type="button"
                    onClick={handleContactUs}
                    className="text-[var(--blue)] font-semibold text-sm hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Section 3: Build a Robust Sales Pipeline – two columns: copy left, image right */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]">
          <div className={containerClass}>
            <SectionReveal effect="slide-left">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <SectionHeader
                  eyebrow="B2B lead generation"
                  titleBefore="Build a robust sales pipeline through "
                  titleAccent="B2B prospecting & new markets"
                  subtitle="Acquiring new clients and exploring new markets. Our customized sales appointment setting services communicate your value proposition to key decision-makers."
                  className="mb-6 text-left max-w-none"
                />
                <div className="space-y-5 text-[var(--ink-muted)] leading-relaxed">
                  <p>
                    Is your sales team investing valuable time in prospecting and setting up appointments with potential customers? If so, consider outsourcing this process to Schedley—a reputable B2B appointment setting company with industry experience driving business growth.
                  </p>
                  <p>
                    By collaborating with Schedley, your company can accelerate its business development efforts and create revenue-generating opportunities for your sales team. Our customized sales appointment setting services are designed to effectively communicate your value proposition to key decision-makers while addressing the specific challenges your prospects face daily.
                  </p>
                  <p>
                    Schedley is more than just a service; it's an investment in your company's future success. Our B2B appointment setters increase revenue growth and position you as an industry leader.
                  </p>
                </div>
              </div>
              <div className="flex justify-end w-full h-full">
                <div className="relative rounded-[var(--r-2xl)] overflow-hidden border border-[var(--line)] shadow-[var(--sh-md)] aspect-[4/3] w-full max-w-lg lg:aspect-auto lg:min-h-[320px]">
                  <img src={SECTION_IMAGES.buildPipeline} alt="B2B sales pipeline and prospecting" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Section 4: B2B Appointment Setting Approach – Beyond Codes UI: each step = left copy (number + title + bullets) + right image */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--white)]">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
            <SectionHeader
              eyebrow="Our approach"
              titleBefore="B2B appointment setting "
              titleAccent="approach"
              subtitle="Elevate your sales pipeline with targeted meetings."
              className="mb-12 lg:mb-16"
            />
            <div className="space-y-14 lg:space-y-20">
              {approachSteps.map(({ step, title, points, image, imageAlt }, index) => (
                <div key={step} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="relative">
                    {/* Blue vertical connector centered horizontally in left column */}
                    {index < approachSteps.length - 1 && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full w-1 bg-[var(--blue)] mt-12"
                        style={{ height: "4rem" }}
                        aria-hidden
                      />
                    )}
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-4xl sm:text-5xl font-bold text-[var(--blue)] leading-none">{step}</span>
                      <h3 className="font-semibold text-lg sm:text-xl text-[var(--ink)]">{title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-[var(--ink-muted)]">
                          <span className="flex h-5 w-5 shrink-0 mt-0.5 rounded-full bg-[var(--blue)] items-center justify-center" aria-hidden>
                            <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[var(--r-xl)] overflow-hidden border border-[var(--line)] shadow-[var(--sh-sm)] aspect-[4/1.5] lg:aspect-[3/1.5]">
                    <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
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
          eyebrow="Service lines"
          titleBefore="B2B appointment setting "
          titleAccent="services"
          subtitle="Campaigns executed across service lines."
          lines={campaignLines}
          scrollEffect="slide-right"
        />
        <SectionDivider />

        {/* Section 7: How Our Sales Appointment Setting Works – Beyond Codes layout: left = hero image, right = 6 steps with circular blue icons */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--white)]">
          <div className={containerClass}>
            <SectionReveal effect="slide-left">
            <SectionHeader
              eyebrow="How it works"
              titleBefore="How our sales appointment setting "
              titleAccent="works"
              subtitle="We don't just set appointments; we create opportunities for meaningful engagements that fuel your business growth."
              className="mb-12 lg:mb-16"
            />
            <div className="grid lg:grid-cols-[1fr_1fr] gap-0 lg:gap-12 items-start">
              {/* Left: hero image centered in column */}
              <div className="relative order-2 lg:order-1 w-full h-full flex justify-center lg:justify-center">
                <div className="relative rounded-[var(--r-2xl)] overflow-hidden border border-[var(--line)] shadow-[var(--sh-md)] aspect-[4/3] w-full max-w-md mx-auto">
                  <img src={SECTION_IMAGES.howItWorksHero} alt="B2B appointment setting" className="w-full h-full object-cover object-top" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-[var(--r-m)] bg-[var(--white)]/95 backdrop-blur-sm border border-[var(--line)] p-4 shadow-[var(--sh-sm)]">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] mb-2">Yearly Overview</p>
                    <ul className="text-xs text-[var(--ink-soft)] space-y-1">
                      <li>Meetings Scheduled · Completed · Held</li>
                      <li>C-Level · V-Level · D-Level</li>
                      <li>Next Steps & Opportunities</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Right: vertical blue line + for each step [stub + icon + title] on one row, description below aligned with title */}
              <div className="flex gap-0 order-1 lg:order-3 min-h-[320px] w-full">
                <div className="hidden lg:block w-px shrink-0 bg-[var(--blue)] self-stretch min-h-[340px]" aria-hidden />
                <div className="hidden lg:flex flex-col gap-8 flex-1 min-w-0  pr-6">
                  {howItWorks.map(({ title, desc, icon: Icon }) => (
                    <div key={title}>
                      <div className="flex items-center gap-3">
                        <div className="w-3 shrink-0 h-0.5 bg-[var(--blue)]" aria-hidden />
                        <span className="flex h-9 w-9 shrink-0 rounded-full bg-[var(--blue)] border-2 border-[var(--blue-dark)] items-center justify-center text-[var(--white)]" aria-hidden>
                          <Icon className="w-4 h-4" strokeWidth={2} />
                        </span>
                        <h3 className="font-semibold text-[var(--ink)]">{title}</h3>
                      </div>
                      <p className="text-sm text-[var(--ink-muted)] leading-relaxed mt-1.5 pl-[calc(12px+8px+36px+12px)]">{desc}</p>
                    </div>
                  ))}
                </div>
                {/* Mobile: icon before each point */}
                <div className="flex flex-col gap-8 lg:hidden flex-1 min-w-0">
                  {howItWorks.map(({ title, desc, icon: Icon }) => (
                    <div key={title} className="flex gap-4 items-start">
                      <span className="flex h-9 w-9 shrink-0 rounded-full bg-[var(--blue)] border-2 border-[var(--blue-dark)] items-center justify-center text-[var(--white)] mt-0.5" aria-hidden>
                        <Icon className="w-4 h-4" strokeWidth={2} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-[var(--ink)] mb-1.5">{title}</h3>
                        <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{desc}</p>
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
          subtitle="Real results from teams who use Schedley for B2B appointment setting."
        />
        </SectionReveal>
        <SectionDivider />

        <FAQSection
          containerClass={containerClass}
          sectionClassName="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]"
          eyebrow="FAQ"
          titleBefore="Frequently asked "
          titleAccent="questions"
          subtitle="Quick answers about B2B appointment setting."
          items={faqs}
          scrollEffect="fade-up"
        />

        <GrowthExpertCTA
          containerClass={containerClass}
          eyebrow="Get Started"
          titleBefore="Connect with a growth expert "
          titleAccent="today!"
          subtitle="Get more qualified appointments, better sales opportunities, and higher ROI. Book a meeting to discuss our B2B Appointment Setting Services."
          buttonText="Book a meeting now"
          onButtonClick={handleBookDemo}
        />
      </main>
      {/* Footer is rendered by BaseLayout (reusable Footer component) */}
    </div>
  );
};

export default B2BAppointmentSchedulingPage;
