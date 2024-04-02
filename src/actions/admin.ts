"use server";

import { currentRole } from "@/lib/auth";
import { user } from "drizzle/schema";

export const admin = async () => {
  const role = await currentRole();
  if (role !== user.role.enumValues[0]) {
    console.log({ error: "Forbidden!" });
    return { error: "Forbidden!" };
  }
  console.log({ success: "Allowed!" });
  return { success: "Allowed!" };
};
