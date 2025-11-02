// Footer component
// İkonları kullanmak için projenize react-icons kütüphanesini ekleyin:
// npm install react-icons
"use client";

import React from 'react';
import { FaTelegramPlane, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('footer');
  return (
      <footer className="bg-black text-zinc-400 font-light">
            <div className="container mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    
                    {/* Sütun 1: Logo ve İletişim */}
                    <div className="space-y-6 flex flex-col justify-center ">
                   <div className='-mt-9'>
  <img 
                            src="/logoFooterBg.png" // Kendi logo dosyanızın adını kullanın
                            alt="Alians Development Logo"
                            className="w-[190px] h-auto" // Logonun genişliği ayarlandı, yükseklik otomatik
                        />
                   </div>
                      
                      <div className='space-y-6 flex flex-col justify-center px-8 -mt-8'>
 <div className="space-y-2 text-white ">
                            <p>*2727 / 055 400 27 27</p>
                            <p>info@alians.az</p>
                        </div>
                        <div className="flex space-x-5 text-white text-lg">
                            {/* DEĞİŞİKLİK: Metin yerine ikonlar eklendi */}
                            <a href="#" className="hover:text-zinc-300 transition-colors">
                                <FaTelegramPlane />
                            </a>
                            <a href="#" className="hover:text-zinc-300 transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="hover:text-zinc-300 transition-colors">
                                <FaFacebookF />
                            </a>
                        </div>
                      </div>

                       
                    </div>

            
                    <div className="hidden lg:block"></div>

                    <div>
              
                        <h4 className="font-normal tracking-[0.3em] text-white mb-6">{t('menu.title')}</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-white transition-colors">{t('menu.about')}</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">{t('menu.projects')}</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">{t('menu.news')}</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">{t('menu.contact')}</a></li>
                        </ul>
                    </div>
                    
                    
                    <div>
           
                        <h4 className="font-normal tracking-[0.3em] text-white mb-6">{t('projects.title')}</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-white transition-colors">{t('projects.project1')}</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">{t('projects.project2')}</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">{t('projects.project3')}</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">{t('projects.project4')}</a></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="-mt-8">
                <div className="container mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
                    <p>© {new Date().getFullYear()} Alians Development</p>
                    <a href="#" className="hover:text-white transition-colors mt-4 md:mt-0">{t('privacy')}</a>
                </div>
            </div>
        </footer>
  );
};

export default Footer;