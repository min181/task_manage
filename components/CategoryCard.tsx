"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getIconComponent } from "@/lib/constants";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { CategoryForm } from "./CategoryForm";
import { deleteCategory } from "@/app/actions/category";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    color: string;
    icon: string;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const IconComponent = getIconComponent(category.icon);

  const handleDelete = async () => {
    if (confirm("このカテゴリを削除してもよろしいですか？属するタスクも全て削除されます。")) {
      await deleteCategory(category.id);
    }
  };

  return (
    <div className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden">
      <Link href={`/category/${category.id}`} className="absolute inset-0 z-0" />
      
      <div 
        className="absolute top-0 left-0 w-2 h-full" 
        style={{ backgroundColor: category.color }} 
      />
      
      <div className="flex items-start justify-between relative z-10">
        <div 
          className="p-3 rounded-xl mb-4" 
          style={{ backgroundColor: `${category.color}15`, color: category.color }}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </Button>

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMenu(false);
                }} 
              />
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 z-20 py-1 overflow-hidden">
                <button
                  className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditModalOpen(true);
                    setShowMenu(false);
                  }}
                >
                  <Edit2 className="w-4 h-4" /> 編集
                </button>
                <button
                  className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete();
                    setShowMenu(false);
                  }}
                >
                  <Trash2 className="w-4 h-4" /> 削除
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="relative z-10 pointer-events-none">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          タスクを管理する
        </p>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="カテゴリの編集"
      >
        <CategoryForm
          initialData={category}
          onSuccess={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
