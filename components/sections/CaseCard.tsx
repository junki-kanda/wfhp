import { MapPin, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { type CaseItem } from '../../constants/cases';

interface CaseCardProps {
  caseItem: CaseItem;
}

export function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={caseItem.image}
          alt={caseItem.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-white">
            {caseItem.categoryLabel}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-700">
            {caseItem.duration}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2">
              {caseItem.title}
            </h3>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {caseItem.location}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {caseItem.period.split('〜')[0]}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {caseItem.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-red-600 mb-1">課題</h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {caseItem.challenge}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-600 mb-1">解決策</h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {caseItem.solution}
              </p>
            </div>
          </div>

          {/* Key Results */}
          <div>
            <h4 className="text-sm font-semibold text-green-600 mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              主な成果
            </h4>
            <div className="space-y-2">
              {caseItem.results.slice(0, 2).map((result, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">{result.metric}</span>
                    <span className="text-xs text-green-600 font-semibold">
                      {result.improvement}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Before: {result.before}</span>
                    <span>After: {result.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
            詳細を見る
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}