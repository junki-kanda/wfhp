import { Job } from '@/lib/types';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="card flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
      <div className="text-sm text-gray-600 mb-4 space-y-1">
        <p className="flex items-center gap-2">
          <Briefcase size={16} className="text-primary flex-shrink-0" />
          {job.employmentType === 'full-time' && '正社員'}
          {job.employmentType === 'part-time' && 'パート・アルバイト'}
          {job.employmentType === 'contract' && '契約社員'}
          {job.employmentType === 'internship' && 'インターン'}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={16} className="text-primary flex-shrink-0" />
          {job.location}
        </p>
        {job.salary && (
          <p className="flex items-center gap-2">
            <DollarSign size={16} className="text-primary flex-shrink-0" />
            {job.salary.min ? `¥${job.salary.min.toLocaleString()}` : ''} ~
            {job.salary.max ? ` ¥${job.salary.max.toLocaleString()}` : ''}
            {job.salary.currency && ` (${job.salary.currency})`}
          </p>
        )}
      </div>
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {job.description}
      </p>
      <div className="mt-auto">
        <a href="#career-form" className="btn-primary btn-sm w-full text-center">
          詳細を見る・応募する
        </a>
      </div>
    </div>
  );
} 