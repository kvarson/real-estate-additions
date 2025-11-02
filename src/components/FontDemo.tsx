// Font Demo Component - Cinzel fontlarını test etmek için

import React from 'react';

const FontDemo: React.FC = () => {
     return (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
               <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Cinzel Font Demo
               </h2>

               {/* Cinzel Normal Font */}
               <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                         Cinzel Font (Normal)
                    </h3>
                    <div className="space-y-4">
                         <div className="font-cinzel text-base font-normal">
                              <span className="text-gray-600 text-sm">
                                   Regular (400):
                              </span>
                              <br />
                              The quick brown fox jumps over the lazy dog.
                         </div>
                         <div className="font-cinzel text-base font-medium">
                              <span className="text-gray-600 text-sm">
                                   Medium (500):
                              </span>
                              <br />
                              The quick brown fox jumps over the lazy dog.
                         </div>
                         <div className="font-cinzel text-base font-semibold">
                              <span className="text-gray-600 text-sm">
                                   SemiBold (600):
                              </span>
                              <br />
                              The quick brown fox jumps over the lazy dog.
                         </div>
                         <div className="font-cinzel text-base font-bold">
                              <span className="text-gray-600 text-sm">
                                   Bold (700):
                              </span>
                              <br />
                              The quick brown fox jumps over the lazy dog.
                         </div>
                         <div className="font-cinzel text-base font-extrabold">
                              <span className="text-gray-600 text-sm">
                                   ExtraBold (800):
                              </span>
                              <br />
                              The quick brown fox jumps over the lazy dog.
                         </div>
                         <div className="font-cinzel text-base font-black">
                              <span className="text-gray-600 text-sm">
                                   Black (900):
                              </span>
                              <br />
                              The quick brown fox jumps over the lazy dog.
                         </div>
                    </div>
               </div>

               {/* Cinzel Decorative Font */}
               <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                         Cinzel Decorative Font
                    </h3>
                    <div className="space-y-4">
                         <div className="font-cinzel-decorative text-base font-normal">
                              <span className="text-gray-600 text-sm">
                                   Regular (400):
                              </span>
                              <br />
                              The quick brown fox jumps over the lazy dog.
                         </div>
                         <div className="font-cinzel-decorative text-base font-bold">
                              <span className="text-gray-600 text-sm">
                                   Bold (700):
                              </span>
                              <br />
                              The quick brown fox jumps over the lazy dog.
                         </div>
                         <div className="font-cinzel-decorative text-base font-black">
                              <span className="text-gray-600 text-sm">
                                   Black (900):
                              </span>
                              <br />
                              The quick brown fox jumps over the lazy dog.
                         </div>
                    </div>
               </div>

               {/* Türkçe Test */}
               <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                         Türkçe Karakterler
                    </h3>
                    <div className="space-y-4">
                         <div className="font-cinzel text-lg font-normal">
                              Şırdan çorba içen mağribi üçgen Öğrenci ışık
                              ÇĞIÖŞÜ
                         </div>
                         <div className="font-cinzel-decorative text-lg font-bold">
                              Şırdan çorba içen mağribi üçgen Öğrenci ışık
                              ÇĞIÖŞÜ
                         </div>
                    </div>
               </div>

               {/* Örnek Başlık Kullanımları */}
               <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                         Örnek Kullanımlar
                    </h3>
                    <div className="space-y-6">
                         <h1 className="font-cinzel-decorative text-4xl font-bold text-gray-900">
                              Ana Başlık Örneği
                         </h1>
                         <h2 className="font-cinzel text-2xl font-semibold text-gray-800">
                              Alt Başlık Örneği
                         </h2>
                         <p className="font-cinzel text-base font-normal text-gray-700 leading-relaxed">
                              Bu bir paragraf örneğidir. Cinzel fontu
                              okunabilirlik ve estetik görünüm sağlar.
                              Projenizde başlıklar ve özel metinler için
                              kullanabilirsiniz.
                         </p>
                    </div>
               </div>

               {/* CSS Class Kullanımları */}
               <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                         CSS Class Kullanımları
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                         <div className="text-sm text-gray-600 mb-4">
                              Kullanılabilir class&apos;lar:
                         </div>
                         <div className="space-y-2 text-sm font-mono">
                              <div>
                                   <code className="bg-blue-100 px-2 py-1 rounded">
                                        font-cinzel
                                   </code>{' '}
                                   - Normal Cinzel fontu
                              </div>
                              <div>
                                   <code className="bg-blue-100 px-2 py-1 rounded">
                                        font-cinzel-decorative
                                   </code>{' '}
                                   - Decorative Cinzel fontu
                              </div>
                              <div>
                                   <code className="bg-blue-100 px-2 py-1 rounded">
                                        cinzel
                                   </code>{' '}
                                   - Legacy class (decorative)
                              </div>
                         </div>
                    </div>
               </div>

               {/* Inline Style Kullanımı */}
               <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                         Inline Style Kullanımı
                    </h3>
                    <div className="space-y-4">
                         <div
                              style={{ fontFamily: 'var(--font-cinzel)' }}
                              className="text-lg"
                         >
                              CSS Variable ile: var(--font-cinzel)
                         </div>
                         <div
                              style={{
                                   fontFamily: 'var(--font-cinzel-decorative)',
                              }}
                              className="text-lg"
                         >
                              CSS Variable ile: var(--font-cinzel-decorative)
                         </div>
                         <div
                              style={{ fontFamily: 'Cinzel, serif' }}
                              className="text-lg"
                         >
                              Direkt font family: Cinzel, serif
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default FontDemo;
