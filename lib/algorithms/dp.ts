import type { AnimationStep } from "../algorithm-types";

export interface DPState {
  table: number[][];
  currentCell: [number, number] | null;
  highlightedCells: [number, number][];
  result: number | string;
}

export async function* fibonacci(
  n: number,
  onStep: (step: AnimationStep & { dpState: DPState }) => void
): AsyncGenerator<AnimationStep & { dpState: DPState }> {
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 0;
  if (n >= 1) dp[1] = 1;

  const table: number[][] = [dp.map((v, i) => (i <= 1 ? v : -1))];

  const initStep = {
    type: "init",
    indices: [],
    description: `Computing Fibonacci(${n}) using dynamic programming`,
    dpState: { table: [[...dp]], currentCell: null, highlightedCells: [], result: 0 },
  };
  yield initStep;
  onStep(initStep);

  for (let i = 2; i <= n; i++) {
    const lookupStep = {
      type: "lookup",
      indices: [],
      description: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]}`,
      dpState: {
        table: [[...dp]],
        currentCell: [0, i] as [number, number],
        highlightedCells: [[0, i - 1], [0, i - 2]] as [number, number][],
        result: dp[i - 1] + dp[i - 2],
      },
    };
    yield lookupStep;
    onStep(lookupStep);

    dp[i] = dp[i - 1] + dp[i - 2];

    const fillStep = {
      type: "fill",
      indices: [],
      description: `F(${i}) = ${dp[i]}`,
      dpState: {
        table: [[...dp]],
        currentCell: [0, i] as [number, number],
        highlightedCells: [[0, i]] as [number, number][],
        result: dp[i],
      },
    };
    yield fillStep;
    onStep(fillStep);
  }

  const completeStep = {
    type: "complete",
    indices: [],
    description: `Fibonacci(${n}) = ${dp[n]}`,
    dpState: {
      table: [[...dp]],
      currentCell: null,
      highlightedCells: [[0, n]] as [number, number][],
      result: dp[n],
    },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* knapsack(
  weights: number[],
  values: number[],
  capacity: number,
  onStep: (step: AnimationStep & { dpState: DPState }) => void
): AsyncGenerator<AnimationStep & { dpState: DPState }> {
  const n = weights.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  const initStep = {
    type: "init",
    indices: [],
    description: `0/1 Knapsack: ${n} items, capacity ${capacity}`,
    dpState: { table: dp.map((row) => [...row]), currentCell: null, highlightedCells: [], result: 0 },
  };
  yield initStep;
  onStep(initStep);

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      const itemIdx = i - 1;

      if (weights[itemIdx] <= w) {
        const withItem = values[itemIdx] + dp[i - 1][w - weights[itemIdx]];
        const withoutItem = dp[i - 1][w];

        const considerStep = {
          type: "consider",
          indices: [],
          description: `Item ${i}: weight=${weights[itemIdx]}, value=${values[itemIdx]}. With: ${withItem}, Without: ${withoutItem}`,
          dpState: {
            table: dp.map((row) => [...row]),
            currentCell: [i, w] as [number, number],
            highlightedCells: [[i - 1, w], [i - 1, w - weights[itemIdx]]] as [number, number][],
            result: Math.max(withItem, withoutItem),
          },
        };
        yield considerStep;
        onStep(considerStep);

        dp[i][w] = Math.max(withItem, withoutItem);
      } else {
        dp[i][w] = dp[i - 1][w];
      }

      const fillStep = {
        type: "fill",
        indices: [],
        description: `dp[${i}][${w}] = ${dp[i][w]}`,
        dpState: {
          table: dp.map((row) => [...row]),
          currentCell: [i, w] as [number, number],
          highlightedCells: [[i, w]] as [number, number][],
          result: dp[i][w],
        },
      };
      yield fillStep;
      onStep(fillStep);
    }
  }

  const completeStep = {
    type: "complete",
    indices: [],
    description: `Maximum value: ${dp[n][capacity]}`,
    dpState: {
      table: dp.map((row) => [...row]),
      currentCell: null,
      highlightedCells: [[n, capacity]] as [number, number][],
      result: dp[n][capacity],
    },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* lcs(
  str1: string,
  str2: string,
  onStep: (step: AnimationStep & { dpState: DPState }) => void
): AsyncGenerator<AnimationStep & { dpState: DPState }> {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  const initStep = {
    type: "init",
    indices: [],
    description: `Finding LCS of "${str1}" and "${str2}"`,
    dpState: { table: dp.map((row) => [...row]), currentCell: null, highlightedCells: [], result: 0 },
  };
  yield initStep;
  onStep(initStep);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        const matchStep = {
          type: "match",
          indices: [],
          description: `Match! '${str1[i - 1]}' === '${str2[j - 1]}'. dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1`,
          dpState: {
            table: dp.map((row) => [...row]),
            currentCell: [i, j] as [number, number],
            highlightedCells: [[i - 1, j - 1]] as [number, number][],
            result: dp[i - 1][j - 1] + 1,
          },
        };
        yield matchStep;
        onStep(matchStep);

        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        const noMatchStep = {
          type: "no-match",
          indices: [],
          description: `No match: '${str1[i - 1]}' !== '${str2[j - 1]}'. Taking max of neighbors.`,
          dpState: {
            table: dp.map((row) => [...row]),
            currentCell: [i, j] as [number, number],
            highlightedCells: [[i - 1, j], [i, j - 1]] as [number, number][],
            result: Math.max(dp[i - 1][j], dp[i][j - 1]),
          },
        };
        yield noMatchStep;
        onStep(noMatchStep);

        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }

      const fillStep = {
        type: "fill",
        indices: [],
        description: `dp[${i}][${j}] = ${dp[i][j]}`,
        dpState: {
          table: dp.map((row) => [...row]),
          currentCell: [i, j] as [number, number],
          highlightedCells: [[i, j]] as [number, number][],
          result: dp[i][j],
        },
      };
      yield fillStep;
      onStep(fillStep);
    }
  }

  // Backtrack to find the LCS string
  let lcsStr = "";
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcsStr = str1[i - 1] + lcsStr;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  const completeStep = {
    type: "complete",
    indices: [],
    description: `LCS length: ${dp[m][n]}, LCS: "${lcsStr}"`,
    dpState: {
      table: dp.map((row) => [...row]),
      currentCell: null,
      highlightedCells: [[m, n]] as [number, number][],
      result: `"${lcsStr}" (length: ${dp[m][n]})`,
    },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* coinChange(
  coins: number[],
  amount: number,
  onStep: (step: AnimationStep & { dpState: DPState }) => void
): AsyncGenerator<AnimationStep & { dpState: DPState }> {
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  const initStep = {
    type: "init",
    indices: [],
    description: `Coin Change: coins=[${coins.join(", ")}], amount=${amount}`,
    dpState: { table: [[...dp]], currentCell: null, highlightedCells: [], result: 0 },
  };
  yield initStep;
  onStep(initStep);

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        const considerStep = {
          type: "consider",
          indices: [],
          description: `Amount ${i}: using coin ${coin}. dp[${i}] = min(dp[${i}], dp[${i - coin}] + 1) = min(${dp[i]}, ${dp[i - coin] + 1})`,
          dpState: {
            table: [[...dp]],
            currentCell: [0, i] as [number, number],
            highlightedCells: [[0, i - coin]] as [number, number][],
            result: Math.min(dp[i], dp[i - coin] + 1),
          },
        };
        yield considerStep;
        onStep(considerStep);

        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }

    const fillStep = {
      type: "fill",
      indices: [],
      description: `dp[${i}] = ${dp[i] === Infinity ? "∞" : dp[i]}`,
      dpState: {
        table: [[...dp]],
        currentCell: [0, i] as [number, number],
        highlightedCells: [[0, i]] as [number, number][],
        result: dp[i],
      },
    };
    yield fillStep;
    onStep(fillStep);
  }

  const result = dp[amount] === Infinity ? -1 : dp[amount];
  const completeStep = {
    type: "complete",
    indices: [],
    description: result === -1 ? `Cannot make amount ${amount}` : `Minimum coins needed: ${result}`,
    dpState: {
      table: [[...dp]],
      currentCell: null,
      highlightedCells: [[0, amount]] as [number, number][],
      result,
    },
  };
  yield completeStep;
  onStep(completeStep);
}

export const DP_CODE = {
  fibonacci: {
    python: `def fibonacci(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`,
    javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}`,
    cpp: `int fibonacci(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}`,
  },
  knapsack: {
    python: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],
                    values[i-1] + dp[i-1][w - weights[i-1]]
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]`,
    javascript: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, 
    () => new Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(
          dp[i-1][w],
          values[i-1] + dp[i-1][w - weights[i-1]]
        );
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  
  return dp[n][capacity];
}`,
    cpp: `int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = max(
                    dp[i-1][w],
                    values[i-1] + dp[i-1][w - weights[i-1]]
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    
    return dp[n][capacity];
}`,
  },
  lcs: {
    python: `def lcs(str1, str2):
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]`,
    javascript: `function lcs(str1, str2) {
  const m = str1.length, n = str2.length;
  const dp = Array.from({ length: m + 1 }, 
    () => new Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i-1] === str2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  
  return dp[m][n];
}`,
    cpp: `int lcs(string str1, string str2) {
    int m = str1.length(), n = str2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (str1[i-1] == str2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}`,
  },
  coinChange: {
    python: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1`,
    javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
  },
};
