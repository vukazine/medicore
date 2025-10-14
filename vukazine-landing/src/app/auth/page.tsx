import Link from 'next/link';

export default function AuthHomePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Vukazine Authentication</h1>
          <p className="text-gray-400">Choose an authentication page to preview</p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full py-3 px-4 bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-semibold rounded-lg hover:brightness-105 transition-all text-center"
          >
            Login Page
          </Link>
          
          <Link
            href="/signup"
            className="block w-full py-3 px-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-center"
          >
            Signup Page
          </Link>
          
          <Link
            href="/forgot-password"
            className="block w-full py-3 px-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-center"
          >
            Forgot Password Page
          </Link>
          
          <Link
            href="/reset-password?token=sample-token-123"
            className="block w-full py-3 px-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-center"
          >
            Reset Password Page
          </Link>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            🔒 Secure • POPIA Compliant • HIPAA Aligned
          </p>
        </div>
      </div>
    </div>
  );
}