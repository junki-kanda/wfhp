import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, MapPin, TrendingUp, Shield } from 'lucide-react';
import { Button } from '../ui/button';

import { NavigateFn } from '../../types/navigation';

interface HeroProps {
  setCurrentPage: NavigateFn;
}

export function Hero({ setCurrentPage }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "眠っている不動産を",
      subtitle: "収益性の高い資産に変える",
      description: "別荘・宿泊施設として高収益を実現し、オーナー様ご自身でもご利用いただける、新しい不動産活用の形をご提案します。",
      imagePath: "images/hero/villa1.jpg",
      cta: "無料相談を申し込む",
      ctaSecondary: "成功事例を見る",
      primaryAction: () => setCurrentPage('contact', { contactTab: 'consultation' }),
      secondaryAction: () => setCurrentPage('cases'),
      benefits: [
        { icon: TrendingUp, text: "高収益・安定稼働" },
        { icon: MapPin, text: "オーナー様の別荘利用も可能" },
        { icon: Shield, text: "実需販売でリスクヘッジ" }
      ]
    },
    {
      id: 2,
      title: "軽井沢エリアの",
      subtitle: "別荘物件活用のプロ",
      description: "軽井沢をはじめとするリゾート地での豊富な実績。遊休別荘を収益物件として蘇らせ、資産価値を最大化します。",
      imagePath: "images/hero/karuizawa-nature.jpg",
      cta: "無料相談を申し込む",
      ctaSecondary: "軽井沢での実績を見る",
      primaryAction: () => setCurrentPage('contact', { contactTab: 'consultation' }),
      secondaryAction: () => setCurrentPage('cases'),
      benefits: [
        { icon: MapPin, text: "軽井沢での豊富な実績" },
        { icon: TrendingUp, text: "平均稼働率85%以上" },
        { icon: Shield, text: "長期安定収益の確保" }
      ]
    },
    {
      id: 3,
      title: "企画・開発・運営まで",
      subtitle: "ワンストップでサポート",
      description: "宿泊施設のコンセプト設計から開発、運営、マーケティングまで。お客様の手間を最小限に、収益を最大限に。",
      imagePath: "images/hero/luxury-villa.jpg",
      cta: "無料相談を申し込む",
      ctaSecondary: "サービス詳細を見る",
      primaryAction: () => setCurrentPage('contact', { contactTab: 'consultation' }),
      secondaryAction: () => setCurrentPage('services'),
      benefits: [
        { icon: TrendingUp, text: "企画から運営まで一貫サポート" },
        { icon: MapPin, text: "オーナー様の負担を最小化" },
        { icon: Shield, text: "プロによる安心管理" }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide 
              ? 'opacity-100 pointer-events-auto z-10' 
              : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.imagePath}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl">
                  <div className="space-y-8 text-white">
                    {/* Main Title */}
                    <div className="space-y-3">
                      <div className="inline-flex items-center bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-accent" />
                        リゾート地別荘・遊休地活用のスペシャリスト
                      </div>
                      <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-tight">
                        {slide.title}
                        <br />
                        <span className="text-accent">{slide.subtitle}</span>
                      </h1>
                    </div>
                    
                    <p className="text-lg md:text-xl max-w-4xl leading-relaxed text-gray-100 whitespace-normal">
                      {slide.description}
                    </p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      {slide.benefits.map((benefit, idx) => {
                        const Icon = benefit.icon;
                        return (
                          <div key={idx} className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Icon className="w-4 h-4 mr-2 text-accent" />
                            <span className="text-sm font-medium">{benefit.text}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      {/* Primary CTA Button */}
                      <Button
                        size="lg"
                        className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-4 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl group relative z-20"
                        onClick={slide.primaryAction}
                      >
                        <span className="inline-block group-hover:scale-105 transition-transform duration-300">
                          {slide.cta}
                        </span>
                      </Button>

                      {/* Secondary Button */}
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary px-8 py-4 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl group relative z-20"
                        onClick={slide.secondaryAction}
                      >
                        <Play className="w-4 h-4 mr-2 inline-block group-hover:scale-110 group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="inline-block group-hover:scale-105 transition-transform duration-300">
                          {slide.ctaSecondary}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 hover:shadow-lg z-30"
        aria-label="前のスライド"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 hover:shadow-lg z-30"
        aria-label="次のスライド"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-accent scale-110 shadow-lg shadow-accent/50' 
                : 'bg-white/50 hover:bg-white/80 hover:scale-105'
            }`}
            aria-label={`スライド ${index + 1}へ移動`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-center z-30">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
          <p className="text-sm mt-2 text-gray-300">Scroll</p>
        </div>
      </div>
    </section>
  );
}