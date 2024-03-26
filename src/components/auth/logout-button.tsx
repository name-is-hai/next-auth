"use client";

import { logout } from "@/actions/logout";

type LogoutButtonProps = {
  children: React.ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  return (
    <span
      onClick={() => logout()}
      className="cursor-pointer"
    >
      {children}
    </span>
  );
};
