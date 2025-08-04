import { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Toaster } from './components/ui/sonner';
import { PageType, ContactTabType } from './types';
import { NavigateFn } from './types/navigation';

// Dynamic imports for heavy components
const Hero = lazy(() => import('./components/sections/Hero').then(module => ({ default: module.Hero })));
const StatsCounter = lazy(() => import('./components/sections/StatsCounter').then(module => ({ default: module.StatsCounter })));
const ServicesSection = lazy(() => import('./components/sections/ServicesSection').then(module => ({ default: module.ServicesSection })));
const KaruizawaHouseVillaSection = lazy(() => import('./components/sections/KaruizawaHouseVillaSection').then(module => ({ default: module.KaruizawaHouseVillaSection })));
const CTASection = lazy(() => import('./components/sections/CTASection').then(module => ({ default: module.CTASection })));

// Dynamic imports for page components
const ServicesPage = lazy(() => import('./components/pages/ServicesPage').then(module => ({ default: module.ServicesPage })));
const CasesPage = lazy(() => import('./components/pages/CasesPage').then(module => ({ default: module.CasesPage })));
const CompanyPage = lazy(() => import('./components/pages/CompanyPage').then(module => ({ default: module.CompanyPage })));
const CareersPage = lazy(() => import('./components/pages/CareersPage').then(module => ({ default: module.CareersPage })));
const BlogPage = lazy(() => import('./components/pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import('./components/pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const ContactPage = lazy(() => import('./components/pages/ContactPage').then(module => ({ default: module.ContactPage })));
const BookmarksPage = lazy(() => import('./components/pages/BookmarksPage').then(module => ({ default: module.BookmarksPage })));
const PrivacyPolicyPage = lazy(() => import('./components/pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./components/pages/TermsOfServicePage').then(module => ({ default: module.TermsOfServicePage })));
const AdminPage = lazy(() => import('./components/pages/AdminPage').then(module => ({ default: module.AdminPage })));



export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [contactDefaultTab, setContactDefaultTab] = useState<ContactTabType>('consultation');
  const [currentPostId, setCurrentPostId] = useState<string>('');

  // ページ遷移時にページトップにスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSetCurrentPage: NavigateFn = (page, options) => {
    setCurrentPage(page);
    if (page === 'contact' && options?.contactTab) {
      setContactDefaultTab(options.contactTab);
    }
    if (page === 'blog-post' && options?.postId) {
      setCurrentPostId(options.postId);
    }
  };

  const handleNavigateToBlogPost = (postId: string) => {
    setCurrentPostId(postId);
    setCurrentPage('blog-post');
  };

  const handleNavigateBackToBlog = () => {
    setCurrentPage('blog');
  };

  const handleNavigateToContact = () => {
    setCurrentPage('contact');
  };

  const handleNavigateToBookmarks = () => {
    setCurrentPage('bookmarks');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return <ServicesPage setCurrentPage={handleSetCurrentPage} />;
      case 'cases':
        return <CasesPage />;
      case 'company':
        return <CompanyPage setCurrentPage={handleSetCurrentPage} />;
      case 'careers':
        return <CareersPage />;
      case 'blog':
        return <BlogPage onNavigateToPost={handleNavigateToBlogPost} onNavigateToBookmarks={handleNavigateToBookmarks} />;
      case 'blog-post':
        return <BlogPostPage postId={currentPostId} onNavigateBack={handleNavigateBackToBlog} onNavigateToPost={handleNavigateToBlogPost} onNavigateToContact={handleNavigateToContact} onNavigateToBookmarks={handleNavigateToBookmarks} />;
      case 'bookmarks':
        return <BookmarksPage onNavigateBack={handleNavigateBackToBlog} onNavigateToPost={handleNavigateToBlogPost} />;
      case 'contact':
        return <ContactPage defaultTab={contactDefaultTab} setCurrentPage={handleSetCurrentPage} />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'admin':
        return <AdminPage />;
      default:
        return (
          <>
            <Hero setCurrentPage={handleSetCurrentPage} />
            <StatsCounter />
            <ServicesSection setCurrentPage={handleSetCurrentPage} />
            <KaruizawaHouseVillaSection setCurrentPage={handleSetCurrentPage} />
            <CTASection setCurrentPage={handleSetCurrentPage} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      <Toaster richColors position="top-right" />
    </div>
  );
}