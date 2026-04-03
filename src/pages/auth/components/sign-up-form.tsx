import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "@/routes/common/routePaths";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useStore } from "@/store/store";
import { signupSendOtp, signupVerifyOtp } from "@/lib/api";
import type { CustomError } from "@/types/custom-error.type";
import { ENV } from "@/lib/get-env";
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { useState } from "react";
import { PROTECTED_ROUTES } from "@/routes/common/routePaths";
const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signupStep, setSignupStep] = useState<"details" | "code">("details");
  const [pendingEmail, setPendingEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const { setUser, setAccessToken, setExpiresAt } = useStore();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmitDetails = async (values: SignUpFormValues) => {
    if (sendingOtp) return;
    setSendingOtp(true);
    try {
      await signupSendOtp(values);
      setPendingEmail(values.email.trim().toLowerCase());
      setSignupStep("code");
      toast.success("Verification code sent to your email.");
    } catch (error) {
      toast.error((error as CustomError).message || "Failed to send code");
    } finally {
      setSendingOtp(false);
    }
  };

  const onVerifyCode = async () => {
    if (!/^\d{6}$/.test(verifyCode)) {
      toast.error("Enter the 6-digit code from your email");
      return;
    }
    setVerifying(true);
    try {
      const data = await signupVerifyOtp(pendingEmail, verifyCode);
      setUser(data.user);
      setAccessToken(data.accessToken);
      setExpiresAt(data.expiresAt);
      toast.success("Account created. Welcome!");
      navigate(
        data.user.isApproved ? PROTECTED_ROUTES.EVENT_TYPES : PROTECTED_ROUTES.SETUP
      );
    } catch (error) {
      toast.error((error as CustomError).message || "Invalid or expired code");
    } finally {
      setVerifying(false);
    }
  };

  const handleGoogleSignUp = () => {
    const base = (ENV.VITE_API_BASE_URL || "").replace(/\/api\/?$/, "") || "http://localhost:5000";
    window.location.href = `${base}/api/auth/google`;
  };

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center p-4 sm:p-6 bg-[var(--white)]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div
        className="w-full max-w-md rounded-[var(--r-xl)] bg-[var(--white)] max-h-[min(100dvh-2rem,900px)] overflow-y-auto overflow-x-hidden"
        style={{ boxShadow: "var(--sh-lg), 0 0 0 1px rgba(10,22,40,0.06)" }}
      >
        <div className="relative flex flex-col justify-center px-5 sm:px-8 py-8 sm:py-10 bg-[var(--white)]">
          <div className="w-full max-w-sm mx-auto min-w-0">
            <h1 className="text-2xl font-semibold text-ink tracking-tight pb-2 border-amber/30">
              Sign up
            </h1>
            <p className="text-sm text-ink-muted mt-1.5">
              {signupStep === "details"
                ? "Create an account to get started. We’ll verify your email with a code."
                : `Enter the code we sent to ${pendingEmail}`}
            </p>

            {signupStep === "details" ? (
            <Form {...form}>
              <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmitDetails)} className="mt-6 space-y-5" autoComplete="off">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-ink text-sm font-medium sr-only">Full name</Label>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="Full name"
                            autoComplete="off"
                            className="pl-10 bg-surface border-border text-ink placeholder:text-ink-muted rounded-[var(--r-m)] h-12 focus-visible:ring-2 focus-visible:ring-blue focus-visible:border-blue"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-amber-deep text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-ink text-sm font-medium sr-only">Email</Label>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email"
                            autoComplete="off"
                            className="pl-10 bg-surface border-border text-ink placeholder:text-ink-muted rounded-[var(--r-m)] h-12 focus-visible:ring-2 focus-visible:ring-blue focus-visible:border-blue"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-amber-deep text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-ink text-sm font-medium sr-only">Password</Label>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password (6+ characters)"
                            autoComplete="off"
                            className="pl-10 pr-20 bg-surface border-border text-ink placeholder:text-ink-muted rounded-[var(--r-m)] h-12 focus-visible:ring-2 focus-visible:ring-blue focus-visible:border-blue"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted hover:text-ink-soft"
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-amber-deep text-sm" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={sendingOtp}
                  className="auth-primary-btn w-full h-12 rounded-[var(--r-m)] font-semibold text-white border-0"
                >
                  {sendingOtp ? <Loader color="white" /> : "Send verification code"}
                </Button>

                <div className="relative flex items-center gap-2">
                  <span className="flex-1 h-px bg-border" />
                  <span className="text-xs text-ink-muted">Or continue with</span>
                  <span className="flex-1 h-px bg-border" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignUp}
                  className="auth-google-btn w-full h-12 rounded-[var(--r-m)] border-2 font-medium transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </Button>

                <p className="text-center text-sm text-ink">
                  Already have an account?{" "}
                  <Link to={AUTH_ROUTES.SIGN_IN} className="auth-link font-semibold">
                    Sign in
                  </Link>
                </p>
              </form>
            </Form>
            ) : (
              <div className="mt-6 space-y-5">
                <div>
                  <Label className="text-ink text-sm font-medium mb-1.5 block">6-digit code</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
                    <Input
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={verifyCode}
                      onChange={(ev) => setVerifyCode(ev.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="000000"
                      className="pl-10 bg-surface border-border text-ink rounded-[var(--r-m)] h-12 tracking-widest font-mono text-center text-lg focus-visible:ring-2 focus-visible:ring-blue focus-visible:border-blue"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={onVerifyCode}
                  disabled={verifying}
                  className="auth-primary-btn w-full h-12 rounded-[var(--r-m)] font-semibold text-white border-0"
                >
                  {verifying ? <Loader color="white" /> : "Verify and create account"}
                </Button>
                <button
                  type="button"
                  className="w-full text-sm text-[var(--blue)] font-medium hover:underline"
                  onClick={() => {
                    setSignupStep("details");
                    setVerifyCode("");
                  }}
                >
                  Back to edit details
                </button>

                <div className="relative flex items-center gap-2 pt-2">
                  <span className="flex-1 h-px bg-border" />
                  <span className="text-xs text-ink-muted">Or continue with</span>
                  <span className="flex-1 h-px bg-border" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignUp}
                  className="auth-google-btn w-full h-12 rounded-[var(--r-m)] border-2 font-medium transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </Button>

                <p className="text-center text-sm text-ink">
                  Already have an account?{" "}
                  <Link to={AUTH_ROUTES.SIGN_IN} className="auth-link font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            )}

            <p className="mt-6 text-center text-xs text-ink-muted leading-relaxed">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="auth-link font-medium">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy" className="auth-link font-medium">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
