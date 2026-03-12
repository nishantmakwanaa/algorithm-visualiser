export type AlgorithmCategory =
  | "sorting"
  | "searching"
  | "graph"
  | "tree"
  | "dp"
  | "backtracking"
  | "greedy"
  | "dataStructures";

export type SortingAlgorithm =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick"
  | "heap"
  | "counting"
  | "radix"
  | "bucket";

export type SearchingAlgorithm = "linear" | "binary" | "ternary";

export type GraphAlgorithm =
  | "bfs"
  | "dfs"
  | "dijkstra"
  | "bellmanFord"
  | "floydWarshall"
  | "kruskal"
  | "prim"
  | "topological"
  | "detectCycle";

export type TreeAlgorithm =
  | "inorder"
  | "preorder"
  | "postorder"
  | "levelOrder"
  | "bstInsert"
  | "bstDelete"
  | "avlRotation"
  | "lca";

export type DPAlgorithm =
  | "fibonacci"
  | "knapsack"
  | "lcs"
  | "lis"
  | "coinChange"
  | "matrixChain";

export type BacktrackingAlgorithm =
  | "nQueens"
  | "sudoku"
  | "subsetGeneration"
  | "permutations";

export type GreedyAlgorithm =
  | "activitySelection"
  | "huffman"
  | "fractionalKnapsack"
  | "jobScheduling";

export type DataStructureAlgorithm =
  | "arrayOps"
  | "linkedListOps"
  | "stackOps"
  | "queueOps"
  | "heapOps";

export type AlgorithmType =
  | SortingAlgorithm
  | SearchingAlgorithm
  | GraphAlgorithm
  | TreeAlgorithm
  | DPAlgorithm
  | BacktrackingAlgorithm
  | GreedyAlgorithm
  | DataStructureAlgorithm;

export interface AlgorithmInfo {
  id: AlgorithmType;
  name: string;
  category: AlgorithmCategory;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
  code: {
    python: string;
    javascript: string;
    cpp: string;
  };
}

export interface AnimationStep {
  type: string;
  indices: number[];
  values?: number[];
  description: string;
  highlight?: string[];
}

export interface VisualizerState {
  array: number[];
  comparisons: number;
  swaps: number;
  currentStep: number;
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
  highlightedIndices: number[];
  sortedIndices: number[];
  pivotIndex?: number;
  activeIndices?: number[];
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight?: number;
}

export interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  x?: number;
  y?: number;
  highlighted?: boolean;
}

export const ALGORITHM_CATEGORIES: {
  id: AlgorithmCategory;
  name: string;
  icon: string;
}[] = [
  { id: "sorting", name: "Sorting", icon: "BarChart3" },
  { id: "searching", name: "Searching", icon: "Search" },
  { id: "graph", name: "Graph", icon: "GitBranch" },
  { id: "tree", name: "Tree", icon: "Binary" },
  { id: "dp", name: "Dynamic Programming", icon: "Table" },
  { id: "backtracking", name: "Backtracking", icon: "Undo2" },
  { id: "greedy", name: "Greedy", icon: "Zap" },
  { id: "dataStructures", name: "Data Structures", icon: "Layers" },
];

export const ALGORITHMS: Record<AlgorithmCategory, { id: AlgorithmType; name: string }[]> = {
  sorting: [
    { id: "bubble", name: "Bubble Sort" },
    { id: "selection", name: "Selection Sort" },
    { id: "insertion", name: "Insertion Sort" },
    { id: "merge", name: "Merge Sort" },
    { id: "quick", name: "Quick Sort" },
    { id: "heap", name: "Heap Sort" },
    { id: "counting", name: "Counting Sort" },
    { id: "radix", name: "Radix Sort" },
    { id: "bucket", name: "Bucket Sort" },
  ],
  searching: [
    { id: "linear", name: "Linear Search" },
    { id: "binary", name: "Binary Search" },
    { id: "ternary", name: "Ternary Search" },
  ],
  graph: [
    { id: "bfs", name: "Breadth First Search" },
    { id: "dfs", name: "Depth First Search" },
    { id: "dijkstra", name: "Dijkstra's Algorithm" },
    { id: "bellmanFord", name: "Bellman-Ford" },
    { id: "floydWarshall", name: "Floyd-Warshall" },
    { id: "kruskal", name: "Kruskal's MST" },
    { id: "prim", name: "Prim's MST" },
    { id: "topological", name: "Topological Sort" },
    { id: "detectCycle", name: "Cycle Detection" },
  ],
  tree: [
    { id: "inorder", name: "Inorder Traversal" },
    { id: "preorder", name: "Preorder Traversal" },
    { id: "postorder", name: "Postorder Traversal" },
    { id: "levelOrder", name: "Level Order Traversal" },
    { id: "bstInsert", name: "BST Insertion" },
    { id: "bstDelete", name: "BST Deletion" },
    { id: "avlRotation", name: "AVL Rotations" },
    { id: "lca", name: "Lowest Common Ancestor" },
  ],
  dp: [
    { id: "fibonacci", name: "Fibonacci" },
    { id: "knapsack", name: "0/1 Knapsack" },
    { id: "lcs", name: "Longest Common Subsequence" },
    { id: "lis", name: "Longest Increasing Subsequence" },
    { id: "coinChange", name: "Coin Change" },
    { id: "matrixChain", name: "Matrix Chain Multiplication" },
  ],
  backtracking: [
    { id: "nQueens", name: "N-Queens" },
    { id: "sudoku", name: "Sudoku Solver" },
    { id: "subsetGeneration", name: "Subset Generation" },
    { id: "permutations", name: "Permutations" },
  ],
  greedy: [
    { id: "activitySelection", name: "Activity Selection" },
    { id: "huffman", name: "Huffman Coding" },
    { id: "fractionalKnapsack", name: "Fractional Knapsack" },
    { id: "jobScheduling", name: "Job Scheduling" },
  ],
  dataStructures: [
    { id: "arrayOps", name: "Array Operations" },
    { id: "linkedListOps", name: "Linked List" },
    { id: "stackOps", name: "Stack" },
    { id: "queueOps", name: "Queue" },
    { id: "heapOps", name: "Heap" },
  ],
};

