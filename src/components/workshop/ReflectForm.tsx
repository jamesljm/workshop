"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { IMPROVEMENT_AREAS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ReflectForm() {
  const store = useWorkshopStore();
  const { section4, teamMembers } = store;

  // Ensure personal commitments array has 5 entries
  const commitments = Array.from({ length: 5 }, (_, i) => {
    const existing = section4.personalCommitments[i];
    return existing || { name: teamMembers[i] || "", role: "", commitment: "" };
  });

  return (
    <div className="space-y-6">
      {/* Step 1: Vote */}
      <div>
        <h3 className="text-sm font-medium mb-1">
          Step 1 — VOTE
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Each team member picks one area. Use sticky notes if on paper. The area with the most votes wins.
        </p>
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
            {/* Step 2 */}
            <div>
              <h3 className="text-sm font-medium mb-2">
                Step 2 — What does the current situation look like?
              </h3>
              <Textarea
                placeholder="Describe what's happening now with the team's approach to this area..."
                value={section4.currentSituation}
                onChange={(e) => store.setCurrentSituation(e.target.value)}
                rows={4}
              />
            </div>
            {/* Step 3 */}
            <div>
              <h3 className="text-sm font-medium mb-2">
                Step 3 — What would &ldquo;better&rdquo; look like in 3 months?
              </h3>
              <Textarea
                placeholder="Describe the desired outcome..."
                value={section4.desiredOutcome}
                onChange={(e) => store.setDesiredOutcome(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          {/* Step 4: Personal Commitments */}
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-1">
              Step 4 — PERSONAL COMMITMENTS
            </h3>
            <p className="text-xs text-muted-foreground mb-1">
              What do I personally do — or fail to do — that makes cost problems harder to solve?
            </p>
            <p className="text-xs text-red-600 font-medium mb-4">
              Your name on this paper is your word.
            </p>
            <div className="space-y-3">
              {commitments.map((c, i) => (
                <div key={i} className="rounded-md border p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4 shrink-0">{i + 1}.</span>
                    <Input
                      placeholder="Full Name"
                      value={c.name}
                      onChange={(e) => store.updatePersonalCommitment(i, "name", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Role"
                      value={c.role}
                      onChange={(e) => store.updatePersonalCommitment(i, "role", e.target.value)}
                      className="w-40"
                    />
                  </div>
                  <Textarea
                    placeholder="My commitment..."
                    value={c.commitment}
                    onChange={(e) => store.updatePersonalCommitment(i, "commitment", e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
