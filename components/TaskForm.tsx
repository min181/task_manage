"use client";

import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { createTask, updateTask } from "@/app/actions/task";

interface TaskFormProps {
  categoryId: string;
  initialData?: {
    id: string;
    title: string;
    description: string | null;
    deadline: Date | null;
    priority: string;
  };
  onSuccess: () => void;
}

export function TaskForm({ categoryId, initialData, onSuccess }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [deadline, setDeadline] = useState(
    initialData?.deadline 
      ? new Date(initialData.deadline).toISOString().split("T")[0] 
      : ""
  );
  const [priority, setPriority] = useState(initialData?.priority ?? "normal");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("タイトルを入力してください");
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
        categoryId,
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
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                priority === "normal"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setPriority("normal")}
            >
              普通
            </button>
            <button
              type="button"
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                priority === "high"
                  ? "bg-red-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setPriority("high")}
            >
              高
            </button>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "保存中..." : initialData ? "更新する" : "追加する"}
      </Button>
    </form>
  );
}
