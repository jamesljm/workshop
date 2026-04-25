import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ teamName: string }> }
) {
  try {
    const { teamName } = await params;
    const decoded = decodeURIComponent(teamName);

    const submission = await prisma.submission.findUnique({
      where: { teamName: decoded },
    });

    if (!submission) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(submission);
  } catch (error) {
    console.error("GET /api/submissions/[teamName] error:", error);
    return Response.json({ error: "Failed to fetch submission" }, { status: 500 });
  }
}
