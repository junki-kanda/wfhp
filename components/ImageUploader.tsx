import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Upload, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react';
import { uploadImage, getCategoryImages } from '../utils/supabase/storage';

interface ImageUploaderProps {
  onUploadSuccess?: (result: {success: boolean, publicUrl?: string, fileName?: string}) => void;
}

export function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{success: boolean, message: string} | null>(null);
  const [existingImages, setExistingImages] = useState<Array<{name: string, publicUrl: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'services', label: 'サービス画像' },
    { value: 'hero', label: 'ヒーロー画像' },
    { value: 'villas', label: 'ヴィラ画像' },
    { value: 'gallery', label: 'ギャラリー画像' },
    { value: 'cases', label: '事例画像' },
    { value: 'team', label: 'チーム画像' },
    { value: 'general', label: 'その他' },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadResult({ success: false, message: '画像ファイルを選択してください' });
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setUploadResult({ success: false, message: 'ファイルサイズは5MB以下にしてください' });
        return;
      }
      
      setSelectedFile(file);
      setUploadResult(null);
    }
  };

  const handleCategoryChange = async (newCategory: string) => {
    setCategory(newCategory);
    if (newCategory) {
      try {
        const images = await getCategoryImages(newCategory);
        setExistingImages(images);
      } catch (error) {
        console.warn('Failed to load existing images:', error);
        setExistingImages([]);
      }
    } else {
      setExistingImages([]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !category || !imageName) {
      setUploadResult({ 
        success: false, 
        message: 'ファイル、カテゴリ、画像名を全て入力してください' 
      });
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadImage(selectedFile, category, imageName);
      setUploadResult({
        success: result.success,
        message: result.success ? 
          '画像がアップロードされました！' : 
          result.error || 'アップロードに失敗しました'
      });

      if (result.success) {
        // Reset form
        setSelectedFile(null);
        setImageName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Refresh existing images list
        if (category) {
          const images = await getCategoryImages(category);
          setExistingImages(images);
        }

        // Notify parent component
        if (onUploadSuccess) {
          onUploadSuccess(result);
        }
      }
    } catch (error) {
      setUploadResult({ 
        success: false, 
        message: 'アップロード中にエラーが発生しました' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            画像アップロード
          </CardTitle>
          <CardDescription>
            Supabaseストレージに画像をアップロードします。アップロードした画像はウェブサイトで使用できます。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">カテゴリ</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Name */}
          <div className="space-y-2">
            <Label htmlFor="imageName">画像名</Label>
            <Input
              id="imageName"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder="例: accommodation-operation"
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              英数字、ハイフン、アンダースコアのみ使用可能です。拡張子は自動で付与されます。
            </p>
          </div>

          {/* File Selection */}
          <div className="space-y-2">
            <Label htmlFor="file">画像ファイル</Label>
            <Input
              ref={fileInputRef}
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full"
            />
            {selectedFile && (
              <p className="text-sm text-gray-600">
                選択されたファイル: {selectedFile.name} ({Math.round(selectedFile.size / 1024)}KB)
              </p>
            )}
          </div>

          {/* Upload Button */}
          <Button 
            onClick={handleUpload}
            disabled={!selectedFile || !category || !imageName || isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                アップロード中...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                アップロード
              </>
            )}
          </Button>

          {/* Upload Result */}
          {uploadResult && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              uploadResult.success 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {uploadResult.success ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              <span className="text-sm">{uploadResult.message}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Existing Images in Category */}
      {category && existingImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              {categories.find(c => c.value === category)?.label}の既存画像
            </CardTitle>
            <CardDescription>
              このカテゴリにある既存の画像一覧です。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {existingImages.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image.publicUrl}
                      alt={image.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-gray-600 truncate" title={image.name}>
                    {image.name}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}