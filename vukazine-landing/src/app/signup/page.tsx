'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Check, Clock, Gift } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    clinicName: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    clinicName: '',
    password: '',
    confirmPassword: '',
    terms: '',
    general: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: ''
  });

  const { signup } = useAuth();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    let label = '';
    let color = '';

    if (password.length >= 8) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    if (score === 0 || password.length < 6) {
      label = 'Weak';
      color = 'text-red-400';
    } else if (score <= 1) {
      label = 'Medium';
      color = 'text-yellow-400';
    } else {
      label = 'Strong';
      color = 'text-green-400';
    }

    return { score, label, color };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '', general: '' }));
    }
  };

  const getPasswordRequirements = () => {
    const { password } = formData;
    return [
      {
        text: 'At least 8 characters',
        met: password.length >= 8
      },
      {
        text: 'One number',
        met: /[0-9]/.test(password)
      },
      {
        text: 'One special character',
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      }
    ];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      fullName: '',
      email: '',
      clinicName: '',
      password: '',
      confirmPassword: '',
      terms: '',
      general: ''
    });

    // Validation
    const newErrors = {
      fullName: '',
      email: '',
      clinicName: '',
      password: '',
      confirmPassword: '',
      terms: '',
      general: ''
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.clinicName.trim()) {
      newErrors.clinicName = 'Clinic/Hospital name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'Please agree to the terms and conditions';
    }

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await signup(formData.email, formData.password, {
        fullName: formData.fullName,
        clinicName: formData.clinicName
      });
      
      // Redirect to dashboard or welcome page
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Handle specific Firebase errors
      let errorMessage = 'An error occurred during account creation';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        default:
          errorMessage = error.message || 'An error occurred during account creation';
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
            src="/image/Doctors/image2.jpg"
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
            {/* Card 1 - Setup in Days */}
            <div className="animate-[float_6s_ease-in-out_infinite] backdrop-blur-lg bg-black/40 border border-white/20 rounded-xl p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-emerald-400" />
                <div className="text-white font-semibold">Setup in Days</div>
              </div>
            </div>

            {/* Card 2 - Free Trial */}
            <div className="ml-8 backdrop-blur-lg bg-black/40 border border-white/20 rounded-xl p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <Gift className="w-6 h-6 text-emerald-400" />
                <div className="text-white font-semibold">Free 14-day trial</div>
              </div>
            </div>

            {/* Card 3 - No Credit Card */}
            <div className="backdrop-blur-lg bg-black/40 border border-white/20 rounded-xl p-4 max-w-xs">
              <div className="text-white font-semibold">No credit card required</div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-white/80 text-sm">
            Join 200+ clinics reducing billing denials
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
            <h1 className="text-3xl font-bold text-white">Join Vukazine</h1>
            <p className="text-gray-400">Create your account to start eliminating billing denials</p>
          </div>

          {/* Quick Navigation */}
          <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
            <Link href="/login" className="flex-1 text-center py-2 px-4 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm">
              Sign In
            </Link>
            <div className="flex-1 text-center py-2 px-4 rounded-md bg-emerald-500/20 text-emerald-400 font-medium text-sm">
              Create Account
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors"
                placeholder="Dr. John Smith"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address *
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors pr-12"
                  placeholder="your.email@clinic.com"
                />
                {formData.email && validateEmail(formData.email) && (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                )}
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Clinic Name Field */}
            <div>
              <label htmlFor="clinicName" className="block text-sm font-medium text-white mb-2">
                Clinic/Hospital Name *
              </label>
              <input
                id="clinicName"
                name="clinicName"
                type="text"
                value={formData.clinicName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors"
                placeholder="Your clinic or hospital name"
              />
              {errors.clinicName && (
                <p className="mt-1 text-sm text-red-400">{errors.clinicName}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors pr-12"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Strength:</span>
                    <span className={`text-sm font-medium ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength.score === 1 ? 'bg-yellow-400 w-1/3' :
                        passwordStrength.score === 2 ? 'bg-yellow-400 w-2/3' :
                        passwordStrength.score >= 3 ? 'bg-green-400 w-full' :
                        'bg-red-400 w-1/4'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-1">
                  {getPasswordRequirements().map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className={`w-4 h-4 ${req.met ? 'text-green-400' : 'text-gray-600'}`} />
                      <span className={`text-sm ${req.met ? 'text-green-400' : 'text-gray-400'}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <Check className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 text-emerald-400 bg-white/5 border-white/10 rounded focus:ring-emerald-400 focus:ring-2 mt-1"
                />
                <span className="text-sm text-gray-300">
                  I agree to the{' '}
                  <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-400">{errors.terms}</p>
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
                  Creating your account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Ready to get started?</span>
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