"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { SectionShell } from "@/components/workshop/SectionShell";
import { CostProblemForm } from "@/components/workshop/CostProblemForm";
import { MISSION_TITLES } from "@/lib/constants";

export default function Mission1Page() {
  const section1 = useWorkshopStore((s) => s.section1);
  const s = MISSION_TITLES[0];

  const canAdvance = Boolean(
    section1.category &&
    section1.proposedItems.length >= 1 &&
    section1.selectedItem &&
    section1.fiveWhys.w1 &&
    section1.solutionIdeas.length >= 1
  );

  return (
    <SectionShell
      sectionNumber={s.number}
      title={s.title}
      description={s.description}
      framework={s.framework}
      time={s.time}
      canAdvance={canAdvance}
      validationMessage="Select a category, propose at least 1 item, focus on one, fill W1, and add at least 1 solution idea."
    >
      <CostProblemForm />
    </SectionShell>
  );
}
