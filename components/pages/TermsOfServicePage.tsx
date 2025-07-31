import { Scale, AlertCircle, FileText, UserCheck, Gavel, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function TermsOfServicePage() {
  const lastUpdated = '2025年7月25日';

  const sections = [
    {
      id: 'general',
      title: '総則',
      icon: Scale,
      content: [
        '本利用規約（以下「本規約」といいます。）は、株式会社WisteriaForest（以下「当社」といいます。）が提供するウェブサイトおよびサービス（以下「本サービス」といいます。）の利用条件を定めるものです。',
        'ユーザーの皆さま（以下「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。',
        '本サービスをご利用になる場合には、本規約に同意したものとみなします。'
      ]
    },
    {
      id: 'services',
      title: 'サービス内容',
      icon: FileText,
      content: [
        '当社は以下のサービスを提供します：',
        '• 宿泊施設運営サービス',
        '• 宿泊施設開業支援サービス',
        '• 宿泊施設向けAI開発サービス',
        '• 不動産コンサルティング・仲介サービス',
        'サービスの詳細については、別途契約書またはサービス仕様書に定めるものとします。',
        '当社は、サービス内容を予告なく変更または追加することがあります。'
      ]
    },
    {
      id: 'user-obligations',
      title: 'ユーザーの義務',
      icon: UserCheck,
      content: [
        'ユーザーは、本サービスの利用にあたり、以下の事項を遵守するものとします：',
        '• 法令、本規約および当社が別途定める規則等を遵守すること',
        '• 公序良俗に反する行為を行わないこと',
        '• 当社または第三者の知的財産権を侵害しないこと',
        '• 本サービスの運営を妨げる行為を行わないこと',
        '• 虚偽の情報を提供しないこと',
        '• その他、当社が不適切と判断する行為を行わないこと'
      ]
    },
    {
      id: 'prohibited',
      title: '禁止事項',
      icon: AlertTriangle,
      content: [
        'ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません：',
        '• 犯罪行為に関連する行為',
        '• 公序良俗に違反する行為',
        '• 当社、他のユーザーまたは第三者の人格権、財産権等の権利を侵害する行為',
        '• 当社のサーバーやネットワークに過度の負荷をかける行為',
        '• 本サービスの運営を妨害する行為',
        '• 不正アクセス行為',
        '• 逆アセンブル、逆コンパイル、リバースエンジニアリング等の行為',
        '• その他、当社が不適切と判断する行為'
      ]
    },
    {
      id: 'intellectual-property',
      title: '知的財産権',
      icon: Gavel,
      content: [
        '本サービスに含まれるコンテンツ（テキスト、画像、動画、音声、ソフトウェア等）の知的財産権は、当社または当社にライセンスを許諾した権利者に帰属します。',
        'ユーザーは、本サービスの利用に必要な範囲内でのみ、これらのコンテンツを利用することができます。',
        'ユーザーが本サービスに投稿したコンテンツについては、ユーザーが必要な権利を有していることを保証するものとします。'
      ]
    },
    {
      id: 'disclaimer',
      title: '免責事項',
      icon: AlertCircle,
      content: [
        '当社は、本サービスの内容、品質、正確性、完全性、有効性、特定の目的への適合性について、明示・黙示を問わず一切保証しません。',
        '本サービスの利用により生じた損害について、当社は一切責任を負いません。ただし、当社の故意または重過失による場合はこの限りではありません。',
        '当社は、本サービスが中断しないこと、エラーが生じないことを保証するものではありません。',
        '当社は、本サービスで提供される情報の正確性、最新性について保証するものではありません。'
      ]
    },
    {
      id: 'modification',
      title: '本規約の変更',
      icon: FileText,
      content: [
        '当社は、必要に応じて本規約を変更することがあります。',
        '重要な変更については、当ウェブサイト上で事前に告知いたします。',
        '変更後の本規約は、当ウェブサイトに掲載された時点で効力を生じるものとします。',
        'ユーザーは、本規約の変更後に本サービスを利用した場合、変更後の本規約に同意したものとみなします。'
      ]
    }
  ];

  const contactInfo = {
    title: 'お問い合わせ',
    content: [
      '本規約に関するお問い合わせは、以下までご連絡ください：',
      '',
      '株式会社WisteriaForest',
      'メール: info@wst-f.com',
      '電話: 0267-46-9811（平日9:00-18:00）',
      '住所: 〒389-0111 長野県北佐久郡軽井沢町大字長倉4588-49'
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-xl mx-auto mb-6 flex items-center justify-center">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-6xl leading-tight mb-6">
              利用規約
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              サービス利用に関する条件
            </p>
            <p className="text-sm text-white/70">
              最終更新日: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={section.id} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          第{index + 1}条 {section.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      {section.content.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Contact Information */}
            <Card className="p-6 bg-gray-50 border">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <FileText className="w-6 h-6 text-primary" />
                  <span>{contactInfo.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contactInfo.content.map((line, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Effective Date */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <CardContent className="p-0">
                <h3 className="font-heading text-lg mb-3 text-blue-900">
                  施行日
                </h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  本利用規約は、{lastUpdated}から施行されます。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}