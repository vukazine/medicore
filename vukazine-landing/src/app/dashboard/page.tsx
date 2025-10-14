'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Building2, Mail, Calendar } from 'lucide-react';

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!currentUser) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img src="/image/logos/vukazine.png" alt="Vukazine" className="h-8 w-auto" />
                <span className="ml-3 text-xl font-bold text-white">Vukazine</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-gray-300">
                Welcome, {currentUser.displayName || currentUser.email}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to Vukazine Dashboard!
          </h1>
          <p className="text-emerald-100 text-lg">
            You've successfully signed in. This is where your medical coding dashboard will be.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm text-gray-400">Display Name</div>
                  <div className="text-white">{currentUser.displayName || 'Not set'}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm text-gray-400">Email Address</div>
                  <div className="text-white">{currentUser.email}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm text-gray-400">Account Created</div>
                  <div className="text-white">
                    {currentUser.metadata.creationTime ? 
                      new Date(currentUser.metadata.creationTime).toLocaleDateString() 
                      : 'Unknown'
                    }
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm text-gray-400">Email Verified</div>
                  <div className="text-white">
                    {currentUser.emailVerified ? (
                      <span className="text-green-400">✓ Verified</span>
                    ) : (
                      <span className="text-yellow-400">⚠ Not verified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Medical Coding</h3>
            <p className="text-gray-400 text-sm mb-4">
              Start coding your medical documents with AI assistance.
            </p>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors">
              Start Coding
            </button>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">View Reports</h3>
            <p className="text-gray-400 text-sm mb-4">
              Access your coding accuracy and denial prevention reports.
            </p>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
              View Reports
            </button>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Settings</h3>
            <p className="text-gray-400 text-sm mb-4">
              Manage your account settings and preferences.
            </p>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
              Settings
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>← Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}