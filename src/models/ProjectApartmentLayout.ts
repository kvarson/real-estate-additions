// src/models/ProjectApartmentLayout.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/sequelize';
import Project from './Project';

interface ProjectApartmentLayoutAttributes {
     id?: number;
     projectId: number;
     apartmentType: string; // 1|2|3|4 enum
     squareMeter: string;
     layoutImageUrl: string;
     totalArea: number;
     roomArea?: number;
     kitchenArea?: number;
     bathroomArea?: number;
     balconyArea?: number;
     createdAt?: Date;
     updatedAt?: Date;
}

class ProjectApartmentLayout
     extends Model<ProjectApartmentLayoutAttributes>
     implements ProjectApartmentLayoutAttributes
{
     declare id: number;
     declare projectId: number;
     declare apartmentType: string; // 1|2|3|4 enum
     declare squareMeter: string;
     declare layoutImageUrl: string;
     declare totalArea: number;
     declare roomArea: number;
     declare kitchenArea: number;
     declare bathroomArea: number;
     declare balconyArea: number;
     declare createdAt: Date;
     declare updatedAt: Date;
}

ProjectApartmentLayout.init(
     {
          id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          projectId: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: Project,
                    key: 'id',
               },
               onDelete: 'CASCADE',
          },
          apartmentType: {
               type: DataTypes.STRING,
               allowNull: false,
               comment: '1|2|3|4 enum // 1 otag, 2 otag, 3 otag ve s.',
          },
          squareMeter: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          layoutImageUrl: {
               type: DataTypes.TEXT,
               allowNull: false,
          },
          totalArea: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: false,
          },
          roomArea: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: true,
          },
          kitchenArea: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: true,
          },
          bathroomArea: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: true,
          },
          balconyArea: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: true,
          },
     },
     {
          sequelize,
          tableName: 'project_apartment_layouts',
          timestamps: true,
          underscored: false,
          modelName: 'ProjectApartmentLayout',
     }
);

// İlişkileri tanımla (bu kısmı kaldırıyoruz çünkü modeller henüz tam yüklenmemiş olabilir)

export default ProjectApartmentLayout;
