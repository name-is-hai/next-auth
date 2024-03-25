"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Show } from "@/components/utility/Show";
import { Icons } from "@/components/ui/icons";
export const Social = ({ isPending }: { isPending: boolean }) => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        disabled={isPending}
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {}}
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
        onClick={() => {}}
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
