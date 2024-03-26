"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    console.log({ error: "Forbidden!" });
    return { error: "Forbidden!" };
  }
  console.log({ success: "Allowed!" });
  return { success: "Allowed!" };
};
