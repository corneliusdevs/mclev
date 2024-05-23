import connectToDb from "@/db/connectToDb";
import bookingsModel, { TBooking } from "@/db/models/bookings-model";
import { DummyBookingType } from "@/helpers/dummyBooking";
import { publicProcedure, router } from "@/trpc-server";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

export const bookingRouter = router({
  create: publicProcedure
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
      let details: any;
      let result: TBooking[];
      let isError = false;

      await connectToDb()
        .then(async () => {
          try {
            console.log("bookings data are: ", params.input);
            details = await bookingsModel.create({
              ...params.input,
              isRead: false,
              status: "pending",
              timeStamp: Date.now(),
            });
          } catch (err) {
            isError = true;
            console.log("could not save bookings ", err);
            throw new Error(`${err}`);
          }

          console.log("result from server ", result, " details ", details);
        })
        .catch((err) => {
          isError = true;
          console.log(err);
        });

      console.log("In mutation block");

      console.log("details from server", details);

      if (isError) {
        return {
          message: "Ooops! something went wrong",
          httpStatus: 500,
        };
      }

      return {
        message: "Thank you for your reservation",
        httpStatus: 201,
      };
    }),

  get: publicProcedure.query(async () => {
    // const connect = async () => {
    //   console.log("calling connect");
    //   await dbConnect();
    // };

    let bookings: DummyBookingType[] = [];
    await connectToDb()
      .then(async () => {
        console.log("db connected, getting bookings");

        try {
          bookings = await bookingsModel.find({}).sort({
            createdAt: -1,
          });
        } catch (err) {
          console.log("error fetching bookings ", err);
          throw new TRPCError({
            message: "Oops! Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      })
      .catch((error) => {
        console.log("error connecting to database ", error);
        throw new TRPCError({
          message: "Oops! Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      });

    return {
      bookings: bookings,
      httpStatus: 200,
    };
  }),
  count: publicProcedure.query(async () => {
    // const connect = async () => {
    //   console.log("calling connect");
    //   await dbConnect();
    // };

    let isError = false;
    let bookingsCount:number = 0;
    await connectToDb()
      .then(async () => {
        console.log("db connected, counting bookings");
        try {
          bookingsCount = await bookingsModel.countDocuments({})
        } catch (err) {
          isError = true;
          console.log("error counting bookings ", err);
          throw new TRPCError({
            message: "Oops! Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      })
      .catch((error) => {
        isError = true
        console.log("error connecting to database while counting bookings", error);
        throw new TRPCError({
          message: "Oops! Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      });

      if(isError){
        return {
          bookingsCount: 0,
          httpStatus: 500,
        };
      }

    return {
      bookingsCount: bookingsCount,
      httpStatus: 200,
    };
  }),
  markAsRead: publicProcedure
    .input((v) => {
      const schema = z.object({
        bookingId: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log(
          "zod validation failed for markBookingAsRead ",
          result.error
        );
        throw result.error;
      }
      return result.data;
    })
    .mutation(async (params) => {
      let isError: boolean = false;

      console.log("booking id is ", params.input.bookingId);
      // const connect = async () => {
      //   console.log("calling connect");
      //   await dbConnect();
      // };

      let result: any;
      await connectToDb()
        .then(async () => {
          console.log("db connected, booking as read");

          try {
            result = await bookingsModel.findByIdAndUpdate(
              params.input.bookingId,
              {
                isRead: true,
              },
              {
                new: true,
              }
            );

            console.log("result of Mark booking As read ", result);
          } catch (err) {
            console.log("error marking booking as read ", err);

            isError = true;

            throw new TRPCError({
              message: "Oops! Something went wrong",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        })
        .catch((error) => {
          console.log("error connecting to database ", error);
          throw new TRPCError({
            message: "Oops! Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });
        });

      if (isError) {
        return {
          succes: false,
          httpStatus: 500,
        };
      }

      return {
        success: true,
        httpStatus: 201,
      };
    }),

  // Admin procedure
  delete: publicProcedure
    .input((v) => {
      const schema = z.object({
        bookingId: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log("zod validation failed for delete booking ", result.error);
        throw result.error;
      }
      return result.data;
    })
    .query(async (params) => {
      let isError: boolean = false;
      //   const connect = async () => {
      //     console.log("calling connect");
      //     await dbConnect();
      //   };

      let result: any;
      await connectToDb()
        .then(async () => {
          console.log("db connected, deleting booking...");

          try {
            result = await bookingsModel.findOneAndDelete({
              _id: params.input.bookingId,
            });

            console.log("result delete booking ", result);
          } catch (err) {
            console.log("error deleting booking", err);

            isError = true;

            throw new TRPCError({
              message: "Oops! Something went wrong",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        })
        .catch((error) => {
          console.log("error connecting to database deleting boooking", error);
          throw new TRPCError({
            message: "Oops! Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });
        });

      if (!isError) {
        return {
          succes: false,
          httpStatus: 500,
        };
      }

      return {
        success: true,
        httpStatus: 201,
      };
    }),
});

export type BookingsRouter = typeof bookingRouter;

