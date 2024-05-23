import { ChatStatus } from "@/ui/chat/AdminChatDialog";

export type AdminChats = {
  message: string;
  timeStamp: number;
  recipientsId: string[];
  author: "admin" | "client";
  chatId: string;
  id: string;
  status?: ChatStatus | undefined;
  type: "showChat" | "saveChat";
};

export type DashboardStateType = "chats" | "dashboard" | "bookings" | "chatDialog" | "feedbacks";

export type AllAdminChats = {
  userId: string;
  chats: AdminChats[];
  isRead: boolean;
  name: string;
};

export type SearchUiPayload = TFeedback[] | AllAdminChats[] | DummyBookingType[];

export type SearchUiPayloadName = "feedbacks" | "adminChats" | "bookings"

export interface FeedbackFromCustomer {
  _id: string;
  rating: number;
  experience: string;
  publishToFrontend: boolean;
  adminResponse: string;
}
