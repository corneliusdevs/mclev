import dbConnect from "@/db/mongoose";
import { publicProcedure, router } from ".";
import userModel, { TUser } from "@/db/models/user-model";
import * as z from "zod";
import { TRPCError } from "@trpc/server";
import bookingsModel, { TBooking } from "@/db/models/bookings-model";
import { DummyBookingType } from "@/helpers/dummyBooking";
import connectToDb from "@/db/connectToDb";
import feedbackModel from "@/db/models/feedback-model";
import { validateCreateAdminAccountPassword } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import adminUserModel, { TAdminUser } from "@/db/models/admin-user-model";

const bcrypt = require("bcrypt");

// IMPLEMENT A RATE LIMITING API IN ALL ROUTES

export const appRouter = router({
  getUserSession: publicProcedure.query(async()=>{
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
        httpStatus: 200
      }


  }),
  getAdminSession: publicProcedure.query(async()=>{
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log("This is kinde user ", user);

    if (!user?.id || !user?.email) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "UNAUTHORIZED",
      });
    }

    let dbUser:TUser | undefined | null;

    
    await connectToDb()
    .then(async () => {
        // check if user in database
        dbUser = await adminUserModel.findOne({ email: user.email });
      })
      .catch((err) => {
        console.log("error connnecting to database ", err);
        throw new TRPCError({
          code:"INTERNAL_SERVER_ERROR",
          message: "Unable to connect to database"
        })
      });

      if(dbUser){
          return {
            kindeDetails: user,
            userRole: dbUser.userRole,
            httpStatus: 200
          }
      }

      return {
        httpStatus: 401
      }


  }),
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

    let dbUser:TUser | undefined | null;
    let adminUser:TAdminUser | undefined | null;
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
            code:"INTERNAL_SERVER_ERROR",
            message: "Failed"
          })
        }
      })
      .catch((err) => {
        console.log("error connnecting to database ", err);
        throw new TRPCError({
          code:"INTERNAL_SERVER_ERROR",
          message: "Unable to connect to database"
        })
      });


      if(typeof adminUser !== "undefined" && adminUser!== null){
        return {
          success: true,
          userRole: adminUser.userRole,
          kindeDetails: user
        }
      }
      

      if(typeof dbUser !== "undefined" && dbUser!== null){
        return {
          success: true,
          userRole: dbUser.userRole,
          kindeDetails: user
        }
      }

      return {
        success: true,
        userRole: "user",
        kindeDetails: user
      };
  
  }),
  // loginAdmin: publicProcedure
  //   .input((v) => {
  //     const userSchema = z.object({
  //       username: z.string(),
  //       password: z.string(),
  //     });
  //     console.log("parsing input");
  //     const result = userSchema.safeParse(v);
  //     if (!result.success) {
  //       console.log("zod validation failed");
  //       throw result.error;
  //     }
  //     return result.data;
  //   })
  //   .mutation(async (params) => {
  //     // connect to db
  //     await dbConnect();

  //     //  get all users
  //     const users: TUser[] = await userModel.aggregate([
  //       {
  //         $project: {
  //           username: 1,
  //           password: 1,
  //           _id: {
  //             $toString: "$_id",
  //           },
  //         },
  //       },
  //     ]);

  //     let isValidCredentials = false;
  //     //  determine if username and password matched
  //     // MAKE SURE TO ENCRYPT PASSWORDS BEFORE STORAGE
  //     users.forEach((user) => {
  //       if (
  //         user.email === params.input.username &&
  //         user.password === params.input.password
  //       ) {
  //         isValidCredentials = true;
  //       }
  //     });

  //     if (!isValidCredentials) {
  //       throw new TRPCError({
  //         message: "INVALID CREDENTIALS",
  //         code: "UNAUTHORIZED",
  //       });
  //     }

  //     return {
  //       message: "Welcome admin",
  //       httpStatus: 200,
  //     };
  //   }),

  // IMPLEMENT A RATE LIMITING API IN ALL ROUTES
  signUpAdmin: publicProcedure
    .input((v) => {
      const schema = z.object({
        email: z.string(),
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

      if (!validateCreateAdminAccountPassword(params.input.password)) {
        return {
          httpStatus: 401,
          message: "Forbidden",
        };
      }
      let details;
      let result;
      let savedInDatabase;
      let userExistsError;
      await connect()
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
          return {
            details,
            httpStatus: 201,
          };
        })
        .catch((err) => {
          console.log("Error storing user in database", err);
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
        created: "Internal Server error",
        details: "mi result",
        httpStatus: 500,
      };
    }),
  createBooking: publicProcedure
    .input((v) => {
      console.log("validating booking");
      const schema = z.object({
        name: z.string(),
        phoneNumber: z.string(),
        email: z.string(),
        postcode: z.string(),
        prefferedDate: z.string(),
        prefferedTime: z.string(),
        additionalNotes: z.string(),
        selectedService: z.string(),
        bookingInfo: z.array(
          z.object({
            question: z.string(),
            answers: z.array(z.string()),
          })
        ),
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
            isRead: false,
            status: "pending",
          });

          //  get all users
          const result: TBooking[] = await bookingsModel.aggregate([
            {
              $project: {
                name: 1,
                email: 1,
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

      console.log("In mutation block");

      console.log("details from server", details);

      return {
        message: "Thank you for making your reservation",
        httpStatus: 201,
      };
    }),
  getBookings: publicProcedure.query(async () => {
    const connect = async () => {
      console.log("calling connect");
      await dbConnect();
    };

    let bookings: DummyBookingType[] = [];
    connect()
      .then(async () => {
        console.log("db connected, getting bookings");
      })
      .catch((error) => {
        throw new TRPCError({
          message: "Oops! Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      });

    const getBookings = async () => {
      let bookings: DummyBookingType[] = [];
      await bookingsModel
        .find({})
        .then((results: DummyBookingType[]) => {
          bookings = results;
        })
        .catch((err) => {
          console.log("error occured getting booking ", err);
          throw new TRPCError({
            message: "Oops! Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });
        });

      return bookings;
    };
    let results = await getBookings();

    return results;

    // throw new TRPCError({
    //   message: "Oops something went wrong. Please try again later",
    //   code: "INTERNAL_SERVER_ERROR"
    //  })
  }),

  createFeedback: publicProcedure
    .input((v) => {
      const schema = z.object({
        rating: z.number(),
        experience: z.string(),
      });

      const result = schema.safeParse(v);

      if (!result.success) {
        throw new TRPCError({
          message: "Invalid input",
          code: "BAD_REQUEST",
        });
      }
      return result.data;
    })
    .mutation(async (params) => {
      let isSaved = false;
      await connectToDb()
        .then(async () => {
          await feedbackModel
            .create({
              ...params.input,
            })
            .then((result) => {
               isSaved = true 
            })
            .catch((error) => {
              console.log("failed to create feedback in database", error);
              throw new TRPCError({
                message: "Oops! Something went wrong",
                code: "INTERNAL_SERVER_ERROR",
              });
            });
        })
        .catch((error) => {
          console.log(error);
        });

        if(isSaved){
          return {
            message: "Successfull",
            httpStatus: 201,
          };
        }
      return {
        message: "Oopses! Something went wrong",
        httpStatus: 500,
      };
    }),
});

export type AppRouter = typeof appRouter;