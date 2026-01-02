import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* ヘッダーのスケルトン */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div className="w-10 h-10 bg-gray-200 rounded-xl" />
        <div className="flex flex-col gap-2">
          <div className="w-40 h-8 bg-gray-200 rounded-md" />
          <div className="w-20 h-4 bg-gray-200 rounded-md" />
        </div>
        <div className="ml-auto w-32 h-10 bg-gray-200 rounded-xl" />
      </div>

      {/* タスク一覧のスケルトン */}
      <div className="space-y-8">
        {[1, 2].map((section) => (
          <section key={section}>
            <div className="w-24 h-4 bg-gray-200 rounded-md mb-4" />
            <div className="grid grid-cols-1 gap-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-24 bg-gray-100 rounded-xl border border-gray-100" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
