"use client";

import { useState } from "react";
import { useWorkshopStore } from "@/store/workshop-store";
import { BUDGET_CATEGORIES, FIVE_WHY_PROMPTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Lightbulb, Focus } from "lucide-react";
import type { FiveWhys } from "@/lib/types";

export function CostProblemForm() {
  const store = useWorkshopStore();
  const { section1 } = store;
  const [itemInput, setItemInput] = useState("");
  const [ideaInput, setIdeaInput] = useState("");

  const handleAddItem = () => {
    const trimmed = itemInput.trim();
    if (trimmed) {
      store.addProposedItem(trimmed);
      setItemInput("");
    }
  };

  const handleAddIdea = () => {
    const trimmed = ideaInput.trim();
    if (trimmed) {
      store.addSolutionIdea(trimmed);
      setIdeaInput("");
    }
  };

  const whyKeys: (keyof FiveWhys)[] = ["w1", "w2", "w3", "w4", "w5"];

  return (
    <div className="space-y-6">
      {/* Step 1: Pick a category */}
      <div>
        <h3 className="text-sm font-medium mb-3">
          Step 1 — Select a cost category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BUDGET_CATEGORIES.map((cat) => (
            <Card
              key={cat.name}
              className={cn(
                "cursor-pointer transition-colors",
                section1.category === cat.name
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "hover:border-primary/30"
              )}
              onClick={() => store.setCategory(cat.name)}
            >
              <CardContent className="p-3">
                <p className="text-sm font-medium">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Step 2: Propose cost items */}
      {section1.category && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-1">
              Step 2 — Propose cost items
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              What cost items in &ldquo;{section1.category}&rdquo; are costing your team the most? List them below — be specific. Then pick one to focus on.
            </p>
            <div className="space-y-2 mb-3">
              {section1.proposedItems.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-2 rounded-md border p-2 transition-colors",
                    section1.selectedItem === item && "border-primary bg-primary/5 ring-1 ring-primary"
                  )}
                >
                  <Input
                    value={item}
                    onChange={(e) => store.updateProposedItem(i, e.target.value)}
                    className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto text-sm"
                  />
                  <Button
                    size="sm"
                    variant={section1.selectedItem === item ? "default" : "outline"}
                    onClick={() => store.setSelectedItem(item)}
                    className="shrink-0 text-xs h-7 px-2"
                  >
                    <Focus className="h-3 w-3 mr-1" />
                    {section1.selectedItem === item ? "Focused" : "Focus"}
                  </Button>
                  <button
                    onClick={() => store.removeProposedItem(i)}
                    className="text-muted-foreground hover:text-destructive shrink-0 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type a cost item and press Enter..."
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleAddItem}
                disabled={!itemInput.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Step 3: 5 Whys */}
      {section1.selectedItem && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-1">
              Step 3 — Run the 5 Whys
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Starting from &ldquo;{section1.selectedItem}&rdquo;, ask why 5 times to find the root cause.
            </p>
            <div className="space-y-3">
              {whyKeys.map((key, i) => {
                const isRootCause = i === 4;
                return (
                  <div key={key}>
                    <label
                      className={cn(
                        "text-xs font-medium mb-1 block",
                        isRootCause && "text-teal-700"
                      )}
                    >
                      W{i + 1}: {FIVE_WHY_PROMPTS[i]}
                    </label>
                    <Input
                      value={section1.fiveWhys[key]}
                      onChange={(e) => store.setFiveWhy(key, e.target.value)}
                      placeholder={`Answer W${i + 1}...`}
                      className={cn(
                        isRootCause && "border-teal-400 ring-1 ring-teal-200 focus-visible:ring-teal-400"
                      )}
                    />
                    {isRootCause && section1.fiveWhys.w5 && (
                      <p className="text-xs text-teal-600 mt-1 font-medium">
                        Root cause identified
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Step 4: Brainstorm solutions */}
      {section1.selectedItem && section1.fiveWhys.w1 && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-1">
              <Lightbulb className="inline h-4 w-4 mr-1" />
              Step 4 — Brainstorm solutions
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Ideas should address the root cause{section1.fiveWhys.w5 ? `: "${section1.fiveWhys.w5}"` : ""}, not just the surface symptom.
            </p>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Type a solution idea and press Enter..."
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
            {section1.solutionIdeas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {section1.solutionIdeas.map((idea, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1 text-sm"
                  >
                    {idea}
                    <button
                      onClick={() => store.removeSolutionIdea(i)}
                      className="text-muted-foreground hover:text-destructive cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Add at least 1 solution idea to continue.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
