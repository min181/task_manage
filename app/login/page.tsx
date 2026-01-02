"use client";

import { useActionState } from "react";
import { authenticate, signInWithGoogle } from "@/app/actions/auth";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>
        <form action={dispatch} className="space-y-4">
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
              placeholder="******"
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "ログイン中..." : "ログイン"}
          </Button>
        </form>

        <div className="mt-6 border-t pt-6">
          <p className="text-center text-sm text-gray-600 mb-4">
            またはソーシャルアカウントでログイン
          </p>
          <form action={signInWithGoogle} className="grid grid-cols-1 gap-4">
            <Button variant="secondary" type="submit">
              Googleでログイン
            </Button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          アカウントをお持ちでないですか？{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
