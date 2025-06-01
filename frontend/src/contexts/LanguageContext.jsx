import React, { createContext, useContext, useState, useEffect } from 'react';

// Import translation files
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';
import frTranslations from '../locales/fr.json';

const LanguageContext = createContext();

const translations = {
  en: enTranslations,
  ar: arTranslations,
  fr: frTranslations
};

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' }
];

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        setCurrentLanguage(browserLang);
      }
    }
  }, []);

  // Update RTL and document direction when language changes
  useEffect(() => {
    const language = languages.find(lang => lang.code === currentLanguage);
    const isRightToLeft = language?.dir === 'rtl';
    
    setIsRTL(isRightToLeft);
    
    // Update document direction
    document.documentElement.dir = language?.dir || 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Update body class for styling
    document.body.classList.toggle('rtl', isRightToLeft);
    document.body.classList.toggle('ltr', !isRightToLeft);
    
    // Save to localStorage
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
    }
  };

  // Translation function with nested key support
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in any language
          }
        }
        break;
      }
    }
    
    // Handle string interpolation
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match;
      });
    }
    
    return value || key;
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage);
  };

  const value = {
    currentLanguage,
    isRTL,
    languages,
    changeLanguage,
    t,
    getCurrentLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
