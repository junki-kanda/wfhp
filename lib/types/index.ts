// Strapi Types
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiItem<T> {
  id: number;
  attributes: T;
}

// Case Study Types
export interface CaseStudy {
  title: string;
  slug: string;
  description: string;
  thumbnail: StrapiImage;
  beforeStats: {
    occupancyRate: number;
    averageRevenue: number;
    guestRating: number;
  };
  afterStats: {
    occupancyRate: number;
    averageRevenue: number;
    guestRating: number;
  };
  clientName: string;
  clientTestimonial: string;
  propertyType: string;
  location: string;
  publishedAt: string;
}

// Blog Types
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: StrapiImage;
  author: {
    name: string;
    avatar: StrapiImage;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
}

// Job Types
export interface Job {
  title: string;
  department: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  publishedAt: string;
}

// Strapi Image Types
export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        thumbnail?: ImageFormat;
        small?: ImageFormat;
        medium?: ImageFormat;
        large?: ImageFormat;
      };
      url: string;
    };
  };
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  tel?: string;
  company?: string;
  message: string;
  propertyLocation?: string;
  propertyType?: string[];
  attachment?: File;
}

export interface CareerFormData {
  name: string;
  furigana: string;
  email: string;
  tel: string;
  position: string;
  motivation: string;
  resume: File;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Stats Types
export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

// Process Step Types
export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}
