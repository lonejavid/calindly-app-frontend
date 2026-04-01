import { Link } from "react-router-dom";
import {
  Cookie,
  Shield,
  BarChart3,
  Settings,
  Mail,
  ArrowLeft,
  ChevronRight,
  Eye,
  Server,
  Fingerprint,
  FileText,
} from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import SectionReveal from "@/components/SectionReveal";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";

const cookieSections = [
  {
    id: "introduction",
    icon: Cookie,
    title: "Introduction",
    content: `Schedley ("we," "us," or "our") uses cookies and similar technologies on our website and services (e.g., schedley.com and our applications) to provide, secure, and improve your experience. This Cookie Policy explains what cookies and similar technologies we use, why we use them, and how you can control them. By using Schedley, you consent to our use of cookies as described in this policy. Please read this policy together with our Privacy Policy for a complete picture of how we handle your data.`,
  },
  {
    id: "what-are-cookies",
    icon: FileText,
    title: "What Are Cookies and Similar Technologies?",
    content: `Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, to remember your preferences, and to provide information to the site owner. We may also use similar technologies such as local storage, session storage, pixel tags, and software development kits (SDKs) where they serve similar purposes. In this policy, we use "cookies" to refer to cookies and these similar technologies unless otherwise stated.`,
  },
  {
    id: "what-we-use",
    icon: Shield,
    title: "What We Use",
    items: [
      {
        icon: Shield,
        heading: "Strictly necessary cookies",
        text: "These cookies are essential for the website and services to function. They enable core features such as security, authentication, load balancing, and access to secure areas. You cannot opt out of these cookies because the service would not work without them. They do not store personally identifiable information beyond what is needed for the session.",
      },
      {
        icon: Settings,
        heading: "Functional and preference cookies",
        text: "These cookies allow us to remember choices you make (e.g., language, time zone, or display preferences) and to provide enhanced, more personalized features. They may be set by us or by third-party providers whose services we have added to our pages. Disabling them may affect how the site behaves or looks.",
      },
      {
        icon: BarChart3,
        heading: "Analytics and performance cookies",
        text: "These cookies help us understand how visitors interact with our website and services by collecting and reporting information anonymously (or in aggregated form). We use this information to improve how our site works, to fix errors, and to understand which content or features are most useful. We may use first-party or third-party analytics tools (e.g., Google Analytics or similar) in compliance with our Privacy Policy.",
      },
      {
        icon: Eye,
        heading: "Marketing and advertising cookies (if applicable)",
        text: "Where we use advertising or marketing cookies, they may be used to deliver relevant ads, to limit how often you see an ad, and to measure the effectiveness of campaigns. These may be set by us or by our advertising partners. You can typically control these via the cookie banner, your account settings, or your browser settings.",
      },
    ],
  },
  {
    id: "purposes",
    icon: BarChart3,
    title: "Purposes of Use",
    list: [
      "Keeping the site secure and preventing fraud",
      "Authenticating you and remembering your session",
      "Remembering your preferences and settings",
      "Understanding how you use our site so we can improve it",
      "Measuring the effectiveness of our content and communications",
      "Complying with legal and regulatory obligations",
    ],
  },
  {
    id: "retention",
    icon: Server,
    title: "Cookie Duration",
    content: `Session cookies are temporary and are deleted when you close your browser. Persistent cookies remain on your device for a set period (e.g., from a few days to several years) or until you delete them. The exact retention period depends on the type of cookie and its purpose. We do not use cookies to identify you beyond what is necessary for the service and as described in our Privacy Policy.`,
  },
  {
    id: "third-party",
    icon: Fingerprint,
    title: "Third-Party Cookies",
    content: `Some cookies are placed by third-party services that appear on our pages (e.g., analytics providers, embedded content, or support widgets). We do not control the use of these third-party cookies; their use is governed by the respective third party's privacy and cookie policy. We encourage you to review those policies and to use the third party's opt-out tools where available.`,
  },
  {
    id: "your-choices",
    icon: Settings,
    title: "Your Choices and Controls",
    content: `You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device, and you can set most browsers to prevent them from being placed. If you do this, you may have to manually adjust some preferences every time you visit a site, and some features and services may not function properly. You can typically manage cookies via your browser settings (e.g., Chrome, Firefox, Safari, Edge). For more information, visit your browser's help section or sites such as www.aboutcookies.org. Where we offer a cookie preference center or banner, you can also manage your preferences there.`,
  },
  {
    id: "updates",
    icon: FileText,
    title: "Updates to This Policy",
    content: `We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will post the revised policy on this page and update the "Last updated" date. Material changes may be communicated via email or a notice on our services. Your continued use of Schedley after changes constitutes acceptance of the updated policy. We encourage you to review this page periodically.`,
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact Us",
    content: `If you have any questions about our use of cookies or this Cookie Policy, please contact us:`,
    contact: {
      name: "Schedley Privacy / Support",
      email: "notification@schedley.com",
      note: "We will respond to your request within a reasonable period.",
    },
  },
];

