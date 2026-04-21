"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { Progress } from "@/components/ui/progress";
import { MODULE_TITLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ProgressBar() {
  const currentModule = useWorkshopStore((s) => s.currentModule);
  const teamName = useWorkshopStore((s) => s.teamName);
  const progress = currentModule >= 5 ? 100 : ((currentModule - 1) / 4) * 100;

  return (
    <div className="border-b bg-white">
      <div className="mx-auto max-w-3xl px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Team: {teamName}
          </h2>
          <span className="text-xs text-muted-foreground">
            {currentModule >= 5
              ? "Complete"
              : `Module ${currentModule} of 4`}
          </span>
        </div>
        <Progress value={progress} className="mb-3" />
        <div className="flex justify-between gap-1">
          {MODULE_TITLES.map((m) => (
            <div
              key={m.number}
              className={cn(
                "flex-1 text-center text-xs py-1 rounded",
                currentModule === m.number && "bg-primary/10 font-semibold text-primary",
                currentModule > m.number && "text-muted-foreground",
                currentModule < m.number && "text-muted-foreground/50"
              )}
            >
              M{m.number}
            </div>
          ))}
          <div
            className={cn(
              "flex-1 text-center text-xs py-1 rounded",
              currentModule >= 5 && "bg-primary/10 font-semibold text-primary",
              currentModule < 5 && "text-muted-foreground/50"
            )}
          >
            Summary
          </div>
        </div>
      </div>
    </div>
  );
}
