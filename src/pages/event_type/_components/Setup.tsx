import React, { useState, useEffect } from "react";
import { CheckCircle, ArrowLeft, ArrowRight, Calendar, Users, TrendingUp, Clock, Award, BarChart3 } from "lucide-react";

const Setup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
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
        { value: "Direct Sales", icon: Users, label: "Direct Sales", description: "One-on-one customer interactions" },
        { value: "Resellers/Partners", icon: TrendingUp, label: "With partners", description: "Through channel partnerships" },
        { value: "Inbound Marketing", icon: BarChart3, label: "Inbound Marketing", description: "Content-driven lead generation" },
        { value: "Outbound Sales", icon: ArrowRight, label: "Outbound Sales", description: "Proactive customer outreach" },
        { value: "Online Marketplace", icon: Calendar, label: "Online Marketplace", description: "E-commerce platforms" },
        { value: "Other", icon: Award, label: "Other", description: "Different approach" }
      ]
    },
    {
      title: "Who is your ideal customer?",
      subtitle: "Understanding your target market will help us set up your first scheduling link.",
      field: "icp",
      type: "cards",
      options: [
        { value: "Small Business", icon: Users, label: "Small Business", description: "1-50 employees" },
        { value: "Enterprise", icon: TrendingUp, label: "Enterprise", description: "500+ employees" },
        { value: "Startups", icon: ArrowRight, label: "Startups", description: "Early-stage companies" },
        { value: "Healthcare", icon: Award, label: "Healthcare", description: "Medical organizations" },
        { value: "Education", icon: BarChart3, label: "Education", description: "Schools and universities" },
        { value: "Other", icon: Calendar, label: "Other", description: "Different industry" }
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

  // Simulate navigation function (replace with actual useNavigate hook)
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // In real app: navigate(path);
    alert(`Would navigate to: ${path}`);
  };

  const handleInputChange = (value) => {
    const currentField = steps[currentStep].field;
    setFormData(prev => ({
      ...prev,
      [currentField]: value
    }));
  };

  const saveUserData = async (userData) => {
    try {
      // Simulate API call to save user data
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            user: { ...userData, isApproved: true, id: Date.now() }
          });
        }, 1000);
      });
      
      // In real app, you would make an actual API call here
      // const response = await fetch('/api/users', { method: 'POST', body: JSON.stringify(userData) });
      
      // Simulate saving to storage (replace with your actual storage solution)
      const userWithApproval = { ...response.user, isApproved: true };
      console.log("Saving user data:", userWithApproval);
      // localStorage.setItem('user', JSON.stringify(userWithApproval));
      // localStorage.setItem('userApproved', 'true');
      
      return userWithApproval;
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  };

  const handleNext = async () => {
    setIsTransitioning(true);
    
    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setAnimationKey(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      setIsLoading(true);
      try {
        const userData = await saveUserData(formData);
        console.log("User Data Saved:", userData);
        setShowSuccess(true);
        
        // Navigate to event types after success animation
        setTimeout(() => {
          navigate("/app/event_types");
        }, 3000);
      } catch (error) {
        console.error("Error completing setup:", error);
        setIsLoading(false);
      }
      setIsTransitioning(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setAnimationKey(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const isCurrentStepValid = () => {
    const currentField = steps[currentStep].field;
    const value = formData[currentField];
    return value && value.toString().trim() !== "";
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center overflow-hidden relative">
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16">
            {/* Left Side - Content */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg animate-fadeInUp">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-bounce">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight animate-slideInUp">
                All set! 🎉
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-md animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                Our team will carefully analyze the details and will get back to you. You're being redirected to your dashboard...
              </p>
              
              <div className="flex items-center space-x-2 text-blue-600 animate-pulse">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <span className="ml-2 font-medium">Redirecting...</span>
              </div>
            </div>

            {/* Right Side - Success Animation */}
            <div className="flex-1 flex justify-center items-center max-w-lg animate-fadeInRight">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-12 h-12 sm:w-16 sm:h-16 lg:w-32 lg:h-32 bg-blue-200 rounded-full opacity-20 animate-float" />
        <div className="absolute top-1/3 right-4 sm:right-20 w-8 h-8 sm:w-12 sm:h-12 lg:w-24 lg:h-24 bg-purple-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 sm:w-10 sm:h-10 lg:w-20 lg:h-20 bg-pink-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-12 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 lg:mb-12 gap-4 animate-fadeInDown">
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-16">
          {/* Left Side - Form */}
          <div className="flex-1 flex flex-col justify-center">
            <div 
              key={animationKey}
              className={`space-y-6 sm:space-y-8 transition-all duration-300 ${isTransitioning ? 'opacity-50 transform translate-x-4' : 'opacity-100 transform translate-x-0 animate-slideInLeft'}`}
            >
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
                    {currentStepData.options.map((option, index) => {
                      const IconComponent = option.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleInputChange(option.value)}
                          className={`p-3 sm:p-4 lg:p-6 border-2 rounded-xl text-left transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fadeInUp ${
                            formData[currentStepData.field] === option.value
                              ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg transform scale-105"
                              : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                          }`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex flex-col space-y-2 sm:space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100">
                                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                              </div>
                              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                                {option.label}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-11">
                              {option.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : currentStepData.type === "textarea" ? (
                  <div className="max-w-full lg:max-w-2xl animate-fadeInUp">
                    <textarea
                      value={formData[currentStepData.field]}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={currentStepData.placeholder}
                      rows={4}
                      className="w-full p-3 sm:p-4 lg:p-6 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                    />
                  </div>
                ) : currentStepData.type === "pricing" ? (
                  <div className="max-w-full sm:max-w-md animate-fadeInUp">
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

          {/* Right Side - Preview Cards (Hidden on mobile, visible on lg+) */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 rounded-3xl" />
            
            {/* Calendar Preview */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 w-80 border border-white/20 animate-fadeInRight">
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
                    className={`h-8 flex items-center justify-center text-xs rounded transition-all hover:scale-110 ${
                      i === 10 || i === 15 || i === 20 
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm animate-pulse" 
                        : i > 6 && i < 28 
                          ? "hover:bg-blue-50 cursor-pointer text-gray-700"
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
                    className={`p-3 rounded-lg text-center text-sm font-medium transition-all hover:scale-105 ${
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
            <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 w-48 border border-white/20 animate-fadeInUp">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">Bookings Today</span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600 animate-bounce">12</div>
              <div className="text-xs text-gray-500">+25% from yesterday</div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 w-48 border border-white/20 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">Conversion Rate</span>
                <BarChart3 className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">78%</div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-progress" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8 lg:mt-12 animate-fadeInUp">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-white hover:shadow-md hover:scale-105"
            }`}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
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
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
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
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
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