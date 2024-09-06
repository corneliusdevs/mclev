import ClientSideCookiesManager from "@/app/cookieManager";
import connectToDb from "@/db/connectToDb";
import adminUserModel, { TAdminUser } from "@/db/models/admin-user-model";
import userModel, { TUser } from "@/db/models/user-model";
import {
  validateAdminSignInSecret,
  validateCreateAdminAccountPassword,
} from "@/lib/utils";
import { publicProcedure, router } from "@/trpc-server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import * as z from "zod";
const bcrypt = require("bcryptjs");

// note, all these return values are returned as part of the data object so, you will most likely handle error in the onSuccess handler part of the mutate function of trpc

export const authRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log("This is kinde user ", user);

    if (!user?.id || !user?.email) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "UNAUTHORIZED",
      });
    }

    console.log("About to get user in database ");

    let dbUser: TUser | undefined | null;
    let adminUser: TAdminUser | undefined | null;
    await connectToDb()
      .then(async () => {
        // check if user in database
        adminUser = await adminUserModel.findOne({ email: user.email });
        dbUser = await userModel.findOne({ email: user.email });

        // try to create user if user not in database
        try {
          if (!dbUser) {
            dbUser = await userModel.create({
              email: user.email,
              kindeId: user.id,
              userRole: "user",
            });
          }
        } catch (err) {
          console.log("error creating user ", err);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed",
          });
        }
      })
      .catch((err) => {
        console.log("error connnecting to database ", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to connect to database",
        });
      });

    if (typeof adminUser !== "undefined" && adminUser !== null) {
      return {
        success: true,
        userRole: adminUser.userRole,
        kindeDetails: user,
      };
    }

    if (typeof dbUser !== "undefined" && dbUser !== null) {
      return {
        success: true,
        userRole: dbUser.userRole,
        kindeDetails: user,
      };
    }

    return {
      success: true,
      userRole: "user",
      kindeDetails: user,
    };
  }),

  // this route sets a cookie when the necessary parameters are sent in
  setCookie: publicProcedure
    .input((v) => {
      const schema = z.object({
        cookieName: z.string(),
        maxAgeInSeconds: z.number(),
        cookieValue: z.string(),
      });

      const result = schema.safeParse(v);

      if (!result.success) {
        console.log(
          "error while validating inputs for setCookie route in auth router"
        );
        throw result.error;
      }

      return result.data;
    })
    .mutation(async (params) => {
      const cookieManager = new ClientSideCookiesManager();

      let isCreated: boolean = cookieManager.setCookie(
        params.input.cookieName,
        params.input.cookieValue,
        params.input.maxAgeInSeconds
      );

      if (isCreated) {
        return {
          httpStatus: 201,
          success: true,
        };
      }

      // note, all these return values are returned as part of the data object so, you will most likely handle error in the onSuccess handler part of the mutate function of trpc
      return {
        httpStatus: 500,
        success: false,
      };
    }),

  validateAdminSignInPass: publicProcedure
    .input((v) => {
      const schema = z.object({
        password: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log("error validating admin sign in password ", result.error);
        throw result.error;
      }

      return result.data;
    })
    .mutation(async (params) => {
      console.log(params.input);

      let isValid = false;
      if (validateAdminSignInSecret(params.input.password)) {
        isValid = true;
      } else {
        isValid = false;
      }

      if (isValid) {
        return {
          httpStatus: 200,
          message: "Success",
        };
      }

      return {
        httpStatus: 500,
        message: "Internal Server error",
      };
    }),

  signUpAdmin: publicProcedure
    .input((v) => {
      const schema = z.object({
        email: z.string(),
        password: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log("error signing up admin ", result.error);
        throw result.error;
      }

      return result.data;
    })
    .mutation(async (params) => {
      console.log(params.input);

      if (!validateCreateAdminAccountPassword(params.input.password)) {
        return {
          httpStatus: 401,
          message: "Forbidden",
        };
      }
      let details;
      let savedInDatabase;
      let userExistsError;

      await connectToDb()
        .then(async () => {
          //hash password using bcryptjs.
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(params.input.password, salt);
          details = await adminUserModel.create({
            ...params.input,
            password: hashedPassword,
            userRole: "admin",
          });

          savedInDatabase = true;
        })
        .catch((err) => {
          console.log(
            "Error storing admin while signing up admin in database",
            err
          );
          userExistsError = err;
        });

      if (userExistsError) {
        return {
          httpStatus: 400,
          message: "User Exists!",
        };
      }

      const inDatabase = await adminUserModel.find({
        email: params.input.email,
      });

      if (inDatabase) {
        return {
          httpStatus: 201,
          message: "Account created",
        };
      }

      return {
        message: "Internal Server error",
        httpStatus: 500,
      };
    }),

  getAdminSession: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log("This is kinde user for get admin session", user);

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
        console.log("error connnecting to database in get admin session", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to connect to database",
        });
      });

    if (dbUser) {
      return {
        kindeDetails: user,
        userRole: dbUser.userRole,
        httpStatus: 200,
      };
    }

    return {
      httpStatus: 401,
    };
  }),

  getUserSession: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log("This is kinde user ", user);

    if (!user?.id || !user?.email) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "UNAUTHORIZED",
      });
    }

    return {
      kindeDetails: user,
      httpStatus: 200,
    };
  }),
});

export type AuthRouter = typeof authRouter;
