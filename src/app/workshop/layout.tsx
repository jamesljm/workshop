"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/workshop-store";
import { ProgressBar } from "@/components/workshop/ProgressBar";

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const teamName = useWorkshopStore((s) => s.teamName);

  useEffect(() => {
    if (!teamName) {
      router.replace("/");
    }
  }, [teamName, router]);

  if (!teamName) return null;

  return (
    <div className="flex-1 flex flex-col">
      <ProgressBar />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
