"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { IMPROVEMENT_AREAS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ReflectForm() {
  const store = useWorkshopStore();
  const { section4 } = store;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">
          Pick the single biggest area your team needs to improve
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {IMPROVEMENT_AREAS.map((area) => (
            <Card
              key={area.name}
              className={cn(
                "cursor-pointer transition-colors",
                section4.improvementArea === area.name
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "hover:border-primary/30"
              )}
              onClick={() => store.setImprovementArea(area.name)}
            >
              <CardContent className="p-3">
                <p className="text-sm font-medium">{area.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {section4.improvementArea && (
        <>
          <Separator />
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">
                1. What does the current situation look like?
              </h3>
              <Textarea
                placeholder="Describe what's happening now with the team's approach to this area..."
                value={section4.currentSituation}
                onChange={(e) => store.setCurrentSituation(e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">
                2. What would &ldquo;better&rdquo; look like in 3 months?
              </h3>
              <Textarea
                placeholder="Describe the desired outcome..."
                value={section4.desiredOutcome}
                onChange={(e) => store.setDesiredOutcome(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
