import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Run a raw SQL to create the Submission table if it doesn't exist
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Submission" (
        "id" TEXT NOT NULL,
        "teamName" TEXT NOT NULL,
        "data" JSONB NOT NULL,
        "currentSection" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
      );
    `);
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Submission_teamName_key" ON "Submission"("teamName");
    `);
    return Response.json({ success: true, message: "Submission table created" });
  } catch (error) {
    console.error("init-db error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
