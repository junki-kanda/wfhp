import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { StatsCounter } from './components/sections/StatsCounter';
import { ServicesSection } from './components/sections/ServicesSection';
import { KaruizawaHouseVillaSection } from './components/sections/KaruizawaHouseVillaSection';
import { CTASection } from './components/sections/CTASection';
import { ContactForm } from './components/forms/ContactForm';
import { ServicesPage } from './components/pages/ServicesPage';
import { CasesPage } from './components/pages/CasesPage';
import { CompanyPage } from './components/pages/CompanyPage';
import { CareersPage } from './components/pages/CareersPage';
import { BlogPage } from './components/pages/BlogPage';
import { BlogPostPage } from './components/pages/BlogPostPage';
import { ContactPage } from './components/pages/ContactPage';
import { BookmarksPage } from './components/pages/BookmarksPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/pages/TermsOfServicePage';
import { AdminPage } from './components/pages/AdminPage';
import { Toaster } from './components/ui/sonner';

type PageType = 'home' | 'services' | 'cases' | 'company' | 'careers' | 'blog' | 'blog-post' | 'bookmarks' | 'contact' | 'privacy' | 'terms' | 'admin';
type ContactTabType = 'consultation' | 'download' | 'career';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [contactDefaultTab, setContactDefaultTab] = useState<ContactTabType>('consultation');
  const [currentPostId, setCurrentPostId] = useState<string>('');

  // ページ遷移時にページトップにスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSetCurrentPage = (page: PageType, options?: { contactTab?: ContactTabType; postId?: string }) => {
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
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      <Toaster richColors position="top-right" />
    </div>
  );
}