// Services section component
'use client';

import React, { useState, useEffect } from 'react';
import ProjectCard from '../../../src/HOC/projectcard'; // ProjectCard bileşenini import ediyoruz (dosya yolu farklı olabilir)

// Proje verisinin tip tanımını yapıyoruz
interface Project {
     id: number;
     name: string;
     description: string | null;
     imageUrl: string | null;
     // Yeni eklenen alanlar
     location?: string | null;
     status?: string | null;
     year?: number | null;
     area?: string | null;
     block?: number | null;
     createdAt: Date;
     updatedAt: Date;
}

interface ServicesSectionProps {
     projects?: Project[];
     error?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
     projects: initialProjects,
     error: initialError,
}) => {
     const [projects, setProjects] = useState<Project[]>(initialProjects || []);
     const [loading, setLoading] = useState(!initialProjects);
     const [error, setError] = useState<string | null>(initialError || null);
     const [activeFilter, setActiveFilter] = useState('davam_eden');

     useEffect(() => {
          // Eğer initialProjects verilmemişse, API'den projeleri çek
          if (!initialProjects) {
               const fetchProjects = async () => {
                    try {
                         setLoading(true);
                         // API'den projeleri çek
                         const response = await fetch('/api/projects');
                         const result = await response.json();

                         if (result.success) {
                              setProjects(result.data);
                         } else {
                              setError(
                                   result.message ||
                                        'Projeler yüklenirken bir hata oluştu.'
                              );
                         }
                    } catch (err) {
                         console.error(
                              'Hizmetler bölümü proje verilerini çekerken hata:',
                              err
                         );
                         setError('Projeler yüklenirken bir hata oluştu.');
                    } finally {
                         setLoading(false);
                    }
               };

               fetchProjects();
          }
     }, [initialProjects]);

     console.log('projects', projects);

     // Loading durumu
     if (loading) {
          return (
               <section className="bg-[#ffff] py-16">
                    <div className="container mx-auto px-4 text-center">
                         <p className="text-gray-500">Projeler yükleniyor...</p>
                    </div>
               </section>
          );
     }

     // Hata durumu
     if (error) {
          return (
               <section className="bg-[#ffff] py-16">
                    <div className="container mx-auto px-4 text-center">
                         <p className="text-red-500">{error}</p>
                    </div>
               </section>
          );
     }

     // Proje bulunamadıysa gösterilecek mesaj
     if (projects.length === 0) {
          return (
               <section className="bg-[#ffff] py-16">
                    <div className="container mx-auto px-4 text-center">
                         <p className="text-gray-500">
                              Gösterilecek proje bulunamadı.
                         </p>
                    </div>
               </section>
          );
     }

     // Locale bilgisini sabit olarak kullanıyoruz
     // Gerçek uygulamada bu bilgi dinamik olarak alınmalı
     const locale = 'az'; // Varsayılan olarak 'az' kullanıyoruz

     return (
          <section className="bg-[#ffff] py-16">
               <div className="px-4 md:px-12">
                    <div className="max-w-2xl mt-32 ml-4">
                         <h2 className="text-4xl md:text-5xl font-serif tracking-widest">
                              LAYİHƏLƏRİMİZ
                         </h2>
                         <p className="mt-4 text-xl text-[#4B4B4B]">
                              Explore a diverse range of projects that highlight
                              our innovation, expertise, and dedication to
                              delivering exceptional results.
                         </p>
                    </div>
                    <div className="mt-8 flex items-center space-x-2 ml-4">
                         <button
                              onClick={() => setActiveFilter('davam_eden')}
                              className={`px-8 py-3 text-sm font-semibold transition-colors rounded-md ${activeFilter === 'davam_eden' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
                         >
                              Davam edən
                         </button>
                         <button
                              onClick={() => setActiveFilter('tehvil_verilen')}
                              className={`px-8 py-3 text-sm font-semibold transition-colors rounded-md ${activeFilter === 'tehvil_verilen' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
                         >
                              Təhvil verilən
                         </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 mx-4">
                         {projects.map((project) => (
                              <ProjectCard
                                   // 'key' olarak projenin benzersiz 'id'sini kullanmak en doğrusudur
                                   key={project.id}
                                   // 'id' prop'u ile projenin ID'sini geçiyoruz
                                   id={project.id}
                                   // 'name' prop'una projenin adını veriyoruz
                                   name={project.name}
                                   // 'location' prop'una projenin açıklamasını veriyoruz. Eğer açıklama yoksa boş string ('') gönderir.
                                   location={project.location || ''}
                                   // 'imageUrl' prop'una resim URL'sini veriyoruz. Eğer resim yoksa varsayılan bir resim yolu belirleyebilirsiniz.
                                   imageUrl={
                                        project.imageUrl ||
                                        '/default-project-image.png'
                                   }
                                   // 'locale' prop'u ile locale bilgisini geçiyoruz
                                   locale={locale}
                              />
                         ))}
                    </div>
               </div>
          </section>
     );
};

export default ServicesSection;
