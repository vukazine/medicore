'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Lazy load Firebase to avoid issues during build
let auth: any = null;
let db: any = null;

const initializeFirebase = async () => {
  if (!auth || !db) {
    try {
      const { auth: firebaseAuth, db: firebaseDb } = await import('@/lib/firebase');
      auth = firebaseAuth;
      db = firebaseDb;
    } catch (error) {
      console.warn('Firebase initialization failed during build:', error);
    }
  }
  return { auth, db };
};

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, userData: any) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserPassword: (password: string) => Promise<void>;
  updateUserProfile: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  async function signup(email: string, password: string, userData: any) {
    const { auth, db } = await initializeFirebase();
    if (!auth || !db) throw new Error('Firebase not initialized');
    
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile
    await updateProfile(result.user, {
      displayName: userData.fullName,
    });

    // Try to save additional user data to Firestore (optional)
    try {
      await setDoc(doc(db, 'users', result.user.uid), {
        fullName: userData.fullName,
        email: email,
        clinicName: userData.clinicName,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });
    } catch (firestoreError) {
      console.warn('Could not save user data to Firestore:', firestoreError);
      // Continue without Firestore - authentication still works
    }

    return result;
  }

  // Sign in function
  async function login(email: string, password: string) {
    const { auth, db } = await initializeFirebase();
    if (!auth || !db) throw new Error('Firebase not initialized');
    
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // Try to update last login in Firestore (optional)
    try {
      await setDoc(doc(db, 'users', result.user.uid), {
        lastLogin: new Date().toISOString(),
      }, { merge: true });
    } catch (firestoreError) {
      console.warn('Could not update last login in Firestore:', firestoreError);
      // Continue without Firestore - authentication still works
    }

    return result;
  }

  // Sign out function
  async function logout() {
    const { auth } = await initializeFirebase();
    if (!auth) throw new Error('Firebase not initialized');
    return signOut(auth);
  }

  // Reset password function
  async function resetPassword(email: string) {
    const { auth } = await initializeFirebase();
    if (!auth) throw new Error('Firebase not initialized');
    return sendPasswordResetEmail(auth, email);
  }

  // Update password function
  function updateUserPassword(password: string) {
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }
    return updatePassword(currentUser, password);
  }

  // Update user profile function
  async function updateUserProfile(data: any) {
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }

    const { db } = await initializeFirebase();

    // Update Firebase Auth profile
    if (data.displayName) {
      await updateProfile(currentUser, {
        displayName: data.displayName,
      });
    }

    // Try to update Firestore document (optional)
    try {
      if (db) {
        await setDoc(doc(db, 'users', currentUser.uid), {
          ...data,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      }
    } catch (firestoreError) {
      console.warn('Could not update user data in Firestore:', firestoreError);
      // Continue without Firestore - profile update still works
    }
  }

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    initializeFirebase().then(({ auth }) => {
      if (auth) {
        unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}