// Project Controller - Proje CRUD işlemleri

import { NextRequest } from 'next/server';
import { BaseController } from './BaseController';
import {
     ProjectService,
     CreateProjectData,
     UpdateProjectData,
} from '@/services/ProjectService';
import { uploadFileToServer } from '@/utils/serverFileUpload';

export class ProjectController extends BaseController {
     /**
      * GET /api/projects - Tüm projeleri listele
      */
     async index(request: NextRequest) {
          try {
               const queryParams = this.getQueryParams(request);
               const { search } = queryParams;

               let projects;

               if (search) {
                    projects = await ProjectService.searchProjects(search);
               } else {
                    projects = await ProjectService.getAllProjects();
               }

               return this.success(projects, 'Projeler başarıyla getirildi');
          } catch (error: unknown) {
               console.error('Project index error:', error);
               return this.error('Projeler getirilirken hata oluştu', 500);
          }
     }

     /**
      * GET /api/projects/[id] - Tek proje getir
      */
     async show(request: NextRequest, params: { id: string }) {
          try {
               const id = parseInt(params.id);

               if (isNaN(id)) {
                    return this.error("Geçersiz proje ID'si", 400);
               }

               const project = await ProjectService.getProjectById(id);

               if (!project) {
                    return this.notFound('Proje bulunamadı');
               }

               return this.success(project, 'Proje başarıyla getirildi');
          } catch (error: unknown) {
               console.error('Project show error:', error);
               return this.error('Proje getirilirken hata oluştu', 500);
          }
     }

