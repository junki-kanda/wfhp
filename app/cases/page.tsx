import { getCaseStudies } from '@/lib/api/strapi';
import CaseCard from '@/components/molecules/CaseCard';

export const revalidate = 3600;

export default async function CasesPage() {
  const response = await getCaseStudies();
  const cases = response.data.map(item => item.attributes);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            実績・事例
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            私たちのサービスにより成果を上げた事例をご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((cs, idx) => (
            <CaseCard key={idx} {...cs} />
          ))}
        </div>
      </div>
    </section>
  );
} 