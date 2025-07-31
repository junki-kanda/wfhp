import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'ホーム', href: 'home' },
    { name: '支援内容', href: 'services' },
    { name: 'ブランド', href: 'cases' },
    { name: '会社情報', href: 'company' },
    { name: '採用情報', href: 'careers' },
  ];

  const handleNavClick = (href: string) => {
    setCurrentPage(href);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer space-x-2"
            onClick={() => handleNavClick('home')}
          >
            <img 
              src="/images/logo/logo.png" 
              alt="WisteriaForest" 
              className="h-10 w-auto"
            />
            <span className="font-heading text-xl text-black">WisteriaForest</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`
                  text-sm font-medium transition-colors hover:text-primary 
                  px-3 py-2 rounded-md
                  ${currentPage === item.href 
                    ? 'text-primary bg-primary/5' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {item.name}
              </button>
            ))}

            <Button 
              onClick={() => handleNavClick('contact')}
              className="bg-cta hover:bg-cta/90 text-white"
            >
              お問い合わせ
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] flex flex-col bg-white">
              <SheetHeader className="sr-only">
                <SheetTitle>ナビゲーションメニュー</SheetTitle>
                <SheetDescription>サイト内のページへのナビゲーションリンク</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full">
                {/* モバイルメニューのロゴ */}
                <div 
                  className="flex items-center cursor-pointer space-x-2 pb-6 border-b"
                  onClick={() => handleNavClick('home')}
                >
                  <img 
                    src="/images/logo/logo.png" 
                    alt="WisteriaForest" 
                    className="h-8 w-auto"
                  />
                  <span className="font-heading text-lg text-black">WisteriaForest</span>
                </div>
                
                {/* ナビゲーションメニュー */}
                <nav className="flex flex-col flex-1 py-6">
                  <div className="space-y-2">
                    {navigation.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={`
                          w-full text-left px-4 py-3 rounded-lg text-base font-medium 
                          transition-all duration-200 hover:bg-gray-50 hover:text-primary 
                          ${currentPage === item.href 
                            ? 'text-primary bg-primary/5 border-l-4 border-l-primary' 
                            : 'text-gray-700'
                          }
                        `}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                  
                  {/* お問い合わせボタンを下部に配置 */}
                  <div className="mt-auto pt-6 border-t">
                    <Button 
                      onClick={() => handleNavClick('contact')}
                      className="bg-cta hover:bg-cta/90 text-white w-full py-3 text-base font-medium"
                      size="lg"
                    >
                      お問い合わせ
                    </Button>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}