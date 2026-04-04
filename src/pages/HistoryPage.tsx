import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code2, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PromptItem {
  id: string;
  prompt: string;
  language: string;
  code: string;
  createdAt: string;
}

const mockHistory: PromptItem[] = [
  { id: "1", prompt: "Create a REST API in Node.js with Express", language: "JavaScript", code: "const express = require('express');\nconst app = express();\n\napp.get('/api', (req, res) => {\n  res.json({ message: 'Hello' });\n});\n\napp.listen(3000);", createdAt: "2 hours ago" },
  { id: "2", prompt: "Binary search implementation", language: "Python", code: "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1", createdAt: "5 hours ago" },
  { id: "3", prompt: "React custom hook for debounce", language: "TypeScript", code: "import { useState, useEffect } from 'react';\n\nexport function useDebounce<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState<T>(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debounced;\n}", createdAt: "1 day ago" },
  { id: "4", prompt: "Merge sort algorithm", language: "Java", code: "public class MergeSort {\n    public static void sort(int[] arr) {\n        if (arr.length <= 1) return;\n        // implementation\n    }\n}", createdAt: "2 days ago" },
];

export default function HistoryPage() {
  const [history, setHistory] = useState<PromptItem[]>(mockHistory);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((p) => p.id !== id));
    toast.success("Prompt deleted");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold">Prompt History</h1>
        <p className="mt-1 text-muted-foreground">Browse and manage your past code generations.</p>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-card py-16">
          <Code2 className="mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">No prompts yet. Start generating!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-border/50 bg-card p-4 transition-all hover:shadow-md">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.prompt}</p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{item.language}</span>
                  <span className="text-xs text-muted-foreground">{item.createdAt}</span>
                </div>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setSelectedPrompt(item)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!selectedPrompt} onOpenChange={() => setSelectedPrompt(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg">{selectedPrompt?.prompt}</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{selectedPrompt?.language}</span>
          </div>
          <pre className="mt-4 max-h-96 overflow-auto rounded-lg bg-muted p-4 font-mono text-sm">{selectedPrompt?.code}</pre>
        </DialogContent>
      </Dialog>
    </div>
  );
}
