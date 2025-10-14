'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [actionCode, setActionCode] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    general: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: ''
  });

  useEffect(() => {
    const code = searchParams.get('oobCode');
    const mode = searchParams.get('mode');
    
    if (!code || mode !== 'resetPassword') {
      setErrors(prev => ({ ...prev, general: 'Invalid or missing reset code' }));
      setIsValidating(false);
      return;
    }

    // Verify the password reset code
    verifyPasswordResetCode(auth, code)
      .then(() => {
        setActionCode(code);
        setIsValidating(false);
      })
      .catch((error) => {
        console.error('Invalid reset code:', error);
        let errorMessage = 'Invalid or expired reset link';
        
        switch (error.code) {
          case 'auth/expired-action-code':
            errorMessage = 'Reset link has expired. Please request a new one.';
            break;
          case 'auth/invalid-action-code':
            errorMessage = 'Invalid reset link. Please request a new one.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled.';
            break;
          default:
            errorMessage = 'Invalid reset link. Please request a new one.';
        }
        
        setErrors(prev => ({ ...prev, general: errorMessage }));
        setIsValidating(false);
      });
  }, [searchParams]);

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
    setErrors({ password: '', confirmPassword: '', general: '' });

    // Validation
    const newErrors = {
      password: '',
      confirmPassword: '',
      general: ''
    };

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

    if (!actionCode) {
      newErrors.general = 'Invalid reset code';
    }

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await confirmPasswordReset(auth, actionCode!, formData.password);
      setIsSuccess(true);
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      let errorMessage = 'Failed to reset password';
      
      switch (error.code) {
        case 'auth/expired-action-code':
          errorMessage = 'Reset link has expired. Please request a new one.';
          break;
        case 'auth/invalid-action-code':
          errorMessage = 'Invalid reset link. Please request a new one.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        default:
          errorMessage = error.message || 'Failed to reset password';
      }
      
      setErrors(prev => ({ ...prev, general: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  // Show error if no valid action code
  if (errors.general && !actionCode && !isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="flex justify-center">
            <Image
              src="/image/logos/vukazine.png"
              alt="Vukazine"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
            <h1 className="text-xl font-bold text-red-400 mb-2">Invalid Reset Link</h1>
            <p className="text-gray-400 mb-4">
              This password reset link is invalid or has expired.
            </p>
            <Link
              href="/forgot-password"
              className="inline-block py-2 px-4 bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-semibold rounded-lg hover:brightness-105 transition-all"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md space-y-8">
        {!isSuccess ? (
          <>
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
              <h1 className="text-3xl font-bold text-white">Create new password</h1>
              <p className="text-gray-400">Your new password must be different from previous passwords</p>
            </div>

            {/* Form Card */}
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors pr-12"
                      placeholder="Enter your new password"
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

                {/* Confirm New Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-colors pr-12"
                      placeholder="Confirm your new password"
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-semibold hover:brightness-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Resetting password...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
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
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-8 space-y-4">
                <h1 className="text-3xl font-bold text-white">Password reset successfully!</h1>
                <p className="text-gray-400">
                  Your password has been reset. You can now sign in with your new password.
                </p>
                
                <div className="pt-4">
                  <Link
                    href="/login"
                    className="inline-block w-full py-3 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-semibold hover:brightness-105 active:scale-95 transition-all duration-200 text-center"
                  >
                    Continue to Sign in
                  </Link>
                </div>
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
  );
}