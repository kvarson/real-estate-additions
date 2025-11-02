// Project form actions - Server Actions

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProjectService } from '@/services/ProjectService';
import { uploadFileToServer } from '@/utils/serverFileUpload';

/**
 * Yeni proje oluştur - Form action
 */
export async function createProjectAction(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File | null;

    // Veri doğrulama
    if (!name || name.trim() === '') {
      throw new Error('Proje adı gereklidir');
    }

    if (name.trim().length < 2) {
      throw new Error('Proje adı en az 2 karakter olmalıdır');
    }

    // Resim yükleme
    let imageUrl: string | undefined;
    if (image && image.size > 0) {
      // Dosya doğrulama
      if (image.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('Dosya boyutu 10MB\'dan büyük olamaz');
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(image.type)) {
        throw new Error('Sadece JPG, PNG, GIF veya WEBP formatında resim yükleyebilirsiniz');
      }

      // Gerçek dosya yükleme işlemi
      imageUrl = await uploadFileToServer(image);
    }

    // Proje oluştur
    await ProjectService.createProject({
      name: name.trim(),
      description: description?.trim() || undefined,
      imageUrl: imageUrl
    });

    // Cache'i yenile ve yönlendir
    revalidatePath('/az/projects');
    redirect('/az/projects?success=created');
    
  } catch (error: unknown) {
    console.error('Create project error:', error);
    
    // Error sayfasına yönlendir
    const errorMessage = error instanceof Error ? error.message : 'Proje oluşturulurken hata oluştu';
    redirect(`/az/projects/create?error=${encodeURIComponent(errorMessage)}`);
  }
}

/**
 * Proje güncelle - Form action
 */
export async function updateProjectAction(id: number, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File | null;

    // Veri doğrulama
    if (!name || name.trim() === '') {
      throw new Error('Proje adı gereklidir');
    }

    if (name.trim().length < 2) {
      throw new Error('Proje adı en az 2 karakter olmalıdır');
    }

    // Resim yükleme
    let imageUrl: string | undefined;
    if (image && image.size > 0) {
      // Dosya doğrulama
      if (image.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('Dosya boyutu 10MB\'dan büyük olamaz');
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(image.type)) {
        throw new Error('Sadece JPG, PNG, GIF veya WEBP formatında resim yükleyebilirsiniz');
      }

      // Gerçek dosya yükleme işlemi
      imageUrl = await uploadFileToServer(image);
    }

    // Proje güncelle
    await ProjectService.updateProject(id, {
      name: name.trim(),
      description: description?.trim() || undefined,
      imageUrl: imageUrl // undefined olursa mevcut resim korunur
    });

    // Cache'i yenile ve yönlendir
    revalidatePath('/az/projects');
    revalidatePath(`/az/projects/${id}`);
    redirect('/az/projects?success=updated');
    
  } catch (error: unknown) {
    console.error('Update project error:', error);
    
    // Error sayfasına yönlendir
    const errorMessage = error instanceof Error ? error.message : 'Proje güncellenirken hata oluştu';
    redirect(`/az/projects/${id}/edit?error=${encodeURIComponent(errorMessage)}`);
  }
}

/**
 * Proje sil - Form action
 */
export async function deleteProjectAction(formData: FormData) {
  try {
    const id = parseInt(formData.get('id') as string);
    
    if (isNaN(id)) {
      throw new Error('Geçersiz proje ID\'si');
    }

    await ProjectService.deleteProject(id);

    // Cache'i yenile ve yönlendir
    revalidatePath('/az/projects');
    redirect('/az/projects?success=deleted');
    
  } catch (error: unknown) {
    console.error('Delete project error:', error);
    
    // Error sayfasına yönlendir
    const errorMessage = error instanceof Error ? error.message : 'Proje silinirken hata oluştu';
    redirect(`/az/projects?error=${encodeURIComponent(errorMessage)}`);
  }
}