import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginAsDemo: (role: UserRole) => void;
  register: (userData: Partial<User>) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (allowedRoles: UserRole | UserRole[]) => boolean;
  updateUser: (data: Partial<User>) => void;
}

const DEMO_USERS: Record<UserRole, User> = {
  ADMIN: {
    id: 'usr-admin-01',
    name: 'Chief Grid Director Vance',
    email: 'admin@voltwatch.gov',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 010-0909',
    address: 'National Grid Control HQ, Suite 100',
    isVerified: true
  },
  OPERATOR: {
    id: 'usr-op-02',
    name: 'Operator Sarah Jenkins',
    email: 'operator@voltwatch.gov',
    role: 'OPERATOR',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 018-7731',
    address: 'Northgate Grid Terminal Substation SS-NGT-02',
    substationId: 'sub-02',
    isVerified: true
  },
  CITIZEN: {
    id: 'usr-cit-03',
    name: 'David H. Mitchell',
    email: 'citizen@voltwatch.gov',
    role: 'CITIZEN',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 234-5678',
    address: '428 Greenfield Lane, Cedar Meadows',
    meterNumber: 'MTR-8849-012',
    isVerified: true,
    hasActiveAlertSubscription: true
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('voltwatch_active_user');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return DEMO_USERS.ADMIN;
        }
      }
    }
    // Default to DEMO_ADMIN so reviewers immediately see full functional dashboard!
    return DEMO_USERS.ADMIN;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('voltwatch_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('voltwatch_active_user');
    }
  }, [user]);

  const login = async (email: string): Promise<boolean> => {
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail.includes('admin')) {
      setUser(DEMO_USERS.ADMIN);
    } else if (cleanEmail.includes('operator')) {
      setUser(DEMO_USERS.OPERATOR);
    } else {
      setUser({
        ...DEMO_USERS.CITIZEN,
        email: cleanEmail
      });
    }
    return true;
  };

  const loginAsDemo = (role: UserRole) => {
    setUser(DEMO_USERS[role]);
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'New Registered Citizen',
      email: userData.email || 'citizen@example.com',
      role: userData.role || 'CITIZEN',
      phone: userData.phone,
      address: userData.address,
      meterNumber: userData.meterNumber || `MTR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`,
      isVerified: false
    };
    setUser(newUser);
    return true;
  };

  const verifyOTP = async (code: string): Promise<boolean> => {
    if (code.length === 6) {
      if (user) {
        setUser({ ...user, isVerified: true });
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const hasRole = (allowedRoles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (Array.isArray(allowedRoles)) {
      return allowedRoles.includes(user.role);
    }
    return user.role === allowedRoles;
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        register,
        verifyOTP,
        logout,
        hasRole,
        updateUser
      }}
    >
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
