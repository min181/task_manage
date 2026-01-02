import { getCategories } from "./actions/category";
import { getAllTasksByDeadline } from "./actions/task";
import { Dashboard } from "@/components/Dashboard";
import { ListTodo } from "lucide-react";

export default async function Home() {
  const [categories, allTasks] = await Promise.all([
    getCategories(),
    getAllTasksByDeadline()
  ]);

  return (
    <main className="space-y-12">
      <header className="flex items-center justify-between border-b pb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <ListTodo className="w-8 h-8" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">
            やること整理くん
          </span>
        </div>
      </header>

      <Dashboard categories={categories} allTasks={allTasks} />
    </main>
  );
}
