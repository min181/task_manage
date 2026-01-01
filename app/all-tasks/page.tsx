import { getAllTasksByDeadline } from "@/app/actions/task";
import { AllTasksView } from "@/components/AllTasksView";

export default async function AllTasksPage() {
  const tasks = await getAllTasksByDeadline();

  return <AllTasksView tasks={tasks} />;
}
