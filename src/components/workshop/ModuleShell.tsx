"use client";

import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/workshop-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface ModuleShellProps {
  moduleNumber: number;
  title: string;
  description: string;
  canAdvance: boolean;
  validationMessage?: string;
  children: React.ReactNode;
}

export function ModuleShell({
  moduleNumber,
  title,
  description,
  canAdvance,
  validationMessage = "Please complete the required fields before continuing.",
  children,
}: ModuleShellProps) {
  const router = useRouter();
  const setCurrentModule = useWorkshopStore((s) => s.setCurrentModule);

  const handleBack = () => {
    if (moduleNumber === 1) {
      router.push("/");
    } else {
      setCurrentModule(moduleNumber - 1);
      router.push(`/workshop/module-${moduleNumber - 1}`);
    }
  };

  const handleNext = () => {
    if (!canAdvance) {
      toast.error(validationMessage);
      return;
    }
    if (moduleNumber === 4) {
      setCurrentModule(5);
      router.push("/workshop/summary");
    } else {
      setCurrentModule(moduleNumber + 1);
      router.push(`/workshop/module-${moduleNumber + 1}`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 flex-1 flex flex-col">
      <div className="mb-6">
        <Badge variant="secondary" className="mb-2">
          Module {moduleNumber} of 4
        </Badge>
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
          {moduleNumber === 4 ? "View Summary" : "Next Module"}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
