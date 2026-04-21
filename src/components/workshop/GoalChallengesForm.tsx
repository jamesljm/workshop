"use client";

import { useState } from "react";
import { useWorkshopStore } from "@/store/workshop-store";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Target } from "lucide-react";

export function GoalChallengesForm() {
  const { module3, setGoal, addChallenge, removeChallenge } =
    useWorkshopStore();
  const [challengeInput, setChallengeInput] = useState("");

  const handleAddChallenge = () => {
    const trimmed = challengeInput.trim();
    if (trimmed) {
      addChallenge(trimmed);
      setChallengeInput("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">
          <Target className="inline h-4 w-4 mr-1" />
          1. What is the one big goal your team should achieve?
        </h3>
        <Textarea
          placeholder="Write a clear, specific goal..."
          value={module3.goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={3}
        />
      </div>

      {module3.goal.trim() && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-3">
              2. What challenges stand in the way?
            </h3>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Type a challenge and press Enter..."
                value={challengeInput}
                onChange={(e) => setChallengeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddChallenge()}
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleAddChallenge}
                disabled={!challengeInput.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {module3.challenges.length > 0 && (
              <ul className="space-y-2">
                {module3.challenges.map((challenge, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-md border p-3 text-sm"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className="flex-1">{challenge}</span>
                    <button
                      onClick={() => removeChallenge(i)}
                      className="text-muted-foreground hover:text-destructive shrink-0 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {module3.challenges.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Add at least 1 challenge to continue.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
