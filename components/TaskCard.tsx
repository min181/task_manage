"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  AlertCircle, 
  MoreHorizontal,
  Edit2,
  Trash2,
  Star
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
    category?: {
      name: string;
      color: string;
    };
  };
  categoryColor?: string;
  showCategoryName?: string;
  onToggle?: () => void;
  onDelete?: () => void;
}

export function TaskCard({ task, categoryColor, showCategoryName, onToggle, onDelete }: TaskCardProps) {
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
  const activeColor = categoryColor || task.category?.color || "#3b82f6";

  return (
    <div className={`group relative bg-white p-4 rounded-xl border transition-all overflow-hidden ${
      task.isCompleted ? "opacity-60" : "hover:shadow-md"
    } ${task.priority === "high" && !task.isCompleted ? "border-yellow-200 bg-yellow-50/30" : "border-gray-100"}`}
    style={{ borderLeftWidth: "6px", borderLeftColor: activeColor }}>
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={`mt-1 transition-colors`}
          style={{ color: task.isCompleted ? "#22c55e" : "#d1d5db" }}
          onMouseEnter={(e) => {
            if (!task.isCompleted) e.currentTarget.style.color = activeColor;
          }}
          onMouseLeave={(e) => {
            if (!task.isCompleted) e.currentTarget.style.color = "#d1d5db";
          }}
        >
          {task.isCompleted ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-bold text-gray-900 truncate ${
              task.isCompleted ? "line-through text-gray-400 font-normal" : ""
            }`}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setIsEditModalOpen(true)}
                title="タスクを編集"
              >
                <Edit2 className="w-4 h-4 text-gray-400" />
              </Button>

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
          </div>

          {task.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2 italic">
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

            {task.priority === "high" && !task.isCompleted && (
              <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-yellow-100 text-yellow-700 border border-yellow-200">
                <Star className="w-3.5 h-3.5 fill-yellow-500" />
                <span>優先: 高</span>
              </div>
            )}

            {(showCategoryName || task.category?.name) && (
              <div 
                className="text-xs font-bold px-2.5 py-1 rounded-full border shadow-sm"
                style={{ 
                  backgroundColor: `${activeColor}15`, 
                  color: activeColor,
                  borderColor: `${activeColor}30`
                }}
              >
                {showCategoryName || task.category?.name}
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
