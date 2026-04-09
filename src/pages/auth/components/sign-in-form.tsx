import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePaths";
import type { CustomError } from "@/types/custom-error.type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import {
  checkBackendConnection,
  loginMutationFn,
  loginSendOtp,
  loginVerifyOtp,
} from "@/lib/api";
import { ENV } from "@/lib/get-env";
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

type SignInMode = "password" | "otp";

export function SignInForm() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<SignInMode>("password");
  const [otpStep, setOtpStep] = useState<"email" | "code">("email");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [backendOk, setBackendOk] = useState<boolean | null>(null);

  const { setUser, setAccessToken, setExpiresAt } = useStore();

  useEffect(() => {
    checkBackendConnection().then(({ ok }) => setBackendOk(ok));
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormValues) => {
    if (isPending) return;
    mutate(values, {
      onSuccess: (data) => {
        setUser(data.user);
        setAccessToken(data.accessToken);
        setExpiresAt(data.expiresAt);
        toast.success("Signed in successfully");
        navigate(
          data.user.isApproved ? PROTECTED_ROUTES.EVENT_TYPES : PROTECTED_ROUTES.SETUP
        );
      },
      onError: (error: CustomError) => {
        toast.error(error.message || "Failed to login");
      },
    });
  };

  const handleSendLoginOtp = async () => {
    const e = otpEmail.trim().toLowerCase();
    if (!e) {
      toast.error("Enter your email");
      return;
    }
    setOtpSending(true);
    try {
      const res = await loginSendOtp(e);
      toast.message(res.message);
      if (res.codeSent) setOtpStep("code");
    } catch (err) {
      toast.error((err as CustomError).message || "Could not send code");
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyLoginOtp = async () => {
    if (!/^\d{6}$/.test(otpCode)) {
      toast.error("Enter the 6-digit code from your email");
      return;
    }
    setOtpVerifying(true);
    try {
      const data = await loginVerifyOtp(otpEmail.trim().toLowerCase(), otpCode);
      setUser(data.user);
      setAccessToken(data.accessToken);
      setExpiresAt(data.expiresAt);
      toast.success("Signed in successfully");
      navigate(
        data.user.isApproved ? PROTECTED_ROUTES.EVENT_TYPES : PROTECTED_ROUTES.SETUP
      );
    } catch (err) {
      toast.error((err as CustomError).message || "Invalid code");
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleGoogleSignIn = () => {
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
              Sign in
            </h1>
            <p className="text-sm text-ink-muted mt-1.5">
              {mode === "password"
                ? "Enter your credentials to access your account."
                : "We’ll email you a one-time code to sign in."}
            </p>

            <div className="mt-4 flex rounded-[var(--r-m)] border border-[var(--line)] p-1 bg-[var(--surface)]">
              <button
                type="button"
                onClick={() => {
                  setMode("password");
                  setOtpStep("email");
                  setOtpCode("");
                }}
                className={`flex-1 rounded-[var(--r-s)] py-2 text-sm font-medium transition-colors ${
                  mode === "password"
                    ? "bg-[var(--white)] text-[var(--ink)] shadow-sm"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("otp");
                  setOtpStep("email");
                  setOtpCode("");
                }}
                className={`flex-1 rounded-[var(--r-s)] py-2 text-sm font-medium transition-colors ${
                  mode === "otp"
                    ? "bg-[var(--white)] text-[var(--ink)] shadow-sm"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                Email code
              </button>
            </div>

            {backendOk === false && (
              <div
                className="mt-4 flex items-center gap-2 rounded-[var(--r-m)] border border-[var(--line-strong)] px-4 py-3 text-sm text-[var(--ink)]"
                style={{ background: "var(--amber-ghost)" }}
                role="alert"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-deep" />
                <span>
                  Cannot reach backend. Ensure it is running at{" "}
                  <code className="text-xs bg-white/80 px-1 rounded">{ENV.VITE_API_BASE_URL}</code> and CORS allows this origin.
                  </span>
              </div>
            )}

            {mode === "password" ? (
            <Form {...form}>
              <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5" autoComplete="on">
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
                            autoComplete="email"
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
                            placeholder="Password"
                            autoComplete="current-password"
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

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="auth-remember-checkbox size-5 shrink-0 rounded border-2 border-border cursor-pointer focus:outline-none focus:ring-0"
                    />
                    <span className="text-sm text-ink">Remember me</span>
                  </label>
                  <Link to={AUTH_ROUTES.FORGOT_PASSWORD} className="auth-link text-sm font-medium">
                    Forgot password?
                  </Link>
                </div>

                  <Button 
                  type="submit"
                    disabled={isPending} 
                  className="auth-primary-btn w-full h-12 rounded-[var(--r-m)] font-semibold text-white border-0"
                >
                  {isPending ? <Loader color="white" /> : "Sign in"}
                  </Button>

                <div className="relative flex items-center gap-2">
                  <span className="flex-1 h-px bg-border" />
                  <span className="text-xs text-ink-muted">Or continue with</span>
                  <span className="flex-1 h-px bg-border" />
                  </div>

                  <Button
                  type="button"
                        variant="outline"
                  onClick={handleGoogleSignIn}
                  className="auth-google-btn w-full h-12 rounded-[var(--r-m)] border-2 font-medium transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                  Sign in with Google
                      </Button>

                <p className="text-center text-sm text-ink">
                  Don&apos;t have an account?{" "}
                    <Link
                      to={AUTH_ROUTES.SIGN_UP}
                    className="auth-link font-semibold"
                    >
                      Sign up
                    </Link>
                </p>
            </form>
          </Form>
            ) : (
              <div className="mt-6 space-y-5">
                {otpStep === "email" ? (
                  <>
                    <div>
                      <Label className="text-ink text-sm font-medium sr-only">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
                        <Input
                          type="email"
                          value={otpEmail}
                          onChange={(ev) => setOtpEmail(ev.target.value)}
                          placeholder="Email"
                          autoComplete="email"
                          className="pl-10 bg-surface border-border text-ink placeholder:text-ink-muted rounded-[var(--r-m)] h-12 focus-visible:ring-2 focus-visible:ring-blue focus-visible:border-blue"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleSendLoginOtp}
                      disabled={otpSending}
                      className="auth-primary-btn w-full h-12 rounded-[var(--r-m)] font-semibold text-white border-0"
                    >
                      {otpSending ? <Loader color="white" /> : "Send sign-in code"}
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-ink-muted">
                      Code sent to <span className="font-medium text-ink">{otpEmail}</span>
                    </p>
                    <div>
                      <Label className="text-ink text-sm font-medium mb-1.5 block">6-digit code</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
                        <Input
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={6}
                          value={otpCode}
                          onChange={(ev) => setOtpCode(ev.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="000000"
                          className="pl-10 bg-surface border-border text-ink rounded-[var(--r-m)] h-12 tracking-widest font-mono text-center text-lg focus-visible:ring-2 focus-visible:ring-blue focus-visible:border-blue"
                        />
                      </div>
                  </div>
                    <Button
                      type="button"
                      onClick={handleVerifyLoginOtp}
                      disabled={otpVerifying}
                      className="auth-primary-btn w-full h-12 rounded-[var(--r-m)] font-semibold text-white border-0"
                    >
                      {otpVerifying ? <Loader color="white" /> : "Verify and sign in"}
                    </Button>
                    <button
                      type="button"
                      className="w-full text-sm text-[var(--blue)] font-medium hover:underline"
                      onClick={() => {
                        setOtpStep("email");
                        setOtpCode("");
                      }}
                    >
                      Use a different email
                    </button>
                  </>
                )}

                <div className="relative flex items-center gap-2">
                  <span className="flex-1 h-px bg-border" />
                  <span className="text-xs text-ink-muted">Or continue with</span>
                  <span className="flex-1 h-px bg-border" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  className="auth-google-btn w-full h-12 rounded-[var(--r-m)] border-2 font-medium transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </Button>

                <p className="text-center text-sm text-ink">
                  Don&apos;t have an account?{" "}
                  <Link to={AUTH_ROUTES.SIGN_UP} className="auth-link font-semibold">
                    Sign up
                  </Link>
                </p>
              </div>
            )}

            <p className="mt-6 text-center text-xs text-ink-muted leading-relaxed">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="auth-link font-medium">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy" className="auth-link font-medium">Privacy Policy</Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
