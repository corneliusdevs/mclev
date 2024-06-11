"use client";

import AdminDashboardUi from "@/components/admin-dashboard/AdminDasboardUi";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import AblyProviderComponent from "@/lib/ably/ably";
import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";
import { trpc } from "@/trpc-client/client";
import { navigate } from "../actions";

const AdminDashboard = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // trpc.auth.getUserSession.useQuery(undefined, {
  //   onSuccess: ({ httpStatus, userRole, kindeDetails }) => {
  //     if (httpStatus !== 200 || userRole !== "admin" || !kindeDetails) {
  //       navigate("/sign-in");
  //     }
  //     setIsAdminLoggedIn(true)
  //   },
  //   onError: (err) => {
  //     console.log("errrrrrrrrrrrrrrrrr,", err)

  //       // router.push("/sign-in");
  //   },
  //   retry: true,
  //   retryDelay: 500,
  // });

  const { isLoading, data, error } = trpc.auth.getAdminSession.useQuery();

  useEffect(() => {
    if (error) {
      navigate("/sign-in");
    }

    if (data) {
      let { httpStatus, userRole, kindeDetails } = data;
      if (httpStatus !== 200 || userRole !== "admin" || !kindeDetails) {
        navigate("/sign-in");
      } else {
        setIsAdminLoggedIn(true);
      }
      setIsAuthenticating(false);
    }
  }, [isLoading, data, error]);

  return (
    <main className="">
      <MaxwidthWrapper className="">
        {(isAuthenticating || !isAdminLoggedIn) && (
          <div className="w-full h-[65vh] flex justify-center items-center">
            <div className="flex flex-col items-center gap-2 text-center px-12">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
              <h3 className="font-semibold text-xl">Authenticating...</h3>
            </div>
          </div>
        )}
        {isAdminLoggedIn && !isAuthenticating && !isLoading && (
        <AdminDashboardUi isAdminLoggedIn={isAdminLoggedIn} />
      )}

        {/* <AdminDashboardUi isAdminLoggedIn={isAdminLoggedIn} /> */}
        {/* <AblyProviderComponent>
      </AblyProviderComponent> */}
      </MaxwidthWrapper>
    </main>
  );
};

export default AdminDashboard;
