import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

import { Context, createContext } from "./context";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import connectToDb from "@/db/connectToDb";
import { TUser } from "@/db/models/user-model";
import adminUserModel from "@/db/models/admin-user-model";

// const t = initTRPC.context<typeof createContext>().create({
//   transformer: superjson,
// });

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});
export const createCallerFactory = t.createCallerFactory;
export const router = t.router;
export const publicProcedure = t.procedure;
export const adminProcedure = publicProcedure.use(async (opts) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log("This is kinde user ", user);

  if (!user?.id || !user?.email) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "UNAUTHORIZED",
    });
  }

  let dbUser: TUser | undefined | null;

  await connectToDb()
    .then(async () => {
      // check if user in database
      dbUser = await adminUserModel.findOne({ email: user.email });
    })
    .catch((err) => {
      console.log("error connnecting to database ", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to connect to database",
      });
    });

  if (dbUser) {
    opts.next({
      ctx: {
        admin: {
          kindeDetails: user,
          userRole: dbUser.userRole,
          httpStatus: 200,
        },
      },
    });
  }
  return opts.next({
    ctx: {
      admin: {
        kindeDetails: null,
        userRole: "",
        httpStatus: 401,
      },
    },
  });
});

export const messagesProcedure = publicProcedure.use(async (opts) => {
  
  const { ctx } = opts;

  // set max cookie age to 3 weeks
  const maxCookieAgeInSeconds = 1814400;

  let chatCookie;

  if (cookies().get("anon_id")) {
    chatCookie = cookies().get("anon_id");
  } else {
    console.log("cookie expired, setting another one");
    const chatUUID = uuidv4();
    cookies().set({
      name: "anon_id",
      value: chatUUID,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: maxCookieAgeInSeconds,
    });

    chatCookie = cookies().get("anon_id");
  }

  return opts.next({
    ctx: {
      chatCookie: chatCookie?.value,
    },
  });
});
