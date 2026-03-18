import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "UserId is required" }, { status: 400 });
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    const unreadCount = await prisma.notification.count({
      where: {
        userId: parseInt(userId),
        read: false,
      },
    });

    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { message: "Failed to fetch notifications", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, type, title, message, link } = body;

    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        link,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { message: "Failed to create notification", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, userId, all } = body;

    if (all && userId) {
      await prisma.notification.updateMany({
        where: {
          userId: parseInt(userId),
          read: false,
        },
        data: {
          read: true,
        },
      });
      return NextResponse.json({ message: "All notifications marked as read" });
    }

    if (id) {
      const notification = await prisma.notification.update({
        where: { id: parseInt(id) },
        data: { read: true },
      });
      return NextResponse.json(notification);
    }

    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { message: "Failed to update notification", error: error.message },
      { status: 500 }
    );
  }
}
