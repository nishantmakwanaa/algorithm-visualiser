"use client";

import { useEffect, useRef } from "react";
import type { TreeNode } from "@/lib/algorithm-types";

interface TreeVisualizerProps {
  root: TreeNode | null;
  highlightedNodes: number[];
  currentNode: number | null;
  result: number[];
}

interface PositionedNode {
  value: number;
  x: number;
  y: number;
  left?: PositionedNode;
  right?: PositionedNode;
}

function calculatePositions(
  node: TreeNode | null,
  x: number,
  y: number,
  horizontalSpacing: number,
  verticalSpacing: number
): PositionedNode | null {
  if (!node) return null;

  return {
    value: node.value,
    x,
    y,
    left: calculatePositions(
      node.left || null,
      x - horizontalSpacing,
      y + verticalSpacing,
      horizontalSpacing / 2,
      verticalSpacing
    ),
    right: calculatePositions(
      node.right || null,
      x + horizontalSpacing,
      y + verticalSpacing,
      horizontalSpacing / 2,
      verticalSpacing
    ),
  };
}

export function TreeVisualizer({
  root,
  highlightedNodes,
  currentNode,
  result,
}: TreeVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const positionedTree = calculatePositions(root, rect.width / 2, 50, 120, 70);

    function drawNode(node: PositionedNode | null) {
      if (!node) return;

      // Draw edges first
      if (node.left) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.strokeStyle = "oklch(0.4 0.01 260)";
        ctx.lineWidth = 2;
        ctx.stroke();
        drawNode(node.left);
      }

      if (node.right) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.strokeStyle = "oklch(0.4 0.01 260)";
        ctx.lineWidth = 2;
        ctx.stroke();
        drawNode(node.right);
      }

      // Draw node circle
      const isHighlighted = highlightedNodes.includes(node.value);
      const isCurrent = node.value === currentNode;

      ctx.beginPath();
      ctx.arc(node.x, node.y, 22, 0, Math.PI * 2);

      if (isCurrent) {
        ctx.fillStyle = "oklch(0.7 0.15 200)";
      } else if (isHighlighted) {
        ctx.fillStyle = "oklch(0.75 0.18 150)";
      } else {
        ctx.fillStyle = "oklch(0.22 0.01 260)";
      }
      ctx.fill();

      ctx.strokeStyle = isCurrent ? "oklch(0.8 0.15 200)" : "oklch(0.4 0.01 260)";
      ctx.lineWidth = isCurrent ? 3 : 1.5;
      ctx.stroke();

      // Draw value
      ctx.fillStyle = "oklch(0.95 0 0)";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.value.toString(), node.x, node.y);
    }

    if (positionedTree) {
      drawNode(positionedTree);
    }
  }, [root, highlightedNodes, currentNode]);

  return (
    <div className="w-full h-full flex flex-col">
      <canvas
        ref={canvasRef}
        className="flex-1 w-full"
        style={{ display: "block" }}
      />
      {result.length > 0 && (
        <div className="p-4 bg-secondary/50 rounded-lg m-4">
          <span className="text-sm text-muted-foreground">Traversal order: </span>
          <span className="text-sm font-mono text-primary">
            [{result.join(", ")}]
          </span>
        </div>
      )}
    </div>
  );
}
