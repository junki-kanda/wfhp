import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/logo/logo.png"
                alt="WisteriaForest"
                width={40}
                height={40}
                className="brightness-0 invert"
              />
              <span className="font-heading text-xl">WisteriaForest</span>
            </div>
            <p className="text-sm text-gray-400">
              軽井沢No.1バケーションレンタル運営会社
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">サービス</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services">サービス一覧</Link></li>
              <li><Link href="/cases">導入事例</Link></li>
              <li><Link href="/company">会社情報</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">お問い合わせ</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/contact">お問い合わせフォーム</Link></li>
              <li><Link href="/careers">採用情報</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">リーガル</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy">プライバシーポリシー</Link></li>
              <li><Link href="/terms">利用規約</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} WisteriaForest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}