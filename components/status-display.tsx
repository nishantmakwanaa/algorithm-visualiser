"use client";

import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface StatusDisplayProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
}

export function StatusDisplay({ message, type = "info" }: StatusDisplayProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "border-accent bg-accent/10 text-accent";
      case "warning":
        return "border-chart-4 bg-chart-4/10 text-chart-4";
      case "error":
        return "border-destructive bg-destructive/10 text-destructive";
      default:
        return "border-primary bg-primary/10 text-primary";
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 transition-all duration-200",
        getTypeStyles()
      )}
    >
      <MessageSquare className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
