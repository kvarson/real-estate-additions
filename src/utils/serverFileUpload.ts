// Server-side file upload utility functions

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * Upload a file to the public/uploads directory
 * @param file The file to upload
 * @returns The URL of the uploaded file
 */
export async function uploadFileToServer(file: File): Promise<string> {
     try {
          // Validate file type
          const allowedTypes = [
               'image/jpeg',
               'image/png',
               'image/gif',
               'image/webp',
          ];
          if (!allowedTypes.includes(file.type)) {
               throw new Error(
                    `Desteklenmeyen dosya türü: ${file.type}. Sadece JPG, PNG, GIF veya WEBP dosyaları yüklenebilir.`
               );
          }

          // Validate file size (10MB limit)
          if (file.size > 10 * 1024 * 1024) {
               throw new Error("Dosya boyutu 10MB'dan büyük olamaz");
          }

          // Convert File to Buffer
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          // Create uploads directory if it doesn't exist
          const uploadsDir = join(process.cwd(), 'public', 'uploads');

          if (!existsSync(uploadsDir)) {
               await mkdir(uploadsDir, { recursive: true });
          }

          // Generate unique filename
          const timestamp = Date.now();
          const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const fileName = `${timestamp}_${safeFileName}`;

          // Save file to public/uploads directory
          const filePath = join(uploadsDir, fileName);
          await writeFile(filePath, buffer);

          // Return file URL
          const fileUrl = `/uploads/${fileName}`;
          return fileUrl;
     } catch (error) {
          console.error('File upload error:', error);
          throw error;
     }
}
