// Project Service - Database işlemleri için servis sınıfı

import {
     Project,
     ProjectFeature,
     ProjectPlan,
     ProjectInteriorImage,
     ProjectConstructionImage,
     ProjectApartmentLayout,
} from '@/models';
import { connectDB } from '@/lib/sequelize';
import { Op } from 'sequelize';

export interface CreateProjectData {
     name: string;
     description?: string;
     imageUrl?: string;
     // Yeni eklenen alanlar
     location?: string;
     status?: string;
     year?: number;
     area?: string;
     block?: number;
     // Yeni eklenen ilişkisel alanlar
     headerImageUrl?: string;
     catalogUrl?: string;
     featureTitle?: string;
     featureDescription?: string;
     featureImageUrl?: string;
     generalPlanImageUrl?: string;
     // İlişkisel diziler
     interiorImages?: Array<{ imageUrl: string; caption?: string }>;
     constructionImages?: Array<{ imageUrl: string }>;
     apartments?: Array<{
          apartmentType: string; // 1|2|3|4 enum
          squareMeter: string;
          layoutImageUrl: string;
          totalArea: number;
          roomArea?: number;
          kitchenArea?: number;
          bathroomArea?: number;
          balconyArea?: number;
     }>;
}

export interface UpdateProjectData {
     name?: string;
     description?: string;
     imageUrl?: string | null;
     // Yeni eklenen alanlar
     location?: string;
     status?: string;
     year?: number;
     area?: string;
     block?: number;
     // Yeni eklenen ilişkisel alanlar
     headerImageUrl?: string | null;
     catalogUrl?: string | null;
     featureTitle?: string;
     featureDescription?: string;
     featureImageUrl?: string | null;
     generalPlanImageUrl?: string | null;
     // İlişkisel diziler
     interiorImages?: Array<{ imageUrl: string; caption?: string }>;
     constructionImages?: Array<{ imageUrl: string }>;
     apartments?: Array<{
          apartmentType: string; // 1|2|3|4 enum
          squareMeter: string;
          layoutImageUrl: string;
          totalArea: number;
          roomArea?: number;
          kitchenArea?: number;
          bathroomArea?: number;
          balconyArea?: number;
     }>;
}

// Düz JavaScript nesnesi olarak proje tipi
export interface ProjectData {
     id: number;
     name: string;
     description?: string | null;
     imageUrl?: string | null;
     createdAt: Date;
     updatedAt: Date;
     // Yeni eklenen alanlar
     location?: string | null;
     status?: string | null;
     year?: number | null;
     area?: string | null;
     block?: number | null;
     // Yeni eklenen ilişkisel alanlar
     headerImageUrl?: string | null;
     catalogUrl?: string | null;
     featureTitle?: string | null;
     featureDescription?: string | null;
     featureImageUrl?: string | null;
     generalPlanImageUrl?: string | null;
     // İlişkisel diziler - Updated to match the desired nested structure
     interiorImages?: Array<{ id: number; imageUrl: string; caption?: string }>;
     constructionImages?: Array<{ id: number; imageUrl: string }>;
     apartmentLayouts?: Array<{
          id: number;
          name: string;
          layoutImage: string;
          totalArea: number;
          roomArea?: number;
          kitchenArea?: number;
          bathroomArea?: number;
          balconyArea?: number;
     }>;
}

