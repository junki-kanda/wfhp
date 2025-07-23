import type { Metadata } from 'next';
import { getBlogPostBySlug } from '@/lib/api/strapi';

interface BlogLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogLayoutProps): Promise<Metadata> {
  const { slug } = params;
  const response = await getBlogPostBySlug(slug);
  const post = response.data[0]?.attributes;

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | WisteriaForest ブログ`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail?.data?.attributes?.url
        ? [post.thumbnail.data.attributes.url]
        : [],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail?.data?.attributes?.url
        ? [post.thumbnail.data.attributes.url]
        : [],
    },
  };
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
} 