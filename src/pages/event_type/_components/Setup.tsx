

// import React, { useState} from "react";

// const Setup = () => {
//   const navigate = (path) => {
//     console.log(`Navigating to: ${path}`);
//     alert(`Would navigate to: ${path}`);
//   };

//   const setUser = (user) => {
//     console.log("Setting user in store:", user);
//   };

//   const user = { id: 1, name: "Test User" }; // Simulated user

//   const setAccessToken = (token) => {
//     console.log("Setting access token:", token);
//   };

//   const [currentStep, setCurrentStep] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     sellingMethod: "",
//     icp: "",
//     productDescription: "",
//     pricing: "",
//     currency: "USD"
//   });

//   const steps = [
//     {
//       title: "How are you currently selling your product?",
//       subtitle: "Your responses will help us tailor your experience to your needs.",
//       field: "sellingMethod",
//       type: "cards",
//       options: [
//         { value: "Direct Sales", icon: "👤", label: "Direct Sales" },
//         { value: "Resellers/Partners", icon: "🤝", label: "With partners" },
//         { value: "Inbound Marketing", icon: "📈", label: "Inbound Marketing" },
//         { value: "Outbound Sales", icon: "📞", label: "Outbound Sales" },
//         { value: "Online Marketplace", icon: "🛒", label: "Online Marketplace" },
//         { value: "Other", icon: "⚡", label: "Other" }
//       ]
//     },
//     {
//       title: "Who is your ideal customer?",
//       subtitle: "Understanding your target market will help us set up your first scheduling link.",
//       field: "icp",
//       type: "cards",
//       options: [
//         { value: "Small Business", icon: "🏪", label: "Small Business" },
//         { value: "Enterprise", icon: "🏢", label: "Enterprise" },
//         { value: "Startups", icon: "🚀", label: "Startups" },
//         { value: "Healthcare", icon: "🏥", label: "Healthcare" },
//         { value: "Education", icon: "🎓", label: "Education" },
//         { value: "Other", icon: "⚡", label: "Other" }
//       ]
//     },
//     {
//       title: "What product are you selling?",
//       subtitle: "Tell us about your product or service to personalize your experience.",
//       field: "productDescription",
//       type: "textarea",
//       placeholder: "Describe your product, its key features, and what problems it solves..."
//     },
//     {
//       title: "What's your pricing?",
//       subtitle: "Help us understand your pricing structure for better recommendations.",
//       field: "pricing",
//       type: "pricing",
//       placeholder: "Enter amount"
//     }
//   ];

//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleInputChange = (value) => {
//     const currentField = steps[currentStep].field;
//     setFormData(prev => ({
//       ...prev,
//       [currentField]: value
//     }));
//   };

//   const updateUserApprovalStatus = async (userData) => {
//     try {
//       setIsLoading(true);
      
//       // Simulate API call to update user's approval status
//       const updatedUser = {
//         ...user,
//         ...userData,
//         isApproved: true,
//         setupCompleted: true,
//         updatedAt: new Date().toISOString()
//       };


//       setUser(updatedUser);


//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       console.log("✅ User updated with approval status:", updatedUser);
//       return updatedUser;
//     } catch (error) {
//       console.error("❌ Failed to update user approval status:", error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleNext = async () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       try {

