// import React, { useState } from "react";

// const Setup = () => {
//   const [currentStep, setCurrentStep] = useState(0);
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

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       setShowSuccess(true);
//       console.log("Setup Data:", formData);
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

//   if (showSuccess) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex">
//         {/* Left Side - Content */}
//         <div className="flex-1 flex flex-col justify-center px-12 lg:px-24">
//           <div className="max-w-md">
//             <div className="mb-8">
//               <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-4">All set! 🎉</h1>
//               <p className="text-lg text-gray-600 leading-relaxed mb-8">
//                 Our team will carefully analyze the details and will get back to you.
//               </p>
//               <button
//                 onClick={handleClose}
//                 className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
//               >
//                 Get Started
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Decorative */}
//         <div className="hidden lg:block flex-1 relative bg-gradient-to-br from-blue-50 to-purple-50">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-20"></div>
//           <svg className="absolute bottom-0 right-0 w-96 h-96" viewBox="0 0 200 200" fill="none">
//             <path d="M 0 100 Q 50 50 100 100 Q 150 150 200 100 L 200 200 L 0 200 Z" fill="url(#gradient)" />
//             <defs>
//               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
//                 <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//       </div>
//     );
//   }

//   const currentStepData = steps[currentStep];

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Left Side - Content */}
//       <div className="flex-1 flex flex-col justify-between px-12 lg:px-24 py-12">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//               <span className="text-white font-bold text-lg">S</span>
//             </div>
//             <span className="text-2xl font-bold text-blue-600">Schedley</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <span className="text-sm font-medium text-gray-600">
//               STEP {currentStep + 1} OF {steps.length}
//             </span>
//             <div className="flex space-x-1">
//               {steps.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     index <= currentStep 
//                       ? "w-8 bg-blue-600" 
//                       : index === currentStep + 1 
//                         ? "w-6 bg-blue-300"
//                         : "w-2 bg-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col justify-center max-w-2xl">
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">
//               {currentStepData.title}
//             </h1>
//             <p className="text-lg text-gray-600">
//               {currentStepData.subtitle}
//             </p>
//           </div>

//           {/* Form Content */}
//           <div className="mb-12">
//             {currentStepData.type === "cards" ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {currentStepData.options.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleInputChange(option.value)}
//                     className={`p-6 border-2 rounded-lg text-left transition-all hover:border-blue-300 hover:shadow-sm ${
//                       formData[currentStepData.field] === option.value
//                         ? "border-blue-600 bg-blue-50"
//                         : "border-gray-200 bg-white"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">{option.icon}</span>
//                       <span className="font-medium text-gray-900">{option.label}</span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             ) : currentStepData.type === "textarea" ? (
//               <div className="max-w-lg">
//                 <textarea
//                   value={formData[currentStepData.field]}
//                   onChange={(e) => handleInputChange(e.target.value)}
//                   placeholder={currentStepData.placeholder}
//                   rows={4}
//                   className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900"
//                 />
//               </div>
//             ) : currentStepData.type === "pricing" ? (
//               <div className="max-w-sm">
//                 <div className="flex gap-3">
//                   <select
//                     value={formData.currency}
//                     onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
//                     className="w-24 p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="USD">USD</option>
//                     <option value="EUR">EUR</option>
//                     <option value="GBP">GBP</option>
//                     <option value="INR">INR</option>
//                   </select>
//                   <input
//                     type="number"
//                     value={formData[currentStepData.field]}
//                     onChange={(e) => handleInputChange(e.target.value)}
//                     placeholder={currentStepData.placeholder}
//                     className="flex-1 p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//             ) : null}
//           </div>
//         </div>

//         {/* Navigation Footer */}
//         <div className="flex justify-between items-center">
//           <button
//             onClick={handlePrevious}
//             disabled={currentStep === 0}
//             className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
//               currentStep === 0
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             <span>Back</span>
//           </button>

//           <button
//             onClick={handleNext}
//             disabled={!isCurrentStepValid()}
//             className={`px-8 py-3 rounded-full font-medium transition-colors ${
//               isCurrentStepValid()
//                 ? "bg-blue-600 text-white hover:bg-blue-700"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             {currentStep === steps.length - 1 ? "Complete" : "Next"}
//           </button>
//         </div>
//       </div>

