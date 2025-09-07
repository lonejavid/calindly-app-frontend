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

// Replace your Setup component temporarily with this test version
import { useEffect } from 'react';
import { useStore } from "@/store/store";

const Setup = () => {
  const { user } = useStore();

  useEffect(() => {
    console.log("=== Setup Component Mounted ===");
    console.log("User in Setup:", user);
  }, [user]);

  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#f0f8ff', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
        🎉 Setup Page is Working!
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h2>Debug Information:</h2>
        <p><strong>Current URL:</strong> {window.location.pathname}</p>
        <p><strong>User Approved:</strong> {user?.isApproved?.toString() || 'undefined'}</p>
        <p><strong>User ID:</strong> {user?.id || 'No ID'}</p>
        
        <div style={{ marginTop: '20px' }}>
          <h3>User Object:</h3>
          <pre style={{ 
            backgroundColor: '#f3f4f6', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Setup;