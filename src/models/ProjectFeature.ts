// src/models/ProjectFeature.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/sequelize';
import Project from './Project';

interface ProjectFeatureAttributes {
     id?: number;
     projectId: number;
     title?: string;
     description?: string;
     imageUrl?: string;
     createdAt?: Date;
     updatedAt?: Date;
}

class ProjectFeature
     extends Model<ProjectFeatureAttributes>
     implements ProjectFeatureAttributes
{
     declare id: number;
     declare projectId: number;
     declare title: string;
     declare description: string;
     declare imageUrl: string;
     declare createdAt: Date;
     declare updatedAt: Date;
}

ProjectFeature.init(
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
          title: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          description: {
               type: DataTypes.TEXT,
               allowNull: true,
          },
          imageUrl: {
               type: DataTypes.TEXT,
               allowNull: true,
          },
     },
     {
          sequelize,
          tableName: 'project_features',
          timestamps: true,
          underscored: false,
          modelName: 'ProjectFeature',
     }
);

// İlişkileri tanımla (bu kısmı kaldırıyoruz çünkü modeller henüz tam yüklenmemiş olabilir)

export default ProjectFeature;
