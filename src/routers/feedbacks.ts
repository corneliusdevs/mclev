import connectToDb from "@/db/connectToDb";
import feedbackModel, { TFeedback } from "@/db/models/feedback-model";
import dbConnect from "@/db/mongoose";
import { publicProcedure, router } from "@/trpc-server";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

export const feedbackRouter = router({
  create: publicProcedure
    .input((v) => {
      const schema = z.object({
        rating: z.number(),
        experience: z.string(),
        name: z.string(),
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
              adminResponse: "",
              publishToFrontend: false,
              isViewed: false,
              timeStamp: Date.now(),
            })
            .then((result) => {
              isSaved = true;
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

  publish: publicProcedure
    .input((v) => {
      const schema = z.object({
        feedbackId: z.string(),
        shouldPublish: z.boolean(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log(
          "zod validation failed for publishFeedbackToWebsite ",
          result.error
        );
        throw result.error;
      }
      return result.data;
    })
    .mutation(async (params) => {
      let isError: boolean = false;

      let result: any;
      await connectToDb()
        .then(async () => {
          console.log("db connected, publish Feedback To Website");
          try {
            result = await feedbackModel.findByIdAndUpdate(
              params.input.feedbackId,
              {
                publishToFrontend: params.input.shouldPublish,
              },
              {
                new: true,
              }
            );

            console.log("result of publish Feedback To Website ", result);
          } catch (err) {
            console.log("error publish Feedback To Website ", err);

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

  get: publicProcedure.query(async () => {
    const connect = async () => {
      console.log("calling connect");
      await dbConnect();
    };

    let feedbacks: TFeedback[] = [];
    await connect()
      .then(async () => {
        console.log("db connected, getting feedbacks");

        try {
          feedbacks = await feedbackModel.find({}).sort({
            createdAt: -1,
          });
        } catch (err) {
          console.log("error fetching feedbacks ", err);
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
      feedbacks: feedbacks,
      httpStatus: 200,
    };
  }),

  markAsRead: publicProcedure
    .input((v) => {
      const schema = z.object({
        feedbackId: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log(
          "zod validation failed for markFeedbackAsRead ",
          result.error
        );
        throw result.error;
      }
      return result.data;
    })
    .mutation(async (params) => {
      let isError: boolean = false;

      console.log("feedback id is ", params.input.feedbackId);
      const connect = async () => {
        console.log("calling connect");
        await dbConnect();
      };

      let result: any;
      await connect()
        .then(async () => {
          console.log("db connected, marking feedback as read");

          try {
            result = await feedbackModel.findByIdAndUpdate(
              params.input.feedbackId,
              {
                isViewed: true,
              },
              {
                new: true,
              }
            );

            console.log("result of Mark feedack As read ", result);
          } catch (err) {
            console.log("error marking feedack as read ", err);

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

  //admin procedure
  addAdminResponse: publicProcedure
    .input((v) => {
      const schema = z.object({
        adminResponse: z.string(),
        feedbackId: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log(
          "zod validation failed for add admin response to feedback ",
          result.error
        );
        throw result.error;
      }
      return result.data;
    })
    .mutation(async (params) => {
      let isError: boolean = false;
      let result: any;

      await connectToDb()
        .then(async () => {
          console.log("db connected, adding user's name");

          try {
            result = await feedbackModel.findByIdAndUpdate(
              params.input.feedbackId,
              // {
              //   _id: params.input.feedbackId,
              // },
              {
                adminResponse: params.input.adminResponse,
                // $set: {
                //   adminResponse: params.input.adminResponse,
                // },
              }
            );

            console.log("result of add admin response to feedback", result);
          } catch (err) {
            console.log("error adding admin response to feedback", err);

            isError = true;

            throw new TRPCError({
              message: "Oops! Something went wrong",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        })
        .catch((error) => {
          console.log("error connecting to database", error);
          throw new TRPCError({
            message: "Oops! Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });
        });

      if (isError) {
        return {
          success: false,
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
    let feedbacksCount: number = 0;
    await connect()
      .then(async () => {
        console.log("db connected, counting feedbacks");
        try {
          feedbacksCount = await feedbackModel.find({}).countDocuments({});
        } catch (err) {
          isError = true;
          console.log("error counting feedbacks ", err);
          throw new TRPCError({
            message: "Oops! Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      })
      .catch((error) => {
        isError = true;
        console.log("error connecting to database ", error);
        throw new TRPCError({
          message: "Oops! Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      });

    if (isError) {
      return {
        feedbacksCount: 0,
        httpStatus: 500,
      };
    }

    return {
      feedbacksCount: feedbacksCount,
      httpStatus: 200,
    };
  }),

  // admin procedure
  delete: publicProcedure
    .input((v) => {
      const schema = z.object({
        feedbackId: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log("zod validation failed for delete feedback ", result.error);
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
          console.log("db connected, deleting feedback...");

          try {
            result = await feedbackModel.findOneAndDelete({
              _id: params.input.feedbackId,
            });

            console.log("result delete feedback ", result);
          } catch (err) {
            console.log("error deleting user feedback", err);

            isError = true;

            throw new TRPCError({
              message: "Oops! Something went wrong",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        })
        .catch((error) => {
          console.log("error connecting to database deleting feedbcak", error);
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


export type FeedbacksRouter = typeof feedbackRouter;

