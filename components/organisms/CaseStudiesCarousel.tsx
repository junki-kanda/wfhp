'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { getCaseStudies } from '@/lib/api/strapi';
import { CaseStudy, StrapiItem } from '@/lib/types';
import CaseCard from '@/components/molecules/CaseCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const mockCases: Partial<CaseStudy>[] = [
  {
    title: '築40年の別荘をラグジュアリーヴィラへ',
    clientName: 'A様',
    propertyType: '一戸建て',
    location: '軽井沢町南ヶ丘',
    beforeStats: {
      occupancyRate: 15,
      averageRevenue: 80000,
      guestRating: 3.5,
    },
    afterStats: {
      occupancyRate: 85,
      averageRevenue: 350000,
      guestRating: 4.9,
    },
    clientTestimonial:
      '使わなくなっていた別荘が、WisteriaForestさんの手で生まれ変わりました。収益も想像以上です。',
  },
  {
    title: '新築ヴィラの運営最適化',
    clientName: 'B様',
    propertyType: 'ヴィラ',
    location: '軽井沢町中軽井沢',
    beforeStats: {
      occupancyRate: 45,
      averageRevenue: 200000,
      guestRating: 4.0,
    },
    afterStats: {
      occupancyRate: 92,
      averageRevenue: 450000,
      guestRating: 4.95,
    },
    clientTestimonial:
      'プロの運営により、稼働率が倍以上に。ゲストからの評価も素晴らしいです。',
  },
  {
    title: 'ペンション型施設のリブランディング',
    clientName: 'C様',
    propertyType: 'ペンション',
    location: '軽井沢町追分',
    beforeStats: {
      occupancyRate: 30,
      averageRevenue: 120000,
      guestRating: 3.8,
    },
    afterStats: {
      occupancyRate: 78,
      averageRevenue: 380000,
      guestRating: 4.85,
    },
    clientTestimonial:
      '古いペンションが高級宿泊施設に。ブランディングの力を実感しました。',
  },
];

export default function CaseStudiesCarousel() {
  const [cases, setCases] = useState<Partial<CaseStudy>[]>(mockCases);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const response = await getCaseStudies(1, 6);
        if (response.data.length > 0) {
          setCases(response.data.map((item) => item.attributes));
        }
      } catch (error) {
        console.error('Failed to fetch case studies:', error);
        // モックデータを使用
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            成功事例
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            WisteriaForestの運営により、多くの物件が収益性を大幅に向上させています
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="case-carousel">
            <Slider {...settings}>
              {cases.map((caseStudy, index) => (
                <div key={index} className="px-4">
                  <CaseCard caseStudy={caseStudy} />
                </div>
              ))}
            </Slider>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/cases"
            className="btn-secondary btn-md inline-flex items-center gap-2"
          >
            すべての事例を見る
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
