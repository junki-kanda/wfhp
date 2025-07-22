import { z } from 'zod';

/**
 * 共通のバリデーションルール
 */
const nameSchema = z
  .string()
  .min(1, '名前を入力してください')
  .max(100, '名前は100文字以内で入力してください');

const emailSchema = z
  .string()
  .min(1, 'メールアドレスを入力してください')
  .email('有効なメールアドレスを入力してください');

const telSchema = z
  .string()
  .regex(
    /^0\d{9,10}$/,
    '電話番号は市外局番から入力してください（例：0312345678）'
  )
  .optional()
  .or(z.literal(''));

const messageSchema = z
  .string()
  .min(1, 'メッセージを入力してください')
  .max(500, 'メッセージは500文字以内で入力してください');

/**
 * 問い合わせフォームのバリデーションスキーマ
 */
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  tel: telSchema,
  company: z.string().optional(),
  message: messageSchema,
  propertyLocation: z.string().optional(),
  propertyType: z.array(z.string()).optional(),
  attachment: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'ファイルサイズは5MB以下にしてください'
    )
    .refine(
      (file) =>
        !file ||
        ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(
          file.type
        ),
      'PDF、JPG、PNGファイルのみアップロード可能です'
    ),
});

/**
 * 採用エントリーフォームのバリデーションスキーマ
 */
export const careerFormSchema = z.object({
  name: nameSchema,
  furigana: z
    .string()
    .min(1, 'ふりがなを入力してください')
    .regex(
      /^[\u3040-\u309F\u30A0-\u30FF\s]+$/,
      'ふりがなはひらがな・カタカナで入力してください'
    ),
  email: emailSchema,
  tel: z
    .string()
    .min(1, '電話番号を入力してください')
    .regex(
      /^0\d{9,10}$/,
      '電話番号は市外局番から入力してください（例：0312345678）'
    ),
  position: z.string().min(1, '希望職種を選択してください'),
  motivation: z
    .string()
    .min(1, '志望動機を入力してください')
    .max(1000, '志望動機は1000文字以内で入力してください'),
  resume: z
    .instanceof(File)
    .refine((file) => file.size > 0, '履歴書をアップロードしてください')
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      'ファイルサイズは10MB以下にしてください'
    )
    .refine(
      (file) =>
        [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(file.type),
      'PDF、Word文書のみアップロード可能です'
    ),
});

/**
 * ニュースレター登録のバリデーションスキーマ
 */
export const newsletterSchema = z.object({
  email: emailSchema,
});

/**
 * 資料ダウンロードフォームのバリデーションスキーマ
 */
export const downloadFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  company: z.string().min(1, '会社名を入力してください'),
  tel: telSchema,
});

// 型定義のエクスポート
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CareerFormData = z.infer<typeof careerFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type DownloadFormData = z.infer<typeof downloadFormSchema>;
