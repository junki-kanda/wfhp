import { ArrowRight, Building2, Home, Cpu, Settings, Shield, Zap, Bot } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type ContactTabType = 'consultation' | 'management' | 'download' | 'career';

interface ServicesSectionProps {
  setCurrentPage?: (page: 'home' | 'services' | 'cases' | 'company' | 'careers' | 'blog' | 'contact', options?: { contactTab?: ContactTabType }) => void;
}

export function ServicesSection({ setCurrentPage }: ServicesSectionProps) {
  const services = [
    {
      id: 1,
      title: '宿泊施設運営',
      description: '自社ブランド「軽井沢ハウスヴィラ」をはじめとするリゾート貸別荘（バケーションレンタル）に特化した幅広い運営業務を展開',
      imagePath: '/images/services/accommodation-operation.jpg',
      icon: Home,
      features: ['日常清掃・メンテナンス', '予約・顧客管理システム', 'ゲスト対応・コンシェルジュ', '収益最適化・料金設定'],
      color: 'bg-primary',
      detailPage: 'services' as const,
      anchor: 'operation'
    },
    {
      id: 2,
      title: '宿泊施設開業支援',
      description: '既存別荘の宿泊施設化や、新規の開業について、ゼロからご支援いたします',
      imagePath: '/images/services/startup-support.jpg',
      icon: Building2,
      features: ['物件調査・コンセプト設計', 'リノベーション・内装デザイン', '許認可手続き・法務サポート', 'マーケティング・集客戦略'],
      color: 'bg-accent',
      detailPage: 'services' as const,
      anchor: 'startup-support'
    },
    {
      id: 3,
      title: '宿泊施設向けAI開発',
      description: 'AI技術を活用した宿泊施設運営の効率化と収益最大化を実現するソリューションを開発・提供します',
      imagePath: '/images/services/ai-development.jpg',
      icon: Bot,
      features: ['需要予測・動的価格設定AI', 'チャットボット・自動応答システム', '業務効率化・自動化ツール', 'データ分析・経営支援AI'],
      color: 'bg-cta',
      detailPage: 'services' as const,
      anchor: 'ai-development'
    },
    {
      id: 4,
      title: '不動産コンサルティング・仲介',
      description: 'リゾート地の不動産に精通した専門家が、市場データと豊富な経験を基に最適な投資・売買戦略をご提案します',
      imagePath: '/images/services/real-estate-consulting.jpg',
      icon: Cpu,
      features: ['リゾート地特化市場分析', '収益性評価・投資戦略', '売買仲介・マッチング', '資産運用・活用提案'],
      color: 'bg-primary-light',
      detailPage: 'services' as const,
      anchor: 'consulting'
    }
  ];

  const additionalServices = [
    {
      icon: Settings,
      title: 'システム導入支援',
      description: '最新の宿泊施設管理システムを活用した効率的な運営体制の構築'
    },
    {
      icon: Shield,
      title: 'リスク管理',
      description: '宿泊業特有のリスクから法的リスクまで、包括的なリスク管理体制'
    },
    {
      icon: Zap,
      title: 'デジタル化支援',
      description: 'アナログ業務のデジタル化で運営効率と顧客満足度を向上'
    }
  ];

  const handleServiceClick = (service: typeof services[0]) => {
    if (setCurrentPage) {
      // まずサービスページに遷移
      setCurrentPage(service.detailPage);
      
      // ページ遷移が完了してからスクロールを実行
      setTimeout(() => {
        const element = document.getElementById(service.anchor);
        if (element) {
          // ヘッダーの高さを考慮してスクロール位置を調整
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300); // 遷移アニメーションを考慮した遅延
    }
  };

  const handleContactClick = () => {
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

  const handleDownloadClick = () => {
    if (setCurrentPage) {
      // 資料ダウンロードフォームに遷移
      setCurrentPage('contact', { contactTab: 'download' });
      
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

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            私たちの
            <span className="text-primary">サービス</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            宿泊施設運営から開業支援、AI開発、不動産コンサルティングまで、
            リゾート地の別荘・遊休不動産の収益化を総合的に支援する専門サービスをご提供します。
          </p>
        </div>

        {/* Main Services */}
        <div className="flex flex-col md:flex-row md:overflow-x-auto md:space-x-6 space-y-8 md:space-y-0 mb-16 md:py-4 -mx-4 px-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-auto min-h-[520px] w-full md:w-[320px] lg:w-[340px] flex-shrink-0">
                {/* 画像セクション - 固定高さ */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={service.imagePath}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all" />
                  <div className={`absolute top-4 left-4 w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* タイトル・説明セクション */}
                <CardHeader className="pb-4 flex-shrink-0">
                  <CardTitle className="font-heading text-xl mb-3 min-h-[2.5rem] flex items-start">
                    <span className="leading-tight">{service.title}</span>
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed min-h-[4rem] flex items-start">
                    <span className="leading-relaxed">{service.description}</span>
                  </CardDescription>
                </CardHeader>
                
                {/* コンテンツセクション */}
                <CardContent className="flex-1 flex flex-col justify-between pt-0">
                  {/* リストセクション */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0 mt-2" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* ボタンセクション */}
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      onClick={() => handleServiceClick(service)}
                    >
                      詳細を見る
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl md:text-3xl mb-4">その他のサービス</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              メインサービスに加えて、お客様のニーズに応じた様々な支援サービスもご用意しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl shadow-sm mb-4 group-hover:shadow-md transition-shadow">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-heading text-lg font-semibold mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="font-heading text-2xl md:text-3xl mb-4">
            まずはお気軽にご相談ください
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            お客様の状況やご要望に応じて、最適なサービスプランをご提案いたします。
            初回相談は無料ですので、お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-cta hover:bg-cta/90 text-white px-8"
              onClick={handleContactClick}
            >
              無料相談を申し込む
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8"
              onClick={handleDownloadClick}
            >
              サービス資料をダウンロード
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}