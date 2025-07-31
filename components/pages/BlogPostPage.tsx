import { Calendar, User, Tag, ArrowLeft, Clock, Share2, Heart, BookmarkIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { bookmarkUtils } from '../../utils/bookmarks';

interface BlogPostPageProps {
  postId: string;
  onNavigateBack: () => void;
  onNavigateToPost?: (postId: string) => void;
  onNavigateToContact?: () => void;
  onNavigateToBookmarks?: () => void;
}

export function BlogPostPage({ postId, onNavigateBack, onNavigateToPost, onNavigateToContact, onNavigateToBookmarks }: BlogPostPageProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(12); // 初期値として設定

  // ページ読み込み時にブックマーク状態を確認
  useEffect(() => {
    setIsSaved(bookmarkUtils.isBookmarked(postId));
  }, [postId]);
  // 実際の実装では、postIdを使ってAPIからデータを取得
  const post = {
    id: parseInt(postId),
    title: '2024年不動産投資市場の展望と注目エリア',
    excerpt: '2024年の不動産投資市場について、市場動向と投資家が注目すべきエリアを分析します。',
    content: `
      <p>2024年の不動産投資市場は、金利政策の変化や人口動態の変化、テクノロジーの進歩など、様々な要因によって大きく変化しています。</p>
      
      <h2>市場の現状分析</h2>
      <p>現在の不動産投資市場では、以下のような傾向が見られています：</p>
      <ul>
        <li>都市部の商業不動産価格の調整局面</li>
        <li>住宅需要の地方分散化</li>
        <li>ESG投資の本格化</li>
        <li>PropTechによる業務効率化の加速</li>
      </ul>
      
      <h2>注目すべき投資エリア</h2>
      <p>2024年に投資家が注目すべきエリアとして、以下が挙げられます：</p>
      
      <h3>1. 軽井沢・八ヶ岳エリア</h3>
      <p>リゾート地としての価値が見直されており、別荘需要の高まりとともに投資価値も上昇しています。特に、リモートワークの普及により、都市部からのアクセスの良い高原リゾート地への注目が集まっています。</p>
      
      <h3>2. 地方中核都市</h3>
      <p>札幌、仙台、広島、福岡などの地方中核都市では、人口集約化が進み、不動産需要の安定化が期待されています。</p>
      
      <h3>3. 物流施設立地</h3>
      <p>Eコマースの成長に伴い、物流施設への投資需要が継続的に高まっています。特に、首都圏近郊の物流拠点エリアは注目度が高いです。</p>
      
      <h2>投資戦略のポイント</h2>
      <p>成功する不動産投資のためには、以下のポイントを押さえることが重要です：</p>
      
      <ul>
        <li><strong>長期的視点</strong>：短期的な価格変動に惑わされず、10年以上の長期投資視点を持つ</li>
        <li><strong>立地の選定</strong>：交通利便性、周辺環境、将来性を総合的に評価</li>
        <li><strong>リスク分散</strong>：用途、地域、投資時期の分散でリスクを軽減</li>
        <li><strong>市場動向の把握</strong>：定期的な市場分析と戦略の見直し</li>
      </ul>
      
      <h2>まとめ</h2>
      <p>2024年の不動産投資市場は変化の年となりそうです。従来の投資手法に加えて、新しい技術や社会変化への対応が求められます。</p>
      <p>弊社では、こうした市場変化を踏まえた投資戦略のご提案や、具体的な物件の運用サポートを行っております。不動産投資に関するご相談は、お気軽にお問い合わせください。</p>
    `,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop&crop=center',
    author: '田中 一郎',
    date: '2024年1月15日',
    readTime: '8分',
    tags: ['市場分析', '投資戦略', 'トレンド'],
    category: 'market'
  };

  // 現在は実装済みの記事が1つのみのため、関連記事は空配列
  const relatedPosts: Array<{id: number, title: string, image: string, date: string}> = [];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? 'いいねを取り消しました' : 'いいねしました');
  };

  const handleSave = () => {
    if (isSaved) {
      // ブックマークを削除
      bookmarkUtils.removeBookmark(postId);
      setIsSaved(false);
      toast.success('ブックマークを削除しました');
    } else {
      // ブックマークに追加
      const bookmarkData = {
        id: postId,
        title: post.title,
        excerpt: post.excerpt,
        image: post.image,
        author: post.author,
        date: post.date,
        readTime: post.readTime,
        tags: post.tags,
        savedAt: new Date().toISOString()
      };
      bookmarkUtils.addBookmark(bookmarkData);
      setIsSaved(true);
      
      // 保存した記事を見るオプションを提供
      const bookmarkCount = bookmarkUtils.getBookmarkCount();
      toast.success(
        `ブックマークに保存しました（${bookmarkCount}件）`,
        {
          action: onNavigateToBookmarks ? {
            label: '保存した記事を見る',
            onClick: onNavigateToBookmarks
          } : undefined
        }
      );
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = post.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
        toast.success('記事を共有しました');
      } catch (error) {
        // ユーザーがキャンセルした場合などのエラーハンドリング
        if (error instanceof Error && error.name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('記事のURLをクリップボードにコピーしました');
    }).catch(() => {
      toast.error('URLのコピーに失敗しました');
    });
  };

  const handleContactClick = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      toast.error('お問い合わせページへの遷移に失敗しました');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={onNavigateBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ブログ一覧に戻る
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                読了時間: {post.readTime}
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b">
              <Button 
                variant={isLiked ? "default" : "outline"} 
                size="sm"
                onClick={handleLike}
                className={isLiked ? "bg-red-500 hover:bg-red-600 text-white border-red-500" : ""}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                いいね ({likeCount})
              </Button>
              <Button 
                variant={isSaved ? "default" : "outline"} 
                size="sm"
                onClick={handleSave}
                className={isSaved ? "bg-blue-500 hover:bg-blue-600 text-white border-blue-500" : ""}
              >
                <BookmarkIcon className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? '保存済み' : '保存'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                シェア
              </Button>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg prose-gray max-w-none [&>h2]:text-2xl [&>h2]:font-heading [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-heading [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-6 [&>p]:leading-8 [&>ul]:mb-6 [&>ul>li]:mb-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Bio */}
            <div className="mt-16 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg mb-2">{post.author}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    株式会社 WisteriaForest シニアアナリスト。不動産投資分析の専門家として、
                    市場動向の分析や投資戦略の立案を担当。業界歴15年の豊富な経験を持つ。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-2xl mb-8">関連記事</h2>
            
            {relatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <div 
                    key={relatedPost.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => onNavigateToPost?.(relatedPost.id.toString())}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {relatedPost.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="font-heading text-xl text-gray-500 mb-2">
                  関連記事を準備中です
                </h3>
                <p className="text-gray-400">
                  より多くの有益な情報をお届けするため、関連記事を作成中です。<br />
                  今後も定期的に更新してまいりますので、ぜひお楽しみにお待ちください。
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">
            不動産投資について相談したい方へ
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            記事の内容について詳しく知りたい方や、具体的な投資相談をご希望の方は、
            お気軽にお問い合わせください。
          </p>
          <Button 
            size="lg" 
            className="bg-cta hover:bg-cta/90 text-white px-8"
            onClick={handleContactClick}
          >
            お問い合わせ
          </Button>
        </div>
      </section>
    </div>
  );
}