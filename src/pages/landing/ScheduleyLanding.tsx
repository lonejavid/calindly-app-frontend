// import { useState, useEffect } from 'react';
// import { Calendar,Shield,Linkedin, Mail, Clock, CheckCircle, ArrowRight, Zap, Filter, Users, Menu, X } from 'lucide-react';
// import { useNavigate } from "react-router-dom";
// import { AUTH_ROUTES } from "@/routes/common/routePaths";

// import mylogo from "../../../mylogo.png";
// const ScheduleyLanding = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
//       title: "Smart Email Filtering",
//       description: "Automatically block bookings from public domain emails and validate addresses in real-time"
//     },
//     {
//       icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />,
//       title: "Seamless Calendar Sync",
//       description: "Connect with Google, Outlook, and other calendars for real-time availability updates"
//     },
//     {
//       icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
//       title: "Flexible Scheduling Rules",
//       description: "Set custom availability, buffer times, and meeting limits that work for you"
//     },
//     {
//       icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8" />,
//       title: "Automated Communications",
//       description: "Professional confirmations, reminders, and cancellation notifications"
//     }
//   ];

//   const benefits = [
//     "Block spam and irrelevant meetings",
//     "Verify email authenticity automatically",
//     "Reduce calendar clutter by 90%",
//     "Focus on qualified leads only",
//     "Save 5+ hours per week",
//     "Professional branded experience"
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
//       {/* Animated Background Elements - Adjusted for mobile */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 w-30 h-30 sm:w-60 sm:h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
//       </div>


//       <nav className={`relative z-50 p-4 sm:p-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
    
//         {/* <div className="flex items-center space-x-2 sm:space-x-3">
//           <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white">
//             <img
//               src={mylogo} 
//               alt="Schedley Logo"
//               className="w-full h-full object-contain"
//             />
//           </div>
//           <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//             Schedley
//           </span>
//         </div> */}
// <div className="flex items-center space-x-3 sm:space-x-4">
//   <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-lg">
//     <img
//       src={mylogo}
//       alt="Schedley Logo"
//       className="w-full h-full object-contain"
//     />
//   </div>
//   <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//     Schedley
//   </span>
// </div>

          
                
//                           <div className="hidden md:flex items-center space-x-8">
//                   <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
//                   <a href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-300">Benefits</a>
//                   <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg" onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
//                     Get Started
//                   </button>
//                   <a 
//                     href="https://www.linkedin.com/jobs/view/software-engineer-at-schedley-com-4271146349/?originalSubdomain=in" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
//                   >
//                     <Linkedin className="w-6 h-6" />
//                   </a>
//                 </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2 text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-4">
//             <div className="flex flex-col space-y-4">
//               <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
//               <a href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Benefits</a>
//               <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center"  onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
//                 Get Started
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section - Mobile Optimized */}
//       <section className="relative z-10 pt-8 sm:pt-20 pb-16 sm:pb-32 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 sm:mb-8 border border-white/20">
//               <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400" />
//               <span className="text-xs sm:text-sm">Smart Scheduling Platform</span>
//             </div>
            
//             <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
//               <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
//                 Filter Out the Noise,
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Focus on What Matters
//               </span>
//             </h1>
            
//             <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
//               Schedley eliminates spam bookings, validates emails in real-time, and ensures only qualified 
//               professionals can access your calendar. Reclaim your time and focus on meaningful meetings.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
//               <button className="group bg-gradient-to-r from-purple-500 to-pink-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center"    onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
//                 Start Free Trial
//                 <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//               <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 w-full sm:w-auto">
//                 Watch Demo
//               </button>
//             </div>
//           </div>

//           {/* Hero Visual - Mobile Optimized */}
//           <div className={`mt-12 sm:mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
//             <div className="relative max-w-4xl mx-auto px-4">
//               <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl">
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
//                   <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/20">
//                     <div className="flex items-center mb-3 sm:mb-4">
//                       <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full mr-2 sm:mr-3"></div>
//                       <span className="text-xs sm:text-sm text-red-300">Blocked</span>
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-300 break-all">meeting@gmail.com</p>
//                     <p className="text-xs text-red-400 mt-1 sm:mt-2">Public domain blocked</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-500/20">
//                     <div className="flex items-center mb-3 sm:mb-4">
//                       <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full mr-2 sm:mr-3"></div>
//                       <span className="text-xs sm:text-sm text-yellow-300">Validating</span>
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-300 break-all">temp@tempmail.org</p>
//                     <p className="text-xs text-yellow-400 mt-1 sm:mt-2">Checking validity...</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/20">
//                     <div className="flex items-center mb-3 sm:mb-4">
//                       <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 sm:mr-3"></div>
//                       <span className="text-xs sm:text-sm text-green-300">Approved</span>
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-300 break-all">john@company.com</p>
//                     <p className="text-xs text-green-400 mt-1 sm:mt-2">Meeting scheduled</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section - Mobile Optimized */}
//       <section id="features" className="py-16 sm:py-32 px-4 sm:px-6 relative">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12 sm:mb-20">
//             <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent px-4">
//               Powerful Features
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
//               Advanced scheduling technology that puts you in control
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className={`group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${activeFeature === index ? 'border-purple-500/50 scale-105' : ''}`}
//                 onMouseEnter={() => setActiveFeature(index)}
//                 onClick={() => setActiveFeature(index)}
//               >
//                 <div className="text-purple-400 mb-4 sm:mb-6 group-hover:text-purple-300 transition-colors duration-300">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
//                   {feature.title}
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section - Mobile Optimized */}
//       <section id="benefits" className="py-16 sm:py-32 px-4 sm:px-6 relative">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
//             <div className="order-2 lg:order-1">
//               <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//                 Why Professionals Choose Schedley
//               </h2>
//               <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12">
//                 Join thousands of professionals who have eliminated calendar spam and improved their productivity.
//               </p>
              
//               <div className="space-y-4 sm:space-y-6">
//                 {benefits.map((benefit, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start space-x-3 sm:space-x-4 group hover:translate-x-2 transition-transform duration-300"
//                   >
//                     <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                     </div>
//                     <span className="text-base sm:text-lg text-gray-300 group-hover:text-white transition-colors duration-300">
//                       {benefit}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="relative order-1 lg:order-2">
//               <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20">
//                 <div className="space-y-4 sm:space-y-6">
//                   <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                       <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                       <span className="text-sm sm:text-base font-semibold">Spam Filtered</span>
//                     </div>
//                     <span className="text-xl sm:text-2xl font-bold text-green-400">847</span>
//                   </div>
                  
//                   <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                       <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
//                       <span className="text-sm sm:text-base font-semibold">Quality Meetings</span>
//                     </div>
//                     <span className="text-xl sm:text-2xl font-bold text-blue-400">156</span>
//                   </div>
                  
