# 要件定義書: やること整理くん

## 1. プロジェクト概要
ユーザーが自身のタスクをカテゴリ別に整理し、効率的に管理できるWebアプリケーションを作成する。
タイトル: 「やること整理くん」

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
  - 優先度（★マークによる「高」または「普通」の設定）
  - 繰り返し設定（なし、毎週、毎月、毎年）
- タスクの完了/未完了をワンクリックで切り替えられる。
- **繰り返しタスク**: 繰り返し設定があるタスクを完了にすると、次回分（1週間後、1ヶ月後など）のタスクが自動的に未完了状態で生成される。

### 2.3 タスク表示機能
- **メインページ（ダッシュボード）**: 以下の2つの表示をタブで切り替えられる。
  - **カテゴリ一覧**: カテゴリごとのカードを表示。
  - **やること順**: カテゴリを問わず、全てのタスクを締切日が近い順に一覧表示。
- **カテゴリ別表示**: 特定のカテゴリに属するタスクのみを表示する。

### 2.4 ユーザー管理
- **認証方式**:
  - メールアドレスとパスワードによるログイン。
  - ソーシャルログイン（Google, Apple）。
- **ユーザー登録**:
  - 新規ユーザー登録画面（サインアップ）を提供する。
- **データ保護**:
  - ログインしていないユーザーは、ログイン画面にリダイレクトされる（保護されたルート）。
  - 各ユーザーは自分自身のデータ（カテゴリ、タスク）のみを閲覧・操作できる。
- **既存データ対応**:
  - 開発中は既存のモックユーザーデータを維持し、ログイン可能な状態にする。

## 3. 非機能要件
- **UI/UX**: 
  - モダンで使いやすいデザイン。Tailwind CSSを使用。
  - モーダル（タスク登録画面など）は、コンテンツが多い場合にブラウザ内でスクロール可能とする。
  - タスクカードのデザインには、そのカテゴリの色が反映され、一目でカテゴリが識別できるようにする。
- **データ保存**: 
  - ORM: Prisma
  - Database: Supabase (PostgreSQL)

## 4. データモデル

### User
- id: String (ID)
- name: String?
- email: String (unique)
- emailVerified: DateTime?
- image: String?
- password: String? (ハッシュ化)
- accounts: Account[]
- sessions: Session[]
- categories: Category[]
- tasks: Task[]

### Account (NextAuth用)
- id: String
- userId: String
- type: String
- provider: String
- providerAccountId: String
- refresh_token: String?
- access_token: String?
- expires_at: Int?
- token_type: String?
- scope: String?
- id_token: String?
- session_state: String?

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
- repeatPattern: String? ("none", "weekly", "monthly", "yearly")
- categoryId: String (Categoryへの参照)
- userId: String (Userへの参照)
