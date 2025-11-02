'use client';

import React from 'react';

const AmenitiesSection = () => {
    const amenities = [
        { 
          title: 'İdman Meydançası', 
          description: 'Həyətyanı ərazidə sakinlərin fiziki sağlamlığı üçün idmanla məşğul olmaq və asudə vaxtını səmərəli keçirmək üçün şərait yaradılıb.',
          img: 'https://images.unsplash.com/photo-1541534401786-204b89287e02?q=80&w=2670&auto=format&fit=crop'
        },
        { 
          title: 'Metro', 
          img: 'https://images.unsplash.com/photo-1567112352054-a657c433a1e0?q=80&w=2574&auto=format&fit=crop'
        },
        { 
          title: 'Supermarket', 
          img: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=2574&auto=format&fit=crop'
        },
        { 
          title: 'Aptek', 
          img: 'https://images.unsplash.com/photo-1585435557343-37c82c762661?q=80&w=2574&auto=format&fit=crop'
        }
    ];

    return (
        <section className="bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {amenities.map((item, index) => (
                    <div 
                        key={index} 
                        className="relative h-96 bg-cover bg-center group"
                        style={{ backgroundImage: `url(${item.img})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-end p-8 text-white">
                           <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                           {item.description && <p className="text-sm opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">{item.description}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AmenitiesSection;