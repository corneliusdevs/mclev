"use client";

import { trpc } from "@/trpc-client/client";
import { Loader2 } from "lucide-react";
import { navigate } from "../actions";
import { useEffect } from "react";

const Page = () => {


  const { isLoading, data, error } = trpc.authCallback.useQuery()

  useEffect(() => {
    if (error) {
      navigate("/sign-in");
    }

    if (data) {
      let { success, userRole, kindeDetails } = data;
      if (!success || !kindeDetails) {
        navigate("/sign-in");
      }
      if (success) {
        if(userRole === "admin"){
          navigate("admin-dashboard")
        }else{
          navigate("/")
        }
      }
    }
    

  }, [isLoading, data, error]);

  return (
    <div className='w-full h-[65vh] flex justify-center items-center'>
      <div className='flex flex-col items-center gap-2 text-center px-12'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          Signing you in...
        </h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
};

export default Page;
