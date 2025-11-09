import { Task } from "@/types/task";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertCircle, ListTodo } from "lucide-react";

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    todo: tasks.filter((t) => t.status === "todo").length,
  };

  const statCards = [
    { label: "Total Tasks", value: stats.total, icon: ListTodo, color: "text-primary" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-success" },
    { label: "In Progress", value: stats.inProgress, icon: Clock, color: "text-primary" },
    { label: "To Do", value: stats.todo, icon: AlertCircle, color: "text-muted-foreground" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-5 border-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
