"use client";

import { useState } from "react";
import { AlgorithmSidebar } from "@/components/algorithm-sidebar";
import { AlgorithmVisualizer } from "@/components/algorithm-visualizer";
import type { AlgorithmCategory, AlgorithmType } from "@/lib/algorithm-types";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<AlgorithmCategory>("sorting");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>("bubble");

  const handleSelectAlgorithm = (category: AlgorithmCategory, algorithm: AlgorithmType) => {
    setSelectedCategory(category);
    setSelectedAlgorithm(algorithm);
  };

  return (
    <div className="flex h-screen bg-background">
      <AlgorithmSidebar
        selectedCategory={selectedCategory}
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={handleSelectAlgorithm}
      />
      
      <main className="flex-1 overflow-auto p-4 lg:p-6 lg:pl-4">
        <div className="max-w-6xl mx-auto h-full">
          <AlgorithmVisualizer
            category={selectedCategory}
            algorithm={selectedAlgorithm}
          />
        </div>
      </main>
    </div>
  );
}