//                   <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                       <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
//                       <span className="text-sm sm:text-base font-semibold">Hours Saved</span>
//                     </div>
//                     <span className="text-xl sm:text-2xl font-bold text-green-400">23.5</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section - Mobile Optimized */}
//       <section className="py-16 sm:py-32 px-4 sm:px-6 relative">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/20">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//               Ready to Reclaim Your Calendar?
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
//               Join thousands of professionals who have eliminated spam bookings and improved their productivity with Schedley.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
//               <button className="group bg-gradient-to-r from-purple-500 to-pink-500 px-8 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center"   onClick={() => navigate("/start")}>
//                 Start Your Free Trial
//                 <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
//               </button>
//               <div className="text-xs sm:text-sm text-gray-400 text-center">
//                 No credit card required • 14-day free trial
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="py-12 sm:py-16 px-4 sm:px-6 border-t border-white/10">
//   <div className="max-w-7xl mx-auto">
//     <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
//       {/* <div className="flex items-center space-x-2 sm:space-x-3">
//         <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//           <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
//         </div>
//         <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//           Schedley
//         </span>
//       </div> */}
//  <div className="flex items-center space-x-3 sm:space-x-4">
//   <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-lg">
//     <img
//       src={mylogo}
//       alt="Schedley Logo"
//       className="w-full h-full object-contain"
//     />
//   </div>
//   <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//     Schedley
//   </span>
// </div>

      
//       <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 text-gray-400 text-sm sm:text-base text-center">
//         <span>www.schedley.com</span>
//         <span className="hidden sm:block">•</span>
//         <a href="mailto:notifications@schedley.com" className="hover:text-white transition-colors duration-300 break-all">
//           notification@schedley.com
//         </a>
//         <span className="hidden sm:block">•</span>
//         <div className="flex items-center space-x-4">
//           <button 
//             onClick={() => navigate('/privacy')} 
//             className="hover:text-white transition-colors duration-300"
//           >
//             Privacy Policy
//           </button>
//           <span>•</span>
//           <button 
//             onClick={() => navigate('/terms')} 
//             className="hover:text-white transition-colors duration-300"
//           >
//             Terms of Service
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </footer>
//     </div>
//   );
// };

// export default ScheduleyLanding;





// import { useState, useEffect } from 'react';
// import { Calendar,Shield,Linkedin, Mail, Clock, CheckCircle, ArrowRight, Zap, Filter, Users, Menu, X, Star, Quote, ChevronRight } from 'lucide-react';
// import { useNavigate } from "react-router-dom";
// import { AUTH_ROUTES } from "@/routes/common/routePaths";

// import mylogo from "../../../mylogo.png";
// const ScheduleyLanding = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
//       title: "Smart Email Filtering & Spam Protection",
//       description: "Automatically block bookings from public domain emails, temporary email services, and validate addresses in real-time. Prevent calendar spam and fake bookings."
//     },
//     {
//       icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />,
//       title: "Seamless Calendar Integration",
//       description: "Connect with Google Calendar, Outlook, Apple Calendar, and other popular calendar platforms for real-time availability sync and conflict prevention."
//     },
//     {
//       icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
//       title: "Advanced Scheduling Rules",
//       description: "Set custom availability windows, buffer times between meetings, daily/weekly limits, and timezone handling that works for global teams."
//     },
//     {
//       icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8" />,
//       title: "Automated Communication Suite",
//       description: "Professional email confirmations, automated reminders, rescheduling notifications, and branded follow-up sequences that save hours weekly."
//     }
//   ];

//   const benefits = [
//     "Block spam bookings and fake email addresses automatically",
//     "Verify email authenticity with real-time validation",
//     "Reduce calendar clutter and unwanted meetings by 90%",
//     "Focus exclusively on qualified leads and genuine prospects",
//     "Save 5+ hours per week on scheduling administrative tasks",
//     "Professional branded experience with custom domains",
//     "Advanced analytics and booking insights",
//     "Team scheduling with round-robin distribution"
//   ];

//   const useCases = [
//     {
//       title: "Sales Teams & Account Executives",
//       description: "Perfect for B2B sales professionals who need to qualify leads before meetings. Prevent time-wasting calls from unqualified prospects."
//     },
//     {
//       title: "Consultants & Freelancers",
//       description: "Ideal for independent consultants, coaches, and freelancers who charge premium rates and can't afford calendar spam."
//     },
//     {
//       title: "Healthcare & Therapy Professionals", 
//       description: "Essential for therapists, counselors, and healthcare providers who need verified patient scheduling and HIPAA compliance."
//     },
//     {
//       title: "Legal & Professional Services",
//       description: "Built for lawyers, accountants, and professional service providers who require verified client communications."
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Sarah Chen",
//       role: "VP Sales, TechCorp",
//       content: "Schedley eliminated 80% of spam bookings in our sales calendar. Our team now focuses on qualified leads only.",
//       rating: 5
//     },
//     {
//       name: "David Rodriguez",
//       role: "Business Consultant",
//       content: "As a consultant charging $500/hour, I can't afford fake bookings. Schedley's email validation is a game-changer.",
//       rating: 5
//     },
//     {
//       name: "Dr. Amanda Foster",
//       role: "Licensed Therapist",
//       content: "The patient verification feature helps me maintain professional standards while streamlining my practice.",
//       rating: 5
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
//       {/* SEO Meta Content - Hidden but crawlable */}
//       <div style={{ display: 'none' }} className="seo-content">
//         <h1>Schedley - Professional Scheduling Platform with Anti-Spam Protection</h1>
//         <p>Schedley is the leading scheduling software designed specifically for professionals who need to protect their calendars from spam bookings, fake emails, and time-wasting appointments. Unlike Calendly, Koalendar, TidyCal, and other basic scheduling tools, Schedley provides enterprise-grade email validation, spam filtering, and booking verification.</p>
        
//         <h2>Schedley vs Calendly: Key Differences</h2>
//         <p>While Calendly focuses on basic scheduling, Schedley prioritizes professional calendar protection. Schedley blocks public domain emails (Gmail, Yahoo, Hotmail), validates email addresses in real-time, and prevents temporary email services from booking appointments. This makes Schedley ideal for sales teams, consultants, lawyers, therapists, and other professionals who charge premium rates.</p>
        
//         <h2>Advanced Features for Professional Users</h2>
//         <p>Schedley offers advanced scheduling features including round-robin team scheduling, custom buffer times, meeting type restrictions, geographic filtering, company domain whitelisting, and integration with CRM systems like Salesforce, HubSpot, and Pipedrive. The platform also provides detailed analytics on booking sources, conversion rates, and email validation statistics.</p>
        
