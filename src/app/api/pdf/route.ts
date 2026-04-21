import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { ActionPlanDocument } from "@/components/pdf/ActionPlanDocument";
import type { WorkshopData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const data: WorkshopData = await req.json();

    if (!data.teamName) {
      return NextResponse.json(
        { error: "Missing team name" },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(ActionPlanDocument, { data }) as any;
    const buffer = await renderToBuffer(element);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="action-plan.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
