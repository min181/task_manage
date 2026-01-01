import { getCategories } from "./actions/category";
import { CategoryList } from "@/components/CategoryList";
import { ListTodo } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="space-y-12">
      <header className="flex items-center justify-between border-b pb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <ListTodo className="w-8 h-8" />
          </div>
          <span className="text-2xl font-black tracking-tight">TaskManage</span>
        </div>
        <nav>
          <Link 
            href="/all-tasks" 
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full border shadow-sm"
          >
            全てのタスク（締切順）
          </Link>
        </nav>
      </header>

      <CategoryList categories={categories} />
    </main>
  );
}
