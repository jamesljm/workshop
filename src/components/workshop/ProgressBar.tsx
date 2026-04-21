"use client";

import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/workshop-store";
import { Progress } from "@/components/ui/progress";
import { SECTION_TITLES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function ProgressBar() {
  const router = useRouter();
  const currentSection = useWorkshopStore((s) => s.currentSection);
  const setCurrentSection = useWorkshopStore((s) => s.setCurrentSection);
  const teamName = useWorkshopStore((s) => s.teamName);
  const progress = currentSection >= 5 ? 100 : ((currentSection - 1) / 4) * 100;

  const navigateTo = (section: number) => {
    // Only allow navigating to completed sections or current
    if (section > currentSection) return;
    setCurrentSection(section);
    if (section === 5) {
      router.push("/workshop/summary");
    } else {
      router.push(`/workshop/section-${section}`);
    }
  };

  return (
    <div className="border-b bg-white">
      <div className="mx-auto max-w-4xl px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Team: {teamName}
          </h2>
          <span className="text-xs text-muted-foreground">
            {currentSection >= 5
              ? "Workshop Complete"
              : `Section ${currentSection} of 4`}
          </span>
        </div>
        <Progress value={progress} className="mb-3" />
        <div className="flex gap-1">
          {SECTION_TITLES.map((s) => {
            const isCompleted = currentSection > s.number;
            const isCurrent = currentSection === s.number;
            const isClickable = s.number <= currentSection;
            return (
              <button
                key={s.number}
                onClick={() => navigateTo(s.number)}
                disabled={!isClickable}
                className={cn(
                  "flex-1 text-center text-xs py-1.5 rounded transition-colors",
                  isCurrent && "bg-primary/10 font-semibold text-primary",
                  isCompleted && "text-primary/70 hover:bg-primary/5 cursor-pointer",
                  !isCurrent && !isCompleted && "text-muted-foreground/40 cursor-default"
                )}
              >
                <span className="flex items-center justify-center gap-1">
                  {isCompleted && <Check className="h-3 w-3" />}
                  S{s.number}: {s.title}
                </span>
              </button>
            );
          })}
          <button
            onClick={() => navigateTo(5)}
            disabled={currentSection < 5}
            className={cn(
              "flex-1 text-center text-xs py-1.5 rounded transition-colors",
              currentSection >= 5 && "bg-primary/10 font-semibold text-primary cursor-pointer",
              currentSection < 5 && "text-muted-foreground/40 cursor-default"
            )}
          >
            Summary
          </button>
        </div>
      </div>
    </div>
  );
}