     /**
      * POST /api/projects - Yeni proje oluştur
      */
     async store(request: NextRequest) {
          try {
               // Check content type
               const contentType = request.headers.get('content-type') || '';

               let projectData: CreateProjectData;

               if (contentType.includes('multipart/form-data')) {
                    // Handle form-data (file uploads + text)
                    const formData = await request.formData();

                    const name = formData.get('name') as string;
                    const description = formData.get('description') as string;
                    const imageFile = formData.get('image') as File | null;

                    // Basic fields
                    const location = formData.get('location') as string;
                    const status = formData.get('status') as string;
                    const year = formData.get('year') as string;
                    const area = formData.get('area') as string;
                    const block = formData.get('block') as string;

                    // Related fields
                    const headerImageFile = formData.get(
                         'headerImage'
                    ) as File | null;
                    const catalogFile = formData.get(
                         'catalogUrl'
                    ) as File | null;
                    const featureTitle = formData.get('featureTitle') as string;
                    const featureDescription = formData.get(
                         'featureDescription'
                    ) as string;
                    const featureImageFile = formData.get(
                         'featureImage'
                    ) as File | null;
                    const generalPlanImageFile = formData.get(
                         'generalPlanImage'
                    ) as File | null;

                    // Validate required fields
                    if (!name || name.trim() === '') {
                         return this.error('Proje adı gereklidir', 400);
                    }

                    // Handle file uploads
                    let imageUrl: string | undefined;
                    if (imageFile && imageFile.size > 0) {
                         try {
                              imageUrl = await uploadFileToServer(imageFile);
                         } catch (uploadError) {
                              console.error('Image upload error:', uploadError);
                              return this.error(
                                   'Resim yüklenirken hata oluştu',
                                   400
                              );
                         }
                    }

                    let headerImageUrl: string | undefined;
                    if (headerImageFile && headerImageFile.size > 0) {
                         try {
                              headerImageUrl =
                                   await uploadFileToServer(headerImageFile);
                         } catch (uploadError) {
                              console.error(
                                   'Header image upload error:',
                                   uploadError
                              );
                              return this.error(
                                   'Başlık resmi yüklenirken hata oluştu',
                                   400
                              );
                         }
                    }

                    let catalogUrl: string | undefined;
                    if (catalogFile && catalogFile.size > 0) {
                         try {
                              catalogUrl =
                                   await uploadFileToServer(catalogFile);
                         } catch (uploadError) {
                              console.error(
                                   'Catalog upload error:',
                                   uploadError
                              );
                              return this.error(
                                   'Katalog yüklenirken hata oluştu',
                                   400
                              );
                         }
                    }

                    let featureImageUrl: string | undefined;
                    if (featureImageFile && featureImageFile.size > 0) {
                         try {
                              featureImageUrl =
                                   await uploadFileToServer(featureImageFile);
                         } catch (uploadError) {
                              console.error(
                                   'Feature image upload error:',
                                   uploadError
                              );
                              return this.error(
                                   'Özellik resmi yüklenirken hata oluştu',
                                   400
                              );
                         }
                    }

                    let generalPlanImageUrl: string | undefined;
                    if (generalPlanImageFile && generalPlanImageFile.size > 0) {
                         try {
                              generalPlanImageUrl =
                                   await uploadFileToServer(
                                        generalPlanImageFile
                                   );
                         } catch (uploadError) {
                              console.error(
                                   'General plan image upload error:',
                                   uploadError
                              );
                              return this.error(
                                   'Genel plan resmi yüklenirken hata oluştu',
                                   400
                              );
                         }
                    }

                    projectData = {
                         name: name.trim(),
                         description: description?.trim() || undefined,
                         imageUrl,
                         location: location?.trim() || undefined,
                         status: status?.trim() || undefined,
                         year: year ? parseInt(year) : undefined,
                         area: area?.trim() || undefined,
                         block: block ? parseInt(block) : undefined,
                         headerImageUrl,
                         catalogUrl,
                         featureTitle: featureTitle?.trim() || undefined,
                         featureDescription:
                              featureDescription?.trim() || undefined,
                         featureImageUrl,
                         generalPlanImageUrl,
                    };

                    // Handle interior images
                    const interiorImages: Array<{
                         imageUrl: string;
                         caption?: string;
                    }> = [];
                    const interiorImageFiles = formData.getAll(
                         'interiorImages'
                    ) as File[];
                    const interiorImageCaptions = formData.getAll(
                         'interiorImageCaptions'
                    ) as string[];

                    for (let i = 0; i < interiorImageFiles.length; i++) {
                         const file = interiorImageFiles[i];
                         if (file && file.size > 0) {
                              try {
                                   const imageUrl =
                                        await uploadFileToServer(file);
                                   interiorImages.push({
                                        imageUrl,
                                        caption: interiorImageCaptions[i]
                                             ? interiorImageCaptions[i].trim()
                                             : undefined,
                                   });
                              } catch (uploadError) {
                                   console.error(
                                        'Interior image upload error:',
                                        uploadError
                                   );
                                   return this.error(
                                        `İç mekan resmi ${i + 1} yüklenirken hata oluştu`,
                                        400
                                   );
                              }
                         }
                    }

                    if (interiorImages.length > 0) {
                         projectData.interiorImages = interiorImages;
                    }

                    // Handle construction images
                    const constructionImages: Array<{ imageUrl: string }> = [];
                    const constructionImageFiles = formData.getAll(
                         'constructionImages'
                    ) as File[];

                    for (let i = 0; i < constructionImageFiles.length; i++) {
                         const file = constructionImageFiles[i];
                         if (file && file.size > 0) {
                              try {
                                   const imageUrl =
                                        await uploadFileToServer(file);
                                   constructionImages.push({ imageUrl });
                              } catch (uploadError) {
                                   console.error(
                                        'Construction image upload error:',
                                        uploadError
                                   );
                                   return this.error(
                                        `İnşaat resmi ${i + 1} yüklenirken hata oluştu`,
                                        400
                                   );
                              }
                         }
                    }

                    if (constructionImages.length > 0) {
                         projectData.constructionImages = constructionImages;
                    }

                    // Handle apartment layouts - Updated to properly handle the nested structure
                    const apartmentTypes = formData.getAll(
                         'apartmentTypes'
                    ) as string[];
                    const apartmentSquareMeters = formData.getAll(
                         'apartmentSquareMeters'
                    ) as string[];
                    const apartmentLayoutTotalAreas = formData.getAll(
                         'apartmentLayoutTotalAreas'
                    ) as string[];
                    const apartmentLayoutRoomAreas = formData.getAll(
                         'apartmentLayoutRoomAreas'
                    ) as string[];
                    const apartmentLayoutKitchenAreas = formData.getAll(
                         'apartmentLayoutKitchenAreas'
                    ) as string[];
                    const apartmentLayoutBathroomAreas = formData.getAll(
                         'apartmentLayoutBathroomAreas'
                    ) as string[];
                    const apartmentLayoutBalconyAreas = formData.getAll(
                         'apartmentLayoutBalconyAreas'
                    ) as string[];
                    // Handle apartment layout images
                    const apartmentLayoutFiles = formData.getAll(
                         'apartmentLayoutImages'
                    ) as File[];

                    if (apartmentTypes.length > 0) {
                         const apartments: Array<{
                              apartmentType: string;
                              squareMeter: string;
                              layoutImageUrl: string;
                              totalArea: number;
                              roomArea?: number;
                              kitchenArea?: number;
                              bathroomArea?: number;
                              balconyArea?: number;
                         }> = [];

                         for (let i = 0; i < apartmentTypes.length; i++) {
                              // Handle the layout image for this apartment type
                              let layoutImageUrl = '';
                              if (
                                   i < apartmentLayoutFiles.length &&
                                   apartmentLayoutFiles[i] &&
                                   apartmentLayoutFiles[i].size > 0
                              ) {
                                   try {
                                        layoutImageUrl =
                                             await uploadFileToServer(
                                                  apartmentLayoutFiles[i]
                                             );
                                   } catch (uploadError) {
                                        console.error(
                                             'Apartment layout image upload error:',
                                             uploadError
                                        );
                                        return this.error(
                                             `Daire planı ${i + 1} yüklenirken hata oluştu`,
                                             400
                                        );
                                   }
                              }

                              // Only add apartment if it has a type
                              if (apartmentTypes[i]) {
                                   apartments.push({
                                        apartmentType: apartmentTypes[i].trim(),
                                        squareMeter: apartmentSquareMeters[i]
                                             ? apartmentSquareMeters[i].trim()
                                             : '',
                                        layoutImageUrl,
                                        totalArea: apartmentLayoutTotalAreas[i]
                                             ? parseFloat(
                                                    apartmentLayoutTotalAreas[i]
                                               )
                                             : 0,
                                        roomArea: apartmentLayoutRoomAreas[i]
                                             ? parseFloat(
                                                    apartmentLayoutRoomAreas[i]
                                               )
                                             : undefined,
                                        kitchenArea:
                                             apartmentLayoutKitchenAreas[i]
                                                  ? parseFloat(
                                                         apartmentLayoutKitchenAreas[
                                                              i
                                                         ]
                                                    )
                                                  : undefined,
                                        bathroomArea:
                                             apartmentLayoutBathroomAreas[i]
                                                  ? parseFloat(
                                                         apartmentLayoutBathroomAreas[
                                                              i
                                                         ]
                                                    )
                                                  : undefined,
                                        balconyArea:
                                             apartmentLayoutBalconyAreas[i]
                                                  ? parseFloat(
                                                         apartmentLayoutBalconyAreas[
                                                              i
                                                         ]
                                                    )
                                                  : undefined,
                                   });
                              }
                         }

                         if (apartments.length > 0) {
                              projectData.apartments = apartments;
                         }
                    }
               } else if (contentType.includes('application/json')) {
                    // Handle JSON body with nested structure
                    const body = (await this.parseBody(request)) as Record<
                         string,
                         unknown
                    >;

                    const errors = this.validateCreateProject(body);
                    if (errors.length > 0) {
                         return this.validationError(errors);
                    }

                    projectData = {
                         name: body.name as string,
                         description: body.description as string,
                         location: body.location as string,
                         status: body.status as string,
                         year: body.year as number,
                         area: body.area as string,
                         block: body.block as number,
                         headerImageUrl: body.headerImage as string,
                         catalogUrl: body.catalogUrl as string,
                         featureTitle: body.featureTitle as string,
                         featureDescription: body.featureDescription as string,
                         featureImageUrl: body.featureImage as string,
                         generalPlanImageUrl: body.generalPlanImage as string,
                         // Handle nested arrays
                         interiorImages:
                              (
                                   body.interiorImages as Array<{
                                        imageUrl: string;
                                        caption: string;
                                   }>
                              )?.map((img) => ({
                                   imageUrl: img.imageUrl,
                                   caption: img.caption,
                              })) || [],
                         constructionImages:
                              (
                                   body.constructionImages as Array<{
                                        imageUrl: string;
                                   }>
                              )?.map((img) => ({
                                   imageUrl: img.imageUrl,
                              })) || [],
                         apartments:
                              (
                                   body.apartmentLayouts as Array<{
                                        name: string;
                                        layoutImage: string;
                                        totalArea: number;
                                        roomArea?: number;
                                        kitchenArea?: number;
                                        bathroomArea?: number;
                                        balconyArea?: number;
                                   }>
                              )?.map((layout) => ({
                                   // Map the fields to match the database model
                                   apartmentType: layout.name, // Map name to apartmentType
                                   squareMeter: '', // This field is missing in your example but required in the model
                                   layoutImageUrl: layout.layoutImage, // Map layoutImage to layoutImageUrl
                                   totalArea: layout.totalArea,
                                   roomArea: layout.roomArea,
                                   kitchenArea: layout.kitchenArea,
                                   bathroomArea: layout.bathroomArea,
                                   balconyArea: layout.balconyArea,
                              })) || [],
                    };
               } else {
                    return this.error(
                         'Desteklenmeyen içerik türü. multipart/form-data veya application/json kullanın.',
                         400
                    );
               }

               const project = await ProjectService.createProject(projectData);

               return this.success(project, 'Proje başarıyla oluşturuldu', 201);
          } catch (error: unknown) {
               console.error('Project store error:', error);

               if (
                    error instanceof Error &&
                    error.message.includes('zaten mevcut')
               ) {
                    return this.error(error.message, 409);
               }

               return this.error('Proje oluşturulurken hata oluştu', 500);
          }
     }

