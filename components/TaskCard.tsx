"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  AlertCircle, 
  MoreHorizontal,
  Edit2,
  Trash2
} from "lucide-react";
import { Button } from "./ui/Button";
import { toggleTaskStatus, deleteTask } from "@/app/actions/task";
import { Modal } from "./ui/Modal";
import { TaskForm } from "./TaskForm";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    deadline: Date | null;
    isCompleted: boolean;
    priority: string;
    categoryId: string;
  };
  showCategoryName?: string;
  onToggle?: () => void;
  onDelete?: () => void;
}

export function TaskCard({ task, showCategoryName, onToggle, onDelete }: TaskCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async () => {
    if (onToggle) {
      onToggle();
      return;
    }
    setIsPending(true);
    try {
      await toggleTaskStatus(task.id, task.isCompleted);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      onDelete();
      return;
    }
    if (confirm("このタスクを削除してもよろしいですか？")) {
      await deleteTask(task.id);
    }
  };

  const formattedDate = task.deadline 
    ? new Date(task.deadline).toLocaleDateString("ja-JP") 
    : null;

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.isCompleted;

  return (
    <div className={`group bg-white p-4 rounded-xl border transition-all ${
      task.isCompleted ? "opacity-60" : "hover:border-blue-200 hover:shadow-sm"
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={`mt-1 transition-colors ${
            task.isCompleted ? "text-green-500" : "text-gray-300 hover:text-blue-500"
          }`}
        >
          {task.isCompleted ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold text-gray-900 truncate ${
              task.isCompleted ? "line-through text-gray-400" : ""
            }`}>
              {task.title}
            </h3>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </Button>

              {showMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 z-20 py-1 overflow-hidden">
                    <button
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setShowMenu(false);
                      }}
                    >
                      <Edit2 className="w-3.5 h-3.5" /> 編集
                    </button>
                    <button
                      className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                      onClick={() => {
                        handleDelete();
                        setShowMenu(false);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> 削除
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {task.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-3">
            {formattedDate && (
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${
                isOverdue ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"
              }`}>
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
                {isOverdue && <span className="ml-1">(期限切れ)</span>}
              </div>
            )}

            {task.priority === "high" && (
              <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-red-100 text-red-700">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>優先度: 高</span>
              </div>
            )}

            {showCategoryName && (
              <div className="text-xs font-medium px-2 py-1 rounded-md bg-blue-50 text-blue-600">
                {showCategoryName}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="タスクの編集"
      >
        <TaskForm
          categoryId={task.categoryId}
          initialData={task}
          onSuccess={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
