import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

import { NavigateFn } from '../../types/navigation';

interface CasesSectionProps {
  setCurrentPage?: NavigateFn;
}

export function CasesSection({ setCurrentPage }: CasesSectionProps) {
  const [currentCase, setCurrentCase] = useState(0);

  const cases = [
    {
      id: 1,
      title: '都心オフィスビルの収益性向上プロジェクト',
      location: '東京都港区',
      category: '運営受託',
      period: '2023年4月〜継続中',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=center',
      beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center',
      challenge: '築20年のオフィスビルで空室率が30%に達し、収益性が大幅に低下していました。',
      solution: 'テナントニーズの詳細分析を行い、共用部のリノベーションとIT設備の充実、柔軟な契約条件の設定を実施。',
      results: [
        { metric: '空室率', before: '30%', after: '5%', improvement: '25%改善' },
        { metric: '月間収益', before: '800万円', after: '1,200万円', improvement: '50%向上' },
        { metric: 'テナント満足度', before: '60%', after: '95%', improvement: '35%向上' }
      ],
      tags: ['収益向上', 'リノベーション', 'IT設備']
    },
    {
      id: 2,
      title: '住宅マンションブランド開発・運営',
      location: '神奈川県横浜市',
      category: '自社ブランド',
      period: '2022年8月〜2024年3月',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center',
      beforeImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=center',
      challenge: '新築マンションの差別化が困難で、近隣競合物件との価格競争に巻き込まれるリスクがありました。',
      solution: 'ターゲット層を明確化し、ライフスタイル提案型のブランドコンセプトを構築。共用施設とサービスで付加価値を創出。',
      results: [
        { metric: '販売期間', before: '予想12ヶ月', after: '6ヶ月', improvement: '50%短縮' },
        { metric: '販売価格', before: '市場相場', after: '105%プレミアム', improvement: '5%向上' },
        { metric: '入居後満足度', before: '－', after: '92%', improvement: '高水準達成' }
      ],
      tags: ['ブランド開発', '新築', 'ライフスタイル提案']
    },
    {
      id: 3,
      title: '商業施設の集客力向上・テナント誘致',
      location: '大阪府大阪市',
      category: '運営受託',
      period: '2023年1月〜継続中',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center',
      beforeImage: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=400&h=300&fit=crop&crop=center',
      afterImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
      challenge: 'コロナ禍の影響で集客が大幅減少し、テナントの退去が相次いでいました。',
      solution: 'デジタルマーケティングの強化、イベント企画、地域密着型テナントの誘致を実施。SNSを活用した情報発信も強化。',
      results: [
        { metric: '月間来客数', before: '5万人', after: '12万人', improvement: '140%向上' },
        { metric: 'テナント充足率', before: '65%', after: '95%', improvement: '30%改善' },
        { metric: '売上高', before: '2億円/月', after: '3.2億円/月', improvement: '60%向上' }
      ],
      tags: ['集客向上', 'デジタルマーケティング', 'テナント誘致']
    }
  ];

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % cases.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const handleConsultationClick = () => {
    if (setCurrentPage) {
      // 無料相談フォーム（開業相談タブ）に遷移
      setCurrentPage('contact', { contactTab: 'consultation' });
      
      setTimeout(() => {
        const element = document.getElementById('contact-form');
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  const currentCaseData = cases[currentCase];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            成功
            <span className="text-primary">事例</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            様々な課題を抱えるお客様の物件を、戦略的なアプローチで成功に導いた実績をご紹介します。
          </p>
        </div>

        {/* Case Study Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Navigation */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={prevCase}
                  className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextCase}
                  className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="flex space-x-2">
                {cases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCase(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentCase ? 'bg-primary scale-110' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Case Content */}
            <Card className="overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 lg:h-auto">
                  <ImageWithFallback
                    src={currentCaseData.image}
                    alt={currentCaseData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">
                      {currentCaseData.category}
                    </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl mb-3">
                        {currentCaseData.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {currentCaseData.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {currentCaseData.period}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {currentCaseData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Challenge & Solution */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">課題</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {currentCaseData.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-2">解決策</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {currentCaseData.solution}
                        </p>
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        成果
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {currentCaseData.results.map((result, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{result.metric}</span>
                              <span className="text-xs text-green-600 font-semibold">
                                {result.improvement}
                              </span>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-600">
                              <span>Before: {result.before}</span>
                              <span>After: {result.after}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="font-heading text-2xl md:text-3xl mb-4">
            あなたの物件も成功させませんか？
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            お客様の物件が抱える課題を分析し、最適なソリューションをご提案します。
            まずは無料相談で現状をお聞かせください。
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-cta hover:bg-cta/90 text-white px-8"
              onClick={handleConsultationClick}
            >
              無料相談を申し込む
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}