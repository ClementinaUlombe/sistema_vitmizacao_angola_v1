import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: "desc", // Order by most recent reports first
      },
    });
    return NextResponse.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { message: "Failed to fetch reports", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
    try {
        const { id, read } = await request.json();
        const updatedReport = await prisma.report.update({
            where: { id },
            data: { read },
        });
        return NextResponse.json(updatedReport);
    } catch (error) {
        console.error("Error updating report status:", error);
        return NextResponse.json(
            { message: "Failed to update report status", error: error.message },
            { status: 500 }
        );
    }
}
