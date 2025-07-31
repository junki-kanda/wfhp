import { MessageCircle, Search, FileText, Cog, TrendingUp, CheckCircle } from 'lucide-react';

export function ProcessSection() {
  const processes = [
    {
      id: 1,
      icon: MessageCircle,
      title: 'お問い合わせ・ヒアリング',
      description: 'お客様の現状や課題、ご要望を詳しくお聞きします。初回相談は無料です。',
      duration: '1-2日',
      details: [
        '現状の課題整理',
        'ご要望のヒアリング',
        '予算・スケジュール確認',
        'サービス内容の説明'
      ]
    },
    {
      id: 2,
      icon: Search,
      title: '現地調査・分析',
      description: '物件の現地調査を行い、市場データと合わせて詳細な分析を実施します。',
      duration: '3-5日',
      details: [
        '物件の現地調査',
        '市場データ分析',
        '競合物件調査',
        'ポテンシャル評価'
      ]
    },
    {
      id: 3,
      icon: FileText,
      title: '提案書作成・プレゼン',
      description: '分析結果を基に、最適なソリューションをまとめた提案書を作成・提示します。',
      duration: '5-7日',
      details: [
        '課題の整理・分析',
        'ソリューション提案',
        '収益シミュレーション',
        '実施スケジュール'
      ]
    },
    {
      id: 4,
      icon: Cog,
      title: '実行・実装',
      description: 'ご承認いただいた提案内容に基づき、具体的な改善施策を実行します。',
      duration: '1-3ヶ月',
      details: [
        '改善施策の実行',
        '進捗状況の報告',
        '課題対応・調整',
        '品質管理・確認'
      ]
    },
    {
      id: 5,
      icon: TrendingUp,
      title: 'モニタリング・改善',
      description: '実施後の効果を継続的にモニタリングし、さらなる改善を図ります。',
      duration: '継続',
      details: [
        '効果測定・分析',
        '追加課題の発見',
        '改善提案の実施',
        'レポート作成・共有'
      ]
    },
    {
      id: 6,
      icon: CheckCircle,
      title: '成果確認・次期計画',
      description: '目標達成を確認し、さらなる発展に向けた次期計画を策定します。',
      duration: '定期',
      details: [
        '成果・ROIの確認',
        '目標達成度評価',
        '次期計画の策定',
        '長期戦略の検討'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            サービスの
            <span className="text-primary">流れ</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            お問い合わせから成果確認まで、透明性の高いプロセスでお客様をサポートします。
            各ステップで丁寧にご説明し、ご納得いただいてから次へ進みます。
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-0.5" />

            {processes.map((process, index) => {
              const Icon = process.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={process.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-white border-4 border-primary rounded-full transform md:-translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 pb-12 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} ${isEven ? 'md:w-1/2' : 'md:w-1/2 md:ml-auto'}`}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
                      {/* Header */}
                      <div className={`flex items-center mb-4 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                        <div className={`flex items-center ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}>
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className={`${isEven ? 'md:mr-4' : 'ml-4'}`}>
                            <div className="text-xs text-gray-500 font-medium">STEP {process.id}</div>
                            <div className="text-xs text-accent font-medium">{process.duration}</div>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-xl font-semibold mb-3 text-gray-900">
                        {process.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {process.description}
                      </p>

                      {/* Details */}
                      <div className="space-y-2">
                        {process.details.map((detail, idx) => (
                          <div key={idx} className={`flex items-center text-sm text-gray-500 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                            <div className={`w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0 ${isEven ? 'md:order-2 md:ml-2 md:mr-0' : ''}`} />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="font-heading text-2xl md:text-3xl mb-4">
              プロジェクト管理について
            </h3>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
              全てのプロジェクトにおいて、専任の担当者がつき、進捗状況を定期的にご報告します。
              お客様との密なコミュニケーションを重視し、透明性の高いプロジェクト運営を心がけています。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-gray-900 mb-2">
                  定期報告
                </h4>
                <p className="text-sm text-gray-600">
                  週次・月次での進捗報告と課題共有
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-gray-900 mb-2">
                  詳細レポート
                </h4>
                <p className="text-sm text-gray-600">
                  数値に基づく詳細な分析レポート
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-cta/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-cta" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-gray-900 mb-2">
                  品質保証
                </h4>
                <p className="text-sm text-gray-600">
                  成果達成まで責任を持ってサポート
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}