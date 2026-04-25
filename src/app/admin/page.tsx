import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SECTION_LABELS = ["Landing", "Mission 1", "Mission 2", "Mission 3", "Mission 4", "Summary"];

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let submissions: {
    id: string;
    teamName: string;
    data: unknown;
    currentSection: number;
    createdAt: Date;
    updatedAt: Date;
  }[] = [];
  let error = "";

  try {
    submissions = await prisma.submission.findMany({
      orderBy: { updatedAt: "desc" },
    });
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load submissions";
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 space-y-6">
      <div>
        <Badge variant="secondary" className="mb-2">Admin Dashboard</Badge>
        <h1 className="text-2xl font-bold">All Submissions</h1>
        <p className="text-muted-foreground">
          {submissions.length} team{submissions.length !== 1 ? "s" : ""} submitted
        </p>
      </div>

      <Separator />

      {error && (
        <Card>
          <CardContent className="p-4 text-red-600 text-sm">
            Database error: {error}
          </CardContent>
        </Card>
      )}

      {submissions.length === 0 && !error && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No submissions yet. Teams will appear here as they progress through missions.
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {submissions.map((sub) => {
          const data = sub.data as { teamMembers?: string[] } | null;
          const memberCount = data?.teamMembers?.filter((m: string) => m).length ?? 0;

          return (
            <Link key={sub.id} href={`/admin/${encodeURIComponent(sub.teamName)}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{sub.teamName}</CardTitle>
                    <Badge
                      variant={sub.currentSection >= 5 ? "default" : "secondary"}
                    >
                      {SECTION_LABELS[sub.currentSection] ?? `Section ${sub.currentSection}`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground flex items-center justify-between">
                  <span>{memberCount} member{memberCount !== 1 ? "s" : ""}</span>
                  <span>Updated {sub.updatedAt.toLocaleString()}</span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
