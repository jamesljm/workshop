import type { WorkshopData } from "@/lib/types";

export async function saveToServer(
  teamName: string,
  data: WorkshopData,
  currentSection: number
): Promise<boolean> {
  try {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamName, data, currentSection }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function loadFromServer(
  teamName: string
): Promise<{ data: WorkshopData; currentSection: number } | null> {
  try {
    const res = await fetch(`/api/submissions/${encodeURIComponent(teamName)}`);
    if (!res.ok) return null;
    const submission = await res.json();
    return { data: submission.data as WorkshopData, currentSection: submission.currentSection };
  } catch {
    return null;
  }
}
