import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { v4 as uuidv4 } from "uuid";

//place to put things that all procedures willhave access to.Things like session and database connections

export async function createContext() {
  // const chatCookieName = "anon_id";

  // get chat cookie from request if set, else create a new chat cookie to identify user sending messages via the chat feature

  
  // let chatCookieValue;
  
  // console.log('opts val ', opts);
  // if (opts?.req) {
  //     if (opts.req?.cookies) {
  //         if (opts?.req?.cookies[chatCookieName]) {
  //             chatCookieValue = opts?.req?.cookies[chatCookieName];
  //     }
  //   }
  // } else {
  //   chatCookieValue = uuidv4();
  // }

  // // set max cookie age to 3 weeks
  // const maxCookieAgeInSeconds = 1814400;

//   // cross check to see if older browsers support the SameSite=Strict option
//   opts.res.setHeader(
//       "Set-Cookie",
//       `${chatCookieName}:${chatCookieValue}; Path=/; HttpOnly: SameSite=Strict; Max-age=${maxCookieAgeInSeconds}`
//     );
    
    // console.log("setting context ", chatCookieValue);
    
    return {
    // chatCookie: chatCookieValue,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
