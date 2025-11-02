// FAQ section component

'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ } from '@/types';
import { useTranslations } from 'next-intl';

interface FAQSectionProps {
     faqs?: FAQ[];
}

const FaqSectionSection: React.FC<FAQSectionProps> = () => {
     const t = useTranslations('faq');

     const faqItems = [
          t('questions.q1'),
          t('questions.q2'),
          t('questions.q3'),
          t('questions.q4'),
          t('questions.q5'),
     ];

     return (
          <section className="bg-white text-black py-20 md:py-32">
               <div className="container mx-auto px-8 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-serif tracking-widest text-center">
                         {t('title')}
                    </h2>
                    <div className="w-20 h-px bg-zinc-300 my-6 mx-auto"></div>
                    <div className="mt-16 space-y-4">
                         {faqItems.map((item, index) => (
                              <div
                                   key={index}
                                   className="border-b border-zinc-200 py-4"
                              >
                                   <button className="w-full flex justify-between items-center text-left">
                                        <h4 className="text-lg font-medium text-zinc-800">
                                             {item}
                                        </h4>
                                        <Plus className="text-zinc-500" />
                                   </button>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
};

export default FaqSectionSection;
