"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { currentDate } from "@/lib/date";
import { user } from "drizzle/schema";
import { toast } from "sonner";

export default function AdminPage() {
  const { role } = useCurrentUser();
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        const promise = () =>
          new Promise((resolve) => setTimeout(() => resolve({}), 2000));
        toast.promise(promise, {
          loading: "Loading...",
          classNames: {
            closeButton: "bg-white",
          },
          success: () => {
            return `Allowed permissions`;
          },
          description: currentDate(),
          error: "Error",
        });
      } else {
        toast.error("FORBIDDEN", {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
          classNames: {
            closeButton: "bg-white",
            actionButton: "bg-emerald-600",
          },
        });
      }
    });
  };
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error("FORBIDDEN", {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
          classNames: {
            closeButton: "bg-white",
            actionButton: "bg-emerald-600",
          },
        });
      }
      if (data.success) {
        const promise = () =>
          new Promise((resolve) => setTimeout(() => resolve({}), 2000));
        toast.promise(promise, {
          loading: "Loading...",
          classNames: {
            closeButton: "bg-white",
          },
          success: () => {
            return `Allowed permissions`;
          },
          description: currentDate(),
          error: "Error",
        });
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={user.role.enumValues[0]}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>

          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>

          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
