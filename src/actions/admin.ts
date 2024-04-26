"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    console.log({ error: "403 Forbidden!" });
    return { error: "403 Forbidden!" };
  }
  console.log({ success: "203 Allowed!" });
  return { success: "203 Allowed!" };
};
