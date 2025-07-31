export interface BookmarkedArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  savedAt: string;
}

const BOOKMARKS_KEY = 'wisteria-forest-bookmarks';

export const bookmarkUtils = {
  // ブックマークを追加
  addBookmark: (article: BookmarkedArticle): void => {
    try {
      const bookmarks = bookmarkUtils.getBookmarks();
      const updatedBookmarks = [...bookmarks, article];
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Failed to save bookmark:', error);
    }
  },

  // ブックマークを削除
  removeBookmark: (articleId: string): void => {
    try {
      const bookmarks = bookmarkUtils.getBookmarks();
      const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== articleId);
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filteredBookmarks));
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
    }
  },

  // 全ブックマークを取得
  getBookmarks: (): BookmarkedArticle[] => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get bookmarks:', error);
      return [];
    }
  },

  // 記事がブックマーク済みかチェック
  isBookmarked: (articleId: string): boolean => {
    try {
      const bookmarks = bookmarkUtils.getBookmarks();
      return bookmarks.some(bookmark => bookmark.id === articleId);
    } catch (error) {
      console.error('Failed to check bookmark status:', error);
      return false;
    }
  },

  // ブックマーク数を取得
  getBookmarkCount: (): number => {
    return bookmarkUtils.getBookmarks().length;
  },

  // ブックマークをクリア（開発・テスト用）
  clearBookmarks: (): void => {
    try {
      localStorage.removeItem(BOOKMARKS_KEY);
    } catch (error) {
      console.error('Failed to clear bookmarks:', error);
    }
  }
};