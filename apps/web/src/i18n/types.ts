'use client';

import { createContext, useContext } from 'react';
import type { Dictionary } from './get-dictionary';

export const DictionaryContext = createContext<Dictionary | null>(null);

export function useTranslations(): Dictionary {
  const dict = useContext(DictionaryContext);
  if (!dict) {
    throw new Error('useTranslations must be used within a DictionaryProvider');
  }
  return dict;
}
