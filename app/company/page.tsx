import type { Metadata } from 'next';
import Image from 'next/image';
import { Twitter, Facebook, Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  title: '会社情報 | WisteriaForest',
  description: 'WisteriaForestの会社概要、沿革、SNS情報。',
};

export default function CompanyPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              代表メッセージ
            </h2>
            <p className="text-gray-700 mb-6">
              WisteriaForestは、軽井沢の自然と調和しながら、最高のバケーションレンタル体験をお届けすることを使命としています。お客様の大切な別荘を価値ある資産に変えるため、プロフェッショナルな運営サービスを提供し続けます。
            </p>
            <p className="text-gray-600">代表取締役社長 山田 太郎</p>
          </div>
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/images/ceo-photo.jpg"
              alt="代表写真"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-8">
            沿革
          </h2>
          <ul className="space-y-6 max-w-3xl mx-auto">
            <li className="flex items-start gap-4">
              <span className="font-mono text-primary">2010年</span>
              <p>WisteriaForest 設立</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-mono text-primary">2015年</span>
              <p>軽井沢初のプレミアムヴィラ運営開始</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-mono text-primary">2020年</span>
              <p>外部運営受託サービスをリリース</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-mono text-primary">2023年</span>
              <p>Strapi CMS導入・ウェブサイトリニューアル</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            SNS
          </h2>
          <div className="flex justify-center items-center gap-6">
            <a href="https://twitter.com/your_handle" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
              <Twitter size={24} />
            </a>
            <a href="https://facebook.com/your_page" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
              <Facebook size={24} />
            </a>
            <a href="https://linkedin.com/company/your_company" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
} 