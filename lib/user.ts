import prisma from "./prisma";
import { cache } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * 認証済みのユーザーを取得する。
 * ユーザーが見つからない場合は null を返します。
 */
export const getCurrentUser = cache(async () => {
  const session = await auth();

  if (!session?.user?.email) {
    // 開発環境かつ認証がない場合のフォールバック（オプション）
    if (process.env.NODE_ENV === "development") {
      const mockEmail = "test@example.com";
      const user = await prisma.user.findUnique({
        where: { email: mockEmail },
      });
      if (user) return user;
    }
    
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user;
});
