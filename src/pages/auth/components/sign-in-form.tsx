import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Command, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { loginMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { useState, useEffect } from 'react';

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { setUser, setAccessToken, setExpiresAt } = useStore();

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
    console.log("Form values:", values);
    if (isPending) return;

    mutate(values, {
      onSuccess: (data) => {
        const user = data.user;
        const accessToken = data.accessToken;
        const expiresAt = data.expiresAt;

        setUser(user);
        setAccessToken(accessToken);
        setExpiresAt(expiresAt);
        toast.success("Login successfully");

        navigate(PROTECTED_ROUTES.EVENT_TYPES);
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message || "Failed to login");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-30 h-30 sm:w-60 sm:h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className={`relative z-50 p-4 sm:p-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Schedley
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={`relative z-10 py-8 sm:py-20 px-4 sm:px-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-md mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Top Header */}
              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                    Schedley
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Welcome back
                </h2>
                <p className="text-gray-400 text-center">
                  Log in to your account to continue
                </p>
              </div>

              {/* Form Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="flex flex-col gap-6">
                  {/* Email Field */}
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label className="font-semibold text-gray-300">
                          Email address
                        </Label>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            className="bg-white/5 border-white/20 text-white focus:ring-purple-500 focus:border-purple-500"
                          />
                        </FormControl>
                        <FormMessage className="text-pink-400" />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label className="font-semibold text-gray-300">
                          Password
                        </Label>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            className="bg-white/5 border-white/20 text-white focus:ring-purple-500 focus:border-purple-500"
                          />
                        </FormControl>
                        <FormMessage className="text-pink-400" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    disabled={isPending} 
                    type="submit" 
                    className="w-full group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isPending ? (
                      <Loader color="white" />
                    ) : (
                      <>
                        Log in
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-white/20">
                    <span className="relative z-10 bg-transparent px-2 text-gray-400">
                      Or continue with
                    </span>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Google
                  </Button>

                  <div className="text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      to={AUTH_ROUTES.SIGN_UP}
                      className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center text-xs text-gray-500">
            By clicking continue, you agree to our{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
              Privacy Policy
            </a>.
          </div>
        </div>
      </div>
    </div>
  );
}


// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Command } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link, useNavigate } from "react-router-dom";
// import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes/common/routePaths";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { useStore } from "@/store/store";
// import { useMutation } from "@tanstack/react-query";
// import { loginMutationFn } from "@/lib/api";
// import { toast } from "sonner";
// import { Loader } from "@/components/loader";

// const signInSchema = z.object({
//   email: z.string().email("Please enter a valid email address."),
//   password: z.string().min(1, "Password is required"),
// });

// type SignInFormValues = z.infer<typeof signInSchema>;

// export function SignInForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   const navigate = useNavigate();

//   const { setUser, setAccessToken, setExpiresAt } = useStore();

//   const { mutate, isPending } = useMutation({
//     mutationFn: loginMutationFn,
//   });

//   const form = useForm<SignInFormValues>({
//     resolver: zodResolver(signInSchema),
//     mode: "onChange",
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = (values: SignInFormValues) => {
//     console.log("Form values:", values);
//     if (isPending) return;

//     mutate(values, {
//       onSuccess: (data) => {
//         const user = data.user;
//         const accessToken = data.accessToken;
//         const expiresAt = data.expiresAt;

//         setUser(user);
//         setAccessToken(accessToken);
//         setExpiresAt(expiresAt);
//         toast.success("Login successfully");

//         navigate(PROTECTED_ROUTES.EVENT_TYPES);
//       },
//       onError: (error) => {
//         console.log(error);
//         toast.error(error.message || "Failed to login");
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4 py-8">
//       {/* Background decorative elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
//         <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//       </div>

//       <div className={cn("flex flex-col gap-8 w-full max-w-md relative z-10", className)} {...props}>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             {/* Top Header */}
//             <div className="flex flex-col items-center gap-4 text-center">
//               <Link
//                 to="/"
//                 className="flex flex-col items-center gap-3 font-medium group transition-all duration-300 hover:scale-105"
//               >
//                 <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
//                   <Command className="size-6" />
//                 </div>
//                 <span className="sr-only">Meetly</span>
//               </Link>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Welcome back
//                 </h2>
//                 <p className="text-gray-600">
//                   Log into your Meetly account
//                 </p>
//               </div>
//             </div>

//             {/* Form Card */}
//             <div className="w-full bg-white/70 backdrop-blur-xl flex flex-col gap-6 rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
//               <div className="flex flex-col gap-6">
//                 {/* Email Field */}
//                 <FormField
//                   name="email"
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormItem className="space-y-2">
//                       <Label className="font-semibold text-sm text-gray-700">
//                         Email address
//                       </Label>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           type="email"
//                           placeholder="subcribeto@techwithemma.com"
//                           className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white"
//                         />
//                       </FormControl>
//                       <FormMessage className="text-red-500" />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Password Field */}
//                 <FormField
//                   name="password"
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormItem className="space-y-2">
//                       <Label className="font-semibold text-sm text-gray-700">
//                         Password
//                       </Label>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           type="password"
//                           placeholder="***********"
//                           className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white"
//                         />
//                       </FormControl>
//                       <FormMessage className="text-red-500" />
//                     </FormItem>
//                   )}
//                 />

//                 <Button 
//                   disabled={isPending} 
//                   type="submit" 
//                   className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isPending ? <Loader color="white" /> : "Sign In"}
//                 </Button>
//               </div>

//               {/* OR Divider */}
//               <div className="relative text-center text-sm">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-200"></div>
//                 </div>
//                 <span className="relative bg-white px-4 text-gray-500 font-medium">
//                   Or continue with
//                 </span>
//               </div>

//               {/* Google Button */}
//               <div className="grid gap-4">
//                 <Button 
//                   variant="outline" 
//                   className="w-full h-12 rounded-xl border-gray-200 hover:border-gray-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 text-gray-700 font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-3">
//                     <path
//                       d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
//                       fill="currentColor"
//                     />
//                   </svg>
//                   Continue with Google
//                 </Button>
//               </div>

//               {/* Sign Up Link */}
//               <div className="text-center text-sm text-gray-600">
//                 Don&apos;t have an account?{" "}
//                 <Link
//                   to={AUTH_ROUTES.SIGN_UP}
//                   className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors duration-300"
//                 >
//                   Sign up
//                 </Link>
//               </div>
//             </div>
//           </form>
//         </Form>

//         {/* Terms and Privacy */}
//         <div className="text-balance text-center text-xs text-gray-500 leading-relaxed">
//           By clicking continue, you agree to our{" "}
//           <a 
//             href="#" 
//             className="text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors duration-300"
//           >
//             Terms of Service
//           </a>{" "}
//           and{" "}
//           <a 
//             href="#" 
//             className="text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors duration-300"
//           >
//             Privacy Policy
//           </a>
//           .
//         </div>
//       </div>
//     </div>
//   );
// }