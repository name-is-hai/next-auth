import { currentRole } from "@/lib/auth";
import { user } from "drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await currentRole();
  if (role?.[0] === user.role.enumValues[0]) {
    console.log({ success: "Allowed!" });
    return new NextResponse(null, { status: 200 });
  }
  console.log({ error: "Forbidden!" });
  return new NextResponse(null, { status: 403 });
}
