// File Upload API Route

import { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const config = {
     api: {
          bodyParser: false,
     },
};

export async function POST(request: NextRequest) {
     try {
          console.log('Upload API called');

          // Get the raw body
          const contentType = request.headers.get('content-type') || '';
          console.log('Content-Type:', contentType);

          if (!contentType.includes('multipart/form-data')) {
               return new Response(
                    JSON.stringify({
                         success: false,
                         error: 'Geçersiz içerik türü. multipart/form-data bekleniyor.',
                    }),
                    {
                         status: 400,
                         headers: { 'Content-Type': 'application/json' },
                    }
               );
          }

          // Use the built-in Next.js formData() method which should work with multipart data
          const formData = await request.formData();
          console.log('Form data received');

          const file = formData.get('file') as File | null;
          console.log('File:', file);

          if (!file) {
               return new Response(
                    JSON.stringify({
                         success: false,
                         error: 'Dosya bulunamadı',
                    }),
                    {
                         status: 400,
                         headers: { 'Content-Type': 'application/json' },
                    }
               );
          }

          // Validate file type
          const allowedTypes = [
               'image/jpeg',
               'image/png',
               'image/gif',
               'image/webp',
          ];
          if (!allowedTypes.includes(file.type)) {
               return new Response(
                    JSON.stringify({
                         success: false,
                         error: `Desteklenmeyen dosya türü: ${file.type}. Sadece JPG, PNG, GIF veya WEBP dosyaları yüklenebilir.`,
                    }),
                    {
                         status: 400,
                         headers: { 'Content-Type': 'application/json' },
                    }
               );
          }

          // Validate file size (10MB limit)
          if (file.size > 10 * 1024 * 1024) {
               return new Response(
                    JSON.stringify({
                         success: false,
                         error: "Dosya boyutu 10MB'dan büyük olamaz",
                    }),
                    {
                         status: 400,
                         headers: { 'Content-Type': 'application/json' },
                    }
               );
          }

          // Convert File to Buffer
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          console.log('File converted to buffer, size:', buffer.length);

          // Create uploads directory if it doesn't exist
          const uploadsDir = join(process.cwd(), 'public', 'uploads');
          console.log('Uploads directory:', uploadsDir);

          if (!existsSync(uploadsDir)) {
               console.log('Creating uploads directory');
               await mkdir(uploadsDir, { recursive: true });
          }

          // Generate unique filename
          const timestamp = Date.now();
          const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const fileName = `${timestamp}_${safeFileName}`;
          console.log('Generated filename:', fileName);

          // Save file to public/uploads directory
          const filePath = join(uploadsDir, fileName);
          console.log('Saving file to:', filePath);

          await writeFile(filePath, buffer);
          console.log('File saved successfully');

          // Return success response with file URL
          const fileUrl = `/uploads/${fileName}`;
          console.log('File URL:', fileUrl);

          return new Response(
               JSON.stringify({
                    success: true,
                    fileUrl,
                    message: 'Dosya başarıyla yüklendi',
               }),
               {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
               }
          );
     } catch (error: unknown) {
          console.error('File upload error:', error);
          const errorMessage =
               error instanceof Error
                    ? error.message
                    : 'Dosya yüklenirken hata oluştu';
          return new Response(
               JSON.stringify({
                    success: false,
                    error: errorMessage,
               }),
               {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
               }
          );
     }
}

// Add OPTIONS method for CORS preflight requests
export async function OPTIONS() {
     return new Response(null, {
          status: 204,
          headers: {
               'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods': 'POST, OPTIONS',
               'Access-Control-Allow-Headers': 'Content-Type',
          },
     });
}
