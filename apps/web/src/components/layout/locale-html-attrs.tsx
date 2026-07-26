"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

const RTL_LOCALES = ["ar", "fa", "he", "ur"];

export function LocaleHtmlAttrs({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
