import { TrendingUp, Star, Calendar } from 'lucide-react';
import { CaseStudy } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface CaseCardProps {
  caseStudy: Partial<CaseStudy>;
}

export default function CaseCard({ caseStudy }: CaseCardProps) {
  const {
    title,
    clientName,
    propertyType,
    location,
    beforeStats,
    afterStats,
    clientTestimonial,
  } = caseStudy;

  const occupancyImprovement = afterStats && beforeStats 
    ? ((afterStats.occupancyRate - beforeStats.occupancyRate) / beforeStats.occupancyRate * 100).toFixed(0)
    : '0';

  const revenueImprovement = afterStats && beforeStats
    ? ((afterStats.averageRevenue - beforeStats.averageRevenue) / beforeStats.averageRevenue * 100).toFixed(0)
    : '0';

  return (
    <div className="card h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{propertyType}</span>
          <span>•</span>
          <span>{location}</span>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="space-y-4 mb-6 flex-1">
        {/* 稼働率 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">稼働率</span>
            <span className="text-sm font-medium text-cta">
              +{occupancyImprovement}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-400 h-2 rounded-full"
                style={{ width: `${beforeStats?.occupancyRate || 0}%` }}
              />
            </div>
            <span className="text-sm text-gray-500">
              {beforeStats?.occupancyRate || 0}%
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${afterStats?.occupancyRate || 0}%` }}
              />
            </div>
            <span className="text-sm font-medium text-primary">
              {afterStats?.occupancyRate || 0}%
            </span>
          </div>
        </div>

        {/* 平均売上 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">平均月売上</span>
            <span className="text-sm font-medium text-cta">
              +{revenueImprovement}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              ¥{formatNumber(beforeStats?.averageRevenue || 0)}
            </span>
            <TrendingUp className="w-4 h-4 text-cta" />
            <span className="text-lg font-bold text-primary">
              ¥{formatNumber(afterStats?.averageRevenue || 0)}
            </span>
          </div>
        </div>

        {/* ゲスト評価 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">ゲスト評価</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">
                {afterStats?.guestRating || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 italic">
          "{clientTestimonial}"
        </p>
        <p className="text-sm text-gray-500 mt-2">- {clientName}</p>
      </div>
    </div>
  );
}
