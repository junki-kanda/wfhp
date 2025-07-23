'use client';

import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { Stat } from '@/lib/types';

const stats: Stat[] = [
  {
    label: '総運営棟数',
    value: 47,
    suffix: '棟',
  },
  {
    label: '平均稼働率',
    value: 87.5,
    suffix: '%',
  },
  {
    label: 'ゲストレビュー平均',
    value: 4.8,
    suffix: '★',
  },
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            圧倒的な運営実績
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            軽井沢エリアで最も多くの高級バケーションレンタルを運営し、
            オーナー様の資産価値向上に貢献しています
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                {isVisible && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
