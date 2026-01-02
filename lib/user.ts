import prisma from "./prisma";
import { cache } from "react";

/**
 * 認証機能実装までの間、使用するモックユーザーを取得または作成する。
 * React の cache を使うことで、同一リクエスト内での重複アクセスを防ぎます。
 */
export const getMockUser = cache(async () => {
  const mockEmail = "test@example.com";
  
  let user = await prisma.user.findUnique({
    where: { email: mockEmail },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: mockEmail,
      },
    });
  }

  return user;
});
