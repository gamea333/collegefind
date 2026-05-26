import { NextResponse } from "next/server";
import { collegeCardSelect, getCollegeOrderBy } from "@/lib/college-card";
import { prisma } from "@/lib/prisma";
import {
  buildCollegeWhereClause,
  parseCollegeQueryParams,
} from "@/lib/parse-college-query";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filters = parseCollegeQueryParams(searchParams);
    const where = buildCollegeWhereClause(filters);
    const orderBy = getCollegeOrderBy(filters.sort);
    const skip = (filters.page - 1) * filters.limit;

    const [colleges, total] = await prisma.$transaction([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: filters.limit,
        select: collegeCardSelect,
      }),
      prisma.college.count({ where }),
    ]);

    return NextResponse.json({
      colleges,
      total,
      page: filters.page,
      totalPages: Math.ceil(total / filters.limit) || 1,
      limit: filters.limit,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch colleges";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
