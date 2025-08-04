import { ArrowRight, Building2, Home, Cpu, Settings, Shield, Zap, CheckCircle, Bot, Users, TrendingUp, BarChart3, MessageSquare, Calendar, Wrench, Phone, Handshake, DollarSign, Clock, Award, Target } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

import { NavigateFn } from '../../types/navigation';

interface ServicesPageProps {
  setCurrentPage?: NavigateFn;
}

export function ServicesPage({ setCurrentPage }: ServicesPageProps) {
  const contractTypes = [
    {
      id: 1,
      anchor: 'lease-contract',
      type: 'リース契約',
      subtitle: '最も安定的で手離れの良い収益化',
      description: '不動産賃借契約を行い、弊社が自社運営いたします。オーナー様は安定した家賃収入を得ることができ、運営に関わる一切の業務から解放されます。',
      image: '/images/services/lease-contract.jpg',
      icon: Handshake,
      features: [
        '長期間の安定した家賃収入',
        '運営業務一切不要（完全手離れ）',
        '初期投資・運営コスト負担なし',
        '契約期間中の収入保証',
        '物件の維持管理も弊社が実施',
        'オーナー様のリスク最小化'
      ],
      benefits: [
        '毎月安定した家賃収入',
        '運営リスクゼロ',
        '手間・時間コストゼロ',
        '長期的な資産価値保全'
      ],
      paymentStructure: '月額固定家賃',
      suitableFor: '手離れの良い安定収入を重視される方',
      riskLevel: '極めて低い',
      ownerInvolvement: 'なし',
      color: 'bg-primary'
    },
    {
      id: 2,
      anchor: 'operation-consignment',
      type: 'レベニューシェア',
      subtitle: '売上連動の成果報酬方式',
      description: 'オーナー様の宿泊施設の運営代行を行います。売上金額に応じた成果報酬方式のため、収益向上への強いインセンティブを持って運営いたします。',
      image: '/images/services/revenue-share.jpg',
      icon: Target,
      features: [
        '売上最大化への取り組み',
        '成果報酬制による運営',
        '専門スタッフによる運営代行',
        '収益向上施策の継続実施',
        '詳細な運営レポート提供',
        '季節・需要に応じた価格最適化'
      ],
      benefits: [
        '売上向上への強いコミット',
        '専門的な運営ノウハウ活用',
        '成果に応じた報酬体系',
        '運営業務からの解放'
      ],
      paymentStructure: '売上の15-25%（成果報酬）',
      suitableFor: '収益最大化を重視される方',
      riskLevel: '中程度（コスト負担あり）',
      ownerInvolvement: '最小限',
      color: 'bg-accent'
    },
    {
      id: 3,
      anchor: 'franchise-contract',
      type: 'FC契約',
      subtitle: '軽井沢ハウスヴィラブランドの活用',
      description: '運営はオーナー様が行いますが、軽井沢ハウスヴィラのブランドを使用し、各種予約サイトへの掲載や管理システムにアクセス可能。立ち上がりが早く、早期収益化が期待できます。',
      image: '/images/services/franchise.jpg',
      icon: Award,
      features: [
        '確立されたブランド力の活用',
        '予約サイト掲載・管理システム利用',
        'マーケティング支援・集客サポート',
        '運営ノウハウ・研修提供',
        '早期の収益化実現',
        '継続的な運営改善サポート'
      ],
      benefits: [
        'ブランド認知度による集客力',
        '立ち上がりの早期化',
        '運営の自由度確保',
        'システム・ノウハウの活用'
      ],
      paymentStructure: '加盟金 + 月額ロイヤリティ',
      suitableFor: '自主運営で早期収益化を目指す方',
      riskLevel: '中程度（運営責任あり）',
      ownerInvolvement: '主体的運営',
      color: 'bg-cta'
    },
    {
      id: 4,
      anchor: 'operation-support',
      type: '運営支援',
      subtitle: '現場業務の部分的サポート',
      description: '清掃受託、夜間問い合わせ対応など、主に現場業務の受託やサポートを行います。オーナー様の運営負担を軽減しながら、サービス品質を向上させます。',
      image: '/images/services/operation-support.jpg',
      icon: Users,
      features: [
        '清掃・メンテナンス受託',
        '24時間問い合わせ対応',
        'ゲスト対応サポート',
        '緊急時対応・トラブル解決',
        '業務効率化アドバイス',
        '品質管理・改善提案'
      ],
      benefits: [
        '運営負担の軽減',
        'サービス品質の向上',
        '必要な部分のみサポート',
        'コストパフォーマンス'
      ],
      paymentStructure: '月額固定 + 実働変動報酬',
      suitableFor: '部分的なサポートを求める方',
      riskLevel: '低い（運営主体は保持）',
      ownerInvolvement: '部分的運営',
      color: 'bg-primary-light'
    }
  ];

  const additionalServices = [
    {
      icon: Building2,
      title: '宿泊施設開業支援',
      description: '既存別荘の宿泊施設化や新規開業について、許認可手続きから内装デザイン、システム導入まで全面サポート。',
      features: ['許認可手続き', 'リノベーション', 'システム導入', 'マーケティング']
    },
    {
      icon: Bot,
      title: '宿泊施設向けAI開発',
      description: 'AI技術を活用した運営効率化システムの開発。需要予測、動的価格設定、自動応答システムなど。',
      features: ['需要予測AI', 'チャットボット', '価格最適化', 'データ分析']
    },
    {
      icon: Cpu,
      title: '不動産コンサルティング・仲介',
      description: 'リゾート地に特化した不動産投資・売買戦略のご提案。市場データに基づく客観的なアドバイス。',
      features: ['市場分析', '投資戦略', '売買仲介', '資産活用提案']
    }
  ];



  const handleContactClick = (tab: ContactTabType = 'consultation') => {
    if (setCurrentPage) {
      setCurrentPage('contact', { contactTab: tab });
      
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

  const handleScrollToDetail = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      const headerOffset = 100; // ヘッダーの高さを考慮したオフセット
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-800 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary-dark rounded-full" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary-dark rounded-full" />
          <div className="absolute top-40 right-40 w-16 h-16 bg-primary-dark rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Home className="w-4 h-4 mr-2" />
              宿泊施設運営の4つの契約パターン
            </div>
            <h1 className="font-heading text-4xl md:text-6xl leading-tight mb-6">
              お客様のニーズに合わせた
              <span className="text-accent block">最適な運営スタイル</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              リース契約から運営支援まで、4つの契約パターンで<br />
              あなたの別荘・宿泊施設を最適な形で収益化します
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-4 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl group"
                onClick={() => handleContactClick('consultation')}
              >
                <span className="inline-block group-hover:scale-105 transition-transform duration-300">
                  無料診断・相談を申し込む
                </span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary px-8 py-4 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
                onClick={() => handleContactClick('download')}
              >
                契約パターン比較資料をダウンロード
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Types Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              4つの契約パターン
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              お客様の状況・ご要望に応じて、最適な契約形態をお選びいただけます
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contractTypes.map((contract, index) => {
              const Icon = contract.icon;
              return (
                <Card key={contract.id} className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${contract.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{contract.type}</CardTitle>
                    <CardDescription className="text-sm">
                      {contract.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">オーナー関与度</p>
                        <p className="text-sm font-medium">{contract.ownerInvolvement}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">リスクレベル</p>
                        <p className="text-sm font-medium">{contract.riskLevel}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">報酬体系</p>
                        <p className="text-sm font-medium">{contract.paymentStructure}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleScrollToDetail(contract.anchor)}
                    >
                      詳細を見る
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Contract Types */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              各契約パターンの詳細
            </h2>
            <p className="text-lg text-gray-600">
              それぞれの特徴とメリットを詳しくご説明します
            </p>
          </div>

          <div className="space-y-20">
            {contractTypes.map((contract, index) => {
              const Icon = contract.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={contract.id} 
                  id={contract.anchor}
                  className={`scroll-mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Image */}
                  <div className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                      <ImageWithFallback
                        src={contract.image}
                        alt={contract.type}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30" />
                      <div className={`absolute top-6 left-6 w-16 h-16 ${contract.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <Badge className="bg-white/90 text-primary">
                          {contract.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-heading text-2xl md:text-3xl mb-3">
                          {contract.type}
                        </h3>
                        <p className="text-lg text-primary mb-4 font-medium">
                          {contract.subtitle}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          {contract.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          特徴・サービス内容
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {contract.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0 mt-2" />
                              <span className="leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <TrendingUp className="w-5 h-5 text-accent mr-2" />
                          メリット・効果
                        </h4>
                        <div className="space-y-3">
                          {contract.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0 mt-2" />
                              <span className="leading-relaxed">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">適している方</p>
                          <p className="font-medium text-sm">{contract.suitableFor}</p>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            className="bg-cta hover:bg-cta/90 text-white transition-all duration-300 transform hover:scale-110"
                            onClick={() => handleContactClick('consultation')}
                          >
                            相談・問い合わせ
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              契約パターン比較表
            </h2>
            <p className="text-lg text-gray-600">
              4つの契約パターンの特徴を一覧で比較できます
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left">比較項目</th>
                  <th className="px-6 py-4 text-center">リース契約</th>
                  <th className="px-6 py-4 text-center">レベニューシェア</th>
                  <th className="px-6 py-4 text-center">FC契約</th>
                  <th className="px-6 py-4 text-center">運営支援</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium">オーナー関与度</td>
                  <td className="px-6 py-4 text-center">なし</td>
                  <td className="px-6 py-4 text-center">最小限</td>
                  <td className="px-6 py-4 text-center">主体的運営</td>
                  <td className="px-6 py-4 text-center">部分的運営</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">収益安定性</td>
                  <td className="px-6 py-4 text-center">★★★★★</td>
                  <td className="px-6 py-4 text-center">★★★☆☆</td>
                  <td className="px-6 py-4 text-center">★★★☆☆</td>
                  <td className="px-6 py-4 text-center">★★★★☆</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">収益上限</td>
                  <td className="px-6 py-4 text-center">固定</td>
                  <td className="px-6 py-4 text-center">高い</td>
                  <td className="px-6 py-4 text-center">高い</td>
                  <td className="px-6 py-4 text-center">中程度</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">初期投資</td>
                  <td className="px-6 py-4 text-center">なし</td>
                  <td className="px-6 py-4 text-center">あり</td>
                  <td className="px-6 py-4 text-center">加盟金</td>
                  <td className="px-6 py-4 text-center">なし</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">運営コスト負担</td>
                  <td className="px-6 py-4 text-center">弊社</td>
                  <td className="px-6 py-4 text-center">オーナー</td>
                  <td className="px-6 py-4 text-center">オーナー</td>
                  <td className="px-6 py-4 text-center">オーナー</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 md:py-24 bg-gradient-primary-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              その他のサービス
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              宿泊施設運営以外にも、開業支援やAI開発、不動産コンサルティングなど幅広くサポート
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow bg-white flex flex-col">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-cta hover:bg-cta/90 text-white transition-all duration-300 transform hover:scale-110"
                      onClick={() => handleContactClick('consultation')}
                    >
                      相談・問合せ
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">
            最適な契約パターンを診断します
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            お客様の状況・ご要望をお聞かせいただければ、<br />
            最適な契約パターンを無料で診断・ご提案いたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-4 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl group"
              onClick={() => handleContactClick('consultation')}
            >
              <span className="inline-block group-hover:scale-105 transition-transform duration-300">
                無料診断・相談を申し込む
              </span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary px-8 py-4 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
              onClick={() => handleContactClick('download')}
            >
              詳細資料をダウンロード
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}