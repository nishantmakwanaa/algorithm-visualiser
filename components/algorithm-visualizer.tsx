"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ArrayVisualizer, SearchVisualizer } from "./visualizers/array-visualizer";
import { GraphVisualizer, createSampleGraph } from "./visualizers/graph-visualizer";
import { TreeVisualizer } from "./visualizers/tree-visualizer";
import { DPVisualizer } from "./visualizers/dp-visualizer";
import { NQueensVisualizer, PermutationVisualizer } from "./visualizers/backtracking-visualizer";
import { ControlsPanel } from "./controls-panel";
import { CodeViewer } from "./code-viewer";
import { ComplexityInfo } from "./complexity-info";
import { StatusDisplay } from "./status-display";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AlgorithmCategory, AlgorithmType, AnimationStep, TreeNode } from "@/lib/algorithm-types";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  SORTING_CODE,
} from "@/lib/algorithms/sorting";
import { linearSearch, binarySearch, ternarySearch, SEARCHING_CODE } from "@/lib/algorithms/searching";
import { bfs, dfs, dijkstra, kruskal, prim, GRAPH_CODE, type GraphState } from "@/lib/algorithms/graph";
import {
  inorderTraversal,
  preorderTraversal,
  postorderTraversal,
  levelOrderTraversal,
  createSampleTree,
  TREE_CODE,
  type TreeState,
} from "@/lib/algorithms/tree";
import { fibonacci, knapsack, lcs, coinChange, DP_CODE, type DPState } from "@/lib/algorithms/dp";
import {
  nQueens,
  generatePermutations,
  generateSubsets,
  BACKTRACKING_CODE,
  type BacktrackingState,
} from "@/lib/algorithms/backtracking";

interface AlgorithmVisualizerProps {
  category: AlgorithmCategory;
  algorithm: AlgorithmType;
}

function generateRandomArray(size: number, max: number = 100): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}

const ALGORITHM_NAMES: Record<string, string> = {
  bubble: "Bubble Sort",
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
  heap: "Heap Sort",
  linear: "Linear Search",
  binary: "Binary Search",
  ternary: "Ternary Search",
  bfs: "Breadth First Search",
  dfs: "Depth First Search",
  dijkstra: "Dijkstra's Algorithm",
  kruskal: "Kruskal's MST",
  prim: "Prim's MST",
  inorder: "Inorder Traversal",
  preorder: "Preorder Traversal",
  postorder: "Postorder Traversal",
  levelOrder: "Level Order Traversal",
  fibonacci: "Fibonacci",
  knapsack: "0/1 Knapsack",
  lcs: "Longest Common Subsequence",
  coinChange: "Coin Change",
  nQueens: "N-Queens",
  permutations: "Permutations",
  subsetGeneration: "Subset Generation",
};

