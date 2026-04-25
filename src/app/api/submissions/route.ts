import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return Response.json(submissions);
  } catch (error) {
    console.error("GET /api/submissions error:", error);
    return Response.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teamName, data, currentSection } = body;

    if (!teamName || typeof teamName !== "string") {
      return Response.json({ error: "teamName is required" }, { status: 400 });
    }

    const submission = await prisma.submission.upsert({
      where: { teamName },
      create: { teamName, data: data ?? {}, currentSection: currentSection ?? 0 },
      update: { data: data ?? {}, currentSection: currentSection ?? 0 },
    });

    return Response.json(submission);
  } catch (error) {
    console.error("POST /api/submissions error:", error);
    return Response.json({ error: "Failed to save submission" }, { status: 500 });
  }
}
