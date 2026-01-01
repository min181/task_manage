import { getTasks } from "@/app/actions/task";
import { getCategories } from "@/app/actions/category";
import { TaskList } from "@/components/TaskList";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  const tasks = await getTasks(id);

  return <TaskList category={category} tasks={tasks} />;
}
