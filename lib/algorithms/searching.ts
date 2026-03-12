import type { AnimationStep } from "../algorithm-types";

export async function* linearSearch(
  arr: number[],
  target: number,
  onStep: (step: AnimationStep) => void
): AsyncGenerator<AnimationStep> {
  const array = [...arr];

  for (let i = 0; i < array.length; i++) {
    const searchStep: AnimationStep = {
      type: "search",
      indices: [i],
      values: [...array],
      description: `Checking index ${i}: ${array[i]}`,
    };
    yield searchStep;
    onStep(searchStep);

    if (array[i] === target) {
      const foundStep: AnimationStep = {
        type: "found",
        indices: [i],
        values: [...array],
        description: `Found ${target} at index ${i}!`,
      };
      yield foundStep;
      onStep(foundStep);
      return;
    }

    const notFoundStep: AnimationStep = {
      type: "not-match",
      indices: [i],
      values: [...array],
      description: `${array[i]} !== ${target}, moving to next`,
    };
    yield notFoundStep;
    onStep(notFoundStep);
  }

  const notFoundFinalStep: AnimationStep = {
    type: "not-found",
    indices: [],
    values: [...array],
    description: `${target} not found in array`,
  };
  yield notFoundFinalStep;
  onStep(notFoundFinalStep);
}

export async function* binarySearch(
  arr: number[],
  target: number,
  onStep: (step: AnimationStep) => void
): AsyncGenerator<AnimationStep> {
  const array = [...arr].sort((a, b) => a - b);

  const sortedStep: AnimationStep = {
    type: "info",
    indices: Array.from({ length: array.length }, (_, i) => i),
    values: [...array],
    description: "Array sorted for binary search",
  };
  yield sortedStep;
  onStep(sortedStep);

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const rangeStep: AnimationStep = {
      type: "range",
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      values: [...array],
      description: `Search range: [${left}, ${right}], mid = ${mid}`,
    };
    yield rangeStep;
    onStep(rangeStep);

    const checkStep: AnimationStep = {
      type: "check-mid",
      indices: [mid],
      values: [...array],
      description: `Checking mid element: ${array[mid]}`,
    };
    yield checkStep;
    onStep(checkStep);

    if (array[mid] === target) {
      const foundStep: AnimationStep = {
        type: "found",
        indices: [mid],
        values: [...array],
        description: `Found ${target} at index ${mid}!`,
      };
      yield foundStep;
      onStep(foundStep);
      return;
    } else if (array[mid] < target) {
      const goRightStep: AnimationStep = {
        type: "shrink-left",
        indices: Array.from({ length: mid - left + 1 }, (_, i) => left + i),
        values: [...array],
        description: `${array[mid]} < ${target}, searching right half`,
      };
      yield goRightStep;
      onStep(goRightStep);
      left = mid + 1;
    } else {
      const goLeftStep: AnimationStep = {
        type: "shrink-right",
        indices: Array.from({ length: right - mid + 1 }, (_, i) => mid + i),
        values: [...array],
        description: `${array[mid]} > ${target}, searching left half`,
      };
      yield goLeftStep;
      onStep(goLeftStep);
      right = mid - 1;
    }
  }

  const notFoundStep: AnimationStep = {
    type: "not-found",
    indices: [],
    values: [...array],
    description: `${target} not found in array`,
  };
  yield notFoundStep;
  onStep(notFoundStep);
}

export async function* ternarySearch(
  arr: number[],
  target: number,
  onStep: (step: AnimationStep) => void
): AsyncGenerator<AnimationStep> {
  const array = [...arr].sort((a, b) => a - b);

  const sortedStep: AnimationStep = {
    type: "info",
    indices: Array.from({ length: array.length }, (_, i) => i),
    values: [...array],
    description: "Array sorted for ternary search",
  };
  yield sortedStep;
  onStep(sortedStep);

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);

    const rangeStep: AnimationStep = {
      type: "range",
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      values: [...array],
      description: `Search range: [${left}, ${right}], mid1 = ${mid1}, mid2 = ${mid2}`,
    };
    yield rangeStep;
    onStep(rangeStep);

    const checkMid1Step: AnimationStep = {
      type: "check-mid",
      indices: [mid1, mid2],
      values: [...array],
      description: `Checking mid points: ${array[mid1]} and ${array[mid2]}`,
    };
    yield checkMid1Step;
    onStep(checkMid1Step);

    if (array[mid1] === target) {
      const foundStep: AnimationStep = {
        type: "found",
        indices: [mid1],
        values: [...array],
        description: `Found ${target} at index ${mid1}!`,
      };
      yield foundStep;
      onStep(foundStep);
      return;
    }

    if (array[mid2] === target) {
      const foundStep: AnimationStep = {
        type: "found",
        indices: [mid2],
        values: [...array],
        description: `Found ${target} at index ${mid2}!`,
      };
      yield foundStep;
      onStep(foundStep);
      return;
    }

    if (target < array[mid1]) {
      const shrinkStep: AnimationStep = {
        type: "shrink",
        indices: Array.from({ length: mid1 - left }, (_, i) => left + i),
        values: [...array],
        description: `${target} < ${array[mid1]}, searching first third`,
      };
      yield shrinkStep;
      onStep(shrinkStep);
      right = mid1 - 1;
    } else if (target > array[mid2]) {
      const shrinkStep: AnimationStep = {
        type: "shrink",
        indices: Array.from({ length: right - mid2 }, (_, i) => mid2 + 1 + i),
        values: [...array],
        description: `${target} > ${array[mid2]}, searching last third`,
      };
      yield shrinkStep;
      onStep(shrinkStep);
      left = mid2 + 1;
    } else {
      const shrinkStep: AnimationStep = {
        type: "shrink",
        indices: Array.from({ length: mid2 - mid1 - 1 }, (_, i) => mid1 + 1 + i),
        values: [...array],
        description: `${array[mid1]} < ${target} < ${array[mid2]}, searching middle third`,
      };
      yield shrinkStep;
      onStep(shrinkStep);
      left = mid1 + 1;
      right = mid2 - 1;
    }
  }

  const notFoundStep: AnimationStep = {
    type: "not-found",
    indices: [],
    values: [...array],
    description: `${target} not found in array`,
  };
  yield notFoundStep;
  onStep(notFoundStep);
}

export const SEARCHING_CODE = {
  linear: {
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    cpp: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
  },
  binary: {
    python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    javascript: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    cpp: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
  },
  ternary: {
    python: `def ternary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid1 = left + (right - left) // 3
        mid2 = right - (right - left) // 3
        if arr[mid1] == target:
            return mid1
        if arr[mid2] == target:
            return mid2
        if target < arr[mid1]:
            right = mid1 - 1
        elif target > arr[mid2]:
            left = mid2 + 1
        else:
            left = mid1 + 1
            right = mid2 - 1
    return -1`,
    javascript: `function ternarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);
    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;
    if (target < arr[mid1]) right = mid1 - 1;
    else if (target > arr[mid2]) left = mid2 + 1;
    else { left = mid1 + 1; right = mid2 - 1; }
  }
  return -1;
}`,
    cpp: `int ternarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid1 = left + (right - left) / 3;
        int mid2 = right - (right - left) / 3;
        if (arr[mid1] == target) return mid1;
        if (arr[mid2] == target) return mid2;
        if (target < arr[mid1]) right = mid1 - 1;
        else if (target > arr[mid2]) left = mid2 + 1;
        else { left = mid1 + 1; right = mid2 - 1; }
    }
    return -1;
}`,
  },
};
