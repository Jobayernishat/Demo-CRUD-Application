import { useState } from "react";
import { Task, Priority, Status } from "@/types/task";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskStats } from "@/components/TaskStats";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Learn React Hooks",
    description: "Master useState, useEffect, and custom hooks",
    priority: "high",
    status: "in-progress",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Build REST API",
    description: "Create Express backend with MongoDB integration",
    priority: "medium",
    status: "todo",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    title: "Setup Tailwind CSS",
    description: "Configure Tailwind and create design system",
    priority: "low",
    status: "completed",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    toast.success("Task created successfully!");
  };

  const handleUpdateTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    if (!editingTask) return;
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, ...taskData, updatedAt: new Date() }
          : task
      )
    );
    setEditingTask(null);
    toast.success("Task updated successfully!");
  };

  const handleDeleteTask = () => {
    if (!deleteId) return;
    setTasks(tasks.filter((task) => task.id !== deleteId));
    setDeleteId(null);
    toast.success("Task deleted successfully!");
  };

  const handleToggleStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "todo" : "completed",
              updatedAt: new Date(),
            }
          : task
      )
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-lg p-2">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Task Manager</h1>
                <p className="text-sm text-muted-foreground">MERN Stack CRUD Demo</p>
              </div>
            </div>
            <Button onClick={() => setIsFormOpen(true)} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              New Task
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats */}
          <TaskStats tasks={tasks} />

          {/* Filters */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-xl font-semibold">
              {filteredTasks.length} {filteredTasks.length === 1 ? "Task" : "Tasks"}
            </h2>
            <TaskFilters
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
            />
          </div>

          {/* Task List */}
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-6">
                {statusFilter !== "all" || priorityFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first task to get started"}
              </p>
              <Button onClick={() => setIsFormOpen(true)}>Create Task</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={(id) => setDeleteId(id)}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Dialogs */}
      <TaskForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />
      <DeleteConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
};

export default Index;
