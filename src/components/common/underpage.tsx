import Image from "next/image";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import UnderLogoSvg from "../svg/underLogoSvg";
import LinkedinSvg from "../svg/linkedinSvg";
import Instagramsvg from "../svg/instagramsvg";
import FacebookSvg from "../svg/facebookSvg";


const icons = [
  {
    element: <LinkedinSvg />,
    href: "https://www.linkedin.com/company/alians-development/",
  },
  {
    element: <Instagramsvg />,
    href: "https://www.instagram.com/alians_development_baku?igsh=MW93cm9laTA0aGQ2cg==",
  },
  {
    element: <FacebookSvg />,
    href: "https://www.facebook.com/kullaniciadiniz/",
  },
];


export default function UnderConstructionPage() {
  return (
    <main className="relative flex h-screen w-screen items-center justify-center">
      {/* Background Image */}
      <Image
        src="/underconsturction.png"
        alt="Under Construction Background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white">
        <div className="mb-12 font-sans">
          <UnderLogoSvg/>
        </div>

        <h2 className="mb-4 font-serif text-6xl font-medium tracking-wide md:text-7xl">
          UNDER CONSTRUCTION
        </h2>

        <p className="max-w-xl px-4 text-base font-light text-gray-300 md:text-lg">
          Explore a diverse range of projects that highlight our innovation,
          expertise, and dedication to delivering exceptional results.
        </p>
<div className="mt-8 flex items-center space-x-6">
  {icons.map(({ element, href }, i) => (
    <a
      key={i}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-gray-500 transition-colors"
    >
   <div className="text-white transition-all duration-300 group-hover:text-[#0A66C2]">
  {element}
</div>
    </a>
  ))}
</div>

      </div>
    </main>
  );
}
