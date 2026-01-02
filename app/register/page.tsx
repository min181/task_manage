"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    register,
    undefined
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">新規登録</h1>
        <form action={dispatch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ユーザーネーム
            </label>
            <Input
              type="text"
              name="name"
              required
              className="mt-1"
              placeholder="タスクくん"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <Input
              type="email"
              name="email"
              required
              className="mt-1"
              placeholder="example@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              パスワード
            </label>
            <Input
              type="password"
              name="password"
              required
              className="mt-1"
              placeholder="6文字以上"
              minLength={6}
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "登録中..." : "登録する"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          既にアカウントをお持ちですか？{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}
