"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { ModuleShell } from "@/components/workshop/ModuleShell";
import { CostSavingForm } from "@/components/workshop/CostSavingForm";
import { MODULE_TITLES } from "@/lib/constants";

export default function Module1Page() {
  const module1 = useWorkshopStore((s) => s.module1);
  const m = MODULE_TITLES[0];

  const canAdvance = Boolean(module1.selectedItem && module1.ideas.length >= 1);

  return (
    <ModuleShell
      moduleNumber={m.number}
      title={m.title}
      description={m.description}
      canAdvance={canAdvance}
      validationMessage="Select an item and add at least 1 idea before continuing."
    >
      <CostSavingForm />
    </ModuleShell>
  );
}
