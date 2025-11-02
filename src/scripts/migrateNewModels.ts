// src/scripts/migrateNewModels.ts
// Yeni modeller için migrasyon komut dosyası

import { connectDB } from '../lib/sequelize';
import Project from '../models/Project';
import ProjectFeature from '../models/ProjectFeature';
import ProjectPlan from '../models/ProjectPlan';
import ProjectInteriorImage from '../models/ProjectInteriorImage';
import ProjectConstructionImage from '../models/ProjectConstructionImage';
import ProjectApartmentLayout from '../models/ProjectApartmentLayout';

// İlişkileri tanımla
Project.hasOne(ProjectFeature, {
     foreignKey: 'projectId',
     as: 'feature',
});

ProjectFeature.belongsTo(Project, {
     foreignKey: 'projectId',
     as: 'project',
});

Project.hasOne(ProjectPlan, {
     foreignKey: 'projectId',
     as: 'plan',
});

ProjectPlan.belongsTo(Project, {
     foreignKey: 'projectId',
     as: 'project',
});

Project.hasMany(ProjectInteriorImage, {
     foreignKey: 'projectId',
     as: 'interiorImages',
});

ProjectInteriorImage.belongsTo(Project, {
     foreignKey: 'projectId',
     as: 'project',
});

Project.hasMany(ProjectConstructionImage, {
     foreignKey: 'projectId',
     as: 'constructionImages',
});

ProjectConstructionImage.belongsTo(Project, {
     foreignKey: 'projectId',
     as: 'project',
});

Project.hasMany(ProjectApartmentLayout, {
     foreignKey: 'projectId',
     as: 'apartmentLayouts',
});

ProjectApartmentLayout.belongsTo(Project, {
     foreignKey: 'projectId',
     as: 'project',
});

async function migrateNewModels() {
     try {
          console.log('Yeni modeller için migrasyon başlatılıyor...');

          // Veritabanı bağlantısını kur
          await connectDB();

          // Modelleri senkronize et (alter: true ile mevcut tabloları güncelle)
          await Project.sync({ alter: true });
          await ProjectFeature.sync({ alter: true });
          await ProjectPlan.sync({ alter: true });
          await ProjectInteriorImage.sync({ alter: true });
          await ProjectConstructionImage.sync({ alter: true });
          await ProjectApartmentLayout.sync({ alter: true });

          console.log('✅ Yeni modeller için migrasyon tamamlandı!');
          console.log('Oluşturulan tablolar:');
          console.log('- projects (güncellendi)');
          console.log('- project_features');
          console.log('- project_plans');
          console.log('- project_interior_images');
          console.log('- project_construction_images');
          console.log('- project_apartment_layouts');

          process.exit(0);
     } catch (error) {
          console.error('❌ Migrasyon hatası:', error);
          process.exit(1);
     }
}

// Komut dosyasını çalıştır
migrateNewModels();
