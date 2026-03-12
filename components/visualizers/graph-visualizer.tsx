"use client";

import { useEffect, useRef } from "react";
import type { GraphNode, GraphEdge } from "@/lib/algorithm-types";

interface GraphVisualizerProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  visitedNodes: Set<string>;
  currentNode: string | null;
  path: string[];
  mstEdges?: GraphEdge[];
  distances?: Map<string, number>;
}

export function GraphVisualizer({
  nodes,
  edges,
  visitedNodes,
  currentNode,
  path,
  mstEdges = [],
  distances,
}: GraphVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw edges
    edges.forEach((edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);
      if (!sourceNode || !targetNode) return;

      const isMstEdge = mstEdges.some(
        (e) =>
          (e.source === edge.source && e.target === edge.target) ||
          (e.source === edge.target && e.target === edge.source)
      );

      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      ctx.strokeStyle = isMstEdge ? "oklch(0.75 0.18 150)" : "oklch(0.4 0.01 260)";
      ctx.lineWidth = isMstEdge ? 3 : 1.5;
      ctx.stroke();

      // Draw weight
      if (edge.weight !== undefined) {
        const midX = (sourceNode.x + targetNode.x) / 2;
        const midY = (sourceNode.y + targetNode.y) / 2;
        ctx.fillStyle = "oklch(0.65 0 0)";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(edge.weight.toString(), midX, midY - 10);
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      const isVisited = visitedNodes.has(node.id);
      const isCurrent = node.id === currentNode;
      const isInPath = path.includes(node.id);

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);

      if (isCurrent) {
        ctx.fillStyle = "oklch(0.7 0.15 200)";
      } else if (isInPath) {
        ctx.fillStyle = "oklch(0.75 0.18 150)";
      } else if (isVisited) {
        ctx.fillStyle = "oklch(0.55 0.15 200)";
      } else {
        ctx.fillStyle = "oklch(0.22 0.01 260)";
      }
      ctx.fill();

      // Node border
      ctx.strokeStyle = isCurrent ? "oklch(0.8 0.15 200)" : "oklch(0.4 0.01 260)";
      ctx.lineWidth = isCurrent ? 3 : 1.5;
      ctx.stroke();

      // Node label
      ctx.fillStyle = "oklch(0.95 0 0)";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.label, node.x, node.y);

      // Draw distance if available
      if (distances && distances.has(node.id)) {
        const dist = distances.get(node.id);
        ctx.fillStyle = "oklch(0.8 0.15 80)";
        ctx.font = "11px monospace";
        ctx.fillText(
          dist === Infinity ? "∞" : dist!.toString(),
          node.x,
          node.y + 35
        );
      }
    });
  }, [nodes, edges, visitedNodes, currentNode, path, mstEdges, distances]);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
      <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[oklch(0.7_0.15_200)]" />
          <span className="text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[oklch(0.55_0.15_200)]" />
          <span className="text-muted-foreground">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.18_150)]" />
          <span className="text-muted-foreground">Path/MST</span>
        </div>
      </div>
    </div>
  );
}

export function createSampleGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [
    { id: "A", x: 150, y: 80, label: "A" },
    { id: "B", x: 300, y: 80, label: "B" },
    { id: "C", x: 450, y: 80, label: "C" },
    { id: "D", x: 100, y: 200, label: "D" },
    { id: "E", x: 250, y: 200, label: "E" },
    { id: "F", x: 400, y: 200, label: "F" },
    { id: "G", x: 200, y: 320, label: "G" },
    { id: "H", x: 350, y: 320, label: "H" },
  ];

  const edges: GraphEdge[] = [
    { source: "A", target: "B", weight: 4 },
    { source: "A", target: "D", weight: 2 },
    { source: "B", target: "C", weight: 3 },
    { source: "B", target: "E", weight: 1 },
    { source: "C", target: "F", weight: 5 },
    { source: "D", target: "E", weight: 3 },
    { source: "D", target: "G", weight: 6 },
    { source: "E", target: "F", weight: 2 },
    { source: "E", target: "G", weight: 4 },
    { source: "E", target: "H", weight: 3 },
    { source: "F", target: "H", weight: 2 },
    { source: "G", target: "H", weight: 5 },
  ];

  return { nodes, edges };
}
