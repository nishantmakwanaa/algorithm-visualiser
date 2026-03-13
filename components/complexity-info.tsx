"use client";

import { Clock, Database, Info, CheckCircle, XCircle, Target, Lightbulb } from "lucide-react";
import { COMPLEXITY_INFO, ALGORITHM_DESCRIPTIONS } from "@/lib/algorithm-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ComplexityInfoProps {
  algorithmId: string;
  algorithmName: string;
}

export function ComplexityInfo({
  algorithmId,
  algorithmName,
}: ComplexityInfoProps) {
  const complexity = COMPLEXITY_INFO[algorithmId];
  const description = ALGORITHM_DESCRIPTIONS[algorithmId];

  if (!complexity) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
        <p className="text-sm text-muted-foreground">
          Detailed information for {algorithmName} is being prepared.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Name and Complexity */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Info className="h-5 w-5 text-primary" />
            {description?.title || algorithmName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description.description}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Time Complexity */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Time Complexity
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-accent/20 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Best</div>
                  <div className="font-mono text-accent font-medium">{complexity.time.best}</div>
                </div>
                <div className="bg-primary/20 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Average</div>
                  <div className="font-mono text-primary font-medium">{complexity.time.avg}</div>
                </div>
                <div className="bg-destructive/20 rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Worst</div>
                  <div className="font-mono text-destructive font-medium">{complexity.time.worst}</div>
                </div>
              </div>
            </div>

            {/* Space Complexity */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Database className="h-4 w-4 text-primary" />
                Space Complexity
              </div>
              <div className="bg-secondary rounded-lg p-4 flex items-center justify-center">
                <span className="font-mono text-xl text-primary font-semibold">{complexity.space}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {description && (
        <>
          {/* Key Points */}
          {description.keyPoints && description.keyPoints.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-chart-4" />
                  Key Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {description.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Use Cases */}
          {description.useCases && description.useCases.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {description.useCases.map((useCase, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {description.pros && description.pros.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg text-accent">
                    <CheckCircle className="h-5 w-5" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {description.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {description.cons && description.cons.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                    <XCircle className="h-5 w-5" />
                    Disadvantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {description.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
