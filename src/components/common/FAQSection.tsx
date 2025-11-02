// FAQ section component

'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ } from '@/types';
import { useTranslations } from 'next-intl';

interface FAQSectionProps {
  faqs?: FAQ[];
}



interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isBlue?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isBlue = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-700 py-6">
      {/* Başlık */}
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4
          className={`text-lg font-medium ${
            isOpen && isBlue ? "text-blue-400" : "text-zinc-300"
          }`}
        >
          {title}
        </h4>
        {isOpen ? (
          <Minus className="text-zinc-400" />
        ) : (
          <Plus className="text-zinc-400" />
        )}
      </button>

      {/* İçerik - sabit animasyonlu alan */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-zinc-400 space-y-2 pl-4">{children}</div>
      </div>
    </div>
  );
};


const FAQSection: React.FC<FAQSectionProps> = () => {
  const t = useTranslations('services');
  

  return (
      <section className="bg-[#080808] py-20 md:py-32">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-cinzel text-white md:text-5xl font-semibold tracking-wider text-center">
                    {t('title')}
                </h2>
                {/* <div className="w-20 h-px bg-blue-500 my-6 mx-auto"></div> */}
                
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16">
                    {/* Sol Sütun */}
                    <div>
                        <AccordionItem title={t('marketing.title')} isBlue>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('marketing.item1')}</p>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('marketing.item2')}</p>
                        </AccordionItem>
                        <AccordionItem title={t('landSelection.title')} isBlue={false}>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('landSelection.item1')}</p>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('landSelection.item2')}</p>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('landSelection.item3')}</p>
                        </AccordionItem>
                        <AccordionItem title={t('documentation.title')} isBlue={false}>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('documentation.item1')}</p>
                        </AccordionItem>
                         <AccordionItem title={t('management.title')} isBlue={false}>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('management.item1')}</p>
                        </AccordionItem>
                    </div>

                    {/* Sağ Sütun */}
                    <div>
                        <AccordionItem title={t('engineering.title')} isBlue={false}>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('engineering.item1')}</p>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('engineering.item2')}</p>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('engineering.item3')}</p>
                        </AccordionItem>
                        <AccordionItem title={t('funding.title')} isBlue={false}>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('funding.item1')}</p>
                        </AccordionItem>
                        <AccordionItem title={t('construction.title')} isBlue={false}>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('construction.item1')}</p>
                        </AccordionItem>
                         <AccordionItem title={t('commissioning.title')} isBlue={false}>
                            <p className="flex items-start"><span className="text-blue-400 mr-2 mt-1">▲</span> {t('commissioning.item1')}</p>
                        </AccordionItem>
                    </div>
                </div>
            </div>
        </section>
  );
};

export default FAQSection;