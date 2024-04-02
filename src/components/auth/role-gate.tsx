"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FormError } from "@/components/form-error";
import { user } from "drizzle/schema";

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: (typeof user.role.enumValues)[number];
};

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const { role } = useCurrentUser();
  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content" />
    );
  }
  return <> {children}</>;
};
