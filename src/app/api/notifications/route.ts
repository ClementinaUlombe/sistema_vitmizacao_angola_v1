import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const unreadCount = await prisma.report.count({
      where: {
        read: false,
      },
    });
    return NextResponse.json({ unreadCount });
  } catch (error) {
    console.error("Error fetching unread notifications count:", error);
    return NextResponse.json(
      { message: "Failed to fetch unread notifications count", error: error.message },
      { status: 500 }
    );
  }
}
