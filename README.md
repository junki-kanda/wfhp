# WisteriaForest Corporate Website

## プロジェクト概要

Vite + React + TypeScript + Tailwind CSS + shadcn/ui を使用して構築された、株式会社 WisteriaForest のシングルページアプリケーション（SPA）企業サイトです。軽井沢の高級ヴィラ事業を中心に、AI開発、不動産コンサルティング、スタートアップ支援などの事業を紹介しています。

## 技術スタック

- **フレームワーク**: React 18.2 + TypeScript 5.3
- **ビルドツール**: Vite 6.3
- **スタイリング**: Tailwind CSS 3.3 + Tailwind Animate
- **UIコンポーネント**: Radix UI + shadcn/ui
- **フォーム**: React Hook Form 7.48 + Zod
- **ルーティング**: React Router DOM 6.20
- **バックエンド**: Supabase (認証・ストレージ・データベース)
- **その他**: Lucide React (アイコン)、Sonner (トースト通知)、Recharts (チャート)

## プロジェクト構成

```
wf-hp/
├── app/                    # Next.js互換のページ構造（未使用）
├── components/            
│   ├── ui/                # shadcn/ui コンポーネント
│   ├── forms/             # フォームコンポーネント
│   ├── layout/            # ヘッダー・フッター
│   ├── molecules/         # 中規模コンポーネント
│   ├── organisms/         # 大規模コンポーネント
│   ├── pages/             # ページコンポーネント
│   └── sections/          # セクションコンポーネント
├── lib/                   
│   ├── supabase.ts        # Supabase クライアント
│   └── utils/             # ユーティリティ関数
├── public/                
│   └── images/            # 画像アセット
├── styles/                
│   └── globals.css        # グローバルスタイル
├── App.tsx                # メインアプリケーションコンポーネント
├── main.tsx               # エントリーポイント
└── index.html             # HTMLテンプレート
```

## 主な機能

### ページ構成（SPA内部ルーティング）
- **ホーム**: ヒーロー、統計、サービス概要、軽井沢ヴィラ紹介、CTA
- **サービス**: 4つの事業領域の詳細（宿泊施設運営、AI開発、不動産コンサルティング、スタートアップ支援）
- **事例**: 実績・プロジェクト紹介
- **会社情報**: 代表メッセージ、企業理念、沿革、チーム紹介
- **採用情報**: 募集職種一覧、エントリーフォーム
- **ブログ**: 記事一覧、個別記事、ブックマーク機能
- **お問い合わせ**: タブ切り替え式フォーム（相談・資料請求・採用）
- **管理画面**: コンテンツ管理機能

### 技術的特徴
- **レスポンシブデザイン**: モバイル、タブレット、デスクトップ対応
- **画像最適化**: Supabase Storage との連携
- **フォームバリデーション**: Zod スキーマによる型安全なバリデーション
- **状態管理**: React フックによるローカルステート管理
- **アニメーション**: Tailwind Animate による洗練されたUI

## 開発環境のセットアップ

### 前提条件
- Node.js 18以上
- npm または pnpm

### インストール手順

1. **リポジトリのクローン**
   ```bash
   git clone [your-repository-url]
   cd wf-hp
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   # または
   pnpm install
   ```

3. **環境変数の設定**
   `.env.local` ファイルを作成し、以下の環境変数を設定：
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   # または
   pnpm dev
   ```
   
   http://localhost:5173 でアプリケーションにアクセスできます。

## ビルドとデプロイ

### ビルド
```bash
npm run build
# または
pnpm build
```

### プレビュー
```bash
npm run preview
# または
pnpm preview
```

### 型チェック
```bash
npm run type-check
# または
pnpm type-check
```

### Lint
```bash
npm run lint
# または
pnpm lint
```

## Supabase設定

1. **プロジェクトの作成**
   - [Supabase](https://supabase.com) でプロジェクトを作成
   - プロジェクトURL と Anon Key を取得

2. **ストレージバケットの設定**
   - `images` バケットを作成
   - パブリックアクセスを許可

3. **データベーステーブル（必要に応じて）**
   - ブログ記事、事例、採用情報などのテーブルを作成

## デプロイ

### Vercel
```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

### Netlify
1. GitHub リポジトリと連携
2. ビルドコマンド: `npm run build`
3. 公開ディレクトリ: `dist`
4. 環境変数を設定

## 開発ガイドライン

### コーディング規約
- TypeScript の strict モードを使用
- ESLint ルールに従う
- コンポーネントは関数コンポーネントで記述
- カスタムフックは `use` プレフィックスを使用

### コンポーネント構成
- **ui/**: 再利用可能な基本UIコンポーネント（shadcn/ui）
- **molecules/**: 複数のUIコンポーネントを組み合わせた中規模コンポーネント
- **organisms/**: ビジネスロジックを含む大規模コンポーネント
- **sections/**: ページ内のセクション単位のコンポーネント
- **pages/**: 各ページの実装

### スタイリング
- Tailwind CSS のユーティリティクラスを優先使用
- カスタムスタイルは `globals.css` に記述
- レスポンシブデザインは Tailwind のブレークポイントを使用

## トラブルシューティング

### パッケージの競合
package.json に Git のマージコンフリクトが残っている場合は、手動で解決してください。

### 型エラー
`npm run type-check` で型エラーを確認し、修正してください。

### ビルドエラー
1. `node_modules` と `pnpm-lock.yaml` を削除
2. 再度 `pnpm install` を実行

## ライセンス

Private - All rights reserved

## お問い合わせ

株式会社 WisteriaForest
- Email: info@wisteriaforest.com
- Website: https://wisteriaforest.com
