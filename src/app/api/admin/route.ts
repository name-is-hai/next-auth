import { currentRole } from "@/lib/auth";
import { user } from "drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await currentRole();
  if (role === user.role.enumValues[1]) {
    console.log({ success: "Allowed!" });
    return new NextResponse(null, { status: 200 });
  }
  console.log({ error: "Forbidden!" });
  return new NextResponse(null, { status: 403 });
}
