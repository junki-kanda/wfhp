import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/types';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="card flex flex-col group">
      <div className="relative w-full aspect-video rounded-md overflow-hidden mb-4">
        <Image
          src={post.thumbnail.data.attributes.url}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{publishedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag size={16} />
            <span>{post.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 