

import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { 
  HeroSection, 
  ProjectsSection, 
  ServicesSection, 
  NewsSection, 
  FAQSection, 
  ContactSection, 
  CTASection
} from '@/components/common';
import CallToActionSection from '@/components/common/CallToActionSection';
import FaqSectionSection from '@/components/common/FaqSectioncontent';
import ContactSectionContent from '@/components/common/ContactSectionContent';
import UnderConstructionPage from '@/components/common/underpage';
// import FontDemo from '@/components/FontDemo';
// import FontGuide from '@/components/FontGuide';

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <div className="min-h-screen bg-white">
    
      
      {/* MVC Demo Navigation */}


{/* <UnderConstructionPage/> */}
      <Header />
      <HeroSection />
      <ProjectsSection />
      <ServicesSection />
      <NewsSection />
      <CTASection />
      <FAQSection />
      <ContactSection />
      <CallToActionSection />
      <FaqSectionSection/>
      <ContactSectionContent/>
      <Footer />

      
      {/* <div className="bg-blue-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-sm">
              🚀 <strong>MVC Yapısı Demo:</strong> PostgreSQL + Sequelize ORM ile proje yönetimi
            </p>
            <Link
              href="/az/projects"
              className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Projeleri Görüntüle →
            </Link>
          </div>
        </div>
      </div> */}

      
    </div>
  );
}
