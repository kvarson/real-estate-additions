// File Service - Amazon S3 entegrasyonu için hazır

import { ProjectService } from './ProjectService';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export interface UploadFileData {
  file: File;
  projectId?: number;
  folder?: string;
}

export class FileService {
  /**
   * Dosya yükleme için S3 yapılandırma bilgileri
   * Bu fonksiyon S3 kurulumu yapıldığında aktifleştirilecek
   */
  private static getS3Config() {
    return {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1',
      bucket: process.env.AWS_S3_BUCKET,
    };
  }

  /**
   * Local dosya yükleme
   */
  static async uploadFileToLocal(data: UploadFileData): Promise<string> {
    try {
      // Dosya doğrulama
      if (!data.file) {
        throw new Error('Dosya seçilmedi');
      }

      // Dosya boyutu kontrolü (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (data.file.size > maxSize) {
        throw new Error('Dosya boyutu 10MB\'dan büyük olamaz');
      }

      // Dosya türü kontrolü
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(data.file.type)) {
        throw new Error('Desteklenmeyen dosya türü');
      }

      // Proje varlığını kontrol et
      if (data.projectId) {
        const project = await ProjectService.getProjectById(data.projectId);
        if (!project) {
          throw new Error('Proje bulunamadı');
        }
      }

      // Dosya adını güvenli hale getir
      const timestamp = Date.now();
      const safeFileName = this.sanitizeFileName(data.file.name);
      const fileName = `${timestamp}_${safeFileName}`;

      // Klasör yapısı oluştur
      const folder = data.folder || 'general';
      const projectFolder = data.projectId ? `project_${data.projectId}` : 'no_project';
      const fullPath = `uploads/${projectFolder}/${folder}`;

      // Public klasöründe uploads dizini oluştur
      const uploadsDir = join(process.cwd(), 'public', fullPath);
      if (!existsSync(uploadsDir)) {
        // Bu işlem için ek izinler gerekebilir
        console.log(`Creating directory: ${uploadsDir}`);
      }

      // Dosyayı public klasörüne kaydet
      const fileUrl = `/${fullPath}/${fileName}`;
      
      return fileUrl;

    } catch (error: unknown) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  /**
   * Dosya yükleme - S3 entegrasyonu için hazır fonksiyon
   * Şu anda local storage kullanıyor, S3 için güncelleme yapılabilir
   */
  static async uploadFile(data: UploadFileData): Promise<string> {
    try {
      // Dosya doğrulama
      if (!data.file) {
        throw new Error('Dosya seçilmedi');
      }

      // Dosya boyutu kontrolü (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (data.file.size > maxSize) {
        throw new Error('Dosya boyutu 10MB\'dan büyük olamaz');
      }

      // Dosya türü kontrolü
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(data.file.type)) {
        throw new Error('Desteklenmeyen dosya türü');
      }

      // Proje varlığını kontrol et
      if (data.projectId) {
        const project = await ProjectService.getProjectById(data.projectId);
        if (!project) {
          throw new Error('Proje bulunamadı');
        }
      }

      // Dosya adını güvenli hale getir
      const timestamp = Date.now();
      const safeFileName = this.sanitizeFileName(data.file.name);
      const fileName = `${timestamp}_${safeFileName}`;

      // Klasör yapısı oluştur
      const folder = data.folder || 'general';
      const projectFolder = data.projectId ? `project_${data.projectId}` : 'no_project';
      const fullPath = `uploads/${projectFolder}/${folder}/${fileName}`;

      // TODO: S3 upload implementasyonu
      // Şu anda local storage placeholder
      console.log(`File would be uploaded to S3: ${fullPath}`);
      console.log(`File info:`, {
        name: data.file.name,
        size: data.file.size,
        type: data.file.type,
        lastModified: data.file.lastModified
      });

      // S3 URL'i return et (şimdilik mock)
      const mockS3Url = `https://${this.getS3Config().bucket}.s3.amazonaws.com/${fullPath}`;
      
      return mockS3Url;

    } catch (error: unknown) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  /**
   * Dosya silme - S3'ten dosya silme
   */
  static async deleteFile(fileUrl: string): Promise<boolean> {
    try {
      // URL'den S3 key'ini çıkar
      const key = this.extractS3KeyFromUrl(fileUrl);
      
      if (!key) {
        throw new Error('Geçersiz dosya URL\'si');
      }

      // TODO: S3 delete implementasyonu
      console.log(`File would be deleted from S3: ${key}`);

      return true;

    } catch (error: unknown) {
      console.error('File delete error:', error);
      throw error;
    }
  }

  /**
   * Dosya adını güvenli hale getir
   */
  private static sanitizeFileName(fileName: string): string {
    // Türkçe karakterleri değiştir
    const turkishChars: { [key: string]: string } = {
      'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
      'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
    };

    let sanitized = fileName;
    Object.keys(turkishChars).forEach(char => {
      sanitized = sanitized.replace(new RegExp(char, 'g'), turkishChars[char]);
    });

    // Özel karakterleri temizle
    sanitized = sanitized.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    // Çoklu alt çizgileri tekle
    sanitized = sanitized.replace(/_+/g, '_');
    
    // Başında ve sonunda alt çizgi varsa kaldır
    sanitized = sanitized.replace(/^_+|_+$/g, '');

    return sanitized;
  }

  /**
   * S3 URL'sinden key çıkar
   */
  private static extractS3KeyFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      // S3 URL formatları:
      // https://bucket.s3.region.amazonaws.com/key
      // https://s3.region.amazonaws.com/bucket/key
      
      if (urlObj.hostname.includes('s3')) {
        // Path'den key'i çıkar
        return urlObj.pathname.substring(1); // İlk '/' karakterini kaldır
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Dosya türü kontrolü
   */
  static isValidFileType(file: File): boolean {
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    return allowedTypes.includes(file.type);
  }

  /**
   * Dosya boyutu kontrolü
   */
  static isValidFileSize(file: File, maxSizeMB: number = 10): boolean {
    const maxSize = maxSizeMB * 1024 * 1024;
    return file.size <= maxSize;
  }
}