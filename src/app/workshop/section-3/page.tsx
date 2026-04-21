"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { SectionShell } from "@/components/workshop/SectionShell";
import { OKRBreakdownForm } from "@/components/workshop/OKRBreakdownForm";
import { SECTION_TITLES } from "@/lib/constants";

export default function Section3Page() {
  const section3 = useWorkshopStore((s) => s.section3);
  const s = SECTION_TITLES[2];

  const hasValidAction = section3.actions.some(
    (a) => a.description.trim() && a.owner.trim() && a.dueDate
  );
  const canAdvance = section3.keyResults.length >= 1 && hasValidAction;

  return (
    <SectionShell
      sectionNumber={s.number}
      title={s.title}
      description={s.description}
      framework={s.framework}
      time={s.time}
      canAdvance={canAdvance}
      validationMessage="Add at least 1 key result and 1 action (with owner and due date) to continue."
    >
      <OKRBreakdownForm />
    </SectionShell>
  );
}
