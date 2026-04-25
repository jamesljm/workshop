"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/workshop-store";
import { loadFromServer } from "@/lib/sync";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ShieldAlert, Cloud, Loader2 } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const store = useWorkshopStore();
  const { teamName, setTeamName, setCurrentSection, reset, teamMembers, setTeamMember, loadData } = store;
  const [name, setName] = useState(teamName);
  const [members, setMembers] = useState<string[]>(
    teamMembers.length === 5 ? [...teamMembers] : ["", "", "", "", ""]
  );
  const [loadingCloud, setLoadingCloud] = useState(false);

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
    members.forEach((m, i) => setTeamMember(i, m.trim()));
    setCurrentSection(1);
    router.push("/workshop/mission-1");
  };

  const handleResume = () => {
    const s = useWorkshopStore.getState();
    if (s.currentSection >= 1) {
      const sec = s.currentSection <= 4 ? s.currentSection : 5;
      const path = sec === 5 ? "/workshop/summary" : `/workshop/mission-${sec}`;
      router.push(path);
    }
  };

  const handleResumeFromCloud = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Please enter your team name");
      return;
    }
    setLoadingCloud(true);
    try {
      const result = await loadFromServer(trimmed);
      if (!result) {
        toast.error(`No saved data found for "${trimmed}"`);
        return;
      }
      loadData(result.data, result.currentSection);
      setName(result.data.teamName);
      setMembers(
        result.data.teamMembers.length === 5
          ? [...result.data.teamMembers]
          : ["", "", "", "", ""]
      );
      toast.success(`Loaded data for "${trimmed}" from cloud`);
      // Navigate to their last section
      const sec = result.currentSection <= 0 ? 1 : result.currentSection <= 4 ? result.currentSection : 5;
      const path = sec === 5 ? "/workshop/summary" : `/workshop/mission-${sec}`;
      router.push(path);
    } catch {
      toast.error("Failed to load from cloud. Try again.");
    } finally {
      setLoadingCloud(false);
    }
  };

  const hasExistingSession = teamName.length > 0;

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-3xl">Code Red: Ground Zero</CardTitle>
          <CardDescription className="text-base">
            Team Documentation
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
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Team Members</label>
            {members.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-4 shrink-0">{i + 1}.</span>
                <Input
                  placeholder={`Member ${i + 1} full name...`}
                  value={m}
                  onChange={(e) => {
                    const updated = [...members];
                    updated[i] = e.target.value;
                    setMembers(updated);
                  }}
                />
              </div>
            ))}
          </div>

          <Button onClick={handleStart} className="w-full" size="lg">
            {hasExistingSession ? "Start New Session" : "Begin Missions"}
          </Button>

          <Button
            onClick={handleResumeFromCloud}
            variant="outline"
            className="w-full"
            size="lg"
            disabled={loadingCloud}
          >
            {loadingCloud ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Cloud className="mr-2 h-4 w-4" />
            )}
            {loadingCloud ? "Loading..." : "Resume from Cloud"}
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
