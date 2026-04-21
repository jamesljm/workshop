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
  DollarSign,
  TrendingUp,
  Target,
  ListChecks,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { format } from "date-fns";

export function ActionPlanView() {
  const router = useRouter();
  const store = useWorkshopStore();
  const { module1, module2, module3, module4, teamName, reset, setCurrentModule } = store;
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
      a.download = `action-plan-${teamName.toLowerCase().replace(/\s+/g, "-")}.pdf`;
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
    setCurrentModule(4);
    router.push("/workshop/module-4");
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="secondary" className="mb-2">
            Summary
          </Badge>
          <h1 className="text-2xl font-bold">Action Plan</h1>
          <p className="text-muted-foreground">
            Team: {teamName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadPdf} disabled={downloading}>
            <Download className="h-4 w-4 mr-1" />
            {downloading ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Module 1 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Module 1: Fighting Cost Waste
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Category:</span> {module1.category}
          </div>
          <div>
            <span className="font-medium">Focus Item:</span> {module1.selectedItem}
          </div>
          <div>
            <span className="font-medium">Ideas:</span>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              {module1.ideas.map((idea, i) => (
                <li key={i}>{idea}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Module 2 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Module 2: One Thing to Improve
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Area:</span> {module2.area}
          </div>
          {module2.currentSituation && (
            <div>
              <span className="font-medium">Current Situation:</span>
              <p className="mt-1 text-muted-foreground">{module2.currentSituation}</p>
            </div>
          )}
          {module2.desiredOutcome && (
            <div>
              <span className="font-medium">Desired Outcome:</span>
              <p className="mt-1 text-muted-foreground">{module2.desiredOutcome}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Module 3 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Module 3: Goal & Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Goal:</span>
            <p className="mt-1">{module3.goal}</p>
          </div>
          <div>
            <span className="font-medium">Challenges:</span>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              {module3.challenges.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Module 4 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            Module 4: Breakdown & Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Sub-Goals:</span>
            <ul className="mt-1 ml-4 list-decimal space-y-1">
              {module4.subGoals.map((sg, i) => (
                <li key={i}>{sg}</li>
              ))}
            </ul>
          </div>
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
                  {module4.actions.map((a, i) => (
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
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Module 4
        </Button>
        <Button variant="outline" onClick={handleStartOver}>
          <RotateCcw className="mr-1 h-4 w-4" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
