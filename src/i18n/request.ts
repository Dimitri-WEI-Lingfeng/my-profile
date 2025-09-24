import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // For static export, we need to handle locale differently
  let locale;
  
  try {
    // This typically corresponds to the `[locale]` segment
    locale = await requestLocale;
  } catch (error) {
    // Fallback for static export
    locale = routing.defaultLocale;
  }
 
  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
