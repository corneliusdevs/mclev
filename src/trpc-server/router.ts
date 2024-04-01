import dbConnect from "@/db/mongoose";
import { publicProcedure, router } from ".";
import userModel, { TUser } from "@/db/models/user-model";
import * as z from "zod";
import { TRPCError } from "@trpc/server";
import bookingsModel, { TBooking } from "@/db/models/bookings-model";


// IMPLEMENT A RATE LIMITING API IN ALL ROUTES

export const appRouter = router({
  createUser: publicProcedure
    .input((v) => {
      const userSchema = z.object({
        username: z.string(),
        password: z.string(),
      });
      console.log("parsing input");
      const result = userSchema.safeParse(v);
      if (!result.success) {
        console.log("zod validation failed");
        throw result.error;
      }
      return result.data;
    })
    .mutation(async (params) => {
      // connect to db
      await dbConnect();

      //  get all users
      const users: TUser[] = await userModel.aggregate([
        {
          $project: {
            username: 1,
            password: 1,
            _id: {
              $toString: "$_id",
            },
          },
        },
      ]);

      let isValidCredentials = false;
      //  determine if username and password matched
      // MAKE SURE TO ENCRYPT PASSWORDS BEFORE STORAGE
      users.forEach((user) => {
        if (
          user.username === params.input.username &&
          user.password === params.input.password
        ) {
          isValidCredentials = true;
        }
      });

      if (!isValidCredentials) {
        throw new TRPCError({
          message: "INVALID CREDENTIALS",
          code: "UNAUTHORIZED",
        });
      }

      return {
        message: "Welcome admin",
        httpStatus: 200,
      };
    }),

    // IMPLEMENT A RATE LIMITING API IN ALL ROUTES
  loginAdmin: publicProcedure
    .input((v) => {
      const schema = z.object({
        username: z.string(),
        password: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        throw result.error;
      }

      return result.data;
    })
    .mutation(async (params) => {
      console.log(params.input);
      const connect = async () => {
        console.log("calling connect");
        await dbConnect();
      };

      let details;
      let result;
      connect()
        .then(async () => {
          details = await userModel.create({
            ...params.input,
            userRole: "admin",
          });

          result = await userModel.find();
          console.log("result from server ", result, " details ", details);
          return {
            details,
            result,
          };
        })
        .catch((err) => console.log(err));

      console.log("details from server", details);

      return {
        created: "not created",
        details: "mi result",
      };
    }),
  createBooking: publicProcedure
    .input((v) => {
      console.log("validating booking")
      const schema = z.object({
        name: z.string(),
        phoneNumber: z.string(),
        email: z.string(),
        postcode: z.string(),
        prefferedDate: z.string(),
        prefferedTime: z.string(),
        additionalNotes: z.string()
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        throw result.error;
      }

      return result.data;
    })
    .mutation(async (params) => {
       // connect to db
       const connect = async () => {
        console.log("calling connect");
        await dbConnect();
      };

      let details;
      let result;

      connect()
        .then(async () => {
          details = await bookingsModel.create({
            ...params.input,
          });

          //  get all users
      const result: TBooking[] = await bookingsModel.aggregate([
        {
          $project: {
            username: 1,
            password: 1,
            _id: {
              $toString: "$_id",
            },
          },
        },
      ]);

         
          console.log("result from server ", result, " details ", details);
          return {
            details,
            result,
            httpStatus: 200,
          };
        })
        .catch((err) => console.log(err));

         console.log("In mutation block")

      
        console.log("details from server", details);

        return {
          message: "Thank you for making your reservation",
          httpStatus: 201,
        };
    }),
});

export type AppRouter = typeof appRouter;
