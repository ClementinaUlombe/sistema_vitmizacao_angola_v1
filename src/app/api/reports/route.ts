import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      age,
      gender,
      occupation,
      educationLevel,
      residenceTime,
      neighborhood,
      subject,
      message,
      wasVictim,
      theft,
      robbery,
      aggression,
      domesticViolence,
      rape,
      fraud,
      cybercrime,
      otherCrime,
    } = body;

    const newReport = await prisma.report.create({
      data: {
        name: name || null,
        email: email || null,
        age: age || null,
        gender: gender || null,
        occupation: occupation || null,
        educationLevel: educationLevel || null,
        residenceTime: residenceTime || null,
        neighborhood: neighborhood || null,
        subject,
        message,
        wasVictim: wasVictim || null,
        theft: theft || false,
        robbery: robbery || false,
        aggression: aggression || false,
        domesticViolence: domesticViolence || false,
        rape: rape || false,
        fraud: fraud || false,
        cybercrime: cybercrime || false,
        otherCrime: otherCrime || null,
      },
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error("Error saving report to database:", error);
    return NextResponse.json(
      { message: "Failed to save report", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
