// Services section component

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button, Card } from '@/components/ui';
import { Service } from '@/types';
import ProjectCard from "../../../src/HOC/projectcard"

interface ServicesSectionProps {
  services?: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const t = useTranslations('projects');
  const tProjects = useTranslations('projectList');
  
  const projects = [
    { name: tProjects('metro.name'), location: tProjects('metro.location'), imageUrl: "/metroparkBackground.png" },
    { name: tProjects('panorama.name'), location: tProjects('panorama.location'), imageUrl: "/panoramabackground.png" },
    { name: tProjects('villa.name'), location: tProjects('villa.location'), imageUrl: "/villaoliviaBackgorud.png" },
    { name: tProjects('beyaz.name'), location: tProjects('beyaz.location'), imageUrl: "/beyazplazaBackground.png" },
  ];

  return (
    <section className="bg-[#ffff] py-16">
      {/* Container: ortalama ve yan boşluklar */}
      <div className=" px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;