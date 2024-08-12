
 
import { createContext } from "@/trpc-server/context";
import { appRouter } from "@/trpc-server/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";
 
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => await createContext(),
  });
 
export { handler as GET, handler as POST };