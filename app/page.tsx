import { getCategories } from "./actions/category";
import { getAllTasksByDeadline } from "./actions/task";
import { Dashboard } from "@/components/Dashboard";
import { LandingPage } from "@/components/LandingPage";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  // 未ログインの場合はLPを表示
  if (!session) {
    return <LandingPage />;
  }

  // ログイン済みの場合はダッシュボードを表示
  const [categories, allTasks] = await Promise.all([
    getCategories(),
    getAllTasksByDeadline(),
  ]);

  return (
    <main className="space-y-12">
      <Dashboard categories={categories} allTasks={allTasks} />
    </main>
  );
}
