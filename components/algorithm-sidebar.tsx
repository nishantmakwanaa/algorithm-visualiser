"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Search,
  GitBranch,
  Binary,
  Table,
  Undo2,
  Zap,
  Layers,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ALGORITHM_CATEGORIES, ALGORITHMS, type AlgorithmCategory, type AlgorithmType } from "@/lib/algorithm-types";

const iconMap = {
  BarChart3,
  Search,
  GitBranch,
  Binary,
  Table,
  Undo2,
  Zap,
  Layers,
};

interface AlgorithmSidebarProps {
  selectedCategory: AlgorithmCategory;
  selectedAlgorithm: AlgorithmType;
  onSelectAlgorithm: (category: AlgorithmCategory, algorithm: AlgorithmType) => void;
}

export function AlgorithmSidebar({
  selectedCategory,
  selectedAlgorithm,
  onSelectAlgorithm,
}: AlgorithmSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<AlgorithmCategory>>(
    new Set([selectedCategory])
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCategory = (category: AlgorithmCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSelectAlgorithm = (category: AlgorithmCategory, algorithm: AlgorithmType) => {
    onSelectAlgorithm(category, algorithm);
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <ScrollArea className="h-full">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">Algorithm Visualizer</h1>
          <p className="text-sm text-muted-foreground mt-1">Interactive DSA Learning</p>
        </div>

        <nav className="flex flex-col gap-1">
          {ALGORITHM_CATEGORIES.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            const isExpanded = expandedCategories.has(category.id);
            const algorithms = ALGORITHMS[category.id];

            return (
              <div key={category.id}>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-secondary/80",
                    selectedCategory === category.id
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {isExpanded && (
                  <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-border pl-4">
                    {algorithms.map((algo) => (
                      <button
                        key={algo.id}
                        onClick={() => handleSelectAlgorithm(category.id, algo.id)}
                        className={cn(
                          "px-3 py-1.5 text-sm text-left rounded-md transition-colors",
                          "hover:bg-primary/10 hover:text-primary",
                          selectedAlgorithm === algo.id
                            ? "bg-primary/20 text-primary font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {algo.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </ScrollArea>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-72 bg-sidebar border-r border-sidebar-border",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
