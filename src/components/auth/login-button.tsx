"use client";
import { useRouter } from "next/navigation";
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
    return <span>TODO: Implement modal</span>;
  }
  return (
    <span
      onClick={onClick}
      role="button"
      className="cursor-pointer"
    >
      {children}
    </span>
  );
};
