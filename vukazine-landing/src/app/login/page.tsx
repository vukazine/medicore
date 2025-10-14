'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const { login } = useAuth();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '', general: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: '', password: '', general: '' });

    // Validation
    const newErrors = {
      email: '',
      password: '',
      general: ''
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      
      // Redirect to dashboard or main page
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific Firebase errors
      let errorMessage = 'An error occurred during sign in';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        default:
          errorMessage = error.message || 'An error occurred during sign in';
      }
      
      setErrors(prev => ({ ...prev, general: errorMessage }));
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
            src="/image/Doctors/image1.jpg"
            alt="Medical professional"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        {/* Floating Cards */}
        <div className="relative z-10 p-8 flex flex-col justify-between">
          {/* Top Cards */}
          <div className="space-y-6">
            {/* Card 1 - Precision */}
            <div className="animate-[float_6s_ease-in-out_infinite] backdrop-blur-lg bg-black/40 border border-white/20 rounded-xl p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-white font-semibold text-lg">98.7% Precision</div>
                  <div className="text-white/70 text-sm">Last 7 days</div>
                </div>
              </div>
            </div>

            {/* Card 2 - Zero Denials */}
            <div className="ml-8 backdrop-blur-lg bg-black/40 border border-white/20 rounded-xl p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-white font-semibold">Zero Denials</div>
              </div>
            </div>
          </div>

          {/* Center Right Card */}
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
            <div className="backdrop-blur-lg bg-black/40 border border-white/20 rounded-lg px-3 py-2">
              <div className="text-white text-sm font-medium">🔒 HIPAA Compliant</div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-white/80 text-sm">
            Trusted by leading clinics across South Africa
          </div>
        </div>
      </div>

      {/* Right Side - Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-900">
        <div className="w-full max-w-md space-y-8">
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
            <h1 className="text-3xl font-bold text-white">Welcome to Vukazine</h1>
            <p className="text-gray-400">Sign in to your account or create a new one</p>
          </div>

          {/* Quick Navigation */}
          <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
            <div className="flex-1 text-center py-2 px-4 rounded-md bg-emerald-500/20 text-emerald-400 font-medium text-sm">
              Sign In
            </div>
            <Link href="/signup" className="flex-1 text-center py-2 px-4 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm">
              Create Account
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors"
                placeholder="your.email@clinic.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-emerald-400 bg-white/5 border-white/10 rounded focus:ring-emerald-400 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Additional Help Text */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Need help? Contact support or{' '}
                <Link href="/forgot-password" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  reset your password
                </Link>
              </p>
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
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Need help signing in?</span>
            </div>
          </div>

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