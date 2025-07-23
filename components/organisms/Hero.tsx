'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    image: '/placeholder.jpg',
    alt: '軽井沢の四季 - 春',
    season: '春',
  },
  {
    image: '/placeholder.jpg',
    alt: '軽井沢の四季 - 夏',
    season: '夏',
  },
  {
    image: '/placeholder.jpg',
    alt: '軽井沢の四季 - 秋',
    season: '秋',
  },
  {
    image: '/placeholder.jpg',
    alt: '軽井沢の四季 - 冬',
    season: '冬',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 animate-fade-in">
          軽井沢No.1<br />
          バケーションレンタル運営カンパニーへ
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
          自社ブランド×外部運営受託で、資産価値とゲスト体験を最大化
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link
            href="/contact?type=consultation"
            className="btn-cta btn-lg flex items-center gap-2"
          >
            開業相談する
            <ChevronRight size={20} />
          </Link>
          <Link
            href="/contact?type=management"
            className="btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary"
          >
            物件運営を任せる
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              currentSlide === index
                ? 'w-8 bg-white'
                : 'bg-white/50 hover:bg-white/75'
            )}
            aria-label={`スライド ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-xs mb-2">SCROLL</span>
          <div className="w-[1px] h-12 bg-white/50" />
        </div>
      </div>
    </section>
  );
}
