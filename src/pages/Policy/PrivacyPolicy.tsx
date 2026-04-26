import { Link } from "react-router-dom";
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  Mail,
  Cookie,
  Database,
  ShieldCheck,
  FileText,
  ChevronRight,
  ArrowLeft,
  Share2,
  Trash2,
  Download,
  BellOff,
  Hand,
  Server,
  Fingerprint,
  Calendar,
} from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import SectionReveal from "@/components/SectionReveal";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const policySections = [
  {
    id: "introduction",
    icon: Eye,
    title: "Introduction",
    content: `Schedley ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our intelligent scheduling, email filtering, and calendar management services, including our website, applications, and related offerings. Please read this policy carefully. By using Schedley, you consent to the practices described herein.`,
  },
  {
    id: "information-we-collect",
    icon: UserCheck,
    title: "Information We Collect",
    items: [
      {
        icon: UserCheck,
        heading: "Personal Information",
        text: "When you sign up or use our services, we may collect: your name and email address (e.g., via Google OAuth), profile picture if provided, calendar data and scheduling preferences, email filtering settings and rules, and contact details you provide for support or demos.",
      },
      {
        icon: Database,
        heading: "Usage & Technical Information",
        text: "We automatically collect: device and browser type, IP address and general location, usage patterns and feature interactions, performance and error logs, and cookies and similar technologies data.",
      },
      {
        icon: Calendar,
        heading: "Meeting & Scheduling Data",
        text: "To provide scheduling and appointment-setting services, we process: meeting titles and participants, availability and time zones, booking links and calendar integrations, and communication related to scheduling (e.g., email threads we analyze for spam or relevance).",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: Lock,
    title: "How We Use Your Information",
    list: [
      "Provide, maintain, and improve our scheduling, email filtering, and calendar services",
      "Authenticate your identity and manage your account",
      "Filter spam or unwanted bookings and validate meeting requests",
      "Send service-related notifications, updates, and security alerts",
      "Develop new features and improve user experience",
      "Ensure security, prevent fraud, and comply with legal obligations",
      "Communicate with you about support, feedback, or marketing (where permitted)",
    ],
  },
  {
    id: "sharing",
    icon: Share2,
    title: "Information Sharing & Disclosure",
    list: [
      "We do not sell, trade, or rent your personal information to third parties.",
      "We may share information with your explicit consent or at your direction.",
      "We may disclose information to comply with laws, court orders, or legal process.",
      "We may share with trusted service providers who assist our operations under strict confidentiality and data-processing agreements.",
      "In connection with a merger, acquisition, or sale of assets, we may transfer information as part of that transaction.",
    ],
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Data Security",
    list: [
      "Encryption in transit (TLS/HTTPS) and at rest where applicable",
      "Regular security assessments and monitoring",
      "Access controls, authentication, and principle of least privilege",
      "Secure, reputable infrastructure and data centers",
    ],
  },
  {
    id: "your-rights",
    icon: Hand,
    title: "Your Rights & Choices",
    items: [
      { icon: Eye, heading: "Access & portability", text: "You may request access to your personal information and, where feasible, receive a portable copy." },
      { icon: FileText, heading: "Correction", text: "You may update or correct your account and profile information through our services or by contacting us." },
      { icon: Trash2, heading: "Deletion", text: "You may request deletion of your account and associated personal data, subject to legal retention requirements." },
      { icon: Download, heading: "Export", text: "You may request an export of your data in a machine-readable format where technically possible." },
      { icon: BellOff, heading: "Opt-out", text: "You may opt out of non-essential marketing communications at any time via the link in our emails or in your account settings." },
      { icon: Hand, heading: "Withdraw consent", text: "Where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of prior processing." },
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & Tracking",
    content: `We use cookies and similar technologies to operate our services, remember your preferences, analyze usage, and improve performance. You can control many cookies through your browser settings. Some features may depend on cookies; disabling them may limit functionality.`,
  },
  {
    id: "retention",
    icon: Server,
    title: "Data Retention",
    content: `We retain your information for as long as your account is active or as needed to provide services and fulfill the purposes described in this policy. After account deletion, we will delete or anonymize your personal information within a reasonable period (e.g., within 30 days), except where we must retain data for legal, regulatory, or legitimate business purposes.`,
  },
  {
    id: "international",
    icon: Fingerprint,
    title: "International Transfers",
    content: `Your information may be processed in countries other than your country of residence. We ensure appropriate safeguards (e.g., standard contractual clauses or adequacy decisions) are in place where required by applicable law.`,
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact Us",
    content: `For privacy-related questions, requests, or complaints, please contact us:`,
    contact: {
      name: "Schedley Privacy Team",
      email: "notification@schedley.com",
      note: "We will respond to your request within a reasonable period and in accordance with applicable law.",
    },
  },
  {
    id: "updates",
    icon: FileText,
    title: "Policy Updates",
    content: `We may update this Privacy Policy from time to time. We will post the revised policy on this page and update the "Last updated" date. Material changes may be communicated via email or a prominent notice in our services. Your continued use of Schedley after changes constitutes acceptance of the updated policy. We encourage you to review this page periodically.`,
  },
];

export default function PrivacyPolicy() {
  const lastUpdated = "March 13, 2026";

  useSeoMeta({
    title: "Privacy Policy — Schedley",
    description:
      "How Schedley collects, uses, stores, and protects personal data when you use our website and services. Last updated March 2026.",
    pathname: "/privacy",
  });

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main className="pt-8 sm:pt-12 pb-16 sm:pb-24">
        {/* Breadcrumb / Back */}
        <div className={LANDING_PAGE_CONTAINER_CLASS}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--blue)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Hero */}
        <section className="relative bg-[var(--ink)] text-white py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--blue)] blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[var(--blue-mid)] blur-[100px]" />
          </div>
          <div className={`${LANDING_PAGE_CONTAINER_CLASS} relative z-10`}>
            <SectionReveal effect="fade-up">
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--blue)]/30 border border-[var(--blue)]/50 text-[var(--blue-mid)] mb-6">
                  <Shield className="w-8 h-8" strokeWidth={2} />
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Privacy Policy
                </h1>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  How we collect, use, and protect your information when you use Schedley.
                </p>
                <p className="text-white/60 text-sm mt-4">
                  Last updated: {lastUpdated}
                </p>
                  </div>
            </SectionReveal>
                </div>
              </section>

        {/* Content */}
        <div className={LANDING_PAGE_CONTAINER_CLASS}>
          <div className="relative -mt-6 sm:-mt-8 space-y-6 sm:space-y-8">
            {policySections.map((section, index) => {
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
                                  <div key={item.heading} className="pl-0 sm:pl-0">
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

        {/* CTA back to home */}
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
