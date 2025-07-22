import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, ArrowRight } from "lucide-react";
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
import { useMutation } from "@tanstack/react-query";
import { registerMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { useState, useEffect } from 'react';

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    console.log("Form values:", values);
    if (isPending) return;

    mutate(values, {
      onSuccess: () => {
        toast.success("Registered successfully");
        navigate(AUTH_ROUTES.SIGN_IN);
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message || "Failed to Sign up");
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
                  Create your account
                </h2>
                <p className="text-gray-400 text-center">
                  Get started with Schedley today
                </p>
              </div>

              {/* Form Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="flex flex-col gap-6">
                  {/* Name Field */}
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label className="font-semibold text-gray-300">
                          Full Name
                        </Label>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="John Doe"
                            className="bg-white/5 border-white/20 text-white focus:ring-purple-500 focus:border-purple-500"
                          />
                        </FormControl>
                        <FormMessage className="text-pink-400" />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label className="font-semibold text-gray-300">
                          Email Address
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
                        Create Account
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
                    Already have an account?{" "}
                    <Link
                      to={AUTH_ROUTES.SIGN_IN}
                      className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
                    >
                      Sign in
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
// import { AUTH_ROUTES } from "@/routes/common/routePaths";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { useMutation } from "@tanstack/react-query";
// import { registerMutationFn } from "@/lib/api";
// import { toast } from "sonner";
// import { Loader } from "@/components/loader";

// // Define the form schema using Zod
// const signUpSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address."),
//   password: z.string().min(6, "Password must be at least 6 characters."),
// });

// type SignUpFormValues = z.infer<typeof signUpSchema>;

// export function SignUpForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   const navigate = useNavigate();

//   const { mutate, isPending } = useMutation({
//     mutationFn: registerMutationFn,
//   });

//   const form = useForm<SignUpFormValues>({
//     resolver: zodResolver(signUpSchema),
//     mode: "onChange",
//     defaultValues: {
//       email: "",
//       name: "",
//       password: "",
//     },
//   });

//   const onSubmit = (values: SignUpFormValues) => {
//     console.log("Form values:", values);
//     if (isPending) return;

//     mutate(values, {
//       onSuccess: () => {
//         toast.success("Registered successfully");
//         navigate(AUTH_ROUTES.SIGN_IN);
//       },
//       onError: (error) => {
//         console.log(error);
//         toast.error(error.message || "Failed to Sign up");
//       },
//     });
//   };

//   return (
//     <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {/* { Top Header} */}
//           <div className="flex flex-col items-center gap-2">
//             <Link
//               to="/"
//               className="flex flex-col items-center gap-2 font-medium"
//             >
//               <div
//                 className="flex aspect-square size-8 items-center 
//           justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
//               >
//                 <Command className="size-5" />
//               </div>
//               <span className="sr-only">Meetly</span>
//             </Link>
//             <h2 className="text-xl font-bold text-[#0a2540]">
//               Sign up with Meetly for free
//             </h2>
//           </div>

//           <div
//             className="w-full bg-white flex flex-col gap-5 rounded-[6px] p-[38px_28px]"
//             style={{
//               boxShadow: "rgba(0, 74, 116, 0.15) 0px 1px 5px",
//               border: "1px solid #d4e0ed",
//             }}
//           >
//             <div className="flex flex-col gap-4">
//               <FormField
//                 name="email"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label className="font-semibold !text-sm">
//                       Enter your email to get started
//                     </Label>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="email"
//                         placeholder="subcribeto@techwithemma.com"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 name="name"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label className="font-semibold !text-sm">
//                       Enter your full name
//                     </Label>
//                     <FormControl>
//                       <Input {...field} type="text" placeholder="John Doe" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 name="password"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label className="font-semibold !text-sm">
//                       Choose a password with at least 6 characters
//                     </Label>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="password"
//                         placeholder="password"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="flex items-center justify-end">
//                 <Button disabled={isPending} type="submit">
//                   {isPending ? <Loader size="sm" color="white" /> : "Signup"}
//                 </Button>
//               </div>
//             </div>

//             <div className="text-center text-sm">
//               Already have an account?{" "}
//               <Link
//                 to={AUTH_ROUTES.SIGN_IN}
//                 className="underline underline-offset-4 text-primary"
//               >
//                 Sign in
//               </Link>
//             </div>
//           </div>
//         </form>
//       </Form>

//       <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
//         By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
//         and <a href="#">Privacy Policy</a>.
//       </div>
//     </div>
//   );
// }
