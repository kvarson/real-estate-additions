// Projects section component

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button, Card } from '@/components/ui';
import { Project } from '@/types';
import { ArrowRight, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface ProjectsSectionProps {
     projects?: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
     const t = useTranslations('about');
     const tStats = useTranslations('stats');
     const tCommon = useTranslations('common');

     // Mock data for now
     const stats = [
          {
               value: tStats('stat1.value'),
               description: tStats('stat1.description'),
          },
          {
               value: tStats('stat2.value'),
               description: tStats('stat2.description'),
          },
          {
               value: tStats('stat3.value'),
               description: tStats('stat3.description'),
          },
     ];

     return (
          <section className="py-20 md:py-32 bg-[#ffff]">
               <div className="container mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Sol Taraf - Metin */}
                    <div className="max-w-xl -mt-32">
                         <h3 className="text-3xl md:text-4xl font-semibold leading-snug font-cinzel">
                              {t('title').toUpperCase()}
                         </h3>
                         <p className="mt-4 font-sans text-gray-600">
                              {t('description')}
                         </p>
                         <Link
                              href="/az/projects"
                              className="mt-8 inline-flex items-center px-8 py-3 border border-black font-sans text-[#000000] font-semibold tracking-widest hover:bg-black hover:text-white transition-colors"
                         >
                              {tCommon('learn_more')}
                              <ArrowRight className="ml-3 h-5 w-5" />
                         </Link>
                    </div>

                    {/* Sağ Taraf - İstatistikler */}
                    <div className="space-y-10">
                         {stats.map((stat, index) => (
                              <div
                                   key={index}
                                   className="border-b border-gray-200 pb-1"
                              >
                                   <p className="text-7xl font-normal font-cinzel text-[#1976d2]">
                                        {stat.value}
                                   </p>
                                   <div className="flex items-center mt-2">
                                        <ChevronUp className="h-4 w-4 text-green-500 mr-2" />
                                        <p className="text-sm text-zinc-500">
                                             {stat.description}
                                        </p>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
};

export default ProjectsSection;
