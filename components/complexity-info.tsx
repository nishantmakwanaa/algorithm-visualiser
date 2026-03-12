"use client";

import { Clock, Database, Info } from "lucide-react";
import { COMPLEXITY_INFO } from "@/lib/algorithm-types";

interface ComplexityInfoProps {
  algorithmId: string;
  algorithmName: string;
  description?: string;
}

export function ComplexityInfo({
  algorithmId,
  algorithmName,
  description,
}: ComplexityInfoProps) {
  const complexity = COMPLEXITY_INFO[algorithmId];

  if (!complexity) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <Info className="h-5 w-5 text-primary" />
        {algorithmName}
      </h3>

      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Time Complexity
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-secondary/50 rounded p-2">
              <div className="text-xs text-muted-foreground">Best</div>
              <div className="font-mono text-accent">{complexity.time.best}</div>
            </div>
            <div className="bg-secondary/50 rounded p-2">
              <div className="text-xs text-muted-foreground">Avg</div>
              <div className="font-mono text-primary">{complexity.time.avg}</div>
            </div>
            <div className="bg-secondary/50 rounded p-2">
              <div className="text-xs text-muted-foreground">Worst</div>
              <div className="font-mono text-destructive">{complexity.time.worst}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Database className="h-4 w-4 text-primary" />
            Space Complexity
          </div>
          <div className="bg-secondary/50 rounded p-3">
            <div className="font-mono text-lg text-primary">{complexity.space}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
