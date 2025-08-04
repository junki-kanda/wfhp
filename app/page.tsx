'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports with SSR disabled for heavy components
const Hero = dynamic(() => import('@/components/organisms/Hero'), { 
  ssr: false,
  loading: () => <div className="h-screen animate-pulse bg-gray-100" />
});

const CaseStudiesCarousel = dynamic(() => import('@/components/organisms/CaseStudiesCarousel'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />
});

const ServicesOverview = dynamic(() => import('@/components/organisms/ServicesOverview'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-100" />
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <CaseStudiesCarousel />
    </>
  );
}