import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Star, Bed, DollarSign } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function Counter({ end, duration = 2000, suffix = '', prefix = '', decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(easeOutQuart * end);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <div ref={ref} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
      {prefix}{formatNumber(count)}{suffix}
    </div>
  );
}

export function StatsCounter() {
  const stats = [
    {
      id: 1,
      icon: Bed,
      value: 2500,
      suffix: '+',
      label: '延べ宿泊組数',
      description: '豊富な宿泊施設の運営実績',
      decimals: 0
    },
    {
      id: 2,
      icon: Star,
      value: 4.7,
      suffix: '',
      label: 'Googleマップ 評価',
      description: '顧客から高い満足度を獲得',
      decimals: 1
    },
    {
      id: 3,
      icon: TrendingUp,
      value: 50,
      suffix: '%+',
      label: '稼働率',
      description: '年間通じて安定して高稼働を維持',
      decimals: 0
    },
    {
      id: 4,
      icon: DollarSign,
      value: 10,
      suffix: '万円+',
      label: '宿泊単価',
      description: '細やかなプライシングで高単価を獲得',
      decimals: 0
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            数字で見る
            <span className="text-primary">WisteriaForest</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            私たちの実績と信頼を数字でご紹介します。これらの数字は、お客様との信頼関係の証です。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-80 flex flex-col justify-between">
                  <div className="flex flex-col items-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-xl mb-6 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    
                    <div className="mb-4">
                      <Counter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2500}
                        decimals={stat.decimals}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-end flex-1">
                    <h3 className="font-heading text-xl font-semibold mb-2 text-gray-900">
                      {stat.label}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}