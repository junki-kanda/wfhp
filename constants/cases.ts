export const cases = [
  {
    id: 1,
    title: '都心オフィスビルの収益性向上プロジェクト',
    location: '東京都港区',
    category: 'management',
    categoryLabel: '運営受託',
    period: '2023年4月〜継続中',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&crop=center',
    challenge: '築20年のオフィスビルで空室率が30%に達し、収益性が大幅に低下',
    solution: 'テナントニーズの詳細分析、共用部リノベーション、IT設備充実',
    results: [
      { metric: '空室率', before: '30%', after: '5%', improvement: '25%改善' },
      { metric: '月間収益', before: '800万円', after: '1,200万円', improvement: '50%向上' },
      { metric: 'テナント満足度', before: '60%', after: '95%', improvement: '35%向上' }
    ],
    tags: ['収益向上', 'リノベーション', 'IT設備'],
    clientType: '個人投資家',
    duration: '継続中'
  },
  {
    id: 2,
    title: '住宅マンションブランド開発・運営',
    location: '神奈川県横浜市',
    category: 'branding',
    categoryLabel: '自社ブランド',
    period: '2022年8月〜2024年3月',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop&crop=center',
    challenge: '新築マンションの差別化が困難で価格競争に巻き込まれるリスク',
    solution: 'ライフスタイル提案型ブランドコンセプト構築、付加価値創出',
    results: [
      { metric: '販売期間', before: '予想12ヶ月', after: '6ヶ月', improvement: '50%短縮' },
      { metric: '販売価格', before: '市場相場', after: '105%プレミアム', improvement: '5%向上' },
      { metric: '入居後満足度', before: '－', after: '92%', improvement: '高水準達成' }
    ],
    tags: ['ブランド開発', '新築', 'ライフスタイル提案'],
    clientType: 'デベロッパー',
    duration: '18ヶ月'
  },
  {
    id: 3,
    title: '商業施設の集客力向上・テナント誘致',
    location: '大阪府大阪市',
    category: 'management',
    categoryLabel: '運営受託',
    period: '2023年1月〜継続中',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center',
    challenge: 'コロナ禍で集客大幅減少、テナントの退去が相次ぐ',
    solution: 'デジタルマーケティング強化、イベント企画、地域密着型テナント誘致',
    results: [
      { metric: '月間来客数', before: '5万人', after: '12万人', improvement: '140%向上' },
      { metric: 'テナント充足率', before: '65%', after: '95%', improvement: '30%改善' },
      { metric: '売上高', before: '2億円/月', after: '3.2億円/月', improvement: '60%向上' }
    ],
    tags: ['集客向上', 'デジタルマーケティング', 'テナント誘致'],
    clientType: '不動産会社',
    duration: '継続中'
  },
  {
    id: 4,
    title: '郊外型住宅開発のブランディング',
    location: '埼玉県さいたま市',
    category: 'branding',
    categoryLabel: '自社ブランド',
    period: '2023年6月〜2024年2月',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&crop=center',
    challenge: '郊外立地での競合優位性確保とファミリー層の獲得',
    solution: '子育て世代向けコミュニティ型住宅ブランド開発',
    results: [
      { metric: '販売率', before: '予想70%', after: '98%', improvement: '28%向上' },
      { metric: '販売価格', before: '地域相場', after: '110%プレミアム', improvement: '10%向上' },
      { metric: '顧客満足度', before: '－', after: '94%', improvement: '高水準達成' }
    ],
    tags: ['ファミリー向け', 'コミュニティ', '郊外開発'],
    clientType: '地域デベロッパー',
    duration: '8ヶ月'
  },
  {
    id: 5,
    title: '古民家活用型宿泊施設の企画・運営',
    location: '京都府京都市',
    category: 'consulting',
    categoryLabel: 'コンサルティング',
    period: '2022年12月〜2024年6月',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&crop=center',
    challenge: '築100年古民家の有効活用と地域観光への貢献',
    solution: '文化体験型宿泊施設として再生、地域連携強化',
    results: [
      { metric: '稼働率', before: '0%', after: '85%', improvement: '85%向上' },
      { metric: '月間売上', before: '0円', after: '450万円', improvement: '新規創出' },
      { metric: 'リピート率', before: '－', after: '40%', improvement: '高水準達成' }
    ],
    tags: ['古民家再生', '観光', '文化体験'],
    clientType: '個人オーナー',
    duration: '18ヶ月'
  },
  {
    id: 6,
    title: 'コワーキングスペース運営最適化',
    location: '東京都渋谷区',
    category: 'management',
    categoryLabel: '運営受託',
    period: '2023年9月〜継続中',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=center',
    challenge: '利用率低迷とコミュニティ形成の困難',
    solution: 'ターゲット再設定、イベント企画、会員制度改革',
    results: [
      { metric: '利用率', before: '40%', after: '80%', improvement: '40%向上' },
      { metric: '会員数', before: '120名', after: '280名', improvement: '133%増加' },
      { metric: '月間売上', before: '180万円', after: '320万円', improvement: '78%向上' }
    ],
    tags: ['コワーキング', 'コミュニティ', 'イベント企画'],
    clientType: 'スタートアップ',
    duration: '継続中'
  }
];

export const categories = [
  { value: 'all', label: 'すべて' },
  { value: 'branding', label: '自社ブランド' },
  { value: 'management', label: '運営受託' },
  { value: 'consulting', label: 'コンサルティング' }
];

export type CaseItem = typeof cases[0];
export type Category = typeof categories[0];