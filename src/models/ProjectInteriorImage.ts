// src/models/ProjectInteriorImage.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/sequelize';
import Project from './Project';

interface ProjectInteriorImageAttributes {
     id?: number;
     projectId: number;
     imageUrl: string;
     caption?: string;
     createdAt?: Date;
     updatedAt?: Date;
}

class ProjectInteriorImage
     extends Model<ProjectInteriorImageAttributes>
     implements ProjectInteriorImageAttributes
{
     declare id: number;
     declare projectId: number;
     declare imageUrl: string;
     declare caption: string;
     declare createdAt: Date;
     declare updatedAt: Date;
}

ProjectInteriorImage.init(
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
          imageUrl: {
               type: DataTypes.TEXT,
               allowNull: false,
          },
          caption: {
               type: DataTypes.STRING,
               allowNull: true,
          },
     },
     {
          sequelize,
          tableName: 'project_interior_images',
          timestamps: true,
          underscored: false,
          modelName: 'ProjectInteriorImage',
     }
);

// İlişkileri tanımla (bu kısmı kaldırıyoruz çünkü modeller henüz tam yüklenmemiş olabilir)

export default ProjectInteriorImage;
