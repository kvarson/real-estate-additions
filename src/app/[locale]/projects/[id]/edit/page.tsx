// Edit project page - MVC View

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectService } from '@/services/ProjectService';

interface PageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
  searchParams: Promise<{ 
    error?: string; 
  }>;
}

// Server action for update with ID binding
async function updateProjectWithId(id: number, formData: FormData) {
  'use server';
  
  const { updateProjectAction } = await import('@/actions/projectActions');
  return updateProjectAction(id, formData);
}

export default async function EditProjectPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { id, locale } = resolvedParams;
  const projectId = parseInt(id);
  
  if (isNaN(projectId)) {
    notFound();
  }

  let project;
  try {
    project = await ProjectService.getProjectById(projectId);
  } catch (error) {
    console.error('Edit project page error:', error);
    notFound();
  }

  if (!project) {
    notFound();
  }

  const updateAction = updateProjectWithId.bind(null, projectId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/${locale}/projects/${project.id}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Proje Detayına Dön
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-cinzel-decorative">Proje Düzenle</h1>
          
          {/* Error message */}
          {resolvedSearchParams.error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              {decodeURIComponent(resolvedSearchParams.error)}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <form action={updateAction} className="space-y-6">
            {/* Proje Adı */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Proje Adı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                minLength={2}
                maxLength={255}
                defaultValue={project.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Proje adını girin..."
              />
              <p className="text-sm text-gray-500 mt-1">
                En az 2, en fazla 255 karakter olmalıdır.
              </p>
            </div>

            {/* Proje Açıklaması */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Proje Açıklaması
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={project.description || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Proje hakkında detaylı bilgi verin... (isteğe bağlı)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Proje hakkında detaylı açıklama yapabilirsiniz.
              </p>
            </div>

            {/* Proje Resmi */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Proje Resmi
              </label>
              {project.imageUrl && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Mevcut resim:</p>
                  <img 
                    src={project.imageUrl} 
                    alt="Proje resmi" 
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                </div>
              )}
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG, GIF veya WEBP formatında resim yükleyin (isteğe bağlı)
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors font-medium"
              >
                Değişiklikleri Kaydet
              </button>
              <Link
                href={`/${locale}/projects/${project.id}`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-md transition-colors font-medium text-center"
              >
                İptal
              </Link>
            </div>
          </form>
        </div>

        {/* Project Info */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Proje Bilgileri</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Proje ID:</strong> {project.id}</p>
            <p><strong>Oluşturulma:</strong> {new Date(project.createdAt).toLocaleString('tr-TR')}</p>
            <p><strong>Son Güncelleme:</strong> {new Date(project.updatedAt).toLocaleString('tr-TR')}</p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Form Submission</h3>
          <p className="text-sm text-blue-700">
            Bu form MVC yapısında Server Actions kullanarak direkt PostgreSQL veritabanına 
            güncelleme yapar. Sequelize ORM ile veri doğrulama ve güncelleme işlemi gerçekleştirilir.
          </p>
        </div>
      </div>
    </div>
  );
}