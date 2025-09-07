import React, { useState } from "react";

const Setup = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
      subtitle: "Help us understand your current sales approach",
      field: "sellingMethod",
      type: "select",
      icon: "💼",
      options: [
        "Direct Sales",
        "Resellers/Partners", 
        "Inbound Marketing",
        "Outbound Sales",
        "Online Marketplace",
        "Other"
      ]
    },
    {
      title: "Who is your ideal customer?",
      subtitle: "Tell us about your target market and customer profile",
      field: "icp",
      type: "textarea",
      icon: "🎯",
      placeholder: "e.g., Small to medium businesses in healthcare, Enterprise companies in fintech with 100+ employees..."
    },
    {
      title: "What product are you selling?",
      subtitle: "Give us a brief overview of your product or service",
      field: "productDescription", 
      type: "textarea",
      icon: "🚀",
      placeholder: "Describe your product, its key features, and what problems it solves..."
    },
    {
      title: "What's your pricing?",
      subtitle: "Help us understand your pricing structure",
      field: "pricing",
      type: "number",
      icon: "💰",
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
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSuccess(true);
      console.log("Setup Data:", formData);
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

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full mx-6 p-12 text-center border border-gray-100">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">All set! 🎉</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our team will carefully analyze your details and get back to you soon with personalized recommendations.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden border border-gray-100">
        
        {/* Progress Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Quick Setup</h2>
                <p className="text-sm text-gray-600">Just a few questions to get started</p>
              </div>
            </div>
            <div className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full">
              {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">{currentStepData.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {currentStepData.title}
            </h3>
            <p className="text-gray-600 text-lg">
              {currentStepData.subtitle}
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            {currentStepData.type === "select" ? (
              <div className="relative">
                <select
                  value={formData[currentStepData.field]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white appearance-none cursor-pointer hover:border-gray-300 transition-colors text-lg"
                >
                  <option value="">Choose an option</option>
                  {currentStepData.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ) : currentStepData.type === "textarea" ? (
              <textarea
                value={formData[currentStepData.field]}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentStepData.placeholder}
                rows={4}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 text-lg hover:border-gray-300 transition-colors"
              />
            ) : currentStepData.type === "number" ? (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-24 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg hover:border-gray-300 transition-colors"
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
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg hover:border-gray-300 transition-colors"
                  />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Don't worry, this helps us provide better recommendations
                </p>
              </div>
            ) : (
              <input
                type="text"
                value={formData[currentStepData.field]}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentStepData.placeholder}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg hover:border-gray-300 transition-colors"
              />
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t border-gray-100">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow"
            }`}
          >
            ← Previous
          </button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
              isCurrentStepValid()
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none transform-none"
            }`}
          >
            {currentStep === steps.length - 1 ? "Complete Setup →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setup;