//         await updateUserApprovalStatus(formData);
//         setShowSuccess(true);
//         setTimeout(() => {
//           navigate("/app/event_types");
//         }, 3000);
//       } catch (error) {
//         console.error("Setup completion error:", error);
//       }
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleClose = () => {
//     window.location.reload();
//   };

//   const isCurrentStepValid = () => {
//     const currentField = steps[currentStep].field;
//     const value = formData[currentField];
//     return value && value.toString().trim() !== "";
//   };

//   const progressPercentage = ((currentStep + 1) / steps.length) * 100;

//   if (showSuccess) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center overflow-hidden relative px-4">
//         {/* Animated background elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(12)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-ping"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${i * 0.2}s`,
//                 animationDuration: '2s'
//               }}
//             />
//           ))}
//         </div>

//         <div className="container mx-auto max-w-7xl">
//           <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16">
//             {/* Left Side - Content */}
//             <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg animate-fade-in-up">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-content-center mb-6 shadow-2xl animate-bounce">
//                 <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
              
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
//                 All set! 🎉
//               </h1>
              
//               <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-md">
//                 Setup completed successfully! Redirecting to your dashboard in 2 seconds...
//               </p>
              
//               <div className="flex items-center space-x-2 text-blue-600">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                 <span className="ml-2 font-medium">Redirecting...</span>
//               </div>
              
//               {/* Manual navigation button as backup */}
//               <button
//                 onClick={() => {
//                   console.log("🔄 Manual navigation triggered");
//                   console.log("👤 User state:", user);
                  
//                   // Ensure user is approved before manual navigation
//                   const approvedUser = {
//                     ...user,
//                     isApproved: true,
//                     setupCompleted: true
//                   };
//                   setUser(approvedUser);
//                   localStorage.setItem("user", JSON.stringify(approvedUser));
//                   localStorage.setItem("userApproved", "true");
                  
//                   console.log("✅ Manual approval set, navigating...");
//                   navigate("/app/event_types", { replace: true });
//                 }}
//                 className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
//               >
//                 Continue to Dashboard
//               </button>
//             </div>

//             {/* Right Side - Success Animation */}
//             <div className="flex-1 flex justify-center items-center max-w-lg animate-fade-in-right">
//               <div className="relative">
//                 <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center animate-spin-slow">
//                   <div className="text-6xl sm:text-7xl lg:text-9xl animate-bounce">
//                     🎉
//                   </div>
//                 </div>
                
//                 {/* Orbiting elements */}
//                 {[0, 72, 144, 216, 288].map((angle, i) => (
//                   <div
//                     key={i}
//                     className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-spin-slow"
//                     style={{
//                       top: "50%",
//                       left: "50%",
//                       transformOrigin: "0 0",
//                       transform: `rotate(${angle}deg) translate(120px, 0) rotate(-${angle}deg)`,
//                       animationDelay: `${i * 0.2}s`,
//                       animationDuration: '8s'
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentStepData = steps[currentStep];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-12 min-h-screen flex flex-col">
        
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 lg:mb-12 gap-4 animate-fade-in-down">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
//               <span className="text-white font-bold text-base sm:text-lg lg:text-xl">S</span>
//             </div>
//             <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Schedley
//             </span>
//           </div>
          
//           <div className="flex items-center space-x-3 sm:space-x-4">
//             <span className="text-xs sm:text-sm font-medium text-gray-600 bg-white px-2 sm:px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
//               STEP {currentStep + 1} OF {steps.length}
//             </span>
//             <div className="flex space-x-1">
//               {steps.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`h-2 rounded-full transition-all duration-500 ${
//                     index <= currentStep 
//                       ? "w-6 sm:w-8 lg:w-10 bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm" 
//                       : index === currentStep + 1 
//                         ? "w-4 sm:w-6 bg-blue-300"
//                         : "w-2 bg-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="mb-6 sm:mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm font-medium text-gray-700">Progress</span>
//             <span className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
//               style={{ width: `${progressPercentage}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-16">
//           {/* Left Side - Form */}
//           <div className="flex-1 flex flex-col justify-center">
//             <div className="space-y-6 sm:space-y-8 animate-slide-in-left">
//               {/* Title and Subtitle */}
//               <div className="space-y-3 sm:space-y-4">
//                 <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
//                   {currentStepData.title}
//                 </h1>
//                 <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
//                   {currentStepData.subtitle}
//                 </p>
//               </div>

//               {/* Form Content */}
//               <div className="space-y-4 sm:space-y-6">
//                 {currentStepData.type === "cards" ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
//                     {currentStepData.options.map((option, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleInputChange(option.value)}
//                         className={`p-3 sm:p-4 lg:p-6 border-2 rounded-xl text-left transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up group ${
//                           formData[currentStepData.field] === option.value
//                             ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg transform scale-105"
//                             : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
//                         }`}
//                         style={{ animationDelay: `${index * 0.1}s` }}
//                       >
//                         <div className="flex items-center space-x-3">
//                           <span className="text-xl sm:text-2xl transition-transform group-hover:scale-110">
//                             {option.icon}
//                           </span>
//                           <span className="font-semibold text-gray-900 text-sm sm:text-base">
//                             {option.label}
//                           </span>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 ) : currentStepData.type === "textarea" ? (
//                   <div className="max-w-full lg:max-w-2xl animate-fade-in-up">
//                     <textarea
//                       value={formData[currentStepData.field]}
//                       onChange={(e) => handleInputChange(e.target.value)}
//                       placeholder={currentStepData.placeholder}
//                       rows={4}
//                       className="w-full p-3 sm:p-4 lg:p-6 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 transition-all duration-300 hover:shadow-md text-sm sm:text-base"
//                     />
//                   </div>
//                 ) : currentStepData.type === "pricing" ? (
//                   <div className="max-w-full sm:max-w-md animate-fade-in-up">
//                     <div className="flex flex-col sm:flex-row gap-3">
//                       <select
//                         value={formData.currency}
//                         onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
//                         className="w-full sm:w-28 p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
//                       >
//                         <option value="USD">USD</option>
//                         <option value="EUR">EUR</option>
//                         <option value="GBP">GBP</option>
//                         <option value="INR">INR</option>
//                       </select>
//                       <input
//                         type="number"
//                         value={formData[currentStepData.field]}
//                         onChange={(e) => handleInputChange(e.target.value)}
//                         placeholder={currentStepData.placeholder}
//                         className="flex-1 p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md text-sm sm:text-base"
//                       />
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Preview Cards (Hidden on mobile) */}
//           <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center relative">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 rounded-3xl" />
            
