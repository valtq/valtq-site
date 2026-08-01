"use client";

import { useEffect } from "react";
import { type Locale, isRtl } from "@/i18n/config";

export function LocaleHtmlAttrs({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
