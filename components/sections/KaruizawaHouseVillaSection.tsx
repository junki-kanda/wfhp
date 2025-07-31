import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Users, Wifi, Car, TreePine, Star, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type ContactTabType = 'consultation' | 'management' | 'download' | 'career';

interface KaruizawaHouseVillaSectionProps {
  setCurrentPage?: (page: 'home' | 'services' | 'cases' | 'company' | 'careers' | 'blog' | 'contact', options?: { contactTab?: ContactTabType }) => void;
}

export function KaruizawaHouseVillaSection({ setCurrentPage }: KaruizawaHouseVillaSectionProps) {
  const [currentProperty, setCurrentProperty] = useState(0);

  const properties = [
    /* 1. ハウスヴィラ A棟 */
    {
      id: 1,
      name: 'ハウスヴィラ A棟',
      location: '長野県北佐久郡軽井沢町長倉5575-8',
      capacity: '最大12名',
      type: 'ラグジュアリーヴィラ',
      features: ['ガスオーブン', '薪ストーブ', '床暖房', 'ウッドデッキ', 'プロジェクター完備'],
      image: '/images/villas/villa-a.jpg',
      gallery: [
        '/images/villas/gallery/villa-a-1.jpg',
        '/images/villas/gallery/villa-a-2.jpg',
        '/images/villas/gallery/villa-a-3.jpg'
      ],
      price: '¥54,450〜/泊',
      rating: '4.5',
      description: 'シリーズ最大184㎡。薪ストーブと大型プロジェクターを備えた広々リビングで贅沢な滞在を楽しめます。',
      amenities: [
        { icon: Users, text: '最大12名' },
        { icon: Car, text: '屋内1台＋屋外2台' },
        { icon: Wifi, text: '高速Wi‑Fi' },
        { icon: TreePine, text: '自然豊かな立地' }
      ],
      tags: ['ペット可', '薪ストーブ', 'BBQオプション', 'Wi‑Fi完備']
    },

    /* 2. ハウスヴィラ B棟（サウナ付） */
    {
      id: 2,
      name: 'ハウスヴィラ B棟（サウナ付）',
      location: '長野県北佐久郡軽井沢町長倉5575-13',
      capacity: '最大11名',
      type: 'サウナ付きラグジュアリー',
      features: ['プライベートサウナ', 'ジャグジーバス', '薪ストーブ', '床暖房', 'ウッドデッキ'],
      image: '/images/villas/villa-b-sauna.jpg',
      gallery: [
        '/images/villas/gallery/villa-b-1.jpg',
        '/images/villas/gallery/villa-b-2.jpg',
        '/images/villas/gallery/villa-b-3.jpg'
      ],
      price: '¥66,550〜/泊',
      rating: '4.5',
      description: '天然木を基調とした127㎡の温もり空間。サウナとジャグジーでリラックスした後は薪ストーブで団欒を。',
      amenities: [
        { icon: Users, text: '最大11名' },
        { icon: Car, text: '駐車場3台' },
        { icon: Wifi, text: '高速Wi‑Fi' },
        { icon: TreePine, text: 'サウナ・水風呂' }
      ],
      tags: ['サウナ', 'ジャグジー', 'ペット可', 'Wi‑Fi完備']
    },

    /* 3. 別邸 平屋棟 */
    {
      id: 3,
      name: '別邸 平屋棟',
      location: '長野県北佐久郡軽井沢町長倉4588-38',
      capacity: '最大11名',
      type: 'バリアフリーヴィラ',
      features: ['段差ゼロ設計', 'ジャグジーバス', '薪ストーブ', '床暖房', '浅間山ビュー'],
      image: '/images/villas/villa-flat.jpg',
      gallery: [
        '/images/villas/gallery/villa-a-1.jpg',
        '/images/villas/gallery/villa-a-2.jpg',
        '/images/villas/gallery/villa-a-3.jpg'
      ],
      price: '¥66,550〜/泊',
      rating: '4.5',
      description: '128㎡ワンフロアのバリアフリー設計。浅間山を眺めながら家族三世代で安心して過ごせます。',
      amenities: [
        { icon: Users, text: '最大11名' },
        { icon: Car, text: '駐車場3台' },
        { icon: Wifi, text: '高速Wi‑Fi' },
        { icon: TreePine, text: '浅間山ビュー' }
      ],
      tags: ['バリアフリー', 'ジャグジー', '家族向け', 'Wi‑Fi完備']
    },

    /* 4. 別邸 サウナ棟 */
    {
      id: 4,
      name: '別邸 サウナ棟',
      location: '長野県北佐久郡軽井沢町長倉4588-38',
      capacity: '最大13名',
      type: 'サウナ＆水風呂ヴィラ',
      features: ['プライベートサウナ', '水風呂', 'ジャグジーバス', '薪ストーブ', '床暖房'],
      image: '/images/villas/villa-sauna.jpg',
      gallery: [
        '/images/villas/gallery/villa-b-1.jpg',
        '/images/villas/gallery/villa-b-2.jpg',
        '/images/villas/gallery/villa-b-3.jpg'
      ],
      price: '¥70,000〜/泊',
      rating: '4.5',
      description: '135㎡の開放空間に本格サウナ＋水風呂を完備。浅間山を望むテラスで"ととのい"体験を。',
      amenities: [
        { icon: Users, text: '最大13名' },
        { icon: Car, text: '駐車場3台' },
        { icon: Wifi, text: '高速Wi‑Fi' },
        { icon: TreePine, text: 'サウナ・水風呂' }
      ],
      tags: ['サウナ', '水風呂', '浅間山ビュー', 'Wi‑Fi完備']
    },

    /* 5. 別邸 足湯棟 */
    {
      id: 5,
      name: '別邸 足湯棟',
      location: '長野県北佐久郡軽井沢町長倉4588-38',
      capacity: '最大13名',
      type: '足湯付きヴィラ',
      features: ['足湯付きウッドデッキ', 'ジャグジーバス', '薪ストーブ', '床暖房', 'ウッドデッキ'],
      image: '/images/villas/villa-ashiyu.jpg',
      gallery: [
        '/images/villas/gallery/villa-a-1.jpg',
        '/images/villas/gallery/villa-a-2.jpg',
        '/images/villas/gallery/villa-a-3.jpg'
      ],
      price: '¥66,550〜/泊',
      rating: '4.5',
      description: 'ウッドデッキに大きな足湯を備えた137㎡の癒し空間。星空の下で足湯＆焚き火を満喫できます。',
      amenities: [
        { icon: Users, text: '最大13名' },
        { icon: Car, text: '駐車場3台' },
        { icon: Wifi, text: '高速Wi‑Fi' },
        { icon: TreePine, text: '足湯付き' }
      ],
      tags: ['足湯', '星空テラス', 'BBQオプション', 'Wi‑Fi完備']
    },

    /* 6. 別邸 檜風呂棟 */
    {
      id: 6,
      name: '別邸 檜風呂棟',
      location: '長野県北佐久郡軽井沢町長倉4588-38',
      capacity: '最大13名',
      type: '檜風呂ヴィラ',
      features: ['檜風呂', '薪ストーブ', '床暖房', 'ウッドデッキ', 'ジャグジーバス'],
      image: '/images/villas/villa-hinoki.jpg',
      gallery: [
        '/images/villas/gallery/villa-b-1.jpg',
        '/images/villas/gallery/villa-b-2.jpg',
        '/images/villas/gallery/villa-b-3.jpg'
      ],
      price: '¥70,000〜/泊',
      rating: '4.5',
      description: '檜と十和田石を用いた癒しの浴場が自慢。木の香りに包まれながら別荘気分を堪能できます。',
      amenities: [
        { icon: Users, text: '最大13名' },
        { icon: Car, text: '駐車場3台' },
        { icon: Wifi, text: '高速Wi‑Fi' },
        { icon: TreePine, text: '檜風呂' }
      ],
      tags: ['檜風呂', '薪ストーブ', 'ペット可', 'Wi‑Fi完備']
    }
  ];

  const nextProperty = () => {
    setCurrentProperty((prev) => (prev + 1) % properties.length);
  };

  const prevProperty = () => {
    setCurrentProperty((prev) => (prev - 1 + properties.length) % properties.length);
  };

  const handleVisitWebsite = () => {
    window.open('https://karuizawa-house-villa.com/', '_blank', 'noopener,noreferrer');
  };

  const currentPropertyData = properties[currentProperty];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full text-sm mb-4">
            <TreePine className="w-4 h-4 mr-2 text-primary" />
            自社ブランド
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            軽井沢
            <span className="text-primary">ハウスヴィラ</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            軽井沢の美しい自然に包まれた贅沢なバケーションレンタル。
            プライベート感あふれる上質な空間で、特別な時間をお過ごしください。
          </p>
        </div>

        {/* Brand Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">6</div>
            <div className="text-sm text-gray-600">運営物件数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">4.5</div>
            <div className="text-sm text-gray-600">平均評価</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">50%+</div>
            <div className="text-sm text-gray-600">稼働率</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">1,000+</div>
            <div className="text-sm text-gray-600">年間宿泊組数</div>
          </div>
        </div>

        {/* Property Showcase */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Navigation */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={prevProperty}
                  className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextProperty}
                  className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="flex space-x-2">
                {properties.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProperty(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentProperty ? 'bg-primary scale-110' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Property Content */}
            <Card className="overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 lg:h-auto">
                  <ImageWithFallback
                    src={currentPropertyData.image}
                    alt={currentPropertyData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">
                      {currentPropertyData.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">{currentPropertyData.rating}</span>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl mb-3">
                        {currentPropertyData.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {currentPropertyData.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {currentPropertyData.capacity}
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-primary">
                        {currentPropertyData.price}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {currentPropertyData.description}
                    </p>

                    {/* Amenities */}
                    <div className="grid grid-cols-2 gap-3">
                      {currentPropertyData.amenities.map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <Icon className="w-4 h-4 mr-2 text-primary" />
                            {amenity.text}
                          </div>
                        );
                      })}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {currentPropertyData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-primary mb-3">主な設備・特徴</h4>
                      <ul className="space-y-2">
                        {currentPropertyData.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0 mt-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>

        {/* Brand Features */}
        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl md:text-3xl mb-4">軽井沢ハウスヴィラの特徴</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              お客様に最高の軽井沢体験をお届けするための、こだわり抜いたサービスと設備をご用意しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4">
                <TreePine className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-heading text-lg font-semibold mb-2">自然との調和</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                軽井沢の豊かな自然環境を活かした立地と設計で、四季を通じて美しい景観をお楽しみいただけます。
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-heading text-lg font-semibold mb-2">最高品質のサービス</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                プロフェッショナルなスタッフによる24時間サポートで、安心・快適な滞在をお約束します。
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-heading text-lg font-semibold mb-2">多様なニーズに対応</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                ファミリー、カップル、グループなど、様々なお客様のニーズに合わせた多彩な物件をご用意。
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="font-heading text-2xl md:text-3xl mb-4">
            軽井沢ハウスヴィラでの滞在をご検討ですか？
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            お客様のご要望に合わせた最適な物件をご提案いたします。
            宿泊予約や物件の詳細については、公式サイトをご覧ください。
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-cta hover:bg-cta/90 text-white px-8"
              onClick={handleVisitWebsite}
            >
              公式サイトを見る
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}