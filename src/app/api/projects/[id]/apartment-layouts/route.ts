// Apartment Layouts API - Proje daire planları için ayrı endpoint

import { NextRequest } from 'next/server';
import { BaseController } from '@/controllers/BaseController';
import { ProjectApartmentLayout } from '@/models';
import { connectDB } from '@/lib/sequelize';
import { uploadFileToServer } from '@/utils/serverFileUpload';

export class ApartmentLayoutController extends BaseController {
     /**
      * GET /api/projects/[id]/apartment-layouts - Proje daire planlarını getir
      */
     async index(request: NextRequest, params: { id: string }) {
          try {
               await connectDB();
               const projectId = parseInt(params.id);

               if (isNaN(projectId)) {
                    return this.error("Geçersiz proje ID'si", 400);
               }

               const apartmentLayouts = await ProjectApartmentLayout.findAll({
                    where: { projectId },
                    order: [['createdAt', 'ASC']],
               });

               return this.success(
                    apartmentLayouts,
                    'Daire planları başarıyla getirildi'
               );
          } catch (error: unknown) {
               console.error('Apartment layouts index error:', error);
               return this.error(
                    'Daire planları getirilirken hata oluştu',
                    500
               );
          }
     }

     /**
      * POST /api/projects/[id]/apartment-layouts - Yeni daire planı ekle
      */
     async store(request: NextRequest, params: { id: string }) {
          try {
               await connectDB();
               const projectId = parseInt(params.id);

               if (isNaN(projectId)) {
                    return this.error("Geçersiz proje ID'si", 400);
               }

               const contentType = request.headers.get('content-type') || '';

               if (contentType.includes('multipart/form-data')) {
                    const formData = await request.formData();

                    const apartmentType = formData.get(
                         'apartmentType'
                    ) as string;
                    const squareMeter = formData.get('squareMeter') as string;
                    const layoutImageFile = formData.get(
                         'layoutImage'
                    ) as File | null;
                    const totalArea = formData.get('totalArea') as string;
                    const roomArea = formData.get('roomArea') as string;
                    const kitchenArea = formData.get('kitchenArea') as string;
                    const bathroomArea = formData.get('bathroomArea') as string;
                    const balconyArea = formData.get('balconyArea') as string;

                    // Validate required fields
                    if (!apartmentType || apartmentType.trim() === '') {
                         return this.error('Daire tipi gereklidir', 400);
                    }

                    if (!layoutImageFile || layoutImageFile.size === 0) {
                         return this.error('Plan resmi gereklidir', 400);
                    }

                    if (!totalArea || isNaN(parseFloat(totalArea))) {
                         return this.error(
                              'Toplam alan geçerli bir sayı olmalıdır',
                              400
                         );
                    }

                    try {
                         const layoutImageUrl =
                              await uploadFileToServer(layoutImageFile);

                         const apartmentLayout =
                              await ProjectApartmentLayout.create({
                                   projectId,
                                   apartmentType: apartmentType.trim(),
                                   squareMeter: squareMeter?.trim() || '',
                                   layoutImageUrl,
                                   totalArea: parseFloat(totalArea),
                                   roomArea: roomArea
                                        ? parseFloat(roomArea)
                                        : undefined,
                                   kitchenArea: kitchenArea
                                        ? parseFloat(kitchenArea)
                                        : undefined,
                                   bathroomArea: bathroomArea
                                        ? parseFloat(bathroomArea)
                                        : undefined,
                                   balconyArea: balconyArea
                                        ? parseFloat(balconyArea)
                                        : undefined,
                              });

                         return this.success(
                              apartmentLayout,
                              'Daire planı başarıyla eklendi',
                              201
                         );
                    } catch (uploadError) {
                         console.error(
                              'Layout image upload error:',
                              uploadError
                         );
                         return this.error(
                              'Plan resmi yüklenirken hata oluştu',
                              400
                         );
                    }
               } else if (contentType.includes('application/json')) {
                    const body = (await this.parseBody(request)) as Record<
                         string,
                         unknown
                    >;

                    // Validate required fields
                    if (
                         !body.apartmentType ||
                         typeof body.apartmentType !== 'string'
                    ) {
                         return this.error('Daire tipi gereklidir', 400);
                    }

                    if (
                         !body.layoutImageUrl ||
                         typeof body.layoutImageUrl !== 'string'
                    ) {
                         return this.error("Plan resmi URL'si gereklidir", 400);
                    }

                    if (!body.totalArea || typeof body.totalArea !== 'number') {
                         return this.error(
                              'Toplam alan geçerli bir sayı olmalıdır',
                              400
                         );
                    }

                    const apartmentLayout = await ProjectApartmentLayout.create(
                         {
                              projectId,
                              apartmentType: (
                                   body.apartmentType as string
                              ).trim(),
                              squareMeter: body.squareMeter
                                   ? (body.squareMeter as string).trim()
                                   : '',
                              layoutImageUrl: body.layoutImageUrl as string,
                              totalArea: body.totalArea as number,
                              roomArea: body.roomArea
                                   ? (body.roomArea as number)
                                   : undefined,
                              kitchenArea: body.kitchenArea
                                   ? (body.kitchenArea as number)
                                   : undefined,
                              bathroomArea: body.bathroomArea
                                   ? (body.bathroomArea as number)
                                   : undefined,
                              balconyArea: body.balconyArea
                                   ? (body.balconyArea as number)
                                   : undefined,
                         }
                    );

                    return this.success(
                         apartmentLayout,
                         'Daire planı başarıyla eklendi',
                         201
                    );
               } else {
                    return this.error(
                         'Desteklenmeyen içerik türü. multipart/form-data veya application/json kullanın.',
                         400
                    );
               }
          } catch (error: unknown) {
               console.error('Apartment layout store error:', error);
               return this.error('Daire planı eklenirken hata oluştu', 500);
          }
     }
}

const apartmentLayoutController = new ApartmentLayoutController();

export async function GET(
     request: NextRequest,
     { params }: { params: Promise<{ id: string }> }
) {
     const resolvedParams = await params;
     return await apartmentLayoutController.index(request, resolvedParams);
}

export async function POST(
     request: NextRequest,
     { params }: { params: Promise<{ id: string }> }
) {
     const resolvedParams = await params;
     return await apartmentLayoutController.store(request, resolvedParams);
}
