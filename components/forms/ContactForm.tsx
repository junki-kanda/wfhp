import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner';
import { Send, Upload, Phone, Mail, MessageCircle, Download } from 'lucide-react';

// Base schema
const baseContactSchema = z.object({
  name: z.string().min(1, '氏名は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  tel: z.string().optional(),
  message: z.string().min(1, 'お問い合わせ内容は必須です').max(500, '500文字以内で入力してください'),
  attachment: z.any().optional(),
  privacy: z.boolean().refine(val => val === true, 'プライバシーポリシーに同意してください')
});

// Extended schemas for different form types
const consultationSchema = baseContactSchema.extend({
  propertyLocation: z.string().optional(),
  propertyType: z.array(z.string()).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional()
});

const managementSchema = baseContactSchema.extend({
  propertyLocation: z.string().min(1, '物件所在地は必須です'),
  propertyType: z.array(z.string()).min(1, '物件種別を選択してください'),
  currentIssues: z.array(z.string()).optional(),
  managementType: z.string().min(1, '管理形態を選択してください')
});

const careerSchema = z.object({
  name: z.string().min(1, '氏名は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  tel: z.string().optional(),
  position: z.string().min(1, '希望職種を選択してください'),
  resume: z.any().refine(val => val && val.length > 0, '履歴書のアップロードは必須です'),
  experience: z.string().optional(),
  motivation: z.string().min(1, '志望動機は必須です').max(300, '300文字以内で入力してください'),
  message: z.string().optional().nullable(),
  attachment: z.any().optional(),
  privacy: z.boolean().refine(val => val === true, 'プライバシーポリシーに同意してください')
});

const downloadSchema = z.object({
  name: z.string().min(1, '氏���は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  company: z.string().optional(),
  position: z.string().optional(),
  purpose: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, 'プライバシーポリシーに同意してください')
});

type FormType = 'consultation' | 'career' | 'download';

interface ContactFormProps {
  type?: FormType;
  defaultTab?: FormType;
  setCurrentPage?: (page: string) => void;
}

export function ContactForm({ type = 'consultation', defaultTab, setCurrentPage }: ContactFormProps) {
  const [formType, setFormType] = useState<FormType>(defaultTab || type);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // defaultTabが変更されたときにformTypeを更新
  useEffect(() => {
    if (defaultTab && defaultTab !== formType) {
      setFormType(defaultTab);
    }
  }, [defaultTab]);

  const getSchema = (currentFormType: FormType) => {
    switch (currentFormType) {
      case 'consultation':
        return consultationSchema;
      case 'career':
        return careerSchema;
      case 'download':
        return downloadSchema;
      default:
        return baseContactSchema;
    }
  };

  const getDefaultValues = (currentFormType: FormType) => {
    const baseValues = {
      name: '',
      email: '',
      tel: '',
      privacy: false,
    };

    switch (currentFormType) {
      case 'consultation':
        return {
          ...baseValues,
          message: '',
          propertyLocation: '',
          propertyType: []
        };
      case 'career':
        return {
          ...baseValues,
          message: '',
          position: '',
          experience: '',
          motivation: ''
        };
      case 'download':
        return {
          ...baseValues,
          company: '',
          position: '',
          purpose: ''
        };
      default:
        return {
          ...baseValues,
          message: ''
        };
    }
  };

  const form = useForm({
    resolver: zodResolver(getSchema(formType)),
    defaultValues: getDefaultValues(formType),
    mode: 'onChange'
  });

  // formTypeが変更されたときにフォームを完全にリセット
  useEffect(() => {
    const newDefaultValues = getDefaultValues(formType);
    
    // フォームをリセットして新しいスキーマを適用
    form.reset(newDefaultValues);
    
    // エラーをクリア
    form.clearErrors();
  }, [formType]);

  const propertyTypes = [
    'マンション', 'アパート', 'オフィスビル', '商業施設', 
    '戸建て', '土地', 'その他'
  ];

  const positions = [
    '別荘管理スタッフ', '別荘清掃スタッフ', 'その他'
  ];

  const resourceTypes = [
    'サービス紹介資料（総合版）',
    '不動産コンサルティング・仲介サービス資料',
    '宿泊施設開発・運営サービス資料',
    '不動産向けAI開発サービス資料',
    '導入事例集',
    '料金表',
    '会社案内'
  ];

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // デバッグ用：送信前のフォームデータを確認
      console.log('Form data before validation:', data);
      console.log('Privacy field value:', data.privacy);
      console.log('Privacy field type:', typeof data.privacy);
      
      // 現在のフォームタイプに応じたスキーマでバリデーション
      const currentSchema = getSchema(formType);
      const validatedData = await currentSchema.parseAsync(data);
      
      // FormDataを作成してファイルアップロードに対応
      const formData = new FormData();
      
      // 基本フィールドを追加
      formData.append('name', validatedData.name);
      formData.append('email', validatedData.email);
      formData.append('formType', formType);
      
      if (validatedData.tel) {
        formData.append('tel', validatedData.tel);
      }
      
      if (validatedData.message) {
        formData.append('message', validatedData.message);
      }

      // フォームタイプ固有のフィールドを追加
      if (formType === 'consultation') {
        if (validatedData.propertyLocation) {
          formData.append('propertyLocation', validatedData.propertyLocation);
        }
        if (validatedData.propertyType && validatedData.propertyType.length > 0) {
          validatedData.propertyType.forEach((type: string) => {
            formData.append('propertyType[]', type);
          });
        }
        if (validatedData.budget) {
          formData.append('budget', validatedData.budget);
        }
        if (validatedData.timeline) {
          formData.append('timeline', validatedData.timeline);
        }
      } else if (formType === 'career') {
        formData.append('position', validatedData.position);
        if (validatedData.experience) {
          formData.append('experience', validatedData.experience);
        }
        formData.append('motivation', validatedData.motivation);
        
        // 履歴書ファイルを追加
        if (validatedData.resume && validatedData.resume.length > 0) {
          formData.append('resume', validatedData.resume[0]);
        }
      } else if (formType === 'download') {
        if (validatedData.company) {
          formData.append('company', validatedData.company);
        }
        if (validatedData.position) {
          formData.append('position', validatedData.position);
        }
        if (validatedData.purpose) {
          formData.append('purpose', validatedData.purpose);
        }
      }

      // 添付ファイルを追加（採用フォーム以外）
      if (formType !== 'career' && formType !== 'download' && validatedData.attachment && validatedData.attachment.length > 0) {
        formData.append('attachment', validatedData.attachment[0]);
      }

      // APIエンドポイントにデータを送信
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-99d1dd43/contact`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: formData
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'サーバーエラーが発生しました');
      }

      // 成功メッセージを表示
      if (formType === 'download') {
        toast.success('資料ダウンロードのリクエストを受け付けました。ご指定のメールアドレスに資料をお送りいたします。');
      } else {
        toast.success('お問い合わせを送信しました。1営業日以内にご返信いたします。');
      }
      
      // フォームをリセット
      const defaultValues = getDefaultValues(formType);
      form.reset(defaultValues);
      
      // プライバシーポリシーのチェックボックスを明示的にリセット
      form.setValue('privacy', false);
      
      console.log('Form submitted successfully:', result);
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      if (error instanceof z.ZodError) {
        // バリデーションエラーの場合
        toast.error('入力内容に不備があります。赤字の項目をご確認ください。');
      } else {
        // APIエラーやその他のエラー
        const errorMessage = error instanceof Error ? error.message : '送信に失敗しました。しばらく時間をおいて再度お試しください。';
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabsConfig = [
    {
      value: 'consultation',
      label: '事業に関するご相談',
      icon: MessageCircle,
      description: '事業・サービスに関するご相談'
    },
    {
      value: 'download',
      label: '資料ダウンロード',
      icon: Download,
      description: 'サービス資料のダウンロード'
    },
    {
      value: 'career',
      label: '採用エントリー',
      icon: Phone,
      description: '採用・求人に関するお問い合わせ'
    }
  ];

  const handleTabChange = (value: string) => {
    const newFormType = value as FormType;
    setFormType(newFormType);
    
    // フォームの状態をクリア
    form.clearErrors();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={formType} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value} 
                className="flex items-center space-x-2"
                data-value={tab.value}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabsConfig.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <tab.icon className="w-5 h-5 text-primary" />
                  <span>{tab.label}</span>
                </CardTitle>
                <CardDescription>{tab.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">氏名 *</Label>
                      <Input
                        id="name"
                        {...form.register('name')}
                        className="mt-1"
                        placeholder="山田 太郎"
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">メールアドレス *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register('email')}
                        className="mt-1"
                        placeholder="example@email.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Download form specific fields */}
                  {formType === 'download' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company">会社名・組織名</Label>
                          <Input
                            id="company"
                            {...form.register('company')}
                            className="mt-1"
                            placeholder="株式会社○○"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="position">ご担当者様の役職</Label>
                          <Input
                            id="position"
                            {...form.register('position')}
                            className="mt-1"
                            placeholder="部長、課長、担当者 など"
                          />
                        </div>
                      </div>



                      <div>
                        <Label htmlFor="purpose">資料の利用目的</Label>
                        <Textarea
                          id="purpose"
                          {...form.register('purpose')}
                          className="mt-1"
                          rows={3}
                          placeholder="検討中のプロジェクトについて、社内検討資料として など（任意）"
                        />
                      </div>
                    </>
                  )}

                  {/* Phone field for non-download forms */}
                  {formType !== 'download' && (
                    <div>
                      <Label htmlFor="tel">電話番号</Label>
                      <Input
                        id="tel"
                        type="tel"
                        {...form.register('tel')}
                        className="mt-1"
                        placeholder="0267-46-9811"
                      />
                    </div>
                  )}

                  {/* Form-specific fields */}
                  {formType === 'consultation' && (
                    <>
                      <div>
                        <Label htmlFor="propertyLocation">物件所在地</Label>
                        <Input
                          id="propertyLocation"
                          {...form.register('propertyLocation')}
                          className="mt-1"
                          placeholder="長野県北佐久郡軽井沢町大字長倉4588-49（任意）"
                        />
                        {form.formState.errors.propertyLocation && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.propertyLocation.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>物件種別 (複数選択可)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {propertyTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={type}
                                checked={form.watch('propertyType')?.includes(type) || false}
                                onCheckedChange={(checked) => {
                                  const currentValues = form.getValues('propertyType') || [];
                                  if (checked) {
                                    form.setValue('propertyType', [...currentValues, type]);
                                  } else {
                                    form.setValue('propertyType', currentValues.filter(v => v !== type));
                                  }
                                }}
                              />
                              <Label htmlFor={type} className="text-sm">{type}</Label>
                            </div>
                          ))}
                        </div>
                        {form.formState.errors.propertyType && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.propertyType.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {formType === 'career' && (
                    <>
                      <div>
                        <Label htmlFor="position">希望職種 *</Label>
                        <Select 
                          value={form.watch('position')} 
                          onValueChange={(value) => form.setValue('position', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="希望職種を選択してください" />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map((position) => (
                              <SelectItem key={position} value={position}>
                                {position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.position && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.position.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="resume">履歴書 * (PDF形式、最大5MB)</Label>
                        <Input
                          id="resume"
                          type="file"
                          accept=".pdf"
                          {...form.register('resume')}
                          className="mt-1"
                        />
                        {form.formState.errors.resume && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.resume.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="motivation">志望動機 *</Label>
                        <Textarea
                          id="motivation"
                          {...form.register('motivation')}
                          className="mt-1"
                          rows={4}
                          placeholder="志望動機をお聞かせください（300文字以内）"
                        />
                        {form.formState.errors.motivation && (
                          <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.motivation.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Message */}
                  {formType !== 'download' && (
                    <div>
                      <Label htmlFor="message">
                        {formType === 'career' ? 'その他・補足事項' : 'お問い合わせ内容 *'}
                      </Label>
                      <Textarea
                        id="message"
                        {...form.register('message')}
                        className="mt-1"
                        rows={4}
                        placeholder={
                          formType === 'career' 
                            ? '経験や資格、その他アピールポイントがございましたらご記入ください'
                            : 'お問い合わせ内容を詳しくお聞かせください（500文字以内）'
                        }
                      />
                      {form.formState.errors.message && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.message.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* File Upload */}
                  {formType !== 'career' && formType !== 'download' && (
                    <div>
                      <Label htmlFor="attachment">添付ファイル (PDF/JPG、最大5MB)</Label>
                      <Input
                        id="attachment"
                        type="file"
                        accept=".pdf,.jpg,.jpeg"
                        {...form.register('attachment')}
                        className="mt-1"
                      />
                    </div>
                  )}

                  {/* Privacy Checkbox */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      name="privacy"
                      checked={form.watch('privacy') || false}
                      onCheckedChange={(checked) => {
                        form.setValue('privacy', checked === true);
                        // 即座にバリデーションを実行
                        form.trigger('privacy');
                      }}
                      className="mt-1"
                    />
                    <Label htmlFor="privacy" className="text-sm leading-relaxed">
                      <button 
                        type="button"
                        onClick={() => setCurrentPage?.('privacy')}
                        className="text-primary underline hover:text-primary/80 transition-colors"
                      >
                        プライバシーポリシー
                      </button>
                      に同意します *
                    </Label>
                  </div>
                  {form.formState.errors.privacy && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.privacy.message}
                    </p>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-cta hover:bg-cta/90 text-white"
                  >
                    {isSubmitting ? (
                      <>送信中...</>
                    ) : (
                      <>
                        {formType === 'download' ? (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            資料をダウンロード
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            送信する
                          </>
                        )}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}