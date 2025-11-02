// Model ilişkilerini tanımla - Circular import sorununu çözmek için

import Project from './Project';
import ProjectFeature from './ProjectFeature';
import ProjectPlan from './ProjectPlan';
import ProjectInteriorImage from './ProjectInteriorImage';
import ProjectConstructionImage from './ProjectConstructionImage';
import ProjectApartmentLayout from './ProjectApartmentLayout';

// Project ilişkileri
Project.hasMany(ProjectInteriorImage, { 
  as: 'interiorImages', 
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});

Project.hasMany(ProjectConstructionImage, { 
  as: 'constructionImages', 
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});

Project.hasMany(ProjectApartmentLayout, { 
  as: 'apartmentLayouts', 
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});

Project.hasOne(ProjectFeature, { 
  as: 'feature', 
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});

Project.hasOne(ProjectPlan, { 
  as: 'plan', 
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});

// Reverse relationships
ProjectInteriorImage.belongsTo(Project, { 
  as: 'project', 
  foreignKey: 'projectId'
});

ProjectConstructionImage.belongsTo(Project, { 
  as: 'project', 
  foreignKey: 'projectId'
});

ProjectApartmentLayout.belongsTo(Project, { 
  as: 'project', 
  foreignKey: 'projectId'
});

ProjectFeature.belongsTo(Project, { 
  as: 'project', 
  foreignKey: 'projectId'
});

ProjectPlan.belongsTo(Project, { 
  as: 'project', 
  foreignKey: 'projectId'
});

export {
  Project,
  ProjectFeature,
  ProjectPlan,
  ProjectInteriorImage,
  ProjectConstructionImage,
  ProjectApartmentLayout
};
