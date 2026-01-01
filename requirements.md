# 要件定義書: タスク管理アプリ

## 1. プロジェクト概要
ユーザーが自身のタスクをカテゴリ別に整理し、効率的に管理できるWebアプリケーションを作成する。
将来的な多ユーザー利用を想定し、初期段階からユーザー単位のデータ管理構造を持たせる。

## 2. 機能要件

### 2.1 カテゴリ管理
- カテゴリの作成、編集、削除ができる。
- 各カテゴリには以下の情報を持たせる。
  - カテゴリ名
  - 色（選択式）
  - アイコン（選択式）

### 2.2 タスク管理
- カテゴリ内にタスクを追加、編集、削除ができる。
- 各タスクには以下の情報を持たせる。
  - タイトル
  - 詳細説明
  - 締切日（日付）
  - 完了ステータス（完了/未完了）
  - 優先度（「高」または「普通」）
- タスクの完了/未完了をワンクリックで切り替えられる。

### 2.3 タスク表示機能
- **カテゴリ別表示**: 特定のカテゴリに属するタスクのみを表示する。
- **横断ビュー（締切順表示）**: カテゴリを問わず、全てのタスクを締切日が近い順に一覧表示する。

### 2.4 ユーザー管理（基盤のみ）
- ログイン機能の実装は後回しとするが、データベース上にはユーザー情報を保持するテーブルを用意する。
- 全てのカテゴリおよびタスクは、特定のユーザーに紐付く設計とする。

## 3. 非機能要件
- **UI/UX**: モダンで使いやすいデザイン。Tailwind CSSを使用。
- **データ保存**: 
  - ORM: Prisma
  - Database: Supabase (PostgreSQL)

## 4. データモデル (Prisma Schema イメージ)

### User
- id: String (ID)
- email: String
- categories: Category[]
- tasks: Task[]

### Category
- id: String
- name: String
- color: String
- icon: String
- userId: String (Userへの参照)
- tasks: Task[]

### Task
- id: String
- title: String
- description: String?
- deadline: DateTime?
- isCompleted: Boolean
- priority: String ("high", "normal")
- categoryId: String (Categoryへの参照)
- userId: String (Userへの参照)
