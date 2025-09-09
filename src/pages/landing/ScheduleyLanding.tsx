
import { useState, useEffect } from 'react';
import { Calendar, Shield, Linkedin, CheckCircle, ArrowRight, Zap, Users, Menu, X, Star, Award, TrendingUp, Rocket, Target, BarChart, Lock, MessageCircle, UserCheck, Mail, Phone, DollarSign, Headphones, RefreshCw, Play, Settings, ExternalLink } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "@/routes/common/routePaths";

import mylogo from "../../../mylogo.png";

const ScheduleyLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ blocked: 0, qualified: 0, hours: 0, clients: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate statistics
    const statsInterval = setInterval(() => {
      setAnimatedStats(prev => ({
        blocked: Math.min(prev.blocked + 127, 15847),
        qualified: Math.min(prev.qualified + 23, 2847),
        hours: Math.min(prev.hours + 2.1, 287.3),
        clients: Math.min(prev.clients + 5, 634)
      }));
    }, 50);

    setTimeout(() => clearInterval(statsInterval), 3000);

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const navigate = useNavigate();

  // Handle external demo booking
  const handleBookDemo = () => {
    window.open('https://www.schedley.com/lonejavida829/schedley-demo-see-how-client-acquisition-works-9040', '_blank');
  };

  // Handle setup navigation
  const handleSetupAI = () => {
    console.log("before ");
    navigate(AUTH_ROUTES.SETUPAI);
    console.log("After");
  };

  // Updated features reflecting actual Schedley capabilities
  const features = [
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "AI-Powered Real-Time Email Validation",
      description: "Advanced AI filters and validates every booking request instantly. Blocks public domains, fake emails, and suspicious accounts automatically - ensuring only serious prospects reach your calendar.",
      highlight: "99.7% Accuracy",
      badge: "CORE FEATURE"
    },
    {
      icon: <UserCheck className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Done-For-You Client Acquisition",
      description: "Our dedicated lead generation team identifies, contacts, and qualifies prospects that match your ideal client profile. We don't just organize schedules - we fill them with revenue opportunities.",
      highlight: "Human-Powered",
      badge: "UNIQUE VALUE"
    },
    {
      icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Smart Event Management",
      description: "Create professional events with detailed agendas. Auto-generated Google Meet links, calendar sync, and email confirmations eliminate manual work while maintaining a premium client experience.",
      highlight: "Fully Automated",
      badge: "SEAMLESS"
    },
    {
      icon: <Headphones className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Dedicated Account Management",
      description: "Each client receives a personal account manager who optimizes booking flows, troubleshoots issues, and maximizes lead quality. You're never left alone - our team works alongside yours.",
      highlight: "Personal Support",
      badge: "PREMIUM SERVICE"
    },
    {
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Qualified Lead Guarantee",
      description: "Only prospects that fit your company's ideal client profile are invited to book. Our outreach automation combined with human qualification ensures every meeting has revenue potential.",
      highlight: "Quality Guaranteed",
      badge: "RESULTS DRIVEN"
    },
    {
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "7-Day Success Guarantee",
      description: "Get your first high-ticket client booked in 7 days or pay nothing. 100% refund with no questions asked. We're as invested in your growth as you are - completely risk-free.",
      highlight: "Risk-Free",
      badge: "GUARANTEED"
    }
  ];

  // Trust-building benefits
  const benefits = [
    { text: "Zero spam or fake meeting requests guaranteed", icon: <Shield className="w-4 h-4" /> },
    { text: "Qualified prospects delivered to your calendar", icon: <UserCheck className="w-4 h-4" /> },
    { text: "Dedicated team working for your success", icon: <Users className="w-4 h-4" /> },
    { text: "Professional corporate email filtering only", icon: <Mail className="w-4 h-4" /> },
    { text: "First high-ticket client in 7 days or full refund", icon: <DollarSign className="w-4 h-4" /> },
    { text: "Personal account manager assigned to you", icon: <Headphones className="w-4 h-4" /> },
    { text: "Real human support, not just software", icon: <MessageCircle className="w-4 h-4" /> },
    { text: "Risk-free growth with money-back guarantee", icon: <CheckCircle className="w-4 h-4" /> }
  ];

  // Updated testimonials to reflect actual value
  const testimonials = [
    {
      name: "David Chen",
      role: "Sales Director",
      company: "TechCorp Solutions",
      content: "Schedley didn't just organize my calendar - they filled it with qualified leads. Got 3 high-value clients in the first week. The human touch makes all the difference.",
      rating: 5,
      result: "3 clients in 7 days"
    },
    {
      name: "Maria Rodriguez",
      role: "Business Consultant",
      company: "Growth Partners LLC",
      content: "Finally, a scheduling platform that actually brings me clients! The AI filtering is incredible - zero spam, only serious prospects. My productivity has doubled.",
      rating: 5,
      result: "$45K in new contracts"
    },
    {
      name: "James Thompson",
      role: "Founder",
      company: "StartupLabs",
      content: "The guarantee sold me, but the results keep me. My account manager understands my business better than most of my employees. This is partnership, not just software.",
      rating: 5,
      result: "ROI: 340%"
    }
  ];

  // How it works steps
  const howItWorks = [
    {
      step: "1",
      title: "Create Your Events",
      description: "Set up professional events with detailed descriptions, agendas, and purposes. Get your unique booking link instantly.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      step: "2", 
      title: "AI Validates Every Request",
      description: "Our advanced AI filters out spam, fake emails, and public domains in real-time. Only verified professional leads get through.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      step: "3",
      title: "We Find Your Ideal Clients",
      description: "Our dedicated team identifies and contacts prospects matching your ideal client profile. Human-powered outreach, not just automation.",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Qualified Meetings Delivered",
      description: "Only pre-qualified prospects that fit your criteria book meetings. Every slot on your calendar becomes a revenue opportunity.",
      icon: <Target className="w-6 h-6" />
    }
  ];

  const useCases = [
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Sales Teams",
      description: "Fill your pipeline with qualified leads, not empty bookings"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Consultants",
      description: "Professional client acquisition with guaranteed results"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Business Owners",
      description: "Scale your business with dedicated lead generation support"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Entrepreneurs",
      description: "Focus on closing deals while we find your next clients"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-30 h-30 sm:w-60 sm:h-60 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Navigation */}
      <nav className={`relative z-50 p-4 sm:p-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src={mylogo}
                alt="Schedley - Intelligent Scheduling & Client Acquisition Platform"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Schedley
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => navigate('/carrer')} 
              className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Careers
            </button>
            <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">How It Works</a>
            <a href="#guarantee" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Guarantee</a>
            
            {/* New Action Buttons */}
            <button 
              onClick={handleBookDemo}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-full transition-all duration-300 transform hover:scale-105 font-semibold text-sm shadow-lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Book Demo
              <ExternalLink className="w-3 h-3 ml-2 opacity-70" />
            </button>
            
            <button 
              onClick={handleSetupAI}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-full transition-all duration-300 transform hover:scale-105 font-semibold text-sm shadow-lg"
            >
              <Settings className="w-4 h-4 mr-2" />
              Set Up Your AI
            </button>
            
            <button className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold text-sm" onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
              Create Your Own Booking Link
            </button>
            
            <a 
              href="https://www.linkedin.com/company/schedley-com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-xl border-t border-white/10 p-6 shadow-2xl">
            <div className="flex flex-col space-y-6">
              <button 
                onClick={() => {
                  navigate('/carrer');
                  setMobileMenuOpen(false);
                }} 
                className="text-gray-300 hover:text-white transition-colors duration-300 py-2 text-left"
              >
                Careers
              </button>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#guarantee" className="text-gray-300 hover:text-white transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Guarantee</a>
              <a 
                href="https://www.linkedin.com/company/schedley-com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300 py-2 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Linkedin className="w-5 h-5 mr-3" />
                LinkedIn
              </a>
              
              {/* Mobile Action Buttons */}
              <button 
                onClick={() => {
                  handleBookDemo();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-full font-semibold transition-all duration-300"
              >
                <Play className="w-4 h-4 mr-2" />
                Book Demo
                <ExternalLink className="w-3 h-3 ml-2 opacity-70" />
              </button>
              
              <button 
                onClick={() => {
                  handleSetupAI();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center w-full bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 rounded-full font-semibold transition-all duration-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Set Up Your AI
              </button>
              
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center font-semibold"  onClick={() => {
                navigate(AUTH_ROUTES.SIGN_IN);
                setMobileMenuOpen(false);
              }}>
                Create Your Own Booking Link Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Trust Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-full mb-8 border border-emerald-500/40 shadow-2xl">
              <CheckCircle className="w-4 h-4 mr-3 text-emerald-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                ✅ 7-Day Client Guarantee • 100% Money-Back Promise • Zero Risk
              </span>
              <Shield className="w-4 h-4 ml-3 text-emerald-400" />
            </div>
            
            <h5 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent block">
                The World's First
              </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent block">
                Intelligent Scheduling
              </span>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent block">
                & Client Acquisition
              </span>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
                Platform
              </span>
            </h5>
       
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 sm:mb-12 max-w-5xl mx-auto leading-relaxed font-medium">
              We don't just manage your schedule - <strong className="text-white">we help you book high-value meetings.</strong><br />
              <strong className="text-purple-300">AI-powered spam protection</strong> + <strong className="text-emerald-300">dedicated client acquisition team</strong> = <strong className="text-yellow-300">guaranteed results</strong>
            </p>
            
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-4xl mx-auto">
              Get your <strong className="text-white">first high-ticket client booked in 7 days</strong> or pay nothing. 
              Our unique combination of AI technology and human expertise eliminates spam while delivering 
              <strong className="text-emerald-300"> revenue-ready prospects</strong> directly to your calendar.
            </p>
            
            {/* Enhanced CTA Buttons Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button className="group bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 px-8 py-4 rounded-full text-lg font-bold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center shadow-purple-500/25 shadow-2xl border-2 border-purple-400/50" onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
                <UserCheck className="mr-3 w-5 h-5" />
                Get Your First Client
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button 
                onClick={handleBookDemo}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center shadow-blue-500/25 shadow-2xl border-2 border-blue-400/50"
              >
                <Play className="mr-3 w-5 h-5" />
                Watch Live Demo
                <ExternalLink className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={handleSetupAI}
                className="group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center shadow-emerald-500/25 shadow-2xl border-2 border-emerald-400/50"
              >
                <Settings className="mr-3 w-5 h-5" />
                Set Up Your AI
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="text-sm font-bold text-emerald-400 mb-1">🎯 7-Day Success Guarantee</div>
              <div className="text-sm text-gray-400">First client or 100% refund</div>
            </div>

            {/* Value Propositions */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-300 mb-8">
              <div className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/20">
                <Shield className="w-4 h-4 mr-2 text-blue-400" />
                AI Spam Protection
              </div>
              <div className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/20">
                <Users className="w-4 h-4 mr-2 text-purple-400" />
                Human Lead Generation
              </div>
              <div className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/20">
                <DollarSign className="w-4 h-4 mr-2 text-emerald-400" />
                Guaranteed Results
              </div>
              <div className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/20">
                <Headphones className="w-4 h-4 mr-2 text-pink-400" />
                Personal Support
              </div>
            </div>
          </div>

          {/* Hero Visual - Updated */}
          <div className={`mt-16 sm:mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative max-w-6xl mx-auto px-4">
              <div className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">Live Platform Activity</h3>
                  <p className="text-sm text-gray-400">Real-time filtering and client acquisition in action</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-red-500/30 to-red-600/20 rounded-2xl p-6 border border-red-500/30 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-sm font-semibold text-red-300">BLOCKED</span>
                      </div>
                      <Shield className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-sm text-gray-300 mb-2 font-mono">spam@gmail.com</p>
                    <p className="text-xs text-red-400 bg-red-500/20 px-3 py-1 rounded-full">Public domain detected</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 rounded-2xl p-6 border border-yellow-500/30 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-spin"></div>
                        <span className="text-sm font-semibold text-yellow-300">QUALIFYING</span>
                      </div>
                      <Users className="w-5 h-5 text-yellow-400" />
                    </div>
                    <p className="text-sm text-gray-300 mb-2 font-mono">lead@enterprise.co</p>
                    <p className="text-xs text-yellow-400 bg-yellow-500/20 px-3 py-1 rounded-full">Human verification...</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-2xl p-6 border border-blue-500/30 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-sm font-semibold text-blue-300">OUTREACH</span>
                      </div>
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-sm text-gray-300 mb-2 font-mono">Contacting prospects</p>
                    <p className="text-xs text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">AI + Human team</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-2xl p-6 border border-green-500/30 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm font-semibold text-green-300">BOOKED</span>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-sm text-gray-300 mb-2 font-mono">cto@techfirm.com</p>
                    <p className="text-xs text-green-400 bg-green-500/20 px-3 py-1 rounded-full">High-value prospect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Dashboard - Updated */}
      <section className="py-16 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              🔥 Platform Performance This Month
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-red-400 mb-2">
                  {animatedStats.blocked.toLocaleString()}+
                </div>
                <div className="text-gray-300 font-semibold text-sm">Spam Requests Blocked</div>
                <div className="text-xs text-gray-500 mt-1">AI Protection Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-green-400 mb-2">
                  {animatedStats.qualified.toLocaleString()}+
                </div>
                <div className="text-gray-300 font-semibold text-sm">Qualified Leads Delivered</div>
                <div className="text-xs text-gray-500 mt-1">Human-Verified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-blue-400 mb-2">
                  {animatedStats.hours.toFixed(1)}K+
                </div>
                <div className="text-gray-300 font-semibold text-sm">Hours Saved</div>
                <div className="text-xs text-gray-500 mt-1">No Spam Meetings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-purple-400 mb-2">
                  {animatedStats.clients}+
                </div>
                <div className="text-gray-300 font-semibold text-sm">Clients Acquired</div>
                <div className="text-xs text-gray-500 mt-1">High-Ticket Sales</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mb-6 border border-blue-500/30">
              <Zap className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">Simple 4-Step Process</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              How Schedley Transforms Your Business
            </h2>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto">
              Unlike traditional scheduling tools, we combine <strong className="text-white">AI technology</strong> with 
              <strong className="text-purple-300"> human expertise</strong> to deliver qualified clients, not just organized calendars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 z-10"></div>
                )}
                
                <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">
                    {step.step}
                  </div>
                  
                  <div className="text-purple-400 mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-6 border border-purple-500/30">
              <Award className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300">What Makes Us Different</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Beyond Traditional Scheduling
            </h2>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto">
              We're not just another calendar tool. We're a complete <strong className="text-white">client acquisition system</strong> 
              that combines cutting-edge AI with dedicated human support to guarantee your success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden ${activeFeature === index ? 'border-purple-500/50 scale-105 shadow-2xl' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
                onClick={() => setActiveFeature(index)}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                
                {/* Feature Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full border border-emerald-500/30">
                    {feature.badge}
                  </span>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300 transform group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <div className="text-xs font-bold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                      {feature.highlight}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-purple-400 group-hover:text-purple-300 font-semibold text-sm">
                    Learn More 
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section id="guarantee" className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-500/20 via-green-500/15 to-emerald-500/20 backdrop-blur-2xl rounded-3xl p-12 sm:p-20 border border-emerald-500/30 shadow-2xl text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-full mb-8 border border-emerald-400/40">
              <Shield className="w-5 h-5 mr-3 text-emerald-400" />
              <span className="font-bold text-emerald-300">ZERO-RISK GUARANTEE</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-black mb-8 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Get Your First High-Ticket Client in 7 Days
            </h2>
            
            <p className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-8">
              Or Pay Nothing. Guaranteed.
            </p>
            
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              We're so confident in our system that we offer the strongest guarantee in the market. 
              If Schedley doesn't bring you a qualified client booking in your first 7 days, 
              we provide a <strong className="text-white">100% refund with no questions asked</strong>.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Questions Asked</h3>
                <p className="text-gray-300">Simple refund process within 7 days</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <RefreshCw className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Quick Processing</h3>
                <p className="text-gray-300">Refunds processed within 7-10 business days</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <Lock className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">100% Secure</h3>
                <p className="text-gray-300">No hidden clauses or fine print</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 px-12 py-5 rounded-full text-xl font-black hover:from-emerald-700 hover:to-green-600 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center shadow-emerald-500/25 shadow-2xl" onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
                <DollarSign className="mr-3 w-6 h-6" />
                Claim Your Guarantee Now
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button 
                onClick={handleBookDemo}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-5 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center shadow-blue-500/25 shadow-2xl"
              >
                <Play className="mr-3 w-5 h-5" />
                See How It Works
                <ExternalLink className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full mb-6 border border-emerald-500/30">
                <TrendingUp className="w-4 h-4 mr-2 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">Proven Results</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                More Than Just a Scheduling Tool
              </h2>
              
              <p className="text-xl sm:text-2xl text-gray-400 mb-12 leading-relaxed">
                Experience the power of <strong className="text-white">intelligent client acquisition</strong>. 
                We eliminate the guesswork and deliver <strong className="text-emerald-300">qualified prospects</strong> 
                ready to do business with you.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 group hover:translate-x-3 transition-all duration-300 bg-gradient-to-r from-transparent hover:from-white/5 hover:to-transparent rounded-xl p-3 -ml-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <span className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-purple-400 mr-3" />
                  <span className="text-lg font-bold text-white">Dedicated Human Support</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Unlike pure software solutions, each client gets a dedicated account manager who works 
                  alongside your team to optimize results and ensure your success.
                </p>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Client Success Dashboard</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl border border-red-500/30">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-6 h-6 text-red-400" />
                      <span className="font-bold text-white">Spam Eliminated</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-red-400">100%</span>
                      <div className="text-xs text-red-300">Zero fake bookings</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30">
                    <div className="flex items-center space-x-3">
                      <UserCheck className="w-6 h-6 text-blue-400" />
                      <span className="font-bold text-white">Lead Quality</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-blue-400">98.5%</span>
                      <div className="text-xs text-blue-300">Verified prospects</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-6 h-6 text-green-400" />
                      <span className="font-bold text-white">Success Rate</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-green-400">94.2%</span>
                      <div className="text-xs text-green-300">7-day guarantee met</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-white">Client Satisfaction</span>
                      <span className="text-2xl font-black text-purple-400">4.9/5</span>
                    </div>
                    <div className="flex space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-300">"Finally found clients, not just appointments"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Perfect For Revenue-Focused Professionals
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Join industry leaders who transformed their business with guaranteed client acquisition
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 text-center">
                <div className="text-purple-400 mb-4 flex justify-center">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">{useCase.title}</h3>
                <p className="text-gray-400 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Real Results from Real Clients
            </h2>
            <p className="text-lg text-gray-400">Success stories from professionals who got their guarantee fulfilled</p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl sm:text-2xl text-gray-300 mb-8 italic leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="mb-6">
                <div className="font-bold text-white text-lg">{testimonials[currentTestimonial].name}</div>
                <div className="text-purple-300">{testimonials[currentTestimonial].role}</div>
                <div className="text-gray-400 text-sm">{testimonials[currentTestimonial].company}</div>
                <div className="text-emerald-400 font-bold text-sm mt-2 bg-emerald-500/20 px-3 py-1 rounded-full inline-block">
                  ✅ {testimonials[currentTestimonial].result}
                </div>
              </div>
              
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-purple-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-10 sm:p-16 border border-white/30 shadow-2xl relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-8 border border-yellow-500/30">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="font-bold text-yellow-300">Ready to Get Your First Client?</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Stop Organizing Empty Calendars.
                <br />Start Filling Them with Revenue.
              </h2>
              
              <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
                Join the businesses who chose <strong className="text-white">guaranteed results</strong> over empty promises. 
                Get your <strong className="text-emerald-300">first client in 7 days</strong> or pay nothing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <button className="group bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 px-10 py-5 rounded-full text-xl font-black hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center shadow-purple-500/25 shadow-2xl border-2 border-purple-400/50" onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
                  <UserCheck className="mr-3 w-6 h-6" />
                  Get Your First Client Now
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <button 
                  onClick={handleSetupAI}
                  className="group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-10 py-5 rounded-full text-xl font-black transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center shadow-emerald-500/25 shadow-2xl border-2 border-emerald-400/50"
                >
                  <Settings className="mr-3 w-6 h-6" />
                  Set Up Your AI
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <button 
                  onClick={handleBookDemo}
                  className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-10 py-5 rounded-full text-xl font-black transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center w-full sm:w-auto justify-center shadow-blue-500/25 shadow-2xl border-2 border-blue-400/50"
                >
                  <Play className="mr-3 w-6 h-6" />
                  Watch Demo
                  <ExternalLink className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-sm text-emerald-400 font-bold mb-1">🎯 7-Day Success Guarantee</div>
                <div className="text-sm text-gray-400">✅ 100% Money-Back Promise</div>
              </div>
              
              {/* Trust Elements */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-gray-400">
                <div className="flex items-center justify-center">
                  <Shield className="w-4 h-4 mr-2 text-emerald-400" />
                  Zero Risk Trial
                </div>
                <div className="flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2 text-purple-400" />
                  Human Support
                </div>
                <div className="flex items-center justify-center">
                  <DollarSign className="w-4 h-4 mr-2 text-yellow-400" />
                  Guaranteed ROI
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Proven Results
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-4 sm:px-6 border-t border-white/10 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-2xl">
                  <img
                    src={mylogo}
                    alt="Schedley - Intelligent Scheduling & Client Acquisition Platform"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  Schedley
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                The world's first intelligent scheduling and client acquisition platform. 
                AI-powered spam protection plus human-driven lead generation with guaranteed results.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/company/schedley-com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Platform Links */}
            <div>
              <h3 className="font-bold text-white mb-4">Platform</h3>
              <div className="space-y-3">
                <a href="#features" className="block text-gray-400 hover:text-white transition-colors duration-300">Features</a>
                <a href="#how-it-works" className="block text-gray-400 hover:text-white transition-colors duration-300">How It Works</a>
                <a href="#guarantee" className="block text-gray-400 hover:text-white transition-colors duration-300">Guarantee</a>
                <button onClick={() => navigate('/carrer')} className="block text-gray-400 hover:text-white transition-colors duration-300 text-left">Careers</button>
                <button onClick={handleBookDemo} className="block text-gray-400 hover:text-white transition-colors duration-300 text-left flex items-center">
                  Book Demo <ExternalLink className="w-3 h-3 ml-1" />
                </button>
                <button onClick={handleSetupAI} className="block text-gray-400 hover:text-white transition-colors duration-300 text-left">Set Up AI</button>
              </div>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <div className="space-y-3">
                <button onClick={() => navigate('/privacy')} className="block text-gray-400 hover:text-white transition-colors duration-300 text-left">Privacy Policy</button>
                <button onClick={() => navigate('/terms')} className="block text-gray-400 hover:text-white transition-colors duration-300 text-left">Terms of Service</button>
                <a href="mailto:notifications@schedley.com" className="block text-gray-400 hover:text-white transition-colors duration-300">Support</a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 text-gray-400 text-sm">
              <span>© 2024 Schedley.com - All rights reserved</span>
              <span className="hidden sm:block">•</span>
              <span>Intelligent Scheduling & Client Acquisition Platform</span>
              <span className="hidden sm:block">•</span>
              <span>notification@schedley.com</span>
            </div>
            
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                7-Day Guarantee Active
              </div>
            </div>
          </div>
          
          {/* SEO Footer Content */}
          <div className="mt-8 pt-8 border-t border-white/10 text-xs text-gray-500 leading-relaxed">
            <p>
              <strong>Schedley</strong> - The World's First Intelligent Scheduling & Client Acquisition Platform | 
              AI-Powered Spam Protection | Real-Time Email Validation | Done-For-You Lead Generation | 
              Dedicated Account Management | 7-Day Client Guarantee | Professional Meeting Management | 
              Human-Powered Outreach | Qualified Lead Delivery | Corporate Email Filtering | 
              Google Meet Integration | Calendar Sync | Zero-Risk Growth | High-Ticket Client Acquisition | 
              Enterprise Security | GDPR Compliant | Personal Account Manager | 100% Money-Back Guarantee | 
              Business Productivity | Revenue Optimization | Client Success Platform
            </p>
          </div>
        </div>
      </footer>
      
      
    </div>
  );
};

export default ScheduleyLanding;





