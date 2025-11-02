'use client';

import React from 'react';
import { Award, CalendarClock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ReliabilitySvg from '../svg/reliabilitySvg';
import QualitySvg from '../svg/qualitySvg';
import CompatibilitySvg from '../svg/compatibilitySvg';

const CTASection: React.FC = () => {
     const t = useTranslations('features');

     const features = [
          {
               icon: <ReliabilitySvg />,
               title: t('reliability.title'),
               description: t('reliability.description'),
          },
          {
               icon: <QualitySvg />,
               title: t('quality.title'),
               description: t('quality.description'),
          },
          {
               icon: <CompatibilitySvg />,
               title: t('compatibility.title'),
               description: t('compatibility.description'),
          },
     ];

     return (
          <section className="bg-[#080808] py-20">
               <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {features.map((feature, index) => (
                         <div
                              key={index}
                              className="flex flex-col items-center"
                         >
                              {/* icon ve title yan yana */}
                              <div className="flex items-center gap-3">
                                   {feature.icon}
                                   <h3 className="text-xl text-white font-semibold font-cinzel tracking-widest">
                                        {feature.title}
                                   </h3>
                              </div>

                              {/* açıklama */}
                              <p className="mt-3 font-sans text-zinc-400 max-w-xs">
                                   {feature.description}
                              </p>
                         </div>
                    ))}
               </div>
          </section>
     );
};

export default CTASection;
