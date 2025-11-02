// src/models/ProjectPlan.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../lib/sequelize';
import Project from './Project';

interface ProjectPlanAttributes {
     id?: number;
     projectId: number;
     generalPlanImageUrl?: string;
     catalogUrl?: string;
     createdAt?: Date;
     updatedAt?: Date;
}

class ProjectPlan
     extends Model<ProjectPlanAttributes>
     implements ProjectPlanAttributes
{
     declare id: number;
     declare projectId: number;
     declare generalPlanImageUrl: string;
     declare catalogUrl: string;
     declare createdAt: Date;
     declare updatedAt: Date;
}

ProjectPlan.init(
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
          generalPlanImageUrl: {
               type: DataTypes.TEXT,
               allowNull: true,
          },
          catalogUrl: {
               type: DataTypes.TEXT,
               allowNull: true,
          },
     },
     {
          sequelize,
          tableName: 'project_plans',
          timestamps: true,
          underscored: false,
          modelName: 'ProjectPlan',
     }
);

// İlişkileri tanımla (bu kısmı kaldırıyoruz çünkü modeller henüz tam yüklenmemiş olabilir)

export default ProjectPlan;
