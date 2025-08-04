'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CareerFormData, careerFormSchema } from '@/lib/validations';
import { Upload, Loader2, Send } from 'lucide-react';

export default function CareerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerFormSchema),
  });

  const resumeFile = watch('resume');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setValue('resume', file);
      setFileError(null);
    } else {
      setValue('resume', undefined as any); // Clear file value
      setFileError('履歴書をアップロードしてください');
    }
  };

  const onSubmit = async (data: CareerFormData) => {
    setIsSubmitting(true);
    setFileError(null);

    if (!data.resume) {
      setFileError('履歴書をアップロードしてください');
      setIsSubmitting(false);
      return;
    }

    // Check file type and size before sending
    const acceptedFileTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    if (data.resume && !acceptedFileTypes.includes(data.resume.type)) {
      setFileError('PDF、Word文書のみアップロード可能です');
      setIsSubmitting(false);
      return;
    }

    if (data.resume && data.resume.size > maxFileSize) {
      setFileError('ファイルサイズは10MB以下にしてください');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('type', 'career');
      formData.append('data', JSON.stringify({ ...data, resume: undefined })); // Remove file from JSON data
      if (data.resume) {
        formData.append('resume', data.resume);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'フォーム送信に失敗しました。');
      }

      setIsSubmitted(true);
      reset();
    } catch (error: any) {
      console.error('Career form submission error:', error);
      // トースト通知などをここに実装
      alert(error.message || '送信中にエラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto" id="career-form">
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
        採用エントリーフォーム
      </h3>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="form-label">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="form-input"
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="furigana" className="form-label">
              ふりがな <span className="text-red-500">*</span>
            </label>
            <input
              {...register('furigana')}
              type="text"
              id="furigana"
              className="form-input"
            />
            {errors.furigana && (
              <p className="form-error">{errors.furigana.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="form-input"
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="tel" className="form-label">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('tel')}
              type="tel"
              id="tel"
              className="form-input"
            />
            {errors.tel && (
              <p className="form-error">{errors.tel.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="position" className="form-label">
              希望職種 <span className="text-red-500">*</span>
            </label>
            <select
              {...register('position')}
              id="position"
              className="form-input"
            >
              <option value="">選択してください</option>
              <option value="operations">運営スタッフ</option>
              <option value="marketing">マーケティング</option>
              <option value="development">開発</option>
              <option value="other">その他</option>
            </select>
            {errors.position && (
              <p className="form-error">{errors.position.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="motivation" className="form-label">
              志望動機 <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('motivation')}
              id="motivation"
              rows={5}
              className="form-textarea"
            />
            {errors.motivation && (
              <p className="form-error">{errors.motivation.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="resume" className="form-label">
              履歴書・職務経歴書 (PDF/Word) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="resume"
              className="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary transition-colors"
            >
              <Upload size={20} className="mr-2 text-primary" />
              {resumeFile && resumeFile instanceof File ? resumeFile.name : 'ファイルを選択してください'}
            </label>
            {fileError && <p className="form-error">{fileError}</p>}
            {errors.resume && (
              <p className="form-error">{errors.resume.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary btn-lg inline-flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  送信中...
                </>
              ) : (
                <>
                  <Send size={20} />
                  応募する
                </>
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            ※ご入力いただいた個人情報は、採用活動にのみ使用いたします。
          </p>
        </form>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
            <Send className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            応募を受け付けました
          </h3>
          <p className="text-gray-600">
            ご応募いただきありがとうございます。書類選考の上、担当者よりご連絡いたします。
          </p>
        </div>
      )}
    </div>
  );
} 