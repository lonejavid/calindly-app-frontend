import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Send,
  Linkedin,
  MapPin,
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  Bug,
  Lightbulb,
} from "lucide-react";
import { LandingHeader } from "@/components/LandingHeader";
import {
  submitContactForm,
  CONTACT_INQUIRY_TYPES,
  type ContactFormPayload,
  type ContactInquiryType,
} from "@/lib/api";
import { useStore } from "@/store/store";

const containerClass = "max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8";

const INQUIRY_ICONS: Record<ContactInquiryType, typeof MessageCircle> = {
  "General Inquiry": MessageCircle,
  "Technical Support": HelpCircle,
  "Report a Bug": Bug,
  "Feature Request": Lightbulb,
};

function buildInitialForm(isSignedIn: boolean): ContactFormPayload {
  return {
    inquiryType: "General Inquiry",
    message: "",
    ...(isSignedIn ? {} : { name: "", email: "" }),
  };
}

type FieldKey = keyof ContactFormPayload | "inquiryType";

function validate(data: ContactFormPayload, isSignedIn: boolean): Partial<Record<FieldKey, string>> {
  const err: Partial<Record<FieldKey, string>> = {};
  if (!CONTACT_INQUIRY_TYPES.includes(data.inquiryType)) {
    err.inquiryType = "Please choose a topic";
  }
  if (!data.message.trim()) err.message = "Message is required";
  if (!isSignedIn) {
    if (!data.name?.trim()) err.name = "Name is required";
    if (!data.email?.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) err.email = "Please enter a valid email";
  }
  return err;
}

const ContactUsPage = () => {
  const user = useStore((s) => s.user);
  const isSignedIn = Boolean(user?.email);

  const [form, setForm] = useState<ContactFormPayload>(() => buildInitialForm(isSignedIn));
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as FieldKey]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setSubmitError(null);
  };

  const setInquiryType = (inquiryType: ContactInquiryType) => {
    setForm((prev) => ({ ...prev, inquiryType }));
    if (errors.inquiryType) setErrors((prev) => ({ ...prev, inquiryType: undefined }));
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form, isSignedIn);
    const hasError = Object.values(nextErrors).some(Boolean);
    setErrors(nextErrors);
    if (hasError) return;

    setLoading(true);
    setSubmitError(null);
    try {
      const payload: ContactFormPayload = {
        inquiryType: form.inquiryType,
        message: form.message.trim(),
        ...(isSignedIn
          ? {}
          : { name: form.name?.trim(), email: form.email?.trim().toLowerCase() }),
      };
      await submitContactForm(payload);
      setSuccess(true);
      setForm(buildInitialForm(isSignedIn));
      setErrors({});
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-12 sm:pt-16 pb-10 sm:pb-14">
          <div className={containerClass}>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--ink)] tracking-tight">
                Get in touch
              </h1>
              <p className="mt-3 text-[var(--ink-muted)] text-base sm:text-lg">
                Have a question or want to work together? Send us a message and we’ll get back to you soon.
              </p>
            </div>
          </div>
        </section>

        {/* Content: contact info + form */}
        <section className="pb-16 sm:pb-24">
          <div className={containerClass}>
            <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-14 items-start">
              {/* Left: contact info cards */}
              <div className="space-y-6">
                <div className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--blue-lite)] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[var(--blue)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--ink)]">Email</p>
                      <a
                        href="mailto:notifications@schedley.com"
                        className="text-[var(--blue)] hover:underline text-sm"
                      >
                        notifications@schedley.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--blue-lite)] flex items-center justify-center">
                      <Linkedin className="w-5 h-5 text-[var(--blue)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--ink)]">LinkedIn</p>
                      <a
                        href="https://www.linkedin.com/company/schedley"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--blue)] hover:underline text-sm"
                      >
                        Connect with us
                      </a>
                    </div>
                  </div>
                </div>
                <div className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--blue-lite)] flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[var(--blue)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--ink)]">Response time</p>
                      <p className="text-[var(--ink-muted)] text-sm">We typically reply within 1–2 business days.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm">
                {success ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-[var(--blue-lite)] flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-[var(--blue)]" />
                    </div>
                    <h2 className="text-xl font-semibold text-[var(--ink)]">Message sent</h2>
                    <p className="mt-2 text-[var(--ink-muted)] text-sm max-w-sm">
                      Thanks for reaching out. We’ll get back to you as soon as we can.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="mt-6 text-[var(--blue)] hover:underline font-medium text-sm"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-[var(--blue-lite)] flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-[var(--blue)]" />
                      </div>
                      <h2 className="text-xl font-semibold text-[var(--ink)]">Send a message</h2>
                    </div>

                    {isSignedIn && user && (
                      <p className="text-sm text-[var(--ink-muted)]">
                        Signed in as <span className="font-medium text-[var(--ink)]">{user.email}</span>
                      </p>
                    )}

                    {submitError && (
                      <div
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                        role="alert"
                      >
                        {submitError}
                      </div>
                    )}

                    {!isSignedIn && (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--ink)] mb-1.5">
                            Name
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            value={form.name ?? ""}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-4 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent"
                            autoComplete="name"
                          />
                          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--ink)] mb-1.5">
                            Email
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            value={form.email ?? ""}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-4 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent"
                            autoComplete="email"
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="block text-sm font-medium text-[var(--ink)] mb-3">What&apos;s this about?</p>
                      <div className="flex flex-wrap gap-3">
                        {CONTACT_INQUIRY_TYPES.map((type) => {
                          const Icon = INQUIRY_ICONS[type];
                          const selected = form.inquiryType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setInquiryType(type)}
                              className={[
                                "flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-3 py-4 min-w-[104px] max-w-[140px] flex-1 sm:flex-none transition-colors text-center",
                                selected
                                  ? "border-emerald-500 bg-emerald-500/5 text-emerald-700"
                                  : "border-[var(--line)] bg-[var(--white)] text-[var(--ink-muted)] hover:border-[var(--ink-muted)]/40",
                              ].join(" ")}
                            >
                              <Icon className={`w-6 h-6 shrink-0 ${selected ? "text-emerald-600" : ""}`} />
                              <span className="text-xs font-medium leading-tight">{type}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.inquiryType && (
                        <p className="mt-2 text-sm text-red-600">{errors.inquiryType}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--ink)] mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        rows={5}
                        className="w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-4 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent resize-y min-h-[120px]"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--blue)] text-white px-5 py-2.5 font-medium text-sm shadow-[var(--sh-blue)] hover:bg-[var(--blue-dark)] disabled:opacity-60 disabled:pointer-events-none transition-colors"
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactUsPage;
