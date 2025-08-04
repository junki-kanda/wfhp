import { ArrowRight, MapPin, Wifi, Car, Coffee, Bath, Mountain, Trees, Star, Users, Calendar, Camera, ChevronLeft, ChevronRight, UtensilsCrossed, Video, PawPrint } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';

import { NavigateFn } from '../../types/navigation';

interface CasesPageProps {
  setCurrentPage?: NavigateFn;
}

export function CasesPage({ setCurrentPage }: CasesPageProps) {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // ———————————————————————
  // REAL DATA FOR KARUIZAWA HOUSE VILLAS
  // ———————————————————————

  const facilityFeatures = [
    {
      icon: Mountain,
      title: '浅間山ビュー',
      description: '全棟から雄大な浅間山を望む絶景。時間ごとに表情を変える山並みが滞在に彩りを添えます。'
    },
    {
      icon: Bath,
      title: 'サウナ & 檜風呂',
      description: 'プライベートサウナや檜風呂・ジャグジーバスなど、各棟にこだわりのウェルネス設備を完備。'
    },
    {
      icon: Trees,
      title: '1,500坪の森',
      description: 'カラマツ林に囲まれた静寂の敷地。春の新緑から冬の雪景色まで四季折々の自然を独り占め。'
    },
    {
      icon: Coffee,
      title: '一棟貸しプライバシー',
      description: '最大13名まで宿泊可能。グループやペット連れでも周囲を気にせず過ごせる完全貸切スタイル。'
    }
  ];

  const rooms = [
    {
      id: 1,
      name: 'ハウスヴィラ A棟',
      type: '薪ストーブ付ラグジュアリー',
      capacity: '12名',
      size: '184㎡',
      features: ['薪ストーブ', 'プロジェクター', 'ガスオーブン', 'ウッドデッキ'],
      image: '/images/villas/villa-a.jpg',
      price: '¥54,450〜/泊'
    },
    {
      id: 2,
      name: 'ハウスヴィラ B棟',
      type: 'サウナ付ラグジュアリー',
      capacity: '11名',
      size: '127㎡',
      features: ['プライベートサウナ', 'ジャグジーバス', '薪ストーブ', '床暖房'],
      image: '/images/villas/villa-b-sauna.jpg',
      price: '¥66,550〜/泊'
    },
    {
      id: 3,
      name: '別邸 平屋棟',
      type: 'バリアフリー',
      capacity: '11名',
      size: '128㎡',
      features: ['段差ゼロ設計', 'ジャグジーバス', '薪ストーブ', '浅間山ビュー'],
      image: '/images/villas/villa-flat.jpg',
      price: '¥66,550〜/泊'
    },
    {
      id: 4,
      name: '別邸 サウナ棟',
      type: 'サウナ & 水風呂',
      capacity: '13名',
      size: '135㎡',
      features: ['プライベートサウナ', '水風呂', 'ジャグジーバス', '床暖房'],
      image: '/images/villas/villa-sauna.jpg',
      price: '¥70,000〜/泊'
    },
    {
      id: 5,
      name: '別邸 足湯棟',
      type: '足湯付き',
      capacity: '13名',
      size: '137㎡',
      features: ['足湯ウッドデッキ', 'ジャグジーバス', '薪ストーブ', 'BBQグリル'],
      image: '/images/villas/villa-ashiyu.jpg',
      price: '¥66,550〜/泊'
    },
    {
      id: 6,
      name: '別邸 檜風呂棟',
      type: '檜風呂ヴィラ',
      capacity: '13名',
      size: '137㎡',
      features: ['檜風呂', 'ジャグジーバス', '薪ストーブ', 'ウッドデッキ'],
      image: '/images/villas/villa-hinoki.jpg',
      price: '¥70,000〜/泊'
    }
  ];

  const amenities = [
    { icon: Wifi, name: '無料Wi‑Fi' },
    { icon: Car, name: '駐車場 3 台/棟' },
    { icon: Bath, name: 'サウナ・檜風呂' },
    { icon: UtensilsCrossed, name: 'フルキッチン & BBQ' },
    { icon: Video, name: 'プロジェクター/シアター' },
    { icon: PawPrint, name: 'ペット同伴可棟' }
  ];

  const galleryImages = [
    '/images/villas/gallery/1-exterior-01.jpeg',
    '/images/villas/gallery/2-living-01.jpeg',
    '/images/villas/gallery/2-living-02.jpeg',
    '/images/villas/gallery/2-living-04.jpeg',
    '/images/villas/gallery/2-living-05.jpeg',
    '/images/villas/gallery/2-living-11.jpeg',
    '/images/villas/gallery/2-living-12.jpeg',
    '/images/villas/gallery/3-bedroom-01.jpeg',
    '/images/villas/gallery/3-bedroom-02.jpeg',
    '/images/villas/gallery/3-bedroom-06.jpeg',
    '/images/villas/gallery/3-bedroom-07.jpeg',
    '/images/villas/gallery/4-terrace-01.jpeg',
    '/images/villas/gallery/4-terrace-04.jpeg',
    '/images/villas/gallery/5-sauna-01.jpeg',
    '/images/villas/gallery/5-sauna-02.jpeg',
    '/images/villas/gallery/6-ashiyu-01.jpeg',
    '/images/villas/gallery/6-ashiyu-02.jpeg',
    '/images/villas/gallery/7-bath-01.jpeg',
    '/images/villas/gallery/7-bath-02.jpeg',
    '/images/villas/gallery/7-hinoki-01.jpeg'
  ];

  const testimonials = [
    {
      name: 'Yahoo!トラベルユーザー',
      location: '',
      rating: 5,
      comment: '素敵な家に心奪われました。全ての部屋の掃除も行き届いており大満足◯家のストーブの使い方で電話をしましたが、わかりやすく対応していただき助かりました。虫を心配しましたが、季節的によかったのか被害に合わずにすみました。また軽井沢に来る機会があったら利用したいです。(他のシリーズの家も)',
      date: '2024年10月'
    },
    {
      name: '一休ユーザー',
      location: '',
      rating: 5,
      comment: '昨年に引き続き今年も利用させていただきました。今回は平屋棟。小さい子供がいるため、バリアフリーの平家棟は安心安全でした。清潔感溢れるお部屋。キッチン周りも完備されていて、とても使いやすかったです。今回も早めにチェックインさせていただいて感謝しています。また来年利用させていただきます。次はどのタイプの部屋に宿泊するか、今から楽しみです。',
      date: '2024年10月'
    },
    {
      name: '一休ユーザー',
      location: '',
      rating: 5,
      comment: '急な予約でしたが、とても丁寧な対応に感謝致します。BBQの相談も親切にご連絡をいただきおかげさまで、無事にお庭でBBQをすることが出来ました。ありがとうございました。お部屋もとても広く清潔で、家族がのびのびと快適に過ごすことが出来てとても良かったです。次回は連泊したいと思ってます。',
      date: '2024年8月'
    }
  ];

  const handleVillaBookingClick = () => {
    // 軽井沢ハウスヴィラの公式HPに遷移
    window.open('https://karuizawa-house-villa.com/', '_blank');
  };

  const handleRoomDetailClick = () => {
    // 軽井沢ハウスヴィラの客室ページに遷移
    window.open('https://karuizawa-house-villa.com/room', '_blank');
  };

  const nextImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary via-primary/95 to-accent text-white overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/hero/karuizawa-nature.jpg"
            alt="軽井沢の自然"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Mountain className="w-4 h-4 mr-2" />
              軽井沢プレミアムリゾート
            </div>
            <h1 className="font-heading text-4xl md:text-6xl leading-tight mb-6">
              軽井沢ハウスヴィラ
              <span className="text-accent block">森に溶け込む 6 棟のプライベートヴィラ</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-white/90">
              薪ストーブやプライベートサウナ、ジャグジーなど多彩な設備と<br />
              四季折々の大自然に包まれた極上ステイをお届けします。
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-4 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl group"
                onClick={handleVillaBookingClick}
              >
                <span className="inline-block group-hover:scale-105 transition-transform duration-300">
                  宿泊予約・お問い合わせ
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Concept */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-6">ブランドコンセプト</h2>
            <div className="text-lg leading-relaxed text-gray-600 space-y-4">
              <p>軽井沢ハウスヴィラは、「自然との調和」をテーマに森の中に佇む贅沢な一棟貸しヴィラです。</p>
              <p>都市の喧騒を離れて大切な方と過ごすためのプライバシーを最優先。薪ストーブの炎やサウナでの"ととのい"体験など、心と体を解き放つ滞在を提供します。</p>
              <p>檜風呂・ジャグジー・足湯・水風呂など、それぞれ個性豊かな 6 棟からお選びいただけます。</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">客室タイプ</h2>
            <p className="text-lg text-gray-600">6 棟それぞれが唯一無二の個性を持つプライベートヴィラ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Card key={room.id} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <ImageWithFallback src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-white">{room.type}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{room.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {room.capacity} • {room.size}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">{room.price}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">特徴・設備</h4>
                      <div className="flex flex-wrap gap-2">
                        {room.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full bg-cta hover:bg-cta/90 text-white" onClick={handleRoomDetailClick}>
                      詳細・予約
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">フォトギャラリー</h2>
            <p className="text-lg text-gray-600">軽井沢ハウスヴィラの魅力を写真でご覧ください</p>
          </div>

          <div className="w-full">
            <div className="relative">
              <div className="relative h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
                <ImageWithFallback src={galleryImages[currentGalleryIndex]} alt={`ギャラリー画像 ${currentGalleryIndex + 1}`} className="w-full h-full object-contain bg-black" />
                <div className="absolute inset-0 bg-black bg-opacity-0" />

                {/* Navigation Buttons */}
                <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {galleryImages.map((_, index) => (
                    <button key={index} onClick={() => setCurrentGalleryIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentGalleryIndex ? 'bg-white' : 'bg-white/50'}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 mt-4 max-w-6xl mx-auto">
              {galleryImages.map((image, index) => (
                <button key={index} onClick={() => setCurrentGalleryIndex(index)} className={`relative h-12 md:h-16 rounded-lg overflow-hidden transition-opacity ${index === currentGalleryIndex ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}>
                  <ImageWithFallback src={image} alt={`サムネイル ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 md:py-24 bg-gradient-primary-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">設備・アメニティ</h2>
            <p className="text-lg text-gray-600">快適な滞在のための充実した設備をご用意</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{amenity.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl mb-6">ロケーション・アクセス</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">所在地</h3>
                    <p className="text-gray-600 mb-2">長野県北佐久郡軽井沢町長倉 5575‑8（管理棟）</p>
                    <a 
                      href="https://maps.app.goo.gl/guJAsGaKdcGkJe889" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm underline"
                    >
                      Google Mapで詳細を見る
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Car className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">アクセス</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>• 東京駅→軽井沢駅 新幹線で約 1 時間</p>
                      <p>• 軽井沢駅から車・タクシーで約 8 分</p>
                      <p>• 碓氷軽井沢 IC から車で約 25 分</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mountain className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">周辺環境</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>• 軽井沢プリンスショッピングプラザ 車 10 分</p>
                      <p>• 旧軽井沢銀座 車 12 分</p>
                      <p>• 白糸の滝 車 25 分</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.4820352253455!2d138.55477627639345!3d36.34910137237928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601dcda9c55323b7%3A0xef3234e694983f3c!2z6Lu95LqV5rKi44OP44Km44K544O844Kj44Op!5e0!3m2!1sja!2sjp!4v1753404616601!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="軽井沢ハウスヴィラの場所"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">お客様の声</h2>
            <p className="text-lg text-gray-600">軽井沢ハウスヴィラでの体験談をご紹介します</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, idx) => <Star key={idx} className="w-4 h-4 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow">"{testimonial.comment}"</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                    <p className="text-xs text-gray-400">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">軽井沢で特別な時間を過ごしませんか？</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            プライベートサウナや檜風呂など、多彩なウェルネス設備と大自然に囲まれた贅沢な滞在。
            ご予約・お問い合わせはお気軽にどうぞ。
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-4 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl group"
              onClick={handleVillaBookingClick}
            >
              <span className="inline-block group-hover:scale-105 transition-transform duration-300">宿泊予約・お問い合わせ</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}