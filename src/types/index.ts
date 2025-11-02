// Global type definitions for Alians Development website

export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  status: 'active' | 'completed' | 'upcoming';
  features?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  imageUrl: string;
  slug: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ContactForm extends Record<string, unknown> {
  name: string;
  phone: string;
  message: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// UI State types
export interface UIState {
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  language: 'en' | 'tr' | 'az';
}

// Form validation types
export type ValidationError = {
  field: string;
  message: string;
};

export interface FormState<T> {
  values: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}