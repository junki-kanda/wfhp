import { ArrowRight, Phone, Mail, Calendar, FileText, TreePine, Home, Brain, Handshake } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type ContactTabType = 'consultation' | 'management' | 'download' | 'career';

interface CTASectionProps {
  setCurrentPage?: (page: 'home' | 'services' | 'cases' | 'company' | 'careers' | 'blog' | 'contact', options?: { contactTab?: ContactTabType }) => void;
}

export function CTASection({ setCurrentPage }: CTASectionProps) {
  const contactMethods = [
    {
      icon: Phone,
      title: 'お電話でのお問い合わせ',
      description: '平日 9:00-18:00',
      contact: '0267-46-9811',
      action: null,
      color: 'bg-primary',
      hasButton: false
    },
    {
      icon: Mail,
      title: 'メールでのお問い合わせ',
      description: '24時間受付・1営業日以内に返信',
      contact: 'info@wst-f.com',
      action: 'メール送信',
      color: 'bg-accent',
      hasButton: true,
      actionType: 'email'
    },
    {
      icon: Calendar,
      title: 'オンライン相談',
      description: 'Zoom・Google Meet対応',
      contact: '30分〜60分',
      action: '予約する',
      color: 'bg-cta',
      hasButton: true,
      actionType: 'external',
      url: 'https://app.spirinc.com/t/vGIfK6dtZ67sW7piTzFMW/as/ke0AMz4BGvXiv55sQTFdu/confirm'
    }
  ];

  const specialties = [
    {
      icon: Home,
      title: '宿泊施設運営・開業支援',
      description: '軽井沢ハウスヴィラの実績を活かした運営ノウハウ'
    },
    {
      icon: Brain,
      title: 'AI開発・業務効率化',
      description: '最新技術による宿泊施設の運営最適化'
    },
    {
      icon: Handshake,
      title: '不動産コンサルティング',
      description: '遊休地の収益化と投資戦略の立案'
    }
  ];

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

  const handleContactMethodClick = (method: any) => {
    if (method.actionType === 'email') {
      // メーラーを起動
      window.location.href = `mailto:${method.contact}`;
    } else if (method.actionType === 'external') {
      // 外部URLを新しいタブで開く
      window.open(method.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white text-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full" />
        <div className="absolute top-32 right-1/3 w-20 h-20 bg-white rounded-full" />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Header */}
          <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full text-sm mb-6 text-green-700">
            <TreePine className="w-4 h-4 mr-2" />
            リゾート地の収益化スペシャリスト
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 text-gray-900">
            あなたの
            <span className="text-accent">別荘・遊休地</span>
            を<br />
            収益物件に変えませんか？
          </h2>
          
          <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-700 max-w-3xl mx-auto">
            軽井沢をはじめとするリゾート地での豊富な実績とノウハウで、
            あなたの不動産の収益性を最大化します。まずは無料相談で可能性を診断させてください。
          </p>

          {/* Specialties */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {specialties.map((specialty, index) => {
              const Icon = specialty.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300 group hover:scale-[1.02] border border-gray-200">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-gray-900">{specialty.title}</h3>
                  <p className="text-gray-600 text-sm">{specialty.description}</p>
                </div>
              );
            })}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center md:justify-start">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span className="text-gray-700">初回相談は完全無料</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span className="text-gray-700">押し売りは一切いたしません</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span className="text-gray-700">秘密保持契約の締結可能</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-cta hover:bg-amber-600 text-white px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={handleConsultationClick}
            >
              無料相談を申し込む
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white hover:border-primary px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={handleDownloadClick}
            >
              <FileText className="w-5 h-5 mr-2" />
              資料をダウンロード
            </Button>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="bg-gray-100 rounded-3xl p-8 md:p-12 max-w-6xl mx-auto">
          <h3 className="font-heading text-2xl mb-8 text-center text-gray-900">
            お問い合わせ方法
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group hover:scale-[1.02] border border-gray-200">
                  <div className="text-center">
                    <div className={`w-16 h-16 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-heading text-lg font-semibold mb-2 text-gray-900">
                      {method.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {method.description}
                    </p>
                    <p className="text-accent font-semibold mb-4">
                      {method.contact}
                    </p>
                    {method.hasButton && method.action && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-2 border-accent bg-accent/10 text-accent hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 hover:scale-105"
                        onClick={() => handleContactMethodClick(method)}
                      >
                        {method.action}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
}