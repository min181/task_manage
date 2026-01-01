"use server";

import prisma from "@/lib/prisma";
import { getMockUser } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function getTasks(categoryId: string) {
  const user = await getMockUser();
  return await prisma.task.findMany({
    where: { 
      userId: user.id,
      categoryId: categoryId 
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * 全てのタスクを締切順に取得（横断ビュー用）
 */
export async function getAllTasksByDeadline() {
  const user = await getMockUser();
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
  categoryId: string;
}) {
  const user = await getMockUser();
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
    categoryId?: string;
  }
) {
  const user = await getMockUser();
  const task = await prisma.task.update({
    where: { id, userId: user.id },
    data: formData,
  });
  revalidatePath("/");
  return task;
}

export async function deleteTask(id: string) {
  const user = await getMockUser();
  await prisma.task.delete({
    where: { id, userId: user.id },
  });
  revalidatePath("/");
}

export async function toggleTaskStatus(id: string, currentStatus: boolean) {
  const user = await getMockUser();
  const task = await prisma.task.update({
    where: { id, userId: user.id },
    data: { isCompleted: !currentStatus },
  });
  revalidatePath("/");
  return task;
}
