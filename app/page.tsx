import Hero from '@/components/organisms/Hero';
import StatsSection from '@/components/organisms/StatsSection';
import ServicesOverview from '@/components/organisms/ServicesOverview';
import CaseStudiesCarousel from '@/components/organisms/CaseStudiesCarousel';
import ProcessSection from '@/components/organisms/ProcessSection';
import CTASection from '@/components/organisms/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesOverview />
      <CaseStudiesCarousel />
      <ProcessSection />
      <CTASection />
    </>
  );
}
