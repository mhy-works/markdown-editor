# Markdown Editor

NCDCフロントエンド採用課題の実装リポジトリです。

## 使用技術

| 技術 | 選択理由 |
|------|---------|
| React | 実務での使用経験があり、コンポーネント設計の考え方が課題の要件に適していると判断 |
| TypeScript | 型安全な開発により、APIのレスポンスやpropsの型を明示でき、可読性・保守性が向上する |
| Vite | 学習も兼ねて採用。高速なHMRにより開発体験が良い |
| Tailwind CSS | 実務での使用経験があり、デザイン仕様の数値をそのまま反映しやすい |

## 実行環境構築

### バックエンド（企業提供）

```bash
git clone https://github.com/ncdcdev/recruit-frontend
cd recruit-frontend
npm install
npm run migration:run
npm run start
```

### フロントエンド（本リポジトリ）

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。
※バックエンドが `http://localhost:3000` で起動している必要があります。

## 設計思想

### コンポーネント設計

画面を役割ごとに分割し、各コンポーネントが単一の責務を持つように設計しました。

```
App
├── Sidebar         # ページ一覧・追加・削除
└── MainContent     # 選択ページのタイトル・本文の表示・編集
```

共通UIは `Button` コンポーネントとして切り出し、`variant` プロパティで見た目を切り替える設計にしました。これにより、ボタンのスタイル変更が一箇所で済みます。

### 状態管理

選択中のページID（`selectedId`）は `App` で管理し、`Sidebar` と `MainContent` にpropsで渡す設計にしました。これにより、サイドバーでの選択がメインエリアに反映されます。

### APIの管理

`src/api/content.ts` にAPI呼び出しをまとめることで、エンドポイントの変更が1ファイルで完結するようにしました。

## 追加実装

- **ページが存在しない場合の表示**：全ページを削除した際に「ページを作成してください」というメッセージを表示するようにしました。
