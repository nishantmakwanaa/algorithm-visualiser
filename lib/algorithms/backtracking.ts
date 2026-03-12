import type { AnimationStep } from "../algorithm-types";

export interface BacktrackingState {
  board: (number | string)[][];
  currentRow: number;
  currentCol: number;
  solutions: (number | string)[][][];
  isSolved: boolean;
}

export async function* nQueens(
  n: number,
  onStep: (step: AnimationStep & { backtrackingState: BacktrackingState }) => void
): AsyncGenerator<AnimationStep & { backtrackingState: BacktrackingState }> {
  const board: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const solutions: number[][][] = [];

  function isSafe(row: number, col: number): boolean {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false;
    }
    // Check upper left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }
    // Check upper right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 1) return false;
    }
    return true;
  }

  async function* solve(row: number): AsyncGenerator<AnimationStep & { backtrackingState: BacktrackingState }> {
    if (row === n) {
      solutions.push(board.map((r) => [...r]));
      const solutionStep = {
        type: "solution-found",
        indices: [],
        description: `Solution ${solutions.length} found!`,
        backtrackingState: {
          board: board.map((r) => [...r]),
          currentRow: -1,
          currentCol: -1,
          solutions: solutions.map((s) => s.map((r) => [...r])),
          isSolved: true,
        },
      };
      yield solutionStep;
      onStep(solutionStep);
      return;
    }

    for (let col = 0; col < n; col++) {
      const tryStep = {
        type: "try",
        indices: [],
        description: `Trying to place queen at row ${row}, col ${col}`,
        backtrackingState: {
          board: board.map((r) => [...r]),
          currentRow: row,
          currentCol: col,
          solutions: solutions.map((s) => s.map((r) => [...r])),
          isSolved: false,
        },
      };
      yield tryStep;
      onStep(tryStep);

      if (isSafe(row, col)) {
        board[row][col] = 1;

        const placeStep = {
          type: "place",
          indices: [],
          description: `Placed queen at row ${row}, col ${col}`,
          backtrackingState: {
            board: board.map((r) => [...r]),
            currentRow: row,
            currentCol: col,
            solutions: solutions.map((s) => s.map((r) => [...r])),
            isSolved: false,
          },
        };
        yield placeStep;
        onStep(placeStep);

        yield* solve(row + 1);

        board[row][col] = 0;

        const backtrackStep = {
          type: "backtrack",
          indices: [],
          description: `Backtracking: removed queen from row ${row}, col ${col}`,
          backtrackingState: {
            board: board.map((r) => [...r]),
            currentRow: row,
            currentCol: col,
            solutions: solutions.map((s) => s.map((r) => [...r])),
            isSolved: false,
          },
        };
        yield backtrackStep;
        onStep(backtrackStep);
      } else {
        const unsafeStep = {
          type: "unsafe",
          indices: [],
          description: `Position (${row}, ${col}) is not safe`,
          backtrackingState: {
            board: board.map((r) => [...r]),
            currentRow: row,
            currentCol: col,
            solutions: solutions.map((s) => s.map((r) => [...r])),
            isSolved: false,
          },
        };
        yield unsafeStep;
        onStep(unsafeStep);
      }
    }
  }

  const initStep = {
    type: "init",
    indices: [],
    description: `Solving ${n}-Queens problem`,
    backtrackingState: {
      board: board.map((r) => [...r]),
      currentRow: 0,
      currentCol: 0,
      solutions: [],
      isSolved: false,
    },
  };
  yield initStep;
  onStep(initStep);

  yield* solve(0);

  const completeStep = {
    type: "complete",
    indices: [],
    description: `Found ${solutions.length} solution(s) for ${n}-Queens`,
    backtrackingState: {
      board: solutions[0] || board.map((r) => [...r]),
      currentRow: -1,
      currentCol: -1,
      solutions: solutions.map((s) => s.map((r) => [...r])),
      isSolved: solutions.length > 0,
    },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* generatePermutations(
  arr: number[],
  onStep: (step: AnimationStep & { backtrackingState: BacktrackingState }) => void
): AsyncGenerator<AnimationStep & { backtrackingState: BacktrackingState }> {
  const permutations: number[][] = [];
  const current: number[] = [];
  const used: boolean[] = new Array(arr.length).fill(false);

  async function* permute(): AsyncGenerator<AnimationStep & { backtrackingState: BacktrackingState }> {
    if (current.length === arr.length) {
      permutations.push([...current]);
      const foundStep = {
        type: "permutation-found",
        indices: [],
        description: `Permutation found: [${current.join(", ")}]`,
        backtrackingState: {
          board: [current],
          currentRow: 0,
          currentCol: current.length - 1,
          solutions: permutations.map((p) => [p]),
          isSolved: false,
        },
      };
      yield foundStep;
      onStep(foundStep);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (used[i]) continue;

      const tryStep = {
        type: "try",
        indices: [],
        description: `Trying to add ${arr[i]} to current permutation [${current.join(", ")}]`,
        backtrackingState: {
          board: [[...current, arr[i]]],
          currentRow: 0,
          currentCol: current.length,
          solutions: permutations.map((p) => [p]),
          isSolved: false,
        },
      };
      yield tryStep;
      onStep(tryStep);

      current.push(arr[i]);
      used[i] = true;

      yield* permute();

      current.pop();
      used[i] = false;

      const backtrackStep = {
        type: "backtrack",
        indices: [],
        description: `Backtracking: removed ${arr[i]}`,
        backtrackingState: {
          board: [[...current]],
          currentRow: 0,
          currentCol: current.length,
          solutions: permutations.map((p) => [p]),
          isSolved: false,
        },
      };
      yield backtrackStep;
      onStep(backtrackStep);
    }
  }

  const initStep = {
    type: "init",
    indices: [],
    description: `Generating permutations of [${arr.join(", ")}]`,
    backtrackingState: {
      board: [arr],
      currentRow: 0,
      currentCol: 0,
      solutions: [],
      isSolved: false,
    },
  };
  yield initStep;
  onStep(initStep);

  yield* permute();

  const completeStep = {
    type: "complete",
    indices: [],
    description: `Generated ${permutations.length} permutations`,
    backtrackingState: {
      board: permutations[0] ? [permutations[0]] : [arr],
      currentRow: 0,
      currentCol: 0,
      solutions: permutations.map((p) => [p]),
      isSolved: true,
    },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* generateSubsets(
  arr: number[],
  onStep: (step: AnimationStep & { backtrackingState: BacktrackingState }) => void
): AsyncGenerator<AnimationStep & { backtrackingState: BacktrackingState }> {
  const subsets: number[][] = [];
  const current: number[] = [];

  async function* generate(index: number): AsyncGenerator<AnimationStep & { backtrackingState: BacktrackingState }> {
    subsets.push([...current]);

    const addStep = {
      type: "subset-added",
      indices: [],
      description: `Subset found: [${current.length === 0 ? "∅" : current.join(", ")}]`,
      backtrackingState: {
        board: [[...current]],
        currentRow: 0,
        currentCol: current.length,
        solutions: subsets.map((s) => [s]),
        isSolved: false,
      },
    };
    yield addStep;
    onStep(addStep);

    for (let i = index; i < arr.length; i++) {
      const tryStep = {
        type: "try",
        indices: [],
        description: `Including ${arr[i]} in current subset`,
        backtrackingState: {
          board: [[...current, arr[i]]],
          currentRow: 0,
          currentCol: current.length,
          solutions: subsets.map((s) => [s]),
          isSolved: false,
        },
      };
      yield tryStep;
      onStep(tryStep);

      current.push(arr[i]);
      yield* generate(i + 1);
      current.pop();

      const backtrackStep = {
        type: "backtrack",
        indices: [],
        description: `Excluding ${arr[i]} from current subset`,
        backtrackingState: {
          board: [[...current]],
          currentRow: 0,
          currentCol: current.length,
          solutions: subsets.map((s) => [s]),
          isSolved: false,
        },
      };
      yield backtrackStep;
      onStep(backtrackStep);
    }
  }

  const initStep = {
    type: "init",
    indices: [],
    description: `Generating subsets of [${arr.join(", ")}]`,
    backtrackingState: {
      board: [arr],
      currentRow: 0,
      currentCol: 0,
      solutions: [],
      isSolved: false,
    },
  };
  yield initStep;
  onStep(initStep);

  yield* generate(0);

  const completeStep = {
    type: "complete",
    indices: [],
    description: `Generated ${subsets.length} subsets (2^${arr.length})`,
    backtrackingState: {
      board: [arr],
      currentRow: 0,
      currentCol: 0,
      solutions: subsets.map((s) => [s]),
      isSolved: true,
    },
  };
  yield completeStep;
  onStep(completeStep);
}

export const BACKTRACKING_CODE = {
  nQueens: {
    python: `def solve_n_queens(n):
    board = [['.'] * n for _ in range(n)]
    solutions = []
    
    def is_safe(row, col):
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        for i, j in zip(range(row-1, -1, -1), range(col-1, -1, -1)):
            if board[i][j] == 'Q':
                return False
        for i, j in zip(range(row-1, -1, -1), range(col+1, n)):
            if board[i][j] == 'Q':
                return False
        return True
    
    def solve(row):
        if row == n:
            solutions.append([''.join(r) for r in board])
            return
        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                solve(row + 1)
                board[row][col] = '.'
    
    solve(0)
    return solutions`,
    javascript: `function solveNQueens(n) {
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  const solutions = [];
  
  function isSafe(row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    return true;
  }
  
  function solve(row) {
    if (row === n) {
      solutions.push(board.map(r => r.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        solve(row + 1);
        board[row][col] = '.';
      }
    }
  }
  
  solve(0);
  return solutions;
}`,
    cpp: `class Solution {
    vector<vector<string>> solutions;
    vector<string> board;
    int n;
    
    bool isSafe(int row, int col) {
        for (int i = 0; i < row; i++)
            if (board[i][col] == 'Q') return false;
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] == 'Q') return false;
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++)
            if (board[i][j] == 'Q') return false;
        return true;
    }
    
    void solve(int row) {
        if (row == n) {
            solutions.push_back(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';
                solve(row + 1);
                board[row][col] = '.';
            }
        }
    }
    
public:
    vector<vector<string>> solveNQueens(int n) {
        this->n = n;
        board = vector<string>(n, string(n, '.'));
        solve(0);
        return solutions;
    }
};`,
  },
  permutations: {
    python: `def permutations(nums):
    result = []
    
    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return
        for i in range(len(remaining)):
            current.append(remaining[i])
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()
    
    backtrack([], nums)
    return result`,
    javascript: `function permutations(nums) {
  const result = [];
  
  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      backtrack(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
      current.pop();
    }
  }
  
  backtrack([], nums);
  return result;
}`,
    cpp: `class Solution {
    vector<vector<int>> result;
    
    void backtrack(vector<int>& current, vector<int>& remaining) {
        if (remaining.empty()) {
            result.push_back(current);
            return;
        }
        for (int i = 0; i < remaining.size(); i++) {
            current.push_back(remaining[i]);
            vector<int> newRemaining;
            for (int j = 0; j < remaining.size(); j++) {
                if (j != i) newRemaining.push_back(remaining[j]);
            }
            backtrack(current, newRemaining);
            current.pop_back();
        }
    }
    
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<int> current;
        backtrack(current, nums);
        return result;
    }
};`,
  },
  subsetGeneration: {
    python: `def subsets(nums):
    result = []
    
    def backtrack(start, current):
        result.append(current[:])
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    
    backtrack(0, [])
    return result`,
    javascript: `function subsets(nums) {
  const result = [];
  
  function backtrack(start, current) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}`,
    cpp: `class Solution {
    vector<vector<int>> result;
    
    void backtrack(int start, vector<int>& current, vector<int>& nums) {
        result.push_back(current);
        for (int i = start; i < nums.size(); i++) {
            current.push_back(nums[i]);
            backtrack(i + 1, current, nums);
            current.pop_back();
        }
    }
    
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<int> current;
        backtrack(0, current, nums);
        return result;
    }
};`,
  },
};
