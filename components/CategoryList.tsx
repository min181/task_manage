"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { CategoryCard } from "./CategoryCard";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { CategoryForm } from "./CategoryForm";

interface CategoryListProps {
  categories: any[];
}

export function CategoryList({ categories }: CategoryListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">カテゴリ</h1>
          <p className="text-gray-500 mt-1">タスクをカテゴリ別に整理しましょう</p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)} 
          className="flex items-center gap-2 rounded-xl shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>新しいカテゴリ</span>
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 mb-4 text-center">
            カテゴリがありません。<br />
            右上のボタンから最初のカテゴリを作成しましょう。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="新しいカテゴリ"
      >
        <CategoryForm onSuccess={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
}
