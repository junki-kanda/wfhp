import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'WisteriaForest - 軽井沢No.1バケーションレンタル運営会社',
    template: '%s | WisteriaForest',
  },
  description:
    '自社ブランド×外部運営受託で、資産価値とゲスト体験を最大化。軽井沢の高級バケーションレンタル運営のプロフェッショナル。',
  keywords: [
    '軽井沢',
    'バケーションレンタル',
    '民泊運営',
    '別荘管理',
    'WisteriaForest',
    '運営代行',
    'Airbnb',
  ],
  authors: [{ name: 'WisteriaForest' }],
  creator: 'WisteriaForest',
  publisher: 'WisteriaForest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'WisteriaForest - 軽井沢No.1バケーションレンタル運営会社',
    description:
      '自社ブランド×外部運営受託で、資産価値とゲスト体験を最大化。軽井沢の高級バケーションレンタル運営のプロフェッショナル。',
    url: 'https://wisteriaforest.com',
    siteName: 'WisteriaForest',
    images: [
      {
        url: 'https://wisteriaforest.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WisteriaForest',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WisteriaForest - 軽井沢No.1バケーションレンタル運営会社',
    description:
      '自社ブランド×外部運営受託で、資産価値とゲスト体験を最大化。',
    images: ['https://wisteriaforest.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* Plausible Analytics */}
        {process.env.PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
