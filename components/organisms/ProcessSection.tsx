import { Phone, Calculator, FileText, BarChart3 } from 'lucide-react';
import { ProcessStep } from '@/lib/types';

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: '無料相談',
    description:
      'まずはお気軽にご相談ください。物件の状況や目標をヒアリングし、最適な運営プランをご提案します。',
    icon: 'Phone',
  },
  {
    number: 2,
    title: '収益シミュレーション',
    description:
      '市場分析と物件の特性を基に、詳細な収益シミュレーションを作成。投資対効果を明確にします。',
    icon: 'Calculator',
  },
  {
    number: 3,
    title: '契約・立ち上げ',
    description:
      'ご契約後、物件の準備から予約サイト登録まで、運営開始に必要なすべてをサポートします。',
    icon: 'FileText',
  },
  {
    number: 4,
    title: '運営・レポーティング',
    description:
      'プロフェッショナルな運営と月次レポートで、収益最大化と透明性の高い管理を実現します。',
    icon: 'BarChart3',
  },
];

const iconComponents = {
  Phone,
  Calculator,
  FileText,
  BarChart3,
};

export default function ProcessSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            シンプルな4ステップ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ご相談から運営開始まで、経験豊富なチームが丁寧にサポートいたします
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => {
            const IconComponent = iconComponents[step.icon as keyof typeof iconComponents];
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-[2px] bg-gray-200">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gray-200" />
                  </div>
                )}

                {/* Step Card */}
                <div className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent text-white rounded-full mb-4">
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <IconComponent className="w-8 h-8 text-primary mx-auto" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            最短2週間で運営開始が可能です
          </p>
          <a
            href="/contact"
            className="btn-cta btn-lg"
          >
            無料相談を申し込む
          </a>
        </div>
      </div>
    </section>
  );
}
