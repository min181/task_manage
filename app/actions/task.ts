"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function getTasks(categoryId: string) {
  const user = await getCurrentUser();
  if (!user) return [];

  return await prisma.task.findMany({
    where: {
      userId: user.id,
      categoryId: categoryId,
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * 全てのタスクを締切順に取得（横断ビュー用）
 */
export async function getAllTasksByDeadline() {
  const user = await getCurrentUser();
  if (!user) return [];

  return await prisma.task.findMany({
    where: { userId: user.id },
    include: { category: true },
    orderBy: [
      { deadline: "asc" },
      { priority: "desc" }, // 同一締切なら優先度順（high が先にくるように調整が必要かもしれないが簡易的に）
    ],
  });
}

export async function createTask(formData: {
  title: string;
  description?: string;
  deadline?: Date;
  priority: string;
  repeatPattern?: string;
  categoryId: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("認証が必要です");

  const task = await prisma.task.create({
    data: {
      ...formData,
      userId: user.id,
      isCompleted: false,
    },
  });
  revalidatePath("/");
  return task;
}

export async function updateTask(
  id: string,
  formData: {
    title?: string;
    description?: string;
    deadline?: Date;
    priority?: string;
    repeatPattern?: string;
    categoryId?: string;
  }
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("認証が必要です");

  const task = await prisma.task.update({
    where: { id, userId: user.id },
    data: formData,
  });
  revalidatePath("/");
  return task;
}

export async function deleteTask(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("認証が必要です");

  await prisma.task.delete({
    where: { id, userId: user.id },
  });
  revalidatePath("/");
}

export async function toggleTaskStatus(id: string, currentStatus: boolean) {
  const user = await getCurrentUser();
  if (!user) throw new Error("認証が必要です");

  const task = await prisma.task.update({
    where: { id, userId: user.id },
    data: { isCompleted: !currentStatus },
  });

  // タスクを完了にした場合、繰り返し設定を確認して次回分を作成
  if (!currentStatus === true && task.repeatPattern && task.repeatPattern !== "none") {
    const nextDeadline = calculateNextDeadline(task.deadline, task.repeatPattern);
    
    if (nextDeadline) {
      await prisma.task.create({
        data: {
          title: task.title,
          description: task.description,
          priority: task.priority,
          repeatPattern: task.repeatPattern,
          categoryId: task.categoryId,
          userId: task.userId,
          deadline: nextDeadline,
          isCompleted: false,
        },
      });
    }
  }

  revalidatePath("/");
  return task;
}

/**
 * 繰り返し設定に基づいて次の締切日を計算する
 */
function calculateNextDeadline(currentDeadline: Date | null, pattern: string): Date | null {
  if (!currentDeadline) return null;

  const next = new Date(currentDeadline);

  switch (pattern) {
    case "weekly":
      next.setDate(next.getDate() + 7);
      break;
    case "monthly":
      next.setMonth(next.getMonth() + 1);
      break;
    case "yearly":
      next.setFullYear(next.getFullYear() + 1);
      break;
    default:
      return null;
  }

  return next;
}
