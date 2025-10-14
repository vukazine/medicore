import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          
          <div className="space-y-4 text-gray-300">
            <p>
              At Vukazine, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as account information, medical coding data, and communication preferences.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">2. How We Use Your Information</h2>
            <p>
              We use your information to provide our medical coding services, improve our platform, and communicate with you about your account.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">3. Data Security</h2>
            <p>
              We implement industry-standard security measures and comply with HIPAA requirements to protect your data.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">4. HIPAA Compliance</h2>
            <p>
              As a healthcare technology provider, we maintain strict HIPAA compliance and will sign Business Associate Agreements (BAAs) with covered entities.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">5. POPIA Compliance</h2>
            <p>
              We comply with South Africa's Protection of Personal Information Act (POPIA) and respect your rights regarding personal information.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. Contact us at privacy@vukazine.com for privacy-related requests.
            </p>
            
            <h2 className="text-xl font-semibold text-white mt-6">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@vukazine.com
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