"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type Language = "python" | "javascript" | "cpp";

interface CodeViewerProps {
  code: {
    python: string;
    javascript: string;
    cpp: string;
  };
  title?: string;
}

export function CodeViewer({ code, title }: CodeViewerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("python");
  const [copied, setCopied] = useState(false);

  const languages: { id: Language; label: string }[] = [
    { id: "python", label: "Python" },
    { id: "javascript", label: "JavaScript" },
    { id: "cpp", label: "C++" },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code[selectedLanguage]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-1">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                selectedLanguage === lang.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>

      {title && (
        <div className="px-4 py-2 border-b border-border">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code className="text-foreground/90">{code[selectedLanguage]}</code>
        </pre>
      </div>
    </div>
  );
}
