"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  const user = await getCurrentUser();
  if (!user) return [];

  return await prisma.category.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function getCategory(id: string) {
  const user = await getCurrentUser();
  if (!user) return null;

  return await prisma.category.findUnique({
    where: { id, userId: user.id },
  });
}

export async function createCategory(formData: {
  name: string;
  color: string;
  icon: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("認証が必要です");

  const category = await prisma.category.create({
    data: {
      ...formData,
      userId: user.id,
    },
  });
  revalidatePath("/");
  return category;
}

export async function updateCategory(
  id: string,
  formData: {
    name: string;
    color: string;
    icon: string;
  }
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("認証が必要です");

  const category = await prisma.category.update({
    where: { id, userId: user.id },
    data: formData,
  });
  revalidatePath("/");
  return category;
}

export async function deleteCategory(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("認証が必要です");

  await prisma.category.delete({
    where: { id, userId: user.id },
  });
  revalidatePath("/");
}
