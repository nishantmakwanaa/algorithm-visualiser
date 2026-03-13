import type { AnimationStep } from "../algorithm-types";

export async function* bubbleSort(
  arr: number[],
  onStep: (step: AnimationStep) => void
): AsyncGenerator<AnimationStep> {
  const n = arr.length;
  const array = [...arr];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const step: AnimationStep = {
        type: "compare",
        indices: [j, j + 1],
        values: [...array],
        description: `Comparing ${array[j]} and ${array[j + 1]}`,
      };
      yield step;
      onStep(step);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        const swapStep: AnimationStep = {
          type: "swap",
          indices: [j, j + 1],
          values: [...array],
          description: `Swapping ${array[j + 1]} and ${array[j]}`,
        };
        yield swapStep;
        onStep(swapStep);
      }
    }

    const sortedStep: AnimationStep = {
      type: "sorted",
      indices: [n - i - 1],
      values: [...array],
      description: `Element at position ${n - i - 1} is sorted`,
    };
    yield sortedStep;
    onStep(sortedStep);
  }

  const finalStep: AnimationStep = {
    type: "complete",
    indices: Array.from({ length: n }, (_, i) => i),
    values: [...array],
    description: "Sorting complete!",
  };
  yield finalStep;
  onStep(finalStep);

  return array;
}

export async function* selectionSort(
  arr: number[],
  onStep: (step: AnimationStep) => void
): AsyncGenerator<AnimationStep> {
  const n = arr.length;
  const array = [...arr];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    const selectStep: AnimationStep = {
      type: "select",
      indices: [i],
      values: [...array],
      description: `Starting from position ${i}, finding minimum`,
    };
    yield selectStep;
    onStep(selectStep);

    for (let j = i + 1; j < n; j++) {
      const compareStep: AnimationStep = {
        type: "compare",
        indices: [minIdx, j],
        values: [...array],
        description: `Comparing ${array[minIdx]} with ${array[j]}`,
      };
      yield compareStep;
      onStep(compareStep);

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      const swapStep: AnimationStep = {
        type: "swap",
        indices: [i, minIdx],
        values: [...array],
        description: `Swapping ${array[minIdx]} with ${array[i]}`,
      };
      yield swapStep;
      onStep(swapStep);
    }

    const sortedStep: AnimationStep = {
      type: "sorted",
      indices: [i],
      values: [...array],
      description: `Element at position ${i} is sorted`,
    };
    yield sortedStep;
    onStep(sortedStep);
  }

  const finalStep: AnimationStep = {
    type: "complete",
    indices: Array.from({ length: n }, (_, i) => i),
    values: [...array],
    description: "Sorting complete!",
  };
  yield finalStep;
  onStep(finalStep);

  return array;
}

export async function* insertionSort(
  arr: number[],
  onStep: (step: AnimationStep) => void
): AsyncGenerator<AnimationStep> {
  const n = arr.length;
  const array = [...arr];

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    const keyStep: AnimationStep = {
      type: "select",
      indices: [i],
      values: [...array],
      description: `Key element: ${key}`,
    };
    yield keyStep;
    onStep(keyStep);

    while (j >= 0 && array[j] > key) {
      const compareStep: AnimationStep = {
        type: "compare",
        indices: [j, j + 1],
        values: [...array],
        description: `${array[j]} > ${key}, shifting right`,
      };
      yield compareStep;
      onStep(compareStep);

      array[j + 1] = array[j];

      const shiftStep: AnimationStep = {
        type: "shift",
        indices: [j, j + 1],
        values: [...array],
        description: `Shifted ${array[j]} to position ${j + 1}`,
      };
      yield shiftStep;
      onStep(shiftStep);

      j--;
    }

    array[j + 1] = key;

    const insertStep: AnimationStep = {
      type: "insert",
      indices: [j + 1],
      values: [...array],
      description: `Inserted ${key} at position ${j + 1}`,
    };
    yield insertStep;
    onStep(insertStep);
  }

  const finalStep: AnimationStep = {
    type: "complete",
    indices: Array.from({ length: n }, (_, i) => i),
    values: [...array],
    description: "Sorting complete!",
  };
  yield finalStep;
  onStep(finalStep);

  return array;
}

