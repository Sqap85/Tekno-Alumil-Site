import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://www.teknoalumil.com";
const SUPPORTED_LANGS = ["tr", "en", "el"];

export function useSeoHelmet({ titleKey, descriptionKey }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language || "tr";

  const title = t(titleKey);
  const description = t(descriptionKey);
  const canonical = `${BASE_URL}${location.pathname}`;

  // html lang attribute'unu dil değişikliğinde güncelle
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const hreflangLinks = SUPPORTED_LANGS.map((lng) => ({
    rel: "alternate",
    hreflang: lng,
    href: `${BASE_URL}${location.pathname}`,
  }));

  // x-default: fallback (Turkish default)
  const xDefaultLink = {
    rel: "alternate",
    hreflang: "x-default",
    href: `${BASE_URL}${location.pathname}`,
  };

  return {
    Helmet,
    title,
    description,
    canonical,
    hreflangLinks: [...hreflangLinks, xDefaultLink],
    ogUrl: canonical,
  };
}
