// CTA (Call to Action) section component
"use client";

import React from 'react';
import { Button } from '@/components/ui';
import { ArrowRight, Award, CalendarClock, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const CallToActionSection: React.FC = () => {
  const t = useTranslations('callToAction');

  return (
<section className="relative bg-black text-white py-40 group">

  <div className="absolute inset-0 overflow-hidden">
    <img 
      src="/contentbackgorund.jpg" 
      alt="Cityscape"
      className="w-full h-full opacity-30 object-cover transform transition-transform duration-500 group-hover:scale-110"
    />
  </div>
  <div className="relative container mx-auto px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-semibold">{t('title')}</h2>
    <button className="mt-8 inline-flex items-center px-8 py-3 border border-zinc-400 text-zinc-300 font-semibold tracking-widest hover:bg-white hover:text-black transition-colors">
      {t('button')}
      <ArrowRight className="ml-3 h-5 w-5" />
    </button>
  </div>
</section>


  );
};

export default CallToActionSection;