export async function* mergeSort(
  arr: number[],
  onStep: (step: AnimationStep) => void,
  start = 0,
  end = arr.length - 1,
  array = [...arr]
): AsyncGenerator<AnimationStep> {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);

  const divideStep: AnimationStep = {
    type: "divide",
    indices: Array.from({ length: end - start + 1 }, (_, i) => start + i),
    values: [...array],
    description: `Dividing array from index ${start} to ${end}, mid = ${mid}`,
  };
  yield divideStep;
  onStep(divideStep);

  yield* mergeSort(arr, onStep, start, mid, array);
  yield* mergeSort(arr, onStep, mid + 1, end, array);

  const left = array.slice(start, mid + 1);
  const right = array.slice(mid + 1, end + 1);

  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    const compareStep: AnimationStep = {
      type: "compare",
      indices: [start + i, mid + 1 + j],
      values: [...array],
      description: `Comparing ${left[i]} and ${right[j]}`,
    };
    yield compareStep;
    onStep(compareStep);

    if (left[i] <= right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }

    const mergeStep: AnimationStep = {
      type: "merge",
      indices: [k],
      values: [...array],
      description: `Placed ${array[k]} at position ${k}`,
    };
    yield mergeStep;
    onStep(mergeStep);

    k++;
  }

  while (i < left.length) {
    array[k] = left[i];
    const mergeStep: AnimationStep = {
      type: "merge",
      indices: [k],
      values: [...array],
      description: `Placed remaining ${left[i]} at position ${k}`,
    };
    yield mergeStep;
    onStep(mergeStep);
    i++;
    k++;
  }

  while (j < right.length) {
    array[k] = right[j];
    const mergeStep: AnimationStep = {
      type: "merge",
      indices: [k],
      values: [...array],
      description: `Placed remaining ${right[j]} at position ${k}`,
    };
    yield mergeStep;
    onStep(mergeStep);
    j++;
    k++;
  }

  if (start === 0 && end === arr.length - 1) {
    const finalStep: AnimationStep = {
      type: "complete",
      indices: Array.from({ length: arr.length }, (_, i) => i),
      values: [...array],
      description: "Sorting complete!",
    };
    yield finalStep;
    onStep(finalStep);
  }
}

export async function* quickSort(
  arr: number[],
  onStep: (step: AnimationStep) => void,
  low = 0,
  high = arr.length - 1,
  array = [...arr]
): AsyncGenerator<AnimationStep> {
  if (low < high) {
    const pivotIdx = high;
    const pivot = array[pivotIdx];

    const pivotStep: AnimationStep = {
      type: "pivot",
      indices: [pivotIdx],
      values: [...array],
      description: `Pivot element: ${pivot}`,
    };
    yield pivotStep;
    onStep(pivotStep);

    let i = low - 1;

    for (let j = low; j < high; j++) {
      const compareStep: AnimationStep = {
        type: "compare",
        indices: [j, pivotIdx],
        values: [...array],
        description: `Comparing ${array[j]} with pivot ${pivot}`,
      };
      yield compareStep;
      onStep(compareStep);

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];

        const swapStep: AnimationStep = {
          type: "swap",
          indices: [i, j],
          values: [...array],
          description: `Swapping ${array[j]} and ${array[i]}`,
        };
        yield swapStep;
        onStep(swapStep);
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    const placePivotStep: AnimationStep = {
      type: "pivot-placed",
      indices: [i + 1],
      values: [...array],
      description: `Pivot ${pivot} placed at position ${i + 1}`,
    };
    yield placePivotStep;
    onStep(placePivotStep);

    const partitionIdx = i + 1;

    yield* quickSort(arr, onStep, low, partitionIdx - 1, array);
    yield* quickSort(arr, onStep, partitionIdx + 1, high, array);
  }

  if (low === 0 && high === arr.length - 1) {
    const finalStep: AnimationStep = {
      type: "complete",
      indices: Array.from({ length: arr.length }, (_, i) => i),
      values: [...array],
      description: "Sorting complete!",
    };
    yield finalStep;
    onStep(finalStep);
  }
}

