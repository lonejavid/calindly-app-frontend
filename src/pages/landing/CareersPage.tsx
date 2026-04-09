import { useState, useRef, type ReactNode } from "react";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Globe, 
  Star, 
  CheckCircle, 
  X,  
  Upload, 
  FileText,
  Rocket,
  Award,
  Coffee,
  Heart,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LandingHeader } from "@/components/LandingHeader";
import SectionReveal from "@/components/SectionReveal";
import { LANDING_PAGE_CONTAINER_CLASS } from "@/lib/landingLayout";

type JobRole = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
};

type ApplicationFormState = {
  name: string;
  email: string;
  country: string;
  experience: string;
  resume: File | null;
};

const initialForm: ApplicationFormState = {
  name: "",
  email: "",
  country: "",
  experience: "",
  resume: null,
};

const CareersPage = () => {
     const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormState>(initialForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jobRoles: JobRole[] = [
    {
      id: 1,
      title: "Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹8-15 LPA",
      description:
        "The ideal candidate will be responsible for developing high-quality applications. They will also be responsible for designing and implementing testable and scalable code.",
      responsibilities: [
        "Develop quality software and web applications",
        "Analyze and maintain existing software applications", 
        "Design highly scalable, testable code",
        "Discover and fix programming bugs",
        "Collaborate with cross-functional teams",
        "Participate in code reviews and technical discussions",
      ],
      qualifications: [
        "Bachelor's degree or equivalent experience in Computer Science or related field",
        "Development experience with programming languages (JavaScript, Python, Java)",
        "SQL database or relational database skills",
        "Experience with modern frameworks (React, Node.js, etc.)",
        "Strong problem-solving and debugging skills",
        "Excellent communication and teamwork abilities",
      ],
      skills: ["JavaScript", "React", "Node.js", "SQL", "Git", "AWS"],
    },
    {
      id: 2,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "1-4 years",
      salary: "₹6-12 LPA",
      description:
        "Join our frontend team to create beautiful, intuitive user interfaces for our scheduling platform. You'll work with modern technologies to deliver exceptional user experiences.",
      responsibilities: [
        "Build responsive and interactive web applications",
        "Implement pixel-perfect designs from Figma mockups",
        "Optimize applications for maximum speed and scalability",
        "Collaborate with UX/UI designers and backend developers",
        "Write clean, maintainable, and testable code",
        "Stay updated with latest frontend technologies and trends",
      ],
      qualifications: [
        "Bachelor's degree in Computer Science or equivalent experience",
        "Strong proficiency in HTML, CSS, and JavaScript",
        "Experience with React.js and modern frontend frameworks",
        "Knowledge of responsive design and cross-browser compatibility",
        "Familiarity with version control systems (Git)",
        "Understanding of RESTful APIs and asynchronous programming",
      ],
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux", "Figma"],
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹12-20 LPA",
      description:
        "Lead product strategy and development for Schedley's intelligent scheduling platform. Drive product vision, roadmap, and work closely with engineering and design teams.",
      responsibilities: [
        "Define and execute product strategy and roadmap",
        "Conduct market research and competitive analysis",
        "Gather and prioritize product requirements from stakeholders",
        "Work closely with engineering teams to deliver features",
        "Analyze product metrics and user feedback",
        "Collaborate with marketing and sales teams for product launches",
      ],
      qualifications: [
        "Bachelor's/Master's degree in Business, Engineering, or related field",
        "3+ years of product management experience in SaaS companies",
        "Strong analytical and problem-solving skills",
        "Experience with product management tools (Jira, Figma, Analytics)",
        "Excellent communication and leadership abilities",
        "Understanding of agile development methodologies",
      ],
      skills: ["Product Strategy", "Analytics", "Jira", "Figma", "SQL", "A/B Testing"],
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹5-10 LPA",
      description:
        "Drive growth and brand awareness for Schedley through digital marketing campaigns, content creation, and strategic partnerships.",
      responsibilities: [
        "Develop and execute digital marketing strategies",
        "Create compelling content for blogs, social media, and campaigns",
        "Manage SEO/SEM campaigns and optimize for conversions",
        "Analyze marketing metrics and prepare performance reports",
        "Collaborate with sales team for lead generation",
        "Build and maintain brand presence across multiple channels",
      ],
      qualifications: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "2+ years of digital marketing experience",
        "Proficiency in marketing tools (Google Analytics, HubSpot, etc.)",
        "Strong writing and communication skills",
        "Experience with social media marketing and content creation",
        "Understanding of B2B SaaS marketing strategies",
      ],
      skills: [
        "Digital Marketing",
        "Content Creation",
        "SEO",
        "Google Analytics",
        "HubSpot",
        "Social Media",
      ],
    },
  ];

  const benefits: {
    icon: ReactNode;
    title: string;
    desc: string;
  }[] = [
    {
      icon: <Rocket className="h-6 w-6 text-[var(--blue)]" />,
      title: "Equity participation",
      desc: "Share in company success with stock options.",
    },
    {
      icon: <Globe className="h-6 w-6 text-[var(--blue)]" />,
      title: "Remote-first",
      desc: "Work from anywhere with flexible hours.",
    },
    {
      icon: <Award className="h-6 w-6 text-[var(--blue)]" />,
      title: "Learning budget",
      desc: "Annual budget for courses and conferences.",
    },
    {
      icon: <Heart className="h-6 w-6 text-[var(--blue)]" />,
      title: "Health coverage",
      desc: "Comprehensive medical coverage for you and family.",
    },
    {
      icon: <Coffee className="h-6 w-6 text-[var(--blue)]" />,
      title: "Time off",
      desc: "Take time off when you need it.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[var(--blue)]" />,
      title: "Career growth",
      desc: "Fast-track advancement as we scale.",
    },
  ];

  const handleApply = (job: JobRole) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, resume: file }));
    } else if (file) {
      alert("Please upload a PDF file only");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted successfully.");
      navigate("/");
    setShowApplicationForm(false);
    setFormData(initialForm);
  };

  const modalBackdrop =
    "fixed inset-0 z-[100] flex items-center justify-center bg-[var(--ink)]/50 backdrop-blur-sm p-4";

  const modalPanel =
    "max-h-[90vh] w-full overflow-y-auto rounded-sm border border-[var(--line-strong)] bg-[var(--white)] shadow-[var(--sh-lg)]";

  const inputClass =
    "w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-4 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent";

  const labelClass = "mb-1.5 block text-sm font-medium text-[var(--ink)]";

  return (
    <div className="min-h-screen bg-[var(--white)] b2b-page flex flex-col">
      <LandingHeader />

      <main className="flex-1 pb-16 sm:pb-24">
        {/* Hero — same pattern as Privacy / Terms / Cookie policy pages */}
        <section className="relative overflow-hidden bg-[var(--ink)] py-16 text-white sm:py-20">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[var(--blue)] blur-[120px]" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[var(--blue-mid)] blur-[100px]" />
            </div>
          <div className={`${LANDING_PAGE_CONTAINER_CLASS} relative z-10`}>
            <SectionReveal effect="fade-up">
              <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--blue)]/50 bg-[var(--blue)]/30 text-[var(--blue-mid)]">
                  <Briefcase className="h-8 w-8" strokeWidth={2} />
              </span>
                <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  Build the future of intelligent scheduling
            </h1>
                <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                  Join Schedley and help professionals worldwide save time, cut scheduling chaos, and
                  focus on what matters—with thoughtful product and a remote-first team.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/85">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                      <Users className="h-4 w-4 text-[var(--blue-mid)]" />
                    </span>
                    <span>Growing team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                      <Globe className="h-4 w-4 text-[var(--blue-mid)]" />
                    </span>
                    <span>Remote-first</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                      <TrendingUp className="h-4 w-4 text-[var(--blue-mid)]" />
                    </span>
                    <span>High-impact roles</span>
              </div>
              </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 sm:py-16">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <SectionReveal effect="slide-left">
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl tracking-tight">
                  Why Schedley
            </h2>
                <p className="mt-3 text-[var(--ink-muted)] text-base sm:text-lg">
                  We invest in people who care about craft, clarity, and customer outcomes.
            </p>
          </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--sh-xs)] transition-shadow hover:shadow-[var(--sh-sm)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--blue-lite)]">
                  {benefit.icon}
                </div>
                    <h3 className="text-lg font-semibold text-[var(--ink)]">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>
            </SectionReveal>
        </div>
      </section>

        {/* Open positions */}
        <section className="border-t border-[var(--line)] bg-[var(--surface)] py-12 sm:py-16">
          <div className={LANDING_PAGE_CONTAINER_CLASS}>
            <SectionReveal effect="fade-up">
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <h2 className="text-2xl font-semibold text-[var(--ink)] sm:text-3xl tracking-tight">
                  Open positions
            </h2>
                <p className="mt-3 text-[var(--ink-muted)] text-base sm:text-lg">
                  Find a role that fits—then tell us your story.
            </p>
          </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {jobRoles.map((job) => (
                  <article
                    key={job.id}
                    className="flex flex-col rounded-[var(--r-l)] border border-[var(--line)] bg-[var(--white)] p-6 shadow-[var(--sh-xs)] transition-shadow hover:shadow-[var(--sh-md)]"
                  >
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                        <h3 className="text-xl font-semibold text-[var(--ink)]">{job.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--ink-muted)]">
                          <span className="inline-flex items-center gap-1">
                            <Briefcase className="h-4 w-4 shrink-0 text-[var(--blue)]" />
                            {job.department}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-4 w-4 shrink-0 text-[var(--blue)]" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-4 w-4 shrink-0 text-[var(--blue)]" />
                            {job.type}
                          </span>
                      </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-lg font-semibold text-[var(--blue-deep)]">{job.salary}</p>
                        <p className="text-sm text-[var(--ink-muted)]">{job.experience}</p>
                      </div>
                    </div>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {job.description}
                    </p>
                    <div className="mb-5 flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-[var(--line-strong)] bg-[var(--blue-lite)] px-3 py-1 text-xs font-medium text-[var(--blue-deep)]"
                        >
                      {skill}
                    </span>
                  ))}
                </div>
                    <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                  <button
                        type="button"
                    onClick={() => setSelectedJob(job)}
                        className="flex-1 rounded-lg border-2 border-[var(--line-strong)] bg-[var(--white)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--blue)] hover:bg-[var(--blue-ghost)]"
                  >
                        View details
                  </button>
                  <button
                        type="button"
                    onClick={() => handleApply(job)}
                        className="flex-1 rounded-lg bg-[var(--blue)] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--sh-blue)] transition-colors hover:bg-[var(--blue-dark)]"
                  >
                        Apply now
                  </button>
                </div>
                  </article>
                ))}
              </div>
            </SectionReveal>
        </div>
      </section>
      </main>

      {/* Job detail modal */}
      {selectedJob && !showApplicationForm && (
        <div className={modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="job-title">
          <div className={`${modalPanel} max-w-3xl`}>
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--line)] bg-[var(--white)] px-6 py-4">
                <div>
                <h2 id="job-title" className="text-2xl font-semibold text-[var(--ink)]">
                  {selectedJob.title}
                </h2>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-[var(--ink-muted)]">
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-[var(--blue)]" />
                    {selectedJob.department}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-[var(--blue)]" />
                    {selectedJob.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4 text-[var(--blue)]" />
                    {selectedJob.type}
                  </span>
                </div>
                </div>
                <button
                type="button"
                  onClick={() => setSelectedJob(null)}
                className="rounded-lg p-2 text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                aria-label="Close"
                >
                <X className="h-5 w-5" />
                </button>
              </div>
            <div className="space-y-6 px-6 py-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-[var(--ink)]">About the role</h3>
                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                  {selectedJob.description}
                </p>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-semibold text-[var(--ink)]">Responsibilities</h3>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index} className="flex gap-3 text-sm text-[var(--ink-soft)]">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--blue)]" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-semibold text-[var(--ink)]">Qualifications</h3>
                <ul className="space-y-2">
                  {selectedJob.qualifications.map((qual, index) => (
                    <li key={index} className="flex gap-3 text-sm text-[var(--ink-soft)]">
                      <Star className="mt-0.5 h-5 w-5 shrink-0 text-[var(--amber)]" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 rounded-lg border-2 border-[var(--line-strong)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface)]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleApply(selectedJob)}
                  className="flex-1 rounded-lg bg-[var(--blue)] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--sh-blue)] hover:bg-[var(--blue-dark)]"
                >
                  Apply for this position
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application form modal */}
      {showApplicationForm && selectedJob && (
        <div className={modalBackdrop} role="dialog" aria-modal="true">
          <div className={`${modalPanel} max-w-lg`}>
            <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-6 py-4">
                <div>
                <h2 className="text-xl font-semibold text-[var(--ink)]">
                  Apply for {selectedJob.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">
                  Submit your details and we’ll get back to you.
                </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                className="rounded-lg p-2 text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                aria-label="Close"
                >
                <X className="h-5 w-5" />
                </button>
              </div>
            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
                <div>
                <label htmlFor="careers-name" className={labelClass}>
                  Full name *
                </label>
                  <input
                  id="careers-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                <label htmlFor="careers-email" className={labelClass}>
                  Email *
                </label>
                  <input
                  id="careers-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  className={inputClass}
                  placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                <label htmlFor="careers-country" className={labelClass}>
                  Country *
                </label>
                  <select
                  id="careers-country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  className={inputClass}
                    required
                  >
                  <option value="">Select your country</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                <label htmlFor="careers-exp" className={labelClass}>
                  Years of experience *
                </label>
                  <select
                  id="careers-exp"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                  className={inputClass}
                    required
                  >
                  <option value="">Select experience level</option>
                  <option value="0-1 years">0–1 years (entry)</option>
                  <option value="1-3 years">1–3 years (junior)</option>
                  <option value="3-5 years">3–5 years (mid)</option>
                  <option value="5-8 years">5–8 years (senior)</option>
                  <option value="8+ years">8+ years (expert)</option>
                  </select>
                </div>
                <div>
                <span className={labelClass}>Resume (PDF) *</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink-soft)] transition-colors hover:border-[var(--blue)] hover:bg-[var(--blue-ghost)] hover:text-[var(--ink)]"
                    >
                  <Upload className="h-4 w-4 text-[var(--blue)]" />
                  {formData.resume ? formData.resume.name : "Upload PDF"}
                    </button>
                  {formData.resume && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-[var(--blue-deep)]">
                    <FileText className="h-4 w-4" />
                    File selected
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 rounded-lg border-2 border-[var(--line-strong)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[var(--blue)] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--sh-blue)] hover:bg-[var(--blue-dark)]"
                >
                  Submit application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;
