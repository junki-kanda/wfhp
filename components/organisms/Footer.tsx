import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  サービス: [
    { label: '自社ブランド運営', href: '/services#own-brand' },
    { label: '外部運営受託', href: '/services#management' },
    { label: '料金プラン', href: '/services#pricing' },
  ],
  企業情報: [
    { label: '会社概要', href: '/company' },
    { label: '代表メッセージ', href: '/company#message' },
    { label: '採用情報', href: '/careers' },
  ],
  リソース: [
    { label: 'ブログ', href: '/blog' },
    { label: '実績・事例', href: '/cases' },
    { label: 'よくある質問', href: '/faq' },
  ],
  法的情報: [
    { label: 'プライバシーポリシー', href: '/privacy' },
    { label: '利用規約', href: '/terms' },
    { label: '特定商取引法', href: '/legal' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/wisteriaforest', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/wisteriaforest', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/wisteriaforest', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/wisteriaforest', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-serif font-bold text-white">
                  WisteriaForest
                </span>
              </Link>
              <p className="text-sm mb-4">
                軽井沢No.1バケーションレンタル運営会社
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-white font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 WisteriaForest. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/sitemap"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                サイトマップ
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
