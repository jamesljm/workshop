"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { SectionShell } from "@/components/workshop/SectionShell";
import { SmartGoalForm } from "@/components/workshop/SmartGoalForm";
import { SECTION_TITLES } from "@/lib/constants";

export default function Section2Page() {
  const section2 = useWorkshopStore((s) => s.section2);
  const s = SECTION_TITLES[1];

  const canAdvance = Boolean(
    section2.smart.specific.trim() &&
    section2.smart.timeBound.trim()
  );

  return (
    <SectionShell
      sectionNumber={s.number}
      title={s.title}
      description={s.description}
      framework={s.framework}
      time={s.time}
      canAdvance={canAdvance}
      validationMessage="Fill in at least the Specific and Time-bound fields to continue."
    >
      <SmartGoalForm />
    </SectionShell>
  );
}
