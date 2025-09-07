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
      field: "sellingMethod",
      type: "select",
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
      title: "Who is your ICP (Ideal Customer Profile)?",
      field: "icp",
      type: "textarea",
      placeholder: "Describe your ideal customer (e.g., SMBs in healthcare, enterprise companies in fintech, etc.)"
    },
    {
      title: "Description of the product you are selling",
      field: "productDescription",
      type: "textarea",
      placeholder: "Tell us about your product or service..."
    },
    {
      title: "How much do you charge?",
      field: "pricing",
      type: "number",
      placeholder: "Enter your pricing"
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
      // Final step - show success message
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
    // This would typically update the user's approval status
    window.location.reload(); // For demo purposes
  };

  const isCurrentStepValid = () => {
    const currentField = steps[currentStep].field;
    const value = formData[currentField];
    return value && value.toString().trim() !== "";
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">
              Our team will carefully analyze the details and will get back to you.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">👋 Welcome! Let's get you set up</h2>
            <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {steps[currentStep].title}
            </h3>
            
            {steps[currentStep].type === "select" ? (
              <select
                value={formData[steps[currentStep].field]}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">Select an option</option>
                {steps[currentStep].options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : steps[currentStep].type === "textarea" ? (
              <textarea
                value={formData[steps[currentStep].field]}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={steps[currentStep].placeholder}
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            ) : steps[currentStep].type === "number" ? (
              <div className="flex gap-3">
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-24 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
                <input
                  type="number"
                  value={formData[steps[currentStep].field]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={steps[currentStep].placeholder}
                  className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ) : (
              <input
                type="text"
                value={formData[steps[currentStep].field]}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={steps[currentStep].placeholder}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isCurrentStepValid()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;