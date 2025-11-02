

import React from 'react';

const FontGuide: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-cinzel-decorative">
        🎨 Cinzel Font Kullanım Rehberi
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Tailwind Classes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-cinzel">
            1. Tailwind CSS Class&apos;ları
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <code className="text-blue-600">className=&quot;font-cinzel&quot;</code>
              <div className="font-cinzel mt-2">Normal Cinzel fontu</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <code className="text-blue-600">className=&quot;font-cinzel-decorative&quot;</code>
              <div className="font-cinzel-decorative mt-2">Decorative Cinzel fontu</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <code className="text-blue-600">className=&quot;cinzel&quot;</code>
              <div className="cinzel mt-2">Legacy class (decorative)</div>
            </div>
          </div>
        </div>

        {/* CSS Variables */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-cinzel">
            2. CSS Variables
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <code className="text-green-600">var(--font-cinzel)</code>
              <div style={{ fontFamily: 'var(--font-cinzel)' }} className="mt-2">
                CSS Variable ile kullanım
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <code className="text-green-600">var(--font-cinzel-decorative)</code>
              <div style={{ fontFamily: 'var(--font-cinzel-decorative)' }} className="mt-2">
                Decorative CSS Variable
              </div>
            </div>
          </div>
        </div>

        {/* Inline Styles */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-cinzel">
            3. Inline Styles
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <code className="text-purple-600">fontFamily: &apos;Cinzel, serif&apos;</code>
              <div style={{ fontFamily: 'Cinzel, serif' }} className="mt-2">
                Direkt font family
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <code className="text-purple-600">fontFamily: &apos;Cinzel Decorative, serif&apos;</code>
              <div style={{ fontFamily: 'Cinzel Decorative, serif' }} className="mt-2">
                Decorative direkt kullanım
              </div>
            </div>
          </div>
        </div>

        {/* Font Weights */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-cinzel">
            4. Font Ağırlıkları
          </h3>
          <div className="space-y-2">
            <div className="font-cinzel font-normal">Normal (400)</div>
            <div className="font-cinzel font-medium">Medium (500)</div>
            <div className="font-cinzel font-semibold">SemiBold (600)</div>
            <div className="font-cinzel font-bold">Bold (700)</div>
            <div className="font-cinzel font-extrabold">ExtraBold (800)</div>
            <div className="font-cinzel font-black">Black (900)</div>
          </div>
        </div>
      </div>

      {/* Örnek Kombinasyonlar */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 font-cinzel">
          5. Örnek Kombinasyonlar
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-cinzel-decorative text-2xl font-bold text-gray-900 mb-2">
              Ana Başlık İçin
            </h4>
            <p className="font-cinzel text-gray-700">
              Ana başlıklar için <code>font-cinzel-decorative</code> ve <code>font-bold</code> kullanın.
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <h4 className="font-cinzel text-xl font-semibold text-gray-900 mb-2">
              Alt Başlık İçin
            </h4>
            <p className="text-gray-700">
              Alt başlıklar için <code>font-cinzel</code> ve <code>font-semibold</code> kullanın.
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <p className="font-cinzel text-base text-gray-800 leading-relaxed">
              Paragraf metinleri için <code>font-cinzel</code> ve <code>font-normal</code> 
              kullanarak okunabilirliği koruyun. Bu font özellikle lüks ve premium 
              projeler için uygundur.
            </p>
          </div>
        </div>
      </div>

      {/* Kullanım İpuçları */}
      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <h4 className="font-cinzel font-semibold text-blue-900 mb-2">💡 İpuçları</h4>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Başlıklar için <strong>Cinzel Decorative</strong> kullanın</li>
          <li>• Uzun metinler için <strong>Cinzel Normal</strong> tercih edin</li>
          <li>• Font ağırlıkları ile hiyerarşi oluşturun</li>
          <li>• Türkçe karakterler tam destekleniyor</li>
          <li>• Responsive tasarımda font boyutlarını ayarlayın</li>
        </ul>
      </div>
    </div>
  );
};

export default FontGuide;