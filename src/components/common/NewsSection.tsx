'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface NewsSectionProps {
     articles?: unknown[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {
     const t = useTranslations('businessModel');

     const steps = [
          {
               id: 'arashdirma',
               no: '1',
               title: t('step1.title'),
               description: t('step1.description'),
          },
          {
               id: 'layihe',
               no: '2',
               title: t('step2.title'),
               description: t('step2.description'),
          },
          {
               id: 'inshaat',
               no: '3',
               title: t('step3.title'),
               description: t('step3.description'),
          },
          {
               id: 'satis',
               no: '4',
               title: t('step4.title'),
               description: t('step4.description'),
          },
     ];

     const [activeStep, setActiveStep] = useState(0);

     useEffect(() => {
          const interval = setInterval(() => {
               setActiveStep((prev) => (prev + 1) % steps.length);
          }, 2500);

          return () => clearInterval(interval);
     }, [steps.length]);

     return (
          // ANA SECTION GÜNCELLENDİ: Border ve İç gölge eklendi
          <section
               className="bg-[#080808] py-20 md:py-32
                       shadow-[inset_0_5px_15px_rgba(0,0,0,0.5),_0_0_20px_rgba(0,0,0,0.2)]"
          >
               <div className="container mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                         {/* Sol Taraf */}
                         <div className="max-w-lg">
                              <h2 className="text-4xl md:text-5xl font-semibold  font-cinzel text-white">
                                   {t('title')}
                              </h2>
                              <div className="w-20 h-px my-2"></div>
                              <p className="text-zinc-400 leading-relaxed">
                                   {t('description')}
                              </p>
                              <button className="mt-8 inline-flex items-center px-8 py-3 border border-zinc-400 text-zinc-300 font-widest hover:bg-white hover:text-black transition-colors">
                                   {t('button')}
                                   <ArrowRight className="ml-3 h-5 w-5" />
                              </button>
                         </div>

                         {/* Sağ Taraf - Adımlar */}
                         <div className="relative">
                              {/* Tüm adımların arkasından geçen sürekli akış çizgisi */}
                              {/* H-[calc(100%-48px)] bu değeri biraz kısalttık ki en altta boşluk kalsın */}
                              <div className="absolute left-[18px] top-5 h-[calc(100%-60px)] w-px bg-zinc-700/50">
                                   <div className="absolute top-0 left-0 w-full h-full animate-flow-gradient opacity-80"></div>
                              </div>

                              {steps.map((step, index) => {
                                   const isActive = index === activeStep;

                                   const titleClass = `text-xl font-semibold transition-all duration-300 transform origin-left 
                                ${
                                     isActive
                                          ? 'text-white animate-step-glow drop-shadow-[0_0_4px_rgba(0,180,255,0.9)]' // Işık rengine göre metin parlaklığı
                                          : 'text-zinc-300'
                                }`;

                                   const circleClass = `absolute left-0 top-0 flex items-center justify-center w-9 h-9 rounded-full font-bold border-2 transition-all duration-300 z-10 
                                ${
                                     isActive
                                          ? 'bg-blue-600 border-blue-400 text-white animate-step-glow'
                                          : 'bg-zinc-800 border-zinc-700 text-blue-400'
                                }`;

                                   return (
                                        <div
                                             key={step.id}
                                             className="relative pl-12 pb-12"
                                        >
                                             {/* Numara (Çember) */}
                                             <div className={circleClass}>
                                                  {step.no}
                                             </div>

                                             {/* Başlık */}
                                             <h3 className={titleClass}>
                                                  {step.title}
                                             </h3>

                                             <p className="mt-2 text-zinc-400">
                                                  {step.description}
                                             </p>

                                             {/* Adım Arası Bağlayıcı Çizgi */}
                                             {index !== steps.length - 1 && (
                                                  <div
                                                       className={`absolute left-[18px] top-9 h-[calc(100%-36px)] w-px transition-colors duration-500 ${
                                                            isActive
                                                                 ? 'bg-blue-500/50'
                                                                 : 'bg-zinc-800'
                                                       }`}
                                                  ></div>
                                             )}
                                        </div>
                                   );
                              })}
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default NewsSection;
