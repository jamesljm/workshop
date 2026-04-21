"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { ModuleShell } from "@/components/workshop/ModuleShell";
import { GoalChallengesForm } from "@/components/workshop/GoalChallengesForm";
import { MODULE_TITLES } from "@/lib/constants";

export default function Module3Page() {
  const module3 = useWorkshopStore((s) => s.module3);
  const m = MODULE_TITLES[2];

  const canAdvance = Boolean(
    module3.goal.trim() && module3.challenges.length >= 1
  );

  return (
    <ModuleShell
      moduleNumber={m.number}
      title={m.title}
      description={m.description}
      canAdvance={canAdvance}
      validationMessage="Set a goal and add at least 1 challenge before continuing."
    >
      <GoalChallengesForm />
    </ModuleShell>
  );
}
