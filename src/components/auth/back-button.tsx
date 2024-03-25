"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BackButton = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  return (
    <Button
      size={"sm"}
      className="font-normal w-full"
      variant={"link"}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
