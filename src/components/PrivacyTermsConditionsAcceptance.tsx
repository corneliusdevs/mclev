"use client";

import { privacy_Terms_Cond_Cookies_Policies_Acceptance_Cookie } from "@/helpers/cookies manager/cookieNames";
import { trpc } from "@/trpc-client/client";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PrivacyTermsConditionsAcceptance = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { mutate, isLoading } = trpc.auth.setCookie.useMutation({
    networkMode: "always",
  });

  useEffect(() => {
    mutate(
      {
        cookieName: privacy_Terms_Cond_Cookies_Policies_Acceptance_Cookie,
        cookieValue: "UUID",
        // set max age to 1 week
        maxAgeInSeconds: 7 * 24 * 60 * 60,
      },
      {
        onSuccess: (data) => {
          // onSuccess code
          // note on error code is also handled here. check the return value of the trpc route
        },
        onError: (error) => {
          // onError code
        },
      }
    );
  }, []);

  return (
    <main
      className={`${
        !isOpen ? "hidden" : "flex flex-col "
      } fixed bottom-4 right-2 z-[40] shadow-xl`}
    >
      <div className="flex flex-col justify-center items-center w-[300px] relative bg-second">
        <div className="bg-secondarycol/100 text-white rounded-sm shadow-2xl px-4 py-6">
          By Using our site, you consent to our{" "}
          <span className="underline">
            <Link href={"/termsandconditions"}>Terms and Conditions</Link>
          </span>
          ,{" "}
          <span className="underline">
            <Link href="/privacypolicy">Privacy Policy</Link>
          </span>{" "}
          and Our{" "}
          <span className="underline">
            <Link href={"/cookiespolicy"}>Cookies policy</Link>
          </span>
          .
        </div>
        <div
          className="absolute text-white top-2 right-2 hover:point"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <X size={16} />
        </div>
      </div>
    </main>
  );
};

export default PrivacyTermsConditionsAcceptance;
