"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "./login-form";
type LoginButtonProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};
export const LoginButton = ({
  children: children,
  mode = "redirect",
  asChild,
}: Readonly<LoginButtonProps>) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };
  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <span
        onClick={onClick}
        role="button"
        className="cursor-pointer"
      >
        {children}
      </span>
    );
  }
};
