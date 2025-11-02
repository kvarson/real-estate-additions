// Project detail page - MVC View

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectService } from '@/services/ProjectService';
import DeleteProjectButton from '@/components/DeleteProjectButton';
import Header from '@/components/layout/projectsHeader';
import HeroSection from '@/components/common/projectsHeroSection';
import AboutSection from '@/components/common/projectsAboutSection';
import AmenitiesSection from '@/components/common/projectsAmenitiesSection';

interface PageProps {
     params: Promise<{
          id: string;
          locale: string;
     }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
     const resolvedParams = await params;
     const { id, locale } = resolvedParams;
     const projectId = parseInt(id);

     if (isNaN(projectId)) {
          notFound();
     }

     let project;
     try {
          project = await ProjectService.getProjectById(projectId);
          console.log('Project data:', project); // Debug için proje verisini yazdıralım
     } catch (error) {
          console.error('Project detail error:', error);
          notFound();
     }

     if (!project) {
          notFound();
     }

     return (
          <main className="bg-white">
               <Header />
               {/* ✅ project verisini HeroSection’a gönderiyoruz */}
               <HeroSection project={project} />
               <AboutSection project={project} />
               <AmenitiesSection />
          </main>
     );
}
