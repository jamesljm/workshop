"use client";

import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/workshop-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  RotateCcw,
  ChevronLeft,
  Crosshair,
  Target,
  Swords,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { format } from "date-fns";
import { FIVE_WHY_PROMPTS } from "@/lib/constants";

export function ActionPlanView() {
  const router = useRouter();
  const store = useWorkshopStore();
  const { section1, section2, section3, section4, teamName, reset, setCurrentSection } = store;
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      const data = store.getData();
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `code-red-${teamName.toLowerCase().replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleStartOver = () => {
    reset();
    router.push("/");
  };

  const handleBack = () => {
    setCurrentSection(4);
    router.push("/workshop/mission-4");
  };

  const whyKeys = ["w1", "w2", "w3", "w4", "w5"] as const;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="secondary" className="mb-2">
            All Missions Complete
          </Badge>
          <h1 className="text-2xl font-bold">Action Plan</h1>
          <p className="text-muted-foreground">Team: {teamName}</p>
        </div>
        <Button variant="outline" onClick={handleDownloadPdf} disabled={downloading}>
          <Download className="h-4 w-4 mr-1" />
          {downloading ? "Generating..." : "Download PDF"}
        </Button>
      </div>

      <Separator />

      {/* Mission 1 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Crosshair className="h-5 w-5" />
            Mission 1: IDENTIFY THE THREAT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Category:</span> {section1.category}
          </div>
          <div>
            <span className="font-medium">Proposed Items:</span>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              {section1.proposedItems.map((item, i) => (
                <li key={i} className={item === section1.selectedItem ? "font-semibold" : ""}>
                  {item}{item === section1.selectedItem && " (focused)"}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-medium">5 Whys:</span>
            <div className="mt-1 ml-4 space-y-1">
              {whyKeys.map((key, i) => (
                section1.fiveWhys[key] && (
                  <p key={key} className={i === 4 ? "font-semibold text-red-700" : ""}>
                    W{i + 1} ({FIVE_WHY_PROMPTS[i]}): {section1.fiveWhys[key]}
                  </p>
                )
              ))}
            </div>
          </div>
          <div>
            <span className="font-medium">Solutions (A-D):</span>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              {section1.solutionIdeas.map((idea, i) => (
                <li key={i}>
                  <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {idea}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Mission 2 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Mission 2: LOCK IN THE OBJECTIVE
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-3">
            <p className="text-xs font-medium text-primary/70 mb-1">Goal Statement</p>
            <p className="font-medium">{section2.goalStatement}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div><span className="font-medium">Specific:</span> {section2.smart.specific}</div>
            <div><span className="font-medium">Measurable:</span> {section2.smart.measurable}</div>
            <div><span className="font-medium">Achievable:</span> {section2.smart.achievable}</div>
            <div><span className="font-medium">Relevant:</span> {section2.smart.relevant}</div>
          </div>
          <div><span className="font-medium">Time-bound:</span> {section2.smart.timeBound}</div>
          {section2.challenges.length > 0 && (
            <div>
              <span className="font-medium">Challenges:</span>
              <ul className="mt-1 ml-4 list-disc space-y-1">
                {section2.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mission 3 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Swords className="h-5 w-5" />
            Mission 3: PLAN THE ATTACK
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Key Results:</span>
            <ul className="mt-1 ml-4 list-decimal space-y-1">
              {section3.keyResults.map((kr, i) => (
                <li key={i}>{kr}</li>
              ))}
            </ul>
          </div>
          {section3.actions.length > 0 && (
            <div>
              <span className="font-medium">Actions:</span>
              <div className="mt-2 rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-medium">Action</th>
                      <th className="text-left p-2 font-medium w-28">Owner</th>
                      <th className="text-left p-2 font-medium w-28">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section3.actions.map((a, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="p-2">{a.description}</td>
                        <td className="p-2">{a.owner}</td>
                        <td className="p-2">
                          {a.dueDate
                            ? format(new Date(a.dueDate + "T00:00:00"), "dd MMM yyyy")
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mission 4 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Mission 4: KNOW YOUR WEAKNESS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Area to Improve:</span> {section4.improvementArea}
          </div>
          {section4.currentSituation && (
            <div>
              <span className="font-medium">Current Situation:</span>
              <p className="mt-1 text-muted-foreground">{section4.currentSituation}</p>
            </div>
          )}
          {section4.desiredOutcome && (
            <div>
              <span className="font-medium">Desired Outcome (3 months):</span>
              <p className="mt-1 text-muted-foreground">{section4.desiredOutcome}</p>
            </div>
          )}
          {section4.personalCommitments.some((c) => c.commitment) && (
            <div>
              <span className="font-medium">Personal Commitments:</span>
              <div className="mt-2 rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 font-medium">Name</th>
                      <th className="text-left p-2 font-medium w-28">Role</th>
                      <th className="text-left p-2 font-medium">Commitment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section4.personalCommitments
                      .filter((c) => c.commitment)
                      .map((c, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-2 font-medium">{c.name}</td>
                          <td className="p-2">{c.role}</td>
                          <td className="p-2">{c.commitment}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Mission 4
        </Button>
        <Button variant="outline" onClick={handleStartOver}>
          <RotateCcw className="mr-1 h-4 w-4" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
