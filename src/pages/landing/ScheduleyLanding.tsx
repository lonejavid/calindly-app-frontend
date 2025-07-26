import { useState, useEffect } from 'react';
import { Calendar,Shield,Linkedin, Mail, Clock, CheckCircle, ArrowRight, Zap, Filter, Users, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "@/routes/common/routePaths";


const ScheduleyLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Smart Email Filtering",
      description: "Automatically block bookings from public domain emails and validate addresses in real-time"
    },
    {
      icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Seamless Calendar Sync",
      description: "Connect with Google, Outlook, and other calendars for real-time availability updates"
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Flexible Scheduling Rules",
      description: "Set custom availability, buffer times, and meeting limits that work for you"
    },
    {
      icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Automated Communications",
      description: "Professional confirmations, reminders, and cancellation notifications"
    }
  ];

  const benefits = [
    "Block spam and irrelevant meetings",
    "Verify email authenticity automatically",
    "Reduce calendar clutter by 90%",
    "Focus on qualified leads only",
    "Save 5+ hours per week",
    "Professional branded experience"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements - Adjusted for mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-30 h-30 sm:w-60 sm:h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>


      <nav className={`relative z-50 p-4 sm:p-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Schedley
            </span>
          </div>
          
          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
            <a href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-300">Benefits</a>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"   onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
              Get Started
            </button>
            <Linkedin className="w-6 h-6" />
          </div> */}
          <div className="hidden md:flex items-center space-x-8">
  <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
  <a href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-300">Benefits</a>
  <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg" onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
    Get Started
  </button>
  <a 
    href="https://www.linkedin.com/jobs/view/software-engineer-at-schedley-com-4271146349/?originalSubdomain=in" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
  >
    <Linkedin className="w-6 h-6" />
  </a>
</div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Benefits</a>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center"  onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative z-10 pt-8 sm:pt-20 pb-16 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 sm:mb-8 border border-white/20">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400" />
              <span className="text-xs sm:text-sm">Smart Scheduling Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Filter Out the Noise,
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Focus on What Matters
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Schedley eliminates spam bookings, validates emails in real-time, and ensures only qualified 
              professionals can access your calendar. Reclaim your time and focus on meaningful meetings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <button className="group bg-gradient-to-r from-purple-500 to-pink-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center"    onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 w-full sm:w-auto">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Visual - Mobile Optimized */}
          <div className={`mt-12 sm:mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative max-w-4xl mx-auto px-4">
              <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/20">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full mr-2 sm:mr-3"></div>
                      <span className="text-xs sm:text-sm text-red-300">Blocked</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 break-all">meeting@gmail.com</p>
                    <p className="text-xs text-red-400 mt-1 sm:mt-2">Public domain blocked</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-500/20">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full mr-2 sm:mr-3"></div>
                      <span className="text-xs sm:text-sm text-yellow-300">Validating</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 break-all">temp@tempmail.org</p>
                    <p className="text-xs text-yellow-400 mt-1 sm:mt-2">Checking validity...</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/20">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 sm:mr-3"></div>
                      <span className="text-xs sm:text-sm text-green-300">Approved</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 break-all">john@company.com</p>
                    <p className="text-xs text-green-400 mt-1 sm:mt-2">Meeting scheduled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section id="features" className="py-16 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent px-4">
              Powerful Features
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Advanced scheduling technology that puts you in control
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${activeFeature === index ? 'border-purple-500/50 scale-105' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
                onClick={() => setActiveFeature(index)}
              >
                <div className="text-purple-400 mb-4 sm:mb-6 group-hover:text-purple-300 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Mobile Optimized */}
      <section id="benefits" className="py-16 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Why Professionals Choose Schedley
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12">
                Join thousands of professionals who have eliminated calendar spam and improved their productivity.
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 sm:space-x-4 group hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="text-base sm:text-lg text-gray-300 group-hover:text-white transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                      <span className="text-sm sm:text-base font-semibold">Spam Filtered</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-green-400">847</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      <span className="text-sm sm:text-base font-semibold">Quality Meetings</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-blue-400">156</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      <span className="text-sm sm:text-base font-semibold">Hours Saved</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-green-400">23.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-16 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Ready to Reclaim Your Calendar?
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join thousands of professionals who have eliminated spam bookings and improved their productivity with Schedley.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-purple-500 to-pink-500 px-8 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center"   onClick={() => navigate("/start")}>
                Start Your Free Trial
                <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="text-xs sm:text-sm text-gray-400 text-center">
                No credit card required • 14-day free trial
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Schedley
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 text-gray-400 text-sm sm:text-base text-center">
              <span>www.schedley.com</span>
              <span className="hidden sm:block">•</span>
              <a href="mailto:notifications@schedley.com" className="hover:text-white transition-colors duration-300 break-all">
                notifications@schedley.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScheduleyLanding;