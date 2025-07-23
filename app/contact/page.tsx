'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormData, contactFormSchema } from '@/lib/validations';
import { Building, Home, User, Mail, Phone, MessageSquare, Upload, Loader2, Send } from 'lucide-react';

type FormType = 'consultation' | 'management' | 'career';

interface TabProps {
  type: FormType;
  label: string;
  icon: React.ElementType;
  activeTab: FormType;
  onTabChange: (type: FormType) => void;
}

const Tab = ({ type, label, icon: Icon, activeTab, onTabChange }: TabProps) => (
  <button
    type="button"
    onClick={() => onTabChange(type)}
    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
      ${activeTab === type
        ? 'bg-primary text-white shadow'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
  >
    <Icon size={20} />
    {label}
  </button>
);

export default function ContactPage() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('type') as FormType) || 'consultation';
  const [activeTab, setActiveTab] = useState<FormType>(initialTab);
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
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const attachmentFile = watch('attachment');

  useEffect(() => {
    setActiveTab(initialTab);
    reset(); // タブ切り替え時にフォームをリセット
    setFileError(null);
  }, [initialTab, reset]);

  const handleTabChange = (type: FormType) => {
    setActiveTab(type);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setValue('attachment', file);
      setFileError(null);
    } else {
      setValue('attachment', undefined);
      setFileError(null); // Clear error if no file selected
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setFileError(null);

    // ファイル添付のバリデーション (Zodスキーマに加えてここで再チェック)
    const acceptedFileTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (data.attachment) {
      if (!acceptedFileTypes.includes(data.attachment.type)) {
        setFileError('PDF、JPG、PNGファイルのみアップロード可能です');
        setIsSubmitting(false);
        return;
      }
      if (data.attachment.size > maxFileSize) {
        setFileError('ファイルサイズは5MB以下にしてください');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append('type', activeTab);
      formData.append('data', JSON.stringify({ ...data, attachment: undefined })); // ファイルを除いてJSONデータを作成
      if (data.attachment) {
        formData.append('attachment', data.attachment);
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
      console.error('Contact form submission error:', error);
      // トースト通知などをここに実装
      alert(error.message || '送信中にエラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center mb-10">
          お問い合わせ
        </h2>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Tab
              type="consultation"
              label="開業相談"
              icon={Home}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
            <Tab
              type="management"
              label="運営受託"
              icon={Building}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
            <Tab
              type="career"
              label="採用エントリー"
              icon={User}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>

          {/* Form Content */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* 共通フィールド */}
              <div>
                <label htmlFor="name" className="form-label">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input {...register('name')} type="text" id="name" className="form-input" />
                {errors.name && (
                  <p className="form-error">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input {...register('email')} type="email" id="email" className="form-input" />
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="tel" className="form-label">
                  電話番号 (任意)
                </label>
                <input {...register('tel')} type="tel" id="tel" className="form-input" />
                {errors.tel && (
                  <p className="form-error">{errors.tel.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="form-label">
                  会社名 / 団体名 (任意)
                </label>
                <input {...register('company')} type="text" id="company" className="form-input" />
                {errors.company && (
                  <p className="form-error">{errors.company.message}</p>
                )}
              </div>

              {/* タブ固有フィールド */}
              {(activeTab === 'consultation' || activeTab === 'management') && (
                <>
                  <div>
                    <label htmlFor="propertyLocation" className="form-label">
                      物件所在地 (任意)
                    </label>
                    <input {...register('propertyLocation')} type="text" id="propertyLocation" className="form-input" />
                    {errors.propertyLocation && (
                      <p className="form-error">{errors.propertyLocation.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">
                      物件種別 (複数選択可、任意)
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value="villa"
                          {...register('propertyType')}
                          className="form-checkbox"
                        />
                        ヴィラ
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value="condo"
                          {...register('propertyType')}
                          className="form-checkbox"
                        />
                        マンション/コンドミニアム
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value="house"
                          {...register('propertyType')}
                          className="form-checkbox"
                        />
                        一戸建て
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value="other"
                          {...register('propertyType')}
                          className="form-checkbox"
                        />
                        その他
                      </label>
                    </div>
                    {errors.propertyType && (
                      <p className="form-error">{errors.propertyType.message}</p>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'career' && (
                // Note: 採用エントリーは別コンポーネント (CareerForm) で処理。ここでは表示しない。
                // `/careers` ページに直接遷移させるか、ここで`CareerForm`をレンダリングする。
                // 今回はシンプルにするため、ボタンを配置し `/careers` へ促す。
                <div className="text-center py-8">
                  <p className="text-gray-700 mb-4">
                    採用に関するお問い合わせは、採用エントリーフォームをご利用ください。
                  </p>
                  <a
                    href="/careers"
                    className="btn-primary btn-md inline-flex items-center gap-2"
                  >
                    <User size={20} />
                    採用エントリーフォームへ
                  </a>
                </div>
              )}

              {(activeTab === 'consultation' || activeTab === 'management') && (
                <div>
                  <label htmlFor="message" className="form-label">
                    ご相談内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className="form-textarea"
                  />
                  {errors.message && (
                    <p className="form-error">{errors.message.message}</p>
                  )}
                </div>
              )}

              {/* 添付ファイル (任意) */}
              {(activeTab === 'consultation' || activeTab === 'management') && (
                <div>
                  <label htmlFor="attachment" className="form-label">
                    添付ファイル (任意, PDF/JPG/PNG, 5MBまで)
                  </label>
                  <input
                    type="file"
                    id="attachment"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="attachment"
                    className="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary transition-colors"
                  >
                    <Upload size={20} className="mr-2 text-primary" />
                    {attachmentFile && attachmentFile instanceof File ? attachmentFile.name : 'ファイルを選択してください'}
                  </label>
                  {fileError && <p className="form-error">{fileError}</p>}
                  {errors.attachment && (
                    <p className="form-error">{errors.attachment.message}</p>
                  )}
                </div>
              )}

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
                      送信する
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-4">
                ※ご入力いただいた情報は、お問い合わせ内容の確認およびご返信にのみ使用いたします。
              </p>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                お問い合わせを受け付けました
              </h3>
              <p className="text-gray-600">
                お問い合わせいただきありがとうございます。内容を確認の上、担当者よりご連絡いたします。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 