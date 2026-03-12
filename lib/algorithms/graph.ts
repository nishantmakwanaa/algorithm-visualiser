import type { AnimationStep, GraphNode, GraphEdge } from "../algorithm-types";

export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  visited: Set<string>;
  current: string | null;
  path: string[];
  distances: Map<string, number>;
  mstEdges: GraphEdge[];
}

export async function* bfs(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  onStep: (step: AnimationStep & { graphState: GraphState }) => void
): AsyncGenerator<AnimationStep & { graphState: GraphState }> {
  const adjacencyList = buildAdjacencyList(nodes, edges);
  const visited = new Set<string>();
  const queue: string[] = [startId];
  const path: string[] = [];

  visited.add(startId);

  const initStep = {
    type: "init",
    indices: [],
    description: `Starting BFS from node ${startId}`,
    graphState: { nodes, edges, visited: new Set(visited), current: startId, path: [], distances: new Map(), mstEdges: [] },
  };
  yield initStep;
  onStep(initStep);

  while (queue.length > 0) {
    const current = queue.shift()!;
    path.push(current);

    const visitStep = {
      type: "visit",
      indices: [],
      description: `Visiting node ${current}`,
      graphState: { nodes, edges, visited: new Set(visited), current, path: [...path], distances: new Map(), mstEdges: [] },
    };
    yield visitStep;
    onStep(visitStep);

    const neighbors = adjacencyList.get(current) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        const exploreStep = {
          type: "explore",
          indices: [],
          description: `Adding neighbor ${neighbor} to queue`,
          graphState: { nodes, edges, visited: new Set(visited), current, path: [...path], distances: new Map(), mstEdges: [] },
        };
        yield exploreStep;
        onStep(exploreStep);
      }
    }
  }

  const completeStep = {
    type: "complete",
    indices: [],
    description: `BFS complete. Order: ${path.join(" -> ")}`,
    graphState: { nodes, edges, visited: new Set(visited), current: null, path, distances: new Map(), mstEdges: [] },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* dfs(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  onStep: (step: AnimationStep & { graphState: GraphState }) => void
): AsyncGenerator<AnimationStep & { graphState: GraphState }> {
  const adjacencyList = buildAdjacencyList(nodes, edges);
  const visited = new Set<string>();
  const path: string[] = [];

  async function* dfsRecursive(nodeId: string): AsyncGenerator<AnimationStep & { graphState: GraphState }> {
    visited.add(nodeId);
    path.push(nodeId);

    const visitStep = {
      type: "visit",
      indices: [],
      description: `Visiting node ${nodeId}`,
      graphState: { nodes, edges, visited: new Set(visited), current: nodeId, path: [...path], distances: new Map(), mstEdges: [] },
    };
    yield visitStep;
    onStep(visitStep);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const exploreStep = {
          type: "explore",
          indices: [],
          description: `Exploring edge to ${neighbor}`,
          graphState: { nodes, edges, visited: new Set(visited), current: nodeId, path: [...path], distances: new Map(), mstEdges: [] },
        };
        yield exploreStep;
        onStep(exploreStep);

        yield* dfsRecursive(neighbor);

        const backtrackStep = {
          type: "backtrack",
          indices: [],
          description: `Backtracking from ${neighbor} to ${nodeId}`,
          graphState: { nodes, edges, visited: new Set(visited), current: nodeId, path: [...path], distances: new Map(), mstEdges: [] },
        };
        yield backtrackStep;
        onStep(backtrackStep);
      }
    }
  }

  const initStep = {
    type: "init",
    indices: [],
    description: `Starting DFS from node ${startId}`,
    graphState: { nodes, edges, visited: new Set(), current: startId, path: [], distances: new Map(), mstEdges: [] },
  };
  yield initStep;
  onStep(initStep);

  yield* dfsRecursive(startId);

  const completeStep = {
    type: "complete",
    indices: [],
    description: `DFS complete. Order: ${path.join(" -> ")}`,
    graphState: { nodes, edges, visited: new Set(visited), current: null, path, distances: new Map(), mstEdges: [] },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* dijkstra(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  onStep: (step: AnimationStep & { graphState: GraphState }) => void
): AsyncGenerator<AnimationStep & { graphState: GraphState }> {
  const adjacencyList = buildWeightedAdjacencyList(nodes, edges);
  const distances = new Map<string, number>();
  const visited = new Set<string>();
  const path: string[] = [];

  // Initialize distances
  for (const node of nodes) {
    distances.set(node.id, node.id === startId ? 0 : Infinity);
  }

  const initStep = {
    type: "init",
    indices: [],
    description: `Starting Dijkstra from node ${startId}`,
    graphState: { nodes, edges, visited: new Set(), current: startId, path: [], distances: new Map(distances), mstEdges: [] },
  };
  yield initStep;
  onStep(initStep);

  while (visited.size < nodes.length) {
    // Find minimum distance unvisited node
    let minDist = Infinity;
    let minNode: string | null = null;
    for (const [nodeId, dist] of distances) {
      if (!visited.has(nodeId) && dist < minDist) {
        minDist = dist;
        minNode = nodeId;
      }
    }

    if (minNode === null) break;

    visited.add(minNode);
    path.push(minNode);

    const visitStep = {
      type: "visit",
      indices: [],
      description: `Visiting node ${minNode} with distance ${minDist}`,
      graphState: { nodes, edges, visited: new Set(visited), current: minNode, path: [...path], distances: new Map(distances), mstEdges: [] },
    };
    yield visitStep;
    onStep(visitStep);

    // Update distances to neighbors
    const neighbors = adjacencyList.get(minNode) || [];
    for (const { node: neighbor, weight } of neighbors) {
      if (!visited.has(neighbor)) {
        const newDist = minDist + weight;
        const oldDist = distances.get(neighbor) || Infinity;

        if (newDist < oldDist) {
          distances.set(neighbor, newDist);

          const updateStep = {
            type: "update",
            indices: [],
            description: `Updated distance to ${neighbor}: ${oldDist} -> ${newDist}`,
            graphState: { nodes, edges, visited: new Set(visited), current: minNode, path: [...path], distances: new Map(distances), mstEdges: [] },
          };
          yield updateStep;
          onStep(updateStep);
        }
      }
    }
  }

  const completeStep = {
    type: "complete",
    indices: [],
    description: `Dijkstra complete. Shortest distances found.`,
    graphState: { nodes, edges, visited: new Set(visited), current: null, path, distances: new Map(distances), mstEdges: [] },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* kruskal(
  nodes: GraphNode[],
  edges: GraphEdge[],
  onStep: (step: AnimationStep & { graphState: GraphState }) => void
): AsyncGenerator<AnimationStep & { graphState: GraphState }> {
  const parent = new Map<string, string>();
  const rank = new Map<string, number>();
  const mstEdges: GraphEdge[] = [];

  // Initialize Union-Find
  for (const node of nodes) {
    parent.set(node.id, node.id);
    rank.set(node.id, 0);
  }

  function find(x: string): string {
    if (parent.get(x) !== x) {
      parent.set(x, find(parent.get(x)!));
    }
    return parent.get(x)!;
  }

  function union(x: string, y: string): boolean {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX === rootY) return false;

    const rankX = rank.get(rootX) || 0;
    const rankY = rank.get(rootY) || 0;

    if (rankX < rankY) {
      parent.set(rootX, rootY);
    } else if (rankX > rankY) {
      parent.set(rootY, rootX);
    } else {
      parent.set(rootY, rootX);
      rank.set(rootX, rankX + 1);
    }
    return true;
  }

  // Sort edges by weight
  const sortedEdges = [...edges].sort((a, b) => (a.weight || 0) - (b.weight || 0));

  const initStep = {
    type: "init",
    indices: [],
    description: "Starting Kruskal's algorithm. Edges sorted by weight.",
    graphState: { nodes, edges, visited: new Set<string>(), current: null, path: [], distances: new Map(), mstEdges: [] },
  };
  yield initStep;
  onStep(initStep);

  for (const edge of sortedEdges) {
    const considerStep = {
      type: "consider",
      indices: [],
      description: `Considering edge ${edge.source} - ${edge.target} (weight: ${edge.weight})`,
      graphState: { nodes, edges, visited: new Set<string>(), current: edge.source, path: [], distances: new Map(), mstEdges: [...mstEdges] },
    };
    yield considerStep;
    onStep(considerStep);

    if (union(edge.source, edge.target)) {
      mstEdges.push(edge);

      const addStep = {
        type: "add-edge",
        indices: [],
        description: `Added edge ${edge.source} - ${edge.target} to MST`,
        graphState: { nodes, edges, visited: new Set<string>(), current: null, path: [], distances: new Map(), mstEdges: [...mstEdges] },
      };
      yield addStep;
      onStep(addStep);
    } else {
      const skipStep = {
        type: "skip",
        indices: [],
        description: `Skipped edge ${edge.source} - ${edge.target} (would create cycle)`,
        graphState: { nodes, edges, visited: new Set<string>(), current: null, path: [], distances: new Map(), mstEdges: [...mstEdges] },
      };
      yield skipStep;
      onStep(skipStep);
    }

    if (mstEdges.length === nodes.length - 1) break;
  }

  const totalWeight = mstEdges.reduce((sum, e) => sum + (e.weight || 0), 0);
  const completeStep = {
    type: "complete",
    indices: [],
    description: `Kruskal complete. MST weight: ${totalWeight}`,
    graphState: { nodes, edges, visited: new Set<string>(), current: null, path: [], distances: new Map(), mstEdges },
  };
  yield completeStep;
  onStep(completeStep);
}

export async function* prim(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  onStep: (step: AnimationStep & { graphState: GraphState }) => void
): AsyncGenerator<AnimationStep & { graphState: GraphState }> {
  const adjacencyList = buildWeightedAdjacencyList(nodes, edges);
  const visited = new Set<string>();
  const mstEdges: GraphEdge[] = [];

  visited.add(startId);

  const initStep = {
    type: "init",
    indices: [],
    description: `Starting Prim's algorithm from node ${startId}`,
    graphState: { nodes, edges, visited: new Set(visited), current: startId, path: [], distances: new Map(), mstEdges: [] },
  };
  yield initStep;
  onStep(initStep);

  while (visited.size < nodes.length) {
    let minEdge: GraphEdge | null = null;
    let minWeight = Infinity;

    // Find minimum weight edge from visited to unvisited
    for (const nodeId of visited) {
      const neighbors = adjacencyList.get(nodeId) || [];
      for (const { node: neighbor, weight } of neighbors) {
        if (!visited.has(neighbor) && weight < minWeight) {
          minWeight = weight;
          minEdge = { source: nodeId, target: neighbor, weight };
        }
      }
    }

    if (!minEdge) break;

    const considerStep = {
      type: "consider",
      indices: [],
      description: `Found minimum edge: ${minEdge.source} - ${minEdge.target} (weight: ${minEdge.weight})`,
      graphState: { nodes, edges, visited: new Set(visited), current: minEdge.source, path: [], distances: new Map(), mstEdges: [...mstEdges] },
    };
    yield considerStep;
    onStep(considerStep);

    visited.add(minEdge.target);
    mstEdges.push(minEdge);

    const addStep = {
      type: "add-edge",
      indices: [],
      description: `Added node ${minEdge.target} to MST`,
      graphState: { nodes, edges, visited: new Set(visited), current: minEdge.target, path: [], distances: new Map(), mstEdges: [...mstEdges] },
    };
    yield addStep;
    onStep(addStep);
  }

  const totalWeight = mstEdges.reduce((sum, e) => sum + (e.weight || 0), 0);
  const completeStep = {
    type: "complete",
    indices: [],
    description: `Prim's algorithm complete. MST weight: ${totalWeight}`,
    graphState: { nodes, edges, visited: new Set(visited), current: null, path: [], distances: new Map(), mstEdges },
  };
  yield completeStep;
  onStep(completeStep);
}

// Helper functions
function buildAdjacencyList(nodes: GraphNode[], edges: GraphEdge[]): Map<string, string[]> {
  const adjacencyList = new Map<string, string[]>();
  for (const node of nodes) {
    adjacencyList.set(node.id, []);
  }
  for (const edge of edges) {
    adjacencyList.get(edge.source)?.push(edge.target);
    adjacencyList.get(edge.target)?.push(edge.source);
  }
  return adjacencyList;
}

function buildWeightedAdjacencyList(
  nodes: GraphNode[],
  edges: GraphEdge[]
): Map<string, { node: string; weight: number }[]> {
  const adjacencyList = new Map<string, { node: string; weight: number }[]>();
  for (const node of nodes) {
    adjacencyList.set(node.id, []);
  }
  for (const edge of edges) {
    adjacencyList.get(edge.source)?.push({ node: edge.target, weight: edge.weight || 1 });
    adjacencyList.get(edge.target)?.push({ node: edge.source, weight: edge.weight || 1 });
  }
  return adjacencyList;
}

export const GRAPH_CODE = {
  bfs: {
    python: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result`,
    javascript: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}`,
    cpp: `void bfs(vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        
        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
  },
  dfs: {
    python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    
    return result`,
    javascript: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  const result = [start];
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      result.push(...dfs(graph, neighbor, visited));
    }
  }
  
  return result;
}`,
    cpp: `void dfs(vector<vector<int>>& graph, int node, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
  },
  dijkstra: {
    python: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        dist, node = heapq.heappop(pq)
        if dist > distances[node]:
            continue
        
        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))
    
    return distances`,
    javascript: `function dijkstra(graph, start) {
  const distances = new Map();
  const pq = [[0, start]];
  
  for (const node of graph.keys()) {
    distances.set(node, Infinity);
  }
  distances.set(start, 0);
  
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [dist, node] = pq.shift();
    
    if (dist > distances.get(node)) continue;
    
    for (const [neighbor, weight] of graph.get(node)) {
      const newDist = dist + weight;
      if (newDist < distances.get(neighbor)) {
        distances.set(neighbor, newDist);
        pq.push([newDist, neighbor]);
      }
    }
  }
  
  return distances;
}`,
    cpp: `vector<int> dijkstra(vector<vector<pair<int,int>>>& graph, int start) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist;
}`,
  },
  kruskal: {
    python: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True

def kruskal(n, edges):
    edges.sort(key=lambda x: x[2])
    uf = UnionFind(n)
    mst = []
    
    for u, v, w in edges:
        if uf.union(u, v):
            mst.append((u, v, w))
            if len(mst) == n - 1:
                break
    
    return mst`,
    javascript: `function kruskal(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  
  function union(x, y) {
    const px = find(x), py = find(y);
    if (px === py) return false;
    if (rank[px] < rank[py]) [px, py] = [py, px];
    parent[py] = px;
    if (rank[px] === rank[py]) rank[px]++;
    return true;
  }
  
  edges.sort((a, b) => a[2] - b[2]);
  const mst = [];
  
  for (const [u, v, w] of edges) {
    if (union(u, v)) {
      mst.push([u, v, w]);
      if (mst.length === n - 1) break;
    }
  }
  
  return mst;
}`,
    cpp: `class UnionFind {
    vector<int> parent, rank;
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) swap(px, py);
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
};

vector<tuple<int,int,int>> kruskal(int n, vector<tuple<int,int,int>>& edges) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b) {
        return get<2>(a) < get<2>(b);
    });
    
    UnionFind uf(n);
    vector<tuple<int,int,int>> mst;
    
    for (auto& [u, v, w] : edges) {
        if (uf.unite(u, v)) {
            mst.push_back({u, v, w});
            if (mst.size() == n - 1) break;
        }
    }
    
    return mst;
}`,
  },
  prim: {
    python: `import heapq

def prim(graph, start):
    visited = set([start])
    edges = [(w, start, v) for v, w in graph[start]]
    heapq.heapify(edges)
    mst = []
    
    while edges and len(visited) < len(graph):
        w, u, v = heapq.heappop(edges)
        if v in visited:
            continue
        
        visited.add(v)
        mst.append((u, v, w))
        
        for next_v, next_w in graph[v]:
            if next_v not in visited:
                heapq.heappush(edges, (next_w, v, next_v))
    
    return mst`,
    javascript: `function prim(graph, start) {
  const visited = new Set([start]);
  const edges = [];
  const mst = [];
  
  for (const [v, w] of graph.get(start)) {
    edges.push([w, start, v]);
  }
  edges.sort((a, b) => a[0] - b[0]);
  
  while (edges.length > 0 && visited.size < graph.size) {
    edges.sort((a, b) => a[0] - b[0]);
    const [w, u, v] = edges.shift();
    
    if (visited.has(v)) continue;
    
    visited.add(v);
    mst.push([u, v, w]);
    
    for (const [nextV, nextW] of graph.get(v)) {
      if (!visited.has(nextV)) {
        edges.push([nextW, v, nextV]);
      }
    }
  }
  
  return mst;
}`,
    cpp: `vector<tuple<int,int,int>> prim(vector<vector<pair<int,int>>>& graph, int start) {
    int n = graph.size();
    vector<bool> visited(n, false);
    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<>> pq;
    vector<tuple<int,int,int>> mst;
    
    visited[start] = true;
    for (auto [v, w] : graph[start]) {
        pq.push({w, start, v});
    }
    
    while (!pq.empty() && mst.size() < n - 1) {
        auto [w, u, v] = pq.top();
        pq.pop();
        
        if (visited[v]) continue;
        
        visited[v] = true;
        mst.push_back({u, v, w});
        
        for (auto [nextV, nextW] : graph[v]) {
            if (!visited[nextV]) {
                pq.push({nextW, v, nextV});
            }
        }
    }
    
    return mst;
}`,
  },
};
