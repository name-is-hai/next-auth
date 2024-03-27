"use client";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Show } from "@/components/utility/Show";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
// import
export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token).then((data) => {
      setSuccess(data.success);
      setError(data.error);
    });
    console.log(token);
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  });

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center flex-col">
        <Show>
          <Show.When isTrue={!success || !error}>
            <FormSuccess message={success} />
            <FormError message={error} />
          </Show.When>
          <Show.Else>
            <BeatLoader />
          </Show.Else>
        </Show>
      </div>
    </CardWrapper>
  );
};