//       {/* Right Side - Decorative */}
//       <div className="hidden lg:block flex-1 relative">
//         {/* Abstract background shapes */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50">
//           <svg className="absolute top-20 right-20 w-64 h-64 opacity-30" viewBox="0 0 200 200">
//             <circle cx="100" cy="100" r="80" fill="url(#circleGradient)" />
//             <defs>
//               <linearGradient id="circleGradient">
//                 <stop offset="0%" stopColor="#3B82F6" />
//                 <stop offset="100%" stopColor="#8B5CF6" />
//               </linearGradient>
//             </defs>
//           </svg>
          
//           <svg className="absolute bottom-32 right-32 w-48 h-48 opacity-20" viewBox="0 0 200 200">
//             <path d="M 50 100 Q 100 50 150 100 Q 100 150 50 100 Z" fill="#EC4899" />
//           </svg>

//           <svg className="absolute bottom-0 right-0 w-96 h-96" viewBox="0 0 400 400">
//             <path 
//               d="M 0 200 Q 100 100 200 200 Q 300 300 400 200 L 400 400 L 0 400 Z" 
//               fill="url(#waveGradient)" 
//               opacity="0.6"
//             />
//             <defs>
//               <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#3B82F6" />
//                 <stop offset="50%" stopColor="#8B5CF6" />
//                 <stop offset="100%" stopColor="#EC4899" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>

//         {/* Sample calendar/scheduling preview */}
//         <div className="absolute top-1/4 right-12 bg-white rounded-2xl shadow-xl p-6 w-80">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//               <div>
//                 <div className="w-16 h-3 bg-gray-300 rounded"></div>
//                 <div className="w-20 h-2 bg-gray-200 rounded mt-1"></div>
//               </div>
//             </div>
//             <div className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
//               Select a Date & Time
//             </div>
//           </div>
          
//           <div className="grid grid-cols-7 gap-1 mb-4">
//             {Array.from({ length: 35 }, (_, i) => (
//               <div
//                 key={i}
//                 className={`h-8 flex items-center justify-center text-xs rounded ${
//                   i === 10 || i === 15 || i === 20 
//                     ? "bg-blue-600 text-white" 
//                     : i > 6 && i < 28 
//                       ? "hover:bg-gray-100 cursor-pointer text-gray-700"
//                       : "text-gray-300"
//                 }`}
//               >
//                 {i > 6 && i < 28 ? i - 6 : ""}
//               </div>
//             ))}
//           </div>
          
//           <div className="space-y-2">
//             {["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"].map((time, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded border text-center text-sm ${
//                   index === 1 ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200"
//                 }`}
//               >
//                 {time}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Setup;


import React, { useState, useEffect } from "react";

const Setup = () => {
  // Simulate useNavigate and useStore hooks (replace with actual imports)
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    alert(`Would navigate to: ${path}`);
  };

  const setUser = (user) => {
    console.log("Setting user in store:", user);
  };

  const user = { id: 1, name: "Test User" }; // Simulated user

  const setAccessToken = (token) => {
    console.log("Setting access token:", token);
  };

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

  const updateUserApprovalStatus = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call to update user's approval status
      const updatedUser = {
        ...user,
        ...userData,
        isApproved: true,
        setupCompleted: true,
        updatedAt: new Date().toISOString()
      };

      // Update store (replace with actual store calls)
      setUser(updatedUser);

      // Update localStorage for persistence
      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log("✅ User updated with approval status:", updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("❌ Failed to update user approval status:", error);
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
        // Update user with form data and approval status
        await updateUserApprovalStatus(formData);
        setShowSuccess(true);
        
        // Navigate to event types after showing success
        setTimeout(() => {
          navigate("/app/event_types");
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

        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16">
            {/* Left Side - Content */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg animate-fade-in-up">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-content-center mb-6 shadow-2xl animate-bounce">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
                All set! 🎉
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-md">
                Setup completed successfully! Redirecting to your dashboard in 2 seconds...
              </p>
              
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <span className="ml-2 font-medium">Redirecting...</span>
              </div>
              
              {/* Manual navigation button as backup */}
              <button
                onClick={() => navigate("/app/event_types")}
                className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
              >
                Continue to Dashboard
              </button>
            </div>

            {/* Right Side - Success Animation */}
            <div className="flex-1 flex justify-center items-center max-w-lg animate-fade-in-right">
              <div className="relative">
                <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center animate-spin-slow">
                  <div className="text-6xl sm:text-7xl lg:text-9xl animate-bounce">
                    🎉
                  </div>
                </div>
                
                {/* Orbiting elements */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-spin-slow"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 0",
                      transform: `rotate(${angle}deg) translate(120px, 0) rotate(-${angle}deg)`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '8s'
                    }}
                  />
                ))}
              </div>
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