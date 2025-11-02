// API client for Alians Development website

import { ApiResponse, PaginatedResponse, Project, Service, NewsArticle, ContactForm, FAQ } from '@/types';
import { API_ENDPOINTS } from '@/constants';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Projects API
  async getProjects(): Promise<ApiResponse<Project[]>> {
    return this.request<Project[]>(API_ENDPOINTS.projects);
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    return this.request<Project>(`${API_ENDPOINTS.projects}/${id}`);
  }

  // Services API
  async getServices(): Promise<ApiResponse<Service[]>> {
    return this.request<Service[]>(API_ENDPOINTS.services);
  }

  // News API
  async getNews(page: number = 1, limit: number = 10): Promise<ApiResponse<PaginatedResponse<NewsArticle>>> {
    return this.request<PaginatedResponse<NewsArticle>>(`${API_ENDPOINTS.news}?page=${page}&limit=${limit}`);
  }

  async getNewsArticle(slug: string): Promise<ApiResponse<NewsArticle>> {
    return this.request<NewsArticle>(`${API_ENDPOINTS.news}/${slug}`);
  }

  // Contact API
  async submitContactForm(data: ContactForm): Promise<ApiResponse<void>> {
    return this.request<void>(API_ENDPOINTS.contact, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // FAQ API
  async getFAQs(): Promise<ApiResponse<FAQ[]>> {
    return this.request<FAQ[]>(API_ENDPOINTS.faq);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export for testing or custom instances
export { ApiClient };

