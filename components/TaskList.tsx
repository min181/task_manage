"use client";

import React, { useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { TaskForm } from "./TaskForm";
import Link from "next/link";
import { getIconComponent } from "@/lib/constants";

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

  const incompleteTasks = tasks.filter(t => !t.isCompleted);
  const completedTasks = tasks.filter(t => t.isCompleted);

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
          <p className="text-gray-500 text-sm">{tasks.length} 個のタスク</p>
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
                <TaskCard key={task.id} task={task} />
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
                <TaskCard key={task.id} task={task} />
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
