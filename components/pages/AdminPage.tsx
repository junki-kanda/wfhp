import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Download, 
  FileText, 
  Briefcase,
  MessageCircle,
  User,
  Building,
  Image as ImageIcon,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from '../ImageUploader';
import { ImageDebugger } from '../test/ImageDebugger';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  tel?: string;
  formType: 'consultation' | 'career' | 'download';
  message?: string;
  submittedAt: string;
  status: string;
  attachments: Array<{
    fieldName: string;
    fileName: string;
    fileSize: number;
    contentType: string;
  }>;
  // Form-specific fields
  propertyLocation?: string;
  propertyType?: string[];
  budget?: string;
  timeline?: string;
  position?: string;
  experience?: string;
  motivation?: string;
  company?: string;
  purpose?: string;
}

interface DetailedSubmission extends ContactSubmission {
  attachments: Array<{
    fieldName: string;
    fileName: string;
    fileSize: number;
    contentType: string;
    downloadUrl?: string;
  }>;
}

export function AdminPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<DetailedSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const loadSubmissions = async () => {
    try {
      setIsLoading(true);
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-99d1dd43/contact/submissions`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissions(result.submissions);
      } else {
        toast.error('お問い合わせデータの取得に失敗しました');
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
      toast.error('データの読み込み中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSubmissionDetail = async (submissionId: string) => {
    try {
      setIsLoadingDetail(true);
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-99d1dd43/contact/submission/${submissionId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSelectedSubmission(result.submission);
      } else {
        toast.error('詳細データの取得に失敗しました');
      }
    } catch (error) {
      console.error('Error loading submission detail:', error);
      toast.error('詳細データの読み込み中にエラーが発生しました');
    } finally {
      setIsLoadingDetail(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const getFormTypeLabel = (type: string) => {
    switch (type) {
      case 'consultation': return '事業相談';
      case 'career': return '採用エントリー';
      case 'download': return '資料ダウンロード';
      default: return type;
    }
  };

  const getFormTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return MessageCircle;
      case 'career': return Briefcase;
      case 'download': return Download;
      default: return FileText;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">データを読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">管理パネル</h1>
        <p className="text-muted-foreground">
          お問い合わせの管理や画像のアップロードができます
        </p>
      </div>

      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            お問い合わせ管理
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            画像管理
          </TabsTrigger>
          <TabsTrigger value="debug" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            デバッグ
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="contacts" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 一覧表示 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">お問い合わせ一覧</h2>
                <Button onClick={loadSubmissions} variant="outline" size="sm">
                  更新
                </Button>
              </div>

              {submissions.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">お問い合わせがありません</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {submissions.map((submission) => {
                    const Icon = getFormTypeIcon(submission.formType);
                    return (
                      <Card 
                        key={submission.id} 
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedSubmission?.id === submission.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => loadSubmissionDetail(submission.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Icon className="w-4 h-4 text-primary" />
                              <Badge variant="secondary">
                                {getFormTypeLabel(submission.formType)}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(submission.submittedAt)}
                            </span>
                          </div>
                          
                          <h3 className="font-medium mb-1">{submission.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{submission.email}</p>
                          
                          {submission.message && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {submission.message}
                            </p>
                          )}
                          
                          {submission.attachments.length > 0 && (
                            <div className="flex items-center space-x-1 mt-2">
                              <FileText className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                添付ファイル {submission.attachments.length}件
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 詳細表示 */}
            <div>
              <h2 className="text-xl font-semibold mb-4">詳細情報</h2>
              
              {!selectedSubmission ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      左側のお問い合わせを選択してください
                    </p>
                  </CardContent>
                </Card>
              ) : isLoadingDetail ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">詳細を読み込み中...</p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        {(() => {
                          const Icon = getFormTypeIcon(selectedSubmission.formType);
                          return <Icon className="w-5 h-5 text-primary" />;
                        })()}
                        <span>{getFormTypeLabel(selectedSubmission.formType)}</span>
                      </CardTitle>
                      <Badge variant="outline">
                        {formatDate(selectedSubmission.submittedAt)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* 基本情報 */}
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        基本情報
                      </h4>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div><strong>氏名:</strong> {selectedSubmission.name}</div>
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          <strong>メール:</strong> 
                          <a href={`mailto:${selectedSubmission.email}`} className="ml-2 text-primary hover:underline">
                            {selectedSubmission.email}
                          </a>
                        </div>
                        {selectedSubmission.tel && (
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            <strong>電話:</strong> 
                            <a href={`tel:${selectedSubmission.tel}`} className="ml-2 text-primary hover:underline">
                              {selectedSubmission.tel}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* フォーム固有の情報 */}
                    {selectedSubmission.formType === 'consultation' && (
                      <div>
                        <h4 className="font-medium mb-2">相談内容</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          {selectedSubmission.propertyLocation && (
                            <div className="flex items-start">
                              <MapPin className="w-3 h-3 mr-1 mt-0.5" />
                              <div><strong>物件所在地:</strong> {selectedSubmission.propertyLocation}</div>
                            </div>
                          )}
                          {selectedSubmission.propertyType && selectedSubmission.propertyType.length > 0 && (
                            <div>
                              <strong>物件種別:</strong> {selectedSubmission.propertyType.join(', ')}
                            </div>
                          )}
                          {selectedSubmission.budget && (
                            <div><strong>予算:</strong> {selectedSubmission.budget}</div>
                          )}
                          {selectedSubmission.timeline && (
                            <div><strong>希望時期:</strong> {selectedSubmission.timeline}</div>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedSubmission.formType === 'career' && (
                      <div>
                        <h4 className="font-medium mb-2">応募情報</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div><strong>希望職種:</strong> {selectedSubmission.position}</div>
                          {selectedSubmission.experience && (
                            <div><strong>経験:</strong> {selectedSubmission.experience}</div>
                          )}
                          {selectedSubmission.motivation && (
                            <div>
                              <strong>志望動機:</strong>
                              <p className="mt-1 p-2 bg-muted rounded text-xs whitespace-pre-wrap">
                                {selectedSubmission.motivation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedSubmission.formType === 'download' && (
                      <div>
                        <h4 className="font-medium mb-2">ダウンロード情報</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          {selectedSubmission.company && (
                            <div className="flex items-center">
                              <Building className="w-3 h-3 mr-1" />
                              <strong>会社名:</strong> {selectedSubmission.company}
                            </div>
                          )}
                          {selectedSubmission.position && (
                            <div><strong>役職:</strong> {selectedSubmission.position}</div>
                          )}
                          {selectedSubmission.purpose && (
                            <div>
                              <strong>利用目的:</strong>
                              <p className="mt-1 p-2 bg-muted rounded text-xs">
                                {selectedSubmission.purpose}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* メッセージ */}
                    {selectedSubmission.message && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium mb-2">メッセージ</h4>
                          <div className="p-3 bg-muted rounded text-sm whitespace-pre-wrap">
                            {selectedSubmission.message}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 添付ファイル */}
                    {selectedSubmission.attachments.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            添付ファイル
                          </h4>
                          <div className="space-y-2">
                            {selectedSubmission.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center justify-between p-2 border rounded">
                                <div className="flex items-center space-x-2">
                                  <FileText className="w-4 h-4 text-muted-foreground" />
                                  <div>
                                    <div className="text-sm font-medium">{attachment.fileName}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {formatFileSize(attachment.fileSize)} • {attachment.contentType}
                                    </div>
                                  </div>
                                </div>
                                {attachment.downloadUrl && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(attachment.downloadUrl, '_blank')}
                                  >
                                    <Download className="w-3 h-3 mr-1" />
                                    ダウンロード
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="mt-6">
          <div className="max-w-4xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">画像管理</h2>
              <p className="text-muted-foreground">
                ウェブサイトで使用する画像をSupabaseストレージにアップロード・管理できます
              </p>
            </div>
            
            <ImageUploader
              onUploadSuccess={(result) => {
                if (result.success) {
                  toast.success('画像がアップロードされました！');
                } else {
                  toast.error('画像のアップロードに失敗しました');
                }
              }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="debug" className="mt-6">
          <div className="max-w-6xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">デバッグツール</h2>
              <p className="text-muted-foreground">
                画像の表示問題やSupabaseストレージの状態を確認できます
              </p>
            </div>
            
            <ImageDebugger />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}