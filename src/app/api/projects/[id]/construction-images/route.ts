// Construction Images API - Proje inşaat resimleri için ayrı endpoint

import { NextRequest } from 'next/server';
import { BaseController } from '@/controllers/BaseController';
import { ProjectConstructionImage } from '@/models';
import { connectDB } from '@/lib/sequelize';
import { uploadFileToServer } from '@/utils/serverFileUpload';

export class ConstructionImageController extends BaseController {
  /**
   * GET /api/projects/[id]/construction-images - Proje inşaat resimlerini getir
   */
  async index(request: NextRequest, params: { id: string }) {
    try {
      await connectDB();
      const projectId = parseInt(params.id);
      
      if (isNaN(projectId)) {
        return this.error('Geçersiz proje ID\'si', 400);
      }

      const constructionImages = await ProjectConstructionImage.findAll({
        where: { projectId },
        order: [['createdAt', 'ASC']]
      });

      return this.success(constructionImages, 'İnşaat resimleri başarıyla getirildi');
    } catch (error: unknown) {
      console.error('Construction images index error:', error);
      return this.error('İnşaat resimleri getirilirken hata oluştu', 500);
    }
  }

  /**
   * POST /api/projects/[id]/construction-images - Yeni inşaat resmi ekle
   */
  async store(request: NextRequest, params: { id: string }) {
    try {
      await connectDB();
      const projectId = parseInt(params.id);
      
      if (isNaN(projectId)) {
        return this.error('Geçersiz proje ID\'si', 400);
      }

      const contentType = request.headers.get('content-type') || '';
      
      if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData();
        const imageFile = formData.get('image') as File | null;

        if (!imageFile || imageFile.size === 0) {
          return this.error('Resim dosyası gereklidir', 400);
        }

        try {
          const imageUrl = await uploadFileToServer(imageFile);
          
          const constructionImage = await ProjectConstructionImage.create({
            projectId,
            imageUrl
          });

          return this.success(constructionImage, 'İnşaat resmi başarıyla eklendi', 201);
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          return this.error('Resim yüklenirken hata oluştu', 400);
        }
      } else if (contentType.includes('application/json')) {
        const body = await this.parseBody(request) as Record<string, unknown>;
        
        if (!body.imageUrl || typeof body.imageUrl !== 'string') {
          return this.error('Resim URL\'si gereklidir', 400);
        }

        const constructionImage = await ProjectConstructionImage.create({
          projectId,
          imageUrl: body.imageUrl as string
        });

        return this.success(constructionImage, 'İnşaat resmi başarıyla eklendi', 201);
      } else {
        return this.error('Desteklenmeyen içerik türü. multipart/form-data veya application/json kullanın.', 400);
      }
    } catch (error: unknown) {
      console.error('Construction image store error:', error);
      return this.error('İnşaat resmi eklenirken hata oluştu', 500);
    }
  }
}

const constructionImageController = new ConstructionImageController();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return await constructionImageController.index(request, resolvedParams);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return await constructionImageController.store(request, resolvedParams);
}
