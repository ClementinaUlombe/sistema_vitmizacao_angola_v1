import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const newReport = await prisma.report.create({
      data: {
        name: name || null, // Allow null for anonymous reports
        email: email || null, // Allow null for anonymous reports
        subject,
        message,
      },
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error("Error saving report to database:", error);
    return NextResponse.json(
      { message: "Failed to save report", error: error.message },
      { status: 500 }
    );
  }
}
