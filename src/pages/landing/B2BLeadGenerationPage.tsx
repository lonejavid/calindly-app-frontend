import {
  Target,
  ArrowRight,
  BarChart3,
  Globe,
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
  Handshake,
  Layers,
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
import globalLeadGenImage from "@/assets/Global-Lead-Generation-Services-1536x1118.webp";

const SECTION_IMAGES = {
  pipeline: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  research: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  message: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  meetings: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  hero: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
};

/**
 * B2B Lead Generation page – section structure aligned with
 * https://beyondcodes.com/b2b-lead-generation-services/
 * Theme: src/theme/theme.css (same as B2BAppointmentSchedulingPage)
 */
const B2BLeadGenerationPage = () => {
  const handleBookDemo = () => {
    window.open(
      "https://www.schedley.com/lonejavida829/schedley-demo-see-how-client-acquisition-works-9040",
      "_blank"
    );
  };

  const handleContactUs = () => handleBookDemo();

  const containerClass = "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8";

  // ─── Hero: Lead Gen → You Close ─────────────────────────────────────
  // ─── Business Lead Generation: We Generate + 3 value cards ──────────
  const valueCards = [
    {
      title: "Connect with High-Intent prospects",
      desc: "Stop wasting time on unqualified leads. We pinpoint your ideal customers and streamline lead generation campaigns.",
      icon: Target,
    },
    {
      title: "Focus on closing deals",
      desc: "Fuel your sales team's success with a consistent flow of qualified leads and appointments.",
      icon: Handshake,
    },
    {
      title: "Expand into Untapped Markets",
      desc: "Conquer new markets globally and tap into fresh customer segments with ease—our multilingual team unlocks exceptional results in international markets.",
      icon: Globe,
    },
  ];

  // ─── Global Reach – 4 regions with circular % (theme colors for rings) ─
  const regions = [
    { name: "North America", stat: "Leads Generated in North America", detail: "2K+ lead gen campaigns across major and niche industries.", percent: 45, ringColor: "var(--blue)" },
    { name: "UK/EMEA", stat: "Leads Generated in UK/EMEA", detail: "Over 3500+ meetings generated for UK/Europe-based campaigns.", percent: 35, ringColor: "var(--blue-mid)" },
    { name: "APAC & ANZ", stat: "Leads Generated in APAC & ANZ", detail: "B2B sales expertise spanning Singapore, ANZ, and Asia Pacific.", percent: 15, ringColor: "var(--amber)" },
    { name: "Rest of the world", stat: "Leads Generated in Rest of the world", detail: "Helping leading B2B brands scale and expand.", percent: 5, ringColor: "var(--ink-muted)" },
  ];

  // ─── Who We Serve – 4 segments ─────────────────────────────────────────
  const whoWeServe = [
    { title: "IT Services and Consulting Firm", desc: "Enterprise IT sales leads", icon: Laptop, tag: "IT" },
    { title: "Software Product Engineering Company", desc: "Speed up sales cycle—2x faster to close with quality B2B meetings", icon: Layers, tag: "SPE" },
    { title: "SaaS Product Company", desc: "Scale your user base by reaching ideal customers who need your solutions", icon: BarChart3, tag: "SaaS" },
    { title: "BPO/BPM Companies", desc: "Optimize client acquisition and connect with businesses seeking your expertise", icon: Briefcase, tag: "BPO/BPM" },
  ];

  // ─── How We Do B2B Lead Generation – 4 steps ──────────────────────────
  const howWeDoSteps = [
    {
      step: "01",
      title: "Data-driven Research",
      desc: "We do extensive research to identify & qualify prospects / ICPs, ensuring precise targeting of influencers and decision-makers.",
      image: SECTION_IMAGES.research,
    },
    {
      step: "02",
      title: "Craft Your Winning Message",
      desc: "Our expert team crafts messaging that resonates with your target audience, turning prospects into leads.",
      image: SECTION_IMAGES.message,
    },
    {
      step: "03",
      title: "Call SMART Model",
      desc: "We interact with prospects using SMART research & targeted messaging, emphasizing value proposition & better brand positioning—ensuring up to 15% increase in outreach.",
      image: SECTION_IMAGES.hero,
    },
    {
      step: "04",
      title: "Set Appointments With Decision-Makers",
      desc: "We deliver confirmed appointments with key decision-makers, ready for minimum 30-minute meetings.",
      image: SECTION_IMAGES.meetings,
    },
  ];

  // ─── Testimonials ─────────────────────────────────────────────────────
  const testimonials = [
    { quote: "We have been working with Schedley for several months on our marketing efforts and have been extremely impressed with their level of service and results. They have helped us create a highly effective strategy that generated a significant increase in website traffic and leads.", name: "AVP Marketing", role: "Global Leader in IT Services and Consulting", avatar: "https://i.pravatar.cc/80?img=1", rating: 5 },
    { quote: "Schedley has been a valuable partner in helping us grow our business. Their team is highly skilled and has helped us generate a significant increase in leads, sales and revenue. We highly recommend them for demand generation and appointment setting.", name: "Chief Growth Officer", role: "Global Leader in Engineering Services", avatar: "https://i.pravatar.cc/80?img=12", rating: 5 },
    { quote: "We have been working with Schedley on our appointment setting needs and have been extremely impressed. They have helped us schedule a large number of high-quality meetings with potential clients, which has greatly improved our sales pipeline.", name: "Associate Vice President", role: "Global Leader in Software Development", avatar: "https://i.pravatar.cc/80?img=5", rating: 5 },
    { quote: "Schedley has been an important partner in our marketing value chain. The team has always accepted our B2B lead generation targets as its own. Their innovative approach and dedication make us reach out to them frequently.", name: "Chief Marketing Officer", role: "Global Leader in Product Engineering", avatar: "https://i.pravatar.cc/80?img=8", rating: 5 },
  ];

  // ─── Industries We Have Experience (icon + label per row, theme blue) ───
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

  // ─── Campaigns (same as B2B Appointment page) ─────────────────────────
  const campaignLines = [
    { title: "Software & Technology", items: ["Digital Experience", "Digital Transformation", "AI/ML/RPA", "Software Product Engineering", "Cyber Security & Risk Services", "Quality Engineering & Testing", "Digital Design & Development", "Intelligent Automation", "IT Governance, Risk, and Compliance"] },
    { title: "Software Product Engineering", items: ["Digital Manufacturing", "Engineering Application Support", "Engineering Documentation", "Design & Development", "DSP & Vision Processing", "UI/UX Design Engineering", "Software Frameworks and Solutions", "Cloud Engineering"] },
    { title: "Cloud & Infrastructure", items: ["Digital Workplace Transformation", "Data Center Services", "Cloud Engineering", "Cloud Migration (AWS, Azure, GCP)", "Cloud Security", "Mainframe Modernisation", "DevOps", "IOT services", "Cloud native Platform Engineering"] },
    { title: "Business Process Management", items: ["Operations Services", "Customer Analytics", "Enhance Customer Experience", "Enterprise Data Management", "Site Merchandising and Updates", "Order Management Fulfillment", "Fraud Protection services", "Reputation Management", "Legal Process Services"] },
    { title: "Data & Analytics", items: ["Data Engineering", "Data & AI", "Data Management and Governance", "Advanced Analytics – AI/ML", "Data Visualization", "Master Data Management & Big Data", "Data Integration and Mining", "Fraud Detection Solution", "Data Stack Modernization"] },
    { title: "Others", items: ["IT & Digital Transformation Consulting", "ESG Consulting", "IT Spending Benchmark", "Software Selection Consulting", "IT Infrastructure Services Benchmark", "Supply Chain Management", "CX Transformation"] },
  ];

  // ─── FAQ ──────────────────────────────────────────────────────────────
  const faqs = [
    { q: "What is B2B lead generation?", a: "B2B lead generation is the process of identifying and attracting potential business customers (leads) for your products or services. It involves research, outreach, and nurturing to fill your pipeline with qualified prospects ready for sales conversations." },
    { q: "How does lead generation differ from appointment setting?", a: "Lead generation focuses on discovering and attracting prospects into your funnel. Appointment setting goes a step further by scheduling confirmed meetings between your sales team and those qualified leads. Both work together: lead gen fills the pipeline; appointment setting converts leads into meetings." },
    { q: "Why outsource B2B lead generation?", a: "Outsourcing lets your sales team focus on closing deals while experts handle research, targeting, and outreach. You get a steady flow of qualified leads, faster time-to-market, and scalable capacity without hiring in-house SDRs." },
    { q: "What industries do you serve?", a: "We serve technology, consulting, SaaS, BPO/BPM, healthcare, finance, manufacturing, and many other B2B verticals. Our approach is customized to your industry, ICP, and goals." },
    { q: "How do you ensure lead quality?", a: "We use data-driven research, ICP alignment, and qualification criteria so every lead matches your target profile. We also use SMART outreach and clear handoff processes so your team receives leads ready for meaningful conversations." },
  ];

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main>
        {/* Section 1: Hero – B2B Lead Generation Services (dark banner, text left + image right) */}
        <section className="relative bg-[var(--ink)] py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="relative z-10">
                <p className="inline-block text-xs font-bold uppercase tracking-widest text-[var(--blue)] mb-4 px-4 py-2 rounded-[var(--r-s)] border border-[var(--blue)] bg-[var(--ink)]/80">
                  lead generation services
                </p>
                <h1 className="b2b-display text-white text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
                  B2B Lead Generation Services
                </h1>
                <p className="text-xl sm:text-2xl text-white font-semibold mb-4">
                  Sales Leads & Qualified Appointments to grow your{" "}
                  <span className="text-[var(--blue)]">B2B Business.</span>
                </p>
                <p className="text-base text-white/90 leading-relaxed mb-6">
                  Boost your business with high-converting B2B leads. Schedley can help you generate leads and schedule appointments effectively.
                </p>
                <p className="text-white font-semibold mb-2">Over 1 Million Sales Meetings Booked!</p>
                <p className="text-white/80 text-sm mb-6">Lead Generation → You Close!</p>
                <button
                  type="button"
                  onClick={handleContactUs}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--r-s)] text-base font-semibold bg-[var(--blue)] text-white border-2 border-[var(--blue)] cursor-pointer transition-all duration-200 hover:bg-[var(--blue-dark)] hover:border-[var(--blue-dark)]"
                  style={{ boxShadow: "var(--sh-blue)" }}
                >
                  Schedule a Growth Call <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative z-10 flex justify-center lg:justify-end">
                <div className="relative rounded-[var(--r-2xl)] overflow-hidden shadow-[var(--sh-lg)] w-full max-w-lg aspect-[4/3] lg:aspect-[5/4]">
                  <img
                    src={leadGenHeroImage}
                    alt="B2B lead generation – sales pipeline and qualified appointments"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Section 2: We Generate YOU CLOSE! – centered headline + 3 feature cards (theme colors) */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex rounded-full border border-[var(--blue)]/20 bg-[var(--blue-ghost)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--blue)] mb-6">
                Business Lead Generation
              </span>
              <h2 className="b2b-display mb-4">
                <span className="text-[var(--ink)] text-3xl sm:text-4xl lg:text-5xl font-semibold block">
                  We Generate
                </span>
                <span
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight block mt-1"
                  style={{ WebkitTextStroke: "2px var(--blue)", color: "transparent" }}
                >
                  YOU CLOSE!
                </span>
              </h2>
              <p className="text-[var(--ink-muted)] leading-relaxed text-center">
                Let our SDRs fuel your sales pipeline with high-quality business lead generation, so your sales team can focus on closing more deals. Our targeted outbound outreach, guided by in-house Sales Ops and GTM experts, generates a steady stream of high-intent prospects.
              </p>
            </div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
              {valueCards.map(({ title, desc, icon: Icon }) => (
                <div
                  key={title}
                  className="p-6 rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] shadow-[var(--sh-sm)] hover:border-[var(--line-strong)] hover:shadow-[var(--sh-md)] transition-all text-center lg:text-left"
                >
                  <div className="flex justify-center lg:justify-start">
                    <span className="flex h-14 w-14 rounded-[var(--r-m)] border-2 border-[var(--blue)] bg-[var(--white)] items-center justify-center text-[var(--blue)] mb-4">
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </span>
                  </div>
                  <h3 className="font-bold text-[var(--ink)] mb-2 text-lg">{title}</h3>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Section 4: Global Reach, Exceptional Results – dark bg, headline + CTA + illustration, then circular % by region */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--ink)] text-white">
          <div className={containerClass}>
            <SectionReveal effect="slide-left">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16">
              <div>
                <SectionHeader
                  variant="light"
                  eyebrow="Lead generation company"
                  titleBefore="Global "
                  titleAccent="reach, exceptional results"
                  subtitle="Expand your reach into top B2B markets with our cross-border B2B lead generation services—connect with top B2B leads from North America, Asia-Pacific, UK/Europe, and EMEA."
                  className="mb-6 text-left max-w-none"
                />
                <button
                  type="button"
                  onClick={handleContactUs}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--r-s)] font-semibold bg-[var(--blue)] text-white border-2 border-[var(--blue)] hover:bg-[var(--blue-dark)] hover:border-[var(--blue-dark)] transition-all cursor-pointer"
                  style={{ boxShadow: "var(--sh-blue)" }}
                >
                  Contact Us <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg rounded-[var(--r-2xl)] overflow-hidden shadow-[var(--sh-lg)] aspect-[1536/1118] max-h-[340px] lg:max-h-[380px]">
                  <img
                    src={globalLeadGenImage}
                    alt="Global lead generation services – B2B reach across North America, UK/EMEA, APAC and beyond"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
              {regions.map(({ name, stat, detail, percent, ringColor }) => {
                const circumference = 2 * Math.PI * 16;
                const filled = (percent / 100) * circumference;
                return (
                  <div key={name} className="text-center">
                    <h3 className="font-bold text-white text-lg mb-6">{name}</h3>
                    <div className="relative inline-flex items-center justify-center w-36 h-36 sm:w-40 sm:h-40 mx-auto mb-6">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" aria-hidden>
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
                        <span className="text-2xl sm:text-3xl font-bold text-white mb-1">{percent}%</span>
                        <span className="text-[10px] sm:text-xs text-white/80 leading-tight max-w-[85%]">{stat}</span>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed mt-2">{detail}</p>
                  </div>
                );
              })}
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Section 5: Who We Serve */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]">
          <div className={containerClass}>
            <SectionReveal effect="slide-right">
            <SectionHeader
              eyebrow="Lead generation B2B"
              titleBefore="Who we "
              titleAccent="serve"
              subtitle="Are you tired of hunting leads that never convert? We bridge the gap between businesses to improve lead quality and drive success with effective sales strategies."
              className="mb-10"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoWeServe.map(({ title, desc, icon: Icon, tag }) => (
                <div
                  key={title}
                  className="p-6 rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] hover:border-[var(--line-strong)] hover:shadow-[var(--sh-sm)] transition-all cursor-pointer"
                  onClick={handleContactUs}
                  onKeyDown={(e) => e.key === "Enter" && handleContactUs()}
                  role="button"
                  tabIndex={0}
                >
                  <span className="text-xs font-bold text-[var(--blue)] mb-2 block">{tag}</span>
                  <div className="w-10 h-10 rounded-[var(--r-m)] bg-[var(--blue-lite)] flex items-center justify-center text-[var(--blue)] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[var(--ink)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--ink-muted)]">{desc}</p>
                </div>
              ))}
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Section 7: How We Do B2B Lead Generation – 4 steps */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--surface)]">
          <div className={containerClass}>
            <SectionReveal effect="slide-left">
            <SectionHeader
              eyebrow="How we do it"
              titleBefore="B2B "
              titleAccent="lead generation"
              subtitle="Did you know 50–90% of buying decisions are complete before a buyer interacts with a sales rep? Our customized lead generation strategies help you save time by putting your sales team in front of high-intent prospects."
              className="mb-12"
            />
            <div className="space-y-12 lg:space-y-16">
              {howWeDoSteps.map(({ step, title, desc, image }, index) => (
                <div key={step} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-4xl sm:text-5xl font-bold text-[var(--blue)] leading-none">{step}</span>
                      <h3 className="font-semibold text-lg sm:text-xl text-[var(--ink)]">{title}</h3>
                    </div>
                    <p className="text-[var(--ink-muted)] leading-relaxed">{desc}</p>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="rounded-[var(--r-xl)] overflow-hidden border border-[var(--line)] shadow-[var(--sh-sm)] aspect-[4/2]">
                      <img src={image} alt={title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        {/* Section 8: Industries We Have Experience – icon + label per cell (Beyond Codes style) */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[var(--white)]">
          <div className={containerClass}>
            <SectionReveal effect="fade-up">
            <SectionHeader
              eyebrow="Top B2B lead generation company"
              titleBefore="Industries we have experience in "
              titleAccent="setting-up appointments"
              subtitle="Our proven lead generation and appointment setting services propel your business towards growth. Whether you target technology, manufacturing, healthcare, finance, education, or any other sector, we customize our approach to meet your specific needs."
              className="mb-10"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {industries.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-4 p-4 rounded-[var(--r-m)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--blue)] hover:bg-[var(--blue-ghost)] transition-all"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--r-m)] bg-[var(--blue-lite)] text-[var(--blue)]" aria-hidden>
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </span>
                  <span className="font-semibold text-[var(--ink)] text-sm sm:text-base">{name}</span>
                </div>
              ))}
            </div>
            </SectionReveal>
          </div>
        </section>
        <SectionDivider />

        <ServiceLinesSection
          containerClass={containerClass}
          eyebrow="Lead generation campaign"
          titleBefore="Campaigns executed across "
          titleAccent="service lines"
          lines={campaignLines}
          scrollEffect="zoom-in"
        />
        <SectionDivider />

        <SectionReveal effect="zoom-in">
         <WhatClientsSay
          testimonials={testimonials}
          title="Our clients say we're the #1 B2B Lead Generation Company"
          subtitle="Client testimonials"
        />
        </SectionReveal>
        <SectionDivider />

        <FAQSection
          containerClass={containerClass}
          sectionClassName="py-16 sm:py-20 lg:py-24 bg-[var(--white)]"
          eyebrow="FAQ"
          titleBefore="Frequently asked "
          titleAccent="questions"
          subtitle="Quick answers about B2B lead generation and appointment setting."
          items={faqs}
          cardVariant="surface"
          scrollEffect="fade-up"
        />
        <SectionDivider />

        <GrowthExpertCTA
          containerClass={containerClass}
          eyebrow="Get Started"
          titleBefore="Connect with a growth expert "
          titleAccent="today!"
          subtitle="Book a call with our team to discuss your lead generation goals and see how we can help you fill your pipeline with qualified B2B leads."
          buttonText="Book a meeting now"
          onButtonClick={handleBookDemo}
        />
      </main>
      {/* Footer is rendered by BaseLayout (reusable Footer component) */}
    </div>
  );
};

export default B2BLeadGenerationPage;
