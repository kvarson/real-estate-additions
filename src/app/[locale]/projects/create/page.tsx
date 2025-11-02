// Create project page - MVC View

import Link from 'next/link';
import { createProjectAction } from '@/actions/projectActions';

interface PageProps {
     params: Promise<{
          locale: string;
     }>;
     searchParams: Promise<{ error?: string }>;
}

export default async function CreateProjectPage({
     params,
     searchParams,
}: PageProps) {
     const resolvedParams = await params;
     const resolvedSearchParams = await searchParams;
     const { locale } = resolvedParams;

     return (
          <div className="container mx-auto px-4 py-8">
               <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                         <div className="flex items-center gap-4 mb-4">
                              <Link
                                   href={`/${locale}/projects`}
                                   className="text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                   ← Projelere Dön
                              </Link>
                         </div>
                         <h1 className="text-3xl font-bold text-gray-900 font-cinzel-decorative">
                              Yeni Proje Oluştur
                         </h1>

                         {/* Error message */}
                         {resolvedSearchParams.error && (
                              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                                   {decodeURIComponent(
                                        resolvedSearchParams.error
                                   )}
                              </div>
                         )}
                    </div>

                    {/* Form */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                         <form
                              action={createProjectAction}
                              className="space-y-6"
                         >
                              {/* Proje Adı */}
                              <div>
                                   <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                   >
                                        Proje Adı{' '}
                                        <span className="text-red-500">*</span>
                                   </label>
                                   <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        minLength={2}
                                        maxLength={255}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Proje adını girin..."
                                   />
                                   <p className="text-sm text-gray-500 mt-1">
                                        En az 2, en fazla 255 karakter
                                        olmalıdır.
                                   </p>
                              </div>

                              {/* Proje Açıklaması */}
                              <div>
                                   <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                   >
                                        Proje Açıklaması
                                   </label>
                                   <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Proje hakkında detaylı bilgi verin... (isteğe bağlı)"
                                   />
                                   <p className="text-sm text-gray-500 mt-1">
                                        Proje hakkında detaylı açıklama
                                        yapabilirsiniz.
                                   </p>
                              </div>

                              {/* Proje Resmi */}
                              <div>
                                   <label
                                        htmlFor="image"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                   >
                                        Proje Resmi
                                   </label>
                                   <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   />
                                   <p className="text-sm text-gray-500 mt-1">
                                        JPG, PNG, GIF veya WEBP formatında resim
                                        yükleyin (isteğe bağlı)
                                   </p>
                              </div>

                              {/* Buttons */}
                              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                   <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors font-medium"
                                   >
                                        Proje Oluştur
                                   </button>
                                   <Link
                                        href={`/${locale}/projects`}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-md transition-colors font-medium text-center"
                                   >
                                        İptal
                                   </Link>
                              </div>
                         </form>
                    </div>

                    {/* Info Box */}
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                         <h3 className="text-sm font-medium text-blue-900 mb-2">
                              Bilgi
                         </h3>
                         <p className="text-sm text-blue-700">
                              Bu form direkt PostgreSQL veritabanına bağlanır ve
                              Sequelize ORM kullanarak veriyi kaydeder. MVC
                              yapısında Server Actions kullanılarak form
                              submission işlenir.
                         </p>
                    </div>
               </div>
          </div>
     );
}
