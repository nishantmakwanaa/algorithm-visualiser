"use client";

import { cn } from "@/lib/utils";

interface DPVisualizerProps {
  table: number[][];
  currentCell: [number, number] | null;
  highlightedCells: [number, number][];
  result: number | string;
  rowLabels?: string[];
  colLabels?: string[];
}

export function DPVisualizer({
  table,
  currentCell,
  highlightedCells,
  result,
  rowLabels,
  colLabels,
}: DPVisualizerProps) {
  const getCellClass = (row: number, col: number) => {
    if (currentCell && currentCell[0] === row && currentCell[1] === col) {
      return "bg-[oklch(var(--algo-current))] text-primary-foreground";
    }
    if (highlightedCells.some(([r, c]) => r === row && c === col)) {
      return "bg-[oklch(var(--algo-comparing))] text-primary-foreground";
    }
    return "bg-secondary";
  };

  const formatValue = (value: number) => {
    if (value === Infinity) return "∞";
    if (value === -1) return "-";
    return value.toString();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 overflow-auto">
      <div className="overflow-auto max-w-full">
        <table className="border-collapse">
          {colLabels && (
            <thead>
              <tr>
                {rowLabels && <th className="p-2"></th>}
                {colLabels.map((label, i) => (
                  <th
                    key={i}
                    className="p-2 text-xs text-muted-foreground font-mono"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {table.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {rowLabels && (
                  <td className="p-2 text-xs text-muted-foreground font-mono">
                    {rowLabels[rowIdx]}
                  </td>
                )}
                {row.map((cell, colIdx) => (
                  <td
                    key={colIdx}
                    className={cn(
                      "border border-border p-2 text-center font-mono text-sm min-w-[40px] transition-colors duration-200",
                      getCellClass(rowIdx, colIdx)
                    )}
                  >
                    {formatValue(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {result !== undefined && (
        <div className="p-4 bg-secondary/50 rounded-lg">
          <span className="text-sm text-muted-foreground">Result: </span>
          <span className="text-lg font-mono text-primary font-bold">
            {typeof result === "number" ? formatValue(result) : result}
          </span>
        </div>
      )}

      <div className="flex gap-4 text-xs mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[oklch(var(--algo-current))]" />
          <span className="text-muted-foreground">Current Cell</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[oklch(var(--algo-comparing))]" />
          <span className="text-muted-foreground">Looking Up</span>
        </div>
      </div>
    </div>
  );
}
