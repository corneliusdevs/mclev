import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { v4 as uuidv4 } from "uuid";

//place to put things that all procedures willhave access to.Things like session and database connections

export async function createContext() {
  
    
    return {
    // chatCookie: chatCookieValue,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
