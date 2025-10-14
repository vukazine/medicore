'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Loader2, Check, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { resetPassword } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword(email);
      setIsEmailSent(true);
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      let errorMessage = 'An error occurred while sending the reset email';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later';
          break;
        default:
          errorMessage = error.message || 'An error occurred while sending the reset email';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await resetPassword(email);
    } catch (error: any) {
      console.error('Resend error:', error);
      setError('Failed to resend email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/image/Doctors/image3.jpg"
            alt="Medical professional"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        {/* Floating Card */}
        <div className="relative z-10 p-8 flex flex-col justify-center">
          <div className="backdrop-blur-lg bg-black/40 border border-white/20 rounded-xl p-6 max-w-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <div className="text-white font-semibold text-lg">Reset your password securely</div>
            </div>
            <p className="text-white/80 text-sm">
              We'll send you instructions via email to reset your password safely.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          {!isEmailSent ? (
            <>
              {/* Back Button */}
              <div>
                <Link
                  href="/login"
                  className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to sign in
                </Link>
              </div>

              {/* Logo */}
              <div className="flex justify-center">
                <Image
                  src="/image/logos/vukazine.png"
                  alt="Vukazine"
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>

              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-white">Forgot password?</h1>
                <p className="text-gray-400">Enter your email and we'll send you a reset link</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors"
                    placeholder="your.email@clinic.com"
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-semibold hover:brightness-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Sending reset link...
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </form>

              {/* Back to login */}
              <div className="text-center">
                <p className="text-gray-400">
                  Remember your password?{' '}
                  <Link href="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-emerald-400 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-black" />
                  </div>
                </div>

                {/* Logo */}
                <div className="flex justify-center">
                  <Image
                    src="/image/logos/vukazine.png"
                    alt="Vukazine"
                    width={160}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>

                {/* Success Message */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-white">Email sent!</h1>
                  <p className="text-gray-400">
                    Check your inbox for password reset instructions
                  </p>
                  <p className="text-sm text-gray-500">
                    Sent to: {email}
                  </p>
                </div>

                {/* Resend Link */}
                <div className="pt-4">
                  <p className="text-gray-400 text-sm">
                    Didn't receive it?{' '}
                    <button
                      onClick={handleResendEmail}
                      disabled={isLoading}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="inline-flex items-center">
                          <Loader2 className="w-4 h-4 animate-spin mr-1" />
                          Resending...
                        </span>
                      ) : (
                        'Resend email'
                      )}
                    </button>
                  </p>
                </div>

                {/* Back to login */}
                <div className="pt-6">
                  <Link
                    href="/login"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to sign in
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Footer badges */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              🔒 Secure • POPIA Compliant • HIPAA Aligned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}