export function AlgorithmVisualizer({ category, algorithm }: AlgorithmVisualizerProps) {
  // Common state
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Ready to start");
  const [statusType, setStatusType] = useState<"info" | "success" | "warning" | "error">("info");

  // Sorting state - initialize empty to avoid hydration mismatch
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(15);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | undefined>();
  const [isInitialized, setIsInitialized] = useState(false);

  // Search state - initialize empty to avoid hydration mismatch
  const [searchTarget, setSearchTarget] = useState(50);
  const [searchArray, setSearchArray] = useState<number[]>([]);

  // Initialize arrays on client-side only to prevent hydration mismatch
  useEffect(() => {
    if (!isInitialized) {
      setArray(generateRandomArray(15));
      const newSearchArray = generateRandomArray(12).sort((a, b) => a - b);
      setSearchArray(newSearchArray);
      setSearchTarget(newSearchArray[Math.floor(Math.random() * newSearchArray.length)]);
      setSearchRange([0, newSearchArray.length - 1]);
      setIsInitialized(true);
    }
  }, [isInitialized]);
  const [foundIndex, setFoundIndex] = useState<number | undefined>();
  const [searchRange, setSearchRange] = useState<[number, number]>([0, 11]);
  const [midIndices, setMidIndices] = useState<number[]>([]);
  const [eliminated, setEliminated] = useState<number[]>([]);

  // Graph state
  const [graphState, setGraphState] = useState<GraphState>(() => {
    const { nodes, edges } = createSampleGraph();
    return {
      nodes,
      edges,
      visited: new Set<string>(),
      current: null,
      path: [],
      distances: new Map<string, number>(),
      mstEdges: [],
    };
  });

  // Tree state
  const [treeState, setTreeState] = useState<TreeState>({
    root: createSampleTree(),
    highlightedNodes: [],
    currentNode: null,
    result: [],
  });

  // DP state
  const [dpState, setDpState] = useState<DPState>({
    table: [[0]],
    currentCell: null,
    highlightedCells: [],
    result: 0,
  });
  const [fibN, setFibN] = useState(10);
  const [lcsStr1, setLcsStr1] = useState("ABCDGH");
  const [lcsStr2, setLcsStr2] = useState("AEDFHR");
  const [coinAmount, setCoinAmount] = useState(11);

  // Backtracking state
  const [backtrackingState, setBacktrackingState] = useState<BacktrackingState>({
    board: Array.from({ length: 8 }, () => new Array(8).fill(0)),
    currentRow: -1,
    currentCol: -1,
    solutions: [],
    isSolved: false,
  });
  const [nQueensSize, setNQueensSize] = useState(8);
  const [permArray, setPermArray] = useState([1, 2, 3]);

  const generatorRef = useRef<AsyncGenerator<AnimationStep> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const getDelay = useCallback(() => {
    return Math.max(10, 1000 - speed * 10);
  }, [speed]);

  const resetState = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setComparisons(0);
    setSwaps(0);
    setHighlightedIndices([]);
    setSortedIndices([]);
    setComparingIndices([]);
    setPivotIndex(undefined);
    setFoundIndex(undefined);
    setSearchRange([0, searchArray.length - 1]);
    setMidIndices([]);
    setEliminated([]);
    setStatusMessage("Ready to start");
    setStatusType("info");
    generatorRef.current = null;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [searchArray.length]);

  const handleRandomize = useCallback(() => {
    resetState();
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    const newSearchArray = generateRandomArray(12).sort((a, b) => a - b);
    setSearchArray(newSearchArray);
    setSearchTarget(newSearchArray[Math.floor(Math.random() * newSearchArray.length)]);
  }, [arraySize, resetState]);

  const runAnimation = useCallback(async () => {
    if (!generatorRef.current) return;

    const run = async () => {
      if (!generatorRef.current) return;

      try {
        const result = await generatorRef.current.next();
        if (result.done) {
          setIsRunning(false);
          setStatusMessage("Complete!");
          setStatusType("success");
          return;
        }

        if (!isPaused) {
          setTimeout(run, getDelay());
        }
      } catch {
        setIsRunning(false);
        setStatusMessage("Error during execution");
        setStatusType("error");
      }
    };

    run();
  }, [isPaused, getDelay]);

  const handleStart = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      runAnimation();
      return;
    }

    resetState();
    setIsRunning(true);
    setStatusMessage("Running...");
    setStatusType("info");

    const onStep = (step: AnimationStep) => {
      setStatusMessage(step.description);

      if (step.type === "compare" || step.type === "check-mid" || step.type === "consider") {
        setComparisons((c) => c + 1);
        setComparingIndices(step.indices);
        setHighlightedIndices([]);
      } else if (step.type === "swap") {
        setSwaps((s) => s + 1);
        setHighlightedIndices(step.indices);
        setComparingIndices([]);
      } else if (step.type === "sorted" || step.type === "complete") {
        setSortedIndices((prev) => [...new Set([...prev, ...step.indices])]);
        setComparingIndices([]);
        setHighlightedIndices([]);
        if (step.type === "complete") {
          setStatusType("success");
        }
      } else if (step.type === "pivot" || step.type === "pivot-placed") {
        setPivotIndex(step.indices[0]);
      } else {
        setHighlightedIndices(step.indices);
        setComparingIndices([]);
      }

      if (step.values) {
        setArray(step.values);
      }
    };

    const onGraphStep = (step: AnimationStep & { graphState: GraphState }) => {
      setStatusMessage(step.description);
      setGraphState(step.graphState);
      if (step.type === "complete") {
        setStatusType("success");
      }
    };

    const onTreeStep = (step: AnimationStep & { treeState: TreeState }) => {
      setStatusMessage(step.description);
      setTreeState(step.treeState);
      if (step.type === "complete") {
        setStatusType("success");
      }
    };

    const onDPStep = (step: AnimationStep & { dpState: DPState }) => {
      setStatusMessage(step.description);
      setDpState(step.dpState);
      if (step.type === "complete") {
        setStatusType("success");
      }
      if (step.type === "fill" || step.type === "lookup") {
        setComparisons((c) => c + 1);
      }
    };

    const onBacktrackingStep = (step: AnimationStep & { backtrackingState: BacktrackingState }) => {
      setStatusMessage(step.description);
      setBacktrackingState(step.backtrackingState);
      if (step.type === "complete" || step.type === "solution-found") {
        setStatusType("success");
      }
      if (step.type === "try" || step.type === "backtrack") {
        setSwaps((s) => s + 1);
      }
    };

    const onSearchStep = (step: AnimationStep) => {
      setStatusMessage(step.description);
      if (step.type === "search" || step.type === "check-mid") {
        setComparisons((c) => c + 1);
        setMidIndices(step.indices);
      } else if (step.type === "found") {
        setFoundIndex(step.indices[0]);
        setStatusType("success");
      } else if (step.type === "range") {
        setSearchRange([step.indices[0], step.indices[step.indices.length - 1]]);
      } else if (step.type === "shrink-left" || step.type === "shrink-right" || step.type === "shrink") {
        setEliminated((prev) => [...prev, ...step.indices]);
      } else if (step.type === "not-found") {
        setStatusType("error");
      }
    };

    // Start the appropriate algorithm
    switch (category) {
      case "sorting":
        switch (algorithm) {
          case "bubble":
            generatorRef.current = bubbleSort([...array], onStep);
            break;
          case "selection":
            generatorRef.current = selectionSort([...array], onStep);
            break;
          case "insertion":
            generatorRef.current = insertionSort([...array], onStep);
            break;
          case "merge":
            generatorRef.current = mergeSort([...array], onStep);
            break;
          case "quick":
            generatorRef.current = quickSort([...array], onStep);
            break;
          case "heap":
            generatorRef.current = heapSort([...array], onStep);
            break;
        }
        break;

      case "searching":
        switch (algorithm) {
          case "linear":
            generatorRef.current = linearSearch([...searchArray], searchTarget, onSearchStep);
            break;
          case "binary":
            generatorRef.current = binarySearch([...searchArray], searchTarget, onSearchStep);
            break;
          case "ternary":
            generatorRef.current = ternarySearch([...searchArray], searchTarget, onSearchStep);
            break;
        }
        break;

      case "graph":
        {
          const { nodes, edges } = graphState;
          switch (algorithm) {
            case "bfs":
              generatorRef.current = bfs(nodes, edges, "A", onGraphStep);
              break;
            case "dfs":
              generatorRef.current = dfs(nodes, edges, "A", onGraphStep);
              break;
            case "dijkstra":
              generatorRef.current = dijkstra(nodes, edges, "A", onGraphStep);
              break;
            case "kruskal":
              generatorRef.current = kruskal(nodes, edges, onGraphStep);
              break;
            case "prim":
              generatorRef.current = prim(nodes, edges, "A", onGraphStep);
              break;
          }
        }
        break;

      case "tree":
        {
          const tree = createSampleTree();
          switch (algorithm) {
            case "inorder":
              generatorRef.current = inorderTraversal(tree, onTreeStep);
              break;
            case "preorder":
              generatorRef.current = preorderTraversal(tree, onTreeStep);
              break;
            case "postorder":
              generatorRef.current = postorderTraversal(tree, onTreeStep);
              break;
            case "levelOrder":
              generatorRef.current = levelOrderTraversal(tree, onTreeStep);
              break;
          }
        }
        break;

      case "dp":
        switch (algorithm) {
          case "fibonacci":
            generatorRef.current = fibonacci(fibN, onDPStep);
            break;
          case "knapsack":
            generatorRef.current = knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5, onDPStep);
            break;
          case "lcs":
            generatorRef.current = lcs(lcsStr1, lcsStr2, onDPStep);
            break;
          case "coinChange":
            generatorRef.current = coinChange([1, 2, 5], coinAmount, onDPStep);
            break;
        }
        break;

      case "backtracking":
        switch (algorithm) {
          case "nQueens":
            generatorRef.current = nQueens(nQueensSize, onBacktrackingStep);
            break;
          case "permutations":
            generatorRef.current = generatePermutations(permArray, onBacktrackingStep);
            break;
          case "subsetGeneration":
            generatorRef.current = generateSubsets(permArray, onBacktrackingStep);
            break;
        }
        break;
    }

    runAnimation();
  }, [
    algorithm,
    array,
    category,
    fibN,
    graphState,
    isPaused,
    lcsStr1,
    lcsStr2,
    coinAmount,
    nQueensSize,
    permArray,
    resetState,
    runAnimation,
    searchArray,
    searchTarget,
  ]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleStep = useCallback(() => {
    if (!generatorRef.current) {
      handleStart();
    }
    // Step is handled by single iteration
  }, [handleStart]);

  const handleReset = useCallback(() => {
    resetState();
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    const { nodes, edges } = createSampleGraph();
    setGraphState({
      nodes,
      edges,
      visited: new Set<string>(),
      current: null,
      path: [],
      distances: new Map<string, number>(),
      mstEdges: [],
    });
    setTreeState({
      root: createSampleTree(),
      highlightedNodes: [],
      currentNode: null,
      result: [],
    });
    setDpState({
      table: [[0]],
      currentCell: null,
      highlightedCells: [],
      result: 0,
    });
    setBacktrackingState({
      board: Array.from({ length: nQueensSize }, () => new Array(nQueensSize).fill(0)),
      currentRow: -1,
      currentCol: -1,
      solutions: [],
      isSolved: false,
    });
  }, [arraySize, nQueensSize, resetState]);

  useEffect(() => {
    handleReset();
  }, [algorithm, category]);

  const getCode = () => {
    if (category === "sorting" && SORTING_CODE[algorithm as keyof typeof SORTING_CODE]) {
      return SORTING_CODE[algorithm as keyof typeof SORTING_CODE];
    }
    if (category === "searching" && SEARCHING_CODE[algorithm as keyof typeof SEARCHING_CODE]) {
      return SEARCHING_CODE[algorithm as keyof typeof SEARCHING_CODE];
    }
    if (category === "graph" && GRAPH_CODE[algorithm as keyof typeof GRAPH_CODE]) {
      return GRAPH_CODE[algorithm as keyof typeof GRAPH_CODE];
    }
    if (category === "tree" && TREE_CODE[algorithm as keyof typeof TREE_CODE]) {
      return TREE_CODE[algorithm as keyof typeof TREE_CODE];
    }
    if (category === "dp" && DP_CODE[algorithm as keyof typeof DP_CODE]) {
      return DP_CODE[algorithm as keyof typeof DP_CODE];
    }
    if (category === "backtracking" && BACKTRACKING_CODE[algorithm as keyof typeof BACKTRACKING_CODE]) {
      return BACKTRACKING_CODE[algorithm as keyof typeof BACKTRACKING_CODE];
    }
    return { python: "# Code coming soon", javascript: "// Code coming soon", cpp: "// Code coming soon" };
  };

  const renderCustomControls = () => {
    if (category === "searching") {
      return (
        <div className="flex items-center gap-3">
          <Label className="text-sm whitespace-nowrap">Target:</Label>
          <Input
            type="number"
            value={searchTarget}
            onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
            className="w-20 h-8"
            disabled={isRunning}
          />
        </div>
      );
    }
    if (category === "dp") {
      if (algorithm === "fibonacci") {
        return (
          <div className="flex items-center gap-3">
            <Label className="text-sm whitespace-nowrap">N:</Label>
            <Input
              type="number"
              value={fibN}
              onChange={(e) => setFibN(Math.min(20, parseInt(e.target.value) || 1))}
              min={1}
              max={20}
              className="w-20 h-8"
              disabled={isRunning}
            />
          </div>
        );
      }
      if (algorithm === "lcs") {
        return (
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Label className="text-sm">S1:</Label>
              <Input
                value={lcsStr1}
                onChange={(e) => setLcsStr1(e.target.value.toUpperCase().slice(0, 8))}
                className="w-24 h-8"
                disabled={isRunning}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">S2:</Label>
              <Input
                value={lcsStr2}
                onChange={(e) => setLcsStr2(e.target.value.toUpperCase().slice(0, 8))}
                className="w-24 h-8"
                disabled={isRunning}
              />
            </div>
          </div>
        );
      }
      if (algorithm === "coinChange") {
        return (
          <div className="flex items-center gap-3">
            <Label className="text-sm whitespace-nowrap">Amount:</Label>
            <Input
              type="number"
              value={coinAmount}
              onChange={(e) => setCoinAmount(Math.min(100, parseInt(e.target.value) || 1))}
              min={1}
              max={100}
              className="w-20 h-8"
              disabled={isRunning}
            />
          </div>
        );
      }
    }
    if (category === "backtracking" && algorithm === "nQueens") {
      return (
        <div className="flex items-center gap-3">
          <Label className="text-sm whitespace-nowrap">N:</Label>
          <Input
            type="number"
            value={nQueensSize}
            onChange={(e) => {
              const n = Math.min(10, Math.max(4, parseInt(e.target.value) || 4));
              setNQueensSize(n);
              setBacktrackingState({
                board: Array.from({ length: n }, () => new Array(n).fill(0)),
                currentRow: -1,
                currentCol: -1,
                solutions: [],
                isSolved: false,
              });
            }}
            min={4}
            max={10}
            className="w-20 h-8"
            disabled={isRunning}
          />
        </div>
      );
    }
    return null;
  };

  const renderVisualizer = () => {
    switch (category) {
      case "sorting":
        return (
          <ArrayVisualizer
            array={array}
            highlightedIndices={highlightedIndices}
            sortedIndices={sortedIndices}
            comparingIndices={comparingIndices}
            pivotIndex={pivotIndex}
          />
        );

      case "searching":
        return (
          <SearchVisualizer
            array={searchArray}
            searchIndices={midIndices}
            foundIndex={foundIndex}
            rangeStart={searchRange[0]}
            rangeEnd={searchRange[1]}
            midIndices={midIndices}
            target={searchTarget}
            eliminated={eliminated}
          />
        );

      case "graph":
        return (
          <GraphVisualizer
            nodes={graphState.nodes}
            edges={graphState.edges}
            visitedNodes={graphState.visited}
            currentNode={graphState.current}
            path={graphState.path}
            mstEdges={graphState.mstEdges}
            distances={graphState.distances}
          />
        );

      case "tree":
        return (
          <TreeVisualizer
            root={treeState.root}
            highlightedNodes={treeState.highlightedNodes}
            currentNode={treeState.currentNode}
            result={treeState.result}
          />
        );

      case "dp":
        return (
          <DPVisualizer
            table={dpState.table}
            currentCell={dpState.currentCell}
            highlightedCells={dpState.highlightedCells}
            result={dpState.result}
          />
        );

      case "backtracking":
        if (algorithm === "nQueens") {
          return (
            <NQueensVisualizer
              board={backtrackingState.board as number[][]}
              currentRow={backtrackingState.currentRow}
              currentCol={backtrackingState.currentCol}
              solutionCount={backtrackingState.solutions.length}
            />
          );
        }
        return (
          <PermutationVisualizer
            current={backtrackingState.board[0] || []}
            results={backtrackingState.solutions.map((s) => s[0] || [])}
            originalArray={permArray}
          />
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select an algorithm to visualize
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {ALGORITHM_NAMES[algorithm] || algorithm}
        </h2>
      </div>

      <Tabs defaultValue="visualizer" className="flex-1 flex flex-col">
        <TabsList className="self-start">
          <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>

        <TabsContent value="visualizer" className="flex-1 flex flex-col gap-4 mt-4">
          <StatusDisplay message={statusMessage} type={statusType} />

          <div className="flex-1 bg-card border border-border rounded-lg min-h-[300px] overflow-hidden">
            {renderVisualizer()}
          </div>

          <ControlsPanel
            isRunning={isRunning}
            isPaused={isPaused}
            speed={speed}
            comparisons={comparisons}
            swaps={swaps}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onStep={handleStep}
            onSpeedChange={setSpeed}
            onRandomize={category === "sorting" || category === "searching" ? handleRandomize : undefined}
            arraySize={category === "sorting" ? arraySize : undefined}
            onArraySizeChange={
              category === "sorting"
                ? (size) => {
                    setArraySize(size);
                    setArray(generateRandomArray(size));
                    resetState();
                  }
                : undefined
            }
            customControls={renderCustomControls()}
          />
        </TabsContent>

        <TabsContent value="code" className="flex-1 mt-4">
          <CodeViewer code={getCode()} title={ALGORITHM_NAMES[algorithm]} />
        </TabsContent>

        <TabsContent value="info" className="flex-1 mt-4">
          <ComplexityInfo
            algorithmId={algorithm}
            algorithmName={ALGORITHM_NAMES[algorithm] || algorithm}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
