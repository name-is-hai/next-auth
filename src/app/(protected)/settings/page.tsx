"use client";

import { logout } from "@/actions/logout";
export default function SettingsPage() {
  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  );
}
