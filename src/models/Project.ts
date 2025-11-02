// src/models/Project.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/sequelize';

// İlişkili modelleri içe aktar
import ProjectFeature from './ProjectFeature';
import ProjectPlan from './ProjectPlan';
import ProjectInteriorImage from './ProjectInteriorImage';
import ProjectConstructionImage from './ProjectConstructionImage';
import ProjectApartmentLayout from './ProjectApartmentLayout';

interface ProjectAttributes {
     id?: number;
     name: string;
     description?: string;
     imageUrl?: string;
     attachments?: string[];
     createdAt?: Date;
     updatedAt?: Date;
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
}

class Project extends Model<ProjectAttributes> implements ProjectAttributes {
     declare id: number;
     declare name: string;
     declare description: string;
     declare imageUrl: string;
     declare attachments: string[];
     declare createdAt: Date;
     declare updatedAt: Date;
     // Yeni eklenen alanlar
     declare location: string;
     declare status: string;
     declare year: number;
     declare area: string;
     declare block: number;
     // Yeni eklenen ilişkisel alanlar
     declare headerImageUrl: string;
     declare catalogUrl: string;
     declare featureTitle: string;
     declare featureDescription: string;
     declare featureImageUrl: string;
     declare generalPlanImageUrl: string;

     // İlişkisel alanlar
     declare feature?: ProjectFeature;
     declare plan?: ProjectPlan;
     declare interiorImages?: ProjectInteriorImage[];
     declare constructionImages?: ProjectConstructionImage[];
     declare apartmentLayouts?: ProjectApartmentLayout[];
}

Project.init(
     {
          id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          name: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: {
                    notEmpty: true,
                    len: [1, 255],
               },
          },
          description: {
               type: DataTypes.TEXT,
               allowNull: true,
          },
          imageUrl: {
               type: DataTypes.TEXT,
               allowNull: true,
               comment: "Ana proje görseli URL'si (S3)",
          },
          attachments: {
               type: DataTypes.JSON,
               allowNull: true,
               defaultValue: [],
               comment: 'Proje dosyaları URL listesi (S3)',
          },
          // Yeni eklenen alanlar
          location: {
               type: DataTypes.STRING,
               allowNull: true,
               comment: 'Proje konumu',
          },
          status: {
               type: DataTypes.STRING,
               allowNull: true,
               comment: 'Proje durumu',
          },
          year: {
               type: DataTypes.INTEGER,
               allowNull: true,
               comment: 'Proje yılı',
          },
          area: {
               type: DataTypes.STRING,
               allowNull: true,
               comment: 'Proje alanı',
          },
          block: {
               type: DataTypes.INTEGER,
               allowNull: true,
               comment: 'Proje blok sayısı',
          },
          // Yeni eklenen ilişkisel alanlar
          headerImageUrl: {
               type: DataTypes.TEXT,
               allowNull: true,
               comment: "Proje başlık görseli URL'si",
          },
          catalogUrl: {
               type: DataTypes.TEXT,
               allowNull: true,
               comment: "Proje katalog URL'si",
          },
          featureTitle: {
               type: DataTypes.STRING,
               allowNull: true,
               comment: 'Proje özelliği başlığı',
          },
          featureDescription: {
               type: DataTypes.TEXT,
               allowNull: true,
               comment: 'Proje özelliği açıklaması',
          },
          featureImageUrl: {
               type: DataTypes.TEXT,
               allowNull: true,
               comment: "Proje özelliği görseli URL'si",
          },
          generalPlanImageUrl: {
               type: DataTypes.TEXT,
               allowNull: true,
               comment: "Genel plan görseli URL'si",
          },
     },
     {
          sequelize,
          tableName: 'projects',
          timestamps: true, // createdAt ve updatedAt alanlarını otomatik ekler
          underscored: false, // camelCase kullan
          modelName: 'Project',
     }
);

// İlişkiler src/models/index.ts dosyasında tanımlanmıştır

export default Project;
