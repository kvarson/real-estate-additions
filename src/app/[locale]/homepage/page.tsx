// app/page.tsx
import Image from "next/image";
import { Menu } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="w-full bg-[#333] text-white flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6 cursor-pointer" />
          <h1 className="text-lg font-semibold tracking-widest">ALIANS DEVELOPMENT</h1>
        </div>
        <button className="border border-white px-4 py-1 rounded text-sm hover:bg-white hover:text-black transition">
          CONTACT US
        </button>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-[#333] flex justify-center items-center py-20">
        <h2 className="text-2xl md:text-3xl text-white text-center font-medium">
          Professional Real <br /> Estate Development
        </h2>
      </section>

      {/* Projects Section */}
      <section className="px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-medium">
            Our Projects are designed <br /> based on your dreams...
          </h3>
          <button className="border border-black px-4 py-1 text-sm rounded hover:bg-black hover:text-white transition">
            ALL PROJECTS →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Card */}
          <div className="bg-gray-200 aspect-video flex flex-col justify-between">
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <span>Image</span>
            </div>
            <div className="p-3">
              <h4 className="font-medium">Metro Park</h4>
              <p className="text-sm text-gray-600">Bakikhanov</p>
            </div>
          </div>

          <div className="bg-gray-200 aspect-video flex flex-col justify-between">
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <span>Image</span>
            </div>
            <div className="p-3">
              <h4 className="font-medium">Panoramo Park</h4>
              <p className="text-sm text-gray-600">29-30 Ganja Avenue, Khatai district</p>
            </div>
          </div>

          <div className="bg-gray-200 aspect-video flex flex-col justify-between">
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <span>Image</span>
            </div>
            <div className="p-3">
              <h4 className="font-medium">Metro Park</h4>
              <p className="text-sm text-gray-600">Bakikhanov</p>
            </div>
          </div>

          <div className="bg-gray-200 aspect-video flex flex-col justify-between">
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <span>Image</span>
            </div>
            <div className="p-3">
              <h4 className="font-medium">Panoramo Park</h4>
              <p className="text-sm text-gray-600">29-30 Ganja Avenue, Khatai district</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
