"use client";

import { cn } from "@/lib/utils";

interface NQueensVisualizerProps {
  board: number[][];
  currentRow: number;
  currentCol: number;
  solutionCount: number;
}

export function NQueensVisualizer({
  board,
  currentRow,
  currentCol,
  solutionCount,
}: NQueensVisualizerProps) {
  const n = board.length;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="text-sm text-muted-foreground mb-2">
        Solutions found: <span className="text-primary font-bold">{solutionCount}</span>
      </div>

      <div
        className="grid gap-0.5 bg-border p-0.5 rounded-lg"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            const isLight = (rowIdx + colIdx) % 2 === 0;
            const isQueen = cell === 1;
            const isCurrent = rowIdx === currentRow && colIdx === currentCol;

            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl transition-all duration-200",
                  isLight ? "bg-secondary" : "bg-muted",
                  isCurrent && "ring-2 ring-primary ring-inset"
                )}
              >
                {isQueen && (
                  <span className="text-primary drop-shadow-lg">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 sm:w-8 sm:h-8"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="flex gap-4 text-xs mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-primary" />
          <span className="text-muted-foreground">Trying Position</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary text-lg">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </span>
          <span className="text-muted-foreground">Queen Placed</span>
        </div>
      </div>
    </div>
  );
}

interface PermutationVisualizerProps {
  current: (number | string)[];
  results: (number | string)[][];
  originalArray: (number | string)[];
}

export function PermutationVisualizer({
  current,
  results,
  originalArray,
}: PermutationVisualizerProps) {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 overflow-auto">
      <div className="text-center">
        <span className="text-sm text-muted-foreground">Original: </span>
        <span className="font-mono text-primary">[{originalArray.join(", ")}]</span>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-2">Current Building:</div>
          <div className="flex gap-2 justify-center">
            {current.map((item, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-mono font-bold"
              >
                {item}
              </div>
            ))}
            {current.length === 0 && (
              <span className="text-muted-foreground italic">Empty</span>
            )}
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 flex-1 overflow-auto">
          <div className="text-sm text-muted-foreground mb-2">
            Results ({results.length}):
          </div>
          <div className="flex flex-wrap gap-2">
            {results.slice(0, 24).map((perm, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded bg-accent/20 font-mono text-sm"
              >
                [{perm.join(", ")}]
              </div>
            ))}
            {results.length > 24 && (
              <div className="px-3 py-1.5 text-muted-foreground text-sm">
                ... and {results.length - 24} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
