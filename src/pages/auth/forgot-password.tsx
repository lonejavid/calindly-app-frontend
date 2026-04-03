import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AUTH_ROUTES } from "@/routes/common/routePaths";
import { forgotPasswordSendOtp, forgotPasswordReset } from "@/lib/api";
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import type { CustomError } from "@/types/custom-error.type";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

const resetSchema = z.object({
  email: z.string().email(),
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d{6}$/, "Digits only"),
  newPassword: z.string().min(6, "At least 6 characters"),
});

type EmailStep = z.infer<typeof emailSchema>;
type ResetStep = z.infer<typeof resetSchema>;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [emailLocked, setEmailLocked] = useState("");
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);

  const emailForm = useForm<EmailStep>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetStep>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "", code: "", newPassword: "" },
  });

  const onSendOtp = async (values: EmailStep) => {
    setSending(true);
    try {
      const res = await forgotPasswordSendOtp(values.email.trim().toLowerCase());
      if (res.flow === "google_only") {
        toast.message(res.message);
        return;
      }
      if (!res.codeSent) {
        toast.error(res.message || "No account found for this email.");
        return;
      }
      toast.success(res.message);
      setEmailLocked(values.email.trim().toLowerCase());
      resetForm.setValue("email", values.email.trim().toLowerCase());
      setStep("reset");
    } catch (e) {
      const err = e as CustomError;
      toast.error(err.message || "Could not send code");
    } finally {
      setSending(false);
    }
  };

  const onReset = async (values: ResetStep) => {
    setResetting(true);
    try {
      await forgotPasswordReset(values.email, values.code, values.newPassword);
      toast.success("Password updated. Sign in with your new password.");
      navigate(AUTH_ROUTES.SIGN_IN);
    } catch (e) {
      const err = e as CustomError;
      toast.error(err.message || "Reset failed");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-6"
      style={{ background: "var(--white)", fontFamily: "Inter, sans-serif" }}
    >
      <div
        className="w-full max-w-md rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--white)] p-8 shadow-[var(--sh-md)]"
      >
        <Link
          to={AUTH_ROUTES.SIGN_IN}
          className="inline-flex items-center gap-2 text-sm text-[var(--ink-muted)] hover:text-[var(--blue)] mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        <h1 className="text-2xl font-semibold text-[var(--ink)] tracking-tight">
          {step === "email" ? "Forgot password" : "Set new password"}
        </h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1.5">
          {step === "email"
            ? "We’ll email you a 6-digit code to reset your password."
            : `Enter the code sent to ${emailLocked} and choose a new password.`}
        </p>

        {step === "email" ? (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onSendOtp)}
              className="mt-6 space-y-5"
            >
              <FormField
                name="email"
                control={emailForm.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-medium text-[var(--ink)]">Email</Label>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--ink-muted)]" />
                        <Input
                          {...field}
                          type="email"
                          autoComplete="email"
                          className="pl-10 h-12 rounded-[var(--r-m)] border-[var(--line)]"
                          placeholder="you@company.com"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-red-600" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={sending}
                className="w-full h-12 rounded-[var(--r-m)] font-semibold"
              >
                {sending ? <Loader color="white" /> : "Send reset code"}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...resetForm}>
            <form
              onSubmit={resetForm.handleSubmit(onReset)}
              className="mt-6 space-y-5"
            >
              <input type="hidden" {...resetForm.register("email")} />
              <FormField
                name="code"
                control={resetForm.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-medium text-[var(--ink)]">6-digit code</Label>
                    <FormControl>
                      <Input
                        {...field}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        className="h-12 rounded-[var(--r-m)] border-[var(--line)] tracking-widest text-center text-lg font-mono"
                        placeholder="000000"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                name="newPassword"
                control={resetForm.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-sm font-medium text-[var(--ink)]">New password</Label>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--ink-muted)]" />
                        <Input
                          {...field}
                          type="password"
                          autoComplete="new-password"
                          className="pl-10 h-12 rounded-[var(--r-m)] border-[var(--line)]"
                          placeholder="At least 6 characters"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-red-600" />
                  </FormItem>
                )}
              />
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 rounded-[var(--r-m)]"
                  onClick={() => {
                    setStep("email");
                    resetForm.reset();
                  }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={resetting}
                  className="flex-1 h-12 rounded-[var(--r-m)] font-semibold"
                >
                  {resetting ? <Loader color="white" /> : "Update password"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
