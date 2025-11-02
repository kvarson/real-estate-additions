// Interior Images API - Proje iç mekan resimleri için ayrı endpoint

import { NextRequest } from 'next/server';
import { BaseController } from '@/controllers/BaseController';
import { ProjectInteriorImage } from '@/models';
import { connectDB } from '@/lib/sequelize';
import { uploadFileToServer } from '@/utils/serverFileUpload';

export class InteriorImageController extends BaseController {
  /**
   * GET /api/projects/[id]/interior-images - Proje iç mekan resimlerini getir
   */
  async index(request: NextRequest, params: { id: string }) {
    try {
      await connectDB();
      const projectId = parseInt(params.id);
      
      if (isNaN(projectId)) {
        return this.error('Geçersiz proje ID\'si', 400);
      }

      const interiorImages = await ProjectInteriorImage.findAll({
        where: { projectId },
        order: [['createdAt', 'ASC']]
      });

      return this.success(interiorImages, 'İç mekan resimleri başarıyla getirildi');
    } catch (error: unknown) {
      console.error('Interior images index error:', error);
      return this.error('İç mekan resimleri getirilirken hata oluştu', 500);
    }
  }

  /**
   * POST /api/projects/[id]/interior-images - Yeni iç mekan resmi ekle
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
        const caption = formData.get('caption') as string | null;

        if (!imageFile || imageFile.size === 0) {
          return this.error('Resim dosyası gereklidir', 400);
        }

        try {
          const imageUrl = await uploadFileToServer(imageFile);
          
          const interiorImage = await ProjectInteriorImage.create({
            projectId,
            imageUrl,
            caption: caption?.trim() || undefined
          });

          return this.success(interiorImage, 'İç mekan resmi başarıyla eklendi', 201);
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          return this.error('Resim yüklenirken hata oluştu', 400);
        }
      } else if (contentType.includes('application/json')) {
        const body = await this.parseBody(request) as Record<string, unknown>;
        
        if (!body.imageUrl || typeof body.imageUrl !== 'string') {
          return this.error('Resim URL\'si gereklidir', 400);
        }

        const interiorImage = await ProjectInteriorImage.create({
          projectId,
          imageUrl: body.imageUrl as string,
          caption: body.caption ? (body.caption as string).trim() : undefined
        });

        return this.success(interiorImage, 'İç mekan resmi başarıyla eklendi', 201);
      } else {
        return this.error('Desteklenmeyen içerik türü. multipart/form-data veya application/json kullanın.', 400);
      }
    } catch (error: unknown) {
      console.error('Interior image store error:', error);
      return this.error('İç mekan resmi eklenirken hata oluştu', 500);
    }
  }
}

const interiorImageController = new InteriorImageController();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return await interiorImageController.index(request, resolvedParams);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return await interiorImageController.store(request, resolvedParams);
}
