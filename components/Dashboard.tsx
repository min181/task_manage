"use client";

import React, { useState } from "react";
import { Plus, ListTodo, LayoutGrid, CheckSquare } from "lucide-react";
import { CategoryList } from "./CategoryList";
import { AllTasksView } from "./AllTasksView";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { TaskForm } from "./TaskForm";
import { CategoryForm } from "./CategoryForm";

interface DashboardProps {
  categories: any[];
  allTasks: any[];
}

export function Dashboard({ categories, allTasks }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"categories" | "all-tasks">("categories");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* 画面上部の操作エリア */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "categories"
                ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            カテゴリ一覧
          </button>
          <button
            onClick={() => setActiveTab("all-tasks")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "all-tasks"
                ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            やること順
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsCategoryModalOpen(true)}
            variant="secondary"
            className="flex items-center gap-2 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            カテゴリ追加
          </Button>
          <Button
            onClick={() => setIsTaskModalOpen(true)}
            className="flex items-center gap-2 rounded-xl shadow-md shadow-blue-100"
          >
            <Plus className="w-4 h-4" />
            タスク追加
          </Button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="animate-fade-in">
        {activeTab === "categories" ? (
          <CategoryList categories={categories} />
        ) : (
          <AllTasksView tasks={allTasks} />
        )}
      </div>

      {/* モーダル群 */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="新しいタスク"
      >
        <TaskForm 
          categories={categories} 
          onSuccess={() => setIsTaskModalOpen(false)} 
        />
      </Modal>

      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="新しいカテゴリ"
      >
        <CategoryForm onSuccess={() => setIsCategoryModalOpen(false)} />
      </Modal>
    </div>
  );
}
