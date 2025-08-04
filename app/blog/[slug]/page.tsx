import type { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/api/strapi';
import { notFound } from 'next/navigation';
import RichTextRenderer from '@/components/organisms/RichTextRenderer';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const response = await getBlogPosts(1, 100); // すべての記事を取得
  return response.data.map((post) => ({ slug: post.attributes.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const response = await getBlogPostBySlug(slug);
  const post = response.data[0]?.attributes;

  if (!post) {
    notFound();
  }

  return (
    <article className="section-padding">
      <div className="container-custom max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 text-center leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-600 text-sm mb-10">
          <div className="flex items-center gap-1">
            <span className="font-medium">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>•</span>
            <span>{post.readingTime}分で読めます</span>
          </div>
        </div>

        {post.thumbnail?.data?.attributes?.url && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-12 shadow-lg">
            <img
              src={post.thumbnail.data.attributes.url}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* RichTextRenderer for Markdown content */}
        <RichTextRenderer content={post.content} />
      </div>
    </article>
  );
} 