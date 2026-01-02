import { getTasks } from "@/app/actions/task";
import { getCategory } from "@/app/actions/category";
import { TaskList } from "@/components/TaskList";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 並列でデータを取得して待ち時間を短縮
  const [category, tasks] = await Promise.all([
    getCategory(id),
    getTasks(id)
  ]);

  if (!category) {
    notFound();
  }

  return <TaskList category={category} tasks={tasks} />;
}