//         <h2>Industry-Specific Solutions</h2>
//         <p>Healthcare professionals use Schedley for HIPAA-compliant patient scheduling with verified email requirements. Sales teams leverage Schedley's lead qualification features to ensure only serious prospects book discovery calls. Legal professionals rely on Schedley's security features for confidential client consultations. Educational institutions use Schedley for student advisor meetings with academic email verification.</p>
        
//         <h2>Integration Ecosystem</h2>
//         <p>Schedley integrates seamlessly with Google Workspace, Microsoft 365, Zoom, Teams, Slack, Notion, Asana, Trello, and 50+ other business tools. Custom API integrations available for enterprise customers with specific workflow requirements.</p>
        
//         <h2>Pricing and Plans</h2>
//         <p>Schedley offers flexible pricing starting with a free trial, followed by professional plans for individuals, team plans for organizations, and enterprise solutions for large companies requiring advanced security and customization.</p>
        
//         <h2>Customer Success Stories</h2>
//         <p>Over 10,000 professionals trust Schedley to protect their calendars and optimize their scheduling workflows. Customers report average time savings of 5+ hours per week and 90% reduction in unwanted bookings after implementing Schedley's email filtering system.</p>
//       </div>

//       {/* JSON-LD Schema Markup */}
//       <script type="application/ld+json" dangerouslySetInnerHTML={{
//         __html: JSON.stringify({
//           "@context": "https://schema.org",
//           "@type": "SoftwareApplication",
//           "name": "Schedley",
//           "description": "Professional scheduling platform with advanced spam protection and email validation",
//           "url": "https://www.schedley.com",
//           "applicationCategory": "BusinessApplication",
//           "operatingSystem": "Web",
//           "offers": {
//             "@type": "Offer",
//             "priceCurrency": "USD",
//             "price": "0",
//             "description": "Free trial available"
//           },
//           "aggregateRating": {
//             "@type": "AggregateRating",
//             "ratingValue": "4.8",
//             "reviewCount": "150"
//           }
//         })
//       }} />

//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 w-30 h-30 sm:w-60 sm:h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
//       </div>

//       <nav className={`relative z-50 p-4 sm:p-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center space-x-3 sm:space-x-4">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-lg">
//               <img
//                 src={mylogo}
//                 alt="Schedley Logo"
//                 className="w-full h-full object-contain"
//               />
//             </div>
//             <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//               Schedley
//             </span>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-8">
//             <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
//             <a href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-300">Benefits</a>
//             <a href="#use-cases" className="text-gray-300 hover:text-white transition-colors duration-300">Use Cases</a>
//             <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-300">Reviews</a>
//             <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg" onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
//               Get Started
//             </button>
//             <a 
//               href="https://www.linkedin.com/jobs/view/software-engineer-at-schedley-com-4271146349/?originalSubdomain=in" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
//             >
//               <Linkedin className="w-6 h-6" />
//             </a>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2 text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-4">
//             <div className="flex flex-col space-y-4">
//               <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
//               <a href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Benefits</a>
//               <a href="#use-cases" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Use Cases</a>
//               <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
//               <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center" onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
//                 Get Started
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section className="relative z-10 pt-8 sm:pt-20 pb-16 sm:pb-32 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 sm:mb-8 border border-white/20">
//               <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400" />
//               <span className="text-xs sm:text-sm">Professional Scheduling Platform with Anti-Spam Protection</span>
//             </div>
            
//             <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
//               <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
//                 Block Email Spam,
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Protect Your Calendar
//               </span>
//             </h1>
            
//             <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
//               Schedley is the only scheduling platform built specifically for professionals who need calendar protection. 
//               Block fake emails, validate bookings in real-time, and ensure only qualified prospects reach your calendar. 
//               Perfect for sales teams, consultants, healthcare professionals, and premium service providers.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
//               <button className="group bg-gradient-to-r from-purple-500 to-pink-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center" onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
//                 Start Free Trial - No Credit Card Required
//                 <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//               <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 w-full sm:w-auto">
//                 Watch Demo: See How It Works
//               </button>
//             </div>

//             <div className="mt-6 text-sm text-gray-400">
//               Trusted by 10,000+ professionals • 4.8/5 rating • 14-day free trial
//             </div>
//           </div>

//           {/* Hero Visual */}
//           <div className={`mt-12 sm:mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
//             <div className="relative max-w-4xl mx-auto px-4">
//               <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl">
//                 <div className="text-center mb-4">
//                   <h3 className="text-lg font-semibold text-white mb-2">Live Email Validation in Action</h3>
//                   <p className="text-sm text-gray-300">See how Schedley automatically filters booking requests</p>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
//                   <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/20">
//                     <div className="flex items-center mb-3 sm:mb-4">
//                       <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full mr-2 sm:mr-3"></div>
//                       <span className="text-xs sm:text-sm text-red-300">Blocked - Spam Detected</span>
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-300 break-all">meeting@gmail.com</p>
//                     <p className="text-xs text-red-400 mt-1 sm:mt-2">Public domain + suspicious pattern</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-500/20">
//                     <div className="flex items-center mb-3 sm:mb-4">
//                       <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full mr-2 sm:mr-3"></div>
//                       <span className="text-xs sm:text-sm text-yellow-300">Validating Email</span>
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-300 break-all">temp@10minutemail.org</p>
//                     <p className="text-xs text-yellow-400 mt-1 sm:mt-2">Temporary email service detected...</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/20">
//                     <div className="flex items-center mb-3 sm:mb-4">
//                       <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 sm:mr-3"></div>
//                       <span className="text-xs sm:text-sm text-green-300">Approved & Scheduled</span>
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-300 break-all">john.smith@acmecorp.com</p>
//                     <p className="text-xs text-green-400 mt-1 sm:mt-2">Corporate email verified ✓</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-16 sm:py-32 px-4 sm:px-6 relative bg-black/20">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12 sm:mb-20">
//             <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//               How Schedley Protects Your Calendar
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
//               Unlike basic scheduling tools, Schedley provides enterprise-grade protection against calendar spam
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//             <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-2xl font-bold text-white">1</span>
//               </div>
//               <h3 className="text-xl font-bold mb-4 text-white">Create Protected Booking Page</h3>
//               <p className="text-gray-400 leading-relaxed">Set up your scheduling page with advanced email validation rules, domain restrictions, and custom screening questions</p>
//             </div>
            
//             <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-2xl font-bold text-white">2</span>
//               </div>
//               <h3 className="text-xl font-bold mb-4 text-white">Real-Time Email Validation</h3>
//               <p className="text-gray-400 leading-relaxed">Every booking request is automatically validated against our spam database and email verification algorithms</p>
//             </div>
            
