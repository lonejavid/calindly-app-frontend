import { Link } from "react-router-dom";
import {
  Scale,
  FileText,
  CheckCircle,
  Mail,
  AlertTriangle,
  Shield,
  CreditCard,
  Trash2,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  UserCheck,
  Calendar,
  Lock,
  Globe,
} from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import SectionReveal from "@/components/SectionReveal";

const containerClass = "max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8";

const termsSections = [
  {
    id: "agreement",
    icon: FileText,
    title: "Agreement to Terms",
    content: `Welcome to Schedley. These Terms of Service ("Terms") govern your use of our intelligent scheduling, email filtering, and calendar management services, including our website, applications, and related offerings. By accessing or using Schedley, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services. We recommend that you read these Terms carefully and keep a copy for your records.`,
  },
  {
    id: "service-description",
    icon: CheckCircle,
    title: "Service Description",
    list: [
      "Smart email filtering to block spam and unwanted meeting requests",
      "Real-time email validation and domain verification for bookings",
      "Calendar management, event types, and scheduling optimization",
      "Integration with Google Calendar, video conferencing tools, and email services",
      "Event types, availability settings, and public booking pages",
      "Client acquisition and lead-generation features (where applicable)",
      "Professional scheduling tools, analytics, and meeting management",
    ],
  },
  {
    id: "accounts",
    icon: UserCheck,
    title: "User Accounts",
    items: [
      {
        icon: UserCheck,
        heading: "Account creation",
        text: "To use Schedley, you must be at least 18 years old (or have valid parental or guardian consent), provide accurate and complete registration information, maintain the security of your account credentials, and use a valid email and, where required, a supported authentication method (e.g., Google account) for sign-in.",
      },
      {
        icon: Lock,
        heading: "Account responsibility",
        text: "You are responsible for all activities that occur under your account, for maintaining the confidentiality of your login information, and for notifying us immediately of any unauthorized access or breach. You must ensure your contact and profile information remains current and accurate.",
      },
    ],
  },
  {
    id: "acceptable-use",
    icon: AlertTriangle,
    title: "Acceptable Use Policy",
    items: [
      {
        icon: CheckCircle,
        heading: "Permitted uses",
        text: "You may use Schedley only for lawful business and personal scheduling purposes, in compliance with all applicable laws, regulations, and these Terms. You may not use the service in any way that harms others or our systems.",
      },
      {
        icon: AlertTriangle,
        heading: "Prohibited uses",
        text: "You may not use Schedley to: violate any laws or regulations; send spam, unsolicited communications, or malicious content; interfere with or disrupt our services or infrastructure; attempt to gain unauthorized access to any account, system, or data; use automated scripts or bots to access the service without our permission; impersonate any person or entity or misrepresent your affiliation; scrape or harvest data beyond normal use; or engage in any activity that could harm, disable, or overburden our services or reputation.",
      },
    ],
  },
  {
    id: "privacy-data",
    icon: Shield,
    title: "Privacy and Data Handling",
    content: `Your privacy is important to us. By using Schedley, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy. We process your data only as necessary to provide and improve our services, implement appropriate security measures to protect your information, and do not sell or rent your personal information to third parties. You may access, update, export, or delete your data in accordance with our Privacy Policy and applicable law.`,
  },
  {
    id: "availability",
    icon: RefreshCw,
    title: "Service Availability",
    content: `We strive to maintain high availability but do not guarantee uninterrupted or error-free access to Schedley. We may suspend or limit service for maintenance, updates, security reasons, or circumstances beyond our reasonable control. We will use reasonable efforts to provide advance notice when practicable. We are not liable for any downtime or loss of access except where required by applicable law.`,
  },
  {
    id: "intellectual-property",
    icon: FileText,
    title: "Intellectual Property",
    items: [
      {
        icon: FileText,
        heading: "Our rights",
        text: "Schedley and its original content, features, functionality, branding, and technology are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works from our service or content without our prior written consent.",
      },
      {
        icon: UserCheck,
        heading: "Your content",
        text: "You retain ownership of content you provide to Schedley (e.g., profile information, event descriptions, custom messages). By using our service, you grant us a limited, worldwide, non-exclusive, royalty-free license to use, store, process, and display your content solely to provide, operate, and improve our services for you.",
      },
    ],
  },
  {
    id: "payment",
    icon: CreditCard,
    title: "Payment and Billing",
    items: [
      {
        icon: CreditCard,
        heading: "Free trial",
        text: "Schedley may offer a free trial period with full or limited access to features. No payment is required during the trial. We will notify you before the trial ends and before any paid subscription begins.",
      },
      {
        icon: CreditCard,
        heading: "Subscriptions and fees",
        text: "After the trial, paid plans may be available. Fees are displayed at sign-up or on our website. By subscribing, you agree to pay all applicable fees on the chosen billing cycle (e.g., monthly or annually). Fees are generally non-refundable except as required by law or as stated in our refund policy.",
      },
      {
        icon: RefreshCw,
        heading: "Cancellation",
        text: "You may cancel your subscription at any time. Cancellation will take effect at the end of the current billing period. You will retain access until that date. We may change pricing or plan features with reasonable notice; continued use after changes constitutes acceptance.",
      },
    ],
  },
  {
    id: "limitation",
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, Schedley and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages (including loss of profits, data, goodwill, or business opportunities), whether based on warranty, contract, tort, or any other legal theory, arising from your use of or inability to use our services. Our total liability to you for any claims arising from or related to these Terms or the service shall not exceed the amount you paid to us in the twelve (12) months preceding the claim, or one hundred dollars (100 USD), whichever is greater. Some jurisdictions do not allow the exclusion or limitation of certain damages; in such jurisdictions, our liability will be limited to the fullest extent permitted by law.`,
  },
  {
    id: "termination",
    icon: Trash2,
    title: "Termination",
    items: [
      {
        icon: UserCheck,
        heading: "By you",
        text: "You may terminate your account at any time via your account settings or by contacting us. Upon termination, your right to use Schedley ceases immediately. We may retain certain information as required by law or for legitimate business purposes, as described in our Privacy Policy.",
      },
      {
        icon: AlertTriangle,
        heading: "By us",
        text: "We may suspend or terminate your account or access to Schedley at any time, with or without notice, if we believe you have violated these Terms, engaged in fraudulent or abusive conduct, or for any other reason we deem necessary to protect our services, users, or third parties. We will use reasonable efforts to provide notice where appropriate.",
      },
    ],
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "Changes to Terms",
    content: `We may modify these Terms from time to time. We will post the updated Terms on this page and update the "Last updated" date. Material changes may be communicated by email or a prominent notice in our services. Your continued use of Schedley after the effective date of changes constitutes your acceptance of the revised Terms. If you do not agree, you must stop using our services. We encourage you to review this page periodically.`,
  },
  {
    id: "governing-law",
    icon: Globe,
    title: "Governing Law and Disputes",
    content: `These Terms shall be governed by and construed in accordance with the laws applicable to online services and, where relevant, the jurisdiction in which we operate. Any dispute arising from or relating to these Terms or the service shall be resolved through good-faith negotiation. If resolution is not reached, disputes may be submitted to binding arbitration or the courts, as permitted by applicable law. You agree to bring claims only in your individual capacity and not as a class or representative action where prohibited.`,
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact Us",
    content: `If you have any questions about these Terms of Service, please contact us:`,
    contact: {
      name: "Schedley Legal / Support",
      email: "notification@schedley.com",
      note: "We will respond to your request within a reasonable period.",
    },
  },
];

export default function TermsOfService() {
  const lastUpdated = "March 2025";

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page">
      <LandingHeader />

      <main className="pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className={containerClass}>
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
          <div className={`${containerClass} relative z-10`}>
            <SectionReveal effect="fade-up">
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--blue)]/30 border border-[var(--blue)]/50 text-[var(--blue-mid)] mb-6">
                  <Scale className="w-8 h-8" strokeWidth={2} />
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Terms of Service
                </h1>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  The terms and conditions that govern your use of Schedley.
                </p>
                <p className="text-white/60 text-sm mt-4">Last updated: {lastUpdated}</p>
              </div>
            </SectionReveal>
          </div>
        </section>

        <div className={containerClass}>
          <div className="relative -mt-6 sm:-mt-8 space-y-6 sm:space-y-8">
            {termsSections.map((section, index) => {
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

        <div className={containerClass}>
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
