import { useState, useEffect } from 'react';
import { Calendar, User, Clock, ArrowLeft, Trash2, BookmarkIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { bookmarkUtils, BookmarkedArticle } from '../../utils/bookmarks';
import { toast } from 'sonner';

interface BookmarksPageProps {
  onNavigateBack: () => void;
  onNavigateToPost: (postId: string) => void;
}

export function BookmarksPage({ onNavigateBack, onNavigateToPost }: BookmarksPageProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);

  useEffect(() => {
    setBookmarks(bookmarkUtils.getBookmarks());
  }, []);

  const handleRemoveBookmark = (articleId: string) => {
    bookmarkUtils.removeBookmark(articleId);
    setBookmarks(bookmarkUtils.getBookmarks());
    toast.success('ブックマークを削除しました');
  };

  const handleClearAll = () => {
    if (window.confirm('すべてのブックマークを削除しますか？この操作は取り消せません。')) {
      bookmarkUtils.clearBookmarks();
      setBookmarks([]);
      toast.success('すべてのブックマークを削除しました');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={onNavigateBack}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              ブログ一覧に戻る
            </Button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl mb-2">
                  保存した記事
                </h1>
                <p className="text-gray-600">
                  あとで読みたい記事をここで管理できます
                </p>
              </div>
              
              {bookmarks.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handleClearAll}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  すべて削除
                </Button>
              )}
            </div>
          </div>

          {/* Bookmarks List */}
          {bookmarks.length === 0 ? (
            <div className="text-center py-16">
              <BookmarkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="font-heading text-xl text-gray-500 mb-2">
                保存した記事がありません
              </h2>
              <p className="text-gray-400 mb-6">
                記事の保存ボタンを押すと、ここに表示されます。<br />
                気になる記事を保存して、後からゆっくりお読みください。
              </p>
              <Button 
                onClick={onNavigateBack}
                className="bg-primary hover:bg-primary/90"
              >
                ブログ一覧を見る
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <p className="text-gray-600">
                  {bookmarks.length}件の記事を保存中
                </p>
                <p className="text-sm text-gray-400">
                  ※ブックマークはこのブラウザにのみ保存されます
                </p>
              </div>

              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="relative h-48 md:h-full">
                        <ImageWithFallback
                          src={bookmark.image}
                          alt={bookmark.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {bookmark.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 
                        className="font-heading text-xl font-semibold mb-3 cursor-pointer hover:text-primary transition-colors line-clamp-2"
                        onClick={() => onNavigateToPost(bookmark.id)}
                      >
                        {bookmark.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {bookmark.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {bookmark.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {bookmark.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {bookmark.readTime}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            {new Date(bookmark.savedAt).toLocaleDateString('ja-JP')}に保存
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveBookmark(bookmark.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button
                          onClick={() => onNavigateToPost(bookmark.id)}
                          className="w-full md:w-auto"
                        >
                          記事を読む
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}