import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['az', 'en', 'ru'] as const;
export const defaultLocale = 'az' as const;

export default getRequestConfig(async ({ locale }) => {
     console.log('i18n.ts - Processing locale:', locale);

     const validLocale = locale || 'az';

     try {
          const messages = (await import(`./messages/${validLocale}.json`))
               .default;
          console.log(
               'i18n.ts - Loaded messages for',
               validLocale,
               ':',
               Object.keys(messages || {})
          );

          return {
               locale: validLocale,
               messages,
          };
     } catch (error) {
          console.error(
               'i18n.ts - Error loading messages for',
               locale,
               ':',
               error
          );
          // Fallback to default locale
          const messages = (await import(`./messages/az.json`)).default;
          return {
               locale: locale || 'az',
               messages,
          };
     }
});