export async function* heapSort(
  arr: number[],
  onStep: (step: AnimationStep) => void
): AsyncGenerator<AnimationStep> {
  const n = arr.length;
  const array = [...arr];

  async function* heapify(
    size: number,
    root: number
  ): AsyncGenerator<AnimationStep> {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      const compareStep: AnimationStep = {
        type: "compare",
        indices: [largest, left],
        values: [...array],
        description: `Comparing ${array[largest]} with left child ${array[left]}`,
      };
      yield compareStep;
      onStep(compareStep);

      if (array[left] > array[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      const compareStep: AnimationStep = {
        type: "compare",
        indices: [largest, right],
        values: [...array],
        description: `Comparing ${array[largest]} with right child ${array[right]}`,
      };
      yield compareStep;
      onStep(compareStep);

      if (array[right] > array[largest]) {
        largest = right;
      }
    }

    if (largest !== root) {
      [array[root], array[largest]] = [array[largest], array[root]];

      const swapStep: AnimationStep = {
        type: "swap",
        indices: [root, largest],
        values: [...array],
        description: `Swapping ${array[largest]} with ${array[root]}`,
      };
      yield swapStep;
      onStep(swapStep);

      yield* heapify(size, largest);
    }
  }

  // Build max heap
  const buildHeapStep: AnimationStep = {
    type: "info",
    indices: [],
    values: [...array],
    description: "Building max heap...",
  };
  yield buildHeapStep;
  onStep(buildHeapStep);

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];

    const extractStep: AnimationStep = {
      type: "swap",
      indices: [0, i],
      values: [...array],
      description: `Extracting max ${array[i]} to position ${i}`,
    };
    yield extractStep;
    onStep(extractStep);

    const sortedStep: AnimationStep = {
      type: "sorted",
      indices: [i],
      values: [...array],
      description: `Element at position ${i} is sorted`,
    };
    yield sortedStep;
    onStep(sortedStep);

    yield* heapify(i, 0);
  }

  const finalStep: AnimationStep = {
    type: "complete",
    indices: Array.from({ length: n }, (_, i) => i),
    values: [...array],
    description: "Sorting complete!",
  };
  yield finalStep;
  onStep(finalStep);

  return array;
}

export const SORTING_CODE = {
  bubble: {
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
  },
  selection: {
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
  },
  insertion: {
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
  },
  merge: {
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i), right.slice(j));
}`,
    cpp: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
  },
  quick: {
    python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    cpp: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
  },
  heap: {
    python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    javascript: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    cpp: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
  },
  counting: {
    python: `def counting_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    count = [0] * (max_val + 1)
    
    for num in arr:
        count[num] += 1
    
    result = []
    for i, c in enumerate(count):
        result.extend([i] * c)
    
    return result`,
    javascript: `function countingSort(arr) {
  if (arr.length === 0) return arr;
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  
  for (const num of arr) {
    count[num]++;
  }
  
  const result = [];
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      result.push(i);
      count[i]--;
    }
  }
  
  return result;
}`,
    cpp: `void countingSort(int arr[], int n) {
    int max = *max_element(arr, arr + n);
    vector<int> count(max + 1, 0);
    
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }
    
    int idx = 0;
    for (int i = 0; i <= max; i++) {
        while (count[i] > 0) {
            arr[idx++] = i;
            count[i]--;
        }
    }
}`,
  },
  radix: {
    python: `def radix_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    exp = 1
    
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    for i in range(n):
        digit = (arr[i] // exp) % 10
        count[digit] += 1
    
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    
    for i in range(n):
        arr[i] = output[i]`,
    javascript: `function radixSort(arr) {
  if (arr.length === 0) return arr;
  const max = Math.max(...arr);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  
  return arr;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);
  
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`,
    cpp: `void countingSortByDigit(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};
    
    for (int i = 0; i < n; i++) {
        count[(arr[i] / exp) % 10]++;
    }
    
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

void radixSort(int arr[], int n) {
    int max = *max_element(arr, arr + n);
    
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(arr, n, exp);
    }
}`,
  },
  bucket: {
    python: `def bucket_sort(arr):
    if not arr:
        return arr
    
    min_val, max_val = min(arr), max(arr)
    bucket_count = len(arr)
    bucket_range = (max_val - min_val) / bucket_count + 1
    
    buckets = [[] for _ in range(bucket_count)]
    
    for num in arr:
        index = int((num - min_val) / bucket_range)
        buckets[index].append(num)
    
    for bucket in buckets:
        bucket.sort()
    
    result = []
    for bucket in buckets:
        result.extend(bucket)
    
    return result`,
    javascript: `function bucketSort(arr) {
  if (arr.length === 0) return arr;
  
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = arr.length;
  const bucketRange = (max - min) / bucketCount + 1;
  
  const buckets = Array.from({ length: bucketCount }, () => []);
  
  for (const num of arr) {
    const index = Math.floor((num - min) / bucketRange);
    buckets[index].push(num);
  }
  
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
  }
  
  return buckets.flat();
}`,
    cpp: `void bucketSort(float arr[], int n) {
    vector<float> buckets[n];
    
    for (int i = 0; i < n; i++) {
        int bi = n * arr[i];
        buckets[bi].push_back(arr[i]);
    }
    
    for (int i = 0; i < n; i++) {
        sort(buckets[i].begin(), buckets[i].end());
    }
    
    int index = 0;
    for (int i = 0; i < n; i++) {
        for (float val : buckets[i]) {
            arr[index++] = val;
        }
    }
}`,
  },
};
