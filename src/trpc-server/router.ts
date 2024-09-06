import dbConnect from "@/db/mongoose";
import { adminProcedure, messagesProcedure, publicProcedure, router } from ".";
import { feedbackRouter } from "@/routers/feedbacks";
import { authRouter } from "@/routers/auth";
import { userChatRouter } from "@/routers/chats/userChats";
import { bookingRouter } from "@/routers/bookings";
import { adminChatRouter } from "@/routers/chats/adminChats";
import { contactUsRouter } from "@/routers/contact";


// IMPLEMENT A RATE LIMITING API IN ALL ROUTES
export const appRouter = router({
  auth: authRouter,
  userChats: userChatRouter,
  adminChats: adminChatRouter,
  bookings: bookingRouter,
  feedback: feedbackRouter,
  contact: contactUsRouter,
});

export type AppRouter = typeof appRouter;
