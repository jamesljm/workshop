"use client";

import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/workshop-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface SectionShellProps {
  sectionNumber: number;
  title: string;
  description: string;
  framework: string;
  time: string;
  canAdvance: boolean;
  validationMessage?: string;
  children: React.ReactNode;
}

export function SectionShell({
  sectionNumber,
  title,
  description,
  framework,
  time,
  canAdvance,
  validationMessage = "Please complete the required fields before continuing.",
  children,
}: SectionShellProps) {
  const router = useRouter();
  const setCurrentSection = useWorkshopStore((s) => s.setCurrentSection);

  const handleBack = () => {
    if (sectionNumber === 1) {
      router.push("/");
    } else {
      setCurrentSection(sectionNumber - 1);
      router.push(`/workshop/section-${sectionNumber - 1}`);
    }
  };

  const handleNext = () => {
    if (!canAdvance) {
      toast.error(validationMessage);
      return;
    }
    if (sectionNumber === 4) {
      setCurrentSection(5);
      router.push("/workshop/summary");
    } else {
      setCurrentSection(sectionNumber + 1);
      router.push(`/workshop/section-${sectionNumber + 1}`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 flex-1 flex flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">Section {sectionNumber} of 4</Badge>
          <Badge variant="outline">{framework}</Badge>
          <Badge variant="outline" className="text-muted-foreground">{time}</Badge>
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="flex-1">{children}</div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleNext}>
          {sectionNumber === 4 ? "Complete Workshop" : "Next Section"}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
