
import React, { createContext, useContext } from 'react';
import { Language } from '@/types';
import { useApp } from '@/context/AppContext';

// Translations object
const translations = {
  // Login page
  login: {
    uz_latin: "Tizimga kirish",
    uz_cyrillic: "Тизимга кириш",
    ru: "Вход в систему",
    en: "Login"
  },
  username: {
    uz_latin: "Foydalanuvchi nomi",
    uz_cyrillic: "Фойдаланувчи номи",
    ru: "Имя пользователя",
    en: "Username"
  },
  password: {
    uz_latin: "Parol",
    uz_cyrillic: "Парол",
    ru: "Пароль",
    en: "Password"
  },
  forgotPassword: {
    uz_latin: "Parolni unutdingizmi?",
    uz_cyrillic: "Паролни унутдингизми?",
    ru: "Забыли пароль?",
    en: "Forgot password?"
  },
  signIn: {
    uz_latin: "Kirish",
    uz_cyrillic: "Кириш",
    ru: "Войти",
    en: "Sign in"
  },
  // Dashboard
  dashboard: {
    uz_latin: "Boshqaruv paneli",
    uz_cyrillic: "Бошқарув панели",
    ru: "Панель управления",
    en: "Dashboard"
  },
  dailySales: {
    uz_latin: "Kunlik sotuvlar",
    uz_cyrillic: "Кунлик сотувлар",
    ru: "Ежедневные продажи",
    en: "Daily Sales"
  },
  monthlySales: {
    uz_latin: "Oylik sotuvlar",
    uz_cyrillic: "Ойлик сотувлар",
    ru: "Ежемесячные продажи",
    en: "Monthly Sales"
  },
  registerBalance: {
    uz_latin: "Kassa balansi",
    uz_cyrillic: "Касса баланси",
    ru: "Баланс кассы",
    en: "Register Balance"
  },
  lowStock: {
    uz_latin: "Kam qoldiq",
    uz_cyrillic: "Кам қолдиқ",
    ru: "Малый остаток",
    en: "Low Stock"
  },
  // Navigation
  pos: {
    uz_latin: "Sotuv",
    uz_cyrillic: "Сотув",
    ru: "Продажа",
    en: "POS"
  },
  products: {
    uz_latin: "Mahsulotlar",
    uz_cyrillic: "Маҳсулотлар",
    ru: "Товары",
    en: "Products"
  },
  inventory: {
    uz_latin: "Ombor",
    uz_cyrillic: "Омбор",
    ru: "Склад",
    en: "Inventory"
  },
  reports: {
    uz_latin: "Hisobotlar",
    uz_cyrillic: "Ҳисоботлар",
    ru: "Отчеты",
    en: "Reports"
  },
  installments: {
    uz_latin: "Muddatli to'lovlar",
    uz_cyrillic: "Муддатли тўловлар",
    ru: "Рассрочки",
    en: "Installments"
  },
  settings: {
    uz_latin: "Sozlamalar",
    uz_cyrillic: "Созламалар",
    ru: "Настройки",
    en: "Settings"
  },
  logout: {
    uz_latin: "Chiqish",
    uz_cyrillic: "Чиқиш",
    ru: "Выход",
    en: "Logout"
  },
  // POS
  cart: {
    uz_latin: "Savat",
    uz_cyrillic: "Сават",
    ru: "Корзина",
    en: "Cart"
  },
  scanBarcode: {
    uz_latin: "Shtrix kodni skanerlang",
    uz_cyrillic: "Штрих кодни сканерланг",
    ru: "Отсканируйте штрих-код",
    en: "Scan barcode"
  },
  product: {
    uz_latin: "Mahsulot",
    uz_cyrillic: "Маҳсулот",
    ru: "Товар",
    en: "Product"
  },
  price: {
    uz_latin: "Narxi",
    uz_cyrillic: "Нархи",
    ru: "Цена",
    en: "Price"
  },
  quantity: {
    uz_latin: "Soni",
    uz_cyrillic: "Сони",
    ru: "Количество",
    en: "Quantity"
  },
  total: {
    uz_latin: "Jami",
    uz_cyrillic: "Жами",
    ru: "Итого",
    en: "Total"
  },
  paymentMethod: {
    uz_latin: "To'lov usuli",
    uz_cyrillic: "Тўлов усули",
    ru: "Способ оплаты",
    en: "Payment Method"
  },
  cash: {
    uz_latin: "Naqd",
    uz_cyrillic: "Нақд",
    ru: "Наличные",
    en: "Cash"
  },
  card: {
    uz_latin: "Plastik",
    uz_cyrillic: "Пластик",
    ru: "Карта",
    en: "Card"
  },
  mixed: {
    uz_latin: "Aralash",
    uz_cyrillic: "Аралаш",
    ru: "Смешанный",
    en: "Mixed"
  },
  credit: {
    uz_latin: "Nasiya",
    uz_cyrillic: "Насия",
    ru: "Кредит",
    en: "Credit"
  },
  installment: {
    uz_latin: "Muddatli to'lov",
    uz_cyrillic: "Муддатли тўлов",
    ru: "Рассрочка",
    en: "Installment"
  },
  // General
  cancel: {
    uz_latin: "Bekor qilish",
    uz_cyrillic: "Бекор қилиш",
    ru: "Отменить",
    en: "Cancel"
  },
  save: {
    uz_latin: "Saqlash",
    uz_cyrillic: "Сақлаш",
    ru: "Сохранить",
    en: "Save"
  },
  create: {
    uz_latin: "Yaratish",
    uz_cyrillic: "Яратиш",
    ru: "Создать",
    en: "Create"
  },
  edit: {
    uz_latin: "Tahrirlash",
    uz_cyrillic: "Таҳрирлаш",
    ru: "Редактировать",
    en: "Edit"
  },
  delete: {
    uz_latin: "O'chirish",
    uz_cyrillic: "Ўчириш",
    ru: "Удалить",
    en: "Delete"
  },
  search: {
    uz_latin: "Qidirish",
    uz_cyrillic: "Қидириш",
    ru: "Поиск",
    en: "Search"
  },
  // Added translations for missing keys
  uzs: {
    uz_latin: "so'm",
    uz_cyrillic: "сўм",
    ru: "сум",
    en: "UZS"
  },
  sales: {
    uz_latin: "sotuvlar",
    uz_cyrillic: "сотувлар",
    ru: "продажи",
    en: "sales"
  },
  day: {
    uz_latin: "kun",
    uz_cyrillic: "кун",
    ru: "день",
    en: "day"
  },
  available: {
    uz_latin: "mavjud",
    uz_cyrillic: "мавжуд",
    ru: "доступно",
    en: "available"
  },
  addToCart: {
    uz_latin: "Savatga qo'shish",
    uz_cyrillic: "Саватга қўшиш",
    ru: "Добавить в корзину",
    en: "Add to cart"
  },
  noProductsFound: {
    uz_latin: "Mahsulotlar topilmadi",
    uz_cyrillic: "Маҳсулотлар топилмади",
    ru: "Товары не найдены",
    en: "No products found"
  },
  cartEmpty: {
    uz_latin: "Savat bo'sh",
    uz_cyrillic: "Сават бўш",
    ru: "Корзина пуста",
    en: "Cart is empty"
  },
  checkout: {
    uz_latin: "Buyurtma berish",
    uz_cyrillic: "Буюртма бериш",
    ru: "Оформить заказ",
    en: "Checkout"
  }
};

type TranslationKeys = keyof typeof translations;

interface LanguageContextType {
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useApp();

  const t = (key: TranslationKeys): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translations[key][language];
  };

  return <LanguageContext.Provider value={{ t }}>{children}</LanguageContext.Provider>;
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
