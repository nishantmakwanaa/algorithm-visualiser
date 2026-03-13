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
}: ArrayVisualizerProps) {
  const max = maxValue || Math.max(...array, 1);
  
  const getBarColor = (index: number) => {
    if (sortedIndices.includes(index)) {
      return "bg-emerald-500";
    }
    if (pivotIndex === index) {
      return "bg-pink-500";
    }
    if (comparingIndices.includes(index)) {
      return "bg-amber-400";
    }
    if (highlightedIndices.includes(index)) {
      return "bg-rose-500";
    }
    return "bg-sky-500/60";
  };

  if (!array || array.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        No data to visualize
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex-1 flex items-end justify-center gap-1 min-h-[200px]">
        {array.map((value, index) => {
          const height = (value / max) * 100;
          const barColor = getBarColor(index);
          
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-1 flex-1 min-w-[20px] max-w-[60px]"
            >
              <div className="flex-1 w-full flex items-end">
                <div
                  className={cn(
                    "w-full rounded-t-sm transition-all duration-200",
                    barColor
                  )}
                  style={{ height: `${Math.max(height, 5)}%` }}
                />
              </div>
              {showValues && array.length <= 20 && (
                <span className="text-xs text-muted-foreground font-mono">
                  {value}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-4 text-xs mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-sky-500/60" />
          <span className="text-muted-foreground">Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-400" />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-rose-500" />
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-pink-500" />
          <span className="text-muted-foreground">Pivot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="text-muted-foreground">Sorted</span>
        </div>
      </div>
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
      return "bg-emerald-500 ring-2 ring-emerald-400 ring-offset-2 ring-offset-background";
    }
    if (midIndices.includes(index)) {
      return "bg-pink-500";
    }
    if (searchIndices.includes(index)) {
      return "bg-sky-500";
    }
    if (eliminated.includes(index)) {
      return "bg-muted/30 text-muted-foreground/50";
    }
    if (index >= rangeStart && index <= rangeEnd) {
      return "bg-sky-500/40";
    }
    return "bg-muted/30 text-muted-foreground/50";
  };

  if (!array || array.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        No data to visualize
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Searching for: <span className="text-primary font-bold text-lg">{target}</span>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-2 flex-wrap">
        {array.map((value, index) => {
          const barColor = getBarColor(index);
          
          return (
            <div
              key={index}
              className={cn(
                "flex items-center justify-center px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200 min-w-[50px]",
                barColor
              )}
            >
              {value}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-4 text-xs pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-sky-500/40" />
          <span className="text-muted-foreground">Search Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-sky-500" />
          <span className="text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-pink-500" />
          <span className="text-muted-foreground">Mid Point</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="text-muted-foreground">Found</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-muted/30" />
          <span className="text-muted-foreground">Eliminated</span>
        </div>
      </div>
    </div>
  );
}
