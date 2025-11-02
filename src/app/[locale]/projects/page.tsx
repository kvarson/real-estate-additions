// Projects list page - MVC View

import Link from 'next/link';
import { ProjectService, ProjectData } from '@/services/ProjectService';
import DeleteProjectButton from '@/components/DeleteProjectButton';

import { HeroSection, ProjectsSection,  } from '@/components/common';
import Header from '@/components/layout/HeaderProjects';
import ServicesSection from '@/components/common/ServicesSecProjects'
import ContactSectionContent from '@/components/common/ContactSectionContent';
import { Footer } from '@/components/layout';

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  // Projeleri getir
  let projects: ProjectData[] = [];
  let error = '';

  try {
    if (resolvedSearchParams.search) {
      projects = await ProjectService.searchProjects(resolvedSearchParams.search);
    } else {
      projects = await ProjectService.getAllProjects();
    }
  } catch (err: unknown) {
    error = 'Projeler yüklenirken hata oluştu';
    console.error('Projects page error:', err);
  }

  console.log("projects",projects);
  

  return (
    <div className="">
      <Header />
      {/* Pass the projects data to ServicesSection component */}
      <ServicesSection projects={projects} error={error} />
      <ContactSectionContent/>
      <Footer />
    </div>
  );
}