export const COMPLEXITY_INFO: Record<string, { time: { best: string; avg: string; worst: string }; space: string }> = {
  bubble: { time: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" }, space: "O(1)" },
  selection: { time: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)" }, space: "O(1)" },
  insertion: { time: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" }, space: "O(1)" },
  merge: { time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(n)" },
  quick: { time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)" }, space: "O(log n)" },
  heap: { time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(1)" },
  counting: { time: { best: "O(n+k)", avg: "O(n+k)", worst: "O(n+k)" }, space: "O(k)" },
  radix: { time: { best: "O(nk)", avg: "O(nk)", worst: "O(nk)" }, space: "O(n+k)" },
  bucket: { time: { best: "O(n+k)", avg: "O(n+k)", worst: "O(n²)" }, space: "O(n)" },
  linear: { time: { best: "O(1)", avg: "O(n)", worst: "O(n)" }, space: "O(1)" },
  binary: { time: { best: "O(1)", avg: "O(log n)", worst: "O(log n)" }, space: "O(1)" },
  ternary: { time: { best: "O(1)", avg: "O(log₃ n)", worst: "O(log₃ n)" }, space: "O(1)" },
  bfs: { time: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)" }, space: "O(V)" },
  dfs: { time: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)" }, space: "O(V)" },
  dijkstra: { time: { best: "O((V+E)logV)", avg: "O((V+E)logV)", worst: "O((V+E)logV)" }, space: "O(V)" },
  bellmanFord: { time: { best: "O(VE)", avg: "O(VE)", worst: "O(VE)" }, space: "O(V)" },
  floydWarshall: { time: { best: "O(V³)", avg: "O(V³)", worst: "O(V³)" }, space: "O(V²)" },
  kruskal: { time: { best: "O(E log E)", avg: "O(E log E)", worst: "O(E log E)" }, space: "O(V)" },
  prim: { time: { best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)" }, space: "O(V)" },
  topological: { time: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)" }, space: "O(V)" },
  detectCycle: { time: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)" }, space: "O(V)" },
  fibonacci: { time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(n)" },
  knapsack: { time: { best: "O(nW)", avg: "O(nW)", worst: "O(nW)" }, space: "O(nW)" },
  lcs: { time: { best: "O(mn)", avg: "O(mn)", worst: "O(mn)" }, space: "O(mn)" },
  lis: { time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(n)" },
  coinChange: { time: { best: "O(nW)", avg: "O(nW)", worst: "O(nW)" }, space: "O(W)" },
  matrixChain: { time: { best: "O(n³)", avg: "O(n³)", worst: "O(n³)" }, space: "O(n²)" },
  nQueens: { time: { best: "O(n!)", avg: "O(n!)", worst: "O(n!)" }, space: "O(n)" },
  sudoku: { time: { best: "O(9^m)", avg: "O(9^m)", worst: "O(9^m)" }, space: "O(1)" },
  subsetGeneration: { time: { best: "O(2^n)", avg: "O(2^n)", worst: "O(2^n)" }, space: "O(n)" },
  permutations: { time: { best: "O(n!)", avg: "O(n!)", worst: "O(n!)" }, space: "O(n)" },
  activitySelection: { time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(1)" },
  huffman: { time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(n)" },
  fractionalKnapsack: { time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(1)" },
  jobScheduling: { time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(n)" },
};
