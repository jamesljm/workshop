"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { SectionShell } from "@/components/workshop/SectionShell";
import { ReflectForm } from "@/components/workshop/ReflectForm";
import { MISSION_TITLES } from "@/lib/constants";

export default function Mission4Page() {
  const section4 = useWorkshopStore((s) => s.section4);
  const s = MISSION_TITLES[3];

  const canAdvance = Boolean(section4.improvementArea);

  return (
    <SectionShell
      sectionNumber={s.number}
      title={s.title}
      description={s.description}
      framework={s.framework}
      time={s.time}
      canAdvance={canAdvance}
      validationMessage="Select an improvement area to complete the mission."
    >
      <ReflectForm />
    </SectionShell>
  );
}
