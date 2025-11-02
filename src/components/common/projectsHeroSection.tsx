'use client';

import React from "react";

interface HeroSectionProps {
  project: {
    imageUrl?: string;
    name?: string;
    location?: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ project }) => {
  // Debug için proje verisini yazdıralım
  console.log("HeroSection - Project data:", project);
  
  // Resim URL'sinin geçerli olup olmadığını kontrol eden fonksiyon
  const isValidImageUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    // Basit bir URL kontrolü
    return url.startsWith('http') || url.startsWith('/');
  };

  return (
    <section className="relative h-screen bg-center text-white flex items-center justify-center">
      {/* Arkaplan resmi */}
      {isValidImageUrl(project.imageUrl) ? (
        <div className="absolute inset-0">
          <img
            src={project.imageUrl}
            alt={project.name || "Project image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-50"></div>
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582463143472-3119e7193f14?q=80&w=2574&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}

      {/* Yazı içeriği */}
      <div className="relative z-10 text-center -mt-24">
        <p className="text-sm text-gray-300 mb-4 flex items-center justify-center">
          Əsas səhifə / Layihələr / <div className="text-[#FFFFFFE0] ">{project.name}</div>
        </p>
        <h1 className="text-7xl font-serif">{project.name}</h1>
        <p className="text-4xl mt-6 tracking-widest ml-56 font-cinzel-decorative">
          {project.location }
        </p>
      </div>
    </section>
  );
};

export default HeroSection;