     /**
      * PUT /api/projects/[id] - Proje güncelle
      */
     async update(request: NextRequest, params: { id: string }) {
          try {
               const id = parseInt(params.id);

               if (isNaN(id)) {
                    return this.error("Geçersiz proje ID'si", 400);
               }

               // Check content type
               const contentType = request.headers.get('content-type') || '';

               let projectData: UpdateProjectData;

               if (contentType.includes('multipart/form-data')) {
                    // form-data (dosya + text)
                    const formData = await request.formData();

                    const name = formData.get('name') as string;
                    const description = formData.get('description') as string;
                    const imageFile = formData.get('image') as File | null;

                    // Yeni eklenen alanlar
                    const location = formData.get('location') as string;
                    const status = formData.get('status') as string;
                    const year = formData.get('year') as string;
                    const area = formData.get('area') as string;
                    const block = formData.get('block') as string;

                    // Yeni eklenen ilişkisel alanlar
                    const headerImageFile = formData.get(
                         'headerImage'
                    ) as File | null;
                    const catalogFile = formData.get(
                         'catalogUrl'
                    ) as File | null;
                    const featureTitle = formData.get('featureTitle') as string;
                    const featureDescription = formData.get(
                         'featureDescription'
                    ) as string;
                    const featureImageFile = formData.get(
                         'featureImage'
                    ) as File | null;
                    const generalPlanImageFile = formData.get(
                         'generalPlanImage'
                    ) as File | null;

                    let imageUrl: string | undefined | null = undefined;
                    if (imageFile !== undefined) {
                         if (imageFile && imageFile.size > 0) {
                              try {
                                   imageUrl =
                                        await uploadFileToServer(imageFile);
                              } catch (uploadError) {
                                   console.error(
                                        'Image upload error:',
                                        uploadError
                                   );
                                   return this.error(
                                        'Resim yüklenirken hata oluştu',
                                        400
                                   );
                              }
                         } else {
                              imageUrl = null; // Dosya silindi
                         }
                    }

                    // Yeni eklenen dosya yüklemeleri
                    let headerImageUrl: string | undefined | null = undefined;
                    if (headerImageFile !== undefined) {
                         if (headerImageFile && headerImageFile.size > 0) {
                              try {
                                   headerImageUrl =
                                        await uploadFileToServer(
                                             headerImageFile
                                        );
                              } catch (uploadError) {
                                   console.error(
                                        'Header image upload error:',
                                        uploadError
                                   );
                                   return this.error(
                                        'Başlık resmi yüklenirken hata oluştu',
                                        400
                                   );
                              }
                         } else {
                              headerImageUrl = null; // Dosya silindi
                         }
                    }

                    let catalogUrl: string | undefined | null = undefined;
                    if (catalogFile !== undefined) {
                         if (catalogFile && catalogFile.size > 0) {
                              try {
                                   catalogUrl =
                                        await uploadFileToServer(catalogFile);
                              } catch (uploadError) {
                                   console.error(
                                        'Catalog upload error:',
                                        uploadError
                                   );
                                   return this.error(
                                        'Katalog yüklenirken hata oluştu',
                                        400
                                   );
                              }
                         } else {
                              catalogUrl = null; // Dosya silindi
                         }
                    }

                    let featureImageUrl: string | undefined | null = undefined;
                    if (featureImageFile !== undefined) {
                         if (featureImageFile && featureImageFile.size > 0) {
                              try {
                                   featureImageUrl =
                                        await uploadFileToServer(
                                             featureImageFile
                                        );
                              } catch (uploadError) {
                                   console.error(
                                        'Feature image upload error:',
                                        uploadError
                                   );
                                   return this.error(
                                        'Özellik resmi yüklenirken hata oluştu',
                                        400
                                   );
                              }
                         } else {
                              featureImageUrl = null; // Dosya silindi
                         }
                    }

                    let generalPlanImageUrl: string | undefined | null =
                         undefined;
                    if (generalPlanImageFile !== undefined) {
                         if (
                              generalPlanImageFile &&
                              generalPlanImageFile.size > 0
                         ) {
                              try {
                                   generalPlanImageUrl =
                                        await uploadFileToServer(
                                             generalPlanImageFile
                                        );
                              } catch (uploadError) {
                                   console.error(
                                        'General plan image upload error:',
                                        uploadError
                                   );
                                   return this.error(
                                        'Genel plan resmi yüklenirken hata oluştu',
                                        400
                                   );
                              }
                         } else {
                              generalPlanImageUrl = null; // Dosya silindi
                         }
                    }

                    projectData = {
                         ...(name !== undefined && { name: name.trim() }),
                         ...(description !== undefined && {
                              description: description?.trim() || undefined,
                         }),
                         ...(imageUrl !== undefined && { imageUrl }),
                         // Yeni eklenen alanlar
                         ...(location !== undefined && {
                              location: location?.trim() || undefined,
                         }),
                         ...(status !== undefined && {
                              status: status?.trim() || undefined,
                         }),
                         ...(year !== undefined && {
                              year: year ? parseInt(year) : undefined,
                         }),
                         ...(area !== undefined && {
                              area: area?.trim() || undefined,
                         }),
                         ...(block !== undefined && {
                              block: block ? parseInt(block) : undefined,
                         }),
                         // Yeni eklenen ilişkisel alanlar
                         ...(headerImageUrl !== undefined && {
                              headerImageUrl,
                         }),
                         ...(catalogUrl !== undefined && { catalogUrl }),
                         ...(featureTitle !== undefined && {
                              featureTitle: featureTitle?.trim() || undefined,
                         }),
                         ...(featureDescription !== undefined && {
                              featureDescription:
                                   featureDescription?.trim() || undefined,
                         }),
                         ...(featureImageUrl !== undefined && {
                              featureImageUrl,
                         }),
                         ...(generalPlanImageUrl !== undefined && {
                              generalPlanImageUrl,
                         }),
                    };

                    // İç içe geçmiş dizileri işle
                    // interiorImages
                    const interiorImageFiles = formData.getAll(
                         'interiorImages'
                    ) as File[];
                    const interiorImageCaptions = formData.getAll(
                         'interiorImageCaptions'
                    ) as string[];

                    if (
                         interiorImageFiles.length > 0 ||
                         formData.has('interiorImages')
                    ) {
                         const interiorImages: Array<{
                              imageUrl: string;
                              caption?: string;
                         }> = [];

                         for (let i = 0; i < interiorImageFiles.length; i++) {
                              const file = interiorImageFiles[i];
                              if (file && file.size > 0) {
                                   try {
                                        const imageUrl =
                                             await uploadFileToServer(file);
                                        interiorImages.push({
                                             imageUrl,
                                             caption: interiorImageCaptions[i]
                                                  ? interiorImageCaptions[
                                                         i
                                                    ].trim()
                                                  : undefined,
                                        });
                                   } catch (uploadError) {
                                        console.error(
                                             'Interior image upload error:',
                                             uploadError
                                        );
                                        return this.error(
                                             `İç mekan resmi ${i + 1} yüklenirken hata oluştu`,
                                             400
                                        );
                                   }
                              }
                         }

                         projectData.interiorImages = interiorImages;
                    }

                    // constructionImages
                    const constructionImageFiles = formData.getAll(
                         'constructionImages'
                    ) as File[];

                    if (
                         constructionImageFiles.length > 0 ||
                         formData.has('constructionImages')
                    ) {
                         const constructionImages: Array<{ imageUrl: string }> =
                              [];

                         for (
                              let i = 0;
                              i < constructionImageFiles.length;
                              i++
                         ) {
                              const file = constructionImageFiles[i];
                              if (file && file.size > 0) {
                                   try {
                                        const imageUrl =
                                             await uploadFileToServer(file);
                                        constructionImages.push({ imageUrl });
                                   } catch (uploadError) {
                                        console.error(
                                             'Construction image upload error:',
                                             uploadError
                                        );
                                        return this.error(
                                             `İnşaat resmi ${i + 1} yüklenirken hata oluştu`,
                                             400
                                        );
                                   }
                              }
                         }

                         projectData.constructionImages = constructionImages;
                    }

                    // apartmentLayouts - Fixed to properly handle the form-data structure
                    const apartmentTypes = formData.getAll(
                         'apartmentTypes'
                    ) as string[];
                    const apartmentSquareMeters = formData.getAll(
                         'apartmentSquareMeters'
                    ) as string[];
                    const apartmentLayoutTotalAreas = formData.getAll(
                         'apartmentLayoutTotalAreas'
                    ) as string[];
                    const apartmentLayoutRoomAreas = formData.getAll(
                         'apartmentLayoutRoomAreas'
                    ) as string[];
                    const apartmentLayoutKitchenAreas = formData.getAll(
                         'apartmentLayoutKitchenAreas'
                    ) as string[];
                    const apartmentLayoutBathroomAreas = formData.getAll(
                         'apartmentLayoutBathroomAreas'
                    ) as string[];
                    const apartmentLayoutBalconyAreas = formData.getAll(
                         'apartmentLayoutBalconyAreas'
                    ) as string[];
                    // Handle apartment layout images
                    const apartmentLayoutFiles = formData.getAll(
                         'apartmentLayoutImages'
                    ) as File[];

                    if (apartmentTypes.length > 0) {
                         const apartments: Array<{
                              apartmentType: string;
                              squareMeter: string;
                              layoutImageUrl: string;
                              totalArea: number;
                              roomArea?: number;
                              kitchenArea?: number;
                              bathroomArea?: number;
                              balconyArea?: number;
                         }> = [];

                         for (let i = 0; i < apartmentTypes.length; i++) {
                              // Handle the layout image for this apartment type
                              let layoutImageUrl = '';
                              if (
                                   i < apartmentLayoutFiles.length &&
                                   apartmentLayoutFiles[i] &&
                                   apartmentLayoutFiles[i].size > 0
                              ) {
                                   try {
                                        layoutImageUrl =
                                             await uploadFileToServer(
                                                  apartmentLayoutFiles[i]
                                             );
                                   } catch (uploadError) {
                                        console.error(
                                             'Apartment layout image upload error:',
                                             uploadError
                                        );
                                        return this.error(
                                             `Daire planı ${i + 1} yüklenirken hata oluştu`,
                                             400
                                        );
                                   }
                              }

                              // Only add apartment if it has a type
                              if (apartmentTypes[i]) {
                                   apartments.push({
                                        apartmentType: apartmentTypes[i].trim(),
                                        squareMeter: apartmentSquareMeters[i]
                                             ? apartmentSquareMeters[i].trim()
                                             : '',
                                        layoutImageUrl,
                                        totalArea: apartmentLayoutTotalAreas[i]
                                             ? parseFloat(
                                                    apartmentLayoutTotalAreas[i]
                                               )
                                             : 0,
                                        roomArea: apartmentLayoutRoomAreas[i]
                                             ? parseFloat(
                                                    apartmentLayoutRoomAreas[i]
                                               )
                                             : undefined,
                                        kitchenArea:
                                             apartmentLayoutKitchenAreas[i]
                                                  ? parseFloat(
                                                         apartmentLayoutKitchenAreas[
                                                              i
                                                         ]
                                                    )
                                                  : undefined,
                                        bathroomArea:
                                             apartmentLayoutBathroomAreas[i]
                                                  ? parseFloat(
                                                         apartmentLayoutBathroomAreas[
                                                              i
                                                         ]
                                                    )
                                                  : undefined,
                                        balconyArea:
                                             apartmentLayoutBalconyAreas[i]
                                                  ? parseFloat(
                                                         apartmentLayoutBalconyAreas[
                                                              i
                                                         ]
                                                    )
                                                  : undefined,
                                   });
                              }
                         }

                         if (apartments.length > 0) {
                              projectData.apartments = apartments;
                         }
                    }
               } else if (contentType.includes('application/json')) {
                    // Handle JSON body with nested structure
                    const body = (await this.parseBody(request)) as Record<
                         string,
                         unknown
                    >;

                    // Veri doğrulama
                    const errors = this.validateUpdateProject(body);
                    if (errors.length > 0) {
                         return this.validationError(errors);
                    }

                    projectData = {
                         ...(body.name !== undefined && {
                              name: body.name as string,
                         }),
                         ...(body.description !== undefined && {
                              description: body.description as string,
                         }),
                         ...(body.location !== undefined && {
                              location: body.location as string,
                         }),
                         ...(body.status !== undefined && {
                              status: body.status as string,
                         }),
                         ...(body.year !== undefined && {
                              year: body.year as number,
                         }),
                         ...(body.area !== undefined && {
                              area: body.area as string,
                         }),
                         ...(body.block !== undefined && {
                              block: body.block as number,
                         }),
                         ...(body.headerImage !== undefined && {
                              headerImageUrl: body.headerImage as string,
                         }),
                         ...(body.catalogUrl !== undefined && {
                              catalogUrl: body.catalogUrl as string,
                         }),
                         ...(body.featureTitle !== undefined && {
                              featureTitle: body.featureTitle as string,
                         }),
                         ...(body.featureDescription !== undefined && {
                              featureDescription:
                                   body.featureDescription as string,
                         }),
                         ...(body.featureImage !== undefined && {
                              featureImageUrl: body.featureImage as string,
                         }),
                         ...(body.generalPlanImage !== undefined && {
                              generalPlanImageUrl:
                                   body.generalPlanImage as string,
                         }),
                         // Handle nested arrays
                         ...(body.interiorImages !== undefined && {
                              interiorImages:
                                   (
                                        body.interiorImages as Array<{
                                             imageUrl: string;
                                             caption: string;
                                        }>
                                   )?.map((img) => ({
                                        imageUrl: img.imageUrl,
                                        caption: img.caption,
                                   })) || [],
                         }),
                         ...(body.constructionImages !== undefined && {
                              constructionImages:
                                   (
                                        body.constructionImages as Array<{
                                             imageUrl: string;
                                        }>
                                   )?.map((img) => ({
                                        imageUrl: img.imageUrl,
                                   })) || [],
                         }),
                         ...(body.apartmentLayouts !== undefined && {
                              apartments:
                                   (
                                        body.apartmentLayouts as Array<{
                                             name: string;
                                             layoutImage: string;
                                             totalArea: number;
                                             roomArea?: number;
                                             kitchenArea?: number;
                                             bathroomArea?: number;
                                             balconyArea?: number;
                                        }>
                                   )?.map((layout) => ({
                                        // Map the fields to match the database model
                                        apartmentType: layout.name, // Map name to apartmentType
                                        squareMeter: '', // This field is missing in your example but required in the model
                                        layoutImageUrl: layout.layoutImage, // Map layoutImage to layoutImageUrl
                                        totalArea: layout.totalArea,
                                        roomArea: layout.roomArea,
                                        kitchenArea: layout.kitchenArea,
                                        bathroomArea: layout.bathroomArea,
                                        balconyArea: layout.balconyArea,
                                   })) || [],
                         }),
                    };
               } else {
                    return this.error(
                         'Desteklenmeyen içerik türü. multipart/form-data veya application/json kullanın.',
                         400
                    );
               }

               const project = await ProjectService.updateProject(
                    id,
                    projectData
               );

               return this.success(project, 'Proje başarıyla güncellendi');
          } catch (error: unknown) {
               console.error('Project update error:', error);

               if (error instanceof Error) {
                    if (error.message.includes('bulunamadı')) {
                         return this.notFound(error.message);
                    }

                    if (error.message.includes('zaten mevcut')) {
                         return this.error(error.message, 409);
                    }
               }

               return this.error('Proje güncellenirken hata oluştu', 500);
          }
     }

