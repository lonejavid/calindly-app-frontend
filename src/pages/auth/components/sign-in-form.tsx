import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, CalendarCheck, UserPlus, Briefcase } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePaths";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { checkBackendConnection, loginMutationFn } from "@/lib/api";
import { ENV } from "@/lib/get-env";
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import leftPanelBg from "@/assets/unnamed.jpg";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm(_props: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
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
        toast.success("Login successfully");
        navigate(PROTECTED_ROUTES.EVENT_TYPES);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to login");
      },
    });
  };

  const handleGoogleSignIn = () => {
    const base = (ENV.VITE_API_BASE_URL || "").replace(/\/api\/?$/, "") || "http://localhost:5000";
    window.location.href = `${base}/api/auth/google`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-white"
      style={{ background: "var(--white)", fontFamily: "Inter, sans-serif" }}
    >
      <div
        className="w-full max-w-4xl overflow-hidden rounded-[var(--r-2xl)] flex flex-col md:flex-row min-h-[480px] md:min-h-[520px] max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "var(--sh-lg), 0 0 0 1px rgba(10,22,40,0.06)" }}
      >
        {/* Left panel – welcome with bg image */}
        <div
          className="relative flex-shrink-0 w-full md:w-[42%] flex flex-col justify-center px-6 md:px-8 py-8 md:py-10 text-white overflow-hidden min-h-[400px] md:min-h-[520px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${leftPanelBg})`,
          }}
        >
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            // style={{ background: "linear-gradient(165deg, rgba(0,50,120,0.75) 0%, rgba(0,30,80,0.8) 50%, rgba(0,50,120,0.75) 100%)" }}
          />

          <div className="relative z-10 flex flex-col justify-between h-full gap-5">
            <div>
              <div
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 mb-5 border border-white/30 w-full max-w-[200px]"
                style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(14px)", boxShadow: "0 0 20px rgba(255,255,255,0.08)" }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                  Welcome back
                </p>
              </div>
              <h2 className="text-3xl md:text-[2.75rem] font-bold uppercase tracking-tight leading-tight text-white">
                Schedley
              </h2>
              <p className="mt-3 text-base md:text-lg font-bold text-white leading-snug">
                Your calendar, on autopilot.
              </p>
              <p className="mt-2 text-sm text-white/85 leading-relaxed max-w-[280px]">
                Schedley finds real leads, blocks spam meetings, and automates scheduling. Share your link, let clients book instantly, and focus on meetings that matter.
              </p>
            </div>

            {/* Feature boxes – glassy, soft border */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mt-2">
              {[
                { icon: CalendarCheck, label: "Smart Scheduling" },
                { icon: UserPlus, label: "Client Acquisition" },
                { icon: Briefcase, label: "Recruiting Talent" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center rounded-[var(--r-m)] px-2 py-4 border border-white/25"
                  style={{ background: "rgba(255,255,255,0.09)", backdropFilter: "blur(12px)", boxShadow: "0 0 24px rgba(0,122,255,0.08)" }}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white mb-2 shrink-0" strokeWidth={1.8} />
                  <span className="text-[11px] md:text-xs font-medium text-white text-center leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Trusted by + 10,000+ professionals – single row (ref 2nd screenshot) */}
            <div className="mt-4 flex flex-row items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90 mb-2.5">
                  Trusted by
                </p>
                <div className="flex gap-2.5">
                  {["Artis", "Nexo", "Vero"].map((label) => (
                    <div
                      key={label}
                      className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/20 text-white text-[10px] font-semibold tracking-tight"
                      style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", boxShadow: "0 0 16px rgba(0,122,255,0.06)" }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex -space-x-3 mb-1.5">
                  {[
                    "https://i.pravatar.cc/100?img=11",
                    "https://i.pravatar.cc/100?img=5",
                    "https://i.pravatar.cc/100?img=12",
                  ].map((src, i) => (
                    <Avatar
                      key={src}
                      className="w-9 h-9 shrink-0 border-2 border-white/30 ring-2 ring-[var(--blue-deep)]"
                      style={{ zIndex: 3 - i }}
                    >
                      <AvatarImage src={src} alt="" className="object-cover" />
                      <AvatarFallback className="bg-blue-dark text-white text-xs">?</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs text-white/90 font-medium whitespace-nowrap">
                  <span className="font-bold text-white">10,000+</span> professionals
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel – form */}
        <div
          className="relative flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-10 py-8 md:py-10 bg-white"
          style={{ background: "var(--white)" }}
        >
          <div className="w-full max-w-sm mx-auto">
            <h1 className="text-2xl font-semibold text-ink tracking-tight pb-2 border-amber/30">
              Sign in
            </h1>
            <p className="text-sm text-ink-muted mt-1.5">Enter your credentials to access your account.</p>

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
                  <Link to="/forgot-password" className="auth-link text-sm font-medium">
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
