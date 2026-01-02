import { auth, signOut } from "@/auth";
import { Button } from "./ui/Button";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <header className="flex items-center justify-between mb-8 pb-4 border-b">
      <Link href="/" className="text-xl font-bold text-blue-600">
        やること整理くん
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          こんにちは、<span className="font-medium text-gray-900">{session.user.name || session.user.email}</span> さん
        </span>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/logged-out" });
          }}
        >
          <Button variant="ghost" size="sm" type="submit">
            ログアウト
          </Button>
        </form>
      </div>
    </header>
  );
}