// Sequelize model nesnesini ProjectData tipine dönüştürmek için yardımcı fonksiyon
function convertToProjectData(project: Project): ProjectData {
     return {
          id: project.id,
          name: project.name,
          description: project.description ?? null,
          imageUrl: project.imageUrl ?? null,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          location: project.location ?? null,
          status: project.status ?? null,
          year: project.year ?? null,
          area: project.area ?? null,
          block: project.block ?? null,
          // Yeni eklenen ilişkisel alanlar
          headerImageUrl: project.headerImageUrl ?? null,
          catalogUrl: project.catalogUrl ?? null,
          featureTitle: project.featureTitle ?? null,
          featureDescription: project.featureDescription ?? null,
          featureImageUrl: project.featureImageUrl ?? null,
          generalPlanImageUrl: project.generalPlanImageUrl ?? null,
          // İlişkisel diziler - Updated to match the desired nested structure
          interiorImages:
               project.interiorImages?.map((img) => ({
                    id: img.id,
                    imageUrl: img.imageUrl,
                    caption: img.caption ?? undefined,
               })) ?? [],
          constructionImages:
               project.constructionImages?.map((img) => ({
                    id: img.id,
                    imageUrl: img.imageUrl,
               })) ?? [],
          apartmentLayouts:
               project.apartmentLayouts?.map((layout) => ({
                    id: layout.id,
                    name: layout.apartmentType, // Map apartmentType to name
                    layoutImage: layout.layoutImageUrl, // Map layoutImageUrl to layoutImage
                    totalArea: Number(layout.totalArea),
                    roomArea: layout.roomArea
                         ? Number(layout.roomArea)
                         : undefined,
                    kitchenArea: layout.kitchenArea
                         ? Number(layout.kitchenArea)
                         : undefined,
                    bathroomArea: layout.bathroomArea
                         ? Number(layout.bathroomArea)
                         : undefined,
                    balconyArea: layout.balconyArea
                         ? Number(layout.balconyArea)
                         : undefined,
               })) ?? [],
     };
}

export class ProjectService {
     /**
      * Tüm projeleri getir
      */
     static async getAllProjects(): Promise<ProjectData[]> {
          try {
               await connectDB();
               let projects;
               try {
                    projects = await Project.findAll({
                         order: [['createdAt', 'DESC']],
                         include: [
                              { model: ProjectFeature, as: 'feature' },
                              { model: ProjectPlan, as: 'plan' },
                              {
                                   model: ProjectInteriorImage,
                                   as: 'interiorImages',
                              },
                              {
                                   model: ProjectConstructionImage,
                                   as: 'constructionImages',
                              },
                              {
                                   model: ProjectApartmentLayout,
                                   as: 'apartmentLayouts',
                              },
                         ],
                    });
               } catch (includeError) {
                    console.warn(
                         'İlişkisel veriler yüklenirken hata oluştu, sadece temel proje verileri yükleniyor:',
                         includeError
                    );
                    // İlişkiler tanımlanmamışsa sadece temel projeleri yükle
                    projects = await Project.findAll({
                         order: [['createdAt', 'DESC']],
                    });
               }
               // Sequelize model nesnelerini ProjectData tipine dönüştür
               return projects.map(convertToProjectData);
          } catch (error) {
               console.error('Get all projects error:', error);
               throw error;
          }
     }

     /**
      * ID ile proje getir
      */
     static async getProjectById(id: number): Promise<ProjectData | null> {
          try {
               await connectDB();
               let project;
               try {
                    project = await Project.findByPk(id, {
                         include: [
                              { model: ProjectFeature, as: 'feature' },
                              { model: ProjectPlan, as: 'plan' },
                              {
                                   model: ProjectInteriorImage,
                                   as: 'interiorImages',
                              },
                              {
                                   model: ProjectConstructionImage,
                                   as: 'constructionImages',
                              },
                              {
                                   model: ProjectApartmentLayout,
                                   as: 'apartmentLayouts',
                              },
                         ],
                    });
               } catch (includeError) {
                    console.warn(
                         'İlişkisel veriler yüklenirken hata oluştu, sadece temel proje verisi yükleniyor:',
                         includeError
                    );
                    // İlişkiler tanımlanmamışsa sadece temel projeyi yükle
                    project = await Project.findByPk(id);
               }

               if (!project) return null;

               // Sequelize model nesnesini ProjectData tipine dönüştür
               return convertToProjectData(project);
          } catch (error) {
               console.error('Get project by id error:', error);
               throw error;
          }
     }

