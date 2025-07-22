import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS クラスをマージするユーティリティ関数
 * @param inputs - クラス名の配列
 * @returns マージされたクラス名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 日付をフォーマットする関数
 * @param date - フォーマットする日付
 * @param locale - ロケール（デフォルト: ja-JP）
 * @returns フォーマットされた日付文字列
 */
export function formatDate(date: string | Date, locale = 'ja-JP'): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

/**
 * 読了時間を計算する関数
 * @param text - テキスト
 * @param wordsPerMinute - 1分あたりの読む文字数（日本語デフォルト: 400）
 * @returns 読了時間（分）
 */
export function calculateReadingTime(text: string, wordsPerMinute = 400): number {
  const wordCount = text.length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

/**
 * スクロール位置をスムーズに移動する関数
 * @param elementId - スクロール先の要素ID
 * @param offset - オフセット（ヘッダーの高さなど）
 */
export function scrollToElement(elementId: string, offset = 80): void {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/**
 * ファイルサイズをフォーマットする関数
 * @param bytes - バイト数
 * @returns フォーマットされたファイルサイズ
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * メールアドレスのバリデーション
 * @param email - メールアドレス
 * @returns 有効なメールアドレスかどうか
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 電話番号のバリデーション（日本）
 * @param tel - 電話番号
 * @returns 有効な電話番号かどうか
 */
export function isValidPhoneNumber(tel: string): boolean {
  const telRegex = /^0\d{9,10}$/;
  const cleanedTel = tel.replace(/[-\s]/g, '');
  return telRegex.test(cleanedTel);
}

/**
 * 数値をカンマ区切りでフォーマットする関数
 * @param num - 数値
 * @returns フォーマットされた数値文字列
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ja-JP').format(num);
}

/**
 * パーセンテージを計算する関数
 * @param value - 値
 * @param total - 合計
 * @param decimals - 小数点以下の桁数
 * @returns パーセンテージ
 */
export function calculatePercentage(value: number, total: number, decimals = 1): number {
  if (total === 0) return 0;
  return Number(((value / total) * 100).toFixed(decimals));
}

/**
 * デバウンス関数
 * @param func - 実行する関数
 * @param wait - 待機時間（ミリ秒）
 * @returns デバウンスされた関数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * スロットル関数
 * @param func - 実行する関数
 * @param limit - 制限時間（ミリ秒）
 * @returns スロットルされた関数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Strapi画像URLを取得する関数
 * @param image - Strapi画像オブジェクト
 * @param format - 画像フォーマット
 * @returns 画像URL
 */
export function getStrapiImageUrl(
  image: any,
  format: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'original'
): string {
  if (!image?.data?.attributes) return '/placeholder.jpg';

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const { attributes } = image.data;

  if (format === 'original') {
    return `${baseUrl}${attributes.url}`;
  }

  const formatData = attributes.formats?.[format];
  if (formatData) {
    return `${baseUrl}${formatData.url}`;
  }

  return `${baseUrl}${attributes.url}`;
}
