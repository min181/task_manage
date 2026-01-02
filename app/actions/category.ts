"use server";

import prisma from "@/lib/prisma";
import { getMockUser } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  const user = await getMockUser();
  return await prisma.category.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function getCategory(id: string) {
  const user = await getMockUser();
  return await prisma.category.findUnique({
    where: { id, userId: user.id },
  });
}

export async function createCategory(formData: {
  name: string;
  color: string;
  icon: string;
}) {
  const user = await getMockUser();
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
  const user = await getMockUser();
  const category = await prisma.category.update({
    where: { id, userId: user.id },
    data: formData,
  });
  revalidatePath("/");
  return category;
}

export async function deleteCategory(id: string) {
  const user = await getMockUser();
  await prisma.category.delete({
    where: { id, userId: user.id },
  });
  revalidatePath("/");
}
