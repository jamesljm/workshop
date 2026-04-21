"use client";

import { useState } from "react";
import { useWorkshopStore } from "@/store/workshop-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X, Target, CalendarDays, User } from "lucide-react";
import type { ActionItem } from "@/lib/types";

export function BreakdownForm() {
  const { module3, module4, addSubGoal, removeSubGoal, addAction, removeAction } =
    useWorkshopStore();
  const [subGoalInput, setSubGoalInput] = useState("");
  const [actionDesc, setActionDesc] = useState("");
  const [actionOwner, setActionOwner] = useState("");
  const [actionDate, setActionDate] = useState("");

  const handleAddSubGoal = () => {
    const trimmed = subGoalInput.trim();
    if (trimmed) {
      addSubGoal(trimmed);
      setSubGoalInput("");
    }
  };

  const handleAddAction = () => {
    if (actionDesc.trim() && actionOwner.trim() && actionDate) {
      const action: ActionItem = {
        description: actionDesc.trim(),
        owner: actionOwner.trim(),
        dueDate: actionDate,
      };
      addAction(action);
      setActionDesc("");
      setActionOwner("");
      setActionDate("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Read-only goal from M3 */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Your Goal (from Module 3)
              </p>
              <p className="text-sm font-medium">
                {module3.goal || "No goal set yet"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sub-goals */}
      <div>
        <h3 className="text-sm font-medium mb-3">
          1. Break it down into sub-goals (3-5 recommended)
        </h3>
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Type a sub-goal and press Enter..."
            value={subGoalInput}
            onChange={(e) => setSubGoalInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSubGoal()}
          />
          <Button
            size="icon"
            variant="outline"
            onClick={handleAddSubGoal}
            disabled={!subGoalInput.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {module4.subGoals.length > 0 && (
          <ul className="space-y-2">
            {module4.subGoals.map((sg, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-md border p-3 text-sm"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {i + 1}
                </span>
                <span className="flex-1">{sg}</span>
                <button
                  onClick={() => removeSubGoal(i)}
                  className="text-muted-foreground hover:text-destructive shrink-0 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Separator />

      {/* Actions */}
      <div>
        <h3 className="text-sm font-medium mb-3">
          2. Assign concrete actions
        </h3>
        <div className="space-y-2 mb-3">
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

        {module4.actions.length > 0 && (
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-2 font-medium">Action</th>
                  <th className="text-left p-2 font-medium w-28">Owner</th>
                  <th className="text-left p-2 font-medium w-28">Due</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {module4.actions.map((action, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="p-2">{action.description}</td>
                    <td className="p-2">{action.owner}</td>
                    <td className="p-2">{action.dueDate}</td>
                    <td className="p-2">
                      <button
                        onClick={() => removeAction(i)}
                        className="text-muted-foreground hover:text-destructive cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
