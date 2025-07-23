'use client';

import { useState } from 'react';
import { Download, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { downloadFormSchema, DownloadFormData } from '@/lib/validations';

export default function CTASection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DownloadFormData>({
    resolver: zodResolver(downloadFormSchema),
  });

  const onSubmit = async (data: DownloadFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: API実装
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      reset();
      // 資料ダウンロードリンクを表示またはメール送信
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              軽井沢バケーションレンタル運営ガイド
            </h2>
            <p className="text-lg opacity-90">
              収益シミュレーションから運営ノウハウまで、
              成功の秘訣をまとめた資料を無料でプレゼント
            </p>
          </div>

          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/10 backdrop-blur-md rounded-lg p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="form-label text-white">
                    お名前
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="form-input bg-white/90 text-gray-900"
                    placeholder="山田 太郎"
                  />
                  {errors.name && (
                    <p className="form-error text-yellow-300">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="form-label text-white">
                    メールアドレス
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="form-input bg-white/90 text-gray-900"
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="form-error text-yellow-300">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="form-label text-white">
                    会社名
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    id="company"
                    className="form-input bg-white/90 text-gray-900"
                    placeholder="株式会社〇〇"
                  />
                  {errors.company && (
                    <p className="form-error text-yellow-300">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="tel" className="form-label text-white">
                    電話番号（任意）
                  </label>
                  <input
                    {...register('tel')}
                    type="tel"
                    id="tel"
                    className="form-input bg-white/90 text-gray-900"
                    placeholder="0312345678"
                  />
                  {errors.tel && (
                    <p className="form-error text-yellow-300">
                      {errors.tel.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-cta btn-lg inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      送信中...
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      資料をダウンロード
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-white/80 mt-4">
                ※ご入力いただいた情報は、資料送付および弊社サービスのご案内にのみ使用いたします
              </p>
            </form>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                資料送付の手続きが完了しました
              </h3>
              <p className="text-lg opacity-90">
                ご登録いただいたメールアドレスに資料をお送りしました。
                ご確認ください。
              </p>
            </div>
          )}

          {/* Alternative CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">開業相談</h3>
              <p className="text-sm opacity-90 mb-4">
                新規開業をご検討の方へ
              </p>
              <a
                href="/contact?type=consultation"
                className="btn-outline btn-sm text-white border-white hover:bg-white hover:text-primary"
              >
                相談する
              </a>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">運営受託</h3>
              <p className="text-sm opacity-90 mb-4">
                既存物件の運営をお任せ
              </p>
              <a
                href="/contact?type=management"
                className="btn-outline btn-sm text-white border-white hover:bg-white hover:text-primary"
              >
                問い合わせる
              </a>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">採用情報</h3>
              <p className="text-sm opacity-90 mb-4">
                一緒に働く仲間を募集中
              </p>
              <a
                href="/careers"
                className="btn-outline btn-sm text-white border-white hover:bg-white hover:text-primary"
              >
                採用情報を見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
