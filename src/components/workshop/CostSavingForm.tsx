"use client";

import { useState } from "react";
import { useWorkshopStore } from "@/store/workshop-store";
import { BUDGET_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Lightbulb } from "lucide-react";

export function CostSavingForm() {
  const { module1, setCategory, setSelectedItem, addIdea, removeIdea } =
    useWorkshopStore();
  const [ideaInput, setIdeaInput] = useState("");

  const categories = Object.keys(BUDGET_CATEGORIES);

  const handleAddIdea = () => {
    const trimmed = ideaInput.trim();
    if (trimmed) {
      addIdea(trimmed);
      setIdeaInput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Pick a category */}
      <div>
        <h3 className="text-sm font-medium mb-3">
          1. Choose a budget category to investigate
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium border transition-colors cursor-pointer",
                module1.category === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-input hover:bg-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Pick a line item */}
      {module1.category && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-3">
              2. Select the biggest waste item in &ldquo;{module1.category}&rdquo;
            </h3>
            <div className="grid gap-2 sm:grid-cols-1">
              {BUDGET_CATEGORIES[module1.category].map((item) => (
                <Card
                  key={item}
                  className={cn(
                    "cursor-pointer transition-colors",
                    module1.selectedItem === item
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/30"
                  )}
                  onClick={() => setSelectedItem(item)}
                >
                  <CardContent className="p-3 text-sm">
                    {item}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Step 3: Ideas to fix it */}
      {module1.selectedItem && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-3">
              <Lightbulb className="inline h-4 w-4 mr-1" />
              3. How would you fix &ldquo;{module1.selectedItem}&rdquo;? Add your ideas
            </h3>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Type an idea and press Enter..."
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddIdea()}
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleAddIdea}
                disabled={!ideaInput.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {module1.ideas.length > 0 && (
              <ul className="space-y-2">
                {module1.ideas.map((idea, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-md border p-3 text-sm"
                  >
                    <span className="flex-1">{idea}</span>
                    <button
                      onClick={() => removeIdea(i)}
                      className="text-muted-foreground hover:text-destructive shrink-0 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {module1.ideas.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Add at least 1 idea to continue.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
