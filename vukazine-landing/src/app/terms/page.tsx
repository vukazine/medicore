import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/signup"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to signup
          </Link>
        </div>

        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
          
          <div className="space-y-4 text-gray-300">
            <p>
              Welcome to Vukazine. These Terms of Service ("Terms") govern your use of our medical coding platform.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Vukazine, you agree to be bound by these Terms and our Privacy Policy.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">2. Description of Service</h2>
            <p>
              Vukazine provides AI-powered medical coding services to help healthcare providers reduce billing denials and improve coding accuracy.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">3. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">4. Privacy and Data Protection</h2>
            <p>
              We are committed to protecting your privacy and comply with HIPAA, POPIA, and other applicable data protection regulations.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">5. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at info@vukazine.com
            </p>
          </div>
          
          <div className="pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Last updated: October 12, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}