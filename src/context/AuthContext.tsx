import React, { createContext, useContext, useState } from 'react';
import type { AuthenticatedUser, UserRole } from '../types';

interface AuthContextType {
  user: AuthenticatedUser | null;
  loginWithGoogle: (email: string, name?: string, photoUrl?: string) => void;
  logout: () => void;
  isMasterDagiyosi: boolean;
}

const AUTH_STORAGE_KEY = 'benohel_auth_user_v1';

const DEFAULT_BENOHIL: AuthenticatedUser = {
  email: 'benohel.yosef@gmail.com',
  name: 'Benohel Yosef',
  role: 'student',
  photoUrl: '',
  isSignedIn: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved auth state', e);
    }
    // Default to Benohel logged in so the app is instantly usable, but with full ability to switch
    return DEFAULT_BENOHIL;
  });

  const loginWithGoogle = (email: string, name?: string, photoUrl?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isMaster = cleanEmail === 'dagiyosi5321@gmail.com';
    const role: UserRole = isMaster ? 'master_admin' : 'student';
    
    let displayName = name;
    if (!displayName) {
      if (isMaster) {
        displayName = 'Master Dagiyosi (Hokage Overwatch)';
      } else if (cleanEmail.includes('benohel')) {
        displayName = 'Benohel Yosef';
      } else {
        displayName = cleanEmail.split('@')[0];
      }
    }

    const newUser: AuthenticatedUser = {
      email: cleanEmail,
      name: displayName,
      role,
      photoUrl: photoUrl || '',
      isSignedIn: true,
    };

    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const isMasterDagiyosi = user?.role === 'master_admin';

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, isMasterDagiyosi }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
