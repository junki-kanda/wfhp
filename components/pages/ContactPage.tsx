import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ContactForm } from '../forms/ContactForm';

type FormType = 'consultation' | 'career' | 'download';

interface ContactPageProps {
  defaultTab?: FormType;
  setCurrentPage?: (page: string) => void;
}

export function ContactPage({ defaultTab, setCurrentPage }: ContactPageProps) {
  const contactInfo = [
    {
      icon: Phone,
      title: 'お電話でのお問い合わせ',
      description: '平日 9:00-18:00',
      details: [
        { label: '本社（軽井沢）', value: '0267-46-9811' },
        { label: '東京支社', value: '03-6824-7395' }
      ],
      color: 'bg-primary'
    },
    {
      icon: Mail,
      title: 'メールでのお問い合わせ',
      description: '24時間受付・1営業日以内に返信',
      details: [
        { label: '一般お問い合わせ', value: 'info@wst-f.com' }
      ],
      color: 'bg-accent'
    },
    {
      icon: MapPin,
      title: 'オフィスへのアクセス',
      description: '事前にお約束をお取りください',
      details: [
        { 
          label: '本社（軽井沢）', 
          value: '〒389-0111\n長野県北佐久郡軽井沢町大字長倉4588-49' 
        },
        { 
          label: '東京支社', 
          value: '〒102-0083\n東京都千代田区麹町5-3-23\nWeWork日テレ四谷ビル 3F' 
        }
      ],
      color: 'bg-cta'
    }
  ];

  const faq = [
    {
      question: '相談は無料ですか？',
      answer: 'はい、初回相談は完全無料です。お客様の物件状況やご要望を詳しくお聞きして、最適なバケーションレンタル活用プランをご提案いたします。'
    },
    {
      question: '対応エリアはどこまでですか？',
      answer: '軽井沢を拠点に、主に関東圏のリゾート地を中心にサービスを提供しております。その他のエリアについても案件内容によって対応可能です。まずはお気軽にご相談ください。'
    },
    {
      question: '小規模な別荘でも運営代行してもらえますか？',
      answer: '物件の規模に関わらず対応いたします。一棟貸し切りの別荘から大型リゾート施設まで、幅広い実績がございます。'
    },
    {
      question: 'レベニューシェア契約の報酬体系はどうなっていますか？',
      answer: 'レベニューシェア契約では、売上の15-25%を成果報酬としていただいております。詳細な条件については、物件の特性や運営内容を考慮して個別にご相談させていただきます。'
    },
    {
      question: 'AI開発サービスはどのような内容ですか？',
      answer: '宿泊施設向けの業務効率化AI、予約管理システム、収益最適化ツールなどを開発しております。お客様のニーズに合わせたカスタマイズも可能です。'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl leading-tight mb-6">
              お問い合わせ
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              ご質問・ご相談はお気軽にお声がけください。専門スタッフが丁寧にお答えします
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              お問い合わせ方法
            </h2>
            <p className="text-lg text-gray-600">
              お客様のご都合に合わせて、最適な方法をお選びください
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-center">{info.title}</CardTitle>
                    <CardDescription className="text-center">{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-center justify-center">
                    <div className="space-y-3 text-center">
                      {info.details.map((detail, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium text-gray-900">{detail.label}</div>
                          <div className="text-gray-600">
                            {detail.value.split('\n').map((line, lineIdx) => (
                              <span key={lineIdx}>
                                {line}
                                {lineIdx < detail.value.split('\n').length - 1 && <br />}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Business Hours */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle>営業時間</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div>
                  <h4 className="font-semibold mb-2">平日</h4>
                  <p className="text-gray-600">9:00 - 18:00</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">土日祝日</h4>
                  <p className="text-gray-600">休業日<br />
                    <small className="text-xs">(緊急時はメールにて対応)</small>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 md:py-24 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              お問い合わせフォーム
            </h2>
            <p className="text-lg text-gray-600">
              以下のフォームからお気軽にお問い合わせください
            </p>
          </div>

          <ContactForm defaultTab={defaultTab} setCurrentPage={setCurrentPage} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              よくあるご質問
            </h2>
            <p className="text-lg text-gray-600">
              お客様からよくいただくご質問をまとめました
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-semibold mb-2">
                        {item.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              その他のご質問がございましたら、お気軽にお問い合わせください。
            </p>
            <Card className="inline-block p-4 bg-blue-50 border-blue-200">
              <CardContent className="flex items-center justify-center p-0">
                <p className="text-sm text-blue-800">
                  <strong>回答時間:</strong> 営業日の24時間以内にご返信いたします
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}