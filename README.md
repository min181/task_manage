# TaskManage - モダン・タスク管理アプリ

このプロジェクトは、個人開発の学習目的で作成されたWebアプリケーションです。
Next.js (App Router) の最新機能を活用し、サクサクとした操作感とモダンなデザインを目指して開発しました。

## 🚀 主な機能

- **カテゴリ管理**: タスクをカテゴリごとに整理。テーマカラーやアイコンを自由にカスタマイズ可能。
- **タスク管理**:
  - 締切、優先度、詳細説明の設定。
  - 楽観的更新（Optimistic UI）による、待ち時間ゼロの完了切り替え・削除。
  - カード上の編集ボタンからいつでも内容を更新可能。
- **横断ビュー（締切順）**: 全てのカテゴリのタスクを締切が近い順に一括表示。
- **レスポンシブデザイン**: スマートフォン、タブレット、デスクトップの各デバイスに最適化。

## 🛠 技術スタック

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide React
- **Backend**: Next.js Server Actions, API Routes
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma (v5)
- **Library**: SWR (データフェッチ・キャッシュ用)

## 📖 学習のポイント

1.  **Next.js App Router**: Server Components と Client Components の使い分け、Server Actions によるデータ操作。
2.  **パフォーマンス最適化**: `React cache` を用いたDBリクエストの削減、`Promise.all` によるデータフェッチの並列化。
3.  **UXの向上**: `loading.tsx` によるストリーミング表示、`useOptimistic` を用いた楽観的更新の実装。
4.  **データベース設計**: Prisma を用いたデータモデリングと、Supabase との連携。
