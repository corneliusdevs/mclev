import connectToDb from "@/db/connectToDb";
import contactUsModel, { TContactUs } from "@/db/models/contact-us-model";

import dbConnect from "@/db/mongoose";
import { publicProcedure, router } from "@/trpc-server";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

export const contactUsRouter = router({
  create: publicProcedure
    .input((v) => {
      const schema = z.object({
        name: z.string(),
        subject: z.string(),
        email: z.string(),
        message: z.string(),
      });

      const result = schema.safeParse(v);

      if (!result.success) {
        throw new TRPCError({
          message: "Invalid input for create contact",
          code: "BAD_REQUEST",
        });
      }
      return result.data;
    })
    .mutation(async (params) => {
      let isSaved = false;
      await connectToDb()
        .then(async () => {
          await contactUsModel
            .create({
              ...params.input,
              isViewed: false,
              timeStamp: Date.now(),
            })
            .then((result) => {
              isSaved = true;
            })
            .catch((error) => {
              console.log("failed to create contact in database", error);
              throw new TRPCError({
                message: "Oops! Something went wrong",
                code: "INTERNAL_SERVER_ERROR",
              });
            });
        })
        .catch((error) => {
          console.log(error);
        });

      if (isSaved) {
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

// admin procedure
  get: publicProcedure.query(async () => {
    const connect = async () => {
      console.log("calling connect");
      await dbConnect();
    };

    let contacts: TContactUs[] = [];
    await connect()
      .then(async () => {
        console.log("db connected, getting contacts");

        try {
          contacts = await contactUsModel.find({}).sort({
            createdAt: -1,
          });
        } catch (err) {
          console.log("error fetching contacts ", err);
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
      contacts: contacts,
      httpStatus: 200,
    };
  }),

  markAsRead: publicProcedure
    .input((v) => {
      const schema = z.object({
        contactId: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log(
          "zod validation failed for markContactAsRead ",
          result.error
        );
        throw result.error;
      }
      return result.data;
    })
    .mutation(async (params) => {
      let isError: boolean = false;

      console.log("contact id is ", params.input.contactId);
      const connect = async () => {
        console.log("calling connect");
        await dbConnect();
      };

      let result: any;
      await connect()
        .then(async () => {
          console.log("db connected, marking contact as read");

          try {
            result = await contactUsModel.findByIdAndUpdate(
              params.input.contactId,
              {
                isViewed: true,
              },
              {
                new: true,
              }
            );

            console.log("result of Mark contact As read ", result);
          } catch (err) {
            console.log("error marking contact as read ", err);

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


  count: publicProcedure.query(async () => {
    const connect = async () => {
      console.log("calling connect");
      await dbConnect();
    };

    let isError = false;
    let contactsCount: number = 0;
    await connect()
      .then(async () => {
        console.log("db connected, counting contacts");
        try {
          contactsCount = await contactUsModel.find({}).countDocuments({});
        } catch (err) {
          isError = true;
          console.log("error counting contacts ", err);
          throw new TRPCError({
            message: "Oops! Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      })
      .catch((error) => {
        isError = true;
        console.log("error connecting to database while counting contacts", error);
        throw new TRPCError({
          message: "Oops! Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      });

    if (isError) {
      return {
        contactsCount: 0,
        httpStatus: 500,
      };
    }

    return {
      contactsCount: contactsCount,
      httpStatus: 200,
    };
  }),

  // admin procedure
  delete: publicProcedure
    .input((v) => {
      const schema = z.object({
        contactId: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log("zod validation failed for delete contact ", result.error);
        throw result.error;
      }
      return result.data;
    })
    .query(async (params) => {
      let isError: boolean = false;
      const connect = async () => {
        console.log("calling connect");
        await dbConnect();
      };

      let result: any;
      await connect()
        .then(async () => {
          console.log("db connected, deleting contact...");

          try {
            result = await contactUsModel.findOneAndDelete({
              _id: params.input.contactId,
            });

            console.log("result of delete contact ", result);
          } catch (err) {
            console.log("error deleting user contact", err);

            isError = true;

            throw new TRPCError({
              message: "Oops! Something went wrong",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        })
        .catch((error) => {
          console.log("error connecting to database while deleting contact", error);
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

export type contactsRouter = typeof contactUsRouter;
