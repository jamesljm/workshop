"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { ModuleShell } from "@/components/workshop/ModuleShell";
import { BreakdownForm } from "@/components/workshop/BreakdownForm";
import { MODULE_TITLES } from "@/lib/constants";

export default function Module4Page() {
  const module4 = useWorkshopStore((s) => s.module4);
  const m = MODULE_TITLES[3];

  const hasValidAction = module4.actions.some(
    (a) => a.description.trim() && a.owner.trim() && a.dueDate
  );
  const canAdvance = module4.subGoals.length >= 1 && hasValidAction;

  return (
    <ModuleShell
      moduleNumber={m.number}
      title={m.title}
      description={m.description}
      canAdvance={canAdvance}
      validationMessage="Add at least 1 sub-goal and 1 action (with owner and due date) before continuing."
    >
      <BreakdownForm />
    </ModuleShell>
  );
}
