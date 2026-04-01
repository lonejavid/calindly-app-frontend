import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  UserRound,
  Handshake,
  TrendingUp,
  Phone,
  ShoppingCart,
  Zap,
  Store,
  Building2,
  Rocket,
  HeartPulse,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
} from "lucide-react";
import { useStore } from "@/store/store";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";
import { setupComplete, updateSetupProgress } from "@/lib/api";
import { cn } from "@/lib/utils";

type CardOption = { value: string; label: string; Icon: LucideIcon };

type Step =
  | {
      title: string;
      subtitle: string;
      field: keyof FormData;
      type: "cards";
      options: CardOption[];
    }
  | {
      title: string;
      subtitle: string;
      field: keyof FormData;
      type: "textarea";
      placeholder: string;
    }
  | {
      title: string;
      subtitle: string;
      field: keyof FormData;
      type: "pricing";
      placeholder: string;
    };

type FormData = {
  sellingMethod: string;
  icp: string;
  productDescription: string;
  pricing: string;
  currency: string;
};

const STEPS: Step[] = [
    {
      title: "How are you currently selling your product?",
    subtitle:
      "Your responses will help us tailor your experience to your needs.",
      field: "sellingMethod",
      type: "cards",
      options: [
      { value: "Direct Sales", label: "Direct Sales", Icon: UserRound },
      { value: "Resellers/Partners", label: "With partners", Icon: Handshake },
      {
        value: "Inbound Marketing",
        label: "Inbound Marketing",
        Icon: TrendingUp,
      },
      { value: "Outbound Sales", label: "Outbound Sales", Icon: Phone },
      {
        value: "Online Marketplace",
        label: "Online Marketplace",
        Icon: ShoppingCart,
      },
      { value: "Other", label: "Other", Icon: Zap },
    ],
    },
    {
      title: "Who is your ideal customer?",
    subtitle:
      "Understanding your target market will help us set up your first scheduling link.",
      field: "icp",
      type: "cards",
      options: [
      { value: "Small Business", label: "Small Business", Icon: Store },
      { value: "Enterprise", label: "Enterprise", Icon: Building2 },
      { value: "Startups", label: "Startups", Icon: Rocket },
      { value: "Healthcare", label: "Healthcare", Icon: HeartPulse },
      { value: "Education", label: "Education", Icon: GraduationCap },
      { value: "Other", label: "Other", Icon: Sparkles },
    ],
    },
    {
      title: "What product are you selling?",
    subtitle:
      "Tell us about your product or service to personalize your experience.",
      field: "productDescription",
      type: "textarea",
    placeholder:
      "Describe your product, its key features, and what problems it solves…",
    },
    {
      title: "What's your pricing?",
    subtitle:
      "Help us understand your pricing structure for better recommendations.",
      field: "pricing",
      type: "pricing",
    placeholder: "Enter amount",
  },
];