//             <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-2xl font-bold text-white">3</span>
//               </div>
//               <h3 className="text-xl font-bold mb-4 text-white">Only Qualified Meetings</h3>
//               <p className="text-gray-400 leading-relaxed">Approved bookings sync to your calendar with all details, while spam attempts are automatically blocked</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 sm:py-32 px-4 sm:px-6 relative">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12 sm:mb-20">
//             <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent px-4">
//               Advanced Scheduling Features
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
//               Professional-grade scheduling technology designed for high-value professionals who can't afford calendar spam
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className={`group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${activeFeature === index ? 'border-purple-500/50 scale-105' : ''}`}
//                 onMouseEnter={() => setActiveFeature(index)}
//                 onClick={() => setActiveFeature(index)}
//               >
//                 <div className="text-purple-400 mb-4 sm:mb-6 group-hover:text-purple-300 transition-colors duration-300">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
//                   {feature.title}
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Additional Features Grid */}
//           <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
//               <h4 className="text-lg font-semibold text-white mb-3">Team Scheduling & Round-Robin</h4>
//               <p className="text-gray-400 text-sm">Distribute meetings evenly across team members with intelligent load balancing</p>
//             </div>
//             <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
//               <h4 className="text-lg font-semibold text-white mb-3">Custom Booking Forms</h4>
//               <p className="text-gray-400 text-sm">Collect qualifying information before meetings with custom intake forms</p>
//             </div>
//             <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
//               <h4 className="text-lg font-semibold text-white mb-3">Analytics & Reporting</h4>
//               <p className="text-gray-400 text-sm">Track booking sources, conversion rates, and spam blocking effectiveness</p>
//             </div>
//             <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
//               <h4 className="text-lg font-semibold text-white mb-3">CRM Integrations</h4>
//               <p className="text-gray-400 text-sm">Connect with Salesforce, HubSpot, Pipedrive, and 50+ business tools</p>
//             </div>
//             <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
//               <h4 className="text-lg font-semibold text-white mb-3">HIPAA Compliance</h4>
//               <p className="text-gray-400 text-sm">Healthcare-grade security for medical and therapy professionals</p>
//             </div>
//             <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
//               <h4 className="text-lg font-semibold text-white mb-3">White-Label Branding</h4>
//               <p className="text-gray-400 text-sm">Custom domains, logos, and branding for agency and enterprise users</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Use Cases Section */}
//       <section id="use-cases" className="py-16 sm:py-32 px-4 sm:px-6 relative bg-black/20">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12 sm:mb-20">
//             <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//               Perfect for Professional Services
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
//               Schedley is specifically designed for high-value professionals who need calendar protection
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {useCases.map((useCase, index) => (
//               <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-102">
//                 <h3 className="text-xl font-bold mb-4 text-white flex items-center">
//                   <ChevronRight className="w-5 h-5 text-purple-400 mr-2" />
//                   {useCase.title}
//                 </h3>
//                 <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-16 text-center">
//             <h3 className="text-2xl font-bold text-white mb-6">Industry-Specific Features</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <div className="text-center p-4">
//                 <div className="text-3xl mb-2">⚖️</div>
//                 <p className="text-sm text-gray-300">Legal Services</p>
//               </div>
//               <div className="text-center p-4">
//                 <div className="text-3xl mb-2">🩺</div>
//                 <p className="text-sm text-gray-300">Healthcare</p>
//               </div>
//               <div className="text-center p-4">
//                 <div className="text-3xl mb-2">📊</div>
//                 <p className="text-sm text-gray-300">Sales & Marketing</p>
//               </div>
//               <div className="text-center p-4">
//                 <div className="text-3xl mb-2">🎓</div>
//                 <p className="text-sm text-gray-300">Education</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section id="benefits" className="py-16 sm:py-32 px-4 sm:px-6 relative">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
//             <div className="order-2 lg:order-1">
//               <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//                 Why 10,000+ Professionals Choose Schedley Over Calendly
//               </h2>
//               <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12">
//                 Join thousands of professionals who have eliminated calendar spam, improved productivity, and protected their valuable time with Schedley's advanced email validation and booking protection system.
//               </p>
              
//               <div className="space-y-4 sm:space-y-6">
//                 {benefits.map((benefit, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start space-x-3 sm:space-x-4 group hover:translate-x-2 transition-transform duration-300"
//                   >
//                     <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                     </div>
//                     <span className="text-base sm:text-lg text-gray-300 group-hover:text-white transition-colors duration-300">
//                       {benefit}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
//                 <h4 className="text-lg font-semibold text-white mb-2">Average Customer Results:</h4>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-green-400 font-bold">90% reduction</span> in spam bookings
//                   </div>
//                   <div>
//                     <span className="text-blue-400 font-bold">5+ hours saved</span> per week
//                   </div>
//                   <div>
//                     <span className="text-purple-400 font-bold">95% email accuracy</span> rate
//                   </div>
//                   <div>
//                     <span className="text-yellow-400 font-bold">40% higher</span> show-up rates
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="relative order-1 lg:order-2">
//               <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20">
//                 <h3 className="text-xl font-bold text-white mb-6 text-center">Live Dashboard Stats</h3>
//                 <div className="space-y-4 sm:space-y-6">
//                   <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                       <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                       <span className="text-sm sm:text-base font-semibold">Spam Blocked Today</span>
//                     </div>
//                     <span className="text-xl sm:text-2xl font-bold text-green-400">847</span>
//                   </div>
                  
//                   <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                       <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
//                       <span className="text-sm sm:text-base font-semibold">Quality Meetings</span>
//                     </div>
//                     <span className="text-xl sm:text-2xl font-bold text-blue-400">156</span>
//                   </div>
                  
//                   <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                       <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
//                       <span className="text-sm sm:text-base font-semibold">Hours Saved</span>
//                     </div>
//                     <span className="text-xl sm:text-2xl font-bold text-green-400">23.5</span>
//                   </div>

//                   <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                       <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
//                       <span className="text-sm sm:text-base font-semibold">Email Validation Rate</span>
//                     </div>
//                     <span className="text-xl sm:text-2xl font-bold text-yellow-400">99.2%</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Comparison Section */}
//       <section className="py-16 sm:py-32 px-4 sm:px-6 relative bg-black/20">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12 sm:mb-20">
//             <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//               Schedley vs. Traditional Scheduling Tools
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
//               See why professionals are switching from Calendly, Acuity, and other basic scheduling tools
//             </p>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20">
//               <thead>
//                 <tr className="border-b border-white/20">
//                   <th className="p-6 text-left text-white font-semibold">Feature</th>
//                   <th className="p-6 text-center text-purple-400 font-semibold">Schedley</th>
//                   <th className="p-6 text-center text-gray-400 font-semibold">Calendly</th>
//                   <th className="p-6 text-center text-gray-400 font-semibold">Others</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm">
//                 <tr className="border-b border-white/10">
//                   <td className="p-6 text-gray-300">Email Spam Protection</td>
//                   <td className="p-6 text-center text-green-400">✓ Advanced AI filtering</td>
//                   <td className="p-6 text-center text-red-400">✗ No protection</td>
//                   <td className="p-6 text-center text-red-400">✗ Basic only</td>
//                 </tr>
//                 <tr className="border-b border-white/10">
//                   <td className="p-6 text-gray-300">Real-time Email Validation</td>
//                   <td className="p-6 text-center text-green-400">✓ Built-in</td>
//                   <td className="p-6 text-center text-red-400">✗ Not available</td>
//                   <td className="p-6 text-center text-red-400">✗ Limited</td>
//                 </tr>
//                 <tr className="border-b border-white/10">
//                   <td className="p-6 text-gray-300">Domain Blocking</td>
//                   <td className="p-6 text-center text-green-400">✓ Customizable rules</td>
//                   <td className="p-6 text-center text-red-400">✗ Not supported</td>
//                   <td className="p-6 text-center text-yellow-400">~ Basic filtering</td>
//                 </tr>
//                 <tr className="border-b border-white/10">
//                   <td className="p-6 text-gray-300">Professional Features</td>
//                   <td className="p-6 text-center text-green-400">✓ Enterprise grade</td>
//                   <td className="p-6 text-center text-yellow-400">~ Standard</td>
//                   <td className="p-6 text-center text-yellow-400">~ Varies</td>
//                 </tr>
//                 <tr>
//                   <td className="p-6 text-gray-300">HIPAA Compliance</td>
//                   <td className="p-6 text-center text-green-400">✓ Full compliance</td>
//                   <td className="p-6 text-center text-red-400">✗ Not certified</td>
//                   <td className="p-6 text-center text-yellow-400">~ Some providers</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-16 sm:py-32 px-4 sm:px-6 relative">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12 sm:mb-20">
//             <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//               Trusted by Professionals Worldwide
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
//               See what industry leaders say about Schedley's calendar protection
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
//                 <div className="flex items-center mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <Quote className="w-8 h-8 text-purple-400 mb-4" />
//                 <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
//                 <div>
//                   <div className="font-semibold text-white">{testimonial.name}</div>
//                   <div className="text-sm text-gray-400">{testimonial.role}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-16 text-center">
//             <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-green-400">4.8/5</div>
//                 <div className="text-sm text-gray-400">Average Rating</div>
//               </div>
//               <div className="w-px h-12 bg-white/20"></div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-blue-400">10K+</div>
//                 <div className="text-sm text-gray-400">Active Users</div>
//               </div>
//               <div className="w-px h-12 bg-white/20"></div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-purple-400">99.9%</div>
//                 <div className="text-sm text-gray-400">Uptime</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Integration Section */}
//       <section className="py-16 sm:py-32 px-4 sm:px-6 relative bg-black/20">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12 sm:mb-20">
//             <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//               Seamless Integrations
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
//               Connect Schedley with your favorite business tools and calendar platforms
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
//             {[
//               { name: "Google Calendar", logo: "📅" },
//               { name: "Outlook", logo: "📨" },
//               { name: "Salesforce", logo: "☁️" },
//               { name: "HubSpot", logo: "🚀" },
//               { name: "Zoom", logo: "💻" },
//               { name: "Teams", logo: "👥" },
//               { name: "Slack", logo: "💬" },
//               { name: "Pipedrive", logo: "📊" },
//               { name: "Notion", logo: "📝" },
//               { name: "Zapier", logo: "⚡" },
//               { name: "Gmail", logo: "✉️" },
//               { name: "Apple Calendar", logo: "🍎" }
//             ].map((integration, index) => (
//               <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 text-center">
//                 <div className="text-3xl mb-2">{integration.logo}</div>
//                 <div className="text-sm text-gray-300 font-medium">{integration.name}</div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <p className="text-lg text-gray-400 mb-6">Plus 50+ more integrations via API</p>
//             <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
//               View All Integrations
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-16 sm:py-32 px-4 sm:px-6 relative">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-12 sm:mb-20">
//             <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//               Frequently Asked Questions
//             </h2>
//           </div>

//           <div className="space-y-6">
//             {[
//               {
//                 question: "How does Schedley's email validation work?",
//                 answer: "Schedley uses advanced AI algorithms to validate emails in real-time. We check against databases of temporary email services, verify domain authenticity, and analyze booking patterns to block spam automatically."
//               },
//               {
//                 question: "Can I still use my existing calendar?",
//                 answer: "Yes! Schedley seamlessly integrates with Google Calendar, Outlook, Apple Calendar, and other popular calendar platforms. Your existing events and availability sync automatically."
//               },
//               {
//                 question: "Is Schedley HIPAA compliant for healthcare professionals?",
//                 answer: "Yes, Schedley offers HIPAA-compliant plans for healthcare providers, therapists, and medical professionals with enhanced security features and encrypted data handling."
//               },
//               {
//                 question: "How is Schedley different from Calendly?",
//                 answer: "Unlike Calendly, Schedley is specifically designed for professionals who need calendar protection. We offer advanced email validation, spam filtering, domain blocking, and real-time verification that Calendly doesn't provide."
//               },
//               {
//                 question: "What happens to blocked booking attempts?",
//                 answer: "Blocked attempts are logged in your dashboard for review, but don't clutter your calendar. You can see statistics on spam attempts and adjust filtering rules as needed."
//               },
//               {
//                 question: "Can I customize the email validation rules?",
//                 answer: "Absolutely! You can set custom rules for domain blocking, create whitelists for approved companies, and adjust the sensitivity of spam detection based on your needs."
//               }
//             ].map((faq, index) => (
//               <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
//                 <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
//                 <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 sm:py-32 px-4 sm:px-6 relative">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/20">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//               Ready to Eliminate Calendar Spam Forever?
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto">
//               Join over 10,000 professionals who have protected their calendars, eliminated spam bookings, 
//               and reclaimed their valuable time with Schedley's advanced email validation and booking protection.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8">
//               <button 
//                 className="group bg-gradient-to-r from-purple-500 to-pink-500 px-8 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center" 
//                 onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}
//               >
//                 Start Your Free 14-Day Trial
//                 <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
//               </button>
//               <div className="text-xs sm:text-sm text-gray-400 text-center">
//                 No credit card required • Setup in 5 minutes • Cancel anytime
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400">
//               <div className="flex items-center justify-center">
//                 <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
//                 14-day free trial
//               </div>
//               <div className="flex items-center justify-center">
//                 <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
//                 No setup fees
//               </div>
//               <div className="flex items-center justify-center">
//                 <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
//                 Cancel anytime
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 sm:py-16 px-4 sm:px-6 border-t border-white/10">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
//             <div className="md:col-span-1">
//               <div className="flex items-center space-x-3 sm:space-x-4 mb-6">
//                 <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-lg">
//                   <img
//                     src={mylogo}
//                     alt="Schedley Logo"
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//                 <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//                   Schedley
//                 </span>
//               </div>
//               <p className="text-gray-400 text-sm leading-relaxed mb-6">
//                 Professional scheduling platform with advanced email validation and spam protection. 
//                 Trusted by 10,000+ professionals worldwide.
//               </p>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                   <Linkedin className="w-5 h-5" />
//                 </a>
//               </div>
//             </div>
            
//             <div>
//               <h4 className="font-semibold text-white mb-4">Product</h4>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
//                 <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="font-semibold text-white mb-4">Solutions</h4>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">Sales Teams</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Healthcare</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Legal Services</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Consultants</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="font-semibold text-white mb-4">Support</h4>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-white/10 pt-8">
//             <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
//               <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 text-gray-400 text-sm text-center">
//                 <span>© 2024 Schedley.com - All rights reserved</span>
//                 <a href="mailto:notifications@schedley.com" className="hover:text-white transition-colors duration-300">
//                   notifications@schedley.com
//                 </a>
//               </div>
              
//               <div className="flex items-center space-x-6 text-sm text-gray-400">
//                 <button 
//                   onClick={() => navigate('/privacy')} 
//                   className="hover:text-white transition-colors duration-300"
//                 >
//                   Privacy Policy
//                 </button>
//                 <button 
//                   onClick={() => navigate('/terms')} 
//                   className="hover:text-white transition-colors duration-300"
//                 >
//                   Terms of Service
//                 </button>
//                 <a href="#" className="hover:text-white transition-colors duration-300">
//                   Cookie Policy
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ScheduleyLanding;


import { useState, useEffect } from 'react';
import { Calendar, Shield, Linkedin, Mail, Clock, CheckCircle, ArrowRight, Zap, Filter, Users, Menu, X, Star, Quote, ChevronRight, Sparkles, Globe, Award, TrendingUp } from 'lucide-react';

const ScheduleyLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particleCount, setParticleCount] = useState(50);

  useEffect(() => {
    setIsVisible(true);
    // Cycle through features automatically
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Advanced Email Protection",
      description: "Intelligent spam filtering that learns from patterns to block unwanted bookings while ensuring legitimate appointments always get through.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Smart Calendar Sync",
      description: "Seamless integration with all major calendar platforms featuring real-time sync, conflict prevention, and intelligent scheduling.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Intelligent Scheduling",
      description: "Advanced time management with buffer zones, availability windows, timezone handling, and automated meeting optimization.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Professional Communications",
      description: "Branded email templates, automated reminders, smart notifications, and follow-up sequences that enhance your professional image.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const benefits = [
    { text: "Eliminate spam bookings with AI-powered email validation", icon: "🛡️" },
    { text: "Reduce administrative time by up to 5 hours per week", icon: "⏰" },
    { text: "Maintain professional image with branded experiences", icon: "✨" },
    { text: "Increase meeting quality with qualified appointment filtering", icon: "📈" },
    { text: "Seamless integration with existing business workflows", icon: "🔗" },
    { text: "Enterprise-grade security and HIPAA compliance options", icon: "🔒" },
    { text: "Advanced analytics and booking insights", icon: "📊" },
    { text: "24/7 customer support and onboarding assistance", icon: "🤝" }
  ];

  const useCases = [
    {
      title: "Sales & Business Development",
      description: "Perfect for professionals who need to qualify leads and ensure meaningful sales conversations with serious prospects.",
      icon: "💼",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Consulting & Professional Services", 
      description: "Ideal for independent consultants, coaches, and service providers who value their time and expertise.",
      icon: "🎯",
      color: "from-green-500 to-blue-500"
    },
    {
      title: "Healthcare & Wellness",
      description: "Essential for medical professionals, therapists, and wellness practitioners requiring secure, verified scheduling.",
      icon: "🏥",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Legal & Financial Services",
      description: "Built for lawyers, accountants, and financial advisors who require secure, professional client communications.",
      icon: "⚖️",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP Sales, TechCorp",
      content: "Schedley transformed our scheduling process. We now focus exclusively on qualified leads and our conversion rates have never been higher.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Dr. Amanda Foster",
      role: "Licensed Therapist",
      content: "The patient verification features help me maintain the highest professional standards while streamlining my practice management.",
      rating: 5,
      avatar: "👩‍⚕️"
    },
    {
      name: "David Rodriguez",
      role: "Business Consultant",
      content: "As someone who charges premium rates, Schedley's email validation ensures I only meet with serious, qualified prospects.",
      rating: 5,
      avatar: "👨‍💻"
    }
  ];

  // Floating particles component
  const FloatingParticles = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        >
          <div className="w-1 h-1 bg-purple-400 rounded-full opacity-20"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <FloatingParticles />
      
      {/* Enhanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Enhanced Navigation */}
      <nav className={`relative z-50 p-4 sm:p-6 backdrop-blur-xl bg-white/5 border-b border-white/10 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Schedley
              </span>
              <div className="text-xs text-purple-300 opacity-75">Professional Scheduling</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#benefits" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
              Benefits
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#use-cases" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
              Solutions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
              Reviews
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl font-semibold">
              Get Started
            </button>
            <a 
              href="https://www.linkedin.com/jobs/view/software-engineer-at-schedley-com-4271146349/?originalSubdomain=in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-125 p-2 rounded-full hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 p-6">
            <div className="flex flex-col space-y-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setMobileMenuOpen(false)}>Benefits</a>
              <a href="#use-cases" className="text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setMobileMenuOpen(false)}>Solutions</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-300 py-3 border-b border-white/10" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative z-10 pt-12 sm:pt-24 pb-20 sm:pb-40 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-white/10 to-purple-500/20 backdrop-blur-sm rounded-full mb-8 border border-purple-500/30 group hover:border-purple-400 transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-3 text-yellow-400 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                The Future of Professional Scheduling
              </span>
              <ArrowRight className="w-4 h-4 ml-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent block">
                Smart Scheduling
              </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent block">
                Protected Calendar
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed font-light">
              Experience the next generation of professional scheduling. 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold"> Intelligent email validation</span>, 
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold"> seamless integrations</span>, 
              and <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-semibold">enterprise-grade protection</span> 
              for professionals who value their time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <button className="group bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 px-10 py-5 rounded-full text-xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center relative overflow-hidden">
                <span className="relative z-10">Start Your Journey Today</span>
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              <button className="px-10 py-5 rounded-full text-xl font-semibold border-2 border-gradient-to-r border-white/40 hover:border-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 w-full sm:w-auto relative group overflow-hidden">
                <span className="relative z-10">Watch Live Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center">
                <Award className="w-4 h-4 text-yellow-400 mr-2" />
                Trusted by 10,000+ professionals
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-2 fill-current" />
                4.9/5 customer rating
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-green-400 mr-2" />
                Enterprise-grade security
              </div>
            </div>
          </div>

          {/* Enhanced Hero Visual */}
          <div className={`mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-white/10 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-yellow-400 mr-3 animate-pulse" />
                    Real-Time Email Intelligence
                  </h3>
                  <p className="text-gray-300">Watch Schedley automatically protect your calendar</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-red-500/30 to-red-600/20 rounded-2xl p-6 border border-red-500/30 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-4 h-4 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-red-300 font-semibold">Threat Blocked</span>
                    </div>
                    <p className="text-gray-300 break-all font-mono text-sm">fake.meeting@tempmail.org</p>
                    <p className="text-red-400 text-sm mt-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Temporary email detected
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-500/30 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3 animate-spin"></div>
                      <span className="text-yellow-300 font-semibold">Validating</span>
                    </div>
                    <p className="text-gray-300 break-all font-mono text-sm">prospect@unknown-domain.io</p>
                    <p className="text-yellow-400 text-sm mt-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Checking domain reputation...
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-green-300 font-semibold">Verified & Scheduled</span>
                    </div>
                    <p className="text-gray-300 break-all font-mono text-sm">director@enterprise.com</p>
                    <p className="text-green-400 text-sm mt-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Corporate domain verified
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 sm:py-40 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-6 border border-purple-500/30">
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-300">Advanced Features</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Intelligent Scheduling Technology
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Experience the perfect blend of sophisticated automation and intuitive design, 
              crafted for professionals who demand excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border transition-all duration-700 cursor-pointer relative overflow-hidden ${
                  activeFeature === index 
                    ? 'border-purple-500/50 scale-105 shadow-2xl' 
                    : 'border-white/20 hover:border-purple-500/30 hover:scale-102'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Team Collaboration", desc: "Seamless team scheduling with intelligent distribution", icon: Users, color: "from-blue-500 to-cyan-500" },
              { title: "Custom Branding", desc: "White-label solutions with your professional identity", icon: Sparkles, color: "from-purple-500 to-pink-500" },
              { title: "Advanced Analytics", desc: "Deep insights into your scheduling patterns and efficiency", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
              { title: "Global Support", desc: "Multi-timezone handling with 24/7 customer success", icon: Globe, color: "from-orange-500 to-red-500" },
              { title: "Security First", desc: "Enterprise-grade encryption and compliance standards", icon: Shield, color: "from-indigo-500 to-blue-500" },
              { title: "Smart Integrations", desc: "Connect with 100+ business tools and platforms", icon: Zap, color: "from-yellow-500 to-amber-500" }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-105 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">{item.title}</h4>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section id="benefits" className="py-24 sm:py-40 px-4 sm:px-6 relative bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full mb-6 border border-green-500/30">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm font-medium text-green-300">Proven Results</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Transform Your Professional Scheduling
              </h2>
              
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Join thousands of professionals who have revolutionized their scheduling workflow, 
                eliminated time-wasting appointments, and elevated their professional image.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 group hover:translate-x-3 transition-transform duration-300 p-3 rounded-xl hover:bg-white/5"
                  >
                    <div className="text-2xl flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <span className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl border border-purple-500/30 backdrop-blur-xl">
                <h4 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Award className="w-6 h-6 text-yellow-400 mr-3" />
                  Customer Success Metrics
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">95%</div>
                    <div className="text-sm text-gray-400">Spam Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">8hrs</div>
                    <div className="text-sm text-gray-400">Weekly Time Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">99.8%</div>
                    <div className="text-sm text-gray-400">Email Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-1">60%</div>
                    <div className="text-sm text-gray-400">Higher Show Rates</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 transform hover:scale-105 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400 mr-3" />
                  Live Performance Dashboard
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <Filter className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold">Intelligent Filtering</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-400">1,247</span>
                      <div className="text-xs text-gray-400">threats blocked today</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="font-semibold">Quality Meetings</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-400">324</span>
                      <div className="text-xs text-gray-400">verified bookings</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-green-400" />
                      <span className="font-semibold">Time Optimized</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-400">47.3</span>
                      <div className="text-xs text-gray-400">hours saved this week</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold">Security Score</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-yellow-400">99.7%</span>
                      <div className="text-xs text-gray-400">protection level</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Use Cases Section */}
      <section id="use-cases" className="py-24 sm:py-40 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-blue-500/30">
              <Globe className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-300">Industry Solutions</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Tailored for Every Professional
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Discover how industry leaders across different sectors leverage Schedley's 
              intelligent scheduling to streamline their professional workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {useCases.map((useCase, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${useCase.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{useCase.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors flex items-center">
                    {useCase.title}
                    <ChevronRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed text-lg">
                    {useCase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-12 flex items-center justify-center">
              <Award className="w-8 h-8 text-yellow-400 mr-3" />
              Trusted Across Industries
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { emoji: "🏥", label: "Healthcare", count: "2,500+" },
                { emoji: "⚖️", label: "Legal Services", count: "1,800+" },
                { emoji: "📊", label: "Sales & Marketing", count: "3,200+" },
                { emoji: "🎓", label: "Education", count: "1,400+" }
              ].map((industry, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-110 group">
                  <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{industry.emoji}</div>
                  <p className="text-gray-300 font-semibold mb-2">{industry.label}</p>
                  <p className="text-sm text-purple-400 font-bold">{industry.count} users</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-24 sm:py-40 px-4 sm:px-6 relative bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-6 border border-yellow-500/30">
              <Star className="w-4 h-4 text-yellow-400 mr-2 fill-current" />
              <span className="text-sm font-medium text-yellow-300">Customer Stories</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Loved by Professionals Worldwide
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover why thousands of professionals trust Schedley to protect their time and enhance their productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    ))}
                  </div>
                  
                  <Quote className="w-8 h-8 text-purple-400 mb-4 opacity-50" />
                  <p className="text-gray-300 leading-relaxed italic text-lg group-hover:text-white transition-colors duration-300">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">4.9/5</div>
                <div className="text-sm text-gray-400">Average Rating</div>
              </div>
              <div className="w-px h-16 bg-white/20"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
                <div className="text-sm text-gray-400">Happy Users</div>
              </div>
              <div className="w-px h-16 bg-white/20"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">99.9%</div>
                <div className="text-sm text-gray-400">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Integration Section */}
      <section className="py-24 sm:py-40 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mb-6 border border-cyan-500/30">
              <Zap className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-sm font-medium text-cyan-300">Seamless Connections</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Works With Your Favorite Tools
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Seamlessly integrate with 100+ business tools and platforms. 
              Schedley fits perfectly into your existing workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
            {[
              { name: "Google Calendar", logo: "📅", color: "from-blue-500 to-cyan-500" },
              { name: "Microsoft Outlook", logo: "📨", color: "from-blue-600 to-indigo-600" },
              { name: "Salesforce", logo: "☁️", color: "from-cyan-500 to-blue-500" },
              { name: "HubSpot", logo: "🚀", color: "from-orange-500 to-red-500" },
              { name: "Zoom", logo: "💻", color: "from-blue-500 to-purple-500" },
              { name: "Microsoft Teams", logo: "👥", color: "from-purple-500 to-indigo-500" },
              { name: "Slack", logo: "💬", color: "from-green-500 to-cyan-500" },
              { name: "Pipedrive", logo: "📊", color: "from-green-500 to-emerald-500" },
              { name: "Notion", logo: "📝", color: "from-gray-600 to-gray-800" },
              { name: "Zapier", logo: "⚡", color: "from-orange-500 to-yellow-500" },
              { name: "Gmail", logo: "✉️", color: "from-red-500 to-pink-500" },
              { name: "Apple Calendar", logo: "🍎", color: "from-blue-500 to-purple-500" }
            ].map((integration, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-110 text-center group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">{integration.logo}</div>
                  <div className="text-sm text-gray-300 font-semibold group-hover:text-white transition-colors duration-300">{integration.name}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-400 mb-8">Plus 100+ more integrations via our powerful API</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                Explore All Integrations
              </button>
              <button className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                View API Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-24 sm:py-40 px-4 sm:px-6 relative bg-black/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full mb-6 border border-indigo-500/30">
              <CheckCircle className="w-4 h-4 text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-indigo-300">Questions & Answers</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Get answers to the most common questions about Schedley's features and capabilities.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How does Schedley's intelligent email validation work?",
                answer: "Schedley uses advanced AI algorithms and machine learning to analyze email patterns, verify domain authenticity, and cross-reference against databases of temporary email services. Our system learns from booking behaviors to continuously improve spam detection accuracy."
              },
              {
                question: "Can I integrate Schedley with my existing calendar system?",
                answer: "Absolutely! Schedley seamlessly integrates with Google Calendar, Microsoft Outlook, Apple Calendar, and other popular calendar platforms. Your existing events sync automatically, and there's no disruption to your current workflow."
              },
              {
                question: "Is Schedley suitable for healthcare and other regulated industries?",
                answer: "Yes, Schedley offers enterprise-grade security features including HIPAA compliance for healthcare providers, SOC 2 certification, and advanced encryption. We understand the unique requirements of regulated industries and provide appropriate security measures."
              },
              {
                question: "What makes Schedley different from other scheduling platforms?",
                answer: "Schedley is specifically designed for professionals who need intelligent calendar protection. Our advanced email validation, spam filtering, and booking verification features ensure you only meet with qualified, legitimate prospects - something basic scheduling tools don't offer."
              },
              {
                question: "How are blocked booking attempts handled?",
                answer: "Blocked attempts are logged in your comprehensive dashboard for review and analysis. You can view detailed statistics on spam attempts, adjust filtering sensitivity, and create custom rules. Blocked attempts never clutter your calendar or waste your time."
              },
              {
                question: "Can I customize the email validation and filtering rules?",
                answer: "Yes! Schedley offers extensive customization options. You can set custom domain blocking rules, create whitelists for approved companies, adjust spam detection sensitivity, and even create industry-specific filtering criteria based on your unique needs."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-102 group"
              >
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300 flex items-center">
                  <ChevronRight className="w-5 h-5 mr-3 text-purple-400" />
                  {faq.question}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed text-lg pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 sm:py-40 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-12 sm:p-16 border border-white/20 transform hover:scale-105 transition-transform duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-8 border border-purple-500/30">
                <Sparkles className="w-4 h-4 text-purple-400 mr-2 animate-pulse" />
                <span className="text-sm font-medium text-purple-300">Ready to Transform Your Scheduling?</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Your Professional Calendar Awaits
              </h2>
              
              <p className="text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
                Join over 10,000 professionals who have revolutionized their scheduling workflow. 
                Experience intelligent email validation, seamless integrations, and enterprise-grade protection 
                that transforms how you manage your valuable time.
              </p>
              
              <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-12">
                <button className="group bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 px-12 py-6 rounded-full text-xl font-bold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl flex items-center w-full lg:w-auto justify-center relative overflow-hidden">
                  <span className="relative z-10">Start Your Free Trial Today</span>
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
                
                <button className="px-12 py-6 rounded-full text-xl font-semibold border-2 border-white/40 hover:border-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 w-full lg:w-auto relative group overflow-hidden">
                  <span className="relative z-10">Schedule Personal Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-400 mb-8">
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Cancel anytime</span>
                </div>
              </div>

              <div className="text-center text-gray-500">
                <p className="text-sm">Setup takes less than 5 minutes • Full customer support included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-4 sm:px-6 border-t border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent block">
                    Schedley
                  </span>
                  <div className="text-sm text-purple-300">Professional Scheduling</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8">
                The intelligent scheduling platform trusted by 10,000+ professionals worldwide. 
                Advanced email validation, seamless integrations, and enterprise-grade protection.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/jobs/view/software-engineer-at-schedley-com-4271146349/?originalSubdomain=in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125 p-2 rounded-full hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Product</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Solutions</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />Sales Teams</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />Healthcare</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />Legal Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />Consultants</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />System Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 flex items-center group"><ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-12">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-12 text-gray-400 text-center lg:text-left">
                <span className="text-lg">© 2024 Schedley - Crafted with ❤️ for professionals</span>
                <a 
                  href="mailto:hello@schedley.com" 
                  className="hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <Mail className="w-4 h-4 mr-2 group-hover:text-purple-400 transition-colors" />
                  hello@schedley.com
                </a>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
                <button className="hover:text-white transition-colors duration-300 flex items-center group">
                  <Shield className="w-4 h-4 mr-2 group-hover:text-green-400 transition-colors" />
                  Privacy Policy
                </button>
                <button className="hover:text-white transition-colors duration-300 flex items-center group">
                  <CheckCircle className="w-4 h-4 mr-2 group-hover:text-blue-400 transition-colors" />
                  Terms of Service
                </button>
                <a href="#" className="hover:text-white transition-colors duration-300 flex items-center group">
                  <Globe className="w-4 h-4 mr-2 group-hover:text-purple-400 transition-colors" />
                  Cookie Policy
                </a>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-sm">SOC 2 Certified</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-sm">HIPAA Compliant</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-2 fill-current" />
                  <span className="text-sm">99.9% Uptime SLA</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-sm">Global Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScheduleyLanding;