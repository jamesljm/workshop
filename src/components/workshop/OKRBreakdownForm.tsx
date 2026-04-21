"use client";

import { useState } from "react";
import { useWorkshopStore } from "@/store/workshop-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X, Target, CalendarDays, User } from "lucide-react";
import type { ActionItem } from "@/lib/types";

export function OKRBreakdownForm() {
  const store = useWorkshopStore();
  const { section2, section3 } = store;
  const [krInput, setKrInput] = useState("");
  const [actionDesc, setActionDesc] = useState("");
  const [actionOwner, setActionOwner] = useState("");
  const [actionDate, setActionDate] = useState("");

  const handleAddKR = () => {
    const trimmed = krInput.trim();
    if (trimmed) {
      store.addKeyResult(trimmed);
      setKrInput("");
    }
  };

  const handleAddAction = () => {
    if (actionDesc.trim() && actionOwner.trim() && actionDate) {
      const action: ActionItem = {
        description: actionDesc.trim(),
        owner: actionOwner.trim(),
        dueDate: actionDate,
      };
      store.addAction(action);
      setActionDesc("");
      setActionOwner("");
      setActionDate("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Read-only objective from S2 */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Objective (from Section 2)
              </p>
              <p className="text-sm font-medium">
                {section2.goalStatement || "No goal set yet — go back to Section 2"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Results (left) */}
        <div>
          <h3 className="text-sm font-medium mb-1">Key Results</h3>
          <p className="text-xs text-muted-foreground mb-3">
            3–5 monthly milestones. Each should have a clear yes/no completion state.
          </p>
          {section3.keyResults.length > 0 && (
            <ul className="space-y-2 mb-3">
              {section3.keyResults.map((kr, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-md border p-3 text-sm"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {i + 1}
                  </span>
                  <span className="flex-1">{kr}</span>
                  <button
                    onClick={() => store.removeKeyResult(i)}
                    className="text-muted-foreground hover:text-destructive shrink-0 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Type a key result and press Enter..."
              value={krInput}
              onChange={(e) => setKrInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddKR()}
            />
            <Button
              size="icon"
              variant="outline"
              onClick={handleAddKR}
              disabled={!krInput.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Actions (right) */}
        <div>
          <h3 className="text-sm font-medium mb-1">This Week&apos;s Actions</h3>
          <p className="text-xs text-muted-foreground mb-3">
            3–5 tasks with a named owner and due date.
          </p>
          {section3.actions.length > 0 && (
            <div className="space-y-2 mb-3">
              {section3.actions.map((action, i) => (
                <div
                  key={i}
                  className="rounded-md border p-3 text-sm space-y-1"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-medium">{action.description}</p>
                    <button
                      onClick={() => store.removeAction(i)}
                      className="text-muted-foreground hover:text-destructive shrink-0 ml-2 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {action.owner}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> {action.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="space-y-2">
            <Input
              placeholder="Action description"
              value={actionDesc}
              onChange={(e) => setActionDesc(e.target.value)}
            />
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Owner"
                  value={actionOwner}
                  onChange={(e) => setActionOwner(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  type="date"
                  value={actionDate}
                  onChange={(e) => setActionDate(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddAction()}
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleAddAction}
              disabled={!actionDesc.trim() || !actionOwner.trim() || !actionDate}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Action
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
