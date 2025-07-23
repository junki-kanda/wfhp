import Image from 'next/image';
import Link from 'next/link';
import { Home, Users, ChevronRight } from 'lucide-react';

const services = [
  {
    title: '自社ブランド運営',
    subtitle: 'WisteriaForest Villas',
    description:
      '最高級のおもてなしと洗練されたデザインで、忘れられない軽井沢体験を提供。自社ブランドの運営ノウハウを活かし、高稼働率を実現します。',
    features: [
      'ブランディング戦略立案',
      'インテリアデザイン提案',
      'プレミアムアメニティ導入',
      '24時間コンシェルジュサービス',
    ],
    icon: Home,
    image: '/placeholder.jpg',
    link: '/services#own-brand',
  },
  {
    title: '外部運営受託',
    subtitle: 'プロフェッショナル運営代行',
    description:
      'オーナー様の大切な資産を、プロの運営チームが最大限に活用。収益最大化と資産価値向上を同時に実現します。',
    features: [
      '収益シミュレーション',
      'OTA最適化運用',
      '清掃・メンテナンス管理',
      '月次レポーティング',
    ],
    icon: Users,
    image: '/placeholder.jpg',
    link: '/services#management',
  },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            2つの事業で軽井沢の価値を創造
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            自社ブランド運営で培った知見を活かし、
            オーナー様の物件運営も成功へ導きます
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-sm text-accent font-medium">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{service.description}</p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.link}
                  className="btn-primary btn-md inline-flex items-center gap-2"
                >
                  詳しく見る
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
