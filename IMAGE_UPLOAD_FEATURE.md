# Image Upload Feature Documentation

## Overview

This document explains how the image upload feature works in the Alians website project management system.

## Features Added

1. Image upload field in project creation form
2. Image upload field in project editing form
3. Image display on project detail page
4. Image thumbnails on projects listing page
5. Image URL storage in database

## Implementation Details

### Database Schema

The Project model already had an `imageUrl` field for storing image URLs:

```typescript
imageUrl: {
  type: DataTypes.TEXT,
  allowNull: true,
  comment: 'Ana proje görseli URL\'si (S3)'
}
```

### Frontend Implementation

1. **Create Project Page** ([src/app/[locale]/projects/create/page.tsx](file:///c:/Users/LENOVO/Desktop/alians_website/src/app/%5Blocale%5D/projects/create/page.tsx))
     - Added file input field for image upload
     - Accepts JPG, PNG, GIF, WEBP formats
     - 10MB file size limit

2. **Edit Project Page** ([src/app/[locale]/projects/[id]/edit/page.tsx](file:///c:/Users/LENOVO/Desktop/alians_website/src/app/%5Blocale%5D/projects/%5Bid%5D/edit/page.tsx))
     - Added file input field for image upload
     - Shows current image if exists
     - Allows replacing existing image

3. **Project Detail Page** ([src/app/[locale]/projects/[id]/page.tsx](file:///c:/Users/LENOVO/Desktop/alians_website/src/app/%5Blocale%5D/projects/%5Bid%5D/page.tsx))
     - Displays project image at the top of the page
     - Uses responsive image sizing

4. **Projects Listing Page** ([src/app/[locale]/projects/page.tsx](file:///c:/Users/LENOVO/Desktop/alians_website/src/app/%5Blocale%5D/projects/page.tsx))
     - Shows image thumbnails in project cards
     - Displays "Resim yok" placeholder when no image exists

### Backend Implementation

1. **ProjectService** ([src/services/ProjectService.ts](file:///c:/Users/LENOVO/Desktop/alians_website/src/services/ProjectService.ts))
     - Updated CreateProjectData and UpdateProjectData interfaces to include imageUrl
     - Modified createProject and updateProject methods to handle imageUrl

2. **Project Actions** ([src/actions/projectActions.ts](file:///c:/Users/LENOVO/Desktop/alians_website/src/actions/projectActions.ts))
     - Added image file processing in createProjectAction and updateProjectAction
     - Implemented file validation (type and size)
     - Generates mock URLs for uploaded images

3. **FileService** ([src/services/FileService.ts](file:///c:/Users/LENOVO/Desktop/alians_website/src/services/FileService.ts))
     - Ready for S3 integration
     - Includes local file upload placeholder
     - File validation and sanitization functions

## Usage Instructions

### Creating a Project with Image

1. Navigate to `/[locale]/projects/create`
2. Fill in project name and description
3. Select an image file using the "Proje Resmi" file input
4. Click "Proje Oluştur"

### Editing a Project Image

1. Navigate to `/[locale]/projects/[id]/edit`
2. View current image (if exists)
3. Select a new image file to replace the current one
4. Click "Değişiklikleri Kaydet"

### Viewing Project Images

1. On the projects listing page, thumbnails are displayed in project cards
2. On the project detail page, the full image is displayed at the top

## Technical Notes

### File Validation

- Supported formats: JPG, PNG, GIF, WEBP
- Maximum file size: 10MB
- File names are sanitized to prevent security issues

### Storage

- Currently uses mock URLs for demonstration
- Ready for S3 integration
- Local storage implementation available in FileService

### Future Improvements

1. Implement actual file upload to S3 or local storage
2. Add image resizing and optimization
3. Implement image deletion when projects are deleted
4. Add support for multiple images per project

## Error Handling

- File size validation with user-friendly error messages
- File type validation with supported format information
- Graceful handling of upload errors