//             {/* Calendar Preview */}
//             <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 w-80 border border-white/20 animate-fade-in-right">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
//                   <div className="space-y-1">
//                     <div className="w-16 h-3 bg-gray-300 rounded-full animate-pulse" />
//                     <div className="w-20 h-2 bg-gray-200 rounded-full animate-pulse" />
//                   </div>
//                 </div>
//                 <div className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full animate-bounce">
//                   Available Times
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-7 gap-1 mb-4">
//                 {Array.from({ length: 35 }, (_, i) => (
//                   <div
//                     key={i}
//                     className={`h-8 flex items-center justify-center text-xs rounded transition-all hover:scale-110 cursor-pointer ${
//                       i === 10 || i === 15 || i === 20 
//                         ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm animate-pulse" 
//                         : i > 6 && i < 28 
//                           ? "hover:bg-blue-50 text-gray-700"
//                           : "text-gray-300"
//                     }`}
//                   >
//                     {i > 6 && i < 28 ? i - 6 : ""}
//                   </div>
//                 ))}
//               </div>
              
//               <div className="space-y-2">
//                 {["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"].map((time, index) => (
//                   <div
//                     key={index}
//                     className={`p-3 rounded-lg text-center text-sm font-medium transition-all hover:scale-105 cursor-pointer ${
//                       index === 1 
//                         ? "border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600" 
//                         : "border border-gray-200 hover:border-blue-300"
//                     }`}
//                   >
//                     {time}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Floating stats cards */}
//             <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 w-48 border border-white/20 animate-fade-in-up transform rotate-3">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-semibold text-gray-800">Bookings Today</span>
//                 <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 14l3-3 3 3 7-7v4h-2V4h7v7h-4l-7 7z" />
//                 </svg>
//               </div>
//               <div className="text-2xl font-bold text-green-600 animate-bounce">12</div>
//               <div className="text-xs text-gray-500">+25% from yesterday</div>
//             </div>

//             <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 w-48 border border-white/20 animate-fade-in-up transform -rotate-2" style={{ animationDelay: '0.5s' }}>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-semibold text-gray-800">Conversion</span>
//                 <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </div>
//               <div className="text-2xl font-bold text-blue-600 mb-2">78%</div>
//               <div className="w-full h-2 bg-gray-200 rounded-full">
//                 <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-progress" style={{ width: '78%' }} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Footer */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8 lg:mt-12 animate-fade-in-up">
//           <button
//             onClick={handlePrevious}
//             disabled={currentStep === 0}
//             className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
//               currentStep === 0
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-gray-700 hover:bg-white hover:shadow-md hover:scale-105"
//             }`}
//           >
//             <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             <span className="text-sm sm:text-base">Back</span>
//           </button>

