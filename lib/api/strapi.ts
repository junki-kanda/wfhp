export interface StrapiItem<T> {
  id: number;
  attributes: T;
}

export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  thumbnail: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  author: {
    name: string;
  };
  category: string;
  tags: string[];
  readingTime?: number;
}

export interface CaseStudy {
  title: string;
  clientName: string;
  propertyType: string;
  location: string;
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
  clientTestimonial: string;
  description?: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  images?: Array<{
    data: Array<{
      attributes: {
        url: string;
        alternativeText?: string;
      };
    }>;
  }>;
}

// Mock data for now
const mockBlogPosts: StrapiItem<BlogPost>[] = [
  {
    id: 1,
    attributes: {
      title: '軽井沢の高級バケーションレンタル市場の現状と展望',
      slug: 'karuizawa-luxury-vacation-rental-market',
      content: '# 軽井沢の高級バケーションレンタル市場\n\n軽井沢は日本有数のリゾート地として...',
      excerpt: '軽井沢の高級バケーションレンタル市場は急速に成長しています。',
      publishedAt: '2024-01-15',
      thumbnail: {
        data: {
          attributes: {
            url: '/images/blog/market-analysis.jpg',
            alternativeText: '軽井沢の風景',
          },
        },
      },
      author: {
        name: 'WisteriaForest編集部',
      },
      category: '市場分析',
      tags: ['軽井沢', 'バケーションレンタル', '市場動向'],
    },
  },
];

export async function getBlogPosts(): Promise<{ data: StrapiItem<BlogPost>[] }> {
  // Mock implementation
  return { data: mockBlogPosts };
}

export async function getBlogPost(slug: string): Promise<{ data: StrapiItem<BlogPost>[] }> {
  // Mock implementation
  const post = mockBlogPosts.find((p) => p.attributes.slug === slug);
  if (!post) {
    return { data: [] };
  }
  return { data: [post] };
}

export async function getCaseStudies(): Promise<{ data: StrapiItem<CaseStudy>[] }> {
  // Mock implementation
  return { data: [] };
}

export async function getBlogPostBySlug(slug: string): Promise<{ data: StrapiItem<BlogPost>[] }> {
  return getBlogPost(slug);
}

export async function getCategories(): Promise<{ data: string[] }> {
  // Mock implementation
  return { data: ['市場分析', '運営ノウハウ', 'お知らせ'] };
}

export interface Job {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export async function getJobs(): Promise<{ data: StrapiItem<Job>[] }> {
  // Mock implementation
  return { data: [] };
}