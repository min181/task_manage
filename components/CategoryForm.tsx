"use client";

import React, { useState } from "react";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/constants";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { createCategory, updateCategory } from "@/app/actions/category";

interface CategoryFormProps {
  initialData?: {
    id: string;
    name: string;
    color: string;
    icon: string;
  };
  onSuccess: () => void;
}

export function CategoryForm({ initialData, onSuccess }: CategoryFormProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [color, setColor] = useState(initialData?.color ?? CATEGORY_COLORS[0].value);
  const [icon, setIcon] = useState(initialData?.icon ?? CATEGORY_ICONS[0].value);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("カテゴリ名を入力してください");
      return;
    }

    if (name.length > 20) {
      setError("カテゴリ名は20文字以内で入力してください");
      return;
    }

    setIsPending(true);
    try {
      if (initialData) {
        await updateCategory(initialData.id, { name, color, icon });
      } else {
        await createCategory({ name, color, icon });
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      setError("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        label="カテゴリ名"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError("");
        }}
        error={error}
        placeholder="例: 仕事, 買い物など"
        autoFocus
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">カラー</label>
        <div className="flex flex-wrap gap-3">
          {CATEGORY_COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                color === c.value ? "border-gray-900 scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: c.value }}
              onClick={() => setColor(c.value)}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">アイコン</label>
        <div className="grid grid-cols-5 gap-2">
          {CATEGORY_ICONS.map((i) => {
            const IconComponent = i.icon;
            return (
              <button
                key={i.value}
                type="button"
                className={`flex items-center justify-center p-2 rounded-lg border transition-all ${
                  icon === i.value
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setIcon(i.value)}
                title={i.name}
              >
                <IconComponent className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "保存中..." : initialData ? "更新する" : "作成する"}
      </Button>
    </form>
  );
}
