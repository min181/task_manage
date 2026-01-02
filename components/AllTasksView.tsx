"use client";

import React, { useState } from "react";
import { Filter } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Button } from "./ui/Button";

interface AllTasksViewProps {
  tasks: any[];
}

export function AllTasksView({ tasks }: AllTasksViewProps) {
  const [hideCompleted, setHideCompleted] = useState(false);

  const filteredTasks = hideCompleted 
    ? tasks.filter(t => !t.isCompleted) 
    : tasks;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">やること順</h1>
            <p className="text-gray-500 text-sm">締切が近い順に表示しています</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={hideCompleted ? "primary" : "secondary"}
            size="sm"
            onClick={() => setHideCompleted(!hideCompleted)}
            className="flex items-center gap-2 rounded-xl"
          >
            <Filter className="w-4 h-4" />
            <span>{hideCompleted ? "全て表示" : "未完了のみ表示"}</span>
          </Button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-center">
            タスクが見つかりませんでした。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              showCategoryName={task.category?.name} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
