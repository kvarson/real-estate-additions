// Application constants

export const COMPANY_INFO = {
     name: 'ALIANS DEVELOPMENT',
     email: 'info@alians.az',
     phone: '+994 65 407 27 27',
     address: 'Ataturk Avenue, Palace Center 2, Baku, Azerbaijan',
     coordinates: {
          lat: 40.4093,
          lng: 49.8671,
     },
} as const;

export const NAVIGATION_ITEMS = [
     { label: 'Home', href: '/' },
     { label: 'About Us', href: '/about' },
     { label: 'Projects', href: '/projects' },
     { label: 'Services', href: '/services' },
     { label: 'News', href: '/news' },
     { label: 'Contact', href: '/contact' },
] as const;

export const SOCIAL_LINKS = {
     facebook: 'https://facebook.com/aliansdevelopment',
     instagram: 'https://instagram.com/aliansdevelopment',
     linkedin: 'https://linkedin.com/company/aliansdevelopment',
     youtube: 'https://youtube.com/@aliansdevelopment',
} as const;

export const SEO_DEFAULTS = {
     title: 'Alians Development - Professional Real Estate Development',
     description:
          'Professional real estate development company specializing in commercial and residential projects in Baku, Azerbaijan.',
     keywords:
          'real estate, development, Baku, Azerbaijan, commercial, residential, property',
     ogImage: '/images/og-image.jpg',
} as const;

export const API_ENDPOINTS = {
     projects: '/api/projects',
     services: '/api/services',
     news: '/api/news',
     contact: '/api/contact',
     faq: '/api/faq',
} as const;

export const BREAKPOINTS = {
     mobile: '640px',
     tablet: '768px',
     desktop: '1024px',
     wide: '1280px',
} as const;
