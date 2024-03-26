"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Show } from "@/components/utility/Show";
import { Icons } from "@/components/ui/icons";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
export const Social = ({ isPending }: { isPending?: boolean }) => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        disabled={isPending}
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        <Show>
          <Show.When isTrue={isPending}>
            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          </Show.When>
          <Show.Else>
            <FcGoogle className="h-5 w-5" />
          </Show.Else>
        </Show>
      </Button>
      <Button
        disabled={isPending}
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <Show>
          <Show.When isTrue={isPending}>
            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          </Show.When>
          <Show.Else>
            <FaGithub className="h-5 w-5" />
          </Show.Else>
        </Show>
      </Button>
    </div>
  );
};
