import Link from "next/link";
import { Button } from "./ui/Button";
import { ListTodo, CheckCircle2, Calendar, Layout, Star, Repeat } from "lucide-react";

export function LandingPage() {
  return (
    <div className="space-y-24 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold">
          <CheckCircle2 className="w-4 h-4" />
          シンプルで強力なタスク管理
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight">
          日々の「やるべきこと」を<br />
          <span className="text-blue-600">スマートに整理</span>しましょう。
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          「やること整理くん」は、直感的な操作でタスクをカテゴリ分けし、<br className="hidden md:block" />
          締切順に一覧できる、あなたのためのパーソナルアシスタントです。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg rounded-2xl shadow-lg shadow-blue-200">
              無料で始める
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg rounded-2xl">
              ログインはこちら
            </Button>
          </Link>
        </div>
      </section>

      {/* Pain Points & Solution Section */}
      <section className="bg-white rounded-3xl p-8 md:p-12 border border-blue-100 shadow-xl shadow-blue-50 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            タスク管理、こんな悩みはありませんか？
          </h2>
          <p className="text-gray-500">
            多くのプロジェクトを抱えるあなただからこそ、陥りやすい罠があります。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-red-50 rounded-2xl space-y-3">
            <div className="text-red-600 font-bold">Case 01</div>
            <p className="text-gray-700 font-medium">「仕事、副業、家事。カテゴリが多すぎて、結局どこから手をつければいいか分からない…」</p>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl space-y-3">
            <div className="text-red-600 font-bold">Case 02</div>
            <p className="text-gray-700 font-medium">「各アプリの通知に追われ、"一番大切なこと"が埋もれてしまっている」</p>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl space-y-3">
            <div className="text-red-600 font-bold">Case 03</div>
            <p className="text-gray-700 font-medium">「締切直前になって、別のカテゴリの重要タスクを忘れていたことに気づく…」</p>
          </div>
        </div>

        <div className="pt-8 border-t border-blue-50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                「やること整理くん」は、<br />
                <span className="text-blue-600">カテゴリの壁を越えて</span><br />
                あなたの"今"を整理します。
              </h3>
              <p className="text-gray-600 leading-relaxed">
                プロジェクトごとにタスクを分けるのは基本。でも、私たちが本当に知りたいのは「今この瞬間、どのプロジェクトの何をすべきか」ではないでしょうか？
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-600 rounded-full text-white">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <p className="text-gray-700 font-medium">全てのカテゴリを横断して、締切順に自動整列</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-600 rounded-full text-white">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <p className="text-gray-700 font-medium">優先度（★）で、今すぐやるべき最重要タスクが浮き彫りに</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-600 rounded-full text-white">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <p className="text-gray-700 font-medium">思考を停止させない。迷う時間をゼロにする設計</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600/5 rounded-full blur-3xl" />
              <div className="relative bg-white p-6 rounded-2xl border border-blue-100 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="font-bold text-blue-600">やること順ビュー（プレビュー）</span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-xl border-l-4 border-blue-500 flex justify-between items-center">
                    <span className="text-sm font-medium">【仕事】提案資料作成</span>
                    <span className="text-xs text-red-500 font-bold">本日締切</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border-l-4 border-purple-500 flex justify-between items-center opacity-70">
                    <span className="text-sm font-medium">【個人】ジムに行く</span>
                    <span className="text-xs text-gray-500">明日</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border-l-4 border-green-500 flex justify-between items-center opacity-50">
                    <span className="text-sm font-medium">【学習】Reactの勉強</span>
                    <span className="text-xs text-gray-500">3日後</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="grid md:grid-cols-3 gap-8 pt-12">
        <FeatureCard
          icon={<Layout className="w-6 h-6 text-blue-600" />}
          title="カテゴリ管理"
          description="仕事、プライベート、買い物など、自由にカテゴリを作成。色とアイコンで視覚的に整理できます。"
        />
        <FeatureCard
          icon={<Calendar className="w-6 h-6 text-green-600" />}
          title="締切順ビュー"
          description="カテゴリを横断して、締切が近い順にタスクを一覧表示。今日やるべきことが一目でわかります。"
        />
        <FeatureCard
          icon={<Repeat className="w-6 h-6 text-purple-600" />}
          title="繰り返しタスク"
          description="毎週、毎月などの繰り返し設定が可能。完了すると自動で次回のタスクを生成します。"
        />
        <FeatureCard
          icon={<Star className="w-6 h-6 text-yellow-500" />}
          title="優先度設定"
          description="重要なタスクには★マークを。優先順位をつけて効率的に作業を進められます。"
        />
        <FeatureCard
          icon={<ListTodo className="w-6 h-6 text-red-500" />}
          title="ワンクリック完了"
          description="タスクの完了・未完了はワンクリック。サクサクとチェックを入れる快感を体験してください。"
        />
        <FeatureCard
          icon={<CheckCircle2 className="w-6 h-6 text-teal-500" />}
          title="安心のデータ保存"
          description="クラウド保存なので、どのデバイスからでもアクセス可能。大切なタスクを逃しません。"
        />
      </section>

      {/* Usage Section */}
      <section className="bg-gray-50 rounded-3xl p-8 md:p-16 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">直感的な 3 ステップ</h2>
          <p className="text-gray-500 text-lg">使い始めるのに複雑な説明は不要です。</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
          <Step
            number="1"
            title="カテゴリを作成"
            description="まずはタスクを入れる箱を作ります。好きな色とアイコンを選んで、あなたらしく整理。"
          >
            <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="h-8 w-full bg-gray-50 rounded-md border border-gray-200 flex items-center px-2 text-[10px] text-gray-400">仕事...</div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-5 h-5 rounded-full ${i === 1 ? 'bg-blue-500 ring-2 ring-blue-200' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>
          </Step>
          <Step
            number="2"
            title="タスクを追加"
            description="やるべきことをサッと入力。優先度の★や締切を設定して、管理を確実に。"
          >
            <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3 text-left text-xs">
              <div className="flex items-center gap-2 border-b pb-2">
                <div className="w-4 h-4 rounded border border-gray-300" />
                <span className="font-medium">提案資料の作成</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <div className="flex gap-2 text-yellow-500 font-bold">★ 高い</div>
                <div className="text-gray-400">12/25 締切</div>
              </div>
            </div>
          </Step>
          <Step
            number="3"
            title="締切表示で確認"
            description="「やること順」タブを開けば、全てのタスクが締切順に。今やるべきことが明確になります。"
          >
            <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-2 text-left text-[9px]">
              <div className="p-1.5 bg-blue-50 border-l-2 border-blue-500 rounded flex justify-between">
                <span>【仕事】資料送付</span>
                <span className="text-red-500 font-bold">今日</span>
              </div>
              <div className="p-1.5 bg-gray-50 border-l-2 border-gray-400 rounded flex justify-between opacity-70">
                <span>【個人】買い物</span>
                <span className="text-gray-500">明日</span>
              </div>
              <div className="p-1.5 bg-gray-50 border-l-2 border-gray-300 rounded flex justify-between opacity-50">
                <span>【趣味】読書</span>
                <span className="text-gray-500">3日後</span>
              </div>
            </div>
          </Step>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center space-y-8 pb-12">
        <h2 className="text-3xl font-bold">さあ、タスクを整理しましょう。</h2>
        <Link href="/register">
          <Button size="lg" className="px-12 py-6 text-lg rounded-2xl shadow-xl shadow-blue-200">
            今すぐ登録する（無料）
          </Button>
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
      <div className="p-3 bg-gray-50 rounded-2xl inline-block">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full bg-white lg:bg-transparent p-6 lg:p-0 rounded-3xl lg:rounded-none">
      <div className="text-center space-y-4 flex-grow">
        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto shadow-lg shadow-blue-200">
          {number}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
      </div>
      {children && (
        <div className="mt-auto pt-2">
          {children}
        </div>
      )}
    </div>
  );
}
