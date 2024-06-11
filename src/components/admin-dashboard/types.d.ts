import { TContactUs } from "@/db/models/contact-us-model";
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

export type DashboardStateType = "chats" | "dashboard" | "bookings" | "chatDialog" | "feedbacks" | "contacts";

export type AllAdminChats = {
  userId: string;
  chats: AdminChats[];
  isRead: boolean;
  name: string;
};

export type SearchUiPayload = AllAdminChats[] | TFeedback[] | DummyBookingType[] | TContactUs[];

export type SearchUiSetStateSignature = Dispatch<SetStateAction<AllAdminChats[]>> | Dispatch<SetStateAction<TFeedback[]>> | Dispatch<SetStateAction<DummyBookingType[]>> | Dispatch<SetStateAction<TContactUs[]>>;

export type SearchUiPayloadName = "feedbacks" | "adminChats" | "bookings" | "contacts"

export interface FeedbackFromCustomer {
  _id: string;
  rating: number;
  experience: string;
  publishToFrontend: boolean;
  adminResponse: string;
}
