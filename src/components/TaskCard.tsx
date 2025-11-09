import { Task } from "@/types/task";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusColors = {
  todo: "text-muted-foreground",
  "in-progress": "text-primary",
  completed: "text-success",
};

export const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) => {
  const isCompleted = task.status === "completed";

  return (
    <Card className="p-5 hover:shadow-lg transition-all duration-300 border-2">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => onToggleStatus(task.id)}
            className="mt-1 transition-transform hover:scale-110"
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-semibold text-lg mb-1 break-words",
                isCompleted && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
            <p className={cn("text-sm mb-3 break-words", isCompleted ? "text-muted-foreground" : "text-foreground/80")}>
              {task.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={cn("capitalize", priorityColors[task.priority])}>
                {task.priority}
              </Badge>
              <Badge variant="outline" className={cn("capitalize", statusColors[task.status])}>
                {task.status.replace("-", " ")}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
