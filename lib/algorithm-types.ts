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
  inorder: { time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(h)" },
  preorder: { time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(h)" },
  postorder: { time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(h)" },
  levelOrder: { time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(w)" },
  bstInsert: { time: { best: "O(log n)", avg: "O(log n)", worst: "O(n)" }, space: "O(1)" },
  bstDelete: { time: { best: "O(log n)", avg: "O(log n)", worst: "O(n)" }, space: "O(1)" },
  avlRotation: { time: { best: "O(1)", avg: "O(1)", worst: "O(1)" }, space: "O(1)" },
  lca: { time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(n)" },
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

export const ALGORITHM_DESCRIPTIONS: Record<string, { title: string; description: string; keyPoints: string[]; useCases: string[]; pros: string[]; cons: string[] }> = {
  bubble: {
    title: "Bubble Sort",
    description: "Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name because smaller elements 'bubble' to the top of the list.",
    keyPoints: [
      "Compares adjacent pairs of elements",
      "Swaps elements if they are in wrong order",
      "After each pass, the largest unsorted element moves to its correct position",
      "Requires n-1 passes for n elements in worst case"
    ],
    useCases: [
      "Educational purposes to understand sorting concepts",
      "Small datasets where simplicity is preferred",
      "Nearly sorted arrays (optimized version can detect this)"
    ],
    pros: ["Simple to understand and implement", "In-place sorting (O(1) extra space)", "Stable sort (maintains relative order of equal elements)"],
    cons: ["Very slow for large datasets", "O(n²) comparisons even for sorted arrays (without optimization)", "Not suitable for production use with large data"]
  },
  selection: {
    title: "Selection Sort",
    description: "Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list. The algorithm finds the minimum element from the unsorted portion and swaps it with the leftmost unsorted element.",
    keyPoints: [
      "Divides array into sorted and unsorted portions",
      "Finds minimum element in unsorted portion each pass",
      "Swaps minimum with first unsorted element",
      "Makes exactly n-1 swaps for n elements"
    ],
    useCases: [
      "When memory writes are expensive (makes minimum swaps)",
      "Small arrays where simplicity is needed",
      "When auxiliary memory is limited"
    ],
    pros: ["Simple implementation", "Minimal number of swaps (O(n))", "Performs well on small lists"],
    cons: ["O(n²) time complexity always", "Not stable by default", "Doesn't adapt to partially sorted input"]
  },
  insertion: {
    title: "Insertion Sort",
    description: "Insertion Sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the location it belongs within the sorted list, and inserts it there. It is much like sorting playing cards in your hands - you pick up cards one by one and insert each into its proper position.",
    keyPoints: [
      "Builds sorted array one element at a time",
      "Takes each element and inserts into correct position",
      "Shifts elements to make room for insertion",
      "Efficient for small or nearly sorted data"
    ],
    useCases: [
      "Small datasets",
      "Nearly sorted arrays",
      "Online sorting (sorting data as it arrives)",
      "As part of more complex algorithms like Shell Sort"
    ],
    pros: ["Simple implementation", "Efficient for small data", "Adaptive - O(n) for nearly sorted data", "Stable sorting", "In-place algorithm"],
    cons: ["O(n²) worst case complexity", "Slow for large unsorted datasets", "Many shifts required for reverse-sorted data"]
  },
  merge: {
    title: "Merge Sort",
    description: "Merge Sort is an efficient, stable, divide-and-conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. The merge operation is the key process that combines two sorted arrays into one sorted array.",
    keyPoints: [
      "Divide and conquer approach",
      "Recursively divides array into halves",
      "Merges sorted halves back together",
      "Guaranteed O(n log n) performance"
    ],
    useCases: [
      "Sorting linked lists (no extra space needed)",
      "External sorting (large files on disk)",
      "When stable sort is required",
      "Parallel processing scenarios"
    ],
    pros: ["Guaranteed O(n log n) time", "Stable sort", "Parallelizable", "Good for external sorting"],
    cons: ["Requires O(n) extra space", "Not in-place", "Slower for small arrays due to overhead", "Not adaptive"]
  },
  quick: {
    title: "Quick Sort",
    description: "Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element and partitioning the array around the pivot, putting elements smaller than the pivot before it and elements greater after it. The sub-arrays are then recursively sorted.",
    keyPoints: [
      "Divide and conquer with pivot selection",
      "Partitions array around pivot element",
      "Recursively sorts partitions",
      "In-place partitioning possible"
    ],
    useCases: [
      "General-purpose sorting",
      "When average-case performance matters most",
      "Arrays (cache-friendly access patterns)",
      "When in-place sorting is preferred"
    ],
    pros: ["Very fast average case O(n log n)", "In-place sorting", "Cache-efficient", "Good for arrays"],
    cons: ["O(n²) worst case (poor pivot)", "Not stable", "Recursive (stack overflow risk)", "Poor performance on sorted data with naive pivot"]
  },
  heap: {
    title: "Heap Sort",
    description: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max-heap from the input data, then repeatedly extracts the maximum element from the heap and rebuilds the heap until all elements are sorted.",
    keyPoints: [
      "Uses binary heap data structure",
      "Builds max-heap from input array",
      "Repeatedly extracts maximum element",
      "Maintains heap property after each extraction"
    ],
    useCases: [
      "When guaranteed O(n log n) is needed",
      "Systems with limited memory",
      "Priority queue implementations",
      "Finding k largest/smallest elements"
    ],
    pros: ["Guaranteed O(n log n)", "In-place sorting", "No worst-case degradation", "Good for priority queue operations"],
    cons: ["Not stable", "Poor cache performance", "More comparisons than Quick Sort on average", "Complex implementation"]
  },
  linear: {
    title: "Linear Search",
    description: "Linear Search is the simplest searching algorithm that sequentially checks each element of the list until a match is found or the whole list has been searched. It does not require the data to be sorted and works on any data structure that allows sequential access.",
    keyPoints: [
      "Checks elements one by one from start",
      "No preprocessing required",
      "Works on unsorted data",
      "Returns first occurrence found"
    ],
    useCases: [
      "Small datasets",
      "Unsorted data",
      "Single search operations",
      "Linked lists where random access is expensive"
    ],
    pros: ["Simple implementation", "No sorting required", "Works on any data structure", "Finds first occurrence"],
    cons: ["O(n) time complexity", "Slow for large datasets", "Doesn't utilize sorted data", "Inefficient for repeated searches"]
  },
  binary: {
    title: "Binary Search",
    description: "Binary Search is an efficient algorithm for finding an item in a sorted list. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
    keyPoints: [
      "Requires sorted array",
      "Divides search space in half each step",
      "Compares target with middle element",
      "Eliminates half of remaining elements"
    ],
    useCases: [
      "Searching in sorted arrays",
      "Dictionary lookups",
      "Finding boundaries (first/last occurrence)",
      "Database index searches"
    ],
    pros: ["O(log n) time complexity", "Very efficient for large datasets", "Simple to implement", "Optimal for sorted data"],
    cons: ["Requires sorted data", "Only works on random-access structures", "Overhead for small datasets", "Insertion/deletion expensive in sorted arrays"]
  },
  ternary: {
    title: "Ternary Search",
    description: "Ternary Search is a divide and conquer algorithm that divides the search space into three parts instead of two (as in Binary Search). It determines which third of the array the target element lies in and recursively searches that third.",
    keyPoints: [
      "Divides array into three parts",
      "Uses two mid points",
      "Eliminates 2/3 of array each step",
      "More comparisons than binary search"
    ],
    useCases: [
      "Finding maximum/minimum in unimodal functions",
      "Optimization problems",
      "When three-way division is natural",
      "Educational comparison with binary search"
    ],
    pros: ["Useful for unimodal function optimization", "Conceptually interesting", "Can be faster for certain distributions"],
    cons: ["More comparisons than binary search", "Log base 3 vs log base 2 trade-off", "Rarely better than binary search for searching", "More complex implementation"]
  },
  bfs: {
    title: "Breadth First Search (BFS)",
    description: "BFS is a graph traversal algorithm that explores all vertices at the current depth before moving to vertices at the next depth level. It uses a queue data structure and is ideal for finding the shortest path in unweighted graphs.",
    keyPoints: [
      "Level-by-level traversal",
      "Uses queue (FIFO) data structure",
      "Visits all neighbors before going deeper",
      "Finds shortest path in unweighted graphs"
    ],
    useCases: [
      "Shortest path in unweighted graphs",
      "Level order tree traversal",
      "Finding connected components",
      "Web crawlers",
      "Social network analysis"
    ],
    pros: ["Finds shortest path in unweighted graphs", "Complete algorithm", "Good for nearby solutions", "Systematic exploration"],
    cons: ["High memory usage", "Not suitable for deep graphs", "Slower than DFS for some problems", "Doesn't work with weighted graphs for shortest path"]
  },
  dfs: {
    title: "Depth First Search (DFS)",
    description: "DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion) and is useful for topological sorting, cycle detection, and pathfinding.",
    keyPoints: [
      "Explores depth before breadth",
      "Uses stack (LIFO) or recursion",
      "Backtracks when no unvisited neighbors",
      "Good for exhaustive searching"
    ],
    useCases: [
      "Topological sorting",
      "Cycle detection",
      "Maze solving",
      "Finding connected components",
      "Solving puzzles"
    ],
    pros: ["Memory efficient", "Good for deep solutions", "Natural for recursive problems", "Useful for topological sort"],
    cons: ["May not find shortest path", "Can get stuck in deep branches", "Not complete for infinite graphs", "May miss closer solutions"]
  },
  dijkstra: {
    title: "Dijkstra's Algorithm",
    description: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative weights. It uses a greedy approach, always selecting the unvisited vertex with the smallest known distance.",
    keyPoints: [
      "Single-source shortest path algorithm",
      "Works with non-negative edge weights",
      "Uses priority queue for efficiency",
      "Greedy approach selecting minimum distance"
    ],
    useCases: [
      "GPS navigation systems",
      "Network routing protocols",
      "Social network analysis",
      "Game AI pathfinding"
    ],
    pros: ["Optimal for non-negative weights", "Efficient with priority queue", "Well-understood algorithm", "Widely applicable"],
    cons: ["Doesn't work with negative weights", "Slower than specialized algorithms", "Priority queue overhead", "Computes all paths (may be unnecessary)"]
  },
  kruskal: {
    title: "Kruskal's MST Algorithm",
    description: "Kruskal's algorithm finds a Minimum Spanning Tree by sorting all edges by weight and adding them one by one to the MST, as long as they don't create a cycle. It uses Union-Find data structure for efficient cycle detection.",
    keyPoints: [
      "Sorts all edges by weight first",
      "Adds edges that don't create cycles",
      "Uses Union-Find for cycle detection",
      "Works well for sparse graphs"
    ],
    useCases: [
      "Network design (minimum cable)",
      "Circuit design",
      "Cluster analysis",
      "Image segmentation"
    ],
    pros: ["Simple conceptually", "Works well for sparse graphs", "Can easily stop early", "Doesn't need adjacency list"],
    cons: ["Requires sorting all edges", "Union-Find overhead", "Not as efficient for dense graphs", "Needs all edges in memory"]
  },
  prim: {
    title: "Prim's MST Algorithm",
    description: "Prim's algorithm finds a Minimum Spanning Tree by starting from any vertex and repeatedly adding the minimum weight edge that connects a vertex in the tree to a vertex outside the tree.",
    keyPoints: [
      "Grows MST from starting vertex",
      "Always adds minimum edge to new vertex",
      "Uses priority queue for efficiency",
      "Works well for dense graphs"
    ],
    useCases: [
      "Network design",
      "Maze generation",
      "Approximation algorithms",
      "Dense graph MST"
    ],
    pros: ["Better for dense graphs", "Can use adjacency matrix efficiently", "Simple to implement with priority queue"],
    cons: ["Needs connected graph", "Starting vertex choice arbitrary", "Less intuitive than Kruskal's", "Priority queue updates can be expensive"]
  },
  inorder: {
    title: "Inorder Tree Traversal",
    description: "Inorder traversal visits nodes in the order: Left subtree, Root, Right subtree. For Binary Search Trees, this produces nodes in sorted (ascending) order, making it very useful for BST operations.",
    keyPoints: [
      "Left -> Root -> Right order",
      "Produces sorted output for BST",
      "Uses recursion or stack",
      "O(n) time, O(h) space"
    ],
    useCases: [
      "Getting sorted elements from BST",
      "Expression tree evaluation",
      "Validating BST property",
      "Finding kth smallest element"
    ],
    pros: ["Natural sorting for BST", "Simple recursive implementation", "Foundation for BST operations"],
    cons: ["Stack overflow for deep trees", "Not tail recursive", "Requires modification for iterative version"]
  },
  preorder: {
    title: "Preorder Tree Traversal",
    description: "Preorder traversal visits nodes in the order: Root, Left subtree, Right subtree. It's used to create a copy of the tree and is useful for prefix expression evaluation.",
    keyPoints: [
      "Root -> Left -> Right order",
      "Root processed before children",
      "Used for tree copying/serialization",
      "Prefix expression evaluation"
    ],
    useCases: [
      "Creating tree copy",
      "Serializing tree structure",
      "Prefix expression evaluation",
      "Directory tree listing"
    ],
    pros: ["Good for tree reconstruction", "Simple implementation", "Natural for expression trees"],
    cons: ["Doesn't produce sorted output", "Stack space required"]
  },
  postorder: {
    title: "Postorder Tree Traversal",
    description: "Postorder traversal visits nodes in the order: Left subtree, Right subtree, Root. It's used to delete trees and evaluate postfix expressions.",
    keyPoints: [
      "Left -> Right -> Root order",
      "Children processed before root",
      "Used for tree deletion",
      "Postfix expression evaluation"
    ],
    useCases: [
      "Deleting tree (children before parent)",
      "Postfix expression evaluation",
      "Computing directory sizes",
      "Garbage collection"
    ],
    pros: ["Safe for deletion operations", "Natural for bottom-up computations", "Useful for expression evaluation"],
    cons: ["Not intuitive order", "Doesn't produce sorted output"]
  },
  levelOrder: {
    title: "Level Order Traversal (BFS)",
    description: "Level Order traversal visits nodes level by level from top to bottom and left to right. It uses a queue and is essentially BFS applied to trees.",
    keyPoints: [
      "Visits level by level",
      "Uses queue data structure",
      "Left to right within each level",
      "Good for level-related operations"
    ],
    useCases: [
      "Level-wise operations",
      "Finding tree width",
      "Connect nodes at same level",
      "Serialization/deserialization"
    ],
    pros: ["Intuitive level-by-level output", "Good for finding closest nodes", "Works well for complete trees"],
    cons: ["More memory than recursive traversals", "Queue overhead"]
  },
  fibonacci: {
    title: "Fibonacci (Dynamic Programming)",
    description: "Computing Fibonacci numbers using dynamic programming avoids the exponential time complexity of naive recursion by storing previously computed values. This is a classic example of overlapping subproblems.",
    keyPoints: [
      "F(n) = F(n-1) + F(n-2)",
      "Base cases: F(0)=0, F(1)=1",
      "Stores computed values",
      "Bottom-up or top-down approach"
    ],
    useCases: [
      "Learning DP concepts",
      "Mathematical computations",
      "Golden ratio approximation",
      "Nature-inspired algorithms"
    ],
    pros: ["O(n) time vs O(2^n) naive", "Space can be O(1) with optimization", "Classic DP example"],
    cons: ["Limited by integer overflow", "Simple problem that doesn't fully showcase DP power"]
  },
  knapsack: {
    title: "0/1 Knapsack Problem",
    description: "The 0/1 Knapsack problem asks for the maximum value that can be obtained by selecting items with given weights and values, subject to a weight capacity. Each item can only be taken once (hence 0/1).",
    keyPoints: [
      "Choose items to maximize value",
      "Each item taken at most once",
      "Weight constraint must be satisfied",
      "2D DP table approach"
    ],
    useCases: [
      "Resource allocation",
      "Budget optimization",
      "Cargo loading",
      "Investment portfolio selection"
    ],
    pros: ["Optimal solution guaranteed", "Polynomial time for integer weights", "Widely applicable pattern"],
    cons: ["Pseudo-polynomial time", "High space complexity", "Not suitable for very large capacities"]
  },
  lcs: {
    title: "Longest Common Subsequence",
    description: "LCS finds the longest subsequence present in both strings. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.",
    keyPoints: [
      "Subsequence maintains relative order",
      "2D DP table comparing characters",
      "Can reconstruct actual LCS",
      "Classic DP problem"
    ],
    useCases: [
      "Diff utilities (file comparison)",
      "DNA sequence alignment",
      "Version control systems",
      "Plagiarism detection"
    ],
    pros: ["Optimal solution", "Can reconstruct LCS", "Foundation for edit distance"],
    cons: ["O(mn) space complexity", "Slow for very long sequences"]
  },
  coinChange: {
    title: "Coin Change Problem",
    description: "Given coins of different denominations and a total amount, find the minimum number of coins needed to make up that amount. This is a classic DP problem with many real-world applications.",
    keyPoints: [
      "Find minimum coins for amount",
      "Unlimited supply of each denomination",
      "1D DP table sufficient",
      "Bottom-up approach common"
    ],
    useCases: [
      "Currency exchange",
      "Making change optimally",
      "Resource minimization",
      "Optimization problems"
    ],
    pros: ["Optimal solution", "Space efficient (1D array)", "Many variations possible"],
    cons: ["Only works for integer amounts", "Slow for very large amounts"]
  },
  nQueens: {
    title: "N-Queens Problem",
    description: "Place N chess queens on an N×N chessboard so that no two queens threaten each other. This means no two queens can share the same row, column, or diagonal. A classic backtracking problem.",
    keyPoints: [
      "Place queens row by row",
      "Check column and diagonal conflicts",
      "Backtrack when stuck",
      "Find all or one solution"
    ],
    useCases: [
      "Constraint satisfaction problems",
      "Parallel processing scheduling",
      "VLSI testing",
      "AI and search algorithms"
    ],
    pros: ["Demonstrates backtracking clearly", "Multiple solutions possible", "Constraint checking is efficient"],
    cons: ["Exponential time complexity", "Limited to small N in practice"]
  },
  permutations: {
    title: "Generate Permutations",
    description: "Generate all possible arrangements of a set of elements. For n distinct elements, there are n! permutations. This is a fundamental backtracking problem.",
    keyPoints: [
      "n! total permutations for n elements",
      "Try each unused element at each position",
      "Backtrack after exploring each choice",
      "Can handle duplicates with modifications"
    ],
    useCases: [
      "Combinatorial optimization",
      "Scheduling problems",
      "Testing all possibilities",
      "Cryptography"
    ],
    pros: ["Generates all possibilities", "Simple recursive pattern", "Easily modified for constraints"],
    cons: ["n! time complexity", "Memory intensive for large n"]
  },
  subsetGeneration: {
    title: "Subset Generation",
    description: "Generate all possible subsets (power set) of a given set. For a set with n elements, there are 2^n subsets including the empty set and the set itself.",
    keyPoints: [
      "2^n total subsets",
      "Include or exclude each element",
      "Empty set and full set included",
      "Can use bits or backtracking"
    ],
    useCases: [
      "Subset sum problems",
      "Feature selection",
      "Combinatorial testing",
      "Set cover problems"
    ],
    pros: ["Systematic enumeration", "Multiple implementation approaches", "Foundation for many problems"],
    cons: ["Exponential output size", "Not practical for large sets"]
  },
  counting: {
    title: "Counting Sort",
    description: "Counting Sort is a non-comparison-based sorting algorithm that counts the occurrences of each unique element to determine positions. It works well when the range of input values (k) is not significantly greater than the number of elements (n).",
    keyPoints: [
      "Counts occurrences of each element",
      "Uses count array for frequency",
      "Reconstructs sorted array from counts",
      "Linear time when k = O(n)"
    ],
    useCases: [
      "Sorting integers in known range",
      "Sorting characters/ASCII values",
      "When k is small relative to n",
      "Stable sorting requirements"
    ],
    pros: ["O(n+k) time complexity", "Stable sorting", "Very fast for small ranges", "No comparisons needed"],
    cons: ["Only works for integers", "Requires O(k) extra space", "Inefficient for large ranges", "Cannot sort negative numbers directly"]
  },
  radix: {
    title: "Radix Sort",
    description: "Radix Sort processes elements digit by digit, starting from the least significant digit to the most significant. It uses a stable sorting algorithm (typically Counting Sort) as a subroutine for each digit position.",
    keyPoints: [
      "Sorts digit by digit (LSD or MSD)",
      "Uses stable sort for each digit",
      "Works for fixed-length integers",
      "Linear time for d digits"
    ],
    useCases: [
      "Sorting large integers",
      "Fixed-length strings",
      "Phone numbers, ZIP codes",
      "When comparison is expensive"
    ],
    pros: ["O(d(n+k)) time", "Linear for fixed digits", "Stable sorting", "Works for strings"],
    cons: ["Only for integers/strings", "Extra space needed", "Constant factor overhead", "Not in-place"]
  },
  bucket: {
    title: "Bucket Sort",
    description: "Bucket Sort distributes elements into a number of buckets, sorts each bucket individually (often using another algorithm), and then concatenates the sorted buckets. Works best when input is uniformly distributed.",
    keyPoints: [
      "Distributes into buckets",
      "Sorts each bucket separately",
      "Concatenates sorted buckets",
      "Assumes uniform distribution"
    ],
    useCases: [
      "Uniformly distributed data",
      "Floating-point numbers",
      "External sorting",
      "When distribution is known"
    ],
    pros: ["O(n) average for uniform data", "Simple concept", "Parallelizable", "Works with any range"],
    cons: ["O(n²) worst case", "Assumes distribution", "Extra space for buckets", "Bucket selection crucial"]
  },
  bellmanFord: {
    title: "Bellman-Ford Algorithm",
    description: "Bellman-Ford finds shortest paths from a source to all vertices, even with negative edge weights. It can also detect negative weight cycles, making it more versatile than Dijkstra's algorithm.",
    keyPoints: [
      "Works with negative weights",
      "Detects negative cycles",
      "Relaxes all edges V-1 times",
      "Single-source shortest path"
    ],
    useCases: [
      "Graphs with negative weights",
      "Currency arbitrage detection",
      "Network routing with costs",
      "When negative cycles matter"
    ],
    pros: ["Handles negative weights", "Detects negative cycles", "Simple implementation", "Works on any graph"],
    cons: ["O(VE) time complexity", "Slower than Dijkstra", "Not suitable for dense graphs"]
  },
  floydWarshall: {
    title: "Floyd-Warshall Algorithm",
    description: "Floyd-Warshall computes shortest paths between all pairs of vertices. It uses dynamic programming and can handle negative weights (but not negative cycles).",
    keyPoints: [
      "All-pairs shortest paths",
      "Dynamic programming approach",
      "Considers intermediate vertices",
      "O(V³) time complexity"
    ],
    useCases: [
      "All-pairs shortest paths",
      "Transitive closure",
      "Detecting negative cycles",
      "Dense graph shortest paths"
    ],
    pros: ["All pairs in one run", "Simple implementation", "Handles negative weights", "Good for dense graphs"],
    cons: ["O(V³) time", "O(V²) space", "Slow for sparse graphs", "Cannot handle negative cycles"]
  },
  topological: {
    title: "Topological Sort",
    description: "Topological Sort produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u→v, vertex u comes before v in the ordering.",
    keyPoints: [
      "Only works on DAGs",
      "Linear ordering of vertices",
      "Uses DFS or Kahn's algorithm",
      "Multiple valid orderings possible"
    ],
    useCases: [
      "Task scheduling",
      "Build systems",
      "Course prerequisites",
      "Dependency resolution"
    ],
    pros: ["O(V+E) time", "Detects cycles", "Multiple implementations", "Practical applications"],
    cons: ["Only for DAGs", "Not unique ordering", "Requires preprocessing"]
  },
  detectCycle: {
    title: "Cycle Detection",
    description: "Cycle Detection determines whether a graph contains a cycle. Different algorithms are used for directed (DFS with colors) and undirected graphs (DFS with parent tracking or Union-Find).",
    keyPoints: [
      "Different for directed/undirected",
      "Uses DFS or Union-Find",
      "Colors for directed graphs",
      "Parent tracking for undirected"
    ],
    useCases: [
      "Detecting deadlocks",
      "Validating DAGs",
      "Finding circular dependencies",
      "Graph preprocessing"
    ],
    pros: ["O(V+E) time", "Simple implementation", "Important preprocessing step"],
    cons: ["Different algorithms needed", "Only detects presence, not all cycles"]
  },
  bstInsert: {
    title: "BST Insertion",
    description: "BST Insertion adds a new node to a Binary Search Tree while maintaining the BST property: all left descendants are smaller than the node, and all right descendants are larger.",
    keyPoints: [
      "Maintains BST property",
      "Compares with each node",
      "Goes left or right based on value",
      "O(h) time where h is height"
    ],
    useCases: [
      "Building search trees",
      "Dynamic data sets",
      "Maintaining sorted order",
      "Database indexing"
    ],
    pros: ["O(log n) average", "Maintains order", "Simple implementation"],
    cons: ["O(n) worst case", "Can become unbalanced", "No rebalancing"]
  },
  bstDelete: {
    title: "BST Deletion",
    description: "BST Deletion removes a node while maintaining the BST property. The complexity depends on the number of children: no children (simple remove), one child (replace with child), or two children (replace with successor/predecessor).",
    keyPoints: [
      "Three cases based on children",
      "Find in-order successor/predecessor",
      "Maintain BST property",
      "May require tree restructuring"
    ],
    useCases: [
      "Removing data from trees",
      "Dynamic data management",
      "Database operations"
    ],
    pros: ["O(log n) average", "Maintains tree structure", "Well-defined cases"],
    cons: ["O(n) worst case", "Complex with two children", "Can unbalance tree"]
  },
  avlRotation: {
    title: "AVL Tree Rotations",
    description: "AVL rotations are operations that rebalance an AVL tree after insertions or deletions. There are four types: Left rotation, Right rotation, Left-Right rotation, and Right-Left rotation.",
    keyPoints: [
      "Four rotation types",
      "Maintains balance factor",
      "O(1) per rotation",
      "Triggers on imbalance"
    ],
    useCases: [
      "Self-balancing trees",
      "Guaranteed O(log n) operations",
      "Databases requiring consistency"
    ],
    pros: ["Maintains balance", "O(1) rotation", "Guarantees O(log n) height"],
    cons: ["Complex implementation", "Extra storage for balance factor", "Rotation overhead"]
  },
  lca: {
    title: "Lowest Common Ancestor",
    description: "The Lowest Common Ancestor (LCA) of two nodes in a tree is the deepest node that is an ancestor of both. Various algorithms exist with different preprocessing and query time trade-offs.",
    keyPoints: [
      "Deepest common ancestor",
      "Multiple algorithm approaches",
      "Can preprocess for fast queries",
      "Binary lifting for efficiency"
    ],
    useCases: [
      "Tree distance queries",
      "Version control systems",
      "Computational biology",
      "Network routing"
    ],
    pros: ["O(1) or O(log n) queries possible", "Useful for many tree problems"],
    cons: ["Preprocessing may be needed", "Trade-off between space and time"]
  },
  lis: {
    title: "Longest Increasing Subsequence",
    description: "LIS finds the longest subsequence of a given sequence in which the subsequence's elements are in sorted order, lowest to highest, and in which the subsequence is as long as possible.",
    keyPoints: [
      "Subsequence not substring",
      "Elements must be increasing",
      "O(n²) DP or O(n log n) with binary search",
      "Can reconstruct the sequence"
    ],
    useCases: [
      "Sequence analysis",
      "Bioinformatics",
      "Stock market analysis",
      "Patience sorting"
    ],
    pros: ["O(n log n) optimal", "Multiple approaches", "Useful building block"],
    cons: ["Reconstruction adds complexity", "Not unique solution"]
  },
  matrixChain: {
    title: "Matrix Chain Multiplication",
    description: "Matrix Chain Multiplication finds the most efficient way to multiply a chain of matrices. The problem is to find the optimal parenthesization that minimizes the total number of scalar multiplications.",
    keyPoints: [
      "Order of multiplication matters",
      "Parenthesization affects cost",
      "DP on subproblems",
      "O(n³) time complexity"
    ],
    useCases: [
      "Optimizing matrix computations",
      "Compiler optimization",
      "Scientific computing",
      "Graphics transformations"
    ],
    pros: ["Optimal solution guaranteed", "Classic DP example"],
    cons: ["O(n³) time", "O(n²) space", "Complex reconstruction"]
  },
  sudoku: {
    title: "Sudoku Solver",
    description: "Sudoku Solver uses backtracking to fill a 9x9 grid so that each column, each row, and each of the nine 3x3 subgrids contain all digits from 1 to 9.",
    keyPoints: [
      "9x9 grid constraint satisfaction",
      "Row, column, box constraints",
      "Try digits 1-9 at each cell",
      "Backtrack on violation"
    ],
    useCases: [
      "Puzzle solving",
      "Constraint satisfaction",
      "Logic game AI",
      "Testing backtracking skills"
    ],
    pros: ["Guaranteed solution if exists", "Clear constraint model", "Educational value"],
    cons: ["Exponential worst case", "Many recursive calls", "Can be slow for hard puzzles"]
  },
  activitySelection: {
    title: "Activity Selection",
    description: "Activity Selection is a classic greedy problem where you select the maximum number of non-overlapping activities from a set of activities with start and finish times.",
    keyPoints: [
      "Sort by finish time",
      "Greedily select earliest finish",
      "Check for overlap",
      "Optimal greedy solution"
    ],
    useCases: [
      "Scheduling meetings",
      "Resource allocation",
      "Event planning",
      "CPU scheduling"
    ],
    pros: ["O(n log n) time", "Provably optimal", "Simple greedy approach"],
    cons: ["Requires sorting", "Only one resource", "Specific problem structure"]
  },
  huffman: {
    title: "Huffman Coding",
    description: "Huffman Coding is a greedy algorithm for lossless data compression. It assigns variable-length codes to characters based on their frequencies, with more frequent characters getting shorter codes.",
    keyPoints: [
      "Builds optimal prefix code",
      "Uses priority queue",
      "Shorter codes for frequent chars",
      "Builds tree bottom-up"
    ],
    useCases: [
      "File compression",
      "Data transmission",
      "JPEG, MP3 compression",
      "Text encoding"
    ],
    pros: ["Optimal prefix code", "Simple implementation", "Widely used"],
    cons: ["Requires frequency table", "Two passes needed", "Overhead for small files"]
  },
  fractionalKnapsack: {
    title: "Fractional Knapsack",
    description: "Unlike 0/1 Knapsack, Fractional Knapsack allows taking fractions of items. The greedy approach of taking items with the best value-to-weight ratio first gives the optimal solution.",
    keyPoints: [
      "Can take fractions of items",
      "Sort by value/weight ratio",
      "Greedy selection is optimal",
      "Different from 0/1 knapsack"
    ],
    useCases: [
      "Resource allocation",
      "Investment portfolios",
      "Cargo loading",
      "When items are divisible"
    ],
    pros: ["O(n log n) time", "Greedy is optimal", "Simple implementation"],
    cons: ["Only for divisible items", "Not applicable to discrete problems"]
  },
  jobScheduling: {
    title: "Job Scheduling",
    description: "Job Scheduling with deadlines finds the sequence of jobs that maximizes profit, where each job has a deadline and profit. It uses a greedy approach based on profit.",
    keyPoints: [
      "Jobs have deadlines and profits",
      "Sort by profit descending",
      "Assign to latest available slot",
      "Greedy selection"
    ],
    useCases: [
      "Task scheduling",
      "Manufacturing planning",
      "Project management",
      "CPU job scheduling"
    ],
    pros: ["Simple greedy approach", "Practical applications", "O(n²) or O(n log n)"],
    cons: ["Assumes unit time jobs", "Specific problem constraints", "May need Union-Find optimization"]
  }
};
