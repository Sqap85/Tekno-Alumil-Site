import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Çeviri dosyalarını içe aktar
import en from "/locales/en/translation.json";
import tr from "/locales/tr/translation.json";
import el from "/locales/el/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tr: { translation: tr },
    el: { translation: el }, 
  },
  lng: "tr", // Varsayılan dil
  fallbackLng: "en", // Eğer çeviri bulunamazsa kullanılacak dil
  interpolation: {
    escapeValue: false, // React zaten XSS koruması sağlıyor
  },
});

export default i18n;
