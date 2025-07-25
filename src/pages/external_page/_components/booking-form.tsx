import { z } from "zod";
import { addMinutes, parseISO } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ExternalLink, Calendar as CalendarIcon, User, Mail, MessageSquare } from "lucide-react";
import { useBookingState } from "@/hooks/use-booking-state";
import { scheduleMeetingMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { useState } from 'react'; 
const bookingFormSchema = z.object({
  guestName: z.string().min(1, "Name is required"),
  guestEmail: z.string().email("Invalid email address"),
  additionalInfo: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  eventId: string;
  duration: number;
  accessSpecifier?: string;
}

const BookingForm = ({ eventId, duration, accessSpecifier = "restricted" }: BookingFormProps) => {
  const { selectedDate, isSuccess, selectedSlot, handleSuccess } = useBookingState();
  const [meetLink, setMeetLink] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: scheduleMeetingMutationFn,
  });

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      additionalInfo: "",
    },
  });

  // Public domains to block - Original Logic Preserved
  const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  const publicEmailRegex = new RegExp(`@(${publicDomains.join("|")})$`, "i");

  const onSubmit = (values: BookingFormData) => {
    if (!eventId || !selectedSlot || !selectedDate) return;
    
    // Additional email validation from original logic
    if (accessSpecifier !== "allow_all" && publicEmailRegex.test(values.guestEmail)) {
      form.setError("guestEmail", {
        type: "manual",
        message: "Public domains are not allowed. Please enter your official email address."
      });
      return;
    }

    const decodedSlotDate = decodeURIComponent(selectedSlot);
    const startTime = parseISO(decodedSlotDate);
    const endTime = addMinutes(startTime, duration);

    const payload = {
      ...values,
      eventId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };
console.log("my payload is here ",payload);
    mutate(payload, {
      onSuccess: (response) => {
        setMeetLink(response.data.meetLink);
        handleSuccess(true);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to schedule event");
      },
    });
  };

  // Custom Loader Component matching original
  const Loader = ({ color = "white" }: { color?: string }) => (
    <div className={`w-5 h-5 border-2 border-${color}/30 border-t-${color} rounded-full animate-spin`}></div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-2xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6 shadow-2xl">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
              Book Your Meeting
            </h1>
          </div>

          {/* Form Container */}
          <div className="relative">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                {isSuccess ? (
                  // Success State
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6 animate-bounce">
                      <Check className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-700">
                        <Check className="w-4 h-4 text-white" />
                      </span>
                      You are scheduled
                    </h2>
                    <p className="text-lg text-slate-300 mb-8">
                      Your meeting has been scheduled successfully.
                    </p>
                    
                    <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-purple-500/30">
                      <p className="flex items-center text-sm justify-center gap-2 mb-2 text-purple-300">
                        Copy link:
                      </p>
                      <div className="flex items-center justify-center text-white font-mono text-sm bg-slate-900/50 rounded-lg p-3">
                        <span className="font-normal text-primary truncate">{meetLink}</span>
                      </div>
                    </div>
                    
                    <a href={meetLink} target="_blank" rel="noopener noreferrer">
                      <button className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-semibold px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl">
                        <ExternalLink className="w-4 h-4" />
                        <span>Join Google Meet</span>
                      </button>
                    </a>
                  </div>
                ) : (
                  // Form State
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <CalendarIcon className="w-6 h-6 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">Enter Details</h2>
                    </div>
                    
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Name Field */}
                      <div>
                        <label className="flex items-center gap-2 text-white font-semibold text-base mb-2">
                          <User className="w-4 h-4 text-purple-400" />
                          Name
                        </label>
                        <input
                          {...form.register("guestName")}
                          placeholder="Enter your name" 
                          className="w-full bg-slate-800/60 text-white placeholder:text-slate-400 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 rounded-xl px-4 py-4 transition-all duration-300 focus:outline-none"
                        />
                        {form.formState.errors.guestName && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {form.formState.errors.guestName.message}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="flex items-center gap-2 text-white font-semibold text-base mb-2">
                          <Mail className="w-4 h-4 text-purple-400" />
                          Email
                        </label>
                        <input
                          {...form.register("guestEmail")}
                          placeholder="Enter your email" 
                          className="w-full bg-slate-800/60 text-white placeholder:text-slate-400 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 rounded-xl px-4 py-4 transition-all duration-300 focus:outline-none"
                        />
                        {form.formState.errors.guestEmail && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {form.formState.errors.guestEmail.message}
                          </p>
                        )}
                      </div>

                      {/* Additional Info Field */}
                      <div>
                        <label className="flex items-center gap-2 text-white font-semibold text-base mb-2">
                          <MessageSquare className="w-4 h-4 text-purple-400" />
                          Additional notes
                          <span className="text-sm text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <textarea
                          {...form.register("additionalInfo")}
                          placeholder="Please share anything that will help prepare for our meeting."
                          rows={4}
                          className="w-full bg-slate-800/60 text-white placeholder:text-slate-400 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 rounded-xl px-4 py-4 transition-all duration-300 resize-none focus:outline-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <button 
                          disabled={isPending} 
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-500 hover:via-pink-500 hover:to-violet-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-2xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 shadow-2xl relative overflow-hidden group disabled:opacity-50"
                        >
                          {isPending ? (
                            <div className="flex items-center justify-center gap-3">
                              <Loader color="white" />
                              Scheduling...
                            </div>
                          ) : (
                            <span className="flex items-center justify-center gap-3">
                              <CalendarIcon className="w-5 h-5" />
                              Schedule Meeting
                            </span>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-slate-400 text-sm">
              🔒 Your information is secure and will only be used for scheduling purposes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;






// import React, { useState } from "react";
// import { Check, ExternalLink, Calendar, User, Mail, MessageSquare } from "lucide-react";

// interface BookingFormProps {
//   eventId: string;
//   duration: number;
//   accessSpecifier: string;
// }

// interface FormData {
//   guestName: string;
//   guestEmail: string;
//   additionalInfo: string;
// }

// interface FormErrors {
//   guestName?: string;
//   guestEmail?: string;
//   additionalInfo?: string;
// }

// const BookingForm = (props: BookingFormProps = { eventId: "demo-event", duration: 30, accessSpecifier: "restricted" }) => {
//   const { eventId, duration, accessSpecifier } = props;
//   const [meetLink, setMeetLink] = useState<string>("");
//   const [isSuccess, setIsSuccess] = useState<boolean>(false);
//   const [isPending, setIsPending] = useState<boolean>(false);
//   const [selectedDate] = useState<string>("2024-01-15");
//   const [selectedSlot] = useState<string>("2024-01-15T10:00:00Z");

//   const [formData, setFormData] = useState<FormData>({
//     guestName: "",
//     guestEmail: "",
//     additionalInfo: ""
//   });

//   const [errors, setErrors] = useState<FormErrors>({});

//   // Public domains to block - Original Logic Preserved
//   const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
//   const publicEmailRegex = new RegExp(`@(${publicDomains.join("|")})$`, "i");

//   // Form validation - Original Logic Preserved
//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
    
//     // Name validation
//     if (!formData.guestName.trim()) {
//       newErrors.guestName = "Name is required";
//     }
    
//     // Email validation with domain blocking logic
//     if (!formData.guestEmail.trim()) {
//       newErrors.guestEmail = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.guestEmail)) {
//       newErrors.guestEmail = "Invalid email address";
//     } else if (accessSpecifier !== "allow_all" && publicEmailRegex.test(formData.guestEmail)) {
//       newErrors.guestEmail = "Public domains are not allowed. Please enter your official email address.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Form submission - Original Logic Preserved
//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
//     if (!eventId || !selectedSlot || !selectedDate) return;
//     if (isPending) return;

//     setIsPending(true);

//     // Simulate the original API logic
//     try {
//       // Original date logic preserved
//       const decodedSlotDate = decodeURIComponent(selectedSlot);
//       const startTime = new Date(decodedSlotDate);
//       const endTime = new Date(startTime.getTime() + duration * 60000); // Add minutes

//       const payload = {
//         ...formData,
//         eventId,
//         startTime: startTime.toISOString(),
//         endTime: endTime.toISOString(),
//       };

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Simulate successful response - payload would be used in real API call
//       console.log('Booking payload:', payload);
//       const mockMeetLink = "https://meet.google.com/abc-defg-hij";
//       setMeetLink(mockMeetLink);
//       setIsSuccess(true);
      
//     } catch (error: unknown) {
//       // Simulate error handling
//       const errorMessage = error instanceof Error ? error.message : "Unknown error";
//       console.error("Failed to schedule event:", errorMessage);
//       console.log("event");
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const handleInputChange = (field: keyof FormData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: undefined }));
//     }
//   };

//   const handleBlur = (field: keyof FormData) => {
//     // Validate on blur - Original behavior preserved
//     const tempErrors: FormErrors = { ...errors };
    
//     if (field === 'guestName' && !formData.guestName.trim()) {
//       tempErrors.guestName = "Name is required";
//     }
    
//     if (field === 'guestEmail') {
//       if (!formData.guestEmail.trim()) {
//         tempErrors.guestEmail = "Email is required";
//       } else if (!/\S+@\S+\.\S+/.test(formData.guestEmail)) {
//         tempErrors.guestEmail = "Invalid email address";
//       } else if (accessSpecifier !== "allow_all" && publicEmailRegex.test(formData.guestEmail)) {
//         tempErrors.guestEmail = "Public domains are not allowed. Please enter your official email address.";
//       } else {
//         delete tempErrors.guestEmail;
//       }
//     }
    
//     setErrors(tempErrors);
//   };

//   // Custom Loader Component
//   const Loader = ({ }: { color?: string }) => (
//     <div className={`w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin`}></div>
//   );

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         {/* Floating Orbs */}
//         <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-40 right-32 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
//         <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
//         {/* Geometric Patterns */}
//         <div className="absolute top-0 left-0 w-full h-full opacity-10">
//           <div className="absolute top-1/4 left-1/3 w-32 h-32 border border-purple-400 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
//           <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-pink-400 rotate-12 animate-bounce" style={{animationDelay: '3s'}}></div>
//         </div>
        
//         {/* Gradient Mesh */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
//         <div className="w-full max-w-2xl">
          
//           {/* Header Section */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6 shadow-2xl">
//               <Calendar className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
//               Book Your Meeting
//             </h1>
//             <p className="text-lg text-slate-300 max-w-md mx-auto">
//               Schedule a personalized session with our team. We're excited to connect with you!
//             </p>
//           </div>

//           {/* Form Container */}
//           <div className="relative">
//             {/* Glassmorphism Card */}
//             <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              
//               {/* Card Background Pattern */}
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl"></div>
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-2xl"></div>
              
//               <div className="relative z-10">
//                 {isSuccess ? (
//                   // Success State - Original Logic Preserved
//                   <div className="text-center py-8">
//                     <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6 animate-bounce">
//                       <Check className="w-10 h-10 text-green-400" />
//                     </div>
//                     <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
//                       <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-700">
//                         <Check className="w-4 h-4 text-white" />
//                       </span>
//                       You are scheduled
//                     </h2>
//                     <p className="text-lg text-slate-300 mb-8">
//                       Your meeting has been scheduled successfully.
//                     </p>
                    
//                     <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-purple-500/30">
//                       <p className="flex items-center text-sm justify-center gap-2 mb-2 text-purple-300">
//                         Copy link:
//                       </p>
//                       <div className="flex items-center justify-center text-white font-mono text-sm bg-slate-900/50 rounded-lg p-3">
//                         <span className="font-normal text-primary truncate">{meetLink}</span>
//                       </div>
//                     </div>
                    
//                     <a href={meetLink} target="_blank" rel="noopener noreferrer">
//                       <button className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-semibold px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl">
//                         <ExternalLink className="w-4 h-4" />
//                         <span>Join Google Meet</span>
//                       </button>
//                     </a>
//                   </div>
//                 ) : (
//                   // Form State - Original Logic Preserved
//                   <div>
//                     <div className="flex items-center gap-3 mb-8">
//                       <Calendar className="w-6 h-6 text-purple-400" />
//                       <h2 className="text-2xl font-bold text-white">Enter Details</h2>
//                     </div>
                    
//                     <form onSubmit={onSubmit} className="space-y-6">
//                       {/* Name Field */}
//                       <div>
//                         <label className="flex items-center gap-2 text-white font-semibold text-base mb-2">
//                           <User className="w-4 h-4 text-purple-400" />
//                           Name
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.guestName}
//                           onChange={(e) => handleInputChange('guestName', e.target.value)}
//                           onBlur={() => handleBlur('guestName')}
//                           placeholder="Enter your name" 
//                           className="w-full bg-slate-800/60 text-white placeholder:text-slate-400 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 rounded-xl px-4 py-4 transition-all duration-300 focus:outline-none"
//                         />
//                         {errors.guestName && (
//                           <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
//                             <span className="w-1 h-1 bg-red-400 rounded-full"></span>
//                             {errors.guestName}
//                           </p>
//                         )}
//                       </div>

//                       {/* Email Field */}
//                       <div>
//                         <label className="flex items-center gap-2 text-white font-semibold text-base mb-2">
//                           <Mail className="w-4 h-4 text-purple-400" />
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           value={formData.guestEmail}
//                           onChange={(e) => handleInputChange('guestEmail', e.target.value)}
//                           onBlur={() => handleBlur('guestEmail')}
//                           placeholder="Enter your email" 
//                           className="w-full bg-slate-800/60 text-white placeholder:text-slate-400 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 rounded-xl px-4 py-4 transition-all duration-300 focus:outline-none"
//                         />
//                         {errors.guestEmail && (
//                           <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
//                             <span className="w-1 h-1 bg-red-400 rounded-full"></span>
//                             {errors.guestEmail}
//                           </p>
//                         )}
//                       </div>

//                       {/* Additional Info Field */}
//                       <div>
//                         <label className="flex items-center gap-2 text-white font-semibold text-base mb-2">
//                           <MessageSquare className="w-4 h-4 text-purple-400" />
//                           Additional notes
//                           <span className="text-sm text-slate-400 font-normal">(Optional)</span>
//                         </label>
//                         <textarea
//                           value={formData.additionalInfo}
//                           onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
//                           placeholder="Please share anything that will help prepare for our meeting."
//                           rows={4}
//                           className="w-full bg-slate-800/60 text-white placeholder:text-slate-400 border border-purple-500/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 rounded-xl px-4 py-4 transition-all duration-300 resize-none focus:outline-none"
//                         />
//                       </div>

//                       {/* Submit Button */}
//                       <div className="pt-4">
//                         <button 
//                           disabled={isPending} 
//                           type="submit"
//                           className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 hover:from-purple-500 hover:via-pink-500 hover:to-violet-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-2xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 shadow-2xl relative overflow-hidden group disabled:opacity-50"
//                         >
//                           {isPending ? (
//                             <div className="flex items-center justify-center gap-3">
//                               <Loader color="white" />
//                               Scheduling...
//                             </div>
//                           ) : (
//                             <span className="flex items-center justify-center gap-3">
//                               <Calendar className="w-5 h-5" />
//                               Schedule Meeting
//                             </span>
//                           )}
                          
//                           {/* Button Shine Effect */}
//                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="text-center mt-8">
//             <p className="text-slate-400 text-sm">
//               🔒 Your information is secure and will only be used for scheduling purposes
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;