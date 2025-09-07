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
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowSuccess(true);
        console.log("Setup Data:", formData);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handleClose = () => {
    window.location.reload();
  };

  const isCurrentStepValid = () => {
    const currentField = steps[currentStep].field;
    const value = formData[currentField];
    return value && value.toString().trim() !== "";
  };

  // Floating elements animation
  const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
    <div
      className="absolute animate-pulse"
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/4 -right-10 w-60 h-60 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-ping" style={{animationDuration: '4s'}}></div>
        </div>

        {/* Left Side - Content */}
        <div className="flex-1 flex flex-col justify-center px-12 lg:px-24 relative z-10">
          <div className="max-w-md transform animate-fade-in-up">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                All set! 🎉
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Our team will carefully analyze the details and will get back to you.
              </p>
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Celebration Animation */}
        <div className="hidden lg:block flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            {/* Confetti-like elements */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              >
                <div className={`w-3 h-3 rounded-full ${
                  ['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-yellow-400', 'bg-green-400'][i % 5]
                }`}></div>
              </div>
            ))}
            
            {/* Success illustration */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <svg className="w-80 h-80 animate-spin-slow" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="url(#successGradient)" strokeWidth="4" opacity="0.3"/>
                  <defs>
                    <linearGradient id="successGradient">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl animate-bounce">🎉</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out;
          }
          
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement delay={0}>
          <div className="top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
        </FloatingElement>
        <FloatingElement delay={1}>
          <div className="top-1/3 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
        </FloatingElement>
        <FloatingElement delay={2}>
          <div className="bottom-1/3 left-1/3 w-20 h-20 bg-pink-200 rounded-full opacity-20"></div>
        </FloatingElement>
      </div>

      {/* Left Side - Content */}
      <div className={`flex-1 flex flex-col justify-between px-12 lg:px-24 py-12 transition-all duration-300 ${isTransitioning ? 'opacity-50 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in-down">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Schedley</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
              STEP {currentStep + 1} OF {steps.length}
            </span>
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index <= currentStep 
                      ? "w-10 bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm" 
                      : index === currentStep + 1 
                        ? "w-6 bg-blue-300"
                        : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {currentStepData.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Form Content */}
          <div className="mb-12">
            {currentStepData.type === "cards" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentStepData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleInputChange(option.value)}
                    className={`p-6 border-2 rounded-xl text-left transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in-up ${
                      formData[currentStepData.field] === option.value
                        ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md transform scale-105"
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl transform transition-transform duration-300 hover:scale-110">
                        {option.icon}
                      </div>
                      <span className="font-semibold text-gray-900 text-lg">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : currentStepData.type === "textarea" ? (
              <div className="max-w-lg animate-fade-in-up">
                <textarea
                  value={formData[currentStepData.field]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentStepData.placeholder}
                  rows={5}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 transition-all duration-300 hover:shadow-md"
                />
              </div>
            ) : currentStepData.type === "pricing" ? (
              <div className="max-w-sm animate-fade-in-up">
                <div className="flex gap-4">
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-28 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center animate-fade-in-up">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-white hover:shadow-md transform hover:scale-105"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className={`px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              isCurrentStepValid()
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
          </button>
        </div>
      </div>

      {/* Right Side - Enhanced Visuals */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
          {/* Dynamic background shapes */}
          <svg className="absolute top-10 right-10 w-64 h-64 opacity-20 animate-spin-slow" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="url(#bgGradient1)" strokeWidth="8" />
            <defs>
              <linearGradient id="bgGradient1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          
          <svg className="absolute bottom-20 right-20 w-48 h-48 opacity-30 animate-pulse" viewBox="0 0 200 200">
            <polygon points="100,20 180,180 20,180" fill="url(#bgGradient2)" />
            <defs>
              <linearGradient id="bgGradient2">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>

          <svg className="absolute bottom-0 right-0 w-full h-96" viewBox="0 0 400 400">
            <path 
              d="M 0 200 Q 100 100 200 200 Q 300 300 400 200 L 400 400 L 0 400 Z" 
              fill="url(#waveGradient)" 
              opacity="0.8"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Calendar Preview - Enhanced */}
          <div className="absolute top-1/4 right-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-96 animate-fade-in-right border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                <div>
                  <div className="w-20 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="w-24 h-3 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
              <div className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-2 rounded-full animate-bounce">
                Select Date & Time
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-6">
              {Array.from({ length: 35 }, (_, i) => (
                <div
                  key={i}
                  className={`h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-300 ${
                    i === 10 || i === 15 || i === 20 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md animate-pulse" 
                      : i > 6 && i < 28 
                        ? "hover:bg-blue-50 cursor-pointer text-gray-700 hover:scale-110 transition-transform"
                        : "text-gray-300"
                  }`}
                >
                  {i > 6 && i < 28 ? i - 6 : ""}
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              {["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"].map((time, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-center font-medium transition-all duration-300 hover:scale-105 ${
                    index === 1 
                      ? "border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-md" 
                      : "border border-gray-200 hover:border-blue-300 hover:shadow-sm"
                  }`}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Meeting Preview Card */}
          <div className="absolute top-3/4 right-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-80 animate-fade-in-left border border-white/20">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
              <div className="flex-1">
                <div className="w-32 h-3 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-20 h-2 bg-gray-200 rounded mt-2 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-2 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-3/4 h-2 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-1/2 h-2 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Analytics Dashboard Preview */}
          <div className="absolute bottom-1/4 left-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-72 animate-fade-in-up border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Your Stats</h3>
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Meetings</span>
                <span className="font-bold text-blue-600">24</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversion</span>
                <span className="font-bold text-green-600">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out 0.2s both;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Setup;