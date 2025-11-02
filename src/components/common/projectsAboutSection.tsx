'use client';

import React from 'react';

const CheckIcon = () => (
     <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 mr-4 flex-shrink-0"
     >
          <polyline points="20 6 9 17 4 12"></polyline>
     </svg>
);

const AboutSection = ({ project }) => {
     // API'den gelen project objesinden dinamik değerleri çıkarıyoruz
     const projectDetails = [
          { key: 'Məkan', value: project?.location || '-' },
          { key: 'Status', value: project?.status || '-' },
          { key: 'İl', value: project?.year || '-' },
          { key: 'Ərazi', value: project?.area || '-' },
          { key: 'Blok', value: project?.block || '-' },
     ];

     const features = [
          'Layihənin yaradıcıları istərlar, mənzillərin planlaşdırılmasında, istərsə də yaşayış kompleksinin daxili sahəsinin təşkilində xüsusi diqqət yetirmişlər.',
          'Yaşayış kompleksi həm uşaqlar, həm də böyüklər üçün rahat və maraqlı bir yaşayış şəraiti yaradan əsl kiçik şəhərcikdir.',
          'Kompleksin ərazisi girişə nəzarət sistemi, perimetr üzrə 24 saat video müşahidə, həmçinin təhlükəsizlik xidməti ilə etibarlı şəkildə mühafizə olunur.',
          'Yaxın bir neçə ildə burada yeni Bakıxanov metrostansiyasının (mavi xətt üzrə) açılışı gözlənilir ki, bu da şəhərin istənilən nöqtəsindən bir neçə dəqiqə ərzində şəhərin istənilən nöqtəsinə gedə biləcəklər.',
     ];

     return (
          <section className="bg-white py-20 px-6">
               <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                         {/* Sol Sütun */}
                         <div>
                              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                   LAYİHƏ HAQQINDA
                              </h2>
                              <p className="text-gray-600 leading-relaxed mb-8">
                                   {project?.description}
                              </p>
                              <button className="border border-black text-black font-semibold py-3 px-6 rounded-md hover:bg-black hover:text-white transition-all duration-300 flex items-center group">
                                   KATALOQ YÜKLƏ{' '}
                                   <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                                        →
                                   </span>
                              </button>
                         </div>

                         {/* Sağ Sütun */}
                         <div className="w-full">
                              {projectDetails.map((detail, index) => (
                                   <div
                                        key={index}
                                        className="flex justify-between items-center py-4 border-b border-gray-200"
                                   >
                                        <span className="text-gray-500">
                                             {detail.key}
                                        </span>
                                        <span className="text-gray-800 font-semibold">
                                             {detail.value}
                                        </span>
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* Model Resmi */}
                    <div className="mt-20">
                         <img
                              src={
                                   project?.image ||
                                   'https://placehold.co/1200x600/f0f0f0/cccccc?text=Bina+Modeli'
                              }
                              alt="Proje Modeli"
                              className="w-full h-auto rounded-lg object-cover"
                         />
                    </div>

                    {/* Özellikler Listesi */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                         {features.map((feature, index) => (
                              <div key={index} className="flex items-start">
                                   <CheckIcon />
                                   <p className="text-gray-600">{feature}</p>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
};

export default AboutSection;
