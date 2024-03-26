"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Show } from "@/components/utility/Show";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  isPending?: boolean;
  showSocial?: boolean;
};
export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  isPending,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <Show>
        <Show.When isTrue={showSocial}>
          <CardFooter>
            <Social isPending={isPending} />
          </CardFooter>
        </Show.When>
      </Show>
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
