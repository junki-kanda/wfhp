import type { Metadata } from 'next';
import { getBlogPosts, getCategories } from '@/lib/api/strapi';
import BlogPostCard from '@/components/molecules/BlogPostCard';

export const metadata: Metadata = {
  title: 'ブログ | WisteriaForest',
  description: 'WisteriaForestのブログ記事一覧。バケーションレンタル運営に関する最新情報やノウハウ。',
};

export default async function BlogPage({
  searchParams,
}: { 
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams?.category as string | undefined;
  const response = await getBlogPosts(1, 12, category);
  const posts = response.data.map((item) => item.attributes);
  const categories = await getCategories();

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            最新のブログ記事
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            軽井沢のバケーションレンタル運営に役立つ情報を発信しています
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <a
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                !category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              すべて
            </a>
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/blog?category=${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === cat ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </a>
            ))}
          </div>
        )}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <BlogPostCard key={idx} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            該当する記事は見つかりませんでした。
          </p>
        )}
      </div>
    </section>
  );
} 