     /**
      * Yeni proje oluştur
      */
     static async createProject(data: CreateProjectData): Promise<ProjectData> {
          try {
               await connectDB();

               // Veri doğrulama
               if (!data.name || data.name.trim() === '') {
                    throw new Error('Proje adı gereklidir');
               }

               // Aynı isimde proje var mı kontrol et
               const existingProject = await Project.findOne({
                    where: { name: data.name.trim() },
               });

               if (existingProject) {
                    throw new Error('Bu isimde bir proje zaten mevcut');
               }

               const project = await Project.create({
                    name: data.name.trim(),
                    description: data.description?.trim() || undefined,
                    imageUrl: data.imageUrl?.trim() || undefined,
                    // Yeni eklenen alanlar
                    location: data.location?.trim() || undefined,
                    status: data.status?.trim() || undefined,
                    year: data.year,
                    area: data.area?.trim() || undefined,
                    block: data.block,
                    // Yeni eklenen ilişkisel alanlar
                    headerImageUrl: data.headerImageUrl?.trim() || undefined,
                    catalogUrl: data.catalogUrl?.trim() || undefined,
                    featureTitle: data.featureTitle?.trim() || undefined,
                    featureDescription:
                         data.featureDescription?.trim() || undefined,
                    featureImageUrl: data.featureImageUrl?.trim() || undefined,
                    generalPlanImageUrl:
                         data.generalPlanImageUrl?.trim() || undefined,
               });

               // İlişkisel verileri oluştur
               if (data.interiorImages && data.interiorImages.length > 0) {
                    await ProjectInteriorImage.bulkCreate(
                         data.interiorImages.map((img) => ({
                              projectId: project.id,
                              imageUrl: img.imageUrl,
                              caption: img.caption,
                         }))
                    );
               }

               if (
                    data.constructionImages &&
                    data.constructionImages.length > 0
               ) {
                    await ProjectConstructionImage.bulkCreate(
                         data.constructionImages.map((img) => ({
                              projectId: project.id,
                              imageUrl: img.imageUrl,
                         }))
                    );
               }

               if (data.apartments && data.apartments.length > 0) {
                    await ProjectApartmentLayout.bulkCreate(
                         data.apartments.map((layout) => ({
                              projectId: project.id,
                              apartmentType: layout.apartmentType,
                              squareMeter: layout.squareMeter,
                              layoutImageUrl: layout.layoutImageUrl,
                              totalArea: layout.totalArea,
                              roomArea: layout.roomArea,
                              kitchenArea: layout.kitchenArea,
                              bathroomArea: layout.bathroomArea,
                              balconyArea: layout.balconyArea,
                         }))
                    );
               }

               // Proje özelliğini oluştur
               if (
                    data.featureTitle ||
                    data.featureDescription ||
                    data.featureImageUrl
               ) {
                    await ProjectFeature.create({
                         projectId: project.id,
                         title: data.featureTitle || undefined,
                         description: data.featureDescription || undefined,
                         imageUrl: data.featureImageUrl || undefined,
                    });
               }

               // Proje planını oluştur
               if (data.generalPlanImageUrl || data.catalogUrl) {
                    await ProjectPlan.create({
                         projectId: project.id,
                         generalPlanImageUrl:
                              data.generalPlanImageUrl || undefined,
                         catalogUrl: data.catalogUrl || undefined,
                    });
               }

               // Sequelize model nesnesini ProjectData tipine dönüştür
               // İlişkisel verilerle birlikte yeniden yükle
               // İlişkiler tanımlanmamış olabilir, bu yüzden try-catch bloğu içinde deneyelim
               let fullProject: Project | null = project;
               try {
                    fullProject = await Project.findByPk(project.id, {
                         include: [
                              { model: ProjectFeature, as: 'feature' },
                              { model: ProjectPlan, as: 'plan' },
                              {
                                   model: ProjectInteriorImage,
                                   as: 'interiorImages',
                              },
                              {
                                   model: ProjectConstructionImage,
                                   as: 'constructionImages',
                              },
                              {
                                   model: ProjectApartmentLayout,
                                   as: 'apartmentLayouts',
                              },
                         ],
                    });
               } catch (includeError) {
                    console.warn(
                         'İlişkisel veriler yüklenirken hata oluştu, temel proje verisi döndürülüyor:',
                         includeError
                    );
                    // İlişkiler tanımlanmamışsa temel projeyi döndür
                    fullProject = project;
               }

               if (!fullProject) {
                    throw new Error('Proje oluşturuldu ancak getirilemedi');
               }

               return convertToProjectData(fullProject);
          } catch (error) {
               console.error('Create project error:', error);
               throw error;
          }
     }

