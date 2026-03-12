import type { AnimationStep, TreeNode } from "../algorithm-types";

export interface TreeState {
  root: TreeNode | null;
  highlightedNodes: number[];
  currentNode: number | null;
  result: number[];
}

export async function* inorderTraversal(
  root: TreeNode | null,
  onStep: (step: AnimationStep & { treeState: TreeState }) => void
): AsyncGenerator<AnimationStep & { treeState: TreeState }> {
  const result: number[] = [];

  async function* traverse(node: TreeNode | null): AsyncGenerator<AnimationStep & { treeState: TreeState }> {
    if (!node) return;

    // Visit left
    const goLeftStep = {
      type: "go-left",
      indices: [],
      description: `Going to left child of ${node.value}`,
      treeState: { root, highlightedNodes: [], currentNode: node.value, result: [...result] },
    };
    yield goLeftStep;
    onStep(goLeftStep);

    yield* traverse(node.left);

    // Visit current
    result.push(node.value);
    const visitStep = {
      type: "visit",
      indices: [],
      description: `Visiting node ${node.value}`,
      treeState: { root, highlightedNodes: [...result], currentNode: node.value, result: [...result] },
    };
    yield visitStep;
    onStep(visitStep);

    // Visit right
    const goRightStep = {
      type: "go-right",
      indices: [],
      description: `Going to right child of ${node.value}`,
      treeState: { root, highlightedNodes: [...result], currentNode: node.value, result: [...result] },
    };
    yield goRightStep;
    onStep(goRightStep);

    yield* traverse(node.right);
  }

  const initStep = {
    type: "init",
    indices: [],
    description: "Starting inorder traversal (Left -> Root -> Right)",
    treeState: { root, highlightedNodes: [], currentNode: null, result: [] },
  };
  yield initStep;
  onStep(initStep);

  yield* traverse(root);

  const completeStep = {
    type: "complete",
    indices: [],
    description: `Inorder traversal complete: [${result.join(", ")}]`,
    treeState: { root, highlightedNodes: result, currentNode: null, result },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* preorderTraversal(
  root: TreeNode | null,
  onStep: (step: AnimationStep & { treeState: TreeState }) => void
): AsyncGenerator<AnimationStep & { treeState: TreeState }> {
  const result: number[] = [];

  async function* traverse(node: TreeNode | null): AsyncGenerator<AnimationStep & { treeState: TreeState }> {
    if (!node) return;

    // Visit current first
    result.push(node.value);
    const visitStep = {
      type: "visit",
      indices: [],
      description: `Visiting node ${node.value}`,
      treeState: { root, highlightedNodes: [...result], currentNode: node.value, result: [...result] },
    };
    yield visitStep;
    onStep(visitStep);

    // Visit left
    if (node.left) {
      const goLeftStep = {
        type: "go-left",
        indices: [],
        description: `Going to left child of ${node.value}`,
        treeState: { root, highlightedNodes: [...result], currentNode: node.value, result: [...result] },
      };
      yield goLeftStep;
      onStep(goLeftStep);
      yield* traverse(node.left);
    }

    // Visit right
    if (node.right) {
      const goRightStep = {
        type: "go-right",
        indices: [],
        description: `Going to right child of ${node.value}`,
        treeState: { root, highlightedNodes: [...result], currentNode: node.value, result: [...result] },
      };
      yield goRightStep;
      onStep(goRightStep);
      yield* traverse(node.right);
    }
  }

  const initStep = {
    type: "init",
    indices: [],
    description: "Starting preorder traversal (Root -> Left -> Right)",
    treeState: { root, highlightedNodes: [], currentNode: null, result: [] },
  };
  yield initStep;
  onStep(initStep);

  yield* traverse(root);

  const completeStep = {
    type: "complete",
    indices: [],
    description: `Preorder traversal complete: [${result.join(", ")}]`,
    treeState: { root, highlightedNodes: result, currentNode: null, result },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* postorderTraversal(
  root: TreeNode | null,
  onStep: (step: AnimationStep & { treeState: TreeState }) => void
): AsyncGenerator<AnimationStep & { treeState: TreeState }> {
  const result: number[] = [];

  async function* traverse(node: TreeNode | null): AsyncGenerator<AnimationStep & { treeState: TreeState }> {
    if (!node) return;

    // Visit left
    if (node.left) {
      const goLeftStep = {
        type: "go-left",
        indices: [],
        description: `Going to left child of ${node.value}`,
        treeState: { root, highlightedNodes: [...result], currentNode: node.value, result: [...result] },
      };
      yield goLeftStep;
      onStep(goLeftStep);
      yield* traverse(node.left);
    }

    // Visit right
    if (node.right) {
      const goRightStep = {
        type: "go-right",
        indices: [],
        description: `Going to right child of ${node.value}`,
        treeState: { root, highlightedNodes: [...result], currentNode: node.value, result: [...result] },
      };
      yield goRightStep;
      onStep(goRightStep);
      yield* traverse(node.right);
    }

    // Visit current last
    result.push(node.value);
    const visitStep = {
      type: "visit",
      indices: [],
      description: `Visiting node ${node.value}`,
      treeState: { root, highlightedNodes: [...result], currentNode: node.value, result: [...result] },
    };
    yield visitStep;
    onStep(visitStep);
  }

  const initStep = {
    type: "init",
    indices: [],
    description: "Starting postorder traversal (Left -> Right -> Root)",
    treeState: { root, highlightedNodes: [], currentNode: null, result: [] },
  };
  yield initStep;
  onStep(initStep);

  yield* traverse(root);

  const completeStep = {
    type: "complete",
    indices: [],
    description: `Postorder traversal complete: [${result.join(", ")}]`,
    treeState: { root, highlightedNodes: result, currentNode: null, result },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* levelOrderTraversal(
  root: TreeNode | null,
  onStep: (step: AnimationStep & { treeState: TreeState }) => void
): AsyncGenerator<AnimationStep & { treeState: TreeState }> {
  if (!root) return;

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  const initStep = {
    type: "init",
    indices: [],
    description: "Starting level order traversal (BFS)",
    treeState: { root, highlightedNodes: [], currentNode: null, result: [] },
  };
  yield initStep;
  onStep(initStep);

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelNodes: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      result.push(node.value);
      levelNodes.push(node.value);

      const visitStep = {
        type: "visit",
        indices: [],
        description: `Visiting node ${node.value} at current level`,
        treeState: { root, highlightedNodes: [...result], currentNode: node.value, result: [...result] },
      };
      yield visitStep;
      onStep(visitStep);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    const levelCompleteStep = {
      type: "level-complete",
      indices: [],
      description: `Level complete: [${levelNodes.join(", ")}]`,
      treeState: { root, highlightedNodes: [...result], currentNode: null, result: [...result] },
    };
    yield levelCompleteStep;
    onStep(levelCompleteStep);
  }

  const completeStep = {
    type: "complete",
    indices: [],
    description: `Level order traversal complete: [${result.join(", ")}]`,
    treeState: { root, highlightedNodes: result, currentNode: null, result },
  };
  yield completeStep;
  onStep(completeStep);
}

export function createSampleTree(): TreeNode {
  return {
    value: 50,
    left: {
      value: 30,
      left: { value: 20 },
      right: { value: 40 },
    },
    right: {
      value: 70,
      left: { value: 60 },
      right: { value: 80 },
    },
  };
}

export const TREE_CODE = {
  inorder: {
    python: `def inorder(root):
    result = []
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        result.append(node.val)
        traverse(node.right)
    traverse(root)
    return result`,
    javascript: `function inorder(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  traverse(root);
  return result;
}`,
    cpp: `void inorder(TreeNode* root, vector<int>& result) {
    if (!root) return;
    inorder(root->left, result);
    result.push_back(root->val);
    inorder(root->right, result);
}`,
  },
  preorder: {
    python: `def preorder(root):
    result = []
    def traverse(node):
        if not node:
            return
        result.append(node.val)
        traverse(node.left)
        traverse(node.right)
    traverse(root)
    return result`,
    javascript: `function preorder(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return result;
}`,
    cpp: `void preorder(TreeNode* root, vector<int>& result) {
    if (!root) return;
    result.push_back(root->val);
    preorder(root->left, result);
    preorder(root->right, result);
}`,
  },
  postorder: {
    python: `def postorder(root):
    result = []
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        traverse(node.right)
        result.append(node.val)
    traverse(root)
    return result`,
    javascript: `function postorder(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  }
  traverse(root);
  return result;
}`,
    cpp: `void postorder(TreeNode* root, vector<int>& result) {
    if (!root) return;
    postorder(root->left, result);
    postorder(root->right, result);
    result.push_back(root->val);
}`,
  },
  levelOrder: {
    python: `from collections import deque

def levelOrder(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    
    return result`,
    javascript: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  
  return result;
}`,
    cpp: `vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        vector<int> level;
        int size = q.size();
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    
    return result;
}`,
  },
};
