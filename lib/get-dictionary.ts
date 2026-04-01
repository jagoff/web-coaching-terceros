import { Locale } from '@/i18n/config';
import { translations } from './translations';

export const getDictionary = (locale: Locale) => {
  return translations[locale];
};
