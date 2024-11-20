import { Language } from "../types/types";

export const STATIC_PAGES = {
  terms: "terms_and_conditions",
  privacy: "privacy_policy",
  contact_us: "contact_us",
  home_how: "home_how",
  home_why: "home_why",
  home_faq: "home_faq",
};

export const NO_NAV_BAR_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/terms",
  "/privacy",
  "/contact-us",
];

export const LOCAL_STORAGE = {
  authStatus: "authStatus",
  navigationHistory: "navigationHistory",
  language: "language",
};

export const LANGUAGES: Language[] = [
  {
    value: "en-US",
    label: "English",
  },
  {
    value: "es-ES",
    label: "Espanol",
  },
  {
    value: "id-ID",
    label: "Bahasa",
  },
  {
    value: "vi-VN",
    label: "Vietnamese",
  },
];
