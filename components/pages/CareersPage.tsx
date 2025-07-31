import { ArrowRight, Users, Award, Heart, Lightbulb, TrendingUp, UsersRound } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ContactForm } from '../forms/ContactForm';

export function CareersPage() {
  const scrollToForm = () => {
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const jobs = [
    {
      id: 1,
      title: '別荘管理スタッフ',
      department: '施設運営',
      type: '正社員',
      location: '軽井沢',
      experience: '経験者歓迎',
      description: '一棟貸の高級貸別荘「軽井沢ハウスヴィラ」の支配人として、広報・運営・施設管理を担っていただきます。',
      requirements: [
        '高校卒以上',
        '宿泊施設での運営経験あれば尚可',
        '普通自動車運転免許あれば尚可',
        '年齢不問'
      ],
      benefits: [
        '月給25万～40万円',
        'フレックスタイム制（コアタイム11:00-16:00）',
        '年間休日120日・完全週休2日制',
        '社会保険完備（雇用・労災・健康・厚生）'
      ]
    },
    {
      id: 2,
      title: '別荘清掃スタッフ',
      department: '清掃',
      type: 'パート',
      location: '軽井沢',
      experience: '未経験歓迎',
      description: '軽井沢の高級貸別荘（６棟）の客室整備：ベッドメイク、バス・トイレ清掃、床掃除など。手順はチェックリスト化され、清掃後はタブレットで報告するだけ。未経験でも研修あり。',
      requirements: [
        '学歴・年齢不問',
        '未経験歓迎（丁寧な研修あり）',
        'ホテル/旅館での清掃経験あれば尚可',
        '普通自動車運転免許あれば尚可'
      ],
      benefits: [
        '時給1,300円～1,600円',
        '勤務時間11:00-16:00（実働5h、週1～4日シフト制）',
        '社会保険加入は労働条件による',
        '子連れ勤務も応相談'
      ]
    }
  ];

  const values = [
    {
      icon: Heart,
      title: '顧客第一',
      description: 'お客様の成功が私たちの成功。常にお客様の立場に立って考え、最適なソリューションを提供します。'
    },
    {
      icon: Lightbulb,
      title: '革新的思考',
      description: '既存の枠にとらわれず、新しいアイデアと技術で不動産業界に変革をもたらします。'
    },
    {
      icon: TrendingUp,
      title: '結果へのコミット',
      description: '設定した目標に対して責任を持ち、最後まで諦めずに結果を出すことを重視します。'
    },
    {
      icon: UsersRound,
      title: 'チームワーク',
      description: '多様な価値観を尊重し、チーム一丸となってお客様の課題解決に取り組みます。'
    }
  ];

  const benefits = [
    {
      category: '給与・評価',
      items: ['年俸制', '業績賞与', '昇給年1回', '評価制度']
    },
    {
      category: '休暇・勤務',
      items: ['完全週休2日制', '有給休暇', 'フレックスタイム', 'リモートワーク']
    },
    {
      category: '福利厚生',
      items: ['社会保険完備', '退職金制度', '資格取得支援', '健康診断']
    },
    {
      category: '成長支援',
      items: ['研修制度', 'セミナー参加費補助', '書籍購入補助', 'メンター制度']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl leading-tight mb-6">
              採用
              <span className="text-accent">情報</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              不動産業界の未来を一緒に創造する仲間を募集しています
            </p>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              私たちの価値観
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              WisteriaForestで働く上で大切にしている価値観をご紹介します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              募集職種
            </h2>
            <p className="text-lg text-gray-600">
              現在募集中のポジションをご紹介します
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-primary text-white">{job.type}</Badge>
                      <Badge variant="outline">{job.department}</Badge>
                      <Badge variant="outline">{job.location}</Badge>
                      <Badge variant="outline">{job.experience}</Badge>
                    </div>
                    
                    <h3 className="font-heading text-2xl font-semibold mb-2">
                      {job.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {job.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">応募要件</h4>
                        <ul className="space-y-1">
                          {job.requirements.slice(0, 2).map((req, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <div className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">待遇・福利厚生</h4>
                        <ul className="space-y-1">
                          {job.benefits.slice(0, 2).map((benefit, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <div className="w-2 h-2 bg-accent rounded-full mt-1.5 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <Button 
                      size="lg" 
                      className="w-full bg-cta hover:bg-cta/90 text-white"
                      onClick={scrollToForm}
                    >
                      この職種に応募する
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              働く環境・制度
            </h2>
            <p className="text-lg text-gray-600">
              充実した制度でメンバーをサポートしています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((category, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-center">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              エントリーフォーム
            </h2>
            <p className="text-lg text-gray-600">
              ご興味をお持ちいただいた方は、以下のフォームからご応募ください
            </p>
          </div>

          <ContactForm defaultTab="career" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">
            まずはお気軽にご相談ください
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            応募前のご質問や会社見学のご希望もお気軽にお声がけください
          </p>

        </div>
      </section>
    </div>
  );
}