const Setup = () => {
  const navigate = useNavigate();
  const user = useStore((s) => s.user);
  const setUser = useStore((s) => s.setUser);

  const savedStep = Math.min(
    STEPS.length - 1,
    Math.max(0, user?.setupStep ?? 0),
  );
  const [currentStep, setCurrentStep] = useState(savedStep);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    sellingMethod: "",
    icp: "",
    productDescription: "",
    pricing: "",
    currency: "USD",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setCurrentStep(savedStep);
  }, [savedStep]);

  const handleInputChange = (value: string) => {
    const field = STEPS[currentStep].field;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateUserApprovalStatus = async () => {
    const res = await setupComplete();
    if (res?.user) {
      setUser(res.user);
      return res.user;
    }
    throw new Error("Setup complete failed");
  };

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      try {
        const { step } = await updateSetupProgress(nextStep);
        setUser(user ? { ...user, setupStep: step } : null);
      } catch (e) {
        console.error("Failed to save setup progress", e);
      }
    } else {
      try {
        setIsLoading(true);
        await updateUserApprovalStatus();
        setShowSuccess(true);
        setTimeout(() => {
          navigate(PROTECTED_ROUTES.EVENT_TYPES, { replace: true });
        }, 2000);
      } catch (error) {
        console.error("Setup completion error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrevious = async () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      try {
        const { step } = await updateSetupProgress(prevStep);
        setUser(user ? { ...user, setupStep: step } : null);
      } catch (e) {
        console.error("Failed to save setup progress", e);
      }
    }
  };

  const currentField = STEPS[currentStep].field;
    const value = formData[currentField];
  const isCurrentStepValid = Boolean(value && String(value).trim() !== "");
  const canContinue = isCurrentStepValid && !isLoading;
  const currentStepData = STEPS[currentStep];
  const progressPercent = Math.round(
    ((currentStep + 1) / STEPS.length) * 100,
  );

  if (showSuccess) {
    return (
            <div
      // height - 100dvh - header height is min-h-12
        className="b2b-page setup-wizard flex h-[calc(100dvh-3rem)] items-center justify-center px-4 py-8 sm:py-10"
              style={{
          background:
            "linear-gradient(165deg, var(--white) 0%, var(--surface) 50%, var(--blue-lite) 100%)",
        }}
      >
        <div className="setup-animate-in w-full max-w-lg rounded-[var(--r-xl)] border-2 border-[var(--line)] bg-[var(--white)] p-6 text-center shadow-[var(--sh-md)] sm:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--blue)] shadow-[var(--sh-blue)] sm:mb-5 sm:h-16 sm:w-16">
            <Check className="h-8 w-8 text-white sm:h-10 sm:w-10" strokeWidth={2.5} />
        </div>
          <h1 className="b2b-display mb-2 text-3xl tracking-tight text-[var(--ink)] sm:text-4xl">
            You&apos;re all set
            </h1>
          <p className="mb-5 text-base font-normal leading-relaxed text-[var(--ink-muted)] sm:mb-6 sm:text-lg">
            Redirecting to your dashboard…
          </p>
          <div className="flex justify-center gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-2 w-2 animate-bounce rounded-full bg-[var(--blue)]"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
                </div>
              <button
            type="button"
            onClick={() =>
              navigate(PROTECTED_ROUTES.EVENT_TYPES, { replace: true })
            }
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-[var(--r-m)] border-2 border-[var(--blue)] bg-[var(--blue)] px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:border-[var(--blue-dark)] hover:bg-[var(--blue-dark)] active:scale-[0.98] sm:mt-6 sm:py-4"
          >
            Continue to dashboard
            <ArrowRight className="h-5 w-5" />
              </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="b2b-page setup-wizard flex min-h-full flex-1 flex-col bg-[var(--white)] text-[var(--ink)]"
      style={{
        background:
          "linear-gradient(180deg, var(--white) 0%, var(--surface) 40%, var(--surface-2) 100%)",
      }}
    >
      <div className="mx-auto flex min-h-full w-full max-w-[1280px] flex-1 flex-col px-4 py-6 sm:px-6 sm:py-7 lg:min-h-0 lg:px-8 lg:pb-6">
        <div className="flex min-h-0 flex-1 flex-col gap-7 pb-5 lg:flex-row lg:gap-10 xl:gap-12">
          {/* Form column — fills viewport height on desktop so Continue sits at bottom */}
          <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col lg:max-w-[52%]">
            <div className="mb-5 flex w-full flex-col gap-3.5 rounded-[var(--r-xl)] border-2 border-[var(--line)] bg-[var(--white)] p-3.5 shadow-[var(--sh-sm)] sm:mb-6 sm:flex-row sm:items-stretch sm:gap-4 sm:p-4">
              <button
                type="button"
                onClick={() => void handlePrevious()}
                disabled={currentStep === 0}
                className={cn(
                  "inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-[var(--r-m)] border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:self-center",
                  currentStep === 0
                    ? "cursor-not-allowed border-[var(--line)] bg-[var(--surface)] text-[var(--ink-muted)] opacity-50"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--blue)] hover:bg-[var(--blue-lite)] hover:text-[var(--blue-deep)]",
                )}
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)] sm:text-xs">
                    Progress
            </span>
                  <span className="text-lg font-bold tabular-nums text-[var(--blue)]">
                    {progressPercent}%
            </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full border border-[var(--line)] bg-[var(--surface)] p-0.5 sm:h-3.5">
                  <div
                    className="h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{
                      width: `${progressPercent}%`,
                      background:
                        "linear-gradient(90deg, var(--blue) 0%, var(--blue-mid) 100%)",
                      boxShadow: "0 2px 12px var(--blue-glow)",
                    }}
                  />
            </div>
          </div>
        </div>

            <div className="mb-5 sm:mb-6">
              <span className="mb-3 inline-flex rounded-full border border-[var(--blue)]/20 bg-[var(--blue-ghost)] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--blue)] sm:mb-3.5 sm:text-[11px]">
                Get started
              </span>
              <h1 className="b2b-display text-2xl leading-tight text-[var(--ink)] sm:text-3xl lg:text-[1.85rem]">
                  {currentStepData.title}
                </h1>
              <p className="mt-3 max-w-xl text-base font-normal leading-relaxed text-[var(--ink-muted)] sm:mt-3.5 sm:text-[1.0625rem]">
                  {currentStepData.subtitle}
                </p>
              </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="shrink-0">
              {currentStepData.type === "cards" && (
                <div
                  key={currentStep}
                  className="setup-stagger grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 xl:gap-4"
                >
                  {currentStepData.options.map((option) => {
                    const selected =
                      formData[currentStepData.field] === option.value;
                    const { Icon } = option;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange(option.value)}
                        className={cn(
                          "group flex min-h-[108px] flex-col items-center justify-center gap-3 rounded-[var(--r-xl)] border-2 px-4 py-6 text-center transition-all duration-300 sm:min-h-[118px] sm:px-5 sm:py-6",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)]/30 focus-visible:ring-offset-2",
                          selected
                            ? "border-[var(--blue)] bg-[var(--blue-lite)] shadow-[var(--sh-md)]"
                            : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--blue)]/50 hover:shadow-[var(--sh-sm)]",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-xl shadow-[var(--sh-sm)] transition-all duration-300 sm:h-12 sm:w-12",
                            selected
                              ? "bg-[var(--blue)] text-white shadow-[var(--sh-blue)]"
                              : "bg-[var(--blue-lite)] text-[var(--blue)] group-hover:scale-105",
                          )}
                        >
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                          </span>
                        <span className="text-xs font-semibold text-[var(--ink)] sm:text-sm">
                            {option.label}
                          </span>
                      </button>
                    );
                  })}
                  </div>
              )}

              {currentStepData.type === "textarea" && (
                    <textarea
                  value={formData.productDescription}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={currentStepData.placeholder}
                  rows={5}
                  className="w-full max-w-2xl resize-none rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--white)] px-4 py-3 text-[var(--ink)] transition-all placeholder:text-[var(--ink-muted)] focus:border-[var(--blue)] focus:outline-none focus:ring-4 focus:ring-[var(--blue)]/10 sm:px-5 sm:py-4 sm:text-base"
                />
              )}

              {currentStepData.type === "pricing" && (
                <div className="flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch">
                      <select
                        value={formData.currency}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, currency: e.target.value }))
                    }
                    className="min-h-[52px] rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--white)] px-4 py-3.5 text-[var(--ink)] focus:border-[var(--blue)] focus:outline-none focus:ring-4 focus:ring-[var(--blue)]/10 sm:w-32"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="INR">INR</option>
                      </select>
                      <input
                        type="number"
                    value={formData.pricing}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={currentStepData.placeholder}
                    className="min-h-[52px] flex-1 rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--white)] px-4 py-3.5 text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:border-[var(--blue)] focus:outline-none focus:ring-4 focus:ring-[var(--blue)]/10"
                      />
                    </div>
              )}
                  </div>

              <div className="mt-4 w-full shrink-0 sm:mt-5">
              <button
                type="button"
                onClick={() => void handleNext()}
                disabled={!canContinue}
                className={cn(
                  "inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[var(--r-m)] border-2 px-8 py-3.5 text-base font-semibold transition-all duration-200 sm:min-h-14 sm:py-4",
                  canContinue
                    ? "border-[var(--blue)] bg-[var(--blue)] text-white shadow-[var(--sh-blue)] hover:scale-[1.02] hover:border-[var(--blue-dark)] hover:bg-[var(--blue-dark)] active:scale-[0.98]"
                    : "cursor-not-allowed border-[var(--line)] bg-[var(--surface)] text-[var(--ink-muted)]",
                )}
              >
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Setting up…
                  </>
                ) : (
                  <>
                    {currentStep === STEPS.length - 1
                      ? "Complete setup"
                      : "Continue"}
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
              </div>
            </div>
          </div>

          {/* Preview column — desktop */}
          <div
            className="relative hidden min-h-[400px] flex-1 overflow-visible lg:flex lg:min-h-[calc(100dvh-14rem)] lg:max-h-[calc(100dvh-14rem)]"
            style={{ maxWidth: "420px" }}
          >
            <div className="absolute inset-0 rounded-[var(--r-xl)] border-2 border-[var(--line)] bg-gradient-to-br from-violet-50/80 via-[var(--surface)] to-[var(--blue-lite)]" />

            <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-visible p-4 pb-8 pt-10 sm:p-6">
              {/* Main card + floating widgets positioned like reference (overlap corners) */}
              <div className="relative mx-auto w-full max-w-[288px] shrink-0">
                {/* Bookings today — top-right, overlaps main card */}
                <div className="absolute right-0 top-0 z-30 w-[184px] translate-x-[20%] -translate-y-[36%] rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--white)] p-3.5 shadow-[var(--sh-lg)]">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[var(--ink)]">
                      Bookings Today
                    </span>
                    <CheckCircle
                      className="h-4 w-4 shrink-0 text-emerald-500"
                      aria-hidden
                      strokeWidth={2.5}
                    />
                  </div>
                  <p className="setup-bookings-count text-3xl font-bold tabular-nums text-emerald-600">
                    12
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--ink-muted)]">
                    +25% from yesterday
                  </p>
                </div>

                <div className="relative z-10 mx-auto w-full rounded-[var(--r-xl)] border-2 border-[var(--line)] bg-[var(--white)] p-4 pt-3 shadow-[var(--sh-lg)] sm:p-5">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 shadow-md"
                        aria-hidden
                      />
                      <div className="min-w-0 space-y-1.5 pt-0.5">
                        <div
                          className="h-2.5 w-14 rounded-full bg-[var(--surface-2)]"
                          aria-hidden
                        />
                        <div
                          className="h-2 w-20 rounded-full bg-[var(--line-strong)]"
                          aria-hidden
                        />
                </div>
                    </div>
                    <span className="setup-available-badge max-w-[100px] shrink-0 rounded-full bg-[var(--blue)] px-2 py-1.5 text-center text-[8px] font-bold uppercase leading-tight tracking-wide text-white sm:max-w-none sm:px-2.5 sm:text-[9px]">
                      Available Time
                    </span>
              </div>
              
                  <div className="mb-3 grid grid-cols-7 gap-0.5">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i > 6 && i < 28 ? i - 6 : null;
                      const purplePick =
                        day === 4 || day === 9 || day === 14;
                      return (
                  <div
                    key={i}
                          className={cn(
                            "flex h-7 items-center justify-center text-[10px] font-medium",
                            !day && "text-transparent",
                            day &&
                              !purplePick &&
                              "text-[var(--ink-soft)]",
                            day &&
                              purplePick &&
                              "rounded-md bg-violet-100 font-semibold text-violet-800",
                          )}
                        >
                          {day ?? ""}
                  </div>
                      );
                    })}
              </div>
              
                  <div className="flex flex-col gap-1.5">
                    {["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"].map(
                      (time, index) => (
                  <div
                          key={time}
                          className={cn(
                            "rounded-[var(--r-m)] py-2 text-center text-xs font-semibold transition-all sm:text-sm",
                      index === 1 
                              ? "border-2 border-[var(--blue)] bg-[var(--blue-lite)] text-[var(--blue-deep)] shadow-[var(--sh-sm)]"
                              : "border-2 border-[var(--line)] bg-[var(--surface)] text-[var(--ink-mid)]",
                          )}
                  >
                    {time}
                  </div>
                      ),
                    )}
              </div>
            </div>

                {/* Conversion — bottom-left, overlaps main card */}
                <div className="absolute bottom-0 left-0 z-30 w-[178px] -translate-x-[18%] translate-y-[45%] rounded-[var(--r-m)] border-2 border-[var(--line)] bg-[var(--white)] p-3.5 shadow-[var(--sh-lg)]">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--ink-mid)]">
                      Conversion
                    </span>
                    <TrendingUp
                      className="h-4 w-4 shrink-0 text-[var(--blue)]"
                      aria-hidden
                    />
              </div>
                  <p className="mb-2 text-2xl font-bold tabular-nums text-[var(--blue)]">
                    78%
                  </p>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-2)]">
                    <div
                      className="setup-preview-progress h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--blue) 0%, #8b5cf6 100%)",
                      }}
                    />
            </div>
              </div>
              </div>
            </div>
          </div>
        </div>
              </div>
    </div>
  );
};

export default Setup;
