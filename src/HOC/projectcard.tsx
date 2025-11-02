// ProjectCard.tsx
import Link from 'next/link';

interface ProjectCardProps {
  name: string;
  location: string;
  imageUrl: string;
  id: number; // Yeni eklenen prop
  locale: string; // Yeni eklenen prop
}

const ProjectCard = ({ name, location, imageUrl, id, locale }: ProjectCardProps) => {
  return (
    <Link href={`/${locale}/projects/${id}`} className="block">
      <div className="relative group overflow-hidden h-[600px] md:h-[750px]">
        {/* Arka plan resim */}
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Karanlık overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>

        {/* Yazılar tam ortada */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h4 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            {name}
          </h4>
          <p className="text-zinc-200 mt-2">{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;