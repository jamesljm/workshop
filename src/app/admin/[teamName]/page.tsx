"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ActionPlanView } from "@/components/workshop/ActionPlanView";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import type { WorkshopData } from "@/lib/types";

export default function AdminDetailPage({
  params,
}: {
  params: Promise<{ teamName: string }>;
}) {
  const { teamName } = use(params);
  const decoded = decodeURIComponent(teamName);
  const router = useRouter();
  const [data, setData] = useState<WorkshopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/submissions/${encodeURIComponent(decoded)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((sub) => setData(sub.data as WorkshopData))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [decoded]);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-8 space-y-4">
        <Button variant="outline" onClick={() => router.push("/admin")}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Admin
        </Button>
        <p className="text-red-600">
          {error || `No data found for team "${decoded}"`}
        </p>
      </main>
    );
  }

  return (
    <main>
      <div className="mx-auto w-full max-w-4xl px-4 pt-4">
        <Button variant="outline" onClick={() => router.push("/admin")}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Admin
        </Button>
      </div>
      <ActionPlanView data={data} readOnly />
    </main>
  );
}
