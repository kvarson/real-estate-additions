// Hero section component

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  const t = useTranslations('hero');
  return (
 <section className="relative h-screen min-h-[700px] flex items-center justify-center">
      {/* Arka Plan Resmi */}
      <div className="absolute inset-0 bg-black">
    <Image
  src="/aliansBackground.png"
  alt="Modern binalar"
  fill
  className="object-cover opacity-50"
/>
      </div>
      
      {/* İçerik */}
      <div className="relative z-5 text-center">
        <h2 className=" md:text-7xl max-w-4xl text-[#FFFFFF] font-cinzel-decorative text-5xl">
          {t('title')}
        </h2>
        {/* <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
          {t('subtitle')}
        </p> */}
        <button className="mt-8 inline-flex items-center px-8 py-3 border border-zinc-400 text-zinc-300 font-semibold tracking-widest hover:bg-white hover:text-black transition-colors">
          {t('button')}
          <ArrowRight className="ml-3 h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;