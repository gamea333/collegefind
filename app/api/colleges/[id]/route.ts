import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: { id: string };
}

export async function GET(
  _request: Request,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { id } = context.params;

    const college = await prisma.college.findUnique({
      where: { id },
    });

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(college);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch college";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
