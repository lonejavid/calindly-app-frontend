import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft, ArrowRight, Calendar, Users, TrendingUp, Clock, Award, BarChart3 } from "lucide-react";

const Setup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
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
      
      // Save to localStorage (replace with your actual storage solution)
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('userApproved', 'true');
      
      return response.user;
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
        setIsTransitioning(false);
      }, 300);
    }
  };

  const isCurrentStepValid = () => {
    const currentField = steps[currentStep].field;
    const value = formData[currentField];
    return value && value.toString().trim() !== "";
  };

  // Floating elements animation variants
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16">
            {/* Left Side - Content */}
            <motion.div 
              className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-2xl"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                All set! 🎉
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Our team will carefully analyze the details and will get back to you. You're being redirected to your dashboard...
              </motion.p>
              
              <motion.div 
                className="flex items-center space-x-2 text-blue-600"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="ml-2 font-medium">Redirecting...</span>
              </motion.div>
            </motion.div>

            {/* Right Side - Success Animation */}
            <motion.div 
              className="flex-1 flex justify-center items-center max-w-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div
                  className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="text-8xl sm:text-9xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎉
                  </motion.div>
                </motion.div>
                
                {/* Orbiting elements */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 0"
                    }}
                    animate={{
                      rotate: angle + 360,
                      x: Math.cos((angle * Math.PI) / 180) * 150,
                      y: Math.sin((angle * Math.PI) / 180) * 150,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
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
        <motion.div variants={floatingVariants} animate="animate" className="absolute top-20 left-4 sm:left-20 w-16 h-16 sm:w-32 sm:h-32 bg-blue-200 rounded-full opacity-20" />
        <motion.div variants={floatingVariants} animate="animate" className="absolute top-1/3 right-4 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-purple-200 rounded-full opacity-20" />
        <motion.div variants={floatingVariants} animate="animate" className="absolute bottom-1/3 left-1/4 w-10 h-10 sm:w-20 sm:h-20 bg-pink-200 rounded-full opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 flex-1 flex flex-col">
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-white font-bold text-lg sm:text-xl">S</span>
            </motion.div>
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Schedley
            </span>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="text-xs sm:text-sm font-medium text-gray-600 bg-white px-2 sm:px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
              STEP {currentStep + 1} OF {steps.length}
            </span>
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index <= currentStep 
                      ? "w-8 sm:w-10 bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm" 
                      : index === currentStep + 1 
                        ? "w-4 sm:w-6 bg-blue-300"
                        : "w-2 bg-gray-300"
                  }`}
                  initial={{ width: 8 }}
                  animate={{ 
                    width: index <= currentStep ? 40 : index === currentStep + 1 ? 24 : 8 
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Side - Form */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Title and Subtitle */}
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {currentStepData.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                    {currentStepData.subtitle}
                  </p>
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                  {currentStepData.type === "cards" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {currentStepData.options.map((option, index) => {
                        const IconComponent = option.icon;
                        return (
                          <motion.button
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handleInputChange(option.value)}
                            className={`p-4 sm:p-6 border-2 rounded-xl text-left transition-all duration-300 ${
                              formData[currentStepData.field] === option.value
                                ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg"
                                : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                            }`}
                          >
                            <div className="flex flex-col space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100">
                                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                </div>
                                <span className="font-semibold text-gray-900 text-sm sm:text-base">
                                  {option.label}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                {option.description}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  ) : currentStepData.type === "textarea" ? (
                    <motion.div 
                      className="max-w-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <textarea
                        value={formData[currentStepData.field]}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={currentStepData.placeholder}
                        rows={5}
                        className="w-full p-4 sm:p-6 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                      />
                    </motion.div>
                  ) : currentStepData.type === "pricing" ? (
                    <motion.div 
                      className="max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
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
                    </motion.div>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Preview Cards (Hidden on mobile) */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 rounded-3xl" />
            
            {/* Calendar Preview */}
            <motion.div 
              className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 w-80 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                  <div className="space-y-1">
                    <div className="w-16 h-3 bg-gray-300 rounded-full" />
                    <div className="w-20 h-2 bg-gray-200 rounded-full" />
                  </div>
                </div>
                <div className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  Available Times
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className={`h-8 flex items-center justify-center text-xs rounded transition-all ${
                      i === 10 || i === 15 || i === 20 
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm" 
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
                  <motion.div
                    key={index}
                    className={`p-3 rounded-lg text-center text-sm font-medium transition-all ${
                      index === 1 
                        ? "border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600" 
                        : "border border-gray-200 hover:border-blue-300"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {time}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating stats cards */}
            <motion.div 
              className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 w-48 border border-white/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">Bookings Today</span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-xs text-gray-500">+25% from yesterday</div>
            </motion.div>

            <motion.div 
              className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 w-48 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">Conversion Rate</span>
                <BarChart3 className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">78%</div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ delay: 1.2, duration: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Footer */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-white hover:shadow-md"
            }`}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back</span>
          </button>

          <motion.button
            onClick={handleNext}
            disabled={!isCurrentStepValid() || isLoading}
            className={`w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 ${
              isCurrentStepValid() && !isLoading
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            whileHover={isCurrentStepValid() && !isLoading ? { scale: 1.05 } : {}}
            whileTap={isCurrentStepValid() && !isLoading ? { scale: 0.95 } : {}}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Setting up...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Setup;