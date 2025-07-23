import type { Metadata } from 'next';
import { getJobs } from '@/lib/api/strapi';
import JobCard from '@/components/molecules/JobCard';
import CareerForm from '@/components/organisms/CareerForm';

export const metadata: Metadata = {
  title: '採用情報 | WisteriaForest',
  description: 'WisteriaForestの採用情報ページ。募集職種一覧とエントリーフォーム。',
};

export default async function CareersPage() {
  const response = await getJobs();
  const jobs = response.data.map(item => item.attributes);

  return (
    <>
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center mb-8">
            現在募集中の職種
          </h2>
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job, idx) => (
                <JobCard key={idx} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              現在、募集中の職種はありません。
            </p>
          )}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <CareerForm />
        </div>
      </section>
    </>
  );
} 