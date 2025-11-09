import { Priority, Status } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface TaskFiltersProps {
  statusFilter: Status | "all";
  priorityFilter: Priority | "all";
  onStatusChange: (status: Status | "all") => void;
  onPriorityChange: (priority: Priority | "all") => void;
}

export const TaskFilters = ({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps) => {
  const hasFilters = statusFilter !== "all" || priorityFilter !== "all";

  const clearFilters = () => {
    onStatusChange("all");
    onPriorityChange("all");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex-1 min-w-[180px]">
        <Select value={statusFilter} onValueChange={(value) => onStatusChange(value as Status | "all")}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[180px]">
        <Select value={priorityFilter} onValueChange={(value) => onPriorityChange(value as Priority | "all")}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="gap-2">
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
};
