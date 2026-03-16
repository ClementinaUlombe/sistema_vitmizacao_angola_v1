import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// GET /api/backup/download - Download the SQLite database file
export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), "prisma", "dev.db");
    
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Arquivo de banco de dados não encontrado" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(dbPath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": 'attachment; filename="safe-angola-backup.db"',
        "Content-Type": "application/x-sqlite3",
      },
    });
  } catch (error) {
    console.error("Database download error:", error);
    return NextResponse.json({ error: "Erro ao baixar banco de dados" }, { status: 500 });
  }
}
