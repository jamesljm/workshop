"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/workshop-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Swords } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { teamName, setTeamName, setCurrentModule, reset } = useWorkshopStore();
  const [name, setName] = useState(teamName);

  const handleStart = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Please enter your team name");
      return;
    }
    if (teamName && teamName !== trimmed) {
      reset();
    }
    setTeamName(trimmed);
    setCurrentModule(1);
    router.push("/workshop/module-1");
  };

  const handleResume = () => {
    const store = useWorkshopStore.getState();
    if (store.currentModule >= 1) {
      const mod = store.currentModule <= 4 ? store.currentModule : 5;
      const path = mod === 5 ? "/workshop/summary" : `/workshop/module-${mod}`;
      router.push(path);
    }
  };

  const hasExistingSession = teamName.length > 0;

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Swords className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl">Fighting Crisis</CardTitle>
          <CardDescription className="text-base">
            Manager Conference Workshop
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="team-name" className="text-sm font-medium">
              Team Name
            </label>
            <Input
              id="team-name"
              placeholder="Enter your team name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              autoFocus
            />
          </div>
          <Button onClick={handleStart} className="w-full" size="lg">
            {hasExistingSession ? "Start New Workshop" : "Start Workshop"}
          </Button>
          {hasExistingSession && (
            <Button onClick={handleResume} variant="outline" className="w-full" size="lg">
              Resume as &ldquo;{teamName}&rdquo;
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
