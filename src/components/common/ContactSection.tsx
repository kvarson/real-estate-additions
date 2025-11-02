// Contact section component
'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { COMPANY_INFO } from '@/constants';
import ContactForm from '@/components/forms/ContactForm';
import { ArrowRight } from 'lucide-react';
import ArrovSvg from '../svg/arrovSvg';
import ArrovSvgWhite from '../svg/arrovSvgWhite';
import ArrovSvgRight from '../svg/arrovSvgRight';

const ContactSection: React.FC = () => {
     const t = useTranslations('navigation');
     const tCommon = useTranslations('common');
     a;
     const tNews = useTranslations('news');

     const newsItems = [
          {
               date: tNews('article1.date'),
               title: tNews('article1.title'),
               description: tNews('article1.description'),
               imageUrl: '/newsimage.png',
          },
          {
               date: tNews('article2.date'),
               title: tNews('article2.title'),
               description: tNews('article2.description'),
               imageUrl: '/newsimage2.png',
          },
     ];

     const [hovered, setHovered] = useState(false);

     return (
          <section className="bg-white text-black py-20 md:py-32">
               <div className="container mx-auto px-8">
                    <div className="flex justify-between items-center mb-12  px-4 md:px-12">
                         <h2 className="text-5xl md:text-6xl font-normal font-cinzel tracking-widest">
                              {t('news').toUpperCase()}
                         </h2>
                         <button
                              onMouseEnter={() => setHovered(true)}
                              onMouseLeave={() => setHovered(false)}
                              className="px-6 flex items-center py-2 border border-zinc-300 text-sm font-semibold tracking-wider 
                 hover:bg-black hover:text-white transition-colors"
                         >
                              <h1 className="ml-2 text-xl font-sans font-normal">
                                   {tCommon('view_all')}
                              </h1>
                              <div className="ml-2 transition-all duration-300">
                                   {hovered ? <ArrovSvgWhite /> : <ArrovSvg />}
                              </div>
                         </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10  px-2 md:px-8">
                         {newsItems.map((item, index) => (
                              <div key={index} className="group">
                                   {/* Resim */}
                                   <div className="overflow-hidden rounded-md">
                                        <img
                                             src={item.imageUrl}
                                             alt={item.title}
                                             className="w-full h-100 object-cover transform transition-transform duration-500 group-hover:scale-110"
                                        />
                                   </div>

                                   {/* Tarih */}
                                   <p className="text-zinc-500 mt-4 text-sm">
                                        {item.date}
                                   </p>

                                   {/* Başlık */}
                                   <h3 className="text-xl font-semibold mt-2">
                                        {item.title}
                                   </h3>

                                   {/* Açıklama */}
                                   <p className="text-zinc-600 mt-2">
                                        {item.description}
                                   </p>

                                   {/* Read more */}
                                   <a
                                        href="#"
                                        className="inline-flex items-center text-xl text-[#000000] font-sans mt-4 hover:text-black"
                                   >
                                        {tCommon('read_more')} <ArrovSvgRight />
                                   </a>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
};

export default ContactSection;
