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
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, ProgressBar } from "react-bootstrap";
import { useStore } from "@/store/store";

const Setup = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  const setAccessToken = useStore((state) => state.setAccessToken);

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

      // Update Zustand store
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
        // Handle error appropriately
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 d-flex align-items-center justify-content-center overflow-hidden position-relative">
        {/* Animated background elements */}
        <div className="position-absolute w-100 h-100 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="position-absolute rounded-circle bg-gradient-to-r from-blue-400 to-purple-400"
              style={{
                width: '12px',
                height: '12px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        <Container fluid className="h-100">
          <Row className="h-100 align-items-center justify-content-center">
            <Col xs={12} lg={10} xl={8}>
              <Row className="align-items-center justify-content-center min-vh-100">
                {/* Left Side - Content */}
                <Col xs={12} lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
                  <div className="animate__animated animate__fadeInUp">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-lg mb-4"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                        animation: 'bounce 2s infinite'
                      }}
                    >
                      <svg className="text-white" width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    
                    <h1 className="display-3 fw-bold mb-4" style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      All set! 🎉
                    </h1>
                    
                    <p className="lead text-muted mb-4">
                      Our team will carefully analyze the details and will get back to you. 
                      You're being redirected to your dashboard...
                    </p>
                    
                    <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                      <div className="d-flex align-items-center text-primary">
                        {[1, 2, 3].map((dot) => (
                          <div
                            key={dot}
                            className="bg-primary rounded-circle me-2"
                            style={{
                              width: '8px',
                              height: '8px',
                              animation: `bounce 1.4s ease-in-out ${dot * 0.16}s infinite both`
                            }}
                          />
                        ))}
                        <span className="ms-2 fw-medium">Redirecting...</span>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Right Side - Success Animation */}
                <Col xs={12} lg={6} className="d-flex justify-content-center">
                  <div className="position-relative">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: '300px',
                        height: '300px',
                        background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #fce7f3 100%)',
                        animation: 'spin 20s linear infinite'
                      }}
                    >
                      <div 
                        className="display-1"
                        style={{ 
                          fontSize: '5rem',
                          animation: 'bounce 2s infinite'
                        }}
                      >
                        🎉
                      </div>
                    </div>
                    
                    {/* Orbiting elements */}
                    {[0, 72, 144, 216, 288].map((angle, i) => (
                      <div
                        key={i}
                        className="position-absolute rounded-circle"
                        style={{
                          width: '24px',
                          height: '24px',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                          top: '50%',
                          left: '50%',
                          transformOrigin: '0 0',
                          transform: `rotate(${angle}deg) translate(150px, 0) rotate(-${angle}deg)`,
                          animation: `spin 8s linear infinite`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <style>{`
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
              transform: translate3d(0, 0, 0);
            }
            40%, 43% {
              animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
              transform: translate3d(0, -30px, 0);
            }
            70% {
              animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
              transform: translate3d(0, -15px, 0);
            }
            90% {
              transform: translate3d(0, -4px, 0);
            }
          }
        `}</style>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Container fluid className="h-100">
        <Row className="h-100">
          {/* Left Side - Content */}
          <Col xs={12} lg={7} xl={8} className="d-flex flex-column py-4 px-3 px-md-5">
            {/* Header */}
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4 mb-md-5">
              <div className="d-flex align-items-center mb-3 mb-sm-0">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                  }}
                >
                  <span className="text-white fw-bold fs-5">S</span>
                </div>
                <span 
                  className="fs-3 fw-bold"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Schedley
                </span>
              </div>
              
              <div className="d-flex align-items-center">
                <span className="badge bg-light text-dark me-3 px-3 py-2">
                  STEP {currentStep + 1} OF {steps.length}
                </span>
                <div className="d-flex align-items-center">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`rounded-pill me-1 transition-all ${
                        index <= currentStep 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                          : index === currentStep + 1 
                            ? "bg-primary opacity-50"
                            : "bg-secondary opacity-25"
                      }`}
                      style={{
                        height: '8px',
                        width: index <= currentStep ? '40px' : index === currentStep + 1 ? '24px' : '8px',
                        transition: 'all 0.5s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <ProgressBar 
                now={progressPercentage} 
                className="mb-2"
                style={{ height: '6px' }}
                variant="primary"
              />
              <small className="text-muted">{Math.round(progressPercentage)}% Complete</small>
            </div>

            {/* Main Content */}
            <div className="flex-fill d-flex flex-column justify-content-center">
              <div className="mb-4 mb-md-5">
                <h1 className="display-4 display-md-3 fw-bold text-dark mb-3 mb-md-4">
                  {currentStepData.title}
                </h1>
                <p className="fs-5 fs-md-4 text-muted leading-relaxed">
                  {currentStepData.subtitle}
                </p>
              </div>

              {/* Form Content */}
              <div className="mb-4 mb-md-5">
                {currentStepData.type === "cards" ? (
                  <Row className="g-3 g-md-4">
                    {currentStepData.options.map((option, index) => (
                      <Col xs={12} sm={6} xl={4} key={index}>
                        <Card
                          className={`h-100 cursor-pointer transition-all border-2 hover-shadow ${
                            formData[currentStepData.field] === option.value
                              ? "border-primary bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg"
                              : "border-light hover-border-primary"
                          }`}
                          onClick={() => handleInputChange(option.value)}
                          style={{ 
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: formData[currentStepData.field] === option.value ? 'scale(1.02)' : 'scale(1)'
                          }}
                        >
                          <Card.Body className="p-3 p-md-4">
                            <div className="d-flex align-items-center">
                              <span className="fs-1 me-3" style={{ fontSize: '2rem' }}>
                                {option.icon}
                              </span>
                              <span className="fw-semibold text-dark fs-6">
                                {option.label}
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : currentStepData.type === "textarea" ? (
                  <div style={{ maxWidth: '600px' }}>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData[currentStepData.field]}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={currentStepData.placeholder}
                      className="border-2 border-light rounded-3 p-3 p-md-4"
                      style={{
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                ) : currentStepData.type === "pricing" ? (
                  <div style={{ maxWidth: '400px' }}>
                    <Row className="g-3">
                      <Col xs={4}>
                        <Form.Select
                          value={formData.currency}
                          onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                          className="border-2 border-light rounded-3 p-3"
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="INR">INR</option>
                        </Form.Select>
                      </Col>
                      <Col xs={8}>
                        <Form.Control
                          type="number"
                          value={formData[currentStepData.field]}
                          onChange={(e) => handleInputChange(e.target.value)}
                          placeholder={currentStepData.placeholder}
                          className="border-2 border-light rounded-3 p-3"
                        />
                      </Col>
                    </Row>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
              <Button
                variant="outline-secondary"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`d-flex align-items-center px-4 py-2 rounded-pill ${
                  currentStep === 0 ? "opacity-50" : "hover-scale"
                }`}
              >
                <svg className="me-2" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isCurrentStepValid() || isLoading}
                className={`px-4 py-3 px-md-5 py-md-3 rounded-pill fw-semibold ${
                  isCurrentStepValid() && !isLoading
                    ? "btn-primary hover-scale"
                    : "btn-secondary opacity-50"
                }`}
                style={{
                  minWidth: '200px',
                  background: isCurrentStepValid() && !isLoading ? 
                    'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : undefined
                }}
              >
                {isLoading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <div 
                      className="spinner-border spinner-border-sm me-2"
                      style={{ width: '1rem', height: '1rem' }}
                    />
                    Setting up...
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-center">
                    <span>{currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}</span>
                    <svg className="ms-2" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </Button>
            </div>
          </Col>

          {/* Right Side - Preview Cards (Hidden on mobile) */}
          <Col lg={5} xl={4} className="d-none d-lg-flex align-items-center justify-content-center position-relative">
            <div 
              className="position-absolute w-100 h-100 rounded-start-4"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)'
              }}
            />
            
            {/* Calendar Preview */}
            <Card className="position-relative shadow-lg border-0 rounded-4" style={{ width: '350px' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <div 
                      className="rounded-circle me-3"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                      }}
                    />
                    <div>
                      <div className="bg-secondary rounded" style={{ width: '60px', height: '12px' }} />
                      <div className="bg-light rounded mt-1" style={{ width: '80px', height: '8px' }} />
                    </div>
                  </div>
                  <span className="badge bg-primary-subtle text-primary px-2 py-1 rounded-pill small">
                    Available Times
                  </span>
                </div>
                
                <div className="d-grid mb-4" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                  {Array.from({ length: 35 }, (_, i) => (
                    <div
                      key={i}
                      className={`d-flex align-items-center justify-content-center rounded small ${
                        i === 10 || i === 15 || i === 20 
                          ? "bg-primary text-white" 
                          : i > 6 && i < 28 
                            ? "bg-light text-dark cursor-pointer hover-bg-primary-subtle"
                            : "text-muted"
                      }`}
                      style={{ height: '32px', cursor: i > 6 && i < 28 ? 'pointer' : 'default' }}
                    >
                      {i > 6 && i < 28 ? i - 6 : ""}
                    </div>
                  ))}
                </div>
                
                <div className="d-grid gap-2">
                  {["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"].map((time, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded text-center small fw-medium transition-all ${
                        index === 1 
                          ? "border-2 border-primary bg-primary-subtle text-primary" 
                          : "border border-light hover-border-primary"
                      }`}
                      style={{ cursor: 'pointer' }}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Floating stats cards */}
            <Card 
              className="position-absolute shadow border-0 rounded-3"
              style={{ 
                top: '10%', 
                right: '10%',
                width: '180px',
                transform: 'rotate(5deg)'
              }}
            >
              <Card.Body className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="small fw-semibold">Bookings Today</span>
                  <svg className="text-success" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14l3-3 3 3 7-7v4h2V4h-7v2h4l-5 5-3-3-5 5z"/>
                  </svg>
                </div>
                <div className="h4 fw-bold text-success mb-0">12</div>
                <small className="text-muted">+25% from yesterday</small>
              </Card.Body>
            </Card>

            <Card 
              className="position-absolute shadow border-0 rounded-3"
              style={{ 
                bottom: '15%', 
                left: '5%',
                width: '180px',
                transform: 'rotate(-3deg)'
              }}
            >
              <Card.Body className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="small fw-semibold">Conversion</span>
                  <svg className="text-primary" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zm-2-8H9v6h8v-6z"/>
                  </svg>
                </div>
                <div className="h4 fw-bold text-primary mb-2">78%</div>
                <ProgressBar 
                  now={78} 
                  style={{ height: '6px' }}
                  className="rounded-pill"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        .hover-scale:hover {
          transform: scale(1.05);
        }
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
        .hover-border-primary:hover {
          border-color: #0d6efd !important;
        }
        .hover-bg-primary-subtle:hover {
          background-color: rgba(13, 110, 253, 0.1) !important;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .min-vh-100 {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default Setup;