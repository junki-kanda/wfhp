# WisteriaForest Corporate Website

## プロジェクト概要

Next.js 14 (App Router), TypeScript, Tailwind CSS を使用して構築された、株式会社 WisteriaForest のレスポンシブ企業サイトです。静的ページと SSR ページが混在し、Strapi CMS と連携してコンテンツを管理します。

## 成果物

1.  **Git リポジトリ構造**: `npx create-next-app@latest --typescript` を前提とした構造。
2.  **ソースコード**: 各ページの完全な実装 (`app/`, `components/`, `lib/` など)。
3.  **`README.md`**: ローカル開発、本番デプロイ、CMS 連携手順。
4.  **API / 型定義**: Strapi との連携に必要な API クライアント (`lib/api/strapi.ts`) および型定義 (`lib/types/index.ts`)。
5.  **Tailwind 設定**: カラーパレット、フォントなどを含む `tailwind.config.ts`。
6.  **Strapi 用 Content-Type 定義 (JSON)**: `case`, `blog`, `job` などの定義ファイル。
7.  **フォーム送信ロジック**: Next.js API Route (`app/api/contact/route.ts`) を介した SendGrid または Slack Webhook 連携。

## 必須要件 (実装済み)

-   **グローバル設定**: フォント (`Playfair Display`, `Noto Sans JP`)、カラー変数 (`primary`, `accent`, `cta`)、Meta / SEO (Next.js Metadata API)、Analytics (Plausible)。
-   **ページ & ルーティング**:
    -   `/`: トップページ (ヒーロー、実績、サービス概要、事例、プロセス、CTA)
    -   `/services`: 事業紹介
    -   `/cases`: 実績・事例 (Strapi から SSG + ISR)
    -   `/company`: 会社情報 (代表メッセージ、沿革、SNS)
    -   `/careers`: 採用情報 (Strapi から募集一覧 + エントリーフォーム)
    -   `/blog/[slug]`: ブログ / コラム (Markdown 形式で Strapi から取得)
    -   `/contact`: 問い合わせフォーム (タブ切り替え: 開業相談 / 運営受託 / 採用)
-   **UI コンポーネント**: `components/` に Atomic Design 準拠 (Header, Hero, StatsCounter, CaseCardCarousel, ProcessStep, CTASection, Footer, Lucide React アイコン)。
-   **レスポンシブデザイン**: Tailwind のコンテナ/列ユーティリティ (`Desktop ≥1024px: 12 列`, `Tablet 768–1023px: 8 列`, `Mobile ≤767px: 4 列`)、`next/image` + WebP、自動 Sizing。
-   **フォーム仕様**: 共通バリデーション (React Hook Form + Zod)、ファイル添付、SendGrid/Slack Webhook連携。
-   **CMS (Strapi Cloud)**: Content-Type (`case`, `blog`, `job`)、GraphQL or REST fetch (SWR キャッシュ)、`.env.example` に環境変数。
-   **開発フロー**: `yarn install` → `yarn dev`、`yarn build && yarn start`、`vercel.json` (Edge Functions)、GitHub Actions (`.github/workflows/deploy.yml`)。
-   **コーディング規約**: ESLint (next/core-web-vitals) + Prettier + Husky pre-commit、`src/` alias、JSDoc / TSdoc、ユニットテスト (React Testing Library + Jest)。

## ローカル開発手順

1.  **リポジトリのクローン**: 
    ```bash
    git clone [your-repository-url]
    cd wfhp
    ```

2.  **依存関係のインストール**: 
    ```bash
    npm install # または yarn install
    ```

3.  **環境変数の設定**: 
    `.env.example` を参考に、プロジェクトルートに `.env.local` ファイルを作成し、環境変数を設定します。
    -   `STRAPI_API_URL`: Strapi インスタンスの URL (例: `http://localhost:1337` またはデプロイ済み Strapi の URL)
    -   `STRAPI_TOKEN`: Strapi から発行した API トークン (必要に応じて)
    -   `SENDGRID_API_KEY`: SendGrid の API キー
    -   `SENDGRID_FROM_EMAIL`: SendGrid で設定した送信元メールアドレス
    -   `SENDGRID_TO_EMAIL`: フォーム送信を受け取るメールアドレス
    -   `HR_WEBHOOK_URL`: 採用エントリーフォームの Slack Webhook URL (任意)
    -   `PLAUSIBLE_DOMAIN`: Plausible Analytics のドメイン (例: `your-domain.com`)