export default function CookiePolicy() {
  const lastUpdated = "March 2025";

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main className="pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className={LANDING_PAGE_CONTAINER_CLASS}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--blue)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <section className="relative bg-[var(--ink)] text-white py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--blue)] blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[var(--blue-mid)] blur-[100px]" />
          </div>
          <div className={`${LANDING_PAGE_CONTAINER_CLASS} relative z-10`}>
            <SectionReveal effect="fade-up">
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--blue)]/30 border border-[var(--blue)]/50 text-[var(--blue-mid)] mb-6">
                  <Cookie className="w-8 h-8" strokeWidth={2} />
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Cookie Policy
                </h1>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  How we use cookies and similar technologies on Schedley.
                </p>
                <p className="text-white/60 text-sm mt-4">Last updated: {lastUpdated}</p>
              </div>
            </SectionReveal>
          </div>
        </section>

        <div className={LANDING_PAGE_CONTAINER_CLASS}>
          <div className="relative -mt-6 sm:-mt-8 space-y-6 sm:space-y-8">
            {cookieSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <SectionReveal key={section.id} effect={index % 2 === 0 ? "slide-right" : "slide-left"}>
                  <article
                    id={section.id}
                    className="bg-[var(--white)] rounded-[var(--r-l)] border border-[var(--line)] shadow-[var(--sh-sm)] overflow-hidden hover:shadow-[var(--sh-md)] transition-shadow"
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-4 sm:gap-5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--blue-lite)] text-[var(--blue)]">
                          <Icon className="w-6 h-6" strokeWidth={2} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-4 flex items-center gap-2">
                            {section.title}
                            <ChevronRight className="w-5 h-5 text-[var(--ink-muted)] shrink-0" />
                          </h2>

                          {"content" in section && section.content && (
                            <p className="text-[var(--ink-muted)] leading-relaxed">{section.content}</p>
                          )}

                          {"list" in section && section.list && (
                            <ul className="space-y-2">
                              {section.list.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-[var(--ink-muted)]">
                                  <span className="flex h-5 w-5 shrink-0 mt-0.5 rounded-full bg-[var(--blue)]/20 items-center justify-center">
                                    <ChevronRight className="w-3 h-3 text-[var(--blue)]" strokeWidth={2.5} />
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}

                          {"items" in section && section.items && (
                            <div className="space-y-6">
                              {section.items.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                  <div key={item.heading} className="pl-0">
                                    <div className="flex items-start gap-3">
                                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--blue)]">
                                        <ItemIcon className="w-4 h-4" strokeWidth={2} />
                                      </span>
                                      <div>
                                        <h3 className="font-semibold text-[var(--ink)] mb-1">{item.heading}</h3>
                                        <p className="text-[var(--ink-muted)] text-sm leading-relaxed">{item.text}</p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {"contact" in section && section.contact && (
                            <div className="mt-4 p-5 rounded-[var(--r-m)] bg-[var(--surface)] border border-[var(--line)]">
                              <p className="font-semibold text-[var(--ink)]">{section.contact.name}</p>
                              <a
                                href={`mailto:${section.contact.email}`}
                                className="text-[var(--blue)] hover:underline mt-1 inline-flex items-center gap-2"
                              >
                                <Mail className="w-4 h-4" />
                                {section.contact.email}
                              </a>
                              {section.contact.note && (
                                <p className="text-sm text-[var(--ink-muted)] mt-3">{section.contact.note}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </SectionReveal>
              );
            })}
          </div>
        </div>

        <div className={LANDING_PAGE_CONTAINER_CLASS}>
          <SectionReveal effect="fade-up">
            <div className="mt-12 sm:mt-16 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--r-m)] font-semibold text-[var(--blue)] border-2 border-[var(--blue)] hover:bg-[var(--blue-ghost)] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </SectionReveal>
        </div>
      </main>
    </div>
  );
}
