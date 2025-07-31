import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search, Tag, BookmarkIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { bookmarkUtils } from '../../utils/bookmarks';

interface BlogPageProps {
  onNavigateToPost: (postId: string) => void;
  onNavigateToBookmarks?: () => void;
}

export function BlogPage({ onNavigateToPost, onNavigateToBookmarks }: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    setBookmarkCount(bookmarkUtils.getBookmarkCount());
  }, []);

  const posts = [
    {
      id: 1,
      title: '2024年不動産投資市場の展望と注目エリア',
      excerpt: '2024年の不動産投資市場について、市場動向と投資家が注目すべきエリアを分析します。軽井沢・八ヶ岳エリアや地方中核都市など、投資価値の高いエリアの詳細分析をお届けします。',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center',
      author: '田中 一郎',
      date: '2024年1月15日',
      tags: ['市場分析', '投資戦略', 'トレンド'],
      category: 'market'
    }
  ];

  const tags = [
    'all', '市場分析', '投資戦略', 'PropTech', 'ブランディング', 
    'ESG', 'コワーキング', '地方投資', 'DX', '効率化'
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl leading-tight mb-6">
              ブログ・
              <span className="text-accent">コラム</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              バケレン業界の最新情報と専門知識をお届けします
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex gap-4 items-center w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="記事を検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              {onNavigateToBookmarks && bookmarkCount > 0 && (
                <Button
                  variant="outline"
                  onClick={onNavigateToBookmarks}
                  className="flex-shrink-0"
                >
                  <BookmarkIcon className="w-4 h-4 mr-2" />
                  保存済み ({bookmarkCount})
                </Button>
              )}
            </div>
            <div className="text-sm text-gray-600">
              {filteredPosts.length}件の記事が見つかりました
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  selectedTag === tag
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
                }`}
              >
                {tag === 'all' ? 'すべて' : tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-2xl mb-8">注目記事</h2>
              <Card 
                className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                onClick={() => onNavigateToPost(filteredPosts[0].id.toString())}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <ImageWithFallback
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {filteredPosts[0].tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="font-heading text-xl md:text-2xl">
                        {filteredPosts[0].title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {filteredPosts[0].excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {filteredPosts[0].author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {filteredPosts[0].date}
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToPost(filteredPosts[0].id.toString());
                          }}
                        >
                          続きを読む
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-2xl mb-8">最新記事</h2>
            
            {filteredPosts.length > 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post) => (
                  <Card 
                    key={post.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer flex flex-col h-full"
                    onClick={() => onNavigateToPost(post.id.toString())}
                  >
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex flex-col h-full">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <h3 className="font-heading text-lg font-semibold line-clamp-2 mb-4">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-6 flex-1">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t mt-auto">
                          <div className="space-y-1 text-xs text-gray-500">
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {post.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {post.date}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateToPost(post.id.toString());
                            }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 1 ? (
              <div className="text-center py-16">
                <h3 className="font-heading text-2xl text-gray-500 mb-2">
                  新しい記事を準備中です
                </h3>
                <p className="text-gray-400 mb-6">
                  バケレン業界の最新情報をお届けする記事を作成中です。<br />
                  今後も定期的に有益な情報を発信してまいりますので、ぜひお楽しみにお待ちください。
                </p>
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="font-heading text-2xl text-gray-500 mb-2">
                  条件に一致する記事が見つかりませんでした
                </h3>
                <p className="text-gray-400 mb-6">
                  検索条件を変更して再度お試しください
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag('all');
                  }}
                  variant="outline"
                >
                  条件をリセット
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">
            最新記事をお届け
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            不動産業界の最新情報をメールでお届けします。
            月1回程度の配信で、厳選した情報のみをお送りします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder="メールアドレス"
              className="bg-white/10 border-white/20 text-white placeholder-white/60"
            />
            <Button size="lg" className="bg-cta hover:bg-cta/90 text-white px-8">
              登録する
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}