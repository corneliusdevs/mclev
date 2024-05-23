import connectToDb from "@/db/connectToDb";
import chatModel, { Chats, TChats } from "@/db/models/chat-model";
import { messagesProcedure, publicProcedure, router } from "@/trpc-server";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

export const userChatRouter = router({ 
generateUserId: messagesProcedure.query(async (params)=>{
  if(params.ctx?.chatCookie){
     return {
      userId: params.ctx.chatCookie,
      httpStatus: 201
     }
  }
  return{
    httpStatus: 500,
    userId:""
  }
}),
getAllUserChats: messagesProcedure.query(async (params) => {
//   const connect = async () => {
//     console.log("calling connect");
//     await dbConnect();
//   };

  let isError: boolean = false;

  let chats: Chats = {
    userId: "",
    isRead: false,
    chats: [],
    name: "",
    // lastReadIndex: 0
  };
  await connectToDb()
    .then(async () => {
      console.log("db connected, getting user chats");

      try {
        let data: Chats | null = await chatModel.findOne({
          userId: params.ctx.chatCookie,
        });
        if (data) {
          chats = data;
        }
      } catch (err) {
        console.log("error fetching user chats ", err);

        isError = true;
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
      chats: null,
      httpStatus: 500,
    };
  }

  return {
    chats: chats,
    httpStatus: 200,
  };
}),

handleUserMessages: messagesProcedure
  .input((v) => {
    console.log("validating messagessssssssss");
    const schema = z.object({
      message: z.string(),
      timeStamp: z.number(),
      author: z.string(),
      chatId: z.string(),
      recipientsId: z.array(z.string()),
    });
    const result = schema.safeParse(v);
    if (!result.success) {
      console.log("zod validation failed for handle messages ", result.error);
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
          userId: params.ctx.chatCookie,
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
                userId: params.ctx.chatCookie,
              },
              {
                $push: {
                  chats: toBeSaved,
                },
                $set: {
                  isRead: false,
                },
              },
              {
                new: true,
              }
            );

          } catch (err) {
            console.log("failed to update user chat in handleAllUserMessages ", err);
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
              userId: params.ctx.chatCookie,
              chats: {
                message: params.input.message,
                recipientsId: params.input.recipientsId,
                author: params.input.author,
                timeStamp: params.input.timeStamp,
                chatId: params.input.chatId,
              },
              isRead: false,
              name: "",
              lastReadIndex: 0,
            });

            console.log("This is result from create user chat in handleAllUserMessages ", result);
            // throw new TRPCError({
            //   message: "Unable to perform request",
            //   code: "INTERNAL_SERVER_ERROR",
            // });
          } catch (err) {
            console.log("failed to create chat ", err);
            isError = true;

            throw new TRPCError({
              message: "Unable to perform request",
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        }
      })
      .catch((err) => {
        console.log("could not connect to db in hanldeMessages route", err);
        isError = true;

        // throw new TRPCError({
        //   message: "Unable to perform request",
        //   code: "INTERNAL_SERVER_ERROR",
        // });

        return;
      });

    console.log("about to exit fns handleAllUserMessages");

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
})


export type UserChatRouter = typeof userChatRouter;
