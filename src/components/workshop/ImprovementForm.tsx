"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { IMPROVEMENT_AREAS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export function ImprovementForm() {
  const { module2, setArea, setCurrentSituation, setDesiredOutcome } =
    useWorkshopStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">
          1. Pick one area your team should improve
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {IMPROVEMENT_AREAS.map((area) => (
            <button
              key={area}
              onClick={() => setArea(area)}
              className={cn(
                "rounded-lg border p-3 text-sm font-medium text-center transition-colors cursor-pointer",
                module2.area === area
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-input hover:bg-accent"
              )}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {module2.area && (
        <>
          <Separator />
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">
                2. Describe the current situation with &ldquo;{module2.area}&rdquo;
              </h3>
              <Textarea
                placeholder="What's happening now? What's not working?"
                value={module2.currentSituation}
                onChange={(e) => setCurrentSituation(e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">
                3. What should it look like instead?
              </h3>
              <Textarea
                placeholder="Describe the desired outcome..."
                value={module2.desiredOutcome}
                onChange={(e) => setDesiredOutcome(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
