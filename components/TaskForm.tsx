"use client";

import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { createTask, updateTask } from "@/app/actions/task";
import { Star } from "lucide-react";

interface TaskFormProps {
  categoryId?: string;
  categories?: any[];
  initialData?: {
    id: string;
    title: string;
    description: string | null;
    deadline: Date | null;
    priority: string;
    repeatPattern?: string | null;
    categoryId?: string;
  };
  onSuccess: () => void;
}

export function TaskForm({ categoryId: initialCategoryId, categories, initialData, onSuccess }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [deadline, setDeadline] = useState(
    initialData?.deadline 
      ? new Date(initialData.deadline).toISOString().split("T")[0] 
      : ""
  );
  const [priority, setPriority] = useState(initialData?.priority ?? "normal");
  const [repeatPattern, setRepeatPattern] = useState(initialData?.repeatPattern ?? "none");
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId ?? initialData?.categoryId ?? (categories && categories.length > 0 ? categories[0].id : ""));
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("タイトルを入力してください");
      return;
    }

    if (!selectedCategoryId) {
      setError("カテゴリを選択してください");
      return;
    }

    if (title.length > 50) {
      setError("タイトルは50文字以内で入力してください");
      return;
    }

    setIsPending(true);
    try {
      const data = {
        title,
        description: description || undefined,
        deadline: deadline ? new Date(deadline) : undefined,
        priority,
        repeatPattern: repeatPattern || "none",
        categoryId: selectedCategoryId,
      };

      if (initialData) {
        await updateTask(initialData.id, data);
      } else {
        await createTask(data);
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
      <div className="flex flex-col gap-6 px-1">
        <Input
          label="タイトル"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          error={error}
          placeholder="タスクの名前"
          autoFocus
        />

        {!initialCategoryId && !initialData?.categoryId && categories && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">カテゴリ</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">詳細（任意）</label>
          <textarea
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="タスクの詳細説明を入力..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="締切日"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">優先度</label>
            <div className="flex items-center h-10 gap-2">
              <button
                type="button"
                onClick={() => setPriority(priority === "high" ? "normal" : "high")}
                className={`flex items-center justify-center gap-2 px-4 h-full rounded-xl border transition-all ${
                  priority === "high"
                    ? "bg-yellow-50 border-yellow-200 text-yellow-600 font-bold"
                    : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                <Star className={`w-5 h-5 ${priority === "high" ? "fill-yellow-400" : ""}`} />
                <span>{priority === "high" ? "優先度: 高" : "普通"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">繰り返し設定</label>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={repeatPattern}
            onChange={(e) => setRepeatPattern(e.target.value)}
          >
            <option value="none">なし</option>
            <option value="weekly">毎週</option>
            <option value="monthly">毎月</option>
            <option value="yearly">毎年</option>
          </select>
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "保存中..." : initialData ? "更新する" : "追加する"}
      </Button>
    </form>
  );
}
