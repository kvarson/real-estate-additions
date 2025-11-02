import { connectDB } from '../lib/sequelize';
import Project from '../models/Project';

async function setupDatabase() {
     try {
          console.log('Veritabanı bağlantısı kuruluyor...');
          await connectDB();
          console.log('Veritabanı bağlantısı başarılı!');

          console.log('Projeler tablosu kontrol ediliyor...');
          await Project.sync({ alter: true });
          console.log('Projeler tablosu hazır!');

          console.log('Veritabanı kurulumu tamamlandı.');
          process.exit(0);
     } catch (error) {
          console.error('Veritabanı kurulum hatası:', error);
          process.exit(1);
     }
}

setupDatabase();
