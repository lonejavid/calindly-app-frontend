import React from 'react';
import { Calendar, Shield, Lock, Eye, UserCheck, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-purple-400" />
                  Introduction
                </h2>
                <p className="leading-relaxed">
                  At Schedley, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our smart email filtering and calendar management service. Please read this privacy policy carefully.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <UserCheck className="w-6 h-6 mr-2 text-purple-400" />
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Personal Information</h3>
                    <p className="leading-relaxed">When you sign up for Schedley, we collect:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Name and email address (via Google OAuth)</li>
                      <li>Profile picture (if provided through Google)</li>
                      <li>Calendar data and scheduling preferences</li>
                      <li>Email filtering settings and rules</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Usage Information</h3>
                    <p className="leading-relaxed">We automatically collect:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Device information and browser type</li>
                      <li>IP address and location data</li>
                      <li>Usage patterns and feature interactions</li>
                      <li>Performance and error logs</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-2 text-purple-400" />
                  How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-4">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain our scheduling and email filtering services</li>
                  <li>Authenticate your identity and manage your account</li>
                  <li>Filter spam bookings and validate meeting requests</li>
                  <li>Send you important service notifications and updates</li>
                  <li>Improve our services and develop new features</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              {/* Information Sharing */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Information Sharing</h2>
                <p className="leading-relaxed mb-4">We do not sell, trade, or rent your personal information. We may share your information only in these limited circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                  <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
                <p className="leading-relaxed mb-4">We implement industry-standard security measures to protect your information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption in transit and at rest</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Secure data centers and infrastructure</li>
                </ul>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
                <p className="leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Update or correct your information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt-out of non-essential communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </section>

              {/* Cookies and Tracking */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking</h2>
                <p className="leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze usage patterns. You can control cookie settings through your browser preferences.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
                <p className="leading-relaxed">
                  We retain your information for as long as your account is active or as needed to provide services. When you delete your account, we will delete your personal information within 30 days, except where retention is required by law.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-purple-400" />
                  Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="font-medium text-white">Schedley Privacy Team</p>
                  <p>Email: privacy@schedley.com</p>
                  <p>Address: [Your Business Address]</p>
                </div>
              </section>

              {/* Updates */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Policy Updates</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of Schedley after any changes constitutes acceptance of the updated policy.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2024 Schedley. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}