import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { getCategoryImages, getImageUrl } from '../../utils/supabase/storage';

export function ImageDebugger() {
  const [category, setCategory] = useState('hero');
  const [imageName, setImageName] = useState('DSCF1830.jpeg');
  const [loading, setLoading] = useState(false);
  const [categoryImages, setCategoryImages] = useState<Array<{name: string, publicUrl: string}>>([]);
  const [testResult, setTestResult] = useState<{url: string | null, error?: string} | null>(null);

  const testImage = async () => {
    setLoading(true);
    try {
      console.log(`Testing image: ${category}/${imageName}`);
      const url = await getImageUrl(category, imageName);
      setTestResult({ url });
      console.log('Test result:', url);
    } catch (error) {
      console.error('Test error:', error);
      setTestResult({ url: null, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryImages = async () => {
    setLoading(true);
    try {
      console.log(`Loading images for category: ${category}`);
      const images = await getCategoryImages(category);
      setCategoryImages(images);
      console.log('Category images:', images);
    } catch (error) {
      console.error('Error loading category images:', error);
      setCategoryImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategoryImages();
  }, [category]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>画像デバッグツール</CardTitle>
          <CardDescription>
            Supabaseストレージの画像を確認・テストします
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">カテゴリ</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="例: hero"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageName">画像名</Label>
              <Input
                id="imageName"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                placeholder="例: DSCF1830.jpeg"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={testImage} disabled={loading}>
              画像URLテスト
            </Button>
            <Button onClick={loadCategoryImages} disabled={loading} variant="outline">
              カテゴリ画像更新
            </Button>
          </div>

          {testResult && (
            <div className={`p-3 rounded-lg ${
              testResult.url 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <div className="font-medium">
                {testResult.url ? '✅ 画像が見つかりました' : '❌ 画像が見つかりません'}
              </div>
              {testResult.url && (
                <div className="text-sm mt-1">
                  URL: <code className="bg-white px-1 rounded">{testResult.url}</code>
                </div>
              )}
              {testResult.error && (
                <div className="text-sm mt-1">
                  エラー: {testResult.error}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{category}カテゴリの画像一覧</CardTitle>
          <CardDescription>
            現在Supabaseストレージに保存されている画像
          </CardDescription>
        </CardHeader>
        <CardContent>
          {categoryImages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              このカテゴリに画像がありません
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryImages.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image.publicUrl}
                      alt={image.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Image failed to load:', image.publicUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 truncate" title={image.name}>
                    {image.name}
                  </p>
                  <p className="text-xs text-blue-600 truncate" title={image.publicUrl}>
                    {image.publicUrl}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}