import { StrapiResponse, StrapiItem, CaseStudy, BlogPost, Job } from '@/lib/types';

const strapiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
const strapiToken = process.env.STRAPI_TOKEN;

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

/**
 * Strapi APIのベースフェッチ関数
 * @param endpoint - APIエンドポイント
 * @param options - フェッチオプション
 * @returns レスポンスデータ
 */
async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;
  
  const url = new URL(`${strapiUrl}/api${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const mergedOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  };

  try {
    const response = await fetch(url.toString(), mergedOptions);
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Strapi API error:', error);
    throw error;
  }
}

/**
 * ケーススタディ一覧を取得
 * @param page - ページ番号
 * @param pageSize - 1ページあたりの件数
 * @returns ケーススタディ一覧
 */
export async function getCaseStudies(
  page = 1,
  pageSize = 10
): Promise<StrapiResponse<StrapiItem<CaseStudy>[]>> {
  return fetchApi<StrapiResponse<StrapiItem<CaseStudy>[]>>('/case-studies', {
    params: {
      'pagination[page]': page.toString(),
      'pagination[pageSize]': pageSize.toString(),
      'populate': '*',
      'sort': 'publishedAt:desc',
    },
    next: { revalidate: 3600 }, // 1時間キャッシュ
  });
}

/**
 * 特定のケーススタディを取得
 * @param slug - ケーススタディのスラッグ
 * @returns ケーススタディ
 */
export async function getCaseStudyBySlug(
  slug: string
): Promise<StrapiResponse<StrapiItem<CaseStudy>[]>> {
  return fetchApi<StrapiResponse<StrapiItem<CaseStudy>[]>>('/case-studies', {
    params: {
      'filters[slug][$eq]': slug,
      'populate': '*',
    },
    next: { revalidate: 3600 },
  });
}

/**
 * ブログ記事一覧を取得
 * @param page - ページ番号
 * @param pageSize - 1ページあたりの件数
 * @param category - カテゴリーフィルター
 * @returns ブログ記事一覧
 */
export async function getBlogPosts(
  page = 1,
  pageSize = 12,
  category?: string
): Promise<StrapiResponse<StrapiItem<BlogPost>[]>> {
  const params: Record<string, string> = {
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'populate': '*',
    'sort': 'publishedAt:desc',
  };

  if (category) {
    params['filters[category][$eq]'] = category;
  }

  return fetchApi<StrapiResponse<StrapiItem<BlogPost>[]>>('/blog-posts', {
    params,
    next: { revalidate: 3600 },
  });
}

/**
 * 特定のブログ記事を取得
 * @param slug - ブログ記事のスラッグ
 * @returns ブログ記事
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<StrapiResponse<StrapiItem<BlogPost>[]>> {
  return fetchApi<StrapiResponse<StrapiItem<BlogPost>[]>>('/blog-posts', {
    params: {
      'filters[slug][$eq]': slug,
      'populate': '*',
    },
    next: { revalidate: 3600 },
  });
}

/**
 * 関連ブログ記事を取得
 * @param currentSlug - 現在の記事のスラッグ
 * @param category - カテゴリー
 * @param limit - 取得件数
 * @returns 関連ブログ記事
 */
export async function getRelatedBlogPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<StrapiResponse<StrapiItem<BlogPost>[]>> {
  return fetchApi<StrapiResponse<StrapiItem<BlogPost>[]>>('/blog-posts', {
    params: {
      'filters[slug][$ne]': currentSlug,
      'filters[category][$eq]': category,
      'pagination[pageSize]': limit.toString(),
      'populate': 'thumbnail',
      'sort': 'publishedAt:desc',
    },
    next: { revalidate: 3600 },
  });
}

/**
 * 求人情報一覧を取得
 * @param page - ページ番号
 * @param pageSize - 1ページあたりの件数
 * @param department - 部署フィルター
 * @returns 求人情報一覧
 */
export async function getJobs(
  page = 1,
  pageSize = 20,
  department?: string
): Promise<StrapiResponse<StrapiItem<Job>[]>> {
  const params: Record<string, string> = {
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'sort': 'publishedAt:desc',
  };

  if (department) {
    params['filters[department][$eq]'] = department;
  }

  return fetchApi<StrapiResponse<StrapiItem<Job>[]>>('/jobs', {
    params,
    next: { revalidate: 3600 },
  });
}

/**
 * カテゴリー一覧を取得
 * @returns カテゴリー一覧
 */
export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetchApi<StrapiResponse<any[]>>('/categories', {
      params: {
        'fields[0]': 'name',
        'sort': 'name:asc',
      },
      next: { revalidate: 86400 }, // 24時間キャッシュ
    });

    return response.data.map((item) => item.attributes.name);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

/**
 * タグ一覧を取得
 * @returns タグ一覧
 */
export async function getTags(): Promise<string[]> {
  try {
    const response = await fetchApi<StrapiResponse<any[]>>('/tags', {
      params: {
        'fields[0]': 'name',
        'sort': 'name:asc',
      },
      next: { revalidate: 86400 },
    });

    return response.data.map((item) => item.attributes.name);
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}
