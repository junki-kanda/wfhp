import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください'),
  type: z.enum(['consultation', 'download', 'career']),
});

export const careerFormSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  resume: z.any().optional(),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CareerFormData = z.infer<typeof careerFormSchema>;