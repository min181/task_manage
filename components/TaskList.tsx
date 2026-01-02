"use client";

import React, { useState, useOptimistic } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { TaskForm } from "./TaskForm";
import Link from "next/link";
import { getIconComponent } from "@/lib/constants";
import { toggleTaskStatus, deleteTask } from "@/app/actions/task";

interface TaskListProps {
  category: {
    id: string;
    name: string;
    color: string;
    icon: string;
  };
  tasks: any[];
}

export function TaskList({ category, tasks }: TaskListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const IconComponent = getIconComponent(category.icon);

  // 楽観的更新のための設定
  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    tasks,
    (state, { type, id }: { type: string; id: string }) => {
      switch (type) {
        case "toggle":
          return state.map((t: any) =>
            t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
          );
        case "delete":
          return state.filter((t: any) => t.id !== id);
        default:
          return state;
      }
    }
  );

  const handleToggle = async (id: string, currentStatus: boolean) => {
    // 即座にUIを更新
    updateOptimisticTasks({ type: "toggle", id });
    try {
      await toggleTaskStatus(id, currentStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("このタスクを削除してもよろしいですか？")) return;
    // 即座にUIから削除
    updateOptimisticTasks({ type: "delete", id });
    try {
      await deleteTask(id);
    } catch (error) {
      console.error(error);
    }
  };

  const incompleteTasks = optimisticTasks.filter(t => !t.isCompleted);
  const completedTasks = optimisticTasks.filter(t => t.isCompleted);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="rounded-full p-2 h-10 w-10">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div 
          className="p-2.5 rounded-xl" 
          style={{ backgroundColor: `${category.color}15`, color: category.color }}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-gray-500 text-sm">{optimisticTasks.length} 個のタスク</p>
        </div>
        <div className="ml-auto">
          <Button 
            onClick={() => setIsAddModalOpen(true)} 
            className="flex items-center gap-2 rounded-xl"
          >
            <Plus className="w-5 h-5" />
            <span>タスクを追加</span>
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            未完了 ({incompleteTasks.length})
          </h2>
          {incompleteTasks.length === 0 ? (
            <p className="text-gray-400 text-sm italic py-4">未完了のタスクはありません</p>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {incompleteTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={() => handleToggle(task.id, task.isCompleted)}
                  onDelete={() => handleDelete(task.id)}
                />
              ))}
            </div>
          )}
        </section>

        {completedTasks.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              完了 ({completedTasks.length})
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {completedTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={() => handleToggle(task.id, task.isCompleted)}
                  onDelete={() => handleDelete(task.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="新しいタスク"
      >
        <TaskForm 
          categoryId={category.id} 
          onSuccess={() => setIsAddModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
