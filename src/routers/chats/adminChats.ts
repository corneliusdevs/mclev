import connectToDb from "@/db/connectToDb";
import chatModel, { Chats, TChats } from "@/db/models/chat-model";
import { publicProcedure, router } from "@/trpc-server";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

export const adminChatRouter = router({
  // Use admin procedure here
  saveUsername: publicProcedure
    .input((v) => {
      const schema = z.object({
        username: z.string(),
        userId: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log("zod validation failed for store user name ", result.error);
        throw result.error;
      }
      return result.data;
    })
    .mutation(async (params) => {
      let isError: boolean = false;
      // const connect = async () => {
      //   console.log("calling connect for add user name");
      //   await dbConnect();
      // };

      let result: any;
      await connectToDb()
        .then(async () => {
          console.log("db connected, adding user's name");

          try {
            result = await chatModel.updateOne(
              {
                userId: params.input.userId,
              },
              {
                $set: {
                  name: params.input.username,
                },
              }
            );

            console.log("result of adding user's name ", result);
          } catch (err) {
            console.log("error adding user's name", err);

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
          success: false,
          httpStatus: 500,
        };
      }

      return {
        success: true,
        httpStatus: 201,
      };
    }),
  markAsRead: publicProcedure
    .input((v) => {
      const schema = z.object({
        userId: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log("zod validation failed for markChatAsRead ", result.error);
        throw result.error;
      }
      return result.data;
    })
    .mutation(async (params) => {
      let isError: boolean = false;
      // const connect = async () => {
      //   console.log("calling connect");
      //   await dbConnect();
      // };

      let result: any;
      await connectToDb()
        .then(async () => {
          console.log("db connected, marking as read");

          try {
            result = await chatModel.updateOne(
              {
                userId: params.input.userId,
              },
              {
                $set: {
                  isRead: true,
                },
              }
            );

            console.log("result of Mark As Read ", result);
          } catch (err) {
            console.log("error setting isRead to true ", err);

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
  // SWITCH TO ADMIN PROCEDURE IN DEPLOYMENT
  getAdminChats: publicProcedure.query(async (params) => {
    // if(params.ctx.admin.userRole !== "admin"){
    //   return {
    //     chats: [],
    //     httpStatus: 401
    //   }
    // }

    //   const connect = async () => {
    //     console.log("calling connect");
    //     await dbConnect();
    //   };

    let isError: boolean = false;

    let chats: Chats[] = [];
    await connectToDb()
      .then(async () => {
        console.log("db connected, getting admin chats");

        try {
          chats = await chatModel.find({}).sort({
            updatedAt: -1,
          });
        } catch (err) {
          console.log("error fetching admin chats ", err);

          isError = true;

          throw new TRPCError({
            message: "Oops! Something went wrong",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      })
      .catch((error) => {
        console.log(
          "error connecting to database while getting admin chats",
          error
        );
        throw new TRPCError({
          message: "Oops! Something went wrong",
          code: "INTERNAL_SERVER_ERROR",
        });
      });

    if (isError) {
      return {
        chats: [],
        httpStatus: 500,
      };
    }

    return {
      chats: chats,
      httpStatus: 200,
    };
  }),

  // adminProcedure
  handleAdminMessages: publicProcedure
    .input((v) => {
      const schema = z.object({
        message: z.string(),
        timeStamp: z.number(),
        author: z.string(),
        chatId: z.string(),
        recipientsId: z.array(z.string()),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log(
          "zod validation failed for handle admin messages ",
          result.error
        );
        throw result.error;
      }
      return result.data;
    })
    .mutation(async (params) => {
      // connect to db
      // const connect = async () => {
      //   console.log("calling connect");
      //   await dbConnect();
      // };

      let result: TChats | null = null;

      let isError: boolean = false;

      await connectToDb()
        .then(async () => {
          // CHECK IF A USER ID EXISTS IN THE DATABSE AND IF IT DOES, UPDATE THE CHAT FIELD USING THE SET OPERATOR ELSE, CREATE A NEW CHAT WITH THE UNIQUE USER ID
          let chatHistory = await chatModel.find({
            userId: params.input.recipientsId[0],
          });

          if (chatHistory.length !== 0) {
            console.log("in if block ", chatHistory);
            try {
              const toBeSaved = {
                message: params.input.message,
                recipientsId: params.input.recipientsId,
                author: params.input.author,
                timeStamp: params.input.timeStamp,
                chatId: params.input.chatId,
              };

              result = await chatModel.findOneAndUpdate(
                {
                  userId: params.input.recipientsId[0],
                },
                {
                  $push: {
                    chats: toBeSaved,
                  },
                },
                {
                  new: true,
                }
              );

              if (!result) {
                isError = true;
              }

              return;
            } catch (err) {
              console.log("failed to update chat ", err);
              isError = true;
              throw new TRPCError({
                message: "Unable to perform request",
                code: "INTERNAL_SERVER_ERROR",
              });
            }
          } else {
            console.log("in else block ...");
            try {
              result = await chatModel.create({
                userId: params.input.recipientsId[0],
                chats: {
                  message: params.input.message,
                  recipientsId: params.input.recipientsId,
                  author: params.input.author,
                  timeStamp: params.input.timeStamp,
                  chatId: params.input.chatId,
                },
              });

              console.log(
                "This is result from handle admin chat / messages ",
                result
              );
            } catch (err) {
              console.log("failed to create chat ", err);
              isError = true;
            }
          }
        })
        .catch((err) => {
          console.log("could not connect to db in hanldeAdminMessages ", err);
          isError = true;
          return;
        });

      console.log("about to exit fns handleAdmin messsages");

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

  // Admin procedure
  deleteUserChat: publicProcedure
    .input((v) => {
      const schema = z.object({
        userId: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        console.log("zod validation failed for deleteUserChat ", result.error);
        throw result.error;
      }
      return result.data;
    })
    .query(async (params) => {
      let isError: boolean = false;
      // const connect = async () => {
      //   console.log("calling connect");
      //   await dbConnect();
      // };

      let result: any;
      await connectToDb()
        .then(async () => {
          console.log("db connected, deleting userChat...");

          try {
            result = await chatModel.findOneAndDelete({
              userId: params.input.userId,
            });

            console.log("result delete user chat ", result);
          } catch (err) {
            console.log("error deleting user chat", err);

            isError = true;

            throw new TRPCError({
              message: "Oops! Something went wrong",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        })
        .catch((error) => {
          console.log("error connecting to database deleting chat", error);
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


export type AdminChatsRouter = typeof adminChatRouter;
