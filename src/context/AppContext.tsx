
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, User, ExchangeRate, Store, SubscriptionPlan } from '@/types';
import { toast } from 'sonner';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentUser: User | null;
  exchangeRate: ExchangeRate;
  currentStore: Store | null;
  isAuthenticated: boolean;
  isSuperuser: boolean;
  subscriptionPlans: SubscriptionPlan[];
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

const demoSuperuser: User = {
  id: "super1",
  name: "Superadmin",
  username: "superadmin",
  role: "superuser",
  phone: "+998 99 999 9999"
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

const subscriptionPlans: SubscriptionPlan[] = [
  {
    tier: "free",
    name: "Free",
    price: 0,
    features: ["1 branch", "100 products", "Basic features"],
    maxProducts: 100,
    maxBranches: 1,
    maxRegisters: 1,
    allowsInstallments: false,
    allowsMultipleCurrencies: false
  },
  {
    tier: "silver",
    name: "Silver",
    price: 199000,
    features: ["2 branches", "500 products", "Basic reports", "Installment payments"],
    maxProducts: 500,
    maxBranches: 2,
    maxRegisters: 5,
    allowsInstallments: true,
    allowsMultipleCurrencies: false
  },
  {
    tier: "gold",
    name: "Gold",
    price: 399000,
    features: ["5 branches", "2000 products", "Advanced reports", "Multi-currency", "SMS notifications"],
    maxProducts: 2000,
    maxBranches: 5,
    maxRegisters: 15,
    allowsInstallments: true,
    allowsMultipleCurrencies: true
  },
  {
    tier: "platinum",
    name: "Platinum",
    price: 799000,
    features: ["10 branches", "10000 products", "Premium support", "All features"],
    maxProducts: 10000,
    maxBranches: 10,
    maxRegisters: 30,
    allowsInstallments: true,
    allowsMultipleCurrencies: true
  },
  {
    tier: "vip",
    name: "V.I.P",
    price: 1999000,
    features: ["Unlimited branches", "Unlimited products", "24/7 Support", "Custom features"],
    maxProducts: Infinity,
    maxBranches: Infinity,
    maxRegisters: Infinity,
    allowsInstallments: true,
    allowsMultipleCurrencies: true
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("uz_latin");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>(initialExchangeRate);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSuperuser, setIsSuperuser] = useState<boolean>(false);

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
      setIsSuperuser(false);
      toast.success("Login successful as store admin");
    } else if (username === "superadmin" && password === "xAI2025") {
      setCurrentUser(demoSuperuser);
      setCurrentStore(null);
      setIsAuthenticated(true);
      setIsSuperuser(true);
      toast.success("Login successful as superadmin");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentStore(null);
    setIsAuthenticated(false);
    setIsSuperuser(false);
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
    isSuperuser,
    subscriptionPlans,
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
