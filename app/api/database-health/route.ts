import { NextResponse } from "next/server";

import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

const REQUIRED_TABLES = [
  "addresses",
  "shipping_labels",
  "packing_slips",
  "packing_slip_items",
] as const;

export async function GET() {
  try {
    const [connection] = await sql`
      SELECT current_database() AS database_name, NOW() AS connected_at
    `;

    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = ANY(${REQUIRED_TABLES as unknown as string[]})
      ORDER BY table_name
    `;

    const availableTables = tables.map((row) => String(row.table_name));
    const missingTables = REQUIRED_TABLES.filter(
      (table) => !availableTables.includes(table),
    );

    return NextResponse.json({
      connected: true,
      database: connection.database_name,
      connectedAt: connection.connected_at,
      schema: {
        ready: missingTables.length === 0,
        availableTables,
        missingTables,
      },
    });
  } catch (error) {
    console.error("Neon database health check failed", error);

    const diagnostic =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : undefined;

    return NextResponse.json(
      {
        connected: false,
        message: "Database connection failed. Check the server logs.",
        diagnostic,
      },
      { status: 500 },
    );
  }
}