     /**
      * DELETE /api/projects/[id] - Proje sil
      */
     async destroy(request: NextRequest, params: { id: string }) {
          try {
               const id = parseInt(params.id);

               if (isNaN(id)) {
                    return this.error("Geçersiz proje ID'si", 400);
               }

               await ProjectService.deleteProject(id);

               return this.success(null, 'Proje başarıyla silindi');
          } catch (error: unknown) {
               console.error('Project destroy error:', error);

               if (
                    error instanceof Error &&
                    error.message.includes('bulunamadı')
               ) {
                    return this.notFound(error.message);
               }

               return this.error('Proje silinirken hata oluştu', 500);
          }
     }

     /**
      * Proje oluşturma verilerini doğrula
      */
     private validateCreateProject(
          data: Record<string, unknown>
     ): Array<{ field: string; message: string }> {
          const errors: Array<{ field: string; message: string }> = [];

          if (
               !data.name ||
               typeof data.name !== 'string' ||
               data.name.trim() === ''
          ) {
               errors.push({ field: 'name', message: 'Proje adı gereklidir' });
          } else if (data.name.trim().length < 2) {
               errors.push({
                    field: 'name',
                    message: 'Proje adı en az 2 karakter olmalıdır',
               });
          } else if (data.name.trim().length > 255) {
               errors.push({
                    field: 'name',
                    message: 'Proje adı en fazla 255 karakter olabilir',
               });
          }

          if (data.description && typeof data.description !== 'string') {
               errors.push({
                    field: 'description',
                    message: 'Proje açıklaması metin olmalıdır',
               });
          }

          // Yeni eklenen alanlar için doğrulama
          if (data.location && typeof data.location !== 'string') {
               errors.push({
                    field: 'location',
                    message: 'Konum metin olmalıdır',
               });
          }

          if (data.status && typeof data.status !== 'string') {
               errors.push({
                    field: 'status',
                    message: 'Durum metin olmalıdır',
               });
          }

          if (
               data.year !== undefined &&
               data.year !== null &&
               typeof data.year !== 'number'
          ) {
               errors.push({ field: 'year', message: 'Yıl sayı olmalıdır' });
          }

          if (data.area && typeof data.area !== 'string') {
               errors.push({ field: 'area', message: 'Alan metin olmalıdır' });
          }

          if (
               data.block !== undefined &&
               data.block !== null &&
               typeof data.block !== 'number'
          ) {
               errors.push({
                    field: 'block',
                    message: 'Blok sayısı sayı olmalıdır',
               });
          }

          // Yeni eklenen ilişkisel alanlar için doğrulama
          if (data.featureTitle && typeof data.featureTitle !== 'string') {
               errors.push({
                    field: 'featureTitle',
                    message: 'Özellik başlığı metin olmalıdır',
               });
          }

          if (
               data.featureDescription &&
               typeof data.featureDescription !== 'string'
          ) {
               errors.push({
                    field: 'featureDescription',
                    message: 'Özellik açıklaması metin olmalıdır',
               });
          }

          return errors;
     }

