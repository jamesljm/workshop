"use client";

import { useState } from "react";
import { useWorkshopStore } from "@/store/workshop-store";
import { BUDGET_CATEGORIES, CATEGORY_GROUPS, FIVE_WHY_PROMPTS } from "@/lib/constants";
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
    if (trimmed && section1.proposedItems.length < 6) {
      store.addProposedItem(trimmed);
      setItemInput("");
    }
  };

  const handleAddIdea = () => {
    const trimmed = ideaInput.trim();
    if (trimmed && section1.solutionIdeas.length < 4) {
      store.addSolutionIdea(trimmed);
      setIdeaInput("");
    }
  };

  const whyKeys: (keyof FiveWhys)[] = ["w1", "w2", "w3", "w4", "w5"];

  // Dynamic W1 prompt
  const getWhyPrompt = (index: number): string => {
    if (index === 0 && section1.selectedItem) {
      return `Why is "${section1.selectedItem}" a problem right now?`;
    }
    return FIVE_WHY_PROMPTS[index];
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Pick a category */}
      <div>
        <h3 className="text-sm font-medium mb-3">
          Step 1 — CHOOSE YOUR COST CATEGORY
        </h3>
        <div className="space-y-4">
          {CATEGORY_GROUPS.map((group) => {
            const cats = BUDGET_CATEGORIES.filter((c) => c.group === group);
            return (
              <div key={group}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {cats.map((cat) => (
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
            );
          })}
        </div>
      </div>

      {/* Step 2: Propose cost items */}
      {section1.category && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-1">
              Step 2 — LIST ALL SPECIFIC COST ITEMS IN THAT CATEGORY
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              What cost items in &ldquo;{section1.category}&rdquo; are costing your team the most? List up to 6 below.
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
            {section1.proposedItems.length < 6 && (
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
            )}
            {section1.proposedItems.length >= 1 && !section1.selectedItem && (
              <>
                <Separator className="my-4" />
                <h3 className="text-sm font-medium mb-1">
                  Step 3 — CIRCLE ONE ITEM TO FOCUS ON
                </h3>
                <p className="text-xs text-muted-foreground">
                  Click the &ldquo;Focus&rdquo; button on the item you want to drill into.
                </p>
              </>
            )}
          </div>
        </>
      )}

      {/* Step 4: 5 Whys */}
      {section1.selectedItem && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-1">
              Step 4 — RUN THE 5 WHYS ON YOUR FOCUSED ITEM
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
                        isRootCause && "text-red-700"
                      )}
                    >
                      W{i + 1}: {getWhyPrompt(i)}
                    </label>
                    <Input
                      value={section1.fiveWhys[key]}
                      onChange={(e) => store.setFiveWhy(key, e.target.value)}
                      placeholder={`Answer W${i + 1}...`}
                      className={cn(
                        isRootCause && "border-red-400 ring-1 ring-red-200 focus-visible:ring-red-400"
                      )}
                    />
                    {isRootCause && section1.fiveWhys.w5 && (
                      <p className="text-xs text-red-600 mt-1 font-medium">
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

      {/* Step 5: Solutions */}
      {section1.selectedItem && section1.fiveWhys.w1 && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-1">
              <Lightbulb className="inline h-4 w-4 mr-1" />
              Step 5 — SOLUTIONS THAT ATTACK W5 (ROOT CAUSE)
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Max 4 solutions (labelled A-D). Each should target the root cause{section1.fiveWhys.w5 ? `: "${section1.fiveWhys.w5}"` : ""}.
            </p>
            {section1.solutionIdeas.length > 0 && (
              <div className="space-y-2 mb-3">
                {section1.solutionIdeas.map((idea, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-md border p-2 text-sm"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{idea}</span>
                    <button
                      onClick={() => store.removeSolutionIdea(i)}
                      className="text-muted-foreground hover:text-destructive cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {section1.solutionIdeas.length < 4 && (
              <div className="flex gap-2">
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
            )}
            {section1.solutionIdeas.length === 0 && (
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
