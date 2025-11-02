// src/models/ProjectConstructionImage.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/sequelize";
import Project from "./Project";

interface ProjectConstructionImageAttributes {
  id?: number;
  projectId: number;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class ProjectConstructionImage extends Model<ProjectConstructionImageAttributes> implements ProjectConstructionImageAttributes {
  declare id: number;
  declare projectId: number;
  declare imageUrl: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProjectConstructionImage.init(
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
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "project_construction_images",
    timestamps: true,
    underscored: false,
    modelName: 'ProjectConstructionImage',
  }
);

// İlişkileri tanımla (bu kısmı kaldırıyoruz çünkü modeller henüz tam yüklenmemiş olabilir)

export default ProjectConstructionImage;