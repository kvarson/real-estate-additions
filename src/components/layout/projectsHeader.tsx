'use client';

import React from 'react';

const ChevronDownIcon = () => (
     <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1"
     >
          <path d="m6 9 6 6 6-6" />
     </svg>
);

const Header = () => {
     const navLinks = [
          'ƏSAS SƏHİFƏ',
          'LAYİHƏ HAQQINDA',
          'BİNALARIN DİZAYNI',
          'MƏNZİL PLANI',
          'TİKİNTİ',
          'KREDİT İMKANI',
     ];

     return (
          <header className="absolute top-0 left-0 right-0 z-50  bg-opacity-30 text-white border-b border-white/20 backdrop-blur-md">
               <div className="container mx-auto px-8 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-left leading-tight">
                         <h1 className="text-xl font-semibold tracking-widest">
                              METRO PARK
                         </h1>
                         <p className="text-sm font-light italic tracking-wide">
                              Bakikhanov
                         </p>
                    </div>

                    {/* Navigasyon */}
                    <nav className="hidden lg:flex items-center space-x-8">
                         {navLinks.map((link) => (
                              <a
                                   key={link}
                                   href="#"
                                   className="text-sm font-medium tracking-wide hover:text-gray-300 transition-colors duration-300 border-b-2 border-transparent hover:border-gray-400 pb-1"
                              >
                                   {link}
                              </a>
                         ))}
                    </nav>

                    {/* Dil Seçimi */}
                    <div className="flex items-center border border-gray-500 rounded-full px-3 py-1.5 cursor-pointer hover:bg-white hover:bg-opacity-10 transition-colors duration-300">
                         <span className="text-sm font-bold">AZE</span>
                         <ChevronDownIcon />
                    </div>
               </div>
          </header>
     );
};

export default Header;
