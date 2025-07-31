import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navigation = {
    services: [
      { name: '宿泊施設運営', href: 'services' },
      { name: '宿泊施設開業支援', href: 'services' },
      { name: '宿泊施設向けAI開発', href: 'services' },
      { name: '不動産コンサルティング・仲介', href: 'services' },
    ],
    pages: [
      { name: 'ホーム', href: 'home' },
      { name: 'ブランド', href: 'cases' },
      { name: '会社情報', href: 'company' },
      { name: '採用情報', href: 'careers' },
    ],
    support: [
      { name: 'お問い合わせ', href: 'contact' },
      { name: 'プライバシーポリシー', href: 'privacy' },
      { name: '利用規約', href: 'terms' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/images/logo/logo.png" 
                alt="WisteriaForest" 
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="font-heading text-xl">WisteriaForest</span>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              リゾート地の別荘物件・遊休地の収益化のスペシャリストとして、バケーションレンタル事業に特化したプロフェッショナルサービスを提供しています。
            </p>
            
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-accent font-medium">本社</span>
                </div>
                <div className="text-gray-300 ml-6">
                  〒389-0111<br />
                  長野県北佐久郡軽井沢町大字長倉4588-49
                </div>
                <div className="flex items-center space-x-2 mt-1 ml-6">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-gray-300">0267-46-9811</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-accent font-medium">東京支社</span>
                </div>
                <div className="text-gray-300 ml-6">
                  〒102-0083<br />
                  東京都千代田区麹町5-3-23<br />
                  WeWork日テレ四谷ビル 3F
                </div>
                <div className="flex items-center space-x-2 mt-1 ml-6">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-gray-300">03-6824-7395</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-gray-300">info@wst-f.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg mb-4">サービス</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setCurrentPage(item.href)}
                    className="text-gray-300 hover:text-accent transition-colors text-sm text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-heading text-lg mb-4">ページ</h3>
            <ul className="space-y-2">
              {navigation.pages.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setCurrentPage(item.href)}
                    className="text-gray-300 hover:text-accent transition-colors text-sm text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-lg mb-4">サポート</h3>
            <ul className="space-y-2 mb-6">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setCurrentPage(item.href)}
                    className="text-gray-300 hover:text-accent transition-colors text-sm text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-accent transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} 株式会社WisteriaForest. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button 
                onClick={() => setCurrentPage('privacy')}
                className="text-gray-400 hover:text-accent transition-colors text-sm"
              >
                プライバシーポリシー
              </button>
              <button 
                onClick={() => setCurrentPage('terms')}
                className="text-gray-400 hover:text-accent transition-colors text-sm"
              >
                利用規約
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}