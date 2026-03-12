"use client";

import { cn } from "@/lib/utils";

interface ArrayVisualizerProps {
  array: number[];
  highlightedIndices: number[];
  sortedIndices: number[];
  comparingIndices: number[];
  pivotIndex?: number;
  maxValue?: number;
  showValues?: boolean;
  stepType?: string;
}

export function ArrayVisualizer({
  array,
  highlightedIndices = [],
  sortedIndices = [],
  comparingIndices = [],
  pivotIndex,
  maxValue,
  showValues = true,
  stepType,
}: ArrayVisualizerProps) {
  const max = maxValue || Math.max(...array, 1);
  
  const getBarColor = (index: number) => {
    if (sortedIndices.includes(index)) {
      return "bg-[oklch(var(--algo-sorted))]";
    }
    if (pivotIndex === index) {
      return "bg-[oklch(var(--algo-pivot))]";
    }
    if (comparingIndices.includes(index)) {
      return "bg-[oklch(var(--algo-comparing))]";
    }
    if (highlightedIndices.includes(index)) {
      if (stepType === "swap" || stepType === "swapping") {
        return "bg-[oklch(var(--algo-swapping))]";
      }
      return "bg-[oklch(var(--algo-current))]";
    }
    return "bg-primary/40";
  };

  return (
    <div className="w-full h-full flex items-end justify-center gap-1 p-4">
      {array.map((value, index) => {
        const height = (value / max) * 100;
        const barColor = getBarColor(index);
        
        return (
          <div
            key={index}
            className="flex flex-col items-center gap-1 flex-1 min-w-[20px] max-w-[60px]"
          >
            <div
              className={cn(
                "w-full rounded-t-sm transition-all duration-200",
                barColor
              )}
              style={{ height: `${Math.max(height, 5)}%` }}
            />
            {showValues && array.length <= 20 && (
              <span className="text-xs text-muted-foreground font-mono">
                {value}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface SearchVisualizerProps {
  array: number[];
  searchIndices: number[];
  foundIndex?: number;
  rangeStart?: number;
  rangeEnd?: number;
  midIndices?: number[];
  target: number;
  eliminated?: number[];
}

export function SearchVisualizer({
  array,
  searchIndices = [],
  foundIndex,
  rangeStart = 0,
  rangeEnd = array.length - 1,
  midIndices = [],
  target,
  eliminated = [],
}: SearchVisualizerProps) {
  const getBarColor = (index: number) => {
    if (foundIndex === index) {
      return "bg-[oklch(var(--algo-sorted))]";
    }
    if (midIndices.includes(index)) {
      return "bg-[oklch(var(--algo-pivot))]";
    }
    if (searchIndices.includes(index)) {
      return "bg-[oklch(var(--algo-current))]";
    }
    if (eliminated.includes(index)) {
      return "bg-muted/30";
    }
    if (index >= rangeStart && index <= rangeEnd) {
      return "bg-primary/40";
    }
    return "bg-muted/30";
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Searching for: <span className="text-primary font-bold">{target}</span>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-2">
        {array.map((value, index) => {
          const barColor = getBarColor(index);
          
          return (
            <div
              key={index}
              className={cn(
                "flex items-center justify-center px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200",
                barColor,
                foundIndex === index && "ring-2 ring-[oklch(var(--algo-sorted))] ring-offset-2 ring-offset-background"
              )}
            >
              {value}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[oklch(var(--algo-current))]" />
          <span className="text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[oklch(var(--algo-pivot))]" />
          <span className="text-muted-foreground">Mid Point</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[oklch(var(--algo-sorted))]" />
          <span className="text-muted-foreground">Found</span>
        </div>
      </div>
    </div>
  );
}
