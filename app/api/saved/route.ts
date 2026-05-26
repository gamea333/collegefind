import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { collegeCardSelect } from "@/lib/college-card";
import { prisma } from "@/lib/prisma";

interface SavedCollegeBody {
  collegeId: string;
}

export async function GET(): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const saved = await prisma.savedCollege.findMany({
      where: { userId: session.user.id },
      include: {
        college: {
          select: collegeCardSelect,
        },
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ saved });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch saved colleges";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as SavedCollegeBody;
    const { collegeId } = body;

    if (!collegeId || typeof collegeId !== "string") {
      return NextResponse.json(
        { error: "collegeId is required" },
        { status: 400 }
      );
    }

    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "Already saved" }, { status: 409 });
    }

    const saved = await prisma.savedCollege.create({
      data: {
        userId: session.user.id,
        collegeId,
      },
      include: {
        college: {
          select: collegeCardSelect,
        },
      },
    });

    return NextResponse.json({ saved }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to save college";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as SavedCollegeBody;
    const { collegeId } = body;

    if (!collegeId || typeof collegeId !== "string") {
      return NextResponse.json(
        { error: "collegeId is required" },
        { status: 400 }
      );
    }

    const saved = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
    });

    if (!saved) {
      return NextResponse.json(
        { error: "Saved college not found" },
        { status: 404 }
      );
    }

    await prisma.savedCollege.delete({
      where: { id: saved.id },
    });

    return NextResponse.json({ message: "Removed from saved" });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to remove saved college";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