     /**
      * Proje güncelleme verilerini doğrula
      */
     private validateUpdateProject(
          data: Record<string, unknown>
     ): Array<{ field: string; message: string }> {
          const errors: Array<{ field: string; message: string }> = [];

          if (data.name !== undefined) {
               if (
                    !data.name ||
                    typeof data.name !== 'string' ||
                    data.name.trim() === ''
               ) {
                    errors.push({
                         field: 'name',
                         message: 'Proje adı gereklidir',
                    });
               } else if (data.name.trim().length < 2) {
                    errors.push({
                         field: 'name',
                         message: 'Proje adı en az 2 karakter olmalıdır',
                    });
               } else if (data.name.trim().length > 255) {
                    errors.push({
                         field: 'name',
                         message: 'Proje adı en fazla 255 karakter olabilir',
                    });
               }
          }

          if (
               data.description !== undefined &&
               data.description !== null &&
               typeof data.description !== 'string'
          ) {
               errors.push({
                    field: 'description',
                    message: 'Proje açıklaması metin olmalıdır',
               });
          }

          // Yeni eklenen alanlar için doğrulama
          if (
               data.location !== undefined &&
               data.location !== null &&
               typeof data.location !== 'string'
          ) {
               errors.push({
                    field: 'location',
                    message: 'Konum metin olmalıdır',
               });
          }

          if (
               data.status !== undefined &&
               data.status !== null &&
               typeof data.status !== 'string'
          ) {
               errors.push({
                    field: 'status',
                    message: 'Durum metin olmalıdır',
               });
          }

          if (
               data.year !== undefined &&
               data.year !== null &&
               typeof data.year !== 'number'
          ) {
               errors.push({ field: 'year', message: 'Yıl sayı olmalıdır' });
          }

          if (
               data.area !== undefined &&
               data.area !== null &&
               typeof data.area !== 'string'
          ) {
               errors.push({ field: 'area', message: 'Alan metin olmalıdır' });
          }

          if (
               data.block !== undefined &&
               data.block !== null &&
               typeof data.block !== 'number'
          ) {
               errors.push({
                    field: 'block',
                    message: 'Blok sayısı sayı olmalıdır',
               });
          }

          // Yeni eklenen ilişkisel alanlar için doğrulama
          if (
               data.featureTitle !== undefined &&
               data.featureTitle !== null &&
               typeof data.featureTitle !== 'string'
          ) {
               errors.push({
                    field: 'featureTitle',
                    message: 'Özellik başlığı metin olmalıdır',
               });
          }

          if (
               data.featureDescription !== undefined &&
               data.featureDescription !== null &&
               typeof data.featureDescription !== 'string'
          ) {
               errors.push({
                    field: 'featureDescription',
                    message: 'Özellik açıklaması metin olmalıdır',
               });
          }

          return errors;
     }
}
