import { Shield, Eye, Database, Lock, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function PrivacyPolicyPage() {
  const lastUpdated = '2025年7月25日';

  const sections = [
    {
      id: 'basic-policy',
      title: '基本方針',
      icon: Shield,
      content: [
        '株式会社WisteriaForest（以下、「当社」といいます。）は、当社が提供するサービスをご利用いただくお客様の個人情報の保護について、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定め、個人情報の適切な取り扱いに努めます。',
        '当社は、個人情報保護法その他の関連法令を遵守し、お客様の個人情報を適切に取り扱います。'
      ]
    },
    {
      id: 'collection',
      title: '個人情報の収集',
      icon: Database,
      content: [
        '当社では、以下の方法により個人情報を収集いたします：',
        '• お問い合わせフォームからのご連絡',
        '• サービス利用時の登録情報',
        '• 採用エントリー時の応募情報',
        '• 営業活動における名刺交換',
        '• ウェブサイトの利用状況（Cookieなど）'
      ]
    },
    {
      id: 'usage',
      title: '個人情報の利用目的',
      icon: Eye,
      content: [
        '当社は、収集した個人情報を以下の目的で利用いたします：',
        '• サービスの提供および改善',
        '• お客様からのお問い合わせへの対応',
        '• 営業活動およびマーケティング活動',
        '• 採用選考およびその後の連絡',
        '• 法令に基づく義務の履行',
        '• その他、お客様との取引に関連する業務'
      ]
    },
    {
      id: 'protection',
      title: '個人情報の保護',
      icon: Lock,
      content: [
        '当社は、個人情報の不正アクセス、紛失、破損、改ざん、漏洩等を防止するため、以下の措置を講じます：',
        '• 適切な技術的・物理的・組織的安全管理措置の実施',
        '• 従業員への個人情報保護に関する研修の実施',
        '• 個人情報へのアクセス権限の適切な管理',
        '• システムのセキュリティ対策の継続的な見直し・改善'
      ]
    },
    {
      id: 'third-party',
      title: '第三者提供',
      icon: Users,
      content: [
        '当社は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません：',
        '• お客様の同意がある場合',
        '• 法令に基づく場合',
        '• 人の生命、身体または財産の保護のために必要がある場合',
        '• 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合',
        '• 国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合'
      ]
    },
    {
      id: 'disclosure',
      title: '開示・訂正・削除',
      icon: FileText,
      content: [
        'お客様は、当社が保有する個人情報について、以下の権利を有します：',
        '• 個人情報の開示請求',
        '• 個人情報の訂正・追加・削除請求',
        '• 個人情報の利用停止・消去請求',
        'これらの請求については、本人確認を行った上で、法令に従い対応いたします。',
        'お問い合わせ先: info@wst-f.com'
      ]
    }
  ];

  const contactInfo = [
    {
      title: '個人情報保護管理責任者',
      content: '株式会社WisteriaForest 代表取締役 神田淳希'
    },
    {
      title: 'お問い合わせ窓口',
      content: [
        'メール: info@wst-f.com',
        '電話: 0267-46-9811（平日9:00-18:00）',
        '住所: 〒389-0111 長野県北佐久郡軽井沢町大字長倉4588-49'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-xl mx-auto mb-6 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-6xl leading-tight mb-6">
              プライバシーポリシー
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              個人情報の取り扱いについて
            </p>
            <p className="text-sm text-white/70">
              最終更新日: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.id} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      {section.content.map((paragraph, index) => (
                        <p key={index} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Contact Information */}
            <div className="mt-16 space-y-8">
              <h2 className="font-heading text-3xl text-center mb-8">
                お問い合わせ先
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6 text-center">
                    <CardHeader>
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {Array.isArray(info.content) ? (
                        <div className="space-y-2">
                          {info.content.map((line, idx) => (
                            <p key={idx} className="text-gray-600 text-sm">
                              {line}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Changes Notice */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <CardContent className="p-0">
                <h3 className="font-heading text-lg mb-3 text-blue-900">
                  プライバシーポリシーの変更について
                </h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  当社は、法令の変更や事業内容の変更等に伴い、本ポリシーを変更することがあります。
                  重要な変更については、当ウェブサイト上で事前に告知いたします。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}