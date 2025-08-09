import { useState, useRef } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 

  Globe, 
  Star, 
  CheckCircle, 
  X, 
  Upload, 
  FileText,

  Rocket,

  Award,
  Coffee,
  Heart,

  TrendingUp
} from 'lucide-react';

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    experience: '',
    resume: null
  });
  const fileInputRef = useRef(null);

  const jobRoles = [
    {
      id: 1,
      title: "Software Engineer",
      department: "Engineering",
      location: "Remote / Hubballi, India",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹8-15 LPA",
      description: "The ideal candidate will be responsible for developing high-quality applications. They will also be responsible for designing and implementing testable and scalable code.",
      responsibilities: [
        "Develop quality software and web applications",
        "Analyze and maintain existing software applications", 
        "Design highly scalable, testable code",
        "Discover and fix programming bugs",
        "Collaborate with cross-functional teams",
        "Participate in code reviews and technical discussions"
      ],
      qualifications: [
        "Bachelor's degree or equivalent experience in Computer Science or related field",
        "Development experience with programming languages (JavaScript, Python, Java)",
        "SQL database or relational database skills",
        "Experience with modern frameworks (React, Node.js, etc.)",
        "Strong problem-solving and debugging skills",
        "Excellent communication and teamwork abilities"
      ],
      skills: ["JavaScript", "React", "Node.js", "SQL", "Git", "AWS"]
    },
    {
      id: 2,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote / Hubballi, India",
      type: "Full-time",
      experience: "1-4 years",
      salary: "₹6-12 LPA",
      description: "Join our frontend team to create beautiful, intuitive user interfaces for our scheduling platform. You'll work with modern technologies to deliver exceptional user experiences.",
      responsibilities: [
        "Build responsive and interactive web applications",
        "Implement pixel-perfect designs from Figma mockups",
        "Optimize applications for maximum speed and scalability",
        "Collaborate with UX/UI designers and backend developers",
        "Write clean, maintainable, and testable code",
        "Stay updated with latest frontend technologies and trends"
      ],
      qualifications: [
        "Bachelor's degree in Computer Science or equivalent experience",
        "Strong proficiency in HTML, CSS, and JavaScript",
        "Experience with React.js and modern frontend frameworks",
        "Knowledge of responsive design and cross-browser compatibility",
        "Familiarity with version control systems (Git)",
        "Understanding of RESTful APIs and asynchronous programming"
      ],
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux", "Figma"]
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Hubballi, India",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹12-20 LPA",
      description: "Lead product strategy and development for Schedley's intelligent scheduling platform. Drive product vision, roadmap, and work closely with engineering and design teams.",
      responsibilities: [
        "Define and execute product strategy and roadmap",
        "Conduct market research and competitive analysis",
        "Gather and prioritize product requirements from stakeholders",
        "Work closely with engineering teams to deliver features",
        "Analyze product metrics and user feedback",
        "Collaborate with marketing and sales teams for product launches"
      ],
      qualifications: [
        "Bachelor's/Master's degree in Business, Engineering, or related field",
        "3+ years of product management experience in SaaS companies",
        "Strong analytical and problem-solving skills",
        "Experience with product management tools (Jira, Figma, Analytics)",
        "Excellent communication and leadership abilities",
        "Understanding of agile development methodologies"
      ],
      skills: ["Product Strategy", "Analytics", "Jira", "Figma", "SQL", "A/B Testing"]
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote / Hubballi, India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹5-10 LPA",
      description: "Drive growth and brand awareness for Schedley through digital marketing campaigns, content creation, and strategic partnerships.",
      responsibilities: [
        "Develop and execute digital marketing strategies",
        "Create compelling content for blogs, social media, and campaigns",
        "Manage SEO/SEM campaigns and optimize for conversions",
        "Analyze marketing metrics and prepare performance reports",
        "Collaborate with sales team for lead generation",
        "Build and maintain brand presence across multiple channels"
      ],
      qualifications: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "2+ years of digital marketing experience",
        "Proficiency in marketing tools (Google Analytics, HubSpot, etc.)",
        "Strong writing and communication skills",
        "Experience with social media marketing and content creation",
        "Understanding of B2B SaaS marketing strategies"
      ],
      skills: ["Digital Marketing", "Content Creation", "SEO", "Google Analytics", "HubSpot", "Social Media"]
    }
  ];

  const benefits = [
    { icon: <Rocket className="w-6 h-6" />, title: "Equity Participation", desc: "Share in company success with stock options" },
    { icon: <Globe className="w-6 h-6" />, title: "Remote-First Culture", desc: "Work from anywhere with flexible hours" },
    { icon: <Award className="w-6 h-6" />, title: "Learning Budget", desc: "₹50,000 annual budget for courses and conferences" },
    { icon: <Heart className="w-6 h-6" />, title: "Health Insurance", desc: "Comprehensive medical coverage for you and family" },
    { icon: <Coffee className="w-6 h-6" />, title: "Unlimited PTO", desc: "Take time off when you need it most" },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Career Growth", desc: "Fast-track career advancement opportunities" }
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, resume: file }));
    } else {
      alert('Please upload a PDF file only');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Application submitted:', { ...formData, jobTitle: selectedJob?.title });
    alert('Application submitted successfully! We\'ll get back to you soon.');
    setShowApplicationForm(false);
    setFormData({ name: '', email: '', country: '', experience: '', resume: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 pt-20 pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <Briefcase className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-sm">Join Our Mission</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Build the Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Intelligent Scheduling
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join Schedley and help millions of professionals worldwide optimize their time, 
              eliminate scheduling chaos, and focus on what matters most. We're building the future 
              of calendar management with cutting-edge AI and innovative technology.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-purple-400" />
                <span>50+ Team Members</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-purple-400" />
                <span>Remote-First Culture</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-purple-400" />
                <span>Fast Growing Startup</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Why Work at Schedley?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We believe in creating an environment where talented individuals can thrive and make a meaningful impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 transform">
                <div className="text-purple-400 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-800/50 to-purple-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Open Positions
            </h2>
            <p className="text-xl text-gray-400">
              Find your perfect role and join our growing team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobRoles.map((job) => (
              <div key={job.id} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 transform">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-400">{job.salary}</div>
                    <div className="text-sm text-gray-400">{job.experience}</div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="flex-1 px-6 py-3 border border-white/30 rounded-full hover:border-white/50 transition-all duration-300 hover:bg-white/10 text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleApply(job)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 font-semibold"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && !showApplicationForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedJob.title}</h2>
                  <div className="flex flex-wrap gap-4 text-gray-400">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span>{selectedJob.department}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{selectedJob.type}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">About the Job</h3>
                <p className="text-gray-300 leading-relaxed">{selectedJob.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Responsibilities</h3>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Qualifications</h3>
                <ul className="space-y-2">
                  {selectedJob.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <Star className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 px-6 py-3 border border-white/30 rounded-full hover:border-white/50 transition-all duration-300 hover:bg-white/10"
                >
                  Close
                </button>
                <button
                  onClick={() => handleApply(selectedJob)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Apply for this Position
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Apply for {selectedJob?.title}</h2>
                  <p className="text-gray-400">Fill out the form below to submit your application</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                    required
                  >
                    <option value="" className="bg-slate-800">Select your country</option>
                    <option value="India" className="bg-slate-800">India</option>
                    <option value="United States" className="bg-slate-800">United States</option>
                    <option value="Canada" className="bg-slate-800">Canada</option>
                    <option value="United Kingdom" className="bg-slate-800">United Kingdom</option>
                    <option value="Australia" className="bg-slate-800">Australia</option>
                    <option value="Germany" className="bg-slate-800">Germany</option>
                    <option value="Other" className="bg-slate-800">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Years of Experience *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                    required
                  >
                    <option value="" className="bg-slate-800">Select experience level</option>
                    <option value="0-1 years" className="bg-slate-800">0-1 years (Entry Level)</option>
                    <option value="1-3 years" className="bg-slate-800">1-3 years (Junior)</option>
                    <option value="3-5 years" className="bg-slate-800">3-5 years (Mid-Level)</option>
                    <option value="5-8 years" className="bg-slate-800">5-8 years (Senior)</option>
                    <option value="8+ years" className="bg-slate-800">8+ years (Expert)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Resume (PDF only) *</label>
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg hover:border-purple-500 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      {formData.resume ? formData.resume.name : 'Upload your resume (PDF)'}
                    </button>
                  </div>
                  {formData.resume && (
                    <div className="mt-2 flex items-center text-green-400 text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      <span>File uploaded successfully</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 px-6 py-3 border border-white/30 rounded-full hover:border-white/50 transition-all duration-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;