//           <button
//             onClick={handleNext}
//             disabled={!isCurrentStepValid() || isLoading}
//             className={`w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 ${
//               isCurrentStepValid() && !isLoading
//                 ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center space-x-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 <span className="text-sm sm:text-base">Setting up...</span>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center space-x-2">
//                 <span className="text-sm sm:text-base">{currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}</span>
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </div>
//             )}
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes fade-in-down {
//           from { opacity: 0; transform: translateY(-30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes fade-in-left {
//           from { opacity: 0; transform: translateX(-30px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
        
//         @keyframes fade-in-right {
//           from { opacity: 0; transform: translateX(30px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
        
//         @keyframes slide-in-left {
//           from { opacity: 0; transform: translateX(-50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
        
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes progress {
//           from { width: 0%; }
//           to { width: 78%; }
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out;
//         }
        
//         .animate-fade-in-down {
//           animation: fade-in-down 0.6s ease-out;
//         }
        
//         .animate-fade-in-left {
//           animation: fade-in-left 0.6s ease-out;
//         }
        
//         .animate-fade-in-right {
//           animation: fade-in-right 0.8s ease-out;
//         }
        
//         .animate-slide-in-left {
//           animation: slide-in-left 0.6s ease-out;
//         }
        
//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }
        
//         .animate-progress {
//           animation: progress 2s ease-out 1s both;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Setup;


import React, { useState} from "react";

const Setup = () => {
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    if (path === "https://www.schedley.com/") {
      window.location.href = path;
    } else {
      alert(`Would navigate to: ${path}`);
    }
  };

  const setUser = (user) => {
    console.log("Setting user in store:", user);
  };

  const setAccessToken = (token) => {
    console.log("Setting access token:", token);
  };

  const user = { id: 1, name: "Test User" }; // Simulated user

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    sellingMethod: "",
    icp: "",
    productDescription: "",
    pricing: "",
    currency: "USD"
  });

  const steps = [
    {
      title: "How are you currently selling your product?",
      subtitle: "Your responses will help us tailor your experience to your needs.",
      field: "sellingMethod",
      type: "cards",
      options: [
        { value: "Direct Sales", icon: "👤", label: "Direct Sales" },
        { value: "Resellers/Partners", icon: "🤝", label: "With partners" },
        { value: "Inbound Marketing", icon: "📈", label: "Inbound Marketing" },
        { value: "Outbound Sales", icon: "📞", label: "Outbound Sales" },
        { value: "Online Marketplace", icon: "🛒", label: "Online Marketplace" },
        { value: "Other", icon: "⚡", label: "Other" }
      ]
    },
    {
      title: "Who is your ideal customer?",
      subtitle: "Understanding your target market will help us set up your first scheduling link.",
      field: "icp",
      type: "cards",
      options: [
        { value: "Small Business", icon: "🏪", label: "Small Business" },
        { value: "Enterprise", icon: "🏢", label: "Enterprise" },
        { value: "Startups", icon: "🚀", label: "Startups" },
        { value: "Healthcare", icon: "🏥", label: "Healthcare" },
        { value: "Education", icon: "🎓", label: "Education" },
        { value: "Other", icon: "⚡", label: "Other" }
      ]
    },
    {
      title: "What product are you selling?",
      subtitle: "Tell us about your product or service to personalize your experience.",
      field: "productDescription",
      type: "textarea",
      placeholder: "Describe your product, its key features, and what problems it solves..."
    },
    {
      title: "What's your pricing?",
      subtitle: "Help us understand your pricing structure for better recommendations.",
      field: "pricing",
      type: "pricing",
      placeholder: "Enter amount"
    }
  ];

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (value) => {
    const currentField = steps[currentStep].field;
    setFormData(prev => ({
      ...prev,
      [currentField]: value
    }));
  };

  const onLogout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userApproved");
    navigate("https://www.schedley.com/");
  };

  const updateUserApprovalStatus = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call to update user's approval status
      const updatedUser = {
        ...user,
        ...userData,
        isApproved: false, // Changed to false since it needs manual approval
        setupCompleted: true,
        pendingApproval: true,
        updatedAt: new Date().toISOString()
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log("✅ User setup completed, pending approval:", updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("❌ Failed to update user setup:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        await updateUserApprovalStatus(formData);
        setShowSuccess(true);
        // Auto logout after 8 seconds
        setTimeout(() => {
          onLogout();
        }, 3000);
      } catch (error) {
        console.error("Setup completion error:", error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    window.location.reload();
  };

  const isCurrentStepValid = () => {
    const currentField = steps[currentStep].field;
    const value = formData[currentField];
    return value && value.toString().trim() !== "";
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center overflow-hidden relative px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center min-h-screen gap-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-bounce">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              Setup Complete! 🎉
            </h1>
            
            {/* Approval Message */}
            <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    Account Under Review
                  </h2>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                    Your profile will be processed by our <span className="font-semibold text-blue-600">AI system</span> and reviewed by our <span className="font-semibold text-purple-600">dedicated team</span>. 
                  </p>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                    Your account will be approved and you will be <span className="font-semibold text-green-600">notified via email</span> once the review is complete.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Until then, please wait and explore our platform to learn more about Schedley's features.
                  </p>
                </div>
              </div>
              
              {/* Features Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>AI-Powered Scheduling</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Smart Automation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Advanced Analytics</span>
                </div>
              </div>
            </div>
            
            {/* Countdown and Logout */}
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <span className="ml-2 font-medium">Redirecting to homepage in a few seconds...</span>
              </div>
              
              {/* Manual logout button */}
              <button
                onClick={onLogout}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Continue to Homepage
              </button>
              
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                You'll receive an email notification once your account is approved. Thank you for your patience!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-12 min-h-screen flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 lg:mb-12 gap-4 animate-fade-in-down">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              <span className="text-white font-bold text-base sm:text-lg lg:text-xl">S</span>
            </div>
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Schedley
            </span>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="text-xs sm:text-sm font-medium text-gray-600 bg-white px-2 sm:px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
              STEP {currentStep + 1} OF {steps.length}
            </span>
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index <= currentStep 
                      ? "w-6 sm:w-8 lg:w-10 bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm" 
                      : index === currentStep + 1 
                        ? "w-4 sm:w-6 bg-blue-300"
                        : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-16">
          {/* Left Side - Form */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-6 sm:space-y-8 animate-slide-in-left">
              {/* Title and Subtitle */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  {currentStepData.title}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
                  {currentStepData.subtitle}
                </p>
              </div>

              {/* Form Content */}
              <div className="space-y-4 sm:space-y-6">
                {currentStepData.type === "cards" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                    {currentStepData.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleInputChange(option.value)}
                        className={`p-3 sm:p-4 lg:p-6 border-2 rounded-xl text-left transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up group ${
                          formData[currentStepData.field] === option.value
                            ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg transform scale-105"
                            : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl sm:text-2xl transition-transform group-hover:scale-110">
                            {option.icon}
                          </span>
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">
                            {option.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : currentStepData.type === "textarea" ? (
                  <div className="max-w-full lg:max-w-2xl animate-fade-in-up">
                    <textarea
                      value={formData[currentStepData.field]}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={currentStepData.placeholder}
                      rows={4}
                      className="w-full p-3 sm:p-4 lg:p-6 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                    />
                  </div>
                ) : currentStepData.type === "pricing" ? (
                  <div className="max-w-full sm:max-w-md animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        value={formData.currency}
                        onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                        className="w-full sm:w-28 p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="INR">INR</option>
                      </select>
                      <input
                        type="number"
                        value={formData[currentStepData.field]}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={currentStepData.placeholder}
                        className="flex-1 p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right Side - Preview Cards (Hidden on mobile) */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 rounded-3xl" />
            
            {/* Calendar Preview */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 w-80 border border-white/20 animate-fade-in-right">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                  <div className="space-y-1">
                    <div className="w-16 h-3 bg-gray-300 rounded-full animate-pulse" />
                    <div className="w-20 h-2 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full animate-bounce">
                  Available Times
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className={`h-8 flex items-center justify-center text-xs rounded transition-all hover:scale-110 cursor-pointer ${
                      i === 10 || i === 15 || i === 20 
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm animate-pulse" 
                        : i > 6 && i < 28 
                          ? "hover:bg-blue-50 text-gray-700"
                          : "text-gray-300"
                    }`}
                  >
                    {i > 6 && i < 28 ? i - 6 : ""}
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                {["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"].map((time, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-center text-sm font-medium transition-all hover:scale-105 cursor-pointer ${
                      index === 1 
                        ? "border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600" 
                        : "border border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating stats cards */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 w-48 border border-white/20 animate-fade-in-up transform rotate-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">Bookings Today</span>
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 14l3-3 3 3 7-7v4h-2V4h7v7h-4l-7 7z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-green-600 animate-bounce">12</div>
              <div className="text-xs text-gray-500">+25% from yesterday</div>
            </div>

            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 w-48 border border-white/20 animate-fade-in-up transform -rotate-2" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">Conversion</span>
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">78%</div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-progress" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8 lg:mt-12 animate-fade-in-up">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-white hover:shadow-md hover:scale-105"
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base">Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentStepValid() || isLoading}
            className={`w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 ${
              isCurrentStepValid() && !isLoading
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-sm sm:text-base">Setting up...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm sm:text-base">{currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 78%; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-progress {
          animation: progress 2s ease-out 1s both;
        }
      `}</style>
    </div>
  );
};

export default Setup;