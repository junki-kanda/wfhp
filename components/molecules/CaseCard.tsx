import { Card } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';

interface CaseCardProps {
  title: string;
  clientName: string;
  propertyType: string;
  location: string;
  beforeStats: {
    occupancyRate: number;
    averageRevenue: number;
    guestRating: number;
  };
  afterStats: {
    occupancyRate: number;
    averageRevenue: number;
    guestRating: number;
  };
  clientTestimonial?: string;
}

export default function CaseCard({
  title,
  clientName,
  propertyType,
  location,
  beforeStats,
  afterStats,
  clientTestimonial,
}: CaseCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-600">{clientName}</p>
        <p className="text-sm text-gray-600">{propertyType} • {location}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">導入前</p>
          <p className="text-sm">稼働率: {beforeStats.occupancyRate}%</p>
          <p className="text-sm">平均収益: ¥{beforeStats.averageRevenue.toLocaleString()}</p>
          <p className="text-sm">評価: {beforeStats.guestRating}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">導入後</p>
          <p className="text-sm font-bold text-green-600">稼働率: {afterStats.occupancyRate}%</p>
          <p className="text-sm font-bold text-green-600">平均収益: ¥{afterStats.averageRevenue.toLocaleString()}</p>
          <p className="text-sm font-bold text-green-600">評価: {afterStats.guestRating}</p>
        </div>
      </div>
      
      {clientTestimonial && (
        <blockquote className="text-sm italic text-gray-600 border-l-2 border-gray-300 pl-4">
          "{clientTestimonial}"
        </blockquote>
      )}
      
      <button className="mt-4 text-sm text-primary hover:text-primary/80 flex items-center gap-1">
        詳細を見る <ArrowUpRight className="w-4 h-4" />
      </button>
    </Card>
  );
}