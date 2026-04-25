"use client";

import { useState } from "react";
import { useWorkshopStore } from "@/store/workshop-store";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

export function SmartGoalForm() {
  const store = useWorkshopStore();
  const { section1, section2 } = store;
  const [challengeInput, setChallengeInput] = useState("");

  const handleAddChallenge = () => {
    const trimmed = challengeInput.trim();
    if (trimmed && section2.challenges.length < 5) {
      store.addChallenge(trimmed);
      setChallengeInput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Context pills from M1 */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="text-sm py-1 px-3">
          Cost item: {section1.selectedItem || "—"}
        </Badge>
        <Badge variant="outline" className="text-sm py-1 px-3 border-red-300 text-red-700">
          Root cause (W5): {section1.fiveWhys.w5 || "—"}
        </Badge>
      </div>

      {/* Callout */}
      <div className="rounded-lg border border-red-200 bg-red-50 p-3">
        <p className="text-xs font-semibold text-red-700">
          M and T are the most commonly missed — make sure both include a concrete number or date.
        </p>
      </div>

      {/* SMART fields */}
      <div>
        <h3 className="text-sm font-medium mb-3">
          Define your SMART goal
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              S — What exactly changes?
            </label>
            <Textarea
              placeholder="e.g. Reduce diesel consumption on all active sites..."
              value={section2.smart.specific}
              onChange={(e) => store.setSmartField("specific", e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-2">
              M — By how much? (%, RM, days)
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">MUST include a number</Badge>
            </label>
            <Textarea
              placeholder="e.g. 30% reduction in monthly diesel spend..."
              value={section2.smart.measurable}
              onChange={(e) => store.setSmartField("measurable", e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              A — Why is this realistic?
            </label>
            <Textarea
              placeholder="e.g. By enforcing a 7PM generator curfew policy..."
              value={section2.smart.achievable}
              onChange={(e) => store.setSmartField("achievable", e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              R — Tied to M1 cost item?
            </label>
            <Textarea
              placeholder="e.g. Diesel is our largest controllable cost and prices rose 15%..."
              value={section2.smart.relevant}
              onChange={(e) => store.setSmartField("relevant", e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-2">
            T — By when?
            <Badge variant="destructive" className="text-[10px] px-1.5 py-0">MUST include a date</Badge>
          </label>
          <Input
            placeholder="e.g. 31 July 2026"
            value={section2.smart.timeBound}
            onChange={(e) => store.setSmartField("timeBound", e.target.value)}
          />
        </div>
      </div>

      {/* Goal preview */}
      {(section2.smart.specific || section2.smart.measurable) && (
        <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
          <p className="text-xs font-medium text-primary/70 mb-1">Goal Preview (auto-assembled)</p>
          <p className="text-sm font-medium">
            {section2.goalStatement || "Fill in the SMART fields above to see your goal statement..."}
          </p>
        </div>
      )}

      {/* Challenges */}
      <Separator />
      <div>
        <h3 className="text-sm font-medium mb-1">
          Challenges (3-5)
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          What obstacles stand in the way of this goal? Be specific.
        </p>
        {section2.challenges.length > 0 && (
          <ul className="space-y-2 mb-3">
            {section2.challenges.map((c, i) => (
              <li
                key={i}
                className="flex items-start gap-2 rounded-md border p-3 text-sm"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {i + 1}
                </span>
                <span className="flex-1">{c}</span>
                <button
                  onClick={() => store.removeChallenge(i)}
                  className="text-muted-foreground hover:text-destructive shrink-0 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {section2.challenges.length < 5 && (
          <div className="flex gap-2">
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
        )}
      </div>
    </div>
  );
}
