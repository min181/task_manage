import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function LoggedOutPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-md p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-center">
          <div className="p-3 bg-green-50 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">ログアウトしました</h1>
          <p className="text-gray-500">ご利用ありがとうございました。またのご利用をお待ちしております。</p>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <Link href="/login" className="w-full">
            <Button className="w-full">もう一度ログインする</Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="ghost" className="w-full">トップページへ</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
