// File upload utility functions

/**
 * Convert a File to a base64 string
 * @param file The file to convert
 * @returns Promise that resolves to the base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Validate image file
 * @param file The file to validate
 * @returns Boolean indicating if the file is a valid image
 */
export function isValidImage(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  return validTypes.includes(file.type) && file.size <= maxSize;
}

/**
 * Get file preview URL for client-side preview
 * @param file The file to create a preview for
 * @returns Object URL for preview
 */
export function getFilePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Revoke file preview URL to free memory
 * @param url The URL to revoke
 */
export function revokeFilePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}