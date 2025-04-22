
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, User, ExchangeRate, Store } from '@/types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentUser: User | null;
  exchangeRate: ExchangeRate;
  currentStore: Store | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Initial dummy data
const initialExchangeRate: ExchangeRate = {
  date: new Date(),
  usdToUzs: 12500,
};

const demoUser: User = {
  id: "1",
  name: "Demo Admin",
  username: "demo",
  role: "admin",
  storeId: "1",
  phone: "+998 90 123 4567"
};

const demoStore: Store = {
  id: "1",
  name: "Demo Phone Store",
  subscription: "gold",
  validUntil: new Date("2025-12-31"),
  owner: "1",
  status: "active",
  branches: [
    {
      id: "1",
      name: "Main Branch",
      location: "Tashkent, Uzbekistan",
      storeId: "1",
      registers: [
        {
          id: "1",
          name: "Main Register",
          branchId: "1",
          balance: {
            uzs: 1500000,
            usd: 120
          }
        }
      ]
    }
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("uz_latin");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>(initialExchangeRate);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check system preference for dark mode
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }

    // Add dark mode class to body if needed
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const login = async (username: string, password: string) => {
    // In a real application, this would make an API call
    // For demonstration purposes, we'll just set demo user data
    if (username === "demo" && password === "password") {
      setCurrentUser(demoUser);
      setCurrentStore(demoStore);
      setIsAuthenticated(true);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentStore(null);
    setIsAuthenticated(false);
  };

  const value = {
    language,
    setLanguage,
    isDarkMode,
    toggleDarkMode,
    currentUser,
    exchangeRate,
    currentStore,
    isAuthenticated,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
