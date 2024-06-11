import dbConnect from "@/db/mongoose";
import { adminProcedure, messagesProcedure, publicProcedure, router } from ".";
import { feedbackRouter } from "@/routers/feedbacks";
import { authRouter } from "@/routers/auth";
import { userChatRouter } from "@/routers/chats/userChats";
import { bookingRouter } from "@/routers/bookings";
import { adminChatRouter } from "@/routers/chats/adminChats";
import { contactUsRouter } from "@/routers/contact";

const bcrypt = require("bcrypt");

// IMPLEMENT A RATE LIMITING API IN ALL ROUTES
export const appRouter = router({
  auth: authRouter,
  userChats: userChatRouter,
  adminChats: adminChatRouter,
  bookings: bookingRouter,
  feedback: feedbackRouter,
  contact: contactUsRouter,
  // // admin procedure
  // publishFeedbackToWebsite: publicProcedure
  // .input((v) => {
  //   const schema = z.object({
  //     feedbackId: z.string(),
  //     shouldPublish: z.boolean(),
  //   });
  //   const result = schema.safeParse(v);
  //   if (!result.success) {
  //     console.log(
  //       "zod validation failed for publishFeedbackToWebsite ",
  //       result.error
  //     );
  //     throw result.error;
  //   }
  //   return result.data;
  // })
  // .mutation(async (params) => {
  //   let isError: boolean = false;

  //   const connect = async () => {
  //     console.log("calling connect publishFeedbackToWebsite");
  //     await dbConnect();
  //   };

  //   let result: any;
  //   await connect()
  //     .then(async () => {
  //       console.log("db connected, publish Feedback To Website");

  //       try {
  //         result = await feedbackModel.findByIdAndUpdate(
  //           params.input.feedbackId,
  //           {
  //             publishToFrontend: params.input.shouldPublish,
  //           },
  //           {
  //             new: true,
  //           }
  //         );

  //         console.log("result of publish Feedback To Website ", result);
  //       } catch (err) {
  //         console.log("error publish Feedback To Website ", err);

  //         isError = true;

  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error connecting to database ", error);
  //       throw new TRPCError({
  //         message: "Oops! Something went wrong",
  //         code: "INTERNAL_SERVER_ERROR",
  //       });
  //     });

  //   if (isError) {
  //     return {
  //       succes: false,
  //       httpStatus: 500,
  //     };
  //   }

  //   return {
  //     success: true,
  //     httpStatus: 201,
  //   };
  // }),
  // countBookings: publicProcedure.query(async () => {
  //   const connect = async () => {
  //     console.log("calling connect");
  //     await dbConnect();
  //   };

  //   let isError = false;
  //   let bookingsCount:number = 0;
  //   await connect()
  //     .then(async () => {
  //       console.log("db connected, counting bookings");
  //       try {
  //         bookingsCount = await bookingsModel.countDocuments({})
  //       } catch (err) {
  //         isError = true;
  //         console.log("error counting bookings ", err);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       isError = true
  //       console.log("error connecting to database ", error);
  //       throw new TRPCError({
  //         message: "Oops! Something went wrong",
  //         code: "INTERNAL_SERVER_ERROR",
  //       });
  //     });

  //     if(isError){
  //       return {
  //         bookingsCount: 0,
  //         httpStatus: 500,
  //       };
  //     }

  //   return {
  //     bookingsCount: bookingsCount,
  //     httpStatus: 200,
  //   };
  // }),
  // countFeedbacks: publicProcedure.query(async () => {
  //   const connect = async () => {
  //     console.log("calling connect");
  //     await dbConnect();
  //   };

  //   let isError = false;
  //   let feedbacksCount:number = 0;
  //   await connect()
  //     .then(async () => {
  //       console.log("db connected, counting feedbacks");
  //       try {
  //         feedbacksCount = await feedbackModel.find({}).countDocuments({});
  //       } catch (err) {
  //         isError = true;
  //         console.log("error counting feedbacks ", err);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       isError = true
  //       console.log("error connecting to database ", error);
  //       throw new TRPCError({
  //         message: "Oops! Something went wrong",
  //         code: "INTERNAL_SERVER_ERROR",
  //       });
  //     });

  //     if(isError){
  //       return {
  //         feedbacksCount: 0,
  //         httpStatus: 500,
  //       };
  //     }

  //   return {
  //     feedbacksCount: feedbacksCount,
  //     httpStatus: 200,
  //   };
  // }),
  //   // Use admin procedure here
  //   addAdminResponseToFeedback: publicProcedure
  //   .input((v) => {
  //     const schema = z.object({
  //       adminResponse: z.string(),
  //       feedbackId: z.string()
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       console.log("zod validation failed for add admin response to feedback ", result.error);
  //       throw result.error;
  //     }
  //     return result.data;
  //   })
  //   .mutation(async (params) => {
  //     let isError: boolean = false;
  //     const connect = async () => {
  //       console.log("calling connect for add admin response to feedback");
  //       await dbConnect();
  //     };
       
  //     let result: any;
  //     await connect()
  //       .then(async () => {
  //         console.log("db connected, adding user's name");

  //         try {
  //           result = await feedbackModel.findByIdAndUpdate(
  //             params.input.feedbackId,
  //             // {
  //             //   _id: params.input.feedbackId,
  //             // },
  //             {

  //               adminResponse: params.input.adminResponse
  //               // $set: {
  //               //   adminResponse: params.input.adminResponse,
  //               // },
  //             }
  //           );

  //           console.log("result of add admin response to feedback", result);
  //         } catch (err) {
  //           console.log("error adding admin response to feedback", err);

  //           isError = true;

  //           throw new TRPCError({
  //             message: "Oops! Something went wrong",
  //             code: "INTERNAL_SERVER_ERROR",
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error connecting to database", error);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       });

  //     if (isError) {
  //       return {
  //         success: false,
  //         httpStatus: 500,
  //       };
  //     }

  //     return {
  //       success: true,
  //       httpStatus: 201,
  //     };
  //   }),
  // getFeedbacks: publicProcedure.query(async () => {
  //   const connect = async () => {
  //     console.log("calling connect");
  //     await dbConnect();
  //   };

  //   let feedbacks: TFeedback[] = [];
  //   await connect()
  //     .then(async () => {
  //       console.log("db connected, getting feedbacks");

  //       try {
  //         feedbacks = await feedbackModel.find({}).sort({
  //           createdAt: -1,
  //         });
  //       } catch (err) {
  //         console.log("error fetching feedbacks ", err);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error connecting to database ", error);
  //       throw new TRPCError({
  //         message: "Oops! Something went wrong",
  //         code: "INTERNAL_SERVER_ERROR",
  //       });
  //     });

  //   return {
  //     feedbacks: feedbacks,
  //     httpStatus: 200,
  //   };
  // }),
  // markFeedbackAsRead: publicProcedure
  // .input((v) => {
  //   const schema = z.object({
  //     feedbackId: z.string(),
  //   });
  //   const result = schema.safeParse(v);
  //   if (!result.success) {
  //     console.log(
  //       "zod validation failed for markFeedbackAsRead ",
  //       result.error
  //     );
  //     throw result.error;
  //   }
  //   return result.data;
  // })
  // .mutation(async (params) => {
  //   let isError: boolean = false;

  //   console.log("feedback id is ", params.input.feedbackId);
  //   const connect = async () => {
  //     console.log("calling connect");
  //     await dbConnect();
  //   };

  //   let result: any;
  //   await connect()
  //     .then(async () => {
  //       console.log("db connected, marking feedback as read");

  //       try {
  //         result = await feedbackModel.findByIdAndUpdate(
  //           params.input.feedbackId,
  //           {
  //             isViewed: true,
  //           },
  //           {
  //             new: true,
  //           }
  //         );

  //         console.log("result of Mark feedack As read ", result);
  //       } catch (err) {
  //         console.log("error marking feedack as read ", err);

  //         isError = true;

  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error connecting to database ", error);
  //       throw new TRPCError({
  //         message: "Oops! Something went wrong",
  //         code: "INTERNAL_SERVER_ERROR",
  //       });
  //     });

  //   if (isError) {
  //     return {
  //       succes: false,
  //       httpStatus: 500,
  //     };
  //   }

  //   return {
  //     success: true,
  //     httpStatus: 201,
  //   };
  // }),
  // markBookingAsRead: publicProcedure
  //   .input((v) => {
  //     const schema = z.object({
  //       bookingId: z.string(),
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       console.log(
  //         "zod validation failed for markBookingAsRead ",
  //         result.error
  //       );
  //       throw result.error;
  //     }
  //     return result.data;
  //   })
  //   .mutation(async (params) => {
  //     let isError: boolean = false;

  //     console.log("booking id is ", params.input.bookingId);
  //     const connect = async () => {
  //       console.log("calling connect");
  //       await dbConnect();
  //     };

  //     let result: any;
  //     await connect()
  //       .then(async () => {
  //         console.log("db connected, booking as read");

  //         try {
  //           result = await bookingsModel.findByIdAndUpdate(
  //             params.input.bookingId,
  //             {
  //               isRead: true,
  //             },
  //             {
  //               new: true,
  //             }
  //           );

  //           console.log("result of Mark booking As read ", result);
  //         } catch (err) {
  //           console.log("error marking booking as read ", err);

  //           isError = true;

  //           throw new TRPCError({
  //             message: "Oops! Something went wrong",
  //             code: "INTERNAL_SERVER_ERROR",
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error connecting to database ", error);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       });

  //     if (isError) {
  //       return {
  //         succes: false,
  //         httpStatus: 500,
  //       };
  //     }

  //     return {
  //       success: true,
  //       httpStatus: 201,
  //     };
  //   }),
  //   // admin procedure
  //   deleteFeedback: publicProcedure
  //   .input((v) => {
  //     const schema = z.object({
  //       feedbackId: z.string(),
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       console.log("zod validation failed for delete feedback ", result.error);
  //       throw result.error;
  //     }
  //     return result.data;
  //   })
  //   .query(async (params) => {
  //     let isError: boolean = false;
  //     const connect = async () => {
  //       console.log("calling connect");
  //       await dbConnect();
  //     };

  //     let result: any;
  //     await connect()
  //       .then(async () => {
  //         console.log("db connected, deleting feedback...");

  //         try {
  //           result = await feedbackModel.findOneAndDelete({
  //             _id: params.input.feedbackId,
  //           });

  //           console.log("result delete feedback ", result);
  //         } catch (err) {
  //           console.log("error deleting user feedback", err);

  //           isError = true;

  //           throw new TRPCError({
  //             message: "Oops! Something went wrong",
  //             code: "INTERNAL_SERVER_ERROR",
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error connecting to database deleting feedbcak", error);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       });

  //     if (!isError) {
  //       return {
  //         succes: false,
  //         httpStatus: 500,
  //       };
  //     }

  //     return {
  //       success: true,
  //       httpStatus: 201,
  //     };
  //   }),
  // // Admin procedure
  // deleteBooking: publicProcedure
  //   .input((v) => {
  //     const schema = z.object({
  //       bookingId: z.string(),
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       console.log("zod validation failed for delete booking ", result.error);
  //       throw result.error;
  //     }
  //     return result.data;
  //   })
  //   .query(async (params) => {
  //     let isError: boolean = false;
  //     const connect = async () => {
  //       console.log("calling connect");
  //       await dbConnect();
  //     };

  //     let result: any;
  //     await connect()
  //       .then(async () => {
  //         console.log("db connected, deleting booking...");

  //         try {
  //           result = await bookingsModel.findOneAndDelete({
  //             _id: params.input.bookingId,
  //           });

  //           console.log("result delete booking ", result);
  //         } catch (err) {
  //           console.log("error deleting booking", err);

  //           isError = true;

  //           throw new TRPCError({
  //             message: "Oops! Something went wrong",
  //             code: "INTERNAL_SERVER_ERROR",
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error connecting to database deleting booking", error);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       });

  //     if (!isError) {
  //       return {
  //         succes: false,
  //         httpStatus: 500,
  //       };
  //     }

  //     return {
  //       success: true,
  //       httpStatus: 201,
  //     };
  //   }),
  // // Admin procedure
  // deleteUserChat: publicProcedure
  //   .input((v) => {
  //     const schema = z.object({
  //       userId: z.string(),
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       console.log("zod validation failed for deleteUserChat ", result.error);
  //       throw result.error;
  //     }
  //     return result.data;
  //   })
  //   .query(async (params) => {
  //     let isError: boolean = false;
  //     const connect = async () => {
  //       console.log("calling connect");
  //       await dbConnect();
  //     };

  //     let result: any;
  //     await connect()
  //       .then(async () => {
  //         console.log("db connected, deleting userChat...");

  //         try {
  //           result = await chatModel.findOneAndDelete({
  //             userId: params.input.userId,
  //           });

  //           console.log("result delete user chat ", result);
  //         } catch (err) {
  //           console.log("error deleting user chat", err);

  //           isError = true;

  //           throw new TRPCError({
  //             message: "Oops! Something went wrong",
  //             code: "INTERNAL_SERVER_ERROR",
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error connecting to database deleting chat", error);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       });

  //     if (!isError) {
  //       return {
  //         succes: false,
  //         httpStatus: 500,
  //       };
  //     }

  //     return {
  //       success: true,
  //       httpStatus: 201,
  //     };
  //   }),
  // // Use admin procedure here
  // addUserNameToDb: publicProcedure
  //   .input((v) => {
  //     const schema = z.object({
  //       username: z.string(),
  //       userId: z.string(),
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       console.log("zod validation failed for store user name ", result.error);
  //       throw result.error;
  //     }
  //     return result.data;
  //   })
  //   .mutation(async (params) => {
  //     let isError: boolean = false;
  //     const connect = async () => {
  //       console.log("calling connect for add user name");
  //       await dbConnect();
  //     };

  //     let result: any;
  //     await connect()
  //       .then(async () => {
  //         console.log("db connected, adding user's name");

  //         try {
  //           result = await chatModel.updateOne(
  //             {
  //               userId: params.input.userId,
  //             },
  //             {
  //               $set: {
  //                 name: params.input.username,
  //               },
  //             }
  //           );

  //           console.log("result of adding user's name ", result);
  //         } catch (err) {
  //           console.log("error adding user's name", err);

  //           isError = true;

  //           throw new TRPCError({
  //             message: "Oops! Something went wrong",
  //             code: "INTERNAL_SERVER_ERROR",
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error connecting to database ", error);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       });

  //     if (isError) {
  //       return {
  //         success: false,
  //         httpStatus: 500,
  //       };
  //     }

  //     return {
  //       success: true,
  //       httpStatus: 201,
  //     };
  //   }),

  // markChatAsRead: publicProcedure
  //   .input((v) => {
  //     const schema = z.object({
  //       userId: z.string(),
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       console.log("zod validation failed for markChatAsRead ", result.error);
  //       throw result.error;
  //     }
  //     return result.data;
  //   })
  //   .mutation(async (params) => {
  //     let isError: boolean = false;
  //     const connect = async () => {
  //       console.log("calling connect");
  //       await dbConnect();
  //     };

  //     let result: any;
  //     await connect()
  //       .then(async () => {
  //         console.log("db connected, marking as read");

  //         try {
  //           result = await chatModel.updateOne(
  //             {
  //               userId: params.input.userId,
  //             },
  //             {
  //               $set: {
  //                 isRead: true,
  //               },
  //             }
  //           );

  //           console.log("result of Mark As Read ", result);
  //         } catch (err) {
  //           console.log("error setting isRead to true ", err);

  //           isError = true;

  //           throw new TRPCError({
  //             message: "Oops! Something went wrong",
  //             code: "INTERNAL_SERVER_ERROR",
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error connecting to database ", error);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       });

  //     if (isError) {
  //       return {
  //         succes: false,
  //         httpStatus: 500,
  //       };
  //     }

  //     return {
  //       success: true,
  //       httpStatus: 201,
  //     };
  //   }),
  // // SWITCH TO ADMIN PROCEDURE IN DEPLOYMENT
  // getAllAdminChats: publicProcedure.query(async (params) => {
  //   // if(params.ctx.admin.userRole !== "admin"){
  //   //   return {
  //   //     chats: [],
  //   //     httpStatus: 401
  //   //   }
  //   // }

  //   const connect = async () => {
  //     console.log("calling connect");
  //     await dbConnect();
  //   };

  //   let isError: boolean = false;

  //   let chats: Chats[] = [];
  //   await connect()
  //     .then(async () => {
  //       console.log("db connected, getting user chats");

  //       try {
  //         chats = await chatModel.find({}).sort({
  //           updatedAt: -1,
  //         });
  //       } catch (err) {
  //         console.log("error fetching user chats ", err);

  //         isError = true;

  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error connecting to database ", error);
  //       throw new TRPCError({
  //         message: "Oops! Something went wrong",
  //         code: "INTERNAL_SERVER_ERROR",
  //       });
  //     });

  //   if (isError) {
  //     return {
  //       chats: [],
  //       httpStatus: 500,
  //     };
  //   }

  //   return {
  //     chats: chats,
  //     httpStatus: 200,
  //   };
  // }),
  // getAllUserChats: messagesProcedure.query(async (params) => {
  //   const connect = async () => {
  //     console.log("calling connect");
  //     await dbConnect();
  //   };

  //   let isError: boolean = false;

  //   let chats: Chats = {
  //     userId: "",
  //     isRead: false,
  //     chats: [],
  //     name: "",
  //     // lastReadIndex: 0
  //   };
  //   await connect()
  //     .then(async () => {
  //       console.log("db connected, getting user chats");

  //       try {
  //         let data: Chats | null = await chatModel.findOne({
  //           userId: params.ctx.chatCookie,
  //         });
  //         if (data) {
  //           chats = data;
  //         }
  //       } catch (err) {
  //         console.log("error fetching user chats ", err);

  //         isError = true;

  //         // throw new TRPCError({
  //         //   message: "Oops! Something went wrong",
  //         //   code: "INTERNAL_SERVER_ERROR",
  //         // });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error connecting to database ", error);
  //       throw new TRPCError({
  //         message: "Oops! Something went wrong",
  //         code: "INTERNAL_SERVER_ERROR",
  //       });
  //     });

  //   if (isError) {
  //     return {
  //       chats: null,
  //       httpStatus: 500,
  //     };
  //   }

  //   return {
  //     chats: chats,
  //     httpStatus: 200,
  //   };
  // }),
  // handleAdminMessages: publicProcedure
  //   .input((v) => {
  //     console.log("validating messagessssssssss");
  //     const schema = z.object({
  //       message: z.string(),
  //       timeStamp: z.number(),
  //       author: z.string(),
  //       chatId: z.string(),
  //       recipientsId: z.array(z.string()),
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       console.log(
  //         "zod validation failed for handle admin messages ",
  //         result.error
  //       );
  //       throw result.error;
  //     }
  //     return result.data;
  //   })
  //   .mutation(async (params) => {
  //     // connect to db
  //     const connect = async () => {
  //       console.log("calling connect");
  //       await dbConnect();
  //     };

  //     let result: TChats | null = null;

  //     let isError: boolean = false;

  //     await connect()
  //       .then(async () => {
  //         // CHECK IF A USER ID EXISTS IN THE DATABSE AND IF IT DOES, UPDATE THE CHAT FIELD USING THE SET OPERATOR ELSE, CREATE A NEW CHAT WITH THE UNIQUE USER ID
  //         let chatHistory = await chatModel.find({
  //           userId: params.input.recipientsId[0],
  //         });

  //         if (chatHistory.length !== 0) {
  //           console.log("in if block ", chatHistory);
  //           try {
  //             const toBeSaved = {
  //               message: params.input.message,
  //               recipientsId: params.input.recipientsId,
  //               author: params.input.author,
  //               timeStamp: params.input.timeStamp,
  //               chatId: params.input.chatId,
  //             };

  //             result = await chatModel.findOneAndUpdate(
  //               {
  //                 userId: params.input.recipientsId[0],
  //               },
  //               {
  //                 $push: {
  //                   chats: toBeSaved,
  //                 },
  //               },
  //               {
  //                 new: true,
  //               }
  //             );

  //             if (!result) {
  //               isError = true;
  //             }
  //             // throw new TRPCError({
  //             //   message: "Unable to perform request",
  //             //   code: "INTERNAL_SERVER_ERROR",
  //             // });

  //             return;
  //           } catch (err) {
  //             console.log("failed to update chat ", err);
  //             isError = true;
  //             throw new TRPCError({
  //               message: "Unable to perform request",
  //               code: "INTERNAL_SERVER_ERROR",
  //             });
  //           }
  //         } else {
  //           console.log("in else block ...");
  //           try {
  //             result = await chatModel.create({
  //               userId: params.input.recipientsId[0],
  //               chats: {
  //                 message: params.input.message,
  //                 recipientsId: params.input.recipientsId,
  //                 author: params.input.author,
  //                 timeStamp: params.input.timeStamp,
  //                 chatId: params.input.chatId,
  //               },
  //             });

  //             console.log("This is result from create ", result);
  //             // throw new TRPCError({
  //             //   message: "Unable to perform request",
  //             //   code: "INTERNAL_SERVER_ERROR",
  //             // });
  //           } catch (err) {
  //             console.log("failed to create chat ", err);
  //             isError = true;

  //             // throw new TRPCError({
  //             //   message: "Unable to perform request",
  //             //   code: "INTERNAL_SERVER_ERROR",
  //             // });
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("could not connect to db in hanldeMessages route", err);
  //         isError = true;

  //         // throw new TRPCError({
  //         //   message: "Unable to perform request",
  //         //   code: "INTERNAL_SERVER_ERROR",
  //         // });

  //         return;
  //       });

  //     console.log("about to exit fns");

  //     if (isError) {
  //       return {
  //         success: false,
  //         httpStatus: 500,
  //       };
  //     }

  //     return {
  //       success: true,
  //       httpStatus: 201,
  //     };
  //   }),
  // handleUserMessages: messagesProcedure
  //   .input((v) => {
  //     console.log("validating messagessssssssss");
  //     const schema = z.object({
  //       message: z.string(),
  //       timeStamp: z.number(),
  //       author: z.string(),
  //       chatId: z.string(),
  //       recipientsId: z.array(z.string()),
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       console.log("zod validation failed for handle messages ", result.error);
  //       throw result.error;
  //     }
  //     return result.data;
  //   })
  //   .mutation(async (params) => {
  //     // connect to db
  //     const connect = async () => {
  //       console.log("calling connect");
  //       await dbConnect();
  //     };

  //     let result: TChats | null = null;

  //     let isError: boolean = false;

  //     await connect()
  //       .then(async () => {
  //         // CHECK IF A USER ID EXISTS IN THE DATABSE AND IF IT DOES, UPDATE THE CHAT FIELD USING THE SET OPERATOR ELSE, CREATE A NEW CHAT WITH THE UNIQUE USER ID
  //         let chatHistory = await chatModel.find({
  //           userId: params.ctx.chatCookie,
  //         });

  //         if (chatHistory.length !== 0) {
  //           console.log("in if block ", chatHistory);
  //           try {
  //             const toBeSaved = {
  //               message: params.input.message,
  //               recipientsId: params.input.recipientsId,
  //               author: params.input.author,
  //               timeStamp: params.input.timeStamp,
  //               chatId: params.input.chatId,
  //             };

  //             result = await chatModel.findOneAndUpdate(
  //               {
  //                 userId: params.ctx.chatCookie,
  //               },
  //               {
  //                 $push: {
  //                   chats: toBeSaved,
  //                 },
  //                 $set: {
  //                   isRead: false,
  //                 },
  //               },
  //               {
  //                 new: true,
  //               }
  //             );

  //             // throw new TRPCError({
  //             //   message: "Unable to perform request",
  //             //   code: "INTERNAL_SERVER_ERROR",
  //             // });
  //           } catch (err) {
  //             console.log("failed to update chat ", err);
  //             isError = true;
  //             throw new TRPCError({
  //               message: "Unable to perform request",
  //               code: "INTERNAL_SERVER_ERROR",
  //             });
  //           }
  //         } else {
  //           console.log("in else block ...");
  //           try {
  //             result = await chatModel.create({
  //               userId: params.ctx.chatCookie,
  //               chats: {
  //                 message: params.input.message,
  //                 recipientsId: params.input.recipientsId,
  //                 author: params.input.author,
  //                 timeStamp: params.input.timeStamp,
  //                 chatId: params.input.chatId,
  //               },
  //               isRead: false,
  //               name: "",
  //               lastReadIndex: 0,
  //             });

  //             console.log("This is result from create ", result);
  //             // throw new TRPCError({
  //             //   message: "Unable to perform request",
  //             //   code: "INTERNAL_SERVER_ERROR",
  //             // });
  //           } catch (err) {
  //             console.log("failed to create chat ", err);
  //             isError = true;

  //             throw new TRPCError({
  //               message: "Unable to perform request",
  //               code: "INTERNAL_SERVER_ERROR",
  //             });
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("could not connect to db in hanldeMessages route", err);
  //         isError = true;

  //         // throw new TRPCError({
  //         //   message: "Unable to perform request",
  //         //   code: "INTERNAL_SERVER_ERROR",
  //         // });

  //         return;
  //       });

  //     console.log("about to exit fns");

  //     if (isError) {
  //       return {
  //         success: false,
  //         httpStatus: 500,
  //       };
  //     }

  //     return {
  //       success: true,
  //       httpStatus: 201,
  //     };
  //   }),
  // getUserSession: publicProcedure.query(async () => {
  //   const { getUser } = getKindeServerSession();
  //   const user = await getUser();

  //   console.log("This is kinde user ", user);

  //   if (!user?.id || !user?.email) {
  //     throw new TRPCError({
  //       code: "UNAUTHORIZED",
  //       message: "UNAUTHORIZED",
  //     });
  //   }

  //   return {
  //     kindeDetails: user,
  //     httpStatus: 200,
  //   };
  // }),
  // getAdminSession: publicProcedure.query(async () => {
  //   const { getUser } = getKindeServerSession();
  //   const user = await getUser();

  //   console.log("This is kinde user ", user);

  //   if (!user?.id || !user?.email) {
  //     throw new TRPCError({
  //       code: "UNAUTHORIZED",
  //       message: "UNAUTHORIZED",
  //     });
  //   }

  //   let dbUser: TUser | undefined | null;

  //   await connectToDb()
  //     .then(async () => {
  //       // check if user in database
  //       dbUser = await adminUserModel.findOne({ email: user.email });
  //     })
  //     .catch((err) => {
  //       console.log("error connnecting to database ", err);
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Unable to connect to database",
  //       });
  //     });

  //   if (dbUser) {
  //     return {
  //       kindeDetails: user,
  //       userRole: dbUser.userRole,
  //       httpStatus: 200,
  //     };
  //   }

  //   return {
  //     httpStatus: 401,
  //   };
  // }),
  // authCallback: publicProcedure.query(async () => {
  //   const { getUser } = getKindeServerSession();
  //   const user = await getUser();

  //   console.log("This is kinde user ", user);

  //   if (!user?.id || !user?.email) {
  //     throw new TRPCError({
  //       code: "UNAUTHORIZED",
  //       message: "UNAUTHORIZED",
  //     });
  //   }

  //   console.log("About to get user in database ");

  //   let dbUser: TUser | undefined | null;
  //   let adminUser: TAdminUser | undefined | null;
  //   await connectToDb()
  //     .then(async () => {
  //       // check if user in database
  //       adminUser = await adminUserModel.findOne({ email: user.email });
  //       dbUser = await userModel.findOne({ email: user.email });

  //       // try to create user if user not in database
  //       try {
  //         if (!dbUser) {
  //           dbUser = await userModel.create({
  //             email: user.email,
  //             kindeId: user.id,
  //             userRole: "user",
  //           });
  //         }
  //       } catch (err) {
  //         console.log("error creating user ", err);
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: "Failed",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("error connnecting to database ", err);
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Unable to connect to database",
  //       });
  //     });

  //   if (typeof adminUser !== "undefined" && adminUser !== null) {
  //     return {
  //       success: true,
  //       userRole: adminUser.userRole,
  //       kindeDetails: user,
  //     };
  //   }

  //   if (typeof dbUser !== "undefined" && dbUser !== null) {
  //     return {
  //       success: true,
  //       userRole: dbUser.userRole,
  //       kindeDetails: user,
  //     };
  //   }

  //   return {
  //     success: true,
  //     userRole: "user",
  //     kindeDetails: user,
  //   };
  // }),

  // signUpAdmin: publicProcedure
  //   .input((v) => {
  //     const schema = z.object({
  //       email: z.string(),
  //       password: z.string(),
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       throw result.error;
  //     }

  //     return result.data;
  //   })
  //   .mutation(async (params) => {
  //     console.log(params.input);
  //     const connect = async () => {
  //       console.log("calling connect");
  //       await dbConnect();
  //     };

  //     if (!validateCreateAdminAccountPassword(params.input.password)) {
  //       return {
  //         httpStatus: 401,
  //         message: "Forbidden",
  //       };
  //     }
  //     let details;
  //     let result;
  //     let savedInDatabase;
  //     let userExistsError;
  //     await connect()
  //       .then(async () => {
  //         //hash password using bcryptjs.
  //         const salt = await bcrypt.genSalt(10);
  //         const hashedPassword = await bcrypt.hash(params.input.password, salt);
  //         details = await adminUserModel.create({
  //           ...params.input,
  //           password: hashedPassword,
  //           userRole: "admin",
  //         });

  //         savedInDatabase = true;
  //         return {
  //           details,
  //           httpStatus: 201,
  //         };
  //       })
  //       .catch((err) => {
  //         console.log("Error storing user in database", err);
  //         userExistsError = err;
  //       });

  //     if (userExistsError) {
  //       return {
  //         httpStatus: 400,
  //         message: "User Exists!",
  //       };
  //     }

  //     const inDatabase = await adminUserModel.find({
  //       email: params.input.email,
  //     });

  //     if (inDatabase) {
  //       return {
  //         httpStatus: 201,
  //         message: "Account created",
  //       };
  //     }

  //     return {
  //       created: "Internal Server error",
  //       details: "mi result",
  //       httpStatus: 500,
  //     };
  //   }),
  // createBooking: publicProcedure
  //   .input((v) => {
  //     console.log("validating booking");
  //     const schema = z.object({
  //       name: z.string(),
  //       phoneNumber: z.string(),
  //       email: z.string(),
  //       postcode: z.string(),
  //       prefferedDate: z.string(),
  //       prefferedTime: z.string(),
  //       additionalNotes: z.string(),
  //       selectedService: z.string(),
  //       bookingInfo: z.array(
  //         z.object({
  //           question: z.string(),
  //           answers: z.array(z.string()),
  //         })
  //       ),
  //     });
  //     const result = schema.safeParse(v);
  //     if (!result.success) {
  //       throw result.error;
  //     }

  //     return result.data;
  //   })
  //   .mutation(async (params) => {
  //     // connect to db
  //     const connect = async () => {
  //       console.log("calling connect");
  //       await dbConnect();
  //     };

  //     let details: any;
  //     let result: TBooking[];
  //     let isError = false;

  //     await connect()
  //       .then(async () => {
  //         try {
  //           console.log("bookings data are: ", params.input);
  //           details = await bookingsModel.create({
  //             ...params.input,
  //             isRead: false,
  //             status: "pending",
  //             timeStamp: Date.now(),
  //           });

  //           //  get all users
  //           result = await bookingsModel.aggregate([
  //             {
  //               $project: {
  //                 name: 1,
  //                 email: 1,
  //                 _id: {
  //                   $toString: "$_id",
  //                 },
  //               },
  //             },
  //           ]);
  //         } catch (err) {
  //           isError = true;
  //           console.log("could not save bookings ", err);
  //           throw new Error(`${err}`);
  //         }

  //         console.log("result from server ", result, " details ", details);
  //         return {
  //           details,
  //           result,
  //           httpStatus: 200,
  //         };
  //       })
  //       .catch((err) => {
  //         isError = true;
  //         console.log(err);
  //       });

  //     console.log("In mutation block");

  //     console.log("details from server", details);

  //     if (isError) {
  //       return {
  //         message: "Ooops! something went wrong",
  //         httpStatus: 500,
  //       };
  //     }

  //     return {
  //       message: "Thank you for your reservation",
  //       httpStatus: 201,
  //     };
  //   }),

  // getBookings: publicProcedure.query(async () => {
  //   const connect = async () => {
  //     console.log("calling connect");
  //     await dbConnect();
  //   };

  //   let bookings: DummyBookingType[] = [];
  //   await connect()
  //     .then(async () => {
  //       console.log("db connected, getting bookings");

  //       try {
  //         bookings = await bookingsModel.find({}).sort({
  //           createdAt: -1,
  //         });
  //       } catch (err) {
  //         console.log("error fetching bookings ", err);
  //         throw new TRPCError({
  //           message: "Oops! Something went wrong",
  //           code: "INTERNAL_SERVER_ERROR",
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error connecting to database ", error);
  //       throw new TRPCError({
  //         message: "Oops! Something went wrong",
  //         code: "INTERNAL_SERVER_ERROR",
  //       });
  //     });

  //   return {
  //     bookings: bookings,
  //     httpStatus: 200,
  //   };
  // }),

  // createFeedback: publicProcedure
  //   .input((v) => {
  //     const schema = z.object({
  //       rating: z.number(),
  //       experience: z.string(),
  //       name: z.string(),
  //     });

  //     const result = schema.safeParse(v);

  //     if (!result.success) {
  //       throw new TRPCError({
  //         message: "Invalid input",
  //         code: "BAD_REQUEST",
  //       });
  //     }
  //     return result.data;
  //   })
  //   .mutation(async (params) => {
  //     let isSaved = false;
  //     await connectToDb()
  //       .then(async () => {
  //         await feedbackModel
  //           .create({
  //             ...params.input,
  //             adminResponse:"",
  //             publishToFrontend: false,
  //             isViewed: false,
  //             timeStamp: Date.now()
  //           })
  //           .then((result) => {
  //             isSaved = true;
  //           })
  //           .catch((error) => {
  //             console.log("failed to create feedback in database", error);
  //             throw new TRPCError({
  //               message: "Oops! Something went wrong",
  //               code: "INTERNAL_SERVER_ERROR",
  //             });
  //           });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     if (isSaved) {
  //       return {
  //         message: "Successfull",
  //         httpStatus: 201,
  //       };
  //     }
  //     return {
  //       message: "Oopses! Something went wrong",
  //       httpStatus: 500,
  //     };
  //   }),
});

export type AppRouter = typeof appRouter;