4.  **Strapi のセットアップ (ローカル開発用、任意)**:
    もしローカルで Strapi を実行する場合は、Strapi のプロジェクトを別途セットアップし、[Strapi のドキュメント](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html)に従って Content-Type をインポートしてください。Content-Type 定義は `strapi-content-types/` ディレクトリにあります。

5.  **開発サーバーの起動**:
    ```bash
    npm run dev # または yarn dev
    ```
    これで `http://localhost:3000` でサイトにアクセスできます。

## 本番デプロイ手順 (Vercel を想定)

1.  **Vercel プロジェクトのセットアップ**:
    GitHub リポジトリを Vercel に連携し、新しいプロジェクトを作成します。

2.  **環境変数の設定**: 
    Vercel のプロジェクト設定で、ローカル開発時と同様に環境変数を設定します。
    -   `STRAPI_API_URL`
    -   `STRAPI_TOKEN`
    -   `SENDGRID_API_KEY`
    -   `SENDGRID_FROM_EMAIL`
    -   `SENDGRID_TO_EMAIL`
    -   `HR_WEBHOOK_URL`
    -   `PLAUSIBLE_DOMAIN`

3.  **`vercel.json` の設定 (もし存在しない場合)**:
    プロジェクトルートに `vercel.json` を作成し、Edge Functions を有効にします。
    ```json
    {
      "functions": {
        "app/api/**/*": {
          "runtime": "edge"
        }
      }
    }
    ```

4.  **GitHub Actions の設定 (自動デプロイ)**:
    `.github/workflows/deploy.yml` を作成し、GitHub への `push` で Vercel CLI を使用して自動デプロイされるように設定します。
    ```yaml
    name: Deploy to Vercel

    on: 
      push:
        branches:
          - main

    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - name: Install dependencies
            run: npm install --frozen-lockfile
          - name: Build project
            run: npm run build
          - name: Deploy to Vercel
            uses: amondnet/vercel-action@v20
            with:
              vercel-token: ${{ secrets.VERCEL_TOKEN }}
              vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
              vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
              prod: true
    ```
    -   `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` は GitHub Secrets に設定してください。

## CMS (Strapi) 連携手順

1.  **Strapi Cloud インスタンスの準備**: 
    Strapi Cloud または自己ホスト型 Strapi インスタンスを準備します。

2.  **Content-Type Builder で定義をインポート**: 
    Strapi の管理画面にログインし、`Content-Type Builder` に移動します。`strapi-content-types/` ディレクトリにある `case.json`, `blog.json`, `job.json` の内容をコピーして、新しい Collection Type として作成またはインポートします。これにより、必要なデータ構造が Strapi に反映されます。

3.  **API トークンの発行**: 
    Strapi の `Settings` → `API Tokens` で、この Next.js アプリケーションから Strapi の API を読み取るためのトークンを発行します。このトークンを `.env.local` および Vercel の環境変数 `STRAPI_TOKEN` に設定します。

4.  **コンテンツの追加**: 
    Strapi の管理画面で、作成した Content-Type に従ってコンテンツ (事例、ブログ記事、求人情報など) を追加します。

5.  **公開**: 
    追加したコンテンツを公開設定にしてください。

これで Next.js アプリケーションが Strapi からデータを取得し、表示できるようになります。

## テスト

-   **ユニットテスト**: `npm test` または `yarn test` で Jest と React Testing Library を使用したユニットテストを実行できます。
-   **Lighthouse**: 本番デプロイ後、Google Chrome の Lighthouse ツールでモバイル Performance 80+ を確認してください。

## コーディング規約

-   ESLint と Prettier が設定されており、コードの整形と品質チェックが行われます。
-   Husky が Pre-commit フックでフォーマットと lint チェックを実行します。
-   JSDoc / TSdoc で関数コメントを義務付けています。
-   `tsconfig.json` で `src/` alias が設定されており、絶対パスでのインポートが可能です (例: `import Header from '@/components/organisms/Header';`)。 