"use client";

import { Play, Pause, RotateCcw, SkipForward, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ControlsPanelProps {
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
  comparisons: number;
  swaps: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStep: () => void;
  onSpeedChange: (speed: number) => void;
  onRandomize?: () => void;
  arraySize?: number;
  onArraySizeChange?: (size: number) => void;
  customControls?: React.ReactNode;
  disabled?: boolean;
}

export function ControlsPanel({
  isRunning,
  isPaused,
  speed,
  comparisons,
  swaps,
  onStart,
  onPause,
  onReset,
  onStep,
  onSpeedChange,
  onRandomize,
  arraySize,
  onArraySizeChange,
  customControls,
  disabled = false,
}: ControlsPanelProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card border border-border rounded-lg">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={isRunning && !isPaused ? onPause : onStart}
          disabled={disabled}
          size="sm"
          className="gap-2"
        >
          {isRunning && !isPaused ? (
            <>
              <Pause className="h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              {isPaused ? "Resume" : "Start"}
            </>
          )}
        </Button>

        <Button
          onClick={onStep}
          disabled={disabled || (isRunning && !isPaused)}
          size="sm"
          variant="secondary"
          className="gap-2"
        >
          <SkipForward className="h-4 w-4" />
          Step
        </Button>

        <Button
          onClick={onReset}
          disabled={disabled}
          size="sm"
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>

        {onRandomize && (
          <Button
            onClick={onRandomize}
            disabled={disabled || isRunning}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <Shuffle className="h-4 w-4" />
            Randomize
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-3 min-w-[200px]">
          <Label className="text-sm whitespace-nowrap">Speed:</Label>
          <Slider
            value={[speed]}
            onValueChange={([v]) => onSpeedChange(v)}
            min={1}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-8">{speed}%</span>
        </div>

        {arraySize !== undefined && onArraySizeChange && (
          <div className="flex items-center gap-3">
            <Label className="text-sm whitespace-nowrap">Size:</Label>
            <Input
              type="number"
              value={arraySize}
              onChange={(e) => onArraySizeChange(parseInt(e.target.value) || 10)}
              min={5}
              max={50}
              className="w-20 h-8"
              disabled={isRunning}
            />
          </div>
        )}

        {customControls}
      </div>

      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Comparisons:</span>
          <span className={cn(
            "font-mono font-bold",
            comparisons > 0 ? "text-primary" : "text-muted-foreground"
          )}>
            {comparisons}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Swaps/Operations:</span>
          <span className={cn(
            "font-mono font-bold",
            swaps > 0 ? "text-accent" : "text-muted-foreground"
          )}>
            {swaps}
          </span>
        </div>
      </div>
    </div>
  );
}
