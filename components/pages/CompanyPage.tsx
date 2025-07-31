import { ArrowRight, Users, Award, Calendar, MapPin, Phone, Mail, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type ContactTabType = 'consultation' | 'management' | 'download' | 'career';

interface CompanyPageProps {
  setCurrentPage?: (page: 'home' | 'services' | 'cases' | 'company' | 'careers' | 'blog' | 'contact', options?: { contactTab?: ContactTabType }) => void;
}

export function CompanyPage({ setCurrentPage }: CompanyPageProps) {
  const team = [
    {
      name: '神田 淳希',
      position: '代表取締役',
      bio: '経歴：\n東京大学卒\nボストン・コンサルティング・グループ等を経て、中小企業投資事業を行う株式会社REDGE CAPITALを創業。2025年、同社による当社の経営参画に伴い、当社代表取締役就任。\n\n軽井沢在住、兵庫県出身。二児の父。\n\n趣味：\nスポーツ観戦（東大アメフト部主将）\n映画鑑賞（子供の名前は好きな映画の主人公から名づける）'
    },
    {
      name: '野金 将行',
      position: '取締役',
      bio: '経歴：\n東京大学卒\n日本M&Aセンターを経て、中小企業投資事業を行う株式会社REDGE CAPITALを創業。2025年、同社による当社の経営参画に伴い、当社取締役就任。\n\n東京在住、京都府出身。\n\n趣味：\nスポーツ観戦（東大アメフト部副将）\nゴルフ（ベストスコア：89）'
    },
    {
      name: '鈴木 宣晴',
      position: 'マネージャー',
      bio: '経歴：\n東洋大学卒\n東急グループ等を経て、2021年当社参画。事業責任者として事業運営一切を取り仕切る。\n\n軽井沢在住、東京都出身。\n\n趣味：\nサッカー（現在進行形で週4日プレー、Jリーグ昇格を目指す）\nゴルフ（ベストスコア：89）'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl leading-tight mb-6">
              会社
              <span className="text-accent">情報</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              バケーションレンタル業界の未来を創造し、お客様の成功を支援する私たちについてご紹介します
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl">
                私たちについて
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                株式会社WisteriaForestは、リゾート地の別荘物件・遊休地の収益化のスペシャリストとして、
                バケーションレンタル事業に特化したプロフェッショナルサービスを提供しています。
              </p>
              <p className="text-gray-600 leading-relaxed">
                軽井沢を拠点に、宿泊施設運営からAI技術を活用した革新的なソリューションまで、
                バケーションレンタル業界のあらゆるニーズにお応えします。
                お客様の遊休資産を収益性の高いバケーションレンタル事業へと変革し、
                持続可能な収益モデルの構築をサポートすることを使命としています。
              </p>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=center"
                alt="オフィス風景"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              メンバー
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <h3 className="font-heading text-xl font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{member.position}</p>
                  <p className="text-gray-600 leading-relaxed text-sm text-left">
                    {member.bio.split('\n').map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx < member.bio.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl mb-8 text-center">会社概要</h2>
            <div className="space-y-4">
              <div className="flex">
                <div className="w-24 text-sm text-gray-500 flex-shrink-0">会社名</div>
                <div className="text-gray-900">株式会社WisteriaForest</div>
              </div>
              <div className="flex">
                <div className="w-24 text-sm text-gray-500 flex-shrink-0">設立</div>
                <div className="text-gray-900">2022年3月</div>
              </div>
              <div className="flex">
                <div className="w-24 text-sm text-gray-500 flex-shrink-0">代表取締役</div>
                <div className="text-gray-900">神田 淳希</div>
              </div>
              <div className="flex">
                <div className="w-24 text-sm text-gray-500 flex-shrink-0">取締役</div>
                <div className="text-gray-900">野金 将行</div>
              </div>
              <div className="flex">
                <div className="w-24 text-sm text-gray-500 flex-shrink-0">マネージャー</div>
                <div className="text-gray-900">鈴木 宣晴</div>
              </div>
              <div className="flex">
                <div className="w-24 text-sm text-gray-500 flex-shrink-0">事業内容</div>
                <div className="text-gray-900">
                  宿泊施設運営<br />
                  宿泊施設開業支援<br />
                  宿泊施設向けAI開発<br />
                  不動産コンサルティング・仲介
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Info */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl mb-8 text-center">アクセス</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-lg">本社</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-1 flex-shrink-0" />
                    <span>
                      〒389-0111<br />
                      長野県北佐久郡軽井沢町大字長倉4588-49
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>0267-46-9811</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">東京支社</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-1 flex-shrink-0" />
                    <span>
                      〒102-0083<br />
                      東京都千代田区麹町5-3-23<br />
                      WeWork日テレ四谷ビル 3F
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>03-6824-7395</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-600">info@wst-f.com</span>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold mb-4">SNS</h3>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">
            一緒に働きませんか？
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            私たちと一緒にバケーションレンタル業界の未来を創造していく仲間を募集しています
          </p>
          <Button 
            size="lg" 
            className="bg-cta hover:bg-cta/90 text-white px-8"
            onClick={() => setCurrentPage?.('careers')}
          >
            採用情報を見る
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}