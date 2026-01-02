"use strict";

"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "メールアドレスまたはパスワードが正しくありません。";
        default:
          return "認証中にエラーが発生しました。";
      }
    }
    throw error;
  }
}

export async function signInWithGoogle() {
  await signIn("google");
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  const email = (formData.get("email") as string)?.toLowerCase();
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password) {
    return "メールアドレスとパスワードは必須です。";
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return "このメールアドレスは既に登録されています。";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return "ユーザー登録中にエラーが発生しました。";
  }

  redirect("/login");
}
