// lib/reactQuery-provider.tsx
 
"use client";
 
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@/trpc-client/client";
import { getTRPCurl } from "./getTRPCurl";

 
// const url = "http://localhost:3000/api/trpc";
const url = getTRPCurl();

 
export const Provider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  
 
  
    const trpcClient = trpc.createClient({
      links: [
        httpBatchLink({
          url: url,
        }),
      ],
      transformer: superjson,
  });

  // const trpcClient = trpc.createClient({
  //   transformer: superjson,
  //   links: [
  //     httpBatchLink({
  //       url: url,
  //     }),
  //   ],
  // });
 
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};