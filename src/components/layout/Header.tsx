// Header/Navbar component

'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
     const t = useTranslations('navigation');
     const locale = useLocale();
     const router = useRouter();

     // Debug: Şu anki locale'i kontrol et
     console.log('Header - Current locale:', locale);
     console.log('Header - Projects translation:', t('projects'));

     const navItems = [
          {
               key: 'projects',
               label: t('projects'),
               href: `/${locale}/projects`,
          },
          { key: 'about', label: t('about'), href: `/${locale}/about` },
          { key: 'news', label: t('news'), href: `/${locale}/news` },
          { key: 'contact', label: t('contact'), href: `/${locale}/contact` },
     ];

     const languages = [
          { code: 'az', label: 'AZ' },
          { code: 'en', label: 'EN' },
          { code: 'ru', label: 'RU' },
     ];

     const handleLanguageChange = (newLocale: string) => {
          if (newLocale === locale) return;

          // Force page reload with new locale for reliable switching
          window.location.href = `/${newLocale}`;
     };

     return (
          <header className="absolute top-0 left-0 right-0 z-10 p-6">
               <div className="container mx-auto px-10">
                    <div className="flex items-center justify-between border-b border-white/5 ">
                         {/* Sol Taraf: Logo ve Navigasyon */}
                         <div className="flex items-center">
                              {/* Logo */}
                              <div className="flex-shrink-0">
                                   <img
                                        width={130}
                                        src="/logoBackgorund.png" // Resimdeki logo beyaz, sizdeki "logoBackgorund.png" yerine beyaz bir logo kullanmanız gerekebilir.
                                        alt="Alians Development Logo"
                                        className="object-contain"
                                   />
                              </div>

                              {/* Navigasyon Menüsü */}
                              <nav className="hidden lg:block ml-16">
                                   <ul className="flex space-x-10">
                                        {navItems.map((item) => (
                                             <li key={item.key}>
                                                  <a
                                                       href={item.href}
                                                       className="text-sm font-light tracking-widest text-white hover:text-gray-300 transition-colors"
                                                  >
                                                       {item.label}
                                                  </a>
                                             </li>
                                        ))}
                                   </ul>
                              </nav>
                         </div>

                         {/* Sağ Taraf: Dil Seçenekleri */}
                         <div className="flex space-x-4 text-sm font-light">
                              {languages.map((lang) => (
                                   <button
                                        key={lang.code}
                                        onClick={() =>
                                             handleLanguageChange(lang.code)
                                        }
                                        className={`px-2 py-1 transition-colors ${
                                             locale === lang.code
                                                  ? 'text-white font-semibold'
                                                  : 'text-gray-400 hover:text-gray-300'
                                        }`}
                                   >
                                        {lang.label}
                                   </button>
                              ))}
                         </div>
                    </div>
               </div>
          </header>
     );
};

export default Header;
