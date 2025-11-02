import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
     // A list of all locales that are supported
     locales: ['az', 'en', 'ru'],

     // Used when no locale matches
     defaultLocale: 'az',

     // Always add locale prefix
     localePrefix: 'always',
});

export const config = {
     // Match only internationalized pathnames
     matcher: [
          // Match all pathnames except for API routes and static files
          '/((?!api|_next/static|_next/image|favicon.ico).*)',
     ],
};
