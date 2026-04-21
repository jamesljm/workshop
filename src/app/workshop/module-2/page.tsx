"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { ModuleShell } from "@/components/workshop/ModuleShell";
import { ImprovementForm } from "@/components/workshop/ImprovementForm";
import { MODULE_TITLES } from "@/lib/constants";

export default function Module2Page() {
  const module2 = useWorkshopStore((s) => s.module2);
  const m = MODULE_TITLES[1];

  const canAdvance = Boolean(module2.area);

  return (
    <ModuleShell
      moduleNumber={m.number}
      title={m.title}
      description={m.description}
      canAdvance={canAdvance}
      validationMessage="Please select an improvement area before continuing."
    >
      <ImprovementForm />
    </ModuleShell>
  );
}
