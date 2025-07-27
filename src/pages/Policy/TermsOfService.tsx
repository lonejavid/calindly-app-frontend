
import { Calendar, Scale, FileText, AlertTriangle, CheckCircle, Mail } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <nav className="relative z-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
             <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Schedley
            </span>
          </div>
          <a 
            href="/" 
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            Back to Home
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-purple-400" />
                  Agreement to Terms
                </h2>
                <p className="leading-relaxed">
                  Welcome to Schedley! These Terms of Service ("Terms") govern your use of our smart email filtering and calendar management service. By accessing or using Schedley, you agree to be bound by these Terms. If you disagree with any part of these terms, please do not use our service.
                </p>
              </section>

              {/* Service Description */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-purple-400" />
                  Service Description
                </h2>
                <p className="leading-relaxed mb-4">Schedley provides:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Smart email filtering to block spam bookings</li>
                  <li>Real-time email validation for meeting requests</li>
                  <li>Calendar management and scheduling optimization</li>
                  <li>Integration with Google Calendar and email services</li>
                  <li>Professional scheduling tools and analytics</li>
                </ul>
              </section>

              {/* User Accounts */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">User Accounts</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Account Creation</h3>
                    <p className="leading-relaxed">To use Schedley, you must:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Be at least 18 years old or have parental consent</li>
                      <li>Provide accurate and complete information</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Use a valid Google account for authentication</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Account Responsibility</h3>
                    <p className="leading-relaxed">You are responsible for:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>All activities that occur under your account</li>
                      <li>Maintaining the confidentiality of your login information</li>
                      <li>Notifying us immediately of any unauthorized access</li>
                      <li>Ensuring your contact information remains current</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Acceptable Use */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Acceptable Use Policy</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Permitted Uses</h3>
                    <p className="leading-relaxed">You may use Schedley for legitimate business and personal scheduling purposes in compliance with all applicable laws.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Prohibited Uses</h3>
                    <p className="leading-relaxed mb-2">You may NOT use Schedley to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Violate any laws or regulations</li>
                      <li>Send spam, unsolicited communications, or malicious content</li>
                      <li>Interfere with or disrupt our services or servers</li>
                      <li>Attempt to gain unauthorized access to other accounts</li>
                      <li>Use automated tools to access the service without permission</li>
                      <li>Impersonate others or provide false information</li>
                      <li>Engage in any activity that could harm our reputation</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Privacy and Data */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Privacy and Data Handling</h2>
                <p className="leading-relaxed mb-4">
                  Your privacy is important to us. By using Schedley, you consent to the collection and use of your information as described in our Privacy Policy. We will:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process your data only as necessary to provide our services</li>
                  <li>Implement appropriate security measures to protect your information</li>
                  <li>Not sell or rent your personal information to third parties</li>
                  <li>Allow you to access, update, and delete your data</li>
                </ul>
              </section>

              {/* Service Availability */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Service Availability</h2>
                <p className="leading-relaxed">
                  While we strive to maintain high service availability, we cannot guarantee uninterrupted access to Schedley. We may temporarily suspend service for maintenance, updates, or due to circumstances beyond our control. We will provide reasonable notice when possible.
                </p>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Our Rights</h3>
                    <p className="leading-relaxed">
                      Schedley and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Your Rights</h3>
                    <p className="leading-relaxed">
                      You retain ownership of any content you provide to Schedley. By using our service, you grant us a limited license to use your content solely to provide our services to you.
                    </p>
                  </div>
                </div>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Payment and Billing</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Subscription Plans</h3>
                    <p className="leading-relaxed">
                      Schedley offers various subscription plans with different features and limitations. Pricing is clearly displayed on our website and may change with reasonable notice.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Billing and Refunds</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Subscriptions are billed in advance on a monthly or annual basis</li>
                      <li>All fees are non-refundable except as required by law</li>
                      <li>You may cancel your subscription at any time</li>
                      <li>Service continues until the end of your current billing period</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
                  Limitation of Liability
                </h2>
                <p className="leading-relaxed mb-4">
                  To the maximum extent permitted by law, Schedley shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Service interruptions or security breaches</li>
                  <li>Errors in email filtering or calendar management</li>
                  <li>Third-party actions or content</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Our total liability to you for any claims shall not exceed the amount you paid for Schedley in the 12 months preceding the claim.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">By You</h3>
                    <p className="leading-relaxed">
                      You may terminate your account at any time by contacting us or using the account deletion feature in your settings.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">By Us</h3>
                    <p className="leading-relaxed">
                      We may terminate or suspend your account immediately if you violate these Terms or engage in prohibited activities. We will provide reasonable notice when possible.
                    </p>
                  </div>
                </div>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
                <p className="leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of Schedley after any changes constitutes acceptance of the new Terms.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
                <p className="leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of [Your Jurisdiction].
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-purple-400" />
                  Contact Us
                </h2>
                <p className="leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="font-medium text-white">Schedley Legal Team</p>
                  <p>Email: notification@schedley.com</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Schedley. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}