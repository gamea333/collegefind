import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");

    if (!idsParam) {
      return NextResponse.json(
        { error: "ids query parameter is required" },
        { status: 400 }
      );
    }

    const ids = idsParam
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (ids.length === 0) {
      return NextResponse.json(
        { error: "At least one college id is required" },
        { status: 400 }
      );
    }

    if (ids.length > 3) {
      return NextResponse.json(
        { error: "Maximum 3 colleges for comparison" },
        { status: 400 }
      );
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: ids } },
    });

    const foundIds = new Set(colleges.map((college) => college.id));
    const missingIds = ids.filter((id) => !foundIds.has(id));

    if (missingIds.length > 0) {
      return NextResponse.json(
        {
          error: "One or more colleges not found",
          missingIds,
        },
        { status: 404 }
      );
    }

    const collegeMap = new Map(colleges.map((college) => [college.id, college]));
    const orderedColleges = ids.map((id) => collegeMap.get(id)!);

    return NextResponse.json({ colleges: orderedColleges });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to compare colleges";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