     /**
      * Proje güncelle
      */
     static async updateProject(
          id: number,
          data: UpdateProjectData
     ): Promise<ProjectData> {
          try {
               await connectDB();

               const project = await Project.findByPk(id);
               if (!project) {
                    throw new Error('Proje bulunamadı');
               }

               // Eğer isim değiştiriliyorsa, aynı isimde başka proje var mı kontrol et
               if (data.name && data.name.trim() !== project.name) {
                    const existingProject = await Project.findOne({
                         where: {
                              name: data.name.trim(),
                              id: { [Op.ne]: id },
                         },
                    });

                    if (existingProject) {
                         throw new Error('Bu isimde bir proje zaten mevcut');
                    }
               }

               const updatedProject = await project.update({
                    ...(data.name && { name: data.name.trim() }),
                    ...(data.description !== undefined && {
                         description:
                              data.description !== null
                                   ? data.description.trim()
                                   : null,
                    }),
                    ...(data.imageUrl !== undefined && {
                         imageUrl:
                              data.imageUrl !== null
                                   ? data.imageUrl.trim()
                                   : null,
                    }),
                    // Yeni eklenen alanlar
                    ...(data.location !== undefined && {
                         location:
                              data.location !== null
                                   ? data.location.trim()
                                   : null,
                    }),
                    ...(data.status !== undefined && {
                         status:
                              data.status !== null ? data.status.trim() : null,
                    }),
                    ...(data.year !== undefined && { year: data.year }),
                    ...(data.area !== undefined && {
                         area: data.area !== null ? data.area.trim() : null,
                    }),
                    ...(data.block !== undefined && { block: data.block }),
                    // Yeni eklenen ilişkisel alanlar
                    ...(data.headerImageUrl !== undefined && {
                         headerImageUrl:
                              data.headerImageUrl !== null
                                   ? data.headerImageUrl.trim()
                                   : null,
                    }),
                    ...(data.catalogUrl !== undefined && {
                         catalogUrl:
                              data.catalogUrl !== null
                                   ? data.catalogUrl.trim()
                                   : null,
                    }),
                    ...(data.featureTitle !== undefined && {
                         featureTitle:
                              data.featureTitle !== null
                                   ? data.featureTitle.trim()
                                   : null,
                    }),
                    ...(data.featureDescription !== undefined && {
                         featureDescription:
                              data.featureDescription !== null
                                   ? data.featureDescription.trim()
                                   : null,
                    }),
                    ...(data.featureImageUrl !== undefined && {
                         featureImageUrl:
                              data.featureImageUrl !== null
                                   ? data.featureImageUrl.trim()
                                   : null,
                    }),
                    ...(data.generalPlanImageUrl !== undefined && {
                         generalPlanImageUrl:
                              data.generalPlanImageUrl !== null
                                   ? data.generalPlanImageUrl.trim()
                                   : null,
                    }),
               } as any);

               // İlişkisel verileri güncelle
               if (data.interiorImages !== undefined) {
                    // Önce mevcut verileri sil
                    await ProjectInteriorImage.destroy({
                         where: { projectId: id },
                    });

                    // Yeni verileri ekle
                    if (data.interiorImages.length > 0) {
                         await ProjectInteriorImage.bulkCreate(
                              data.interiorImages.map((img) => ({
                                   projectId: id,
                                   imageUrl: img.imageUrl,
                                   caption: img.caption,
                              }))
                         );
                    }
               }

               if (data.constructionImages !== undefined) {
                    // Önce mevcut verileri sil
                    await ProjectConstructionImage.destroy({
                         where: { projectId: id },
                    });

                    // Yeni verileri ekle
                    if (data.constructionImages.length > 0) {
                         await ProjectConstructionImage.bulkCreate(
                              data.constructionImages.map((img) => ({
                                   projectId: id,
                                   imageUrl: img.imageUrl,
                              }))
                         );
                    }
               }

               if (data.apartments !== undefined) {
                    // Önce mevcut verileri sil
                    await ProjectApartmentLayout.destroy({
                         where: { projectId: id },
                    });

                    // Yeni verileri ekle
                    if (data.apartments.length > 0) {
                         await ProjectApartmentLayout.bulkCreate(
                              data.apartments.map((layout) => ({
                                   projectId: id,
                                   apartmentType: layout.apartmentType,
                                   squareMeter: layout.squareMeter,
                                   layoutImageUrl: layout.layoutImageUrl,
                                   totalArea: layout.totalArea,
                                   roomArea: layout.roomArea,
                                   kitchenArea: layout.kitchenArea,
                                   bathroomArea: layout.bathroomArea,
                                   balconyArea: layout.balconyArea,
                              }))
                         );
                    }
               }

               // Proje özelliğini güncelle
               if (
                    data.featureTitle !== undefined ||
                    data.featureDescription !== undefined ||
                    data.featureImageUrl !== undefined
               ) {
                    const existingFeature = await ProjectFeature.findOne({
                         where: { projectId: id },
                    });

                    if (existingFeature) {
                         await existingFeature.update({
                              title:
                                   data.featureTitle !== null
                                        ? data.featureTitle
                                        : undefined,
                              description:
                                   data.featureDescription !== null
                                        ? data.featureDescription
                                        : undefined,
                              imageUrl:
                                   data.featureImageUrl !== null
                                        ? data.featureImageUrl
                                        : undefined,
                         });
                    } else if (
                         data.featureTitle ||
                         data.featureDescription ||
                         data.featureImageUrl
                    ) {
                         await ProjectFeature.create({
                              projectId: id,
                              title: data.featureTitle || undefined,
                              description: data.featureDescription || undefined,
                              imageUrl: data.featureImageUrl || undefined,
                         });
                    }
               }

               // Proje planını güncelle
               if (
                    data.generalPlanImageUrl !== undefined ||
                    data.catalogUrl !== undefined
               ) {
                    const existingPlan = await ProjectPlan.findOne({
                         where: { projectId: id },
                    });

                    if (existingPlan) {
                         await existingPlan.update({
                              generalPlanImageUrl:
                                   data.generalPlanImageUrl !== null
                                        ? data.generalPlanImageUrl
                                        : undefined,
                              catalogUrl:
                                   data.catalogUrl !== null
                                        ? data.catalogUrl
                                        : undefined,
                         });
                    } else if (data.generalPlanImageUrl || data.catalogUrl) {
                         await ProjectPlan.create({
                              projectId: id,
                              generalPlanImageUrl:
                                   data.generalPlanImageUrl || undefined,
                              catalogUrl: data.catalogUrl || undefined,
                         });
                    }
               }

               // Sequelize model nesnesini ProjectData tipine dönüştür
               // İlişkisel verilerle birlikte yeniden yükle
               // İlişkiler tanımlanmamış olabilir, bu yüzden try-catch bloğu içinde deneyelim
               let fullProject: Project | null = updatedProject;
               try {
                    fullProject = await Project.findByPk(id, {
                         include: [
                              { model: ProjectFeature, as: 'feature' },
                              { model: ProjectPlan, as: 'plan' },
                              {
                                   model: ProjectInteriorImage,
                                   as: 'interiorImages',
                              },
                              {
                                   model: ProjectConstructionImage,
                                   as: 'constructionImages',
                              },
                              {
                                   model: ProjectApartmentLayout,
                                   as: 'apartmentLayouts',
                              },
                         ],
                    });
               } catch (includeError) {
                    console.warn(
                         'İlişkisel veriler yüklenirken hata oluştu, temel proje verisi döndürülüyor:',
                         includeError
                    );
                    // İlişkiler tanımlanmamışsa temel projeyi döndür
                    fullProject = updatedProject;
               }

               if (!fullProject) {
                    throw new Error('Proje güncellendi ancak getirilemedi');
               }

               return convertToProjectData(fullProject);
          } catch (error) {
               console.error('Update project error:', error);
               throw error;
          }
     }

     /**
      * Proje sil
      */
     static async deleteProject(id: number): Promise<boolean> {
          try {
               await connectDB();

               const project = await Project.findByPk(id);
               if (!project) {
                    throw new Error('Proje bulunamadı');
               }

               await project.destroy();
               return true;
          } catch (error) {
               console.error('Delete project error:', error);
               throw error;
          }
     }

     /**
      * Proje arama
      */
     static async searchProjects(query: string): Promise<ProjectData[]> {
          try {
               await connectDB();

               const projects = await Project.findAll({
                    where: {
                         [Op.or]: [
                              {
                                   name: {
                                        [Op.iLike]: `%${query}%`,
                                   },
                              },
                              {
                                   description: {
                                        [Op.iLike]: `%${query}%`,
                                   },
                              },
                         ],
                    },
                    order: [['createdAt', 'DESC']],
               });

               // Sequelize model nesnelerini ProjectData tipine dönüştür
               return projects.map(convertToProjectData);
          } catch (error) {
               console.error('Search projects error:', error);
               throw error;
          }
     }
}
